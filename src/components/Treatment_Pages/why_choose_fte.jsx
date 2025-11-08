import React from 'react';
import { Scissors, Clock, TrendingUp, HeartPulse } from 'lucide-react'; // Using HeartPulse as a proxy for fertility icon

const features = [
  {
    icon: <Scissors className="w-10 h-10" />,
    title: 'Non-Surgical',
    desc: 'No open surgery, No Scars, No Sutures.',
  },
  {
    icon: <Clock className="w-10 h-10" />,
    title: 'Quick Recovery',
    desc: 'Fast healing with minimal downtime.',
  },
  {
    icon: <TrendingUp className="w-10 h-10" />,
    title: 'Effective Results',
    desc: 'Restores fallopian tube function, improving chances of natural conception.',
  },
  {
    icon: <HeartPulse className="w-10 h-10" />,
    title: 'Enhanced Precision and Safety',
    desc: 'Ensures targeted treatment with minimal risk.',
  },
];

const WhyChooseFTE = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Logos */}
        <div className="mb-12 text-center">
          
        </div>

        {/* Main Content */}
                <div className="text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2552]">
            Why Choose <span className="text-[#ff3576]">Fallopian Tube Recanalization?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Recanalization is fluoroscopy-guided and reopens tubes via catheter-based techniques—restoring natural conception potential.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 text-center flex flex-col items-center shadow-sm hover:bg-[#ff3576] hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-[#ff3576] mb-5 group-hover:bg-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#2D2552] mb-2 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 text-sm flex-grow group-hover:text-white transition-colors duration-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseFTE;
