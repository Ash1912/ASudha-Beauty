import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaSearch,
  FaTimes,
  FaLeaf,
  FaStar,
  FaClock,
  FaArrowRight,
  FaTrashAlt,
} from "react-icons/fa";
import { products } from "../data/products";

const SearchBar = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const brandColors = {
    primary: "#f5346b",
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    earthDark: "#3e2723",
    earthLight: "#6d4c41",
    cream: "#fcf8f5",
    green: "#4caf50",
  };

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch {
        /* ignore */
      }
    }
  }, []);

  // Close dropdown on outside click (input + portal dropdown)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideInput =
        searchRef.current && searchRef.current.contains(event.target);
      const clickedInsideDropdown =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      if (!clickedInsideInput && !clickedInsideDropdown) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchProducts = (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const lowercaseTerm = term.toLowerCase();

    const results = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(lowercaseTerm);
      const categoryMatch = product.category
        .toLowerCase()
        .includes(lowercaseTerm);
      const descriptionMatch = product.description
        .toLowerCase()
        .includes(lowercaseTerm);
      const ingredientsMatch =
        product.ingredients?.toLowerCase().includes(lowercaseTerm) || false;
      const benefitsMatch = product.benefits?.some((benefit) =>
        benefit.toLowerCase().includes(lowercaseTerm)
      );

      let shadesMatch = false;
      if (Array.isArray(product.shades)) {
        shadesMatch = product.shades.some((shade) =>
          shade.toLowerCase().includes(lowercaseTerm)
        );
      } else if (typeof product.shades === "number") {
        const shadeNumberMatch =
          `${product.shades} shades`.toLowerCase().includes(lowercaseTerm) ||
          `${product.shades} colors`.toLowerCase().includes(lowercaseTerm);
        shadesMatch = shadeNumberMatch;
      }

      const seoKeywords = [
        "makeup", "cosmetics", "beauty", "skincare", "organic", "vegan",
        "cruelty free", "natural", "clean beauty", "foundation", "lipstick",
        "mascara", "serum", "cleanser", "moisturizer", "highlighter",
        "multani mitti", "fullers earth", "ubtan", "face pack", "clay mask",
        "oil control", "deep cleansing", "glowing skin", "ayurvedic",
        "herbal face pack", "natural face pack", "kali mitti", "mitti pack",
        "amla", "reetha", "shikakai", "hair pack", "herbal mix", "powder",
      ];

      const seoMatch = seoKeywords.some(
        (keyword) =>
          keyword.includes(lowercaseTerm) || lowercaseTerm.includes(keyword)
      );

      return (
        nameMatch ||
        categoryMatch ||
        descriptionMatch ||
        ingredientsMatch ||
        benefitsMatch ||
        shadesMatch ||
        seoMatch
      );
    });

    results.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName === lowercaseTerm) return -1;
      if (bName === lowercaseTerm) return 1;
      if (aName.startsWith(lowercaseTerm) && !bName.startsWith(lowercaseTerm))
        return -1;
      if (bName.startsWith(lowercaseTerm) && !aName.startsWith(lowercaseTerm))
        return 1;
      if (a.category === "Skincare" && b.category !== "Skincare") return -1;
      if (b.category === "Skincare" && a.category !== "Skincare") return 1;
      return 0;
    });

    setSearchResults(results.slice(0, 8));
  };

  useEffect(() => {
    const t = setTimeout(() => searchProducts(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const persistRecent = (term) => {
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(
      0,
      5
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // ✅ Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // ✅ Remove a single recent search
  const removeRecentSearch = (termToRemove, e) => {
    e.stopPropagation(); // don't trigger the parent click (which would search)
    const updated = recentSearches.filter((t) => t !== termToRemove);
    setRecentSearches(updated);
    if (updated.length === 0) {
      localStorage.removeItem("recentSearches");
    } else {
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  const handleSearch = (e) => {
    e?.preventDefault?.();
    if (searchTerm.trim()) {
      persistRecent(searchTerm);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
      setIsFocused(false);
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleRecentClick = (term) => {
    setSearchTerm(term);
    searchProducts(term);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setIsFocused(false);
      setSearchTerm("");
    }
  };

  const themeStyles = {
    searchContainer: {
      position: "relative",
      flex: 1,
      maxWidth: "500px",
      margin: "0 1rem",
    },
    searchForm: {
      display: "flex",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
      borderRadius: "50px",
      padding: "0.2rem 0.2rem 0.2rem 1.25rem",
      border: `2px solid ${
        isFocused
          ? isDarkMode
            ? brandColors.gold
            : brandColors.bronze
          : isDarkMode
          ? "rgba(255,255,255,0.08)"
          : "rgba(62, 39, 35, 0.06)"
      }`,
      transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      boxShadow: isFocused
        ? isDarkMode
          ? `0 0 0 4px rgba(212, 175, 55, 0.15)`
          : `0 0 0 4px rgba(199, 125, 66, 0.06)`
        : isDarkMode
        ? "0 4px 12px rgba(0,0,0,0.5)"
        : "0 2px 8px rgba(62, 39, 35, 0.04)",
    },
    searchInput: {
      flex: 1,
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      fontSize: "0.9rem",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      padding: "0.6rem 0",
    },
    searchButton: {
      background: "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: isDarkMode ? "#0f0f0f" : "#ffffff",
      transition: "all 0.3s ease",
      boxShadow: isDarkMode
        ? "0 4px 12px rgba(245, 52, 107, 0.4)"
        : "0 4px 12px rgba(245, 52, 107, 0.15)",
    },
    clearButton: {
      background: "none",
      border: "none",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      cursor: "pointer",
      padding: "0 0.5rem",
      fontSize: "0.85rem",
      borderRadius: "50%",
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    resultsDropdown: {
      position: "fixed",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.98)"
        : "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderRadius: "20px",
      boxShadow: isDarkMode
        ? "0 12px 48px rgba(0,0,0,0.8)"
        : "0 12px 48px rgba(62, 39, 35, 0.12)",
      maxHeight: "420px",
      overflowY: "auto",
      zIndex: 1300,
      padding: "0.5rem 0",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      animation: "searchFadeIn 0.3s ease",
    },
    resultItem: {
      display: "flex",
      alignItems: "center",
      padding: "0.6rem 1.25rem",
      cursor: "pointer",
      transition: "all 0.25s ease",
      borderBottom: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(62, 39, 35, 0.03)"
      }`,
    },
    resultImage: {
      width: "48px",
      height: "48px",
      objectFit: "cover",
      borderRadius: "10px",
      marginRight: "1rem",
      backgroundColor: isDarkMode ? "#0f0f0f" : brandColors.cream,
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      flexShrink: 0,
    },
    resultInfo: { flex: 1, minWidth: 0 },
    resultName: {
      fontSize: "0.9rem",
      fontWeight: "500",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      marginBottom: "0.1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    resultCategory: {
      fontSize: "0.75rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    naturalBadge: {
      fontSize: "0.55rem",
      color: brandColors.green,
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.2)"
        : "rgba(76, 175, 80, 0.08)",
      padding: "1px 8px",
      borderRadius: "12px",
      fontWeight: "600",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.2rem",
    },
    resultPrice: {
      fontSize: "0.9rem",
      fontWeight: "600",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      flexShrink: 0,
      marginLeft: "0.5rem",
    },

    // Recent searches
    recentSection: { padding: "0.25rem 0" },
    recentHeader: {
      padding: "0.5rem 1.25rem 0.25rem 1.25rem",
      fontSize: "0.7rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // ✅ space for clear button
    },
    recentHeaderLeft: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    // ✅ Clear-all button
    clearRecentButton: {
      background: "none",
      border: "none",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      fontSize: "0.65rem",
      fontWeight: "700",
      letterSpacing: "1px",
      cursor: "pointer",
      padding: "0.25rem 0.5rem",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
      transition: "all 0.2s ease",
    },
    recentItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.4rem 1.25rem",
      cursor: "pointer",
      color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
      transition: "all 0.25s ease",
      gap: "0.75rem",
      fontSize: "0.85rem",
    },
    recentItemLeft: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      flex: 1,
      minWidth: 0,
    },
    recentText: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    recentIcon: {
      fontSize: "0.7rem",
      opacity: 0.5,
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
    },
    // ✅ Remove-one button
    removeRecentButton: {
      background: "none",
      border: "none",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      cursor: "pointer",
      fontSize: "0.7rem",
      padding: "0.25rem",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "22px",
      height: "22px",
      flexShrink: 0,
      transition: "all 0.2s ease",
    },

    viewAll: {
      textAlign: "center",
      padding: "0.6rem",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      fontSize: "0.85rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.3rem",
    },
    emptyState: {
      textAlign: "center",
      padding: "2rem 1.5rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
    },
    emptyIcon: {
      fontSize: "2rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      opacity: 0.3,
      marginBottom: "0.5rem",
    },
    emptyText: { fontSize: "0.9rem", fontWeight: "500" },
    emptySub: { fontSize: "0.8rem", opacity: 0.7, marginTop: "0.2rem" },
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes searchFadeIn {
        from { opacity: 0; transform: translateY(-8px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Portal dropdown position
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const updateDropdownPos = () => {
    if (!searchRef.current) return;
    const rect = searchRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 10,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    updateDropdownPos();
    window.addEventListener("resize", updateDropdownPos);
    window.addEventListener("scroll", updateDropdownPos, true);
    return () => {
      window.removeEventListener("resize", updateDropdownPos);
      window.removeEventListener("scroll", updateDropdownPos, true);
    };
  }, [isOpen, searchTerm, recentSearches.length]);

  const shouldShowDropdown =
    isOpen &&
    (searchResults.length > 0 ||
      recentSearches.length > 0 ||
      searchTerm.length > 0);

  const dropdownContent = (
    <div
      ref={dropdownRef}
      style={{
        ...themeStyles.resultsDropdown,
        top: dropdownPos.top,
        left: dropdownPos.left,
        width: dropdownPos.width,
      }}
    >
      {!searchTerm && recentSearches.length > 0 && (
        <div style={themeStyles.recentSection}>
          {/* ✅ Header with Clear All button */}
          <div style={themeStyles.recentHeader}>
            <span style={themeStyles.recentHeaderLeft}>
              <FaClock style={{ fontSize: "0.6rem" }} />
              Recent Searches
            </span>
            <button
              type="button"
              style={themeStyles.clearRecentButton}
              onClick={clearRecentSearches}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(62,39,35,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              aria-label="Clear recent searches"
            >
              <FaTrashAlt style={{ fontSize: "0.6rem" }} />
              Clear
            </button>
          </div>

          {recentSearches.map((term, index) => (
            <div
              key={index}
              style={themeStyles.recentItem}
              onClick={() => handleRecentClick(term)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(62, 39, 35, 0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span style={themeStyles.recentItemLeft}>
                <FaSearch style={themeStyles.recentIcon} />
                <span style={themeStyles.recentText}>{term}</span>
              </span>
              {/* ✅ Per-item remove (X) */}
              <button
                type="button"
                style={themeStyles.removeRecentButton}
                onClick={(e) => removeRecentSearch(term, e)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brandColors.primary;
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(245,52,107,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode
                    ? "#a0a0a0"
                    : "#bcaaa4";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                aria-label={`Remove ${term} from recent searches`}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}

      {searchTerm && searchResults.length > 0 && (
        <>
          {searchResults.map((product) => {
            const isNatural =
              product.category === "Skincare" ||
              product.category === "Hair Care";
            return (
              <div
                key={product.id}
                style={themeStyles.resultItem}
                onClick={() => handleResultClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={themeStyles.resultImage}
                />
                <div style={themeStyles.resultInfo}>
                  <div style={themeStyles.resultName}>
                    {product.name}
                    {isNatural && (
                      <span style={themeStyles.naturalBadge}>
                        <FaLeaf style={{ fontSize: "0.4rem" }} />
                        Natural
                      </span>
                    )}
                  </div>
                  <div style={themeStyles.resultCategory}>
                    {isNatural
                      ? `🌿 ${product.category}`
                      : product.category}
                    {product.bestSeller && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                          color: "#ffc107",
                        }}
                      >
                        <FaStar style={{ fontSize: "0.5rem" }} />
                        Best Seller
                      </span>
                    )}
                  </div>
                </div>
                <div style={themeStyles.resultPrice}>₹{product.price}</div>
              </div>
            );
          })}
          {searchResults.length >= 8 && (
            <div style={themeStyles.viewAll} onClick={handleSearch}>
              View all results for "{searchTerm}"
              <FaArrowRight style={{ fontSize: "0.7rem" }} />
            </div>
          )}
        </>
      )}

      {searchTerm && searchResults.length === 0 && (
        <div style={themeStyles.emptyState}>
          <div style={themeStyles.emptyIcon}>
            <FaLeaf />
          </div>
          <div style={themeStyles.emptyText}>
            No products found for "{searchTerm}"
          </div>
          <div style={themeStyles.emptySub}>
            Try searching for Multani Mitti, Ubtan, or other herbal products
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div ref={searchRef} style={themeStyles.searchContainer}>
      <form onSubmit={handleSearch} style={themeStyles.searchForm}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Ayurvedic powders, herbs..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            updateDropdownPos();
          }}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
            updateDropdownPos();
          }}
          onKeyDown={handleKeyDown}
          style={themeStyles.searchInput}
          aria-label="Search products"
          autoComplete="off"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            style={themeStyles.clearButton}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
        <button type="submit" style={themeStyles.searchButton} aria-label="Search">
          <FaSearch />
        </button>
      </form>

      {shouldShowDropdown && createPortal(dropdownContent, document.body)}
    </div>
  );
};

export default SearchBar;