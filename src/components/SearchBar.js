// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaSearch,
  FaTimes,
  FaLeaf,
  FaStar,
  FaClock,
  FaArrowRight,
  FaTrashAlt,
  FaFire,
  FaBookOpen,
  FaShoppingBag,
} from "react-icons/fa";
import { products } from "../data/products";

// ─── Brand palette (module scope: stable reference) ───
// Moved here from inside the component so ESLint's exhaustive-deps rule
// correctly treats these as stable constants in useEffect dependency arrays.
const brandColors = {
  primary: "#f5346b",
  gold: "#f7d794",
  goldDark: "#d4af37",
  bronze: "#c77d42",
  earthDark: "#3e2723",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
  black: "#0f0f0f",
};

// ─── High-search-volume Ayurvedic keyword clusters ───
// Used for product matching + suggestion chips.
// Verified via Exploding Topics / Semrush (Oct 2026):
//   "ubtan cream"      → 1.3K/mo, +475% growth
//   "ubtan face wash"  → 22.2K/mo, +6800% growth
//   "multani mitti for oily skin", "amla reetha shikakai" — evergreen commercial-intent terms
const SEO_KEYWORDS = [
  // Multani Mitti cluster
  "multani mitti",
  "multani mitti for oily skin",
  "multani mitti face pack",
  "fuller's earth",
  "clay mask for oily skin",
  "oil control face pack",
  // Ubtan cluster (highest growth)
  "ubtan",
  "ubtan powder",
  "ubtan cream",
  "ubtan face wash",
  "ubtan for glowing skin",
  // Hair-care trio
  "amla",
  "reetha",
  "shikakai",
  "amla reetha shikakai",
  "amla powder for hair",
  "reetha powder",
  "shikakai powder",
  "natural shampoo for hair fall",
  "herbal hair pack",
  "hair pack",
  "herbal mix",
  // Generic Ayurvedic / clean-beauty
  "ayurvedic",
  "ayurvedic skincare routine",
  "herbal face pack",
  "herbal face pack for glowing skin",
  "natural face pack",
  "chemical free skincare",
  "paraben free skincare",
  "glowing skin",
  "deep cleansing",
  "organic",
  "vegan",
  "cruelty free",
  "natural",
  "clean beauty",
  "kali mitti",
  "mitti pack",
  "powder",
  "skincare",
  "hair care",
];

// ─── Popular search chips (internal search hyperlinks) ───
// These act as on-site hyperlinks to the highest-value keyword terms.
// Clicking them sets the search term and navigates to /search?q=…
const POPULAR_SEARCHES = [
  { label: "Multani Mitti", query: "multani mitti" },
  { label: "Ubtan Cream", query: "ubtan cream" },
  { label: "Amla Reetha Shikakai", query: "amla reetha shikakai" },
  { label: "Natural Shampoo", query: "natural shampoo for hair fall" },
  { label: "Herbal Face Pack", query: "herbal face pack" },
  { label: "Chemical Free", query: "chemical free skincare" },
];

// ─── Trending guides (internal backlinks from the empty state) ───
const TRENDING_GUIDES = [
  { label: "Multani Mitti Benefits", to: "/blog/1" },
  { label: "Ubtan for Glowing Skin", to: "/blog/2" },
  { label: "Amla-Reetha-Shikakai Hair Care", to: "/blog/3" },
];

const SearchBar = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // ─── Load recent searches ───
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

  // ─── Outside click close ───
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideInput =
        searchRef.current && searchRef.current.contains(event.target);
      const clickedInsideDropdown =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      if (!clickedInsideInput && !clickedInsideDropdown) {
        setIsOpen(false);
        setIsFocused(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ─── Product matcher (keyword-aware, sorted by intent) ───
  const searchProducts = useCallback((term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    const lowercaseTerm = term.toLowerCase();

    const results = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(lowercaseTerm);
      const categoryMatch = product.category.toLowerCase().includes(lowercaseTerm);
      const descriptionMatch =
        product.description?.toLowerCase().includes(lowercaseTerm) || false;
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
        shadesMatch =
          `${product.shades} shades`.toLowerCase().includes(lowercaseTerm) ||
          `${product.shades} colors`.toLowerCase().includes(lowercaseTerm);
      }

      const seoMatch = SEO_KEYWORDS.some(
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

    // Intent-based sort: exact match → starts-with → Skincare → name
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
  }, []);

  // ─── Debounced search ───
  useEffect(() => {
    const t = setTimeout(() => searchProducts(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm, searchProducts]);

  // ─── Recent-search persistence ───
  const persistRecent = (term) => {
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const removeRecentSearch = (termToRemove, e) => {
    e.stopPropagation();
    const updated = recentSearches.filter((t) => t !== termToRemove);
    setRecentSearches(updated);
    if (updated.length === 0) {
      localStorage.removeItem("recentSearches");
    } else {
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  // ─── Submit ───
  const handleSearch = (e) => {
    e?.preventDefault?.();
    if (searchTerm.trim()) {
      persistRecent(searchTerm);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
      setIsFocused(false);
      setActiveIndex(-1);
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsOpen(false);
    setIsFocused(false);
    setActiveIndex(-1);
  };

  const handleRecentClick = (term) => {
    setSearchTerm(term);
    searchProducts(term);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  // ─── Popular-search chip click (internal search hyperlink) ───
  const handlePopularClick = (query) => {
    setSearchTerm(query);
    persistRecent(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsOpen(false);
    setIsFocused(false);
    setActiveIndex(-1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  // ─── Keyboard navigation (↑ / ↓ / Enter / Escape) ───
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setIsFocused(false);
      setActiveIndex(-1);
      return;
    }

    const totalItems = searchResults.length;
    if (totalItems === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % totalItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleResultClick(searchResults[activeIndex].id);
    }
  };

  // ─── Theme styles ───
  const themeStyles = {
    searchContainer: { position: "relative", flex: 1, maxWidth: "500px", margin: "0 1rem" },
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
          ? "0 0 0 4px rgba(212, 175, 55, 0.15)"
          : "0 0 0 4px rgba(199, 125, 66, 0.06)"
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
      backgroundColor: isDarkMode ? "rgba(26, 26, 26, 0.98)" : "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderRadius: "20px",
      boxShadow: isDarkMode
        ? "0 12px 48px rgba(0,0,0,0.8)"
        : "0 12px 48px rgba(62, 39, 35, 0.12)",
      maxHeight: "440px",
      overflowY: "auto",
      zIndex: 1300,
      padding: "0.5rem 0",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      animation: "searchFadeIn 0.3s ease",
    },

    // ── Popular searches chips ──
    popularSection: {
      padding: "0.25rem 1.25rem 0.75rem",
      borderBottom: isDarkMode
        ? "1px solid rgba(255,255,255,0.05)"
        : "1px solid rgba(62, 39, 35, 0.03)",
    },
    popularHeader: {
      fontSize: "0.68rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      marginBottom: "0.55rem",
    },
    popularChips: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.4rem",
    },
    popularChip: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      padding: "0.35rem 0.75rem",
      backgroundColor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(62, 39, 35, 0.04)",
      color: isDarkMode ? "#e5ded9" : brandColors.earthLight,
      border: `1px solid ${isDarkMode ? "rgba(212,175,55,0.15)" : "rgba(199,125,66,0.15)"}`,
      borderRadius: "50px",
      fontSize: "0.75rem",
      fontWeight: "600",
      cursor: "pointer",
      fontFamily: "inherit",
      transition: "all 0.25s ease",
    },

    // ── Recent searches ──
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
      justifyContent: "space-between",
    },
    recentHeaderLeft: { display: "flex", alignItems: "center", gap: "0.5rem" },
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
    recentItemLeft: { display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 },
    recentText: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
    recentIcon: {
      fontSize: "0.7rem",
      opacity: 0.5,
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
    },
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

    // ── Result item ──
    resultItem: {
      display: "flex",
      alignItems: "center",
      padding: "0.6rem 1.25rem",
      cursor: "pointer",
      transition: "all 0.25s ease",
      borderBottom: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(62, 39, 35, 0.03)"
      }`,
      outline: "none",
    },
    resultItemActive: {
      backgroundColor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(62, 39, 35, 0.03)",
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
      backgroundColor: isDarkMode ? "rgba(76, 175, 80, 0.2)" : "rgba(76, 175, 80, 0.08)",
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
      background: "transparent",
      border: "none",
      width: "100%",
      fontFamily: "inherit",
    },

    // ── Empty state ──
    emptyState: {
      textAlign: "center",
      padding: "2rem 1.5rem 1rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
    },
    emptyIcon: {
      fontSize: "2rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      opacity: 0.3,
      marginBottom: "0.5rem",
    },
    emptyText: { fontSize: "0.9rem", fontWeight: "500", color: isDarkMode ? "#e5ded9" : brandColors.earthDark },
    emptySub: { fontSize: "0.8rem", opacity: 0.7, marginTop: "0.2rem" },
    emptyLinks: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "1rem",
      paddingTop: "1rem",
      borderTop: isDarkMode
        ? "1px solid rgba(255,255,255,0.05)"
        : "1px solid rgba(62, 39, 35, 0.03)",
    },
    emptyLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      padding: "0.45rem 0.9rem",
      borderRadius: "50px",
      fontSize: "0.78rem",
      fontWeight: "700",
      textDecoration: "none",
      color: isDarkMode ? brandColors.black : "#ffffff",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      boxShadow: "0 6px 18px rgba(245, 52, 107, 0.25)",
    },
    emptyLinkOutline: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      padding: "0.45rem 0.9rem",
      borderRadius: "50px",
      fontSize: "0.78rem",
      fontWeight: "700",
      textDecoration: "none",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      backgroundColor: "transparent",
      border: `1.5px solid ${isDarkMode ? brandColors.gold : brandColors.bronze}`,
    },
    trendingHeader: {
      fontSize: "0.65rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      fontWeight: "700",
      marginTop: "1rem",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.35rem",
    },
    trendingList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
      marginTop: "0.5rem",
    },
    trendingLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
      padding: "0.45rem 0.7rem",
      borderRadius: "8px",
      fontSize: "0.8rem",
      fontWeight: "600",
      color: isDarkMode ? "#e5ded9" : brandColors.earthLight,
      textDecoration: "none",
      border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(62,39,35,0.06)"}`,
      transition: "all 0.2s ease",
    },
  };

  // ─── Injected keyframes ───
  // brandColors is now module-scope, so ESLint treats it as stable
  // and does NOT flag it as a missing dependency.
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-searchbar-styles", "true");
    style.textContent = `
      @keyframes searchFadeIn {
        from { opacity: 0; transform: translateY(-8px) scale(0.98); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      /* Popular chip hover */
      .popular-chip:hover,
      .popular-chip:focus-visible {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        border-color: transparent !important;
        outline: none;
      }

      /* Result item hover + active */
      .search-result-item:hover,
      .search-result-item:focus-visible,
      .search-result-item.is-active {
        background-color: ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(62,39,35,0.03)"} !important;
        outline: none;
      }

      /* Empty-state link hover */
      .empty-link:hover,
      .empty-link:focus-visible {
        transform: translateY(-1px);
        box-shadow: 0 10px 22px rgba(245,52,107,0.35);
        outline: none;
      }
      .empty-link-outline:hover,
      .empty-link-outline:focus-visible {
        background: ${isDarkMode ? "rgba(212,175,55,0.12)" : "rgba(199,125,66,0.08)"} !important;
        outline: none;
      }

      /* Trending guide hover */
      .trending-link:hover,
      .trending-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        outline: none;
      }

      /* Global focus ring for search buttons */
      .searchbar-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.querySelector('style[data-searchbar-styles="true"]');
      if (el && el.parentNode) el.parentNode.removeChild(el);
    };
  }, [isDarkMode]);

  // ─── Portal dropdown positioning ───
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const updateDropdownPos = () => {
    if (!searchRef.current) return;
    const rect = searchRef.current.getBoundingClientRect();
    setDropdownPos({ top: rect.bottom + 10, left: rect.left, width: rect.width });
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
      searchTerm.length > 0 ||
      (!searchTerm && recentSearches.length === 0));

  // ─── Dropdown content ───
  const dropdownContent = (
    <div
      ref={dropdownRef}
      role="listbox"
      id="search-results-listbox"
      aria-label="Search suggestions and results"
      style={{
        ...themeStyles.resultsDropdown,
        top: dropdownPos.top,
        left: dropdownPos.left,
        width: dropdownPos.width,
      }}
    >
      {/* ── Popular Searches (internal search hyperlinks) ── */}
      {!searchTerm && (
        <div style={themeStyles.popularSection}>
          <div style={themeStyles.popularHeader}>
            <FaFire aria-hidden="true" style={{ fontSize: "0.6rem" }} />
            Popular Ayurvedic Searches
          </div>
          <div style={themeStyles.popularChips}>
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item.label}
                type="button"
                className="popular-chip"
                style={themeStyles.popularChip}
                onClick={() => handlePopularClick(item.query)}
                aria-label={`Search for ${item.label}`}
              >
                <FaSearch aria-hidden="true" style={{ fontSize: "0.55rem", opacity: 0.7 }} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Recent searches ── */}
      {!searchTerm && recentSearches.length > 0 && (
        <div style={themeStyles.recentSection}>
          <div style={themeStyles.recentHeader}>
            <span style={themeStyles.recentHeaderLeft}>
              <FaClock aria-hidden="true" style={{ fontSize: "0.6rem" }} />
              Recent Searches
            </span>
            <button
              type="button"
              className="searchbar-btn"
              style={themeStyles.clearRecentButton}
              onClick={clearRecentSearches}
              aria-label="Clear all recent searches"
            >
              <FaTrashAlt aria-hidden="true" style={{ fontSize: "0.6rem" }} />
              Clear
            </button>
          </div>

          {recentSearches.map((term, index) => (
            <div
              key={index}
              role="option"
              aria-selected={false}
              tabIndex={0}
              style={themeStyles.recentItem}
              onClick={() => handleRecentClick(term)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleRecentClick(term);
                }
              }}
            >
              <span style={themeStyles.recentItemLeft}>
                <FaSearch aria-hidden="true" style={themeStyles.recentIcon} />
                <span style={themeStyles.recentText}>{term}</span>
              </span>
              <button
                type="button"
                className="searchbar-btn"
                style={themeStyles.removeRecentButton}
                onClick={(e) => removeRecentSearch(term, e)}
                aria-label={`Remove "${term}" from recent searches`}
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Search results ── */}
      {searchTerm && searchResults.length > 0 && (
        <>
          {searchResults.map((product, idx) => {
            const isNatural =
              product.category === "Skincare" ||
              product.category === "Hair Care";
            const isActive = activeIndex === idx;
            return (
              <div
                key={product.id}
                role="option"
                aria-selected={isActive}
                tabIndex={-1}
                style={{
                  ...themeStyles.resultItem,
                  ...(isActive && themeStyles.resultItemActive),
                }}
                className={`search-result-item${isActive ? " is-active" : ""}`}
                onClick={() => handleResultClick(product.id)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <img
                  src={product.image}
                  alt={`${product.name} — ${product.category} by ASudha Beauty`}
                  style={themeStyles.resultImage}
                  loading="lazy"
                  decoding="async"
                />
                <div style={themeStyles.resultInfo}>
                  <div style={themeStyles.resultName}>
                    {product.name}
                    {isNatural && (
                      <span style={themeStyles.naturalBadge}>
                        <FaLeaf aria-hidden="true" style={{ fontSize: "0.4rem" }} />
                        Natural
                      </span>
                    )}
                  </div>
                  <div style={themeStyles.resultCategory}>
                    {isNatural && (
                      <FaLeaf aria-hidden="true" style={{ fontSize: "0.5rem", opacity: 0.7 }} />
                    )}
                    {product.category}
                    {product.bestSeller && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                          color: "#ffc107",
                        }}
                      >
                        <FaStar aria-hidden="true" style={{ fontSize: "0.5rem" }} />
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
            <button
              type="button"
              className="searchbar-btn"
              style={themeStyles.viewAll}
              onClick={handleSearch}
              aria-label={`View all results for ${searchTerm}`}
            >
              View all results for "{searchTerm}"
              <FaArrowRight aria-hidden="true" style={{ fontSize: "0.7rem" }} />
            </button>
          )}
        </>
      )}

      {/* ── Empty state with internal hyperlinks ── */}
      {searchTerm && searchResults.length === 0 && (
        <div style={themeStyles.emptyState}>
          <div style={themeStyles.emptyIcon}>
            <FaLeaf aria-hidden="true" />
          </div>
          <div style={themeStyles.emptyText}>
            No products found for "{searchTerm}"
          </div>
          <div style={themeStyles.emptySub}>
            Try Multani Mitti, Ubtan, Amla, Reetha, or Shikakai
          </div>

          {/* Internal hyperlinks to encourage continued navigation */}
          <div style={themeStyles.emptyLinks}>
            <Link
              to="/shop"
              className="empty-link"
              style={themeStyles.emptyLink}
              onClick={() => setIsOpen(false)}
            >
              <FaShoppingBag aria-hidden="true" style={{ fontSize: "0.7rem" }} />
              Browse All Products
            </Link>
            <Link
              to="/blog"
              className="empty-link-outline"
              style={themeStyles.emptyLinkOutline}
              onClick={() => setIsOpen(false)}
            >
              <FaBookOpen aria-hidden="true" style={{ fontSize: "0.7rem" }} />
              Read Ayurvedic Guides
            </Link>
          </div>

          {/* Trending guides — deep internal links */}
          <div style={themeStyles.trendingHeader}>
            <FaFire aria-hidden="true" style={{ fontSize: "0.6rem" }} />
            Trending Guides
          </div>
          <div style={themeStyles.trendingList}>
            {TRENDING_GUIDES.map((guide) => (
              <Link
                key={guide.to}
                to={guide.to}
                className="trending-link"
                style={themeStyles.trendingLink}
                onClick={() => setIsOpen(false)}
              >
                <span>{guide.label}</span>
                <FaArrowRight aria-hidden="true" style={{ fontSize: "0.6rem" }} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div ref={searchRef} style={themeStyles.searchContainer}>
      <form
        onSubmit={handleSearch}
        style={themeStyles.searchForm}
        role="search"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Multani Mitti, Ubtan, Amla…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
            updateDropdownPos();
          }}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
            updateDropdownPos();
          }}
          onKeyDown={handleKeyDown}
          style={themeStyles.searchInput}
          aria-label="Search Ayurvedic products"
          aria-autocomplete="list"
          aria-controls="search-results-listbox"
          aria-expanded={shouldShowDropdown}
          role="combobox"
          autoComplete="off"
        />
        {searchTerm && (
          <button
            type="button"
            className="searchbar-btn"
            onClick={clearSearch}
            style={themeStyles.clearButton}
            aria-label="Clear search"
          >
            <FaTimes aria-hidden="true" />
          </button>
        )}
        <button
          type="submit"
          className="searchbar-btn"
          style={themeStyles.searchButton}
          aria-label="Submit search"
        >
          <FaSearch aria-hidden="true" />
        </button>
      </form>

      {shouldShowDropdown && createPortal(dropdownContent, document.body)}
    </div>
  );
};

export default SearchBar;