import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

// Helpers for video embedding (YouTube, Shorts, Vimeo, MP4)
const getEmbedUrl = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtube-nocookie.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube-nocookie.com/embed/${v}`;
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

// Aspect class for container when using Tailwind aspect utilities
const getAspectClass = (url, orientation) => (isPortrait(url, orientation) ? 'aspect-[9/16]' : 'aspect-video');

// Wrapper width: reduce portrait width so it doesn't look oversized
const getWrapperWidthClass = (url, orientation) => {
  return isPortrait(url, orientation)
    ? 'max-w-[220px] md:max-w-[260px] lg:max-w-[300px]'
    : 'max-w-2xl';
};

const WhatHappensInVaricoceleEmbolization = ({ videoUrl, orientation }) => {
  const features = [
    'Detailed explanation of the procedure',
    'Animation of how embolization works',
    'Hear from our medical experts',
  ];

  const reelLinks = [
    'https://www.instagram.com/reel/DO0zKuoiCH5/?igsh=djNqdWU1MTlsODZw',
    'https://www.instagram.com/reel/DCwUVqJzQyf/?igsh=MWhxbWt4bzVnNWl3OQ==',
    'https://www.instagram.com/reel/C7s6j3yN6AV/?igsh=MTRnMzhiOTJzZDB1eQ==',
    'https://www.instagram.com/reel/C96b9qFNrr1/?igsh=MW1iMGVkcTFvY2xmYQ==',
  ];

  const reelCarouselRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const carousel = reelCarouselRef.current;
    if (!carousel) return;

    let animationId;
    const scrollSpeed = 1;

    function autoScroll() {
      if (!paused && carousel) {
        carousel.scrollLeft += scrollSpeed;
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
          carousel.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    }

    animationId = requestAnimationFrame(autoScroll);
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [paused]);

  return (
    <>
      <section className='bg-gray-50 py-16 sm:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            {/* Left Column: Text Content */}
            <div>
              <h2 className='text-3xl sm:text-4xl font-bold text-[#2d2552]'>
                What Happens in <br />
                <span className='text-[#ff3576]'>Varicocele Embolization?</span>
              </h2>
              <p className='mt-4 text-gray-600'>
                Watch this short video to understand exactly how the Varicocele Embolization procedure works and what to expect on the day of treatment.
              </p>
              <ul className='mt-6 space-y-4'>
                {features.map((feature, index) => (
                  <li key={index} className='flex items-center'>
                    <div className='bg-[#ff3576] rounded-full h-6 w-6 flex-shrink-0 flex items-center justify-center mr-3'>
                      <Check className='h-4 w-4 text-white' />
                    </div>
                    <span className='text-gray-800'>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Video */}
            <div className='w-full'>
              {videoUrl ? (
                <div
                  className={`w-full ${getWrapperWidthClass(videoUrl, orientation)} ${getEmbedUrl(videoUrl) ? getAspectClass(videoUrl, orientation) : ''} rounded-2xl overflow-hidden shadow-md mx-auto`}
                  style={getEmbedUrl(videoUrl) ? { aspectRatio: isPortrait(videoUrl, orientation) ? '9 / 16' : '16 / 9' } : undefined}
                >
                  {getEmbedUrl(videoUrl) ? (
                    <iframe
                      src={getEmbedUrl(videoUrl)}
                      title='Varicocele Video'
                      className='w-full h-full'
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
                <div className='w-full h-80 bg-gray-200 rounded-2xl' />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Reels Carousel Section */}
      <div className='bg-white py-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h3 className='text-2xl font-bold text-[#2d2552] mb-6'>Watch Related Instagram Reels</h3>
          <div className='relative'>
            <button
              type='button'
              onClick={() => setPaused((prev) => !prev)}
              className='absolute z-10 right-3 top-3 bg-white/90 border border-gray-300 rounded-full shadow px-3 py-1 flex items-center gap-1 text-sm font-semibold text-[#2d2552] hover:bg-white focus:outline-none'
              style={{ transition: 'background 0.2s' }}
              aria-label={paused ? 'Play carousel' : 'Pause carousel'}
            >
              {paused ? (
                <svg width='18' height='18' viewBox='0 0 18 18' fill='none'><path d='M5 3v12M13 3v12' stroke='#2d2552' strokeWidth='2' strokeLinecap='round'/></svg>
              ) : (
                <svg width='18' height='18' viewBox='0 0 18 18' fill='none'><path d='M6 4l8 5-8 5V4z' fill='#2d2552'/></svg>
              )}
              {paused ? 'Play' : 'Pause'}
            </button>

            <div
              className='flex gap-6 overflow-x-auto scrollbar-hide pb-4'
              ref={reelCarouselRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onClick={(e) => {
                if (e.target === reelCarouselRef.current) setPaused(false);
              }}
            >
              {reelLinks.map((url, idx) => (
                <div
                  key={idx}
                  className='bg-white rounded-xl shadow-lg border border-gray-200 flex-shrink-0 w-[320px] h-[440px] flex items-center justify-center'
                  onClick={(e) => {
                    e.stopPropagation();
                    setPaused(true);
                  }}
                >
                  <iframe
                    src={`https://www.instagram.com/reel/${url.split('/reel/')[1]?.split('/')[0]}/embed/`}
                    className='w-full h-full rounded-xl bg-black'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    loading='lazy'
                    title={`Instagram Reel ${idx + 1}`}
                    frameBorder='0'
                    style={{ border: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatHappensInVaricoceleEmbolization;
