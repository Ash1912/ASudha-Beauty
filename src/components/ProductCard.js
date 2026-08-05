import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, showBadge = false, badgeText = "" }) => {
  const { isDarkMode } = useTheme();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleImageLoad = (e) => {
    setImageLoaded(true);
    setImageDimensions({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    });
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/500x500/f8f8f8/f5346b?text=ASudha";
  };

  const getImageStyle = () => {
    if (!imageLoaded || imageDimensions.width === 0) {
      return {
        ...themeStyles.image,
        objectFit: 'cover'
      };
    }

    const aspectRatio = imageDimensions.width / imageDimensions.height;
    
    if (aspectRatio > 1.5) {
      return {
        ...themeStyles.image,
        objectFit: 'contain',
        backgroundColor: isDarkMode ? '#404040' : '#f5f5f5',
        padding: '10px'
      };
    }
    else if (aspectRatio < 0.67) {
      return {
        ...themeStyles.image,
        objectFit: 'contain',
        backgroundColor: isDarkMode ? '#404040' : '#f5f5f5',
        padding: '10px'
      };
    }
    else {
      return {
        ...themeStyles.image,
        objectFit: 'cover'
      };
    }
  };

  const themeStyles = {
    card: {
      backgroundColor: isDarkMode ? '#333333' : '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: isDarkMode ? '0 4px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    wishlistButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
      border: 'none',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 10,
      transition: 'all 0.3s ease',
      color: inWishlist ? '#f5346b' : (isDarkMode ? '#ffffff' : '#333333'),
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      paddingTop: '100%',
      overflow: 'hidden',
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8'
    },
    imageWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',
      transition: 'transform 0.5s ease'
    },
    imageLoading: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8',
      color: isDarkMode ? '#cccccc' : '#666666',
      fontSize: '0.9rem'
    },
    category: {
      fontSize: '0.8rem',
      color: '#f5346b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '0.25rem'
    },
    name: {
      fontSize: '1.1rem',
      margin: '0.25rem 0',
      color: isDarkMode ? '#ffffff' : '#333333',
      fontWeight: '600',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minHeight: '2.8rem'
    },
    itemNo: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      marginBottom: '0.25rem'
    },
    priceContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem',
      flexWrap: 'wrap'
    },
    price: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: isDarkMode ? '#f5346b' : '#f5346b'
    },
    mrp: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#999999' : '#999999',
      textDecoration: 'line-through'
    },
    discount: {
      fontSize: '0.9rem',
      color: '#4caf50',
      fontWeight: '600'
    },
    shadeInfo: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    shadeDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#f5346b',
      display: 'inline-block',
      marginRight: '4px'
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#f5346b' : '#333333',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
      fontWeight: '500',
    },
    content: {
      padding: '1rem',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    bestSellerBadge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: '#f5346b',
      color: '#ffffff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '600',
      zIndex: 10,
      textTransform: 'uppercase'
    },
    naturalBadge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: '#4caf50',
      color: '#ffffff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '600',
      zIndex: 10,
      textTransform: 'uppercase'
    }
  };

  const discount = product.mrp && product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  // Get the appropriate badge style based on badgeText
  const getBadgeStyle = () => {
    if (badgeText === "Natural") {
      return themeStyles.naturalBadge;
    }
    return themeStyles.bestSellerBadge;
  };

  // Determine if we should show a badge
  const shouldShowBadge = showBadge === true || (product.bestSeller === true && badgeText === "");
  const finalBadgeText = badgeText || (product.bestSeller ? "Best Seller" : "");

  return (
    <div style={themeStyles.card}>
      {/* Wishlist Button */}
      <button 
        style={themeStyles.wishlistButton}
        onClick={handleWishlistClick}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {inWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Badge - shows either Natural or Best Seller */}
      {shouldShowBadge && finalBadgeText && (
        <div style={getBadgeStyle()}>{finalBadgeText}</div>
      )}
      
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <div style={themeStyles.imageContainer}>
          <div style={themeStyles.imageWrapper}>
            {!imageLoaded && !imageError && (
              <div style={themeStyles.imageLoading}>
                Loading...
              </div>
            )}
            <img 
              src={product.image} 
              alt={product.name}
              style={{
                ...themeStyles.image,
                ...(imageLoaded ? getImageStyle() : { opacity: 0 })
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </div>
        </div>

        <div style={themeStyles.content}>
          <span style={themeStyles.category}>{product.category}</span>
          <h3 style={themeStyles.name}>{product.name}</h3>
          
          {product.itemNo && (
            <p style={themeStyles.itemNo}>Item: {product.itemNo}</p>
          )}

          <div style={themeStyles.priceContainer}>
            <span style={themeStyles.price}>₹{product.price.toFixed(2)}</span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span style={themeStyles.mrp}>₹{product.mrp.toFixed(2)}</span>
                <span style={themeStyles.discount}>{discount}% off</span>
              </>
            )}
          </div>

          {product.shades && (
            <div style={themeStyles.shadeInfo}>
              <span style={themeStyles.shadeDot}></span>
              {typeof product.shades === 'number' 
                ? `${product.shades} Shades Available`
                : product.shades.length > 0 ? `${product.shades.length} Shades Available` : null}
            </div>
          )}

          <button 
            style={themeStyles.button} 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;