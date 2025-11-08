import React from 'react';

const steps = [
  {
    title: 'Evaluation & planning',
    description: 'Imaging (CT, echocardiography) measures valve anatomy and guides valve selection and approach.',
    image: '/TAVI_step1.jpg',
  },
  {
    title: 'Catheter insertion',
    description: 'A catheter is guided through the femoral artery (groin) or wrist.',
    image: '/TAVI_Step2.jpg',
  },
  {
    title: 'Valve positioning',
    description: 'The collapsed replacement valve is advanced to the diseased valve site.',
    image: '/TAVI_Steps3.jpg',
  },
  {
    title: 'Valve deployment',
    description: 'Balloon or self-expanding technology anchors the new valve.',
    image: '/TAVI_Steps4.jpg',
  },
  {
    title: 'Recovery & improvement',
    description: 'The catheter is removed and most patients recover quickly, resuming activity within days.',
    image: '/TAVI_Steps5.jpg',
  },
];

const HowTaviWorks = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            How <span className="text-pink-500">TAVI</span> Works
          </h2>
          <p className="mt-2 text-lg text-gray-600">Step-by-step breakdown of the TAVI procedure</p>
        </div>

        <div className="relative">
          {/* Vertical line - for desktop view */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-0.5 bg-pink-300"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative mb-12">
              <div className="grid md:grid-cols-2 gap-20 items-center">
                {/* Text Content - order depends on index */}
                <div className={`text-center md:text-left ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <h3 className="text-xl font-bold text-pink-500 mb-2">Step {index + 1}: {step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Image - order depends on index */}
                <div className={`${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <img src={step.image} alt={`Step ${index + 1}: ${step.title}`} className="rounded-lg shadow-lg mx-auto" />
                </div>
              </div>

              {/* Step Number Circle - for desktop view */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-pink-500 rounded-full items-center justify-center text-white font-bold text-xl">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowTaviWorks;