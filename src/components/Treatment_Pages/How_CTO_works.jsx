import React from 'react';

const How_CTO_works = () => {
  const steps = [
    {
      step: 1,
      title: 'Evaluation & planning',
      description: 'Echocardiogram, angiography, and CT confirm blockage specifics.',
      image: '/CTO_Steps1.jpg',
      alt: 'Patient undergoing evaluation for CTO treatment',
      align: 'left',
    },
    {
      step: 2,
      title: 'Catheter insertion',
      description: 'A catheter is guided via the wrist or groin artery toward the blockage.',
      image: '/CTO_Steps2.png',
      alt: 'Illustration of catheter insertion in the wrist',
      align: 'right',
    },
    {
      step: 3,
      title: 'Blockage crossing technique',
      description: 'Special guidewires (antegrade or retrograde methods) are used to traverse the chronic blockage.',
      image: '/CTO_Steps3.jpg',
      alt: 'Illustration of guidewire crossing a blockage in an artery',
      align: 'left',
    },
    {
      step: 4,
      title: 'Balloon angioplasty & stenting',
      description: 'Balloon expands the artery, and stents strengthen the reopened vessel.',
      image: '/CTO_Steps4.jpg',
      alt: 'Illustration of a stent placed in an artery',
      align: 'right',
    },
    {
      step: 5,
      title: 'Recovery & outcome',
      description: 'Catheter is removed; most resume normal life within days.',
      image: '/CTO_Steps5.png',
      alt: 'Patient consulting with a doctor post-procedure',
      align: 'left',
    },
  ];

  return (
    <div className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            How <span className="text-[#ff3576]">CTO Treatment</span> Works
          </h2>
          <p className="mt-2 text-lg text-gray-600">Step-by-step breakdown of the procedure</p>
        </div>

        <div className="relative">
          {/* Vertical Line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#ff3576] transform -translate-x-1/2"></div>

          {steps.map((item, index) => (
            <div key={index} className="relative mb-8 md:mb-0">
              <div className="flex flex-col md:flex-row items-center">
                {/* Content Block */}
                <div className={`w-full md:w-5/12 px-4 py-4 order-2 ${item.align === 'left' ? 'md:order-1' : 'md:order-3'}`}>
                  <h3 className="text-lg font-bold text-[#ff3576]">Step {item.step}: <span className="text-[#2d2552]">{item.title}</span></h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>

                {/* Step Circle */}
                <div className="w-full md:w-2/12 flex justify-center order-1 md:order-2">
                  <div className="z-10 bg-[#ff3576] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>

                {/* Image Block */}
                <div className={`w-full md:w-5/12 px-4 py-4 order-3 ${item.align === 'left' ? 'md:order-3' : 'md:order-1'}`}>
                  <img src={item.image} alt={item.alt} className="rounded-lg shadow-lg w-full h-auto object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default How_CTO_works;