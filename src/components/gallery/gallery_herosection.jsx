import React from 'react';

export default function GalleryHeroSection() {
  return (
    <section className='relative w-full'>
      <div
        className='relative w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] flex items-center justify-center overflow-hidden'
        style={{
          backgroundImage: 'url(\'/gallary_bg.png\')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className='absolute inset-0 bg-[#392C5C]/20' />

        {/* Centered text */}
        <div className='relative z-10 text-center px-4'>
          <h1 className='text-white font-extrabold text-3xl sm:text-4xl md:text-5xl'>
            Our Story in Pictures
          </h1>
          <p className='text-white/90 mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto'>
            Celebrating moments of care, triumph, and human connection
          </p>
        </div>
      </div>
    </section>
  );
}
