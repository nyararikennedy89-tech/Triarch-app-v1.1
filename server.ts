import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for M-Pesa transactions
interface MpesaTransaction {
  checkoutRequestId: string;
  merchantRequestId: string;
  phoneNumber: string;
  amount: number;
  accountReference: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'FAILED';
  resultDesc?: string;
  receiptNumber?: string;
  transactionDate?: string;
  completedAt?: number;
  createdAt: number;
}

const transactionsStore = new Map<string, MpesaTransaction>();

// Clean up old transactions periodically (keep 2 hours)
setInterval(() => {
  const cutoff = Date.now() - 2 * 60 * 60 * 1000;
  for (const [id, tx] of transactionsStore.entries()) {
    if (tx.createdAt < cutoff) {
      transactionsStore.delete(id);
    }
  }
}, 30 * 60 * 1000);

function cleanEnvVal(val: string | undefined): string {
  if (!val) return '';
  return val.trim().replace(/^["']|["']$/g, '');
}

// Configuration
function getMpesaConfig() {
  const env = cleanEnvVal(process.env.MPESA_ENVIRONMENT || 'sandbox').toLowerCase();
  const isProduction = env === 'production';
  const consumerKey = cleanEnvVal(process.env.MPESA_CONSUMER_KEY);
  const consumerSecret = cleanEnvVal(process.env.MPESA_CONSUMER_SECRET);
  const shortcode = cleanEnvVal(process.env.MPESA_SHORTCODE) || (isProduction ? '' : '174379');
  const passkey = cleanEnvVal(process.env.MPESA_PASSKEY) || (isProduction ? '' : 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919');
  const baseUrl = isProduction
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';

  let callbackUrl = cleanEnvVal(process.env.MPESA_CALLBACK_URL);
  const appUrl = cleanEnvVal(process.env.APP_URL).replace(/\/$/, '');
  if (callbackUrl.includes('${APP_URL}') || callbackUrl.includes('$APP_URL')) {
    callbackUrl = callbackUrl.replace(/\$\{APP_URL\}|\$APP_URL/g, appUrl);
  }
  if (!callbackUrl && appUrl) {
    callbackUrl = `${appUrl}/api/mpesa/callback`;
  }

  const isConfigured = Boolean(consumerKey && consumerSecret);

  return {
    env,
    isProduction,
    consumerKey,
    consumerSecret,
    shortcode,
    passkey,
    baseUrl,
    callbackUrl,
    isConfigured
  };
}

// Phone formatter helper for Safaricom (2547XXXXXXXX or 2541XXXXXXXX)
function formatKenyanPhone(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '254' + cleaned.substring(1);
  } else if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
    cleaned = '254' + cleaned;
  } else if (cleaned.startsWith('+254')) {
    cleaned = cleaned.substring(1);
  }
  return cleaned;
}

// Interface for Daraja Authentication & Environment Resolution
interface DarajaAuthResult {
  accessToken: string;
  activeBaseUrl: string;
  isSandbox: boolean;
  effectiveShortcode: string;
  effectivePasskey: string;
  note?: string;
}

// Generate Daraja OAuth token with smart environment auto-detection
async function getDarajaAccessToken(config: ReturnType<typeof getMpesaConfig>): Promise<DarajaAuthResult> {
  const credentials = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString('base64');
  let targetBaseUrl = config.baseUrl;
  let isSandbox = !config.isProduction;
  let fallbackNote: string | undefined;

  let response = await fetch(`${targetBaseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json'
    }
  });

  // If initial attempt failed, check the alternate environment (Sandbox <-> Production)
  if (!response.ok) {
    const alternateBaseUrl = config.isProduction
      ? 'https://sandbox.safaricom.co.ke'
      : 'https://api.safaricom.co.ke';

    try {
      const altResponse = await fetch(`${alternateBaseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }
      });

      if (altResponse.ok) {
        targetBaseUrl = alternateBaseUrl;
        isSandbox = alternateBaseUrl.includes('sandbox');
        response = altResponse;
        fallbackNote = isSandbox
          ? 'Notice: Your Consumer Key & Secret belong to Safaricom Sandbox. Automatically routed to sandbox.safaricom.co.ke.'
          : 'Notice: Your Consumer Key & Secret belong to Safaricom Production. Automatically routed to api.safaricom.co.ke.';
      }
    } catch {
      // Ignore alternate failure, proceed to handle original error
    }
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Daraja OAuth failed (${response.status}): ${errorText || 'Invalid Safaricom Consumer Key or Secret'}`);
  }

  const data = await response.json() as { access_token: string; expires_in: string };

  // Safaricom Sandbox strictly requires test shortcode 174379 and the standard sandbox passkey
  const effectiveShortcode = isSandbox
    ? '174379'
    : (config.shortcode || '174379');

  const effectivePasskey = isSandbox
    ? 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    : (config.passkey || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919');

  return {
    accessToken: data.access_token,
    activeBaseUrl: targetBaseUrl,
    isSandbox,
    effectiveShortcode,
    effectivePasskey,
    note: fallbackNote
  };
}

// Generate Daraja Timestamp (YYYYMMDDHHmmss)
function getDarajaTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// API: Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API: Check Daraja Gateway Configuration Status
app.get("/api/mpesa/config", (_req, res) => {
  const config = getMpesaConfig();
  res.json({
    configured: config.isConfigured,
    environment: config.env,
    shortcode: config.shortcode,
    callbackUrl: config.callbackUrl,
    mode: config.isConfigured ? (config.isProduction ? 'live' : 'sandbox') : 'simulated'
  });
});

// API: Diagnostic tool to verify live connectivity with Safaricom Daraja
app.get("/api/mpesa/diagnostics", async (_req, res) => {
  const config = getMpesaConfig();

  const diagnostics: Record<string, any> = {
    configuredEnvironment: config.env,
    configuredBaseUrl: config.baseUrl,
    shortcode: config.shortcode || '(Not set)',
    callbackUrl: config.callbackUrl,
    hasConsumerKey: Boolean(config.consumerKey),
    consumerKeyLength: config.consumerKey?.length || 0,
    hasConsumerSecret: Boolean(config.consumerSecret),
    consumerSecretLength: config.consumerSecret?.length || 0,
    hasPasskey: Boolean(config.passkey),
    passkeyLength: config.passkey?.length || 0,
    oauthTest: {
      status: 'pending',
      message: ''
    }
  };

  if (!config.isConfigured) {
    diagnostics.oauthTest = {
      status: 'NOT_CONFIGURED',
      message: 'MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET are not set in environment.'
    };
    res.json(diagnostics);
    return;
  }

  try {
    const auth = await getDarajaAccessToken(config);
    diagnostics.resolvedEnvironment = auth.isSandbox ? 'sandbox' : 'production';
    diagnostics.activeBaseUrl = auth.activeBaseUrl;
    diagnostics.effectiveShortcode = auth.effectiveShortcode;
    diagnostics.oauthTest = {
      status: 'CONNECTED',
      message: `Successfully connected to Safaricom (${auth.activeBaseUrl})! Access token generated.`,
      isSandbox: auth.isSandbox,
      note: auth.note,
      tokenPreview: `${auth.accessToken.substring(0, 6)}...${auth.accessToken.substring(auth.accessToken.length - 4)}`
    };
  } catch (err: any) {
    diagnostics.oauthTest = {
      status: 'AUTHENTICATION_FAILED',
      message: err.message || 'Authentication error with Daraja.',
      suggestion: 'Please check your Consumer Key and Consumer Secret in Settings.'
    };
  }

  res.json(diagnostics);
});

// API: Trigger M-Pesa STK Push
app.post("/api/mpesa/stkpush", async (req, res) => {
  try {
    const { phoneNumber, amount, accountReference = 'TriarchVentures', transactionDesc = 'Architectural Consultation' } = req.body;

    if (!phoneNumber || !amount) {
      res.status(400).json({ error: "Missing required fields: phoneNumber and amount are required." });
      return;
    }

    const formattedPhone = formatKenyanPhone(String(phoneNumber));
    if (!/^254(7|1)\d{8}$/.test(formattedPhone)) {
      res.status(400).json({
        error: "Invalid Kenyan phone number format. Please provide a valid Safaricom/Kenyan number (e.g. 0712345678 or 254712345678)."
      });
      return;
    }

    const numericAmount = Math.max(1, Math.round(Number(amount)));
    const config = getMpesaConfig();

    // IF DARAJA CREDENTIALS ARE PROVIDED: Call Safaricom Live / Sandbox Daraja API
    if (config.isConfigured) {
      try {
        const auth = await getDarajaAccessToken(config);
        const timestamp = getDarajaTimestamp();
        const password = Buffer.from(`${auth.effectiveShortcode}${auth.effectivePasskey}${timestamp}`).toString('base64');

        const payload = {
          BusinessShortCode: auth.effectiveShortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: numericAmount,
          PartyA: formattedPhone,
          PartyB: auth.effectiveShortcode,
          PhoneNumber: formattedPhone,
          CallBackURL: config.callbackUrl,
          AccountReference: accountReference.substring(0, 12),
          TransactionDesc: transactionDesc.substring(0, 30)
        };

        const darajaRes = await fetch(`${auth.activeBaseUrl}/mpesa/stkpush/v1/processrequest`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const darajaData = await darajaRes.json() as {
          MerchantRequestID?: string;
          CheckoutRequestID?: string;
          ResponseCode?: string;
          ResponseDescription?: string;
          CustomerMessage?: string;
          errorCode?: string;
          errorMessage?: string;
        };

        if (darajaData.ResponseCode === "0" && darajaData.CheckoutRequestID) {
          transactionsStore.set(darajaData.CheckoutRequestID, {
            checkoutRequestId: darajaData.CheckoutRequestID,
            merchantRequestId: darajaData.MerchantRequestID || '',
            phoneNumber: formattedPhone,
            amount: numericAmount,
            accountReference,
            status: 'PENDING',
            createdAt: Date.now()
          });

          // In sandbox mode, real consumer phones cannot receive physical SIM popups.
          // We provide sandbox controls and an optional auto-confirmation after 6 seconds so testing is seamless!
          if (auth.isSandbox) {
            setTimeout(() => {
              const tx = transactionsStore.get(darajaData.CheckoutRequestID!);
              if (tx && tx.status === 'PENDING') {
                tx.status = 'COMPLETED';
                tx.receiptNumber = `NL${Math.floor(10000000 + Math.random() * 90000000)}`;
                tx.completedAt = Date.now();
              }
            }, 6500);
          }

          res.json({
            success: true,
            mode: auth.isSandbox ? 'sandbox' : 'live',
            isSimulated: auth.isSandbox,
            checkoutRequestId: darajaData.CheckoutRequestID,
            merchantRequestId: darajaData.MerchantRequestID,
            customerMessage: auth.isSandbox
              ? `[Safaricom Sandbox] STK Request accepted (${darajaData.CheckoutRequestID}). Enter PIN on test simulator or wait 6s for sandbox auto-completion.`
              : (darajaData.CustomerMessage || "Please enter your M-Pesa PIN on your phone to complete payment."),
            phoneNumber: formattedPhone,
            amount: numericAmount,
            note: auth.note
          });
          return;
        } else {
          res.status(400).json({
            error: darajaData.errorMessage || darajaData.ResponseDescription || "Safaricom rejected the STK push request.",
            details: darajaData
          });
          return;
        }
      } catch (darajaErr: any) {
        console.error("Daraja API call failed:", darajaErr);
        res.status(502).json({
          error: `Daraja API communication error: ${darajaErr.message || 'Check network connection'}`
        });
        return;
      }
    }

    // IF DARAJA CREDENTIALS ARE NOT YET SET:
    // Run an authentic interactive Developer Simulation Mode
    // This allows testing the complete STK prompt, countdown timer, PIN entry simulation, and receipt generation
    const mockCheckoutId = `ws_CO_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const mockMerchantId = `MCH_${Date.now()}`;

    transactionsStore.set(mockCheckoutId, {
      checkoutRequestId: mockCheckoutId,
      merchantRequestId: mockMerchantId,
      phoneNumber: formattedPhone,
      amount: numericAmount,
      accountReference,
      status: 'PENDING',
      createdAt: Date.now()
    });

    // Automatically simulate user completing PIN authorization after 5 seconds
    setTimeout(() => {
      const tx = transactionsStore.get(mockCheckoutId);
      if (tx && tx.status === 'PENDING') {
        const randomReceipt = `NL${Math.floor(10 + Math.random() * 89)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(100 + Math.random() * 900)}X${Math.floor(1 + Math.random() * 9)}`;
        tx.status = 'COMPLETED';
        tx.receiptNumber = randomReceipt;
        tx.transactionDate = new Date().toISOString();
        tx.resultDesc = "The service request is processed successfully.";
        transactionsStore.set(mockCheckoutId, tx);
      }
    }, 5500);

    res.json({
      success: true,
      mode: 'simulated',
      checkoutRequestId: mockCheckoutId,
      merchantRequestId: mockMerchantId,
      customerMessage: `[Sandbox Demo] STK Push sent to ${formattedPhone}. In live mode, prompt appears on phone. PIN confirmation simulating in 5 seconds...`,
      phoneNumber: formattedPhone,
      amount: numericAmount,
      isSimulated: true,
      note: "To connect real M-Pesa payments, configure MPESA_CONSUMER_KEY & MPESA_CONSUMER_SECRET in Settings."
    });
  } catch (err: any) {
    console.error("STK Push error:", err);
    res.status(500).json({ error: err.message || "Internal server error processing STK push" });
  }
});

// API: Safaricom Webhook Callback
app.post("/api/mpesa/callback", (req, res) => {
  try {
    const callbackData = req.body?.Body?.stkCallback;

    if (callbackData) {
      const checkoutRequestId = callbackData.CheckoutRequestID;
      const resultCode = callbackData.ResultCode;
      const resultDesc = callbackData.ResultDesc;

      const tx = transactionsStore.get(checkoutRequestId);

      if (tx) {
        if (resultCode === 0) {
          tx.status = 'COMPLETED';
          tx.resultDesc = resultDesc;

          // Extract metadata items (Receipt number, Date, etc.)
          const items = callbackData.CallbackMetadata?.Item || [];
          for (const item of items) {
            if (item.Name === 'MpesaReceiptNumber') {
              tx.receiptNumber = String(item.Value);
            } else if (item.Name === 'TransactionDate') {
              tx.transactionDate = String(item.Value);
            }
          }
        } else if (resultCode === 1032) {
          tx.status = 'CANCELLED';
          tx.resultDesc = 'Transaction was cancelled by customer.';
        } else {
          tx.status = 'FAILED';
          tx.resultDesc = resultDesc || 'Transaction failed.';
        }

        transactionsStore.set(checkoutRequestId, tx);
      }
    }

    // Always respond to Safaricom with 200 OK and Accepted
    res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("Callback processing error:", err);
    res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted with warnings" });
  }
});

// API: Poll status of a specific checkout request
app.get("/api/mpesa/status/:checkoutRequestId", (req, res) => {
  const { checkoutRequestId } = req.params;
  const tx = transactionsStore.get(checkoutRequestId);

  if (!tx) {
    res.status(404).json({ error: "Transaction not found or expired." });
    return;
  }

  res.json({
    checkoutRequestId: tx.checkoutRequestId,
    status: tx.status,
    receiptNumber: tx.receiptNumber,
    transactionDate: tx.transactionDate,
    amount: tx.amount,
    phoneNumber: tx.phoneNumber,
    resultDesc: tx.resultDesc
  });
});

// API: Manual simulation trigger for testing error/cancel cases
app.post("/api/mpesa/simulate-action", (req, res) => {
  const { checkoutRequestId, action } = req.body;
  const tx = transactionsStore.get(checkoutRequestId);

  if (!tx) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }

  if (action === 'cancel') {
    tx.status = 'CANCELLED';
    tx.resultDesc = 'User entered wrong PIN or cancelled request on handset.';
  } else if (action === 'complete') {
    tx.status = 'COMPLETED';
    tx.receiptNumber = `NL${Math.floor(10000 + Math.random() * 90000)}KES`;
    tx.transactionDate = new Date().toISOString();
    tx.resultDesc = 'Service request processed successfully.';
  }

  transactionsStore.set(checkoutRequestId, tx);
  res.json({ success: true, transaction: tx });
});

// Vite middleware & Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Triarch Ventures Server & Daraja API active on port ${PORT}`);
  });
}

startServer();
