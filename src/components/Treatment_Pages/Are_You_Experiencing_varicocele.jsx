import React from 'react';

const symptoms = [
  {
    number: 1,
    title: 'BULGING OR TWISTED LEG VEINS',
    description: 'Visible, raised veins that disrupt appearance.',
  },
  {
    number: 2,
    title: 'ACHING, HEAVINESS, OR LEG DISCOMFORT',
    description: 'Especially worsened by prolonged standing or activity.',
  },
  {
    number: 3,
    title: 'LEG SWELLING OR SKIN IRRITATION',
    description: 'Including itchiness, burning, or discoloration.',
  },
  {
    number: 4,
    title: 'POOR RECOVERY FROM PREVIOUS TREATMENTS',
    description: 'Such as sclerotherapy or conservative measures.',
  },
];

const AreYouExperiencingVaricocele = () => {
  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-left max-w-4xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
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
            <div key={symptom.number} className="border border-[#ff3576] rounded-lg p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-[#ff3576] bg-opacity-10 rounded-full text-[#ff3576] font-bold text-2xl mb-4">
                {symptom.number}
              </div>
              <h3 className="font-bold text-sm text-[#2d2552] mb-2" style={{ minHeight: '3rem' }}>{symptom.title}</h3>
              <p className="text-gray-600 text-sm">{symptom.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreYouExperiencingVaricocele;
