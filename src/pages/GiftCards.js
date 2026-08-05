import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useGiftCard } from '../context/GiftCardContext';
import SEO from '../components/SEO';
import { 
  FaGift, FaEnvelope, FaDollarSign, 
  FaCheckCircle, FaArrowLeft, FaHeart, FaShoppingBag,
  FaWhatsapp, FaFacebook, FaTwitter, FaEnvelope as FaMail
} from 'react-icons/fa';

const GiftCards = () => {
  const { isDarkMode } = useTheme();
  const { createGiftCard } = useGiftCard();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(500);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdCard, setCreatedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const giftCardAmounts = [250, 500, 1000, 2000, 5000];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!recipientName || !recipientEmail || !senderName) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const newCard = createGiftCard(amount, recipientName, recipientEmail, senderName, message);
      setCreatedCard(newCard);
      setIsSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  const handleShare = (platform) => {
    const text = `I've sent you a ASudha Beauty Gift Card worth ₹${amount}! Check your email for details.`;
    const url = window.location.href;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${recipientEmail}?subject=Gift Card from ${senderName}&body=${encodeURIComponent(text)}`;
        break;
      default:
        // Default case - do nothing or handle unknown platform
        console.log('Unknown share platform:', platform);
        break;
    }
  };

  const themeStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh'
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '2rem',
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      borderRadius: '2rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      cursor: 'pointer',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    },
    subtitle: {
      fontSize: '1rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      maxWidth: '600px',
      margin: '0 auto'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem'
    },
    formSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1.5rem',
      padding: '2rem'
    },
    formTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.95rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '0.75rem',
      fontSize: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      outline: 'none',
      transition: 'all 0.3s ease',
      ':focus': {
        borderColor: '#e88ca6',
        boxShadow: '0 0 0 3px rgba(232,140,166,0.2)'
      }
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '0.75rem',
      fontSize: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      outline: 'none',
      resize: 'vertical',
      minHeight: '80px',
      fontFamily: 'inherit',
      ':focus': {
        borderColor: '#e88ca6',
        boxShadow: '0 0 0 3px rgba(232,140,166,0.2)'
      }
    },
    amountGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    amountButton: {
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '0.75rem',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    activeAmount: {
      backgroundColor: '#e88ca6',
      borderColor: '#e88ca6',
      color: '#ffffff'
    },
    customAmount: {
      marginTop: '1rem'
    },
    error: {
      backgroundColor: '#ff4444',
      color: '#ffffff',
      padding: '0.75rem',
      borderRadius: '0.75rem',
      marginBottom: '1rem',
      textAlign: 'center'
    },
    submitButton: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.75rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      },
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        transform: 'none'
      }
    },
    infoSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1.5rem',
      padding: '2rem'
    },
    infoTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: isDarkMode ? '#e88ca6' : '#333333'
    },
    infoCard: {
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1rem',
      border: `1px solid ${isDarkMode ? '#555' : '#e0e0e0'}`
    },
    infoIcon: {
      fontSize: '2rem',
      color: '#e88ca6',
      marginBottom: '0.5rem'
    },
    successSection: {
      textAlign: 'center',
      padding: '3rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1.5rem'
    },
    successIcon: {
      fontSize: '4rem',
      color: '#4caf50',
      marginBottom: '1rem'
    },
    giftCardCode: {
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      padding: '1rem',
      borderRadius: '1rem',
      fontSize: '1.2rem',
      fontWeight: '600',
      letterSpacing: '2px',
      fontFamily: 'monospace',
      margin: '1rem 0',
      display: 'inline-block',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`
    },
    shareButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    shareButton: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1.2rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        transform: 'scale(1.1)'
      }
    }
  };

  if (isSubmitted && createdCard) {
    return (
      <div style={themeStyles.container}>
        <SEO 
          title="Gift Card Purchased"
          description="Your ASudha Beauty gift card has been created successfully."
          keywords="gift card, e-gift card, digital gift card"
          url="/gift-cards"
        />
        
        <div style={themeStyles.successSection}>
          <FaCheckCircle style={themeStyles.successIcon} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
            Gift Card Created Successfully!
          </h2>
          <p style={{ color: isDarkMode ? '#ccc' : '#666', marginBottom: '1rem' }}>
            Your gift card has been sent to {recipientEmail}
          </p>
          
          <div style={themeStyles.giftCardCode}>
            {createdCard.code}
          </div>
          
          <p style={{ margin: '1rem 0', color: isDarkMode ? '#ccc' : '#666' }}>
            Amount: <strong>₹{amount}</strong>
          </p>
          
          <div style={themeStyles.shareButtons}>
            <button 
              style={themeStyles.shareButton}
              onClick={() => handleShare('whatsapp')}
            >
              <FaWhatsapp />
            </button>
            <button 
              style={themeStyles.shareButton}
              onClick={() => handleShare('facebook')}
            >
              <FaFacebook />
            </button>
            <button 
              style={themeStyles.shareButton}
              onClick={() => handleShare('twitter')}
            >
              <FaTwitter />
            </button>
            <button 
              style={themeStyles.shareButton}
              onClick={() => handleShare('email')}
            >
              <FaMail />
            </button>
          </div>
          
          <button 
            style={{...themeStyles.submitButton, marginTop: '2rem', width: 'auto', padding: '0.75rem 2rem'}}
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={themeStyles.container}>
      <SEO 
        title="Gift Cards"
        description="Send a ASudha Beauty gift card to your loved ones. Perfect for birthdays, anniversaries, or any special occasion."
        keywords="gift card, e-gift card, digital gift card, beauty gift card"
        url="/gift-cards"
      />
      
      <button onClick={() => navigate(-1)} style={themeStyles.backButton}>
        <FaArrowLeft /> Back
      </button>

      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>
          <FaGift /> Gift Cards
        </h1>
        <p style={themeStyles.subtitle}>
          Give the gift of beauty. Send a ASudha Beauty gift card to your loved ones.
        </p>
      </div>

      <div style={themeStyles.grid}>
        {/* Gift Card Form */}
        <div style={themeStyles.formSection}>
          <h2 style={themeStyles.formTitle}>
            <FaHeart /> Create a Gift Card
          </h2>
          
          {error && <div style={themeStyles.error}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Select Amount *</label>
              <div style={themeStyles.amountGrid}>
                {giftCardAmounts.map(cardAmount => (
                  <button
                    key={cardAmount}
                    type="button"
                    style={{
                      ...themeStyles.amountButton,
                      ...(amount === cardAmount ? themeStyles.activeAmount : {})
                    }}
                    onClick={() => setAmount(cardAmount)}
                  >
                    ₹{cardAmount}
                  </button>
                ))}
              </div>
              <div style={themeStyles.customAmount}>
                <label style={themeStyles.label}>Or enter custom amount</label>
                <div style={{ position: 'relative' }}>
                  <FaDollarSign style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: isDarkMode ? '#999' : '#666' }} />
                  <input
                    type="number"
                    value={amount === 0 ? '' : amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{...themeStyles.input, paddingLeft: '2.5rem'}}
                    placeholder="Enter amount"
                    min="100"
                    max="50000"
                  />
                </div>
              </div>
            </div>
            
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Recipient's Name *</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                style={themeStyles.input}
                placeholder="Enter recipient's name"
                required
              />
            </div>
            
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Recipient's Email *</label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                style={themeStyles.input}
                placeholder="recipient@email.com"
                required
              />
            </div>
            
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Your Name *</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                style={themeStyles.input}
                placeholder="Your name"
                required
              />
            </div>
            
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Personal Message (Optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={themeStyles.textarea}
                placeholder="Write a personal message for your gift..."
              />
            </div>
            
            <button 
              type="submit" 
              style={themeStyles.submitButton}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Purchase Gift Card'}
            </button>
          </form>
        </div>
        
        {/* Information Section */}
        <div style={themeStyles.infoSection}>
          <h2 style={themeStyles.infoTitle}>How It Works</h2>
          
          <div style={themeStyles.infoCard}>
            <FaGift style={themeStyles.infoIcon} />
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Choose Amount</h3>
            <p style={{ color: isDarkMode ? '#ccc' : '#666', fontSize: '0.9rem' }}>
              Select from our popular amounts or enter a custom value between ₹100 and ₹50,000.
            </p>
          </div>
          
          <div style={themeStyles.infoCard}>
            <FaEnvelope style={themeStyles.infoIcon} />
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Personalize & Send</h3>
            <p style={{ color: isDarkMode ? '#ccc' : '#666', fontSize: '0.9rem' }}>
              Add a personal message and we'll send the gift card directly to the recipient's email.
            </p>
          </div>
          
          <div style={themeStyles.infoCard}>
            <FaShoppingBag style={themeStyles.infoIcon} />
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Redeem Instantly</h3>
            <p style={{ color: isDarkMode ? '#ccc' : '#666', fontSize: '0.9rem' }}>
              Recipient can use the gift card code at checkout for any purchase on our website.
            </p>
          </div>
          
          <div style={themeStyles.infoCard}>
            <FaHeart style={themeStyles.infoIcon} />
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>No Expiry</h3>
            <p style={{ color: isDarkMode ? '#ccc' : '#666', fontSize: '0.9rem' }}>
              Our gift cards never expire and can be used for the full value at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;