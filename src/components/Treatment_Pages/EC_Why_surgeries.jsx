
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
    description: 'Needle-based procedures with precision imaging.',
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
    title: 'Faster Recovery',
    description: 'Return to daily life sooner.',
    icon: '/New_section_4.png',
  },
  {
    id: 5,
    title: 'Shorter Hospital Stay',
    description: 'Often day-care or minimal admission.',
    icon: '/New_section_5.png',
  },
  {
    id: 6,
    title: 'Patient-First Decisions',
    description: 'Clear guidance to help you choose confidently.',
    icon: '/New_section_6.png',
  },
];

const ECWhySurgeries = () => {
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
    <section className='bg-[#fbf7f8] py-10 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start'>
          <div>
            <div className='flex items-center gap-4 mb-4'>
              <p className='text-lg font-semibold tracking-wide text-[#ff3576]'>
                Why Patients Choose NoSurgeries
              </p>
              <div className='h-px flex-1 bg-[#e9d8dd]' />
            </div>

            <h2 className='text-4xl sm:text-5xl font-extrabold text-[#2d2552] leading-tight'>
              Surgery Isn’t
              <br />
              the Only Option
            </h2>

            <div className='mt-6 space-y-4 text-gray-600 leading-relaxed'>
              <p>
                <span className='font-semibold text-[#2d2552]'>NoSurgeries</span> offers advanced non-surgical
                treatments for conditions often managed with surgery.
              </p>
              <p>
                Using <span className='font-semibold text-[#2d2552]'>Interventional Radiology</span>, our minimally
                invasive procedures help reduce surgical risk, recovery time, and hospital stay while delivering
                effective outcomes.
              </p>
            </div>

            <div className='mt-6 rounded-xl border border-[#ff3576]/30 bg-white px-5 py-4'>
              <p className='text-gray-700'>
                <span className='font-semibold text-[#ff3576]'>Brain Aneurysms:</span> No open surgeries for brain aneurysms using endovascular coiling, a minimally invasive technique to prevent aneurysm rupture.

              </p>
            </div>

            <p className='mt-5 text-[#ff3576] italic font-semibold underline underline-offset-4'>
              Science-led. Patient-focused. Proven outcomes
            </p>
          </div>

          <div ref={gridRef} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {features.map((item, index) => (
              <div
                key={item.id}
                style={{ transitionDelay: `${isVisible ? index * 140 : 0}ms` }}
                className={`group relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-md p-5 flex items-center gap-4 transform-gpu transition-all duration-700 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:border-[#ff3576]/30 active:scale-[0.98] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className='pointer-events-none absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,53,118,0.25),transparent_55%)] blur-2xl' />
                </div>
                <div className='h-12 w-12 rounded-xl bg-[#fbf7f8] flex items-center justify-center flex-shrink-0'>
                  <img src={item.icon} alt={item.title} className='h-9 w-9 object-contain' />
                </div>
                <div>
                  <h3 className='text-lg font-bold text-[#2d2552] leading-snug'>{item.title}</h3>
                  <p className='mt-1 text-sm text-gray-600'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ECWhySurgeries;
