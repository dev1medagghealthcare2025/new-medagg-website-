import React from 'react';

const reasons = [
  {
    title: 'NON-SURGICAL',
    desc: 'No open surgery, No Scars, No Sutures',
    highlight: true,
    icon: '/Diabetic1.png',
  },
  {
    title: 'QUICK RECOVERY',
    desc: 'Walk home the same day and resume normal activities quickly.',
    icon: '/frozen2.png',
  },
  {
    title: 'TARGETED TREATMENT',
    desc: 'Addresses the underlying inflammation driving shoulder stiffness.',
    icon: '/frozen3.png',
  },
  {
    title: 'PROMISING RESULTS',
    desc: 'Improvement in pain and mobility, especially when physio or injections haven’t helped.',
    icon: '/frozen4.png',
  },
];

const WhyChooseFrozenShoulder = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]">
            Why Choose <span className="text-pink-600">ACE for Frozen Shoulder?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 w-full">
            ACE is a minimally invasive option for frozen shoulder that targets inflamed blood vessels associated with pain and stiffness. By addressing the underlying inflammation, it may help improve shoulder mobility and reduce discomfort without open surgery. Most patients experience a quicker recovery and can return to routine activities sooner.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item) => (
            <div
              key={item.title}
              className={`group rounded-2xl p-6 transition-all duration-300 bg-white text-[#1a1446] border border-gray-100 shadow-md hover:shadow-xl hover:bg-pink-600 hover:text-white hover:border-pink-300`}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    item.highlight ? 'bg-white' : 'bg-pink-50'
                  } transition-colors group-hover:bg-white`}
                >
                  {item.icon ? (
                    <img src={item.icon} alt={`${item.title} icon`} className="w-10 h-10 object-contain transition-transform duration-200 ease-out group-hover:scale-110" />
                  ) : (
                    <span className={`text-2xl ${item.highlight ? 'text-pink-600' : 'text-pink-600'}`} aria-hidden="true">✓</span>
                  )}
                </div>
              </div>

              <h3
                className={`text-base font-extrabold tracking-wide text-center text-[#1a1446] group-hover:text-white`}
              >
                {item.title}
              </h3>
              <p
                className={`mt-2 text-sm text-center text-gray-600 group-hover:text-pink-100`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseFrozenShoulder;