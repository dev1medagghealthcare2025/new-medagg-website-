import React from 'react';
import { Scissors, Clock, TrendingUp, ShieldAlert } from 'lucide-react';

const WhyChoosePlantar = () => {
  const features = [
    {
      Icon: Scissors,
      title: 'NO INCISIONS OR STITCHES',
      description: 'Tiny catheter insertion—no surgical cut required.',
    },
    {
      Icon: Clock,
      title: 'QUICK, OUTPATIENT RECOVERY',
      description: 'Patients often walk the same day and resume normal activities within days.',
    },
    {
      Icon: TrendingUp,
      title: 'LASTING PAIN RELIEF',
      description: 'Addresses inflammation permanently—with results lasting months to years.',
    },
    {
      Icon: ShieldAlert,
      title: 'LOW COMPLICATION RISK',
      description: 'Brief procedure duration, minimal trauma, and high safety profile.',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Partner Logos Section */}
        <div className="mb-16">
        
          
        </div>

        {/* Main Content Section */}
                        <div className="max-w-4xl text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552] mb-4">
            Why Choose <span className="text-[#ff3576]">Plantar Fascial Embolization?</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-12">
            PFE targets the root cause of plantar fasciitis—without cutting the tissue or prolonged recovery.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-pink-50/30 rounded-lg p-6 text-center flex flex-col items-center shadow-sm hover:shadow-xl hover:bg-[#ff3576] transition-all duration-300"
            >
              <div className="bg-pink-100/50 rounded-full p-4 mb-5 inline-block transition-colors duration-300 group-hover:bg-white">
                <feature.Icon size={32} className="text-[#ff3576]" />
              </div>
              <h3 className="font-bold text-sm text-[#2d2552] mb-2 uppercase tracking-wider transition-colors duration-300 group-hover:text-white">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoosePlantar;
