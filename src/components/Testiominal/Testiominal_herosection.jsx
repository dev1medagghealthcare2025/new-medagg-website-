import React from 'react';
import { Search } from 'lucide-react';

const TestiominalHerosection = () => {
  return (
    <div
      className='relative w-full bg-cover bg-center py-12 sm:py-14 md:py-16 lg:py-18'
      style={{ backgroundImage: 'url(\'/testiominal_bg.png\')' }}
    >
      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-[#2d2552] opacity-30'></div>

      <div className='relative z-10 mx-auto max-w-3xl text-center text-white px-4'>
        <h1 className='text-white text-3xl font-extrabold sm:text-4xl md:text-4xl lg:text-5xl whitespace-nowrap'>
          Real Patients. Real Relief. Real Results.
        </h1>
        <p className='mx-auto mt-3 max-w-2xl text-sm sm:text-base md:text-lg text-gray-200'>
          Our patients are living proof that modern interventional radiology can transform lives — without the risks of traditional surgery or long recovery times.
        </p>

      </div>
    </div>
  );
};

export default TestiominalHerosection;
