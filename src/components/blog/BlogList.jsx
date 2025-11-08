import React, { useState, useEffect } from 'react';
import curatedBlogs from '../../data/curatedBlogs';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [isCuratedMode, setIsCuratedMode] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    perPage: 9
  });

  // Simple filter state
  const [searchTerm, setSearchTerm] = useState('');

  // Static curated mode: no fetching, map data directly
  const initStaticCurated = () => {
    setLoading(true);
    try {
      const mapped = curatedBlogs.map((b, idx) => ({
        id: idx + 1,
        title: b.title || '',
        slug: '',
        date: '',
        excerpt: '',
        content: '',
        featuredImage: b.thumbnail || '/Medagg_logo.jpg',
        author: '',
        categories: [],
        externalLink: b.url,
      }));
      setPosts(mapped);
      setPagination({ currentPage: 1, totalPages: 1, total: mapped.length, perPage: mapped.length || 9 });
    } catch (e) {
      console.error('Error initializing curated posts:', e);
      setError('Failed to load curated blog posts.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    initStaticCurated();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-lg font-medium mb-2">
              Oops! Something went wrong
            </div>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                initStaticCurated();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Medical <span className="text-pink-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest medical insights, treatment updates, and health tips from our expert team.
          </p>
        </div>

        {/* Search removed in static curated mode */}

        {/* Results Info */}
        {!loading && (
          <div className="mb-6 text-gray-600">Showing {posts.length} curated posts</div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12 mb-12">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col md:flex-row items-start gap-8 border-b border-gray-200 pb-8">
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <a href={post.externalLink} target="_blank" rel="noopener noreferrer">
                      <img
                        src={post.featuredImage}
                        alt={post.featuredImage}
                        className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                      />
                    </a>
                  </div>
                )}

                {/* Content */}
                <div className={`w-full ${post.featuredImage ? 'md:w-2/3' : ''}`}>
                  {/* Title only (no meta/excerpt in static mode) */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-pink-600 transition-colors min-h-[28px]">
                    <a href={post.externalLink} target="_blank" rel="noopener noreferrer">
                      {post.title || ' '}
                    </a>
                  </h2>

                  {/* Read More Button */}
                  <a
                    href={post.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-800 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-900 transition-colors"
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
