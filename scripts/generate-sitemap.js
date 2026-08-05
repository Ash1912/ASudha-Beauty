// Simple sitemap generator without external dependencies
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = '';
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

// List of all static routes
const staticRoutes = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/shop', priority: 0.9, changefreq: 'daily' },
  { url: '/about', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog', priority: 0.8, changefreq: 'weekly' },
  { url: '/wishlist', priority: 0.5, changefreq: 'monthly' },
  { url: '/login', priority: 0.5, changefreq: 'monthly' },
  { url: '/signup', priority: 0.5, changefreq: 'monthly' },
  { url: '/profile', priority: 0.5, changefreq: 'monthly' },
  { url: '/search', priority: 0.6, changefreq: 'weekly' },
];

// You can also dynamically generate product URLs if you have access to your products data
// For now, we'll use static routes

function generateSitemap() {
  console.log('🚀 Generating sitemap for ASudha Beauty...');
  console.log(`📁 Base URL: ${BASE_URL}`);
  
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  staticRoutes.forEach(route => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${BASE_URL}${route.url}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${route.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  try {
    fs.writeFileSync(OUTPUT_FILE, sitemap);
    console.log(`✅ Sitemap generated successfully with ${staticRoutes.length} URLs`);
    console.log(`📁 Saved to: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ Error writing sitemap file:', error.message);
  }
}

// Run the generator
generateSitemap();