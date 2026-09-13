// src/pages/Testimonials.js
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";
import {
  FaStar,
  FaUserCircle,
  FaSearch,
  FaThumbsUp,
  FaRegClock,
  FaCheckCircle,
  FaShoppingBag,
  FaHeart,
  FaTimes,
  FaQuoteRight,
  FaPenNib,
} from "react-icons/fa";

const HELPFUL_STORAGE_KEY = "asudha_helpful_reviews";

// ─── Brand palette (module-scope: stable references) ───
const brandColors = {
  primary: "#f5346b",
  primaryDark: "#cf2a57",
  gold: "#f7d794",
  goldDark: "#d4af37",
  bronze: "#c77d42",
  black: "#0f0f0f",
  darkSlate: "#1a1a1a",
  earthDark: "#3e2723",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
  star: "#ffc107",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const Testimonials = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [helpfulVotes, setHelpfulVotes] = useState(() => {
    try {
      const stored = localStorage.getItem(HELPFUL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // ─── Theme tokens ───
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
    star: brandColors.star,
    starEmpty: "rgba(255, 255, 255, 0.15)",
    shadow: DARK_SHADOW,
    shadowLift: DARK_SHADOW_LIFT,
  };

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
    star: brandColors.star,
    starEmpty: "#e0e0e0",
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(HELPFUL_STORAGE_KEY, JSON.stringify(helpfulVotes));
    } catch (err) {
      console.error("Failed to save helpful votes:", err);
    }
  }, [helpfulVotes]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 200);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const allTestimonials = useMemo(
    () => [
      {
        id: 1,
        name: "Sarah Johnson",
        location: "New York, USA",
        rating: 5,
        date: "March 15, 2024",
        title: "My skin has never felt this clean!",
        content:
          "Multani Mitti is a game changer! I mix it with rose water and use it twice a week. My oily skin has finally found its match. It deep cleanses without over-drying. ASudha's powder is so pure and fine!",
        productPurchased: "Multani Mitti Powder",
        productLink: "/product/11001",
        verified: true,
        helpful: 124,
      },
      {
        id: 2,
        name: "Priya Sharma",
        location: "Mumbai, India",
        rating: 5,
        date: "February 28, 2024",
        title: "Traditional radiance in a pack!",
        content:
          "The Ubtan powder instantly gave my face a glow. It smells incredible, and my skin feels so soft and bright after every use. Perfect for special occasions or just a weekend pamper session!",
        productPurchased: "Ubtan Powder",
        productLink: "/product/11002",
        verified: true,
        helpful: 89,
      },
      {
        id: 3,
        name: "Emily Chen",
        location: "Singapore",
        rating: 5,
        date: "January 20, 2024",
        title: "My hair fall has reduced drastically!",
        content:
          "I've been using ASudha's Amla powder mixed with coconut oil. My hair feels thicker and has a beautiful natural shine. The fact that it is 100% natural with no chemicals makes it a must-have for me!",
        productPurchased: "Amla Powder",
        productLink: "/product/12001",
        verified: true,
        helpful: 56,
      },
      {
        id: 4,
        name: "Rajesh Kumar",
        location: "Delhi, India",
        rating: 4,
        date: "December 10, 2023",
        title: "Amazing natural cleanser!",
        content:
          "Reetha powder is wonderful. It gently cleanses my hair without stripping away natural oils. My scalp feels much healthier now. Shipping was fast and the packaging was great!",
        productPurchased: "Reetha Powder",
        productLink: "/product/12002",
        verified: true,
        helpful: 34,
      },
      {
        id: 5,
        name: "Anita Desai",
        location: "Bangalore, India",
        rating: 5,
        date: "November 5, 2023",
        title: "My hair is finally silky and strong!",
        content:
          "The Herbal Mix Hair Pack is a hidden gem! It has transformed my dry, dull hair into soft, shiny locks. I love that it has Bhringraj and Amla mixed together. ASudha Beauty is now my go-to for hair care!",
        productPurchased: "Herbal Mix Hair Pack",
        productLink: "/product/12004",
        verified: true,
        helpful: 78,
      },
      {
        id: 6,
        name: "Michael Brown",
        location: "London, UK",
        rating: 5,
        date: "October 18, 2023",
        title: "Shikakai is pure magic!",
        content:
          "Finally a brand that offers pure, unadulterated Shikakai powder! It strengthens my roots and gives me the perfect natural shine. Shipping to the UK was fast and the quality is impeccable.",
        productPurchased: "Shikakai Powder",
        productLink: "/product/12003",
        verified: true,
        helpful: 45,
      },
      {
        id: 7,
        name: "Neha Gupta",
        location: "Pune, India",
        rating: 5,
        date: "September 22, 2023",
        title: "Perfect for my budget and my skin!",
        content:
          "As a student, I love that these natural powders are affordable but deliver amazing results. The Multani Mitti controls my excess oil perfectly. My skin feels so fresh and clean!",
        productPurchased: "Multani Mitti Powder",
        productLink: "/product/11001",
        verified: true,
        helpful: 29,
      },
      {
        id: 8,
        name: "Sophia Martinez",
        location: "Los Angeles, USA",
        rating: 4,
        date: "August 30, 2023",
        title: "Lovely glow, lovely ingredients!",
        content:
          "Using Ubtan for my face has become a Sunday ritual. The traditional blend of herbs gives me a lovely glow. Only giving 4 stars because I wish the packs were a bit bigger!",
        productPurchased: "Ubtan Powder",
        productLink: "/product/11002",
        verified: true,
        helpful: 23,
      },
    ],
    []
  );

  const stats = useMemo(() => {
    const total = allTestimonials.length;
    const five = allTestimonials.filter((t) => t.rating === 5).length;
    const four = allTestimonials.filter((t) => t.rating === 4).length;
    const three = allTestimonials.filter((t) => t.rating === 3).length;
    const two = allTestimonials.filter((t) => t.rating === 2).length;
    const one = allTestimonials.filter((t) => t.rating === 1).length;
    const avg =
      total > 0
        ? (
            allTestimonials.reduce((sum, t) => sum + t.rating, 0) / total
          ).toFixed(1)
        : "0.0";

    return { total, five, four, three, two, one, avg };
  }, [allTestimonials]);

  const filteredTestimonials = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();

    return allTestimonials.filter((testimonial) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "5star" && testimonial.rating === 5) ||
        (filter === "4star" && testimonial.rating === 4) ||
        (filter === "3star" && testimonial.rating === 3);

      if (!matchesFilter) return false;
      if (!q) return true;

      return (
        testimonial.name.toLowerCase().includes(q) ||
        testimonial.title.toLowerCase().includes(q) ||
        testimonial.content.toLowerCase().includes(q) ||
        testimonial.productPurchased.toLowerCase().includes(q)
      );
    });
  }, [allTestimonials, filter, debouncedSearch]);

  const handleHelpful = useCallback((id) => {
    setHelpfulVotes((prev) => {
      if (prev[id]) return prev;
      return { ...prev, [id]: true };
    });
  }, []);

  const hasVoted = (id) => Boolean(helpfulVotes[id]);

  const renderStars = (rating, size = 14) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        color={i < rating ? T.star : T.starEmpty}
        size={size}
      />
    ));

  const clearFilters = () => {
    setFilter("all");
    setSearchTerm("");
  };

  const hasActiveFilters = filter !== "all" || searchTerm.trim() !== "";

  // ─── Injected CSS ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-testimonials-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-testimonials-styles", "true");
    style.textContent = `
      @keyframes tmFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes tmFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes tmFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }

      .tm-orb-1 { animation: tmFloat1 16s ease-in-out infinite; }
      .tm-orb-2 { animation: tmFloat2 20s ease-in-out infinite; }
      .tm-orb-3 { animation: tmFloat3 18s ease-in-out infinite; }

      .tm-stat-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .tm-stat-card:hover {
        transform: translateY(-5px);
        box-shadow: ${T.shadowLift};
        border-color: ${isDarkMode ? "rgba(212, 175, 55, 0.4)" : "rgba(199, 125, 66, 0.3)"} !important;
      }

      .tm-testimonial-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s ease, border-color 0.3s ease;
      }
      .tm-testimonial-card:hover {
        transform: translateY(-6px);
        box-shadow: ${T.shadowLift};
        border-color: ${isDarkMode ? "rgba(212, 175, 55, 0.4)" : "rgba(199, 125, 66, 0.3)"} !important;
      }
      .tm-testimonial-card:hover .tm-quote-mark {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary};
        opacity: 0.35;
        transform: rotate(-6deg) scale(1.08);
      }

      .tm-quote-mark {
        transition: color 0.3s ease, opacity 0.3s ease, transform 0.4s ease;
      }

      .tm-filter-btn {
        transition: all 0.25s ease;
      }
      .tm-filter-btn:hover {
        transform: translateY(-2px);
        border-color: ${brandColors.primary};
        color: ${brandColors.primary};
      }

      .tm-product-link {
        transition: all 0.3s ease;
      }
      .tm-product-link:hover {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        border-color: transparent !important;
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(245, 52, 107, 0.35);
      }

      .tm-helpful-btn {
        transition: all 0.25s ease;
      }
      .tm-helpful-btn:hover:not(:disabled) {
        background: ${isDarkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(62, 39, 35, 0.05)"} !important;
        color: ${brandColors.primary};
        transform: translateY(-1px);
      }
      .tm-helpful-btn:disabled { cursor: default; }

      .tm-clear-btn {
        transition: all 0.25s ease;
      }
      .tm-clear-btn:hover {
        background: ${brandColors.primary} !important;
        color: #ffffff !important;
        transform: translateY(-2px);
      }

      .tm-cta-btn {
        transition: all 0.3s ease;
      }
      .tm-cta-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
      }
      .tm-cta-btn:hover svg { transform: scale(1.1); }

      .tm-search-input::placeholder {
        color: ${T.textDim};
      }
      .tm-search-input:focus {
        color: ${T.text};
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-testimonials-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const themeStyles = {
    // ─── Page wrapper ───
    container: {
      position: "relative",
      minHeight: "100%",
      backgroundColor: T.bg,
      color: T.text,
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
      overflowX: "hidden",
    },

    // ─── Animated background ───
    bgLayer: {
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
    },
    bgGradient: {
      position: "absolute",
      inset: 0,
      background: isDarkMode
        ? "radial-gradient(circle at 15% 8%, rgba(245, 52, 107, 0.16) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.13) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)"
        : "radial-gradient(circle at 15% 8%, rgba(245, 52, 107, 0.09) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(76, 175, 80, 0.07) 0%, transparent 50%)",
    },
    bgGrid: {
      position: "absolute",
      inset: 0,
      backgroundImage: isDarkMode
        ? "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)"
        : "linear-gradient(rgba(62,39,35,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(62,39,35,0.035) 1px, transparent 1px)",
      backgroundSize: "46px 46px",
      maskImage:
        "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)",
      WebkitMaskImage:
        "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)",
    },
    bgOrb1: {
      position: "absolute",
      top: "-150px",
      left: "-150px",
      width: "500px",
      height: "500px",
      maxWidth: "65vw",
      maxHeight: "65vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(245, 52, 107, 0.38) 0%, transparent 70%)",
      filter: "blur(95px)",
      opacity: isDarkMode ? 0.42 : 0.32,
    },
    bgOrb2: {
      position: "absolute",
      top: "35%",
      right: "-170px",
      width: "520px",
      height: "520px",
      maxWidth: "65vw",
      maxHeight: "65vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(212, 175, 55, 0.38) 0%, transparent 70%)",
      filter: "blur(95px)",
      opacity: isDarkMode ? 0.42 : 0.32,
    },
    bgOrb3: {
      position: "absolute",
      bottom: "-170px",
      left: "25%",
      width: "460px",
      height: "460px",
      maxWidth: "60vw",
      maxHeight: "60vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.34) 0%, transparent 70%)",
      filter: "blur(95px)",
      opacity: isDarkMode ? 0.38 : 0.28,
    },

    // ─── Header ───
    header: {
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      padding: isMobile
        ? "2rem 1rem 1.5rem"
        : isNarrow
        ? "2.5rem 1.5rem 1.5rem"
        : "3.5rem 2rem 2rem",
      maxWidth: "900px",
      margin: "0 auto",
    },
    title: {
      fontSize: isMobile ? "2rem" : isNarrow ? "2.4rem" : "3rem",
      fontWeight: "900",
      marginBottom: "1.25rem",
      color: T.text,
      lineHeight: "1.1",
      letterSpacing: "-0.5px",
      position: "relative",
      display: "inline-block",
      paddingBottom: "0.75rem",
    },
    titleAccent: {
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
      width: "90px",
      height: "4px",
      borderRadius: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
    },
    subtitle: {
      fontSize: isMobile ? "0.92rem" : "1.05rem",
      color: T.textMuted,
      maxWidth: "620px",
      margin: "0 auto",
      lineHeight: "1.7",
    },

    // ─── Stats ───
    statsSection: {
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns: isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: isMobile ? "0.85rem" : "1.35rem",
      maxWidth: "1100px",
      margin: "1.5rem auto 2.25rem",
      padding: isMobile ? "0 1rem" : isNarrow ? "0 1.5rem" : "0 2rem",
      boxSizing: "border-box",
    },
    statCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.25rem 1rem" : "1.6rem 1.15rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    statCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.9,
    },
    statNumber: {
      fontSize: isMobile ? "1.75rem" : "2.1rem",
      fontWeight: "900",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      lineHeight: "1.1",
      letterSpacing: "-0.5px",
    },
    statRatingRow: {
      display: "flex",
      justifyContent: "center",
      gap: "0.15rem",
      marginTop: "0.5rem",
      marginBottom: "0.35rem",
    },
    statLabel: {
      fontSize: isMobile ? "0.75rem" : "0.82rem",
      color: T.textMuted,
      marginTop: "0.4rem",
      fontWeight: "700",
      letterSpacing: "0.2px",
    },

    // ─── Rating breakdown ───
    breakdown: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1100px",
      margin: "0 auto 2.25rem",
      padding: isMobile ? "0 1rem" : isNarrow ? "0 1.5rem" : "0 2rem",
      boxSizing: "border-box",
    },
    breakdownCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.5rem 1.25rem" : "1.75rem 2rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    breakdownAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.85,
    },
    breakdownRow: {
      display: "grid",
      gridTemplateColumns: "70px 1fr 50px",
      alignItems: "center",
      gap: "0.9rem",
      marginBottom: "0.7rem",
    },
    breakdownLabel: {
      fontSize: "0.85rem",
      fontWeight: "800",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
    },
    breakdownBarOuter: {
      height: "10px",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(62, 39, 35, 0.08)",
      borderRadius: "5px",
      overflow: "hidden",
    },
    breakdownBarInner: {
      height: "100%",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.star})`,
      borderRadius: "5px",
      transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 0 10px rgba(255, 193, 7, 0.4)",
    },
    breakdownCount: {
      fontSize: "0.85rem",
      fontWeight: "800",
      color: T.textMuted,
      textAlign: "right",
    },

    // ─── Filter bar ───
    filterBar: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexWrap: "wrap",
      gap: "0.75rem",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1100px",
      margin: "0 auto 1.75rem",
      padding: isMobile ? "0 1rem" : isNarrow ? "0 1.5rem" : "0 2rem",
      boxSizing: "border-box",
    },
    filterButtons: {
      display: "flex",
      gap: "0.5rem",
      flexWrap: "wrap",
    },
    filterButton: {
      padding: isMobile ? "0.6rem 1.05rem" : "0.7rem 1.25rem",
      borderRadius: "50px",
      border: `1px solid ${T.border}`,
      backgroundColor: T.card,
      color: T.textMuted,
      cursor: "pointer",
      fontSize: isMobile ? "0.8rem" : "0.88rem",
      fontWeight: "700",
      fontFamily: "inherit",
      whiteSpace: "nowrap",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },
    activeFilterButton: {
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      borderColor: "transparent",
      color: isDarkMode ? brandColors.black : "#ffffff",
      boxShadow: "0 10px 24px rgba(245, 52, 107, 0.35)",
    },
    searchBox: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      backgroundColor: T.card,
      padding: "0.65rem 1.15rem",
      borderRadius: "50px",
      border: `1px solid ${T.border}`,
      flex: isNarrow ? "1 1 100%" : "0 1 340px",
      minWidth: 0,
      boxSizing: "border-box",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      boxShadow: T.shadow,
    },
    searchInput: {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      color: T.text,
      fontSize: "0.9rem",
      flex: 1,
      minWidth: 0,
      fontFamily: "inherit",
      fontWeight: "600",
    },
    clearFiltersBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.5rem 1rem",
      background: "transparent",
      border: `1.5px solid ${brandColors.primary}`,
      borderRadius: "50px",
      color: brandColors.primary,
      fontSize: "0.78rem",
      fontWeight: "800",
      cursor: "pointer",
      fontFamily: "inherit",
      whiteSpace: "nowrap",
      letterSpacing: "0.2px",
    },

    // ─── Grid & cards ───
    grid: {
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns: isMobile
        ? "minmax(0, 1fr)"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
      gap: isMobile ? "1.15rem" : "1.4rem",
      maxWidth: "1100px",
      margin: "0 auto",
      padding: isMobile ? "0 1rem" : isNarrow ? "0 1.5rem" : "0 2rem",
      boxSizing: "border-box",
      width: "100%",
    },
    testimonialCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.4rem" : "1.6rem",
      boxShadow: T.shadow,
      border: `1px solid ${T.border}`,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      position: "relative",
      overflow: "hidden",
    },
    quoteMark: {
      position: "absolute",
      top: "1rem",
      right: "1.15rem",
      fontSize: "2.5rem",
      color: T.textDim,
      opacity: 0.18,
      pointerEvents: "none",
      lineHeight: 1,
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "0.95rem",
      gap: "0.75rem",
      position: "relative",
      zIndex: 1,
    },
    userInfo: {
      display: "flex",
      gap: "0.75rem",
      alignItems: "center",
      minWidth: 0,
      flex: 1,
    },
    avatar: {
      width: "46px",
      height: "46px",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.25rem",
      color: isDarkMode ? brandColors.black : "#ffffff",
      flexShrink: 0,
      boxShadow: "0 6px 18px rgba(245, 52, 107, 0.3)",
    },
    nameSection: { flex: 1, minWidth: 0 },
    name: {
      fontWeight: "900",
      fontSize: "0.95rem",
      marginBottom: "0.2rem",
      color: T.text,
      wordBreak: "break-word",
      letterSpacing: "-0.1px",
    },
    location: {
      fontSize: "0.72rem",
      color: T.textMuted,
      lineHeight: "1.4",
      fontWeight: "600",
    },
    verifiedBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      fontSize: "0.62rem",
      color: brandColors.green,
      marginTop: "0.25rem",
      fontWeight: "800",
      letterSpacing: "0.3px",
      padding: "0.15rem 0.5rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.1)",
      borderRadius: "50px",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.28)" : "rgba(76, 175, 80, 0.2)"
      }`,
      width: "fit-content",
    },
    rating: {
      display: "flex",
      gap: "0.15rem",
      flexShrink: 0,
    },
    reviewTitle: {
      fontSize: isMobile ? "1rem" : "1.08rem",
      fontWeight: "900",
      marginBottom: "0.65rem",
      color: T.text,
      lineHeight: "1.35",
      letterSpacing: "-0.2px",
      position: "relative",
      zIndex: 1,
    },
    reviewContent: {
      fontSize: "0.88rem",
      lineHeight: "1.7",
      marginBottom: "1rem",
      color: T.textMuted,
      flex: 1,
    },
    productLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.45rem 0.95rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.1)"
        : "rgba(245, 52, 107, 0.06)",
      borderRadius: "50px",
      fontSize: "0.78rem",
      color: isDarkMode ? T.gold : brandColors.primary,
      textDecoration: "none",
      marginBottom: "1rem",
      fontWeight: "800",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.22)" : "rgba(245, 52, 107, 0.15)"
      }`,
      width: "fit-content",
      letterSpacing: "0.1px",
    },
    cardFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "0.9rem",
      borderTop: `1px solid ${T.divider}`,
      fontSize: "0.75rem",
      color: T.textMuted,
      gap: "0.5rem",
      flexWrap: "wrap",
      marginTop: "auto",
    },
    helpfulButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      cursor: "pointer",
      background: "none",
      border: "none",
      color: T.textMuted,
      fontFamily: "inherit",
      fontSize: "0.78rem",
      fontWeight: "700",
      padding: "0.3rem 0.55rem",
      borderRadius: "50px",
    },
    helpfulButtonActive: {
      color: brandColors.primary,
      fontWeight: "800",
    },
    dateText: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      fontSize: "0.72rem",
      fontWeight: "600",
    },

    // ─── Empty state ───
    emptyState: {
      textAlign: "center",
      padding: isMobile ? "2.5rem 1.5rem" : "3.5rem 2rem",
      gridColumn: "1 / -1",
      backgroundColor: T.card,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      overflow: "hidden",
    },
    emptyAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    emptyIconWrap: {
      width: "72px",
      height: "72px",
      margin: "0 auto 1.25rem",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: isDarkMode ? brandColors.black : "#ffffff",
      fontSize: "1.75rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
    },
    emptyTitle: {
      fontSize: "1.15rem",
      fontWeight: "900",
      marginBottom: "0.5rem",
      color: T.text,
      letterSpacing: "-0.2px",
    },
    emptyText: {
      color: T.textMuted,
      fontSize: "0.9rem",
      marginBottom: "1.5rem",
      lineHeight: "1.7",
      maxWidth: "380px",
      margin: "0 auto 1.5rem",
    },

    // ─── CTA (redesigned — no more floating inline icon) ───
    ctaWrapper: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1100px",
      margin: "3rem auto 0",
      padding: isMobile ? "0 1rem" : isNarrow ? "0 1.5rem" : "0 2rem",
      boxSizing: "border-box",
    },
    ctaCard: {
      backgroundColor: T.cardAlt,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "26px",
      padding: isMobile ? "2.5rem 1.75rem" : "3.25rem 2.5rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    ctaAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    ctaIconWrap: {
      width: isMobile ? "64px" : "76px",
      height: isMobile ? "64px" : "76px",
      margin: "0 auto 1.5rem",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? "1.5rem" : "1.85rem",
      boxShadow: "0 16px 40px rgba(245, 52, 107, 0.4)",
    },
    ctaTitle: {
      fontSize: isMobile ? "1.4rem" : "1.75rem",
      fontWeight: "900",
      marginBottom: "0.85rem",
      color: T.text,
      letterSpacing: "-0.4px",
      lineHeight: "1.2",
    },
    ctaText: {
      color: T.textMuted,
      marginBottom: "1.85rem",
      fontSize: isMobile ? "0.92rem" : "1.05rem",
      lineHeight: "1.7",
      maxWidth: "540px",
      margin: "0 auto 1.85rem",
    },
    ctaButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      padding: isMobile ? "0.95rem 1.85rem" : "1.1rem 2.4rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      letterSpacing: "0.2px",
      fontFamily: "inherit",
    },
    ctaButtonIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.3s ease",
    },
  };

  return (
    <div style={themeStyles.container}>
      <SEO
        title="Customer Reviews & Testimonials | ASudha Beauty"
        description="Read verified customer reviews of ASudha Beauty's 100% natural Ayurvedic skincare and hair care products. See why thousands of customers love our herbal powders."
        keywords="customer reviews, testimonials, ASudha Beauty reviews, natural skincare reviews, Ayurvedic products"
        url="/testimonials"
      />

      {/* Animated background */}
      <div style={themeStyles.bgLayer}>
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div
          className="tm-orb-1"
          style={themeStyles.bgOrb1}
          aria-hidden="true"
        />
        <div
          className="tm-orb-2"
          style={themeStyles.bgOrb2}
          aria-hidden="true"
        />
        <div
          className="tm-orb-3"
          style={themeStyles.bgOrb3}
          aria-hidden="true"
        />
      </div>

      {/* Header */}
      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>
          Customer Reviews
          <span style={themeStyles.titleAccent} aria-hidden="true" />
        </h1>
        <p style={themeStyles.subtitle}>
          Join thousands of happy customers who love our 100% natural Ayurvedic
          powders.
        </p>
      </div>

      {/* Stats */}
      <div style={themeStyles.statsSection}>
        <div style={themeStyles.statCard} className="tm-stat-card">
          <div style={themeStyles.statCardAccent} />
          <div style={themeStyles.statNumber}>{stats.avg}</div>
          <div style={themeStyles.statRatingRow}>
            {renderStars(Math.round(parseFloat(stats.avg)), 12)}
          </div>
          <div style={themeStyles.statLabel}>Average Rating</div>
        </div>
        <div style={themeStyles.statCard} className="tm-stat-card">
          <div style={themeStyles.statCardAccent} />
          <div style={themeStyles.statNumber}>{stats.total}+</div>
          <div style={themeStyles.statLabel}>Verified Reviews</div>
        </div>
        <div style={themeStyles.statCard} className="tm-stat-card">
          <div style={themeStyles.statCardAccent} />
          <div style={themeStyles.statNumber}>98%</div>
          <div style={themeStyles.statLabel}>Would Recommend</div>
        </div>
        <div style={themeStyles.statCard} className="tm-stat-card">
          <div style={themeStyles.statCardAccent} />
          <div style={themeStyles.statNumber}>10k+</div>
          <div style={themeStyles.statLabel}>Happy Customers</div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div style={themeStyles.breakdown}>
        <div style={themeStyles.breakdownCard}>
          <div style={themeStyles.breakdownAccentBar} />
          {[
            { label: "5 Star", count: stats.five, key: 5 },
            { label: "4 Star", count: stats.four, key: 4 },
            { label: "3 Star", count: stats.three, key: 3 },
            { label: "2 Star", count: stats.two, key: 2 },
            { label: "1 Star", count: stats.one, key: 1 },
          ].map((row) => {
            const pct = stats.total ? (row.count / stats.total) * 100 : 0;
            return (
              <div key={row.key} style={themeStyles.breakdownRow}>
                <span style={themeStyles.breakdownLabel}>{row.label}</span>
                <div style={themeStyles.breakdownBarOuter}>
                  <div
                    style={{
                      ...themeStyles.breakdownBarInner,
                      width: `${pct}%`,
                    }}
                  />
                </div>
                <span style={themeStyles.breakdownCount}>{row.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Bar */}
      <div style={themeStyles.filterBar}>
        <div style={themeStyles.filterButtons}>
          {[
            { id: "all", label: "All Reviews" },
            { id: "5star", label: "5 Star" },
            { id: "4star", label: "4 Star" },
            { id: "3star", label: "3 Star" },
          ].map((f) => (
            <button
              key={f.id}
              style={{
                ...themeStyles.filterButton,
                ...(filter === f.id ? themeStyles.activeFilterButton : {}),
              }}
              className="tm-filter-btn"
              onClick={() => setFilter(f.id)}
              aria-label={`Filter by ${f.label}`}
              aria-pressed={filter === f.id}
              type="button"
            >
              {f.label}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              style={themeStyles.clearFiltersBtn}
              className="tm-clear-btn"
              onClick={clearFilters}
              aria-label="Clear all filters"
              type="button"
            >
              <FaTimes style={{ fontSize: "0.7rem" }} /> Clear
            </button>
          )}
        </div>

        <div style={themeStyles.searchBox}>
          <FaSearch color={T.textMuted} style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search reviews or products..."
            style={themeStyles.searchInput}
            className="tm-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search reviews"
          />
        </div>
      </div>

      {/* Reviews Grid */}
      <div style={themeStyles.grid}>
        {filteredTestimonials.length > 0 ? (
          filteredTestimonials.map((testimonial) => {
            const voted = hasVoted(testimonial.id);
            const totalHelpful = testimonial.helpful + (voted ? 1 : 0);
            return (
              <div
                key={testimonial.id}
                style={themeStyles.testimonialCard}
                className="tm-testimonial-card"
              >
                <FaQuoteRight
                  style={themeStyles.quoteMark}
                  className="tm-quote-mark"
                  aria-hidden="true"
                />
                <div style={themeStyles.cardHeader}>
                  <div style={themeStyles.userInfo}>
                    <div style={themeStyles.avatar}>
                      <FaUserCircle />
                    </div>
                    <div style={themeStyles.nameSection}>
                      <div style={themeStyles.name}>{testimonial.name}</div>
                      <div style={themeStyles.location}>
                        {testimonial.location}
                      </div>
                      {testimonial.verified && (
                        <div style={themeStyles.verifiedBadge}>
                          <FaCheckCircle size={10} /> Verified
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={themeStyles.rating}>
                    {renderStars(testimonial.rating, isMobile ? 12 : 13)}
                  </div>
                </div>

                <h3 style={themeStyles.reviewTitle}>{testimonial.title}</h3>
                <p style={themeStyles.reviewContent}>
                  {testimonial.content}
                </p>

                <Link
                  to={testimonial.productLink}
                  style={themeStyles.productLink}
                  className="tm-product-link"
                >
                  <FaShoppingBag size={11} /> {testimonial.productPurchased}
                </Link>

                <div style={themeStyles.cardFooter}>
                  <button
                    style={{
                      ...themeStyles.helpfulButton,
                      ...(voted ? themeStyles.helpfulButtonActive : {}),
                    }}
                    className="tm-helpful-btn"
                    onClick={() => handleHelpful(testimonial.id)}
                    disabled={voted}
                    aria-label="Mark review as helpful"
                    type="button"
                  >
                    <FaThumbsUp /> Helpful ({totalHelpful})
                  </button>
                  <div style={themeStyles.dateText}>
                    <FaRegClock /> {testimonial.date}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={themeStyles.emptyState}>
            <div style={themeStyles.emptyAccentBar} />
            <div style={themeStyles.emptyIconWrap}>
              <FaSearch />
            </div>
            <h3 style={themeStyles.emptyTitle}>No reviews found</h3>
            <p style={themeStyles.emptyText}>
              Try adjusting your search or filter criteria.
            </p>
            <button
              style={themeStyles.clearFiltersBtn}
              className="tm-clear-btn"
              onClick={clearFilters}
              type="button"
            >
              <FaTimes style={{ fontSize: "0.7rem" }} /> Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* CTA — redesigned, no more floating inline icon */}
      <div style={themeStyles.ctaWrapper}>
        <div style={themeStyles.ctaCard}>
          <div style={themeStyles.ctaAccentBar} />
          <div style={themeStyles.ctaIconWrap}>
            <FaPenNib />
          </div>
          <h3 style={themeStyles.ctaTitle}>Share Your Experience</h3>
          <p style={themeStyles.ctaText}>
            Love our natural products? Let us know! Your review helps others
            glow naturally.
          </p>
          <Link
            to="/contact"
            style={themeStyles.ctaButton}
            className="tm-cta-btn"
          >
            Write a Review
            <span style={themeStyles.ctaButtonIcon}>
              <FaHeart />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;