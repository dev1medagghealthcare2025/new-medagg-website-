
import React from 'react';

const HowY90Works = () => {
  const steps = [
    {
      number: 1,
      title: 'Clinical Evaluation',
      description: 'Doctors review scans, blood tests and reports to assess whether Y-90 treatment is appropriate.',
      image: '/y90_work1.png',
    },
    {
      number: 2,
      title: 'Mapping Angiography',
      description: 'A planning procedure identifies blood vessels supplying the liver tumor.',
      image: '/y90_work2.png',
    },
    {
      number: 3,
      title: 'Delivery of Y-90 Microspheres',
      description: 'Tiny radioactive beads are delivered through a catheter into tumor-feeding vessels.',
      image: '/y90_work3.png',
    },
    {
      number: 4,
      title: 'Targeted Radiation Therapy',
      description: 'The beads release radiation inside the tumor, helping control tumor growth.',
      image: '/y90_work4.png',
    },
    {
      number: 5,
      title: 'Follow-Up Monitoring',
      description: 'Imaging scans help doctors evaluate treatment response over time.',
      image: '/y90_work5.png',
    },
  ];

  return (
    <section className='bg-white py-12 sm:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-left'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2d2552]'>
            How <span className='text-[#ff3576]'>Y-90 Radioembolization (TARE)</span> Works
          </h2>
          <p className='mt-2 text-base sm:text-lg text-gray-600'>Step-by-step breakdown of the procedure</p>
        </div>

        <div className='relative mt-10 sm:mt-12'>
          <div className='hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-pink-200 rounded-full' />

          <div className='space-y-10 sm:space-y-14 md:space-y-20'>
            {steps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={step.number} className='relative'>
                  <div className='hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-full bg-[#ff3576] text-white items-center justify-center font-bold z-10'>
                    {step.number}
                  </div>

                  <div className={`flex flex-col md:flex-row ${isLeft ? '' : 'md:flex-row-reverse'} items-start md:items-center gap-6 md:gap-12`}>
                    <div className='md:hidden w-10 h-10 rounded-full bg-[#ff3576] text-white flex items-center justify-center font-bold'>
                      {step.number}
                    </div>

                    <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16 md:text-left' : 'md:pl-16 md:text-left'}`}>
                      <p className='text-[#ff3576] font-semibold text-sm mb-2'>Step {step.number}:</p>
                      <h3 className='text-lg sm:text-xl font-bold text-[#2d2552]'>{step.title}</h3>
                      <p className='mt-2 text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl'>{step.description}</p>
                    </div>

                    <div className={`w-full md:w-1/2 ${isLeft ? 'md:pl-16' : 'md:pr-16'}`}>
                      <div className='rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100'>
                        <img src={step.image} alt={step.title} className='w-full h-auto object-cover' />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowY90Works;
