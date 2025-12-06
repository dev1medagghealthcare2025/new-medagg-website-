import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const features = [
  'Detailed explanation of the procedure',
  'Animation of how embolization works',
  'Hear from our experts in interventional radiology',
];

const WhatHappensFrozen = () => {
  return (
    <section className='bg-gray-100 py-16 md:py-24'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          {/* Left Content */}
          <div className='text-left'>
            <h2 className='text-3xl md:text-4xl font-bold text-[#2d2552] mb-4'>
              What Happens in <span className='text-[#ff3576]'>ACE?</span>
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Watch this short video to understand exactly how the ACE procedure works and what to expect on the day of treatment.
            </p>
            <ul className='mt-6 space-y-4'>
              {features.map((feature, index) => (
                <li key={index} className='flex items-center'>
                  <CheckCircle2 className='h-6 w-6 text-[#ff3576] mr-3 flex-shrink-0' />
                  <span className='text-gray-700 font-medium'>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Video Placeholder */}
          <div className='relative aspect-video bg-gray-300 rounded-lg flex items-center justify-center'>
            <button
              aria-label='Play video'
              className='absolute bg-[#ff3576] text-white rounded-full h-16 w-16 flex items-center justify-center transition-transform transform hover:scale-110 shadow-lg'
            >
              <svg className='w-8 h-8 ml-1' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M8 5v14l11-7z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatHappensFrozen;