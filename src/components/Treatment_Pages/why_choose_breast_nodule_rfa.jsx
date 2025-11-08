import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const WhyChooseBreastNoduleRFA = () => {
  const features = [
    {
      icon: <Scissors size={32} className="text-[#ff3576]" />,
      title: 'NO VISIBLE SCARS',
      description: 'A needle-like probe is inserted through a tiny puncture—no surgical incision required.',
    },
    {
      icon: <Clock size={32} className="text-[#ff3576]" />,
      title: 'QUICK RECOVERY',
      description: 'Performed under local anesthesia in an outpatient setting; most women return to normal activity quickly.',
    },
    {
      icon: <TrendingUp size={32} className="text-[#ff3576]" />,
      title: 'HIGH DESTRUCTION ACCURACY',
      description: 'Heat precisely targets the nodule, ensuring effective ablation with minimal effect on the breast tissue.',
    },
    {
      icon: <AlertCircle size={32} className="text-[#ff3576]" />,
      title: 'LOW RECURRENCE RATES',
      description: 'Complete ablation rates up to 98%; less risk than other non-surgical methods.',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Treatment Toggles */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex flex-wrap gap-2 md:gap-4 p-1.5 bg-gray-100 rounded-full">
            <Link to="/breast-nodule-vae" className="px-4 py-2 text-sm md:text-base font-medium text-gray-600 rounded-full hover:bg-pink-100 hover:text-[#ff3576] transition">
              Vacuum-Assisted Excision
            </Link>
            <Link to="/breast-nodule-cryoablation" className="px-4 py-2 text-sm md:text-base font-medium text-gray-600 rounded-full hover:bg-pink-100 hover:text-[#ff3576] transition">
              Cryoablation
            </Link>
            <Link to="/breast-nodule-rfa" className="px-4 py-2 text-sm md:text-base font-medium text-white bg-[#ff3576] rounded-full shadow-md hover:bg-[#ff3576] hover:text-white transition">
              Radiofrequency Ablation (RFA)
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-left max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            Why Choose <span className="text-[#ff3576]">Radiofrequency Ablation?</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            RFA delivers targeted heat to benign nodules for effective ablation and preservation of surrounding tissue.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg text-center transition-shadow hover:shadow-xl">
              <div className="flex justify-center items-center h-16 w-16 mx-auto bg-pink-100 rounded-full mb-5">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-[#2d2552] uppercase tracking-wider mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseBreastNoduleRFA;