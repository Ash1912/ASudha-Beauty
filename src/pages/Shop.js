import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import SEO from "../components/SEO";
import {
  FaStar,
  FaTags,
  FaTimes,
  FaHeart,
  FaFire,
  FaLeaf,
  FaSpa,
  FaSlidersH,
  FaUndoAlt,
  FaBoxOpen,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";

// ─── Brand palette (module-scope: stable references) ───
const brandColors = {
  primary: "#f5346b",
  primaryDark: "#cf2a57",
  gold: "#f7d794",
  goldDark: "#d4af37",
  bronze: "#c77d42",
  black: "#0f0f0f",
  darkSlate: "#1a1a1a",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const SORT_OPTIONS = [
  { value: "featured", label: "Sort by: Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name (A–Z)" },
  { value: "rating", label: "Top Rated" },
  { value: "best-selling", label: "Best Selling" },
];

const Shop = () => {
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    bestSeller: false,
    inStock: false,
    natural: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [tempFilters, setTempFilters] = useState({
    category: "all",
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    bestSeller: false,
    inStock: false,
    natural: false,
  });

  // ─── Custom dropdown state ───
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);
  const sortTriggerRef = useRef(null);

  // ✅ Portal-based dropdown position state
  const [dropdownPos, setDropdownPos] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // ─── DARK TOKENS ───
  const dark = {
    bg: brandColors.black,
    bgAlt: "#141414",
    card: brandColors.darkSlate,
    cardAlt: "#222222",
    border: "rgba(212, 175, 55, 0.14)",
    borderSoft: "rgba(255, 255, 255, 0.06)",
    divider: "rgba(255, 255, 255, 0.08)",
    text: "#f5f0eb",
    textMuted: "#c9b8b0",
    textDim: "#8d7d76",
    gold: brandColors.gold,
    green: brandColors.green,
    accent: brandColors.primary,
    shadow: DARK_SHADOW,
    shadowLift: DARK_SHADOW_LIFT,
  };

  // ─── LIGHT TOKENS ───
  const light = {
    bg: brandColors.cream,
    bgAlt: "#ffffff",
    card: "#ffffff",
    cardAlt: "#f9f4f0",
    border: "rgba(62, 39, 35, 0.08)",
    borderSoft: "rgba(62, 39, 35, 0.04)",
    divider: "rgba(62, 39, 35, 0.06)",
    text: "#3e2723",
    textMuted: brandColors.earthLight,
    textDim: "#8d7d76",
    gold: brandColors.goldDark,
    green: brandColors.green,
    accent: brandColors.primary,
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;
  const isMedium = windowWidth <= 1024;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTempFilters((prev) => ({ ...prev, category: selectedCategory }));
  }, [selectedCategory]);

  // Lock body scroll while filter drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = showFilters ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [showFilters]);

  // Close custom sort dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(e.target) &&
        sortTriggerRef.current &&
        !sortTriggerRef.current.contains(e.target)
      ) {
        setSortDropdownOpen(false);
      }
    };
    if (sortDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortDropdownOpen]);

  // Close custom sort dropdown on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setSortDropdownOpen(false);
    };
    if (sortDropdownOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [sortDropdownOpen]);

  // ✅ Recalculate dropdown position when it opens, on scroll, on resize
  const updateDropdownPos = () => {
    if (!sortTriggerRef.current) return;
    const rect = sortTriggerRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!sortDropdownOpen) return;
    updateDropdownPos();
    window.addEventListener("resize", updateDropdownPos);
    window.addEventListener("scroll", updateDropdownPos, true);
    return () => {
      window.removeEventListener("resize", updateDropdownPos);
      window.removeEventListener("scroll", updateDropdownPos, true);
    };
  }, [sortDropdownOpen, windowWidth]);

  // ✅ Categories derived from actual product data
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category).filter(Boolean));
    return ["all", ...Array.from(unique).sort()];
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        selectedCategory !== "all" &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      )
        return false;
      if (
        product.price < selectedFilters.priceRange.min ||
        product.price > selectedFilters.priceRange.max
      )
        return false;
      if (
        selectedFilters.rating > 0 &&
        (product.rating || 0) < selectedFilters.rating
      )
        return false;
      if (selectedFilters.bestSeller && !product.bestSeller) return false;
      if (selectedFilters.inStock && !product.inStock) return false;
      if (
        selectedFilters.natural &&
        product.category !== "Skincare" &&
        product.category !== "Hair Care"
      )
        return false;
      return true;
    });
  }, [selectedCategory, selectedFilters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "best-selling":
        sorted.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label || "Sort by: Featured";

  const handleAddToCart = (product) => {
    addToCart(
      product,
      Array.isArray(product.shades) && product.shades.length > 0
        ? product.shades[0]
        : "",
      1
    );
  };

  const applyFilters = () => {
    setSelectedCategory(tempFilters.category);
    setSelectedFilters({
      priceRange: tempFilters.priceRange,
      rating: tempFilters.rating,
      bestSeller: tempFilters.bestSeller,
      inStock: tempFilters.inStock,
      natural: tempFilters.natural,
    });
    setShowFilters(false);
  };

  const resetFilters = () => {
    const resetValues = {
      category: "all",
      priceRange: { min: 0, max: 5000 },
      rating: 0,
      bestSeller: false,
      inStock: false,
      natural: false,
    };
    setTempFilters(resetValues);
    setSelectedCategory("all");
    setSelectedFilters({
      priceRange: { min: 0, max: 5000 },
      rating: 0,
      bestSeller: false,
      inStock: false,
      natural: false,
    });
    setSortBy("featured");
    setShowFilters(false);
  };

  const clearFilter = (filterName) => {
    const newFilters = { ...selectedFilters };
    const newTempFilters = { ...tempFilters };

    switch (filterName) {
      case "price":
        newFilters.priceRange = { min: 0, max: 5000 };
        newTempFilters.priceRange = { min: 0, max: 5000 };
        break;
      case "rating":
        newFilters.rating = 0;
        newTempFilters.rating = 0;
        break;
      case "bestSeller":
        newFilters.bestSeller = false;
        newTempFilters.bestSeller = false;
        break;
      case "inStock":
        newFilters.inStock = false;
        newTempFilters.inStock = false;
        break;
      case "natural":
        newFilters.natural = false;
        newTempFilters.natural = false;
        break;
      case "category":
        setSelectedCategory("all");
        newTempFilters.category = "all";
        break;
      default:
        break;
    }
    setSelectedFilters(newFilters);
    setTempFilters(newTempFilters);
  };

  const activeFilterCount = () => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (
      selectedFilters.priceRange.min > 0 ||
      selectedFilters.priceRange.max < 5000
    )
      count++;
    if (selectedFilters.rating > 0) count++;
    if (selectedFilters.bestSeller) count++;
    if (selectedFilters.inStock) count++;
    if (selectedFilters.natural) count++;
    return count;
  };

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-shop-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-shop-styles", "true");
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes sortFadeIn {
        from { opacity: 0; transform: translateY(-6px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Native select options (only used inside filter drawer) */
      select option, select optgroup {
        background-color: ${isDarkMode ? brandColors.darkSlate : "#ffffff"} !important;
        color: ${isDarkMode ? "#ffffff" : brandColors.earthLight} !important;
        padding: 0.5rem;
      }

      .shop-filter-btn:hover {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        border-color: transparent !important;
        transform: translateY(-3px);
        box-shadow: 0 14px 32px rgba(245, 52, 107, 0.4);
      }
      .shop-close-btn:hover {
        color: ${brandColors.primary} !important;
        transform: rotate(90deg);
        background: ${
          isDarkMode
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(62, 39, 35, 0.05)"
        } !important;
      }
      .shop-clear-chip:hover {
        transform: scale(1.25);
        color: ${brandColors.gold} !important;
      }
      .shop-apply-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 34px rgba(245, 52, 107, 0.5);
      }
      .shop-reset-btn:hover {
        border-color: ${brandColors.primary};
        color: ${brandColors.primary};
        transform: translateY(-3px);
      }
      .shop-clear-filters-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 34px rgba(245, 52, 107, 0.5);
        gap: 0.65rem;
      }
      .shop-select:focus,
      .shop-input:focus {
        border-color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important;
        box-shadow: 0 0 0 3px ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.18)"
            : "rgba(199, 125, 66, 0.12)"
        };
      }
      .shop-banner-chip:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(76, 175, 80, 0.25);
      }
      .shop-sort-trigger:hover {
        border-color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important;
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(245, 52, 107, 0.25) !important;
      }
      .shop-sort-option:hover {
        background-color: ${
          isDarkMode
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(62, 39, 35, 0.05)"
        } !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-shop-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  const themeStyles = {
    // ─── Page wrapper ───
    container: {
      maxWidth: "1280px",
      width: "100%",
      margin: "0 auto",
      padding: isMobile
        ? "1.25rem 1rem 3rem"
        : isNarrow
        ? "1.5rem 1.25rem 4rem"
        : "2rem 1.5rem 5rem",
      backgroundColor: T.bg,
      color: T.text,
      position: "relative",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      minHeight: "100%",
    },

    // ─── Fixed ambient blobs ───
    bgBlob1: {
      position: "fixed",
      top: "-160px",
      right: "-160px",
      width: "420px",
      height: "420px",
      maxWidth: "55vw",
      maxHeight: "55vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, #f7d794 0%, #f5346b 70%, transparent 100%)",
      opacity: isDarkMode ? 0.12 : 0.08,
      filter: "blur(110px)",
      zIndex: 0,
      pointerEvents: "none",
    },
    bgBlob2: {
      position: "fixed",
      bottom: "-160px",
      left: "-160px",
      width: "380px",
      height: "380px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, #4caf50 0%, #f7d794 70%, transparent 100%)",
      opacity: isDarkMode ? 0.12 : 0.08,
      filter: "blur(110px)",
      zIndex: 0,
      pointerEvents: "none",
    },

    // ─── Natural banner ───
    naturalBanner: {
      position: "relative",
      zIndex: 1,
      background: isDarkMode
        ? "linear-gradient(135deg, #142a1f 0%, #1f3a2d 100%)"
        : "linear-gradient(135deg, #eaf6ea 0%, #f4fbf4 100%)",
      borderRadius: "24px",
      padding: isMobile ? "1.5rem 1.25rem" : "2rem 2rem",
      textAlign: "center",
      marginBottom: "1.75rem",
      color: isDarkMode ? "#e8f5e9" : "#2e7d32",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.22)" : "rgba(76, 175, 80, 0.15)"
      }`,
      boxShadow: isDarkMode
        ? "0 14px 40px rgba(0, 0, 0, 0.4)"
        : "0 14px 40px rgba(76, 175, 80, 0.1)",
      boxSizing: "border-box",
      maxWidth: "100%",
      overflow: "hidden",
    },
    naturalBannerAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.9,
    },
    bannerIconWrap: {
      width: "56px",
      height: "56px",
      margin: "0 auto 0.9rem",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.green}, #8bc34a)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.4rem",
      color: "#ffffff",
      boxShadow: "0 10px 26px rgba(76, 175, 80, 0.35)",
    },
    bannerTitle: {
      fontSize: isMobile ? "1.2rem" : "1.5rem",
      fontWeight: "900",
      marginBottom: "0.5rem",
      color: isDarkMode ? brandColors.gold : "#1b5e20",
      wordBreak: "break-word",
      letterSpacing: "-0.3px",
      lineHeight: "1.2",
    },
    bannerSubtitle: {
      opacity: 0.92,
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      color: isDarkMode ? "#c9e6c9" : "#2e7d32",
    },
    bannerChips: {
      display: "flex",
      gap: "0.45rem",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: "1rem",
    },
    bannerChip: {
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(255, 255, 255, 0.9)",
      padding: "0.4rem 0.95rem",
      borderRadius: "50px",
      fontSize: "0.75rem",
      fontWeight: "700",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      border: isDarkMode
        ? "1px solid rgba(76, 175, 80, 0.3)"
        : "1px solid rgba(76, 175, 80, 0.18)",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      flexShrink: 0,
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
    },

    // ─── Header ───
    header: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.25rem",
      flexWrap: "wrap",
      gap: "0.75rem",
    },
    title: {
      fontSize: isMobile ? "1.4rem" : isNarrow ? "1.7rem" : "2rem",
      fontWeight: "900",
      color: isDarkMode ? brandColors.gold : brandColors.earthLight,
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      margin: 0,
      flexWrap: "wrap",
      lineHeight: "1.2",
      letterSpacing: "-0.5px",
      position: "relative",
      paddingBottom: "0.4rem",
    },
    titleAccent: {
      position: "absolute",
      left: 0,
      bottom: 0,
      height: "3px",
      width: "100%",
      maxWidth: "160px",
      borderRadius: "3px",
      background: isDarkMode
        ? `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`
        : `linear-gradient(90deg, ${brandColors.goldDark}, ${brandColors.primary})`,
    },
    resultCount: {
      fontSize: isMobile ? "0.82rem" : "0.9rem",
      color: T.text,
      fontWeight: "700",
      padding: "0.4rem 1rem",
      backgroundColor: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      whiteSpace: "nowrap",
      boxShadow: T.shadow,
    },

    // ─── Filter bar ───
    filterBar: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
      flexWrap: "wrap",
      gap: "0.75rem",
    },
    filterButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      padding: isMobile ? "0.7rem 1.2rem" : "0.8rem 1.5rem",
      backgroundColor: T.card,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      cursor: "pointer",
      color: T.text,
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      fontWeight: "700",
      transition: "all 0.3s ease",
      flexShrink: 0,
      fontFamily: "inherit",
      boxShadow: T.shadow,
    },
    filterCount: {
      backgroundColor: T.accent,
      color: "#fff",
      borderRadius: "50%",
      padding: "2px 8px",
      fontSize: "0.72rem",
      fontWeight: "800",
      marginLeft: "0.1rem",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "20px",
    },

    // ─── Custom sort dropdown ───
    sortWrapper: {
      position: "relative",
      flexShrink: 0,
      minWidth: isMobile ? "0" : "220px",
      flexGrow: isNarrow ? 1 : 0,
    },
    sortTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.6rem",
      width: "100%",
      padding: isMobile ? "0.7rem 1.05rem" : "0.8rem 1.35rem",
      backgroundColor: T.card,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      cursor: "pointer",
      color: T.text,
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      fontWeight: "600",
      fontFamily: "inherit",
      transition: "all 0.25s ease",
      boxShadow: T.shadow,
      textAlign: "left",
    },
    sortTriggerLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: T.text,
    },
    sortChevron: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.25s ease",
      transform: sortDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
      color: T.textMuted,
      fontSize: "0.75rem",
      flexShrink: 0,
    },
    // ✅ Portal-rendered menu — position is `fixed`, calculated from trigger rect
    sortMenu: {
      position: "fixed",
      top: dropdownPos.top,
      left: dropdownPos.left,
      minWidth: dropdownPos.width,
      width: isMobile ? dropdownPos.width : "auto",
      backgroundColor: T.card,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: `1px solid ${T.border}`,
      borderRadius: "18px",
      boxShadow: isDarkMode
        ? "0 20px 50px rgba(0, 0, 0, 0.7)"
        : "0 20px 50px rgba(62, 39, 35, 0.15)",
      padding: "0.4rem",
      zIndex: 9999,
      animation: "sortFadeIn 0.2s ease",
      overflow: "hidden",
    },
    sortOption: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.75rem",
      width: "100%",
      padding: "0.65rem 1rem",
      background: "transparent",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      color: T.text,
      fontSize: "0.88rem",
      fontWeight: "500",
      fontFamily: "inherit",
      textAlign: "left",
      transition: "background-color 0.2s ease",
      whiteSpace: "nowrap",
    },
    sortOptionActive: {
      color: T.accent,
      fontWeight: "800",
    },
    sortCheck: {
      color: T.accent,
      fontSize: "0.75rem",
      flexShrink: 0,
    },

    // ─── Active filters ───
    activeFilters: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexWrap: "wrap",
      gap: "0.6rem",
      marginBottom: "1.5rem",
      alignItems: "center",
    },
    filterChip: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: "0.5rem 1.05rem",
      backgroundColor: T.card,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      fontSize: isMobile ? "0.78rem" : "0.83rem",
      color: T.text,
      fontWeight: "600",
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      boxShadow: T.shadow,
    },
    clearChip: {
      cursor: "pointer",
      color: T.accent,
      fontSize: "0.9rem",
      transition: "transform 0.3s ease",
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },
    clearAllButton: {
      background: "none",
      border: "none",
      color: T.accent,
      fontSize: "0.85rem",
      fontWeight: "800",
      cursor: "pointer",
      textDecoration: "underline",
      padding: "0.3rem 0.6rem",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },

    // ─── Filter drawer ───
    filterOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      zIndex: 1400,
      display: showFilters ? "flex" : "none",
      alignItems: "stretch",
      justifyContent: "flex-end",
      transition: "opacity 0.3s ease",
      overflow: "hidden",
    },
    filterModal: {
      backgroundColor: isDarkMode ? "rgba(15, 15, 15, 0.98)" : "#ffffff",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      width: "100%",
      maxWidth: "480px",
      height: "100%",
      padding: isMobile ? "1.35rem" : "2.25rem",
      boxSizing: "border-box",
      boxShadow: isDarkMode
        ? "-14px 0 50px rgba(0, 0, 0, 0.65)"
        : "-14px 0 50px rgba(62, 39, 35, 0.15)",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      overflowX: "hidden",
      animation: "slideInRight 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      color: T.text,
    },
    filterModalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.85rem",
      paddingBottom: "1.1rem",
      borderBottom: `1px solid ${T.divider}`,
      flexShrink: 0,
      gap: "1rem",
    },
    filterModalTitle: {
      fontSize: isMobile ? "1.15rem" : "1.35rem",
      fontWeight: "900",
      color: isDarkMode ? brandColors.gold : brandColors.earthLight,
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      letterSpacing: "-0.3px",
      margin: 0,
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "1.4rem",
      cursor: "pointer",
      color: T.textMuted,
      transition: "all 0.3s ease",
      flexShrink: 0,
      padding: "0.35rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    filterGroup: { marginBottom: "1.85rem" },
    filterGroupTitle: {
      fontSize: "0.8rem",
      fontWeight: "800",
      marginBottom: "0.85rem",
      color: T.text,
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    priceRange: { display: "flex", gap: "0.75rem", marginTop: "0.5rem" },
    priceInput: {
      flex: 1,
      minWidth: 0,
      padding: "0.8rem 1rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      border: `1px solid ${T.border}`,
      borderRadius: "14px",
      color: T.text,
      outline: "none",
      boxSizing: "border-box",
      width: "100%",
      fontFamily: "inherit",
      fontSize: "0.9rem",
      fontWeight: "600",
      colorScheme: isDarkMode ? "dark" : "light",
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    },
    ratingStars: { display: "flex", gap: "0.5rem", flexWrap: "wrap" },
    ratingButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.55rem 1.05rem",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.04)"
        : "rgba(62, 39, 35, 0.04)",
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.25s ease",
      fontSize: "0.85rem",
      color: T.textMuted,
      flexShrink: 0,
      fontFamily: "inherit",
      fontWeight: "700",
    },
    activeRatingButton: {
      backgroundColor: "rgba(245, 52, 107, 0.12)",
      color: T.accent,
      borderColor: T.accent,
      fontWeight: "800",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      cursor: "pointer",
      marginBottom: "1rem",
      color: T.text,
      fontWeight: "600",
      fontSize: "0.92rem",
      padding: "0.35rem 0",
    },
    filterActions: {
      display: "flex",
      gap: "0.75rem",
      marginTop: "auto",
      paddingTop: "1.85rem",
      borderTop: `1px solid ${T.divider}`,
      flexShrink: 0,
      flexWrap: "wrap",
    },
    applyButton: {
      flex: 1,
      minWidth: "140px",
      padding: "0.95rem",
      border: "none",
      borderRadius: "50px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#fff",
      fontSize: "0.95rem",
      fontWeight: "800",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },
    resetButton: {
      flex: 1,
      minWidth: "140px",
      padding: "0.95rem",
      backgroundColor: "transparent",
      color: T.text,
      border: `2px solid ${
        isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(62, 39, 35, 0.15)"
      }`,
      borderRadius: "50px",
      fontSize: "0.95rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
    },

    // ─── Products grid ───
    productsGrid: {
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns: isMobile
        ? "minmax(0, 1fr)"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : isMedium
        ? "repeat(3, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: isMobile ? "1rem" : "1.35rem",
      marginTop: "1rem",
      alignItems: "stretch",
      maxWidth: "100%",
      minWidth: 0,
      boxSizing: "border-box",
    },

    // ─── Empty state ───
    noProducts: {
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      padding: isMobile ? "3rem 1.5rem" : "4rem 2rem",
      backgroundColor: T.card,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: "24px",
      color: T.textMuted,
      fontSize: "1rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      maxWidth: "100%",
    },
    noProductsIconWrap: {
      width: "80px",
      height: "80px",
      margin: "0 auto 1.25rem",
      borderRadius: "50%",
      background: isDarkMode
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(62, 39, 35, 0.04)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      color: T.textMuted,
    },
    noProductsTitle: {
      fontSize: "1.2rem",
      fontWeight: "900",
      color: T.text,
      marginBottom: "0.6rem",
      letterSpacing: "-0.3px",
    },
    noProductsText: {
      fontSize: "0.92rem",
      marginBottom: "1.5rem",
      lineHeight: "1.65",
      maxWidth: "420px",
      margin: "0 auto 1.5rem",
    },
    clearFiltersBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.85rem 1.75rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: "0.92rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      fontFamily: "inherit",
    },
  };

  // ✅ Portal-rendered dropdown content
  const sortDropdownContent = sortDropdownOpen ? (
    <div
      ref={sortDropdownRef}
      style={themeStyles.sortMenu}
      role="listbox"
      aria-label="Sort options"
    >
      {SORT_OPTIONS.map((opt) => {
        const active = opt.value === sortBy;
        return (
          <button
            key={opt.value}
            type="button"
            role="option"
            aria-selected={active}
            className="shop-sort-option"
            style={{
              ...themeStyles.sortOption,
              ...(active ? themeStyles.sortOptionActive : {}),
            }}
            onClick={() => {
              setSortBy(opt.value);
              setSortDropdownOpen(false);
            }}
          >
            <span>{opt.label}</span>
            {active && (
              <span style={themeStyles.sortCheck}>
                <FaCheck />
              </span>
            )}
          </button>
        );
      })}
    </div>
  ) : null;

  return (
    <div style={themeStyles.container}>
      <SEO
        title={
          selectedCategory === "all"
            ? "Shop Natural Ayurvedic Products | ASudha Beauty"
            : `${selectedCategory} Products | ASudha Beauty`
        }
        description="Shop ASudha Beauty's 100% natural Ayurvedic skincare and hair care powders. Multani Mitti, Ubtan, Amla, Reetha, Shikakai, and more."
        keywords="natural skincare, Ayurvedic products, Multani Mitti, Ubtan, Shikakai, hair care powders, ASudha Beauty shop"
        url="/shop"
      />

      <div style={themeStyles.bgBlob1}></div>
      <div style={themeStyles.bgBlob2}></div>

      {/* Natural banner — only on default view */}
      {selectedCategory === "all" && activeFilterCount() === 0 && (
        <div style={themeStyles.naturalBanner}>
          <div style={themeStyles.naturalBannerAccent} />
          <div style={themeStyles.bannerIconWrap}>
            <FaSpa />
          </div>
          <h2 style={themeStyles.bannerTitle}>
            Discover Natural Skincare & Haircare
          </h2>
          <p style={themeStyles.bannerSubtitle}>
            Explore our collection of 100% natural, Ayurvedic products including
            Multani Mitti, Ubtan, Shikakai, and more.
          </p>
          <div style={themeStyles.bannerChips}>
            {["Multani Mitti", "Ubtan", "Shikakai", "Reetha", "Amla"].map(
              (name, idx) => (
                <span
                  key={idx}
                  style={themeStyles.bannerChip}
                  className="shop-banner-chip"
                >
                  <FaLeaf
                    style={{ color: brandColors.green, fontSize: "0.65rem" }}
                  />
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>
          <FaLeaf style={{ fontSize: "0.8em", color: brandColors.green }} />
          Natural Skincare & Haircare Shop
          <span style={themeStyles.titleAccent} aria-hidden="true" />
        </h1>
        <div style={themeStyles.resultCount}>
          {sortedProducts.length}{" "}
          {sortedProducts.length === 1 ? "product" : "products"} found
        </div>
      </div>

      {/* Filter bar */}
      <div style={themeStyles.filterBar}>
        <button
          style={themeStyles.filterButton}
          className="shop-filter-btn"
          onClick={() => setShowFilters(true)}
          aria-label="Open filters"
        >
          <FaSlidersH /> Filters
          {activeFilterCount() > 0 && (
            <span style={themeStyles.filterCount}>{activeFilterCount()}</span>
          )}
        </button>

        {/* ✅ Custom sort dropdown — trigger only; menu rendered via portal */}
        <div style={themeStyles.sortWrapper}>
          <button
            ref={sortTriggerRef}
            type="button"
            className="shop-sort-trigger"
            style={themeStyles.sortTrigger}
            onClick={() => setSortDropdownOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={sortDropdownOpen}
            aria-label="Sort products"
          >
            <span style={themeStyles.sortTriggerLabel}>
              {currentSortLabel}
            </span>
            <span style={themeStyles.sortChevron}>
              <FaChevronDown />
            </span>
          </button>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilterCount() > 0 && (
        <div style={themeStyles.activeFilters}>
          {selectedCategory !== "all" && (
            <span style={themeStyles.filterChip}>
              <FaTags /> Category: {selectedCategory}
              <span
                style={themeStyles.clearChip}
                className="shop-clear-chip"
                onClick={() => clearFilter("category")}
                role="button"
                aria-label="Clear category filter"
              >
                <FaTimes style={{ fontSize: "0.7rem" }} />
              </span>
            </span>
          )}
          {(selectedFilters.priceRange.min > 0 ||
            selectedFilters.priceRange.max < 5000) && (
            <span style={themeStyles.filterChip}>
              <FaTags /> ₹{selectedFilters.priceRange.min} – ₹
              {selectedFilters.priceRange.max}
              <span
                style={themeStyles.clearChip}
                className="shop-clear-chip"
                onClick={() => clearFilter("price")}
                role="button"
                aria-label="Clear price filter"
              >
                <FaTimes style={{ fontSize: "0.7rem" }} />
              </span>
            </span>
          )}
          {selectedFilters.rating > 0 && (
            <span style={themeStyles.filterChip}>
              <FaStar /> {selectedFilters.rating}+ Stars
              <span
                style={themeStyles.clearChip}
                className="shop-clear-chip"
                onClick={() => clearFilter("rating")}
                role="button"
                aria-label="Clear rating filter"
              >
                <FaTimes style={{ fontSize: "0.7rem" }} />
              </span>
            </span>
          )}
          {selectedFilters.bestSeller && (
            <span style={themeStyles.filterChip}>
              <FaFire /> Best Seller
              <span
                style={themeStyles.clearChip}
                className="shop-clear-chip"
                onClick={() => clearFilter("bestSeller")}
                role="button"
                aria-label="Clear best seller filter"
              >
                <FaTimes style={{ fontSize: "0.7rem" }} />
              </span>
            </span>
          )}
          {selectedFilters.inStock && (
            <span style={themeStyles.filterChip}>
              <FaHeart /> In Stock Only
              <span
                style={themeStyles.clearChip}
                className="shop-clear-chip"
                onClick={() => clearFilter("inStock")}
                role="button"
                aria-label="Clear in stock filter"
              >
                <FaTimes style={{ fontSize: "0.7rem" }} />
              </span>
            </span>
          )}
          {selectedFilters.natural && (
            <span style={themeStyles.filterChip}>
              <FaLeaf /> Natural Only
              <span
                style={themeStyles.clearChip}
                className="shop-clear-chip"
                onClick={() => clearFilter("natural")}
                role="button"
                aria-label="Clear natural filter"
              >
                <FaTimes style={{ fontSize: "0.7rem" }} />
              </span>
            </span>
          )}
          <button
            style={themeStyles.clearAllButton}
            onClick={resetFilters}
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Filter drawer */}
      <div
        style={themeStyles.filterOverlay}
        onClick={() => setShowFilters(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
      >
        <div
          style={themeStyles.filterModal}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={themeStyles.filterModalHeader}>
            <h3 style={themeStyles.filterModalTitle}>
              <FaSlidersH /> Filter Products
            </h3>
            <button
              style={themeStyles.closeButton}
              className="shop-close-btn"
              onClick={() => setShowFilters(false)}
              aria-label="Close filters"
            >
              <FaTimes />
            </button>
          </div>

          {/* Category */}
          <div style={themeStyles.filterGroup}>
            <h4 style={themeStyles.filterGroupTitle}>Category</h4>
            <select
              style={themeStyles.priceInput}
              className="shop-select"
              value={tempFilters.category}
              onChange={(e) =>
                setTempFilters({ ...tempFilters, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All Categories"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div style={themeStyles.filterGroup}>
            <h4 style={themeStyles.filterGroupTitle}>Price Range (₹)</h4>
            <div style={themeStyles.priceRange}>
              <input
                type="number"
                placeholder="Min"
                style={themeStyles.priceInput}
                className="shop-input"
                value={tempFilters.priceRange.min}
                onChange={(e) =>
                  setTempFilters({
                    ...tempFilters,
                    priceRange: {
                      ...tempFilters.priceRange,
                      min: Math.max(0, Number(e.target.value) || 0),
                    },
                  })
                }
              />
              <input
                type="number"
                placeholder="Max"
                style={themeStyles.priceInput}
                className="shop-input"
                value={tempFilters.priceRange.max}
                onChange={(e) =>
                  setTempFilters({
                    ...tempFilters,
                    priceRange: {
                      ...tempFilters.priceRange,
                      max: Math.max(0, Number(e.target.value) || 0),
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Rating */}
          <div style={themeStyles.filterGroup}>
            <h4 style={themeStyles.filterGroupTitle}>Rating</h4>
            <div style={themeStyles.ratingStars}>
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  style={{
                    ...themeStyles.ratingButton,
                    ...(tempFilters.rating === rating
                      ? themeStyles.activeRatingButton
                      : {}),
                  }}
                  onClick={() => setTempFilters({ ...tempFilters, rating })}
                  aria-pressed={tempFilters.rating === rating}
                >
                  {rating}+ <FaStar style={{ fontSize: "0.75rem" }} />
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

          {/* Checkboxes */}
          <div style={themeStyles.filterGroup}>
            <label style={themeStyles.checkboxLabel}>
              <input
                type="checkbox"
                checked={tempFilters.natural}
                onChange={(e) =>
                  setTempFilters({
                    ...tempFilters,
                    natural: e.target.checked,
                  })
                }
              />
              <FaLeaf style={{ color: brandColors.green }} /> Natural Products
              Only
            </label>
            <label style={themeStyles.checkboxLabel}>
              <input
                type="checkbox"
                checked={tempFilters.bestSeller}
                onChange={(e) =>
                  setTempFilters({
                    ...tempFilters,
                    bestSeller: e.target.checked,
                  })
                }
              />
              <FaFire style={{ color: brandColors.primary }} /> Best Selling
              Products Only
            </label>
            <label style={themeStyles.checkboxLabel}>
              <input
                type="checkbox"
                checked={tempFilters.inStock}
                onChange={(e) =>
                  setTempFilters({
                    ...tempFilters,
                    inStock: e.target.checked,
                  })
                }
              />
              <FaHeart style={{ color: "#2196f3" }} /> In Stock Only
            </label>
          </div>

          {/* Actions */}
          <div style={themeStyles.filterActions}>
            <button
              style={themeStyles.resetButton}
              className="shop-reset-btn"
              onClick={resetFilters}
            >
              Reset All
            </button>
            <button
              style={themeStyles.applyButton}
              className="shop-apply-btn"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Product grid */}
      {sortedProducts.length > 0 ? (
        <div style={themeStyles.productsGrid}>
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              showBadge={
                product.category === "Skincare" ||
                product.category === "Hair Care"
              }
              badgeText="🌿 Natural"
            />
          ))}
        </div>
      ) : (
        <div style={themeStyles.noProducts}>
          <div style={themeStyles.noProductsIconWrap}>
            <FaBoxOpen />
          </div>
          <h3 style={themeStyles.noProductsTitle}>No products found</h3>
          <p style={themeStyles.noProductsText}>
            Try adjusting your filters or explore our full natural skincare &
            haircare collection.
          </p>
          <button
            style={themeStyles.clearFiltersBtn}
            className="shop-clear-filters-btn"
            onClick={resetFilters}
          >
            <FaUndoAlt /> Clear All Filters
          </button>
        </div>
      )}

      {/* ✅ Portal-rendered sort dropdown — escapes all stacking contexts */}
      {typeof document !== "undefined" &&
        createPortal(sortDropdownContent, document.body)}
    </div>
  );
};

export default Shop;