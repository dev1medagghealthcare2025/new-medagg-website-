import React from 'react';

const timelineData = [
  {
    year: '2018',
    title: 'Parent Vision Established',
    description: 'Founded by Ramesh Krishnan and Sumitha Karthik, Medagg Ventures LLP began with a bold mission — to reshape how healthcare in India is accessed, operated, and aggregated',
  },
  {
    year: '2021',
    title: 'Medagg Healthcare Launched',
    description: 'On 17 November 2021, Medagg Healthcare was incorporated in Chennai, introducing the Care Custodian model to support patients from inquiry to recovery while enabling transparent treatment comparisons and direct access to trusted hospitals through an ethical, guided experience.',
  },
  {
    year: '2023',
    title: 'Interventional Radiology Becomes Our Niche',
    description: 'Medagg established Interventional Radiology (IR) as its core niche, championing minimally invasive, non-surgical treatments to expand patient awareness, strengthen specialist partnerships, and position the organisation as a leader in modern, scar-free healthcare solutions.',
  },
  {
    year: '2024',
    title: 'From Tamil Nadu to the Wider South',
    description: 'After completing strong operations across Tamil Nadu, Medagg began expanding into major South Indian cities — including Kerala, Karnataka, Andhra Pradesh, and Telangana — laying the groundwork for seamless regional coverage and coordinated patient care.',
  },
  {
    year: '2025',
    title: 'Connecting India Through Care Pathways',
    description: 'In 2025, Medagg completed its presence across all key South Indian cities and expanded into East and West India, reaching 20+ cities with integrated digital systems and unified, patient-first treatment pathways.',
  },
  {
    //year: '2024 – 2025',
    title: 'The Future — Scaling Further',
    description: 'With a focus on national integration, digital precision, and end-to-end patient journeys, Medagg Healthcare is scaling to make quality, minimally invasive care accessible to every individual, everywhere.',
  },
];

export default function The_Story_of_Our_Transformation() {
  // Centralized YouTube video config
  const videoId = '0j7HJsPdSnw';
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  return (
    <section className='w-full py-16 lg:py-24 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
          {/* Left Column */}
          <div className='lg:sticky top-24'>
            <div className='text-center lg:text-left'>
              <h2 className='text-4xl lg:text-5xl font-extrabold text-[#2D2552] mb-4'>
                The Story of Our <br />
                <span className='text-pink-500'>Transformation</span>
              </h2>
              <p className='text-gray-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0'>
                Over the years, we&apos;ve evolved with purpose, turning challenges into milestones and vision into reality.
              </p>
            </div>
            {/* YouTube Video Thumbnail */}
            <div className='relative w-full max-w-md mx-auto lg:mx-0 rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
              <div className='relative'>
                <img
                  src={thumbnail}
                  alt='Medagg Healthcare Video'
                  className='w-full h-auto object-cover'
                />
                <div className='absolute inset-0 bg-black/20'></div>
                
                {/* Play Button */}
                <div 
                  className='absolute inset-0 flex items-center justify-center'
                >
                  <button
                    onClick={(e) => {
                      console.log('Video button clicked!');
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(videoUrl, '_blank');
                    }}
                    className='group cursor-pointer bg-transparent border-none p-0 outline-none focus:outline-none'
                    aria-label='Play video'
                  >
                    <div className='bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30'>
                      <div className='bg-pink-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg'>
                        <svg className='w-6 h-6 text-white ml-0.5' fill='currentColor' viewBox='0 0 20 20'>
                          <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z' clipRule='evenodd' />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div className='relative'>
            {/* Vertical Line */}
            <div className='absolute left-5 top-2 bottom-2 w-0.5 bg-pink-200'></div>

            {timelineData.map((item, index) => (
              <div key={index} className='relative pl-16 pb-12'>
                {/* Dot */}
                <div className='absolute left-5 top-2 -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full border-4 border-white shadow'></div>
                <p className='text-pink-500 font-bold text-md mb-1'>{item.year}</p>
                <h3 className='text-xl font-bold text-[#2D2552] mb-2'>{item.title}</h3>
                <p className='text-gray-600 text-base leading-relaxed'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
