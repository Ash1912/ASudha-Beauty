// src/pages/Testimonials.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  FaStar, FaUserCircle, FaSearch, FaThumbsUp, FaRegClock,
  FaCheckCircle, FaShoppingBag, FaHeart
} from 'react-icons/fa';

const Testimonials = () => {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      role: "Beauty Enthusiast",
      avatar: null,
      rating: 5,
      date: "March 15, 2024",
      title: "Absolutely in love with these products!",
      content: "I've been using ASudha Beauty for over a year now, and I'm absolutely in love with their products! The lipsticks are long-lasting and the foundation gives me a flawless finish. Highly recommended! The customer service is exceptional and shipping is always fast.",
      productPurchased: "Matte Lipstick Collection",
      productLink: "/shop?category=lips",
      verified: true,
      helpful: 124,
      images: []
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Mumbai, India",
      role: "Makeup Artist",
      avatar: null,
      rating: 5,
      date: "February 28, 2024",
      title: "Professional grade products at affordable prices",
      content: "As a professional makeup artist, I need products that perform. ASudha's range is exceptional - the pigmentation, blendability, and longevity are top-notch. My clients always compliment the results! The foundation range has shades for every skin tone.",
      productPurchased: "Professional Face Kit",
      productLink: "/shop?category=face",
      verified: true,
      helpful: 89,
      images: []
    },
    {
      id: 3,
      name: "Emily Chen",
      location: "Singapore",
      role: "Skincare Specialist",
      avatar: null,
      rating: 5,
      date: "January 20, 2024",
      title: "Cruelty-free and effective!",
      content: "The skincare line from ASudha Beauty is amazing! The Vitamin C serum has transformed my skin, and the hydrating cleanser is so gentle yet effective. Truly cruelty-free and clean beauty. I've recommended these products to all my clients.",
      productPurchased: "Vitamin C Serum & Skincare Set",
      productLink: "/shop?category=skincare",
      verified: true,
      helpful: 56,
      images: []
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      role: "Repeat Customer",
      avatar: null,
      rating: 4,
      date: "December 10, 2023",
      title: "Great quality and fast shipping",
      content: "Great quality products at affordable prices! The nail paints are vibrant and long-lasting, and the sindoor is perfect for daily use. Fast shipping and excellent customer service. Will definitely order again!",
      productPurchased: "Nail Paint Collection & Sindoor",
      productLink: "/shop?category=nails",
      verified: true,
      helpful: 34,
      images: []
    },
    {
      id: 5,
      name: "Anita Desai",
      location: "Bangalore, India",
      role: "Beauty Blogger",
      avatar: null,
      rating: 5,
      date: "November 5, 2023",
      title: "My new go-to beauty brand",
      content: "ASudha Beauty has become my go-to brand for everyday makeup. The matte lipsticks are comfortable to wear and don't dry out my lips. The eyeshadows are incredibly pigmented and blend like a dream!",
      productPurchased: "Eyeshadow Palettes & Lipsticks",
      productLink: "/shop?category=eyes",
      verified: true,
      helpful: 78,
      images: []
    },
    {
      id: 6,
      name: "Michael Brown",
      location: "London, UK",
      role: "Beauty Enthusiast",
      avatar: null,
      rating: 5,
      date: "October 18, 2023",
      title: "Excellent vegan products",
      content: "Finally found a brand that offers high-quality vegan makeup! The foundation gives me full coverage without feeling heavy. The mascara is amazing - no clumping and lasts all day. Highly recommend!",
      productPurchased: "Foundation & Mascara",
      productLink: "/shop?category=face",
      verified: true,
      helpful: 45,
      images: []
    },
    {
      id: 7,
      name: "Neha Gupta",
      location: "Pune, India",
      role: "College Student",
      avatar: null,
      rating: 5,
      date: "September 22, 2023",
      title: "Perfect for everyday wear",
      content: "As a college student, I need makeup that's affordable but doesn't compromise on quality. ASudha Beauty products are perfect! The compact powder is my favorite - gives a natural finish and controls oil throughout the day.",
      productPurchased: "Compact Powder & Lip Balm",
      productLink: "/shop?category=face",
      verified: true,
      helpful: 29,
      images: []
    },
    {
      id: 8,
      name: "Sophia Martinez",
      location: "Los Angeles, USA",
      role: "Makeup Enthusiast",
      avatar: null,
      rating: 4,
      date: "August 30, 2023",
      title: "Beautiful packaging and great quality",
      content: "The packaging is beautiful and the products perform really well. The lipsticks are creamy and pigmented. Only giving 4 stars because I wish there were more shade options for the foundation.",
      productPurchased: "Lipstick Set",
      productLink: "/shop?category=lips",
      verified: true,
      helpful: 23,
      images: []
    }
  ];

  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        containerPadding: '1rem',
        gridColumns: '1fr',
        cardPadding: '1rem',
        fontSizeHeading: '1.5rem',
        fontSizeTitle: '1.1rem'
      };
    } else if (windowWidth <= 768) {
      return {
        containerPadding: '1.5rem',
        gridColumns: 'repeat(2, 1fr)',
        cardPadding: '1.25rem',
        fontSizeHeading: '2rem',
        fontSizeTitle: '1.2rem'
      };
    } else {
      return {
        containerPadding: '2rem',
        gridColumns: 'repeat(3, 1fr)',
        cardPadding: '1.5rem',
        fontSizeHeading: '2.5rem',
        fontSizeTitle: '1.3rem'
      };
    }
  };

  const responsive = getResponsiveStyles();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        color={i < rating ? "#ffc107" : "#e0e0e0"}
        size={windowWidth <= 480 ? 14 : 16}
      />
    ));
  };

  const filteredTestimonials = allTestimonials.filter(testimonial => {
    const matchesFilter = filter === 'all' || 
      (filter === '5star' && testimonial.rating === 5) ||
      (filter === '4star' && testimonial.rating === 4) ||
      (filter === '3star' && testimonial.rating === 3);
    
    const matchesSearch = searchTerm === '' || 
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = selectedRating === null || testimonial.rating === selectedRating;
    
    return matchesFilter && matchesSearch && matchesRating;
  });

  const averageRating = (allTestimonials.reduce((sum, t) => sum + t.rating, 0) / allTestimonials.length).toFixed(1);
  const fiveStarCount = allTestimonials.filter(t => t.rating === 5).length;
  const fourStarCount = allTestimonials.filter(t => t.rating === 4).length;
  const threeStarCount = allTestimonials.filter(t => t.rating === 3).length;

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      transition: 'all 0.3s ease',
      padding: '2rem 0'
    },
    header: {
      textAlign: 'center',
      padding: `${responsive.containerPadding} ${responsive.containerPadding} 2rem`,
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      fontSize: responsive.fontSizeHeading,
      fontWeight: '700',
      marginBottom: '1rem',
      color: isDarkMode ? '#e88ca6' : '#333',
      position: 'relative',
      display: 'inline-block',
      paddingBottom: '0.5rem'
    },
    subtitle: {
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      color: isDarkMode ? '#cccccc' : '#666',
      maxWidth: '600px',
      margin: '0 auto'
    },
    statsSection: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '1rem',
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: `0 ${responsive.containerPadding}`
    },
    statCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      padding: '1.5rem',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    statNumber: {
      fontSize: windowWidth <= 480 ? '2rem' : '2.5rem',
      fontWeight: '700',
      color: '#e88ca6'
    },
    statLabel: {
      fontSize: windowWidth <= 480 ? '0.8rem' : '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666',
      marginTop: '0.5rem'
    },
    filterBar: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: `0 ${responsive.containerPadding}`
    },
    filterButtons: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    filterButton: {
      padding: '0.5rem 1rem',
      borderRadius: '2rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      color: isDarkMode ? '#cccccc' : '#666',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.9rem'
    },
    activeFilterButton: {
      backgroundColor: '#e88ca6',
      borderColor: '#e88ca6',
      color: '#ffffff'
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      padding: '0.5rem 1rem',
      borderRadius: '2rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    searchInput: {
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      color: isDarkMode ? '#ffffff' : '#333',
      fontSize: '0.9rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: responsive.gridColumns,
      gap: '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: `0 ${responsive.containerPadding}`
    },
    testimonialCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1rem',
      padding: responsive.cardPadding,
      boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      border: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      ':hover': {
        transform: 'translateY(-4px)',
        boxShadow: isDarkMode ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.1)'
      }
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    userInfo: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center'
    },
    avatar: {
      width: windowWidth <= 480 ? '40px' : '48px',
      height: windowWidth <= 480 ? '40px' : '48px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: windowWidth <= 480 ? '1.2rem' : '1.5rem'
    },
    nameSection: {
      flex: 1
    },
    name: {
      fontWeight: '600',
      fontSize: '1rem',
      marginBottom: '0.25rem',
      color: isDarkMode ? '#ffffff' : '#333'
    },
    location: {
      fontSize: '0.75rem',
      color: isDarkMode ? '#999' : '#999'
    },
    verifiedBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.7rem',
      color: '#4caf50'
    },
    rating: {
      display: 'flex',
      gap: '0.2rem',
      marginBottom: '0.5rem'
    },
    reviewTitle: {
      fontSize: responsive.fontSizeTitle,
      fontWeight: '600',
      marginBottom: '0.75rem',
      color: isDarkMode ? '#ffffff' : '#333'
    },
    reviewContent: {
      fontSize: windowWidth <= 480 ? '0.85rem' : '0.9rem',
      lineHeight: '1.6',
      color: isDarkMode ? '#cccccc' : '#666',
      marginBottom: '1rem'
    },
    productLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.4rem 0.8rem',
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8',
      borderRadius: '2rem',
      fontSize: '0.8rem',
      color: '#e88ca6',
      textDecoration: 'none',
      marginBottom: '1rem',
      transition: 'all 0.3s ease'
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      fontSize: '0.75rem',
      color: isDarkMode ? '#999' : '#999'
    },
    helpfulButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      cursor: 'pointer',
      transition: 'color 0.3s ease'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      gridColumn: '1 / -1'
    }
  };

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>Customer Reviews</h1>
        <p style={themeStyles.subtitle}>
          Join thousands of happy customers who love ASudha Beauty. 
          See what they have to say about our products!
        </p>
      </div>

      {/* Stats Section */}
      <div style={themeStyles.statsSection}>
        <div style={themeStyles.statCard}>
          <div style={themeStyles.statNumber}>{averageRating}</div>
          <div style={themeStyles.rating}>{renderStars(Math.round(averageRating))}</div>
          <div style={themeStyles.statLabel}>Average Rating</div>
        </div>
        <div style={themeStyles.statCard}>
          <div style={themeStyles.statNumber}>{allTestimonials.length}+</div>
          <div style={themeStyles.statLabel}>Verified Reviews</div>
        </div>
        <div style={themeStyles.statCard}>
          <div style={themeStyles.statNumber}>98%</div>
          <div style={themeStyles.statLabel}>Would Recommend</div>
        </div>
        <div style={themeStyles.statCard}>
          <div style={themeStyles.statNumber}>10k+</div>
          <div style={themeStyles.statLabel}>Happy Customers</div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${responsive.containerPadding} 2rem` }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span>5 Star</span>
              <div style={{ flex: 1, height: '8px', backgroundColor: isDarkMode ? '#404040' : '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(fiveStarCount / allTestimonials.length) * 100}%`, height: '100%', backgroundColor: '#ffc107' }} />
              </div>
              <span>{fiveStarCount}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span>4 Star</span>
              <div style={{ flex: 1, height: '8px', backgroundColor: isDarkMode ? '#404040' : '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(fourStarCount / allTestimonials.length) * 100}%`, height: '100%', backgroundColor: '#ffc107' }} />
              </div>
              <span>{fourStarCount}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span>3 Star</span>
              <div style={{ flex: 1, height: '8px', backgroundColor: isDarkMode ? '#404040' : '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(threeStarCount / allTestimonials.length) * 100}%`, height: '100%', backgroundColor: '#ffc107' }} />
              </div>
              <span>{threeStarCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={themeStyles.filterBar}>
        <div style={themeStyles.filterButtons}>
          <button 
            style={{...themeStyles.filterButton, ...(filter === 'all' ? themeStyles.activeFilterButton : {})}}
            onClick={() => setFilter('all')}
          >
            All Reviews
          </button>
          <button 
            style={{...themeStyles.filterButton, ...(filter === '5star' ? themeStyles.activeFilterButton : {})}}
            onClick={() => setFilter('5star')}
          >
            5 Star
          </button>
          <button 
            style={{...themeStyles.filterButton, ...(filter === '4star' ? themeStyles.activeFilterButton : {})}}
            onClick={() => setFilter('4star')}
          >
            4 Star
          </button>
          <button 
            style={{...themeStyles.filterButton, ...(filter === '3star' ? themeStyles.activeFilterButton : {})}}
            onClick={() => setFilter('3star')}
          >
            3 Star
          </button>
        </div>
        
        <div style={themeStyles.searchBox}>
          <FaSearch color={isDarkMode ? '#999' : '#666'} />
          <input
            type="text"
            placeholder="Search reviews..."
            style={themeStyles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Reviews Grid */}
      <div style={themeStyles.grid}>
        {filteredTestimonials.length > 0 ? (
          filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} style={themeStyles.testimonialCard}>
              <div style={themeStyles.cardHeader}>
                <div style={themeStyles.userInfo}>
                  <div style={themeStyles.avatar}>
                    <FaUserCircle />
                  </div>
                  <div style={themeStyles.nameSection}>
                    <div style={themeStyles.name}>{testimonial.name}</div>
                    <div style={themeStyles.location}>{testimonial.location}</div>
                    {testimonial.verified && (
                      <div style={themeStyles.verifiedBadge}>
                        <FaCheckCircle size={12} /> Verified Purchase
                      </div>
                    )}
                  </div>
                </div>
                <div style={themeStyles.rating}>
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              
              <h3 style={themeStyles.reviewTitle}>{testimonial.title}</h3>
              <p style={themeStyles.reviewContent}>{testimonial.content}</p>
              
              <Link to={testimonial.productLink} style={themeStyles.productLink}>
                <FaShoppingBag size={12} /> {testimonial.productPurchased}
              </Link>
              
              <div style={themeStyles.cardFooter}>
                <div style={themeStyles.helpfulButton}>
                  <FaThumbsUp /> Helpful ({testimonial.helpful})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaRegClock /> {testimonial.date}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={themeStyles.emptyState}>
            <p>No reviews found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Write a Review CTA */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: `0 ${responsive.containerPadding}` }}>
        <div style={{
          backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
          borderRadius: '1.5rem',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#e88ca6' }}>
            Share Your Experience
          </h3>
          <p style={{ color: isDarkMode ? '#cccccc' : '#666', marginBottom: '1rem' }}>
            Love our products? Let us know! Your review helps other customers make informed choices.
          </p>
          <Link to="/contact" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#e88ca6',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '2rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}>
            Write a Review <FaHeart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;