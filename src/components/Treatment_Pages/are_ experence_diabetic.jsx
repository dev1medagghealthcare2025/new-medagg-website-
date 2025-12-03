import React from 'react';

const symptoms = [
  {
    no: 1,
    title: 'NON-HEALING FOOT WOUNDS',
    desc: "Ulcers or cuts on the foot that don't heal despite dressings or antibiotics.",
    highlight: true,
  },
  {
    no: 2,
    title: 'DARK, DISCOLOURED OR BLACKENED TOES',
    desc: 'Colour change, coldness, or dry gangrene.',
    highlight: false,
  },
  {
    no: 3,
    title: 'SEVERE FOOT PAIN AT REST OR AT NIGHT',
    desc: "Pain even when you're not walking, often worse when lying down.",
    highlight: false,
  },
  {
    no: 4,
    title: 'CRAMPING OR PAIN WHEN WALKING SHORT DISTANCES',
    desc: 'Needing to stop frequently due to calf, thigh, or buttock pain.',
    highlight: false,
  },
];

const AreYouExperiencingDiabetic = () => {
  return (
    <section className="w-full bg-gray-50 py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]">
            Are You Experiencing
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-pink-600 mb-4">
            These Symptoms?
          </h3>
          <p className="text-gray-600 max-w-2xl">
            You should speak to a specialist urgently if you have diabetes and:
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {symptoms.map((symptom) => (
            <div
              key={symptom.no}
              className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${symptom.highlight ? 'border-pink-500' : 'border-transparent'} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            >
              <span className="inline-block bg-pink-100 text-pink-700 text-sm font-bold px-3 py-1 rounded-md mb-4">
                {symptom.no}
              </span>
              <h4 className="text-sm font-bold text-[#1a1446] mb-2 uppercase tracking-wide">
                {symptom.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {symptom.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreYouExperiencingDiabetic;
