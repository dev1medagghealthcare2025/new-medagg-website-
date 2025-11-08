import React from 'react';
import { CheckCircle2, Play } from 'lucide-react';

const WhatHappensInTAVI = () => {
  const features = [
    'Detailed explanation of the procedure',
    'Animation of how Implantation works',
    'Hear from our medical experts',
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
              What Happens in <span className="text-[#ff3576]">TAVI</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Watch this short video to understand exactly how the Transcatheter Aortic Valve Implantation, procedure works and what to expect on the day of treatment.
            </p>
            <ul className="mt-6 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-[#ff3576] mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Video Placeholder */}
          <div className="relative aspect-video bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer group">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
            <div className="relative bg-[#ff3576] h-20 w-20 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <Play className="h-10 w-10 text-white fill-current" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatHappensInTAVI;