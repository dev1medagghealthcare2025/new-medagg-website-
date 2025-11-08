import React from 'react';
import { Clock, TrendingUp, AlertCircle, HeartPulse } from 'lucide-react';

const Why_choose_CTO = () => {
  const features = [
    {
      icon: <HeartPulse size={40} className="text-[#ff3576]" />,
      title: 'NO OPEN-HEART SURGERY',
      description: 'Procedure is done through a small catheter, not cutting the chest wall.',
    },
    {
      icon: <Clock size={40} className="text-[#ff3576]" />,
      title: 'SYMPTOM RELIEF',
      description: 'Alleviates chest pain, shortness of breath, and fatigue.',
    },
    {
      icon: <TrendingUp size={40} className="text-[#ff3576]" />,
      title: 'IMPROVED HEART FUNCTION & QUALITY OF LIFE',
      description: 'Boosts exercise tolerance and reduces heart medication dependency.',
    },
    {
      icon: <AlertCircle size={40} className="text-[#ff3576]" />,
      title: 'HIGH SUCCESS IN EXPERT CENTERS',
      description: 'With advanced techniques, success is achieved in ~85-90% of cases.',
    },
  ];

  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
       

        {/* Main Content Section */}
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            Why Choose <span className="text-[#ff3576]">CTO Revascularization?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            An alternative to surgery for safely restoring cardiac blood flow and relieving symptoms.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 hover:shadow-xl hover:bg-[#ff3576] transition-all duration-300 ease-in-out group"
            >
              <div className="bg-pink-100 rounded-full p-4 mb-4 group-hover:bg-white transition-colors duration-300">
                <div className="group-hover:text-[#ff3576] transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-sm font-bold text-[#2d2552] mb-2 h-12 flex items-center group-hover:text-white transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 text-sm group-hover:text-white transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Why_choose_CTO;