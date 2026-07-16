import React from 'react';
import SharedSearchBar from './SharedSearchBar';

const MobileHeroSlide2 = ({ query, setQuery, handleSearch, results = [], isLoading = false, onSearchFocus, onSearchBlur }) => {
  return (
    <div
      className='relative w-full h-[610px] max-[360px]:h-[590px] bg-cover bg-center overflow-hidden'
      style={{
        backgroundImage: 'url(\'/Mobile_view2nd_banner.png\')',
      }}
    >
      <div className='absolute inset-0 bg-[#261f4b]/82' />

      <div className='relative z-10 px-3 pt-[56px] text-white'>
        <div className='space-y-2'>
          <span className='inline-block bg-[#ff3576] text-white text-[11px] font-bold px-3 py-2 rounded-[5px] leading-snug'>
            The Longest Kept Secret Of Modern Medicine
          </span>
          <h1 className='text-[24px] font-extrabold uppercase leading-[1.14] tracking-wide text-white'>
            Interventional Radiology
          </h1>
          <p className='text-[15px] text-white font-bold leading-snug'>
            Now Available For Common Good
          </p>
        </div>
      </div>

      <div className='absolute left-4 right-4 top-[198px] z-30'>
        <SharedSearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          results={results}
          isLoading={isLoading}
          onInputFocus={onSearchFocus}
          onInputBlur={onSearchBlur}
          compact
        />
      </div>

      <div className='absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[80%] max-w-[300px] z-[5] pointer-events-none select-none'>
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
