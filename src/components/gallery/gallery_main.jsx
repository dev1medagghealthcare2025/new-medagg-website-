import React, { useEffect, useMemo, useState } from 'react';

// const TABS = ['All', 'Celebrations', 'Awards', 'Reviews', 'Our Camps', 'Media', 'Conference', 'Videos'];
const TABS = [
  { key: 'Videos', label: 'Videos' },
  { key: 'Conference', label: "IRPRENEUR '25" },
  { key: 'Founder Explains', label: 'Founder Explains' },
  { key: 'Podcast', label: 'Podcast' },
];

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
  // Instagram Reel for Conference
  {
    id: 36,
    instagramUrl: 'https://www.instagram.com/reel/DRg_01wDG26/?igsh=NDA3ODRtOGQybmxl',
    categories: ['Conference'],
  },
  {
    id: 37,
    instagramUrl: 'https://www.instagram.com/reel/DS4CCAHk3Tf/?igsh=MW96N2E0ZXQ3MHFuYQ==',
    categories: ['Conference'],
  },
  { id: 38, instagramUrl: 'https://www.instagram.com/reel/DS187OSk5vF/?igsh=MTBtN2NhMW43ZmN2dQ==', categories: ['Conference'] },
  { id: 39, instagramUrl: 'https://www.instagram.com/reel/DSwkXiVk9aX/?igsh=Ynp6aHB4azJyYmxo', categories: ['Conference'] },
  { id: 40, instagramUrl: 'https://www.instagram.com/reel/DStzZTjExNT/?igsh=MWR1OTN1dHZndDM2Yw==', categories: ['Conference'] },
  { id: 41, instagramUrl: 'https://www.instagram.com/reel/DSpJotCDZ3e/?igsh=OWpvYW02bGQzcm01', categories: ['Conference'] },
  { id: 42, instagramUrl: 'https://www.instagram.com/reel/DSm5WW5EznX/?igsh=MWNtcTU0NWZ4Y3pqYw==', categories: ['Conference'] },
  { id: 43, instagramUrl: 'https://www.instagram.com/reel/DSjkx9Kkwqw/?igsh=MTQyNnlseWN6ejkyeQ==', categories: ['Conference'] },
  { id: 44, instagramUrl: 'https://www.instagram.com/reel/DSew93gEyaU/?igsh=NDUxYnd4aXYzN3Vp', categories: ['Conference'] },
  { id: 45, instagramUrl: 'https://www.instagram.com/reel/DSb8YvTDe98/?igsh=dXpzbmthN3Vxc3Fl', categories: ['Conference'] },
  { id: 46, instagramUrl: 'https://www.instagram.com/reel/DRyq8bFk-U3/?igsh=bGtsandwdDF4a3dn', categories: ['Conference'] },
  { id: 47, instagramUrl: 'https://www.instagram.com/reel/DRoXm9HE7hR/?igsh=MWozczBlM2VpeGZ3YQ==', categories: ['Conference'] },
  { id: 48, instagramUrl: 'https://www.instagram.com/reel/DRW0RlKkmN4/?igsh=MWExeno1ZTF1a2Q0eQ==', categories: ['Conference'] }
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
  const [activeTab, setActiveTab] = useState('Videos');
  // Language sub-tabs for Videos section
  const VIDEO_LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu'];
  const [activeLanguage, setActiveLanguage] = useState('English');
  const [activeTreatment, setActiveTreatment] = useState('All');

  const FOUNDER_EXPLAINS_REELS = [
    'https://www.instagram.com/reel/DVu15TLE1pl/?igsh=MXM4MmJoYzZpeGJhbg==',
    'https://www.instagram.com/reel/DVLRvy8k2p_/?igsh=MWVvcnhocmY0czE4eA==',
    'https://www.instagram.com/reel/DVf-gxTEnDd/?igsh=ZnR0cG8yczZzZXlq',
    'https://www.instagram.com/reel/DVGxe-Qk8Ge/?igsh=MWtjajcxanVudXZmMw==',
    'https://www.instagram.com/reel/DU8KNYlEsr0/?igsh=MTZ4bXhzdjV5aHhhcQ==',
    'https://www.instagram.com/reel/DUz9YbCknoP/?igsh=bjl6Z3htNHlsZ2pu',
    'https://www.instagram.com/reel/DUa6QMBEst-/?igsh=bHBiY2NnZjcwb205',
    'https://www.instagram.com/reel/DULb8qvkjeg/?igsh=MXh0b2d6bXd2YjlxMw==',
    'https://www.instagram.com/reel/DR9mcbDk12f/?igsh=MWpvMXhkOGZzdjNveA==',
    'https://www.instagram.com/reel/DEcqLEIzw3a/?igsh=bHg2ZDVweXM2MHcw',
    'https://www.instagram.com/reel/DEKjPUiTmSR/?igsh=NmV5NzN5czZ3NzI2',
    'https://www.instagram.com/reel/C9MD13yP4vk/?igsh=MXh2bXRyM3g3MmZndg==',
    'https://www.instagram.com/reel/C7JmbUPv1Sj/?igsh=MXZ0MWRvOGwwNTNkNQ==',
    'https://www.instagram.com/reel/C6vJvPWLpme/?igsh=MTZ0Yzh0ejR6a2pocQ==',
  ];

  const PODCAST_REELS = [
    'https://www.instagram.com/reel/DZnGL6gTNVy/?igsh=bzQyMWJ6OGl3M3lx',
    'https://www.instagram.com/reel/DZNX9DoSQSH/?igsh=MXZhN3FoNG40ZWxhNQ==',
    'https://www.instagram.com/reel/DZchf5fy5S9/?igsh=NXJ1OGFiYWU0YWxo',
    'https://www.instagram.com/reel/DYeiLGsTO4c/?igsh=bnFvNXR1ZWJzajRp',
    'https://www.instagram.com/reel/DYbQSMNTdgD/?igsh=bzExdXhoZG8zdTJo',
    'https://www.instagram.com/reel/DW6CEZ4EqVn/?igsh=MW83ejRqd3dlNXFhdQ==',
    'https://youtu.be/mbOS6w_inZw',
    'https://youtu.be/YieS_4z0lyg',
  ];

  // YouTube videos grouped by language. Replace the placeholder IDs with your real video IDs or full URLs.
  // You can provide just the YouTube ID (e.g., "dQw4w9WgXcQ") or a full watch URL (e.g., "https://www.youtube.com/watch?v=dQw4w9WgXcQ").
  const VIDEOS = {
    English: [
      { id: 'en-1', url: 'https://youtu.be/js7-2vuNCo4?si=pskH6xdKRMU21Hvn', treatments: ['Uterine Artery Embolization'] },
      { id: 'en-2', url: 'https://youtu.be/rW8x7E1WpUQ?si=_5OSAaMTAZI53YTu', treatments: ['Varicose Veins'] },
      { id: 'en-3', url: 'https://youtu.be/gjZsulwKjfI?si=B8lh-cxz5r1586gp', treatments: ['Thyroid Nodule'] },
      { id: 'en-4', url: 'https://youtu.be/78JX1DasFl8?si=QLAmj2wgduQrk5nb', treatments: ['Thyroid Nodule'] },
      { id: 'en-5', url: 'https://youtu.be/iw5G9U2LMNI?si=ajBhJdMXuUjTSpDl', treatments: ['Uterine Artery Embolization'] },
      { id: 'en-6', url: 'https://youtu.be/vM5o0rX3lag?si=-eEw-ylqr3ha72t8', treatments: ['Genicular Artery Embolization'] },
      { id: 'en-7', url: 'https://youtu.be/kCxftL55ybQ?si=7SmUSOz02E4PPEDY', treatments: ['Genicular Artery Embolization'] },
      { id: 'en-8', url: 'https://youtu.be/8nvynTXSMnQ?si=aeuS5102qk_EJY55', treatments: ['Varicose Veins'] },
      { id: 'en-9', url: 'https://youtu.be/u5aYfE6qAfE?si=gDC9xR0F0G7r78NW', treatments: ['Varicose Veins'] },
      { id: 'en-10', instagramUrl: 'https://www.instagram.com/reel/DJJaETLz_CE/', treatments: ['Uterine Artery Embolization'] },
      { id: 'en-11', instagramUrl: 'https://www.instagram.com/reel/DGsyHqlzWjj/', treatments: ['Prostate Artery Embolization'] },
      { id: 'en-12', instagramUrl: 'https://www.instagram.com/reel/DSyzb4dCEEb/', treatments: ['Thyroid Nodule'] },
      { id: 'en-13', instagramUrl: 'https://www.instagram.com/reel/DPYyvJ2jntK/', treatments: ['Thyroid Nodule'] },
      { id: 'en-14', instagramUrl: 'https://www.instagram.com/reel/DO0zKuoiCH5/?igsh=djNqdWU1MTlsODZw', treatments: ['Varicocele'] },
     
    ],
    Hindi: [
      // { id: 'hi-1', youtubeId: 'VIDEO_ID_3' },
    ],
    Tamil: [
      // { id: 'ta-1', youtubeId: 'VIDEO_ID_4' },
      { id: 'ta-1', url: 'https://www.youtube.com/shorts/8l2N3xQyctY', treatments: ['General'] },
      { id: 'ta-2', url: 'https://www.youtube.com/shorts/eQ3xktfh-w4', treatments: ['General'] },
      { id: 'ta-3', instagramUrl: 'https://www.instagram.com/reel/DK9uizgz1IW/', treatments: ['Uterine Artery Embolization'] },
      { id: 'ta-4', instagramUrl: 'https://www.instagram.com/reel/C8OQO7wvNYX/', treatments: ['Prostate Artery Embolization'] },
      { id: 'ta-5', instagramUrl: 'https://www.instagram.com/reel/C231eFSrDMj/', treatments: ['Prostate Artery Embolization'] },
      { id: 'ta-6', instagramUrl: 'https://www.instagram.com/reel/DJt6uCtT_Rp/', treatments: ['Thyroid Nodule'] },
      { id: 'ta-7', instagramUrl: 'https://www.instagram.com/reel/C7s6j3yN6AV/?igsh=MTRnMzhiOTJzZDB1eQ==', treatments: ['Varicocele'] },
    ],
    Telugu: [
      { id: 'te-1', url: 'https://www.youtube.com/shorts/HutOaDPp8hs', treatments: ['General'] },
      { id: 'te-2', url: 'https://www.youtube.com/shorts/01XvC2yu__o', treatments: ['General'] },
      { id: 'te-3', url: 'https://www.youtube.com/shorts/EMV7-v9kppc', treatments: ['General'] },
      { id: 'te-4', url: 'https://www.youtube.com/shorts/GeTmEDwlIb8', treatments: ['General'] },
      { id: 'te-5', url: 'https://www.youtube.com/shorts/ggMKxvfm3CE', treatments: ['General'] },
      { id: 'te-6', url: 'https://www.youtube.com/shorts/pDq0iO5rzJY', treatments: ['General'] },
      { id: 'te-7', instagramUrl: 'https://www.instagram.com/reel/DKuXBjbTtFu/', treatments: ['Uterine Artery Embolization'] },
      { id: 'te-8', instagramUrl: 'https://www.instagram.com/reel/DPq5G4Kkw1z/', treatments: ['Prostate Artery Embolization'] },
      { id: 'te-9', instagramUrl: 'https://www.instagram.com/reel/DLxCO4Az6Vv/', treatments: ['Thyroid Nodule'] },
    ],
  };

  const availableTreatments = useMemo(() => {
    const list = VIDEOS[activeLanguage] || [];
    const set = new Set();
    list.forEach(v => {
      const treatments = Array.isArray(v.treatments) ? v.treatments : [];
      treatments.forEach(t => {
        if (t) set.add(t);
      });
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [VIDEOS, activeLanguage]);

  useEffect(() => {
    setActiveTreatment('All');
  }, [activeLanguage]);

  const filteredVideosByLanguageAndTreatment = useMemo(() => {
    const list = VIDEOS[activeLanguage] || [];
    if (activeTreatment === 'All') return list;
    return list.filter(v => Array.isArray(v.treatments) && v.treatments.includes(activeTreatment));
  }, [VIDEOS, activeLanguage, activeTreatment]);

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

  const getInstagramReelId = (input) => {
    if (!input) return '';
    try {
      const url = new URL(input);
      const host = url.hostname.replace(/^www\./, '');
      if (host !== 'instagram.com') return '';
      const parts = url.pathname.split('/').filter(Boolean);
      const reelIdx = parts.indexOf('reel');
      if (reelIdx !== -1 && parts[reelIdx + 1]) return parts[reelIdx + 1];
      return '';
    } catch (e) {
      return '';
    }
  };

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return ALL_ITEMS;
    return ALL_ITEMS.filter(item => (item.categories && item.categories.includes(activeTab)));
  }, [activeTab]);

  return (
    <section className='w-full bg-white'>
      {/* Tabs */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6'>
        <div className='flex flex-wrap gap-3'>
          {TABS.map(tab => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type='button'
                onClick={() => setActiveTab(tab.key)}
                className={[
                  'px-5 py-2 rounded-full text-sm font-semibold transition-colors border',
                  isActive
                    ? 'bg-[#392C5C] text-white border-[#392C5C]'
                    : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50',
                ].join(' ')}
                aria-pressed={isActive}
              >
                {tab.label}
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

            <div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-6'>
              <div className='text-sm font-semibold text-gray-800'>Filter by Treatment</div>
              <select
                value={activeTreatment}
                onChange={(e) => setActiveTreatment(e.target.value)}
                className='w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#392C5C]/30'
              >
                <option value='All'>All Treatments</option>
                {availableTreatments.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Videos grid */}
            {VIDEOS[activeLanguage] && VIDEOS[activeLanguage].length > 0 ? (
              <div className='columns-1 sm:columns-2 lg:columns-3 [column-gap:1.25rem]'>
                {filteredVideosByLanguageAndTreatment.map(v => {
                  const youtubeInput = v.youtubeId || v.url || '';
                  const videoId = getYouTubeVideoId(youtubeInput);
                  const youtubeEmbedUrl = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : '';
                  const reelId = getInstagramReelId(v.instagramUrl);
                  const instagramEmbedUrl = reelId ? `https://www.instagram.com/reel/${reelId}/embed/` : '';
                  const isInstagram = !youtubeEmbedUrl && !!instagramEmbedUrl;
                  return (
                    <div
                      key={v.id}
                      className='mb-5 break-inside-avoid bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'
                      style={{ breakInside: 'avoid' }}
                    >
                      <div className={`relative w-full ${isInstagram ? 'pb-[177.78%]' : 'pb-[56.25%]'} bg-black`}>
                        {youtubeEmbedUrl ? (
                          <iframe
                            className='absolute inset-0 w-full h-full'
                            src={`${youtubeEmbedUrl}?rel=0`}
                            title={v.title || 'YouTube video player'}
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            referrerPolicy='strict-origin-when-cross-origin'
                            allowFullScreen
                            loading='lazy'
                          />
                        ) : instagramEmbedUrl ? (
                          <iframe
                            className='absolute inset-0 w-full h-full'
                            src={instagramEmbedUrl}
                            title={v.title || 'Instagram Reel'}
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                            loading='lazy'
                            style={{ border: 0 }}
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
        ) : activeTab === 'Founder Explains' ? (
          <div>
            {FOUNDER_EXPLAINS_REELS.length > 0 ? (
              <div className='columns-1 sm:columns-2 lg:columns-3 [column-gap:1.25rem]'>
                {FOUNDER_EXPLAINS_REELS.map((url, idx) => {
                  const reelId = getInstagramReelId(url);
                  const instagramEmbedUrl = reelId ? `https://www.instagram.com/reel/${reelId}/embed/` : '';
                  return (
                    <div
                      key={`${reelId || 'reel'}-${idx}`}
                      className='mb-5 break-inside-avoid bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'
                      style={{ breakInside: 'avoid' }}
                    >
                      <div className='relative w-full pb-[177.78%] bg-black'>
                        {instagramEmbedUrl ? (
                          <iframe
                            className='absolute inset-0 w-full h-full'
                            src={instagramEmbedUrl}
                            title='Instagram Reel'
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                            loading='lazy'
                            style={{ border: 0 }}
                          />
                        ) : (
                          <div className='absolute inset-0 flex items-center justify-center text-sm text-gray-500 bg-gray-100'>
                            Invalid Instagram reel URL
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className='text-gray-600'>No reels added yet for Founder Explains. Share the Instagram reel links and I will plug them in.</div>
            )}
          </div>
        ) : activeTab === 'Podcast' ? (
          <div>
            {PODCAST_REELS.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {PODCAST_REELS.map((url, idx) => {
                  const youtubeId = getYouTubeVideoId(url);
                  const youtubeEmbedUrl = youtubeId ? `https://www.youtube-nocookie.com/embed/${youtubeId}` : '';
                  const reelId = getInstagramReelId(url);
                  const instagramEmbedUrl = reelId ? `https://www.instagram.com/reel/${reelId}/embed/` : '';
                  const isInstagram = !youtubeEmbedUrl && !!instagramEmbedUrl;
                  return (
                    <div
                      key={`${youtubeId || reelId || 'podcast-reel'}-${idx}`}
                      className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'
                    >
                      <div className={`relative w-full ${isInstagram ? 'pb-[177.78%]' : 'pb-[56.25%]'} bg-black`}>
                        {youtubeEmbedUrl ? (
                          <iframe
                            className='absolute inset-0 w-full h-full'
                            src={`${youtubeEmbedUrl}?rel=0`}
                            title='Podcast YouTube Video'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            referrerPolicy='strict-origin-when-cross-origin'
                            allowFullScreen
                            loading='lazy'
                          />
                        ) : instagramEmbedUrl ? (
                          <iframe
                            className='absolute inset-0 w-full h-full'
                            src={instagramEmbedUrl}
                            title='Podcast Instagram Reel'
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                            loading='lazy'
                            style={{ border: 0 }}
                          />
                        ) : (
                          <div className='absolute inset-0 flex items-center justify-center text-sm text-gray-500 bg-gray-100'>
                            Invalid Instagram reel URL
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className='text-gray-600'>No podcast reels added yet. Share the Instagram reel links and I will plug them in.</div>
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
                  {item.instagramUrl ? (
                    <iframe
                      src={"https://www.instagram.com/reel/" + (item.instagramUrl.split('/reel/')[1] && item.instagramUrl.split('/reel/')[1].split('/')[0]) + "/embed/"}
                      className='block w-full h-[400px] bg-black'
                      allow='autoplay; encrypted-media'
                      allowFullScreen
                      loading='lazy'
                      title='Instagram Reel'
                      frameBorder='0'
                      style={{ border: 0 }}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title || ''}
                      loading='lazy'
                      className='block w-full h-auto object-contain'
                    />
                  )}
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
