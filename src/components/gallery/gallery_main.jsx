import React, { useMemo, useState } from 'react';

const TABS = ['All', 'Celebrations', 'Awards', 'Reviews', 'Our Camps','Media','Conference'];

// Sample items. Replace the src paths with your real images if needed.
// These 3 images exist in your public/ folder already.
const ALL_ITEMS = [
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
    id: 16,
    src: '/pic 8.jpeg',
    categories: ['Awards'],
  },
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
  {
    id: 19,
    src: '/pic11.jpeg',
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
];

export default function GalleryMain() {
  const [activeTab, setActiveTab] = useState('All');

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

      {/* Masonry-style columns (prevents large empty spaces) */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
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
      </div>
    </section>
  );
}
