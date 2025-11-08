import React from 'react';

const symptoms = [
  {
    number: 1,
    title: 'SEVERE SUDDEN HEADACHE',
    description: 'A Thunderclap Headache May Indicate An Aneurysm Risk.',
  },
  {
    number: 2,
    title: 'VISION PROBLEMS OR EYE PAIN',
    description: 'Pressure Effects From Aneurysm In Brain Areas Near Optic Nerves.',
  },
  {
    number: 3,
    title: 'NEUROLOGICAL CHANGES',
    description: 'Numbness, Speech Issues, Or Confusion May Signal Complications.',
  },
  {
    number: 4,
    title: 'SEIZURES',
    description: 'Abnormal Electrical Activity In The Brain Due To Aneurysm Effects.',
  },
];

const AreYouExperiencingRFAForAVM = () => {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Are You Experiencing
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-pink-500">
            These Symptoms?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            If you notice any of the following, speak to our neuroradiology team:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {symptoms.map((symptom) => (
            <div key={symptom.number} className="rounded-lg border border-pink-400 p-6 flex flex-col items-center h-full">
              <div className="flex justify-start items-center mb-4">
                <div className="bg-pink-100 rounded-full h-10 w-10 flex items-center justify-center text-pink-500 font-bold text-lg">
                  {symptom.number}
                </div>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-wide text-center">{symptom.title}</h3>
              <p className="text-gray-900 text-sm text-center">{symptom.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreYouExperiencingRFAForAVM;