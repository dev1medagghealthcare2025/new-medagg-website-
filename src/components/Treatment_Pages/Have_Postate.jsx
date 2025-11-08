import React from 'react';

const Have_Postate = () => {
  return (
    <section className="py-16 sm:py-24 flex items-center justify-center bg-white">
      <div
        className='relative w-full max-w-[1201px] h-auto md:h-[421px] rounded-[20px] overflow-hidden mx-4'
        style={{
          backgroundImage: 'url(\'/book and appoinment background.jpg\')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-200/5"></div>
        <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full'>
            {/* Left Side */}
            <div className='text-center md:text-left py-8 md:py-0'>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4'>
                <span className='text-white'>Think You Might </span>
                <span className='text-[#ff3576]'>Have Prostate?</span>
              </h2>
              <p className='text-white text-base md:text-lg font-medium mb-8 max-w-md mx-auto md:mx-0'>
                Enter your symptoms and get expert guidance from our specialists.
              </p>
              <button className='bg-[#ff3576] text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-transform duration-300 hover:scale-105'>
                Book Appointment
              </button>
            </div>

            {/* Right Side - Form */}
            <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto'>
              <h3 className="text-xl font-bold text-[#2d2552] mb-4">Get Expert Consultation</h3>
              <form className="space-y-4">
                <textarea
                  placeholder='Describe Your Health Concern'
                  rows='2'
                  className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition resize-none'
                ></textarea>
                <input
                  type='text'
                  placeholder='City'
                  className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition'
                />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <input
                    type='text'
                    placeholder='Full Name'
                    className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition'
                  />
                  <input
                    type='tel'
                    placeholder='Phone Number'
                    className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full bg-[#ff3576] text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-transform duration-300 hover:scale-105'
                >
                  Speak To Experts
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Have_Postate;
