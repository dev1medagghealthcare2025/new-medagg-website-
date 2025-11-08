import React from 'react';
import { CheckCircle2 } from 'lucide-react';

// Helpers for video embedding (YouTube, Shorts, Vimeo, MP4)
const getEmbedUrl = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}?modestbranding=1&rel=0`;
      const parts = u.pathname.split('/').filter(Boolean);
      const shortsIndex = parts.indexOf('shorts');
      if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
        return `https://www.youtube.com/embed/${parts[shortsIndex + 1]}?modestbranding=1&rel=0`;
      }
      return null;
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}?modestbranding=1&rel=0` : null;
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

const WhatHappensInEndovenousAblation = ({ videoUrl }) => {
  const features = [
    'Detailed explanation of the procedure',
    'Animation of how Ablation works',
    'Hear from our medical experts',
  ];

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
              What Happens in
              <span className="block text-[#ff3576]">Endovenous Ablation</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Watch this short video to understand exactly how the Endovenous ablation procedure works and what to expect on the day of treatment.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-[#ff3576] mr-3 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content (Video) */}
          <div className="relative w-full">
            {videoUrl ? (
              <div className="w-full max-w-2xl relative rounded-2xl overflow-hidden shadow-md mx-auto" style={{ paddingBottom: '56.25%' }}>
                {isMp4(videoUrl) ? (
                  <video src={videoUrl} controls className="absolute inset-0 w-full h-full bg-black" />
                ) : getEmbedUrl(videoUrl) ? (
                  <iframe
                    src={getEmbedUrl(videoUrl)}
                    title="Endovenous Ablation Video"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center text-[#2d2552] font-semibold">Unsupported video URL</div>
                )}
              </div>
            ) : (
              <div className="relative flex items-center justify-center bg-gray-200 rounded-2xl aspect-video" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatHappensInEndovenousAblation;
