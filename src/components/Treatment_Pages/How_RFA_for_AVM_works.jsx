import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Evaluation & planning',
    description: 'Angiography and 3D imaging confirm the size, location, and anatomy of the AVM',
    image: '/Rfa_Avm_step1.png',
  },
  {
    step: 2,
    title: 'Catheter insertion',
    description: 'A catheter or probe is inserted through a small incision and guided to the AVM site',
    image: '/Rfa_Avm_step2.png',
  },
  {
    step: 3,
    title: 'Navigation into AVM',
    description: 'Using real-time imaging, the catheter is advanced into the malformation',
    image: '/Rfa_Avm_step3.png',
  },
  {
    step: 4,
    title: 'Thermal ablation',
    description: 'Heat energy is applied to close off or shrink the tangled vessels',
    image: '/Rfa_Avm_step4.png',
  },
  {
    step: 5,
    title: 'Completion & recovery',
    description: 'The catheter is removed; most patients go home the same day or within 24 hours',
    image: '/Rfa_Avm_steps5.png',
  },
];

const HowRFAForAVMWorks = () => {
  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            How <span className="text-pink-500">RFA for AVM</span> Works
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 h-full w-1 bg-pink-300 transform -translate-x-1/2"></div>

          {/* Timeline Items */}
          {steps.map((item, index) => {
            const isEven = index % 2 === 0;
            const content = (
              <div className="w-5/12 px-4 py-2">
                <h3 className="text-lg font-bold text-pink-500 mb-2 text-left">Step {item.step}: {item.title}</h3>
                <p className="text-gray-600 text-sm text-left">{item.description}</p>
              </div>
            );
            const image = (
              <div className="w-5/12">
                <img src={item.image} alt={`Step ${item.step}`} className="w-full rounded-lg shadow-lg" />
              </div>
            );

            return (
              <div key={index} className="mb-8 flex justify-between items-center w-full">
                {isEven ? content : image}
                <div className="z-10">
                  <div className="bg-pink-500 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                </div>
                {isEven ? image : content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowRFAForAVMWorks;