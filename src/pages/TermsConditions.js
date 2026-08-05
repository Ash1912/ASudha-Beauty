// src/pages/TermsConditions.js
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  FaShoppingBag, FaCreditCard, FaTruck, FaUndo,
 FaUserSecret, FaGavel, FaFileContract,
  FaInfoCircle, FaShieldAlt
} from 'react-icons/fa';

const TermsConditions = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [lastUpdated] = useState("January 1, 2024");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = [
    {
      id: "acceptance",
      icon: <FaFileContract />,
      title: "Acceptance of Terms",
      content: `By accessing and using the ASudha Beauty website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website. These terms apply to all visitors, users, and others who access or use the service.`
    },
    {
      id: "products",
      icon: <FaShoppingBag />,
      title: "Products and Pricing",
      content: `All products displayed on our website are subject to availability. We reserve the right to modify or discontinue any product without prior notice. Prices are subject to change without notice. We make every effort to display accurate product information, but we do not warrant that product descriptions, colors, or other content is accurate, complete, or error-free.`
    },
    {
      id: "orders",
      icon: <FaCreditCard />,
      title: "Order Acceptance",
      content: `We reserve the right to refuse or cancel any order for any reason including but not limited to product availability, errors in product information, or suspected fraud. If we cancel an order, we will notify you and issue a full refund. Once an order is placed, you will receive an order confirmation via email.`
    },
    {
      id: "shipping",
      icon: <FaTruck />,
      title: "Shipping and Delivery",
      content: `We ship to addresses within India. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by customs clearance, carrier issues, or force majeure events. Shipping costs are calculated at checkout and may vary based on location and order value.`
    },
    {
      id: "returns",
      icon: <FaUndo />,
      title: "Returns and Refunds",
      content: `We offer a 30-day return policy for unused products in original packaging. To initiate a return, please contact our customer service. Refunds will be processed within 7-10 business days after we receive and inspect the returned product. Certain items such as opened cosmetics are non-returnable for hygiene reasons.`
    },
    {
      id: "payment",
      icon: <FaCreditCard />,
      title: "Payment Terms",
      content: `We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are processed through secure payment gateways. We do not store your payment information. By placing an order, you authorize us to charge your chosen payment method for the total amount.`
    },
    {
      id: "privacy",
      icon: <FaUserSecret />,
      title: "Privacy Policy",
      content: `Your privacy is important to us. We collect and process personal information in accordance with our Privacy Policy. By using our website, you consent to such processing and warrant that all data provided by you is accurate. We use secure SSL encryption to protect your data.`
    },
    {
      id: "intellectual",
      icon: <FaGavel />,
      title: "Intellectual Property",
      content: `All content on this website including text, graphics, logos, images, and software is the property of ASudha Beauty and protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.`
    },
    {
      id: "liability",
      icon: <FaShieldAlt />,
      title: "Limitation of Liability",
      content: `Neckline Cosmetics shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability shall not exceed the amount paid for the product giving rise to the claim.`
    },
    {
      id: "modifications",
      icon: <FaInfoCircle />,
      title: "Modifications to Terms",
      content: `We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms. We encourage you to review these terms periodically for any updates.`
    }
  ];

  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        containerPadding: '1rem',
        fontSizeHeading: '1.5rem',
        fontSizeSubheading: '1.1rem'
      };
    } else if (windowWidth <= 768) {
      return {
        containerPadding: '1.5rem',
        fontSizeHeading: '2rem',
        fontSizeSubheading: '1.2rem'
      };
    } else {
      return {
        containerPadding: '2rem',
        fontSizeHeading: '2.5rem',
        fontSizeSubheading: '1.3rem'
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
    lastUpdated: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#999' : '#999',
      marginTop: '0.5rem'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: `0 ${responsive.containerPadding}`
    },
    section: {
      marginBottom: '2rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      transition: 'all 0.3s ease'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      borderBottom: `2px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      paddingBottom: '0.75rem'
    },
    sectionIcon: {
      fontSize: '1.5rem',
      color: '#e88ca6'
    },
    sectionTitle: {
      fontSize: responsive.fontSizeSubheading,
      fontWeight: '600',
      margin: 0,
      color: isDarkMode ? '#ffffff' : '#333'
    },
    sectionContent: {
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      lineHeight: '1.6',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    contactSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      padding: '2rem',
      textAlign: 'center',
      marginTop: '2rem'
    },
    contactTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#e88ca6'
    },
    contactText: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666',
      marginBottom: '1rem'
    },
    contactLink: {
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
        <h1 style={themeStyles.title}>Terms & Conditions</h1>
        <p style={themeStyles.lastUpdated}>Last Updated: {lastUpdated}</p>
      </div>

      <div style={themeStyles.content}>
        {sections.map((section) => (
          <div key={section.id} style={themeStyles.section}>
            <div style={themeStyles.sectionHeader}>
              <span style={themeStyles.sectionIcon}>{section.icon}</span>
              <h2 style={themeStyles.sectionTitle}>{section.title}</h2>
            </div>
            <div style={themeStyles.sectionContent}>
              {section.content}
            </div>
          </div>
        ))}

        <div style={themeStyles.contactSection}>
          <h3 style={themeStyles.contactTitle}>Questions About Terms?</h3>
          <p style={themeStyles.contactText}>
            If you have any questions about our Terms & Conditions, please contact us.
          </p>
          <a href="mailto:asudhabeauty@gmail.com" style={themeStyles.contactLink}>
            Contact Legal Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;