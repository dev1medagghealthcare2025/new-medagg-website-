import React from 'react';

const symptoms = [
  {
    number: 1,
    title: 'CHEST PAIN OR TIGHTNESS',
    description: 'Caused By Restricted Blood Flow Through The Narrowed Aortic Valve.',
  },
  {
    number: 2,
    title: 'BREATHLESSNESS',
    description: 'Heart Struggles To Pump Enough Oxygen-Rich Blood.',
  },
  {
    number: 3,
    title: 'FAINTING OR DIZZINESS',
    description: 'Reduced Blood Supply To The Brain During Activity.',
  },
  {
    number: 4,
    title: 'FATIGUE & REDUCED STAMINA',
    description: 'Body Tires Quickly Due To Limited Cardiac Output.',
  },
];

const AreYouExperiencingTAVI = () => {
  return (
    <section className="py-12 md:py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Are You Experiencing
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-4">
            These Symptoms?
          </h2>
          <p className="text-lg text-gray-600">
            If you are experiencing any of these symptoms, talk to our expert team:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {symptoms.map((symptom) => (
            <div 
              key={symptom.number}
              className="border border-pink-300 rounded-lg p-6 text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-pink-500">{symptom.number}</span>
              </div>
              <h3 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">{symptom.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{symptom.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreYouExperiencingTAVI;