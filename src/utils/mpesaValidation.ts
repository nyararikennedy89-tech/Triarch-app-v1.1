/**
 * Safaricom M-Pesa Phone Number Validation & Formatting Utility
 * Enforces standard Safaricom / Kenyan mobile format (e.g. 254XXXXXXXXX) for Daraja STK Push.
 */

export interface MpesaValidationResult {
  isValid: boolean;
  normalized: string; // Exactly 12-digit format e.g. "254712345678"
  formattedDisplay: string; // e.g. "+254 712 345 678"
  isSafaricom: boolean;
  networkName: string;
  message: string;
  status: 'empty' | 'invalid' | 'warning' | 'valid';
}

/**
 * Safaricom mobile prefixes in Kenya:
 * - 0700-0709 (25470X)
 * - 0710-0719 (25471X)
 * - 0720-0729 (25472X)
 * - 0740-0743, 0745, 0746, 0748 (25474X)
 * - 0757-0759 (254757, 254758, 254759)
 * - 0768-0769 (254768, 254769)
 * - 0790-0799 (25479X)
 * - 0110-0115 (25411X)
 */
const SAFARICOM_PREFIX_REGEX = /^254(7(0[0-9]|1[0-9]|2[0-9]|4[0-3568]|5[7-9]|6[8-9]|9[0-9])|11[0-5])\d{6}$/;

/**
 * Strips formatting characters and normalizes Kenyan phone numbers to 254XXXXXXXXX
 */
export function normalizeKenyanPhone(input: string): string {
  if (!input) return '';
  // Remove non-digit characters except leading plus if any
  const cleaned = input.trim().replace(/[^0-9]/g, '');

  if (cleaned.startsWith('254') && cleaned.length >= 12) {
    return cleaned.slice(0, 12);
  }

  if (cleaned.startsWith('0') && cleaned.length >= 10) {
    return '254' + cleaned.slice(1, 10);
  }

  if ((cleaned.startsWith('7') || cleaned.startsWith('1')) && cleaned.length === 9) {
    return '254' + cleaned;
  }

  // If user typed 0 followed by 9 digits
  if (cleaned.startsWith('0')) {
    return '254' + cleaned.slice(1);
  }

  // If user typed 7 or 1 without leading 0
  if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
    return '254' + cleaned;
  }

  return cleaned;
}

/**
 * Formats a 12-digit normalized phone number into readable +254 7XX XXX XXX
 */
export function formatPhoneDisplay(normalized: string): string {
  if (!normalized || normalized.length < 12) return normalized;
  const country = normalized.slice(0, 3); // 254
  const prefix = normalized.slice(3, 6);  // 712 or 112
  const part1 = normalized.slice(6, 9);   // 345
  const part2 = normalized.slice(9, 12);  // 678
  return `+${country} ${prefix} ${part1} ${part2}`;
}

/**
 * Real-time validator for Safaricom M-Pesa phone numbers
 */
export function validateMpesaPhoneNumber(rawInput: string): MpesaValidationResult {
  const trimmed = rawInput.trim();
  const digitsOnly = trimmed.replace(/[^0-9]/g, '');

  if (!trimmed || digitsOnly.length === 0) {
    return {
      isValid: false,
      normalized: '',
      formattedDisplay: '',
      isSafaricom: false,
      networkName: '',
      message: 'Enter Safaricom number (e.g. 0712 345 678 or 254712345678)',
      status: 'empty'
    };
  }

  // Calculate normalized candidate
  const normalized = normalizeKenyanPhone(trimmed);

  // Check if starts with non-Kenyan prefix
  if (
    !trimmed.startsWith('0') &&
    !trimmed.startsWith('7') &&
    !trimmed.startsWith('1') &&
    !trimmed.startsWith('+254') &&
    !trimmed.startsWith('254')
  ) {
    return {
      isValid: false,
      normalized,
      formattedDisplay: rawInput,
      isSafaricom: false,
      networkName: 'Unknown',
      message: 'Kenyan numbers must begin with 07, 01, or 254 (e.g. 0712 345 678)',
      status: 'invalid'
    };
  }

  // Check digit count
  // Local number (07XXXXXXXX or 01XXXXXXXX) is 10 digits
  // International format (254XXXXXXXXX) is 12 digits
  // 9 digits without leading 0 (7XXXXXXXX or 1XXXXXXXX)
  const isTooShort = normalized.length < 12;
  const isTooLong = digitsOnly.length > 12 || (trimmed.startsWith('0') && digitsOnly.length > 10);

  if (isTooShort) {
    const enteredCount = trimmed.startsWith('0')
      ? digitsOnly.length
      : trimmed.startsWith('254')
      ? digitsOnly.length - 2
      : digitsOnly.length + 1;
    const requiredTotal = 10;
    return {
      isValid: false,
      normalized,
      formattedDisplay: rawInput,
      isSafaricom: false,
      networkName: 'Incomplete',
      message: `Incomplete number: ${enteredCount} of ${requiredTotal} digits entered`,
      status: 'invalid'
    };
  }

  if (isTooLong) {
    return {
      isValid: false,
      normalized,
      formattedDisplay: rawInput,
      isSafaricom: false,
      networkName: 'Invalid Length',
      message: 'Phone number has too many digits (maximum 10 digits for 07/01 or 12 digits for 254...)',
      status: 'invalid'
    };
  }

  // At this point, normalized has exactly 12 digits
  const standardKenyanMobileRegex = /^254(7|1)\d{8}$/;
  if (!standardKenyanMobileRegex.test(normalized)) {
    return {
      isValid: false,
      normalized,
      formattedDisplay: formatPhoneDisplay(normalized),
      isSafaricom: false,
      networkName: 'Invalid Mobile',
      message: 'Must be a valid Kenyan mobile number starting with 07 or 01',
      status: 'invalid'
    };
  }

  // Check Safaricom specific prefix
  const isSafaricom = SAFARICOM_PREFIX_REGEX.test(normalized);
  const formattedDisplay = formatPhoneDisplay(normalized);

  if (isSafaricom) {
    return {
      isValid: true,
      normalized,
      formattedDisplay,
      isSafaricom: true,
      networkName: 'Safaricom M-Pesa',
      message: `Verified Safaricom format: ${normalized}`,
      status: 'valid'
    };
  }

  // If valid Kenyan mobile format but non-standard Safaricom prefix (e.g. Airtel 073x, Telkom 077x, or ported number)
  return {
    isValid: true,
    normalized,
    formattedDisplay,
    isSafaricom: false,
    networkName: 'Kenyan Mobile (M-Pesa)',
    message: `Valid Kenyan mobile format (${normalized}). Ensure line is registered on M-Pesa.`,
    status: 'valid'
  };
}
