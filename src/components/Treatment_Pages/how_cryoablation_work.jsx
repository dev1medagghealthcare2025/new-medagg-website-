import React from 'react';

const steps = [
  {
    title: 'Evaluation & Imaging',
    description: 'Ultrasound assesses nodule characteristics and confirms eligibility for cryoablation.',
    image: '/VAE_Step1.jpg',
  },
  {
    title: 'Local Anesthesia',
    description: 'The treatment area is numbed to ensure patient comfort throughout the procedure.',
    image: '/VAE_Step2.jpg',
  },
  {
    title: 'Cryoprobe Insertion Under Imaging Guidance',
    description: 'A thin cryoprobe is guided into the nodule using ultrasound (or CT) imaging.',
    image: '/cryboliation_step3.jpg',
  },
  {
    title: 'Freeze-Thaw Cycles Destroy Nodule',
    description: 'Liquid nitrogen or argon is used to create an ice ball around the nodule. The freeze-thaw sequence destroys targeted tissue and a safety margin.',
    image: '/Cryboliation_step4.jpg',
  },
  {
    title: 'Post-Procedure Bandage, Outpatient Recovery',
    description: 'Probe is removed, a small bandage is applied, and patients can go home the same day. The frozen tissue gradually resolves over weeks to months.',
    image: '/VAE_Step5.jpg',
  },
];

const HowCryoablationWorks = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            How <span className="text-[#ff3576]">Cryoablation</span> Works
          </h2>
          <p className="mt-2 text-lg text-gray-600">Step-by-step breakdown of the cryoablation procedure</p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-0.5 bg-[#ff3576]"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative md:grid md:grid-cols-2 md:gap-16 items-center mb-12">
              {/* Step Number Circle */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#ff3576] rounded-full items-center justify-center text-white font-bold">
                {index + 1}
              </div>

              {/* Text Content */}
              <div className={`text-left ${index % 2 === 0 ? 'md:order-1 md:text-right' : 'md:order-2'}`}>
                <div className={`md:w-5/6 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                  <h3 className="text-lg font-bold text-[#ff3576]">Step {index + 1}: {step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>
              </div>

              {/* Image Content */}
              <div className={`mt-6 md:mt-0 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className={`rounded-lg shadow-lg w-full h-auto object-cover max-h-64 mx-auto md:w-5/6 ${index % 2 !== 0 ? 'md:ml-auto' : ''}`} 
                />
              </div>

              {/* Mobile Step Number */}
               <div className="md:hidden flex items-center gap-4 mt-6">
                <div className="w-8 h-8 bg-[#ff3576] rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <hr className="w-full border-t-2 border-[#ff3576]"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowCryoablationWorks;
