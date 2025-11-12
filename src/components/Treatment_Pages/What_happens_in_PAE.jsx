import React from 'react';

const checklist = [
  'Detailed explanation of the procedure',
  'Animation of how embolization works',
  'Hear from our medical experts',
];

// Helpers for video embedding (YouTube, Shorts, YouTube no-cookie, Vimeo, MP4)
const getEmbedUrl = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    // If the URL is already an embed link (supports youtube-nocookie and youtube domains), use as-is
    if (u.pathname.includes('/embed/')) {
      return url;
    }
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtube-nocookie.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
      const parts = u.pathname.split('/').filter(Boolean);
      const shortsIndex = parts.indexOf('shorts');
      if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
        return `https://www.youtube.com/embed/${parts[shortsIndex + 1]}`;
      }
      return null;
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
};

const isMp4 = (url) => typeof url === 'string' && url.trim().toLowerCase().endsWith('.mp4');

const What_happens_in_PAE = ({ videoUrl }) => (
  <section className='bg-[#FAFAFC] w-full py-10 px-4 md:px-10 lg:px-20'>
    <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
      {/* Left Side */}
      <div>
        <h2 className='text-2xl md:text-3xl font-extrabold text-[#2D2357] mb-2'>
          What Happens in <span className='text-[#FF4376]'>PAE?</span>
        </h2>
        <p className='text-gray-500 text-base md:text-lg mb-6'>
          Watch this short video to understand exactly how the PAE procedure works and what to expect on the day of treatment.
        </p>
        <ul className='space-y-4'>
          {checklist.map((item, idx) => (
            <li key={idx} className='flex items-center gap-3'>
              <span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FF4376]'>
                <svg width='16' height='16' fill='none' viewBox='0 0 16 16'>
                  <path d='M4 8.5l2.5 2.5L12 6' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                </svg>
              </span>
              <span className='font-bold text-[#2D2357] text-base md:text-lg'>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Right Side - Video */}
      <div className='flex justify-center items-center'>
        {videoUrl ? (
          <div className='w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-md'>
            {getEmbedUrl(videoUrl) ? (
              <iframe
                src={getEmbedUrl(videoUrl)}
                title='PAE Video'
                className='w-full h-full'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              />
            ) : isMp4(videoUrl) ? (
              <video src={videoUrl} controls className='w-full h-full bg-black' />
            ) : (
              <div className='w-full h-full bg-gray-200 flex items-center justify-center text-[#2D2357] font-semibold'>
                Unsupported video URL
              </div>
            )}
          </div>
        ) : (
          <div className='w-full max-w-md h-48 md:h-56 bg-gray-300 rounded-lg' />
        )}
      </div>
    </div>
  </section>
);

export default What_happens_in_PAE;
