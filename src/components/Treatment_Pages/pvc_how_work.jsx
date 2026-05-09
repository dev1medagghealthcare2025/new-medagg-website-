import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Initial Consultation & Diagnosis',
    description: 'Specialists use ultrasound or MRI to confirm Pelvic Vein Congestion and map the affected veins.',
    image: '/pvc_work1.png',
  },
  {
    step: 2,
    title: 'Access Through a Tiny Puncture',
    description: 'Under local anesthesia, a small catheter is inserted through a tiny skin puncture, usually in the groin or neck.',
    image: '/pvc_work2.png',
  },
  {
    step: 3,
    title: 'Precise Mapping (Venogram)',
    description: 'A venogram is performed using imaging guidance to identify the exact location of the refluxing pelvic veins.',
    image: '/pvc_work3.png',
  },
  {
    step: 4,
    title: 'Embolization of Affected Veins',
    description: 'Small coils or medical foam are placed into the problematic veins to block abnormal blood flow and relieve pressure.',
    image: '/pvc_work4.png',
  },
  {
    step: 5,
    title: 'Quick Recovery & Discharge',
    description: 'The catheter is removed, and a small bandage is applied. Most patients return home within a few hours.',
    image: '/pvc_work5.png',
  },
];

const PVCHowItWorks = () => {
  return (
    <div className='py-16 sm:py-24 bg-gray-50 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center sm:text-left mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-[#2d2552]'>
            How <span className='text-[#ff3576]'>Pelvic Vein Embolization</span> Works
          </h2>
          <p className='mt-4 text-lg text-gray-600 max-w-3xl'>
            A step-by-step guide to our minimally invasive procedure for treating pelvic vein congestion.
          </p>
        </div>

        <div className='relative'>
          {/* Vertical line for desktop */}
          <div className='hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#ff3576] opacity-30 -translate-x-1/2'></div>

          <div className='space-y-16'>
            {steps.map((item, index) => (
              <div key={item.step} className='relative'>
                <div className='md:grid md:grid-cols-2 md:gap-16 items-center'>
                  {/* Image Side */}
                  <div className={`flex justify-center items-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className='relative group w-full'>
                      <div className='absolute -inset-1 bg-gradient-to-r from-[#ff3576] to-[#2d2552] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200'></div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='relative rounded-lg shadow-lg w-full h-auto object-cover transform transition duration-500 group-hover:scale-[1.01]'
                      />
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className={`mt-8 md:mt-0 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className={`text-center md:text-${index % 2 === 0 ? 'right' : 'left'}`}>
                      <span className='inline-block px-4 py-1 rounded-full bg-[#ff3576]/10 text-[#ff3576] text-sm font-bold mb-3'>
                        Step {item.step}
                      </span>
                      <h3 className='text-xl sm:text-2xl font-bold text-[#2d2552] mb-3'>
                        {item.title}
                      </h3>
                      <p className='text-gray-600 leading-relaxed text-base sm:text-lg'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step Circle for Desktop */}
                <div className='hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#ff3576] rounded-full items-center justify-center text-white font-bold border-4 border-gray-50 z-10 shadow-lg'>
                  {item.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PVCHowItWorks;
