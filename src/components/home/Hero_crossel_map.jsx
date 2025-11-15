import React from 'react';
import SharedSearchBar from './SharedSearchBar';

const HeroCrosselMap = ({ query, setQuery, handleSearch, results, isLoading }) => {
  return (
    <div
            className="relative w-full h-screen flex items-right justify-end p-0 md:p-0 bg-cover bg-right"
      style={{ backgroundImage: "url('/Map_curssol_home.png')" }}
    >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2d2552]/90 via-[#2d2552]/40 to-transparent"></div>
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full h-full">
        {/* Left Content */}
                <div className="text-white flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6 pl-4 sm:pl-6 lg:pl-12">
                              <div className="bg-[#ff3576] text-white px-4 py-2 rounded-lg text-base md:text-lg font-semibold">
            Explore Medagg's
          </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-snug text-white mt-2">
            Non - Surgical<br />Solutions
          </h1>
          <p className="text-base md:text-lg text-gray-200">
            Why go under the knife when you don't have to?
          </p>
          <SharedSearchBar 
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            results={results}
            isLoading={isLoading}
          />
        </div>

        {/* Right Content - Map */}
                <div className="relative h-full flex items-center justify-center mt-8 md:mt-0">
                    <img
            src="/Home_map_new_one.png"
            alt="Medagg locations across India"
            className="w-full max-w-none h-auto object-contain origin-center md:max-h-[80vh] scale-[1.31]"
          />
                                        <div className="absolute bottom-[20%] md:bottom-[25%] left-1/2 -translate-x-1/2 w-auto whitespace-nowrap">
    
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCrosselMap;
