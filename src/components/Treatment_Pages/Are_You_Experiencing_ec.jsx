import React from 'react';

const symptoms = [
  {
    title: 'SEVERE SUDDEN HEADACHE',
    description: 'A Thunderclap Headache May Indicate An Aneurysm Risk.',
  },
  {
    title: 'VISION PROBLEMS OR EYE PAIN',
    description: 'Pressure Effects From Aneurysm In Brain Areas Near Optic Nerves.',
  },
  {
    title: 'NEUROLOGICAL CHANGES',
    description: 'Numbness, Speech Issues, Or Confusion May Signal Complications.',
  },
  {
    title: 'SEIZURES',
    description: 'Abnormal Electrical Activity In The Brain Due To Aneurysm Effects.',
  },
];

const AreYouExperiencingEC = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            Are You Experiencing
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff3576]">
            These Symptoms?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            If you notice any of the following, speak to our neuroradiology team:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {symptoms.map((symptom, index) => (
            <div key={index} className="border border-[#ff3576] rounded-lg p-6 text-center flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-[#ff3576] bg-opacity-10 rounded-full mb-4">
                <span className="text-xl font-bold text-[#ff3576]">{index + 1}</span>
              </div>
              <h3 className="font-bold text-sm text-[#2d2552] mb-2 uppercase">{symptom.title}</h3>
              <p className="text-gray-600 text-sm">{symptom.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreYouExperiencingEC;
