// src/pages/FAQs.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  FaChevronDown, FaChevronUp, FaSearch,
  FaShoppingBag, FaTruck, FaUndo, FaCreditCard,
  FaBox, FaUserCircle, FaEnvelope, FaPhone, FaQuestionCircle
} from 'react-icons/fa';

const FAQs = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqs, setOpenFaqs] = useState([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'all', label: 'All', icon: <FaQuestionCircle /> },
    { id: 'orders', label: 'Orders', icon: <FaShoppingBag /> },
    { id: 'shipping', label: 'Shipping', icon: <FaTruck /> },
    { id: 'returns', label: 'Returns', icon: <FaUndo /> },
    { id: 'payment', label: 'Payment', icon: <FaCreditCard /> },
    { id: 'products', label: 'Products', icon: <FaBox /> },
    { id: 'account', label: 'Account', icon: <FaUserCircle /> }
  ];

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: "How do I place an order?",
      answer: "Placing an order is easy! Simply browse our products, add items to your cart, proceed to checkout, enter your shipping details, choose a payment method, and confirm your order. You'll receive an order confirmation email once your order is placed."
    },
    {
      id: 2,
      category: 'orders',
      question: "Can I cancel or modify my order?",
      answer: "Orders can be cancelled within 2 hours of placement. Please contact our customer support immediately if you need to modify or cancel your order. Once processed, we cannot make changes."
    },
    {
      id: 3,
      category: 'orders',
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order by logging into your account and visiting the 'Track Order' section."
    },
    {
      id: 4,
      category: 'shipping',
      question: "What are your shipping charges?",
      answer: "We offer free shipping on all orders above ₹500. For orders below ₹500, a flat shipping fee of ₹50 applies. Express shipping options are available at additional cost."
    },
    {
      id: 5,
      category: 'shipping',
      question: "How long does delivery take?",
      answer: "Delivery times vary by location: Metro cities: 2-4 days, Tier 2 cities: 3-5 days, Rural areas: 5-7 days. You'll receive tracking information to monitor your delivery status."
    },
    {
      id: 6,
      category: 'shipping',
      question: "Do you ship internationally?",
      answer: "Currently, we ship only within India. We're working on expanding our shipping to international locations. Stay tuned for updates!"
    },
    {
      id: 7,
      category: 'returns',
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused products in original packaging. Simply initiate a return through your account or contact our support team. Refunds are processed within 7-10 business days after we receive the return."
    },
    {
      id: 8,
      category: 'returns',
      question: "Can I return opened products?",
      answer: "For hygiene reasons, we cannot accept returns on opened or used cosmetic products unless they are defective. If you received a defective product, please contact us immediately."
    },
    {
      id: 9,
      category: 'payment',
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and cash on delivery (COD) for orders up to ₹5,000. All payments are processed securely."
    },
    {
      id: 10,
      category: 'payment',
      question: "Is COD available?",
      answer: "Yes, Cash on Delivery is available for orders up to ₹5,000. A small convenience fee may apply for COD orders. Payment must be made in cash at the time of delivery."
    },
    {
      id: 11,
      category: 'products',
      question: "Are your products cruelty-free?",
      answer: "Yes! All ASudha Beauty products are 100% cruelty-free. We never test on animals and are committed to ethical beauty practices."
    },
    {
      id: 12,
      category: 'products',
      question: "Are your products safe for sensitive skin?",
      answer: "Most of our products are formulated with sensitive skin in mind and are dermatologically tested. However, we recommend patch testing before full application, especially if you have known allergies."
    },
    {
      id: 13,
      category: 'account',
      question: "How do I create an account?",
      answer: "Click on the 'Account' icon at the top right corner of our website and select 'Sign Up'. Enter your details to create an account and enjoy benefits like order tracking, faster checkout, and exclusive offers."
    },
    {
      id: 14,
      category: 'account',
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and enter your registered email. You'll receive instructions to reset your password. Check your spam folder if you don't see it in your inbox."
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaqs(prev => 
      prev.includes(id) ? prev.filter(faqId => faqId !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        containerPadding: '1rem',
        fontSizeHeading: '1.5rem',
        categoryPadding: '0.5rem',
        categoryFontSize: '0.8rem'
      };
    } else if (windowWidth <= 768) {
      return {
        containerPadding: '1.5rem',
        fontSizeHeading: '2rem',
        categoryPadding: '0.75rem 1rem',
        categoryFontSize: '0.9rem'
      };
    } else {
      return {
        containerPadding: '2rem',
        fontSizeHeading: '2.5rem',
        categoryPadding: '0.75rem 1.5rem',
        categoryFontSize: '1rem'
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
    searchContainer: {
      maxWidth: '500px',
      margin: '2rem auto',
      position: 'relative'
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: isDarkMode ? '#999' : '#999'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      borderRadius: '2rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333',
      fontSize: '0.9rem'
    },
    categoriesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      justifyContent: 'center',
      marginBottom: '2rem',
      maxWidth: '1200px',
      margin: '0 auto 2rem',
      padding: `0 ${responsive.containerPadding}`
    },
    categoryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: responsive.categoryPadding,
      borderRadius: '2rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      color: isDarkMode ? '#cccccc' : '#666',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: responsive.categoryFontSize,
      border: 'none'
    },
    activeCategoryButton: {
      backgroundColor: '#e88ca6',
      color: '#ffffff'
    },
    faqsContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: `0 ${responsive.containerPadding}`
    },
    faqItem: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1rem',
      marginBottom: '1rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      overflow: 'hidden'
    },
    faqQuestion: {
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    faqAnswer: {
      padding: '0 1rem 1rem 1rem',
      borderTop: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      color: isDarkMode ? '#cccccc' : '#666',
      lineHeight: '1.6',
      fontSize: '0.9rem'
    },
    noResults: {
      textAlign: 'center',
      padding: '2rem',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    contactSection: {
      maxWidth: '800px',
      margin: '3rem auto',
      padding: '2rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      textAlign: 'center'
    },
    contactTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#e88ca6'
    },
    contactText: {
      marginBottom: '1rem',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    contactButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    contactButton: {
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
        <h1 style={themeStyles.title}>Frequently Asked Questions</h1>
        <p style={themeStyles.subtitle}>
          Find answers to commonly asked questions about orders, shipping, returns, and more.
        </p>
      </div>

      {/* Search Bar */}
      <div style={themeStyles.searchContainer}>
        <div style={themeStyles.searchIcon}>
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search questions..."
          style={themeStyles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div style={themeStyles.categoriesContainer}>
        {categories.map((category) => (
          <button
            key={category.id}
            style={{
              ...themeStyles.categoryButton,
              ...(activeCategory === category.id ? themeStyles.activeCategoryButton : {})
            }}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div style={themeStyles.faqsContainer}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div key={faq.id} style={themeStyles.faqItem}>
              <div style={themeStyles.faqQuestion} onClick={() => toggleFaq(faq.id)}>
                <span>{faq.question}</span>
                {openFaqs.includes(faq.id) ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openFaqs.includes(faq.id) && (
                <div style={themeStyles.faqAnswer}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={themeStyles.noResults}>
            No questions found matching your search. Try different keywords or contact us for help.
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div style={themeStyles.contactSection}>
        <h3 style={themeStyles.contactTitle}>Still Have Questions?</h3>
        <p style={themeStyles.contactText}>
          Can't find what you're looking for? Our customer support team is here to help.
        </p>
        <div style={themeStyles.contactButtons}>
          <Link to="/contact" style={themeStyles.contactButton}>
            <FaEnvelope /> Contact Us
          </Link>
          <a href="tel:+919911150517" style={themeStyles.contactButton}>
            <FaPhone /> Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;