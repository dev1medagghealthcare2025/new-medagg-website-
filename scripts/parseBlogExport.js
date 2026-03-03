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

function generateTagsFromTitle(title) {
  if (!title) return [];
  const stopWords = new Set(['a', 'an', 'the', 'in', 'on', 'for', 'and', 'with', 'to', 'of', 'is', 'it', 'how', 'what', 'when', 'why', 'can', 'be', 'vs', 'or', 'your', 'you', 'should', 'know']);
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word))
    .slice(0, 5);
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

// --- Frontmatter (.md) support helpers ---
function parseFrontmatter(md) {
  if (!md) return { data: {}, content: '' };
  const fmMatch = md.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!fmMatch) return { data: {}, content: md };
  const fmBlock = fmMatch[1];
  const rest = md.slice(fmMatch[0].length);
  const data = {};
  fmBlock.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) return;
    const key = m[1];
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith('\'') && val.endsWith('\''))) {
      val = val.slice(1, -1);
    }
    if (/^\[.*\]$/.test(val)) {
      const inner = val.slice(1, -1).trim();
      data[key] = inner ? inner.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')) : [];
    } else {
      data[key] = val;
    }
  });
  return { data, content: rest };
}

function basicMarkdownToHtml(md) {
  if (!md) return '';

  let html = md;


  // Block-level: Headings
  html = html.replace(/^######\s*(.*)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s*(.*)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s*(.*)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s*(.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s*(.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s*(.*)$/gm, '<h1>$1</h1>');

  // Block-level: Unordered lists - This is more complex, handle it with paragraphs
  // The paragraph splitter will handle list blocks

  // Inline-level: Images and Links
  html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Inline-level: Bold
  html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');

  // Paragraphs and Lists
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';

      // Remove decorative separators (long runs of -, _, or *)
      if (/^[-_*]{3,}$/.test(trimmed)) {
        return '';
      }

      // Handle setext-style headings (underline with === or ---)
      const setextMatch = trimmed.split(/\n/);
      if (setextMatch.length === 2 && /^=\s*=*$/.test(setextMatch[1])) {
        const text = setextMatch[0].trim();
        return `<h1>${text}</h1>`;
      }
      if (setextMatch.length === 2 && /^-\s*-*$/.test(setextMatch[1])) {
        const text = setextMatch[0].trim();
        return `<h2>${text}</h2>`;
      }

      // Handle Markdown tables
      if (trimmed.includes('|') && trimmed.includes('---')) {
        const lines = trimmed.split('\n').map(l => l.trim());
        if (lines.length > 1 && lines[1].match(/^\|?[-|:\s]+[-|:]\|?$/)) {
          const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
          const headerHtml = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;

          const bodyRows = lines.slice(2);
          const bodyHtml = `<tbody>${bodyRows.map(rowLine => {
            const cells = rowLine.split('|').map(c => c.trim()).filter(Boolean);
            if (cells.length === headers.length) {
              return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
            }
            return '';
          }).join('')}</tbody>`;

          return `<table>${headerHtml}${bodyHtml}</table>`;
        }
      }

      // Handle unordered lists
      if (/^[-*]/.test(trimmed)) {
        const items = trimmed.split(/\n/).map(item => {
          const content = item.replace(/^\s*[-*]\s+/, '');
          return `<li>${content.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')}</li>`;
        }).join('');
        return `<ul>${items}</ul>`;
      }

      // Handle ordered lists (1. 2. 3.)
      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed.split(/\n/).map(item => {
          const content = item.replace(/^\s*\d+\.\s+/, '');
          return `<li>${content.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')}</li>`;
        }).join('');
        return `<ol>${items}</ol>`;
      }

      // If it's already a block-level element, leave it
      if (/^<(h[1-6]|ul|ol|p|blockquote|img)/.test(trimmed)) {
        return trimmed;
      }

      // Otherwise, wrap in a paragraph, converting single newlines to <br>
      const withBreaks = trimmed.replace(/\n/g, '<br/>');
      return `<p>${withBreaks}</p>`;
    })
    .join('\n');

  return html;
}

