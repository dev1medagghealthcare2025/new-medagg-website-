import React from 'react';

const services = [
  {
    title: 'CARE CUSTODIAN',
    desc: "Care Custodians offer expert guidance on alternative treatments to surgery.",
    img: '/Non%20sugrical.svg',
  },
  {
    title: 'CARE COMPANION',
    desc: "We Connect you with top hospitals and expert doctors for exceptional care.",
    img: '/Sugrical.jpg',
  },
  {
    title: 'SECOND OPINION',
    desc: 'Medagg Healthcare offers expert second opinions, We connect you with top doctors to ensure the best approach for your health concerns.',
    img: '/second%20opinon.svg',
  },
];

const OurServiceSection = () => {
  return (
    <section
      className='relative w-full'
      style={{
        backgroundImage: 'url(\'/ourservice%20background.jpg\')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute inset-0 bg-[#1a1446]/40 z-0' />
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col items-center text-center md:items-start md:text-left'>
        <h2 className='text-3xl sm:text-4xl font-bold text-white mb-2'>
          Our <span className='text-[#ff3576]'>Services</span>
        </h2>
        <p className='text-base sm:text-lg text-white/70 mb-8 sm:mb-12'> 
          Care that&apos;s safer, smarter, and surgery-free.
        </p>
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6'>
          {services.map((s, idx) => (
            <div
              key={s.title}
              className='bg-white rounded-2xl shadow-lg p-6 pb-10 flex flex-col items-center text-center min-h-[220px]'
            >
              <img
                src={s.img}
                alt={s.title}
                className='w-14 h-14 object-contain mb-4'
              />
              <h3 className='text-xl font-bold text-[#1a1446] mb-2 tracking-wide'>{s.title}</h3>
              <p className='text-gray-400 text-base font-medium'>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServiceSection;
