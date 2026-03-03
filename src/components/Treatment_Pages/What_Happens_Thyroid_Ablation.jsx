import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

// Helpers for video embedding (YouTube, Shorts, Vimeo, MP4)
const getEmbedUrl = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtube-nocookie.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube-nocookie.com/embed/${v}?modestbranding=1&rel=0`;
      const parts = u.pathname.split('/').filter(Boolean);
      const shortsIndex = parts.indexOf('shorts');
      if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
        return `https://www.youtube-nocookie.com/embed/${parts[shortsIndex + 1]}?modestbranding=1&rel=0`;
      }
      return null;
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace('/', '');
      return id ? `https://www.youtube-nocookie.com/embed/${id}?modestbranding=1&rel=0` : null;
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

// Extract YouTube video ID for thumbnail/click-to-load
const getYouTubeId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtube-nocookie.com')) {
      const v = u.searchParams.get('v');
      if (v) return v;
      const parts = u.pathname.split('/').filter(Boolean);
      const shortsIndex = parts.indexOf('shorts');
      if (shortsIndex !== -1 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];
      return null;
    }
    if (u.hostname === 'youtu.be') {
      return u.pathname.replace('/', '');
    }
  } catch {}
  return null;
};

// Detect portrait-oriented videos like YouTube Shorts
const isPortraitVideo = (url) => {
  if (!url) return false;
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.includes('shorts')) return true; // Shorts are typically 9:16
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

// Wrapper width control for portrait so it doesn't look oversized
const getWrapperWidthClass = (url, orientation) => {
  return isPortrait(url, orientation)
    ? 'max-w-[220px] md:max-w-[260px] lg:max-w-[300px]'
    : 'max-w-2xl';
};

const WhatHappensThyroidAblation = ({ videoUrl, orientation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ytId = getYouTubeId(videoUrl);
  const embedUrl = getEmbedUrl(videoUrl);
  return (
    <>
      <section className='w-full bg-[#FAFAFC] py-12 md:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Text Content */}
            <div className='text-left'>
              <h2 className='text-3xl md:text-4xl font-bold text-[#2d2552]'>
                What Happens in <span className='text-[#ff3576]'>Thyroid Ablation?</span>
              </h2>
              <p className='mt-4 text-base md:text-lg text-gray-600'>
                Watch this short video to understand exactly how the thyroid ablation procedure works and what to expect on the day of treatment.
              </p>
              <ul className='mt-6 space-y-3'>
                <li className='flex items-center text-base md:text-lg text-[#2d2552]'>
                  <CheckCircle2 className='w-6 h-6 text-[#ff3576] mr-3 flex-shrink-0' />
                  Detailed explanation of the procedure
                </li>
                <li className='flex items-center text-base md:text-lg text-[#2d2552]'>
                  <CheckCircle2 className='w-6 h-6 text-[#ff3576] mr-3 flex-shrink-0' />
                  Animation of how ablation works
                </li>
                <li className='flex items-center text-base md:text-lg text-[#2d2552]'>
                  <CheckCircle2 className='w-6 h-6 text-[#ff3576] mr-3 flex-shrink-0' />
                  Hear from our medical experts
                </li>
              </ul>
            </div>
            {/* Video */}
            <div className='relative w-full'>
              {videoUrl ? (
                <div
                  className={`w-full ${getWrapperWidthClass(videoUrl, orientation)} relative rounded-2xl overflow-hidden shadow-md mx-auto z-10`}
                  style={{ aspectRatio: isPortrait(videoUrl, orientation) ? '9 / 16' : '16 / 9', minHeight: '200px' }}
                >
                  {isMp4(videoUrl) ? (
                    <video src={videoUrl} controls className='absolute inset-0 w-full h-auto bg-black' />
                  ) : embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title='Thyroid Ablation Video'
                      className='absolute inset-0 w-full h-full'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      allowFullScreen
                      loading='lazy'
                      referrerPolicy='strict-origin-when-cross-origin'
                    />
                  ) : ytId ? (
                    <button
                      type='button'
                      onClick={() => setIsPlaying(true)}
                      className='group absolute inset-0 w-full h-full cursor-pointer'
                      style={{
                        backgroundImage: `url(https://i.ytimg.com/vi/${ytId}/hqdefault.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      aria-label='Play video'
                    >
                      <span className='absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors' />
                      <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ff3576] text-white shadow-lg group-hover:scale-105 transition-transform'>
                        ▶
                      </span>
                    </button>
                  ) : embedUrl ? (
                    <button
                      type='button'
                      onClick={() => setIsPlaying(true)}
                      className='group absolute inset-0 w-full h-full bg-gray-200 cursor-pointer'
                      aria-label='Play video'
                    >
                      <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ff3576] text-white shadow-lg group-hover:scale-105 transition-transform'>
                        ▶
                      </span>
                    </button>
                  ) : (
                    <div className='absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center text-[#2d2552] font-semibold'>Video unavailable</div>
                  )}
                </div>
              ) : (
                <div className='absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center text-[#2d2552] font-semibold'>Video unavailable</div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Instagram Reels Carousel Section */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-[#2d2552] mb-6">Watch Related Instagram Reels</h3>
          <ReelsCarousel />
        </div>
      </div>
    </>
  );
};

function ReelsCarousel() {
  // --- Enhanced: Pause carousel when any reel is played, resume on pause/end ---
  // Note: Instagram iframes are cross-origin, so we cannot directly listen for play/pause events.
  // We use a best-effort workaround: pause on click inside card (user tries to play),
  // and resume on click outside carousel. This is consistent UX for mobile/desktop.

  const reelLinks = [
    "https://www.instagram.com/reel/DSyzb4dCEEb/?igsh=YjAzMnFhZmoxczBr",
    "https://www.instagram.com/reel/DPYyvJ2jntK/?igsh=emY3ZWxtanBqajBm",
    "https://www.instagram.com/reel/DLxCO4Az6Vv/?igsh=MTJiM2FvNzN5NXhhZQ==",
    "https://www.instagram.com/reel/DJt6uCtT_Rp/?igsh=OGhxNGplMWhoMGx2",
    "https://www.instagram.com/reel/DJTavI3TLQs/?igsh=ZmIzcGFsazN1dGE2"
  ];
  const [paused, setPaused] = React.useState(false);
  const reelCarouselRef = React.useRef(null);

  React.useEffect(() => {
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
    <div className="relative">
      <button
        type="button"
        onClick={() => setPaused((prev) => !prev)}
        className="absolute z-10 right-3 top-3 bg-white/90 border border-gray-300 rounded-full shadow px-3 py-1 flex items-center gap-1 text-sm font-semibold text-[#2d2552] hover:bg-white focus:outline-none"
        style={{ transition: 'background 0.2s' }}
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
              title={`Instagram Reel ${idx + 1}`}
              frameBorder="0"
              style={{ border: 0 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatHappensThyroidAblation;
