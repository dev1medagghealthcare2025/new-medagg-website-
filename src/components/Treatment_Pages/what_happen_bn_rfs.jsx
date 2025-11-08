import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const WhatHappensBnRFA = () => {
  const features = [
    'Detailed explanation of the procedure',
    'Animation of how Ablation works',
    'Hear from our medical experts',
  ];

  return (
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
              What Happens in
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-[#ff3576] mb-4">
              Radiofrequency Ablation
            </h2>
            <p className="text-gray-600 mb-6">
              Watch this short video to understand exactly how the Radiofrequency Ablation (RFA) procedure works and what to expect on the day of treatment.
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="w-6 h-6 text-[#ff3576] mr-3" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Video Placeholder */}
          <div className="relative w-full h-0 pb-[56.25%] bg-gray-200 rounded-2xl">
            {/* Play Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-[#ff3576] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e02e63] transition-colors duration-300">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatHappensBnRFA;