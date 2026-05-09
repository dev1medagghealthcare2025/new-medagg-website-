import { useCallback, useEffect, useRef, useState } from 'react';
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
} from 'firebase/auth';
import { auth } from '../config/firebase';

const toE164India = (phone) => {
  const cleaned = String(phone || '').replace(/\D/g, '').slice(-10);
  if (cleaned.length !== 10) return null;
  return `+91${cleaned}`;
};

export const usePhoneVerification = () => {
  const recaptchaRef = useRef(null);
  const verifierRef = useRef(null);
  const widgetIdRef = useRef(null);

  const [verificationId, setVerificationId] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const createVerifier = useCallback(async () => {
    if (!recaptchaRef.current) return null;

    try {
      // Clear old verifier/widget to prevent stale tokens
      if (verifierRef.current && typeof verifierRef.current.clear === 'function') {
        verifierRef.current.clear();
      }
    } catch {}

    try {
      recaptchaRef.current.innerHTML = '';
    } catch {}

    verifierRef.current = new RecaptchaVerifier(auth, recaptchaRef.current, {
      size: 'invisible',
      callback: () => {},
      'expired-callback': () => {
        try {
          if (widgetIdRef.current != null && window.grecaptcha) {
            window.grecaptcha.reset(widgetIdRef.current);
          }
        } catch {}
      },
    });

    try {
      widgetIdRef.current = await verifierRef.current.render();
    } catch {}

    return verifierRef.current;
  }, []);

  useEffect(() => {
    // attempt init once modal mounts
    createVerifier();
  }, [createVerifier]);

  const sendOtp = useCallback(async (phone) => {
    setError('');
    setIsSending(true);
    setIsVerified(false);

    const e164 = toE164India(phone);
    if (!e164) {
      setError('Enter valid 10-digit phone number');
      setIsSending(false);
      return false;
    }

    // Wait for reCAPTCHA to be fully ready
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const verifier = await createVerifier();
      if (!verifier) {
        setError('reCAPTCHA not ready. Please try again.');
        setIsSending(false);
        return false;
      }
      console.log('[OTP] Verifier created, sending to:', e164);

      try {
        if (widgetIdRef.current != null && window.grecaptcha) {
          window.grecaptcha.reset(widgetIdRef.current);
        }
      } catch {}

      const result = await signInWithPhoneNumber(auth, e164, verifier);
      setVerificationId(result.verificationId);
      setIsSending(false);
      return true;
    } catch (err) {
      console.error('[OTP] Send failed:', err?.code, err?.message, err);
      setError(
        err?.code === 'auth/argument-error'
          ? 'OTP service not ready (reCAPTCHA). Please refresh and try again.'
          : err?.code === 'auth/invalid-app-credential'
          ? 'reCAPTCHA verification failed. Disable ad-block/Brave shields and ensure this domain is added in Firebase Authorized domains.'
          : err?.code === 'auth/configuration-not-found'
          ? 'Firebase Phone sign-in is not enabled for this project. Enable Authentication → Sign-in method → Phone, then try again.'
          : err?.code === 'auth/unauthorized-domain'
          ? 'This domain is not authorized in Firebase. Add it in Authentication → Settings → Authorized domains.'
          : 'OTP sending failed. Please try again.'
      );
      setIsSending(false);
      return false;
    }
  }, [createVerifier]);

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
      setIsVerifying(false);
      return true;
    } catch (err) {
      console.error('verifyOtp error', err);
      setError('Invalid OTP. Please try again.');
      setIsVerifying(false);
      return false;
    }
  }, [verificationId]);

  const reset = useCallback(() => {
    setVerificationId('');
    setIsSending(false);
    setIsVerifying(false);
    setError('');
    setIsVerified(false);
  }, []);

  return {
    recaptchaRef,
    sendOtp,
    verifyOtp,
    reset,
    isSending,
    isVerifying,
    isVerified,
    error,
    hasVerificationId: !!verificationId,
  };
};

export default usePhoneVerification;
