import React from 'react';

const symptoms = [
  {
    title: 'PALPABLE, BENIGN BREAST LUMP',
    description: 'Often well-defined but causing discomfort or cosmetic concern.',
  },
  {
    title: 'FIBROADENOMA CONFIRMED BENIGN',
    description: 'Recent biopsy or imaging confirming benign nature (e.g., fibroadenoma).',
  },
  {
    title: 'PREFERENCE TO AVOID SURGERY',
    description: 'Looking for minimally invasive, scar-free treatment options.',
  },
  {
    title: 'LOW-RISK NODULE PROFILE',
    description: 'Appropriate size and location for safe ice-ball formation during ablation.',
  },
];

const AreYouExperiencingCryoablation = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            Are You Experiencing
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#ff3576]">
            These Symptoms?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            If you are experiencing any of these symptoms, talk to our expert team:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {symptoms.map((symptom, index) => (
            <div key={index} className="border border-[#ff3576] rounded-lg p-6 text-center flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full mb-4">
                <span className="text-xl font-bold text-[#ff3576]">{index + 1}</span>
              </div>
              <h3 className="text-base font-bold text-[#2d2552] mb-3 h-12 flex items-center">{symptom.title}</h3>
              <p className="text-sm text-gray-600">{symptom.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreYouExperiencingCryoablation;
