import React from 'react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/#services' }, // Scroll to services section on home page
  { name: 'Contact', path: '/contact-us' },
];

const services1 = [
  { name: 'Knee Pain', path: '/gae' },
  { name: 'Enlarged Prostate', path: '/pae' },
  { name: 'Thyroid Nodule', path: '/thyroid' },
  { name: 'Varicocele', path: '/varicocele-embolization' },
];

const services2 = [
  { name: 'Fallopian Tube Block', path: '/fte' },
  { name: 'Uterine Fibroids', path: '/uae' },
  { name: 'Varicose Veins', path: '/varicose-vein' },
  { name: 'Breast Nodule', path: '/breast-nodule-vae' }, // Assuming this links to a general page
];

export default function Footer() {
  return (
    <footer className='w-full text-white relative overflow-hidden' style={{ backgroundImage: 'url(\'/ourservice background.jpg\')', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Dark purple overlay to match reference */}
      <div className='absolute inset-0 bg-[#2d2552]/15'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10'>
        {/* Main content grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 items-start'>
          {/* Left section - Logo and description */}
          <div className='lg:col-span-7 flex flex-col justify-start'>
            {/* Logo */}
            <div className='mb-4 sm:mb-5'>
              <img src='/Medagg logo(1).png' alt='Medagg Healthcare' className='h-9 sm:h-11 lg:h-14 w-auto drop-shadow' />
            </div>

            {/* Description */}
            <p className='text-gray-300 leading-relaxed mb-4 max-w-2xl text-sm sm:text-sm lg:text-base'>
            Medagg Healthcare, established in 2021, is a pioneering force in promoting advanced non-surgical treatments across India. With a mission to bridge the gap in healthcare knowledge, we began as a discovery platform focused on connecting patients to hospitals. Today, we specialize in Interventional Radiology and advocate for non-surgical procedures as the future of healthcare.
          </p>

            {/* Know More button */}
            <Link to="/about" className='inline-block text-center bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm px-6 sm:px-8 py-3 rounded-md transition-colors duration-200 max-w-[150px] w-full sm:w-auto shadow-md'>
              Know More
            </Link>
        </div>

          {/* Right section - Quick Links (as in reference) */}
          <div className='lg:col-span-5 flex justify-end self-center lg:pl-0 mr-16 lg:mr-32'>
            <div className='flex flex-col items-start text-left'>
              <h3 className='text-pink-400 font-bold text-base mb-1'>Quick Links</h3>
              <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-2 gap-x-8 gap-y-2'>
                {quickLinks.map((link, index) => (
                  <li
                    key={index}
                    className={`sm:ml-0 ${link.name === 'Testimonials' ? 'lg:col-start-1 lg:row-start-2' : ''}`}
                  >
                    <Link
                      to={link.path}
                      className={`text-gray-300 hover:text-white transition-colors duration-200 text-base ${link.name === 'About Us' ? 'whitespace-nowrap' : ''}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className='grid grid-cols-1 sm:grid-cols-3 items-center pt-4 border-t border-white/10 gap-3'>
          {/* Privacy and Terms - left */}
          <div className='text-center sm:text-left'>
            <span className='text-gray-300 text-[11px] sm:text-xs'>Privacy Policy | Terms and Condition</span>
          </div>

          {/* Social icons - centered */}
          <div className='flex items-center justify-center gap-3'>
            <a href='https://www.facebook.com/profile.php?id=61558841344582' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-white transition-colors duration-200'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12'/>
              </svg>
            </a>
            <a href='https://www.instagram.com/medagghealthcare?igsh=ZncyaGY3Z3poODky' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-white transition-colors duration-200'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.388 3.678 1.37c-.98.98-1.24 2.092-1.298 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.613.058 1.281.318 2.393 1.298 3.373.98.98 2.092 1.24 3.373 1.298C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.318 3.373-1.298.98-.98 1.24-2.092 1.298-3.373.058-1.281.07-1.69.07-7.613 0-5.923-.012-6.332-.07-7.613-.058-1.281-.318-2.393-1.298-3.373-.98-.98-2.092-1.24-3.373-1.298C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z'/>
              </svg>
            </a>
            <a href='https://youtube.com/@medagghealthcare?si=aUo2YtohR4EquRx1' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-white transition-colors duration-200'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/>
              </svg>
            </a>
            <a href='https://www.linkedin.com/company/medagg-healthcare/' target='_blank' rel='noopener noreferrer' className='text-gray-300 hover:text-white transition-colors duration-200'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z'/>
              </svg>
            </a>
          </div>

          {/* Copyright - right */}
          <div className='text-gray-300 text-[11px] sm:text-xs text-center sm:text-right'>
            © 2025 Medaaghealthcare. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
