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
      className="relative w-full min-h-[70vh] sm:min-h-[70vh] bg-cover bg-center md:hidden overflow-x-hidden"
      style={{
        backgroundImage: `url('/Herosection background.jpg')`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d2552] via-[#2d2552] to-[#e1006a] opacity-80" />

      <div className="relative z-10 flex flex-col h-full px-4 sm:px-6 pt-3 pb-10 sm:pb-16 text-white">

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
        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white">No Surgery. No Scars.</h1>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white mb-4">Just Results.</h1>
          <p className="text-base max-w-md text-white/90 mb-6">
            Experience care without fear, without surgery, and with quick recovery.
          </p>

          <div className="mb-8">
            <SharedSearchBar 
              query={query}
              setQuery={handleValueChange}
              handleSearch={handleSearch}
              results={searchResult ? [searchResult] : []}
              isLoading={false}
            />
          </div>
        </div>

      </div>
      {/* Doctor image anchored to hero bottom-right, behind content */}
      <div className="absolute bottom-0 right-0 w-[280px] sm:w-[360px] max-[380px]:w-[230px] z-0 pointer-events-none select-none">
        <img
          src='/main_home_new.png'
          alt="Doctor"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default MobileHeroSection;
