import { useCallback, useRef, useState } from 'react';
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { getOtpDomainSetupHint, getOtpHostname, isOtpFriendlyHostname } from '../utils/otpDomainHint';

const RECAPTCHA_CONTAINER_ID = 'medagg-firebase-recaptcha';

let verifierInstance = null;
let widgetId = null;
let renderLock = null;

const toE164India = (phone) => {
  const cleaned = String(phone || '').replace(/\D/g, '').slice(-10);
  if (cleaned.length !== 10) return null;
  return `+91${cleaned}`;
};

const removeRecaptchaContainer = () => {
  const el = document.getElementById(RECAPTCHA_CONTAINER_ID);
  if (el) el.remove();
};

const createRecaptchaContainer = () => {
  removeRecaptchaContainer();
  const el = document.createElement('div');
  el.id = RECAPTCHA_CONTAINER_ID;
  el.style.cssText =
    'position:fixed;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;';
  document.body.appendChild(el);
  return el;
};

const resetRecaptchaWidget = () => {
  try {
    if (widgetId != null && window.grecaptcha) {
      window.grecaptcha.reset(widgetId);
    }
  } catch {}
};

export const destroyRecaptchaVerifier = () => {
  try {
    if (verifierInstance?.clear) {
      verifierInstance.clear();
    }
  } catch {}
  verifierInstance = null;
  widgetId = null;
  renderLock = null;
  removeRecaptchaContainer();
};

const buildRecaptchaVerifier = async () => {
  if (verifierInstance) {
    return verifierInstance;
  }

  if (renderLock) {
    await renderLock;
    return verifierInstance;
  }

  renderLock = (async () => {
    const container = createRecaptchaContainer();

    verifierInstance = new RecaptchaVerifier(auth, container, {
      size: 'invisible',
      callback: () => {},
      'expired-callback': resetRecaptchaWidget,
    });

    widgetId = await verifierInstance.render();
  })();

  try {
    await renderLock;
    return verifierInstance;
  } finally {
    renderLock = null;
  }
};

const mapOtpSendError = (err) => {
  const code = err?.code;
  const msg = String(err?.message || '');

  if (msg.includes('already been rendered')) {
    return 'Verification busy. Please tap Resend OTP.';
  }
  if (code === 'auth/captcha-check-failed') {
    return `Hostname "${getOtpHostname()}" is not allowed. ${getOtpDomainSetupHint()}`;
  }
  if (code === 'auth/invalid-app-credential') {
    return (
      'reCAPTCHA failed. In Firebase → Authentication → reCAPTCHA, set Web to v2 or fix Enterprise key. ' +
      'Add 127.0.0.1 in Authorized domains.'
    );
  }
  if (code === 'auth/too-many-requests') {
    return 'Too many SMS attempts. Wait 30–60 minutes or use another number.';
  }
  if (code === 'auth/configuration-not-found') {
    return 'Enable Phone sign-in in Firebase Authentication.';
  }
  if (code === 'auth/internal-error') {
    return (
      'Firebase could not send OTP. Check Firebase Phone sign-in, Authorized domains, SMS region policy, and reCAPTCHA settings. ' +
      getOtpDomainSetupHint()
    );
  }
  return 'OTP sending failed. Tap Resend OTP.';
};

const sendOtpOnce = async (e164) => {
  destroyRecaptchaVerifier();
  const verifier = await buildRecaptchaVerifier();
  console.log('[OTP] Sending to:', e164);
  return signInWithPhoneNumber(auth, e164, verifier);
};

export const usePhoneVerification = () => {
  const sendInFlightRef = useRef(false);

  const [verificationId, setVerificationId] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [resendBlockedUntil, setResendBlockedUntil] = useState(0);

  const deliverOtp = useCallback(async (phone) => {
    if (sendInFlightRef.current) return false;

    const e164 = toE164India(phone);
    if (!e164) {
      setError('Enter valid 10-digit phone number');
      return false;
    }

    sendInFlightRef.current = true;
    setIsSending(true);
    setError('');

    try {
      const result = await sendOtpOnce(e164);
      setVerificationId(result.verificationId);
      return true;
    } catch (err) {
      console.error('[OTP] Send failed:', err?.code, err?.message, err);
      if (err?.code === 'auth/too-many-requests') {
        setResendBlockedUntil(Date.now() + 5 * 60 * 1000);
      }
      setError(mapOtpSendError(err));
      return false;
    } finally {
      setIsSending(false);
      sendInFlightRef.current = false;
    }
  }, []);

  const sendOtp = useCallback(
    async (phone) => {
      if (!isOtpFriendlyHostname()) {
        setError('Use http://127.0.0.1:5173 and add 127.0.0.1 in Firebase Authorized domains.');
        return false;
      }
      setIsVerified(false);
      return deliverOtp(phone);
    },
    [deliverOtp]
  );

  const verifyOtp = useCallback(async (code) => {
    setError('');
    setIsVerifying(true);

    if (!verificationId) {
      setError('Please request OTP first');
      setIsVerifying(false);
      return false;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, String(code || ''));
      await signInWithCredential(auth, credential);
      setIsVerified(true);
      return true;
    } catch (err) {
      console.error('verifyOtp error', err);
      setError('Invalid OTP. Please try again.');
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, [verificationId]);

  const reset = useCallback(() => {
    setVerificationId('');
    setIsSending(false);
    setIsVerifying(false);
    setError('');
    setIsVerified(false);
    setResendBlockedUntil(0);
    sendInFlightRef.current = false;
    destroyRecaptchaVerifier();
  }, []);

  const resendCooldownSec = Math.max(0, Math.ceil((resendBlockedUntil - Date.now()) / 1000));

  return {
    sendOtp,
    verifyOtp,
    reset,
    isSending,
    isVerifying,
    isVerified,
    error,
    resendCooldownSec,
    hasVerificationId: !!verificationId,
  };
};

export default usePhoneVerification;
