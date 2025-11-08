# WordPress Blog Integration - Backend API Proxy

This Express.js server acts as a proxy between your React frontend and WordPress REST API, providing caching, CORS handling, and data processing.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Setup
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your WordPress site URL
WORDPRESS_BASE_URL=https://your-wordpress-site.com/wp-json/wp/v2
PORT=4000
```

### 3. Start the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:4000`

## 📋 API Endpoints

### Posts
- `GET /api/posts` - List all posts with pagination and filters
- `GET /api/posts/:slug` - Get single post by slug

### Categories & Tags
- `GET /api/categories` - List all categories
- `GET /api/tags` - List all tags

### Health Check
- `GET /api/health` - Server status and configuration

## 🔧 Query Parameters

### Posts Endpoint (`/api/posts`)
- `page` - Page number (default: 1)
- `per_page` - Posts per page (default: 10)
- `search` - Search keyword
- `category` - Category ID filter
- `tag` - Tag ID filter
- `orderby` - Sort field (default: date)
- `order` - Sort order: asc/desc (default: desc)

### Examples
```bash
# Get first 6 posts
GET /api/posts?per_page=6

# Search for posts
GET /api/posts?search=medical

# Filter by category
GET /api/posts?category=5

# Paginated results
GET /api/posts?page=2&per_page=10
```

## 🗂️ Response Format

### Posts List Response
```json
{
  "posts": [
    {
      "id": 123,
      "title": "Post Title",
      "slug": "post-slug",
      "excerpt": "Post excerpt...",
      "content": "Full post content...",
      "date": "2024-01-01T00:00:00",
      "featuredImage": "https://example.com/image.jpg",
      "author": {
        "name": "Author Name",
        "id": 1
      },
      "categories": [...],
      "tags": [...]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "total": 50,
    "perPage": 10
  }
}
```

## ⚡ Features

- **Caching**: 60-second cache for improved performance
- **CORS**: Configured for React development servers
- **Error Handling**: Comprehensive error responses
- **Data Processing**: Clean, structured data from WordPress
- **Embedded Data**: Includes featured images, authors, categories, and tags

## 🔒 Security

- CORS restricted to specific origins
- Input validation and sanitization
- Error message sanitization
- No sensitive data exposure

## 📊 Monitoring

Check server health:
```bash
curl http://localhost:4000/api/health
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your React app URL is in the CORS origins list
2. **WordPress API Not Found**: Verify your `WORDPRESS_BASE_URL` in `.env`
3. **Cache Issues**: Restart the server to clear cache
4. **Port Conflicts**: Change `PORT` in `.env` if 4000 is occupied

### Debug Mode
Set `NODE_ENV=development` for detailed error logging.
