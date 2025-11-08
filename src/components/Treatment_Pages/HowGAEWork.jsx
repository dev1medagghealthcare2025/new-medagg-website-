import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Initial Assessment',
    description: 'Your doctor evaluates knee pain, medical history, and imaging (like MRI or X-ray) to confirm eligibility for GAE.',
    img: '/GAE_Step1.jpg',
  },
  {
    step: 2,
    title: 'Access Through a Tiny Pinhole',
    description: 'A small catheter is inserted through a blood vessel in your wrist or groin — no cuts or stitches required.',
    img: '/step2_GAE_NEW.png',
  },
  {
    step: 3,
    title: 'Guided Imaging to Locate Problem Arteries',
    description: 'Using advanced imaging, the doctor identifies the genicular arteries responsible for inflammation.',
    img: '/GAE_step3.jpg',
  },
  {
    step: 4,
    title: 'Blocking Inflammation-Causing Arteries',
    description: 'Tiny particles are delivered through the catheter to block abnormal blood flow fueling knee pain.',
    img: '/GAE_Step4.jpg',
  },
  {
    step: 5,
    title: 'Pain Relief Begins',
    description: 'Reduced blood supply to inflamed tissues helps relieve pain and improve joint function over time.',
    img: '/step5_gae_new.png',
  },
];

const HowGAEWork = () => {
  return (
    <section className='w-full bg-white py-12 sm:py-16 lg:py-20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 lg:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2552] mb-4'>
            How <span className='text-[#ff3576]'>GAE</span> Works
          </h2>
          <p className='text-gray-600 text-base sm:text-lg max-w-2xl'>
            Understanding the procedure step-by-step helps build confidence in your treatment choice.
          </p>
        </div>

        {/* Timeline Container */}
        <div className='relative'>
          {/* Vertical Line */}
          <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8 bottom-8 w-0.5 bg-[#ff3576]'></div>

          {/* Steps */}
          <div className='space-y-12 md:space-y-16'>
            {steps.map((step) => {
              const isOdd = step.step % 2 !== 0;
              
              return (
                <div key={step.step} className='relative'>
                  {/* Step Circle */}
                  <div className='hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#ff3576] rounded-full items-center justify-center text-white font-bold text-lg border-4 border-white z-10'>
                    {step.step}
                  </div>

                  {/* Content Grid */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center'>
                    {isOdd ? (
                      <>
                        {/* Text on Left */}
                        <div className='md:text-right md:pr-8'>
                          <div className='md:hidden w-8 h-8 bg-[#ff3576] rounded-full flex items-center justify-center text-white font-bold mb-4'>
                            {step.step}
                          </div>
                          <h3 className='text-lg font-bold text-[#ff3576] mb-2'>
                            Step {step.step}: {step.title}
                          </h3>
                          <p className='text-gray-600 text-base leading-relaxed'>
                            {step.description}
                          </p>
                        </div>
                        {/* Image on Right */}
                        <div className='md:pl-8'>
                          <img
                            src={step.img}
                            alt={`Step ${step.step}: ${step.title}`}
                            className='w-full max-w-[515px] h-[220px] object-cover rounded-lg shadow-lg'
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Image on Left */}
                        <div className='md:pr-8 order-2 md:order-1'>
                          <img
                            src={step.img}
                            alt={`Step ${step.step}: ${step.title}`}
                            className='w-full max-w-[515px] h-[220px] object-cover rounded-lg shadow-lg'
                          />
                        </div>
                        {/* Text on Right */}
                        <div className='md:pl-8 order-1 md:order-2'>
                          <div className='md:hidden w-8 h-8 bg-[#ff3576] rounded-full flex items-center justify-center text-white font-bold mb-4'>
                            {step.step}
                          </div>
                          <h3 className='text-lg font-bold text-[#ff3576] mb-2'>
                            Step {step.step}: {step.title}
                          </h3>
                          <p className='text-gray-600 text-base leading-relaxed'>
                            {step.description}
                          </p>
                        </div>
                      </>
                    )}
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

export default HowGAEWork; 