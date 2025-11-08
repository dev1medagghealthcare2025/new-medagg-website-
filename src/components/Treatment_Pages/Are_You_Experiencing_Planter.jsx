import React from 'react';

const AreYouExperiencingPlanter = () => {
  const symptoms = [
    {
      id: 1,
      title: 'PERSISTENT HEEL PAIN',
      description: 'Sharp Or Stabbing, Worst In The Morning Or After Rest.',
      bgColor: 'bg-white',
      numberColor: 'bg-[#ff3576]'
    },
    {
      id: 2,
      title: 'PAIN AFTER ACTIVITY',
      description: 'Increases After Long Standing, Walking, Or Exercise.',
      bgColor: 'bg-white',
      numberColor: 'bg-[#ff3576]'
    },
    {
      id: 3,
      title: 'STIFFNESS & SWELLING',
      description: 'Tightness In The Heel Or Arch Area.',
      bgColor: 'bg-white',
      numberColor: 'bg-[#ff3576]'
    },
    {
      id: 4,
      title: 'RELIEF WITH REST',
      description: 'Pain Eases When Resting But Returns With Activity.',
      bgColor: 'bg-white',
      numberColor: 'bg-[#ff3576]'
    }
  ];

  return (
    <div className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header Section */}
        <div className="text-left mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2552] mb-4">
            Are You Experiencing
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3576] mb-6">
            These Symptoms?
          </h3>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
            If you are experiencing any of these symptoms, talk to our expert team:
          </p>
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {symptoms.map((symptom) => (
            <div
              key={symptom.id}
              className={`${symptom.bgColor} rounded-lg p-4 md:p-6 border border-gray-200 flex flex-col items-center text-center`}
            >
              {/* Number Circle */}
              <div className={`${symptom.numberColor} w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4`}>
                <span className="text-white font-bold text-base md:text-lg">
                  {symptom.id}
                </span>
              </div>

              {/* Content */}
              <div>
                <h4 className="text-[#2d2552] font-bold text-xs md:text-sm mb-2 leading-tight">
                  {symptom.title}
                </h4>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {symptom.description}
                </p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default AreYouExperiencingPlanter;