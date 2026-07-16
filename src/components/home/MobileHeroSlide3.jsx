import React from 'react';
import SharedSearchBar from './SharedSearchBar';

const MobileHeroSlide3 = ({ query, setQuery, handleSearch, results = [], isLoading = false, onSearchFocus, onSearchBlur }) => {
  return (
    <div
      className='relative w-full h-[610px] max-[360px]:h-[590px] bg-cover bg-center overflow-hidden'
      style={{
        backgroundImage: 'url(\'/Mobile_view3rd_banner.png\')',
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-b from-[#584c75]/80 via-[#4b3e69]/76 to-[#342858]/82' />

      <div className='relative z-10 px-3.5 pt-[48px] text-white'>
        <div className='space-y-2'>
          <p className='text-[14px] text-white font-semibold leading-snug'>
            Why go under the knife when you dont have to ?
          </p>
          <h1 className='text-[19px] font-extrabold leading-tight text-white'>
            We Help You Skip
            <br />
            Surgery, <span className='text-[#ff3576]'>Not Solutions.</span>
          </h1>
        </div>
      </div>

      <div className='absolute left-4 right-4 top-[136px] z-30'>
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

      <div className='absolute bottom-[8px] left-[48%] -translate-x-1/2 w-[112%] max-w-[405px] z-[5] pointer-events-none select-none'>
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
