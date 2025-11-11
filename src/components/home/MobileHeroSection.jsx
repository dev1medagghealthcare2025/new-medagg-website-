import React, { useState } from 'react';
import SharedSearchBar from './SharedSearchBar';


const MobileHeroSection = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const treatmentSuggestions = [
    {
      name: 'Prostate Artery Embolization (PAE)',
      path: '/pae',
      keywords: [
        'prostate', 'pae', 'bph', 'turp', 'embolization', 'enlarged prostate', 'benign prostatic hyperplasia',
      ],
    },
    {
      name: 'Geniculate Artery Embolization (GAE)',
      path: '/gae',
      keywords: [
        'geniculate artery embolization',
        'knee pain',
        'osteoarthritis',
      ],
    },
    // Add other treatments as needed
  ];

  const handleValueChange = (value) => {
    setQuery(value);
    const lowerCaseQuery = value.toLowerCase();

    let foundSuggestion = null;
    if (value.trim()) {
      for (const treatment of treatmentSuggestions) {
        const isRelated = treatment.keywords.some(keyword => lowerCaseQuery.includes(keyword));
        if (isRelated) {
          foundSuggestion = {
            name: treatment.name,
            path: treatment.path,
          };
          break;
        }
      }
    }
    setSearchResult(foundSuggestion);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-top md:hidden overflow-hidden"
      style={{
        backgroundImage: `url('/Herosection background.jpg')`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d2552] via-[#2d2552] to-[#e1006a] opacity-80" />

      <div className="relative z-10 flex flex-col h-full px-4 sm:px-6 max-[360px]:px-3 pt-4 pt-[env(safe-area-inset-top)] pb-[calc(env(safe-area-inset-bottom)_+_18rem)] sm:pb-[calc(env(safe-area-inset-bottom)_+_12rem)] text-white">

        {/* Top Banner */}
        <div className="flex items-center justify-start space-x-2 sm:space-x-3 mb-3 sm:mb-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent flex items-center justify-center">
            <a href="https://medagghealthcare.com/IRPreneur-conference/" target="_blank" rel="noopener noreferrer">
              <img src="/irpreneur.png" alt="IR preneur" className="w-16 h-16 sm:w-20 sm:h-20" />
            </a>
          </div>
          <div>
            <h2 className="text-sm font-bold text-pink-500">Join IRpreneur</h2>
            <p className="text-xs text-white/80 max-w-[200px]">A day-long immersion on business concepts designed for Interventional Radiologists (IRs).</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-1 mt-2">
          <h1 className="text-3xl max-[360px]:text-[26px] sm:text-4xl font-bold leading-snug text-white">No Surgery. No Scars.</h1>
          <h1 className="text-3xl max-[360px]:text-[26px] sm:text-4xl font-bold leading-snug text-white">Just Results.</h1>
          <p className="text-sm sm:text-base max-w-md max-[360px]:max-w-[18rem] text-white/90 mt-1 mb-4">
            Experience care without fear, without surgery, and with quick recovery.
          </p>

          <div className="w-full mb-6 sm:mb-8">
            <SharedSearchBar 
              query={query}
              setQuery={handleValueChange}
              handleSearch={handleSearch}
              results={searchResult ? [searchResult] : []}
              isLoading={false}
            />
          </div>

        </div>

        {/* Bottom Section with Doctor and Badges */}
        <div className="relative">
          <div className="absolute bottom-[-144px] max-[400px]:bottom-[-128px] sm:bottom-0 right-[-24px] sm:right-[-40px] w-[220px] sm:w-[320px] max-[400px]:w-[190px] max-[400px]:right-[-18px] max-[360px]:w-[170px] max-[360px]:right-[-14px] z-[-10] pointer-events-none select-none">
            <img
              src='/main_home_new.png'
              alt="Doctor"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeroSection;
