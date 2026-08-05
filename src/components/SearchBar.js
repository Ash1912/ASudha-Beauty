import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { products } from '../data/products';

const SearchBar = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search products based on SEO keywords and product data
  const searchProducts = (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const lowercaseTerm = term.toLowerCase();
    
    // Search through products with SEO optimization
    const results = products.filter(product => {
      // Search in name
      const nameMatch = product.name.toLowerCase().includes(lowercaseTerm);
      
      // Search in category
      const categoryMatch = product.category.toLowerCase().includes(lowercaseTerm);
      
      // Search in description
      const descriptionMatch = product.description.toLowerCase().includes(lowercaseTerm);
      
      // Search in ingredients
      const ingredientsMatch = product.ingredients?.toLowerCase().includes(lowercaseTerm) || false;
      
      // Search in benefits
      const benefitsMatch = product.benefits?.some(benefit => 
        benefit.toLowerCase().includes(lowercaseTerm)
      );
      
      // Search in shades - FIXED with type checking
      let shadesMatch = false;
      if (Array.isArray(product.shades)) {
        shadesMatch = product.shades.some(shade => 
          shade.toLowerCase().includes(lowercaseTerm)
        );
      } else if (typeof product.shades === 'number') {
        const shadeNumberMatch = 
          `${product.shades} shades`.toLowerCase().includes(lowercaseTerm) ||
          `${product.shades} colors`.toLowerCase().includes(lowercaseTerm);
        shadesMatch = shadeNumberMatch;
      }
      
      // SEO keywords with skincare additions
      const seoKeywords = [
        'makeup', 'cosmetics', 'beauty', 'skincare', 'organic', 'vegan',
        'cruelty free', 'natural', 'clean beauty', 'foundation', 'lipstick',
        'mascara', 'serum', 'cleanser', 'moisturizer', 'highlighter',
        'multani mitti', 'fullers earth', 'ubtan', 'face pack', 'clay mask',
        'oil control', 'deep cleansing', 'glowing skin', 'ayurvedic',
        'herbal face pack', 'natural face pack', 'kali mitti', 'mitti pack'
      ];
      
      const seoMatch = seoKeywords.some(keyword => 
        keyword.includes(lowercaseTerm) || lowercaseTerm.includes(keyword)
      );

      return nameMatch || categoryMatch || descriptionMatch || 
             ingredientsMatch || benefitsMatch || shadesMatch || seoMatch;
    });

    // Sort results by relevance
    results.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      if (aName === lowercaseTerm) return -1;
      if (bName === lowercaseTerm) return 1;
      
      if (aName.startsWith(lowercaseTerm) && !bName.startsWith(lowercaseTerm)) return -1;
      if (bName.startsWith(lowercaseTerm) && !aName.startsWith(lowercaseTerm)) return 1;
      
      return 0;
    });

    setSearchResults(results.slice(0, 8));
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchProducts(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsOpen(false);
    setSearchTerm('');
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    inputRef.current?.focus();
  };

  const themeStyles = {
    searchContainer: {
      position: 'relative',
      flex: 1,
      maxWidth: '500px',
      margin: '0 1rem'
    },
    searchForm: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: '50px',
      padding: '0.3rem 0.3rem 0.3rem 1rem',
      border: `2px solid ${isDarkMode ? '#555' : 'transparent'}`,
      transition: 'all 0.3s ease',
      boxShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
    },
    searchInput: {
      flex: 1,
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      fontSize: '0.95rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      padding: '0.5rem 0',
      '::placeholder': {
        color: isDarkMode ? '#999' : '#666'
      }
    },
    searchButton: {
      background: isDarkMode ? '#f5346b' : '#f5346b',
      border: 'none',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#ffffff',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'scale(1.05)',
        backgroundColor: isDarkMode ? '#ff4d7a' : '#ff4d7a'
      }
    },
    clearButton: {
      background: 'none',
      border: 'none',
      color: isDarkMode ? '#999' : '#666',
      cursor: 'pointer',
      padding: '0 0.5rem',
      fontSize: '1rem',
      ':hover': {
        color: isDarkMode ? '#fff' : '#333'
      }
    },
    resultsDropdown: {
      position: 'absolute',
      top: 'calc(100% + 0.5rem)',
      left: 0,
      right: 0,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '12px',
      boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.15)',
      maxHeight: '400px',
      overflowY: 'auto',
      zIndex: 1000,
      display: isOpen && (searchResults.length > 0 || recentSearches.length > 0) ? 'block' : 'none'
    },
    resultItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      ':hover': {
        backgroundColor: isDarkMode ? '#404040' : '#f8f8f8'
      }
    },
    resultImage: {
      width: '40px',
      height: '40px',
      objectFit: 'cover',
      borderRadius: '4px',
      marginRight: '1rem'
    },
    resultInfo: {
      flex: 1
    },
    resultName: {
      fontSize: '0.95rem',
      fontWeight: '500',
      color: isDarkMode ? '#ffffff' : '#333333',
      marginBottom: '0.2rem'
    },
    resultCategory: {
      fontSize: '0.8rem',
      color: isDarkMode ? '#999' : '#666'
    },
    resultPrice: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: isDarkMode ? '#f5346b' : '#f5346b'
    },
    recentSection: {
      padding: '0.5rem 0'
    },
    recentHeader: {
      padding: '0.5rem 1rem',
      fontSize: '0.8rem',
      color: isDarkMode ? '#999' : '#666',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    recentItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      color: isDarkMode ? '#ccc' : '#666',
      ':hover': {
        backgroundColor: isDarkMode ? '#404040' : '#f8f8f8'
      }
    },
    recentIcon: {
      marginRight: '0.75rem',
      fontSize: '0.8rem'
    }
  };

  return (
    <div ref={searchRef} style={themeStyles.searchContainer}>
      <form onSubmit={handleSearch} style={themeStyles.searchForm}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for products, categories, ingredients..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          style={themeStyles.searchInput}
        />
        {searchTerm && (
          <button type="button" onClick={clearSearch} style={themeStyles.clearButton}>
            <FaTimes />
          </button>
        )}
        <button type="submit" style={themeStyles.searchButton}>
          <FaSearch />
        </button>
      </form>

      <div style={themeStyles.resultsDropdown}>
        {!searchTerm && recentSearches.length > 0 && (
          <div style={themeStyles.recentSection}>
            <div style={themeStyles.recentHeader}>Recent Searches</div>
            {recentSearches.map((term, index) => (
              <div
                key={index}
                style={themeStyles.recentItem}
                onClick={() => {
                  setSearchTerm(term);
                  searchProducts(term);
                }}
              >
                <FaSearch style={themeStyles.recentIcon} />
                <span>{term}</span>
              </div>
            ))}
          </div>
        )}

        {searchTerm && searchResults.length > 0 && (
          <>
            {searchResults.map(product => (
              <div
                key={product.id}
                style={themeStyles.resultItem}
                onClick={() => handleResultClick(product.id)}
              >
                <img src={product.image} alt={product.name} style={themeStyles.resultImage} />
                <div style={themeStyles.resultInfo}>
                  <div style={themeStyles.resultName}>{product.name}</div>
                  <div style={themeStyles.resultCategory}>{product.category}</div>
                </div>
                <div style={themeStyles.resultPrice}>₹{product.price}</div>
              </div>
            ))}
            {searchResults.length === 8 && (
              <div
                style={themeStyles.resultItem}
                onClick={handleSearch}
              >
                <div style={{ textAlign: 'center', width: '100%', color: '#f5346b' }}>
                  View all results for "{searchTerm}"
                </div>
              </div>
            )}
          </>
        )}

        {searchTerm && searchResults.length === 0 && (
          <div style={{ ...themeStyles.resultItem, justifyContent: 'center' }}>
            No products found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;