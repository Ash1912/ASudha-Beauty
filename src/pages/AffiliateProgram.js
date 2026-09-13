import React, { useState, useEffect, useLayoutEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";
import {
  FaMoneyBillWave,
  FaUsers,
  FaChartLine,
  FaGift,
  FaCheckCircle,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLaptopCode,
  FaHeart,
  FaRocket,
  FaArrowRight,
  FaHandshake,
  FaChevronDown,
  FaPenNib,
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
  whatsapp: "#25D366",
  instagram: "#E4405F",
  youtube: "#FF0000",
  facebook: "#1877F2",
  twitter: "#1DA1F2",
  blog: "#FF5722",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const AffiliateProgram = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    platform: "",
    audienceSize: "",
    reason: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

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
  const isNarrow = windowWidth <= 768;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({
      name: "",
      email: "",
      website: "",
      platform: "",
      audienceSize: "",
      reason: "",
    });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Benefits Data
  const benefits = [
    {
      icon: <FaMoneyBillWave />,
      title: "Generous Commission",
      description:
        "Earn up to 10% commission on every referral sale. No caps, just pure earnings.",
      color: brandColors.gold,
    },
    {
      icon: <FaUsers />,
      title: "Dedicated Support",
      description:
        "Get personalized onboarding and support from our Ayurvedic beauty team.",
      color: brandColors.primary,
    },
    {
      icon: <FaChartLine />,
      title: "Real-time Analytics",
      description:
        "Track your clicks, sales, and commissions with a simple, transparent dashboard.",
      color: brandColors.bronze,
    },
    {
      icon: <FaGift />,
      title: "Free Product Samples",
      description:
        "Receive complimentary product kits to create authentic, honest reviews.",
      color: brandColors.gold,
    },
    {
      icon: <FaLaptopCode />,
      title: "Creative Assets",
      description:
        "Access high-resolution product imagery, banners, and herbal ingredient guides.",
      color: brandColors.primary,
    },
    {
      icon: <FaRocket />,
      title: "Fast Payouts",
      description:
        "Monthly payouts via bank transfer or digital wallets. Minimum payout is ₹500.",
      color: brandColors.bronze,
    },
  ];

  // Platforms
  const platforms = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      followers: "500+",
      color: brandColors.instagram,
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      followers: "100+",
      color: brandColors.youtube,
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
      followers: "1K+",
      color: brandColors.facebook,
    },
    {
      name: "Twitter/X",
      icon: <FaTwitter />,
      followers: "500+",
      color: brandColors.twitter,
    },
    {
      name: "Blog",
      icon: <FaLaptopCode />,
      followers: "500+",
      color: brandColors.blog,
    },
  ];

  // FAQs
  const faqs = [
    {
      q: "Who can join the ASudha Beauty affiliate program?",
      a: "Anyone who loves natural Ayurvedic products! We welcome beauty influencers, lifestyle bloggers, YouTube creators, and passionate customers who want to share the goodness of Multani Mitti, Amla, Reetha, and more.",
    },
    {
      q: "How much commission can I earn?",
      a: "Affiliates earn a standard 10% commission on each sale generated through your unique link. We also offer bonus incentives for top performers!",
    },
    {
      q: "How do I get paid?",
      a: "Payments are processed monthly via bank transfer or UPI. The minimum payout threshold is just ₹500.",
    },
    {
      q: "How do I track my sales?",
      a: "You'll receive access to a personal affiliate dashboard where you can view clicks, successful referrals, and commissions in real-time.",
    },
    {
      q: "Do I need my own products to promote ASudha Beauty?",
      a: "Not at all! We provide you with sample kits, high-quality product images, and promotional banners so you can easily create authentic content.",
    },
  ];

  // Steps
  const steps = [
    {
      step: "1",
      title: "Apply",
      description: "Fill out our simple application form below.",
    },
    {
      step: "2",
      title: "Get Approved",
      description:
        "Our team reviews and approves your application within 48 hours.",
    },
    {
      step: "3",
      title: "Share Your Links",
      description: "Get your unique affiliate links for our herbal powders.",
    },
    {
      step: "4",
      title: "Earn & Grow",
      description: "Get paid monthly for every verified sale you generate.",
    },
  ];

  const stats = [
    { number: "10%", label: "Commission Rate" },
    { number: "100+", label: "Active Affiliates" },
    { number: "₹5k+", label: "Avg. Monthly Earnings" },
    { number: "30-Day", label: "Cookie Duration" },
  ];

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-affiliate-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-affiliate-styles", "true");
    style.textContent = `
      @keyframes afFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes afFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes afFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }
      @keyframes afFade {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .af-orb-1 { animation: afFloat1 16s ease-in-out infinite; }
      .af-orb-2 { animation: afFloat2 20s ease-in-out infinite; }
      .af-orb-3 { animation: afFloat3 18s ease-in-out infinite; }

      .af-input {
        transition: border-color 0.25s ease, box-shadow 0.25s ease,
                    background-color 0.25s ease;
      }
      .af-input:focus {
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.bronze
        } !important;
        box-shadow: 0 0 0 4px ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.18)"
            : "rgba(199, 125, 66, 0.12)"
        } !important;
        background-color: ${isDarkMode ? "#0a0a0a" : "#ffffff"} !important;
      }
      .af-input::placeholder {
        color: ${isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(62,39,35,0.35)"};
      }
      select.af-input option {
        background-color: ${isDarkMode ? brandColors.darkSlate : "#ffffff"} !important;
        color: ${isDarkMode ? "#ffffff" : brandColors.earthLight} !important;
      }

      .af-benefit-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s ease, border-color 0.3s ease;
      }
      .af-benefit-card:hover {
        transform: translateY(-8px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.3)"
        } !important;
      }
      .af-benefit-card:hover .af-benefit-icon {
        transform: scale(1.1) rotate(-6deg);
      }
      .af-benefit-icon {
        transition: transform 0.4s ease;
      }

      .af-stat-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease,
                    border-color 0.3s ease;
      }
      .af-stat-card:hover {
        transform: translateY(-5px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.3)"
        } !important;
      }

      .af-platform-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .af-platform-card:hover {
        transform: translateY(-6px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.3)"
        } !important;
      }
      .af-platform-card:hover .af-platform-icon {
        transform: scale(1.15) rotate(-6deg);
      }
      .af-platform-icon {
        transition: transform 0.35s ease;
      }

      .af-step-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .af-step-card:hover {
        transform: translateY(-6px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.3)"
        } !important;
      }
      .af-step-card:hover .af-step-number {
        transform: scale(1.08);
        box-shadow: 0 16px 40px rgba(245, 52, 107, 0.5);
      }
      .af-step-number {
        transition: transform 0.35s ease, box-shadow 0.35s ease;
      }

      .af-cta-primary {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .af-cta-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
        gap: 0.75rem;
      }

      .af-cta-secondary {
        transition: transform 0.3s ease, border-color 0.3s ease,
                    color 0.3s ease, gap 0.3s ease;
      }
      .af-cta-secondary:hover {
        transform: translateY(-3px);
        border-color: ${brandColors.primary} !important;
        color: ${brandColors.primary} !important;
        gap: 0.65rem;
      }

      .af-faq-header {
        transition: background-color 0.25s ease;
      }
      .af-faq-header:hover {
        background-color: ${
          isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(62,39,35,0.04)"
        } !important;
      }

      .af-faq-answer {
        animation: afFade 0.3s ease;
      }

      .af-submit-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .af-submit-btn:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-affiliate-styles="true"]')
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

    // ─── Hero ───
    hero: {
      position: "relative",
      zIndex: 1,
      padding: isMobile
        ? "3rem 1rem 2.5rem"
        : isNarrow
        ? "4rem 1.5rem 3rem"
        : "5.5rem 2rem 4rem",
      textAlign: "center",
      borderBottom: `1px solid ${T.borderSoft}`,
      overflow: "hidden",
    },
    heroContent: {
      position: "relative",
      zIndex: 2,
      maxWidth: "860px",
      margin: "0 auto",
    },
    heroBadge: {
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
      marginBottom: "1.5rem",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.3)" : "rgba(199, 125, 66, 0.2)"
      }`,
      letterSpacing: "1px",
      textTransform: "uppercase",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },
    // ✅ Solid title + gradient underline
    heroTitle: {
      fontSize: isMobile ? "2rem" : isNarrow ? "2.5rem" : "3.4rem",
      fontWeight: "900",
      marginBottom: "1.25rem",
      color: T.text,
      lineHeight: "1.1",
      letterSpacing: "-0.5px",
      position: "relative",
      display: "inline-block",
      paddingBottom: "0.85rem",
    },
    heroTitleAccent: {
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
      width: "110px",
      height: "4px",
      borderRadius: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
    },
    heroSubtitle: {
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      color: T.textMuted,
      maxWidth: "700px",
      margin: "0 auto 2.25rem",
      lineHeight: "1.75",
    },
    heroButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    ctaButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      padding: isMobile ? "0.95rem 1.85rem" : "1.05rem 2.4rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.92rem" : "1rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
      border: "none",
      cursor: "pointer",
    },
    secondaryButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      padding: isMobile ? "0.95rem 1.85rem" : "1.05rem 2.4rem",
      backgroundColor: "transparent",
      color: T.text,
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "700",
      fontSize: isMobile ? "0.92rem" : "1rem",
      border: `2px solid ${T.border}`,
      fontFamily: "inherit",
      letterSpacing: "0.2px",
      cursor: "pointer",
    },

    // ─── Section ───
    section: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile
        ? "3rem 1rem"
        : isNarrow
        ? "3.5rem 1.5rem"
        : "4.5rem 2rem",
    },
    sectionTitleRow: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "1rem",
    },
    sectionTitle: {
      fontSize: isMobile ? "1.75rem" : "2.3rem",
      textAlign: "center",
      margin: 0,
      color: T.text,
      fontWeight: "900",
      letterSpacing: "-0.4px",
      lineHeight: "1.15",
    },
    sectionTitleUnderline: {
      width: "80px",
      height: "4px",
      borderRadius: "4px",
      marginTop: "1rem",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
    },
    sectionSubtitle: {
      textAlign: "center",
      color: T.textMuted,
      marginBottom: "3rem",
      fontSize: isMobile ? "0.92rem" : "1.02rem",
      maxWidth: "640px",
      margin: "1.25rem auto 3rem",
      lineHeight: "1.7",
    },

    // ─── Stats ───
    statsGrid: {
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: isMobile ? "0.85rem" : "1.35rem",
      maxWidth: "1100px",
      margin: "0 auto",
    },
    statCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.35rem 1rem" : "1.75rem 1.25rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
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
      fontSize: isMobile ? "1.75rem" : "2.25rem",
      fontWeight: "900",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      lineHeight: "1.1",
      letterSpacing: "-0.5px",
    },
    statLabel: {
      fontSize: isMobile ? "0.75rem" : "0.82rem",
      color: T.textMuted,
      marginTop: "0.5rem",
      fontWeight: "700",
      letterSpacing: "0.2px",
    },

    // ─── Benefits grid ───
    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "minmax(0, 1fr)"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
      gap: isMobile ? "1.15rem" : "1.5rem",
    },
    benefitCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "2rem 1.5rem" : "2.25rem 1.75rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    benefitCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.85,
    },
    benefitIconWrap: {
      width: "72px",
      height: "72px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.9rem",
      marginBottom: "1.35rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.25)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      flexShrink: 0,
    },
    benefitTitle: {
      fontSize: isMobile ? "1.1rem" : "1.2rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.2px",
      lineHeight: "1.35",
    },
    benefitDescription: {
      fontSize: isMobile ? "0.88rem" : "0.92rem",
      color: T.textMuted,
      lineHeight: "1.7",
      margin: 0,
    },

    // ─── Platforms ───
    platformsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(5, minmax(0, 1fr))",
      gap: isMobile ? "0.85rem" : "1.15rem",
    },
    platformCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "20px",
      padding: isMobile ? "1.5rem 0.85rem" : "1.75rem 1.15rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    platformCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      opacity: 0.85,
    },
    platformIcon: {
      fontSize: isMobile ? "2.25rem" : "2.5rem",
      marginBottom: "0.75rem",
      display: "inline-block",
    },
    platformName: {
      fontWeight: "900",
      marginBottom: "0.3rem",
      color: T.text,
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      letterSpacing: "-0.1px",
    },
    platformFollowers: {
      fontSize: "0.75rem",
      color: T.textMuted,
      fontWeight: "600",
    },
    platformsNote: {
      textAlign: "center",
      marginTop: "1.85rem",
      color: T.textMuted,
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      fontWeight: "600",
      lineHeight: "1.7",
    },

    // ─── Steps ───
    stepsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "minmax(0, 1fr)"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: isMobile ? "1.15rem" : "1.5rem",
    },
    stepCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "2rem 1.35rem" : "2.25rem 1.5rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
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
    stepNumber: {
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.65rem",
      fontWeight: "900",
      margin: "0 auto 1.5rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      letterSpacing: "-0.5px",
    },
    stepTitle: {
      fontSize: isMobile ? "1.1rem" : "1.15rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.2px",
    },
    stepDescription: {
      color: T.textMuted,
      fontSize: isMobile ? "0.88rem" : "0.92rem",
      lineHeight: "1.7",
      margin: 0,
    },

    // ─── FAQ ───
    faqItem: {
      marginBottom: "0.85rem",
      border: `1px solid ${T.border}`,
      backgroundColor: T.card,
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: T.shadow,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
    },
    faqHeader: {
      padding: isMobile ? "1.15rem 1.25rem" : "1.35rem 1.6rem",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      background: "transparent",
      userSelect: "none",
    },
    faqQuestion: {
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      fontWeight: "800",
      color: T.text,
      flex: 1,
      lineHeight: "1.5",
      letterSpacing: "-0.1px",
    },
    faqIconWrap: {
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.12)"
        : "rgba(245, 52, 107, 0.08)",
      color: isDarkMode ? T.gold : brandColors.primary,
      fontSize: "0.8rem",
      flexShrink: 0,
      transition: "transform 0.3s ease",
    },
    faqAnswer: {
      padding: isMobile ? "0 1.25rem 1.25rem 1.25rem" : "0 1.6rem 1.5rem 1.6rem",
      color: T.textMuted,
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      lineHeight: "1.75",
      borderTop: `1px solid ${T.divider}`,
      paddingTop: "1.15rem",
      fontWeight: "500",
    },

    // ─── Form ───
    formContainer: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "26px",
      padding: isMobile ? "1.75rem 1.35rem" : "2.75rem 2.5rem",
      marginTop: "2rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    },
    formAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: isNarrow ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))",
      gap: isMobile ? "1rem" : "1.25rem",
    },
    formGroup: {
      marginBottom: "1.25rem",
      gridColumn: isNarrow ? "1 / -1" : "auto",
    },
    formGroupFull: {
      marginBottom: "1.25rem",
      gridColumn: "1 / -1",
    },
    label: {
      display: "block",
      marginBottom: "0.55rem",
      fontWeight: "800",
      color: T.text,
      fontSize: "0.82rem",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
    },
    input: {
      width: "100%",
      padding: isMobile ? "0.85rem 1.1rem" : "0.9rem 1.25rem",
      borderRadius: "14px",
      border: `1.5px solid ${T.border}`,
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: T.text,
      fontSize: "0.92rem",
      outline: "none",
      fontFamily: "inherit",
      fontWeight: "600",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: isMobile ? "0.85rem 1.1rem" : "0.9rem 1.25rem",
      borderRadius: "14px",
      border: `1.5px solid ${T.border}`,
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: T.text,
      fontSize: "0.92rem",
      outline: "none",
      fontFamily: "inherit",
      fontWeight: "600",
      boxSizing: "border-box",
      colorScheme: isDarkMode ? "dark" : "light",
      cursor: "pointer",
    },
    textarea: {
      width: "100%",
      padding: isMobile ? "0.85rem 1.1rem" : "0.9rem 1.25rem",
      borderRadius: "14px",
      border: `1.5px solid ${T.border}`,
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: T.text,
      fontSize: "0.92rem",
      minHeight: "130px",
      fontFamily: "inherit",
      outline: "none",
      resize: "vertical",
      boxSizing: "border-box",
      fontWeight: "600",
      lineHeight: "1.6",
    },
    submitButton: {
      width: "100%",
      padding: isMobile ? "0.95rem" : "1.1rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "0.95rem" : "1.02rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.55rem",
      fontFamily: "inherit",
      letterSpacing: "0.3px",
      marginTop: "0.5rem",
    },
    successMessage: {
      marginTop: "1.5rem",
      padding: "1rem 1.15rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.1)",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      borderRadius: "14px",
      textAlign: "center",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.25)" : "rgba(76, 175, 80, 0.2)"
      }`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.55rem",
      fontWeight: "700",
      fontSize: "0.92rem",
    },

    // ─── Contact ───
    contactSection: {
      textAlign: "center",
      backgroundColor: T.cardAlt,
      borderRadius: "24px",
      padding: isMobile ? "2rem 1.5rem" : "2.75rem 2.5rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    contactAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.9,
    },
    contactIconWrap: {
      width: "64px",
      height: "64px",
      margin: "0 auto 1.25rem",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.6rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
    },
    contactTitle: {
      fontSize: isMobile ? "1.25rem" : "1.5rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.3px",
    },
    contactText: {
      color: T.textMuted,
      marginBottom: "1.75rem",
      fontSize: isMobile ? "0.9rem" : "1rem",
      lineHeight: "1.7",
      maxWidth: "520px",
      margin: "0 auto 1.75rem",
    },
    contactButtons: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "0.75rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
  };

  return (
    <div style={themeStyles.container}>
      <SEO
        title="Affiliate Program | ASudha Beauty"
        description="Join the ASudha Beauty affiliate program and earn up to 10% commission by sharing our 100% natural Ayurvedic skincare and haircare powders."
        keywords="affiliate program, earn commission, Ayurvedic beauty affiliate, natural skincare affiliate, influencer program"
        url="/affiliate-program"
      />

      {/* Animated background */}
      <div style={themeStyles.bgLayer}>
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div
          className="af-orb-1"
          style={themeStyles.bgOrb1}
          aria-hidden="true"
        />
        <div
          className="af-orb-2"
          style={themeStyles.bgOrb2}
          aria-hidden="true"
        />
        <div
          className="af-orb-3"
          style={themeStyles.bgOrb3}
          aria-hidden="true"
        />
      </div>

      {/* Hero */}
      <div style={themeStyles.hero}>
        <div style={themeStyles.heroContent}>
          <div style={themeStyles.heroBadge}>
            <FaHandshake style={{ fontSize: "0.75rem" }} />
            Affiliate Program
          </div>
          <h1 style={themeStyles.heroTitle}>
            Share the Goodness of Nature
            <span style={themeStyles.heroTitleAccent} aria-hidden="true" />
          </h1>
          <p style={themeStyles.heroSubtitle}>
            Join the ASudha Beauty affiliate family! Turn your passion for
            Ayurvedic, 100% natural skincare and haircare into rewards. Share
            our herbal powders and earn generous commissions on every sale you
            inspire.
          </p>
          <div style={themeStyles.heroButtons}>
            <a
              href="#apply"
              style={themeStyles.ctaButton}
              className="af-cta-primary"
            >
              Join Now <FaHeart />
            </a>
            <a
              href="#benefits"
              style={themeStyles.secondaryButton}
              className="af-cta-secondary"
            >
              Learn More <FaArrowRight />
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={themeStyles.section}>
        <div style={themeStyles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} style={themeStyles.statCard} className="af-stat-card">
              <div style={themeStyles.statCardAccent} />
              <div style={themeStyles.statNumber}>{stat.number}</div>
              <div style={themeStyles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div id="benefits" style={themeStyles.section}>
        <div style={themeStyles.sectionTitleRow}>
          <h2 style={themeStyles.sectionTitle}>Why Partner With Us?</h2>
          <div style={themeStyles.sectionTitleUnderline} />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Grow your income while spreading the joy of pure, chemical-free
          Ayurvedic beauty.
        </p>
        <div style={themeStyles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={themeStyles.benefitCard}
              className="af-benefit-card"
            >
              <div style={themeStyles.benefitCardAccent} />
              <div
                style={{
                  ...themeStyles.benefitIconWrap,
                  background: `linear-gradient(135deg, ${benefit.color}, ${benefit.color}dd)`,
                }}
                className="af-benefit-icon"
              >
                {benefit.icon}
              </div>
              <h3 style={themeStyles.benefitTitle}>{benefit.title}</h3>
              <p style={themeStyles.benefitDescription}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ideal For */}
      <div style={themeStyles.section}>
        <div style={themeStyles.sectionTitleRow}>
          <h2 style={themeStyles.sectionTitle}>Perfect For</h2>
          <div style={themeStyles.sectionTitleUnderline} />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Whether you&apos;re a content creator, blogger, or beauty enthusiast
          — we&apos;d love to work with you.
        </p>
        <div style={themeStyles.platformsGrid}>
          {platforms.map((platform, index) => (
            <div
              key={index}
              style={themeStyles.platformCard}
              className="af-platform-card"
            >
              <div
                style={{
                  ...themeStyles.platformCardAccent,
                  background: platform.color,
                }}
              />
              <div
                style={{
                  ...themeStyles.platformIcon,
                  color: platform.color,
                }}
                className="af-platform-icon"
              >
                {platform.icon}
              </div>
              <div style={themeStyles.platformName}>{platform.name}</div>
              <div style={themeStyles.platformFollowers}>
                {platform.followers} followers
              </div>
            </div>
          ))}
        </div>
        <p style={themeStyles.platformsNote}>
          + Lifestyle Bloggers, Clean Beauty Enthusiasts, Herbalists, and more!
        </p>
      </div>

      {/* How It Works */}
      <div style={themeStyles.section}>
        <div style={themeStyles.sectionTitleRow}>
          <h2 style={themeStyles.sectionTitle}>How It Works</h2>
          <div style={themeStyles.sectionTitleUnderline} />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Getting started is simple. Follow these four easy steps to begin your
          journey with us.
        </p>
        <div style={themeStyles.stepsGrid}>
          {steps.map((item, index) => (
            <div
              key={index}
              style={themeStyles.stepCard}
              className="af-step-card"
            >
              <div style={themeStyles.stepCardAccent} />
              <div style={themeStyles.stepNumber} className="af-step-number">
                {item.step}
              </div>
              <h3 style={themeStyles.stepTitle}>{item.title}</h3>
              <p style={themeStyles.stepDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div style={themeStyles.section}>
        <div style={themeStyles.sectionTitleRow}>
          <h2 style={themeStyles.sectionTitle}>Frequently Asked Questions</h2>
          <div style={themeStyles.sectionTitleUnderline} />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Everything you need to know about the ASudha Beauty affiliate
          program.
        </p>
        {faqs.map((faq, index) => {
          const isOpen = activeFaq === index;
          return (
            <div key={index} style={themeStyles.faqItem}>
              <div
                style={themeStyles.faqHeader}
                className="af-faq-header"
                onClick={() => toggleFaq(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFaq(index);
                  }
                }}
                aria-expanded={isOpen}
              >
                <span style={themeStyles.faqQuestion}>{faq.q}</span>
                <span
                  style={{
                    ...themeStyles.faqIconWrap,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <FaChevronDown />
                </span>
              </div>
              {isOpen && (
                <div style={themeStyles.faqAnswer} className="af-faq-answer">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Application Form */}
      <div id="apply" style={themeStyles.section}>
        <div style={themeStyles.sectionTitleRow}>
          <h2 style={themeStyles.sectionTitle}>Become an ASudha Affiliate</h2>
          <div style={themeStyles.sectionTitleUnderline} />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Ready to share the power of nature? Fill out the form below and our
          team will get back to you within 48 hours.
        </p>
        <div style={themeStyles.formContainer}>
          <div style={themeStyles.formAccentBar} />
          <form onSubmit={handleSubmit}>
            <div style={themeStyles.formGrid}>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  style={themeStyles.input}
                  className="af-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  style={themeStyles.input}
                  className="af-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@email.com"
                  required
                />
              </div>
            </div>

            <div style={themeStyles.formGroupFull}>
              <label style={themeStyles.label}>
                Website / Social Media Profile *
              </label>
              <input
                type="url"
                name="website"
                style={themeStyles.input}
                className="af-input"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://..."
                required
              />
            </div>

            <div style={themeStyles.formGrid}>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>Primary Platform *</label>
                <select
                  name="platform"
                  style={themeStyles.select}
                  className="af-input"
                  value={formData.platform}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your platform</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="facebook">Facebook</option>
                  <option value="blog">Blog / Website</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>Audience Size *</label>
                <select
                  name="audienceSize"
                  style={themeStyles.select}
                  className="af-input"
                  value={formData.audienceSize}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select audience size</option>
                  <option value="100-500">100 - 500 followers</option>
                  <option value="500-1k">500 - 1K followers</option>
                  <option value="1k-5k">1K - 5K followers</option>
                  <option value="5k+">5K+ followers</option>
                </select>
              </div>
            </div>

            <div style={themeStyles.formGroupFull}>
              <label style={themeStyles.label}>
                Why do you want to join? *
              </label>
              <textarea
                name="reason"
                style={themeStyles.textarea}
                className="af-input"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Tell us your passion for Ayurveda and how you plan to promote ASudha Beauty..."
                required
              />
            </div>

            <button
              type="submit"
              style={themeStyles.submitButton}
              className="af-submit-btn"
            >
              <FaPenNib /> Submit Application
            </button>

            {formSubmitted && (
              <div style={themeStyles.successMessage}>
                <FaCheckCircle /> Application submitted successfully!
                We&apos;ll contact you within 48 hours.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Contact */}
      <div style={themeStyles.section}>
        <div style={themeStyles.contactSection}>
          <div style={themeStyles.contactAccentBar} />
          <div style={themeStyles.contactIconWrap}>
            <FaHandshake />
          </div>
          <h3 style={themeStyles.contactTitle}>
            Questions About the Program?
          </h3>
          <p style={themeStyles.contactText}>
            Our affiliate team is here to help! Reach out anytime.
          </p>
          <div style={themeStyles.contactButtons}>
            <a
              href="mailto:asudhabeauty@gmail.com"
              style={themeStyles.ctaButton}
              className="af-cta-primary"
            >
              <FaEnvelope /> asudhabeauty@gmail.com
            </a>
            <a
              href="https://wa.me/917518217726"
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.secondaryButton}
              className="af-cta-secondary"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;