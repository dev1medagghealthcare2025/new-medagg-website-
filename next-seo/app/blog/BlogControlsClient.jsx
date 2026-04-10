'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function BlogControlsClient({ initialQ = '', initialTopic = 'All', topics = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(initialQ || '');
  const [topic, setTopic] = useState(initialTopic || 'All');

  const baseParams = useMemo(() => {
    const p = new URLSearchParams(searchParams ? searchParams.toString() : '');
    p.delete('q');
    p.delete('Q');
    p.delete('topic');
    p.delete('t');
    return p;
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => {
      const p = new URLSearchParams(baseParams.toString());

      const q = (searchInput || '').trim();
      if (q) p.set('q', q);

      const top = (topic || '').trim();
      if (top && top !== 'All') p.set('topic', top);

      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }, 250);

    return () => clearTimeout(t);
  }, [baseParams, pathname, router, searchInput, topic]);

  return (
    <div className='mb-8 flex flex-col md:flex-row md:items-center gap-4'>
      <div className='flex-1'>
        <div className='relative'>
          <svg
            className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z' />
          </svg>
          <input
            type='text'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder='Search treatments, problems, tags…'
            className='w-full border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500'
          />
          {searchInput && (
            <button
              type='button'
              onClick={() => setSearchInput('')}
              className='absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600'
              aria-label='Clear search'
            >
              <svg className='h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10l-4.95-4.95L5.05 3.636 10 8.586z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <label htmlFor='topicFilter' className='text-sm font-medium text-gray-700'>
          Filter by Topic
        </label>
        <select
          id='topicFilter'
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className='border border-gray-200 rounded-full px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500'
        >
          <option value='All'>All</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
