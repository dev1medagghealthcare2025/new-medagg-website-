import React from 'react';

const HowBreastNoduleRFAWorks = () => {
  const steps = [
    {
      step: 1,
      title: 'Evaluation & Imaging',
      description: 'Ultrasound (or mammogram) confirms nodule characteristics and ensures suitability for RFA.',
      imageUrl: '/BN3_Step1.png',
      imageSide: 'right',
    },
    {
      step: 2,
      title: 'Local anesthesia',
      description: 'The breast area is numbed so you stay comfortable throughout.',
      imageUrl: '/BN3_Step2.png',
      imageSide: 'left',
    },
    {
      step: 3,
      title: 'Probe insertion under imaging guidance',
      description: 'A thin RFA probe is guided into the nodule using real-time ultrasound or CT, achieving accurate placement.',
      imageUrl: '/BN3_steps3.png',
      imageSide: 'right',
    },
    {
      step: 4,
      title: 'Thermal ablation',
      description: 'Radiofrequency energy is delivered through the probe to generate heat and destroy the nodule tissue.',
      imageUrl: '/BN3_Steps4.png',
      imageSide: 'left',
    },
    {
      step: 5,
      title: 'Post-procedure recovery',
      description: 'Probe is removed; a small bandage is placed. You typically go home the same day and resume normal life within a few days.',
      imageUrl: '/BN3_Steps5.png',
      imageSide: 'right',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            How <span className="text-[#ff3576]">Radiofrequency Ablation</span> Works
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            RFA delivers targeted heat to benign nodules for effective ablation and preservation of surrounding tissue.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line - visible on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#ff3576] opacity-30" aria-hidden="true"></div>

          <div className="space-y-12 md:space-y-16">
            {steps.map((step) => (
              <div key={step.step} className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-x-8 items-center">
                  {/* Image */}
                  <div className={`flex justify-center ${step.imageSide === 'left' ? 'md:order-1' : 'md:order-2'}`}>
                    <img 
                      src={step.imageUrl} 
                      alt={`Step ${step.step}`} 
                      className="rounded-lg shadow-md w-[515px] h-[218px] object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className={`mt-4 md:mt-0 ${step.imageSide === 'left' ? 'md:order-2 md:pl-8' : 'md:order-1 md:pr-8 md:text-right'}`}>
                    <h3 className="text-lg font-bold text-[#2d2552] mb-2">
                      <span className="text-[#ff3576]">Step {step.step}:</span> {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Step Number Circle - visible on desktop */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#ff3576] text-white rounded-full items-center justify-center font-bold text-sm z-10">
                  {step.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowBreastNoduleRFAWorks;