import React, { useMemo, useState } from 'react';

// const TABS = ['All', 'Celebrations', 'Awards', 'Reviews', 'Our Camps', 'Media', 'Conference', 'Videos'];
const TABS = ['Conference', 'Videos'];

// Sample items. Replace the src paths with your real images if needed.
// These 3 images exist in your public/ folder already.
const ALL_ITEMS = [
  /*
  // Newly added Team Celebration images
  {
    id: 9,
    src: '/pic1.jpeg',
    categories: ['Celebrations'],
  },
  {
    id: 10,
    src: '/pic2.jpeg',
    categories: ['Celebrations'],
  },
  {
    id: 11,
    src: '/pic3.jpeg',
    categories: ['Celebrations'],
  },
  {
    id: 12,
    src: '/pic4.jpeg',
    categories: ['Celebrations'],
  },
  {
    id: 13,
    src: '/pic5.jpeg',
    categories: ['Celebrations'],
  },
  // Newly added Awards images
  {
    id: 14,
    src: '/pic6.jpeg',
    categories: ['Awards'],
  },
  {
    id: 15,
    src: '/Pic7.jpeg',
    categories: ['Awards'],
  },
  // Additional Awards images
  {
    id: 17,
    src: '/pic9.jpeg',
    categories: ['Awards'],
  },
  {
    id: 18,
    src: '/pic10.jpeg',
    categories: ['Awards'],
  },
 
  // Newly added Reviews images
  {
    id: 20,
    src: '/review_1.jpg',
    categories: ['Reviews'],
  },
  {
    id: 21,
    src: '/review_2.jpg',
    categories: ['Reviews'],
  },
  {
    id: 22,
    src: '/review_3.jpg',
    categories: ['Reviews'],
  },
  {
    id: 23,
    src: '/review_4.jpg',
    categories: ['Reviews'],
  },
  {
    id: 24,
    src: '/review_5.jpg',
    categories: ['Reviews'],
  },
  // Newly added Our Camps images
  {
    id: 25,
    src: '/camp1.jpeg',
    categories: ['Our Camps'],
  },
  {
    id: 26,
    src: '/camp2.jpeg',
    categories: ['Our Camps'],
  },
  {
    id: 27,
    src: '/camp3.jpeg',
    categories: ['Our Camps'],
  },
  {
    id: 28,
    src: '/camp4.jpeg',
    categories: ['Our Camps'],
  },
  {
    id: 29,
    src: '/camp5.jpeg',
    categories: ['Our Camps'],
  },
  {
    id: 30,
    src: '/camp6.jpeg',
    categories: ['Our Camps'],
  },
  */
  // Conference images
  {
    id: 31,
    src: '/DSC03316.JPG',
    categories: ['Conference'],
  },
  {
    id: 32,
    src: '/conf_1.JPG',
    categories: ['Conference'],
  },
  {
    id: 33,
    src: '/conf_2.JPG',
    categories: ['Conference'],
  },
  {
    id: 34,
    src: '/conf_3.JPG',
    categories: ['Conference'],
  },
  {
    id: 35,
    src: '/conf_4.JPG',
    categories: ['Conference'],
  },
  /*
  // Additional Celebrations images
  {
    id: 36,
    src: '/new_one.jpg',
    categories: ['Celebrations'],
  },
  */
];

