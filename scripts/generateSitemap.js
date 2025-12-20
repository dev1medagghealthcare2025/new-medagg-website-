/*
  Generates sitemap.xml for https://nosurgeries.in
  - Static routes are sourced from the known React Router paths in src/App.jsx
  - Blog routes are generated from src/data/blogPosts.json (slug -> /blog/:slug)
  - Output: public/sitemap.xml
*/

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://nosurgeries.in';
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const DATA_BLOG_JSON = path.resolve(__dirname, '..', 'src', 'data', 'blogPosts.json');
const OUTPUT_SITEMAP = path.join(PUBLIC_DIR, 'sitemap.xml');

// Static routes pulled from src/App.jsx
const STATIC_ROUTES = [
  '/',
  '/pae',
  '/gae',
  '/thyroid',
  '/about',
  '/varicocele-embolization',
  '/varicose-vein',
  '/blog',
  '/fte',
  '/gallery',
  '/career',
  '/contact-us',
  '/uae',
  '/breast-nodule-vae',
  '/breast-nodule-cryoablation',
  '/pfe',
  '/transcatheter-aortic-valve-replacement',
  '/cto',
  '/rfa',
  '/endovascular-coiling',
  '/radiofrequency-ablation-for-avm',
  '/investor',
  '/breast-nodule-rfa',
  '/join-with-us',
  '/testimonials',
  '/diabetic-foot',
  '/frozen-shoulder',
  '/policy',
  '/privacy-policy',
  '/terms'
];

function isoDate(d = new Date()) {
  return new Date(d).toISOString();
}

function buildUrlEntry(loc, { lastmod, changefreq, priority } = {}) {
  return `  <url>\n` +
    `    <loc>${BASE_URL}${loc}</loc>\n` +
    (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
    (changefreq ? `    <changefreq>${changefreq}</changefreq>\n` : '') +
    (priority != null ? `    <priority>${priority}</priority>\n` : '') +
    `  </url>`;
}

function getFileMTimeSafe(filePath) {
  try {
    const st = fs.statSync(filePath);
    return isoDate(st.mtime);
  } catch {
    return isoDate();
  }
}

function loadBlogSlugs() {
  try {
    if (!fs.existsSync(DATA_BLOG_JSON)) return [];
    const raw = fs.readFileSync(DATA_BLOG_JSON, 'utf8');
    const posts = JSON.parse(raw);
    return posts
      .filter(p => p && p.slug)
      .map(p => ({ slug: String(p.slug).trim().toLowerCase(), date: p.date }))
      .filter(p => p.slug);
  } catch (e) {
    console.warn('Could not read blogPosts.json for sitemap:', e.message);
    return [];
  }
}

function main() {
  const urls = [];

  // Static routes
  for (const route of STATIC_ROUTES) {
    const lastmod = getFileMTimeSafe(path.join(PUBLIC_DIR, 'index.html'));
    const priority = route === '/' ? 1.0 : 0.8;
    const changefreq = route === '/' ? 'daily' : 'weekly';
    urls.push(buildUrlEntry(route, { lastmod, changefreq, priority }));
  }

  // Blog routes
  const blogSlugs = loadBlogSlugs();
  for (const { slug, date } of blogSlugs) {
    const loc = `/blog/${slug}`;
    const lastmod = date ? isoDate(date) : isoDate();
    urls.push(buildUrlEntry(loc, { lastmod, changefreq: 'monthly', priority: 0.6 }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join('\n') +
    `\n</urlset>\n`;

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_SITEMAP, xml, 'utf8');
  console.log(`Generated sitemap with ${urls.length} URLs -> ${OUTPUT_SITEMAP}`);
}

main();
