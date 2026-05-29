import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThankYouModalHost() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      // Change URL for SEO without React Router navigation (stays on same page)
      if (window.location.pathname !== '/thank-you') {
        window.history.replaceState(null, '', '/thank-you');
      }
      try {
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead');
        }
      } catch {}
    };
    window.addEventListener('thankyou:open', handler);
    return () => window.removeEventListener('thankyou:open', handler);
  }, []);


  const close = () => {
    setOpen(false);
    // Restore original URL if needed (optional - remove if you want to keep /thank-you in URL)
    // window.history.back();
  };

  const exploreMore = () => {
    setOpen(false);
    navigate('/');
  };

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4'
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className='relative w-full max-w-xl max-h-[85vh] rounded-3xl bg-white shadow-2xl overflow-hidden'>
        <button
          type='button'
          aria-label='Close'
          className='absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-gray-700 hover:bg-white'
          onClick={close}
        >
          ×
        </button>
        <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-8'>
          <div className='flex-1 text-center'>
            <h3 className='text-3xl md:text-4xl font-extrabold text-[#F7266B] leading-tight'>Thank You</h3>
            <p className='mt-3 text-gray-700 text-sm md:text-base'>We’ve received your information. Our team will review it and help you understand the most suitable treatment options.</p>
            <div className='mt-5 flex justify-center'>
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-lg bg-[#F7266B] px-6 py-2.5 text-sm md:text-base font-bold text-white hover:bg-pink-700'
                onClick={exploreMore}
              >
                Explore More
              </button>
            </div>
          </div>
          <div className='flex w-full md:w-[200px] items-center justify-center bg-white'>
            <img
              src='/IRA_Namaste.png'
              alt='Thank you'
              className='h-36 w-auto sm:h-40 md:h-56 object-contain'
              loading='lazy'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
