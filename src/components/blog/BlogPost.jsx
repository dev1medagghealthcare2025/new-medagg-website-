import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag, Folder, Share2, Clock } from 'lucide-react';
import DOMPurify from 'dompurify';
import blogPosts from '../../data/blogPosts.json';
import Navbar from '../home/Navbar';
import Treatmentnavbar from '../home/Treatmentnavbar';
import '../../assets/css/blog.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Load single post from local dataset
  const loadPost = () => {
    try {
      setLoading(true);
      const found = blogPosts.find(p => p.slug === slug);
      if (!found) {
        setError('Blog post not found');
        setPost(null);
        return;
      }
      setPost(found);
      loadRelatedPosts(found);
    } catch (err) {
      console.error('Error loading local post:', err);
      setError('Failed to load blog post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Compute related posts locally (by shared category if available, else latest)
  const loadRelatedPosts = (current) => {
    try {
      const allPosts = blogPosts.filter(p => p.slug !== current.slug);

      // 1. Try to find posts with shared categories
      const currentCats = (current.categories || []).map(c => (c || '').toLowerCase());
      let candidates = [];
      if (currentCats.length > 0) {
        candidates = allPosts.filter(p => 
          (p.categories || []).some(c => currentCats.includes((c || '').toLowerCase()))
        );
      }

      // 2. If no category matches, try to find posts with shared tags
      if (candidates.length < 3) {
        const currentTags = (current.tags || []).map(t => (t || '').toLowerCase());
        if (currentTags.length > 0) {
          const tagCandidates = allPosts.filter(p => 
            (p.tags || []).some(t => currentTags.includes((t || '').toLowerCase()))
          );
          // Add tag-based candidates, avoiding duplicates
          tagCandidates.forEach(p => {
            if (!candidates.some(c => c.slug === p.slug)) {
              candidates.push(p);
            }
          });
        }
      }

      // 3. If still not enough, fill with the latest posts
      if (candidates.length < 3) {
        const latestPosts = [...allPosts].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        latestPosts.forEach(p => {
          if (candidates.length < 3 && !candidates.some(c => c.slug === p.slug)) {
            candidates.push(p);
          }
        });
      }

      const sorted = [...candidates].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

      setRelatedPosts(sorted.slice(0, 3).map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.date,
        featuredImage: post.featuredImage,
      })));
    } catch (err) {
      console.error('Error loading related posts locally:', err);
    }
  };

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  // Ensure images inside HTML content have sensible alt text
  useEffect(() => {
    if (!post) return;
    const container = document.querySelector('.blog-content');
    if (!container) return;
    const imgs = container.querySelectorAll('img');

    const deriveAltFromSrc = (src) => {
      try {
        const url = new URL(src, window.location.origin);
        const file = url.pathname.split('/').filter(Boolean).pop() || '';
        const base = file.replace(/\.[a-zA-Z0-9]+$/, '').replace(/[-_]+/g, ' ').trim();
        return base || '';
      } catch {
        return '';
      }
    };

    imgs.forEach((img) => {
      const hasAlt = img.hasAttribute('alt');
      const alt = (img.getAttribute('alt') || '').trim();
      if (!hasAlt || alt === '') {
        const fromTitle = (post && typeof post.title === 'string') ? stripHtml(post.title).trim() : '';
        const fromSrc = deriveAltFromSrc(img.getAttribute('src') || '');
        const fallback = fromSrc || fromTitle || 'Blog image';
        // If image is clearly decorative by class hint, keep empty alt
        if (img.classList.contains('decorative') || img.getAttribute('aria-hidden') === 'true') {
          img.setAttribute('alt', '');
          img.setAttribute('role', 'presentation');
        } else {
          img.setAttribute('alt', fallback);
        }
      }
    });
  }, [post]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate reading time
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  // Sanitize HTML content
  // Sanitize HTML content, and remove the first h1 if it's a duplicate of the main title
  const createSafeHTML = (htmlContent, mainTitle) => {
    // Normalize titles for a more robust comparison
    const normalize = (str) => {
      return stripHtml(str)
        .toLowerCase()
        // remove trailing brand/site suffix regardless of separator type
        .replace(/\s*[-–—:|]*\s*medagg\s*$/i, '')
        .replace(/[^a-z0-9]/g, '') // Remove non-alphanumeric characters
        .trim();
    };

    const normalizedMainTitle = normalize(mainTitle);

    const processedHtml = htmlContent.replace(/<h1.*?>.*?<\/h1>/i, (match) => {
      const normalizedH1 = normalize(match);
      // Remove if identical or if one is a clear prefix/suffix of the other
      if (
        normalizedH1 === normalizedMainTitle ||
        normalizedH1.startsWith(normalizedMainTitle) ||
        normalizedMainTitle.startsWith(normalizedH1)
      ) {
        return ''; // Remove this H1 tag
      }
      return match; // Keep it
    });

    // Additionally, remove a leading duplicate <p><strong>Title</strong></p> if present
    let refinedHtml = processedHtml;
    const strongLead = refinedHtml.match(/^\s*<p><strong>(.*?)<\/strong><\/p>/i);
    if (strongLead) {
      const normStrong = normalize(strongLead[1]);
      if (
        normStrong === normalizedMainTitle ||
        normStrong.startsWith(normalizedMainTitle) ||
        normalizedMainTitle.startsWith(normStrong)
      ) {
        refinedHtml = refinedHtml.replace(strongLead[0], '');
      }
    }

    // And remove a leading duplicate <h2> that matches the main title (common from setext underline style)
    const h2Lead = refinedHtml.match(/^\s*<h2[^>]*>(.*?)<\/h2>/i);
    if (h2Lead) {
      const normH2 = normalize(h2Lead[1]);
      if (
        normH2 === normalizedMainTitle ||
        normH2.startsWith(normalizedMainTitle) ||
        normalizedMainTitle.startsWith(normH2)
      ) {
        refinedHtml = refinedHtml.replace(h2Lead[0], '');
      }
    }

    return {
      __html: DOMPurify.sanitize(refinedHtml, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'figure', 'figcaption',
          'table', 'thead', 'tbody', 'tr', 'th', 'td', 'code', 'pre', 'div', 'span',
        ],
        ALLOWED_ATTR: [
          'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
          'width', 'height', 'style',
        ],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      }),
    };
  };

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: post.title.replace(/<[^>]*>/g, ''),
      text: post.excerpt.replace(/<[^>]*>/g, ''),
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Strip HTML for text content
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Treatmentnavbar />
        <div className='min-h-screen bg-pink-50 py-12'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='animate-pulse'>
              <div className='h-8 bg-gray-300 rounded w-1/4 mb-8'></div>
              <div className='h-64 bg-gray-300 rounded mb-8'></div>
              <div className='h-12 bg-gray-300 rounded w-3/4 mb-4'></div>
              <div className='h-4 bg-gray-300 rounded w-1/2 mb-8'></div>
              <div className='space-y-4'>
                <div className='h-4 bg-gray-300 rounded'></div>
                <div className='h-4 bg-gray-300 rounded'></div>
                <div className='h-4 bg-gray-300 rounded w-5/6'></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Treatmentnavbar />
        <div className='min-h-screen bg-pink-50 py-12'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='bg-red-50 border border-red-200 rounded-lg p-8 text-center'>
              <div className='text-red-600 text-xl font-medium mb-4'>
                {error}
              </div>
              <div className='space-x-4'>
                <button
                  onClick={() => navigate('/blog')}
                  className='bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors'
                >
                  Back to Blog
                </button>
                <button
                  onClick={() => {
                    setError(null);
                    loadPost();
                  }}
                  className='bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors'
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Treatmentnavbar />
      <div className='min-h-screen bg-pink-50 py-12'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* 2-column layout: content + sidebar (desktop) */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main content */}
          <div className='lg:col-span-2'>
            {/* Back Button */}
            <Link
              to='/blog'
              className='inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-8 group'
            >
              <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
              <span>Back to Blog</span>
            </Link>

            {/* Article Header */}
            <article className='bg-white rounded-xl shadow-lg overflow-hidden'>
              {/* Featured Image */}
              {post.featuredImage && (
                <div className='h-56 sm:h-72 md:h-96 bg-gray-100 overflow-hidden'>
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || stripHtml(post.title)}
                    className='w-full h-full object-contain sm:object-cover object-center'
                  />
                </div>
              )}

              <div className='p-8 md:p-12'>
                {/* Meta Information */}
                <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4' />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <User className='w-4 h-4' />
                    <span>{post.author}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4' />
                    <span>{post.readTime || calculateReadingTime(post.content)}</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className='flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors'
                  >
                    <Share2 className='w-4 h-4' />
                    <span>Share</span>
                  </button>
                </div>

                {/* Title */}
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
                  {stripHtml(post.title)}
                </h1>

                {/* Categories and Tags */}
                <div className='flex flex-wrap gap-4 mb-8'>
                  {post.categories.length > 0 && (
                    <div className='flex items-center gap-2'>
                      <Folder className='w-4 h-4 text-gray-400' />
                      <div className='flex flex-wrap gap-2'>
                        {post.categories.map((categoryName, index) => (
                          <span
                            key={index}
                            className='px-3 py-1 bg-pink-100 text-pink-600 text-sm rounded-full font-medium'
                          >
                            {categoryName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {post.tags.length > 0 && (
                    <div className='flex items-center gap-2'>
                      <Tag className='w-4 h-4 text-gray-400' />
                      <div className='flex flex-wrap gap-2'>
                        {post.tags.slice(0, 3).map((tagName, index) => (
                          <span
                            key={index}
                            className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full'
                          >
                            {tagName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div
                  className='blog-content prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mt-8 prose-h2:mt-16 prose-h3:mt-10 prose-ul:mt-8 prose-li:mt-4 prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md'
                  dangerouslySetInnerHTML={createSafeHTML(post.content, post.title)}
                />

                {/* Article Footer */}
                <div className='mt-12 pt-8 border-t border-gray-200'>
                  <div className='flex items-center justify-between'>
                    <div className='text-sm text-gray-500'>
                      Published: {formatDate(post.date)}
                    </div>
                    <button
                      onClick={handleShare}
                      className='flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors'
                    >
                      <Share2 className='w-4 h-4' />
                      <span>Share Article</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar with vertical cards */}
          {relatedPosts.length > 0 && (
            <aside className='hidden lg:block'>
              <div className='sticky top-24 h-[calc(100vh-6rem)]'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Related Articles</h2>
                <div className='space-y-5 overflow-y-auto h-full hide-scrollbar'>
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className='block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group'
                    >
                      {relatedPost.featuredImage && (
                        <div className='h-40 bg-gray-100 overflow-hidden'>
                          <img
                            src={relatedPost.featuredImage}
                            alt={relatedPost.featuredImageAlt || stripHtml(relatedPost.title)}
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                          />
                        </div>
                      )}
                      <div className='p-4'>
                        <h3 className='text-base font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-pink-600 transition-colors'>
                          {stripHtml(relatedPost.title)}
                        </h3>
                        <p className='text-xs text-gray-500 mt-1'>{formatDate(relatedPost.date)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Related Posts (mobile/tablet) */}
        {relatedPosts.length > 0 && (
          <div className='mt-16 lg:hidden'>
            <h2 className='text-2xl font-bold text-gray-900 mb-8'>Related Articles</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group'
                >
                  {relatedPost.featuredImage && (
                    <div className='h-40 bg-gray-100 overflow-hidden'>
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.featuredImageAlt || stripHtml(relatedPost.title)}
                        className='w-full h-full object-contain sm:object-cover object-center group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                  )}
                  <div className='p-4'>
                    <h3 className='text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors'>
                      {stripHtml(relatedPost.title)}
                    </h3>
                    <p className='text-sm text-gray-500'>
                      {formatDate(relatedPost.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default BlogPost;
