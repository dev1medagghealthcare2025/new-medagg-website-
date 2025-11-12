import React from 'react';
import { useNavigate } from 'react-router-dom';

const Drmedagg = () => {
  const navigate = useNavigate();
  return (
    <section className='w-full bg-[#fff4fa]'>
      <div className='max-w-7xl mx-auto px-3 sm:px-4 py-12 flex flex-col md:flex-row items-center justify-start gap-8'>
        {/* Left: Bot Illustration */}
        <div className='flex-shrink-0 flex justify-center items-center min-w-[240px] max-[390px]:min-w-[210px] max-[360px]:min-w-[190px] max-[340px]:min-w-[180px] sm:min-w-[260px] max-w-[350px] md:ml-0'>
          <img
            src='/Dr_medagg_new-removebg-preview.png'
            alt='Dr. Medagg Bot'
            className='max-w-[320px] max-[390px]:max-w-[260px] max-[360px]:max-w-[240px] w-full h-auto'
          />
        </div>
        {/* Right: Text and Actions */}
        <div className='flex-1 flex flex-col justify-center items-start w-full max-w-none md:max-w-lg min-w-0 gap-3 mx-auto md:pl-0 overflow-visible'>
          <div className='w-full pr-1'>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-left flex items-center gap-1.5 sm:gap-2 mb-1 w-full origin-left'>
              <span className='text-[#ff3576] whitespace-nowrap'>Meet IRA :</span>
              <span className='text-[#1a1446] font-bold whitespace-nowrap'>Your Medagg Health Companion</span>
            </h2>
          </div>
          <p className='text-lg max-[360px]:text-base text-[#7c6e97] font-medium text-left w-full leading-relaxed'>
          From instant answers,  booking appointments, Or Finding the Right Treatment, Ira is here to simplify your healthcare journey — anytime, anywhere.
          </p>
          {/* Actions Group (search removed as requested) */}
          <div className='flex flex-col gap-3 w-full'>
            <div className='flex flex-row gap-3 w-full justify-start flex-nowrap max-[360px]:flex-wrap'>
              <button onClick={() => navigate('/contact-us')} className='flex items-center gap-2 px-6 py-3 border-2 border-[#ff3576] text-[#ff3576] rounded-full font-bold text-base bg-white hover:bg-[#ff3576] hover:text-white transition-all whitespace-nowrap'>
                <svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path d='M5 12h14M12 5l7 7-7 7' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
                Book Appointment
              </button>
              {/* <button className='flex items-center gap-2 px-6 py-3 border-2 border-[#ff3576] text-[#ff3576] rounded-full font-bold text-base bg-white hover:bg-[#ff3576] hover:text-white transition-all whitespace-nowrap'>
                <svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path d='M5 12h14M12 5l7 7-7 7' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
                Find Specialist
              </button> */}
              {/* <button className='flex items-center gap-2 px-6 py-3 border-2 border-[#ff3576] text-[#ff3576] rounded-full font-bold text-base bg-white hover:bg-[#ff3576] hover:text-white transition-all whitespace-nowrap'>
                <svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path d='M5 12h14M12 5l7 7-7 7' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
                Emergency
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Drmedagg;
