// src/pages/ReturnsExchanges.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
FaExchangeAlt, FaCheckCircle,
  FaClock, FaTruck, FaShieldAlt,
  FaArrowRight, FaFileAlt, FaBox, FaCreditCard
} from 'react-icons/fa';

const ReturnsExchanges = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const steps = [
    {
      icon: <FaFileAlt />,
      title: "Initiate Return",
      description: "Log into your account and submit a return request within 30 days of delivery."
    },
    {
      icon: <FaBox />,
      title: "Pack Your Item",
      description: "Pack the unused product in original packaging with all tags attached."
    },
    {
      icon: <FaTruck />,
      title: "Ship It Back",
      description: "Use our prepaid shipping label or arrange your own shipping."
    },
    {
      icon: <FaCreditCard />,
      title: "Get Refund",
      description: "Receive refund within 7-10 business days after inspection."
    }
  ];

  const nonReturnable = [
    "Opened or used cosmetics (for hygiene reasons)",
    "Products without original packaging or tags",
    "Items damaged due to misuse",
    "Free items or promotional products",
    "Gift cards",
    "Products purchased more than 30 days ago"
  ];

  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        containerPadding: '1rem',
        fontSizeHeading: '1.5rem',
        gridColumns: '1fr'
      };
    } else if (windowWidth <= 768) {
      return {
        containerPadding: '1.5rem',
        fontSizeHeading: '2rem',
        gridColumns: 'repeat(2, 1fr)'
      };
    } else {
      return {
        containerPadding: '2rem',
        fontSizeHeading: '2.5rem',
        gridColumns: 'repeat(4, 1fr)'
      };
    }
  };

  const responsive = getResponsiveStyles();

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
      padding: `0 ${responsive.containerPadding} 2rem`,
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      fontSize: responsive.fontSizeHeading,
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#e88ca6' : '#333'
    },
    subtitle: {
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      color: isDarkMode ? '#cccccc' : '#666',
      maxWidth: '600px',
      margin: '0 auto'
    },
    section: {
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: `0 ${responsive.containerPadding}`
    },
    stepsGrid: {
      display: 'grid',
      gridTemplateColumns: responsive.gridColumns,
      gap: '1.5rem',
      marginTop: '2rem'
    },
    stepCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1rem',
      padding: '1.5rem',
      textAlign: 'center',
      border: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`
    },
    stepIcon: {
      fontSize: '2rem',
      color: '#e88ca6',
      marginBottom: '1rem'
    },
    stepTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    stepDescription: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666',
      lineHeight: '1.6'
    },
    infoCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    },
    infoTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#e88ca6'
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.75rem',
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    timeline: {
      marginTop: '1rem'
    },
    timelineItem: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem'
    },
    timelineIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    timelineContent: {
      flex: 1
    },
    timelineTitle: {
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    timelineText: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    ctaButton: {
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
    }
  };

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>Returns & Exchanges</h1>
        <p style={themeStyles.subtitle}>
          We want you to love your purchase. If something isn't right, we're here to help.
        </p>
      </div>

      {/* Steps Section */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.infoTitle}>How to Return an Item</h2>
        <div style={themeStyles.stepsGrid}>
          {steps.map((step, idx) => (
            <div key={idx} style={themeStyles.stepCard}>
              <div style={themeStyles.stepIcon}>{step.icon}</div>
              <h3 style={themeStyles.stepTitle}>{step.title}</h3>
              <p style={themeStyles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Return Policy Details */}
      <div style={themeStyles.section}>
        <div style={themeStyles.infoCard}>
          <h2 style={themeStyles.infoTitle}>Return Policy</h2>
          <div style={themeStyles.listItem}>
            <FaClock color="#e88ca6" />
            <span><strong>30-Day Return Window:</strong> You have 30 days from delivery to initiate a return.</span>
          </div>
          <div style={themeStyles.listItem}>
            <FaCheckCircle color="#4caf50" />
            <span><strong>Full Refund:</strong> Receive a full refund for unused products in original condition.</span>
          </div>
          <div style={themeStyles.listItem}>
            <FaTruck color="#2196f3" />
            <span><strong>Free Returns:</strong> We offer free returns for defective or incorrect items.</span>
          </div>
        </div>

        {/* Non-Returnable Items */}
        <div style={themeStyles.infoCard}>
          <h2 style={themeStyles.infoTitle}>Non-Returnable Items</h2>
          {nonReturnable.map((item, idx) => (
            <div key={idx} style={themeStyles.listItem}>
              <FaShieldAlt color="#f44336" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Refund Timeline */}
        <div style={themeStyles.infoCard}>
          <h2 style={themeStyles.infoTitle}>Refund Timeline</h2>
          <div style={themeStyles.timeline}>
            <div style={themeStyles.timelineItem}>
              <div style={themeStyles.timelineIcon}>1</div>
              <div style={themeStyles.timelineContent}>
                <div style={themeStyles.timelineTitle}>Return Received</div>
                <div style={themeStyles.timelineText}>We inspect your return within 2-3 business days</div>
              </div>
            </div>
            <div style={themeStyles.timelineItem}>
              <div style={themeStyles.timelineIcon}>2</div>
              <div style={themeStyles.timelineContent}>
                <div style={themeStyles.timelineTitle}>Refund Processing</div>
                <div style={themeStyles.timelineText}>Refund initiated within 48 hours of approval</div>
              </div>
            </div>
            <div style={themeStyles.timelineItem}>
              <div style={themeStyles.timelineIcon}>3</div>
              <div style={themeStyles.timelineContent}>
                <div style={themeStyles.timelineTitle}>Bank Processing</div>
                <div style={themeStyles.timelineText}>Allow 5-7 business days for refund to reflect in your account</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exchanges */}
        <div style={themeStyles.infoCard}>
          <h2 style={themeStyles.infoTitle}>Exchange Process</h2>
          <div style={themeStyles.listItem}>
            <FaExchangeAlt color="#e88ca6" />
            <span>Contact us within 15 days of delivery for size/color exchanges</span>
          </div>
          <div style={themeStyles.listItem}>
            <FaTruck color="#e88ca6" />
            <span>We'll arrange a pickup for the original item</span>
          </div>
          <div style={themeStyles.listItem}>
            <FaBox color="#e88ca6" />
            <span>New item ships once we receive the return (subject to availability)</span>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Ready to start your return?</h3>
          <Link to="/track-order" style={themeStyles.ctaButton}>
            Initiate Return <FaArrowRight />
          </Link>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/contact" style={{ ...themeStyles.ctaButton, backgroundColor: isDarkMode ? '#404040' : '#666' }}>
              Need Help? Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsExchanges;