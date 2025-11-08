import React from 'react';

const symptoms = [
  {
    number: 1,
    title: 'DIFFICULTY CONCEIVING',
    desc: 'Infertility due to suspected tubal blockage.',
  },
  {
    number: 2,
    title: 'BLOCKED TUBES ON HSG',
    desc: 'Proximal occlusion on one or both tubes.',
  },
  {
    number: 3,
    title: 'PREFERENCE TO AVOID IVF',
    desc: 'Seeking non-surgical, natural conception pathway.',
  },
  {
    number: 4,
    title: 'NO VISIBLE PELVIC INFECTION',
    desc: 'Healthy uterine and tubal anatomy, confirmed safe for procedure.',
  },
];

const AreYouExperienceFTE = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2552]">
            Are You Experiencing
            <br />
            <span className="text-[#ff3576]">These Symptoms?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            If you are experiencing any of these symptoms, talk to our expert team:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {symptoms.map((symptom) => (
            <div
              key={symptom.number}
              className="border border-pink-300 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#ff3576]">{symptom.number}</span>
              </div>
                            <h3 className="font-bold text-[#2D2552] text-sm mb-2">{symptom.title}</h3>
              <p className="text-gray-600 text-sm">{symptom.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreYouExperienceFTE;
