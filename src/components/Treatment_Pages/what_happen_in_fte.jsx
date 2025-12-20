import React from 'react';
import { CheckCircle2 } from 'lucide-react';

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

// Aspect class for container
const getAspectClass = (url, orientation) => (isPortrait(url, orientation) ? 'aspect-[9/16]' : 'aspect-video');

// Wrapper width: reduce portrait width so it doesn't look oversized
const getWrapperWidthClass = (url, orientation) => {
  return isPortrait(url, orientation)
    ? 'max-w-[220px] md:max-w-[260px] lg:max-w-[300px]'
    : 'max-w-2xl';
};

const WhatHappensInFTE = ({ videoUrl, orientation }) => {
  return (
        <section className='py-12 sm:py-16 lg:py-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left Side: Text Content */}
          <div className='text-left'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2552]'>
              What Happens in
              <br />
              <span className='text-[#ff3576]'>Fallopian Tube Recanalization</span>
            </h2>
            <p className='mt-4 text-base sm:text-lg text-gray-600'>
              Watch this short video to understand exactly how the Fallopian Tube Recanalization procedure works and what to expect on the day of treatment.
            </p>
            <ul className='mt-6 space-y-4'>
              <li className='flex items-center'>
                <CheckCircle2 className='h-6 w-6 text-[#ff3576] mr-3' />
                <span className='text-gray-700'>Detailed explanation of the procedure</span>
              </li>
              <li className='flex items-center'>
                <CheckCircle2 className='h-6 w-6 text-[#ff3576] mr-3' />
                <span className='text-gray-700'>Animation of how Recanalization works</span>
              </li>
              <li className='flex items-center'>
                <CheckCircle2 className='h-6 w-6 text-[#ff3576] mr-3' />
                <span className='text-gray-700'>Hear from our medical experts</span>
              </li>
            </ul>
          </div>

          {/* Right Side: Video */}
          <div className='w-full'>
            {videoUrl ? (
              <div
                className={`w-full ${getWrapperWidthClass(videoUrl, orientation)} ${getEmbedUrl(videoUrl) ? getAspectClass(videoUrl, orientation) : ''} rounded-xl overflow-hidden shadow-md mx-auto`}
                style={getEmbedUrl(videoUrl) ? { aspectRatio: isPortrait(videoUrl, orientation) ? '9 / 16' : '16 / 9' } : undefined}
              >
                {getEmbedUrl(videoUrl) ? (
                  <iframe
                    src={getEmbedUrl(videoUrl)}
                    title='FTE Video'
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
                  <div className='w-full h-full bg-gray-200 flex items-center justify-center text-[#2D2552] font-semibold'>Unsupported video URL</div>
                )}
              </div>
            ) : (
              <div className='relative bg-gray-200 rounded-xl h-64 sm:h-80 lg:h-96' />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatHappensInFTE;
