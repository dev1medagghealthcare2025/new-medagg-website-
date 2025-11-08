import React from 'react';

const symptoms = [
  {
    number: '1',
    title: 'CHRONIC KNEE PAIN',
    desc: 'GAE helps reduce persistent pain without surgery.',
  },
  {
    number: '2',
    title: 'PAIN WHILE WALKING OR CLIMBING STAIRS',
    desc: 'Feel more mobile within days, not weeks.',
  },
  {
    number: '3',
    title: 'PAIN DURING REST OR AT NIGHT',
    desc: 'May help relieve inflammation and restore comfort.',
  },
  {
    number: '4',
    title: 'RECOMMENDED FOR SURGERY?',
    desc: 'GAE may help delay or avoid knee replacement.',
  },
];

const GAE_Are_you_experience = () => (
  <section className='bg-white w-full py-12 px-4 md:px-16 lg:px-32 xl:px-48 2xl:px-64'>
    <div className='max-w-7xl mx-auto'>
      <h2 className='text-3xl md:text-4xl font-extrabold text-[#2D2357] mb-0'>
        Are You Experiencing
      </h2>
      <div className='mt-1 mb-4'>
        <span className='block text-3xl md:text-4xl font-extrabold text-[#FF4376]'>These Symptoms?</span>
      </div>
      <p className='text-gray-500 text-base md:text-lg max-w-3xl mb-10'>
        If you are experiencing any of these symptoms, talk to our expert team:
      </p>
      <div className='w-full flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-5xl'>
          {symptoms.map((symptom, idx) => (
            <div
              key={idx}
              className='border border-[#FF4376] rounded-[10px] flex flex-col items-center text-center transition-shadow hover:shadow-lg bg-white w-full h-[203px] min-w-0 p-[20px] px-[10px] box-border'
              style={{ opacity: 1 }}
            >
              <div className='flex flex-col items-center w-full'>
                <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#FF4376]/10 text-[#FF4376] text-2xl font-bold mb-4'>
                  {symptom.number}
                </div>
                <h3 className='font-extrabold text-[#2D2357] text-sm mb-2 uppercase tracking-tight'>
                  {symptom.title}
                </h3>
                <p className='text-gray-500 text-sm font-medium'>
                  {symptom.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default GAE_Are_you_experience;