function readFrontmatterPosts(dirAbs) {
  const posts = [];
  if (!fs.existsSync(dirAbs)) return posts;
  const files = fs.readdirSync(dirAbs).filter((f) => f.toLowerCase().endsWith('.md'));
  for (const file of files) {
    if (file === 'blog_post.md') continue; // skip legacy export table
    const full = path.join(dirAbs, file);
    try {
      const raw = fs.readFileSync(full, 'utf8');
      const { data, content } = parseFrontmatter(raw);

      // Site-specific: Update 'Book an Appointment' links on the raw content
      const appointmentLinkRegex = /https:\/\/medagghealthcare\.com\/book-an-appointment[^\)]*/g;
      const updatedContent = content.replace(appointmentLinkRegex, '/contact-us');

      const title = data.title || stripHtml(updatedContent).slice(0, 80) || file.replace(/\.md$/i, '');
      const slug = (data.slug || file.replace(/\.md$/i, ''))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const date = data.date || new Date().toISOString().slice(0, 10);
      const html = basicMarkdownToHtml(updatedContent);
      const featuredImage = data.cover || extractFirstImage(html);
      const excerpt = data.excerpt || generateExcerpt(html);
      const post = {
        id: undefined,
        title,
        slug,
        date,
        status: 'publish',
        excerpt,
        content: html,
        featuredImage: featuredImage || null,
        categories: data.categories || [],
        tags: (data.tags && data.tags.length > 0) ? data.tags : generateTagsFromTitle(title),
        author: data.author || 'Medagg Healthcare',
        link: data.link || '',
      };
      if (post.slug && post.title && post.content) posts.push(post);
    } catch (e) {
      console.warn('Failed to parse frontmatter post', file, (e && e.message) || '');
    }
  }
  return posts;
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`Input file not found: ${INPUT_PATH}`);
    // continue; we may still have standalone .md files to ingest
  }
  const content = fs.existsSync(INPUT_PATH) ? fs.readFileSync(INPUT_PATH, 'utf8') : '';
  const lines = content ? content.split(/\r?\n/) : [];

  // Find header row with the post fields
  const headerIndex = lines.findIndex(l => /\|post_id\|.*\|post_name\|.*\|post_type\|/i.test(l));
  if (headerIndex === -1 && content) {
    console.error('Could not locate the detailed header row containing post_id/post_name/post_type.');
    // continue without exiting; frontmatter posts may exist
  }

  const headerLine = lines[headerIndex];
  const headerCells = parseTableLineToCells(headerLine);
  const colIndex = new Map();
  headerCells.forEach((name, idx) => colIndex.set(name, idx));

  function get(rowCells, name) {
    const idx = colIndex.get(name);
    if (idx == null) return '';
    const val = rowCells[idx];
    return (val !== undefined && val !== null) ? val : '';
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
      const existing = rowsByPostId.get(currentPostId);
      if (existing) existing.push(cells);
    } else {
      // Fallback: start a new group when title cell is non-empty
      const titleIdx = colIndex.get('title');
      const hasTitleCell = titleIdx != null && (cells[titleIdx] || '').trim().length > 3;
      if (hasTitleCell) {
        currentGroupIdx += 1;
        groupsByIndex.set(currentGroupIdx, []);
      }
      if (currentGroupIdx >= 0) {
        const existingGroup = groupsByIndex.get(currentGroupIdx);
        if (existingGroup) existingGroup.push(cells);
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
      tags: generateTagsFromTitle(title),
      author: 'Medagg Healthcare',
      link,
    };

    if (post.slug && post.title && post.content) {
      postsBySlug.set(post.slug, post);
      rowsIncluded++;
    }
  }

  // Merge in frontmatter-based posts
  try {
    const blogsDir = path.resolve(__dirname, '..', 'public', 'blogs');
    const fmPosts = readFrontmatterPosts(blogsDir);
    for (const p of fmPosts) {
      p.tags = p.tags || generateTagsFromTitle(p.title);
      postsBySlug.set(p.slug, p);
    }
  } catch (e) {
    console.warn('Frontmatter ingest skipped due to error:', (e && e.message) || '');
  }

  const posts = Array.from(postsBySlug.values())
    .filter(p => p.slug && p.title && p.content)
    // Exclude specific topics from listings
    .filter(p => {
      const denySlugs = new Set([
        // Add exact slugs here if known, e.g. 'understanding-anal-fissures-causes-symptoms-and-treatment-options'
        'piles',
      ]);
      const denyRegexes = [
        /\banal\s*fissure(s)?\b/i,
        /\bfistula(s)?\b/i,
        /\bpile(s)?\b/i,
      ];
      if (denySlugs.has((p.slug || '').toLowerCase())) return false;
      const title = p.title || '';
      if (denyRegexes.some(rx => rx.test(title))) return false;
      return true;
    })
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
