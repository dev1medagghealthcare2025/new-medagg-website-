import React, { useState } from 'react';

const treatments = [
  'Knee Pain',
  'Enlarged Prostate',
  'Thyroid Nodule',
  'Varicocele',
  'Fallopian Tube Block',
  'Uterine Fibroids',
  'Varicose Veins',
  'Interventional',
];

export default function Navbar2() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <nav className='w-full bg-white border-b border-[#392C5C]/20 flex justify-center'>
      <div className='w-[1440px] flex items-center justify-center py-2'>
        <ul className='flex gap-12'>
          {treatments.map((treatment, idx) => (
            <li key={treatment} className='relative'>
              <button
                className='flex items-center gap-1 text-[#2D2552] font-semibold text-lg focus:outline-none'
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {treatment}
                <span className='ml-1 text-base'>▼</span>
              </button>
              {/* Dropdown placeholder */}
              {openIndex === idx && (
                <div className='absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-10 p-4'>
                  <span className='text-gray-400'>Dropdown content here</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
