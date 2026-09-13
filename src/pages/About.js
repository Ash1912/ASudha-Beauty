import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
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

  // ─── SHADOW CONSTANTS (stable, no hook deps needed) ───
  const DARK_SHADOW_LIFT = "0 24px 50px rgba(0, 0, 0, 0.7)";
  const LIGHT_SHADOW_LIFT = "0 24px 50px rgba(62, 39, 35, 0.12)";

  // ─── DARK THEME TOKENS ───
  const dark = {
    bg: brandColors.black,
    bgAlt: "#141414",
    card: brandColors.darkSlate,
    cardAlt: "#222222",
    border: "rgba(212, 175, 55, 0.14)",
    borderSoft: "rgba(255, 255, 255, 0.06)",
    text: "#f5f0eb",
    textMuted: "#c9b8b0",
    textDim: "#8d7d76",
    gold: brandColors.gold,
    goldSoft: "rgba(212, 175, 55, 0.12)",
    pinkSoft: "rgba(245, 52, 107, 0.12)",
    shadowCard: "0 10px 30px rgba(0, 0, 0, 0.55)",
    shadowLift: DARK_SHADOW_LIFT,
  };

  // ─── LIGHT THEME TOKENS ───
  const light = {
    bg: brandColors.cream,
    bgAlt: "#ffffff",
    card: "#ffffff",
    cardAlt: "#f9f4f0",
    border: "rgba(62, 39, 35, 0.08)",
    borderSoft: "rgba(62, 39, 35, 0.04)",
    text: "#3e2723",
    textMuted: brandColors.earthLight,
    textDim: "#8d7d76",
    gold: brandColors.goldDark,
    goldSoft: "rgba(212, 175, 55, 0.08)",
    pinkSoft: "rgba(245, 52, 107, 0.06)",
    shadowCard: "0 10px 30px rgba(62, 39, 35, 0.06)",
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

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
    },
    {
      name: "Ashish Kumar Mishra",
      role: "Co-Founder & Head of Product",
      image: "/assets/images/founders/ashish.jpg",
      fallback: "A",
      quote: "Crafting nature's best for your well-being.",
    },
  ];

  const handleImageError = (key) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  // ─── STYLES ───
  const themeStyles = {
    container: {
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100%",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },

    // ─── HERO ───
    hero: {
      position: "relative",
      background: isDarkMode
        ? `linear-gradient(160deg, #1a1212 0%, ${brandColors.black} 60%, #120a0a 100%)`
        : `linear-gradient(160deg, #fbf3ec 0%, ${brandColors.cream} 60%, #f7efe8 100%)`,
      padding: isNarrow ? "4rem 1.25rem 3rem" : "6rem 2rem 5rem",
      textAlign: "center",
      overflow: "hidden",
      borderBottom: `1px solid ${T.borderSoft}`,
    },
    heroOrb1: {
      position: "absolute",
      top: "-180px",
      left: "-180px",
      width: "460px",
      height: "460px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(245, 52, 107, 0.28) 0%, transparent 70%)",
      filter: "blur(80px)",
      pointerEvents: "none",
      opacity: isDarkMode ? 0.5 : 0.35,
    },
    heroOrb2: {
      position: "absolute",
      bottom: "-180px",
      right: "-180px",
      width: "460px",
      height: "460px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(212, 175, 55, 0.28) 0%, transparent 70%)",
      filter: "blur(80px)",
      pointerEvents: "none",
      opacity: isDarkMode ? 0.5 : 0.35,
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
    heroBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1.25rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.14)"
        : "rgba(212, 175, 55, 0.10)",
      borderRadius: "50px",
      fontSize: "0.78rem",
      color: isDarkMode ? dark.gold : brandColors.bronze,
      marginBottom: "1.75rem",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.32)"
        : "1px solid rgba(199, 125, 66, 0.14)",
      fontWeight: "600",
      letterSpacing: "1px",
      textTransform: "uppercase",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },
    heroTitle: {
      fontSize: isMobile ? "2.1rem" : isNarrow ? "2.7rem" : "3.8rem",
      fontWeight: "900",
      marginBottom: "1.5rem",
      background: isDarkMode
        ? `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`
        : `linear-gradient(135deg, ${brandColors.goldDark} 0%, ${brandColors.primary} 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: "1.1",
      letterSpacing: "-0.5px",
    },
    heroText: {
      fontSize: isMobile ? "1rem" : "1.15rem",
      color: T.textMuted,
      lineHeight: "1.8",
      marginBottom: "2rem",
      maxWidth: "680px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    heroStats: {
      display: "grid",
      gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`,
      gap: "1rem",
      marginTop: "3rem",
    },
    statCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      padding: isMobile ? "1.25rem 0.75rem" : "1.6rem 1rem",
      borderRadius: "18px",
      boxShadow: T.shadowCard,
      transition: "transform 0.35s ease, box-shadow 0.35s ease",
      border: `1px solid ${T.border}`,
      cursor: "default",
      position: "relative",
      overflow: "hidden",
    },
    statNumber: {
      fontSize: isMobile ? "1.5rem" : "1.9rem",
      fontWeight: "900",
      background: isDarkMode
        ? `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`
        : `linear-gradient(135deg, ${brandColors.goldDark}, ${brandColors.primary})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "0.3rem",
      lineHeight: "1.1",
    },
    statLabel: {
      fontSize: isMobile ? "0.72rem" : "0.8rem",
      color: T.textMuted,
      fontWeight: "600",
      letterSpacing: "0.3px",
    },

    // ─── STORY ───
    storySection: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isNarrow ? "3rem 1.25rem" : "5rem 2rem",
      display: "grid",
      gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr",
      gap: isNarrow ? "2.5rem" : "4.5rem",
      alignItems: "center",
      opacity: isVisible.story ? 1 : 0,
      transform: isVisible.story ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    storyBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.4rem 1.1rem",
      backgroundColor: isDarkMode ? dark.goldSoft : "rgba(199, 125, 66, 0.08)",
      borderRadius: "50px",
      fontSize: "0.7rem",
      color: isDarkMode ? dark.gold : brandColors.bronze,
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      fontWeight: "700",
      marginBottom: "1.25rem",
    },
    storyTitle: {
      fontSize: isMobile ? "1.9rem" : "2.6rem",
      fontWeight: "900",
      marginBottom: "1.5rem",
      color: T.text,
      lineHeight: "1.15",
      letterSpacing: "-0.5px",
    },
    storyText: {
      fontSize: "1.03rem",
      color: T.textMuted,
      lineHeight: "1.85",
      marginBottom: "1.25rem",
    },
    storyHighlight: {
      fontSize: "1.05rem",
      fontWeight: "600",
      color: isDarkMode ? dark.gold : brandColors.bronze,
      marginTop: "2rem",
      padding: "1.5rem 1.75rem",
      backgroundColor: isDarkMode
        ? dark.goldSoft
        : "rgba(199, 125, 66, 0.06)",
      borderRadius: "18px",
      borderLeft: `4px solid ${isDarkMode ? dark.gold : brandColors.bronze}`,
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem",
      fontStyle: "italic",
      lineHeight: "1.7",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
    },
    storyImageContainer: {
      position: "relative",
      width: "100%",
      borderRadius: "24px",
      boxShadow: T.shadowLift,
      overflow: "hidden",
    },
    storyImage: {
      width: "100%",
      height: "auto",
      objectFit: "cover",
      objectPosition: "center",
      display: "block",
      transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      maxWidth: "100%",
    },
    storyImageOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "2rem 1.75rem 1.5rem",
      background:
        "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
      color: "#ffffff",
    },
    storyImageText: {
      fontSize: "1.15rem",
      fontWeight: "700",
      marginBottom: "0.3rem",
      letterSpacing: "0.2px",
    },
    storyImageSub: { fontSize: "0.88rem", opacity: 0.88 },

    // ─── MISSION ───
    missionSection: {
      backgroundColor: T.bgAlt,
      padding: isNarrow ? "3rem 1.25rem" : "5rem 2rem",
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
      padding: isMobile ? "2rem 1.5rem" : "2.75rem 2.25rem",
      borderRadius: "22px",
      boxShadow: T.shadowCard,
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
      opacity: 0.85,
    },
    missionTitle: {
      fontSize: "1.6rem",
      fontWeight: "800",
      marginBottom: "1rem",
      color: T.text,
      letterSpacing: "-0.3px",
    },
    missionText: {
      fontSize: "1.02rem",
      color: T.textMuted,
      lineHeight: "1.8",
      marginBottom: 0,
    },
    missionIcon: {
      fontSize: "2.4rem",
      marginBottom: "1.25rem",
      color: isDarkMode ? dark.gold : brandColors.bronze,
    },

    // ─── VALUES ───
    valuesSection: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isNarrow ? "3rem 1.25rem" : "5rem 2rem",
      opacity: isVisible.values ? 1 : 0,
      transform: isVisible.values ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.25s",
    },
    sectionTitle: {
      fontSize: isMobile ? "1.9rem" : "2.6rem",
      textAlign: "center",
      fontWeight: "900",
      marginBottom: "1.25rem",
      color: T.text,
      letterSpacing: "-0.5px",
      lineHeight: "1.15",
    },
    sectionSubtitle: {
      textAlign: "center",
      color: T.textMuted,
      fontSize: "1.02rem",
      maxWidth: "620px",
      margin: "0 auto 3rem auto",
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
      padding: "2.25rem 1.75rem",
      borderRadius: "22px",
      boxShadow: T.shadowCard,
      transition:
        "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.45s ease, border-color 0.3s ease",
      border: `1px solid ${T.border}`,
      textAlign: "center",
      cursor: "default",
      position: "relative",
      overflow: "hidden",
    },
    valueIconHalo: {
      width: "64px",
      height: "64px",
      margin: "0 auto 1.25rem",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      position: "relative",
    },
    valueTitle: {
      fontSize: "1.15rem",
      fontWeight: "800",
      marginBottom: "0.75rem",
      color: T.text,
      letterSpacing: "-0.2px",
    },
    valueDescription: {
      fontSize: "0.92rem",
      color: T.textMuted,
      lineHeight: "1.7",
    },

    // ─── TEAM ───
    teamSection: {
      backgroundColor: T.bgAlt,
      padding: isNarrow ? "3rem 1.25rem" : "5rem 2rem",
      borderTop: `1px solid ${T.borderSoft}`,
      opacity: isVisible.team ? 1 : 0,
      transform: isVisible.team ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.35s",
    },
    teamContainer: { maxWidth: "1200px", margin: "0 auto" },
    teamGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "2rem",
      marginTop: "1rem",
      maxWidth: "820px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    teamCard: {
      textAlign: "center",
      padding: isMobile ? "2.25rem 1.5rem" : "2.75rem 2rem",
      backgroundColor: T.card,
      borderRadius: "22px",
      boxShadow: T.shadowCard,
      transition: "transform 0.4s ease, box-shadow 0.4s ease",
      border: `1px solid ${T.border}`,
      position: "relative",
      overflow: "hidden",
    },
    teamAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    teamImageContainer: {
      width: "120px",
      height: "120px",
      margin: "0 auto 1.5rem",
      borderRadius: "50%",
      padding: "3px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.25)",
    },
    teamImageInner: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      overflow: "hidden",
      backgroundColor: isDarkMode ? dark.cardAlt : "#f5f0eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    teamImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
    teamImageFallback: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.8rem",
      fontWeight: "900",
      color: isDarkMode ? dark.gold : brandColors.bronze,
      background: `linear-gradient(135deg, ${
        isDarkMode ? "#222222" : "#f5f0eb"
      }, ${isDarkMode ? "#1a1a1a" : "#ede3db"})`,
    },
    teamName: {
      fontSize: "1.2rem",
      fontWeight: "800",
      marginBottom: "0.3rem",
      color: T.text,
      letterSpacing: "-0.2px",
    },
    teamRole: {
      fontSize: "0.88rem",
      color: isDarkMode ? dark.gold : brandColors.bronze,
      marginBottom: "1rem",
      fontWeight: "600",
      letterSpacing: "0.3px",
    },
    teamQuote: {
      fontSize: "0.88rem",
      color: T.textMuted,
      fontStyle: "italic",
      padding: "0.85rem 1.1rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.04)"
        : "rgba(62, 39, 35, 0.03)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      justifyContent: "center",
      lineHeight: "1.55",
    },
    quoteIcon: {
      fontSize: "0.7rem",
      color: isDarkMode ? dark.gold : brandColors.bronze,
      opacity: 0.7,
      flexShrink: 0,
    },

    // ─── CTA ───
    ctaSection: {
      position: "relative",
      background: isDarkMode
        ? `linear-gradient(160deg, #1a1212 0%, ${brandColors.black} 60%, #120a0a 100%)`
        : `linear-gradient(160deg, #fbf3ec 0%, ${brandColors.cream} 60%, #f7efe8 100%)`,
      padding: isNarrow ? "4rem 1.25rem" : "6rem 2rem",
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
      width: "600px",
      height: "600px",
      maxWidth: "90vw",
      maxHeight: "90vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at center, rgba(212, 175, 55, 0.18) 0%, transparent 65%)",
      filter: "blur(60px)",
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
      gap: "0.4rem",
      padding: "0.4rem 1.2rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.14)"
        : "rgba(212, 175, 55, 0.10)",
      borderRadius: "50px",
      fontSize: "0.72rem",
      color: isDarkMode ? dark.gold : brandColors.bronze,
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      fontWeight: "700",
      marginBottom: "1.5rem",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.32)"
        : "1px solid rgba(199, 125, 66, 0.14)",
    },
    ctaTitle: {
      fontSize: isMobile ? "1.9rem" : "2.6rem",
      fontWeight: "900",
      marginBottom: "1rem",
      color: T.text,
      letterSpacing: "-0.5px",
      lineHeight: "1.15",
    },
    ctaText: {
      fontSize: isMobile ? "1rem" : "1.12rem",
      marginBottom: "2.25rem",
      color: T.textMuted,
      lineHeight: "1.75",
    },
    ctaButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6rem",
      padding: "1.05rem 2.5rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontSize: "1.02rem",
      fontWeight: "800",
      transition:
        "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease",
      boxShadow: isDarkMode
        ? "0 10px 30px rgba(245, 52, 107, 0.42)"
        : "0 10px 30px rgba(245, 52, 107, 0.25)",
      letterSpacing: "0.3px",
    },
    ctaLeaf: {
      fontSize: "1.6rem",
      marginBottom: "1rem",
      color: isDarkMode ? dark.gold : brandColors.bronze,
    },
  };

  // ─── Global CSS for hover effects ───
  // Uses stable string constants (DARK_SHADOW_LIFT / LIGHT_SHADOW_LIFT)
  // so the effect only re-runs when isDarkMode changes.
  useEffect(() => {
    const lift = isDarkMode ? DARK_SHADOW_LIFT : LIGHT_SHADOW_LIFT;
    const style = document.createElement("style");
    style.textContent = `
      .about-stat-card:hover { transform: translateY(-6px); box-shadow: ${lift}; }
      .about-mission-card:hover { transform: translateY(-5px); box-shadow: ${lift}; }
      .about-value-card:hover {
        transform: translateY(-8px);
        box-shadow: ${lift};
        border-color: rgba(212, 175, 55, 0.45) !important;
      }
      .about-team-card:hover { transform: translateY(-6px); box-shadow: ${lift}; }
      .about-story-image:hover img { transform: scale(1.05); }
      .about-cta-btn:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 40px rgba(245, 52, 107, 0.5);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [isDarkMode]);

  return (
    <div style={themeStyles.container}>
      {/* ─── HERO ─── */}
      <section style={themeStyles.hero}>
        <div style={themeStyles.heroOrb1} />
        <div style={themeStyles.heroOrb2} />
        <div style={themeStyles.heroPattern} />
        <div style={themeStyles.heroContent}>
          <div style={themeStyles.heroBadge}>
            <FaLeaf style={{ fontSize: "0.7rem" }} />
            Since 2026 • Gorakhpur, India
          </div>
          <h1 style={themeStyles.heroTitle}>Pure. Natural. You.</h1>
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
          <div
            style={themeStyles.missionCard}
            className="about-mission-card"
          >
            <div style={themeStyles.missionAccent} />
            <div style={themeStyles.missionIcon}>
              <FaHandHoldingHeart />
            </div>
            <h2 style={themeStyles.missionTitle}>Our Mission</h2>
            <p style={themeStyles.missionText}>
              To bring the timeless healing power of Ayurveda to your daily
              beauty routine. We craft every powder with 100% natural
              ingredients.
            </p>
          </div>
          <div
            style={themeStyles.missionCard}
            className="about-mission-card"
          >
            <div
              style={{
                ...themeStyles.missionAccent,
                background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold})`,
              }}
            />
            <div style={themeStyles.missionIcon}>
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
        <h2 style={themeStyles.sectionTitle}>Our Core Values</h2>
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
              <div
                style={{
                  ...themeStyles.valueIconHalo,
                  background: `${value.color}1f`,
                  color: value.color,
                  boxShadow: `0 8px 22px ${value.color}33`,
                }}
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
        <div style={themeStyles.teamContainer}>
          <h2 style={themeStyles.sectionTitle}>Rooted in Trust</h2>
          <p style={themeStyles.sectionSubtitle}>
            Meet the passionate individuals behind ASudha Beauty—dedicated to
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
                <div style={themeStyles.teamImageContainer}>
                  <div style={themeStyles.teamImageInner}>
                    {!imgErrors[`team-${index}`] ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        style={themeStyles.teamImage}
                        onError={() => handleImageError(`team-${index}`)}
                      />
                    ) : (
                      <div style={themeStyles.teamImageFallback}>
                        {member.fallback}
                      </div>
                    )}
                  </div>
                </div>
                <h3 style={themeStyles.teamName}>{member.name}</h3>
                <p style={themeStyles.teamRole}>{member.role}</p>
                <div style={themeStyles.teamQuote}>
                  <FaQuoteLeft style={themeStyles.quoteIcon} />
                  {member.quote}
                  <FaQuoteLeft
                    style={{
                      ...themeStyles.quoteIcon,
                      transform: "rotate(180deg)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={themeStyles.ctaSection}>
        <div style={themeStyles.ctaOrb} />
        <div style={themeStyles.ctaContent}>
          <div style={themeStyles.ctaBadge}>
            <FaStar style={{ fontSize: "0.6rem" }} /> Discover Nature's Best
          </div>
          <div style={themeStyles.ctaLeaf}>🌿</div>
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