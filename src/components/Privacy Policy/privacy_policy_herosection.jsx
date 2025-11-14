import React from 'react';

const PrivacyPolicyHeroSection = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/policy_bg.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#2d2552] opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-center min-h-[180px] sm:min-h-[220px] md:min-h-[280px]">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/90">
              Your health information stays safe, private, and confidential with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyHeroSection;