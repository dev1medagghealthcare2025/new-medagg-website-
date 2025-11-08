import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Evaluation & imaging',
    description: 'Ultrasound or mammogram images guide assessment of the benign breast nodule (e.g., fibroadenoma).',
    image: '/VAE_Step1.jpg',
  },
  {
    step: 2,
    title: 'Local anesthesia',
    description: 'The treatment area is numbed so you remain comfortable during the procedure.',
    image: '/VAE_Step2.jpg',
  },
  {
    step: 3,
    title: 'Needle-like device insertion',
    description: 'A specialized vacuum probe is placed into the nodule via a tiny skin puncture under imaging guidance.',
    image: '/VAE_Step3.jpg',
  },
  {
    step: 4,
    title: 'Nodule suctioned out',
    description: 'The lump is completely removed using vacuum suction—no open cuts or tissue left behind.',
    image: '/VAE_Step4.jpg',
  },
  {
    step: 5,
    title: 'Post-procedure completion',
    description: 'A small bandage is applied; no stitches needed. Most patients leave the clinic the same day.',
    image: '/VAE_Step5.jpg',
  },
];

const HowVAEWorks = () => {
  return (
    <div className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            How <span className="text-[#ff3576]">Vacuum-Assisted Excision</span> Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto sm:mx-0">
            Step-by-step breakdown of the vacuum-assisted excision procedure
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#ff3576] opacity-30 -translate-x-1/2"></div>

          <div className="space-y-16">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
                  <div className={`flex justify-center items-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-lg shadow-lg w-full h-auto object-cover hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>
                  <div className={`mt-6 md:mt-0 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className={`text-center md:text-${index % 2 === 0 ? 'right' : 'left'}`}>
                      <p className="text-lg font-bold text-[#ff3576]">Step {item.step}: {item.title}</p>
                      <p className="mt-2 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
                {/* Step Circle */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#ff3576] rounded-full items-center justify-center text-white font-bold border-4 border-gray-50">
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

export default HowVAEWorks;
