import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart } from 'react-icons/fa';

const WishlistButton = () => {
  const { isDarkMode } = useTheme();
  const { getWishlistCount } = useWishlist();
  const count = getWishlistCount();

  const styles = {
    wishlistLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '1.2rem',
      position: 'relative',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'scale(1.1)'
      }
    },
    wishlistCount: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: isDarkMode ? '#f5346b' : '#333333',
      color: '#ffffff',
      borderRadius: '50%',
      padding: '2px 6px',
      fontSize: '0.8rem',
      minWidth: '18px',
      textAlign: 'center'
    }
  };

  return (
    <Link to="/wishlist" style={styles.wishlistLink}>
      <FaHeart />
      {count > 0 && (
        <span style={styles.wishlistCount}>{count}</span>
      )}
    </Link>
  );
};

export default WishlistButton;