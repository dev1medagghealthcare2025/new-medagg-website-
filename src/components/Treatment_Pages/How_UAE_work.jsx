import React from 'react';

const HowUAEWorks = () => {
  const steps = [
    {
      step: 1,
      title: 'Step 1: Evaluation & imaging',
      description: 'Your doctor reviews medical history and imaging (MRI or ultrasound), confirms fibroid presence and placement.',
      image: '/UAE_Step1.jpg',
    },
    {
      step: 2,
      title: 'Step 2: Access via wrist or groin',
      description: 'A thin catheter is inserted through a small puncture—usually in the groin or wrist—and guided using x-ray (fluoroscopy).',
      image: '/ufe_step2_new.png',
    },
    {
      step: 3,
      title: 'Step 3: Guided contrast and mapping',
      description: 'Contrast dye is injected under fluoroscopy to highlight uterine arteries that feed the fibroids.',
      image: '/UAE_Step3.jpg',
    },
    {
      step: 4,
      title: 'Step 4: Delivery of embolic particles',
      description: 'Microscopic particles (sand-sized, gelatin, or microspheres) are released via catheter to block blood flow to fibroids.',
      image: '/UAE_Step4.jpg',
    },
    {
      step: 5,
      title: 'Step 5: Fibroid shrinkage begins',
      description: 'Without blood supply, fibroids gradually shrink over time—symptoms ease as the uterus recovers.',
      image: '/UAE_Step5.jpg',
    },
  ];

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2d2552]">
            How <span className="text-[#ff3576]">Uterine Artery Embolization</span> Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Step-by-step breakdown of the uterine artery embolization procedure.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line - Hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-pink-300 hidden md:block" aria-hidden="true"></div>

          {steps.map((step, index) => (
            <div key={step.step} className="relative md:grid md:grid-cols-2 md:gap-x-16 md:items-center mb-12">
              
              {/* Content Block */}
              <div className={`w-full ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8 md:order-2'}`}>
                <h3 className="text-xl font-bold text-[#ff3576]">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>

              {/* Timeline Circle - Centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-[#ff3576] flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
              </div>

              {/* Image Block */}
              <div className={`w-full mt-6 md:mt-0 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:order-1'}`}>
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="shadow-lg w-full max-w-[515px] h-[218px] object-cover mx-auto rounded-[10px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowUAEWorks;
