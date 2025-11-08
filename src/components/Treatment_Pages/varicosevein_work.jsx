import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Evaluation & imaging',
    description: 'Your doctor reviews symptoms and performs Doppler ultrasound to confirm vein reflux and treatment eligibility.',
    imgSrc: '/vv_step1.jpg',
  },
  {
    step: 2,
    title: 'Access via small skin puncture',
    description: 'A catheter is inserted into the affected vein through a tiny puncture under ultrasound guidance—no major incisions.',
    imgSrc: '/vv_step2.jpg',
  },
  {
    step: 3,
    title: 'Guided ablation using heat or adhesive',
    description: 'Laser, radiofrequency, or medical glue is delivered via catheter to cauterize or seal the vein, which then collapses.',
    imgSrc: '/vv_step3.jpg',
  },
    {
    step: 4,
    title: 'Destroying the diseased vein',
    description: 'Heat or adhesive closes the vein wall; blocked vein eventually converts to scar tissue and stops causing symptoms.',
    imgSrc: '/vv_step4.jpg',
  },
  {
    step: 5,
    title: 'Recovery and long-term relief',
    description: 'With flow diverted to healthy veins, symptoms like pain, swelling, and appearance improve over weeks to months.',
    imgSrc: '/vv_step5.jpg',
  },
];

const VaricoseVeinWork = () => {
  return (
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-left max-w-4xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            How <span className="text-[#ff3576]">Endovenous Ablation</span> Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Step-by-step breakdown of the endovenous ablation procedure
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-[#ff3576] opacity-30"></div>

          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative md:grid md:grid-cols-2 md:gap-16 items-center mb-12 group"
            >
              {/* Step Number Circle for Desktop */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 bg-[#ff3576] rounded-full text-white font-bold text-xl shadow-md z-10">
                {item.step}
              </div>

              {/* Image */}
              <div className={`flex justify-center ${index % 2 === 0 ? 'md:order-last' : ''}`}>
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="rounded-lg shadow-lg object-cover w-full max-w-md"
                />
              </div>

              {/* Content */}
              <div className={`mt-6 md:mt-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <h3 className="text-xl font-bold text-[#2d2552] mb-2">
                  <span className="text-[#ff3576]">Step {item.step}: </span>{item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VaricoseVeinWork;
