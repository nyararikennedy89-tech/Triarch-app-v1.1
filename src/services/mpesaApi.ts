export interface MpesaConfigResponse {
  configured: boolean;
  environment: string;
  shortcode: string;
  callbackUrl: string;
  mode: 'live' | 'sandbox' | 'simulated';
}

export interface StkPushResponse {
  success: boolean;
  mode: 'live' | 'simulated';
  checkoutRequestId: string;
  merchantRequestId?: string;
  customerMessage: string;
  phoneNumber: string;
  amount: number;
  isSimulated?: boolean;
  note?: string;
  error?: string;
}

export interface MpesaStatusResponse {
  checkoutRequestId: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'FAILED';
  receiptNumber?: string;
  transactionDate?: string;
  amount: number;
  phoneNumber: string;
  resultDesc?: string;
  error?: string;
}

export async function fetchMpesaConfig(): Promise<MpesaConfigResponse> {
  try {
    const res = await fetch('/api/mpesa/config');
    if (!res.ok) {
      throw new Error(`Failed to load M-Pesa config (${res.status})`);
    }
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch M-Pesa config:', err);
    return {
      configured: false,
      environment: 'sandbox',
      shortcode: '174379',
      callbackUrl: '',
      mode: 'simulated'
    };
  }
}

export async function initiateMpesaStkPush(params: {
  phoneNumber: string;
  amount: number;
  accountReference?: string;
  transactionDesc?: string;
}): Promise<StkPushResponse> {
  const res = await fetch('/api/mpesa/stkpush', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to initiate M-Pesa STK Push');
  }

  return data;
}

export async function checkMpesaTransactionStatus(checkoutRequestId: string): Promise<MpesaStatusResponse> {
  const res = await fetch(`/api/mpesa/status/${encodeURIComponent(checkoutRequestId)}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to check transaction status');
  }

  return data;
}

export async function triggerSimulatedAction(checkoutRequestId: string, action: 'complete' | 'cancel'): Promise<void> {
  await fetch('/api/mpesa/simulate-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ checkoutRequestId, action })
  });
}
