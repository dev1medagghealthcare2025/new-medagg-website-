import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../../data/blogPosts.json';

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

  // Simple filter state
  const [searchTerm, setSearchTerm] = useState('');

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
            Medical <span className='text-pink-600'>Blog</span>
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Stay informed with the latest medical insights, treatment updates, and health tips from our expert team.
          </p>
        </div>

        {/* Search removed for now; can be re-enabled for local dataset */}

        {/* Results Info removed as per request */}

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
