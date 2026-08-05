import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useGiftCard } from '../context/GiftCardContext';
import { FaGift, FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const GiftCardInput = ({ onApply, onRemove, orderTotal }) => {
  const { isDarkMode } = useTheme();
  const { applyGiftCard, removeAppliedGiftCard, appliedGiftCard } = useGiftCard();
  
  const [giftCardCode, setGiftCardCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleApplyGiftCard = () => {
    if (!giftCardCode.trim()) {
      setError('Please enter a gift card code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const result = applyGiftCard(giftCardCode, orderTotal);
      
      if (result.success) {
        setSuccess(true);
        setError('');
        setGiftCardCode('');
        if (onApply) onApply(result);
        
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    }, 500);
  };

  const handleRemoveGiftCard = () => {
    removeAppliedGiftCard();
    if (onRemove) onRemove();
    setGiftCardCode('');
    setError('');
  };

  const themeStyles = {
    container: {
      marginBottom: '1.5rem',
      padding: '1rem',
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8',
      borderRadius: '0.75rem'
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
      fontSize: '1rem',
      fontWeight: '600',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    inputGroup: {
      display: 'flex',
      gap: '0.5rem',
      flexDirection: window.innerWidth <= 480 ? 'column' : 'row'
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '0.75rem',
      fontSize: '0.95rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      outline: 'none',
      ':focus': {
        borderColor: '#e88ca6'
      }
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.75rem',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      },
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    },
    error: {
      marginTop: '0.5rem',
      padding: '0.5rem',
      backgroundColor: '#ff4444',
      color: '#ffffff',
      borderRadius: '0.5rem',
      fontSize: '0.85rem',
      textAlign: 'center'
    },
    success: {
      marginTop: '0.5rem',
      padding: '0.5rem',
      backgroundColor: '#4caf50',
      color: '#ffffff',
      borderRadius: '0.5rem',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    appliedCard: {
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: '#4caf50',
      color: '#ffffff',
      borderRadius: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    removeButton: {
      background: 'none',
      border: 'none',
      color: '#ffffff',
      cursor: 'pointer',
      fontSize: '1rem',
      ':hover': {
        opacity: 0.8
      }
    }
  };

  if (appliedGiftCard) {
    return (
      <div style={themeStyles.container}>
        <div style={themeStyles.appliedCard}>
          <div>
            <FaGift style={{ marginRight: '0.5rem' }} />
            <strong>Gift Card Applied!</strong>
            <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Code: {appliedGiftCard.code} | Discount: ₹{appliedGiftCard.appliedAmount}
            </div>
          </div>
          <button onClick={handleRemoveGiftCard} style={themeStyles.removeButton}>
            <FaTimes />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.title}>
        <FaGift /> Apply Gift Card
      </div>
      
      <div style={themeStyles.inputGroup}>
        <input
          type="text"
          placeholder="Enter gift card code"
          value={giftCardCode}
          onChange={(e) => setGiftCardCode(e.target.value.toUpperCase())}
          style={themeStyles.input}
        />
        <button 
          onClick={handleApplyGiftCard} 
          style={themeStyles.button}
          disabled={loading}
        >
          {loading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : 'Apply'}
        </button>
      </div>
      
      {error && <div style={themeStyles.error}>{error}</div>}
      {success && (
        <div style={themeStyles.success}>
          <FaCheckCircle /> Gift card applied successfully!
        </div>
      )}
    </div>
  );
};

export default GiftCardInput;