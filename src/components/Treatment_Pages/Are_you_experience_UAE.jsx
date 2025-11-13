import React from 'react';

const AreYouExperiencingUAE = () => {
  const symptoms = [
    {
      number: 1,
      title: 'HEAVY MENSTRUAL BLEEDING',
      description: 'Frequent, heavy periods that affect your quality of life.',
    },
    {
      number: 2,
      title: 'PELVIC PRESSURE OR BLOATING',
      description: 'Fibroids causing fullness or a protruding abdomen.',
    },
    {
      number: 3,
      title: 'PAIN DURING SEX OR BACKACHE',
      description: 'Discomfort or pain in pelvic or lower back areas.',
    },
    {
      number: 4,
      title: 'FREQUENT URINATION OR BOWEL PRESSURE',
      description: 'Fibroid compression on bladder or bowel.',
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2d2552]">
            Are You Experiencing <span className="text-[#ff3576]">These Symptoms?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            If you are experiencing any of these symptoms, talk to our expert team:
          </p>
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {symptoms.map((symptom) => (
            <div
              key={symptom.number}
              className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 md:border-2 md:border-pink-200 text-center flex flex-col items-center"
            >
              {/* Number circle: show on md+, hide on mobile */}
              <div className="hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-pink-100 text-[#ff3576] text-xl font-bold mb-4">
                {symptom.number}
              </div>
              {/* Title: slightly larger on mobile, original uppercase on md+ */}
              <h3 className="text-base font-semibold text-[#2d2552] md:text-base md:font-bold md:uppercase md:tracking-wide">{symptom.title}</h3>
              {/* Description: desktop only */}
              <p className="hidden md:block mt-2 text-sm text-gray-600">{symptom.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreYouExperiencingUAE;
