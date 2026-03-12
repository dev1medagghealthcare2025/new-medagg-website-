import React from 'react';

const HowTACEWorks = () => {
  const steps = [
    {
      step: 1,
      title: 'Clinical Evaluation',
      description: 'Doctors review scans, liver function tests, and overall health to determine if TACE is appropriate.',
      image: '/TACE_Compare1.png'
    },
    {
      step: 2,
      title: 'Angiography and Tumor Mapping',
      description: 'Imaging is used to identify the arteries supplying the liver tumor.',
      image: '/TACE_Compare2.png'
    },
    {
      step: 3,
      title: 'Catheter Placement',
      description: 'A thin catheter is guided through the blood vessels into the artery feeding the tumor.',
      image: '/TACE_Compare3.png'
    },
    {
      step: 4,
      title: 'Delivery of Chemotherapy and Embolization',
      description: 'Chemotherapy drugs and embolic particles are delivered to block the tumor\'s blood supply.',
      image: '/TACE_Compare4.png'
    },
    {
      step: 5,
      title: 'Recovery and Follow-Up',
      description: 'Patients are monitored and follow-up imaging is performed to evaluate treatment response.',
      image: '/TACE_Compare5.png'
    }
  ];

  return (
    <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#241b3a]">
            How <span className="text-[#ff3576]">TACE</span> (Transarterial Chemoembolization) <span className="text-[#ff3576]">Works</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Step-by-step breakdown of the procedure
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line indicator */}
          <div className="absolute left-[50%] transform -translate-x-1/2 h-full w-[2px] bg-[#ff3576]/30 hidden lg:block"></div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((item, index) => {
              const isEven = index % 2 === 1;

              const ImageCard = (
                <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50 max-w-sm mx-auto lg:max-w-none h-[220px] sm:h-[260px] lg:h-[220px]">
                  <img
                    src={item.image}
                    alt={`Step ${item.step}: ${item.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );

              const TextBlock = (
                <div className={`${isEven ? 'lg:text-left' : 'lg:text-right'} text-left`}
                >
                  <div className="inline-flex items-center lg:hidden mb-4">
                    <div className="h-9 w-9 rounded-full bg-[#ff3576] text-white flex items-center justify-center font-bold mr-3 shadow-md">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#241b3a] mb-3">
                    <span className="text-[#ff3576]">Step {item.step}:</span> {item.title}
                  </h3>
                  <p className={`text-base sm:text-lg text-gray-600 leading-relaxed ${isEven ? '' : 'lg:ml-auto'} max-w-xl`}>
                    {item.description}
                  </p>
                </div>
              );

              return (
                <div
                  key={item.step}
                  className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)] items-start gap-y-8 lg:gap-y-0"
                >
                  {/* Left Column */}
                  <div className="lg:pr-10">
                    {isEven ? ImageCard : TextBlock}
                  </div>

                  {/* Middle Column (line + number) */}
                  <div className="relative hidden lg:flex items-start justify-center">
                    <div className="h-10 w-10 rounded-full bg-[#ff3576] text-white flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(255,53,118,0.4)] mt-1">
                      {item.step}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:pl-10">
                    {isEven ? TextBlock : ImageCard}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowTACEWorks;
