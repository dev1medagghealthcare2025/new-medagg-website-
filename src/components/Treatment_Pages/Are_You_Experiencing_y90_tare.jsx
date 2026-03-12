
import React from 'react';

const AreYouExperiencingY90Tare = () => {
  const symptoms = [
    {
      number: 1,
      title: 'Persistent abdominal discomfort',
      description: 'Pain or discomfort in the upper abdomen that does not improve over time.',
    },
    {
      number: 2,
      title: 'Unexplained weight loss',
      description: 'Sudden or gradual weight loss without changes in diet or physical activity.',
    },
    {
      number: 3,
      title: 'Fatigue and weakness',
      description: 'Feeling unusually tired or lacking energy even with adequate rest.',
    },
    {
      number: 4,
      title: 'Abnormal liver scan findings',
      description: 'Liver lesions or abnormalities detected during ultrasound, CT scan, or MRI performed for other reasons.',
    },
  ];

  return (
    <section className='bg-white py-12 sm:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-left max-w-3xl'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-[#2d2552]'>
            Are You Experiencing
            <br />
            <span className='text-[#ff3576]'>These Symptoms?</span>
          </h2>
          <p className='mt-4 text-sm sm:text-base text-gray-600'>
            For many people, liver tumors may develop silently and symptoms may appear only as the disease progresses.
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {symptoms.map((item) => (
            <div
              key={item.number}
              className='relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden'
            >
              <div className='absolute left-0 top-0 bottom-0 w-[4px] bg-[#ff3576]' />

              <div className='p-6'>
                <div className='inline-flex items-center justify-center w-7 h-7 rounded-md bg-pink-100 text-[#ff3576] text-xs font-bold mb-4'>
                  {item.number}
                </div>
                <h3 className='text-sm sm:text-base font-bold text-[#2d2552]'>
                  {item.title}
                </h3>
                <p className='mt-3 text-sm text-gray-600 leading-relaxed'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreYouExperiencingY90Tare;
