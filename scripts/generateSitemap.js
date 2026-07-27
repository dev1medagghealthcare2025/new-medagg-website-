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
const OUTPUT_SITEMAP_ROOT = path.resolve(__dirname, '..', 'sitemap.xml');

const DEFAULT_LASTMOD = '2026-02-12';

// Static routes pulled from src/App.jsx
const STATIC_ROUTES = [
  '/',
  '/about',
  '/blog',
  '/contact-us',
  '/join-with-us',
  '/investor',
  '/prostate-artery-embolization-pae',
  '/prostate-artery-embolization-pae-bangalore',
  '/prostate-artery-embolization-pae-mangalore',
  '/prostate-artery-embolization-pae-delhi',
  '/genicular-artery-embolization-gae',
  '/genicular-artery-embolization-gae-bangalore',
  '/genicular-artery-embolization-gae-mangalore',
  '/genicular-artery-embolization-gae-delhi',
  '/thyroid-nodule-ablation',
  '/thyroid-nodule-ablation-bangalore',
  '/thyroid-nodule-ablation-mangalore',
  '/thyroid-nodule-ablation-delhi',
  '/varicocele-embolization',
  '/varicocele-embolization-bangalore',
  '/varicocele-embolization-mangalore',
  '/varicocele-embolization-delhi',
  '/fallopian-tube-recanalization-ftr',
  '/fallopian-tube-recanalization-ftr-bangalore',
  '/fallopian-tube-recanalization-ftr-mangalore',
  '/fallopian-tube-recanalization-ftr-delhi',
  '/breast-nodule-vae',
  '/breast-nodule-vae-chennai',
  '/breast-nodule-vae-madurai',
  '/breast-nodule-vae-coimbatore',
  '/breast-nodule-vae-bangalore',
  '/breast-nodule-vae-mangalore',
  '/breast-nodule-vae-delhi',
  '/pelvic-vein-embolization',
  '/pelvic-vein-embolization-chennai',
  '/pelvic-vein-embolization-madurai',
  '/pelvic-vein-embolization-coimbatore',
  '/pelvic-vein-embolization-bangalore',
  '/pelvic-vein-embolization-mangalore',
  '/uterine-artery-embolization-uae',
  '/uterine-artery-embolization-uae-bangalore',
  '/uterine-artery-embolization-uae-mangalore',
  '/uterine-artery-embolization-uae-delhi',
  '/plantar-fascial-embolization',
  '/plantar-fascial-embolization-chennai',
  '/plantar-fascial-embolization-madurai',
  '/plantar-fascial-embolization-coimbatore',
  '/plantar-fascial-embolization-bangalore',
  '/plantar-fascial-embolization-mangalore',
  '/plantar-fascial-embolization-delhi',
  '/varicose-vein',
  '/varicose-vein-bangalore',
  '/varicose-vein-mangalore',
  '/varicose-vein-delhi',
  '/diabetic-foot',
  '/diabetic-foot-chennai',
  '/diabetic-foot-madurai',
  '/diabetic-foot-coimbatore',
  '/diabetic-foot-bangalore',
  '/diabetic-foot-mangalore',
  '/transcatheter-aortic-valve-replacement',
  '/transcatheter-aortic-valve-replacement-chennai',
  '/transcatheter-aortic-valve-replacement-madurai',
  '/transcatheter-aortic-valve-replacement-coimbatore',
  '/transcatheter-aortic-valve-replacement-bangalore',
  '/transcatheter-aortic-valve-replacement-mangalore',
  '/cto',
  '/cto-chennai',
  '/cto-madurai',
  '/cto-coimbatore',
  '/cto-bangalore',
  '/cto-mangalore',
  '/piles-hemorrhoids',
  '/piles-hemorrhoids-chennai',
  '/piles-hemorrhoids-madurai',
  '/piles-hemorrhoids-coimbatore',
  '/y90-radioembolization-tare',
  '/y90-radioembolization-tare-chennai',
  '/y90-radioembolization-tare-madurai',
  '/y90-radioembolization-tare-coimbatore',
  '/y90-radioembolization-tare-bangalore',
  '/y90-radioembolization-tare-mangalore',
  '/transarterial-chemoembolization-tace',
  '/nuclear-medicine',
  '/transarterial-chemoembolization-tace-chennai',
  '/transarterial-chemoembolization-tace-madurai',
  '/transarterial-chemoembolization-tace-coimbatore',
  '/endovascular-coiling',
  '/endovascular-coiling-chennai',
  '/endovascular-coiling-madurai',
  '/endovascular-coiling-coimbatore',
  '/endovascular-coiling-bangalore',
  '/endovascular-coiling-mangalore',
  '/frozen-shoulder',
  '/frozen-shoulder-chennai',
  '/frozen-shoulder-madurai',
  '/frozen-shoulder-coimbatore',
  '/frozen-shoulder-bangalore',
  '/frozen-shoulder-mangalore',
  '/testimonials',
  '/gallery',
  '/career',
  '/policy',
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
    const lastmod = DEFAULT_LASTMOD;
    const priority = route === '/' ? 1.0 : 0.9;
    urls.push(buildUrlEntry(route, { lastmod, priority }));
  }

  // Blog routes
  const blogSlugs = loadBlogSlugs();
  for (const { slug, date } of blogSlugs) {
    const loc = `/blog/${slug}`;
    const lastmod = DEFAULT_LASTMOD;
    urls.push(buildUrlEntry(loc, { lastmod, priority: 0.8 }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join('\n') +
    `\n</urlset>\n`;

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_SITEMAP, xml, 'utf8');
  fs.writeFileSync(OUTPUT_SITEMAP_ROOT, xml, 'utf8');
  console.log(`Generated sitemap with ${urls.length} URLs -> ${OUTPUT_SITEMAP}`);
  console.log(`Generated sitemap with ${urls.length} URLs -> ${OUTPUT_SITEMAP_ROOT}`);
}

main();
