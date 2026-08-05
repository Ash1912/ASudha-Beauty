// src/pages/BecomePartner.js
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  FaStore, FaTruck, FaHandshake, FaChartLine,
  FaCheckCircle, FaEnvelope, FaPhone, FaBuilding,
  FaStar, FaHeart, FaShieldAlt, FaLeaf
} from 'react-icons/fa';

const BecomePartner = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    city: '',
    state: '',
    experience: '',
    message: ''
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
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      businessType: '',
      city: '',
      state: '',
      experience: '',
      message: ''
    });
  };

  const benefits = [
    {
      icon: <FaStore />,
      title: "Become a Stockist",
      description: "Carry our full range of products in your store and become an authorized retailer.",
      color: "#4caf50"
    },
    {
      icon: <FaHandshake />,
      title: "Distributor Partnership",
      description: "Distribute our products in your region and build your business network.",
      color: "#2196f3"
    },
    {
      icon: <FaChartLine />,
      title: "High Profit Margins",
      description: "Enjoy competitive wholesale pricing and attractive profit margins.",
      color: "#ff9800"
    },
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      description: "Free shipping on all wholesale orders above ₹10,000.",
      color: "#e91e63"
    }
  ];

  const requirements = [
    "Registered business entity (GST number required)",
    "Physical store or warehouse space",
    "Minimum order quantity: ₹25,000",
    "Commitment to brand values and quality standards",
    "Marketing and promotional capabilities"
  ];

  const businessTypes = [
    "Retail Store",
    "Distributor",
    "Salon/Beauty Parlor",
    "Online Store",
    "Department Store",
    "Other"
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
        gridColumns: 'repeat(4, 1fr)',
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
      color: isDarkMode ? '#e88ca6' : '#333'
    },
    heroSubtitle: {
      fontSize: windowWidth <= 480 ? '1rem' : '1.1rem',
      color: isDarkMode ? '#cccccc' : '#666',
      maxWidth: '600px',
      margin: '0 auto'
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
      border: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      transition: 'all 0.3s ease'
    },
    requirementsList: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      padding: '2rem',
      marginTop: '2rem'
    },
    requirementItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem',
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem'
    },
    formContainer: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      padding: '2rem',
      marginTop: '2rem'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
      gap: '1rem'
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
    contactInfo: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
      gap: '1.5rem',
      marginTop: '2rem'
    },
    contactCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      padding: '1.5rem',
      textAlign: 'center'
    }
  };

  return (
    <div style={themeStyles.container}>
      {/* Hero Section */}
      <div style={themeStyles.hero}>
        <h1 style={themeStyles.heroTitle}>Become a Partner</h1>
        <p style={themeStyles.heroSubtitle}>
          Join the ASudha Beauty family and grow your business with India's 
          fastest-growing beauty brand.
        </p>
      </div>

      {/* Partnership Benefits */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.sectionTitle}>Why Partner With Us?</h2>
        <p style={themeStyles.sectionSubtitle}>
          Join a brand that's trusted by thousands of customers across India
        </p>
        <div style={themeStyles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} style={themeStyles.benefitCard}>
              <div style={{ fontSize: '2.5rem', color: benefit.color, marginBottom: '1rem' }}>
                {benefit.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{benefit.title}</h3>
              <p style={{ color: isDarkMode ? '#cccccc' : '#666', fontSize: '0.9rem' }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.sectionTitle}>Partner Requirements</h2>
        <div style={themeStyles.requirementsList}>
          {requirements.map((req, index) => (
            <div key={index} style={themeStyles.requirementItem}>
              <FaCheckCircle color="#4caf50" size={20} />
              <span>{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.sectionTitle}>Why Choose ASudha Beauty?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: responsive.gridColumns, gap: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <FaStar size={40} color="#ffc107" />
            <h3 style={{ marginTop: '0.5rem' }}>Premium Quality</h3>
            <p style={{ color: isDarkMode ? '#cccccc' : '#666' }}>High-quality products loved by customers</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <FaHeart size={40} color="#e88ca6" />
            <h3 style={{ marginTop: '0.5rem' }}>Brand Recognition</h3>
            <p style={{ color: isDarkMode ? '#cccccc' : '#666' }}>Trusted brand with growing market presence</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <FaShieldAlt size={40} color="#4caf50" />
            <h3 style={{ marginTop: '0.5rem' }}>100% Authentic</h3>
            <p style={{ color: isDarkMode ? '#cccccc' : '#666' }}>Genuine products with quality assurance</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <FaLeaf size={40} color="#8bc34a" />
            <h3 style={{ marginTop: '0.5rem' }}>Cruelty Free</h3>
            <p style={{ color: isDarkMode ? '#cccccc' : '#666' }}>Ethical products that customers love</p>
          </div>
        </div>
      </div>

      {/* Partner Application Form */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.sectionTitle}>Partner Application</h2>
        <p style={themeStyles.sectionSubtitle}>
          Fill out the form below to start your partnership journey with ASudha Beauty.
        </p>
        <div style={themeStyles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div style={themeStyles.formGrid}>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  style={themeStyles.input}
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>Contact Person Name *</label>
                <input
                  type="text"
                  name="contactName"
                  style={themeStyles.input}
                  value={formData.contactName}
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
                <label style={themeStyles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  style={themeStyles.input}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>Business Type *</label>
                <select
                  name="businessType"
                  style={themeStyles.select}
                  value={formData.businessType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select business type</option>
                  {businessTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>City *</label>
                <input
                  type="text"
                  name="city"
                  style={themeStyles.input}
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>State *</label>
                <input
                  type="text"
                  name="state"
                  style={themeStyles.input}
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>Years in Business *</label>
                <select
                  name="experience"
                  style={themeStyles.select}
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
            </div>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Additional Information / Message</label>
              <textarea
                name="message"
                style={themeStyles.textarea}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your business, why you want to partner with us, etc."
              />
            </div>
            <button type="submit" style={themeStyles.submitButton}>
              Submit Application
            </button>
            {formSubmitted && (
              <div style={themeStyles.successMessage}>
                <FaCheckCircle /> Application submitted successfully! Our team will contact you within 2-3 business days.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Contact Information */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.sectionTitle}>Get In Touch</h2>
        <div style={themeStyles.contactInfo}>
          <div style={themeStyles.contactCard}>
            <FaEnvelope size={30} color="#e88ca6" />
            <h3 style={{ margin: '0.5rem 0' }}>Email Us</h3>
            <p>asudhabeauty@gmail.com</p>
            <p>asudhabeauty@gmail.com</p>
          </div>
          <div style={themeStyles.contactCard}>
            <FaPhone size={30} color="#e88ca6" />
            <h3 style={{ margin: '0.5rem 0' }}>Call Us</h3>
            <p>+91-7518217726</p>
            <p>+91-9335975525</p>
          </div>
          <div style={themeStyles.contactCard}>
            <FaBuilding size={30} color="#e88ca6" />
            <h3 style={{ margin: '0.5rem 0' }}>Visit Us</h3>
            <p>Shop No. 51/T-11/28, Pandariba Gali, Shahmaruf</p>
            <p>Gorakhpur - 273001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomePartner;