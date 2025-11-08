import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Evaluation & planning',
    description: 'Angiography and 3D imaging confirm the size and location of the aneurysm.',
    imageUrl: '/EC_Step1.jpg',
    alt: '3D imaging of a brain aneurysm',
  },
  {
    step: 2,
    title: 'Catheter insertion',
    description: 'A catheter is guided via the femoral artery to reach the aneurysm.',
    imageUrl: '/EC_Step2.jpg',
    alt: 'Catheter insertion in the femoral artery',
  },
  {
    step: 3,
    title: 'Microcatheter navigation',
    description: 'A micro-catheter enters the aneurysm sac under real-time imaging.',
    imageUrl: '/EC_step3.jpg',
    alt: 'Microcatheter navigating to the aneurysm',
  },
  {
    step: 4,
    title: 'Coil placement',
    description: 'Soft platinum coils are deployed inside the aneurysm to promote clotting and seal it off.',
    imageUrl: '/EC_step4.jpg',
    alt: 'Coil placement inside the aneurysm',
  },
  {
    step: 5,
    title: 'Completion & recovery',
    description: 'Catheter is removed and patients typically go home within days.',
    imageUrl: '/EC_Steps5.jpg',
    alt: 'Patient recovering in a hospital room',
  },
];

const HowECWorks = () => {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">How Endovascular Coiling Works</h2>
          <p className="mt-2 text-lg text-gray-600">Step-by-step breakdown of the procedure</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-pink-300 transform -translate-x-1/2"></div>

          {steps.map((item, index) => (
            <div key={item.step} className={`mb-8 flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Image */}
              <div className="w-full md:w-5/12 px-4">
                <img src={item.imageUrl} alt={item.alt} className="rounded-lg shadow-lg w-full" />
              </div>

              {/* Step Number Circle */}
              <div className="hidden md:flex w-2/12 justify-center">
                <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl z-10">
                  {item.step}
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-5/12 px-4 mt-6 md:mt-0">
                <h3 className="text-xl font-bold text-pink-500 mb-2">Step {item.step}: {item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowECWorks;