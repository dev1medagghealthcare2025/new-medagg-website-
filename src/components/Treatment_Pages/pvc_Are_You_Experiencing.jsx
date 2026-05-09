import React from 'react';

const symptoms = [
  {
    id: 1,
    title: 'CHRONIC PELVIC PAIN',
    description: 'Persistent Pain In The Lower Abdomen Lasting More Than Six Months.',
  },
  {
    id: 2,
    title: 'PAIN AFTER STANDING LONG',
    description: 'Discomfort That Worsens After Prolonged Standing Or Activity',
  },
  {
    id: 3,
    title: 'PAIN DURING OR AFTER INTERCOURSE',
    description: 'Pelvic Heaviness Or Aching After Intimacy',
  },
  {
    id: 4,
    title: 'VISIBLE PELVIC OR THIGH VARICOSE VEINS',
    description: 'Varicose Veins Around The Pelvis, Buttocks, Or Upper Thighs',
  },
];

const PVCAreYouExperiencing = () => {
  return (
    <section className='bg-white py-12 md:py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='mb-12'>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-[#2d2552] leading-tight mb-4'>
            Are You Experiencing <br />
            <span className='text-[#ff3576]'>These Symptoms?</span>
          </h2>
          <p className='text-gray-500 text-lg max-w-3xl leading-relaxed'>
            Pelvic Vein Congestion Syndrome can cause chronic pelvic discomfort and may often be misdiagnosed.
          </p>
        </div>

        {/* Symptoms Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {symptoms.map((symptom) => (
            <div
              key={symptom.id}
              className='bg-white rounded-xl border border-[#ff3576]/30 p-8 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
            >
              {/* Number Badge */}
              <div className='w-12 h-12 rounded-full bg-[#fff5f7] flex items-center justify-center text-[#ff3576] font-bold text-xl mb-6'>
                {symptom.id}
              </div>

              {/* Symptom Title */}
              <h3 className='text-[#2d2552] font-extrabold text-sm sm:text-base tracking-wider mb-4 h-12 flex items-center justify-center'>
                {symptom.title}
              </h3>

              {/* Symptom Description */}
              <p className='text-gray-500 text-sm leading-relaxed'>
                {symptom.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PVCAreYouExperiencing;
