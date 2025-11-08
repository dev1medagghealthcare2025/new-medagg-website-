import React from 'react';

const symptoms = [
  {
    number: 1,
    title: 'DULL SCROTAL PAIN OR DISCOMFORT',
    description: 'Pain worsens with standing or physical activity.',
  },
  {
    number: 2,
    title: 'VISIBLE OR ENLARGED VEINS IN SCROTUM',
    description: 'Veins feel twisted like a “bag of worms.”',
  },
  {
    number: 3,
    title: 'INFERTILITY OR POOR SEMEN QUALITY',
    description: 'Varicocele may affect testicular function and sperm quality.',
  },
  {
    number: 4,
    title: 'TESTICLE SHRINKING',
    description: 'One testicle appears noticeably smaller or underdeveloped.',
  },
];

const AreYouExperiencingVaricocele = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            Are You Experiencing
            <br />
            <span className="text-[#ff3576]">These Symptoms?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            If you are experiencing any of these symptoms, talk to our expert team:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {symptoms.map((symptom) => (
            <div key={symptom.number} className="border border-[#ff3576] rounded-2xl p-6 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-pink-100/50 rounded-full mb-4">
                <span className="text-xl font-bold text-[#ff3576]">{symptom.number}</span>
              </div>
              <h3 className="text-sm font-bold text-[#2d2552] mb-2 flex-grow">{symptom.title}</h3>
              <p className="text-gray-600 text-sm">{symptom.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreYouExperiencingVaricocele;
