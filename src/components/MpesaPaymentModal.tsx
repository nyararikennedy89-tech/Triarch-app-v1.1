import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCw,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import {
  fetchMpesaConfig,
  initiateMpesaStkPush,
  checkMpesaTransactionStatus,
  triggerSimulatedAction,
  MpesaConfigResponse
} from '../services/mpesaApi';
import { siteConfig } from '../config/siteConfig';

interface MpesaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
  initialDescription?: string;
  initialPhone?: string;
  initialClientName?: string;
}

const RETAINER_PACKAGES = [
  {
    id: 'consultation',
    title: 'Initial Architectural Consultation',
    description: '1-on-1 discovery briefing with Principal Architect (in-person or virtual).',
    amount: 5000
  },
  {
    id: 'site_visit',
    title: 'Site Reconnaissance & Zoning Audit',
    description: 'On-site land inspection, slope & soil reconnaissance, and zoning check.',
    amount: 15000
  },
  {
    id: 'feasibility',
    title: 'Statutory Feasibility & Concept Draft',
    description: 'County approvals roadmap, spatial massing options, and cost budget.',
    amount: 35000
  },
  {
    id: 'custom',
    title: 'Custom Retainer / Deposit',
    description: 'Enter an exact retainer or milestone fee agreed upon with the studio.',
    amount: 10000
  }
];

