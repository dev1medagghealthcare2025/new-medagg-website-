import React from 'react';

// Floating WhatsApp button
// - Non-blocking: uses wa.me deep link, opens in new tab
// - Default placement: bottom-left to avoid overlap with existing bottom-right widgets
// - Accessible and mobile-friendly
export default function FloatingWhatsApp({
  phone = '+918925928840',
  message = '',
  position = 'left', // 'left' | 'right'
  zIndex = 40,
}) {
  const isRight = position === 'right';
  const horizontalPos = isRight ? 'right-4 lg:right-6' : 'left-4 lg:left-6';
  const bottomPos = 'bottom-4 lg:bottom-6';

  // Sanitize phone to digits only as WhatsApp expects an international number without +
  const digitsPhone = String(phone).replace(/\D/g, '');
  const waUrl = `https://wa.me/${digitsPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  // Tailwind z-index classes are limited; use inline style for custom zIndex if needed
  const zClass = `z-${zIndex === 50 ? '50' : '40'}`; // clamp to known classes (40/50) for safety

  return (
    <a
      href={waUrl}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Chat on WhatsApp'
      title='Chat on WhatsApp'
      className={`fixed ${horizontalPos} ${bottomPos} ${zClass} inline-flex items-center justify-center rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400 focus-visible:ring-offset-transparent transition-colors h-12 w-12 sm:h-14 sm:w-14 pointer-events-auto`}
    >
      {/* WhatsApp Icon */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        aria-hidden='true'
        className='h-6 w-6 sm:h-7 sm:w-7'
        fill='currentColor'
      >
        <path d='M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.66 0 .46 5.2.46 11.61c0 2.05.54 4.06 1.58 5.83L0 24l6.73-2c1.72.94 3.66 1.43 5.63 1.43h.01c6.4 0 11.6-5.2 11.6-11.6 0-3.1-1.21-6.02-3.45-8.35ZM12.37 22.1h-.01c-1.75 0-3.46-.47-4.95-1.35l-.36-.21-4 .98 1.07-3.9-.24-.4a9.9 9.9 0 0 1-1.47-5.41c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.45-4.44 9.88-9.84 9.88Zm5.68-7.39c-.31-.16-1.86-.92-2.15-1.03-.29-.1-.5-.16-.72.17-.21.31-.83 1.03-1.02 1.24-.19.21-.37.24-.68.08-.31-.16-1.29-.47-2.46-1.5-.9-.8-1.51-1.79-1.69-2.1-.18-.31-.02-.48.14-.64.14-.14.31-.37.45-.56.15-.19.19-.31.29-.52.1-.21.05-.39-.03-.54-.08-.16-.72-1.73-.99-2.36-.26-.63-.53-.55-.72-.56h-.61c-.19 0-.5.08-.77.39-.26.31-1.01.98-1.01 2.39 0 1.4 1.03 2.75 1.17 2.94.16.21 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.62.69.22 1.31.19 1.81.12.55-.08 1.86-.76 2.12-1.49.26-.73.26-1.35.18-1.49-.08-.14-.29-.23-.6-.39Z' />
      </svg>
      <span className='sr-only'>WhatsApp</span>
    </a>
  );
}
