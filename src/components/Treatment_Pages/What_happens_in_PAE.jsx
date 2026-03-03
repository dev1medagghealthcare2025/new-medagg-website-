import React, { useRef, useEffect, useState } from 'react';

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
    const orientation = u.searchParams.get('orientation');
    if (orientation && orientation.toLowerCase() === 'portrait') return true;
  } catch {
    // ignore
  }
  return false;
};

// Helper to decide portrait based on URL or explicit override prop
const isPortrait = (url, orientation) => {
  if (orientation && orientation.toLowerCase() === 'portrait') return true;
  if (orientation && orientation.toLowerCase() === 'landscape') return false;
  return isPortraitVideo(url);
};

// Choose aspect ratio class for iframe embeds
const getAspectClass = (url, orientation) => (isPortrait(url, orientation) ? 'aspect-[9/16]' : 'aspect-video');

// Avoid cropping by not over-scaling portrait iframes; let the player letterbox as needed
const getIframeClass = (url, orientation) => {
  return 'w-full h-full';
};

// Decide a narrower max width for portrait videos so they don't appear too large
const getWrapperWidthClass = (url, orientation) => {
  return isPortrait(url, orientation)
    ? 'max-w-[220px] md:max-w-[260px] lg:max-w-[300px]' // smallest portrait widths
    : 'max-w-2xl'; // ~672px for landscape
};

const What_happens_in_PAE = ({ videoUrl, orientation }) => {
  // --- Instagram Reel Carousel Auto-scroll Logic ---
  const reelLinks = [
    "https://www.instagram.com/reel/DPq5G4Kkw1z/?igsh=MWUyZXFheGcxbHF5dg==",
    "https://www.instagram.com/reel/DKFMSAcTpB5/?igsh=cDdoeTB4eXdwZm0y",
    "https://www.instagram.com/reel/DGsyHqlzWjj/?igsh=bXFjdW9mY3Yyc2dq",
    "https://www.instagram.com/reel/C8OQO7wvNYX/?igsh=dDM2OXd4eXl3bng=",
    "https://www.instagram.com/reel/C231eFSrDMj/?igsh=MWd0cWVucTBxNmM2NQ=="
  ];
  const reelCarouselRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const carousel = reelCarouselRef.current;
    if (!carousel) return;
    let animationId;
    const scrollSpeed = 1; // px per frame
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
  // --- End Carousel Logic ---

  return (
    <>
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
              <div
                className={`w-full ${getWrapperWidthClass(videoUrl, orientation)} ${getEmbedUrl(videoUrl) ? getAspectClass(videoUrl, orientation) : ''} rounded-xl overflow-hidden shadow-md`}
                style={getEmbedUrl(videoUrl) ? { aspectRatio: isPortrait(videoUrl, orientation) ? '9 / 16' : '16 / 9' } : undefined}
              >
                {getEmbedUrl(videoUrl) ? (
                  <iframe
                    src={getEmbedUrl(videoUrl)}
                    title='PAE Video'
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
      {/* Instagram Reels Carousel Section */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-[#2d2552] mb-6">Watch Related Instagram Reels</h3>
          <div className="relative">
            {/* Play/Pause Button Overlay */}
            <button
              type="button"
              onClick={() => setPaused((prev) => !prev)}
              className="absolute z-10 right-3 top-3 bg-white/90 border border-gray-300 rounded-full shadow px-3 py-1 flex items-center gap-1 text-sm font-semibold text-[#2d2552] hover:bg-white focus:outline-none"
              style={{transition: 'background 0.2s'}}
              aria-label={paused ? "Play carousel" : "Pause carousel"}
            >
              {paused ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 3v12M13 3v12" stroke="#2d2552" strokeWidth="2" strokeLinecap="round"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 4l8 5-8 5V4z" fill="#2d2552"/></svg>
              )}
              {paused ? "Play" : "Pause"}
            </button>
            <div
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
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
                  className="bg-white rounded-xl shadow-lg border border-gray-200 flex-shrink-0 w-[320px] h-[440px] flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPaused(true);
                  }}
                >
                  <iframe
                    src={"https://www.instagram.com/reel/" + (url.split("/reel/")[1] && url.split("/reel/")[1].split("/")[0]) + "/embed/"}
                    className="w-full h-full rounded-xl bg-black"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    loading="lazy"
                    title={`Instagram Reel ${idx+1}`}
                    frameBorder="0"
                    style={{ border: 0 }}
                    tabIndex={0}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
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

export default What_happens_in_PAE;
