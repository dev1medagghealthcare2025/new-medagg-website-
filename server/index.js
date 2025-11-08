const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize cache with a 5-minute TTL
const cache = new NodeCache({ stdTTL: 300 });

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());

// WordPress REST API base URL
const WP_BASE_URL = 'https://medagghealthcare.com/wp-json/wp/v2';

/**
 * Fetches data from the WordPress REST API with caching.
 * @param {string} endpoint - The API endpoint to fetch (e.g., '/posts').
 * @param {object} params - Query parameters for the request.
 * @returns {Promise<object>} A promise that resolves to the API response.
 */
async function fetchFromAPI(endpoint, params = {}) {
  const cacheKey = `${endpoint}?${JSON.stringify(params)}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${WP_BASE_URL}${endpoint}`, { params });
    const data = {
      data: response.data,
      headers: response.headers
    };
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching from WordPress API endpoint "${endpoint}":`, error.message);
    throw new Error(`Failed to fetch data from ${endpoint}.`);
  }
}

// Route: Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const { page = 1, per_page = 10, search, category } = req.query;
    const params = {
      page,
      per_page,
      search,
      categories: category,
      orderby: 'modified',
      order: 'desc',
      _embed: true // Embed linked resources like author, images, and terms
    };

    const { data, headers } = await fetchFromAPI('/posts', params);

    const processedPosts = data.map(post => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      link: post.link,
      author: post._embedded?.author?.[0]?.name || 'Medagg Healthcare',
      date: post.date,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      categories: post._embedded?.['wp:term']?.[0]?.map(c => c.name) || [],
      tags: post._embedded?.['wp:term']?.[1]?.map(t => t.name) || [],
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
    }));

    res.json({
      posts: processedPosts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: parseInt(headers['x-wp-totalpages'] || 1),
        total: parseInt(headers['x-wp-total'] || 0),
        perPage: parseInt(per_page)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts', message: error.message });
  }
});

// Route: Get a single post by its slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const params = { slug, _embed: true };
    const { data } = await fetchFromAPI('/posts', params);

    if (data.length > 0) {
      const post = data[0];
      const processedPost = {
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        link: post.link,
        author: post._embedded?.author?.[0]?.name || 'Medagg Healthcare',
        date: post.date,
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        categories: post._embedded?.['wp:term']?.[0]?.map(c => c.name) || [],
        tags: post._embedded?.['wp:term']?.[1]?.map(t => t.name) || [],
        featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
      };
      res.json(processedPost);
    } else {
      res.status(404).json({ error: 'Post not found', message: `Post with slug "${slug}" not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post', message: error.message });
  }
});

// Route: Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const { data } = await fetchFromAPI('/categories', { per_page: 100 });
    const categories = data.map(cat => ({ id: cat.id, name: cat.name, slug: cat.slug, count: cat.count }));
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories', message: error.message });
  }
});

// Route: Get all tags
app.get('/api/tags', async (req, res) => {
  try {
    const { data } = await fetchFromAPI('/tags', { per_page: 100 });
    const tags = data.map(tag => ({ id: tag.id, name: tag.name, slug: tag.slug, count: tag.count }));
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags', message: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    method: 'WordPress REST API',
    api_url: WP_BASE_URL
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Blog API Server (WP REST) running on http://localhost:${PORT}`);
  console.log(`📝 API URL: ${WP_BASE_URL}`);
  console.log(`🔄 Cache TTL: 300 seconds (5 minutes)`);
  console.log('✨ Server is ready to serve blog content via the REST API!');
});

module.exports = app;
