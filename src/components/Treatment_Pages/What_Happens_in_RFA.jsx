import React, { useState } from 'react';
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

// Extract YouTube ID (incl. Shorts and youtu.be) for thumbnail and click-to-load
const getYouTubeId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
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

const What_Happens_in_RFA = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ytId = getYouTubeId(videoUrl);
  const embedUrl = getEmbedUrl(videoUrl);
  const features = [
    'Detailed explanation of the procedure',
    'Animation of how Ablation works',
    'Hear from our medical experts',
  ];

  return (
    <section className="bg-gray-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
              What Happens in <span className="text-[#ff3576]">RFA ?</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Watch this short video to understand exactly how the radiofrequency ablation, procedure works and what to expect on the day of treatment.
            </p>
            <ul className="mt-6 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-[#ff3576] mr-3" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Video */}
          <div className="relative w-full">
            {videoUrl ? (
              <div className="w-full max-w-2xl relative rounded-2xl overflow-hidden shadow-md mx-auto z-10" style={{ paddingBottom: '56.25%', minHeight: '200px' }}>
                {isMp4(videoUrl) ? (
                  <video src={videoUrl} controls className="absolute inset-0 w-full h-full bg-black" />
                ) : (isPlaying && embedUrl) || (embedUrl && !ytId) ? (
                  <iframe
                    src={`${embedUrl}${isPlaying ? '&autoplay=1&playsinline=1' : ''}`}
                    title="RFA Video"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : ytId ? (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="group absolute inset-0 w-full h-full cursor-pointer"
                    style={{
                      backgroundImage: `url(https://i.ytimg.com/vi/${ytId}/hqdefault.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    aria-label="Play video"
                  >
                    <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ff3576] text-white shadow-lg group-hover:scale-105 transition-transform">▶</span>
                  </button>
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center text-[#2d2552] font-semibold">Video unavailable</div>
                )}
              </div>
            ) : (
              <div className="relative aspect-video bg-gray-200 rounded-lg" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default What_Happens_in_RFA;