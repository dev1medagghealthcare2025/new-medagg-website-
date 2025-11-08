import React from 'react';
import { Scissors, Clock, TrendingUp, Users } from 'lucide-react';

const partnerLogos = '/Partner logos.jpg';

const features = [
  {
    icon: <Scissors size={32} className='text-pink-500' />,
    title: 'Non-Surgical',
    description: 'A minimally invasive alternative to traditional surgery.',
  },
  {
    icon: <Clock size={32} className='text-pink-500' />,
    title: 'QUICK RECOVERY TIME',
    description: 'Resume daily activities within a day or two with minimal downtime.',
  },
  {
    icon: <TrendingUp size={32} className='text-pink-500' />,
    title: 'EFFECTIVE RESULTS',
    description: 'Proven to significantly eliminate thyroid nodules and symptoms.',
  },
  {
    icon: <Users size={32} className='text-pink-500' />,
    title: 'Preserves Thyroid',
    description: 'Maintains thyroid integrity, reducing the need for lifelong hormone therapy.',
  },
];

const WhyChooseThyroidAblation = () => {
  return (
    <div className='py-8 sm:py-12 lg:py-16 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        

        {/* Main Content */}
        <div className='text-center max-w-4xl mx-auto'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4'>
            <span className='text-[#2d2552]'>Why Choose </span>
            <span className='text-pink-500'>Thyroid Ablation?</span>
          </h2>
          <p className='text-gray-600 text-base sm:text-lg mb-8 sm:mb-10 lg:mb-12 px-4 sm:px-0'>
            Thyroid nodule ablation uses image-guided heat or laser to destroy benign nodules, preserving your natural thyroid function.
          </p>
        </div>

        {/* Features Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div key={index} className='group bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:bg-pink-500'>
              <div className='bg-pink-100 rounded-full p-4 mb-6 transition-colors duration-300 group-hover:bg-white'>
                {feature.icon}
              </div>
              <h4 className='text-lg font-bold text-[#2d2552] mb-2 transition-colors duration-300 group-hover:text-white'>{feature.title}</h4>
              <p className='text-gray-500 text-sm transition-colors duration-300 group-hover:text-white'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseThyroidAblation;
