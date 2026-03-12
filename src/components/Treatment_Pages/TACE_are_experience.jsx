import React from 'react';

const TACE_are_experience = () => {
  const symptoms = [
    {
      id: 1,
      title: 'Persistent abdominal pain',
      description: 'Pain or discomfort in the upper right side of the abdomen that may worsen over time.'
    },
    {
      id: 2,
      title: 'Loss of appetite or weight loss',
      description: 'Unintentional weight loss or reduced appetite without obvious cause.'
    },
    {
      id: 3,
      title: 'Fatigue and weakness',
      description: 'Feeling constantly tired or lacking energy even with adequate rest.'
    },
    {
      id: 4,
      title: 'Abnormal liver imaging',
      description: 'Liver lesions or suspicious findings detected on ultrasound, CT scan, or MRI.'
    }
  ];

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#241b3a] leading-tight">
            Are You Experiencing<br />
            <span className="text-[#ff3576]">These Symptoms?</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-gray-500 max-w-4xl leading-relaxed">
            Liver tumors may not cause symptoms in the early stages. However, as the disease progresses, certain symptoms may begin to appear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {symptoms.map((symptom) => (
            <div 
              key={symptom.id} 
              className="relative p-6 bg-white rounded-xl shadow-sm border-l-4 border-[#ff3576] hover:shadow-md transition-shadow h-full flex flex-col"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#ff3576]/10 text-[#ff3576] font-bold text-sm">
                  {symptom.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#241b3a] mb-3 leading-snug">
                {symptom.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {symptom.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TACE_are_experience;
