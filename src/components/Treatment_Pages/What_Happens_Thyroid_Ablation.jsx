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
            <div className='relative w-full bg-gray-200 rounded-2xl' style={{ aspectRatio: '16 / 9' }} />
          )}
        </div>
      </div>
    </div>
  </section>
  );
};

export default WhatHappensThyroidAblation;
