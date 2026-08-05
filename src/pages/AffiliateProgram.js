// src/pages/AffiliateProgram.js
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  FaMoneyBillWave, FaUsers, FaChartLine, FaGift, 
  FaCheckCircle, FaEnvelope, FaWhatsapp,
  FaInstagram, FaFacebook, FaTwitter, FaYoutube,
  FaLaptopCode, FaHeart, FaRocket
} from 'react-icons/fa';

const AffiliateProgram = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    platform: '',
    audienceSize: '',
    reason: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({
      name: '',
      email: '',
      website: '',
      platform: '',
      audienceSize: '',
      reason: ''
    });
  };

  const benefits = [
    {
      icon: <FaMoneyBillWave />,
      title: "Competitive Commission",
      description: "Earn up to 20% commission on every sale you generate. No caps, no limits!",
      color: "#4caf50"
    },
    {
      icon: <FaUsers />,
      title: "Dedicated Support",
      description: "Get personalized support from our affiliate team to help you maximize earnings.",
      color: "#2196f3"
    },
    {
      icon: <FaChartLine />,
      title: "Real-time Analytics",
      description: "Track your clicks, sales, and commissions with our detailed dashboard.",
      color: "#ff9800"
    },
    {
      icon: <FaGift />,
      title: "Exclusive Perks",
      description: "Free products, bonus commissions, and early access to new launches.",
      color: "#e91e63"
    },
    {
      icon: <FaLaptopCode />,
      title: "Creative Assets",
      description: "Access to banners, product images, and promotional materials.",
      color: "#9c27b0"
    },
    {
      icon: <FaRocket />,
      title: "Fast Payouts",
      description: "Get paid monthly via bank transfer, PayPal, or digital wallets.",
      color: "#f44336"
    }
  ];

  const platforms = [
    { name: "Instagram", icon: <FaInstagram />, followers: "1K+", color: "#E4405F" },
    { name: "YouTube", icon: <FaYoutube />, followers: "500+", color: "#FF0000" },
    { name: "Facebook", icon: <FaFacebook />, followers: "2K+", color: "#1877F2" },
    { name: "Twitter", icon: <FaTwitter />, followers: "1K+", color: "#1DA1F2" },
    { name: "Blog", icon: <FaLaptopCode />, followers: "1K+", color: "#FF5722" }
  ];

  const faqs = [
    {
      q: "Who can join the affiliate program?",
      a: "Anyone with a passion for beauty and a platform (blog, social media, YouTube, etc.) can apply. We welcome influencers, content creators, beauty bloggers, and makeup artists."
    },
    {
      q: "How much commission can I earn?",
      a: "Affiliates earn up to 20% commission on each sale. The more you sell, the higher your commission rate can go!"
    },
    {
      q: "How do I get paid?",
      a: "Payments are processed monthly via bank transfer, PayPal, or digital wallets. Minimum payout is ₹1,000 or equivalent."
    },
    {
      q: "How do I track my sales?",
      a: "You'll get access to a personal dashboard where you can track clicks, sales, and commissions in real-time."
    },
    {
      q: "What promotional materials are available?",
      a: "We provide banners, product images, unique discount codes, and exclusive content for our affiliates."
    }
  ];

  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        containerPadding: '1rem',
        gridColumns: '1fr',
        heroPadding: '2rem 1rem',
        fontSizeHeading: '1.8rem'
      };
    } else if (windowWidth <= 768) {
      return {
        containerPadding: '1.5rem',
        gridColumns: 'repeat(2, 1fr)',
        heroPadding: '3rem 2rem',
        fontSizeHeading: '2.2rem'
      };
    } else {
      return {
        containerPadding: '2rem',
        gridColumns: 'repeat(3, 1fr)',
        heroPadding: '4rem 2rem',
        fontSizeHeading: '2.5rem'
      };
    }
  };

  const responsive = getResponsiveStyles();

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    },
    hero: {
      background: isDarkMode 
        ? 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)'
        : 'linear-gradient(135deg, #fff5f7 0%, #ffffff 100%)',
      padding: responsive.heroPadding,
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: responsive.fontSizeHeading,
      fontWeight: '800',
      marginBottom: '1rem',
      color: isDarkMode ? '#e88ca6' : '#333',
      lineHeight: '1.2'
    },
    heroSubtitle: {
      fontSize: windowWidth <= 480 ? '1rem' : '1.1rem',
      color: isDarkMode ? '#cccccc' : '#666',
      maxWidth: '600px',
      margin: '0 auto 2rem'
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem 2rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '2rem',
      fontWeight: '600',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    section: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: `3rem ${responsive.containerPadding}`
    },
    sectionTitle: {
      fontSize: windowWidth <= 480 ? '1.8rem' : '2rem',
      textAlign: 'center',
      marginBottom: '1rem',
      color: isDarkMode ? '#e88ca6' : '#333',
      fontWeight: '700'
    },
    sectionSubtitle: {
      textAlign: 'center',
      color: isDarkMode ? '#cccccc' : '#666',
      marginBottom: '3rem',
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem'
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: responsive.gridColumns,
      gap: '1.5rem'
    },
    benefitCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1rem',
      padding: '1.5rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      border: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`
    },
    benefitIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem'
    },
    benefitTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#ffffff' : '#333'
    },
    benefitDescription: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666',
      lineHeight: '1.6'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '1rem',
      marginTop: '2rem'
    },
    statCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      padding: '1.5rem',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#e88ca6'
    },
    statLabel: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#cccccc' : '#666',
      marginTop: '0.5rem'
    },
    formContainer: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      padding: '2rem',
      marginTop: '2rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: isDarkMode ? '#ffffff' : '#333'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333',
      fontSize: '0.9rem'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333',
      fontSize: '0.9rem'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333',
      fontSize: '0.9rem',
      minHeight: '100px',
      fontFamily: 'inherit'
    },
    submitButton: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    successMessage: {
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: '#4caf50',
      color: '#ffffff',
      borderRadius: '0.5rem',
      textAlign: 'center'
    },
    platformsGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 480 ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
      gap: '1rem',
      marginTop: '2rem'
    },
    platformCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1rem',
      padding: '1rem',
      textAlign: 'center',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    faqItem: {
      marginBottom: '1rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      paddingBottom: '1rem'
    },
    faqQuestion: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#ffffff' : '#333'
    },
    faqAnswer: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666',
      lineHeight: '1.6'
    }
  };

  return (
    <div style={themeStyles.container}>
      {/* Hero Section */}
      <div style={themeStyles.hero}>
        <h1 style={themeStyles.heroTitle}>Join Our Affiliate Program</h1>
        <p style={themeStyles.heroSubtitle}>
          Turn your passion for beauty into profit! Partner with ASudha Beauty 
          and earn generous commissions while sharing products you love.
        </p>
        <a href="#apply" style={themeStyles.ctaButton}>
          Apply Now <FaHeart />
        </a>
      </div>

      {/* Stats Section */}
      <div style={themeStyles.section}>
        <div style={themeStyles.statsGrid}>
          <div style={themeStyles.statCard}>
            <div style={themeStyles.statNumber}>20%</div>
            <div style={themeStyles.statLabel}>Commission Rate</div>
          </div>
          <div style={themeStyles.statCard}>
            <div style={themeStyles.statNumber}>10k+</div>
            <div style={themeStyles.statLabel}>Active Affiliates</div>
          </div>
          <div style={themeStyles.statCard}>
            <div style={themeStyles.statNumber}>₹50k+</div>
            <div style={themeStyles.statLabel}>Average Monthly Earnings</div>
          </div>
          <div style={themeStyles.statCard}>
            <div style={themeStyles.statNumber}>30-Day</div>
            <div style={themeStyles.statLabel}>Cookie Duration</div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.sectionTitle}>Why Become an Affiliate?</h2>
        <p style={themeStyles.sectionSubtitle}>
          Enjoy amazing benefits and grow your income with ASudha Beauty
        </p>
        <div style={themeStyles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} style={themeStyles.benefitCard}>
              <div style={{ ...themeStyles.benefitIcon, color: benefit.color }}>
                {benefit.icon}
              </div>
              <h3 style={themeStyles.benefitTitle}>{benefit.title}</h3>
              <p style={themeStyles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ideal For Section */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.sectionTitle}>Perfect For</h2>
        <div style={themeStyles.platformsGrid}>
          {platforms.map((platform, index) => (
            <div key={index} style={themeStyles.platformCard}>
              <div style={{ fontSize: '2rem', color: platform.color, marginBottom: '0.5rem' }}>
                {platform.icon}
              </div>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{platform.name}</div>
              <div style={{ fontSize: '0.8rem', color: isDarkMode ? '#999' : '#999' }}>
                {platform.followers} followers
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: isDarkMode ? '#cccccc' : '#666' }}>
          + Bloggers, YouTubers, Beauty Enthusiasts, and more!
        </p>
      </div>

      {/* How It Works */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.sectionTitle}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: responsive.gridColumns, gap: '1.5rem' }}>
          {[
            { step: "1", title: "Apply", description: "Fill out our simple application form" },
            { step: "2", title: "Get Approved", description: "We'll review and approve your application" },
            { step: "3", title: "Share Links", description: "Share your unique affiliate links" },
            { step: "4", title: "Earn Commissions", description: "Get paid for every sale you generate" }
          ].map((item, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#e88ca6',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '0 auto 1rem'
              }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: isDarkMode ? '#cccccc' : '#666', fontSize: '0.9rem' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.sectionTitle}>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} style={themeStyles.faqItem}>
            <div style={themeStyles.faqQuestion}>{faq.q}</div>
            <div style={themeStyles.faqAnswer}>{faq.a}</div>
          </div>
        ))}
      </div>

      {/* Application Form */}
      <div id="apply" style={themeStyles.section}>
        <h2 style={themeStyles.sectionTitle}>Apply Now</h2>
        <p style={themeStyles.sectionSubtitle}>
          Ready to start earning? Fill out the form below and our team will get back to you within 48 hours.
        </p>
        <div style={themeStyles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Full Name *</label>
              <input
                type="text"
                name="name"
                style={themeStyles.input}
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Email Address *</label>
              <input
                type="email"
                name="email"
                style={themeStyles.input}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Website/Social Media Profile *</label>
              <input
                type="url"
                name="website"
                style={themeStyles.input}
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://..."
                required
              />
            </div>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Primary Platform *</label>
              <select
                name="platform"
                style={themeStyles.select}
                value={formData.platform}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your platform</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
                <option value="blog">Blog</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Audience Size *</label>
              <select
                name="audienceSize"
                style={themeStyles.select}
                value={formData.audienceSize}
                onChange={handleInputChange}
                required
              >
                <option value="">Select audience size</option>
                <option value="1k-5k">1K - 5K followers</option>
                <option value="5k-10k">5K - 10K followers</option>
                <option value="10k-50k">10K - 50K followers</option>
                <option value="50k+">50K+ followers</option>
              </select>
            </div>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Why do you want to join? *</label>
              <textarea
                name="reason"
                style={themeStyles.textarea}
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Tell us about your passion for beauty and how you plan to promote ASudha Beauty..."
                required
              />
            </div>
            <button type="submit" style={themeStyles.submitButton}>
              Submit Application
            </button>
            {formSubmitted && (
              <div style={themeStyles.successMessage}>
                <FaCheckCircle /> Application submitted successfully! We'll contact you within 48 hours.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Contact Section */}
      <div style={themeStyles.section}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Questions?</h3>
          <p style={{ color: isDarkMode ? '#cccccc' : '#666', marginBottom: '1rem' }}>
            Our affiliate team is here to help!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="mailto:asudhabeauty@gmail.com" style={themeStyles.ctaButton}>
              <FaEnvelope /> asudhabeauty@gmail.com
            </a>
            <a href="https://wa.me/917518217726" target="_blank" rel="noopener noreferrer" style={themeStyles.ctaButton}>
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;