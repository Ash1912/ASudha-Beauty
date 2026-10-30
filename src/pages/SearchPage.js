// src/pages/SearchPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
  FaSlidersH,
  FaTimes,
  FaInfoCircle,
  FaBookOpen,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaArrowRight,
  FaSpa,
  FaFlask,
} from "react-icons/fa";
import { usePixelTracking } from "../context/PixelContext";

// ─── Site constants ───
const SITE_URL = "https://www.asudhabeauty.shop";

// ─── Brand palette (module scope: stable) ───
const brandColors = {
  primary: "#f5346b",
  gold: "#f7d794",
  goldDark: "#d4af37",
  bronze: "#c77d42",
  black: "#0f0f0f",
  darkSlate: "#1a1a1a",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
};

// ─── Herbal keyword cluster (module scope) ───
const HERBAL_KEYWORDS = [
  "multani mitti",
  "fuller's earth",
  "ubtan",
  "shikakai",
  "reetha",
  "amla",
  "herbal",
  "ayurvedic",
  "natural",
  "organic",
  "herbal mix",
  "face pack",
  "clay mask",
  "oil control",
  "deep cleansing",
  "glowing skin",
  "hair care",
  "skin care",
  "ayurveda",
  "traditional",
  "pure natural",
];

// ─── Popular searches (top commercial-intent queries) ───
const POPULAR_SEARCHES = [
  { label: "Multani Mitti", query: "multani mitti" },
  { label: "Ubtan Powder", query: "ubtan" },
  { label: "Amla Reetha Shikakai", query: "amla" },
  { label: "Herbal Face Pack", query: "face pack" },
  { label: "Natural Shampoo", query: "shikakai" },
  { label: "Glowing Skin", query: "glowing skin" },
];

// ─── Related blog guides (internal backlinks) ───
const RELATED_GUIDES = [
  {
    to: "/blog/1",
    label: "Multani Mitti benefits for oily skin",
    icon: <FaLeaf />,
  },
  {
    to: "/blog/2",
    label: "Ubtan for glowing skin — the Ayurvedic ritual",
    icon: <FaSpa />,
  },
  {
    to: "/blog/3",
    label: "Amla-Reetha-Shikakai hair care science",
    icon: <FaLeaf />,
  },
  {
    to: "/blog/6",
    label: "Herbal face packs for every skin type",
    icon: <FaFlask />,
  },
];

// ─── Authoritative external hyperlinks (E-E-A-T) ───
const TRUSTED_SOURCES = [
  {
    label: "NIH NCCIH — Ayurvedic Medicine: In Depth",
    href: "https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth",
    domain: "nccih.nih.gov",
  },
  {
    label: "PubMed — Multani Mitti (Fuller's Earth) skin research",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=multani+mitti+fuller%27s+earth+skin",
    domain: "pubmed.ncbi.nlm.nih.gov",
  },
  {
    label: "Ministry of AYUSH — Government of India",
    href: "https://ayush.gov.in/",
    domain: "ayush.gov.in",
  },
];

// ─── Derive min/max price from actual catalog (module scope) ───
const MIN_PRICE = 0;
const MAX_PRICE = Math.max(...products.map((p) => Number(p.price) || 0), 1000);

const ITEMS_PER_PAGE = 12;

