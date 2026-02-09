import React from 'react';

const CareerHeroSection = () => {
  return (
    <section
      className='relative w-full min-h-[55vh] md:min-h-[70vh] flex items-center bg-cover bg-center overflow-hidden'
      style={{ backgroundImage: 'url(\'/career_herosection.png\')' }}
    >
      {/* Overlay for readability */}
      <div className='absolute inset-0 bg-[#2d2552]/10' />
      <div className='absolute inset-0 bg-gradient-to-r from-[#2d2552]/45 via-[#2d2552]/50 to-transparent' />

      <div className='absolute bottom-0 right-8 lg:right-14 hidden md:block z-10'>
        <img
          src='/career_herosection_man.png'
          alt='Professional smiling'
          className='block w-[340px] lg:w-[400px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]'
          loading='lazy'
        />
      </div>

      <div className='absolute bottom-0 left-0 right-0 md:hidden z-10 flex justify-center pointer-events-none'>
        <img
          src='/career_herosection_man.png'
          alt='Professional smiling'
          className='block w-[240px] h-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)]'
          loading='lazy'
        />
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-4 pt-8 pb-40 md:py-6'>
          <div className='text-center md:text-left'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight'>
              Build a Meaningful Career
              <br />
              With Us
            </h1>
            <p className='mt-3 max-w-md text-sm sm:text-base md:text-lg text-white/90'>
              Join a team innovating modern healthcare with compassion, technology, and precision.
            </p>

            {/* CTA – scroll to openings */}
            <div className='mt-4 flex justify-center md:justify-start'>
              <button
                type='button'
                className='inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff3576] text-white font-semibold shadow-md hover:shadow-lg hover:bg-[#ff2a6e] transition'
                onClick={() => {
                  const el = document.getElementById('openings');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                aria-label='Explore openings'
              >
                Explore Opportunities
                <span aria-hidden='true'>➜</span>
              </button>
            </div>
          </div>

          <div className='relative hidden md:flex items-center justify-end'>
            <div className='w-[360px] lg:w-[420px]' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerHeroSection;
