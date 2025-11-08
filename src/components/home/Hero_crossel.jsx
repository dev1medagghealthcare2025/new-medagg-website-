import React from 'react';
import SharedSearchBar from './SharedSearchBar';

const Hero_crossel = ({ query, setQuery, handleSearch, results, isLoading, popularSearches }) => {
  const socialIcons = [
    { icon: 'facebook', color: '#1877F2' },
    { icon: 'instagram', color: '#E4405F' },
    { icon: 'youtube', color: '#FF0000' },
    { icon: 'linkedin', color: '#0A66C2' },
    { icon: 'twitter', color: '#1DA1F2' }
  ];

  return (
    <section 
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: 'url(\'/book and appoinment background.jpg\')',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d2552]/15 via-[#4a3d7a]/15 to-[#6b5b95]/15"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 border border-white/20 rounded-full"></div>
      </div>

      {/* Main Grid Container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Left Content Section */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 py-4">

          {/* Main Heading */}
          <div className="space-y-2">
            <h1 
              className="text-[#ff3576] text-2xl font-bold leading-tight whitespace-nowrap"
            >
              The Longest Kept Secret Of Modern Medicine
            </h1>
            <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold text-[#ff3576]">
              Interventional Radiology
            </h2>
            <p className="text-white/90 text-lg lg:text-xl font-medium mt-4">
              Now Available For Common Good
            </p>
          </div>
          <SharedSearchBar 
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            results={results}
            isLoading={isLoading}
            popularSearches={popularSearches}
          />


        </div>

        {/* Right Content Section - Dr. Medagg Chatbot */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-start relative py-4">
          <div className="relative lg:-ml-12">
            {/* Chat Interface */}
            <div className="bg-white rounded-2xl shadow-2xl p-1 mb-4 max-w-sm">
              <div className="bg-gray-50 rounded-xl p-4">
                {/* Chat Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#ff3576] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Dr</span>
                    </div>
                    <span className="font-semibold text-gray-800">Chat</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-[#ff3576] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">Dr</span>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm flex-1">
                      <p className="text-xs text-gray-700">Hello! I'm Dr. Medagg</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-[#ff3576] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">Dr</span>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm flex-1">
                      <p className="text-xs text-gray-700">How can I help you today?</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-[#ff3576] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">Dr</span>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm flex-1">
                      <p className="text-xs text-gray-700">I can help with medical queries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dr. Medagg Character */}
            <div className="flex justify-center">
              <img
                src="/Dr_medagg_new-removebg-preview.png"
                alt="Dr. Medagg"
                className="h-80 w-auto object-contain"
              />
            </div>

            {/* Chat Bubble */}
            <div className="absolute -top-4 -left-7 bg-white rounded-full p-3 shadow-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero_crossel;