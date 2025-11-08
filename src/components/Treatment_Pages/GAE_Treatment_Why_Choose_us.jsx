import React from 'react';
import { Clock, TrendingUp, Users, Zap } from 'lucide-react';

const GAE_Treatment_Why_Choose_us = () => {
  return (
    <section className='w-full bg-white py-12 sm:py-16 lg:py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
       

        {/* Main Content */}
        <div className='mb-12 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2552] mb-4 sm:mb-6'>
            Why Choose <span className='text-[#ff3576]'>GAE?</span>
          </h2>
          <p className='text-gray-600 text-base sm:text-lg max-w-2xl px-4'>
            Genicular Artery Embolization offers significant advantages over traditional surgical approaches for treating chronic knee pain.
          </p>
        </div>

        {/* Feature Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          {/* Minimally Invasive */}
                              <div className='group bg-white rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center hover:bg-[#ff3576]'>
            <div className='w-14 h-14 sm:w-16 sm:h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 flex-shrink-0 transition-colors duration-300 group-hover:bg-white'>
              <Zap className='w-7 h-7 sm:w-8 sm:h-8 text-[#ff3576] transition-colors duration-300 group-hover:text-[#ff3576]' />
            </div>
            <h3 className='text-lg sm:text-xl font-bold text-[#2d2552] mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-white'>Non-Surgical</h3>
            <p className='text-gray-600 text-sm leading-relaxed flex-grow transition-colors duration-300 group-hover:text-white'>
            No open surgery, No Scars, 
           <br/> No Sutures.
            </p>
          </div>

          {/* Quick Recovery Time */}
                              <div className='group bg-white rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center hover:bg-[#ff3576]'>
            <div className='w-14 h-14 sm:w-16 sm:h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 flex-shrink-0 transition-colors duration-300 group-hover:bg-white'>
              <Clock className='w-7 h-7 sm:w-8 sm:h-8 text-[#ff3576] transition-colors duration-300 group-hover:text-[#ff3576]' />
            </div>
            <h3 className='text-lg sm:text-xl font-bold text-[#2d2552] mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-white'>QUICK RECOVERY</h3>
            <p className='text-gray-600 text-sm leading-relaxed flex-grow transition-colors duration-300 group-hover:text-white'>
            Minimal Hospital Stay, Get back to normal quickly.
            </p>
          </div>

          {/* Effective Results */}
                              <div className='group bg-white rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center hover:bg-[#ff3576]'>
            <div className='w-14 h-14 sm:w-16 sm:h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 flex-shrink-0 transition-colors duration-300 group-hover:bg-white'>
              <TrendingUp className='w-7 h-7 sm:w-8 sm:h-8 text-[#ff3576] transition-colors duration-300 group-hover:text-[#ff3576]' />
            </div>
            <h3 className='text-lg sm:text-xl font-bold text-[#2d2552] mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-white'>EFFECTIVE RESULTS</h3>
            <p className='text-gray-600 text-sm leading-relaxed flex-grow transition-colors duration-300 group-hover:text-white'>
            Improves pain relief of patients with chronic knee pain.
            </p>
          </div>

          {/* Performed by Experts */}
                              <div className='group bg-white rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center hover:bg-[#ff3576]'>
            <div className='w-14 h-14 sm:w-16 sm:h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 flex-shrink-0 transition-colors duration-300 group-hover:bg-white'>
              <Users className='w-7 h-7 sm:w-8 sm:h-8 text-[#ff3576] transition-colors duration-300 group-hover:text-[#ff3576]' />
            </div>
            <h3 className='text-lg sm:text-xl font-bold text-[#2d2552] mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-white'>PERFORMED BY EXPERTS</h3>
            <p className='text-gray-600 text-sm leading-relaxed flex-grow transition-colors duration-300 group-hover:text-white'>
            Only a few top interventional radiologists in India offer this specialized treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GAE_Treatment_Why_Choose_us;
