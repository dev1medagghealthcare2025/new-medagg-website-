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
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-[84px] lg:h-[92px]'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link to='/' className='flex items-center'>
              <img
                src='/Medagg logo(1).png'
                alt='Medagg Healthcare'
                className='w-16 h-10 sm:w-18 sm:h-11 lg:w-[90px] lg:h-[56px]'
              />
            </Link>
          </div>

          {/* Desktop Navigation: only show at lg and above to avoid tablet crowding */}
          <div className='hidden lg:block'>
            <ul className='flex items-center space-x-4 xl:space-x-5'>
              <li><Link to='/about' className='text-white hover:text-pink-400 transition-colors text-base font-semibold'>About</Link></li>
              <li><Link to='/blog' className='text-white hover:text-pink-400 transition-colors text-base font-semibold'>Blog</Link></li>
              <li><Link to='/contact-us' className='text-white hover:text-pink-400 transition-colors text-base font-semibold'>Contact Us</Link></li>
            </ul>
          </div>

          {/* Desktop Actions: only show at lg and above to avoid tablet crowding */}
          <div className='hidden lg:flex items-center gap-2'>
            {/* Phone Icon with Number */}
            <a href='tel:+919363656010' className='flex items-center gap-1.5 lg:gap-2 hover:opacity-90 transition-opacity h-10'>
              <div className='bg-pink-500 rounded-full w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center hover:bg-pink-600 transition-colors'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-.7.7a16.001 16.001 0 006.36 6.36l.7-.7a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C7.82 21 3 16.18 3 10V5z' />
                </svg>
              </div>
              <span className='hidden lg:inline text-white font-semibold text-sm xl:text-base leading-none'>+91 93636 56010</span>
            </a>
            {/* Buttons */}
            <Link to='/join-with-us' className='hidden lg:flex h-10 px-1.5 border-2 border-pink-400 text-white text-sm rounded-lg font-normal hover:bg-pink-400 transition-colors items-center justify-center whitespace-nowrap leading-none shrink-0'>Partner With Us</Link>
            <Link to='/investor' className='hidden lg:flex h-10 px-2 border-2 border-pink-400 text-white text-sm rounded-lg font-normal hover:bg-pink-400 transition-colors items-center justify-center whitespace-nowrap leading-none shrink-0'>Become an Investor</Link>
            <Link to='/contact-us' className='h-9 lg:h-10 px-1.5 xl:px-2 bg-pink-500 text-white text-sm rounded-lg font-normal hover:bg-pink-600 transition-colors flex items-center justify-center whitespace-nowrap leading-none shrink-0'>Book Appointment</Link>

            {/* ISVIR Logo and Label (Desktop only) */}
            <div className='hidden lg:flex items-center h-10 pl-2 ml-0.5 border-l border-white/10'>
              <img
                src='/isvir_logo-2-removebg-preview.png'
                alt='ISVIR logo'
                className='h-14 xl:h-15 w-auto opacity-90'
              />
              <div className='ml-1.5 leading-tight'>
                
                <div className='text-white/80 text-[11px]'>
                Corporate Member of ISVIR
                  <br />
                  Interventional Radiology
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button (visible below lg) */}
          <div className='lg:hidden'>
            <button
              onClick={toggleMenu}
              className='text-white hover:text-pink-400 transition-colors p-2'
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
            <div id='mobile-menu' className='lg:hidden fixed top-[84px] lg:top-[92px] left-0 right-0 z-50 animate-slide-down'>
              <div className='px-2 pt-2 pb-3 space-y-1 bg-[#392C5C] border-t border-pink-400/20 shadow-xl'>
                <Link to='/about' onClick={() => setIsMenuOpen(false)} className='block px-3 py-2 text-white hover:text-pink-400 transition-colors text-base font-semibold'>About</Link>
                <Link to='/blog' onClick={() => setIsMenuOpen(false)} className='block px-3 py-2 text-white hover:text-pink-400 transition-colors text-base font-semibold'>Blog</Link>
                <Link to='/contact-us' onClick={() => setIsMenuOpen(false)} className='block px-3 py-2 text-white hover:text-pink-400 transition-colors text-base font-semibold'>Contact Us</Link>

                {/* Mobile Actions */}
                <div className='pt-4 space-y-2'>
                  <Link to='/join-with-us' onClick={() => setIsMenuOpen(false)} className='block w-full px-3 py-2 border-2 border-pink-400 text-white text-center rounded-lg font-normal hover:bg-pink-400 transition-colors'>Partner With Us</Link>
                  <Link to='/investor' onClick={() => setIsMenuOpen(false)} className='block w-full px-3 py-2 border-2 border-pink-400 text-white text-center rounded-lg font-normal hover:bg-pink-400 transition-colors'>Become an Investor</Link>
                  <Link to='/contact-us' onClick={() => setIsMenuOpen(false)} className='block w-full px-3 py-2 bg-pink-500 text-white text-center rounded-lg font-normal hover:bg-pink-600 transition-colors'>Book Appointment</Link>
                  <a href='tel:+919363656010' onClick={() => setIsMenuOpen(false)} className='block w-full px-3 py-2 bg-pink-500 text-white text-center rounded-lg font-normal hover:bg-pink-600 transition-colors'>📞 Call Now</a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
