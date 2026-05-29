import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { normalizePhone } from '../utils/phoneVerification';

const TelecrmOtpGateContext = createContext(null);

export const TelecrmOtpGateProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const pendingRef = useRef(null);

  const requestVerification = useCallback(async ({ phone, retry }) => {
    const cleaned = normalizePhone(phone);
    if (!cleaned) {
      throw new Error('Valid phone number is required before submitting');
    }

    // Always require OTP for every TeleCRM lead (no sessionStorage skip)
    return new Promise((resolve, reject) => {
      pendingRef.current = { phone: cleaned, retry, resolve, reject };
      setPhone(cleaned);
      setOpen(true);
    });
  }, []);

  useEffect(() => {
    window.__medaggTelecrmOtpVerify = requestVerification;
    window.__medaggTelecrmOtpReady = true;
    return () => {
      if (window.__medaggTelecrmOtpVerify === requestVerification) {
        delete window.__medaggTelecrmOtpVerify;
      }
      window.__medaggTelecrmOtpReady = false;
    };
  }, [requestVerification]);

  const close = useCallback(() => {
    if (pendingRef.current) {
      pendingRef.current.reject(new Error('OTP verification cancelled'));
      pendingRef.current = null;
    }
    setOpen(false);
    setPhone('');
  }, []);

  const verified = useCallback(async () => {
    const pending = pendingRef.current;
    pendingRef.current = null;
    setOpen(false);
    setPhone('');
    if (!pending) return;

    try {
      const res = await pending.retry();
      pending.resolve(res);
    } catch (err) {
      pending.reject(err);
    }
  }, []);

  const value = useMemo(
    () => ({ open, phone, close, verified, requestVerification }),
    [open, phone, close, verified, requestVerification]
  );

  return React.createElement(
    TelecrmOtpGateContext.Provider,
    { value },
    children
  );
};

export const useTelecrmOtpGate = () => {
  const ctx = useContext(TelecrmOtpGateContext);
  if (!ctx) throw new Error('useTelecrmOtpGate must be used inside TelecrmOtpGateProvider');
  return ctx;
};
