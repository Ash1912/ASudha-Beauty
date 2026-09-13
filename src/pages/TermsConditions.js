// src/pages/TermsConditions.js
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";
import {
  FaShoppingBag,
  FaCreditCard,
  FaTruck,
  FaUndo,
  FaUserSecret,
  FaGavel,
  FaFileContract,
  FaInfoCircle,
  FaShieldAlt,
  FaEnvelope,
  FaListUl,
  FaArrowRight,
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
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const TermsConditions = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [lastUpdated] = useState("January 15, 2026");

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
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 900;

  const sections = [
    {
      id: "acceptance",
      icon: <FaFileContract />,
      title: "Acceptance of Terms",
      content: `By accessing and using the ASudha Beauty website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website. These terms apply to all visitors, users, and others who access or use the service.`,
    },
    {
      id: "products",
      icon: <FaShoppingBag />,
      title: "Products and Pricing",
      content: `All products displayed on our website are subject to availability. We reserve the right to modify or discontinue any product without prior notice. Prices are subject to change without notice. We make every effort to display accurate product information, but we do not warrant that product descriptions, colors, or other content is accurate, complete, or error-free.`,
    },
    {
      id: "orders",
      icon: <FaCreditCard />,
      title: "Order Acceptance",
      content: `We reserve the right to refuse or cancel any order for any reason including but not limited to product availability, errors in product information, or suspected fraud. If we cancel an order, we will notify you and issue a full refund. Once an order is placed, you will receive an order confirmation via email.`,
    },
    {
      id: "shipping",
      icon: <FaTruck />,
      title: "Shipping and Delivery",
      content: `We ship to addresses within India. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by customs clearance, carrier issues, or force majeure events. Shipping costs are calculated at checkout and may vary based on location and order value.`,
    },
    {
      id: "returns",
      icon: <FaUndo />,
      title: "Returns and Refunds",
      content: `We offer a 30-day return policy for unused products in original packaging. To initiate a return, please contact our customer service. Refunds will be processed within 7-10 business days after we receive and inspect the returned product. Certain items such as opened cosmetics are non-returnable for hygiene reasons.`,
    },
    {
      id: "payment",
      icon: <FaCreditCard />,
      title: "Payment Terms",
      content: `We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are processed through secure payment gateways. We do not store your payment information. By placing an order, you authorize us to charge your chosen payment method for the total amount.`,
    },
    {
      id: "privacy",
      icon: <FaUserSecret />,
      title: "Privacy Policy",
      content: `Your privacy is important to us. We collect and process personal information in accordance with our Privacy Policy. By using our website, you consent to such processing and warrant that all data provided by you is accurate. We use secure SSL encryption to protect your data.`,
    },
    {
      id: "intellectual",
      icon: <FaGavel />,
      title: "Intellectual Property",
      content: `All content on this website including text, graphics, logos, images, and software is the property of ASudha Beauty and protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
    },
    {
      id: "liability",
      icon: <FaShieldAlt />,
      title: "Limitation of Liability",
      content: `ASudha Beauty shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability shall not exceed the amount paid for the product giving rise to the claim.`,
    },
    {
      id: "modifications",
      icon: <FaInfoCircle />,
      title: "Modifications to Terms",
      content: `We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms. We encourage you to review these terms periodically for any updates.`,
    },
  ];

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-terms-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-terms-styles", "true");
    style.textContent = `
      @keyframes tcFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(40px, -30px) scale(1.08); }
      }
      @keyframes tcFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-35px, 25px) scale(1.06); }
      }
      @keyframes tcFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(28px, 40px) scale(1.1); }
      }
      @keyframes tcScrollIndicate {
        0%, 100% { transform: translateX(0); opacity: 0.5; }
        50% { transform: translateX(4px); opacity: 1; }
      }

      .tc-orb-1 { animation: tcFloat1 16s ease-in-out infinite; }
      .tc-orb-2 { animation: tcFloat2 20s ease-in-out infinite; }
      .tc-orb-3 { animation: tcFloat3 18s ease-in-out infinite; }

      .tc-toc-link {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        position: relative;
        transition: background-color 0.25s ease, color 0.25s ease,
                    padding-left 0.25s ease;
      }
      .tc-toc-link::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 0;
        background: linear-gradient(180deg, ${brandColors.gold}, ${brandColors.primary});
        border-radius: 0 3px 3px 0;
        transition: height 0.3s ease;
      }
      .tc-toc-link:hover {
        background: ${
          isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(62, 39, 35, 0.04)"
        } !important;
        color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        padding-left: 1rem;
      }
      .tc-toc-link:hover::before {
        height: 60%;
      }
      .tc-toc-link:hover .tc-toc-arrow {
        opacity: 1;
        transform: translateX(0);
      }
      .tc-toc-arrow {
        opacity: 0;
        transform: translateX(-6px);
        transition: opacity 0.25s ease, transform 0.25s ease;
        margin-left: auto;
        font-size: 0.7rem;
        flex-shrink: 0;
      }

      .tc-section {
        transition: box-shadow 0.35s ease, border-color 0.3s ease,
                    transform 0.3s ease;
      }
      .tc-section:hover {
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.3)"
        } !important;
        transform: translateY(-2px);
      }
      .tc-section:hover .tc-section-icon {
        transform: scale(1.08) rotate(-6deg);
        box-shadow: 0 10px 26px rgba(245, 52, 107, 0.4);
      }
      .tc-section-icon {
        transition: transform 0.35s ease, box-shadow 0.3s ease;
      }

      .tc-contact-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .tc-contact-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-terms-styles="true"]')
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
    lastUpdated: {
      fontSize: "0.82rem",
      color: T.textMuted,
      marginTop: "1rem",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1.15rem",
      backgroundColor: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      fontWeight: "700",
      boxShadow: T.shadow,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },

    // ─── Layout ───
    // ✅ Wider sidebar (280px) and wider gap so TOC titles don't wrap badly
    layout: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1180px",
      margin: "0 auto",
      padding: isMobile
        ? "1rem 1rem 3rem"
        : isNarrow
        ? "1rem 1.5rem 3.5rem"
        : "1.5rem 2.5rem 5rem",
      display: "grid",
      gridTemplateColumns: isNarrow ? "1fr" : "minmax(0, 1fr) minmax(0, 300px)",
      gap: isNarrow ? "1.5rem" : "3rem",
      alignItems: "start",
      boxSizing: "border-box",
      width: "100%",
    },

    // ─── Table of contents (redesigned) ───
    toc: {
      position: isNarrow ? "relative" : "sticky",
      top: isNarrow ? "auto" : "2rem",
      order: isNarrow ? 2 : 2, // TOC on the right side
      backgroundColor: T.card,
      borderRadius: "20px",
      padding: "1.5rem 1.25rem 1.75rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      width: "100%",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      maxHeight: isNarrow ? "none" : "calc(100vh - 4rem)",
      overflowY: isNarrow ? "visible" : "auto",
    },
    tocAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      opacity: 0.9,
    },
    tocTitle: {
      fontSize: "0.82rem",
      fontWeight: "800",
      color: isDarkMode ? T.gold : brandColors.bronze,
      marginBottom: "1.15rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    tocList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.15rem",
    },
    tocItem: {
      position: "relative",
    },
    tocLink: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      padding: "0.6rem 0.85rem",
      color: T.textMuted,
      textDecoration: "none",
      fontSize: "0.85rem",
      borderRadius: "10px",
      fontWeight: "600",
      lineHeight: "1.35",
      position: "relative",
    },
    tocArrow: {
      opacity: 0,
      transform: "translateX(-6px)",
      transition: "opacity 0.25s ease, transform 0.25s ease",
      marginLeft: "auto",
      fontSize: "0.7rem",
      flexShrink: 0,
      color: isDarkMode ? T.gold : brandColors.primary,
    },
    // Sticky "Contact" card inside TOC — fills the empty space
    tocContact: {
      marginTop: "1.5rem",
      paddingTop: "1.25rem",
      borderTop: `1px solid ${T.divider}`,
    },
    tocContactTitle: {
      fontSize: "0.78rem",
      fontWeight: "800",
      color: T.text,
      marginBottom: "0.5rem",
      letterSpacing: "-0.1px",
    },
    tocContactText: {
      fontSize: "0.75rem",
      color: T.textMuted,
      lineHeight: "1.55",
      marginBottom: "0.9rem",
    },
    tocContactBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.5rem 0.9rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "700",
      fontSize: "0.78rem",
      boxShadow: "0 6px 18px rgba(245, 52, 107, 0.3)",
      width: "100%",
      justifyContent: "center",
    },

    // ─── Sections ───
    sectionsContainer: {
      order: isNarrow ? 1 : 1, // Sections on the left
      minWidth: 0,
      width: "100%",
    },
    // Group sections into a single cohesive panel to prevent the "floating cards" look
    sectionsPanel: {
      backgroundColor: T.card,
      borderRadius: "22px",
      padding: isMobile ? "1.5rem 1.25rem" : "2.5rem 2.25rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxSizing: "border-box",
      width: "100%",
      position: "relative",
      overflow: "hidden",
    },
    sectionsPanelAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    section: {
      paddingTop: "2rem",
      paddingBottom: "2rem",
      borderBottom: `1px solid ${T.divider}`,
      scrollMarginTop: "100px",
      transition: "background-color 0.3s ease",
    },
    sectionLast: {
      borderBottom: "none",
      paddingBottom: 0,
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.9rem",
      marginBottom: "1.1rem",
      flexWrap: "wrap",
    },
    sectionIconWrapper: {
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.05rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      flexShrink: 0,
      boxShadow: "0 8px 20px rgba(245, 52, 107, 0.3)",
    },
    sectionTitle: {
      fontSize: isMobile ? "1.15rem" : "1.35rem",
      fontWeight: "900",
      margin: 0,
      color: T.text,
      lineHeight: "1.3",
      letterSpacing: "-0.3px",
    },
    sectionContent: {
      fontSize: isMobile ? "0.92rem" : "1rem",
      lineHeight: "1.85",
      color: T.textMuted,
      margin: 0,
      paddingLeft: isMobile ? 0 : "calc(44px + 0.9rem)",
    },

    // ─── Contact / footer ───
    contactSection: {
      backgroundColor: T.cardAlt,
      borderRadius: "22px",
      padding: isMobile ? "2rem 1.5rem" : "2.5rem 2rem",
      textAlign: "center",
      marginTop: isMobile ? "1.25rem" : "2rem",
      border: `1px solid ${T.border}`,
      boxSizing: "border-box",
      width: "100%",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: T.shadow,
    },
    contactAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.9,
    },
    contactTitle: {
      fontSize: isMobile ? "1.15rem" : "1.35rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.3px",
    },
    contactText: {
      fontSize: isMobile ? "0.9rem" : "0.98rem",
      color: T.textMuted,
      marginBottom: "1.5rem",
      lineHeight: "1.7",
      maxWidth: "480px",
      margin: "0 auto 1.5rem",
    },
    contactButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.85rem 1.6rem" : "0.95rem 2rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.92rem" : "1rem",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      border: "none",
      cursor: "pointer",
      letterSpacing: "0.2px",
    },
    footerNote: {
      marginTop: "1.75rem",
      fontSize: "0.78rem",
      color: T.textDim,
      textAlign: "center",
      lineHeight: "1.7",
      fontWeight: "600",
    },
  };

  return (
    <div style={themeStyles.container}>
      <SEO
        title="Terms & Conditions | ASudha Beauty"
        description="Read ASudha Beauty's Terms & Conditions covering orders, shipping, returns, payments, privacy, and intellectual property."
        keywords="terms and conditions, terms of service, ASudha Beauty, policy, user agreement"
        url="/terms-conditions"
      />

      {/* Animated background */}
      <div style={themeStyles.bgLayer}>
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div
          className="tc-orb-1"
          style={themeStyles.bgOrb1}
          aria-hidden="true"
        />
        <div
          className="tc-orb-2"
          style={themeStyles.bgOrb2}
          aria-hidden="true"
        />
        <div
          className="tc-orb-3"
          style={themeStyles.bgOrb3}
          aria-hidden="true"
        />
      </div>

      {/* Header */}
      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>
          Terms &amp; Conditions
          <span style={themeStyles.titleAccent} aria-hidden="true" />
        </h1>
        <p style={themeStyles.subtitle}>
          Please read these terms carefully before using our website or placing
          an order.
        </p>
        <div style={themeStyles.lastUpdated}>
          <FaInfoCircle
            style={{
              fontSize: "0.75rem",
              color: isDarkMode ? T.gold : brandColors.bronze,
            }}
          />
          Last Updated: {lastUpdated}
        </div>
      </div>

      {/* Layout with sticky TOC + sections */}
      <div style={themeStyles.layout}>
        {/* Content — grouped into one cohesive panel */}
        <div style={themeStyles.sectionsContainer}>
          <div style={themeStyles.sectionsPanel}>
            <div style={themeStyles.sectionsPanelAccent} />
            {sections.map((section, idx) => {
              const isLast = idx === sections.length - 1;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  style={{
                    ...themeStyles.section,
                    ...(isLast ? themeStyles.sectionLast : {}),
                  }}
                  className="tc-section"
                >
                  <div style={themeStyles.sectionHeader}>
                    <div
                      style={themeStyles.sectionIconWrapper}
                      className="tc-section-icon"
                    >
                      {section.icon}
                    </div>
                    <h2 style={themeStyles.sectionTitle}>{section.title}</h2>
                  </div>
                  <p style={themeStyles.sectionContent}>
                    {section.content}
                  </p>
                </section>
              );
            })}
          </div>

          {/* Contact */}
          <div style={themeStyles.contactSection}>
            <div style={themeStyles.contactAccentBar} />
            <h3 style={themeStyles.contactTitle}>Questions About Terms?</h3>
            <p style={themeStyles.contactText}>
              If you have any questions about our Terms &amp; Conditions, please
              reach out to our legal team.
            </p>
            <a
              href="mailto:asudhabeauty@gmail.com"
              style={themeStyles.contactButton}
              className="tc-contact-btn"
            >
              <FaEnvelope /> Contact Legal Team
            </a>
          </div>

        </div>

        {/* Table of Contents — right sidebar */}
        <aside style={themeStyles.toc}>
          <div style={themeStyles.tocAccentBar} />
          <div style={themeStyles.tocTitle}>
            <FaListUl /> On This Page
          </div>
          <ul style={themeStyles.tocList}>
            {sections.map((s) => (
              <li key={s.id} style={themeStyles.tocItem}>
                <a
                  href={`#${s.id}`}
                  style={themeStyles.tocLink}
                  className="tc-toc-link"
                >
                  {s.title}
                  <FaArrowRight
                    style={themeStyles.tocArrow}
                    className="tc-toc-arrow"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Quick-contact block inside TOC — fills the empty space below the list */}
          <div style={themeStyles.tocContact}>
            <div style={themeStyles.tocContactTitle}>Need help faster?</div>
            <p style={themeStyles.tocContactText}>
              Reach our legal team directly. We usually respond within 24
              hours.
            </p>
            <a
              href="mailto:asudhabeauty@gmail.com"
              style={themeStyles.tocContactBtn}
              className="tc-contact-btn"
            >
              <FaEnvelope style={{ fontSize: "0.7rem" }} /> Email Us
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TermsConditions;