import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import BlogControlsClient from './BlogControlsClient';

const TOPIC_ORDER = [
  'Liver Cancer',
  'Prostate / BPH',
  'Thyroid Nodules',
  'Varicose Veins',
  "Women's Health",
  'IR & Procedures',
  'General Health',
];

const TOPIC_KEYWORDS = [
  { topic: 'Liver Cancer', keys: ['liver', 'hcc', 'hepatocellular', 'tace', 'y-90', 'radioembolization'] },
  { topic: 'Prostate / BPH', keys: ['prostate', 'bph', 'pae'] },
  { topic: 'Thyroid Nodules', keys: ['thyroid', 'nodule', 'nodules', 'goiter'] },
  { topic: 'Varicose Veins', keys: ['varicose', 'endovenous', 'sclerotherapy', 'stockings'] },
  { topic: "Women's Health", keys: ['fibroid', 'adenomyosis', 'fallopian', 'dysmenorrhea', 'uterine'] },
  { topic: 'IR & Procedures', keys: ['embolization', 'ablation', 'rfa', 'mwa', 'cryo', 'sclerotherapy'] },
];

function inferTopic(post) {
  const hay = `${(post && post.title) || ''} ${(post && post.slug) || ''} ${(((post && post.tags) || [])).join(' ')}`.toLowerCase();
  for (const { topic, keys } of TOPIC_KEYWORDS) {
    if (keys.some((k) => hay.includes(k))) return topic;
  }
  return 'General Health';
}

function stripHtml(html) {
  return String(html || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function readBlogPosts() {
  const filePath = path.resolve(process.cwd(), '..', 'src', 'data', 'blogPosts.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  const arr = Array.isArray(parsed) ? parsed : [];
  return [...arr].sort((a, b) => new Date(b?.date || 0) - new Date(a?.date || 0));
}

export const metadata = {
  title: 'Blog | Medagg Healthcare',
  description: 'Medical insights, treatment updates, and health tips from Medagg Healthcare.',
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogIndexPage({ searchParams }) {
  const sp = await searchParams;
  const q = (sp && (sp.q || sp.Q) ? String(sp.q || sp.Q) : '').trim();
  const topic = (sp && (sp.topic || sp.t) ? String(sp.topic || sp.t) : '').trim();

  const posts = readBlogPosts();

  const filteredBySearch = !q
    ? posts
    : posts.filter((p) => {
        const hay = `${p?.title || ''} ${p?.slug || ''} ${(p?.excerpt || '')} ${(((p?.tags || [])).join(' '))}`.toLowerCase();
        return hay.includes(q.toLowerCase());
      });

  const filtered = !topic || topic === 'All'
    ? filteredBySearch
    : filteredBySearch.filter((p) => inferTopic(p) === topic);

  const groupedMap = new Map();
  for (const p of filtered) {
    const t = inferTopic(p);
    if (!groupedMap.has(t)) groupedMap.set(t, []);
    groupedMap.get(t).push(p);
  }
  const grouped = [];
  for (const t of TOPIC_ORDER) {
    if (groupedMap.has(t)) grouped.push({ topic: t, items: groupedMap.get(t) });
  }
  for (const [t, items] of groupedMap.entries()) {
    if (!TOPIC_ORDER.includes(t)) grouped.push({ topic: t, items });
  }

  return (
    <main className='min-h-screen bg-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            <span className='text-pink-600'>Simplifying Advanced Healthcare for You.</span>
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Stay informed with the latest medical insights, treatment updates, and health tips from our expert team.
          </p>
        </div>

        <BlogControlsClient key={`${q}::${topic || 'All'}`} initialQ={q} initialTopic={topic || 'All'} topics={TOPIC_ORDER} />

        {filtered.length === 0 ? (
          <div className='text-center text-gray-600'>No posts found.</div>
        ) : (
          <>
            {grouped.map(({ topic: t, items }) => (
              <section key={t} className='mb-12'>
                <div className='flex items-center gap-3 mb-6 group'>
                  <span className='w-1.5 h-6 bg-pink-500 rounded-full transition-all duration-200 group-hover:h-7' />
                  <h2 className='text-2xl md:text-3xl font-extrabold text-gray-900 transition-colors duration-200 group-hover:text-pink-600'>
                    {t}
                  </h2>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {items.map((post) => (
                    <article key={post.slug} className='bg-white rounded-xl shadow-lg overflow-hidden flex flex-col'>
                      {post.featuredImage && (
                        <Link href={`/blog/${post.slug}`} className='block'>
                          <div className='w-full h-48 bg-gray-100 overflow-hidden'>
                            <img src={post.featuredImage} alt={stripHtml(post.title)} className='w-full h-full object-cover' />
                          </div>
                        </Link>
                      )}
                      <div className='p-5 flex-1 flex flex-col'>
                        <h3 className='text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]'>
                          <Link href={`/blog/${post.slug}`} className='hover:text-pink-600 transition-colors'>
                            {stripHtml(post.title)}
                          </Link>
                        </h3>
                        {post.excerpt && (
                          <p className='text-gray-600 mb-4 line-clamp-3 min-h-[3.5rem]'>{stripHtml(post.excerpt)}</p>
                        )}
                        <div className='mt-auto'>
                          <Link
                            href={`/blog/${post.slug}`}
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
        )}
      </div>
    </main>
  );
}
