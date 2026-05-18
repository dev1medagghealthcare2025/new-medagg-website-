
import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    id: 1,
    title: 'Non-Surgical Alternatives',
    description: 'Advanced treatments that avoid conventional surgery.',
    icon: '/New_section_1.png',
  },
  {
    id: 2,
    title: 'Minimally Invasive care',
    description: 'Advanced treatments that avoid conventional surgery.',
    icon: '/New_Section_2.png',
  },
  {
    id: 3,
    title: 'Lower Risk Profile',
    description: 'Fewer complications compared to surgery.',
    icon: '/New_Section_3.png',
  },
  {
    id: 4,
    title: 'Non-Surgical Alternatives',
    description: 'Return to daily life sooner.',
    icon: '/New_section_4.png',
  },
  {
    id: 5,
    title: 'Shorter Hospital Stay',
    description: 'Advanced treatments that avoid conventional surgery.',
    icon: '/New_section_5.png',
  },
  {
    id: 6,
    title: 'Patient-First Decisions',
    description: 'Advanced treatments that avoid conventional surgery.',
    icon: '/New_section_6.png',
  },
];

const PVCWhyChooseMedagg = ({ city = '', variant = '' }) => {
  const cityLower = (city || '').toLowerCase();
  const variantLower = (variant || '').toLowerCase();
  const isChennai = variantLower === 'chennai' || cityLower === 'chennai';
  const isMadurai = variantLower === 'madurai' || cityLower === 'madurai';
  const isCoimbatore = variantLower === 'coimbatore' || cityLower === 'coimbatore';
  const isBangalore = variantLower === 'bangalore' || cityLower === 'bangalore' || cityLower === 'bengaluru';
  const isMangalore = variantLower === 'mangalore' || cityLower === 'mangalore' || cityLower === 'mangaluru';
  const isCitySpecific = isChennai || isMadurai || isCoimbatore || isBangalore || isMangalore;
  const cityName = isChennai
    ? 'Chennai'
    : isMadurai
      ? 'Madurai'
      : isCoimbatore
        ? 'Coimbatore'
        : isBangalore
          ? 'Bangalore'
          : isMangalore
            ? 'Mangalore'
            : '';

  const gridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className='bg-[#fff5f7] py-10 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start'>
          <div>
            <p className='text-lg font-bold tracking-wide text-[#2d2552] mb-6'>
              Why Choose NoSurgeries / MEDAGG?
            </p>

            {isCitySpecific ? (
              <h2 className='text-4xl sm:text-5xl font-extrabold text-[#ff3576] leading-tight mb-8'>
                In {cityName}, No-Surgery Treatment Option
                <br />
                Available for Pelvic Vein Conditions
              </h2>
            ) : (
              <h2 className='text-4xl sm:text-5xl font-extrabold text-[#ff3576] leading-tight mb-8'>
                No-Surgery Treatment Option
                <br />
                Available for Pelvic Vein Conditions
              </h2>
            )}

            <div className='mt-6 space-y-6 text-gray-700 leading-relaxed text-lg'>
              <p>
                <span className='font-bold text-[#2d2552]'>NoSurgeries</span> offers advanced non-surgical treatments for conditions often managed with surgery.
              </p>
              <p>
                Using <span className='font-bold text-[#2d2552]'>Interventional Radiology</span>, our minimally invasive procedures help reduce surgical risk, recovery time, and hospital stay while delivering effective outcomes.
              </p>
            </div>

            <div className='mt-8 rounded-xl border border-[#ff3576]/30 bg-white px-6 py-6 shadow-sm'>
              <p className='text-gray-700 text-lg leading-relaxed'>
                No surgeries for <span className='text-[#ff3576] font-semibold'>pelvic vein conditions</span> through <span className='text-[#ff3576] font-semibold'>Pelvic Vein Embolization</span> — a minimally invasive, incision-free treatment that relieves pain and bleeding with faster recovery and minimal downtime.
              </p>
            </div>

            <p className='mt-8 text-[#ff3576] italic font-bold underline underline-offset-4 text-lg'>
              Science-led. Patient-focused. Proven outcomes
            </p>
          </div>

          <div ref={gridRef} className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {features.map((item, index) => (
              <div
                key={item.id}
                style={{ transitionDelay: `${isVisible ? index * 140 : 0}ms` }}
                className={`group relative overflow-hidden bg-white rounded-2xl border border-[#ff3576]/20 shadow-sm p-6 flex flex-col items-center text-center transform-gpu transition-all duration-700 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:border-[#ff3576]/40 active:scale-[0.98] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className='h-16 w-16 rounded-xl bg-[#fff5f7] flex items-center justify-center mb-4 flex-shrink-0'>
                  <img src={item.icon} alt={item.title} className='h-10 w-10 object-contain' />
                </div>
                <div>
                  <h3 className='text-lg font-bold text-[#2d2552] leading-snug mb-2'>{item.title}</h3>
                  <p className='text-sm text-gray-600 leading-relaxed'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PVCWhyChooseMedagg;

