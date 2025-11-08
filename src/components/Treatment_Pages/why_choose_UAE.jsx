import React from 'react';
import { Heart, Clock, TrendingUp, Scissors } from 'lucide-react';

const WhyChooseUAE = () => {
  const benefits = [
    {
      icon: <Heart size={48} className="text-[#ff3576] group-hover:text-white transition-colors duration-300" />,
      title: 'Non-Surgical',
      description: 'No open surgery, No Scars,No Sutures.',
    },
    {
      icon: <Clock size={48} className="text-[#ff3576] group-hover:text-white transition-colors duration-300" />,
      title: 'Quick Recovery',
      description: 'Most women return to their routine in 1-2 weeks.',
    },
    {
      icon: <TrendingUp size={48} className="text-[#ff3576] group-hover:text-white transition-colors duration-300" />,
      title: 'Effective Results',
      description: 'Shrinks uterine fibroids and relieves symptoms like heavy periods and pelvic pain.',
    },
    {
      icon: <Scissors size={48} className="text-[#ff3576] group-hover:text-white transition-colors duration-300" />,
      title: 'Preserve Your Uterus',
      description: 'Avoid surgery and keep your uterus intact.',
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Main Content Section */}
        <div className="text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2d2552]">
            Why Choose <span className="text-[#ff3576]">Uterine Artery Embolization?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            UAE shrinks fibroids by blocking their blood supply using small embolic particles, all while avoiding an open surgical procedure.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group bg-gray-50 p-8 rounded-lg text-center flex flex-col items-center shadow-md hover:shadow-xl hover:bg-[#ff3576] transition-all duration-300">
              <div className="w-20 h-20 bg-pink-100 group-hover:bg-white/30 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-[#2d2552] group-hover:text-white transition-colors duration-300">{benefit.title}</h3>
              <p className="mt-2 text-gray-600 group-hover:text-gray-100 text-sm transition-colors duration-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUAE;
