import React from 'react';
import { Scissors, Clock, TrendingUp, Heart } from 'lucide-react';

const features = [
  {
    icon: (props) => <Scissors {...props} />,
    title: 'Non-Surgical',
    description: 'No open surgery, No Scars,No Sutures.',
  },
  {
    icon: (props) => <Clock {...props} />,
    title: 'QUICK RECOVERY',
    description: 'Return to normal activities within 24-48 hours.',
  },
  {
    icon: (props) => <TrendingUp {...props} />,
    title: 'HIGH SUCCESS RATES',
    description: 'High success in symptom and fertility improvement.',
  },
  {
    icon: (props) => <Heart {...props} />,
    title: 'PRESERVES FERTILITY',
    description: 'Improves Sperm Quality and Fertility.',
  },
];

const WhyChooseVaricocele = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Logos */}
        <div className="mb-12 text-center">
          
        </div>

        {/* Main Content */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            Why Choose <span className="text-[#ff3576]">Varicocele Embolization?</span>
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            Varicocele embolization offers targeted vein blockage while avoiding open surgery and preserving reproductive function.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-pink-50/50 rounded-2xl p-8 text-center flex flex-col items-center shadow-sm hover:shadow-lg hover:bg-[#ff3576] transition-all duration-300">
              <div className="bg-white rounded-full p-4 mb-6 shadow-md transition-colors duration-300">
                {feature.icon({ className: "w-10 h-10 text-[#ff3576]" })}
              </div>
              <h3 className="text-lg font-bold text-[#2d2552] group-hover:text-white mb-2 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 group-hover:text-white text-sm flex-grow transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseVaricocele;
