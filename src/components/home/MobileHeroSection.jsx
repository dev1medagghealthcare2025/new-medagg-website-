import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import SharedSearchBar from './SharedSearchBar';
import FloatingBadgeCTA from './FloatingBadgeCTA';

const MobileHeroSection = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const popularSearches = ['Knee Pain', 'Breast Nodule', 'Thyroid', 'Prostate'];

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

  const handleInputChange = (e) => {
    const value = e.target.value;
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
      className="relative w-full h-[105vh] bg-cover bg-center md:hidden"
      style={{
        backgroundImage: `url('/Herosection background.jpg')`,
      }}
    >
      {/* Floating CTA for mobile */}
      <FloatingBadgeCTA 
        imgSrc="/irpreneur.png" 
        alt="IR preneur 2025"
        href="https://medagghealthcare.com/IRPreneur-conference/"
        size={120}
        mobileSize={110}
        topOffset={16}
        zIndex={30}
        showOnMobile={true}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d2552] via-[#2d2552] to-[#e1006a] opacity-60" />

      <div className="relative z-10 flex flex-col h-full px-6 pt-8 text-white">
        {/* Header with Logo */}
      

        {/* Main Content */}
        <div className="mt--1">
          <h1 className="text-3xl font-bold leading-tight text-white">No Surgery. No Scars.</h1>
          <h1 className="text-3xl font-bold leading-tight text-white">Just Results.</h1>
          <p className="mt-2 text-lg max-w-md text-white/90">
            Experience care without fear, without surgery, and with quick recovery.
          </p>

          <div className="mt-6">
            <SharedSearchBar 
              query={query}
              handleInputChange={handleInputChange}
              handleSearch={handleSearch}
              searchResult={searchResult}
              popularSearches={popularSearches}
            />
          </div>
        </div>

        <img
          src="/new_png_for_hero.png"
          alt="Doctor"
          className="absolute bottom-0 right-0 max-w-[365px] z-0"
        />
      </div>
    </div>
  );
};

export default MobileHeroSection;
