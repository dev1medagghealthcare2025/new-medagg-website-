import React from 'react';
import { Scissors, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const benefits = [
  {
    icon: <Scissors size={32} className="text-pink-500" />,
    title: 'MINIMALLY INVASIVE',
    description: 'Heat energy through a catheter—no craniotomy required',
  },
  {
    icon: <Clock size={32} className="text-pink-500" />,
    title: 'QUICK RECOVERY',
    description: 'Most patients resume regular activities within days',
  },
  {
    icon: <TrendingUp size={32} className="text-pink-500" />,
    title: 'EFFECTIVE AND PRECISE',
    description: 'Targets mostly small or deep-seated AVMs with high accuracy',
  },
  {
    icon: <AlertCircle size={32} className="text-pink-500" />,
    title: 'REDUCED RISKS',
    description: 'Lower chance of infection, blood loss, or complications compared to open surgery',
  },
];

const WhyChooseRFAForAVM = () => {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Choose <span className="text-pink-500">RFA For AVM?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Safe, effective alternative to open surgery, offering quicker recovery and precision targeting
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 hover:bg-pink-500 hover:text-white">
              <div className="bg-pink-100 rounded-full p-4 mb-4 transition-colors duration-300 group-hover:bg-white">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-white">{benefit.title}</h3>
              <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-white">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRFAForAVM;