/*
  Parses a WordPress WXR-to-Markdown table export at public/blogs/blog_post.md
  and converts it to a JSON dataset consumable by the app.

  Output: src/data/blogPosts.json

  Strategy:
  - Find the header row that contains the post fields such as post_id|post_date|post_name|status|post_type
  - Build a column map from that header row
  - For each subsequent data row with the same number of columns, map values into an object
  - Keep rows that have a non-empty post_id and a recognizable post_type (post/blog_post) and status publish
  - Derive fields:
      id -> Number(post_id)
      title -> stripHtml(title)
      slug -> post_name
      date -> post_date
      status -> status
      content -> encoded (fallback: description)
      excerpt -> generate from content (strip tags and trim)
      featuredImage -> first <img src="..."> in content (absolute URL)
      categories, tags -> [] (not reliable from this format without more complex joins)
      author -> 'Medagg Healthcare'
      link -> link (if present)
  - Deduplicate by slug (last one wins)
*/

const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.resolve(__dirname, '..', 'public', 'blogs', 'blog_post.md');
const OUTPUT_PATH = path.resolve(__dirname, '..', 'src', 'data', 'blogPosts.json');

function stripHtml(html) {
  if (!html) return '';
  return String(html).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractFirstImage(html) {
  if (!html) return null;
  const imgMatch = String(html).match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return imgMatch ? imgMatch[1] : null;
}

function generateExcerpt(html, maxLength = 180) {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut) + '...';
}

function safeJsonWrite(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Strict mode: ignore fallback title-based groups
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function parseTableLineToCells(line) {
  // Split markdown table row by '|', trim cells, and drop the leading/trailing empty due to starting/ending pipe
  const raw = line.split('|');
  // Remove first and last if empty (common in markdown tables)
  if (raw.length && raw[0].trim() === '') raw.shift();
  if (raw.length && raw[raw.length - 1].trim() === '') raw.pop();
  return raw.map(c => c.trim());
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`Input file not found: ${INPUT_PATH}`);
    process.exit(1);
  }
  const content = fs.readFileSync(INPUT_PATH, 'utf8');
  const lines = content.split(/\r?\n/);

  // Find header row with the post fields
  const headerIndex = lines.findIndex(l => /\|post_id\|.*\|post_name\|.*\|post_type\|/i.test(l));
  if (headerIndex === -1) {
    console.error('Could not locate the detailed header row containing post_id/post_name/post_type.');
    process.exit(1);
  }

  const headerLine = lines[headerIndex];
  const headerCells = parseTableLineToCells(headerLine);
  const colIndex = new Map();
  headerCells.forEach((name, idx) => colIndex.set(name, idx));

  function get(rowCells, name) {
    const idx = colIndex.get(name);
    if (idx == null) return '';
    return rowCells[idx] ?? '';
  }

  const postsBySlug = new Map();
  const rowsByPostId = new Map();
  const groupsByIndex = new Map(); // fallback grouping by sequential titles
  let totalLinesConsidered = 0;
  let rowsWithIds = 0;
  let rowsWrongType = 0;
  let rowsWrongStatus = 0;
  let rowsMissingSlug = 0;
  let rowsIncluded = 0;

  let currentPostId = null;
  let currentGroupIdx = -1;
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    // Skip separator rows or empty
    if (!line || /^\|[-\s]+\|$/.test(line)) continue;
    if (!line.includes('|')) continue;

    const cells = parseTableLineToCells(line);
    // Strict mode: require at least 60% of header columns
    if (cells.length < Math.floor(headerCells.length * 0.6)) continue;
    totalLinesConsidered++;

    const post_id = get(cells, 'post_id');
    if (post_id) {
      currentPostId = post_id;
      rowsWithIds++;
      if (!rowsByPostId.has(post_id)) rowsByPostId.set(post_id, []);
      rowsByPostId.get(post_id).push(cells);
    } else if (currentPostId) {
      // Attach subsequent rows (with empty post_id) to the current post block
      rowsByPostId.get(currentPostId)?.push(cells);
    } else {
      // Fallback: start a new group when title cell is non-empty
      const titleIdx = colIndex.get('title');
      const hasTitleCell = titleIdx != null && (cells[titleIdx] || '').trim().length > 3;
      if (hasTitleCell) {
        currentGroupIdx += 1;
        groupsByIndex.set(currentGroupIdx, []);
      }
      if (currentGroupIdx >= 0) {
        groupsByIndex.get(currentGroupIdx)?.push(cells);
      }
      continue;
    }
  }

  function coalesce(arr) {
    for (const v of arr) { if (v) return v; }
    return '';
  }

  function deriveSlug(fromLink, fromTitle) {
    if (fromLink) {
      try {
        const u = new URL(fromLink);
        const parts = u.pathname.split('/').filter(Boolean);
        const last = parts[parts.length - 1];
        if (last) return last.toLowerCase();
      } catch {}
    }
    if (fromTitle) {
      return String(fromTitle)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 120);
    }
    return '';
  }

  // Build posts by merging rows per post_id
  for (const [pid, rows] of rowsByPostId.entries()) {
    const sample = rows[0];
    const titles = rows.map(r => stripHtml(get(r, 'title'))).filter(Boolean);
    const links = rows.map(r => get(r, 'link')).filter(Boolean);
    const postNames = rows.map(r => get(r, 'post_name')).filter(Boolean);
    const postTypes = rows.map(r => (get(r, 'post_type') || '').toLowerCase()).filter(Boolean);
    const statuses = rows.map(r => (get(r, 'status') || '').toLowerCase());
    const dates = rows.map(r => get(r, 'post_date') || get(r, 'pubDate')).filter(Boolean);
    const contents = rows.map(r => get(r, 'encoded') || get(r, 'content') || get(r, 'description')).filter(Boolean);

    const post_type = coalesce(postTypes) || '';
    if (post_type === 'attachment') { rowsWrongType++; continue; }
    const normalizedStatus = coalesce(statuses) || 'publish';
    const allowed = new Set(['publish','published','inherit']);
    if (!allowed.has(normalizedStatus)) { rowsWrongStatus++; continue; }

    const title = coalesce(titles);
    const link = coalesce(links);
    const slug = coalesce(postNames); // strict: require post_name present
    if (!slug) { rowsMissingSlug++; continue; }

    const date = coalesce(dates);
    let contentHtml = coalesce(contents);
    const featuredImage = extractFirstImage(contentHtml);
    const excerpt = generateExcerpt(contentHtml);
    if (!contentHtml && excerpt) {
      contentHtml = `<p>${excerpt}</p>`;
    }

    const post = {
      id: Number(pid) || undefined,
      title,
      slug,
      date,
      status: normalizedStatus,
      excerpt,
      content: contentHtml,
      featuredImage: featuredImage || null,
      categories: [],
      tags: [],
      author: 'Medagg Healthcare',
      link,
    };

    if (post.slug && post.title && post.content) {
      postsBySlug.set(post.slug, post);
      rowsIncluded++;
    }
  }

  const posts = Array.from(postsBySlug.values())
    .filter(p => p.slug && p.title && p.content)
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  safeJsonWrite(OUTPUT_PATH, posts);
  const diag = {
    parsed: posts.length,
    output: OUTPUT_PATH,
    totalLinesConsidered,
    rowsWithIds,
    rowsMissingSlug,
    rowsWrongType,
    rowsWrongStatus,
    rowsIncluded,
    uniqueSlugs: postsBySlug.size,
    timestamp: new Date().toISOString(),
  };
  const LOG_PATH = path.resolve(__dirname, 'parseBlogExport.log');
  try {
    fs.writeFileSync(LOG_PATH, JSON.stringify(diag, null, 2), 'utf8');
  } catch {}
  console.log(`Parsed ${posts.length} posts -> ${OUTPUT_PATH}`);
}

main();
