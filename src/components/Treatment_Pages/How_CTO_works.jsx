import React from 'react';

const How_CTO_works = () => {
  const steps = [
    {
      step: 1,
      title: 'Evaluation & planning',
      description: 'Echocardiogram, angiography, and CT confirm blockage specifics.',
      image: '/CTO_Steps1.jpg',
      alt: 'Patient undergoing evaluation for CTO treatment',
      align: 'left',
    },
    {
      step: 2,
      title: 'Catheter insertion',
      description: 'A catheter is guided via the wrist or groin artery toward the blockage.',
      image: '/CTO_Steps2.png',
      alt: 'Illustration of catheter insertion in the wrist',
      align: 'right',
    },
    {
      step: 3,
      title: 'Blockage crossing technique',
      description: 'Special guidewires (antegrade or retrograde methods) are used to traverse the chronic blockage.',
      image: '/CTO_Steps3.jpg',
      alt: 'Illustration of guidewire crossing a blockage in an artery',
      align: 'left',
    },
    {
      step: 4,
      title: 'Balloon angioplasty & stenting',
      description: 'Balloon expands the artery, and stents strengthen the reopened vessel.',
      image: '/CTO_Steps4.jpg',
      alt: 'Illustration of a stent placed in an artery',
      align: 'right',
    },
    {
      step: 5,
      title: 'Recovery & outcome',
      description: 'Catheter is removed; most resume normal life within days.',
      image: '/CTO_Steps5.png',
      alt: 'Patient consulting with a doctor post-procedure',
      align: 'left',
    },
  ];

  return (
    <div className='py-10 md:py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='text-left mb-8 md:mb-12'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#2d2552]'>
            How <span className='text-[#ff3576]'>CTO Treatment</span> Works
          </h2>
          <p className='mt-2 text-base md:text-lg text-gray-600'>Step-by-step breakdown of the procedure</p>
        </div>

        <div className='relative'>
          {/* Vertical Line for desktop */}
          <div className='hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#ff3576] transform -translate-x-1/2'></div>

          {steps.map((item, index) => (
            <div key={index} className='relative mb-8 md:mb-10'>
              <div className='flex flex-col md:flex-row md:items-center'>
                {/* Image Block (mobile first) */}
                <div className={`w-full md:w-5/12 px-0 md:px-4 py-2 md:py-4 order-1 ${item.align === 'left' ? 'md:order-3' : 'md:order-1'}`}>
                  <img src={item.image} alt={item.alt} className='rounded-lg shadow-lg w-full h-auto object-cover' />
                </div>

                {/* Step Circle (desktop only) */}
                <div className='hidden md:flex w-full md:w-2/12 justify-center order-2 md:order-2'>
                  <div className='z-10 bg-[#ff3576] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold'>
                    {item.step}
                  </div>
                </div>

                {/* Content Block */}
                <div className={`w-full md:w-5/12 px-0 md:px-4 py-2 md:py-4 order-2 ${item.align === 'left' ? 'md:order-1' : 'md:order-3'}`}>
                  {/* Mobile Step pill */}
                  <div className='md:hidden inline-flex items-center justify-center text-xs font-semibold text-white bg-[#ff3576] rounded-full h-6 px-3 mb-2'>
                    Step {item.step}
                  </div>
                  <h3 className='text-base sm:text-lg font-bold text-[#ff3576]'>
                    <span className='text-[#2d2552]'>{item.title}</span>
                  </h3>
                  <p className='mt-2 text-gray-600 text-sm sm:text-base'>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default How_CTO_works;
