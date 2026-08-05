import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import ImageGallery from '../components/ImageGallery';
import ProductTabs from '../components/ProductTabs';
import ShadeCatalog from '../components/ShadeCatalog';
import { 
  FaShoppingCart, FaHeart, FaRegHeart, FaShare, FaStar,
  FaCheckCircle, FaTruck, FaShieldAlt, FaUndo, FaArrowLeft 
} from 'react-icons/fa';
import { usePixelTracking } from '../context/PixelContext';
import SEO from '../components/SEO';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const product = products.find(p => p.id === parseInt(id));
  const inWishlist = isInWishlist(product?.id);

  const [selectedShade, setSelectedShade] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const trackEvent = usePixelTracking();

  // Track when product page is viewed
  useEffect(() => {
    if (product) {
      trackEvent.viewContent(product);
      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }
  }, [product, trackEvent]);

  // Helper functions for styles
  const getNotFoundStyles = (isDarkMode) => ({
    textAlign: 'center',
    padding: '4rem 1rem',
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#333333'
  });

  const getBackButtonStyles = () => ({
    padding: '0.75rem 2rem',
    backgroundColor: '#e88ca6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#d47a94',
      transform: 'translateY(-2px)'
    }
  });

  if (!product) {
    return (
      <div style={getNotFoundStyles(isDarkMode)}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/shop')} style={getBackButtonStyles()}>
          Back to Shop
        </button>
      </div>
    );
  }

  // Prepare images array
  const productImages = product.images || [product.image];
  
  // Handle shade selection
  const handleShadeSelect = (shade) => {
    setSelectedShade(shade);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedShade || (Array.isArray(product.shades) ? product.shades[0] : '') || '', quantity);
    trackEvent.addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Calculate discount
  const discount = product.mrp && product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  const themeStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh'
    },
    
    // Back Button
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      borderRadius: '2rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      textDecoration: 'none',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: 'fit-content',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },

    productGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      marginBottom: '2rem'
    },
    
    info: {
      display: 'flex',
      flexDirection: 'column'
    },
    
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    
    category: {
      fontSize: '0.9rem',
      color: '#e88ca6',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    
    wishlistButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: inWishlist ? '#e88ca6' : (isDarkMode ? '#ffffff' : '#666666'),
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'scale(1.1)',
        color: '#e88ca6'
      }
    },
    
    name: {
      fontSize: '2rem',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      fontWeight: '700'
    },
    
    itemNo: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      marginBottom: '1rem'
    },
    
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem'
    },
    
    stars: {
      display: 'flex',
      gap: '0.2rem',
      color: '#ffc107'
    },
    
    reviews: {
      color: isDarkMode ? '#cccccc' : '#666666',
      fontSize: '0.9rem'
    },
    
    priceContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    
    price: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#e88ca6'
    },
    
    mrp: {
      fontSize: '1.2rem',
      color: isDarkMode ? '#999999' : '#999999',
      textDecoration: 'line-through'
    },
    
    discount: {
      fontSize: '1.1rem',
      color: '#4caf50',
      fontWeight: '600'
    },
    
    stock: {
      display: 'inline-block',
      padding: '0.25rem 1rem',
      borderRadius: '2rem',
      fontSize: '0.9rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      backgroundColor: product.inStock ? '#4caf50' : '#ff4444',
      color: '#ffffff'
    },
    
    shadeSection: {
      marginBottom: '2rem'
    },
    
    shadeLabel: {
      display: 'block',
      fontSize: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      marginBottom: '0.5rem',
      fontWeight: '600'
    },
    
    shadeOptions: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    
    shadeButton: {
      padding: '0.5rem 1rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    
    shadeButtonSelected: {
      borderColor: '#e88ca6',
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8',
      color: '#e88ca6'
    },
    
    quantitySection: {
      marginBottom: '2rem'
    },
    
    quantityLabel: {
      display: 'block',
      fontSize: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      marginBottom: '0.5rem',
      fontWeight: '600'
    },
    
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    
    quantityButton: {
      width: '40px',
      height: '40px',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      borderRadius: '4px',
      fontSize: '1.2rem',
      cursor: 'pointer',
      transition: 'all 0.3s',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },
    
    quantityValue: {
      fontSize: '1.2rem',
      minWidth: '40px',
      textAlign: 'center',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem'
    },
    
    addToCartButton: {
      flex: 2,
      padding: '1rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      }
    },
    
    shareButton: {
      flex: 1,
      padding: '1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      color: isDarkMode ? '#ffffff' : '#333333',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      borderRadius: '4px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },

    // Success Message
    successMessage: {
      marginTop: '1rem',
      padding: '0.75rem',
      backgroundColor: '#4caf50',
      color: '#ffffff',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      animation: 'slideIn 0.3s ease'
    },
    
    keyFeatures: {
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '8px'
    },
    
    featureTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    
    featureList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '0.5rem'
    },
    
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },

    // Delivery Info
    deliveryInfo: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '8px'
    },
    
    deliveryItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      fontSize: '0.9rem'
    },
    
    deliveryIcon: {
      fontSize: '1.5rem',
      color: '#e88ca6'
    }
  };

  return (
    <div style={themeStyles.container}>
      {/* Enhanced SEO with product schema */}
      <SEO 
        title={product.name}
        description={product.description}
        keywords={[
          product.category,
          product.type,
          product.name,
          'cosmetics',
          'makeup',
          'beauty products',
          ...(product.benefits || [])
        ]}
        image={product.image}
        url={`/product/${product.id}`}
        type="product"
        product={product}
      />
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        style={themeStyles.backButton}
      >
        <FaArrowLeft /> Back
      </button>

      <div style={themeStyles.productGrid}>
        {/* Left Column - Image Gallery */}
        <ImageGallery
          images={productImages}
          video={product.video}
          videoThumbnail={product.videoThumbnail}
          productName={product.name}
        />

        {/* Right Column - Product Info */}
        <div style={themeStyles.info}>
          <div style={themeStyles.header}>
            <span style={themeStyles.category}>
              {product.category} {product.subCategory && `/ ${product.subCategory}`}
            </span>
            <button
              style={themeStyles.wishlistButton}
              onClick={() => toggleWishlist(product)}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {inWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <h1 style={themeStyles.name}>{product.name}</h1>
          
          {product.itemNo && (
            <p style={themeStyles.itemNo}>Item No: {product.itemNo}</p>
          )}

          {product.rating && (
            <div style={themeStyles.rating}>
              <div style={themeStyles.stars}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < Math.floor(product.rating) ? '#ffc107' : '#e0e0e0'}
                  />
                ))}
              </div>
              <span style={themeStyles.reviews}>
                {product.rating} ({product.reviews || 0} reviews)
              </span>
            </div>
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

          <div style={themeStyles.stock}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>

          {/* Shade Selection */}
          {product.shades && (
            <div style={themeStyles.shadeSection}>
              <label style={themeStyles.shadeLabel}>
                Select Shade: {selectedShade || (Array.isArray(product.shades) ? product.shades[0] : 'Standard')}
              </label>
              <div style={themeStyles.shadeOptions}>
                {Array.isArray(product.shades) ? (
                  product.shades.map(shade => (
                    <button
                      key={shade}
                      style={{
                        ...themeStyles.shadeButton,
                        ...(selectedShade === shade || (!selectedShade && shade === product.shades[0])
                          ? themeStyles.shadeButtonSelected
                          : {})
                      }}
                      onClick={() => setSelectedShade(shade)}
                    >
                      {shade}
                    </button>
                  ))
                ) : (
                  <span style={themeStyles.itemNo}>
                    {product.shades} Shades Available
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div style={themeStyles.quantitySection}>
            <label style={themeStyles.quantityLabel}>Quantity:</label>
            <div style={themeStyles.quantityControl}>
              <button
                style={themeStyles.quantityButton}
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span style={themeStyles.quantityValue}>{quantity}</span>
              <button
                style={themeStyles.quantityButton}
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={themeStyles.actionButtons}>
            <button style={themeStyles.addToCartButton} onClick={handleAddToCart}>
              <FaShoppingCart />
              Add to Cart
            </button>
            <button style={themeStyles.shareButton} onClick={handleShare}>
              <FaShare />
              Share
            </button>
          </div>

          {/* Success Message */}
          {addedToCart && (
            <div style={themeStyles.successMessage}>
              <FaCheckCircle /> Added to cart successfully!
            </div>
          )}

          {/* Key Features */}
          {product.benefits && (
            <div style={themeStyles.keyFeatures}>
              <h4 style={themeStyles.featureTitle}>Key Features</h4>
              <div style={themeStyles.featureList}>
                {product.benefits.map((benefit, index) => (
                  <div key={index} style={themeStyles.featureItem}>
                    <span style={{ color: '#e88ca6' }}>✓</span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery Information */}
          <div style={themeStyles.deliveryInfo}>
            <div style={themeStyles.deliveryItem}>
              <FaTruck style={themeStyles.deliveryIcon} />
              <span>Free shipping on orders above ₹500</span>
            </div>
            <div style={themeStyles.deliveryItem}>
              <FaShieldAlt style={themeStyles.deliveryIcon} />
              <span>100% authentic products</span>
            </div>
            <div style={themeStyles.deliveryItem}>
              <FaUndo style={themeStyles.deliveryIcon} />
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shade Catalog (if available) */}
      {product.catalog && (
        <ShadeCatalog
          catalog={product.catalog}
          onSelectShade={handleShadeSelect}
          selectedShade={selectedShade}
        />
      )}

      {/* Product Tabs */}
      <ProductTabs product={product} />
    </div>
  );
};

export default ProductDetail;