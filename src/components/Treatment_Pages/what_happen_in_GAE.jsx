import React from 'react';

const checklist = [
  'Detailed explanation of the procedure',
  'Animation of how embolization works',
  'Hear from our medical experts',
];

// Helpers to detect and normalize video URLs
const getEmbedUrl = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    // YouTube (standard, nocookie, and shorts)
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtube-nocookie.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube-nocookie.com/embed/${v}`;
      // Handle YouTube Shorts: /shorts/<id>
      const parts = u.pathname.split('/').filter(Boolean);
      const shortsIndex = parts.indexOf('shorts');
      if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
        return `https://www.youtube-nocookie.com/embed/${parts[shortsIndex + 1]}`;
      }
      return null;
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace('/', '');
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    // Vimeo
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

// Detect portrait-oriented videos like YouTube Shorts
const isPortraitVideo = (url) => {
  if (!url) return false;
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.includes('shorts')) return true; // Shorts are usually 9:16
    const o = u.searchParams.get('orientation');
    if (o && o.toLowerCase() === 'portrait') return true;
  } catch {
    // ignore
  }
  return false;
};

// Allow explicit override via prop
const isPortrait = (url, orientation) => {
  if (orientation && orientation.toLowerCase() === 'portrait') return true;
  if (orientation && orientation.toLowerCase() === 'landscape') return false;
  return isPortraitVideo(url);
};

// Aspect ratio class for Tailwind
const getAspectClass = (url, orientation) => (isPortrait(url, orientation) ? 'aspect-[9/16]' : 'aspect-video');

// For GAE: avoid cropping by not over-scaling portrait iframes; let the player letterbox as needed
const getIframeClass = (url, orientation) => {
  return 'w-full h-full';
};

// Narrower widths for portrait so it doesn't look oversized
const getWrapperWidthClass = (url, orientation) => {
  return isPortrait(url, orientation)
    ? 'max-w-[220px] md:max-w-[260px] lg:max-w-[300px]'
    : 'max-w-2xl';
};

const What_happen_in_GAE = ({ videoUrl, orientation }) => (
  <section className='bg-[#FAFAFC] w-full py-12 sm:py-16 lg:py-20'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
        {/* Left Side */}
        <div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2552] mb-4'>
            What Happens in <span className='text-[#ff3576]'>GAE?</span>
          </h2>
          <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
            Watch this short video to understand exactly how the GAE procedure works and what to expect on the day of treatment.
          </p>
          <ul className='space-y-4'>
            {checklist.map((item, idx) => (
              <li key={idx} className='flex items-center gap-4'>
                <span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ff3576] flex-shrink-0'>
                  <svg width='14' height='14' fill='none' viewBox='0 0 16 16'>
                    <path
                      d='M4 8.5l2.5 2.5L12 6'
                      stroke='#fff'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
                <span className='font-semibold text-[#2d2552] text-lg'>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Video */}
        <div className='flex justify-center items-center'>
          {videoUrl ? (
            <div
              className={`w-full ${getWrapperWidthClass(videoUrl, orientation)} ${getEmbedUrl(videoUrl) ? getAspectClass(videoUrl, orientation) : ''} rounded-2xl overflow-hidden shadow-lg`}
              style={getEmbedUrl(videoUrl) ? { aspectRatio: isPortrait(videoUrl, orientation) ? '9 / 16' : '16 / 9' } : undefined}
            >
              {getEmbedUrl(videoUrl) ? (
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title='GAE Video'
                  className={getIframeClass(videoUrl, orientation)}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='strict-origin-when-cross-origin'
                />
              ) : isMp4(videoUrl) ? (
                <video src={videoUrl} controls className='w-full h-auto bg-black' />
              ) : (
                <div className='w-full h-full bg-gray-200 flex items-center justify-center text-[#2d2552] font-semibold'>
                  Unsupported video URL
                </div>
              )}
            </div>
          ) : (
            <div className='w-full max-w-lg h-64 lg:h-80 bg-gray-300 rounded-2xl flex items-center justify-center relative shadow-lg'>
              <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <span className='inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#ff3576]'>
                  <svg width='32' height='32' fill='none' viewBox='0 0 32 32' className='ml-1'>
                    <polygon points='12,8 24,16 12,24' fill='#fff' />
                  </svg>
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default What_happen_in_GAE;

