// src/pages/ShippingInfo.js
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import SEO from "../components/SEO";
import {
  FaTruck,
  FaClock,
  FaMapMarkerAlt,
  FaBox,
  FaCheckCircle,
  FaShippingFast,
  FaGlobe,
  FaQuestionCircle,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaLeaf,
  FaHeadset,
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
  earthDark: "#3e2723",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
  info: "#2196f3",
  warn: "#ff9800",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const ShippingInfo = () => {
  const { isDarkMode } = useTheme();
  const { getCartTotal, getCartCount } = useCart();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [openFaq, setOpenFaq] = useState(null);

  // ✅ Real cart total
  const cartTotal = getCartTotal();
  const cartCount = getCartCount();
  const freeShippingThreshold = 500;

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
    heading: brandColors.gold,
    info: "#64b5f6",
    warn: "#ffb74d",
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
    heading: brandColors.bronze,
    info: brandColors.info,
    warn: brandColors.warn,
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  const shippingMethods = [
    {
      name: "Standard Shipping",
      icon: <FaTruck />,
      cost: "Free on orders ₹500+",
      deliveryTime: "5-7 business days",
      details: "Reliable delivery with tracking",
    },
    {
      name: "Express Shipping",
      icon: <FaShippingFast />,
      cost: "₹99",
      deliveryTime: "2-3 business days",
      details: "Priority handling and faster delivery",
    },
    {
      name: "Same Day Delivery",
      icon: <FaClock />,
      cost: "₹199",
      deliveryTime: "Same day (select cities)",
      details: "Order before 12 PM for same day delivery",
    },
  ];

  const faqs = [
    {
      q: "Can I change my shipping address after placing an order?",
      a: "Please contact us within 2 hours of placing your order. After that, we cannot guarantee address changes as orders are processed quickly.",
    },
    {
      q: "How can I track my order?",
      a: "Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order on our website.",
    },
    {
      q: "What if my package is delayed?",
      a: "While we strive for on-time delivery, sometimes delays occur due to weather, holidays, or carrier issues. If your package is significantly delayed, please contact our support team.",
    },
    {
      q: "Do you offer cash on delivery?",
      a: "Yes, COD is available for orders up to ₹5,000. A small convenience fee may apply.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const responsive = {
    containerPadding: isMobile ? "1rem" : isNarrow ? "1.5rem" : "2rem",
    fontSizeHeading: isMobile ? "1.9rem" : isNarrow ? "2.4rem" : "3rem",
    gridColumns: isMobile
      ? "minmax(0, 1fr)"
      : isNarrow
      ? "repeat(2, minmax(0, 1fr))"
      : "repeat(3, minmax(0, 1fr))",
  };

  const progressPercent = Math.min(
    (cartTotal / freeShippingThreshold) * 100,
    100
  );
  const remaining = Math.max(0, freeShippingThreshold - cartTotal);
  const qualified = cartTotal >= freeShippingThreshold;

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-shipping-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-shipping-styles", "true");
    style.textContent = `
      @keyframes shipFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes shipFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes shipFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }

      .ship-orb-1 { animation: shipFloat1 16s ease-in-out infinite; }
      .ship-orb-2 { animation: shipFloat2 20s ease-in-out infinite; }
      .ship-orb-3 { animation: shipFloat3 18s ease-in-out infinite; }

      .si-shipping-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s ease, border-color 0.3s ease;
      }
      .si-shipping-card:hover {
        transform: translateY(-8px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.3)"
        } !important;
      }
      .si-shipping-card:hover .si-shipping-icon {
        transform: scale(1.08) rotate(-6deg);
        box-shadow: 0 14px 34px rgba(245, 52, 107, 0.45);
      }
      .si-shipping-icon {
        transition: transform 0.4s ease, box-shadow 0.35s ease;
      }

      .si-info-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .si-info-card:hover {
        transform: translateY(-3px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.35)"
            : "rgba(199, 125, 66, 0.25)"
        } !important;
      }

      .si-faq-toggle {
        transition: all 0.25s ease;
      }
      .si-faq-toggle:hover .si-faq-q {
        color: ${brandColors.primary} !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-shipping-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const themeStyles = {
    // ─── Page wrapper — no inner scroll ───
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
        ? "radial-gradient(circle at 15% 8%, rgba(245, 52, 107, 0.14) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.11) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(76, 175, 80, 0.09) 0%, transparent 50%)"
        : "radial-gradient(circle at 15% 8%, rgba(245, 52, 107, 0.08) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(76, 175, 80, 0.06) 0%, transparent 50%)",
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
      width: "480px",
      height: "480px",
      maxWidth: "65vw",
      maxHeight: "65vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(245, 52, 107, 0.36) 0%, transparent 70%)",
      filter: "blur(95px)",
      opacity: isDarkMode ? 0.4 : 0.3,
    },
    bgOrb2: {
      position: "absolute",
      top: "35%",
      right: "-170px",
      width: "500px",
      height: "500px",
      maxWidth: "65vw",
      maxHeight: "65vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(212, 175, 55, 0.36) 0%, transparent 70%)",
      filter: "blur(95px)",
      opacity: isDarkMode ? 0.4 : 0.3,
    },
    bgOrb3: {
      position: "absolute",
      bottom: "-170px",
      left: "25%",
      width: "440px",
      height: "440px",
      maxWidth: "60vw",
      maxHeight: "60vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.32) 0%, transparent 70%)",
      filter: "blur(95px)",
      opacity: isDarkMode ? 0.36 : 0.26,
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
    headerBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.45rem 1.15rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.14)"
        : "rgba(212, 175, 55, 0.1)",
      borderRadius: "50px",
      fontSize: "0.72rem",
      fontWeight: "800",
      color: isDarkMode ? T.heading : brandColors.bronze,
      marginBottom: "1.25rem",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.3)" : "rgba(199, 125, 66, 0.2)"
      }`,
      letterSpacing: "1px",
      textTransform: "uppercase",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },
    // ✅ Solid title + gradient underline — no gradient-clipped text
    title: {
      fontSize: responsive.fontSizeHeading,
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
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      flexWrap: "wrap",
    },

    // ─── Content section ───
    section: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1100px",
      margin: "0 auto",
      padding: isMobile
        ? "0 1rem 3rem"
        : isNarrow
        ? "0 1.5rem 3.5rem"
        : "0 2rem 5rem",
      boxSizing: "border-box",
      width: "100%",
    },

    // ─── Free shipping progress ───
    progressContainer: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.5rem 1.25rem" : "1.75rem 1.6rem",
      marginBottom: "2.25rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    progressAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    progressTitle: {
      fontSize: isMobile ? "1rem" : "1.1rem",
      fontWeight: "800",
      marginBottom: "0.9rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.55rem",
      flexWrap: "wrap",
      letterSpacing: "-0.2px",
    },
    progressBarOuter: {
      height: "10px",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(62, 39, 35, 0.08)",
      borderRadius: "10px",
      overflow: "hidden",
      position: "relative",
    },
    progressBarInner: {
      height: "100%",
      background: qualified
        ? `linear-gradient(90deg, ${brandColors.green}, #8bc34a)`
        : `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      borderRadius: "10px",
      transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      width: `${progressPercent}%`,
      boxShadow: qualified
        ? "0 0 12px rgba(76, 175, 80, 0.5)"
        : "0 0 12px rgba(245, 52, 107, 0.5)",
    },
    progressText: {
      marginTop: "0.85rem",
      fontSize: "0.9rem",
      fontWeight: "700",
      color: qualified ? T.green : T.textMuted,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "0.5rem",
    },

    // ─── Shipping method cards ───
    sectionTitle: {
      fontSize: isMobile ? "1.15rem" : "1.35rem",
      fontWeight: "900",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      color: T.text,
      flexWrap: "wrap",
      letterSpacing: "-0.3px",
    },
    sectionTitleIconWrap: {
      width: "42px",
      height: "42px",
      borderRadius: "12px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      boxShadow: "0 8px 20px rgba(245, 52, 107, 0.3)",
      flexShrink: 0,
    },
    shippingGrid: {
      display: "grid",
      gridTemplateColumns: responsive.gridColumns,
      gap: isMobile ? "1.25rem" : "1.5rem",
      marginBottom: "2.5rem",
    },
    shippingCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.75rem 1.35rem" : "2rem 1.6rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
    },
    shippingCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.85,
    },
    shippingIconWrapper: {
      width: "76px",
      height: "76px",
      margin: "0 auto 1.35rem",
      borderRadius: "22px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.9rem",
      boxShadow: "0 12px 32px rgba(245,52,107,0.35)",
      flexShrink: 0,
    },
    shippingName: {
      fontSize: "1.15rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.2px",
    },
    shippingCost: {
      fontSize: "1.05rem",
      fontWeight: "800",
      marginBottom: "0.45rem",
      color: isDarkMode ? T.gold : brandColors.primary,
    },
    shippingTime: {
      fontSize: "0.9rem",
      marginBottom: "0.7rem",
      color: T.textMuted,
      fontWeight: "600",
    },
    shippingDetails: {
      fontSize: "0.85rem",
      color: T.textMuted,
      lineHeight: "1.6",
      margin: 0,
    },

    // ─── Info cards ───
    infoCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.6rem 1.35rem" : "2rem 1.75rem",
      marginBottom: "1.5rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      width: "100%",
      position: "relative",
      overflow: "hidden",
    },
    infoCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.85,
    },
    infoTitle: {
      fontSize: isMobile ? "1.15rem" : "1.3rem",
      fontWeight: "900",
      marginBottom: "1.35rem",
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      color: T.text,
      flexWrap: "wrap",
      letterSpacing: "-0.3px",
    },
    infoTitleIconWrap: {
      width: "38px",
      height: "38px",
      borderRadius: "11px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.95rem",
      boxShadow: "0 6px 18px rgba(245, 52, 107, 0.28)",
      flexShrink: 0,
    },
    listItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.85rem",
      marginBottom: "1rem",
      fontSize: isMobile ? "0.9rem" : "0.96rem",
      color: T.textMuted,
      lineHeight: "1.65",
      padding: "0.15rem 0",
    },
    listIcon: {
      marginTop: "0.25rem",
      fontSize: "1rem",
      flexShrink: 0,
    },
    bold: {
      color: T.text,
      fontWeight: "800",
    },

    // ─── Delivery timeline ───
    deliveryTimeline: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      paddingLeft: "0.25rem",
    },
    deliveryItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.85rem",
      fontSize: isMobile ? "0.9rem" : "0.96rem",
      color: T.textMuted,
    },
    deliveryDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: T.green,
      flexShrink: 0,
      boxShadow: isDarkMode
        ? "0 0 14px rgba(102,187,106,0.7)"
        : "0 0 10px rgba(76,175,80,0.4)",
    },

    // ─── FAQ ───
    faqItem: {
      marginBottom: "0.5rem",
      borderBottom: `1px solid ${T.divider}`,
      paddingBottom: "0.35rem",
    },
    faqQuestionContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      padding: "1rem 0",
      gap: "1rem",
      background: "none",
      border: "none",
      width: "100%",
      textAlign: "left",
      color: T.text,
      fontFamily: "inherit",
    },
    faqQuestion: {
      fontWeight: "800",
      fontSize: isMobile ? "0.92rem" : "1rem",
      color: T.text,
      lineHeight: "1.5",
      letterSpacing: "-0.1px",
    },
    faqChevron: (index) => ({
      transition: "transform 0.3s ease",
      color: isDarkMode ? T.gold : brandColors.primary,
      flexShrink: 0,
      transform: openFaq === index ? "rotate(180deg)" : "rotate(0deg)",
    }),
    faqAnswer: (index) => ({
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      color: T.textMuted,
      lineHeight: "1.75",
      maxHeight: openFaq === index ? "500px" : "0",
      opacity: openFaq === index ? 1 : 0,
      overflow: "hidden",
      transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
      paddingBottom: openFaq === index ? "1rem" : "0",
    }),
  };

  return (
    <div style={themeStyles.container}>
      <SEO
        title="Shipping Information | ASudha Beauty"
        description="Free shipping on orders above ₹500. Fast, reliable delivery across India with tracking. Learn about our shipping options, timelines, and policies."
        keywords="shipping, delivery, free shipping, shipping policy, India delivery"
        url="/shipping-info"
      />

      {/* Animated background */}
      <div style={themeStyles.bgLayer}>
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div
          className="ship-orb-1"
          style={themeStyles.bgOrb1}
          aria-hidden="true"
        />
        <div
          className="ship-orb-2"
          style={themeStyles.bgOrb2}
          aria-hidden="true"
        />
        <div
          className="ship-orb-3"
          style={themeStyles.bgOrb3}
          aria-hidden="true"
        />
      </div>

      {/* Header */}
      <div style={themeStyles.header}>
        {/* <div style={themeStyles.headerBadge}>
          <FaLeaf style={{ fontSize: "0.7rem" }} />
          Delivered with Care
        </div> */}
        <h1 style={themeStyles.title}>
          Shipping Information
          <span style={themeStyles.titleAccent} aria-hidden="true" />
        </h1>
        <p style={themeStyles.subtitle}>
          <FaLeaf style={{ color: T.green }} />
          Fast, reliable delivery across India. Learn about our shipping
          options and policies.
        </p>
      </div>

      <div style={themeStyles.section}>
        {/* Free Shipping Progress */}
        <div style={themeStyles.progressContainer}>
          <div style={themeStyles.progressAccentBar} />
          <h3 style={themeStyles.progressTitle}>
            <FaTruck
              style={{
                color: isDarkMode ? T.gold : brandColors.primary,
                fontSize: "1rem",
              }}
            />
            {cartTotal === 0
              ? "Add items to your cart to unlock free shipping!"
              : qualified
              ? "🎉 You qualify for FREE Shipping!"
              : `Add ₹${remaining} more for FREE Shipping`}
          </h3>
          <div style={themeStyles.progressBarOuter}>
            <div style={themeStyles.progressBarInner}></div>
          </div>
          <div style={themeStyles.progressText}>
            <span>
              {cartTotal === 0
                ? "Your cart is currently empty"
                : `Cart total: ₹${cartTotal.toFixed(2)} / ₹${freeShippingThreshold}`}
            </span>
            {cartCount > 0 && (
              <span>
                {cartCount} item{cartCount !== 1 ? "s" : ""} in cart
              </span>
            )}
          </div>
        </div>

        {/* Shipping Methods */}
        <h2 style={themeStyles.sectionTitle}>
          <span style={themeStyles.sectionTitleIconWrap}>
            <FaBox />
          </span>
          Shipping Options
        </h2>
        <div style={themeStyles.shippingGrid}>
          {shippingMethods.map((method, idx) => (
            <div
              key={idx}
              style={themeStyles.shippingCard}
              className="si-shipping-card"
            >
              <div style={themeStyles.shippingCardAccent} />
              <div
                style={themeStyles.shippingIconWrapper}
                className="si-shipping-icon"
              >
                {method.icon}
              </div>
              <h3 style={themeStyles.shippingName}>{method.name}</h3>
              <div style={themeStyles.shippingCost}>{method.cost}</div>
              <div style={themeStyles.shippingTime}>{method.deliveryTime}</div>
              <div style={themeStyles.shippingDetails}>{method.details}</div>
            </div>
          ))}
        </div>

        {/* Policy Details */}
        <div style={themeStyles.infoCard} className="si-info-card">
          <div style={themeStyles.infoCardAccent} />
          <h2 style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap}>
              <FaTruck />
            </span>
            Shipping Policy
          </h2>
          <div style={themeStyles.listItem}>
            <FaCheckCircle
              style={{ ...themeStyles.listIcon, color: T.green }}
            />
            <span>
              <strong style={themeStyles.bold}>Free Shipping:</strong> On all
              orders above ₹500 within India
            </span>
          </div>
          <div style={themeStyles.listItem}>
            <FaClock style={{ ...themeStyles.listIcon, color: T.accent }} />
            <span>
              <strong style={themeStyles.bold}>Processing Time:</strong> Orders
              are processed within 24-48 hours
            </span>
          </div>
          <div style={themeStyles.listItem}>
            <FaMapMarkerAlt
              style={{ ...themeStyles.listIcon, color: T.info }}
            />
            <span>
              <strong style={themeStyles.bold}>Delivery Areas:</strong> We ship
              to all pin codes across India
            </span>
          </div>
          <div style={themeStyles.listItem}>
            <FaBox style={{ ...themeStyles.listIcon, color: T.warn }} />
            <span>
              <strong style={themeStyles.bold}>Tracking:</strong> Receive
              tracking details via email/SMS once shipped
            </span>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div style={themeStyles.infoCard} className="si-info-card">
          <div style={themeStyles.infoCardAccent} />
          <h2 style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap}>
              <FaClock />
            </span>
            Estimated Delivery Times
          </h2>
          <div style={themeStyles.deliveryTimeline}>
            <div style={themeStyles.deliveryItem}>
              <div style={themeStyles.deliveryDot}></div>
              <span>
                <strong style={themeStyles.bold}>Metro Cities:</strong> 2-4
                business days
              </span>
            </div>
            <div style={themeStyles.deliveryItem}>
              <div style={themeStyles.deliveryDot}></div>
              <span>
                <strong style={themeStyles.bold}>Tier 2 Cities:</strong> 3-5
                business days
              </span>
            </div>
            <div style={themeStyles.deliveryItem}>
              <div style={themeStyles.deliveryDot}></div>
              <span>
                <strong style={themeStyles.bold}>Rural Areas:</strong> 5-7
                business days
              </span>
            </div>
            <div style={themeStyles.deliveryItem}>
              <div style={themeStyles.deliveryDot}></div>
              <span>
                <strong style={themeStyles.bold}>Remote Locations:</strong> 7-10
                business days
              </span>
            </div>
          </div>
        </div>

        {/* International Shipping */}
        <div style={themeStyles.infoCard} className="si-info-card">
          <div style={themeStyles.infoCardAccent} />
          <h2 style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap}>
              <FaGlobe />
            </span>
            International Shipping
          </h2>
          <div style={themeStyles.listItem}>
            <span>
              Currently, we only ship within India. International shipping
              coming soon! 🌍
            </span>
          </div>
        </div>

        {/* FAQs */}
        <div style={themeStyles.infoCard} className="si-info-card">
          <div style={themeStyles.infoCardAccent} />
          <h2 style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap}>
              <FaQuestionCircle />
            </span>
            Frequently Asked Questions
          </h2>

          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} style={themeStyles.faqItem}>
                <button
                  type="button"
                  style={themeStyles.faqQuestionContainer}
                  className="si-faq-toggle"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span style={themeStyles.faqQuestion} className="si-faq-q">
                    {faq.q}
                  </span>
                  <FaChevronDown style={themeStyles.faqChevron(idx)} />
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  style={themeStyles.faqAnswer(idx)}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Support */}
        <div style={themeStyles.infoCard} className="si-info-card">
          <div style={themeStyles.infoCardAccent} />
          <h2 style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap}>
              <FaHeadset />
            </span>
            Need Help?
          </h2>
          <div style={themeStyles.listItem}>
            <FaEnvelope style={{ ...themeStyles.listIcon, color: T.accent }} />
            <span>
              <strong style={themeStyles.bold}>Email:</strong>{" "}
              asudhabeauty@gmail.com
            </span>
          </div>
          <div style={themeStyles.listItem}>
            <FaPhone style={{ ...themeStyles.listIcon, color: T.accent }} />
            <span>
              <strong style={themeStyles.bold}>Phone:</strong>{" "}
              +91-7518217726 (Mon-Sun, 10 AM - 7 PM)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;