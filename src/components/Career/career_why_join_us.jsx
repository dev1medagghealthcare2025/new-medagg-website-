import React from 'react';

const CareerWhyJoinUs = () => {
  const points = [
    {
      title: 'Mission-Driven Impact',
      desc: 'Work on solutions that directly improve patient quality of life without invasive procedures.',
    },
    {
      title: 'Non-Surgical Innovation',
      desc: 'Pioneer new treatments and technologies in the rapidly growing field of minimally invasive care.',
    },
    {
      title: 'Collaborative Culture',
      desc: 'Join a diverse team of doctors, engineers, and creatives working together to solve complex problems.',
    },
    {
      title: 'Real-World Outcomes',
      desc: 'See the tangible results of your work in the smiles of thousands of satisfied patients.',
    },
  ];

  return (
    <section className='w-full bg-[#faf7fb]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Intro */}
        <div className='max-w-3xl'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2d2552] leading-tight'>
            Join Us. <span className='text-[#ff3576]'>Build What Matters.</span>
          </h2>
          <p className='mt-3 text-sm sm:text-base md:text-lg text-[#4b4766]/80'>
            Join a team innovating modern healthcare with compassion, technology, and precision.
          </p>
        </div>

        <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
          <div className='w-full'>
            <img
              src='/why_join-us_career.png'
              alt='Why join us'
              className='w-full h-auto object-contain'
              loading='lazy'
            />
          </div>

          <div className='space-y-6'>
            {points.map((p, idx) => (
              <div key={idx}>
                <h3 className='text-base sm:text-lg font-extrabold text-[#2d2552]'>{p.title}</h3>
                <p className='mt-1 text-sm sm:text-base text-[#4b4766]/80 leading-relaxed'>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerWhyJoinUs;