const SearchPage = () => {
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const trackEvent = usePixelTracking();

  const [sortBy, setSortBy] = useState("relevance");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({
    min: MIN_PRICE,
    max: MAX_PRICE,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTracked, setSearchTracked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ─── Categories derived from actual products ───
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category).filter(Boolean));
    return ["all", ...Array.from(unique).sort()];
  }, []);

  // ─── Reset page on query change ───
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
    setSearchTracked(false);
  }, [query]);

  // ─── Derived: search results (was useEffect + state) ───
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const scored = products
      .map((product) => {
        let score = 0;
        const name = (product.name || "").toLowerCase();

        if (name === q) score += 100;
        else if (name.startsWith(q)) score += 50;
        else if (name.includes(q)) score += 30;

        if ((product.category || "").toLowerCase().includes(q)) score += 20;
        if ((product.description || "").toLowerCase().includes(q)) score += 15;
        if ((product.ingredients || "").toLowerCase().includes(q)) score += 10;
        if (
          Array.isArray(product.benefits) &&
          product.benefits.some((b) => (b || "").toLowerCase().includes(q))
        )
          score += 10;

        if (HERBAL_KEYWORDS.some((k) => k.includes(q) || q.includes(k)))
          score += 25;

        return { product, score };
      })
      .filter((entry) => entry.score > 0);

    scored.sort((a, b) => b.score - a.score);
    return scored.map((entry) => entry.product);
  }, [query]);

  // ─── Derived: filtered + sorted results (was useEffect + state) ───
  const filteredResults = useMemo(() => {
    let list = [...searchResults];

    if (selectedCategory !== "all") {
      list = list.filter(
        (p) =>
          (p.category || "").toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    list = list.filter(
      (p) =>
        (Number(p.price) || 0) >= priceRange.min &&
        (Number(p.price) || 0) <= priceRange.max,
    );

    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-high":
        list.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name":
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "rating":
        list.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        break;
      default:
        break;
    }

    return list;
  }, [searchResults, selectedCategory, priceRange, sortBy]);

  // ─── Reset page when filters change ───
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, sortBy]);

  // ─── Pixel tracking (fires once per query) ───
  useEffect(() => {
    if (query && !searchTracked && filteredResults.length >= 0) {
      try {
        trackEvent.search(query, filteredResults.length);
      } catch {
        /* tracking failure never breaks UI */
      }
      setSearchTracked(true);
    }
  }, [query, filteredResults.length, searchTracked, trackEvent]);

  // ─── Suggestions ───
  const suggestions = useMemo(() => {
    if (!query || query.trim().length < 1) {
      return { products: [], keywords: [] };
    }
    const q = query.toLowerCase().trim();

    const productSuggestions = products
      .filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q) ||
          (p.ingredients || "").toLowerCase().includes(q),
      )
      .slice(0, 6)
      .map((p) => ({ id: p.id, label: p.name }));

    const keywordSuggestions = HERBAL_KEYWORDS.filter(
      (k) => k.includes(q) || q.includes(k),
    )
      .slice(0, 6)
      .map((k) => ({ label: k }));

    return { products: productSuggestions, keywords: keywordSuggestions };
  }, [query]);

  // ─── Pagination ───
  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const paginatedResults = useMemo(
    () =>
      filteredResults.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredResults, currentPage],
  );

  // ─── Handlers ───
  const clearFilters = useCallback(() => {
    setSelectedCategory("all");
    setPriceRange({ min: MIN_PRICE, max: MAX_PRICE });
    setSortBy("relevance");
  }, []);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    addToCart(
      product,
      Array.isArray(product.shades) ? product.shades[0] : "",
      1,
    );
  };

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;
  const isMedium = windowWidth <= 1024;

  // ─── JSON-LD: WebPage + BreadcrumbList (no Product schema for search) ───
  const searchJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/search${query ? `?q=${encodeURIComponent(query)}` : ""}#webpage`,
          url: `${SITE_URL}/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
          name: query
            ? `Search results for "${query}" | ASudha Beauty`
            : "Search Natural Skincare | ASudha Beauty",
          description: query
            ? `Found ${filteredResults.length} natural Ayurvedic products matching "${query}" at ASudha Beauty.`
            : "Search 100% natural Ayurvedic skincare and hair care products at ASudha Beauty.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: "en-IN",
          breadcrumb: { "@id": `${SITE_URL}/search#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL}/search#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Search",
              item: `${SITE_URL}/search`,
            },
            ...(query
              ? [
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: `Search: ${query}`,
                    item: `${SITE_URL}/search?q=${encodeURIComponent(query)}`,
                  },
                ]
              : []),
          ],
        },
      ],
    }),
    [query, filteredResults.length],
  );

  const breadcrumb = useMemo(
    () => [
      { name: "Home", url: "/" },
      { name: "Search", url: "/search" },
      ...(query
        ? [
            {
              name: `Search: ${query}`,
              url: `/search?q=${encodeURIComponent(query)}`,
            },
          ]
        : []),
    ],
    [query],
  );

  const citations = useMemo(
    () => TRUSTED_SOURCES.map((s) => ({ label: s.label, href: s.href })),
    [],
  );

  const themeStyles = {
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile
        ? "1.5rem 1rem 3rem"
        : isNarrow
          ? "2rem 1.25rem 3.5rem"
          : "2.5rem 1.5rem 4rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: isDarkMode ? "#ffffff" : brandColors.earthLight,
      minHeight: "100%",
      position: "relative",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },

    bgBlob1: {
      position: "absolute",
      top: "-150px",
      right: "-150px",
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      opacity: isDarkMode ? 0.12 : 0.08,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
    },
    bgBlob2: {
      position: "absolute",
      bottom: "-150px",
      left: "-150px",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #4caf50, #f7d794)",
      opacity: isDarkMode ? 0.12 : 0.08,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
    },

    breadcrumb: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      fontSize: "0.78rem",
      color: isDarkMode ? "#8d7d76" : "#8d7d76",
      marginBottom: "1.25rem",
      flexWrap: "wrap",
      fontWeight: "600",
    },
    breadcrumbLink: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "none",
      fontWeight: "700",
    },

    suggestionsBox: {
      position: "relative",
      zIndex: 1,
      marginBottom: "1.5rem",
      padding: "1rem 1.25rem",
      borderRadius: "16px",
      background: isDarkMode
        ? "rgba(26, 26, 26, 0.85)"
        : "rgba(255,255,255,0.9)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
    },
    suggestionsTitle: {
      fontSize: "0.9rem",
      fontWeight: "700",
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight,
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    suggestionChips: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    suggestionChip: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.4rem 0.9rem",
      borderRadius: "50px",
      fontSize: "0.85rem",
      fontWeight: "500",
      textDecoration: "none",
      color: isDarkMode ? "#ffffff" : brandColors.earthLight,
      background: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(245, 52, 107, 0.08)",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(245,52,107,0.2)"
      }`,
      transition: "all 0.2s ease",
    },

    header: {
      position: "relative",
      zIndex: 1,
      marginBottom: "2rem",
      display: "flex",
      flexDirection: isNarrow ? "column" : "row",
      alignItems: isNarrow ? "flex-start" : "center",
      justifyContent: "space-between",
      gap: "1rem",
    },
    title: {
      fontSize: isMobile ? "1.5rem" : "2.2rem",
      fontWeight: "900",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      margin: 0,
    },
    resultsCount: {
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight,
      margin: "0.5rem 0 0",
      fontSize: "0.95rem",
    },
    queryText: {
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      fontWeight: "700",
    },
    activeFiltersAndSort: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      flexWrap: "wrap",
    },

    filterButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.5rem",
      background: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
      borderRadius: "50px",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
    },
    filterSelect: {
      padding: "0.75rem 1.25rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
      borderRadius: "50px",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      fontSize: "0.95rem",
      cursor: "pointer",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
    },

    filterSection: {
      position: "relative",
      zIndex: 1,
      maxHeight: showFilters ? "500px" : "0",
      opacity: showFilters ? 1 : 0,
      overflow: "hidden",
      transition: "max-height 0.5s ease, opacity 0.5s ease",
      marginBottom: showFilters ? "2rem" : "0",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.85)"
        : "rgba(255,255,255,0.9)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: showFilters ? "2rem" : "0 2rem",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"
      }`,
      boxShadow: isDarkMode
        ? "0 20px 60px rgba(0,0,0,0.8)"
        : "0 20px 60px rgba(62,39,35,0.08)",
    },
    filterGrid: {
      display: "grid",
      gridTemplateColumns: isNarrow ? "1fr" : "repeat(3, 1fr)",
      gap: "1.5rem",
    },
    filterLabel: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "600",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
    },
    filterSelectInline: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
      borderRadius: "12px",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      fontSize: "0.95rem",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
    },
    priceInput: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
      borderRadius: "12px",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      fontSize: "0.95rem",
      outline: "none",
      fontFamily: "inherit",
      boxSizing: "border-box",
    },

    activeFilters: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexWrap: "wrap",
      gap: "0.75rem",
      alignItems: "center",
      marginBottom: "2rem",
    },
    filterChip: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1.25rem",
      background: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
      borderRadius: "50px",
      fontSize: "0.9rem",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      fontWeight: "500",
    },
    clearChip: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: brandColors.primary,
      fontSize: "1rem",
      transition: "transform 0.3s",
      padding: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "inherit",
    },
    clearAllButton: {
      background: "none",
      border: "none",
      color: brandColors.primary,
      fontSize: "0.9rem",
      fontWeight: "600",
      cursor: "pointer",
      textDecoration: "underline",
      marginLeft: "0.5rem",
      fontFamily: "inherit",
    },

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
      gap: isMobile ? "1rem" : "1.5rem",
      marginBottom: "2rem",
      alignItems: "stretch",
    },

    noResults: {
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      padding: isMobile ? "3rem 1.5rem" : "4rem 2rem",
      background: isDarkMode
        ? "rgba(26, 26, 26, 0.8)"
        : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: "20px",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(62,39,35,0.1)"
      }`,
    },
    noResultsIcon: {
      fontSize: "4rem",
      color: brandColors.primary,
      marginBottom: "1rem",
      opacity: 0.7,
    },
    noResultsTitle: {
      fontSize: isMobile ? "1.25rem" : "1.5rem",
      fontWeight: "800",
      marginBottom: "0.6rem",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
    },

    pagination: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      flexWrap: "wrap",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.85)"
        : "rgba(255,255,255,0.9)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      padding: "1rem 1.5rem",
      borderRadius: "50px",
      width: "fit-content",
      margin: "2rem auto 0",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    },
    pageButton: {
      minWidth: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight,
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
    },
    activePage: {
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      fontWeight: "800",
      boxShadow: "0 4px 15px rgba(245,52,107,0.4)",
    },
    pageDots: {
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight,
      padding: "0 0.25rem",
    },

    popularCard: {
      position: "relative",
      zIndex: 1,
      marginTop: "3rem",
      backgroundColor: isDarkMode ? "rgba(26, 26, 26, 0.85)" : "#ffffff",
      borderRadius: "22px",
      padding: isMobile ? "1.75rem 1.5rem" : "2.25rem 2rem",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.14)" : "rgba(62, 39, 35, 0.08)"
      }`,
      boxShadow: isDarkMode
        ? "0 22px 48px rgba(0, 0, 0, 0.7)"
        : "0 22px 48px rgba(62, 39, 35, 0.12)",
      boxSizing: "border-box",
      width: "100%",
    },
    popularTitle: {
      fontSize: "1.05rem",
      fontWeight: "800",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      marginBottom: "1.15rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      letterSpacing: "-0.2px",
    },
    popularChips: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginBottom: "1.5rem",
    },
    popularChip: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      padding: "0.5rem 1.1rem",
      borderRadius: "50px",
      fontSize: "0.85rem",
      fontWeight: "600",
      textDecoration: "none",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.08)"
        : "rgba(245, 52, 107, 0.06)",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.25)" : "rgba(245, 52, 107, 0.2)"
      }`,
      transition: "all 0.25s ease",
    },
    relatedList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    relatedLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
      padding: "0.75rem 1rem",
      borderRadius: "10px",
      fontSize: "0.9rem",
      fontWeight: "600",
      color: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
      textDecoration: "none",
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(62, 39, 35, 0.04)"
      }`,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.02)"
        : "rgba(62, 39, 35, 0.02)",
    },
    relatedIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
      fontSize: "0.8rem",
    },

    citationCard: {
      position: "relative",
      zIndex: 1,
      marginTop: "1.5rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.06)"
        : "rgba(212, 175, 55, 0.04)",
      borderRadius: "18px",
      padding: isMobile ? "1.5rem" : "1.75rem",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.15)"
        : "1px solid rgba(212, 175, 55, 0.12)",
      borderLeft: `4px solid ${brandColors.goldDark}`,
      boxSizing: "border-box",
      width: "100%",
    },
    citationTitle: {
      fontSize: "0.88rem",
      fontWeight: "800",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      marginBottom: "0.9rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    citationList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.55rem",
    },
    citationLink: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.5rem",
      fontSize: "0.83rem",
      fontWeight: "600",
      color: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
      textDecoration: "none",
      lineHeight: 1.5,
    },
    citationDomain: {
      fontSize: "0.7rem",
      color: isDarkMode ? "#8d7d76" : "#8d7d76",
      marginTop: "0.1rem",
    },
  };

  // ─── Shared: Popular searches + related reading + sources ───
  const auxiliarySectionsJSX = (
    <>
      <section
        style={themeStyles.popularCard}
        aria-labelledby="popular-searches-title"
      >
        <h2 id="popular-searches-title" style={themeStyles.popularTitle}>
          <FaSearch aria-hidden="true" /> Popular Searches
        </h2>
        <div style={themeStyles.popularChips}>
          {POPULAR_SEARCHES.map((s) => (
            <Link
              key={s.label}
              to={`/search?q=${encodeURIComponent(s.query)}`}
              style={themeStyles.popularChip}
              className="sp-popular-chip"
            >
              <FaLeaf aria-hidden="true" style={{ fontSize: "0.7rem" }} />
              {s.label}
            </Link>
          ))}
        </div>

        <h2 style={{ ...themeStyles.popularTitle, marginTop: "1.5rem" }}>
          <FaBookOpen aria-hidden="true" /> Learn About the Products
        </h2>
        <ul style={themeStyles.relatedList}>
          {RELATED_GUIDES.map((g) => (
            <li key={g.to}>
              <Link
                to={g.to}
                style={themeStyles.relatedLink}
                className="sp-related-link"
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <span style={themeStyles.relatedIcon} aria-hidden="true">
                    {g.icon}
                  </span>
                  {g.label}
                </span>
                <FaArrowRight
                  aria-hidden="true"
                  style={{ fontSize: "0.65rem", flexShrink: 0 }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        style={themeStyles.citationCard}
        aria-labelledby="search-sources-title"
      >
        <h2 id="search-sources-title" style={themeStyles.citationTitle}>
          <FaShieldAlt aria-hidden="true" /> Sources &amp; Further Reading
        </h2>
        <ul style={themeStyles.citationList}>
          {TRUSTED_SOURCES.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.citationLink}
                className="sp-citation-link"
              >
                <FaExternalLinkAlt
                  aria-hidden="true"
                  style={{
                    fontSize: "0.65rem",
                    marginTop: "0.2rem",
                    flexShrink: 0,
                    color: isDarkMode ? brandColors.gold : brandColors.bronze,
                  }}
                />
                <span>
                  {source.label}
                  <div style={themeStyles.citationDomain}>{source.domain}</div>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );

  // ─── Empty query state ───
  if (!query) {
    return (
      <div style={themeStyles.container}>
        <SEO
          title="Search Natural Ayurvedic Products | ASudha Beauty"
          description="Search 100% natural Ayurvedic skincare and hair care products at ASudha Beauty — Multani Mitti, Ubtan, Amla, Reetha, Shikakai. Fast results, free shipping above ₹500."
          keywords="search ayurvedic products, natural skincare search, multani mitti search, ubtan search, amla reetha shikakai"
          url="/search"
          breadcrumb={breadcrumb}
          citations={citations}
          noindex
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(searchJsonLd),
          }}
        />

        <div style={themeStyles.bgBlob1} aria-hidden="true" />
        <div style={themeStyles.bgBlob2} aria-hidden="true" />

        <main>
          <div style={themeStyles.noResults}>
            <FaLeaf aria-hidden="true" style={themeStyles.noResultsIcon} />
            <h1 style={themeStyles.noResultsTitle}>
              Discover Natural Skincare
            </h1>
            <p
              style={{ color: isDarkMode ? "#a0a0a0" : brandColors.earthLight }}
            >
              Search for Multani Mitti, Ubtan, Shikakai, and more herbal
              products
            </p>

            <div
              style={{
                ...themeStyles.suggestionChips,
                justifyContent: "center",
                marginTop: "1.5rem",
              }}
            >
              {HERBAL_KEYWORDS.slice(0, 8).map((k) => (
                <Link
                  key={k}
                  to={`/search?q=${encodeURIComponent(k)}`}
                  style={themeStyles.suggestionChip}
                >
                  <FaLeaf aria-hidden="true" style={{ fontSize: "0.75em" }} />
                  {k}
                </Link>
              ))}
            </div>
          </div>

          {auxiliarySectionsJSX}
        </main>
      </div>
    );
  }

  return (
    <div style={themeStyles.container}>
      <SEO
        title={`Search results for "${query}" | ASudha Beauty`}
        description={`Found ${filteredResults.length} natural Ayurvedic products matching "${query}" at ASudha Beauty — Multani Mitti, Ubtan, Amla, Reetha, Shikakai. Fast results.`}
        keywords={`search ${query}, natural ${query}, ayurvedic ${query}, buy ${query} online india`}
        url={`/search?q=${encodeURIComponent(query)}`}
        breadcrumb={breadcrumb}
        citations={citations}
        noindex
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchJsonLd) }}
      />

      <div style={themeStyles.bgBlob1} aria-hidden="true" />
      <div style={themeStyles.bgBlob2} aria-hidden="true" />

      <main>
        {/* Header */}
        <div style={themeStyles.header}>
          <div>
            <h1 style={themeStyles.title}>
              <FaSearch aria-hidden="true" style={{ fontSize: "0.8em" }} />{" "}
              Search Results
            </h1>
            <p
              style={themeStyles.resultsCount}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              Found{" "}
              <span style={themeStyles.queryText}>
                {filteredResults.length}
              </span>{" "}
              natural product{filteredResults.length !== 1 ? "s" : ""} for{" "}
              &ldquo;{query}&rdquo;
            </p>
          </div>

          <div style={themeStyles.activeFiltersAndSort}>
            <button
              type="button"
              style={themeStyles.filterButton}
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls="search-filters"
              className="sp-filter-btn"
            >
              <FaSlidersH aria-hidden="true" />{" "}
              {showFilters ? "Hide Filters" : "Filters"}
            </button>
            <select
              style={themeStyles.filterSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort search results"
              className="sp-sort-select"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Suggestions */}
        {(suggestions.products.length > 0 ||
          suggestions.keywords.length > 0) && (
          <div style={themeStyles.suggestionsBox}>
            <div style={themeStyles.suggestionsTitle}>
              <FaInfoCircle aria-hidden="true" /> Suggestions for &ldquo;
              {query}&rdquo;
            </div>
            <div style={themeStyles.suggestionChips}>
              {suggestions.products.map((s) => (
                <Link
                  key={`p-${s.id}`}
                  to={`/search?q=${encodeURIComponent(s.label)}`}
                  style={themeStyles.suggestionChip}
                >
                  <FaSearch aria-hidden="true" style={{ fontSize: "0.75em" }} />
                  {s.label}
                </Link>
              ))}
              {suggestions.keywords.map((k) => (
                <Link
                  key={`k-${k.label}`}
                  to={`/search?q=${encodeURIComponent(k.label)}`}
                  style={themeStyles.suggestionChip}
                >
                  <FaLeaf aria-hidden="true" style={{ fontSize: "0.75em" }} />
                  {k.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filters panel */}
        <div
          id="search-filters"
          style={themeStyles.filterSection}
          aria-hidden={!showFilters}
        >
          <div style={themeStyles.filterGrid}>
            <div>
              <label style={themeStyles.filterLabel} htmlFor="filter-category">
                Category
              </label>
              <select
                id="filter-category"
                style={themeStyles.filterSelectInline}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
            <div>
              <label style={themeStyles.filterLabel} htmlFor="filter-price-min">
                Min Price (₹)
              </label>
              <input
                id="filter-price-min"
                type="number"
                style={themeStyles.priceInput}
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    min: Math.max(
                      MIN_PRICE,
                      Number(e.target.value) || MIN_PRICE,
                    ),
                  })
                }
                min={MIN_PRICE}
                max={priceRange.max}
              />
            </div>
            <div>
              <label style={themeStyles.filterLabel} htmlFor="filter-price-max">
                Max Price (₹)
              </label>
              <input
                id="filter-price-max"
                type="number"
                style={themeStyles.priceInput}
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    max: Math.min(
                      MAX_PRICE,
                      Math.max(
                        priceRange.min,
                        Number(e.target.value) || MAX_PRICE,
                      ),
                    ),
                  })
                }
                min={priceRange.min}
                max={MAX_PRICE}
              />
            </div>
          </div>
        </div>

        {/* Active chips */}
        {(selectedCategory !== "all" ||
          priceRange.min > MIN_PRICE ||
          priceRange.max < MAX_PRICE) && (
          <div style={themeStyles.activeFilters}>
            {selectedCategory !== "all" && (
              <span style={themeStyles.filterChip}>
                Category: {selectedCategory}
                <button
                  type="button"
                  style={themeStyles.clearChip}
                  onClick={() => setSelectedCategory("all")}
                  aria-label="Clear category filter"
                >
                  <FaTimes aria-hidden="true" />
                </button>
              </span>
            )}
            {(priceRange.min > MIN_PRICE || priceRange.max < MAX_PRICE) && (
              <span style={themeStyles.filterChip}>
                Price: ₹{priceRange.min} – ₹{priceRange.max}
                <button
                  type="button"
                  style={themeStyles.clearChip}
                  onClick={() =>
                    setPriceRange({ min: MIN_PRICE, max: MAX_PRICE })
                  }
                  aria-label="Clear price filter"
                >
                  <FaTimes aria-hidden="true" />
                </button>
              </span>
            )}
            <button
              type="button"
              style={themeStyles.clearAllButton}
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Results */}
        {filteredResults.length === 0 ? (
          <div style={themeStyles.noResults}>
            <FaInfoCircle
              aria-hidden="true"
              style={themeStyles.noResultsIcon}
            />
            <h2 style={themeStyles.noResultsTitle}>
              No natural products found
            </h2>
            <p
              style={{ color: isDarkMode ? "#a0a0a0" : brandColors.earthLight }}
            >
              Try searching for Multani Mitti, Ubtan, or other herbal products
            </p>
            <div
              style={{
                ...themeStyles.suggestionChips,
                justifyContent: "center",
                marginTop: "1.5rem",
              }}
            >
              {HERBAL_KEYWORDS.slice(0, 8).map((k) => (
                <Link
                  key={k}
                  to={`/search?q=${encodeURIComponent(k)}`}
                  style={themeStyles.suggestionChip}
                >
                  <FaLeaf aria-hidden="true" style={{ fontSize: "0.75em" }} />
                  {k}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            <section
              style={themeStyles.productsGrid}
              aria-label={`${filteredResults.length} products found`}
            >
              {paginatedResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  showBadge={
                    product.category === "Skincare" ||
                    product.category === "Hair Care"
                  }
                  badgeText={
                    product.category === "Skincare" ||
                    product.category === "Hair Care"
                      ? "Natural"
                      : ""
                  }
                />
              ))}
            </section>

            {totalPages > 1 && (
              <nav
                style={themeStyles.pagination}
                aria-label="Search results pagination"
              >
                <button
                  type="button"
                  style={themeStyles.pageButton}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        type="button"
                        style={{
                          ...themeStyles.pageButton,
                          ...(currentPage === page
                            ? themeStyles.activePage
                            : {}),
                        }}
                        onClick={() => handlePageChange(page)}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span
                        key={`dots-${page}`}
                        style={themeStyles.pageDots}
                        aria-hidden="true"
                      >
                        …
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  type="button"
                  style={themeStyles.pageButton}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
              </nav>
            )}
          </>
        )}

        {auxiliarySectionsJSX}
      </main>
    </div>
  );
};

export default SearchPage;