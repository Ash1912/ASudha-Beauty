import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ShadeCatalog = ({ catalog, onSelectShade, selectedShade }) => {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState('all'); // 'all', 'inStock', 'outOfStock'

  const filteredItems = catalog.items.filter(item => {
    if (filter === 'inStock') return item.inStock;
    if (filter === 'outOfStock') return !item.inStock;
    return true;
  });

  const themeStyles = {
    catalogContainer: {
      marginTop: '2rem',
      borderTop: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      paddingTop: '2rem'
    },
    catalogTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    filterBar: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    filterButton: {
      padding: '0.5rem 1rem',
      borderRadius: '2rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      color: isDarkMode ? '#cccccc' : '#666666',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },
    activeFilter: {
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      borderColor: '#e88ca6'
    },
    catalogGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '1rem',
      maxHeight: '400px',
      overflowY: 'auto',
      padding: '0.5rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '12px'
    },
    catalogItem: {
      position: 'relative',
      cursor: 'pointer',
      borderRadius: '8px',
      overflow: 'hidden',
      aspectRatio: '1/1',
      border: '2px solid transparent',
      transition: 'all 0.3s ease',
      opacity: (item) => item.inStock ? 1 : 0.5
    },
    selectedItem: {
      borderColor: '#e88ca6',
      transform: 'scale(1.05)'
    },
    itemImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    itemName: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '0.25rem',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: '#ffffff',
      fontSize: '0.8rem',
      textAlign: 'center'
    },
    outOfStockBadge: {
      position: 'absolute',
      top: '0.25rem',
      right: '0.25rem',
      backgroundColor: '#ff4444',
      color: '#ffffff',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.7rem'
    }
  };

  return (
    <div style={themeStyles.catalogContainer}>
      <h3 style={themeStyles.catalogTitle}>Shade Catalog</h3>
      
      <div style={themeStyles.filterBar}>
        <button
          style={{
            ...themeStyles.filterButton,
            ...(filter === 'all' ? themeStyles.activeFilter : {})
          }}
          onClick={() => setFilter('all')}
        >
          All Shades ({catalog.items.length})
        </button>
        <button
          style={{
            ...themeStyles.filterButton,
            ...(filter === 'inStock' ? themeStyles.activeFilter : {})
          }}
          onClick={() => setFilter('inStock')}
        >
          In Stock ({catalog.items.filter(i => i.inStock).length})
        </button>
        <button
          style={{
            ...themeStyles.filterButton,
            ...(filter === 'outOfStock' ? themeStyles.activeFilter : {})
          }}
          onClick={() => setFilter('outOfStock')}
        >
          Out of Stock ({catalog.items.filter(i => !i.inStock).length})
        </button>
      </div>

      <div style={themeStyles.catalogGrid}>
        {filteredItems.map((item, index) => (
          <div
            key={index}
            style={{
              ...themeStyles.catalogItem,
              ...(selectedShade === item.shade ? themeStyles.selectedItem : {}),
              opacity: item.inStock ? 1 : 0.5
            }}
            onClick={() => item.inStock && onSelectShade(item.shade)}
          >
            <img
              src={item.image || '/assets/images/placeholder-shade.jpg'}
              alt={item.shade}
              style={themeStyles.itemImage}
            />
            <div style={themeStyles.itemName}>{item.shade}</div>
            {!item.inStock && (
              <div style={themeStyles.outOfStockBadge}>
                <FaTimes />
              </div>
            )}
            {selectedShade === item.shade && (
              <div style={{
                position: 'absolute',
                top: '0.25rem',
                left: '0.25rem',
                backgroundColor: '#4caf50',
                color: '#ffffff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem'
              }}>
                <FaCheck />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShadeCatalog;