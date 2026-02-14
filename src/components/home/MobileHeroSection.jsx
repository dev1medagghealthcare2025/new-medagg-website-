import React from 'react';
import SharedSearchBar from './SharedSearchBar';

const MobileHeroSection = ({ query, setQuery, handleSearch, results = [], isLoading = false }) => {

  return (
    <div
      className='relative w-full min-h-[88vh] sm:min-h-[88vh] bg-cover bg-center md:hidden overflow-x-hidden'
      style={{
        backgroundImage: 'url(\'/Herosection background.jpg\')',
      }}
    >
      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-[#2d2552] via-[#2d2552] to-[#e1006a] opacity-80' />

      <div className='relative z-10 flex flex-col h-full px-4 sm:px-6 pt-3 pb-10 sm:pb-16 text-white'>

        {/* Top Banner */}
        <div className='flex items-center justify-start space-x-2 sm:space-x-3 mb-3 sm:mb-5'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 bg-transparent flex items-center justify-center'>
            <a href='https://medagghealthcare.com/IRPreneur-conference/index.php#home' target='_blank' rel='noopener noreferrer'>
              <img src='/irpreneur.png' alt='IR preneur' className='w-16 h-16 sm:w-20 sm:h-20' />
            </a>
          </div>
          <div>
         
            <p className='text-lg text-white/80 max-w-[200px]'>IRPreneur'25</p>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex-grow flex flex-col justify-center'>
          <h1 className='text-3xl sm:text-4xl font-bold leading-tight text-white'>No Surgery. No Scars.</h1>
          <h1 className='text-3xl sm:text-4xl font-bold leading-tight text-white mb-4'>Just Results.</h1>
          <p className='text-base max-w-md text-white/90 mb-6'>
            Experience care without fear, without surgery, and with quick recovery.
          </p>

          <div className='mb-8'>
            <SharedSearchBar
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              results={results}
              isLoading={isLoading}
            />
          </div>
        </div>

      </div>
      {/* Doctor image anchored to hero bottom-right, behind content */}
      <div className='absolute bottom-0 right-0 w-[280px] sm:w-[360px] max-[380px]:w-[230px] z-0 pointer-events-none select-none'>
        {/* Social Icons */}
        <div className='absolute top-[-60px] sm:top-[-40px] right-[80px] sm:right-[120px] flex-col items-start gap-2 z-20 pointer-events-auto'>
          <p className='text-white/80 font-semibold text-sm mb-1'>Follow Us On :</p>
          <div className='flex items-center gap-3'>
            <a href='https://www.facebook.com/profile.php?id=61558841344582' target='_blank' rel='noopener noreferrer' aria-label='Facebook'
               className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-all duration-200'>
              <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12'/></svg>
            </a>
            <a href='https://www.instagram.com/medagghealthcare?igsh=ZncyaGY3Z3poODky' target='_blank' rel='noopener noreferrer' aria-label='Instagram'
               className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-all duration-200'>
              <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.388 3.678 1.37c-.98.98-1.24 2.092-1.298 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.613.058 1.281.318 2.393 1.298 3.373.98.98 2.092 1.24 3.373 1.298C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.318 3.373-1.298.98-.98 1.24-2.092 1.298-3.373.058-1.281.07-1.69.07-7.613 0-5.923-.012-6.332-.07-7.613-.058-1.281-.318-2.393-1.298-3.373-.98-.98-2.092-1.24-3.373-1.298C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z'/></svg>
            </a>
            <a href='https://youtube.com/@medagghealthcare?si=aUo2YtohR4EquRx1' target='_blank' rel='noopener noreferrer' aria-label='YouTube'
               className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-all duration-200'>
              <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/></svg>
            </a>
            <a href='https://www.linkedin.com/company/medagg-healthcare/' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn'
               className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition-all duration-200'>
              <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'><path d='M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h4v1.743c.553-.984 1.98-2.243 4.287-2.243C20.38 8.5 21 11.037 21 14.298V21H17v-6.19c0-1.477-.027-3.375-2.063-3.375-2.065 0-2.383 1.6-2.383 3.264V21H9z'/></svg>
            </a>
          </div>
        </div>
        <img
          src='/abc_home.png'
          alt='Doctor'
          className='w-full h-auto'
        />
      </div>
    </div>
  );
};

export default MobileHeroSection;
