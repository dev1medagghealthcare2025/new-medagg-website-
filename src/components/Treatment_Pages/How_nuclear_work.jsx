import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Assessment of Joint Condition',
    description:
      'Patients with chronic synovitis or inflammatory joint disease are evaluated to determine if radiosynovectomy is appropriate.',
    image: '/Nuclear1.png',
  },
  {
    step: 2,
    title: 'Preparation of the Joint',
    description: 'The affected joint is prepared for the intra-articular procedure.',
    image: '/Nuclear2.png',
  },
  {
    step: 3,
    title: 'Injection of Radiopharmaceutical',
    description: 'Radioactive colloidal particles are injected directly into the joint space.',
    image: '/Nuclear3.png',
  },
  {
    step: 4,
    title: 'Targeted Beta Radiation',
    description:
      'The particles deliver high-energy beta radiation that destroys inflamed synovial cells and reduces abnormal capillary blood supply.',
    image: '/Nuclear4.png',
  },
  {
    step: 5,
    title: 'Synovial Fibrosis and Symptom Improvement',
    description:
      'The radiation induces fibrosis of the synovial membrane, helping control inflammation and improve joint symptoms.',
    image: '/Nuclear5.png',
  },
];

const HowNuclearWork = () => (
  <section className='py-16 sm:py-24 bg-gray-50 overflow-hidden'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='text-center sm:text-left mb-12'>
        <h2 className='text-3xl sm:text-4xl font-bold text-[#2d2552]'>
          How <span className='text-[#ff3576]'>Radiosynovectomy</span> Works
        </h2>
        <p className='mt-4 text-lg text-gray-600 max-w-3xl'>
          Step-by-step breakdown of the Radiosynovectomy procedure
        </p>
      </div>

      <div className='relative'>
        <div className='hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#ff3576] opacity-30 -translate-x-1/2' />

        <div className='space-y-16'>
          {steps.map((item, index) => (
            <div key={item.step} className='relative'>
              <div className='md:grid md:grid-cols-2 md:gap-16 items-center'>
                <div className={`flex justify-center items-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='rounded-lg shadow-lg w-full h-auto object-cover'
                  />
                </div>

                <div className={`mt-8 md:mt-0 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className={`text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className='text-xl sm:text-2xl font-bold mb-3'>
                      <span className='text-[#ff3576]'>Step {item.step}:</span>{' '}
                      <span className='text-[#2d2552]'>{item.title}</span>
                    </h3>
                    <p className='text-gray-600 leading-relaxed text-base sm:text-lg'>{item.description}</p>
                  </div>
                </div>
              </div>

              <div className='hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#ff3576] rounded-full items-center justify-center text-white font-bold border-4 border-gray-50 z-10 shadow-lg'>
                {item.step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowNuclearWork;
