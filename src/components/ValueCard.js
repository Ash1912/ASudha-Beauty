import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ValueCard = ({ icon, title, description }) => {
  const { isDarkMode } = useTheme();

  const themeStyles = {
    card: {
      padding: '2rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '12px',
      boxShadow: isDarkMode ? '0 4px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      cursor: 'default',
      border: `1px solid ${isDarkMode ? '#404040' : 'transparent'}`,
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: isDarkMode ? '0 8px 16px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.1)',
        borderColor: '#e88ca6'
      }
    },
    iconContainer: {
      width: '70px',
      height: '70px',
      margin: '0 auto 1.5rem',
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.5rem',
      transition: 'all 0.3s ease',
      border: '2px solid transparent'
    },
    title: {
      fontSize: '1.2rem',
      marginBottom: '1rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      fontWeight: '600'
    },
    description: {
      fontSize: '0.95rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      lineHeight: '1.6'
    }
  };

  return (
    <div 
      style={themeStyles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={themeStyles.iconContainer}>
        <span>{icon}</span>
      </div>
      <h3 style={themeStyles.title}>{title}</h3>
      <p style={themeStyles.description}>{description}</p>
    </div>
  );
};

export default ValueCard;