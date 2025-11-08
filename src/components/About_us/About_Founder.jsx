import React from 'react';

export default function About_Founder() {
  return (
    <section className='w-full py-8 lg:py-12 bg-white'>
      <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>

        {/* Top Section: Image and Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12 items-center'>
          {/* Left: Image */}
          <div className='flex justify-center lg:justify-start'>
            <img
              src='/new_about_us.png'
              alt='Healthcare Team Collaboration'
              className='w-full max-w-sm lg:max-w-md h-auto rounded-2xl object-cover'
            />
          </div>

          {/* Right: Content */}
          <div className='text-center lg:text-left'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2D2552] leading-tight mb-6'>
              Medagg was born out of the burning need for <span className='text-pink-500'>AGG</span>regation in the <span className='text-pink-500'>MED</span>ical space!
            </h2>
            <p className='text-gray-600 text-base lg:text-lg leading-relaxed mb-6'>
            Established in 2021, we are a pioneering force in advancing Interventional Radiology (IR) — the science of performing precise, image-guided, minimally invasive treatments that reduce recovery time and improve outcomes.
            </p>
            <p className='text-gray-600 text-base lg:text-lg leading-relaxed mb-6'>
            Led by experienced Interventionists and healthcare business leaders, we combine medical expertise with operational insight to reshape how patients and hospitals experience care. At Medagg, technology meets integrity — we believe the future of healthcare is non-surgical, transparent, and patient-first.
            </p>
            <p className='text-gray-600 text-base lg:text-lg leading-relaxed'>
            Guided by ethics rather than advertising, we provide unbiased access to trusted hospitals and specialists, ensuring patients can compare costs, understand options, and make confident decisions. Through this commitment, we’re bridging gaps, simplifying choices, and making advanced Interventional Radiology accessible across India — one informed choice at a time.
            </p>
            
          </div>
        </div>


      </div>
    </section>
  );
}
