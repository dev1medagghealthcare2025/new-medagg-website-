import React from 'react';

const WhyChooseY90 = () => {
  const benefits = [
    {
      icon: '/y90_1.png',
      title: 'Targeted Tumor Treatment',
      description: 'Radiation is delivered directly into blood vessels supplying the tumor.',
    },
    {
      icon: '/y90_2.png',
      title: 'Minimally Invasive Procedure',
      description: 'Performed using a thin catheter through blood vessels without open surgery.',
    },
    {
      icon: '/y90_3.png',
      title: 'Preserves Healthy Liver Tissue',
      description: 'Radiation is concentrated in the tumor while minimizing damage to normal liver.',
    },
    {
      icon: '/y90_4.png',
      title: 'Short Recovery Time',
      description: 'Most patients recover quickly with a short hospital stay.',
    },
  ];

  return (
    <div className='bg-white py-12 sm:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='text-left mb-12'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ff3576]'>
            Why Choose Y-90 Radioembolization (TARE) ?
          </h2>
          <p className='mt-2 text-base sm:text-lg text-gray-600 font-medium'>
            A targeted treatment option for liver tumors when surgery may not be suitable.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className='group bg-white p-6 rounded-2xl border border-pink-200 shadow-sm hover:shadow-xl hover:bg-[#ff3576] transition-all duration-300 flex flex-col items-center text-center cursor-pointer'
            >
              <div className='w-20 h-20 bg-pink-50 group-hover:bg-white/20 rounded-full flex items-center justify-center mb-6 overflow-hidden transition-colors duration-300'>
                <img 
                  src={benefit.icon} 
                  alt={benefit.title} 
                  className='w-12 h-12 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300'
                />
              </div>
              <h3 className='text-lg font-bold text-[#2d2552] mb-3 group-hover:text-white transition-colors duration-300'>
                {benefit.title}
              </h3>
              <p className='text-gray-600 text-sm leading-relaxed group-hover:text-pink-50 transition-colors duration-300'>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseY90;
