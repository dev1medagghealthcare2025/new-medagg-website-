import React from 'react';

const features = [
  {
    title: 'Precision Treatments, Simplified',
    desc: 'Skip surgery, not care. Medagg connects you with specialists who offer safe, minimally invasive solutions tailored to your condition.',
    img: '/Surgeries Simplified_new.svg',
    svg: (
      <svg width='32' height='32' fill='none' viewBox='0 0 32 32' className='text-[#ff3576] group-hover:text-white'>
        <circle cx='16' cy='16' r='15' stroke='currentColor' strokeWidth='2' fill='none'/>
        <path d='M10 22l12-12M22 22l-12-12' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'CARE CUSTODIAN',
    desc: 'From first consultation to follow-up, your Medagg Care Custodian ensures a smooth, transparent, and personalized treatment journey.',
    img: '/costumer-support-call-svgrepo-com 1.svg',
    svg: (
      <svg width='32' height='32' fill='none' viewBox='0 0 32 32' className='text-[#ff3576] group-hover:text-white'>
        <circle cx='16' cy='12' r='5' stroke='currentColor' strokeWidth='2' fill='none'/>
        <rect x='8' y='20' width='16' height='7' rx='3.5' stroke='currentColor' strokeWidth='2' fill='none'/>
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'Insurance, Made Easy',
    desc: 'We help you find the right hospital and handle insurance coordination — all major providers are accepted.',
    img: '/all insurance.png',
    svg: (
      <svg width='32' height='32' fill='none' viewBox='0 0 32 32' className='text-[#ff3576] group-hover:text-white'>
        <circle cx='16' cy='16' r='15' stroke='currentColor' strokeWidth='2' fill='none'/>
        <path d='M10 16h12M16 10v12' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'SECOND OPINION',
    desc: 'Get clarity before you decide. Medagg connects you with experienced specialists who assess your case and recommend the best treatment path — whether it’s Interventional Radiology, surgery, or another alternative approach.',
    img: '/Second Opinion_new.svg',
    svg: (
      <svg width='32' height='32' fill='none' viewBox='0 0 32 32' className='text-[#ff3576] group-hover:text-white'>
        <circle cx='16' cy='16' r='15' stroke='currentColor' strokeWidth='2' fill='none'/>
        <path d='M12 20l8-8M20 20l-8-8' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'Complete Post-Procedure Support',
    desc: 'Recovery doesn’t stop after treatment. Medagg ensures you get the right post-procedure support, from follow-up consultations to rehabilitation guidance — helping you recover faster and safer.',
    img: '/Post Surgery Care_new.svg',
    svg: (
      <svg width='32' height='32' fill='none' viewBox='0 0 32 32' className='text-[#ff3576] group-hover:text-white'>
        <rect x='6' y='14' width='20' height='12' rx='6' stroke='currentColor' strokeWidth='2' fill='none'/>
        <circle cx='16' cy='12' r='4' stroke='currentColor' strokeWidth='2' fill='none'/>
      </svg>
    ),
    highlight: false,
  },
  {
    title: 'Flexible, No-Cost EMI',
    desc: 'Quality care should never be out of reach. Medagg offers zero-cost EMI options that make advanced medical and interventional treatments more accessible and affordable for every patient',
    img: '/No cost EMI_new.svg',
    svg: (
      <svg width='32' height='32' fill='none' viewBox='0 0 32 32' className='text-[#ff3576] group-hover:text-white'>
        <rect x='8' y='8' width='16' height='16' rx='8' stroke='currentColor' strokeWidth='2' fill='none'/>
        <path d='M12 16h8M16 12v8' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
      </svg>
    ),
    highlight: false,
  },
];

const WhyMedagg = () => (
  <section className='py-6 sm:py-10 lg:py-14 bg-gray-60'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
      <div className='text-center sm:text-left'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4'>
          Why <span className='text-[#ff3576]'>Medagg</span>
        </h2>
        <p className='text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg max-w-3xl mx-auto sm:mx-0'>
          Medagg offers expert, non-surgical treatments with personalized care.<br className='hidden sm:block' />
          <span className='block sm:inline'> We guide you with precision, compassion, and trusted medical expertise.</span>
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`group rounded-xl shadow-md p-8 flex flex-col items-center text-center transition-all ${
              f.highlight
                ? 'bg-[#ff3576] text-white scale-105'
                : 'bg-white text-[#2d2346] hover:bg-[#ff3576] hover:text-white hover:shadow-lg'
            }`}
          >
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 border-2 ${
                f.highlight
                  ? 'border-white bg-white/10'
                  : 'border-[#ff3576] bg-[#ff3576]/20 ring-1 ring-[#ff3576]/30 group-hover:border-white group-hover:bg-white/10 group-hover:ring-white/20'
              }`}
            >
              {f.img ? (
                <img src={f.img} alt={f.title} className='w-12 h-12 object-contain drop-shadow-md opacity-95' />
              ) : f.svg}
            </div>
            <h3 className='font-bold text-lg mb-2 group-hover:text-white'>{f.title}</h3>
            <p className='text-sm group-hover:text-white'>{f.desc}</p>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center mt-12'>
        <div className='text-center md:text-left'>
    
        </div>
      </div>
    </div>
  </section>
);

export default WhyMedagg;
