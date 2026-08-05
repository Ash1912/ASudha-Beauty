import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const themeStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    },
    title: {
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '3rem',
      color: isDarkMode ? '#e88ca6' : '#333'
    },
    formSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: isDarkMode ? '0 4px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
    },
    successMessage: {
      backgroundColor: isDarkMode ? '#1e3a2a' : '#d4edda',
      color: isDarkMode ? '#8bc34a' : '#155724',
      padding: '1rem',
      borderRadius: '4px',
      marginBottom: '1rem',
      textAlign: 'center'
    },
    label: {
      marginBottom: '0.5rem',
      color: isDarkMode ? '#cccccc' : '#333',
      fontWeight: '500'
    },
    input: {
      padding: '0.75rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      borderRadius: '4px',
      fontSize: '1rem',
      backgroundColor: isDarkMode ? '#333' : '#fff',
      color: isDarkMode ? '#fff' : '#333',
      transition: 'all 0.3s ease',
      ':focus': {
        borderColor: '#e88ca6',
        outline: 'none'
      }
    },
    textarea: {
      padding: '0.75rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      borderRadius: '4px',
      fontSize: '1rem',
      resize: 'vertical',
      fontFamily: 'inherit',
      backgroundColor: isDarkMode ? '#333' : '#fff',
      color: isDarkMode ? '#fff' : '#333',
      ':focus': {
        borderColor: '#e88ca6',
        outline: 'none'
      }
    },
    submitButton: {
      padding: '1rem',
      backgroundColor: isDarkMode ? '#e88ca6' : '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: isDarkMode ? '#f5a5c0' : '#444',
        transform: 'translateY(-2px)'
      }
    },
    infoSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      padding: '2rem',
      borderRadius: '8px'
    },
    infoTitle: {
      fontSize: '1.5rem',
      marginBottom: '2rem',
      color: isDarkMode ? '#e88ca6' : '#333'
    },
    infoText: {
      color: isDarkMode ? '#cccccc' : '#666',
      lineHeight: '1.6'
    },
    qrSection: {
      marginTop: '2rem',
      textAlign: 'center',
      padding: '1.5rem',
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderRadius: '8px'
    },
    placeholderQR: {
      width: '120px',
      height: '120px',
      backgroundColor: isDarkMode ? '#404040' : '#333',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    chatSection: {
      textAlign: 'center',
      padding: '3rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
      borderRadius: '8px',
      boxShadow: isDarkMode ? '0 4px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
    },
    chatButton: {
      padding: '1rem 3rem',
      backgroundColor: '#e88ca6',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#f5a5c0',
        transform: 'scale(1.05)'
      }
    }
  };

  return (
    <div style={themeStyles.container}>
      <h1 style={themeStyles.title}>Enquire Now</h1>
      
      <div style={styles.contactGrid}>
        {/* Contact Form */}
        <div style={themeStyles.formSection}>
          {isSubmitted && (
            <div style={themeStyles.successMessage}>
              Thank you for your message! We'll get back to you soon.
            </div>
          )}
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={themeStyles.label}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={themeStyles.input}
                placeholder="Your name"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={themeStyles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={themeStyles.input}
                placeholder="your@email.com"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="message" style={themeStyles.label}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={themeStyles.textarea}
                placeholder="How can we help you?"
                rows="5"
              />
            </div>

            <button type="submit" style={themeStyles.submitButton}>
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div style={themeStyles.infoSection}>
          <h2 style={themeStyles.infoTitle}>Get in Touch</h2>
          
          <div style={styles.infoItem}>
            <FaPhone style={styles.infoIcon} />
            <div>
              <h3 style={styles.infoSubtitle}>Phone</h3>
              <p style={themeStyles.infoText}>+91-9911150517</p>
            </div>
          </div>

          <div style={styles.infoItem}>
            <FaEnvelope style={styles.infoIcon} />
            <div>
              <h3 style={styles.infoSubtitle}>Email</h3>
              <p style={themeStyles.infoText}>asudhabeauty@gmail.com</p>
            </div>
          </div>

          <div style={styles.infoItem}>
            <FaMapMarkerAlt style={styles.infoIcon} />
            <div>
              <h3 style={styles.infoSubtitle}>Address</h3>
              <p style={themeStyles.infoText}>
                Shop No. 51/T-11/28<br />
                Pandariba Gali, Shahmaruf<br />
                Gorakhpur - 273001
              </p>
            </div>
          </div>

          {/* QR Code Section */}
          {/* <div style={themeStyles.qrSection}>
            <h3 style={styles.qrTitle}>
              <FaQrcode style={styles.qrIcon} /> Scan the code
            </h3>
            <div style={styles.qrCode}>
              <div style={themeStyles.placeholderQR}>
                <span style={styles.qrPlaceholderText}>QR Code</span>
              </div>
            </div>
            <p style={themeStyles.infoText}>Scan to chat with us on WhatsApp</p>
          </div> */}
        </div>
      </div>

      {/* Live Chat Button */}
      {/* <div style={themeStyles.chatSection}>
        <h2 style={styles.chatTitle}>Hello 👋</h2>
        <p style={themeStyles.infoText}>Can we help you?</p>
        <button style={themeStyles.chatButton}>
          Open chat
        </button>
      </div> */}
    </div>
  );
};

const styles = {
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    marginBottom: '3rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  infoItem: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    alignItems: 'flex-start'
  },
  infoIcon: {
    fontSize: '1.5rem',
    color: '#e88ca6',
    minWidth: '2rem'
  },
  infoSubtitle: {
    fontSize: '1rem',
    marginBottom: '0.25rem',
    color: '#333'
  },
  qrTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  qrIcon: {
    color: '#e88ca6'
  },
  qrCode: {
    width: '150px',
    height: '150px',
    margin: '0 auto 1rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qrPlaceholderText: {
    color: '#fff',
    fontSize: '0.8rem'
  },
  chatTitle: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    color: '#333'
  }
};

// Responsive styles
const mediaQuery768 = window.matchMedia('(max-width: 768px)');
if (mediaQuery768.matches) {
  styles.contactGrid.gridTemplateColumns = '1fr';
}

export default Contact;