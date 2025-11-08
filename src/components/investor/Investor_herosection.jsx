import React from 'react';

const InvestorHerosection = ({ scrollToInfoRef }) => {
  const handleScroll = () => {
    scrollToInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div 
      className="relative w-full text-white px-4 sm:px-6 lg:px-8 bg-cover bg-center flex items-center"
      style={{ 
        backgroundImage: "url('/Investor_bg.png')",
        minHeight: '598px' 
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6 lg:pr-8">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-[#ff3576]">Invest in the Future</span>{' '}
              <span className="text-white">of Non-Surgical Healthcare</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl leading-8 lg:leading-9">
              Medagg Healthcare is leading India’s transformation toward Interventional Radiology (IR) —
              minimally invasive, image-guided treatments that enable faster recovery, lower costs, and better
              outcomes. Our platform connects hospitals and patients through transparency, technology, and trust,
              empowering both to make informed, ethical decisions.
            </p>

            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl leading-8 lg:leading-9 mt-3">
              Join us in shaping the future of healthcare — invest in Medagg Healthcare and be part of India’s
              non-surgical revolution where precision replaces incision and impact drives growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button onClick={handleScroll} className="bg-[#ff3576] text-white font-bold py-4 px-8 rounded-2xl text-lg hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105">
                Start Investing
              </button>
              {/* Removed investor avatars and count as requested */}
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex justify-end items-end h-full">
            <img 
              src="/Investor_herosection.png" 
              alt="Invest in Medagg Healthcare" 
              className="h-full w-auto object-contain max-h-[600px]" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorHerosection;