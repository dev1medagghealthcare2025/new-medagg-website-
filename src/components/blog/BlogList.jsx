import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../../data/blogPosts.json';
import { GROUPED_BLOGS_UI } from '../../config/uiEnhancements';

// --- Topic inference (non-destructive) ---
const TOPIC_ORDER = [
  'Liver Cancer',
  'Prostate / BPH',
  'Thyroid Nodules',
  'Varicose Veins',
  'Women\'s Health',
  'IR & Procedures',
  'General Health',
];

const TOPIC_KEYWORDS = [
  { topic: 'Liver Cancer', keys: ['liver', 'hcc', 'hepatocellular', 'tace', 'y-90', 'radioembolization'] },
  { topic: 'Prostate / BPH', keys: ['prostate', 'bph', 'pae'] },
  { topic: 'Thyroid Nodules', keys: ['thyroid', 'nodule', 'nodules', 'goiter'] },
  // Keep Varicose Veins above IR & Procedures so these posts do not get captured by generic IR terms
  { topic: 'Varicose Veins', keys: ['varicose', 'endovenous', 'sclerotherapy', 'stockings'] },
  { topic: 'Women\'s Health', keys: ['fibroid', 'adenomyosis', 'fallopian', 'dysmenorrhea', 'uterine'] },
  { topic: 'IR & Procedures', keys: ['embolization', 'ablation', 'rfa', 'mwa', 'cryo', 'sclerotherapy'] },
];

