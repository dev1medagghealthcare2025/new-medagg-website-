
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bandage,
  ClipboardCheck,
  HandHeart,
  Hospital,
  Scissors,
  ShieldCheck,
} from 'lucide-react';

const Y90_TARE_MEDAGG = () => {
  const gridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const features = useMemo(
    () => [
      {
        id: 1,
        title: 'Non-Surgical Alternatives',
        description: 'Advanced treatments that avoid conventional surgery.',
        Icon: Scissors,
      },
      {
        id: 2,
        title: 'Minimally Invasive care',
        description: 'Advanced treatments that avoid conventional surgery.',
        Icon: Bandage,
      },
      {
        id: 3,
        title: 'Lower Risk Profile',
        description: 'Fewer complications compared to surgery.',
        Icon: ShieldCheck,
      },
      {
        id: 4,
        title: 'Non-Surgical Alternatives',
        description: 'Return to daily life sooner.',
        Icon: ClipboardCheck,
      },
      {
        id: 5,
        title: 'Shorter Hospital Stay',
        description: 'Advanced treatments that avoid conventional surgery.',
        Icon: Hospital,
      },
      {
        id: 6,
        title: 'Patient-First Decisions',
        description: 'Advanced treatments that avoid conventional surgery.',
        Icon: HandHeart,
      },
    ],
    [],
  );

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
    <section className='bg-[#fdecef] py-12 sm:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start'>
          <div className='max-w-xl'>
            <p className='text-[#2d2552] font-semibold text-base sm:text-lg'>
              Why Choose NoSurgeries / MEDAGG?
            </p>

            <h2 className='mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#ff3576]'>
              Surgery Isn’t
              <br />
              the Only Option
            </h2>

            <p className='mt-6 text-sm sm:text-base text-[#2d2552]/70 leading-relaxed'>
              <span className='text-[#ff3576] font-semibold'>Liver Tumors: No surgeries</span> using{' '}
              <span className='text-[#ff3576] font-semibold'>Y-90 radioembolization (TARE)</span>, a targeted
              treatment that delivers radiation directly to tumors while preserving healthy liver tissue.
            </p>

            <p className='mt-4 text-sm sm:text-base text-[#2d2552]/70 leading-relaxed'>
              Using <span className='text-[#2d2552] font-semibold'>Interventional Radiology</span>, our minimally
              invasive procedures help reduce surgical risk, recovery time, and hospital stay while delivering
              effective outcomes.
            </p>

            <div className='mt-7 rounded-2xl border border-[#ff3576]/40 bg-white px-5 py-4 shadow-sm'>
              <p className='text-sm sm:text-base text-[#2d2552]/70 leading-relaxed'>
                <span className='text-[#ff3576] font-bold'>No Surgeries</span> for{' '}
                <span className='text-[#ff3576] font-bold'>Y-90 Radioembolization (TARE)</span>, a targeted,
                minimally invasive therapy that delivers radiation directly to the tumor through tiny
                microspheres.
              </p>
            </div>

            <a
              href='#'
              className='inline-block mt-7 text-[#ff3576] font-semibold underline underline-offset-4'
            >
              Science-led. Patient-focused. Proven outcomes
            </a>
          </div>

          <div ref={gridRef} className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {features.map((item, index) => (
              <div
                key={item.id}
                style={{ transitionDelay: `${isVisible ? index * 120 : 0}ms` }}
                className={`group relative overflow-hidden rounded-2xl border border-[#ff3576]/40 bg-white p-5 shadow-sm transform-gpu transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lg active:scale-[0.99] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className='pointer-events-none absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,53,118,0.18),transparent_60%)] blur-2xl' />
                </div>

                <div className='relative flex items-start gap-4'>
                  <div className='shrink-0 w-12 h-12 rounded-xl bg-[#fdecef] border border-[#ff3576]/30 flex items-center justify-center'>
                    <item.Icon className='w-6 h-6 text-[#ff3576]' strokeWidth={2.2} />
                  </div>

                  <div>
                    <h3 className='text-[#2d2552] font-bold text-sm sm:text-base leading-snug'>
                      {item.title}
                    </h3>
                    <p className='mt-2 text-sm text-[#2d2552]/65 leading-relaxed'>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Y90_TARE_MEDAGG;

