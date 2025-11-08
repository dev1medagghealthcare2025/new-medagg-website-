import React from 'react';
import { CheckCircle2, PlayCircle } from 'lucide-react';

const WhatHappensInPlantar = () => {
  const features = [
    'Detailed explanation of the procedure',
    'Animation of how Embolization works',
    'Hear from our medical experts',
  ];

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Section */}
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
              What Happens in
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-[#ff3576] mb-4">
              Plantar Fascial Embolization
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Watch this short video to understand exactly how the Plantar
              fascial embolization procedure works and what to expect on the
              day of treatment.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="w-6 h-6 text-white bg-[#ff3576] rounded-full p-1 mr-3 flex-shrink-0" />
                  <span className="text-lg text-[#2d2552] font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Video Section */}
          <div className="relative flex justify-center items-center bg-gray-200 rounded-2xl aspect-video cursor-pointer group">
            <PlayCircle className="w-20 h-20 text-[#ff3576] opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatHappensInPlantar;
