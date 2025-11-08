import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinWithUsHero = () => {
  const navigate = useNavigate();

  const handleGoToForm = () => {
    const el = document.getElementById('join-with-us-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/join-with-us#join-with-us-section');
    }
  };

  return (
    <section 
      className="relative bg-cover bg-center text-white flex items-center min-h-[471px] py-12 md:py-0"
      style={{ backgroundImage: "url('/Joinwithus_bg.png')" }}
    >
      <div className="absolute inset-0 bg-[#2d2552] opacity-10"></div>
      <div className="relative z-10 w-full max-w-[1446px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-semibold tracking-wide">
              For Doctors and Hospitals
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Empowering <span className="text-pink-500">IR Experts</span>. <br />
              Enhancing Lives.
            </h1>
            <p className="text-lg text-gray-200 max-w-md mx-auto md:mx-0">
              Join our panel of top-IR specialists and be part of a healthcare revolution that puts patients first.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 justify-center md:justify-start">
              <button onClick={handleGoToForm} className="bg-pink-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors duration-300 whitespace-nowrap">
                Partner With Us
              </button>
             
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="hidden md:block">
            <img src="/join_with_us.png" alt="Group of doctors" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinWithUsHero;