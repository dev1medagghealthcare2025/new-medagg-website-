import React from 'react';
import { Scissors, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const features = [
  {
    icon: (isHovered) => <Scissors size={40} className={`transition-colors duration-300 ${isHovered ? 'text-[#2d2552]' : 'text-[#ff3576]'}`} />,
    title: 'NO OPEN-BRAIN SURGERY',
    description: 'Coil delivery via catheter—no craniotomy required.',
  },
  {
    icon: (isHovered) => <Clock size={40} className={`transition-colors duration-300 ${isHovered ? 'text-[#2d2552]' : 'text-[#ff3576]'}`} />,
    title: 'QUICK RECOVERY',
    description: 'Typically outpatient; return to everyday life in days.',
  },
  {
    icon: (isHovered) => <TrendingUp size={40} className={`transition-colors duration-300 ${isHovered ? 'text-[#2d2552]' : 'text-[#ff3576]'}`} />,
    title: 'HIGH SUCCESS RATE',
    description: 'Effectively seals off aneurysms with long-term stability.',
  },
  {
    icon: (isHovered) => <AlertCircle size={40} className={`transition-colors duration-300 ${isHovered ? 'text-[#2d2552]' : 'text-[#ff3576]'}`} />,
    title: 'LOWER COMPLICATION RISK',
    description: 'Less risk of infection, blood loss, or trauma compared to surgery.',
  },
];

const FeatureCard = ({ feature }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-8 rounded-xl shadow-lg transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${isHovered ? 'bg-[#ff3576] shadow-2xl' : 'bg-white'}`}
    >
      <div className={`rounded-full p-4 mb-6 inline-block transition-all duration-300 ${isHovered ? 'bg-white' : 'bg-pink-100'}`}>
        {feature.icon(isHovered)}
      </div>
      <h4 className={`text-lg font-bold mb-2 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#2d2552]'}`}>{feature.title}</h4>
      <p className={`text-sm transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}>{feature.description}</p>
    </div>
  );
};

const WhyChooseEndovascularCoiling = () => {
  return (
    <div className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552] mb-4">
            Why Choose <span className="text-[#ff3576]">Endovascular Coiling?</span>
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Safe, effective alternative to surgical clipping with faster recovery and fewer risks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseEndovascularCoiling;