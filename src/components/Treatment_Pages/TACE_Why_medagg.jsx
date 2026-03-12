import React, { useEffect, useRef, useState } from 'react';

const TACE_Why_medagg = () => {
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

  const cards = [
    {
      title: 'Non-Surgical Alternatives',
      description: 'Advanced treatments that avoid conventional surgery.',
      icon: '/New_section_1.png',
    },
    {
      title: 'Minimally Invasive care',
      description: 'Needle-based procedures with precision imaging.',
      icon: '/New_Section_2.png',
    },
    {
      title: 'Lower Risk Profile',
      description: 'Fewer complications compared to surgery.',
      icon: '/New_Section_3.png',
    },
    {
      title: 'Faster Recovery',
      description: 'Return to daily life sooner.',
      icon: '/New_section_4.png',
    },
    {
      title: 'Shorter Hospital Stay',
      description: 'Often day-care or minimal admission.',
      icon: '/New_section_5.png',
    },
    {
      title: 'Patient-First Decisions',
      description: 'Clear guidance to help you choose confidently.',
      icon: '/New_section_6.png',
    },
  ];

  return (
    <section className="bg-[#FFF0F3] px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-[#392C5C] font-semibold text-lg sm:text-xl">
                Why Choose NoSurgeries / MEDAGG?
              </h3>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#ff3576] leading-tight">
                Surgery Isn't<br /> the Only Option
              </h2>
            </div>

            <div className="space-y-6 text-[#392C5C]/90">
              <p className="text-base sm:text-lg leading-relaxed">
                <span className="font-bold text-[#ff3576]">Liver Tumors: No surgeries for TACE (Transarterial Chemoembolization)</span>, 
                a targeted therapy that blocks tumor blood supply while delivering chemotherapy directly to the cancer.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Using <span className="font-bold">Interventional Radiology</span>, our minimally invasive procedures help reduce surgical risk, recovery time, and hospital stay while delivering effective outcomes.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#ff3576]/30 p-6 sm:p-8">
              <p className="text-base sm:text-lg text-[#392C5C] leading-relaxed">
                <span className="font-bold text-[#ff3576]">No Surgeries for TACE (Transarterial Chemoembolization)</span>, a precise, minimally invasive treatment that delivers targeted radiation to the tumor using microscopic beads, helping protect healthy liver tissue.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-[#ff3576] font-bold text-lg border-b-2 border-[#ff3576] inline-block">
                Science-led. Patient-focused. Proven outcomes
              </p>
            </div>
          </div>

          {/* Right Cards Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {cards.map((card, index) => (
              <div
                key={card.title}
                style={{ transitionDelay: `${isVisible ? index * 140 : 0}ms` }}
                className={`group relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-md p-5 flex items-center gap-4 transform-gpu transition-all duration-700 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:border-[#ff3576]/30 active:scale-[0.98] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className='pointer-events-none absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,53,118,0.25),transparent_55%)] blur-2xl' />
                </div>
                <div className="h-12 w-12 rounded-xl bg-[#FFF0F3] flex items-center justify-center flex-shrink-0">
                  <img src={card.icon} alt={card.title} className="h-9 w-9 object-contain" />
                </div>
                <div>
                  <h4 className="text-[#2d2552] font-bold text-base sm:text-lg leading-snug">{card.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TACE_Why_medagg;
