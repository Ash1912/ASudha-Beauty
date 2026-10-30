// src/pages/Cart.jsx
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useGiftCard } from "../context/GiftCardContext";
import SEO from "../components/SEO";
import {
  FaTrash,
  FaShoppingCart,
  FaArrowLeft,
  FaLeaf,
  FaTruck,
  FaHeart,
  FaShieldAlt,
  FaPlus,
  FaMinus,
  FaGift,
  FaArrowRight,
  FaSpa,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaHeadset,
  FaUndo,
  FaLock,
  FaBookOpen,
} from "react-icons/fa";

// ─── Site constants ───
const SITE_URL = "https://www.asudhabeauty.shop";

// ─── Brand palette (module scope: stable) ───
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
  danger: "#c62828",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

// ─── Authoritative external citations (trust + security signals) ───
const TRUSTED_SOURCES = [
  {
    label:
      "Reserve Bank of India — Safe Digital Payments & Consumer Protection",
    href: "https://www.rbi.org.in/",
    domain: "rbi.org.in",
  },
  {
    label:
      "Consumer Protection Act, 2019 — Department of Consumer Affairs",
    href: "https://consumeraffairs.nic.in/",
    domain: "consumeraffairs.nic.in",
  },
  {
    label: "National Consumer Helpline — Government of India",
    href: "https://consumerhelpline.gov.in/",
    domain: "consumerhelpline.gov.in",
  },
];

// ─── Internal policy links (contextual backlinks) ───
const POLICY_LINKS = [
  {
    to: "/returns",
    label: "Returns & Refunds",
    icon: <FaUndo />,
  },
  {
    to: "/shipping",
    label: "Shipping Policy",
    icon: <FaTruck />,
  },
  {
    to: "/contact",
    label: "Customer Support",
    icon: <FaHeadset />,
  },
  {
    to: "/faqs",
    label: "FAQs",
    icon: <FaBookOpen />,
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { getTotalGiftCardBalance } = useGiftCard();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    danger: "#ff8a80",
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
    danger: brandColors.danger,
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const isSmallMobile = windowWidth <= 360;
  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth <= 1024;
  const isNarrow = windowWidth <= 768;

  const subtotal = Number(getCartTotal()) || 0;
  const isFreeShipping = subtotal >= 500;
  const freeShippingThreshold = 500;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100
  );
  const gcBalance = Number(getTotalGiftCardBalance()) || 0;

  const hasNaturalItems = cartItems.some(
    (item) => item.category === "Skincare" || item.category === "Hair Care"
  );

  const totalItemCount = cartItems.reduce(
    (acc, item) => acc + (Number(item.quantity) || 0),
    0
  );

  const citations = useMemo(
    () => TRUSTED_SOURCES.map((s) => ({ label: s.label, href: s.href })),
    []
  );

  // ─── JSON-LD: WebPage (no breadcrumb per site pattern) ───
  const cartJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/cart#webpage`,
      url: `${SITE_URL}/cart`,
      name: "Your Cart | ASudha Beauty",
      description:
        "Review your 100% natural Ayurvedic skincare and hair care selection and proceed to secure checkout.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en-IN",
    }),
    []
  );

  // ─── Injected CSS — only depends on isDarkMode ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-cart-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-cart-styles", "true");
    style.textContent = `
      @keyframes cartFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(40px, -30px) scale(1.08); }
      }
      @keyframes cartFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-35px, 25px) scale(1.06); }
      }
      @keyframes cartFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(25px, 40px) scale(1.1); }
      }
      @keyframes cartShine {
        0% { transform: translateX(-120%) skewX(-20deg); }
        100% { transform: translateX(220%) skewX(-20deg); }
      }

      .cart-orb-1 { animation: cartFloat1 14s ease-in-out infinite; }
      .cart-orb-2 { animation: cartFloat2 18s ease-in-out infinite; }
      .cart-orb-3 { animation: cartFloat3 16s ease-in-out infinite; }

      .cart-empty-cta,
      .cart-checkout-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .cart-empty-cta:hover,
      .cart-checkout-btn:hover,
      .cart-empty-cta:focus-visible,
      .cart-checkout-btn:focus-visible {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
        outline: none;
      }
      .cart-checkout-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : "#ffffff"};
        outline-offset: 2px;
      }

      .cart-continue-link {
        transition: color 0.25s ease, gap 0.25s ease;
      }
      .cart-continue-link:hover,
      .cart-continue-link:focus-visible {
        color: ${brandColors.primary} !important;
        gap: 0.7rem;
        outline: none;
      }

      .cart-remove-btn {
        transition: all 0.25s ease;
      }
      .cart-remove-btn:hover,
      .cart-remove-btn:focus-visible {
        background: ${
          isDarkMode
            ? "rgba(255, 138, 128, 0.2)"
            : "rgba(198, 40, 40, 0.15)"
        } !important;
        transform: scale(1.1) rotate(-6deg);
        outline: none;
      }
      .cart-remove-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }

      .cart-qty-btn {
        transition: all 0.25s ease;
      }
      .cart-qty-btn:hover,
      .cart-qty-btn:focus-visible {
        transform: scale(1.12);
        box-shadow: 0 6px 18px rgba(245, 52, 107, 0.4);
        outline: none;
      }
      .cart-qty-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }
      .cart-qty-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .cart-item-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease,
                    border-color 0.3s ease;
      }
      .cart-item-card:hover {
        transform: translateY(-3px);
        box-shadow: ${
          isDarkMode
            ? "0 24px 50px rgba(0, 0, 0, 0.7)"
            : "0 24px 50px rgba(62, 39, 35, 0.12)"
        };
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.25)"
        } !important;
      }

      .cart-total-amount {
        position: relative;
        display: inline-block;
        overflow: hidden;
      }
      .cart-total-amount::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent,
          ${isDarkMode ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.6)"},
          transparent
        );
        transform: translateX(-120%) skewX(-20deg);
        animation: cartShine 4s ease-in-out infinite;
        pointer-events: none;
      }

      /* Policy / citation links */
      .cart-policy-link {
        transition: color 0.25s ease, border-color 0.25s ease;
      }
      .cart-policy-link:hover,
      .cart-policy-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        outline: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .cart-orb-1, .cart-orb-2, .cart-orb-3 { animation: none !important; }
        .cart-total-amount::after { animation: none !important; }
        .cart-empty-cta, .cart-checkout-btn, .cart-continue-link,
        .cart-remove-btn, .cart-qty-btn, .cart-item-card,
        .cart-policy-link {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-cart-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  const themeStyles = {
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
        ? "radial-gradient(circle at 20% 0%, rgba(245, 52, 107, 0.14) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 45%), radial-gradient(circle at 50% 100%, rgba(76, 175, 80, 0.08) 0%, transparent 50%)"
        : "radial-gradient(circle at 20% 0%, rgba(245, 52, 107, 0.08) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 45%), radial-gradient(circle at 50% 100%, rgba(76, 175, 80, 0.06) 0%, transparent 50%)",
    },
    bgGrid: {
      position: "absolute",
      inset: 0,
      backgroundImage: isDarkMode
        ? "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)"
        : "linear-gradient(rgba(62,39,35,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(62,39,35,0.035) 1px, transparent 1px)",
      backgroundSize: "42px 42px",
      maskImage:
        "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)",
      WebkitMaskImage:
        "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)",
    },
    bgOrb1: {
      position: "absolute",
      top: "-140px",
      left: "-140px",
      width: "480px",
      height: "480px",
      maxWidth: "65vw",
      maxHeight: "65vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(245, 52, 107, 0.35) 0%, transparent 70%)",
      filter: "blur(90px)",
      opacity: isDarkMode ? 0.4 : 0.3,
    },
    bgOrb2: {
      position: "absolute",
      top: "35%",
      right: "-160px",
      width: "500px",
      height: "500px",
      maxWidth: "65vw",
      maxHeight: "65vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(212, 175, 55, 0.35) 0%, transparent 70%)",
      filter: "blur(90px)",
      opacity: isDarkMode ? 0.4 : 0.3,
    },
    bgOrb3: {
      position: "absolute",
      bottom: "-160px",
      left: "30%",
      width: "440px",
      height: "440px",
      maxWidth: "60vw",
      maxHeight: "60vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.32) 0%, transparent 70%)",
      filter: "blur(90px)",
      opacity: isDarkMode ? 0.35 : 0.25,
    },

    content: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isSmallMobile
        ? "1.25rem 0.75rem 2.5rem"
        : isMobile
        ? "1.5rem 1rem 3rem"
        : isNarrow
        ? "2rem 1.25rem 4rem"
        : "2.5rem 1.5rem 5rem",
      width: "100%",
      boxSizing: "border-box",
    },

    title: {
      fontSize: isSmallMobile
        ? "1.35rem"
        : isMobile
        ? "1.6rem"
        : isNarrow
        ? "1.9rem"
        : "2.2rem",
      marginBottom: isMobile ? "1.5rem" : "2.25rem",
      color: T.text,
      fontWeight: "900",
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "0.5rem" : "0.85rem",
      flexWrap: "wrap",
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
    },
    titleIcon: {
      color: isDarkMode ? T.gold : brandColors.primary,
      fontSize: isSmallMobile ? "1.15rem" : isMobile ? "1.35rem" : "1.6rem",
      flexShrink: 0,
    },
    titleCount: {
      fontSize: isSmallMobile ? "0.7rem" : "0.82rem",
      fontWeight: "700",
      color: T.textMuted,
      backgroundColor: T.card,
      padding: "0.35rem 0.85rem",
      borderRadius: "50px",
      whiteSpace: "nowrap",
      flexShrink: 0,
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
    },

    emptyCart: {
      textAlign: "center",
      padding: isMobile ? "2.5rem 1rem" : "4.5rem 2rem",
      maxWidth: "620px",
      margin: "0 auto",
      width: "100%",
      boxSizing: "border-box",
      backgroundColor: T.card,
      borderRadius: "28px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      position: "relative",
      overflow: "hidden",
    },
    emptyCartAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
    },
    emptyIconWrap: {
      width: "96px",
      height: "96px",
      margin: "0 auto 1.5rem",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 14px 36px rgba(245, 52, 107, 0.35)",
    },
    emptyIcon: {
      fontSize: isMobile ? "2.25rem" : "2.75rem",
      color: isDarkMode ? brandColors.black : "#ffffff",
    },
    emptyTitle: {
      fontSize: isMobile ? "1.4rem" : "1.6rem",
      color: T.text,
      marginBottom: "0.85rem",
      fontWeight: "900",
      letterSpacing: "-0.3px",
    },
    emptyText: {
      color: T.textMuted,
      marginBottom: "2rem",
      lineHeight: "1.7",
      fontSize: isMobile ? "0.9rem" : "1rem",
      maxWidth: "440px",
      margin: "0 auto 2rem",
    },
    emptyFeatures: {
      display: "flex",
      justifyContent: "center",
      gap: isMobile ? "1rem" : "2rem",
      flexWrap: "wrap",
      marginBottom: "2.25rem",
    },
    emptyFeature: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.4rem",
      color: T.textMuted,
      fontSize: isMobile ? "0.72rem" : "0.82rem",
      fontWeight: "700",
    },
    emptyFeatureIconWrap: {
      width: "46px",
      height: "46px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.14)"
        : "rgba(212, 175, 55, 0.1)",
      color: isDarkMode ? T.gold : brandColors.bronze,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.05rem",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.22)"
        : "1px solid rgba(212, 175, 55, 0.16)",
    },
    shopButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.55rem",
      padding: isSmallMobile
        ? "0.85rem 1.6rem"
        : isMobile
        ? "0.9rem 2.1rem"
        : "1rem 2.6rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.92rem" : "1rem",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      maxWidth: "100%",
      boxSizing: "border-box",
      border: "none",
      cursor: "pointer",
      letterSpacing: "0.3px",
    },

    cartGrid: {
      display: "grid",
      gridTemplateColumns: isTablet
        ? "minmax(0, 1fr)"
        : "minmax(0, 2fr) minmax(0, 1fr)",
      gap: isMobile ? "1.25rem" : "2rem",
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      minWidth: 0,
      alignItems: "start",
    },
    cartItems: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "1rem" : "1.25rem",
      minWidth: 0,
      width: "100%",
    },
    cartItem: {
      display: "grid",
      gridTemplateColumns: isTablet
        ? "76px minmax(0, 1fr)"
        : "120px minmax(0, 1fr) auto",
      gridTemplateRows: isTablet ? "auto auto" : "auto",
      gap: isMobile ? "1rem" : "1.5rem",
      padding: isMobile ? "1.15rem" : "1.5rem",
      backgroundColor: T.card,
      borderRadius: "22px",
      boxShadow: T.shadow,
      border: `1px solid ${T.border}`,
      transition: "all 0.3s ease",
      position: "relative",
      alignItems: "center",
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      boxSizing: "border-box",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
    },
    naturalBadge: {
      position: "absolute",
      top: isSmallMobile ? "0.55rem" : "0.85rem",
      right: isSmallMobile ? "0.55rem" : "0.9rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.2)"
        : "rgba(76, 175, 80, 0.12)",
      color: brandColors.green,
      padding: "0.22rem 0.6rem",
      borderRadius: "50px",
      fontSize: isSmallMobile ? "0.55rem" : "0.65rem",
      fontWeight: "800",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.25rem",
      zIndex: 2,
      whiteSpace: "nowrap",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.35)" : "rgba(76, 175, 80, 0.22)"
      }`,
    },
    itemImage: {
      width: isSmallMobile ? "64px" : isMobile ? "76px" : "120px",
      height: isSmallMobile ? "64px" : isMobile ? "76px" : "120px",
      objectFit: "cover",
      borderRadius: "16px",
      backgroundColor: isDarkMode ? brandColors.black : "#f5f0eb",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
      flexShrink: 0,
      display: "block",
      border: `1px solid ${T.borderSoft}`,
    },
    itemDetails: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minWidth: 0,
    },
    itemName: {
      fontSize: isSmallMobile ? "0.88rem" : isMobile ? "0.98rem" : "1.15rem",
      fontWeight: "800",
      marginBottom: "0.35rem",
      color: T.text,
      lineHeight: 1.35,
      wordBreak: "break-word",
      overflowWrap: "break-word",
      letterSpacing: "-0.2px",
    },
    itemShade: {
      fontSize: isSmallMobile ? "0.72rem" : "0.82rem",
      color: T.textMuted,
      marginBottom: "0.3rem",
      fontWeight: "600",
    },
    itemPrice: {
      fontSize: isSmallMobile ? "0.95rem" : isMobile ? "1.05rem" : "1.2rem",
      fontWeight: "900",
      color: isDarkMode ? T.gold : brandColors.bronze,
      marginTop: "0.15rem",
    },
    itemActions: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "0.75rem" : "1rem",
      gridColumn: isTablet ? "1 / -1" : "auto",
      justifyContent: isTablet ? "space-between" : "flex-end",
      flexWrap: "wrap",
      marginTop: isTablet ? "0.5rem" : "0",
      width: isTablet ? "100%" : "auto",
      minWidth: 0,
      boxSizing: "border-box",
    },
    quantityControl: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      padding: "0.25rem",
      borderRadius: "50px",
      border: `1px solid ${T.border}`,
      flexShrink: 0,
    },
    quantityButton: {
      width: isSmallMobile ? "30px" : "34px",
      height: isSmallMobile ? "30px" : "34px",
      border: "none",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      borderRadius: "50%",
      color: isDarkMode ? brandColors.black : "#ffffff",
      cursor: "pointer",
      fontSize: isSmallMobile ? "0.7rem" : "0.8rem",
      fontWeight: "800",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 3px 10px rgba(245, 52, 107, 0.28)",
      flexShrink: 0,
    },
    quantityValue: {
      minWidth: isSmallMobile ? "26px" : "34px",
      textAlign: "center",
      fontWeight: "900",
      color: T.text,
      fontSize: isSmallMobile ? "0.85rem" : "1rem",
    },
    removeButton: {
      padding: "0.5rem",
      border: "none",
      backgroundColor: isDarkMode
        ? "rgba(255, 138, 128, 0.12)"
        : "rgba(198, 40, 40, 0.08)",
      color: T.danger,
      cursor: "pointer",
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      borderRadius: "50%",
      width: isSmallMobile ? "34px" : "38px",
      height: isSmallMobile ? "34px" : "38px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },

    summary: {
      padding: isMobile ? "1.5rem 1.25rem" : "2rem 1.75rem",
      backgroundColor: T.card,
      borderRadius: "22px",
      height: "fit-content",
      boxShadow: T.shadowLift,
      border: `1px solid ${T.border}`,
      position: isTablet ? "relative" : "sticky",
      top: isTablet ? "auto" : "2rem",
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box",
      minWidth: 0,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    summaryAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      borderTopLeftRadius: "22px",
      borderTopRightRadius: "22px",
    },
    summaryTitle: {
      fontSize: isSmallMobile ? "1.15rem" : isMobile ? "1.25rem" : "1.35rem",
      fontWeight: "900",
      marginBottom: "1.35rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.55rem",
      letterSpacing: "-0.3px",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      gap: "0.5rem",
      padding: "0.55rem 0",
      color: T.textMuted,
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      flexWrap: "wrap",
      fontWeight: "600",
    },
    totalRow: {
      borderTop: `1px solid ${T.divider}`,
      marginTop: "0.85rem",
      paddingTop: "1.1rem",
      fontWeight: "800",
      color: T.text,
      fontSize: isMobile ? "1rem" : "1.15rem",
    },
    totalAmount: {
      color: isDarkMode ? T.gold : brandColors.primary,
      fontWeight: "900",
    },

    progressBarOuter: {
      height: "10px",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(62, 39, 35, 0.08)",
      borderRadius: "10px",
      overflow: "hidden",
      marginTop: "0.65rem",
      marginBottom: "0.7rem",
      position: "relative",
    },
    progressBarInner: {
      height: "100%",
      background: isFreeShipping
        ? `linear-gradient(90deg, ${brandColors.green}, #8bc34a)`
        : `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      borderRadius: "10px",
      transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      width: `${progressPercent}%`,
      boxShadow: isFreeShipping
        ? "0 0 12px rgba(76, 175, 80, 0.5)"
        : "0 0 12px rgba(245, 52, 107, 0.5)",
    },
    freeShippingNote: {
      marginTop: "0.85rem",
      padding: isMobile ? "0.7rem 0.85rem" : "0.8rem 1.1rem",
      backgroundColor: isFreeShipping
        ? isDarkMode
          ? "rgba(76, 175, 80, 0.14)"
          : "rgba(76, 175, 80, 0.08)"
        : isDarkMode
        ? "rgba(212, 175, 55, 0.1)"
        : "rgba(212, 175, 55, 0.06)",
      borderRadius: "14px",
      fontSize: isMobile ? "0.78rem" : "0.85rem",
      color: isFreeShipping ? brandColors.green : T.textMuted,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      justifyContent: "center",
      flexWrap: "wrap",
      textAlign: "center",
      fontWeight: "700",
      border: `1px solid ${
        isFreeShipping
          ? isDarkMode
            ? "rgba(76, 175, 80, 0.25)"
            : "rgba(76, 175, 80, 0.18)"
          : isDarkMode
          ? "rgba(212, 175, 55, 0.22)"
          : "rgba(212, 175, 55, 0.16)"
      }`,
    },

    giftCardHint: {
      marginTop: "0.85rem",
      padding: isMobile ? "0.7rem 0.85rem" : "0.8rem 1.1rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.12)"
        : "rgba(245, 52, 107, 0.06)",
      borderRadius: "14px",
      fontSize: isMobile ? "0.78rem" : "0.85rem",
      color: isDarkMode ? T.gold : brandColors.primary,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
      flexWrap: "wrap",
      fontWeight: "700",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.22)" : "rgba(245, 52, 107, 0.16)"
      }`,
    },

    checkoutButton: {
      width: "100%",
      padding: isMobile ? "0.95rem" : "1.05rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      fontWeight: "800",
      cursor: "pointer",
      marginTop: "1.35rem",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.55rem",
      boxSizing: "border-box",
      fontFamily: "inherit",
      letterSpacing: "0.3px",
    },
    continueLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "1.1rem",
      color: T.textMuted,
      textDecoration: "none",
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      transition: "all 0.3s ease",
      textAlign: "center",
      fontWeight: "700",
    },
    trustBadges: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "1.35rem",
      paddingTop: "1.35rem",
      borderTop: `1px solid ${T.divider}`,
      flexWrap: "wrap",
      gap: "0.85rem",
    },
    trustBadge: {
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
      fontSize: isSmallMobile ? "0.65rem" : "0.72rem",
      color: T.textMuted,
      whiteSpace: "nowrap",
      fontWeight: "700",
    },
    trustBadgeIcon: {
      color: isDarkMode ? T.gold : brandColors.primary,
      fontSize: "0.85rem",
      flexShrink: 0,
    },

    // ─── Trust & Policy section (below cart) ───
    trustSection: {
      marginTop: "2.5rem",
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
    trustTitle: {
      fontSize: "0.9rem",
      fontWeight: "800",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    policyGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: "0.65rem",
      marginBottom: "1.25rem",
    },
    policyLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: "0.6rem 0.85rem",
      borderRadius: "10px",
      fontSize: "0.82rem",
      fontWeight: "700",
      color: T.textMuted,
      textDecoration: "none",
      border: `1px solid ${T.borderSoft}`,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.02)"
        : "rgba(62, 39, 35, 0.02)",
      transition: "color 0.25s ease, border-color 0.25s ease",
    },
    policyIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
      fontSize: "0.8rem",
    },
    citationList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    citationLink: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.5rem",
      fontSize: "0.8rem",
      fontWeight: "600",
      color: T.textMuted,
      textDecoration: "none",
      lineHeight: 1.5,
    },
    citationDomain: {
      fontSize: "0.68rem",
      color: T.textDim,
      marginTop: "0.1rem",
    },
  };

  // ─── Shared background JSX (inline, not a component — avoids remounts) ───
  const backgroundJSX = (
    <div style={themeStyles.bgLayer} aria-hidden="true">
      <div style={themeStyles.bgGradient} />
      <div style={themeStyles.bgGrid} />
      <div className="cart-orb-1" style={themeStyles.bgOrb1} />
      <div className="cart-orb-2" style={themeStyles.bgOrb2} />
      <div className="cart-orb-3" style={themeStyles.bgOrb3} />
    </div>
  );

  // ─── Trust + citations section ───
  const trustSectionJSX = (
    <section style={themeStyles.trustSection} aria-labelledby="cart-trust-title">
      <h2 id="cart-trust-title" style={themeStyles.trustTitle}>
        <FaShieldAlt aria-hidden="true" /> Your Purchase Is Protected
      </h2>
      <div style={themeStyles.policyGrid}>
        {POLICY_LINKS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={themeStyles.policyLink}
            className="cart-policy-link"
            aria-label={item.label}
          >
            <span style={themeStyles.policyIcon} aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </div>
      <ul style={themeStyles.citationList}>
        {TRUSTED_SOURCES.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.citationLink}
              className="cart-policy-link"
              aria-label={`${source.label} — opens in new tab`}
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
                <div style={themeStyles.citationDomain}>
                  {source.domain}
                </div>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );

  // ─── EMPTY CART ───
  if (cartItems.length === 0) {
    return (
      <div style={themeStyles.container}>
        <SEO
          title="Your Cart | ASudha Beauty"
          description="Your cart is empty. Explore ASudha Beauty's 100% natural Ayurvedic skincare and hair care products."
          url="/cart"
          citations={citations}
          noindex
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cartJsonLd) }}
        />

        {backgroundJSX}

        <main style={themeStyles.content}>
          <div style={themeStyles.emptyCart}>
            <div style={themeStyles.emptyCartAccent} aria-hidden="true" />
            <div style={themeStyles.emptyIconWrap} aria-hidden="true">
              <FaShoppingCart style={themeStyles.emptyIcon} />
            </div>
            <h1 style={themeStyles.emptyTitle}>Your Cart is Empty</h1>
            <p style={themeStyles.emptyText}>
              Looks like you haven&apos;t added any natural Ayurvedic products
              yet. Explore our 100% herbal powders for glowing skin and healthy
              hair.
            </p>

            <div style={themeStyles.emptyFeatures}>
              <div style={themeStyles.emptyFeature}>
                <span
                  style={themeStyles.emptyFeatureIconWrap}
                  aria-hidden="true"
                >
                  <FaLeaf />
                </span>
                <span>100% Natural</span>
              </div>
              <div style={themeStyles.emptyFeature}>
                <span
                  style={themeStyles.emptyFeatureIconWrap}
                  aria-hidden="true"
                >
                  <FaShieldAlt />
                </span>
                <span>Chemical Free</span>
              </div>
              <div style={themeStyles.emptyFeature}>
                <span
                  style={themeStyles.emptyFeatureIconWrap}
                  aria-hidden="true"
                >
                  <FaTruck />
                </span>
                <span>Free Shipping ₹500+</span>
              </div>
              <div style={themeStyles.emptyFeature}>
                <span
                  style={themeStyles.emptyFeatureIconWrap}
                  aria-hidden="true"
                >
                  <FaHeart />
                </span>
                <span>Cruelty Free</span>
              </div>
            </div>

            <Link
              to="/shop"
              style={themeStyles.shopButton}
              className="cart-empty-cta"
            >
              <FaLeaf aria-hidden="true" /> Discover Our Herbal Powders
            </Link>
          </div>

          {trustSectionJSX}
        </main>
      </div>
    );
  }

  // ─── CART WITH ITEMS ───
  return (
    <div style={themeStyles.container}>
      <SEO
        title={`Your Cart (${cartItems.length} item${
          cartItems.length !== 1 ? "s" : ""
        }) | ASudha Beauty`}
        description="Review your natural Ayurvedic skincare selection and proceed to secure checkout."
        url="/cart"
        citations={citations}
        noindex
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cartJsonLd) }}
      />

      {backgroundJSX}

      <main style={themeStyles.content}>
        <h1 style={themeStyles.title}>
          <FaShoppingCart
            aria-hidden="true"
            style={themeStyles.titleIcon}
          />
          Your Shopping Cart
          <span style={themeStyles.titleCount}>
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </span>
        </h1>

        <div style={themeStyles.cartGrid}>
          <div style={themeStyles.cartItems}>
            {cartItems.map((item) => {
              const isNatural =
                item.category === "Skincare" || item.category === "Hair Care";
              return (
                <article
                  key={`${item.id}-${item.selectedShade || "default"}`}
                  style={themeStyles.cartItem}
                  className="cart-item-card"
                  aria-label={`${item.name}${item.selectedShade ? ` — ${item.selectedShade}` : ""} in your cart`}
                >
                  {isNatural && (
                    <span style={themeStyles.naturalBadge}>
                      <FaLeaf aria-hidden="true" style={{ fontSize: "0.55rem" }} />{" "}
                      Natural
                    </span>
                  )}

                  <img
                    src={item.image}
                    alt={`${item.name}${
                      item.selectedShade ? ` — ${item.selectedShade}` : ""
                    } — ${item.category || "Ayurvedic"} by ASudha Beauty`}
                    style={themeStyles.itemImage}
                    loading="lazy"
                    decoding="async"
                  />

                  <div style={themeStyles.itemDetails}>
                    <h2 style={themeStyles.itemName}>{item.name}</h2>
                    {item.selectedShade && (
                      <p style={themeStyles.itemShade}>
                        Variant: {item.selectedShade}
                      </p>
                    )}
                    <p style={themeStyles.itemPrice}>
                      ₹{Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  <div style={themeStyles.itemActions}>
                    <div
                      style={themeStyles.quantityControl}
                      role="group"
                      aria-label={`Quantity controls for ${item.name}`}
                    >
                      <button
                        type="button"
                        style={themeStyles.quantityButton}
                        className="cart-qty-btn"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedShade,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <FaMinus aria-hidden="true" style={{ fontSize: "0.7rem" }} />
                      </button>
                      <span
                        style={themeStyles.quantityValue}
                        aria-live="polite"
                        aria-atomic="true"
                        aria-label={`Quantity: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        style={themeStyles.quantityButton}
                        className="cart-qty-btn"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedShade,
                            item.quantity + 1
                          )
                        }
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <FaPlus aria-hidden="true" style={{ fontSize: "0.7rem" }} />
                      </button>
                    </div>

                    <button
                      type="button"
                      style={themeStyles.removeButton}
                      className="cart-remove-btn"
                      onClick={() =>
                        removeFromCart(item.id, item.selectedShade)
                      }
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FaTrash aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <aside
            style={themeStyles.summary}
            aria-labelledby="order-summary-title"
          >
            <div style={themeStyles.summaryAccent} aria-hidden="true" />
            <h2 id="order-summary-title" style={themeStyles.summaryTitle}>
              <FaSpa
                aria-hidden="true"
                style={{
                  fontSize: "1rem",
                  color: isDarkMode ? T.gold : brandColors.bronze,
                }}
              />
              Order Summary
            </h2>

            <div style={themeStyles.summaryRow}>
              <span>
                Subtotal ({totalItemCount} item
                {totalItemCount !== 1 ? "s" : ""})
              </span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div style={themeStyles.summaryRow}>
              <span>Shipping</span>
              <span>
                {isFreeShipping ? (
                  <span
                    style={{ color: brandColors.green, fontWeight: "800" }}
                  >
                    Free
                  </span>
                ) : (
                  "Calculated at checkout"
                )}
              </span>
            </div>

            {hasNaturalItems && (
              <div style={themeStyles.summaryRow}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <FaLeaf
                    aria-hidden="true"
                    style={{ color: brandColors.green, fontSize: "0.75rem" }}
                  />
                  Natural Products
                </span>
                <span style={{ color: brandColors.green, fontWeight: "800" }}>
                  <FaCheckCircle aria-hidden="true" />
                </span>
              </div>
            )}

            {gcBalance > 0 && (
              <div style={themeStyles.summaryRow}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: isDarkMode ? T.gold : brandColors.primary,
                    fontWeight: "800",
                  }}
                >
                  <FaGift aria-hidden="true" /> Gift Card Balance
                </span>
                <span
                  style={{
                    color: isDarkMode ? T.gold : brandColors.primary,
                    fontWeight: "800",
                  }}
                >
                  ₹{gcBalance.toFixed(2)}
                </span>
              </div>
            )}

            <div style={{ ...themeStyles.summaryRow, ...themeStyles.totalRow }}>
              <span>Total (before gift card)</span>
              <span
                style={themeStyles.totalAmount}
                className="cart-total-amount"
              >
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            {!isFreeShipping && subtotal > 0 && (
              <>
                <div
                  style={themeStyles.progressBarOuter}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={freeShippingThreshold}
                  aria-valuenow={Math.min(subtotal, freeShippingThreshold)}
                  aria-label="Progress toward free shipping"
                >
                  <div style={themeStyles.progressBarInner} />
                </div>
                <div style={themeStyles.freeShippingNote}>
                  <FaTruck aria-hidden="true" /> Add ₹
                  {remaining.toFixed(2)} more for free shipping!
                </div>
              </>
            )}

            {isFreeShipping && subtotal > 0 && (
              <div style={themeStyles.freeShippingNote}>
                <FaCheckCircle aria-hidden="true" /> You qualify for free
                shipping!
              </div>
            )}

            {gcBalance > 0 && (
              <div style={themeStyles.giftCardHint}>
                <span>
                  <FaGift
                    aria-hidden="true"
                    style={{ marginRight: "0.35rem" }}
                  />
                  Gift card ready to apply at checkout
                </span>
              </div>
            )}

            <button
              type="button"
              style={themeStyles.checkoutButton}
              className="cart-checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              <FaLock aria-hidden="true" /> Proceed to Secure Checkout{" "}
              <FaArrowRight aria-hidden="true" />
            </button>

            <Link
              to="/shop"
              style={themeStyles.continueLink}
              className="cart-continue-link"
            >
              <FaArrowLeft aria-hidden="true" /> Continue Shopping
            </Link>

            <div style={themeStyles.trustBadges}>
              <span style={themeStyles.trustBadge}>
                <FaLock aria-hidden="true" style={themeStyles.trustBadgeIcon} />{" "}
                Secure Checkout
              </span>
              <span style={themeStyles.trustBadge}>
                <FaLeaf aria-hidden="true" style={themeStyles.trustBadgeIcon} />{" "}
                100% Natural
              </span>
              <span style={themeStyles.trustBadge}>
                <FaHeart
                  aria-hidden="true"
                  style={themeStyles.trustBadgeIcon}
                />{" "}
                Cruelty Free
              </span>
            </div>
          </aside>
        </div>

        {trustSectionJSX}
      </main>
    </div>
  );
};

export default Cart;