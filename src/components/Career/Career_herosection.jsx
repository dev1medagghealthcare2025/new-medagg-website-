import React from 'react';

const CareerHeroSection = () => {
  return (
    <section
      className='relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: 'url(\'/career_herosection.png\')' }}
    >
      {/* Overlay for readability */}
      <div className='absolute inset-0 bg-gradient-to-r from-[#2d2552]/80 via-[#2d2552]/55 to-transparent' />

      {/* Content */}
      <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight'>
          Build the <span className='text-[#ff3576]'>future</span> with us
        </h1>
        <p className='mt-3 text-sm sm:text-base md:text-lg text-white/90'>
          Join a team innovating modern healthcare with compassion, technology, and precision.
        </p>

        {/* CTA – scroll to openings */}
        <div className='mt-6'>
          <button
            type='button'
            className='inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#ff3576] text-white font-semibold shadow-md hover:shadow-lg hover:bg-[#ff2a6e] transition'
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
    </section>
  );
};

export default CareerHeroSection;
