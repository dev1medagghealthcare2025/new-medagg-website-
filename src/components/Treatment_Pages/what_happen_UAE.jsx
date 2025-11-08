import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const features = [
  'Detailed explanation of the procedure',
  'Animation of how Embolization works',
  'Hear from our medical experts'
];

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

const WhatHappenUAE = ({ videoUrl }) => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
              What Happens in
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#ff3576] mb-4">
              Uterine Artery Embolization
            </h3>
            <p className="text-gray-600 mb-6">
              Watch this short video to understand exactly how the Uterine
              artery embolization procedure works and what to expect on the
              day of treatment.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-[#ff3576] mr-3 flex-shrink-0" />
                  <span className="text-gray-800 font-semibold">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Video */}
          <div className="relative w-full">
            {videoUrl ? (
              <div className="w-full max-w-2xl relative rounded-2xl overflow-hidden shadow-md mx-auto" style={{ paddingBottom: '56.25%' }}>
                {isMp4(videoUrl) ? (
                  <video src={videoUrl} controls className="absolute inset-0 w-full h-full bg-black" />
                ) : getEmbedUrl(videoUrl) ? (
                  <iframe
                    src={getEmbedUrl(videoUrl)}
                    title="UAE Video"
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
              <div className="relative flex justify-center items-center bg-gray-200 rounded-lg h-64 md:h-80" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatHappenUAE;
