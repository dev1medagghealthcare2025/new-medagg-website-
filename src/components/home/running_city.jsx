import React, { useMemo } from 'react';

const DEFAULT_CITIES = [
  'Ahmedabad',
  'Bangalore',
  'Bhubaneswar',
  'Calicut',
  'Chennai',
  'Coimbatore',
  'Delhi',
  'Goa',
  'Hyderabad',
  'Jaipur',
  'Kolkata',
  'Madurai',
  'Perinthalmanna',
  'Salem',
  'Surat',
  'Trivandrum',
  'Vijayawada',
  'Vizag',
];

function RunningCity({
  cities = DEFAULT_CITIES,
  speed = 28,           // seconds per loop (lower = faster)
  direction = 'ltr',    // 'ltr' (default) or 'rtl'
  pauseOnHover = true,  // pause animation on hover
}) {
  // Duplicate the list to create a seamless marquee loop
  const list = useMemo(() => {
    const cleaned = cities.filter(Boolean);
    return [...cleaned, ...cleaned];
  }, [cities]);

  const animName = direction === 'ltr' ? 'marquee-ltr' : 'marquee-rtl';

  return (
    <section className="w-full bg-white py-4">
      {/* Local keyframes for the marquee */}
      <style>
        {`
          @keyframes marquee-rtl {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-ltr {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      <div className={`relative overflow-hidden ${pauseOnHover ? 'group' : ''}`}>
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Track (two copies side-by-side = 200% width) */}
        <div
          className="flex whitespace-nowrap"
          style={{
            width: '200%',
            animation: `${animName} ${speed}s linear infinite`,
          }}
        >
          <div className={`${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''} flex`}>
            {list.map((city, idx) => (
              <div
                key={`${city}-${idx}`}
                className="mx-2 my-2 w-40 sm:w-48 h-10 bg-white rounded-xl border border-gray-100 text-gray-700 text-sm sm:text-base flex items-center justify-center whitespace-nowrap shadow-[0_0_10px_rgba(0,0,0,0.12)] hover:shadow-[0_0_14px_rgba(0,0,0,0.16)] transition-shadow duration-200"
                style={{ flex: '0 0 auto' }}
                title={city}
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RunningCity;