export const MpesaPaymentModal: React.FC<MpesaPaymentModalProps> = ({
  isOpen,
  onClose,
  initialAmount,
  initialDescription,
  initialPhone = '',
  initialClientName = ''
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialAmount ? 'custom' : 'consultation'
  );
  const [amount, setAmount] = useState<number>(initialAmount || 5000);
  const [phone, setPhone] = useState<string>(initialPhone);
  const [clientName, setClientName] = useState<string>(initialClientName);
  const [accountRef, setAccountRef] = useState<string>('TriarchStudio');

  // Gateway status
  const [gatewayConfig, setGatewayConfig] = useState<MpesaConfigResponse | null>(null);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  // Transaction state
  const [status, setStatus] = useState<'IDLE' | 'INITIATING' | 'WAITING_PIN' | 'COMPLETED' | 'CANCELLED' | 'FAILED'>('IDLE');
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [isSimulatedMode, setIsSimulatedMode] = useState<boolean>(false);

  const pollingTimerRef = useRef<any>(null);
  const countdownTimerRef = useRef<any>(null);

  // Load config on open
  useEffect(() => {
    if (isOpen) {
      setIsLoadingConfig(true);
      fetchMpesaConfig()
        .then((cfg) => {
          setGatewayConfig(cfg);
          setIsSimulatedMode(cfg.mode === 'simulated');
        })
        .finally(() => setIsLoadingConfig(false));

      // Reset state if closed earlier
      setStatus('IDLE');
      setCheckoutRequestId(null);
      setReceiptNumber(null);
      setErrorMessage(null);
      setCountdown(60);
      if (initialAmount) setAmount(initialAmount);
      if (initialPhone) setPhone(initialPhone);
    }

    return () => {
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [isOpen, initialAmount, initialPhone]);

  // Clean polling
  const stopPolling = () => {
    if (pollingTimerRef.current) {
      clearInterval(pollingTimerRef.current);
      pollingTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  };

  // Poll status when in WAITING_PIN state
  useEffect(() => {
    if (status === 'WAITING_PIN' && checkoutRequestId) {
      // Start countdown
      setCountdown(60);
      countdownTimerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            stopPolling();
            setStatus('FAILED');
            setErrorMessage('Handset request timed out. If you received the prompt, check your M-Pesa SMS for confirmation.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Start status polling
      pollingTimerRef.current = setInterval(async () => {
        try {
          const res = await checkMpesaTransactionStatus(checkoutRequestId);
          if (res.status === 'COMPLETED') {
            stopPolling();
            setStatus('COMPLETED');
            setReceiptNumber(res.receiptNumber || `NL${Math.floor(10000 + Math.random() * 90000)}`);
          } else if (res.status === 'CANCELLED') {
            stopPolling();
            setStatus('CANCELLED');
            setErrorMessage(res.resultDesc || 'Payment was cancelled on the phone handset.');
          } else if (res.status === 'FAILED') {
            stopPolling();
            setStatus('FAILED');
            setErrorMessage(res.resultDesc || 'Payment authorization failed.');
          }
        } catch (err) {
          console.warn('Status check error:', err);
        }
      }, 2000);
    }

    return () => stopPolling();
  }, [status, checkoutRequestId]);

  if (!isOpen) return null;

  const handleSelectPackage = (pkg: typeof RETAINER_PACKAGES[0]) => {
    setSelectedPackageId(pkg.id);
    if (pkg.id !== 'custom') {
      setAmount(pkg.amount);
    }
  };

  const handleInitiateSTK = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic format validation
    const cleanedPhone = phone.replace(/[^0-9]/g, '');
    if (cleanedPhone.length < 9) {
      setErrorMessage('Please enter a valid Kenyan Safaricom phone number (e.g. 0712 345 678).');
      return;
    }

    if (amount < 10) {
      setErrorMessage('Minimum M-Pesa transaction amount is KES 10.');
      return;
    }

    setStatus('INITIATING');

    try {
      const response = await initiateMpesaStkPush({
        phoneNumber: phone,
        amount,
        accountReference: accountRef || 'TriarchStudio',
        transactionDesc: initialDescription || 'Architectural Retainer'
      });

      if (response.success && response.checkoutRequestId) {
        setCheckoutRequestId(response.checkoutRequestId);
        setIsSimulatedMode(Boolean(response.isSimulated));
        setStatus('WAITING_PIN');
      } else {
        setStatus('FAILED');
        setErrorMessage(response.error || 'Failed to trigger M-Pesa prompt.');
      }
    } catch (err: any) {
      setStatus('FAILED');
      setErrorMessage(err.message || 'Error communicating with Daraja M-Pesa gateway.');
    }
  };

  const handleCopyReceipt = () => {
    if (!receiptNumber) return;
    navigator.clipboard.writeText(receiptNumber);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 3000);
  };

  const handleWhatsAppReceipt = () => {
    const text = encodeURIComponent(
      `Hello Triarch Ventures,\n\nI have just completed an M-Pesa retainer payment:\n- Name: ${clientName || 'Private Client'}\n- Receipt Code: ${receiptNumber}\n- Amount: KES ${amount.toLocaleString()}\n- Reference: ${accountRef}\n- Phone: ${phone}\n\nPlease confirm our architectural consultation booking.`
    );
    window.open(`https://wa.me/${siteConfig.contact.whatsAppPhone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleSimulateApproval = async () => {
    if (!checkoutRequestId) return;
    try {
      await triggerSimulatedAction(checkoutRequestId, 'complete');
      const res = await checkMpesaTransactionStatus(checkoutRequestId);
      stopPolling();
      setStatus('COMPLETED');
      setReceiptNumber(res.receiptNumber || `NL${Math.floor(10000 + Math.random() * 90000)}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSimulateCancel = async () => {
    if (!checkoutRequestId) return;
    try {
      await triggerSimulatedAction(checkoutRequestId, 'cancel');
      stopPolling();
      setStatus('CANCELLED');
      setErrorMessage('User entered incorrect PIN or cancelled request on handset.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={status === 'WAITING_PIN' ? undefined : onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 25 }}
          className="relative w-full max-w-xl bg-white dark:bg-[#1A1B1A] rounded-3xl z-10 border border-[#ECECEC] dark:border-white/10 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col justify-between"
        >
          {/* Top Bar with Safaricom Brand Identity */}
          <div className="bg-[#00843D] text-white px-6 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Safaricom M-Pesa Emblem */}
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#00843D] font-extrabold text-sm shadow-inner tracking-tighter">
                M
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-100 flex items-center gap-1.5">
                  <span>Lipa Na M-PESA</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="text-[10px] bg-white/20 px-2 py-0.2 rounded-full">Online STK Push</span>
                </div>
                <h3 className="text-sm sm:text-base font-heading font-extrabold tracking-tight text-white leading-tight">
                  Daraja Payment Gateway
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={status === 'INITIATING'}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/35 text-white transition-all cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
            {/* STATE 1: IDLE / FORM INPUT */}
            {(status === 'IDLE' || status === 'INITIATING') && (
              <form onSubmit={handleInitiateSTK} className="space-y-5">
                {/* Package Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] dark:text-gray-200 uppercase tracking-wider mb-2.5">
                    Select Retainer Service or Deposit
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {RETAINER_PACKAGES.map((pkg) => {
                      const isSelected = selectedPackageId === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => handleSelectPackage(pkg)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#00843D] bg-[#00843D]/5 dark:bg-[#00843D]/15 ring-2 ring-[#00843D]/20 shadow-sm'
                              : 'border-gray-200 dark:border-white/10 bg-gray-50/70 dark:bg-[#141514] hover:border-gray-400'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#1C1C1C] dark:text-white leading-tight">
                                {pkg.title}
                              </span>
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-[#00843D] bg-[#00843D]' : 'border-gray-400'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </div>
                            <p className="text-[11px] text-[#666666] dark:text-gray-400 mt-1 leading-snug">
                              {pkg.description}
                            </p>
                          </div>
                          <div className="mt-2.5 font-mono text-xs font-extrabold text-[#00843D] dark:text-emerald-400">
                            {pkg.id === 'custom' ? 'Variable' : `KES ${pkg.amount.toLocaleString()}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount Field (if custom selected) */}
                {selectedPackageId === 'custom' && (
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] dark:text-gray-200 uppercase tracking-wider mb-1.5">
                      Enter Custom Amount (KES) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-gray-500">
                        KES
                      </span>
                      <input
                        type="number"
                        min={10}
                        step={100}
                        required
                        value={amount || ''}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="e.g. 25000"
                        className="w-full pl-14 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#141514] border border-gray-200 dark:border-white/10 text-sm font-mono font-bold text-[#1C1C1C] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00843D]"
                      />
                    </div>
                  </div>
                )}

                {/* Phone & Client Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] dark:text-gray-200 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>M-Pesa Phone Number *</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#00843D] flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0712 345 678 or 254..."
                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-gray-50 dark:bg-[#141514] border border-gray-200 dark:border-white/10 text-xs font-mono font-semibold text-[#1C1C1C] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00843D]"
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1 block">
                      Supports formats: 07XX, 01XX, or +254...
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] dark:text-gray-200 uppercase tracking-wider mb-1.5">
                      Client / Project Name
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Richard Otieno"
                      className="w-full px-3 py-3 rounded-xl bg-gray-50 dark:bg-[#141514] border border-gray-200 dark:border-white/10 text-xs font-medium text-[#1C1C1C] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00843D]"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Payment Summary Box */}
                <div className="p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#121312] border border-[#ECECEC] dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#666666] dark:text-gray-400 uppercase tracking-widest block">
                      Total Payable to Studio Paybill
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-[#1C1C1C] dark:text-white">
                      KES {amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-gray-500 block">Shortcode: 174379</span>
                    <span className="text-[10px] font-mono text-[#00843D] font-bold">Lipa Na M-Pesa Online</span>
                  </div>
                </div>

                {/* Submit STK Button */}
                <button
                  type="submit"
                  disabled={status === 'INITIATING' || !phone || amount <= 0}
                  className="w-full py-4 rounded-full bg-[#00843D] hover:bg-[#007033] disabled:opacity-50 text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {status === 'INITIATING' ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Contacting Safaricom Daraja...</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>Send M-Pesa STK Push (KES {amount.toLocaleString()})</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00843D]" />
                    256-bit SSL Encrypted
                  </span>
                  <span>•</span>
                  <span>Instant SMS Confirmation</span>
                  <span>•</span>
                  <span>Official Safaricom Receipt</span>
                </div>
              </form>
            )}

            {/* STATE 2: WAITING FOR USER PIN (HANDSET PROMPT ACTIVE) */}
            {status === 'WAITING_PIN' && (
              <div className="py-4 text-center space-y-6">
                {/* Animated Phone Handset Mockup */}
                <div className="relative mx-auto w-44 h-72 sm:w-52 sm:h-80 rounded-[32px] bg-gray-900 border-4 border-gray-700 shadow-2xl p-3 flex flex-col justify-between overflow-hidden">
                  {/* Speaker notch */}
                  <div className="w-16 h-2 bg-gray-800 rounded-full mx-auto" />

                  {/* STK Popup on Screen */}
                  <div className="my-auto bg-[#00843D] text-white p-3 rounded-2xl shadow-lg text-left space-y-2 animate-pulse">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-200">
                      <span>M-PESA MENU</span>
                      <span>PIN PROMPT</span>
                    </div>
                    <div className="text-[11px] leading-tight font-medium">
                      Do you want to pay <strong>KES {amount.toLocaleString()}</strong> to <strong>Triarch Ventures (174379)</strong>?
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg text-[10px] font-mono text-center font-bold tracking-widest">
                      • • • •
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="text-[9px] font-mono text-gray-400 text-center">
                    Enter M-Pesa PIN on phone
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-heading font-extrabold text-[#1C1C1C] dark:text-white">
                    Check Your Phone Screen Now
                  </h4>
                  <p className="text-xs text-[#555555] dark:text-gray-300 mt-1 max-w-sm mx-auto leading-relaxed">
                    Safaricom has sent an STK prompt to <strong className="font-mono text-[#00843D]">{phone}</strong>. Enter your secret M-Pesa PIN to authorize <strong>KES {amount.toLocaleString()}</strong>.
                  </p>
                </div>

                {/* Countdown & Radar */}
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-500">
                  <Clock className="w-4 h-4 text-[#00843D] animate-spin" />
                  <span>Waiting for authorization ({countdown}s)</span>
                </div>

                {/* Developer Simulation Controls (when in sandbox test mode) */}
                {isSimulatedMode && (
                  <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-left space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                      <Sparkles className="w-4 h-4" />
                      <span>Developer Sandbox Controls</span>
                    </div>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-snug">
                      Auto-approving simulated PIN in 5 seconds, or click below to test immediate responses:
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleSimulateApproval}
                        className="px-3 py-1.5 rounded-lg bg-[#00843D] text-white text-[11px] font-bold cursor-pointer hover:bg-[#007033]"
                      >
                        ✓ Simulate Customer Entered PIN
                      </button>
                      <button
                        type="button"
                        onClick={handleSimulateCancel}
                        className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-bold cursor-pointer hover:bg-red-700"
                      >
                        ✕ Simulate Cancel/Timeout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STATE 3: PAYMENT COMPLETED (OFFICIAL M-PESA RECEIPT) */}
            {status === 'COMPLETED' && (
              <div className="py-6 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-[#00843D] dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-50 dark:ring-emerald-950/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-[#00843D] uppercase tracking-widest bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-full">
                    Payment Verified & Confirmed
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1C1C1C] dark:text-white mt-3">
                    M-Pesa Retainer Received!
                  </h3>
                  <p className="text-xs text-[#555555] dark:text-gray-300 mt-1 max-w-md mx-auto leading-relaxed">
                    Thank you, {clientName || 'valued client'}. Your architectural retainer of <strong>KES {amount.toLocaleString()}</strong> has been successfully credited to Triarch Ventures.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] dark:bg-[#121312] border border-[#ECECEC] dark:border-white/10 text-left space-y-2.5 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-white/10">
                    <span className="text-gray-500 font-medium">M-Pesa Receipt Code:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-[#00843D] text-sm">
                        {receiptNumber}
                      </span>
                      <button
                        onClick={handleCopyReceipt}
                        className="p-1 rounded bg-gray-200 dark:bg-white/10 hover:bg-gray-300 text-gray-700 dark:text-gray-200 cursor-pointer"
                        title="Copy Receipt"
                      >
                        {copiedReceipt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Amount Paid:</span>
                    <span className="font-mono font-bold text-[#1C1C1C] dark:text-white">KES {amount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Phone Number:</span>
                    <span className="font-mono text-[#1C1C1C] dark:text-white">{phone}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Business Paybill:</span>
                    <span className="font-mono text-[#1C1C1C] dark:text-white">174379 (Triarch Ventures)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Timestamp:</span>
                    <span className="font-mono text-gray-600 dark:text-gray-300">{new Date().toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleWhatsAppReceipt}
                    className="w-full sm:w-auto bg-[#00843D] hover:bg-[#007033] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Receipt via WhatsApp</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto bg-[#1C1C1C] dark:bg-white text-white dark:text-[#1C1C1C] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            )}

            {/* STATE 4: FAILED OR CANCELLED */}
            {(status === 'CANCELLED' || status === 'FAILED') && (
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="text-xl font-heading font-extrabold text-[#1C1C1C] dark:text-white">
                    {status === 'CANCELLED' ? 'M-Pesa Transaction Cancelled' : 'Payment Authorization Failed'}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
                    {errorMessage || 'The transaction could not be completed. Please ensure your handset is turned on, has sufficient balance, and correct PIN is entered.'}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setStatus('IDLE');
                      setErrorMessage(null);
                    }}
                    className="bg-[#00843D] hover:bg-[#007033] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={onClose}
                    className="border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Notice with Integration Info */}
          <div className="bg-gray-50 dark:bg-[#131413] border-t border-[#ECECEC] dark:border-white/10 px-6 py-3 flex items-center justify-between text-[11px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#00843D]" />
              <span>
                {gatewayConfig?.configured
                  ? `Daraja Live Mode • Shortcode: ${gatewayConfig.shortcode}`
                  : 'Safaricom Daraja API Ready • Sandbox Shortcode: 174379'}
              </span>
            </div>
            <span className="font-mono text-[10px]">v2.1 Lipa Na M-Pesa</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
