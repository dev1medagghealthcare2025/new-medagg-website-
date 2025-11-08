import React from 'react';
import { HeartPulse, Clock, TrendingUp, ShieldAlert } from 'lucide-react';

const features = [
  {
    icon: <HeartPulse size={32} />,
    title: 'NO OPEN-HEART SURGERY',
    description: 'Performed via catheter—no sternotomy or large incisions needed.',
  },
  {
    icon: <Clock size={32} />,
    title: 'QUICK RECOVERY',
    description: 'Patients often return to normal activities within just a few days.',
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'HIGH SUCCESS RATE',
    description: 'Efficient and precise elimination of abnormal heart tissue causing arrhythmias.',
  },
  {
    icon: <ShieldAlert size={32} />,
    title: 'ALTERNATIVE TO LIFELONG MEDICATIONS',
    description: 'Potential to reduce or eliminate the need for daily anti-arrhythmic drugs.',
  },
];

const Why_choose_rfa = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Logos */}
        

        {/* Main Content */}
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            Why Choose <span className="text-[#ff3576]">Radiofrequency Ablation?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Effective rhythm control, fast recovery, and fewer risks compared to traditional surgery.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center hover:bg-[#ff3576] hover:text-white transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="bg-pink-100 rounded-full p-4 mb-4 group-hover:bg-white transition-colors duration-300">
                <div className="text-[#ff3576] group-hover:text-[#ff3576]">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-md font-bold text-[#2d2552] mb-2 group-hover:text-white transition-colors duration-300">{feature.title}</h4>
              <p className="text-gray-600 text-sm group-hover:text-gray-100 transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why_choose_rfa;