import React from 'react';

const symptoms = [
  {
    no: 1,
    title: 'CHRONIC SHOULDER PAIN',
    desc: 'Helps reduce persistent discomfort that hasn’t improved with medications or exercises.',
  },
  {
    no: 2,
    title: 'PAIN WHILE LIFTING OR ROTATING YOUR ARM',
    desc: 'ACE may improve daily mobility that usually takes months with standard care alone.',
  },
  {
    no: 3,
    title: 'PAIN AT NIGHT OR WHILE RESTING',
    desc: 'Reduced inflammation may help restore comfortable sleep.',
  },
  {
    no: 4,
    title: 'RECOMMENDED FOR SURGERY OR MUA?',
    desc: 'ACE may offer a non-surgical alternative for patients hesitant about invasive procedures.',
  },
];

const AreYouExperiencingFrozen = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center lg:text-left mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]">
            Are You Experiencing
            <br />
            <span className="text-pink-600">These Symptoms?</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto lg:mx-0">
            If you have any of the following, ACE may be right for you:
          </p>
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {symptoms.map((symptom) => (
            <div
              key={symptom.no}
              className="bg-white rounded-lg shadow-md p-5 border-l-4 border-pink-500 transition-shadow hover:shadow-lg"
            >
              <div className="mb-3">
                <span className="inline-block bg-pink-100 text-pink-700 text-sm font-bold px-2 py-1 rounded">
                  {symptom.no}
                </span>
              </div>
              <h3 className="font-bold text-[#1a1446] text-sm mb-2 leading-tight">
                {symptom.title}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">{symptom.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreYouExperiencingFrozen;