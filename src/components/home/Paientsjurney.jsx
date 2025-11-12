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

        {/* Mobile View - Image */}
        <div className='lg:hidden w-full mt-12 flex justify-center'>
          <img 
            src='/mobile_paients-removebg.png' 
            alt='Patient Journey Flowchart for Mobile' 
            className='w-full max-w-md h-auto'
          />
        </div>
      </div>
    </section>
  );
};

export default PatientJourney;
