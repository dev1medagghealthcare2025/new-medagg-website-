
import React from 'react';

const cards = [
  {
    title: 'No Cuts or Stitches',
    desc: 'No surgical wounds or removal of the hemorrhoidal tissue.',
    icon: '/NON-SURGICAL icon.png',
  },
  {
    title: 'No Spinal or General Anesthesia',
    desc: 'Performed safely under local anesthesia.',
    icon: '/general_anasthis.png',
  },
  {
    title: 'Day-Care Procedure',
    desc: 'Go home the same day.',
    icon: '/day_care.png',
  },
  {
    title: 'Minimal Pain & Faster Recovery',
    desc: 'Return to daily activities within days.',
    icon: '/PROMISING RESULTS icon.png',
  },
];

export default function WhyChooseHemorrhoidal() {
  return (
    <section className='w-full bg-white py-10 sm:py-12 lg:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8 text-center sm:text-left'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]'>
            Why Choose <span className='text-[#ff3576]'> Piles Artery Embolization?</span>
          </h2>
          <p className='mt-4 text-base sm:text-lg text-gray-600 w-full'>
            Piles Artery Embolization is an advanced, minimally invasive procedure that treats hemorrhoids at the source — by reducing the excess blood flow causing swelling and bleeding — without surgery.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {cards.map((item) => (
            <div
              key={item.title}
              className='group rounded-2xl bg-white border border-pink-200 shadow-md hover:shadow-xl hover:bg-[#ff3576] transition-all duration-300 p-6 flex flex-col items-center text-center'
            >
              <div className='w-20 h-20 rounded-full bg-pink-50 group-hover:bg-white flex items-center justify-center mb-4 transition-colors duration-300'>
                <img src={item.icon} alt='' className='w-12 h-12 object-contain' aria-hidden='true' />
              </div>
              <h3 className='text-base font-extrabold text-[#1a1446] group-hover:text-white transition-colors duration-300'>{item.title}</h3>
              <p className='mt-2 text-sm text-gray-600 group-hover:text-white transition-colors duration-300'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

