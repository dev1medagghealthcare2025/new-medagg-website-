import React from 'react';

const HowPlantarWork = () => {
  const steps = [
    {
      title: 'Catheter insertion',
      description: 'A tiny catheter is inserted via a small puncture in the ankle or thigh to reach the inflamed fascia.',
      image: '/Planter_step1.jpg',
    },
    {
      title: 'Imaging guidance',
      description: 'Live imaging (ultrasound or X-ray) directs the catheter to the precise blood vessels feeding the inflamed fascia.',
      image: '/Planter_step2.jpg',
    },
    {
      title: 'Microparticle injection',
      description: 'Microscopic embolic particles are injected into those vessels to reduce blood flow to the irritated tissue.',
      image: '/Planter_step3.jpg',
    },
    {
      title: 'Healing process begins',
      description: 'Reduced blood supply triggers natural healing of the inflamed fascia tissue.',
      image: '/planter_step4_new.png',
    },
    {
      title: 'Pain relief',
      description: 'As inflammation subsides, patients experience lasting relief and improved walking comfort.',
      image: '/Planter_step5.jpg',
    },
  ];

  const StepComponent = ({ step, index }) => {
    const isEven = index % 2 === 0;
    const content = (
      <div className="w-full md:w-5/12 px-8 md:px-12">
        <h3 className="text-xl md:text-2xl font-bold text-[#ff3576] mb-3">
          Step {index + 1}: {step.title}
        </h3>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">{step.description}</p>
      </div>
    );

    const image = (
      <div className="w-full md:w-5/12 px-8 md:px-12">
        <img 
          src={step.image} 
          alt={step.title} 
          className="rounded-lg shadow-lg mx-auto object-cover" 
          style={{ width: '515px', height: '218px' }}
        />
      </div>
    );

    return (
      <div className="flex flex-wrap items-center justify-center mb-16 md:mb-20">
        {isEven ? <>{content}{image}</> : <>{image}{content}</>}
      </div>
    );
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-left mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d2552] leading-tight">
            How <span className="text-[#ff3576]">Plantar Fascial Embolization</span>
          </h2>
          <p className="text-gray-600 mt-4 text-xl md:text-2xl">Step-by-step breakdown of the PFE procedure</p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#ff3576] transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative mb-12 md:mb-16">
              {/* Timeline dot for desktop */}
              <div className="hidden md:flex items-center justify-center absolute top-1/2 left-1/2 w-10 h-10 bg-[#ff3576] rounded-full text-white font-bold transform -translate-y-1/2 -translate-x-1/2 z-10 shadow-lg">
                {index + 1}
              </div>
              <StepComponent step={step} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowPlantarWork;
