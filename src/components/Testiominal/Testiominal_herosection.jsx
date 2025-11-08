import React from 'react';
import { Search } from 'lucide-react';

const TestiominalHerosection = () => {
  return (
    <div
      className="relative w-full bg-cover bg-center py-12 sm:py-14 md:py-16 lg:py-18"
      style={{ backgroundImage: "url('/testiominal_bg.png')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#2d2552] opacity-30"></div>

      <div className="relative z-10 mx-auto max-w-3xl text-center text-white px-4">
        <h1 className="text-white text-3xl font-extrabold sm:text-4xl md:text-4xl lg:text-5xl">
          Real Patients. Real Relief. Real Results.
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base md:text-lg text-gray-200">
          Our patients are living proof that modern interventional radiology can transform lives — without the risks of traditional surgery or long recovery times.
        </p>

        <div className="mt-6 mx-auto max-w-lg">
          <form className="flex items-center w-full">
            <div className="relative flex-grow">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search Testimonial Post By Name"
                className="w-full rounded-l-lg border-none bg-white py-3 pl-11 pr-4 text-sm text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-r-lg bg-[#ff3576] px-6 py-3 text-sm font-semibold text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestiominalHerosection;
