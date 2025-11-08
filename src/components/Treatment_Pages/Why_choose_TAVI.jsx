import React from 'react';
import { ShieldCheck, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const features = [
  {
    icon: (isHovered) => <ShieldCheck size={40} className={`transition-colors duration-300 ${isHovered ? 'text-[#2d2552]' : 'text-[#ff3576]'}`} />,
    title: 'NO OPEN-CHEST SURGERY',
    description: 'Valve is replaced via catheter—no breastbone cutting or large incisions required.',
  },
  {
    icon: (isHovered) => <Clock size={40} className={`transition-colors duration-300 ${isHovered ? 'text-[#2d2552]' : 'text-[#ff3576]'}`} />,
    title: 'FASTER RECOVERY',
    description: 'Patients experience shorter hospital stays and rehab time compared to surgical replacement.',
  },
  {
    icon: (isHovered) => <TrendingUp size={40} className={`transition-colors duration-300 ${isHovered ? 'text-[#2d2552]' : 'text-[#ff3576]'}`} />,
    title: 'HIGH PROCEDURAL SUCCESS RATE',
    description: 'Success rates exceed 90% in reducing symptoms and improving quality of life.',
  },
  {
    icon: (isHovered) => <AlertCircle size={40} className={`transition-colors duration-300 ${isHovered ? 'text-[#2d2552]' : 'text-[#ff3576]'}`} />,
    title: 'SAFE FOR HIGH-RISK PATIENTS',
    description: 'Ideal for individuals who are poor surgical candidates due to age or comorbidities.',
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
      <h4 className={`text-md font-bold mb-2 uppercase tracking-wider transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#2d2552]'}`}>{feature.title}</h4>
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}>{feature.description}</p>
    </div>
  );
};

const WhyChooseTAVI = () => {
  return (
    <section className="py-12 md:py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Logos Section */}
        

        {/* Why Choose TAVI Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552] mb-4">
            Why Choose <span className="text-[#ff3576]">TAVI?</span>
          </h2>
          <p className="max-w-3xl text-gray-600 text-lg mb-12">
            TAVI restores proper blood flow without the need for a sternotomy or bypass surgery, using a percutaneous approach.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTAVI;