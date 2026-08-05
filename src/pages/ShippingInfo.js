// src/pages/ShippingInfo.js
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  FaTruck, FaClock, FaMapMarkerAlt, FaBox,
  FaCheckCircle, FaShippingFast, FaGlobe,
  FaQuestionCircle, FaEnvelope, FaPhone
} from 'react-icons/fa';

const ShippingInfo = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shippingMethods = [
    {
      name: "Standard Shipping",
      icon: <FaTruck />,
      cost: "Free on orders ₹500+",
      deliveryTime: "5-7 business days",
      details: "Reliable delivery with tracking"
    },
    {
      name: "Express Shipping",
      icon: <FaShippingFast />,
      cost: "₹99",
      deliveryTime: "2-3 business days",
      details: "Priority handling and faster delivery"
    },
    {
      name: "Same Day Delivery",
      icon: <FaClock />,
      cost: "₹199",
      deliveryTime: "Same day (select cities)",
      details: "Order before 12 PM for same day delivery"
    }
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
        gridColumns: 'repeat(3, 1fr)'
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
    shippingGrid: {
      display: 'grid',
      gridTemplateColumns: responsive.gridColumns,
      gap: '1.5rem',
      marginTop: '2rem'
    },
    shippingCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1rem',
      padding: '1.5rem',
      textAlign: 'center',
      border: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      transition: 'all 0.3s ease'
    },
    shippingIcon: {
      fontSize: '2.5rem',
      color: '#e88ca6',
      marginBottom: '1rem'
    },
    shippingName: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    shippingCost: {
      fontSize: '1rem',
      color: '#e88ca6',
      fontWeight: '500',
      marginBottom: '0.5rem'
    },
    shippingTime: {
      fontSize: '0.9rem',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    shippingDetails: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#999' : '#999'
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
      color: '#e88ca6',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      marginBottom: '0.75rem',
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666',
      lineHeight: '1.6'
    },
    faqItem: {
      marginBottom: '1rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      paddingBottom: '1rem'
    },
    faqQuestion: {
      fontWeight: '600',
      marginBottom: '0.5rem',
      fontSize: '1rem'
    },
    faqAnswer: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666',
      lineHeight: '1.6'
    }
  };

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>Shipping Information</h1>
        <p style={themeStyles.subtitle}>
          Fast, reliable delivery across India. Learn about our shipping options and policies.
        </p>
      </div>

      {/* Shipping Methods */}
      <div style={themeStyles.section}>
        <h2 style={themeStyles.infoTitle}>Shipping Options</h2>
        <div style={themeStyles.shippingGrid}>
          {shippingMethods.map((method, idx) => (
            <div key={idx} style={themeStyles.shippingCard}>
              <div style={themeStyles.shippingIcon}>{method.icon}</div>
              <h3 style={themeStyles.shippingName}>{method.name}</h3>
              <div style={themeStyles.shippingCost}>{method.cost}</div>
              <div style={themeStyles.shippingTime}>{method.deliveryTime}</div>
              <div style={themeStyles.shippingDetails}>{method.details}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Policy Details */}
      <div style={themeStyles.section}>
        <div style={themeStyles.infoCard}>
          <h2 style={themeStyles.infoTitle}>
            <FaTruck /> Shipping Policy
          </h2>
          <div style={themeStyles.listItem}>
            <FaCheckCircle color="#4caf50" />
            <span><strong>Free Shipping:</strong> On all orders above ₹500 within India</span>
          </div>
          <div style={themeStyles.listItem}>
            <FaClock color="#e88ca6" />
            <span><strong>Processing Time:</strong> Orders are processed within 24-48 hours</span>
          </div>
          <div style={themeStyles.listItem}>
            <FaMapMarkerAlt color="#2196f3" />
            <span><strong>Delivery Areas:</strong> We ship to all pin codes across India</span>
          </div>
          <div style={themeStyles.listItem}>
            <FaBox color="#ff9800" />
            <span><strong>Tracking:</strong> Receive tracking details via email/SMS once shipped</span>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div style={themeStyles.infoCard}>
          <h2 style={themeStyles.infoTitle}>
            <FaClock /> Estimated Delivery Times
          </h2>
          <div style={themeStyles.listItem}>
            <strong>Metro Cities:</strong> 2-4 business days
          </div>
          <div style={themeStyles.listItem}>
            <strong>Tier 2 Cities:</strong> 3-5 business days
          </div>
          <div style={themeStyles.listItem}>
            <strong>Rural Areas:</strong> 5-7 business days
          </div>
          <div style={themeStyles.listItem}>
            <strong>Remote Locations:</strong> 7-10 business days
          </div>
        </div>

        {/* International Shipping */}
        <div style={themeStyles.infoCard}>
          <h2 style={themeStyles.infoTitle}>
            <FaGlobe /> International Shipping
          </h2>
          <div style={themeStyles.listItem}>
            Currently, we only ship within India. International shipping coming soon!
          </div>
        </div>

        {/* FAQs */}
        <div style={themeStyles.infoCard}>
          <h2 style={themeStyles.infoTitle}>
            <FaQuestionCircle /> Frequently Asked Questions
          </h2>
          
          <div style={themeStyles.faqItem}>
            <div style={themeStyles.faqQuestion}>Can I change my shipping address after placing an order?</div>
            <div style={themeStyles.faqAnswer}>
              Please contact us within 2 hours of placing your order. After that, we cannot guarantee address changes as orders are processed quickly.
            </div>
          </div>

          <div style={themeStyles.faqItem}>
            <div style={themeStyles.faqQuestion}>How can I track my order?</div>
            <div style={themeStyles.faqAnswer}>
              Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order on our website.
            </div>
          </div>

          <div style={themeStyles.faqItem}>
            <div style={themeStyles.faqQuestion}>What if my package is delayed?</div>
            <div style={themeStyles.faqAnswer}>
              While we strive for on-time delivery, sometimes delays occur due to weather, holidays, or carrier issues. If your package is significantly delayed, please contact our support team.
            </div>
          </div>

          <div style={themeStyles.faqItem}>
            <div style={themeStyles.faqQuestion}>Do you offer cash on delivery?</div>
            <div style={themeStyles.faqAnswer}>
              Yes, COD is available for orders up to ₹5,000. A small convenience fee may apply.
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div style={themeStyles.infoCard}>
          <h2 style={themeStyles.infoTitle}>Need Help?</h2>
          <div style={themeStyles.listItem}>
            <FaEnvelope color="#e88ca6" />
            <span>Email: asudhabeauty@gmail.com</span>
          </div>
          <div style={themeStyles.listItem}>
            <FaPhone color="#e88ca6" />
            <span>Phone: +91-7518217726 (Mon-Sun, 10 AM - 7 PM)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;