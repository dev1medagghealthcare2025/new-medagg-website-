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
    <div className='fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm'>
      <div className='relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden'>
        <div className='bg-[#21183f] px-6 pb-5 pt-6 text-center'>
          <button
            type='button'
            onClick={close}
            className='absolute right-4 top-4 rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors'
            aria-label='Close'
          >
            <X size={20} />
          </button>
          <div className='mx-auto text-center'>
            <p className='text-2xl font-extrabold uppercase leading-none tracking-[0.08em] text-white'>
              No Surgeries
            </p>
            <p className='mt-1 text-xs font-semibold text-white/75'>
              Powered by Medagg
            </p>
          </div>
          <p className='mt-4 text-sm font-medium text-white/80'>{OTP_BRAND.tagline}</p>
        </div>

        <div className='p-6 space-y-4'>
          <div className='flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5'>
            <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-100'>
              <ShieldCheck className='h-5 w-5 text-[#ff3576]' />
            </span>
            <div className='text-left'>
              <p className='text-base font-bold text-slate-800'>Verify your mobile number</p>
              <p className='mt-1 text-sm leading-6 text-slate-600'>
                Enter the 6-digit OTP sent to <span className='font-bold text-[#21183f]'>+91 {phone}</span>
              </p>
            </div>
          </div>

          {isSending && !hasVerificationId && (
            <p className='text-sm text-center font-medium text-slate-500'>Sending OTP...</p>
          )}

          <input
            type='text'
            inputMode='numeric'
            autoComplete='one-time-code'
            value={otp}
            onChange={(e) => setOtp(String(e.target.value || '').replace(/\D/g, '').slice(0, 6))}
            placeholder='Enter 6-digit OTP'
            className='w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-center text-2xl font-bold tracking-[0.22em] text-[#21183f] transition placeholder:text-base placeholder:font-semibold placeholder:tracking-normal placeholder:text-slate-400 focus:border-[#ff3576] focus:outline-none focus:ring-4 focus:ring-pink-100'
            maxLength={6}
          />

          {error && <p className='text-red-600 text-sm font-medium text-center'>{error}</p>}

          <button
            type='button'
            onClick={() => verifyOtp(otp)}
            disabled={!canVerify || isVerifying}
            className={`w-full py-3.5 rounded-xl font-bold text-base transition-all ${
              canVerify && !isVerifying
                ? 'bg-[#ff3576] text-white shadow-lg shadow-pink-200 hover:bg-[#e02e68]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isVerifying ? 'Verifying...' : 'Verify & Continue'}
          </button>

          <div className='text-center'>
            <button
              type='button'
              onClick={() => sendOtp(phone)}
              disabled={isSending || resendCooldownSec > 0}
              className='text-[#21183f] font-semibold text-sm hover:text-[#ff3576] disabled:opacity-50'
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