export default function GalleryMain() {
  const [activeTab, setActiveTab] = useState('All');
  // Language sub-tabs for Videos section
  const VIDEO_LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu'];
  const [activeLanguage, setActiveLanguage] = useState('English');

  // YouTube videos grouped by language. Replace the placeholder IDs with your real video IDs or full URLs.
  // You can provide just the YouTube ID (e.g., "dQw4w9WgXcQ") or a full watch URL (e.g., "https://www.youtube.com/watch?v=dQw4w9WgXcQ").
  const VIDEOS = {
    English: [
      { id: 'en-1', url: 'https://www.youtube.com/shorts/js7-2vuNCo4' },
      { id: 'en-2', url: 'https://www.youtube.com/shorts/rW8x7E1WpUQ' },
      { id: 'en-3', url: 'https://www.youtube.com/shorts/gjZsulwKjfI' },
      { id: 'en-4', url: 'https://www.youtube.com/shorts/78JX1DasFl8' },
      { id: 'en-5', url: 'https://www.youtube.com/shorts/iw5G9U2LMNI' },
      { id: 'en-6', url: 'https://www.youtube.com/shorts/vM5o0rX3lag' },
      { id: 'en-7', url: 'https://www.youtube.com/shorts/kCxftL55ybQ' },
      { id: 'en-8', url: 'https://www.youtube.com/shorts/8nvynTXSMnQ' },
      { id: 'en-9', url: 'https://www.youtube.com/shorts/u5aYfE6qAfE' },
     
    ],
    Hindi: [
      // { id: 'hi-1', youtubeId: 'VIDEO_ID_3' },
    ],
    Tamil: [
      // { id: 'ta-1', youtubeId: 'VIDEO_ID_4' },
      { id: 'ta-1', url: 'https://www.youtube.com/shorts/8l2N3xQyctY' },
      { id: 'ta-2', url: 'https://www.youtube.com/shorts/eQ3xktfh-w4' },
    ],
    Telugu: [
      { id: 'te-1', url: 'https://www.youtube.com/shorts/HutOaDPp8hs', },
      { id: 'te-2', url: 'https://www.youtube.com/shorts/01XvC2yu__o', },
      { id: 'te-3', url: 'https://www.youtube.com/shorts/EMV7-v9kppc', },
      { id: 'te-4', url: 'https://www.youtube.com/shorts/GeTmEDwlIb8', },
      { id: 'te-5', url: 'https://www.youtube.com/shorts/ggMKxvfm3CE', },
      { id: 'te-6', url: 'https://www.youtube.com/shorts/pDq0iO5rzJY', },
    ],
  };

  // Robust parser for YouTube video IDs supporting multiple URL formats
  const getYouTubeVideoId = (input) => {
    if (!input) return '';
    // If input looks like a plain ID, return as-is
    if (!input.includes('http')) return input;
    try {
      const url = new URL(input);
      const host = url.hostname.replace(/^www\./, '');
      // youtu.be/<id>
      if (host === 'youtu.be') {
        return url.pathname.replace(/^\//, '');
      }
      // Standard watch URL ?v=<id>
      const vParam = url.searchParams.get('v');
      if (vParam) return vParam;
      // /shorts/<id> or /embed/<id>
      const parts = url.pathname.split('/').filter(Boolean);
      const shortsIdx = parts.indexOf('shorts');
      if (shortsIdx !== -1 && parts[shortsIdx + 1]) return parts[shortsIdx + 1];
      const embedIdx = parts.indexOf('embed');
      if (embedIdx !== -1 && parts[embedIdx + 1]) return parts[embedIdx + 1];
      return '';
    } catch (e) {
      return '';
    }
  };

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return ALL_ITEMS;
    return ALL_ITEMS.filter(item => item.categories?.includes(activeTab));
  }, [activeTab]);

  return (
    <section className='w-full bg-white'>
      {/* Tabs */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6'>
        <div className='flex flex-wrap gap-3'>
          {TABS.map(tab => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type='button'
                onClick={() => setActiveTab(tab)}
                className={[
                  'px-5 py-2 rounded-full text-sm font-semibold transition-colors border',
                  isActive
                    ? 'bg-[#392C5C] text-white border-[#392C5C]'
                    : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50',
                ].join(' ')}
                aria-pressed={isActive}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        {activeTab === 'Videos' ? (
          <div>
            {/* Language sub-tabs */}
            <div className='flex flex-wrap gap-3 mb-6'>
              {VIDEO_LANGUAGES.map(lang => {
                const isActiveLang = lang === activeLanguage;
                return (
                  <button
                    key={lang}
                    type='button'
                    onClick={() => setActiveLanguage(lang)}
                    className={[
                      'px-4 py-2 rounded-full text-sm font-semibold transition-colors border',
                      isActiveLang
                        ? 'bg-[#392C5C] text-white border-[#392C5C]'
                        : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50',
                    ].join(' ')}
                    aria-pressed={isActiveLang}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>

            {/* Videos grid */}
            {VIDEOS[activeLanguage] && VIDEOS[activeLanguage].length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {VIDEOS[activeLanguage].map(v => {
                  const id = v.youtubeId || v.url || '';
                  // Derive embed URL using robust parser that supports watch, shorts, youtu.be and embed URLs
                  const videoId = getYouTubeVideoId(id);
                  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';
                  return (
                    <div key={v.id} className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
                      <div className='relative w-full pb-[56.25%] bg-black'>
                        {embedUrl ? (
                          <iframe
                            className='absolute inset-0 w-full h-full'
                            src={`${embedUrl}?rel=0`}
                            title={v.title || 'YouTube video player'}
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            referrerPolicy='strict-origin-when-cross-origin'
                            allowFullScreen
                            loading='lazy'
                          />
                        ) : (
                          <div className='absolute inset-0 flex items-center justify-center text-sm text-gray-500 bg-gray-100'>
                            Invalid video URL/ID
                          </div>
                        )}
                      </div>
                      {v.title ? (
                        <div className='px-3 py-2 text-sm text-gray-700'>{v.title}</div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className='text-gray-600'>No videos added yet for {activeLanguage}. Share the YouTube links and I will plug them in.</div>
            )}
          </div>
        ) : (
          <div className='columns-1 sm:columns-2 lg:columns-4 [column-gap:1.25rem]'>
            {filteredItems.map(item => (
              <figure
                key={item.id}
                className='mb-5 break-inside-avoid bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'
                style={{ breakInside: 'avoid' }}
              >
                <div className='w-full bg-gray-100'>
                  <img
                    src={item.src}
                    alt={item.title || ''}
                    loading='lazy'
                    className='block w-full h-auto object-contain'
                  />
                </div>
                {item.title ? (
                  <figcaption className='px-3 py-2 text-sm text-gray-700 line-clamp-1'>
                    {item.title}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
