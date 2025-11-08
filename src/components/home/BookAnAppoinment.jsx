import React from 'react';
import { Link } from 'react-router-dom';

const BookAnAppoinment = () => {

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div
        className="relative max-w-7xl mx-auto rounded-2xl overflow-hidden bg-cover bg-center flex"
        style={{ backgroundImage: "url('/book and appoinment background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3c3461]/20 to-[#3c3461]/10"></div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 w-full">
          {/* Left Content */}
          <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left p-8 sm:p-12 md:p-16 text-white">
            <p className="text-sm md:text-base font-light mb-2 text-white">
              Are you looking to get a Consultation for your healthcare needs?
            </p>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-6 text-white">
              Book Your Appointment with <br /> Experts Near You
            </h2>
            <Link to="/contact-us">
              <button
                className="bg-[#ff3576] text-white font-bold px-8 py-4 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Book Appointment
              </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="hidden md:block relative">
            <img
              src="/happypaients-removebg.png"
              alt="Doctor with patient"
              className="absolute bottom-0 right-0 h-[95%] w-auto object-contain max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
};

export default BookAnAppoinment;
