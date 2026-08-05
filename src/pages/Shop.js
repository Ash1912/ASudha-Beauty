import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { 
  FaFilter, FaStar, FaTags, FaTimes, 
  FaHeart, FaFire 
} from 'react-icons/fa';

const Shop = () => {
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    bestSeller: false,
    inStock: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [tempFilters, setTempFilters] = useState({
    category: 'all',
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    bestSeller: false,
    inStock: false
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize tempFilters with selectedCategory when component mounts
  useEffect(() => {
    setTempFilters(prev => ({
      ...prev,
      category: selectedCategory
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  const categories = ['all', 'Face', 'Lips', 'Eyes', 'Skincare', 'Sindoor', 'Nails'];

  // Filter products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory !== 'all' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    
    // Price range filter
    if (product.price < selectedFilters.priceRange.min || product.price > selectedFilters.priceRange.max) {
      return false;
    }
    
    // Rating filter
    if (selectedFilters.rating > 0 && (product.rating || 0) < selectedFilters.rating) {
      return false;
    }
    
    // Best seller filter
    if (selectedFilters.bestSeller && !product.bestSeller) {
      return false;
    }
    
    // In stock filter
    if (selectedFilters.inStock && !product.inStock) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'best-selling':
        return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleAddToCart = (product) => {
    addToCart(product, Array.isArray(product.shades) ? product.shades[0] : '', 1);
  };

  const applyFilters = () => {
    setSelectedCategory(tempFilters.category);
    setSelectedFilters({
      priceRange: tempFilters.priceRange,
      rating: tempFilters.rating,
      bestSeller: tempFilters.bestSeller,
      inStock: tempFilters.inStock
    });
    setShowFilters(false);
  };

  const resetFilters = () => {
    const resetValues = {
      category: 'all',
      priceRange: { min: 0, max: 5000 },
      rating: 0,
      bestSeller: false,
      inStock: false
    };
    setTempFilters(resetValues);
    setSelectedCategory('all');
    setSelectedFilters({
      priceRange: { min: 0, max: 5000 },
      rating: 0,
      bestSeller: false,
      inStock: false
    });
    setSortBy('featured');
    setShowFilters(false);
  };

  const clearFilter = (filterName) => {
    const newFilters = { ...selectedFilters };
    const newTempFilters = { ...tempFilters };
    
    switch (filterName) {
      case 'price':
        newFilters.priceRange = { min: 0, max: 5000 };
        newTempFilters.priceRange = { min: 0, max: 5000 };
        break;
      case 'rating':
        newFilters.rating = 0;
        newTempFilters.rating = 0;
        break;
      case 'bestSeller':
        newFilters.bestSeller = false;
        newTempFilters.bestSeller = false;
        break;
      case 'inStock':
        newFilters.inStock = false;
        newTempFilters.inStock = false;
        break;
      case 'category':
        setSelectedCategory('all');
        newTempFilters.category = 'all';
        break;
      default:
        break;
    }
    setSelectedFilters(newFilters);
    setTempFilters(newTempFilters);
  };

  // Get responsive grid columns
  const getGridColumns = () => {
    if (windowWidth <= 480) return '1fr';
    if (windowWidth <= 768) return 'repeat(2, 1fr)';
    if (windowWidth <= 1024) return 'repeat(3, 1fr)';
    return 'repeat(4, 1fr)';
  };

  // Count active filters
  const activeFilterCount = () => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedFilters.priceRange.min > 0 || selectedFilters.priceRange.max < 5000) count++;
    if (selectedFilters.rating > 0) count++;
    if (selectedFilters.bestSeller) count++;
    if (selectedFilters.inStock) count++;
    return count;
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
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    title: {
      fontSize: '2rem',
      marginBottom: 0,
      color: isDarkMode ? '#f5346b' : '#333333'
    },
    resultCount: {
      fontSize: '0.95rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    filterBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    filterButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      borderRadius: '4px',
      cursor: 'pointer',
      color: isDarkMode ? '#ffffff' : '#333333',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },
    filterCount: {
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      borderRadius: '50%',
      padding: '2px 6px',
      fontSize: '0.75rem',
      marginLeft: '0.25rem'
    },
    filterSelect: {
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '4px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      color: isDarkMode ? '#ffffff' : '#333333',
      minWidth: '180px'
    },
    // Active Filters
    activeFilters: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginBottom: '2rem',
      alignItems: 'center'
    },
    filterChip: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.4rem 1rem',
      backgroundColor: isDarkMode ? '#404040' : '#f0f0f0',
      borderRadius: '2rem',
      fontSize: '0.85rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    clearChip: {
      cursor: 'pointer',
      color: '#f5346b',
      ':hover': {
        color: '#ff4d7a'
      }
    },
    clearAllButton: {
      background: 'none',
      border: 'none',
      color: '#f5346b',
      fontSize: '0.85rem',
      cursor: 'pointer',
      textDecoration: 'underline',
      ':hover': {
        color: '#ff4d7a'
      }
    },
    // Filter Modal
    filterOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: showFilters ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center'
    },
    filterModal: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1.5rem',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh',
      overflowY: 'auto',
      padding: '1.5rem',
      position: 'relative'
    },
    filterModalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    filterModalTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: isDarkMode ? '#e88ca6' : '#333333'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.2rem',
      cursor: 'pointer',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    filterGroup: {
      marginBottom: '1.5rem'
    },
    filterGroupTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.75rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    priceRange: {
      display: 'flex',
      gap: '1rem',
      marginTop: '0.5rem'
    },
    priceInput: {
      flex: 1,
      padding: '0.5rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '0.5rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    ratingStars: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    ratingButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '2rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff'
      }
    },
    activeRatingButton: {
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      borderColor: '#e88ca6'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    filterActions: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem',
      paddingTop: '1rem',
      borderTop: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    applyButton: {
      flex: 1,
      padding: '0.75rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      }
    },
    resetButton: {
      flex: 1,
      padding: '0.75rem',
      backgroundColor: 'transparent',
      color: isDarkMode ? '#ffffff' : '#333333',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: isDarkMode ? '#404040' : '#f8f8f8'
      }
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(),
      gap: '1.5rem',
      marginTop: '2rem'
    },
    noProducts: {
      textAlign: 'center',
      padding: '3rem',
      color: isDarkMode ? '#999999' : '#999999',
      fontSize: '1.1rem'
    }
  };

  return (
    <div style={themeStyles.container}>
      {/* Header */}
      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>Shop All Products</h1>
        <div style={themeStyles.resultCount}>
          {sortedProducts.length} products found
        </div>
      </div>

      {/* Filter Bar */}
      <div style={themeStyles.filterBar}>
        <button 
          style={themeStyles.filterButton}
          onClick={() => setShowFilters(true)}
        >
          <FaFilter /> Filters
          {activeFilterCount() > 0 && (
            <span style={themeStyles.filterCount}>{activeFilterCount()}</span>
          )}
        </button>
        
        <select 
          style={themeStyles.filterSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="featured">Sort by: Featured</option>
          <option value="price-low">Sort by: Price (Low to High)</option>
          <option value="price-high">Sort by: Price (High to Low)</option>
          <option value="name">Sort by: Name</option>
          <option value="rating">Sort by: Top Rated</option>
          <option value="best-selling">Sort by: Best Selling</option>
        </select>
      </div>

      {/* Active Filters */}
      {activeFilterCount() > 0 && (
        <div style={themeStyles.activeFilters}>
          {selectedCategory !== 'all' && (
            <span style={themeStyles.filterChip}>
              <FaTags /> Category: {selectedCategory}
              <span style={themeStyles.clearChip} onClick={() => clearFilter('category')}>×</span>
            </span>
          )}
          {(selectedFilters.priceRange.min > 0 || selectedFilters.priceRange.max < 5000) && (
            <span style={themeStyles.filterChip}>
              <FaTags /> Price: ₹{selectedFilters.priceRange.min} - ₹{selectedFilters.priceRange.max}
              <span style={themeStyles.clearChip} onClick={() => clearFilter('price')}>×</span>
            </span>
          )}
          {selectedFilters.rating > 0 && (
            <span style={themeStyles.filterChip}>
              <FaStar /> {selectedFilters.rating}+ Stars
              <span style={themeStyles.clearChip} onClick={() => clearFilter('rating')}>×</span>
            </span>
          )}
          {selectedFilters.bestSeller && (
            <span style={themeStyles.filterChip}>
              <FaFire /> Best Seller
              <span style={themeStyles.clearChip} onClick={() => clearFilter('bestSeller')}>×</span>
            </span>
          )}
          {selectedFilters.inStock && (
            <span style={themeStyles.filterChip}>
              <FaHeart /> In Stock Only
              <span style={themeStyles.clearChip} onClick={() => clearFilter('inStock')}>×</span>
            </span>
          )}
          <button style={themeStyles.clearAllButton} onClick={resetFilters}>
            Clear All
          </button>
        </div>
      )}

      {/* Filter Modal */}
      <div style={themeStyles.filterOverlay} onClick={() => setShowFilters(false)}>
        <div style={themeStyles.filterModal} onClick={(e) => e.stopPropagation()}>
          <div style={themeStyles.filterModalHeader}>
            <h3 style={themeStyles.filterModalTitle}>
              <FaFilter /> Filter Products
            </h3>
            <button style={themeStyles.closeButton} onClick={() => setShowFilters(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Category Filter */}
          <div style={themeStyles.filterGroup}>
            <h4 style={themeStyles.filterGroupTitle}>Category</h4>
            <select
              style={themeStyles.filterSelect}
              value={tempFilters.category}
              onChange={(e) => setTempFilters({ ...tempFilters, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div style={themeStyles.filterGroup}>
            <h4 style={themeStyles.filterGroupTitle}>Price Range (₹)</h4>
            <div style={themeStyles.priceRange}>
              <input
                type="number"
                placeholder="Min"
                style={themeStyles.priceInput}
                value={tempFilters.priceRange.min}
                onChange={(e) => setTempFilters({
                  ...tempFilters,
                  priceRange: { ...tempFilters.priceRange, min: Number(e.target.value) }
                })}
              />
              <input
                type="number"
                placeholder="Max"
                style={themeStyles.priceInput}
                value={tempFilters.priceRange.max}
                onChange={(e) => setTempFilters({
                  ...tempFilters,
                  priceRange: { ...tempFilters.priceRange, max: Number(e.target.value) }
                })}
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div style={themeStyles.filterGroup}>
            <h4 style={themeStyles.filterGroupTitle}>Rating</h4>
            <div style={themeStyles.ratingStars}>
              {[4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  style={{
                    ...themeStyles.ratingButton,
                    ...(tempFilters.rating === rating ? themeStyles.activeRatingButton : {})
                  }}
                  onClick={() => setTempFilters({ ...tempFilters, rating: rating })}
                >
                  {rating}+ <FaStar />
                </button>
              ))}
              {tempFilters.rating > 0 && (
                <button
                  style={themeStyles.ratingButton}
                  onClick={() => setTempFilters({ ...tempFilters, rating: 0 })}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Best Seller Filter */}
          <div style={themeStyles.filterGroup}>
            <label style={themeStyles.checkboxLabel}>
              <input
                type="checkbox"
                checked={tempFilters.bestSeller}
                onChange={(e) => setTempFilters({ ...tempFilters, bestSeller: e.target.checked })}
              />
              <FaFire /> Best Selling Products Only
            </label>
          </div>

          {/* In Stock Filter */}
          <div style={themeStyles.filterGroup}>
            <label style={themeStyles.checkboxLabel}>
              <input
                type="checkbox"
                checked={tempFilters.inStock}
                onChange={(e) => setTempFilters({ ...tempFilters, inStock: e.target.checked })}
              />
              <FaHeart /> In Stock Only
            </label>
          </div>

          {/* Action Buttons */}
          <div style={themeStyles.filterActions}>
            <button style={themeStyles.resetButton} onClick={resetFilters}>
              Reset All
            </button>
            <button style={themeStyles.applyButton} onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div style={themeStyles.productsGrid}>
        {sortedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div style={themeStyles.noProducts}>
          <p>No products found matching your criteria.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Try adjusting your filters or search term.
          </p>
        </div>
      )}
    </div>
  );
};

export default Shop;