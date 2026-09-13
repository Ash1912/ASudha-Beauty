// src/pages/ReturnsExchanges.js
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";
import {
  FaExchangeAlt,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaShieldAlt,
  FaArrowRight,
  FaFileAlt,
  FaBox,
  FaCreditCard,
  FaTimesCircle,
  FaHeadset,
  FaInfoCircle,
  FaUndoAlt,
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
  danger: "#f44336",
  info: "#2196f3",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const ReturnsExchanges = () => {
  const { isDarkMode } = useTheme();
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
    danger: brandColors.danger,
    info: "#64b5f6",
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
    info: brandColors.info,
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  const steps = [
    {
      icon: <FaFileAlt />,
      title: "Initiate Return",
      description:
        "Log into your account and submit a return request within 30 days of delivery.",
    },
    {
      icon: <FaBox />,
      title: "Pack Your Item",
      description:
        "Pack the unused product in original packaging with all tags attached.",
    },
    {
      icon: <FaTruck />,
      title: "Ship It Back",
      description:
        "Use our prepaid shipping label or arrange your own shipping.",
    },
    {
      icon: <FaCreditCard />,
      title: "Get Refund",
      description:
        "Receive refund within 7-10 business days after inspection.",
    },
  ];

  const policyHighlights = [
    {
      icon: <FaClock />,
      color: brandColors.primary,
      title: "30-Day Return Window",
      description:
        "You have 30 days from delivery to initiate a return on eligible items.",
    },
    {
      icon: <FaCheckCircle />,
      color: brandColors.green,
      title: "Full Refund",
      description:
        "Receive a full refund for unused products in their original condition.",
    },
    {
      icon: <FaTruck />,
      color: brandColors.info,
      title: "Free Returns",
      description:
        "We offer free returns for defective or incorrect items — no questions asked.",
    },
  ];

  const nonReturnable = [
    "Opened or used cosmetics (for hygiene reasons)",
    "Products without original packaging or tags",
    "Items damaged due to misuse",
    "Free items or promotional products",
    "Gift cards",
    "Products purchased more than 30 days ago",
  ];

  const timeline = [
    {
      step: 1,
      title: "Return Received",
      description: "We inspect your return within 2-3 business days.",
    },
    {
      step: 2,
      title: "Refund Processing",
      description: "Refund initiated within 48 hours of approval.",
    },
    {
      step: 3,
      title: "Bank Processing",
      description:
        "Allow 5-7 business days for the refund to reflect in your account.",
    },
  ];

  const exchangeSteps = [
    "Contact us within 15 days of delivery for size / variant exchanges.",
    "We'll arrange a free pickup for the original item from your doorstep.",
    "Your new item ships once we receive the return (subject to availability).",
  ];

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-returns-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-returns-styles", "true");
    style.textContent = `
      @keyframes rxFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes rxFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes rxFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }

      .rx-orb-1 { animation: rxFloat1 16s ease-in-out infinite; }
      .rx-orb-2 { animation: rxFloat2 20s ease-in-out infinite; }
      .rx-orb-3 { animation: rxFloat3 18s ease-in-out infinite; }

      .rx-step-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s ease, border-color 0.3s ease;
      }
      .rx-step-card:hover {
        transform: translateY(-6px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.3)"
        } !important;
      }
      .rx-step-card:hover .rx-step-icon {
        transform: scale(1.08) rotate(-6deg);
        box-shadow: 0 14px 34px rgba(245, 52, 107, 0.45);
      }
      .rx-step-icon {
        transition: transform 0.4s ease, box-shadow 0.35s ease;
      }

      .rx-highlight-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .rx-highlight-card:hover {
        transform: translateY(-4px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.3)"
        } !important;
      }
      .rx-highlight-card:hover .rx-highlight-icon {
        transform: scale(1.08) rotate(-6deg);
      }
      .rx-highlight-icon {
        transition: transform 0.35s ease;
      }

      .rx-info-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease,
                    border-color 0.3s ease;
      }
      .rx-info-card:hover {
        transform: translateY(-3px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.35)"
            : "rgba(199, 125, 66, 0.25)"
        } !important;
      }

      .rx-cta-primary {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .rx-cta-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
        gap: 0.75rem;
      }
      .rx-cta-secondary {
        transition: transform 0.3s ease, border-color 0.3s ease,
                    color 0.3s ease;
      }
      .rx-cta-secondary:hover {
        border-color: ${brandColors.primary} !important;
        color: ${brandColors.primary} !important;
        transform: translateY(-3px);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-returns-styles="true"]')
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
      color: isDarkMode ? T.gold : brandColors.bronze,
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

    // ─── Section ───
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
    sectionHeading: {
      fontSize: isMobile ? "1.2rem" : "1.45rem",
      fontWeight: "900",
      marginBottom: "1.5rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      flexWrap: "wrap",
      letterSpacing: "-0.3px",
    },
    sectionIconWrap: {
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

    // ─── Quick info pills ───
    quickInfoStrip: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.6rem",
      justifyContent: "center",
      marginBottom: "2rem",
    },
    quickInfoPill: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.6rem 1.15rem",
      backgroundColor: T.card,
      borderRadius: "50px",
      border: `1px solid ${T.border}`,
      fontSize: isMobile ? "0.78rem" : "0.88rem",
      fontWeight: "700",
      color: T.text,
      boxShadow: T.shadow,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },

    // ─── Steps grid ───
    stepsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: isMobile ? "1.15rem" : "1.35rem",
      marginTop: "1rem",
      marginBottom: "3rem",
    },
    stepCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.75rem 1.35rem" : "2rem 1.4rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    stepCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.85,
    },
    stepIconWrapper: {
      width: isMobile ? "60px" : "70px",
      height: isMobile ? "60px" : "70px",
      margin: "0 auto 1.35rem",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? "1.4rem" : "1.75rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      boxShadow: "0 12px 28px rgba(245, 52, 107, 0.35)",
      flexShrink: 0,
    },
    stepTitle: {
      fontSize: isMobile ? "1.05rem" : "1.1rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.2px",
    },
    stepDescription: {
      fontSize: "0.88rem",
      color: T.textMuted,
      lineHeight: "1.65",
      margin: 0,
    },

    // ─── Highlight cards ───
    highlightsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
      gap: isMobile ? "1rem" : "1.25rem",
      marginBottom: "2.25rem",
    },
    highlightCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.5rem 1.25rem" : "1.75rem 1.5rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "0.65rem",
      boxSizing: "border-box",
      height: "100%",
      position: "relative",
      overflow: "hidden",
    },
    highlightCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.85,
    },
    highlightIconWrap: {
      width: "48px",
      height: "48px",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.15rem",
      flexShrink: 0,
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      boxShadow: "0 8px 20px rgba(245, 52, 107, 0.3)",
    },
    highlightTitle: {
      fontSize: "1.05rem",
      fontWeight: "900",
      color: T.text,
      marginBottom: "0.15rem",
      letterSpacing: "-0.2px",
    },
    highlightDescription: {
      fontSize: "0.88rem",
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

    // ─── Lists ───
    listItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.85rem",
      marginBottom: "0.9rem",
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      color: T.textMuted,
      lineHeight: "1.65",
      padding: "0.15rem 0",
    },
    listIcon: {
      marginTop: "0.3rem",
      fontSize: "0.95rem",
      flexShrink: 0,
    },
    strong: {
      color: T.text,
      fontWeight: "800",
    },

    // ─── Timeline ───
    timeline: {
      marginTop: "0.85rem",
      position: "relative",
      paddingLeft: "0.25rem",
    },
    timelineItem: {
      display: "flex",
      gap: "1.15rem",
      marginBottom: "1.35rem",
      position: "relative",
      alignItems: "flex-start",
    },
    timelineIcon: {
      width: isMobile ? "42px" : "48px",
      height: isMobile ? "42px" : "48px",
      borderRadius: "50%",
      flexShrink: 0,
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "900",
      fontSize: isMobile ? "1rem" : "1.1rem",
      boxShadow: "0 10px 24px rgba(245, 52, 107, 0.35)",
      zIndex: 2,
    },
    timelineContent: {
      flex: 1,
      minWidth: 0,
      paddingTop: "0.15rem",
    },
    timelineTitle: {
      fontWeight: "900",
      marginBottom: "0.25rem",
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      color: T.text,
      letterSpacing: "-0.1px",
    },
    timelineText: {
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      color: T.textMuted,
      lineHeight: "1.6",
      margin: 0,
    },

    // ─── CTA ───
    ctaSection: {
      textAlign: "center",
      marginTop: "2rem",
      padding: isMobile ? "2rem 1.5rem" : "2.5rem 2rem",
      backgroundColor: T.cardAlt,
      borderRadius: "24px",
      border: `1px solid ${T.border}`,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: T.shadow,
    },
    ctaAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    ctaHeading: {
      marginBottom: "1.5rem",
      fontSize: isMobile ? "1.2rem" : "1.45rem",
      fontWeight: "900",
      color: T.text,
      letterSpacing: "-0.3px",
    },
    ctaButtons: {
      display: "flex",
      gap: "0.85rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    ctaButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.9rem 1.65rem" : "1rem 2rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.9rem" : "0.98rem",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      border: "none",
      cursor: "pointer",
      boxSizing: "border-box",
      whiteSpace: "nowrap",
      letterSpacing: "0.2px",
    },
    ctaSecondary: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.9rem 1.65rem" : "1rem 2rem",
      backgroundColor: "transparent",
      color: T.text,
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "700",
      fontSize: isMobile ? "0.9rem" : "0.98rem",
      border: `2px solid ${T.border}`,
      boxSizing: "border-box",
      whiteSpace: "nowrap",
    },
  };

  return (
    <div style={themeStyles.container}>
      <SEO
        title="Returns & Exchanges | ASudha Beauty"
        description="Easy 30-day returns and exchanges on all ASudha Beauty natural Ayurvedic products. Learn how to initiate a return, our refund timeline, and non-returnable items."
        keywords="returns, exchanges, refund policy, 30-day return, Ayurvedic beauty returns"
        url="/returns-exchanges"
      />

      {/* Animated background */}
      <div style={themeStyles.bgLayer}>
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div
          className="rx-orb-1"
          style={themeStyles.bgOrb1}
          aria-hidden="true"
        />
        <div
          className="rx-orb-2"
          style={themeStyles.bgOrb2}
          aria-hidden="true"
        />
        <div
          className="rx-orb-3"
          style={themeStyles.bgOrb3}
          aria-hidden="true"
        />
      </div>

      {/* Header */}
      <div style={themeStyles.header}>
        {/* <div style={themeStyles.headerBadge}>
          <FaLeaf style={{ fontSize: "0.7rem" }} />
          Easy &amp; Hassle-Free
        </div> */}
        <h1 style={themeStyles.title}>
          Returns &amp; Exchanges
          <span style={themeStyles.titleAccent} aria-hidden="true" />
        </h1>
        <p style={themeStyles.subtitle}>
          We want you to love your purchase. If something isn&apos;t right,
          we&apos;re here to help.
        </p>
      </div>

      <div style={themeStyles.section}>
        {/* Quick info pills */}
        <div style={themeStyles.quickInfoStrip}>
          <span style={themeStyles.quickInfoPill}>
            <FaClock style={{ color: brandColors.primary }} />
            30-Day Window
          </span>
          <span style={themeStyles.quickInfoPill}>
            <FaUndoAlt style={{ color: brandColors.green }} />
            Free Returns
          </span>
          <span style={themeStyles.quickInfoPill}>
            <FaCheckCircle style={{ color: T.info }} />
            Full Refund
          </span>
        </div>

        {/* How to Return */}
        <h2 style={themeStyles.sectionHeading}>
          <span style={themeStyles.sectionIconWrap}>
            <FaExchangeAlt />
          </span>
          How to Return an Item
        </h2>
        <div style={themeStyles.stepsGrid}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={themeStyles.stepCard}
              className="rx-step-card"
            >
              <div style={themeStyles.stepCardAccent} />
              <div
                style={themeStyles.stepIconWrapper}
                className="rx-step-icon"
              >
                {step.icon}
              </div>
              <h3 style={themeStyles.stepTitle}>{step.title}</h3>
              <p style={themeStyles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>

        {/* Policy highlights */}
        <h2 style={themeStyles.sectionHeading}>
          <span style={themeStyles.sectionIconWrap}>
            <FaShieldAlt />
          </span>
          Return Policy at a Glance
        </h2>
        <div style={themeStyles.highlightsGrid}>
          {policyHighlights.map((item, idx) => (
            <div
              key={idx}
              style={themeStyles.highlightCard}
              className="rx-highlight-card"
            >
              <div style={themeStyles.highlightCardAccent} />
              <div
                style={themeStyles.highlightIconWrap}
                className="rx-highlight-icon"
              >
                {item.icon}
              </div>
              <div style={themeStyles.highlightTitle}>{item.title}</div>
              <p style={themeStyles.highlightDescription}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Non-returnable items */}
        <div style={themeStyles.infoCard} className="rx-info-card">
          <div style={themeStyles.infoCardAccent} />
          <h2 style={themeStyles.sectionHeading}>
            <span
              style={{
                ...themeStyles.sectionIconWrap,
                background: `linear-gradient(135deg, ${brandColors.danger}, #ff8a80)`,
              }}
            >
              <FaTimesCircle />
            </span>
            Non-Returnable Items
          </h2>
          {nonReturnable.map((item, idx) => (
            <div key={idx} style={themeStyles.listItem}>
              <FaTimesCircle
                style={{ ...themeStyles.listIcon, color: T.danger }}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Refund timeline */}
        <div style={themeStyles.infoCard} className="rx-info-card">
          <div style={themeStyles.infoCardAccent} />
          <h2 style={themeStyles.sectionHeading}>
            <span style={themeStyles.sectionIconWrap}>
              <FaClock />
            </span>
            Refund Timeline
          </h2>
          <div style={themeStyles.timeline}>
            {timeline.map((item) => (
              <div key={item.step} style={themeStyles.timelineItem}>
                <div style={themeStyles.timelineIcon}>{item.step}</div>
                <div style={themeStyles.timelineContent}>
                  <div style={themeStyles.timelineTitle}>{item.title}</div>
                  <p style={themeStyles.timelineText}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exchange process */}
        <div style={themeStyles.infoCard} className="rx-info-card">
          <div style={themeStyles.infoCardAccent} />
          <h2 style={themeStyles.sectionHeading}>
            <span style={themeStyles.sectionIconWrap}>
              <FaExchangeAlt />
            </span>
            Exchange Process
          </h2>
          {exchangeSteps.map((step, idx) => (
            <div key={idx} style={themeStyles.listItem}>
              <FaCheckCircle
                style={{ ...themeStyles.listIcon, color: brandColors.green }}
              />
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* Help card */}
        <div
          style={{
            ...themeStyles.infoCard,
            backgroundColor: T.cardAlt,
          }}
          className="rx-info-card"
        >
          <div style={themeStyles.infoCardAccent} />
          <h2 style={themeStyles.sectionHeading}>
            <span style={themeStyles.sectionIconWrap}>
              <FaHeadset />
            </span>
            Still Need Help?
          </h2>
          <p
            style={{
              color: T.textMuted,
              lineHeight: "1.75",
              fontSize: isMobile ? "0.9rem" : "0.98rem",
              margin: 0,
            }}
          >
            <FaInfoCircle
              style={{
                color: isDarkMode ? T.gold : brandColors.bronze,
                marginRight: "0.5rem",
              }}
            />
            Our support team is here for you 24/7. If you have any questions
            about returns, exchanges, or refunds — reach out and we&apos;ll get
            back to you within 24 hours.
          </p>
        </div>

        {/* CTA */}
        <div style={themeStyles.ctaSection}>
          <div style={themeStyles.ctaAccent} />
          <h3 style={themeStyles.ctaHeading}>
            Need to track or return an order?
          </h3>
          <div style={themeStyles.ctaButtons}>
            <Link
              to="/track-order"
              style={themeStyles.ctaButton}
              className="rx-cta-primary"
            >
              Track Your Order <FaArrowRight />
            </Link>
            <Link
              to="/contact"
              style={themeStyles.ctaSecondary}
              className="rx-cta-secondary"
            >
              <FaHeadset /> Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsExchanges;