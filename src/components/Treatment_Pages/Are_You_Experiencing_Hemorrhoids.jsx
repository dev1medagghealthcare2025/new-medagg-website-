
import React from 'react';

const symptoms = [
  {
    title: 'Painless rectal bleeding during bowel movements',
    desc: 'Helps address recurrent bleeding that hasn’t improved with medications or lifestyle changes.',
  },
  {
    title: 'Pain or discomfort in the anal region',
    desc: 'May reduce persistent discomfort that affects sitting, walking, or daily activities.',
  },
  {
    title: 'Swelling or a lump near the anus',
    desc: 'Reducing excess blood flow may help decrease swelling and improve comfort.',
  },
  {
    title: 'Itching or irritation',
    desc: 'May provide relief for ongoing irritation not responding to conservative treatments.',
  },
];

export default function AreYouExperiencingHemorrhoids() {
  return (
    <section className='w-full bg-white py-10 sm:py-12 lg:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-10'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446] leading-tight'>
            Are You Experiencing
            <br />
            <span className='text-[#ff3576]'>These Symptoms?</span>
          </h2>
          <p className='mt-3 text-sm sm:text-base text-gray-600'>
            If yes, you may be a candidate for Piles Artery Embolization.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {symptoms.map((item, idx) => (
            <div
              key={item.title}
              className='relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow'
            >
              <div className='absolute left-0 top-0 bottom-0 w-[4px] bg-[#ff3576] rounded-l-2xl' />

              <div className='p-6'>
                <div className='w-7 h-7 rounded-md bg-pink-50 text-[#ff3576] font-bold text-xs flex items-center justify-center mb-4'>
                  {idx + 1}
                </div>
                <h3 className='text-sm sm:text-base font-extrabold text-[#1a1446] leading-snug'>
                  {item.title}
                </h3>
                <p className='mt-3 text-sm text-gray-600 leading-relaxed'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

