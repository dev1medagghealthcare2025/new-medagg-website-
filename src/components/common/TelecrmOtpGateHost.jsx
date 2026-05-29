import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck } from 'lucide-react';
import usePhoneVerification from '../../hooks/usePhoneVerification';
import { useTelecrmOtpGate } from '../../lib/telecrmOtpGate';
import { OTP_BRAND } from '../../config/otpBranding';

export default function TelecrmOtpGateHost() {
  const { open, phone, close, verified } = useTelecrmOtpGate();
  const [otp, setOtp] = useState('');
  const initializedRef = useRef('');

  const {
    sendOtp,
    verifyOtp,
    isSending,
    isVerifying,
    isVerified,
    error,
    resendCooldownSec,
    hasVerificationId,
    reset,
  } = usePhoneVerification();

  const [, setCooldownTick] = useState(0);
  useEffect(() => {
    if (resendCooldownSec <= 0) return;
    const t = setInterval(() => setCooldownTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldownSec]);

  useEffect(() => {
    if (!open) {
      setOtp('');
      reset();
      initializedRef.current = '';
      return;
    }

    const sessionKey = `${phone}`;
    if (initializedRef.current === sessionKey) return;
    initializedRef.current = sessionKey;

    setOtp('');
    sendOtp(phone);
  }, [open, phone, reset, sendOtp]);

  useEffect(() => {
    if (!isVerified) return;
    const t = setTimeout(() => verified(), 500);
    return () => clearTimeout(t);
  }, [isVerified, verified]);

  const canVerify = useMemo(() => otp.length === 6 && hasVerificationId, [otp, hasVerificationId]);

  useEffect(() => {
    if (open) window.dispatchEvent(new CustomEvent('medagg:otp-gate-open'));
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className='fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm'>
      <div className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden'>
        <div className='bg-gradient-to-r from-[#2d2552] to-[#4a3f8f] px-6 py-5 text-white text-center'>
          <button
            type='button'
            onClick={close}
            className='absolute right-4 top-4 text-white/80 hover:text-white transition-colors'
            aria-label='Close'
          >
            <X size={22} />
          </button>
          <img
            src={OTP_BRAND.logoSrc}
            alt={OTP_BRAND.companyName}
            className='h-10 mx-auto mb-3 object-contain brightness-0 invert'
          />
          <p className='text-xs uppercase tracking-widest text-white/80'>{OTP_BRAND.productName}</p>
          <h3 className='text-xl font-bold mt-1'>{OTP_BRAND.companyName}</h3>
          <p className='text-sm text-white/90 mt-1'>{OTP_BRAND.tagline}</p>
        </div>

        <div className='p-6 space-y-4'>
          <div className='flex items-start gap-3 rounded-xl bg-pink-50 border border-pink-100 px-4 py-3'>
            <ShieldCheck className='w-5 h-5 text-[#ff3576] shrink-0 mt-0.5' />
            <div className='text-sm text-[#2d2552]'>
              <p className='font-semibold'>Verify your mobile number</p>
              <p className='mt-1 text-gray-600'>
                We sent a 6-digit OTP to <span className='font-bold text-[#2d2552]'>+91 {phone}</span>
              </p>
            </div>
          </div>

          {isSending && !hasVerificationId && (
            <p className='text-sm text-center text-gray-500'>Sending OTP…</p>
          )}

          <input
            type='text'
            inputMode='numeric'
            autoComplete='one-time-code'
            value={otp}
            onChange={(e) => setOtp(String(e.target.value || '').replace(/\D/g, '').slice(0, 6))}
            placeholder='Enter 6-digit OTP'
            className='w-full p-4 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition text-center text-2xl tracking-[0.35em] font-bold text-[#2d2552]'
            maxLength={6}
          />

          {error && <p className='text-red-600 text-sm font-medium text-center'>{error}</p>}

          <button
            type='button'
            onClick={() => verifyOtp(otp)}
            disabled={!canVerify || isVerifying}
            className={`w-full py-3.5 rounded-xl font-bold text-base transition-all ${
              canVerify && !isVerifying
                ? 'bg-[#ff3576] text-white hover:bg-[#e02e68]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isVerifying ? 'Verifying...' : 'Verify & Continue'}
          </button>

          <div className='text-center'>
            <button
              type='button'
              onClick={() => sendOtp(phone)}
              disabled={isSending || resendCooldownSec > 0}
              className='text-[#2d2552] font-semibold text-sm hover:underline disabled:opacity-50'
            >
              {isSending
                ? 'Sending...'
                : resendCooldownSec > 0
                ? `Resend OTP (${resendCooldownSec}s)`
                : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
