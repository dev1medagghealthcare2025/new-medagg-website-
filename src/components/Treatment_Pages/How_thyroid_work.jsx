import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Evaluation & imaging',
    description: 'Ultrasound and FNAC/biopsy are done to confirm the nodule is non-cancerous and suitable for ablation.',
    image: '/Thyorid_new_step1.png',
  },
  {
    step: 2,
    title: 'Planning the approach',
    description: 'The radiologist maps the nodule and plans the access point with imaging.',
    image: '/Thyroid_step2.jpg',
  },
  {
    step: 3,
    title: 'Needle insertion under ultrasound guidance',
    description: 'A thin probe or needle is inserted into the thyroid nodule using live ultrasound.',
    image: '/thyorid_step3.jpg',
  },
  {
    step: 4,
    title: 'Thermal ablation',
    description: 'Heat (via radiofrequency or laser) is applied to destroy the nodule internally — without harming surrounding tissue.',
    image: '/thyorid_step4.jpg',
  },
  {
    step: 5,
    title: 'Shrinking begins',
    description: 'The body gradually absorbs the treated nodule, relieving pressure, swelling, or visible bulge.',
    image: '/Thyorid_step_5_new.png',
  },
];

const HowThyroidWork = () => {
  return (
    <div className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            How <span className="text-[#ff3576]">Thyroid Ablation</span> Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto sm:mx-0">
            Step-by-step breakdown of the thyroid nodule ablation procedure.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#ff3576] opacity-30 -translate-x-1/2"></div>

          <div className="space-y-16">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  {/* Image Column */}
                  <div className={`flex justify-center items-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                                                                  className="rounded-[10px] shadow-lg w-[515px] h-[218px] object-cover hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>
                  {/* Text Column */}
                  <div className={`mt-6 md:mt-0 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className={`text-center md:text-${index % 2 === 0 ? 'right' : 'left'}`}>
                      <p className="text-lg font-bold text-[#ff3576]">Step {item.step}: {item.title}</p>
                      <p className="mt-2 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
                {/* Step Circle (Center) */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#ff3576] rounded-full items-center justify-center text-white font-bold border-4 border-white">
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

export default HowThyroidWork;