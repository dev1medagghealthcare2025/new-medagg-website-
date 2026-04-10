import path from 'node:path';
import fs from 'node:fs';

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');
}

export default function sitemap() {
  const siteUrl = getSiteUrl();

  const staticPaths = [
    '/',
    '/about',
    '/gallery',
    '/career',
    '/contact-us',
    '/policy',
    '/terms',
    '/join-with-us',
    '/investor',
    '/testimonials',
    '/blog',
    '/irpreneur2025',
    '/prostate-artery-embolization-pae',
    '/genicular-artery-embolization-gae',
    '/thyroid-nodule-ablation',
    '/varicocele-embolization',
    '/varicose-vein',
    '/fallopian-tube-recanalization-ftr',
    '/uterine-artery-embolization-uae',
    '/breast-nodule-vae',
    '/breast-nodule-cryoablation',
    '/breast-nodule-rfa',
    '/plantar-fascial-embolization',
    '/transcatheter-aortic-valve-replacement',
    '/endovascular-coiling',
    '/radiofrequency-ablation-for-avm',
    '/cto',
    '/rfa',
    '/y90-radioembolization-tare',
    '/transarterial-chemoembolization-tace',
    '/piles-hemorrhoids',
    '/diabetic-foot',
    '/frozen-shoulder',
  ];

  const blogPostsPath = path.resolve(process.cwd(), '..', 'src', 'data', 'blogPosts.json');
  let blogPaths = [];
  try {
    const raw = fs.readFileSync(blogPostsPath, 'utf8');
    const posts = JSON.parse(raw);
    if (Array.isArray(posts)) {
      blogPaths = posts
        .filter((p) => p && p.slug)
        .map((p) => ({
          path: `/blog/${p.slug}`,
          lastModified: p.date || undefined,
        }));
    }
  } catch {
    blogPaths = [];
  }

  const staticEntries = staticPaths.map((p) => ({
    url: `${siteUrl}${p}`,
  }));

  const blogEntries = blogPaths.map((b) => ({
    url: `${siteUrl}${b.path}`,
    lastModified: b.lastModified,
  }));

  return [...staticEntries, ...blogEntries];
}
