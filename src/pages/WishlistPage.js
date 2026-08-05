import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { FaHeart } from 'react-icons/fa';

const WishlistPage = () => {
  const { isDarkMode } = useTheme();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, Array.isArray(product.shades) ? product.shades[0] : '', 1);
    removeFromWishlist(product.id);
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
    title: {
      fontSize: '2rem',
      marginBottom: '2rem',
      color: isDarkMode ? '#f5346b' : '#333333',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    emptyWishlist: {
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '12px'
    },
    emptyIcon: {
      fontSize: '4rem',
      color: isDarkMode ? '#f5346b' : '#f5346b',
      marginBottom: '1rem'
    },
    emptyTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    emptyText: {
      color: isDarkMode ? '#cccccc' : '#666666',
      marginBottom: '2rem'
    },
    shopButton: {
      display: 'inline-block',
      padding: '0.75rem 2rem',
      backgroundColor: '#f5346b',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '50px',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#ff4d7a',
        transform: 'translateY(-2px)'
      }
    },
    wishlistGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2rem'
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div style={themeStyles.container}>
        <h1 style={themeStyles.title}>
          <FaHeart /> My Wishlist
        </h1>
        <div style={themeStyles.emptyWishlist}>
          <FaHeart style={themeStyles.emptyIcon} />
          <h2 style={themeStyles.emptyTitle}>Your wishlist is empty</h2>
          <p style={themeStyles.emptyText}>
            Save your favorite items here and come back to them later!
          </p>
          <Link to="/shop" style={themeStyles.shopButton}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={themeStyles.container}>
      <h1 style={themeStyles.title}>
        <FaHeart /> My Wishlist ({wishlistItems.length} items)
      </h1>
      <div style={themeStyles.wishlistGrid}>
        {wishlistItems.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;