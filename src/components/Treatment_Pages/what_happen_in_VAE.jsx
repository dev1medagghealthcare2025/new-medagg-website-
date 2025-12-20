import React from 'react';
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

// Aspect ratio class for container
const getAspectClass = (url, orientation) => (isPortrait(url, orientation) ? 'aspect-[9/16]' : 'aspect-video');

// Wrapper width: reduce portrait width so it doesn't look oversized
const getWrapperWidthClass = (url, orientation) => {
  return isPortrait(url, orientation)
    ? 'max-w-[220px] md:max-w-[260px] lg:max-w-[300px]'
    : 'max-w-2xl';
};

const WhatHappensInVAE = ({ videoUrl, orientation }) => {
  const features = [
    'Detailed explanation of the procedure',
    'Animation of how Excision works',
    'Hear from our medical experts',
  ];

  return (
    <div className='bg-white py-12 sm:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='text-center lg:text-left'>
            <h2 className='text-3xl font-bold text-[#2d2552] sm:text-4xl'>
              What Happens in <br />
              <span className='text-[#ff3576]'>Vacuum-Assisted Excision</span>
            </h2>
            <p className='mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0'>
              Watch this short video to understand exactly how the Vacuum-Assisted Excision procedure works and what to expect on the day of treatment.
            </p>
            <ul className='mt-8 space-y-4 inline-block text-left'>
              {features.map((feature, index) => (
                <li key={index} className='flex items-center'>
                  <CheckCircle2 className='h-6 w-6 text-[#ff3576] mr-3 flex-shrink-0' />
                  <span className='text-gray-800 font-medium'>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className='relative w-full mt-8 lg:mt-0'>
            {videoUrl ? (
              <div
                className={`w-full ${getWrapperWidthClass(videoUrl, orientation)} ${getEmbedUrl(videoUrl) ? getAspectClass(videoUrl, orientation) : ''} relative rounded-2xl overflow-hidden shadow-md mx-auto`}
                style={getEmbedUrl(videoUrl) ? { aspectRatio: isPortrait(videoUrl, orientation) ? '9 / 16' : '16 / 9' } : undefined}
              >
                {isMp4(videoUrl) ? (
                  <video src={videoUrl} controls className='absolute inset-0 w-full h-auto bg-black' />
                ) : getEmbedUrl(videoUrl) ? (
                  <iframe
                    src={getEmbedUrl(videoUrl)}
                    title='VAE Video'
                    className='absolute inset-0 w-full h-full'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='strict-origin-when-cross-origin'
                  />
                ) : (
                  <div className='absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center text-[#2d2552] font-semibold'>Unsupported video URL</div>
                )}
              </div>
            ) : (
              <div className='relative flex items-center justify-center bg-gray-200 rounded-lg h-64 sm:h-80 lg:h-96' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatHappensInVAE;
