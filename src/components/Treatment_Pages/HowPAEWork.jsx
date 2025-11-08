import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Initial Consultation',
    description: 'Meet with our specialists to discuss your symptoms, medical history, and determine if PAE is right for you.',
    image: '/PAE_Step1_New.png',
  },
  {
    step: 2,
    title: 'Imaging & Evaluation',
    description: 'Detailed MRI and ultrasound scans to assess your prostate size, shape, and confirm suitability for PAE.',
    image: '/Imaging Evaluation.jpg',
  },
  {
    step: 3,
    title: 'Artery Mapping',
    description: 'Advanced imaging creates a precise map of your prostate\'s blood vessels to guide the procedure.',
    image: '/Artery Mapping.jpg',
  },
  {
    step: 4,
    title: 'Catheter-based Embolization',
    description: 'A thin catheter delivers tiny particles to reduce the blood flow to the enlarged prostate, causing it to shrink.',
    image: '/Catheter- Based Embolization.jpg',
  },
  {
    step: 5,
    title: 'Symptom Relief Begins',
    description: 'As the prostate shrinks over the following weeks, urinary symptoms gradually improve with full benefits in 1-3 months.',
    image: '/pae_new_step5.png',
  },
];

const HowPAEWork = () => {
  return (
    <div className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            How <span className="text-[#ff3576]">PAE</span> Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto sm:mx-0">
            Understanding the procedure step-by-step helps build confidence in your treatment choice.
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
                      className={`shadow-lg w-full object-cover hover:shadow-xl transition-shadow duration-300 ${
                        [2, 3, 4].includes(item.step)
                          ? 'h-auto md:w-[515px] md:h-[218px] rounded-[10px]'
                          : 'h-auto rounded-lg'
                      }`}
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

export default HowPAEWork;