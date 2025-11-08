import React from 'react';
import { CheckCircle2, PlayCircle } from 'lucide-react';

const listItems = [
  'Detailed explanation of the procedure',
  'Animation of how treatment works',
  'Hear from our medical experts',
];

const WhatHappensInRFAForAVM = () => {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              What Happens in <br />
              <span className="text-pink-500">RFA For AVM?</span>
            </h2>
            <p className="text-lg text-gray-600">
              Watch this short video to understand how RFA for AVM works and what to expect during treatment.
            </p>
            <ul className="space-y-3">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-pink-500" size={24} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Video Placeholder */}
          <div className="relative bg-gray-200 rounded-lg h-64 md:h-80 flex items-center justify-center">
            <PlayCircle className="text-pink-500 opacity-80" size={80} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatHappensInRFAForAVM;