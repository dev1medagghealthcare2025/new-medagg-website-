import React from 'react';

const WhyPartnerWithMedagg = () => {
  const features = [
    {
      image: '/Investor_pic1.png',
      title: 'Rapid Expansion',
      description: 'Growing across major cities across India - Tamil Nadu, Hyderabad, Kerala, Bangalore, Jaipur, Pune & more.',
      titleColor: 'text-[#ff3576]'
    },
    {
      image: '/Investor_pic2.png',
      title: 'Next-Gen Treatments',
      description: 'Leaders in Interventional Radiology treatments.',
      titleColor: 'text-[#ff3576]'
    },
    {
      image: '/Investor_pic3.png',
      title: 'Strong Network',
      description: 'Trusted partnerships with top hospitals & certified specialists.',
      titleColor: 'text-[#ff3576]'
    },
    {
      image: '/Investor_pic4.png',
      title: 'Impactful Investment',
      description: 'Capitalize on India\'s rapidly growing healthcare market while making a meaningful impact on patient lives.',
      titleColor: 'text-[#ff3576]'
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#2d2552] mb-4 text-center">
            Become an Investor | <span className="text-[#ff3576]">Partner in Growth</span>
          </h1>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#2d2552] mt-12 text-center sm:text-left">
            Why Partner with <span className="text-[#ff3576]">Medagg Healthcare?</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 bg-gray-50 flex justify-center items-center">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-auto object-contain max-h-48"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 ${feature.titleColor}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyPartnerWithMedagg;