import React from 'react';
import { Scissors, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const features = [
  {
    icon: <Scissors className="h-8 w-8" />,
    title: 'Non-Surgical',
    desc: 'No open surgery, No Scars, No Sutures.',
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: 'QUICK RECOVERY',
    desc: 'Return to normal activities within 24-48 hours.',
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Effective Results',
    desc: 'Relieves symptoms, improves appearance, lasting results.',
  },
  {
    icon: <AlertCircle className="h-8 w-8" />,
    title: 'Aesthetic Improvement',
    desc: 'Reduces bulging veins, improving leg aesthetics.',
  },
];

const WhyChooseEndovenousAblation = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        

        <div className="text-left max-w-4xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            Why Choose <span className="text-[#ff3576]">Endovenous Ablation?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Endovenous ablation targets diseased veins using heat or adhesive via catheter—leaving healthy veins intact.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl text-center shadow-sm transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 hover:bg-[#ff3576] hover:shadow-xl">
              <div className="inline-block p-4 bg-pink-100 text-[#ff3576] rounded-full mb-4 transition-all duration-300 group-hover:bg-white">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-[#2d2552] mb-2 transition-all duration-300 group-hover:text-white">{feature.title}</h3>
              <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-white">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseEndovenousAblation;
