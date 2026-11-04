// src/pages/ProductDetail.jsx
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";
import ImageGallery from "../components/ImageGallery";
import ProductTabs from "../components/ProductTabs";
import ShadeCatalog from "../components/ShadeCatalog";
import {
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaStar,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaArrowLeft,
  FaLeaf,
  FaSpa,
  FaBoxOpen,
  FaCopy,
  FaBookOpen,
  FaExternalLinkAlt,
  FaArrowRight,
  FaFlask,
  FaShoppingBag,
} from "react-icons/fa";
import { usePixelTracking } from "../context/PixelContext";
import SEO from "../components/SEO";

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

// ─── URL Helper: Prefer slugs for SEO over IDs ───
const getProductUrl = (product) => {
  return `/product/${product.slug || product.id}`;
};

// ─── Category-aware keyword clusters ───
const getProductKeywords = (product) => {
  const base = [
    "ayurvedic skincare",
    "natural beauty products india",
    "chemical free skincare",
    "asudha beauty",
  ];
  const name = (product?.name || "").toLowerCase();
  const category = (product?.category || "").toLowerCase();

  if (name.includes("multani")) {
    return [
      ...base,
      "multani mitti",
      "multani mitti benefits",
      "multani mitti for oily skin",
      "multani mitti face pack",
      "fuller's earth",
      "oil control face pack",
    ];
  }
  if (name.includes("ubtan")) {
    return [
      ...base,
      "ubtan powder",
      "ubtan for glowing skin",
      "ubtan face wash",
      "ubtan cream",
      "ubtan face pack",
      "ayurvedic ubtan",
    ];
  }
  if (
    name.includes("amla") ||
    name.includes("reetha") ||
    name.includes("shikakai")
  ) {
    return [
      ...base,
      "amla reetha shikakai",
      "amla reetha shikakai shampoo",
      "natural shampoo for hair fall",
      "herbal hair pack",
      "ayurvedic hair care",
      "chemical free shampoo",
    ];
  }
  if (category.includes("hair")) {
    return [
      ...base,
      "natural hair care",
      "herbal hair pack",
      "chemical free shampoo",
    ];
  }
  return [
    ...base,
    "herbal face pack",
    "natural face pack",
    "ayurvedic skincare routine",
  ];
};

// ─── Category-aware authoritative citations (E-E-A-T) ───
const getProductCitations = (product) => {
  const base = [
    {
      label: "NIH NCCIH — Ayurvedic Medicine: In Depth",
      href: "https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth",
      domain: "nccih.nih.gov",
    },
    {
      label: "Ministry of AYUSH — Government of India",
      href: "https://ayush.gov.in/",
      domain: "ayush.gov.in",
    },
  ];
  const name = (product?.name || "").toLowerCase();
  const category = (product?.category || "").toLowerCase();

  if (name.includes("multani") || category.includes("skincare")) {
    return [
      {
        label:
          "MDPI Cosmetics 2025 — Multi-Target Anti-Aging Mechanisms of Multani Mitti",
        href: "https://www.mdpi.com/2079-9284/12/3/124",
        domain: "mdpi.com",
      },
      {
        label: "PubMed — Clay mask efficacy in oily and acne-prone skin",
        href: "https://pubmed.ncbi.nlm.nih.gov/38009030/",
        domain: "pubmed.ncbi.nlm.nih.gov",
      },
      ...base,
    ];
  }
  if (name.includes("ubtan")) {
    return [
      {
        label: "PubMed — Evaluation of traditional Ubtan formulations",
        href: "https://pubmed.ncbi.nlm.nih.gov/?term=ubtan+traditional+indian+skin+care+formulation",
        domain: "pubmed.ncbi.nlm.nih.gov",
      },
      ...base,
    ];
  }
  if (
    category.includes("hair") ||
    name.includes("amla") ||
    name.includes("reetha") ||
    name.includes("shikakai")
  ) {
    return [
      {
        label:
          "PubMed — Polyherbal shampoo research (Amla, Reetha, Shikakai)",
        href: "https://pubmed.ncbi.nlm.nih.gov/?term=polyherbal+shampoo+amla+reetha+shikakai",
        domain: "pubmed.ncbi.nlm.nih.gov",
      },
      ...base,
    ];
  }
  return base;
};

// ─── Category-aware related blog links ───
const getRelatedBlogLinks = (product) => {
  const name = (product?.name || "").toLowerCase();
  const category = (product?.category || "").toLowerCase();
  const links = [];

  if (
    name.includes("multani") ||
    name.includes("clay") ||
    name.includes("fuller")
  ) {
    links.push({
      to: "/blog/1",
      label: "Complete Multani Mitti benefits guide",
    });
  }
  if (name.includes("ubtan")) {
    links.push({
      to: "/blog/2",
      label: "Ubtan for glowing skin — the Ayurvedic ritual",
    });
  }
  if (
    name.includes("amla") ||
    name.includes("reetha") ||
    name.includes("shikakai") ||
    category.includes("hair")
  ) {
    links.push({
      to: "/blog/3",
      label: "Amla-Reetha-Shikakai hair care science",
    });
  }
  if (category.includes("skincare") && links.length < 2) {
    links.push({
      to: "/blog/6",
      label: "Herbal face packs for every skin type",
    });
  }
  if (links.length === 0) {
    links.push({
      to: "/blog",
      label: "Browse all Ayurvedic beauty guides",
    });
  }
  return links;
};

const ProductDetail = () => {
  const { id, slug } = useParams();
  const urlParam = id || slug;

  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find(
    (p) => p.id === parseInt(urlParam) || p.slug === urlParam
  );

  // ─── Theme tokens ───
  const T = {
    bg: isDarkMode ? brandColors.black : brandColors.cream,
    card: isDarkMode ? brandColors.darkSlate : "#ffffff",
    cardAlt: isDarkMode ? "#222222" : "#f9f4f0",
    border: isDarkMode
      ? "rgba(212, 175, 55, 0.12)"
      : "rgba(62, 39, 35, 0.06)",
    borderSoft: isDarkMode
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(62, 39, 35, 0.04)",
    divider: isDarkMode
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(62, 39, 35, 0.06)",
    text: isDarkMode ? "#f5f0eb" : "#3e2723",
    textMuted: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
    textDim: isDarkMode ? "#8d7d76" : "#8d7d76",
    gold: brandColors.gold,
    green: brandColors.green,
    danger: isDarkMode ? "#ff8a80" : "#c62828",
    star: "#ffc107",
    starEmpty: isDarkMode ? "rgba(255, 255, 255, 0.15)" : "#e0e0e0",
    shadow: isDarkMode
      ? "0 10px 30px rgba(0, 0, 0, 0.55)"
      : "0 10px 30px rgba(62, 39, 35, 0.06)",
    shadowLift: isDarkMode
      ? "0 20px 40px rgba(0, 0, 0, 0.65)"
      : "0 20px 40px rgba(62, 39, 35, 0.1)",
  };

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  const [selectedShade, setSelectedShade] = useState(() => {
    if (!product?.shades || !Array.isArray(product.shades)) return "";
    return product.shades.length > 0 ? product.shades[0] : "";
  });

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [copied, setCopied] = useState(false);
  const trackEvent = usePixelTracking();

  const inWishlist = product ? isInWishlist(product.id, selectedShade) : false;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (product) {
      trackEvent.viewContent(product);
      window.scrollTo(0, 0);
    }
  }, [product, trackEvent]);

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  // ─── Injected CSS — only depends on isDarkMode ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-productdetail-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-productdetail-styles", "true");
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to   { transform: translateX(0); opacity: 1; }
      }

      /* Prevent horizontal scroll globally */
      html, body {
        overflow-x: hidden;
        max-width: 100%;
      }

      .pd-back-btn:hover,
      .pd-back-btn:focus-visible {
        transform: translateX(-4px);
        background: linear-gradient(135deg, #f7d794, #f5346b) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        border-color: transparent !important;
        outline: none;
      }

      .pd-shade-btn:hover,
      .pd-shade-btn:focus-visible {
        border-color: ${brandColors.primary} !important;
        color: ${brandColors.primary} !important;
        outline: none;
      }

      .pd-qty-btn:hover:not(:disabled) {
        transform: scale(1.08);
        box-shadow: 0 4px 15px rgba(245, 52, 107, 0.4);
      }
      .pd-qty-btn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .pd-qty-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }

      .pd-add-cart-btn:hover:not(:disabled) {
        transform: translateY(-3px) scale(1.01);
        box-shadow: 0 15px 40px rgba(245, 52, 107, 0.4);
      }
      .pd-add-cart-btn:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
      .pd-add-cart-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }

      .pd-share-btn:hover,
      .pd-share-btn:focus-visible {
        background: rgba(245, 52, 107, 0.1);
        border-color: ${brandColors.primary} !important;
        color: ${brandColors.primary} !important;
        outline: none;
      }

      .pd-wishlist-btn:hover {
        transform: scale(1.15);
      }
      .pd-wishlist-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }

      /* Related sections */
      .pd-related-link {
        transition: color 0.25s ease, gap 0.25s ease;
      }
      .pd-related-link:hover,
      .pd-related-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        gap: 0.6rem;
        outline: none;
      }
      .pd-citation-link:hover,
      .pd-citation-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        outline: none;
      }

      .pd-product-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease,
                    border-color 0.3s ease;
      }
      .pd-product-card:hover {
        transform: translateY(-4px);
        box-shadow: ${
          isDarkMode
            ? "0 20px 40px rgba(0, 0, 0, 0.65)"
            : "0 20px 40px rgba(62, 39, 35, 0.1)"
        };
        border-color: ${
          isDarkMode ? "rgba(212, 175, 55, 0.35)" : "rgba(199, 125, 66, 0.25)"
        } !important;
      }

      @media (prefers-reduced-motion: reduce) {
        .pd-back-btn, .pd-shade-btn, .pd-qty-btn, .pd-add-cart-btn,
        .pd-share-btn, .pd-wishlist-btn, .pd-related-link, .pd-product-card {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-productdetail-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  // ─── Handlers ───
  const handleShadeSelect = (shade) => setSelectedShade(shade);

  const handleAddToCart = () => {
    if (!product?.inStock) return;
    addToCart(product, selectedShade || "", quantity);
    trackEvent.addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleQuantityChange = (delta) =>
    setQuantity((prev) => Math.max(1, prev + delta));

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleWishlist(product, selectedShade);
  };

  const handleShare = async () => {
    if (!product) return;
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        const el = document.createElement("textarea");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const discount =
    product?.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  // ─── Theme styles ───
  const themeStyles = {
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile
        ? "1.25rem 0.75rem 3rem"
        : isNarrow
        ? "1.5rem 1rem 3rem"
        : "2rem 1rem 4rem",
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100vh",
      position: "relative",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },
    bgBlob1: {
      position: "absolute",
      top: "-120px",
      left: "-120px",
      width: "400px",
      height: "400px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f5346b, #f7d794)",
      opacity: isDarkMode ? 0.1 : 0.07,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
      clipPath: "circle(50% at 50% 50%)",
    },
    bgBlob2: {
      position: "absolute",
      bottom: "-120px",
      right: "-120px",
      width: "400px",
      height: "400px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #4caf50, #f7d794)",
      opacity: isDarkMode ? 0.1 : 0.07,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
      clipPath: "circle(50% at 50% 50%)",
    },
    breadcrumb: {
      position: "relative",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      fontSize: "0.78rem",
      color: T.textDim,
      marginBottom: "1rem",
      flexWrap: "wrap",
      fontWeight: "600",
    },
    breadcrumbLink: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "none",
      fontWeight: "700",
    },
    backButton: {
      position: "relative",
      zIndex: 2,
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: isNarrow ? "1.25rem" : "2rem",
      padding: "0.55rem 1.25rem",
      backgroundColor: T.card,
      backdropFilter: "blur(10px)",
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      color: T.text,
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "500",
      fontFamily: "inherit",
    },
    productGrid: {
      position: "relative",
      zIndex: 2,
      display: "grid",
      gridTemplateColumns: isNarrow
        ? "minmax(0, 1fr)"
        : "minmax(0, 1fr) minmax(0, 1fr)",
      gap: isMobile ? "1.5rem" : "2.5rem",
      marginBottom: "2rem",
      width: "100%",
      boxSizing: "border-box",
    },
    info: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: T.card,
      borderRadius: "24px",
      padding: isMobile ? "1.5rem 1.25rem" : "2.25rem",
      boxShadow: T.shadow,
      border: `1px solid ${T.border}`,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1rem",
      gap: "0.75rem",
    },
    category: {
      fontSize: "0.82rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontWeight: "700",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    wishlistButton: {
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
      padding: "0.25rem",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "all 0.3s ease",
    },
    name: {
      fontSize: isMobile ? "1.6rem" : isNarrow ? "2rem" : "2.35rem",
      marginBottom: "0.5rem",
      color: T.text,
      fontWeight: "800",
      lineHeight: "1.2",
    },
    itemNo: {
      fontSize: "0.85rem",
      color: T.textMuted,
      marginBottom: "1rem",
    },
    ratingRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1rem",
      flexWrap: "wrap",
    },
    ratingStars: {
      display: "flex",
      gap: "0.15rem",
      color: T.star,
    },
    ratingText: {
      fontSize: "0.88rem",
      color: T.textMuted,
    },
    priceContainer: {
      display: "flex",
      alignItems: "baseline",
      gap: "1rem",
      marginBottom: "1rem",
      flexWrap: "wrap",
    },
    price: {
      fontSize: isMobile ? "1.75rem" : "2.25rem",
      fontWeight: "900",
      background: isDarkMode
        ? "linear-gradient(135deg, #f7d794, #f5346b)"
        : "linear-gradient(135deg, #d4af37, #f5346b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: "1.1",
    },
    mrp: {
      fontSize: "1.1rem",
      color: T.textDim,
      textDecoration: "line-through",
      opacity: 0.8,
    },
    discount: {
      fontSize: "1rem",
      color: brandColors.green,
      fontWeight: "700",
    },
    stock: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.4rem 1rem",
      borderRadius: "50px",
      fontSize: "0.82rem",
      fontWeight: "700",
      marginBottom: "1.25rem",
      letterSpacing: "0.5px",
      width: "fit-content",
      backgroundColor: product?.inStock
        ? "rgba(76, 175, 80, 0.12)"
        : "rgba(198, 40, 40, 0.12)",
      color: product?.inStock ? brandColors.green : T.danger,
      border: product?.inStock
        ? "1px solid rgba(76, 175, 80, 0.3)"
        : "1px solid rgba(198, 40, 40, 0.3)",
    },
    shadeLabel: {
      display: "block",
      fontSize: "0.95rem",
      color: T.text,
      marginBottom: "0.5rem",
      fontWeight: "600",
    },
    shadeOptions: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginBottom: "1.5rem",
    },
    shadeButton: {
      padding: "0.5rem 1.15rem",
      border: `1px solid ${T.border}`,
      background: "transparent",
      color: T.text,
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: "0.88rem",
      fontFamily: "inherit",
      fontWeight: "600",
    },
    shadeButtonSelected: {
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "1px solid transparent",
      fontWeight: "700",
      boxShadow: "0 4px 15px rgba(245, 52, 107, 0.3)",
    },
    quantityControl: {
      display: "flex",
      alignItems: "center",
      gap: "0.85rem",
      marginBottom: "1.75rem",
      backgroundColor: isDarkMode ? brandColors.black : "#fcf8f5",
      padding: "0.4rem",
      borderRadius: "50px",
      border: `1px solid ${T.border}`,
      width: "fit-content",
    },
    quantityButton: {
      width: "38px",
      height: "38px",
      border: "none",
      cursor: "pointer",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      borderRadius: "50%",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      fontFamily: "inherit",
      flexShrink: 0,
    },
    quantityValue: {
      fontSize: "1.15rem",
      minWidth: "30px",
      textAlign: "center",
      fontWeight: "700",
      color: T.text,
    },
    actionButtons: {
      display: "flex",
      gap: "0.75rem",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
    },
    addToCartButton: {
      flex: "2 1 200px",
      padding: "1rem",
      border: "none",
      borderRadius: "50px",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      fontSize: "1rem",
      fontWeight: "700",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.6rem",
      boxShadow: "0 8px 24px rgba(245, 52, 107, 0.3)",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      whiteSpace: "nowrap",
    },
    shareButton: {
      flex: "1 1 120px",
      padding: "1rem",
      backgroundColor: "transparent",
      color: T.text,
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      fontSize: "1rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      fontWeight: "600",
    },
    toast: {
      position: "fixed",
      top: "5rem",
      right: isMobile ? "1rem" : "2rem",
      left: isMobile ? "1rem" : "auto",
      zIndex: 9999,
      padding: "0.9rem 1.25rem",
      backgroundColor: isDarkMode ? "#1a3a1a" : "#e8f5e9",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      fontSize: "0.92rem",
      fontWeight: "600",
      border: isDarkMode
        ? "1px solid rgba(76, 175, 80, 0.3)"
        : "1px solid rgba(76, 175, 80, 0.25)",
      boxShadow: T.shadowLift,
      animation: "slideInRight 0.4s ease",
      maxWidth: isMobile ? "calc(100% - 2rem)" : "360px",
      boxSizing: "border-box",
    },
    keyFeatures: {
      marginTop: "1.25rem",
      padding: isMobile ? "1.15rem" : "1.35rem",
      borderRadius: "16px",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(62, 39, 35, 0.03)",
      border: `1px solid ${T.borderSoft}`,
      boxSizing: "border-box",
    },
    featureTitle: {
      fontSize: "1.05rem",
      fontWeight: "700",
      marginBottom: "0.9rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: T.text,
    },
    featureList: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "0.6rem",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.88rem",
      color: T.textMuted,
      lineHeight: "1.5",
    },
    deliveryInfo: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
      gap: "0.85rem",
      marginTop: "1.25rem",
      padding: isMobile ? "1.15rem" : "1.35rem",
      borderRadius: "16px",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(62, 39, 35, 0.03)",
      border: `1px solid ${T.borderSoft}`,
      boxSizing: "border-box",
    },
    deliveryItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      fontSize: "0.85rem",
      color: T.textMuted,
      lineHeight: "1.5",
    },
    notFound: {
      textAlign: "center",
      paddingTop: isMobile ? "4rem" : "6rem",
      paddingBottom: "4rem",
      position: "relative",
      zIndex: 2,
    },
    notFoundIcon: {
      fontSize: "4rem",
      color: brandColors.primary,
      marginBottom: "1rem",
    },
    notFoundTitle: {
      fontSize: isMobile ? "1.5rem" : "2rem",
      fontWeight: "800",
      marginBottom: "1rem",
      color: T.text,
    },
    notFoundText: {
      marginBottom: "2rem",
      color: T.textMuted,
      lineHeight: "1.6",
    },
    relatedSection: {
      position: "relative",
      zIndex: 2,
      marginTop: "3rem",
      padding: isMobile ? "1.5rem" : "2rem",
      backgroundColor: T.card,
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
    },
    relatedTitle: {
      fontSize: "1.1rem",
      fontWeight: "800",
      color: T.text,
      marginBottom: "1.25rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      letterSpacing: "-0.2px",
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
      color: T.textMuted,
      textDecoration: "none",
      border: `1px solid ${T.borderSoft}`,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.02)"
        : "rgba(62, 39, 35, 0.02)",
    },
    relatedIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
      fontSize: "0.8rem",
    },
    productGridRelated: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
      gap: "1rem",
    },
    productCard: {
      display: "block",
      textDecoration: "none",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.02)"
        : "rgba(62, 39, 35, 0.02)",
      borderRadius: "16px",
      overflow: "hidden",
      border: `1px solid ${T.borderSoft}`,
    },
    productCardImage: {
      width: "100%",
      height: "160px",
      objectFit: "contain",
      padding: "0.75rem",
      backgroundColor: isDarkMode ? "#0f0f0f" : "#f9f4f0",
      display: "block",
    },
    productCardBody: {
      padding: "0.85rem 1rem 1rem",
    },
    productCardCategory: {
      fontSize: "0.68rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textTransform: "uppercase",
      letterSpacing: "1.2px",
      fontWeight: "700",
      marginBottom: "0.35rem",
    },
    productCardName: {
      fontSize: "0.92rem",
      fontWeight: "700",
      color: T.text,
      lineHeight: "1.4",
      marginBottom: "0.4rem",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    productCardPrice: {
      fontSize: "0.95rem",
      fontWeight: "800",
      color: isDarkMode ? brandColors.gold : brandColors.earthLight,
    },
    citationSection: {
      position: "relative",
      zIndex: 2,
      marginTop: "2rem",
      padding: isMobile ? "1.5rem" : "1.75rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.06)"
        : "rgba(212, 175, 55, 0.04)",
      borderRadius: "18px",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.15)"
        : "1px solid rgba(212, 175, 55, 0.12)",
      borderLeft: `4px solid ${brandColors.goldDark}`,
    },
    citationTitle: {
      fontSize: "0.88rem",
      fontWeight: "800",
      color: isDarkMode ? brandColors.gold : brandColors.earthLight,
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
      color: T.textMuted,
      textDecoration: "none",
      lineHeight: 1.5,
    },
    citationDomain: {
      fontSize: "0.7rem",
      color: T.textDim,
      marginTop: "0.1rem",
    },
  };

  // ─── NOT FOUND ───
  if (!product) {
    return (
      <div style={themeStyles.container}>
        <SEO
          title="Product Not Found | ASudha Beauty"
          description="The product you're looking for doesn't exist. Browse our 100% natural Ayurvedic collection."
          url={`/product/${urlParam}`}
          noindex
        />
        <div style={themeStyles.bgBlob1} aria-hidden="true" />
        <div style={themeStyles.bgBlob2} aria-hidden="true" />

        <div style={themeStyles.notFound}>
          <FaBoxOpen
            aria-hidden="true"
            style={themeStyles.notFoundIcon}
          />
          <h2 style={themeStyles.notFoundTitle}>Product Not Found</h2>
          <p style={themeStyles.notFoundText}>
            The Ayurvedic product you&apos;re looking for doesn&apos;t exist.
            Explore our full collection instead.
          </p>
          <button
            type="button"
            onClick={() => navigate("/shop")}
            style={themeStyles.addToCartButton}
            className="pd-add-cart-btn"
          >
            <FaShoppingBag aria-hidden="true" /> Browse All Products
          </button>
        </div>
      </div>
    );
  }

  // ─── Computed values ───
  const productImages = product.images || [product.image];
  const productKeywords = getProductKeywords(product);
  const productCitations = getProductCitations(product);
  const relatedBlogLinks = getRelatedBlogLinks(product);
  const productUrl = getProductUrl(product);

  // ✅ ADD: Product-specific FAQs for schema
  const productFaqs = [
    {
      q: `How do I use ${product?.name}?`,
      a: `Mix ${product?.name} with rose water or curd to form a paste. Apply to clean skin, leave for 10–15 minutes, and rinse thoroughly. Use 2–3 times per week for best results.`,
    },
    {
      q: `Is ${product?.name} suitable for oily skin?`,
      a: `Yes. ${product?.name} is formulated with natural ingredients that help control excess oil without stripping the skin. It is ideal for oily and acne-prone skin.`,
    },
    {
      q: `Is ${product?.name} chemical-free?`,
      a: `Absolutely. ASudha Beauty products are 100% natural, paraben-free, cruelty-free, and free from synthetic chemicals.`,
    },
  ];

  const productBreadcrumb = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: product.name, url: productUrl },
  ];

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aMatch = a.category === product.category ? 1 : 0;
      const bMatch = b.category === product.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  return (
    <div style={themeStyles.container}>
      <SEO
        title={`Buy ${product?.name} Online | 100% Natural ${product?.category} | ASudha Beauty`}
        description={`Shop ${product?.name} — 100% natural, chemical-free Ayurvedic ${product?.category?.toLowerCase()} from ASudha Beauty. ${product?.description?.slice(0, 100)}... Free shipping above ₹500.`}
        keywords={[
          ...productKeywords,
          `${product?.name?.toLowerCase()} online`,
          `buy ${product?.name?.toLowerCase()}`,
          `${product?.name?.toLowerCase()} benefits`,
          `${product?.name?.toLowerCase()} for oily skin`,
        ]}
        type="product"
        product={product}
        url={productUrl}
        breadcrumb={productBreadcrumb}
        faqs={productFaqs} // ✅ Uses product-specific FAQs
        citations={productCitations.map((c) => ({
          label: c.label,
          href: c.href,
        }))}
      />

      <div style={themeStyles.bgBlob1} aria-hidden="true" />
      <div style={themeStyles.bgBlob2} aria-hidden="true" />

      {addedToCart && (
        <div style={themeStyles.toast} role="status" aria-live="polite">
          <FaCheckCircle aria-hidden="true" /> Added to cart successfully!
        </div>
      )}
      {copied && (
        <div style={themeStyles.toast} role="status" aria-live="polite">
          <FaCopy aria-hidden="true" /> Link copied to clipboard!
        </div>
      )}

      <nav style={themeStyles.breadcrumb} aria-label="Breadcrumb">
        <Link to="/" style={themeStyles.breadcrumbLink}>
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop" style={themeStyles.breadcrumbLink}>
          Shop
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <button
        type="button"
        onClick={() => navigate(-1)}
        style={themeStyles.backButton}
        className="pd-back-btn"
        aria-label="Go back to previous page"
      >
        <FaArrowLeft aria-hidden="true" /> Back
      </button>

      <div style={themeStyles.productGrid}>
        <ImageGallery
          images={productImages}
          video={product.video}
          videoThumbnail={product.videoThumbnail}
          productName={product.name}
        />

        <div style={themeStyles.info}>
          <div style={themeStyles.header}>
            <span style={themeStyles.category}>
              <FaLeaf aria-hidden="true" style={{ fontSize: "0.75rem" }} />{" "}
              {product.category}
            </span>
            <button
              type="button"
              style={{
                ...themeStyles.wishlistButton,
                color: inWishlist
                  ? brandColors.primary
                  : isDarkMode
                  ? T.textDim
                  : "#b0a29a",
              }}
              className="pd-wishlist-btn"
              onClick={handleWishlistToggle}
              aria-label={
                inWishlist
                  ? `Remove ${product.name} from wishlist`
                  : `Add ${product.name} to wishlist`
              }
              aria-pressed={inWishlist}
            >
              {inWishlist ? (
                <FaHeart aria-hidden="true" />
              ) : (
                <FaRegHeart aria-hidden="true" />
              )}
            </button>
          </div>

          <h1 style={themeStyles.name}>{product.name}</h1>
          {product.itemNo && (
            <p style={themeStyles.itemNo}>Item No: {product.itemNo}</p>
          )}

          {product.rating && (
            <div
              style={themeStyles.ratingRow}
              role="img"
              aria-label={`Rated ${product.rating} out of 5 from ${
                product.reviews || 0
              } reviews`}
            >
              <div style={themeStyles.ratingStars} aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    color={
                      i < Math.floor(product.rating) ? T.star : T.starEmpty
                    }
                  />
                ))}
              </div>
              <span style={themeStyles.ratingText}>
                {product.rating} ({product.reviews || 0} reviews)
              </span>
            </div>
          )}

          <div style={themeStyles.priceContainer}>
            <span style={themeStyles.price}>
              ₹{Number(product.price).toFixed(2)}
            </span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span style={themeStyles.mrp}>
                  ₹{Number(product.mrp).toFixed(2)}
                </span>
                <span style={themeStyles.discount}>{discount}% OFF</span>
              </>
            )}
          </div>

          <div style={themeStyles.stock}>
            <FaSpa aria-hidden="true" />{" "}
            {product.inStock ? "In Stock" : "Out of Stock"}
          </div>

          {product.shades &&
            Array.isArray(product.shades) &&
            product.shades.length > 0 && (
              <div style={{ marginBottom: "0.5rem" }}>
                <label
                  style={themeStyles.shadeLabel}
                  id="shade-label"
                >
                  Select Variant:
                </label>
                <div
                  style={themeStyles.shadeOptions}
                  role="group"
                  aria-labelledby="shade-label"
                >
                  {product.shades.map((shade) => (
                    <button
                      key={shade}
                      type="button"
                      style={{
                        ...themeStyles.shadeButton,
                        ...(selectedShade === shade
                          ? themeStyles.shadeButtonSelected
                          : {}),
                      }}
                      className="pd-shade-btn"
                      onClick={() => setSelectedShade(shade)}
                      aria-pressed={selectedShade === shade}
                    >
                      {shade}
                    </button>
                  ))}
                </div>
              </div>
            )}

          <div>
            <label style={themeStyles.shadeLabel} id="quantity-label">
              Quantity:
            </label>
            <div
              style={themeStyles.quantityControl}
              role="group"
              aria-labelledby="quantity-label"
            >
              <button
                type="button"
                style={themeStyles.quantityButton}
                className="pd-qty-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span
                style={themeStyles.quantityValue}
                aria-live="polite"
                aria-atomic="true"
              >
                {quantity}
              </span>
              <button
                type="button"
                style={themeStyles.quantityButton}
                className="pd-qty-btn"
                onClick={() => handleQuantityChange(1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div style={themeStyles.actionButtons}>
            <button
              type="button"
              style={themeStyles.addToCartButton}
              className="pd-add-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              aria-label={
                product.inStock
                  ? `Add ${product.name} to cart`
                  : `${product.name} is out of stock`
              }
            >
              <FaShoppingCart aria-hidden="true" />{" "}
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              type="button"
              style={themeStyles.shareButton}
              className="pd-share-btn"
              onClick={handleShare}
              aria-label={`Share ${product.name}`}
            >
              <FaShare aria-hidden="true" /> Share
            </button>
          </div>

          {product.benefits && product.benefits.length > 0 && (
            <div style={themeStyles.keyFeatures}>
              <h2 style={themeStyles.featureTitle}>
                <FaLeaf
                  aria-hidden="true"
                  style={{ color: brandColors.green }}
                />{" "}
                Ayurvedic Benefits
              </h2>
              <div style={themeStyles.featureList}>
                {product.benefits.map((benefit, index) => (
                  <div
                    key={`${benefit}-${index}`}
                    style={themeStyles.featureItem}
                  >
                    <FaCheckCircle
                      aria-hidden="true"
                      style={{
                        color: brandColors.green,
                        flexShrink: 0,
                        fontSize: "0.85rem",
                      }}
                    />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ✅ ADD: How to Use Section with long-tail keywords */}
          <div style={themeStyles.keyFeatures}>
            <h2 style={themeStyles.featureTitle}>
              <FaLeaf
                aria-hidden="true"
                style={{ color: brandColors.green }}
              />{" "}
              How to Use {product?.name}
            </h2>
            <div style={themeStyles.featureList}>
              <div style={themeStyles.featureItem}>
                <FaCheckCircle
                  aria-hidden="true"
                  style={{
                    color: brandColors.green,
                    flexShrink: 0,
                    fontSize: "0.85rem",
                  }}
                />
                Mix 2 tablespoons of {product?.name} with rose water or curd.
              </div>
              <div style={themeStyles.featureItem}>
                <FaCheckCircle
                  aria-hidden="true"
                  style={{
                    color: brandColors.green,
                    flexShrink: 0,
                    fontSize: "0.85rem",
                  }}
                />
                Apply an even layer to clean, damp skin.
              </div>
              <div style={themeStyles.featureItem}>
                <FaCheckCircle
                  aria-hidden="true"
                  style={{
                    color: brandColors.green,
                    flexShrink: 0,
                    fontSize: "0.85rem",
                  }}
                />
                Leave for 10–15 minutes, then rinse with lukewarm water.
              </div>
              <div style={themeStyles.featureItem}>
                <FaCheckCircle
                  aria-hidden="true"
                  style={{
                    color: brandColors.green,
                    flexShrink: 0,
                    fontSize: "0.85rem",
                  }}
                />
                Use 2–3 times per week for oily skin; once a week for dry skin.
              </div>
            </div>
          </div>

          <div style={themeStyles.deliveryInfo}>
            <div style={themeStyles.deliveryItem}>
              <FaTruck
                aria-hidden="true"
                style={{ color: brandColors.primary, flexShrink: 0 }}
              />{" "}
              Free shipping on orders above ₹500
            </div>
            <div style={themeStyles.deliveryItem}>
              <FaShieldAlt
                aria-hidden="true"
                style={{ color: brandColors.primary, flexShrink: 0 }}
              />{" "}
              100% Natural &amp; Authentic
            </div>
            <div style={themeStyles.deliveryItem}>
              <FaUndo
                aria-hidden="true"
                style={{ color: brandColors.primary, flexShrink: 0 }}
              />{" "}
              30-day easy returns
            </div>
          </div>
        </div>
      </div>

      {product.catalog && (
        <ShadeCatalog
          catalog={product.catalog}
          onSelectShade={handleShadeSelect}
          selectedShade={selectedShade}
        />
      )}

      <ProductTabs product={product} />

      <section
        style={themeStyles.relatedSection}
        aria-labelledby="product-related-reading-title"
      >
        <h2
          id="product-related-reading-title"
          style={themeStyles.relatedTitle}
        >
          <FaBookOpen aria-hidden="true" /> Learn More About This Ritual
        </h2>
        <ul style={themeStyles.relatedList}>
          {relatedBlogLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                style={themeStyles.relatedLink}
                className="pd-related-link"
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <FaBookOpen
                    aria-hidden="true"
                    style={themeStyles.relatedIcon}
                  />
                  {link.label}
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

      {relatedProducts.length > 0 && (
        <section
          style={themeStyles.relatedSection}
          aria-labelledby="product-related-products-title"
        >
          <h2
            id="product-related-products-title"
            style={themeStyles.relatedTitle}
          >
            <FaShoppingBag aria-hidden="true" /> You Might Also Like
          </h2>
          <div style={themeStyles.productGridRelated}>
            {relatedProducts.map((rp) => (
              <Link
                /* ✅ FIX: Added fallback to ID so React keys are always unique */
                key={rp.slug || rp.id}
                to={getProductUrl(rp)}
                style={themeStyles.productCard}
                className="pd-product-card"
                aria-label={`View ${rp.name}`}
              >
                <img
                  src={rp.image}
                  alt={`${rp.name} — ${rp.category} by ASudha Beauty`}
                  style={themeStyles.productCardImage}
                  loading="lazy"
                  decoding="async"
                />
                <div style={themeStyles.productCardBody}>
                  <div style={themeStyles.productCardCategory}>
                    {rp.category}
                  </div>
                  <div style={themeStyles.productCardName}>{rp.name}</div>
                  <div style={themeStyles.productCardPrice}>
                    ₹{Number(rp.price).toFixed(2)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section
        style={themeStyles.citationSection}
        aria-labelledby="product-sources-title"
      >
        <h2
          id="product-sources-title"
          style={themeStyles.citationTitle}
        >
          <FaFlask aria-hidden="true" /> Sources &amp; Further Reading
        </h2>
        <ul style={themeStyles.citationList}>
          {productCitations.map((c) => (
            <li key={c.href}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.citationLink}
                className="pd-citation-link"
                aria-label={`${c.label} — opens in new tab`}
              >
                <FaExternalLinkAlt
                  aria-hidden="true"
                  style={{
                    fontSize: "0.65rem",
                    marginTop: "0.2rem",
                    flexShrink: 0,
                    color: isDarkMode
                      ? brandColors.gold
                      : brandColors.bronze,
                  }}
                />
                <span>
                  {c.label}
                  <div style={themeStyles.citationDomain}>{c.domain}</div>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProductDetail;