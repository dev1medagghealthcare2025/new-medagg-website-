import React from 'react';

const steps = [
  {
    title: 'Evaluation & planning',
    description: 'Heart mapping (via ECG and imaging) identifies the electrical pathways causing arrhythmia.',
    image: '/RFA_Step1.png',
  },
  {
    title: 'Catheter insertion',
    description: 'A catheter is inserted via a small incision—typically in the groin or wrist—and guided to the heart.',
    image: '/RFA_Step2.png',
  },
  {
    title: 'Mapping the arrhythmia source',
    description: 'Advanced mapping pinpoints the specific tissue responsible for the abnormal rhythm.',
    image: '/RFA_step3.png',
  },
  {
    title: 'Thermal ablation',
    description: 'Heat energy is delivered through the catheter to destroy this problematic tissue and restore normal electrical flow.',
    image: '/RFA_Step4.png',
  },
  {
    title: 'Completion & recovery',
    description: 'Catheter removed; most patients go home the same day and resume daily life within days.',
    image: '/RFA_Step5.png',
  },
];

const How_rfa_work = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            How <span className="text-[#ff3576]">RFA Works</span>
          </h2>
          <p className="mt-3 text-lg text-gray-600">Step-by-step breakdown of the procedure</p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-[#ff3576] opacity-30"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative mb-12">
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                {/* Text Content */}
                <div className={`text-center md:text-left ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="mb-4">
                    <span className="text-lg font-semibold text-[#ff3576]">Step {index + 1}: {step.title}</span>
                  </div>
                  <p className="text-gray-600 text-base md:text-lg">{step.description}</p>
                </div>

                {/* Image */}
                <div className={`mt-8 md:mt-0 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <img 
                    src={step.image} 
                    alt={`Step ${index + 1}: ${step.title}`} 
                    className="rounded-lg shadow-xl w-full h-auto object-cover mx-auto max-w-md"
                  />
                </div>
              </div>

              {/* Step Circle */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#ff3576] rounded-full items-center justify-center text-white font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default How_rfa_work;