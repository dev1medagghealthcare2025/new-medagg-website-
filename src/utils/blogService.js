// Blog service for fetching complete content from Medagg WordPress via backend proxy
class BlogService {
  constructor() {
    this.backendUrl = 'http://localhost:4000/api';
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    this.requestTimeout = 10000; // 10 seconds
  }

  // Fetch with timeout
  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Clean HTML content
  cleanText(htmlContent) {
    if (!htmlContent) return '';
    
    // Remove HTML tags
    const withoutHtml = htmlContent.replace(/<[^>]*>/g, '');
    
    // Remove "The post ... appeared first on medagg" footer
    const withoutFooter = withoutHtml.replace(/The post .* appeared first on .*$/g, '');
    
    // Clean up extra whitespace
    return withoutFooter.replace(/\s+/g, ' ').trim();
  }

  // Extract featured image from content
  extractFeaturedImage(content) {
    if (!content) return null;
    
    // Look for img tags
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch) {
      return imgMatch[1];
    }
    
    // Look for WordPress featured image patterns
    const wpImageMatch = content.match(/wp-content\/uploads\/[^"'\s]+\.(jpg|jpeg|png|gif|webp)/i);
    if (wpImageMatch) {
      return `https://medagghealthcare.com/${wpImageMatch[0]}`;
    }
    
    return null;
  }

  // Generate excerpt from content
  generateExcerpt(content, maxLength = 150) {
    if (!content) return '';
    
    // Remove HTML tags
    const plainText = content.replace(/<[^>]*>/g, '');
    
    // Trim and limit length
    const trimmed = plainText.trim();
    if (trimmed.length <= maxLength) return trimmed;
    
    // Cut at word boundary
    const cut = trimmed.substring(0, maxLength);
    const lastSpace = cut.lastIndexOf(' ');
    
    return lastSpace > 0 ? cut.substring(0, lastSpace) + '...' : cut + '...';
  }

  // Extract slug from URL
  extractSlug(url) {
    if (!url) return '';
    
    const parts = url.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2] || '';
  }


  // Calculate reading time
  calculateReadTime(content) {
    if (!content) return '1 min read';
    
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    
    return `${minutes} min read`;
  }


