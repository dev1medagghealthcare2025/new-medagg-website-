import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'node:fs';
import path from 'node:path';

function readBlogPosts() {
  const filePath = path.resolve(process.cwd(), '..', 'src', 'data', 'blogPosts.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

function stripHtml(html) {
  return String(html || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function removeDuplicateLeadingTitle(htmlContent, mainTitle) {
  const normalize = (str) => {
    return stripHtml(str)
      .toLowerCase()
      .replace(/\s*[-–—:|]*\s*medagg\s*$/i, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  };

  const normalizedMainTitle = normalize(mainTitle);
  if (!normalizedMainTitle) return String(htmlContent || '');

  let refinedHtml = String(htmlContent || '');

  // Remove the first H1 if it duplicates the main title
  refinedHtml = refinedHtml.replace(/<h1.*?>.*?<\/h1>/i, (match) => {
    const normalizedH1 = normalize(match);
    if (
      normalizedH1 === normalizedMainTitle ||
      normalizedH1.startsWith(normalizedMainTitle) ||
      normalizedMainTitle.startsWith(normalizedH1)
    ) {
      return '';
    }
    return match;
  });

  // Remove a leading <p><strong>Title</strong></p> if present and duplicated
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

  // Remove a leading H2 that duplicates the main title
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

  return refinedHtml;
}

function sanitizeHtmlBasic(html) {
  const input = String(html || '');
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString || '';
  }
}

function calculateReadingTime(html) {
  const wordsPerMinute = 200;
  const text = stripHtml(html);
  const wordCount = text ? text.split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${readingTime} min read`;
}

export function generateStaticParams() {
  const posts = readBlogPosts();
  return posts
    .filter((p) => p && p.slug)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const posts = readBlogPosts();
  const post = posts.find((x) => x.slug === p?.slug);
  if (!post) return {};

  const title = stripHtml(post.title);
  const description = stripHtml(post.excerpt || title).slice(0, 180);

  return {
    title: `${title} | Medagg Healthcare`,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }) {
  const p = await params;
  const posts = readBlogPosts();
  const post = posts.find((x) => x.slug === p?.slug);

  if (!post) {
    notFound();
  }

  const safeHtml = removeDuplicateLeadingTitle(
    sanitizeHtmlBasic(post.content),
    stripHtml(post.title)
  );

  const related = posts
    .filter((x) => x && x.slug && x.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className='min-h-screen bg-pink-50 py-12'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Link href='/blog' className='inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-8'>
          <span className='text-lg' aria-hidden>
            ←
          </span>
          <span>Back to Blog</span>
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <article className='lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden'>
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
              <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6'>
                {post.date && <span>{formatDate(post.date)}</span>}
                {post.author && <span>{post.author}</span>}
                <span>{post.readTime || calculateReadingTime(post.content)}</span>
              </div>

              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
                {stripHtml(post.title)}
              </h1>

              <div
                className='blog-content prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mt-8 prose-h2:mt-16 prose-h3:mt-10 prose-ul:mt-8 prose-li:mt-4 prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md'
                dangerouslySetInnerHTML={{ __html: safeHtml }}
              />
            </div>
          </article>

          <aside className='lg:col-span-1'>
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <h2 className='text-lg font-bold text-gray-900 mb-4'>Related Posts</h2>
              <div className='space-y-4'>
                {related.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className='block group'>
                    <div className='flex gap-3'>
                      {rp.featuredImage ? (
                        <img
                          src={rp.featuredImage}
                          alt={stripHtml(rp.title)}
                          className='w-16 h-16 rounded-lg object-cover bg-gray-100 shrink-0'
                        />
                      ) : (
                        <div className='w-16 h-16 rounded-lg bg-gray-100 shrink-0' />
                      )}
                      <div>
                        <div className='text-sm font-semibold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2'>
                          {stripHtml(rp.title)}
                        </div>
                        {rp.date && <div className='text-xs text-gray-500 mt-1'>{formatDate(rp.date)}</div>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
