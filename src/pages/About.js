import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";
import {
  FaLeaf,
  FaShieldAlt,
  FaUsers,
  FaGem,
  FaSpa,
  FaHandHoldingHeart,
  FaSeedling,
  FaStar,
  FaQuoteLeft,
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
const DARK_SHADOW_LIFT = "0 24px 50px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 24px 50px rgba(62, 39, 35, 0.12)";

const About = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [isVisible, setIsVisible] = useState({
    story: false,
    mission: false,
    values: false,
    team: false,
  });

  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setIsVisible((prev) => ({ ...prev, [id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const sections = ["story", "mission", "values", "team"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
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
    goldSoft: "rgba(212, 175, 55, 0.12)",
    pinkSoft: "rgba(245, 52, 107, 0.12)",
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
    goldSoft: "rgba(212, 175, 55, 0.08)",
    pinkSoft: "rgba(245, 52, 107, 0.06)",
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;
  const isTeamStack = windowWidth <= 820;

  const values = [
    {
      icon: <FaLeaf />,
      title: "100% Purity",
      description:
        "100% natural, chemical-free powders. We believe in the raw power of nature, just as it is.",
      color: brandColors.green,
    },
    {
      icon: <FaSpa />,
      title: "Ayurvedic Wisdom",
      description:
        "Rooted in ancient Indian wellness, we use time-tested herbal remedies for modern beauty.",
      color: isDarkMode ? brandColors.gold : brandColors.goldDark,
    },
    {
      icon: <FaShieldAlt />,
      title: "Uncompromising Trust",
      description:
        "Transparency and authenticity are our foundation. No hidden chemicals, no false promises.",
      color: brandColors.primary,
    },
    {
      icon: <FaSeedling />,
      title: "Sustainable Soul",
      description:
        "We prioritize eco-friendly practices and ethical sourcing to protect our planet.",
      color: brandColors.green,
    },
    {
      icon: <FaUsers />,
      title: "Radical Inclusivity",
      description:
        "Our Ayurvedic powders are crafted for every skin type and hair texture—naturally.",
      color: isDarkMode ? "#b39ddb" : brandColors.earthLight,
    },
    {
      icon: <FaGem />,
      title: "Herbal Excellence",
      description:
        "We don't just sell powders; we craft premium, effective, and herbal beauty essentials.",
      color: brandColors.primary,
    },
  ];

  const stats = [
    { number: "6+", label: "Herbal Powders" },
    { number: "5000+", label: "Happy Customers" },
    { number: "100%", label: "Natural & Cruelty Free" },
    { number: "24/7", label: "Ayurvedic Support" },
  ];

  const team = [
    {
      name: "Ashram Mishra",
      role: "Founder & CEO",
      image: "/assets/images/founders/ashram.jpeg",
      fallback: "A",
      quote: "Bringing ancient wisdom to modern beauty.",
      bio: "Guided by a lifelong love for Ayurveda, Ashram founded ASudha Beauty with a simple mission — to make pure, chemical-free herbal beauty accessible to every home in India.",
    },
  ];

  const handleImageError = (key) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  // ─── Injected CSS ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-about-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-about-styles", "true");
    style.textContent = `
      @keyframes aboutFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(40px, -30px) scale(1.08); }
      }
      @keyframes aboutFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-35px, 25px) scale(1.06); }
      }
      @keyframes aboutRingSpin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes aboutRingSpinSlow {
        from { transform: translate(-50%, -50%) rotate(360deg); }
        to { transform: translate(-50%, -50%) rotate(0deg); }
      }
      @keyframes aboutPulseDot {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.4); opacity: 0.6; }
      }
      @keyframes aboutConicSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes aboutFloatLeaf {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      @keyframes aboutShimmer {
        0% { background-position: 200% center; }
        100% { background-position: -200% center; }
      }

      .about-orb-1 { animation: aboutFloat1 14s ease-in-out infinite; }
      .about-orb-2 { animation: aboutFloat2 18s ease-in-out infinite; }
      .about-hero-ring { animation: aboutRingSpin 40s linear infinite; }
      .about-hero-ring-2 { animation: aboutRingSpinSlow 60s linear infinite; }

      /* Rotating conic glow behind hero */
      .about-hero-conic {
        animation: aboutConicSpin 30s linear infinite;
      }
      .about-cta-leaf {
        animation: aboutFloatLeaf 4s ease-in-out infinite;
      }

      .about-stat-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .about-stat-card:hover {
        transform: translateY(-6px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode ? "rgba(212, 175, 55, 0.4)" : "rgba(199, 125, 66, 0.3)"
        } !important;
      }

      .about-mission-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .about-mission-card:hover {
        transform: translateY(-5px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode ? "rgba(212, 175, 55, 0.4)" : "rgba(199, 125, 66, 0.3)"
        } !important;
      }
      .about-mission-card:hover .about-mission-icon {
        transform: scale(1.1) rotate(-6deg);
      }
      .about-mission-icon {
        transition: transform 0.35s ease;
      }

      .about-value-card {
        transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.45s ease, border-color 0.3s ease;
      }
      .about-value-card:hover {
        transform: translateY(-8px);
        box-shadow: ${T.shadowLift};
        border-color: rgba(212, 175, 55, 0.45) !important;
      }
      .about-value-card:hover .about-value-icon {
        transform: scale(1.12) rotate(-8deg);
      }
      .about-value-card:hover .about-value-number {
        opacity: 1;
        transform: translateY(0);
      }
      .about-value-card:hover .about-value-ring {
        opacity: 1;
        transform: scale(1);
      }
      .about-value-icon {
        transition: transform 0.4s ease;
      }
      .about-value-number {
        transition: opacity 0.4s ease, transform 0.4s ease;
        opacity: 0;
        transform: translateY(-4px);
      }
      /* decorative ring that scales in on hover */
      .about-value-ring {
        transition: opacity 0.5s ease, transform 0.5s ease;
        opacity: 0;
        transform: scale(0.8);
      }

      .about-team-card {
        transition: transform 0.4s ease, box-shadow 0.4s ease,
                    border-color 0.3s ease;
      }
      .about-team-card:hover {
        transform: translateY(-6px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode ? "rgba(212, 175, 55, 0.4)" : "rgba(199, 125, 66, 0.3)"
        } !important;
      }
      .about-team-card:hover .about-team-photo img {
        transform: scale(1.05);
      }
      .about-team-photo img {
        transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .about-pulse-dot {
        animation: aboutPulseDot 2s ease-in-out infinite;
      }

      .about-story-image img {
        transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .about-story-image:hover img {
        transform: scale(1.05);
      }

      .about-cta-btn {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s ease, gap 0.3s ease;
      }
      .about-cta-btn:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 44px rgba(245, 52, 107, 0.5);
        gap: 0.8rem;
      }

      /* Signature shimmer text for the founder chip dot ring */
      .about-shimmer {
        background: linear-gradient(
          90deg,
          ${brandColors.gold} 0%,
          ${brandColors.primary} 50%,
          ${brandColors.gold} 100%
        );
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: aboutShimmer 4s linear infinite;
      }

      /* Responsive: stack on mobile */
      @media (max-width: 820px) {
        .about-team-inner {
          grid-template-columns: 1fr !important;
        }
        .about-team-photo {
          order: -1;
          height: 380px !important;
          min-height: unset !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-about-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const themeStyles = {
    // ─── Page wrapper ───
    container: {
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100%",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
      overflowX: "hidden",
      position: "relative",
    },

    // ─── HERO ───
    hero: {
      position: "relative",
      background: isDarkMode
        ? `linear-gradient(160deg, #1a1212 0%, ${brandColors.black} 60%, #120a0a 100%)`
        : `linear-gradient(160deg, #fbf3ec 0%, ${brandColors.cream} 60%, #f7efe8 100%)`,
      padding: isNarrow ? "5rem 1.25rem 4rem" : "7.5rem 2rem 6.5rem",
      textAlign: "center",
      overflow: "hidden",
      borderBottom: `1px solid ${T.borderSoft}`,
    },
    heroOrb1: {
      position: "absolute",
      top: "-180px",
      left: "-180px",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(245, 52, 107, 0.35) 0%, transparent 70%)",
      filter: "blur(80px)",
      pointerEvents: "none",
      opacity: isDarkMode ? 0.6 : 0.45,
    },
    heroOrb2: {
      position: "absolute",
      bottom: "-180px",
      right: "-180px",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(212, 175, 55, 0.35) 0%, transparent 70%)",
      filter: "blur(80px)",
      pointerEvents: "none",
      opacity: isDarkMode ? 0.6 : 0.45,
    },
    // Rotating conic gradient halo behind the hero title
    heroConic: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "900px",
      height: "900px",
      maxWidth: "120vw",
      maxHeight: "120vw",
      borderRadius: "50%",
      background: isDarkMode
        ? "conic-gradient(from 0deg, rgba(245, 52, 107, 0.0) 0deg, rgba(245, 52, 107, 0.12) 90deg, rgba(212, 175, 55, 0.0) 180deg, rgba(212, 175, 55, 0.12) 270deg, rgba(245, 52, 107, 0.0) 360deg)"
        : "conic-gradient(from 0deg, rgba(245, 52, 107, 0.0) 0deg, rgba(245, 52, 107, 0.08) 90deg, rgba(212, 175, 55, 0.0) 180deg, rgba(212, 175, 55, 0.08) 270deg, rgba(245, 52, 107, 0.0) 360deg)",
      filter: "blur(60px)",
      pointerEvents: "none",
      zIndex: 0,
    },
    heroRing: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "780px",
      height: "780px",
      maxWidth: "110vw",
      maxHeight: "110vw",
      borderRadius: "50%",
      border: `1px dashed ${
        isDarkMode ? "rgba(212, 175, 55, 0.18)" : "rgba(199, 125, 66, 0.15)"
      }`,
      pointerEvents: "none",
      zIndex: 1,
    },
    heroRingInner: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "560px",
      height: "560px",
      maxWidth: "85vw",
      maxHeight: "85vw",
      borderRadius: "50%",
      border: `1px dashed ${
        isDarkMode ? "rgba(245, 52, 107, 0.14)" : "rgba(199, 125, 66, 0.12)"
      }`,
      pointerEvents: "none",
      zIndex: 1,
    },
    // subtle dot grid
    heroGrid: {
      position: "absolute",
      inset: 0,
      backgroundImage: isDarkMode
        ? "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)"
        : "radial-gradient(rgba(62,39,35,0.05) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
      maskImage:
        "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
      WebkitMaskImage:
        "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
      pointerEvents: "none",
      zIndex: 0,
    },
    heroPattern: {
      position: "absolute",
      inset: 0,
      backgroundImage: isDarkMode
        ? `radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.10) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(245, 52, 107, 0.10) 0%, transparent 50%)`
        : `radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.10) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(245, 52, 107, 0.08) 0%, transparent 50%)`,
      pointerEvents: "none",
    },
    heroContent: {
      maxWidth: "900px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },
    heroEyebrow: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      padding: "0.5rem 1.25rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.14)"
        : "rgba(212, 175, 55, 0.1)",
      borderRadius: "50px",
      fontSize: "0.72rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
      marginBottom: "1.75rem",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.32)" : "rgba(199, 125, 66, 0.2)"
      }`,
      fontWeight: "800",
      letterSpacing: "1px",
      textTransform: "uppercase",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },
    heroTitle: {
      fontSize: isMobile ? "2.25rem" : isNarrow ? "3rem" : "4.5rem",
      fontWeight: "900",
      marginBottom: "1.75rem",
      color: T.text,
      lineHeight: "1.05",
      letterSpacing: "-0.7px",
      position: "relative",
      display: "inline-block",
      paddingBottom: "1rem",
    },
    heroTitleAccent: {
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
      width: "140px",
      height: "4px",
      borderRadius: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
    },
    heroText: {
      fontSize: isMobile ? "1rem" : "1.18rem",
      color: T.textMuted,
      lineHeight: "1.85",
      marginBottom: "2rem",
      maxWidth: "680px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    heroStats: {
      display: "grid",
      gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`,
      gap: "1rem",
      marginTop: "3.5rem",
    },
    statCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      padding: isMobile ? "1.35rem 0.85rem" : "1.85rem 1.15rem",
      borderRadius: "22px",
      boxShadow: T.shadow,
      transition: "transform 0.35s ease, box-shadow 0.35s ease",
      border: `1px solid ${T.border}`,
      cursor: "default",
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
      fontSize: isMobile ? "1.65rem" : "2.1rem",
      fontWeight: "900",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      marginBottom: "0.45rem",
      lineHeight: "1.1",
      letterSpacing: "-0.5px",
    },
    statLabel: {
      fontSize: isMobile ? "0.72rem" : "0.82rem",
      color: T.textMuted,
      fontWeight: "700",
      letterSpacing: "0.3px",
    },

    // ─── STORY ───
    storySection: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isNarrow ? "3.5rem 1.25rem" : "6.5rem 2rem",
      display: "grid",
      gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr",
      gap: isNarrow ? "2.5rem" : "5rem",
      alignItems: "center",
      opacity: isVisible.story ? 1 : 0,
      transform: isVisible.story ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    storyBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: "0.45rem 1.15rem",
      backgroundColor: isDarkMode ? T.goldSoft : "rgba(199, 125, 66, 0.08)",
      borderRadius: "50px",
      fontSize: "0.68rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      fontWeight: "800",
      marginBottom: "1.5rem",
    },
    storyTitle: {
      fontSize: isMobile ? "2rem" : "2.85rem",
      fontWeight: "900",
      marginBottom: "1.5rem",
      color: T.text,
      lineHeight: "1.1",
      letterSpacing: "-0.6px",
    },
    storyText: {
      fontSize: "1.05rem",
      color: T.textMuted,
      lineHeight: "1.9",
      marginBottom: "1.35rem",
    },
    storyHighlight: {
      fontSize: "1.05rem",
      fontWeight: "600",
      color: isDarkMode ? T.gold : brandColors.bronze,
      marginTop: "2rem",
      padding: "1.6rem 1.85rem",
      backgroundColor: isDarkMode ? T.goldSoft : "rgba(199, 125, 66, 0.06)",
      borderRadius: "20px",
      borderLeft: `4px solid ${isDarkMode ? T.gold : brandColors.bronze}`,
      display: "flex",
      alignItems: "flex-start",
      gap: "1.1rem",
      fontStyle: "italic",
      lineHeight: "1.75",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      position: "relative",
    },
    // Corner flourish on the highlight block
    storyHighlightCorner: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      boxShadow: "0 6px 16px rgba(245, 52, 107, 0.35)",
    },
    storyImageContainer: {
      position: "relative",
      width: "100%",
      borderRadius: "28px",
      boxShadow: T.shadowLift,
      overflow: "hidden",
    },
    // Offset gold frame behind the story image
    storyImageFrame: {
      position: "absolute",
      inset: "-14px -14px auto auto",
      width: "60%",
      height: "60%",
      borderRadius: "28px",
      border: `2px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.35)" : "rgba(199, 125, 66, 0.28)"
      }`,
      pointerEvents: "none",
      zIndex: 0,
    },
    storyImage: {
      position: "relative",
      width: "100%",
      height: "auto",
      objectFit: "cover",
      objectPosition: "center",
      display: "block",
      maxWidth: "100%",
      zIndex: 1,
    },
    storyImageOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "2.25rem 1.85rem 1.65rem",
      background:
        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
      color: "#ffffff",
      zIndex: 2,
    },
    storyImageText: {
      fontSize: "1.2rem",
      fontWeight: "800",
      marginBottom: "0.35rem",
      letterSpacing: "0.2px",
    },
    storyImageSub: { fontSize: "0.9rem", opacity: 0.9 },

    // ─── MISSION ───
    missionSection: {
      backgroundColor: T.bgAlt,
      padding: isNarrow ? "3.5rem 1.25rem" : "6.5rem 2rem",
      borderTop: `1px solid ${T.borderSoft}`,
      borderBottom: `1px solid ${T.borderSoft}`,
      opacity: isVisible.mission ? 1 : 0,
      transform: isVisible.mission ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s",
    },
    missionContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr",
      gap: "1.75rem",
      alignItems: "stretch",
    },
    missionCard: {
      backgroundColor: T.card,
      padding: isMobile ? "2.5rem 1.85rem" : "3.25rem 2.75rem",
      borderRadius: "26px",
      boxShadow: T.shadow,
      border: `1px solid ${T.border}`,
      transition: "transform 0.35s ease, box-shadow 0.35s ease",
      position: "relative",
      overflow: "hidden",
    },
    missionAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.9,
    },
    // Big faded number in the corner
    missionNumber: {
      position: "absolute",
      top: "0.5rem",
      right: "1.25rem",
      fontSize: "6rem",
      fontWeight: "900",
      lineHeight: 1,
      color: isDarkMode
        ? "rgba(212, 175, 55, 0.06)"
        : "rgba(199, 125, 66, 0.07)",
      fontFamily: "Georgia, serif",
      pointerEvents: "none",
      userSelect: "none",
    },
    missionIconWrap: {
      width: "68px",
      height: "68px",
      borderRadius: "20px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.6rem",
      marginBottom: "1.6rem",
      boxShadow: "0 16px 36px rgba(245, 52, 107, 0.38)",
      position: "relative",
      zIndex: 1,
    },
    missionTitle: {
      fontSize: "1.7rem",
      fontWeight: "900",
      marginBottom: "1.1rem",
      color: T.text,
      letterSpacing: "-0.4px",
      position: "relative",
      zIndex: 1,
    },
    missionText: {
      fontSize: "1.05rem",
      color: T.textMuted,
      lineHeight: "1.85",
      marginBottom: 0,
      position: "relative",
      zIndex: 1,
    },

    // ─── VALUES ───
    valuesSection: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isNarrow ? "3.5rem 1.25rem" : "6.5rem 2rem",
      opacity: isVisible.values ? 1 : 0,
      transform: isVisible.values ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.25s",
    },
    sectionTitleRow: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "1rem",
    },
    sectionTitle: {
      fontSize: isMobile ? "2rem" : "2.85rem",
      textAlign: "center",
      fontWeight: "900",
      margin: 0,
      color: T.text,
      letterSpacing: "-0.6px",
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
      fontSize: "1.05rem",
      maxWidth: "640px",
      margin: "1.35rem auto 3.5rem",
      lineHeight: "1.75",
    },
    valuesGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isNarrow
        ? "repeat(2, 1fr)"
        : "repeat(3, 1fr)",
      gap: "1.5rem",
    },
    valueCard: {
      backgroundColor: T.card,
      padding: "2.5rem 1.85rem",
      borderRadius: "24px",
      boxShadow: T.shadow,
      transition:
        "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.45s ease, border-color 0.3s ease",
      border: `1px solid ${T.border}`,
      textAlign: "center",
      cursor: "default",
      position: "relative",
      overflow: "hidden",
    },
    valueCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.85,
    },
    // Decorative inner ring that scales in on hover
    valueRing: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      border: `1px dashed ${
        isDarkMode ? "rgba(212, 175, 55, 0.22)" : "rgba(199, 125, 66, 0.18)"
      }`,
      pointerEvents: "none",
    },
    valueNumber: {
      position: "absolute",
      top: "1rem",
      right: "1.15rem",
      fontSize: "0.65rem",
      fontWeight: "900",
      color: isDarkMode ? T.gold : brandColors.bronze,
      letterSpacing: "1.2px",
      opacity: 0,
    },
    valueIconHalo: {
      width: "76px",
      height: "76px",
      margin: "0 auto 1.5rem",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.8rem",
      position: "relative",
      zIndex: 1,
    },
    valueTitle: {
      fontSize: "1.18rem",
      fontWeight: "900",
      marginBottom: "0.8rem",
      color: T.text,
      letterSpacing: "-0.2px",
      position: "relative",
      zIndex: 1,
    },
    valueDescription: {
      fontSize: "0.94rem",
      color: T.textMuted,
      lineHeight: "1.75",
      margin: 0,
      position: "relative",
      zIndex: 1,
    },

    // ─── TEAM ───
    teamSection: {
      position: "relative",
      backgroundColor: T.bgAlt,
      padding: isNarrow ? "3.5rem 1.25rem" : "6.5rem 2rem",
      borderTop: `1px solid ${T.borderSoft}`,
      opacity: isVisible.team ? 1 : 0,
      transform: isVisible.team ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.35s",
      overflow: "hidden",
    },
    teamOrb: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "700px",
      height: "700px",
      maxWidth: "90vw",
      maxHeight: "90vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at center, rgba(245, 52, 107, 0.14) 0%, rgba(212, 175, 55, 0.06) 40%, transparent 70%)",
      filter: "blur(60px)",
      pointerEvents: "none",
      zIndex: 0,
    },
    teamContainer: {
      maxWidth: "1100px",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
    },
    teamGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "2rem",
      marginTop: "1rem",
      maxWidth: "960px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    teamCard: {
      position: "relative",
      padding: 0,
      backgroundColor: T.card,
      borderRadius: "28px",
      boxShadow: T.shadowLift,
      transition: "transform 0.4s ease, box-shadow 0.4s ease",
      border: `1px solid ${T.border}`,
      overflow: "hidden",
    },
    teamAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.95,
      zIndex: 3,
    },
    teamInner: {
      display: "grid",
      gridTemplateColumns: isTeamStack ? "1fr" : "1.1fr 0.9fr",
      alignItems: "stretch",
    },
    teamContent: {
      padding: isMobile ? "2.25rem 1.75rem" : "3rem 2.75rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      zIndex: 1,
    },
    // ✅ Fixed-height photo column so the card fits nicely
    teamPhoto: {
      position: "relative",
      height: isTeamStack ? "420px" : "520px",
      overflow: "hidden",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      order: isTeamStack ? -1 : 1,
    },
    teamPhotoImg: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center 30%",
      display: "block",
    },
    teamPhotoOverlay: {
      position: "absolute",
      inset: 0,
      background: isDarkMode
        ? "linear-gradient(90deg, rgba(26,26,26,0.5) 0%, rgba(26,26,26,0) 40%, rgba(26,26,26,0.1) 100%)"
        : "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.05) 100%)",
      pointerEvents: "none",
      zIndex: 1,
    },
    // Warm gradient wash at the bottom of the photo
    teamPhotoGradient: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "40%",
      background: isDarkMode
        ? "linear-gradient(to top, rgba(26,26,26,0.55), transparent)"
        : "linear-gradient(to top, rgba(252,248,245,0.55), transparent)",
      pointerEvents: "none",
      zIndex: 1,
    },
    teamPhotoFallback: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "6rem",
      fontWeight: "900",
      color: isDarkMode ? T.gold : brandColors.bronze,
      background: `linear-gradient(135deg, ${
        isDarkMode ? "#222222" : "#f5f0eb"
      }, ${isDarkMode ? "#1a1a1a" : "#ede3db"})`,
    },
    teamChip: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.4rem 0.95rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.1)",
      color: brandColors.green,
      borderRadius: "50px",
      fontSize: "0.7rem",
      fontWeight: "800",
      letterSpacing: "0.6px",
      textTransform: "uppercase",
      marginBottom: "1.35rem",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.28)" : "rgba(76, 175, 80, 0.2)"
      }`,
      width: "fit-content",
    },
    teamChipDot: {
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      backgroundColor: brandColors.green,
      display: "inline-block",
      flexShrink: 0,
    },
    teamName: {
      fontSize: isMobile ? "1.65rem" : "2.15rem",
      fontWeight: "900",
      marginBottom: "0.45rem",
      color: T.text,
      letterSpacing: "-0.4px",
      lineHeight: "1.15",
    },
    teamRole: {
      fontSize: "0.92rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
      marginBottom: "1.5rem",
      fontWeight: "800",
      letterSpacing: "0.6px",
      textTransform: "uppercase",
    },
    teamBio: {
      fontSize: "1rem",
      color: T.textMuted,
      lineHeight: "1.85",
      marginBottom: "1.65rem",
      marginTop: 0,
    },
    teamQuote: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.7rem",
      fontSize: "0.98rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
      fontStyle: "italic",
      padding: "1.1rem 1.4rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.08)"
        : "rgba(212, 175, 55, 0.06)",
      borderRadius: "18px",
      lineHeight: "1.7",
      fontWeight: "600",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(212, 175, 55, 0.15)"
      }`,
    },
    quoteIcon: {
      fontSize: "0.9rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
      opacity: 0.85,
      flexShrink: 0,
      marginTop: "0.2rem",
    },
    // Signature strip under the founder content
    teamSignature: {
      marginTop: "1.6rem",
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      color: T.textMuted,
      fontSize: "0.78rem",
      fontWeight: "700",
      letterSpacing: "1.4px",
      textTransform: "uppercase",
    },
    teamSignatureLine: {
      flex: 1,
      height: "1px",
      background: isDarkMode
        ? "linear-gradient(90deg, rgba(212,175,55,0.35), transparent)"
        : "linear-gradient(90deg, rgba(199,125,66,0.35), transparent)",
    },

    // ─── CTA ───
    ctaSection: {
      position: "relative",
      background: isDarkMode
        ? `linear-gradient(160deg, #1a1212 0%, ${brandColors.black} 60%, #120a0a 100%)`
        : `linear-gradient(160deg, #fbf3ec 0%, ${brandColors.cream} 60%, #f7efe8 100%)`,
      padding: isNarrow ? "4.5rem 1.25rem" : "7rem 2rem",
      textAlign: "center",
      color: T.text,
      borderTop: `1px solid ${T.borderSoft}`,
      overflow: "hidden",
    },
    ctaOrb: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "640px",
      height: "640px",
      maxWidth: "90vw",
      maxHeight: "90vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at center, rgba(212, 175, 55, 0.18) 0%, transparent 65%)",
      filter: "blur(60px)",
      pointerEvents: "none",
    },
    ctaRing: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "520px",
      height: "520px",
      maxWidth: "100vw",
      maxHeight: "100vw",
      borderRadius: "50%",
      border: `1px dashed ${
        isDarkMode ? "rgba(212, 175, 55, 0.16)" : "rgba(199, 125, 66, 0.14)"
      }`,
      pointerEvents: "none",
    },
    ctaRingInner: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "380px",
      height: "380px",
      maxWidth: "80vw",
      maxHeight: "80vw",
      borderRadius: "50%",
      border: `1px dashed ${
        isDarkMode ? "rgba(245, 52, 107, 0.14)" : "rgba(199, 125, 66, 0.12)"
      }`,
      pointerEvents: "none",
    },
    ctaContent: {
      position: "relative",
      zIndex: 2,
      maxWidth: "720px",
      margin: "0 auto",
    },
    ctaBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: "0.45rem 1.25rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.14)"
        : "rgba(212, 175, 55, 0.1)",
      borderRadius: "50px",
      fontSize: "0.7rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      fontWeight: "800",
      marginBottom: "1.5rem",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.32)" : "rgba(199, 125, 66, 0.18)"
      }`,
    },
    ctaTitle: {
      fontSize: isMobile ? "2rem" : "2.85rem",
      fontWeight: "900",
      marginBottom: "1rem",
      color: T.text,
      letterSpacing: "-0.6px",
      lineHeight: "1.12",
    },
    ctaText: {
      fontSize: isMobile ? "1rem" : "1.15rem",
      marginBottom: "2.25rem",
      color: T.textMuted,
      lineHeight: "1.75",
    },
    ctaButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6rem",
      padding: "1.15rem 2.6rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontSize: "1.05rem",
      fontWeight: "800",
      boxShadow: "0 14px 34px rgba(245, 52, 107, 0.4)",
      letterSpacing: "0.3px",
      fontFamily: "inherit",
    },
    ctaLeaf: {
      fontSize: "1.8rem",
      marginBottom: "1rem",
      lineHeight: 1,
    },
  };

  return (
    <div style={themeStyles.container}>
      <SEO
        title="About Us | ASudha Beauty"
        description="Learn about ASudha Beauty — rooted in Ayurvedic wisdom, delivering 100% natural, chemical-free herbal skincare and hair care powders from Gorakhpur, India."
        keywords="about ASudha Beauty, Ayurvedic brand, natural skincare brand, chemical-free beauty, Gorakhpur"
        url="/about"
      />

      {/* ─── HERO ─── */}
      <section style={themeStyles.hero}>
        <div
          className="about-hero-conic"
          style={themeStyles.heroConic}
          aria-hidden="true"
        />
        <div style={themeStyles.heroGrid} aria-hidden="true" />
        <div
          className="about-orb-1"
          style={themeStyles.heroOrb1}
          aria-hidden="true"
        />
        <div
          className="about-orb-2"
          style={themeStyles.heroOrb2}
          aria-hidden="true"
        />
        <div
          className="about-hero-ring"
          style={themeStyles.heroRing}
          aria-hidden="true"
        />
        <div
          className="about-hero-ring-2"
          style={themeStyles.heroRingInner}
          aria-hidden="true"
        />
        <div style={themeStyles.heroPattern} />
        <div style={themeStyles.heroContent}>
          <div style={themeStyles.heroEyebrow}>
            <FaLeaf style={{ fontSize: "0.7rem" }} />
            Since 2026 • Gorakhpur, India
          </div>
          <h1 style={themeStyles.heroTitle}>
            Pure. Natural. You.
            <span style={themeStyles.heroTitleAccent} aria-hidden="true" />
          </h1>
          <p style={themeStyles.heroText}>
            Welcome to ASudha Beauty. Rooted in the ancient wisdom of Ayurveda,
            we bring you 100% natural, chemical-free herbal powders—crafted with
            love in Gorakhpur, India.
          </p>

          <div style={themeStyles.heroStats}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={themeStyles.statCard}
                className="about-stat-card"
              >
                <div style={themeStyles.statCardAccent} />
                <div style={themeStyles.statNumber}>{stat.number}</div>
                <div style={themeStyles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section id="story" style={themeStyles.storySection}>
        <div>
          <div style={themeStyles.storyBadge}>
            <FaSeedling style={{ fontSize: "0.65rem" }} /> Our Story
          </div>
          <h2 style={themeStyles.storyTitle}>Rooted in Nature</h2>
          <p style={themeStyles.storyText}>
            ASudha Beauty was born from a deep reverence for nature and a simple
            belief: true beauty comes from within, nurtured by the earth.
          </p>
          <p style={themeStyles.storyText}>
            From the heart of Uttar Pradesh, we source the finest natural
            ingredients— Multani Mitti, Amla, Reetha, Shikakai, and more—to
            create powders that cleanse, nourish, and revitalize without a
            single drop of chemicals.
          </p>
          <div style={themeStyles.storyHighlight}>
            <span
              style={themeStyles.storyHighlightCorner}
              aria-hidden="true"
            />
            <FaQuoteLeft
              style={{ fontSize: "1.4rem", opacity: 0.5, flexShrink: 0 }}
            />
            "Beauty isn't about masking imperfections; it's about revealing the
            natural radiance that has always been within you."
          </div>
        </div>
        <div
          style={themeStyles.storyImageContainer}
          className="about-story-image"
        >
          <div
            style={themeStyles.storyImageFrame}
            aria-hidden="true"
          />
          <img
            src="/assets/images/about/story.png"
            alt="ASudha Beauty - Natural Ayurvedic Powders"
            style={themeStyles.storyImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/800x600/fcf8f5/3e2723?text=ASudha+Beauty";
            }}
          />
          <div style={themeStyles.storyImageOverlay}>
            <div style={themeStyles.storyImageText}>✦ Herbal Traditions</div>
            <div style={themeStyles.storyImageSub}>
              Rooted in Ayurveda, crafted with care
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section id="mission" style={themeStyles.missionSection}>
        <div style={themeStyles.missionContainer}>
          <div style={themeStyles.missionCard} className="about-mission-card">
            <div style={themeStyles.missionAccent} />
            <span style={themeStyles.missionNumber} aria-hidden="true">
              01
            </span>
            <div
              style={themeStyles.missionIconWrap}
              className="about-mission-icon"
            >
              <FaHandHoldingHeart />
            </div>
            <h2 style={themeStyles.missionTitle}>Our Mission</h2>
            <p style={themeStyles.missionText}>
              To bring the timeless healing power of Ayurveda to your daily
              beauty routine. We craft every powder with 100% natural
              ingredients.
            </p>
          </div>
          <div style={themeStyles.missionCard} className="about-mission-card">
            <div
              style={{
                ...themeStyles.missionAccent,
                background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold})`,
              }}
            />
            <span style={themeStyles.missionNumber} aria-hidden="true">
              02
            </span>
            <div
              style={{
                ...themeStyles.missionIconWrap,
                background: `linear-gradient(135deg, ${brandColors.green}, #8bc34a)`,
                boxShadow: "0 16px 36px rgba(76, 175, 80, 0.32)",
              }}
              className="about-mission-icon"
            >
              <FaSpa />
            </div>
            <h2 style={themeStyles.missionTitle}>Our Vision</h2>
            <p style={themeStyles.missionText}>
              To become India's most trusted brand for Ayurvedic beauty
              powders—recognized for uncompromising purity and authentic
              formulations.
            </p>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section id="values" style={themeStyles.valuesSection}>
        <div style={themeStyles.sectionTitleRow}>
          <h2 style={themeStyles.sectionTitle}>Our Core Values</h2>
          <div style={themeStyles.sectionTitleUnderline} />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          These are the principles that guide everything we do—from sourcing
          ingredients to crafting your daily self-care ritual.
        </p>
        <div style={themeStyles.valuesGrid}>
          {values.map((value, index) => (
            <div
              key={index}
              style={themeStyles.valueCard}
              className="about-value-card"
            >
              <div style={themeStyles.valueCardAccent} />
              <div
                style={themeStyles.valueRing}
                className="about-value-ring"
                aria-hidden="true"
              />
              <span
                style={themeStyles.valueNumber}
                className="about-value-number"
              >
                0{index + 1}
              </span>
              <div
                style={{
                  ...themeStyles.valueIconHalo,
                  background: `${value.color}1f`,
                  color: value.color,
                  boxShadow: `0 14px 34px ${value.color}33`,
                }}
                className="about-value-icon"
              >
                {value.icon}
              </div>
              <h3 style={themeStyles.valueTitle}>{value.title}</h3>
              <p style={themeStyles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section id="team" style={themeStyles.teamSection}>
        <div style={themeStyles.teamOrb} aria-hidden="true" />
        <div style={themeStyles.teamContainer}>
          <div style={themeStyles.sectionTitleRow}>
            <h2 style={themeStyles.sectionTitle}>Rooted in Trust</h2>
            <div style={themeStyles.sectionTitleUnderline} />
          </div>
          <p style={themeStyles.sectionSubtitle}>
            Meet the passionate individual behind ASudha Beauty—dedicated to
            bringing you the purest Ayurvedic powders.
          </p>
          <div style={themeStyles.teamGrid}>
            {team.map((member, index) => (
              <div
                key={index}
                style={themeStyles.teamCard}
                className="about-team-card"
              >
                <div style={themeStyles.teamAccent} />
                <div style={themeStyles.teamInner} className="about-team-inner">
                  {/* Left: text content */}
                  <div style={themeStyles.teamContent}>
                    <div style={themeStyles.teamChip}>
                      <span
                        style={themeStyles.teamChipDot}
                        className="about-pulse-dot"
                      />
                      Verified Founder
                    </div>

                    <h3 style={themeStyles.teamName}>{member.name}</h3>
                    <p style={themeStyles.teamRole}>{member.role}</p>

                    {member.bio && (
                      <p style={themeStyles.teamBio}>{member.bio}</p>
                    )}

                    <div style={themeStyles.teamQuote}>
                      <FaQuoteLeft style={themeStyles.quoteIcon} />
                      <span>{member.quote}</span>
                    </div>

                    <div style={themeStyles.teamSignature}>
                      <span>ASudha Beauty</span>
                      <span style={themeStyles.teamSignatureLine} />
                    </div>
                  </div>

                  {/* Right: photo panel */}
                  <div
                    style={themeStyles.teamPhoto}
                    className="about-team-photo"
                  >
                    {!imgErrors[`team-${index}`] ? (
                      <>
                        <img
                          src={member.image}
                          alt={member.name}
                          style={themeStyles.teamPhotoImg}
                          onError={() => handleImageError(`team-${index}`)}
                        />
                        <div style={themeStyles.teamPhotoOverlay} />
                        <div style={themeStyles.teamPhotoGradient} />
                      </>
                    ) : (
                      <div style={themeStyles.teamPhotoFallback}>
                        {member.fallback}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={themeStyles.ctaSection}>
        <div style={themeStyles.ctaOrb} />
        <div style={themeStyles.ctaRing} aria-hidden="true" />
        <div style={themeStyles.ctaRingInner} aria-hidden="true" />
        <div style={themeStyles.ctaContent}>
          <div style={themeStyles.ctaBadge}>
            <FaStar style={{ fontSize: "0.6rem" }} /> Discover Nature's Best
          </div>
          <div style={themeStyles.ctaLeaf} className="about-cta-leaf">
            🌿
          </div>
          <h2 style={themeStyles.ctaTitle}>Experience the Power of Nature</h2>
          <p style={themeStyles.ctaText}>
            Discover our collection of 100% natural Ayurvedic powders—crafted
            for glowing skin, healthy hair, and a radiant you.
          </p>
          <Link
            to="/shop"
            style={themeStyles.ctaButton}
            className="about-cta-btn"
          >
            Explore Our Collection <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;