import React from 'react';

const journeySteps = [
  { title: 'Care Custodian', color: 'dark' },
  { title: 'Assessment', color: 'pink' },
  { title: 'Hospital Options', color: 'dark' },
  { title: 'Book Appointment', color: 'pink' },
  { title: 'Insurance', color: 'dark' },
  { title: 'Care Companion', color: 'pink' },
  { title: 'Post Procedure Care', color: 'dark' },
  { title: 'Success Treatment', color: 'pink' },
  { title: 'Happy Patient', color: 'dark' },
];

const PatientJourney = () => {
  return (
    <section className='w-full bg-white py-12 md:py-20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
        <h2 className='text-3xl md:text-4xl font-bold text-[#2d2346] text-left'>
          Patient <span className='text-[#ff3576]'>Journey</span>
        </h2>
        <p className='text-gray-600 mt-4 text-left max-w-2xl'>
          Every patient's journey is unique — and so is our care. From the first consultation to recovery, we guide you with compassion, clarity, and expert support at every step.
        </p>

        {/* Desktop View - Image */}
        <div className='hidden lg:block mt-12'>
          <img 
            src='/Paients_Jurney_new.png' 
            alt='Patient Journey Flowchart' 
            className='w-full h-auto'
          />
        </div>

        {/* Mobile View - Vertical Timeline */}
        <div className='lg:hidden w-full mt-12'>
          <div className='relative pl-8'>
            {/* Vertical Line */}
            <div className='absolute left-6 top-0 h-full w-0.5 bg-gray-200'></div>

            <div className='space-y-8'>
              {journeySteps.map((step, index) => (
                <div key={index} className='relative flex items-center'>
                  {/* Dot and Number */}
                  <div className='absolute -left-6 z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-full'>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.color === 'dark' ? 'bg-[#2d2346]' : 'bg-[#ff3576]'}`}>
                      <span className='text-white font-bold'>{index + 1}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className='ml-10 w-full'>
                    <div className={`p-4 rounded-lg shadow-md font-semibold text-left ${step.color === 'dark' ? 'bg-[#2d2346] text-white' : 'bg-[#ff3576] text-white'}`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientJourney;
