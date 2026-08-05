import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
   FaClock, FaUser, FaComment, 
  FaArrowRight, FaChevronLeft, FaChevronRight, 
  FaHeart, FaEye
} from 'react-icons/fa';

const Blog = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Flawless Foundation Application",
      excerpt: "Master the art of foundation application with these professional tips and tricks for a seamless, natural-looking finish.",
      content: "Full article content here...",
      image: "/assets/images/blog/foundation-tips.png",
      category: "Makeup Tips",
      tags: ["Foundation", "Makeup Tips", "Beginner"],
      author: "Sarah Johnson",
      authorAvatar: "/assets/images/team/vikas.jpg",
      date: "March 15, 2026",
      readTime: "5 min read",
      views: 1245,
      comments: 23,
      likes: 89,
      featured: true
    },
    {
      id: 2,
      title: "The Ultimate Guide to Lipstick Shades for Every Skin Tone",
      excerpt: "Finding the perfect lipstick shade can be overwhelming. This guide breaks down the best colors for your skin tone.",
      image: "/assets/images/blog/lipstick-guide.png",
      category: "Lipstick",
      tags: ["Lipstick", "Shades", "Skin Tone"],
      author: "Priya Patel",
      authorAvatar: "/assets/images/team/priya.jpg",
      date: "March 10, 2026",
      readTime: "7 min read",
      views: 2103,
      comments: 45,
      likes: 156,
      featured: true
    },
    {
      id: 3,
      title: "Skincare Prep: The Secret to Long-Lasting Makeup",
      excerpt: "Learn how proper skincare preparation can make your makeup last longer and look better throughout the day.",
      image: "/assets/images/blog/skincare-prep.png",
      category: "Skincare",
      tags: ["Skincare", "Preparation", "Long-lasting"],
      author: "Michael Chen",
      authorAvatar: "/assets/images/team/michael.jpg",
      date: "March 5, 2026",
      readTime: "6 min read",
      views: 1876,
      comments: 32,
      likes: 112,
      featured: true
    },
    {
      id: 4,
      title: "5 Essential Brushes Every Makeup Beginner Needs",
      excerpt: "Starting your makeup journey? Here are the 5 must-have brushes that will help you create endless looks.",
      image: "/assets/images/blog/brushes-guide.png",
      category: "Tools",
      tags: ["Brushes", "Tools", "Beginner"],
      author: "David Kim",
      authorAvatar: "/assets/images/team/david.jpg",
      date: "February 28, 2026",
      readTime: "4 min read",
      views: 987,
      comments: 15,
      likes: 67,
      featured: false
    },
    {
      id: 5,
      title: "Day to Night: Transforming Your Makeup Look",
      excerpt: "Learn how to quickly transform your daytime makeup into a stunning evening look with just a few simple changes.",
      image: "/assets/images/blog/day-to-night.png",
      category: "Makeup Tips",
      tags: ["Day to Night", "Transformation", "Tips"],
      author: "Sarah Johnson",
      authorAvatar: "/assets/images/team/sarah.jpg",
      date: "February 20, 2026",
      readTime: "6 min read",
      views: 1567,
      comments: 28,
      likes: 103,
      featured: false
    },
    {
      id: 6,
      title: "The Rise of Clean Beauty: What You Need to Know",
      excerpt: "Clean beauty is more than a trend. Discover what it really means and why it matters for your health and the planet.",
      image: "/assets/images/blog/clean-beauty.png",
      category: "Beauty Trends",
      tags: ["Clean Beauty", "Trends", "Sustainability"],
      author: "Priya Patel",
      authorAvatar: "/assets/images/team/priya.jpg",
      date: "February 12, 2026",
      readTime: "8 min read",
      views: 2345,
      comments: 52,
      likes: 178,
      featured: false
    },
    {
      id: 7,
      title: "How to Find Your Signature Scent",
      excerpt: "Choosing a fragrance is deeply personal. This guide will help you navigate the world of scents and find your signature.",
      image: "/assets/images/blog/signature-scent.png",
      category: "Fragrance",
      tags: ["Fragrance", "Scent", "Personal"],
      author: "Michael Chen",
      authorAvatar: "/assets/images/team/michael.jpg",
      date: "February 5, 2026",
      readTime: "5 min read",
      views: 1432,
      comments: 31,
      likes: 94,
      featured: false
    }
  ];

  // Categories for filtering
  const categories = [
    { name: 'all', count: blogPosts.length },
    { name: 'Makeup Tips', count: blogPosts.filter(p => p.category === 'Makeup Tips').length },
    { name: 'Lipstick', count: blogPosts.filter(p => p.category === 'Lipstick').length },
    { name: 'Skincare', count: blogPosts.filter(p => p.category === 'Skincare').length },
    { name: 'Tools', count: blogPosts.filter(p => p.category === 'Tools').length },
    { name: 'Beauty Trends', count: blogPosts.filter(p => p.category === 'Beauty Trends').length },
    { name: 'Fragrance', count: blogPosts.filter(p => p.category === 'Fragrance').length }
  ];

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Featured posts carousel
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    },

    // Hero Section
    hero: {
      background: isDarkMode 
        ? 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)'
        : 'linear-gradient(135deg, #fff5f7 0%, #ffe4e8 100%)',
      padding: windowWidth <= 768 ? '3rem 1rem' : '4rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    heroPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(232,140,166,0.1) 0%, transparent 50%)',
      pointerEvents: 'none'
    },
    heroContent: {
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    },
    heroTitle: {
      fontSize: windowWidth <= 480 ? '2rem' : windowWidth <= 768 ? '2.5rem' : '3rem',
      fontWeight: '800',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #e88ca6, #f5b3c5)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroText: {
      fontSize: windowWidth <= 480 ? '1rem' : '1.2rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      lineHeight: '1.8',
      marginBottom: '2rem'
    },

    // Search Bar
    searchContainer: {
      maxWidth: '600px',
      margin: '0 auto',
      position: 'relative'
    },
    searchInput: {
      width: '100%',
      padding: '1rem 1rem 1rem 3rem',
      fontSize: '1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      border: `2px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      borderRadius: '50px',
      color: isDarkMode ? '#ffffff' : '#333333',
      transition: 'all 0.3s ease',
      outline: 'none',
      ':focus': {
        borderColor: '#e88ca6',
        boxShadow: '0 0 0 3px rgba(232,140,166,0.2)'
      }
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: isDarkMode ? '#999' : '#666',
      fontSize: '1.2rem'
    },

    // Featured Posts Carousel
    featuredSection: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 2rem'
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '2rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      position: 'relative',
      paddingBottom: '1rem',
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '80px',
        height: '4px',
        background: 'linear-gradient(90deg, #e88ca6, #f5b3c5)',
        borderRadius: '2px'
      }
    },
    featuredCarousel: {
      position: 'relative',
      borderRadius: '2rem',
      overflow: 'hidden',
      boxShadow: isDarkMode 
        ? '0 20px 40px rgba(0,0,0,0.4)' 
        : '0 20px 40px rgba(232,140,166,0.2)',
      height: windowWidth <= 768 ? '300px' : '400px'
    },
    featuredSlide: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
      transition: 'opacity 0.5s ease',
      pointerEvents: 'none',
      ...(featuredIndex === 0 && { opacity: 1, pointerEvents: 'auto' })
    },
    featuredImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    featuredOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '3rem',
      color: '#ffffff'
    },
    featuredTitle: {
      fontSize: windowWidth <= 480 ? '1.5rem' : '2rem',
      fontWeight: '700',
      marginBottom: '0.5rem'
    },
    featuredExcerpt: {
      fontSize: '1rem',
      marginBottom: '1rem',
      opacity: '0.9',
      maxWidth: '600px'
    },
    featuredMeta: {
      display: 'flex',
      gap: '1.5rem',
      fontSize: '0.9rem',
      opacity: '0.8',
      marginBottom: '1rem'
    },
    featuredButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '2rem',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      width: 'fit-content',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      }
    },
    carouselControls: {
      position: 'absolute',
      bottom: '1rem',
      right: '1rem',
      display: 'flex',
      gap: '0.5rem',
      zIndex: 10
    },
    carouselButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.2)',
      border: '2px solid #ffffff',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        borderColor: '#e88ca6'
      }
    },
    carouselDots: {
      position: 'absolute',
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '0.5rem',
      zIndex: 10
    },
    carouselDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.5)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: 'none',
      padding: 0
    },
    carouselDotActive: {
      width: '30px',
      borderRadius: '5px',
      backgroundColor: '#e88ca6'
    },

    // Main Content Layout
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 2rem',
      display: 'grid',
      gridTemplateColumns: windowWidth <= 768 ? '1fr' : '3fr 1fr',
      gap: '3rem'
    },

    // Blog Grid
    blogGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 480 ? '1fr' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
      gap: '2rem'
    },
    blogCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      boxShadow: isDarkMode 
        ? '0 10px 30px rgba(0,0,0,0.2)' 
        : '0 10px 30px rgba(232,140,166,0.1)',
      transition: 'all 0.3s ease',
      border: `1px solid ${isDarkMode ? '#404040' : 'transparent'}`,
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: isDarkMode 
          ? '0 20px 40px rgba(0,0,0,0.3)' 
          : '0 20px 40px rgba(232,140,166,0.15)',
        borderColor: '#e88ca6'
      }
    },
    blogImageContainer: {
      position: 'relative',
      height: '200px',
      overflow: 'hidden'
    },
    blogImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
      ':hover': {
        transform: 'scale(1.1)'
      }
    },
    blogCategory: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      padding: '0.25rem 1rem',
      borderRadius: '2rem',
      fontSize: '0.8rem',
      fontWeight: '600',
      zIndex: 2
    },
    blogContent: {
      padding: '1.5rem'
    },
    blogTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      marginBottom: '0.75rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      lineHeight: '1.4'
    },
    blogExcerpt: {
      fontSize: '0.95rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      lineHeight: '1.6',
      marginBottom: '1rem',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    blogMeta: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      fontSize: '0.85rem',
      color: isDarkMode ? '#999' : '#999',
      marginBottom: '1rem'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem'
    },
    blogFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    readMoreButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#e88ca6',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'gap 0.3s ease',
      ':hover': {
        gap: '0.75rem'
      }
    },
    postStats: {
      display: 'flex',
      gap: '1rem',
      color: isDarkMode ? '#999' : '#999',
      fontSize: '0.85rem'
    },

    // Sidebar
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    sidebarWidget: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      padding: '1.5rem',
      borderRadius: '1.5rem',
      boxShadow: isDarkMode 
        ? '0 10px 30px rgba(0,0,0,0.2)' 
        : '0 10px 30px rgba(232,140,166,0.1)'
    },
    widgetTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      position: 'relative',
      paddingBottom: '0.75rem',
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '40px',
        height: '3px',
        background: 'linear-gradient(90deg, #e88ca6, #f5b3c5)',
        borderRadius: '2px'
      }
    },
    categoryList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    categoryItem: {
      marginBottom: '0.75rem'
    },
    categoryLink: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0',
      color: isDarkMode ? '#cccccc' : '#666666',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        color: '#e88ca6'
      }
    },
    categoryCount: {
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      padding: '0.2rem 0.5rem',
      borderRadius: '1rem',
      fontSize: '0.8rem'
    },
    popularPost: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      paddingBottom: '1.5rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      ':last-child': {
        marginBottom: 0,
        paddingBottom: 0,
        borderBottom: 'none'
      }
    },
    popularImage: {
      width: '70px',
      height: '70px',
      borderRadius: '0.75rem',
      objectFit: 'cover'
    },
    popularInfo: {
      flex: 1
    },
    popularTitle: {
      fontSize: '0.95rem',
      fontWeight: '600',
      marginBottom: '0.25rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      textDecoration: 'none',
      ':hover': {
        color: '#e88ca6'
      }
    },
    popularDate: {
      fontSize: '0.8rem',
      color: isDarkMode ? '#999' : '#999'
    },
    tagCloud: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    tag: {
      padding: '0.3rem 1rem',
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      color: isDarkMode ? '#cccccc' : '#666666',
      borderRadius: '2rem',
      fontSize: '0.85rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff'
      }
    },
    newsletterForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    newsletterInput: {
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '0.75rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      fontSize: '0.95rem',
      outline: 'none',
      ':focus': {
        borderColor: '#e88ca6'
      }
    },
    newsletterButton: {
      padding: '0.75rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      }
    },

    // Pagination
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '3rem'
    },
    pageButton: {
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      borderRadius: '0.5rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },
    activePage: {
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      borderColor: '#e88ca6'
    }
  };

  return (
    <div style={themeStyles.container}>
      {/* Hero Section */}
      <section style={themeStyles.hero}>
        <div style={themeStyles.heroPattern} />
        <div style={themeStyles.heroContent}>
          <h1 style={themeStyles.heroTitle}>ASudha Beauty Blog</h1>
          <p style={themeStyles.heroText}>
            Discover expert tips, beauty trends, and product guides to help you look and feel your best.
          </p>
          
          {/* Search Bar */}
          {/* <div style={themeStyles.searchContainer}>
            <FaSearch style={themeStyles.searchIcon} />
            <input
              type="text"
              placeholder="Search articles..."
              style={themeStyles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
        </div>
      </section>

      {/* Featured Posts Carousel */}
      {featuredPosts.length > 0 && (
        <section style={themeStyles.featuredSection}>
          <h2 style={themeStyles.sectionTitle}>Featured Posts</h2>
          <div style={themeStyles.featuredCarousel}>
            {featuredPosts.map((post, index) => (
              <div
                key={post.id}
                style={{
                  ...themeStyles.featuredSlide,
                  ...(featuredIndex === index && { opacity: 1, pointerEvents: 'auto' })
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={themeStyles.featuredImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/1200x400/f8f8f8/e88ca6?text=" + post.title;
                  }}
                />
                <div style={themeStyles.featuredOverlay}>
                  <span style={themeStyles.blogCategory}>{post.category}</span>
                  <h3 style={themeStyles.featuredTitle}>{post.title}</h3>
                  <p style={themeStyles.featuredExcerpt}>{post.excerpt}</p>
                  <div style={themeStyles.featuredMeta}>
                    <span><FaUser /> {post.author}</span>
                    <span><FaClock /> {post.readTime}</span>
                    <span><FaComment /> {post.comments}</span>
                  </div>
                  <Link to={`/blog/${post.id}`} style={themeStyles.featuredButton}>
                    Read Article <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}

            {/* Carousel Controls */}
            <div style={themeStyles.carouselControls}>
              <button
                style={themeStyles.carouselButton}
                onClick={() => setFeaturedIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)}
              >
                <FaChevronLeft />
              </button>
              <button
                style={themeStyles.carouselButton}
                onClick={() => setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length)}
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Carousel Dots */}
            <div style={themeStyles.carouselDots}>
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  style={{
                    ...themeStyles.carouselDot,
                    ...(featuredIndex === index && themeStyles.carouselDotActive)
                  }}
                  onClick={() => setFeaturedIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div style={themeStyles.mainContent}>
        {/* Blog Posts Grid */}
        <div>
          <div style={themeStyles.blogGrid}>
            {currentPosts.map(post => (
              <article key={post.id} style={themeStyles.blogCard}>
                <div style={themeStyles.blogImageContainer}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={themeStyles.blogImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x300/f8f8f8/e88ca6?text=" + post.title;
                    }}
                  />
                  <span style={themeStyles.blogCategory}>{post.category}</span>
                </div>
                <div style={themeStyles.blogContent}>
                  <h3 style={themeStyles.blogTitle}>{post.title}</h3>
                  <p style={themeStyles.blogExcerpt}>{post.excerpt}</p>
                  <div style={themeStyles.blogMeta}>
                    <span style={themeStyles.metaItem}><FaUser /> {post.author}</span>
                    <span style={themeStyles.metaItem}><FaClock /> {post.readTime}</span>
                    <span style={themeStyles.metaItem}><FaComment /> {post.comments}</span>
                  </div>
                  <div style={themeStyles.blogFooter}>
                    <Link to={`/blog/${post.id}`} style={themeStyles.readMoreButton}>
                      Read More <FaArrowRight />
                    </Link>
                    <div style={themeStyles.postStats}>
                      <span><FaEye /> {post.views}</span>
                      <span><FaHeart /> {post.likes}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={themeStyles.pagination}>
              <button
                style={themeStyles.pageButton}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  style={{
                    ...themeStyles.pageButton,
                    ...(currentPage === i + 1 && themeStyles.activePage)
                  }}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                style={themeStyles.pageButton}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={themeStyles.sidebar}>
          {/* Categories Widget */}
          <div style={themeStyles.sidebarWidget}>
            <h3 style={themeStyles.widgetTitle}>Categories</h3>
            <ul style={themeStyles.categoryList}>
              {categories.map(category => (
                <li key={category.name} style={themeStyles.categoryItem}>
                  <div
                    style={themeStyles.categoryLink}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setCurrentPage(1);
                    }}
                  >
                    <span style={{ textTransform: 'capitalize' }}>
                      {category.name === 'all' ? 'All Posts' : category.name}
                    </span>
                    <span style={themeStyles.categoryCount}>{category.count}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Posts Widget */}
          <div style={themeStyles.sidebarWidget}>
            <h3 style={themeStyles.widgetTitle}>Popular Posts</h3>
            {blogPosts.sort((a, b) => b.views - a.views).slice(0, 3).map(post => (
              <div key={post.id} style={themeStyles.popularPost}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={themeStyles.popularImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/70x70/f8f8f8/e88ca6?text=Post";
                  }}
                />
                <div style={themeStyles.popularInfo}>
                  <Link to={`/blog/${post.id}`} style={themeStyles.popularTitle}>
                    {post.title}
                  </Link>
                  <div style={themeStyles.popularDate}>{post.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags Widget */}
          <div style={themeStyles.sidebarWidget}>
            <h3 style={themeStyles.widgetTitle}>Popular Tags</h3>
            <div style={themeStyles.tagCloud}>
              {['Makeup', 'Skincare', 'Lipstick', 'Foundation', 'Beauty Tips', 'Trends', 'Brushes', 'Clean Beauty'].map(tag => (
                <span
                  key={tag}
                  style={themeStyles.tag}
                  onClick={() => setSearchTerm(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter Widget */}
          <div style={themeStyles.sidebarWidget}>
            <h3 style={themeStyles.widgetTitle}>Newsletter</h3>
            <p style={{ color: isDarkMode ? '#ccc' : '#666', marginBottom: '1rem' }}>
              Subscribe to get beauty tips and product updates directly in your inbox.
            </p>
            <form style={themeStyles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                style={themeStyles.newsletterInput}
              />
              <button type="submit" style={themeStyles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;