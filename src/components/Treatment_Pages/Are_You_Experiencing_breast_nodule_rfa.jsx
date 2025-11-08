import React from 'react';

const AreYouExperiencingBreastNoduleRFA = () => {
  const symptoms = [
    {
      number: 1,
      title: 'PALPABLE, BENIGN BREAST NODULE',
      description: 'Often causes discomfort, pain, or cosmetic concern.',
    },
    {
      number: 2,
      title: 'FIBROADENOMA CONFIRMED BENIGN',
      description: 'Imaging or biopsy confirms non-cancerous nodule (e.g., fibroadenoma).',
    },
    {
      number: 3,
      title: 'SEEKING MINIMALLY INVASIVE OPTION',
      description: 'Looking for a treatment that avoids surgical excision and scars.',
    },
    {
      number: 4,
      title: 'SUITABLE NODULE PROFILE FOR RFA',
      description: 'Nodule size and location appropriate for safe radiofrequency treatment.',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            Are You Experiencing
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff3576] mb-4">
            These Symptoms?
          </h2>
          <p className="text-base text-gray-600">
            If you are experiencing any of these symptoms, talk to our expert team:
          </p>
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {symptoms.map((symptom) => (
            <div
              key={symptom.number}
              className="border border-[#ff3576] rounded-xl p-6 text-center flex flex-col items-center transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-[#ff3576]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#ff3576]">
                  {symptom.number}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#2d2552] mb-2 uppercase flex-grow">
                {symptom.title}
              </h3>
              <p className="text-sm text-gray-600">
                {symptom.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreYouExperiencingBreastNoduleRFA;