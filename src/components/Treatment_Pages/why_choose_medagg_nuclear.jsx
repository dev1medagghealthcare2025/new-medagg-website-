import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    id: 1,
    title: 'No Cuts or Stitches',
    description: 'No surgical cuts or invasive tissue removal.',
    icon: '/New_section_1.png',
  },
  {
    id: 2,
    title: 'No Spinal or General Anesthesia',
    description: 'Performed safely under local anesthesia.',
    icon: '/general_anasthis.png',
  },
  {
    id: 3,
    title: 'Day-Care Procedure',
    description: 'Go home the same day.',
    icon: '/day_care.png',
  },
  {
    id: 4,
    title: 'Minimal Pain & Faster Recovery',
    description: 'Return to daily activities within days.',
    icon: '/New_section_4.png',
  },
];

const WhyChooseMedaggNuclear = () => {
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
    <section className='bg-white py-10 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-10 md:mb-12'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2d2552] mb-4'>
            Why Choose <span className='text-[#ff3576]'>No Surgeries by Medagg</span> ?
          </h2>
          <p className='text-gray-600 max-w-4xl text-sm sm:text-base leading-relaxed'>
            Radiosynovectomy is an advanced, minimally invasive nuclear medicine treatment that targets
            chronic synovitis and inflammatory joint disease — delivering targeted relief inside the joint
            without surgery, with faster recovery and minimal downtime.
          </p>
        </div>

        <div ref={gridRef} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((item, index) => (
            <div
              key={item.id}
              style={{ transitionDelay: `${isVisible ? index * 140 : 0}ms` }}
              className={`group relative overflow-hidden bg-white rounded-2xl border border-[#ff3576]/30 shadow-md p-6 text-center transform-gpu transition-all duration-300 ease-out hover:bg-[#ff3576] hover:shadow-xl hover:border-[#ff3576] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className='h-16 w-16 mx-auto mb-4 rounded-full bg-[#fff5f7] group-hover:bg-white flex items-center justify-center transition-colors duration-300'>
                <img src={item.icon} alt={item.title} className='h-10 w-10 object-contain' />
              </div>
              <h3 className='text-base sm:text-lg font-bold text-[#2d2552] group-hover:text-white leading-snug mb-2 transition-colors duration-300'>
                {item.title}
              </h3>
              <p className='text-sm text-gray-600 group-hover:text-white transition-colors duration-300'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMedaggNuclear;