function inferTopic(post) {
    const hay = (post && post.title || '') + ' ' + (post && post.slug || '') + ' ' + ((post && post.tags) || []).join(' ').toLowerCase();
  for (const { topic, keys } of TOPIC_KEYWORDS) {
    if (keys.some(k => hay.includes(k))) return topic;
  }
  return 'General Health';
}

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [isCuratedMode, setIsCuratedMode] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    perPage: 9,
  });
  // Topic filter: 'All' or one of TOPIC_ORDER
  const [topicFilter, setTopicFilter] = useState(() => {
    try { return localStorage.getItem('blog_topic_filter') || 'All'; } catch { return 'All'; }
  });

  // Search state: immediate input and debounced query
  const [searchInput, setSearchInput] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || '';
    } catch { return ''; }
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || '';
    } catch { return ''; }
  });

  // Initialize from local JSON dataset
  const initLocalPosts = () => {
    setLoading(true);
    try {
      // Sort by date desc if available
      const sorted = [...blogPosts].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
      setPosts(sorted);
      setPagination({ currentPage: 1, totalPages: 1, total: sorted.length, perPage: sorted.length || 9 });
      setVisibleCount(Math.min(3, sorted.length || 0));
    } catch (e) {
      console.error('Error initializing local posts:', e);
      setError('Failed to load blog posts.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    initLocalPosts();
  }, []);

  // Persist topic filter
  useEffect(() => {
    try { localStorage.setItem('blog_topic_filter', topicFilter); } catch {}
  }, [topicFilter]);

  // Debounce search input and sync it to URL (?q=...)
  useEffect(() => {
    const t = setTimeout(() => {
      const q = (searchInput || '').trim();
      setSearchQuery(q);
      try {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        if (q) params.set('q', q); else params.delete('q');
        url.search = params.toString();
        window.history.replaceState({}, '', url.toString());
      } catch {}
    }, 250);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Pre-compute grouped structure when flag is on
  const grouped = useMemo(() => {
    if (!GROUPED_BLOGS_UI) return null;
    const sorted = [...posts].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    const map = new Map();
    for (const p of sorted) {
      const topic = inferTopic(p);
      if (!map.has(topic)) map.set(topic, []);
      map.get(topic).push(p);
    }
    // Order by TOPIC_ORDER; append any unknowns at end
    const ordered = [];
    for (const t of TOPIC_ORDER) {
      if (map.has(t)) ordered.push({ topic: t, items: map.get(t) });
    }
    for (const [t, items] of map.entries()) {
      if (!TOPIC_ORDER.includes(t)) ordered.push({ topic: t, items });
    }
    return ordered;
  }, [posts]);

  // --- Search helpers and filtered data ---
  function scorePost(p, q) {
    if (!q) return 0;
    const needle = q.toLowerCase();
    const title = (p.title || '').toLowerCase();
    const slug = (p.slug || '').toLowerCase();
    const excerpt = (p.excerpt || '').toLowerCase();
    const tags = (p.tags || []).join(' ').toLowerCase();
    let score = 0;
    if (title.includes(needle)) score += 5 + (title.startsWith(needle) ? 3 : 0);
    if (tags.includes(needle)) score += 4;
    if (slug.includes(needle)) score += 2;
    if (excerpt.includes(needle)) score += 2;
    return score;
  }

  const filteredBySearch = useMemo(() => {
    if (!searchQuery) return posts;
    const withScore = posts
      .map(p => ({ p, s: scorePost(p, searchQuery) }))
      .filter(x => x.s > 0)
      .sort((a, b) => (b.s - a.s) || (new Date(b.p.date || 0) - new Date(a.p.date || 0)));
    return withScore.map(x => x.p);
  }, [posts, searchQuery]);

  const groupedFiltered = useMemo(() => {
    if (!GROUPED_BLOGS_UI) return null;
    const base = filteredBySearch;
    const map = new Map();
    for (const p of base) {
      const topic = inferTopic(p);
      if (!map.has(topic)) map.set(topic, []);
      map.get(topic).push(p);
    }
    const ordered = [];
    for (const t of TOPIC_ORDER) {
      if (map.has(t)) ordered.push({ topic: t, items: map.get(t) });
    }
    for (const [t, items] of map.entries()) {
      if (!TOPIC_ORDER.includes(t)) ordered.push({ topic: t, items });
    }
    return ordered;
  }, [filteredBySearch]);

  // Visible groups based on current search and topic filter (grouped path only)
  const visibleGroups = useMemo(() => {
    if (!GROUPED_BLOGS_UI) return null;
    const base = searchQuery ? groupedFiltered : grouped;
    if (!base) return null;
    return topicFilter === 'All' ? base : base.filter(g => g.topic === topicFilter);
  }, [GROUPED_BLOGS_UI, grouped, groupedFiltered, searchQuery, topicFilter]);

  // Match count for UI (works for grouped and ungrouped)
  const matchCount = useMemo(() => {
    if (GROUPED_BLOGS_UI) {
      if (!visibleGroups) return 0;
      return visibleGroups.reduce((sum, g) => sum + ((g.items && g.items.length) || 0), 0);
    }
    return (searchQuery ? filteredBySearch : posts).length;
  }, [GROUPED_BLOGS_UI, visibleGroups, filteredBySearch, posts, searchQuery]);

  if (error) {
    return (
      <div className='min-h-screen bg-white py-12'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
            <div className='text-red-600 text-lg font-medium mb-2'>
              Oops! Something went wrong
            </div>
            <p className='text-red-500 mb-4'>{error}</p>
            <button
              onClick={() => {
                setError(null);
                initLocalPosts();
              }}
              className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
          <span className='text-pink-600'>Simplifying Advanced Healthcare for You.</span>
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Stay informed with the latest medical insights, treatment updates, and health tips from our expert team.
          </p>
        </div>

        {/* Search + Filter Row */}
        <div className='mb-8 flex flex-col md:flex-row md:items-center gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              {/* Search icon */}
              <svg className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z' />
              </svg>
              <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='Search treatments, problems, tags…'
                className='w-full border border-gray-200 rounded-full pl-10 pr-10 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500'
              />
              {/* Clear button */}
              {searchInput && (
                <button
                  type='button'
                  onClick={() => setSearchInput('')}
                  className='absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600'
                  aria-label='Clear search'
                >
                  <svg className='h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10l-4.95-4.95L5.05 3.636 10 8.586z' clipRule='evenodd' />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <label htmlFor='topicFilter' className='text-sm font-medium text-gray-700'>Filter by Topic</label>
            <select
              id='topicFilter'
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className='border border-gray-200 rounded-full px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500'
            >
              <option value='All'>All</option>
              {TOPIC_ORDER.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[...Array(6)].map((_, index) => (
              <div key={index} className='bg-white rounded-xl shadow-lg overflow-hidden animate-pulse'>
                <div className='h-48 bg-gray-300'></div>
                <div className='p-6'>
                  <div className='h-4 bg-gray-300 rounded mb-2'></div>
                  <div className='h-6 bg-gray-300 rounded mb-4'></div>
                  <div className='h-4 bg-gray-300 rounded mb-2'></div>
                  <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                </div>
              </div>
            ))}
          </div>
        ) : GROUPED_BLOGS_UI && grouped ? (
          // --- Grouped rendering ---
          <>
            {(visibleGroups || [])
              .map(({ topic, items }) => (
              <section key={topic} className='mb-12'>
                <div className='flex items-center gap-3 mb-6 group'>
                  <span className='w-1.5 h-6 bg-pink-500 rounded-full transition-all duration-200 group-hover:h-7' />
                  <h2 className='text-2xl md:text-3xl font-extrabold text-gray-900 transition-colors duration-200 group-hover:text-pink-600'>
                    {topic}
                  </h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {items.map((post) => (
                    <article key={post.slug || post.title} className='bg-white rounded-xl shadow-lg overflow-hidden flex flex-col'>
                      {/* Image wrapper fixed height for uniform rows */}
                      {post.featuredImage && (
                        <Link to={`/blog/${post.slug}`} className='block'>
                          <div className='w-full h-48 bg-gray-100 overflow-hidden'>
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className='w-full h-full object-cover'
                            />
                          </div>
                        </Link>
                      )}
                      <div className='p-5 flex-1 flex flex-col'>
                        <h3 className='text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]'>
                          <Link to={`/blog/${post.slug}`} className='hover:text-pink-600 transition-colors'>
                            {post.title}
                          </Link>
                        </h3>
                        {post.excerpt && (
                          <p className='text-gray-600 mb-4 line-clamp-3 min-h-[3.5rem]'>
                            {post.excerpt}
                          </p>
                        )}
                        <div className='mt-auto'>
                          <Link
                            to={`/blog/${post.slug}`}
                            className='inline-block bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-900 transition-colors'
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </>
        ) : (
          <>
            <div className='space-y-12 mb-12'>
              {posts.slice(0, visibleCount).map((post, idx) => (
                <article key={post.slug || post.title || idx} className='flex flex-col md:flex-row items-start gap-8 border-b border-gray-200 pb-8'>
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className='w-full md:w-1/3 flex-shrink-0'>
                      <Link to={`/blog/${post.slug}`}>
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className='w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'
                        />
                      </Link>
                    </div>
                  )}

                  {/* Content */}
                  <div className={`w-full ${post.featuredImage ? 'md:w-2/3' : ''}`}>
                    {/* Title */}
                    <h2 className='text-2xl font-bold text-gray-900 mb-3 hover:text-pink-600 transition-colors min-h-[28px]'>
                      <Link to={`/blog/${post.slug}`}>
                        {post.title || ' '}
                      </Link>
                    </h2>
                    {/* Optional excerpt */}
                    {post.excerpt && (
                      <p className='text-gray-600 mb-4 line-clamp-3'>{post.excerpt}</p>
                    )}
                    {/* Read More Button */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className='inline-block bg-gray-800 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-900 transition-colors'
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            {/* Show More */}
            {visibleCount < posts.length && (
              <div className='text-center'>
                <button
                  onClick={() => {
                    setLoadingMore(true);
                    // Small timeout for UX; remove if not needed
                    setTimeout(() => {
                      setVisibleCount((v) => Math.min(v + 3, posts.length));
                      setLoadingMore(false);
                    }, 150);
                  }}
                  className='inline-flex items-center justify-center px-6 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50'
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading…' : 'Show More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;
