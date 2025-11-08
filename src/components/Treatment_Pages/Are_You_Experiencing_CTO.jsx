import React from 'react';

const Are_You_Experiencing_CTO = () => {
  const symptoms = [
    {
      number: 1,
      title: 'CHEST PAIN OR TIGHTNESS',
      description: 'Persistent Angina Caused By Blocked Coronary Arteries.',
    },
    {
      number: 2,
      title: 'BREATHLESSNESS',
      description: 'Shortness Of Breath, Especially During Mild Exertion.',
    },
    {
      number: 3,
      title: 'FAINTING OR DIZZINESS',
      description: 'Easily Feeling Tired Due To Reduced Blood Supply To The Heart.',
    },
    {
      number: 4,
      title: 'FATIGUE & REDUCED STAMINA',
      description: 'Lightheadedness Or Near-Fainting During Activity.',
    },
  ];

  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            Are You Experiencing
            <br />
            <span className="text-[#ff3576]">These Symptoms?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            See how minimally invasive CTO PCI compares to bypass surgery
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {symptoms.map((symptom, index) => (
            <div
              key={index}
              className="border-2 border-[#ff3576] rounded-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-[#ff3576]">{symptom.number}</span>
              </div>
              <h3 className="text-sm font-bold text-[#2d2552] mb-2 h-10 flex items-center">{symptom.title}</h3>
              <p className="text-gray-500 text-sm">{symptom.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Are_You_Experiencing_CTO;