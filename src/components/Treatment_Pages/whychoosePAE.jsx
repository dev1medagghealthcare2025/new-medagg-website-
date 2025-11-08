import React from 'react';
import { Scissors, Clock, TrendingUp, Users } from 'lucide-react';

const features = [
  {
    icon: (props) => <Scissors size={32} {...props} />,
    title: 'Non-Surgical.',
    description:'No open surgery, No Scars, No Sutures.',
  },
  {
    icon: (props) => <Clock size={32} {...props} />,
    title: 'QUICK RECOVERY',
    description: 'Minimally invasive, quick recovery, minimal downtime.',
  },
  {
    icon: (props) => <TrendingUp size={32} {...props} />,
    title: 'EFFECTIVE RESULTS',
    description: 'May help relieve symptoms, long-lasting prostate size reduction.',
  },
  {
    icon: (props) => <Users size={32} {...props} />,
    title: 'NO SEXUAL SIDE EFFECTS',
    description: 'PAE preserves sexual function with no risk.',
  },
];

const WhyChoosePAE = () => {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          
          
        </div>

        <div className="text-center sm:text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            Why Choose <span className="text-[#ff3576]">PAE?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto sm:mx-0">
            Prostate Artery Embolization offers significant advantages over traditional surgical approaches for treating an enlarged prostate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#ff3576] transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-pink-50 group-hover:bg-white flex items-center justify-center mb-6 transition-colors duration-300">
                {feature.icon({ className: "text-[#ff3576]" })}
              </div>
              <h3 className="text-lg font-bold text-[#2d2552] group-hover:text-white mb-2 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 group-hover:text-white flex-grow transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoosePAE;