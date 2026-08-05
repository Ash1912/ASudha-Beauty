import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaLeaf, FaSmile, FaTint, FaShieldAlt, FaRegSnowflake, FaRegSun } from 'react-icons/fa';

const SkincareBenefits = ({ benefits, isNatural = true }) => {
  const { isDarkMode } = useTheme();

  const benefitIcons = {
    "Deep cleansing": <FaTint />,
    "Oil control": <FaRegSun />,
    "Improves skin texture": <FaSmile />,
    "Makes skin glow": <FaRegSun />,
    "Natural and pure": <FaLeaf />,
    "Ayurvedic goodness": <FaShieldAlt />,
    "Nourishes and cleanses": <FaTint />,
    "Revitalizes natural glow": <FaRegSun />,
    "Chemical free": <FaLeaf />,
    "Paraben free": <FaShieldAlt />,
    "Preservative free": <FaShieldAlt />,
    "Suitable for all skin types": <FaRegSnowflake />
  };

  const themeStyles = {
    container: {
      marginTop: '2rem'
    },
    title: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    badgeContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    },
    badge: {
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8',
      borderRadius: '2rem',
      fontSize: '0.85rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    naturalBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#4caf50',
      color: '#ffffff',
      borderRadius: '2rem',
      fontSize: '0.9rem',
      fontWeight: '600',
      marginTop: '1rem'
    }
  };

  // Free from claims
  const freeFrom = [
    "✓ No Parabens",
    "✓ No Chemicals",
    "✓ No Preservatives",
    "✓ Cruelty Free",
    "✓ 100% Natural"
  ];

  return (
    <div style={themeStyles.container}>
      <h3 style={themeStyles.title}>
        <FaLeaf /> Key Benefits
      </h3>
      <div style={themeStyles.badgeContainer}>
        {benefits.map((benefit, index) => (
          <span key={index} style={themeStyles.badge}>
            {benefitIcons[benefit] || <FaSmile />}
            {benefit}
          </span>
        ))}
      </div>

      {isNatural && (
        <>
          <h3 style={themeStyles.title}>
            <FaShieldAlt /> What makes it special
          </h3>
          <div style={themeStyles.badgeContainer}>
            {freeFrom.map((item, index) => (
              <span key={index} style={themeStyles.badge}>
                {item}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SkincareBenefits;