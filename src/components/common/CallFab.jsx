import React from 'react';

// Floating Call button that appears on every page
// Non-blocking: uses native tel: link
// Placement: bottom-left by default to avoid potential overlap with chat widgets (which are often bottom-right)
export default function CallFab({ phone = '+919363656010', position = 'left' }) {
  const isRight = position === 'right';
  const horizontalPos = isRight ? 'right-4 lg:right-6' : 'left-4 lg:left-6';
  // Extra bottom spacing on right side to avoid chatbot (commonly bottom-right)
  const bottomPos = isRight ? 'bottom-24 sm:bottom-24 md:bottom-24 lg:bottom-28' : 'bottom-4 lg:bottom-6';

  return (
    <a
      href={`tel:${phone}`}
      aria-label="Call Medagg Healthcare"
      title="Call Medagg Healthcare"
      className={`fixed ${horizontalPos} ${bottomPos} z-40 inline-flex items-center justify-center rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-400 focus-visible:ring-offset-transparent transition-colors h-12 w-12 pointer-events-auto`}
    >
      {/* Phone Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.37 1.76.73 2.58a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.5-1.25a2 2 0 0 1 2.11-.45c.82.36 1.69.61 2.58.73A2 2 0 0 1 22 16.92z" />
      </svg>

      {/* Optional label on desktop (hover/visibility not needed on mobile) */}
      <span className="sr-only">Call Now</span>
    </a>
  );
}
