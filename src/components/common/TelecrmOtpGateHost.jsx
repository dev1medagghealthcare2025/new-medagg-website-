import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import usePhoneVerification from '../../hooks/usePhoneVerification';
import { setPhoneVerified } from '../../utils/phoneVerification';
import { useTelecrmOtpGate } from '../../lib/telecrmOtpGate';

export default function TelecrmOtpGateHost() {
  const { open, phone, close, verified } = useTelecrmOtpGate();
  const [otp, setOtp] = useState('');

  const {
    recaptchaRef,
    sendOtp,
    verifyOtp,
    isSending,
    isVerifying,
    isVerified,
    error,
    hasVerificationId,
    reset,
  } = usePhoneVerification();

  useEffect(() => {
    if (!open) {
      setOtp('');
      reset();
      return;
    }

    // send OTP when modal opens
    setOtp('');
    reset();
    sendOtp(phone);
  }, [open, phone, reset, sendOtp]);

  useEffect(() => {
    if (!isVerified) return;
    setPhoneVerified(phone);
    const t = setTimeout(() => {
      verified();
    }, 500);
    return () => clearTimeout(t);
  }, [isVerified, phone, verified]);

  const canVerify = useMemo(() => otp.length === 6 && hasVerificationId, [otp, hasVerificationId]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm'>
      <div className='relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl'>
        <button
          type='button'
          onClick={close}
          className='absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors'
          aria-label='Close'
        >
          <X size={22} />
        </button>

        <div className='text-center mb-5'>
          <h3 className='text-2xl font-bold text-[#2d2552]'>Verify Phone</h3>
          <p className='mt-2 text-gray-600'>Enter the OTP sent to +91 {phone}</p>
        </div>

        <div className='space-y-4'>
          <input
            type='text'
            value={otp}
            onChange={(e) => setOtp(String(e.target.value || '').replace(/\D/g, '').slice(0, 6))}
            placeholder='Enter 6-digit OTP'
            className='w-full p-4 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition text-center text-xl tracking-[0.3em] font-bold'
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
              disabled={isSending}
              className='text-[#2d2552] font-semibold text-sm hover:underline disabled:opacity-50'
            >
              {isSending ? 'Sending...' : 'Resend OTP'}
            </button>
          </div>
        </div>

        <div ref={recaptchaRef} className='absolute -top-[100px] -left-[100px] w-[1px] h-[1px] opacity-0 overflow-hidden' aria-hidden='true' />
      </div>
    </div>
  );
}
