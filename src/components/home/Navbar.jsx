import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  return (
    <nav className='w-full bg-[#392C5C] sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0'>
        <div className='flex items-center justify-between h-[100px] lg:h-[110px] gap-3'>

          {/* Desktop Search (only show at lg and above to avoid tablet crowding) */}
          <div className='hidden lg:flex flex-1 items-center justify-start px-1'>
            <div className='w-full max-w-[520px] xl:max-w-[560px]'>
              <form
                className='flex items-center bg-white rounded-xl overflow-hidden ring-1 ring-black/5 h-10'
                onSubmit={(e) => e.preventDefault()}
              >
                <button
                  type='button'
                  className='h-10 px-4 flex items-center gap-2 text-sm text-gray-700 font-medium border-r border-gray-200 whitespace-nowrap'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-pink-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  Location
                </button>

                <input
                  type='text'
                  placeholder='Search disease'
                  className='flex-1 h-10 px-4 text-sm text-gray-700 outline-none'
                />

                <button
                  type='submit'
                  className='h-10 px-5 bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors flex items-center justify-center gap-2'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                  Search
                </button>
              </form>
            </div>
          </div>

          {/* Desktop Actions: only show at lg and above to avoid tablet crowding */}
          <div className='hidden lg:flex items-center gap-2'>
            {/* Phone Icon with Number */}
            <a href='tel:+919363656010' className='flex items-center gap-2 hover:opacity-90 transition-opacity h-11'>
              <div className='bg-pink-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-pink-600 transition-colors shrink-0'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-.7.7a16.001 16.001 0 006.36 6.36l.7-.7a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C7.82 21 3 16.18 3 10V5z' />
                </svg>
              </div>
              <span className='text-white font-semibold text-sm xl:text-base leading-none whitespace-nowrap'>+91 93636 56010</span>
            </a>
            {/* Buttons */}
            <Link to='/join-with-us' className='hover-stable hidden lg:flex h-11 px-3 border-2 border-pink-400 text-white text-sm rounded-lg font-normal hover:bg-pink-400 transition-colors items-center justify-center whitespace-nowrap leading-none shrink-0'>Partner With Us</Link>
            <Link to='/investor' className='hover-stable hidden lg:flex h-11 px-3 border-2 border-pink-400 text-white text-sm rounded-lg font-normal hover:bg-pink-400 transition-colors items-center justify-center whitespace-nowrap leading-none shrink-0'>Become an Investor</Link>

            {/* ISVIR Logo and Label (Desktop only) */}
            <div className='hidden lg:flex items-center h-11 pl-3 ml-2 border-l border-white/10'>
              <img
                src='/New_ISVIR_LOGO.png'
                alt='ISVIR logo'
                className='h-11 w-11 object-contain opacity-95'
              />
              <div className='ml-2 leading-tight'>
                <div className='text-white/80 text-[10px] whitespace-nowrap'>
                  Corporate Member of ISVIR
                  <br />
                  Interventional Radiology
                </div>
              </div>
            </div>
          </div>

          {/* Mobile ISVIR logo + menu (visible below lg) */}
          <div className='flex items-center lg:hidden w-full justify-between'>
            <div className='flex items-center gap-2 min-w-0'>
              {/* ISVIR Logo (mobile only) */}
              <img
                src='/New_ISVIR_LOGO.png'
                alt='ISVIR logo'
                className='h-10 w-auto opacity-90 shrink-0'
              />
              {/* ISVIR caption (mobile only) */}
              <div className='leading-tight min-w-0'>
                <div className='text-white/80 text-[10px] font-medium'>
                  Corporate Member of ISVIR
                </div>
                <div className='text-white/80 text-[10px]'>
                  Interventional Radiology
                </div>
              </div>
            </div>
            <button
              onClick={toggleMenu}
              className='text-white hover:text-pink-400 transition-colors p-2 shrink-0'
              aria-label='Toggle menu'
              aria-expanded={isMenuOpen}
              aria-controls='mobile-menu'
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Backdrop and Navigation Menu (below lg) */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className='fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40 lg:hidden'
              onClick={toggleMenu}
            />
            {/* Menu Panel */}
            <div id='mobile-menu' className='lg:hidden fixed top-[100px] lg:top-[110px] left-0 right-0 z-50 animate-slide-down'>
              <div className='px-2 pt-2 pb-3 space-y-1 bg-[#392C5C] border-t border-pink-400/20 shadow-xl'>
                <Link to='/about' onClick={() => setIsMenuOpen(false)} className='block px-3 py-2 text-white hover:text-pink-400 transition-colors text-base font-semibold'>About</Link>
                <Link to='/blog' onClick={() => setIsMenuOpen(false)} className='block px-3 py-2 text-white hover:text-pink-400 transition-colors text-base font-semibold'>Blog</Link>
                <Link to='/contact-us' onClick={() => setIsMenuOpen(false)} className='block px-3 py-2 text-white hover:text-pink-400 transition-colors text-base font-semibold'>Contact Us</Link>

                {/* Mobile Actions */}
                <div className='pt-4 space-y-2'>
                  <Link to='/join-with-us' onClick={() => setIsMenuOpen(false)} className='hover-stable block w-full px-3 py-2 border-2 border-pink-400 text-white text-center rounded-lg font-normal hover:bg-pink-400 transition-colors'>Partner With Us</Link>
                  <Link to='/investor' onClick={() => setIsMenuOpen(false)} className='hover-stable block w-full px-3 py-2 border-2 border-pink-400 text-white text-center rounded-lg font-normal hover:bg-pink-400 transition-colors'>Become an Investor</Link>
                  <Link to='/contact-us' onClick={() => setIsMenuOpen(false)} className='hover-stable block w-full px-3 py-2 bg-pink-500 text-white text-center rounded-lg font-normal hover:bg-pink-600 transition-colors'>Book Appointment</Link>
                  <a href='tel:+919363656010' onClick={() => setIsMenuOpen(false)} className='hover-stable block w-full px-3 py-2 bg-pink-500 text-white text-center rounded-lg font-normal hover:bg-pink-600 transition-colors'>📞 Call Now</a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
