import React from 'react';

const othersFeatures = [
  { title: 'Advertising-Driven', description: 'Platforms that prioritize sponsored listings over patient needs, creating confusion about the best options.' },
  { title: 'Long Delays', description: 'Weeks of waiting for appointments, followed by more waiting for treatment plans and procedures.' },
  { title: 'No Guidance', description: 'Patients left to navigate complex medical systems alone, with minimal support or explanation.' },
  { title: 'Hidden Costs', description: 'Unclear pricing structures leading to surprise bills and financial stress during recovery.' }
];

const medaggFeatures = [
  { title: 'Care Custodians', description: 'A dedicated care team focused solely on finding you the best treatment option based on medical needs, not advertising.' },
  { title: 'Rapid Response', description: 'Most patients connect with specialists within 48 hours, with treatment plans developed shortly after.' },
  { title: 'End-to-End Support', description: 'Our team guides you from initial questions through recovery, providing resources and answering concerns.' },
  { title: 'Complete Transparency', description: 'Upfront pricing, clear treatment explanations, and honest discussions about expected outcomes.' }
];

export default function What_We_Do_Differently() {
  return (
    <section className='w-full py-16 lg:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='text-center sm:text-left mb-12 lg:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D2552] mb-4'>
            What We <span className='text-[#ff3576]'>Do Differently</span>
          </h2>
          <p className='text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto sm:mx-0'>
            See how Medagg transforms the typical healthcare experience into something truly patient-centered.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Left Column - Others */}
          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <div className='flex items-center gap-3 mb-8'>
              <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
                <svg className='w-5 h-5 text-gray-500' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.8l6 5.4V18h-2v-6H8v6H6v-6.8l6-5.4z'/>
                </svg>
              </div>
              <h3 className='text-2xl font-bold text-gray-700'>Others</h3>
            </div>
            
            <div className='space-y-6'>
              {othersFeatures.map((feature, idx) => (
                <div key={idx} className='flex items-start gap-4'>
                  <div className='w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1 flex-shrink-0'>
                    <svg className='w-4 h-4 text-red-500' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-1'>{feature.title}</h4>
                    <p className='text-gray-600 text-sm leading-relaxed'>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Medagg */}
          <div className='bg-white rounded-2xl p-8 shadow-lg border-2 border-[#ff3576]'>
            <div className='flex items-center gap-3 mb-8'>
              <div className='w-8 h-8 rounded-full bg-[#ff3576] flex items-center justify-center'>
                <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
              </div>
              <h3 className='text-2xl font-bold text-[#ff3576]'>Medagg</h3>
            </div>
            
            <div className='space-y-6'>
              {medaggFeatures.map((feature, idx) => (
                <div key={idx} className='flex items-start gap-4'>
                  <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 flex-shrink-0'>
                    <svg className='w-4 h-4 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-1'>{feature.title}</h4>
                    <p className='text-gray-600 text-sm leading-relaxed'>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
