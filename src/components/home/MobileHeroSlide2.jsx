import React from 'react';
import SharedSearchBar from './SharedSearchBar';

const MobileHeroSlide2 = ({ query, setQuery, handleSearch, results = [], isLoading = false, onSearchFocus, onSearchBlur }) => {
  return (
    <div
      className='relative w-full min-h-[88vh] bg-cover bg-center overflow-hidden'
      style={{
        backgroundImage: 'url(\'/Mobile_view2nd_banner.png\')',
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-b from-[#2d2552]/45 via-[#2d2552]/25 to-[#2d2552]/50' />

      <div className='relative z-10 flex flex-col min-h-[88vh] px-4 sm:px-6 pt-14 sm:pt-16 pb-28 text-white'>
        <div className='space-y-3'>
          <span className='inline-block bg-[#ff3576] text-white text-sm sm:text-base font-bold px-4 py-2 rounded-md leading-snug'>
            The Longest Kept Secret Of Modern Medicine
          </span>
          <h1 className='text-3xl sm:text-4xl font-extrabold uppercase leading-tight tracking-wide text-white'>
            Interventional Radiology
          </h1>
          <p className='text-base sm:text-lg text-white/90 font-medium'>
            Now Available For Common Good
          </p>
        </div>

        <div className='mt-8 mb-2 scale-[1.08] origin-top'>
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

      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[72%] sm:w-[75%] max-w-[300px] z-[5] pointer-events-none select-none'>
        <img
          src='/ira_one-removebg-preview.png'
          alt='IRa health companion with chat'
          className='w-full h-auto object-contain'
        />
      </div>
    </div>
  );
};

export default MobileHeroSlide2;
