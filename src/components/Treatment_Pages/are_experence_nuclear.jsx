import React from 'react';

const symptoms = [
  {
    id: 1,
    title: 'PERSISTENT JOINT INFLAMMATION',
    description: "Chronic Swelling And Pain That Doesn't Improve With Routine Treatments",
  },
  {
    id: 2,
    title: 'RECURRENT JOINT SWELLING OR EFFUSIONS',
    description: 'Repeated Episodes Of Joint Swelling Due To Fluid Buildup In The Joint',
  },
  {
    id: 3,
    title: 'CHRONIC JOINT PAIN',
    description: 'Ongoing Joint Discomfort That Persists Over Time And Affects Daily Activities',
  },
  {
    id: 4,
    title: 'REDUCED JOINT MOBILITY',
    description: 'Limited Range Of Motion That Makes Movement Stiff And Difficult',
  },
];

const AreExperienceNuclear = () => (
  <section className='bg-white py-12 md:py-20'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='mb-12'>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-[#2d2552] leading-tight mb-4'>
          Are You Experiencing
          <br />
          <span className='text-[#ff3576]'>These Symptoms?</span>
        </h2>
        <p className='text-gray-500 text-lg max-w-3xl leading-relaxed'>
          Radiosynovectomy may be considered for patients experiencing:
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {symptoms.map((symptom) => (
          <div
            key={symptom.id}
            className='group bg-white rounded-xl border border-[#ff3576]/30 p-8 flex flex-col items-center text-center transition-all duration-300 ease-out hover:bg-[#ff3576] hover:shadow-xl hover:border-[#ff3576] hover:-translate-y-1'
          >
            <div className='w-12 h-12 rounded-full bg-[#fff5f7] group-hover:bg-white flex items-center justify-center text-[#ff3576] group-hover:text-[#ff3576] font-bold text-xl mb-6 transition-colors duration-300'>
              {symptom.id}
            </div>
            <h3 className='text-[#2d2552] group-hover:text-white font-extrabold text-sm sm:text-base tracking-wider mb-4 min-h-[3rem] flex items-center justify-center transition-colors duration-300'>
              {symptom.title}
            </h3>
            <p className='text-gray-500 group-hover:text-white text-sm leading-relaxed transition-colors duration-300'>
              {symptom.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AreExperienceNuclear;
