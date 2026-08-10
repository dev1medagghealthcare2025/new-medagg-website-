import React, { useState, useEffect, useRef } from 'react';
import MobileHeroSlide1 from './MobileHeroSlide1';
import MobileHeroSlide2 from './MobileHeroSlide2';
import MobileHeroSlide3 from './MobileHeroSlide3';

// Month index is 0-indexed (August is 7). This will be true until August 15, 2026 11:59:59 PM.
const showIndependenceDayTheme = new Date() < new Date(2026, 7, 16);

const MobileHeroSection = ({
  query,
  setQuery,
  handleSearch,
  results = [],
  isLoading = false,
  onSearchFocus,
  onSearchBlur,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const totalSlides = 3;
  const touchStartX = useRef(null);

  const searchProps = { query, setQuery, handleSearch, results, isLoading };

  const slideSearchProps = {
    ...searchProps,
    onSearchFocus: () => {
      setIsInteracting(true);
      onSearchFocus?.();
    },
    onSearchBlur: () => {
      setIsInteracting(false);
      onSearchBlur?.();
    },
  };

  const handleFocusCapture = () => {
    setIsInteracting(true);
    onSearchFocus?.();
  };

  const handleBlurCapture = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsInteracting(false);
      onSearchBlur?.();
    }
  };

  useEffect(() => {
    if (isInteracting) return;
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 20000);

    return () => clearInterval(slideInterval);
  }, [isInteracting, totalSlides]);

  const goToSlide = (index) => setCurrentSlide(index);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide((currentSlide + 1) % totalSlides);
      } else {
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className='relative w-full overflow-hidden md:hidden'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
    >
      <div
        className='flex w-full transition-transform duration-700 ease-in-out'
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <div className='w-full min-w-full flex-[0_0_100%]'>
          <MobileHeroSlide1 {...slideSearchProps} />
        </div>
        <div className='w-full min-w-full flex-[0_0_100%]'>
          <MobileHeroSlide2 {...slideSearchProps} />
        </div>
        <div className='w-full min-w-full flex-[0_0_100%]'>
          <MobileHeroSlide3 {...slideSearchProps} />
        </div>
      </div>

      <div className='absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 pointer-events-auto'>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            type='button'
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === index
                ? (showIndependenceDayTheme && currentSlide === 0 ? 'h-2.5 w-2.5 bg-[#1a1446] border-2 border-[#ffc400]' : 'h-2.5 w-2.5 bg-white border-2 border-[#ffc400]')
                : (showIndependenceDayTheme && currentSlide === 0 ? 'h-2 w-2 bg-[#1a1446]/30' : 'h-2 w-2 bg-white/60')
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileHeroSection;
