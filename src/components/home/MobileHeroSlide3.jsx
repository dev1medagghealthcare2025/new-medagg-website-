import React from 'react';
import SharedSearchBar from './SharedSearchBar';

const MobileHeroSlide3 = ({ query, setQuery, handleSearch, results = [], isLoading = false, onSearchFocus, onSearchBlur }) => {
  return (
    <div
      className='relative w-full min-h-[88vh] bg-cover bg-center overflow-hidden'
      style={{
        backgroundImage: 'url(\'/Mobile_view3rd_banner.png\')',
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-[#2d2552]/40 via-[#2d2552]/20 to-transparent' />

      <div className='relative z-10 flex flex-col min-h-[88vh] px-4 sm:px-6 pt-14 sm:pt-16 pb-[58%] text-white'>
        <div className='space-y-2'>
          <p className='text-[15px] sm:text-[17px] text-white/90 font-light leading-snug'>
            Why go under the knife when you dont have to ?
          </p>
          <h1 className='text-2xl sm:text-3xl font-bold leading-tight text-white'>
            We Help You Skip
            <br />
            Surgery, <span className='text-[#ff3576]'>Not Solutions.</span>
          </h1>
        </div>

        <div className='mt-7 mb-2 scale-[1.08] origin-top'>
          <SharedSearchBar
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            results={results}
            isLoading={isLoading}
            onInputFocus={onSearchFocus}
            onInputBlur={onSearchBlur}
          />
        </div>
      </div>

      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[98%] sm:w-full max-w-[420px] z-[5] pointer-events-none select-none scale-[1.08] origin-bottom'>
        <img
          src='/Home_map_new_one.png'
          alt='Medagg locations across India'
          className='w-full h-auto object-contain'
        />
      </div>
    </div>
  );
};

export default MobileHeroSlide3;
