import React from 'react';

const symptoms = [
  {
    number: 1,
    title: 'TENDER OR PAINFUL BREAST LUMP',
    description: 'A small lump (often fibroadenoma) that causes discomfort or tenderness.',
  },
  {
    number: 2,
    title: 'GROWING OR VISIBLE LUMP',
    description: 'Breast nodule increasing in size or noticeable during movement.',
  },
  {
    number: 3,
    title: 'COSMETIC CONCERNS',
    description: 'Visible lump affecting breast symmetry or appearance.',
  },
  {
    number: 4,
    title: 'PREFERS NO SURGERY',
    description: 'Looking for an effective nip-and-go treatment without open surgery.',
  },
];

const AreYouExperiencingVAE = () => {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            Are You Experiencing
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#ff3576]">
            These Symptoms?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto sm:mx-0">
            If you are experiencing any of these symptoms, talk to our expert team:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {symptoms.map((symptom) => (
            <div key={symptom.number} className="border border-[#ff3576] rounded-lg p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full mb-4">
                <span className="text-xl font-bold text-[#ff3576]">{symptom.number}</span>
              </div>
              <h3 className="text-base font-bold text-[#2d2552] mb-2">{symptom.title}</h3>
              <p className="text-sm text-gray-600">{symptom.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreYouExperiencingVAE;
