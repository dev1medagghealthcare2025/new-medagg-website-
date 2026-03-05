
import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Local Anesthesia & Tiny Entry Point',
    desc: 'A small pin-hole entry is made in the wrist or groin under local anesthesia.',
    image: '/RAE_1.png',
  },
  {
    step: 2,
    title: 'Microcatheter Navigation',
    desc: 'A thin catheter is guided to the rectal arteries supplying the  Piles/hemorrhoids using real-time imaging.',
    image: '/RAE_2.png',
  },
  {
    step: 3,
    title: 'Targeted Embolization',
    desc: 'Special microscopic particles are released to block the abnormal blood flow feeding the Piles/hemorrhoids.',
    image: '/RAE_3.png',
  },
  {
    step: 4,
    title: 'Shrinkage of Piles/Hemorrhoids',
    desc: 'Reduced blood supply causes the Piles/hemorrhoids to gradually shrink and symptoms improve.',
    image: '/RAE_4.png',
  },
  {
    step: 5,
    title: 'Recovery & Same-Day Discharge',
    desc: 'The procedure usually takes 45–60 minutes and patients go home the same day.',
    image: '/RAE_5.png',
  },
];

export default function Hemorrhoids_Work() {
  return (
    <section className='w-full bg-gray-50 py-10 sm:py-12 lg:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-10 text-center sm:text-left'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]'>
            How <span className='text-[#ff3576]'>Piles Artery Embolization</span> Works
          </h2>
          <p className='mt-3 text-base sm:text-lg text-gray-600'>
            Understanding the procedure step-by-step helps you feel confident about your treatment choice.
          </p>
        </div>

        <div className='relative'>
          <div className='hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-pink-200' />

          <div className='space-y-10 sm:space-y-12 lg:space-y-14'>
            {steps.map((s) => {
              const isLeft = s.step % 2 === 1;
              return (
                <div key={s.step} className='relative'>
                  <div className='hidden lg:flex absolute left-1/2 -translate-x-1/2 top-10 items-center justify-center'>
                    <div className='w-10 h-10 rounded-full bg-[#ff3576] text-white font-bold text-sm flex items-center justify-center shadow-md'>
                      {s.step}
                    </div>
                  </div>

                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start lg:items-center'>
                    <div
                      className={`${isLeft ? 'lg:pr-12' : 'lg:pl-12 lg:order-2'} flex flex-col lg:min-h-[260px] lg:justify-center`}
                    >
                      <div className='flex items-start gap-3 lg:hidden'>
                        <div className='w-9 h-9 rounded-full bg-[#ff3576] text-white font-bold text-sm flex items-center justify-center shadow-md flex-shrink-0'>
                          {s.step}
                        </div>
                        <div>
                          <h3 className='text-base sm:text-lg font-extrabold text-[#1a1446]'>
                            <span className='text-[#ff3576]'>Step {s.step}:</span> {s.title}
                          </h3>
                          <p className='mt-2 text-sm sm:text-base text-gray-600'>{s.desc}</p>
                        </div>
                      </div>

                      <div className='hidden lg:block'>
                        <h3 className='text-base sm:text-lg font-extrabold text-[#1a1446]'>
                          <span className='text-[#ff3576]'>Step {s.step}:</span> {s.title}
                        </h3>
                        <p className='mt-2 text-sm sm:text-base text-gray-600'>{s.desc}</p>
                      </div>
                    </div>

                    <div className={`${isLeft ? 'lg:pl-12 lg:order-2' : 'lg:pr-12'} w-full`}>
                      <div className='rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white'>
                        <img src={s.image} alt='' className='w-full h-[190px] sm:h-[240px] lg:h-[260px] object-cover' aria-hidden='true' />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