  // Fetch all blog posts using backend proxy
  async fetchAllPosts(page = 1, perPage = 20) {
    const cacheKey = `posts_${page}_${perPage}`;
    
    // Check cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        return cached.data;
      }
    }

    try {
      const url = `${this.backendUrl}/posts?page=${page}&per_page=${perPage}`;
      const data = await this.fetchWithTimeout(url);
      
      if (!data.posts || !Array.isArray(data.posts)) {
        throw new Error('Invalid response format from backend');
      }
      
      // Cache the results
      this.cache.set(cacheKey, {
        data: data.posts,
        timestamp: Date.now()
      });
      
      return data.posts;
    } catch (error) {
      console.error('Error fetching WordPress posts:', error);
      
      // Return cached data if available
      if (this.cache.has(cacheKey)) {
        console.log('Returning cached data due to fetch error');
        return this.cache.get(cacheKey).data;
      }
      
      // Return fallback data
      return this.getFallbackPosts();
    }
  }

  // Fetch categories
  async fetchCategories() {
    const cacheKey = 'categories';
    
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        return cached.data;
      }
    }

    try {
      const url = `${this.backendUrl}/categories`;
      const categories = await this.fetchWithTimeout(url);
      
      this.cache.set(cacheKey, {
        data: categories,
        timestamp: Date.now()
      });
      
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // Fetch tags
  async fetchTags() {
    const cacheKey = 'tags';
    
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        return cached.data;
      }
    }

    try {
      const url = `${this.backendUrl}/tags`;
      const tags = await this.fetchWithTimeout(url);
      
      this.cache.set(cacheKey, {
        data: tags,
        timestamp: Date.now()
      });
      
      return tags;
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  }

  // Fetch single post by slug
  async fetchPostBySlug(slug) {
    // Clean the slug to remove any invalid characters (e.g., :1)
    const cleanedSlug = slug.split(':')[0];
    console.log(`Fetching post with cleaned slug: ${cleanedSlug}`);

    const cacheKey = `post_${cleanedSlug}`;
    
    // Check cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        return cached.data;
      }
    }

    try {
      const url = `${this.backendUrl}/posts/${cleanedSlug}`;
      const post = await this.fetchWithTimeout(url);
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: post,
        timestamp: Date.now()
      });
      
      return post;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      
      // Return cached data if available
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey).data;
      }
      
      return null;
    }
  }

  // Search posts with backend API
  async searchPosts(query, filters = {}, page = 1, perPage = 20) {
    try {
      let url = `${this.backendUrl}/posts?page=${page}&per_page=${perPage}`;
      
      // Add search query
      if (query) {
        url += `&search=${encodeURIComponent(query)}`;
      }
      
      // Add category filter
      if (filters.category) {
        const categories = await this.fetchCategories();
        const category = categories.find(cat => 
          cat.name && cat.name.toLowerCase().includes(filters.category.toLowerCase())
        );
        if (category) {
          url += `&category=${category.id}`;
        }
      }
      
      const data = await this.fetchWithTimeout(url);
      
      if (!data.posts || !Array.isArray(data.posts)) {
        return [];
      }
      
      // Process posts from backend response
      const processedPosts = data.posts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: this.cleanText(post.excerpt),
        content: post.content,
        featuredImage: post.featuredImage || '/Medagg_logo.jpg',
        publishedDate: post.date,
        author: post.author?.name || 'Medagg Healthcare',
        categories: post.categories?.map(cat => cat.name) || [],
        tags: post.tags?.map(tag => tag.name) || [],
        link: post.link,
        readTime: this.calculateReadTime(post.content)
      }));
      
      // Apply local date filtering if needed
      if (filters.dateRange) {
        return this.filterPostsLocally(processedPosts, '', filters);
      }
      
      return processedPosts;
    } catch (error) {
      console.error('Error searching posts:', error);
      
      // Fallback to local filtering
      const allPosts = await this.fetchAllPosts();
      return this.filterPostsLocally(allPosts, query, filters);
    }
  }
  
  // Local filtering fallback
  filterPostsLocally(posts, query, filters) {
    return posts.filter(post => {
      // Text search
      if (query) {
        const searchText = query.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(searchText);
        const matchesContent = post.content.toLowerCase().includes(searchText);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(searchText);
        
        if (!matchesTitle && !matchesContent && !matchesExcerpt) {
          return false;
        }
      }

      // Category filter
      if (filters.category) {
        const hasCategory = post.categories.some(cat => 
          cat.toLowerCase().includes(filters.category.toLowerCase())
        );
        if (!hasCategory) return false;
      }

      // Date filter
      if (filters.dateRange) {
        const postDate = new Date(post.publishedDate);
        const now = new Date();
        
        switch (filters.dateRange) {
          case 'thisWeek':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (postDate < weekAgo) return false;
            break;
          case 'thisMonth':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (postDate < monthAgo) return false;
            break;
          case 'thisYear':
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            if (postDate < yearAgo) return false;
            break;
          case 'custom':
            if (filters.startDate && postDate < new Date(filters.startDate)) return false;
            if (filters.endDate && postDate > new Date(filters.endDate)) return false;
            break;
        }
      }

      return true;
    });
  }

  // Get unique categories
  async getCategories() {
    const categories = await this.fetchCategories();
    return categories.map(cat => cat.name).sort();
  }

  // Get fallback posts when API fails
  getFallbackPosts() {
    return [
      {
        id: 1,
        title: "Welcome to Medagg Healthcare Blog",
        slug: "welcome-to-medagg-healthcare",
        excerpt: "Discover the latest in minimally invasive medical treatments and healthcare innovations at Medagg Healthcare.",
        content: "<p>Welcome to the Medagg Healthcare blog, where we share insights about cutting-edge medical treatments, patient success stories, and the latest developments in interventional radiology.</p><p>Our team of expert doctors and medical professionals are committed to providing you with valuable information about minimally invasive procedures that can improve your quality of life.</p>",
        featuredImage: "/Medagg_logo.jpg",
        publishedDate: new Date().toISOString(),
        author: "Medagg Healthcare Team",
        categories: ["Healthcare", "Medical Innovation"],
        tags: ["Healthcare", "Innovation"],
        link: "#",
        readTime: "2 min read"
      },
      {
        id: 2,
        title: "Understanding Minimally Invasive Procedures",
        slug: "understanding-minimally-invasive-procedures",
        excerpt: "Learn about the benefits of minimally invasive medical procedures and how they can help you recover faster with less pain.",
        content: "<p>Minimally invasive procedures represent a revolutionary approach to medical treatment, offering patients faster recovery times, reduced pain, and smaller incisions compared to traditional surgery.</p><p>At Medagg Healthcare, we specialize in various minimally invasive treatments including PAE, GAE, UFE, and many other innovative procedures.</p>",
        featuredImage: "/Medagg_logo.jpg",
        publishedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        author: "Dr. Medagg Team",
        categories: ["Treatment", "Medical Procedures"],
        tags: ["Minimally Invasive", "Treatment"],
        link: "#",
        readTime: "3 min read"
      }
    ];
  }

  // Get recent posts
  async getRecentPosts(limit = 5) {
    const posts = await this.fetchAllPosts();
    return posts
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      .slice(0, limit);
  }
}

// Create singleton instance
const blogService = new BlogService();

export default blogService;
