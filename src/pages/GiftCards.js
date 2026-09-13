import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useGiftCard } from "../context/GiftCardContext";
import SEO from "../components/SEO";
import {
  FaGift,
  FaEnvelope,
  FaRupeeSign,
  FaCheckCircle,
  FaArrowLeft,
  FaHeart,
  FaShoppingBag,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaEnvelope as FaMail,
  FaSpa,
  FaStar,
  FaRegClock,
  FaArrowRight,
  FaCopy,
  FaUser,
  FaCommentAlt,
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
  danger: "#c62828",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const GiftCards = () => {
  const { isDarkMode } = useTheme();
  const { createGiftCard } = useGiftCard();
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [amount, setAmount] = useState(500);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdCard, setCreatedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

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
    danger: "#ff8a8a",
    dangerSoft: "rgba(255, 138, 138, 0.12)",
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
    dangerSoft: "#fde8e8",
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  const giftCardAmounts = [250, 500, 1000, 2000, 5000];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recipientName.trim() || !recipientEmail.trim() || !senderName.trim()) {
      setError("Please fill in all required fields");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(recipientEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!amount || amount < 100 || amount > 50000) {
      setError("Amount must be between ₹100 and ₹50,000");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      const result = createGiftCard(
        amount,
        recipientName,
        recipientEmail,
        senderName,
        message
      );
      if (result.success) {
        setCreatedCard(result.giftCard);
        setIsSubmitted(true);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 800);
  };

  const handleShare = (platform) => {
    const text = `🎁 I've sent an ASudha Beauty Gift Card worth ₹${amount}! Experience the power of 100% natural Ayurvedic beauty. Pure. Natural. You.`;
    const url = typeof window !== "undefined" ? window.location.href : "";

    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}&quote=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "email":
        window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(
          `Gift Card from ${senderName}`
        )}&body=${encodeURIComponent(text)}`;
        break;
      default:
        break;
    }
  };

  const handleCopyCode = async () => {
    if (!createdCard?.code) return;
    try {
      await navigator.clipboard.writeText(createdCard.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = createdCard.code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-giftcard-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-giftcard-styles", "true");
    style.textContent = `
      @keyframes gcFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes gcFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes gcFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }
      @keyframes gcSparkle {
        0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.35; }
        50% { transform: scale(1.15) rotate(8deg); opacity: 0.65; }
      }

      .gc-orb-1 { animation: gcFloat1 16s ease-in-out infinite; }
      .gc-orb-2 { animation: gcFloat2 20s ease-in-out infinite; }
      .gc-orb-3 { animation: gcFloat3 18s ease-in-out infinite; }

      .gc-input {
        transition: border-color 0.25s ease, box-shadow 0.25s ease,
                    background-color 0.25s ease;
      }
      .gc-input:focus {
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
      .gc-input::placeholder {
        color: ${isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(62,39,35,0.35)"};
      }

      .gc-amount-btn {
        transition: transform 0.25s ease, border-color 0.25s ease,
                    box-shadow 0.25s ease, background 0.25s ease;
      }
      .gc-amount-btn:hover {
        transform: translateY(-3px);
        border-color: ${brandColors.primary} !important;
        box-shadow: 0 8px 22px rgba(245, 52, 107, 0.2);
      }

      .gc-submit-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .gc-submit-btn:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 16px 40px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
      }
      .gc-submit-btn:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .gc-info-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .gc-info-card:hover {
        transform: translateY(-4px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.35)"
            : "rgba(199, 125, 66, 0.3)"
        } !important;
      }
      .gc-info-card:hover .gc-info-icon {
        transform: scale(1.08) rotate(-6deg);
      }
      .gc-info-icon {
        transition: transform 0.35s ease;
      }

      .gc-back-btn {
        transition: all 0.25s ease;
      }
      .gc-back-btn:hover {
        transform: translateX(-4px);
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        border-color: transparent !important;
      }

      .gc-share-btn {
        transition: all 0.25s ease;
      }
      .gc-share-btn:hover {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        border-color: transparent !important;
        transform: translateY(-3px);
        box-shadow: 0 10px 26px rgba(245, 52, 107, 0.35);
      }

      .gc-copy-btn {
        transition: all 0.25s ease;
      }
      .gc-copy-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 22px rgba(245, 52, 107, 0.4);
      }

      .gc-action-btn {
        transition: all 0.3s ease;
      }
      .gc-action-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 40px rgba(245, 52, 107, 0.5);
        gap: 0.75rem;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-giftcard-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const themeStyles = {
    // ─── Page wrapper with animated background ───
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

    content: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile
        ? "1.25rem 1rem 3rem"
        : isNarrow
        ? "1.5rem 1.25rem 4rem"
        : "2rem 1.5rem 5rem",
      width: "100%",
      boxSizing: "border-box",
    },

    backButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: isNarrow ? "1.5rem" : "2.25rem",
      padding: "0.6rem 1.35rem",
      backgroundColor: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      color: T.text,
      cursor: "pointer",
      fontSize: "0.88rem",
      fontWeight: "700",
      boxShadow: T.shadow,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      fontFamily: "inherit",
    },

    header: {
      textAlign: "center",
      marginBottom: isNarrow ? "2rem" : "3rem",
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
      color: isDarkMode ? T.gold : brandColors.bronze,
      marginBottom: "1.25rem",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.3)" : "rgba(199, 125, 66, 0.2)"
      }`,
      fontWeight: "800",
      letterSpacing: "1px",
      textTransform: "uppercase",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },
    // ✅ Solid title + gradient underline accent
    title: {
      fontSize: isMobile ? "2rem" : isNarrow ? "2.4rem" : "3rem",
      fontWeight: "900",
      marginBottom: "1.25rem",
      color: T.text,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.6rem",
      flexWrap: "wrap",
      lineHeight: "1.1",
      letterSpacing: "-0.5px",
      position: "relative",
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
    titleIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      fontSize: "0.85em",
    },
    subtitle: {
      fontSize: isMobile ? "0.92rem" : "1.05rem",
      color: T.textMuted,
      maxWidth: "620px",
      margin: "0 auto",
      lineHeight: "1.7",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: isNarrow ? "1fr" : "1.05fr 1fr",
      gap: isNarrow ? "1.5rem" : "2rem",
      alignItems: "start",
    },

    // ─── Form card ───
    formSection: {
      backgroundColor: T.card,
      borderRadius: "24px",
      padding: isMobile ? "1.75rem 1.35rem" : "2.5rem 2.25rem",
      boxShadow: T.shadowLift,
      border: `1px solid ${T.border}`,
      boxSizing: "border-box",
      width: "100%",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
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
    formTitleRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1.75rem",
    },
    formTitleIcon: {
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.05rem",
      boxShadow: "0 8px 20px rgba(245, 52, 107, 0.3)",
      flexShrink: 0,
    },
    formTitle: {
      fontSize: isMobile ? "1.15rem" : "1.3rem",
      fontWeight: "900",
      margin: 0,
      color: T.text,
      letterSpacing: "-0.2px",
    },
    formGroup: { marginBottom: "1.35rem" },
    label: {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      marginBottom: "0.55rem",
      fontSize: "0.78rem",
      color: T.text,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
    },
    labelIcon: {
      fontSize: "0.7rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
    },
    input: {
      width: "100%",
      padding: "0.85rem 1.15rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      border: `1.5px solid ${T.border}`,
      borderRadius: "14px",
      fontSize: "0.95rem",
      color: T.text,
      outline: "none",
      boxSizing: "border-box",
      fontFamily: "inherit",
      fontWeight: "600",
    },
    textarea: {
      width: "100%",
      padding: "0.85rem 1.15rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      border: `1.5px solid ${T.border}`,
      borderRadius: "14px",
      fontSize: "0.95rem",
      color: T.text,
      outline: "none",
      resize: "vertical",
      minHeight: "100px",
      maxHeight: "220px",
      fontFamily: "inherit",
      boxSizing: "border-box",
      fontWeight: "600",
    },
    amountGrid: {
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit, minmax(${
        isMobile ? "70px" : "80px"
      }, 1fr))`,
      gap: "0.6rem",
      marginBottom: "0.9rem",
    },
    amountButton: {
      padding: "0.7rem 0.5rem",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.04)"
        : "rgba(62, 39, 35, 0.04)",
      border: `1.5px solid ${T.border}`,
      borderRadius: "50px",
      cursor: "pointer",
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      fontWeight: "800",
      color: T.text,
      fontFamily: "inherit",
      whiteSpace: "nowrap",
    },
    activeAmount: {
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      borderColor: "transparent",
      boxShadow: "0 10px 24px rgba(245, 52, 107, 0.35)",
    },
    customAmount: { marginTop: "0.85rem" },
    inputWithIcon: {
      position: "relative",
    },
    inputIcon: {
      position: "absolute",
      left: "1.15rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: isDarkMode ? T.gold : brandColors.bronze,
      fontSize: "0.95rem",
      pointerEvents: "none",
    },
    error: {
      backgroundColor: T.dangerSoft,
      color: T.danger,
      padding: "0.85rem 1.15rem",
      borderRadius: "14px",
      marginBottom: "1.35rem",
      textAlign: "center",
      fontSize: "0.9rem",
      border: `1px solid ${
        isDarkMode
          ? "rgba(255, 138, 138, 0.25)"
          : "rgba(198, 40, 40, 0.18)"
      }`,
      fontWeight: "700",
    },
    submitButton: {
      width: "100%",
      padding: "1rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "1rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontFamily: "inherit",
      letterSpacing: "0.3px",
      marginTop: "0.5rem",
    },

    // ─── Info section ───
    infoSection: {
      backgroundColor: T.card,
      borderRadius: "24px",
      padding: isMobile ? "1.75rem 1.35rem" : "2.5rem 2.25rem",
      boxShadow: T.shadowLift,
      border: `1px solid ${T.border}`,
      boxSizing: "border-box",
      width: "100%",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    infoAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.9,
    },
    infoTitleRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1.75rem",
    },
    infoTitleIcon: {
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      background: `linear-gradient(135deg, ${brandColors.green}, #8bc34a)`,
      color: "#ffffff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.05rem",
      boxShadow: "0 8px 20px rgba(76, 175, 80, 0.35)",
      flexShrink: 0,
    },
    infoTitle: {
      fontSize: isMobile ? "1.15rem" : "1.3rem",
      fontWeight: "900",
      margin: 0,
      color: T.text,
      letterSpacing: "-0.2px",
    },
    infoCard: {
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(62, 39, 35, 0.02)",
      borderRadius: "18px",
      padding: "1.25rem 1.35rem",
      marginBottom: "0.85rem",
      border: `1px solid ${T.borderSoft}`,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem",
    },
    infoIconWrap: {
      width: "42px",
      height: "42px",
      borderRadius: "12px",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.12)"
        : "rgba(212, 175, 55, 0.1)",
      color: isDarkMode ? T.gold : brandColors.bronze,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      flexShrink: 0,
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.2)"
        : "1px solid rgba(212, 175, 55, 0.15)",
    },
    infoCardBody: {
      flex: 1,
      minWidth: 0,
    },
    infoCardTitle: {
      fontWeight: "800",
      marginBottom: "0.3rem",
      fontSize: "0.95rem",
      color: T.text,
      letterSpacing: "-0.1px",
    },
    infoCardText: {
      color: T.textMuted,
      fontSize: "0.85rem",
      lineHeight: "1.65",
      margin: 0,
    },
    trustCard: {
      marginTop: "1.25rem",
      padding: "1rem 1.15rem",
      background: isDarkMode
        ? "linear-gradient(135deg, rgba(212, 175, 55, 0.14), rgba(245, 52, 107, 0.08))"
        : "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(245, 52, 107, 0.06))",
      borderRadius: "16px",
      textAlign: "center",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.25)" : "rgba(199, 125, 66, 0.18)"
      }`,
    },
    trustText: {
      fontSize: "0.88rem",
      color: T.text,
      margin: 0,
      fontWeight: "800",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      letterSpacing: "0.2px",
    },

    // ─── Success screen ───
    successWrap: {
      position: "relative",
      zIndex: 1,
      maxWidth: "720px",
      margin: "0 auto",
      padding: isMobile ? "1.5rem 1rem" : "3rem 2rem",
      width: "100%",
      boxSizing: "border-box",
    },
    successSection: {
      textAlign: "center",
      padding: isMobile ? "2.5rem 1.5rem" : "3.5rem 2.5rem",
      backgroundColor: T.card,
      borderRadius: "28px",
      boxShadow: T.shadowLift,
      border: `1px solid ${T.border}`,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    successAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold}, ${brandColors.primary})`,
    },
    successIconWrap: {
      width: isMobile ? "96px" : "120px",
      height: isMobile ? "96px" : "120px",
      margin: "0 auto 1.75rem",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.green}, #8bc34a)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 20px 48px rgba(76, 175, 80, 0.4)",
    },
    successIcon: {
      fontSize: isMobile ? "2.75rem" : "3.5rem",
      color: "#ffffff",
    },
    successTitle: {
      fontSize: isMobile ? "1.45rem" : "1.8rem",
      marginBottom: "0.75rem",
      color: T.text,
      fontWeight: "900",
      letterSpacing: "-0.4px",
      lineHeight: "1.2",
    },
    successSubtitle: {
      color: T.textMuted,
      marginBottom: "1.5rem",
      fontSize: isMobile ? "0.9rem" : "0.98rem",
      lineHeight: "1.7",
      margin: "0 0 1.5rem",
    },
    codeBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      flexWrap: "wrap",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      padding: "1.25rem 1.5rem",
      borderRadius: "18px",
      margin: "1.25rem 0",
      border: `2px dashed ${
        isDarkMode ? "rgba(212, 175, 55, 0.4)" : "rgba(199, 125, 66, 0.3)"
      }`,
    },
    giftCardCode: {
      fontSize: isMobile ? "1.05rem" : "1.3rem",
      fontWeight: "900",
      letterSpacing: "2px",
      fontFamily: "'SF Mono', Menlo, Monaco, 'Courier New', monospace",
      color: isDarkMode ? T.gold : brandColors.earthLight,
      margin: 0,
      wordBreak: "break-all",
    },
    copyButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.55rem 1rem",
      background: copied
        ? brandColors.green
        : `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "0.8rem",
      fontWeight: "800",
      cursor: "pointer",
      fontFamily: "inherit",
      whiteSpace: "nowrap",
      letterSpacing: "0.2px",
    },
    successAmount: {
      margin: "0.75rem 0 1.5rem",
      color: T.textMuted,
      fontSize: "0.95rem",
      fontWeight: "700",
    },
    successAmountValue: {
      color: isDarkMode ? T.gold : brandColors.primary,
      fontSize: "1.15rem",
      fontWeight: "900",
      marginLeft: "0.35rem",
    },
    shareTitle: {
      fontSize: "0.78rem",
      color: T.textMuted,
      textTransform: "uppercase",
      letterSpacing: "1.2px",
      fontWeight: "800",
      marginBottom: "0.9rem",
      marginTop: "0.5rem",
    },
    shareButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "0.6rem",
      flexWrap: "wrap",
    },
    shareButton: {
      width: "46px",
      height: "46px",
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: T.cardAlt,
      border: `1px solid ${T.border}`,
      cursor: "pointer",
      fontSize: "1.05rem",
      color: T.text,
    },
    actionButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.9rem 1.75rem" : "1rem 2.25rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "0.9rem" : "0.98rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      marginTop: "1.75rem",
      textDecoration: "none",
      fontFamily: "inherit",
      letterSpacing: "0.3px",
    },
  };

  const BackgroundLayer = () => (
    <div style={themeStyles.bgLayer}>
      <div style={themeStyles.bgGradient} />
      <div style={themeStyles.bgGrid} />
      <div
        className="gc-orb-1"
        style={themeStyles.bgOrb1}
        aria-hidden="true"
      />
      <div
        className="gc-orb-2"
        style={themeStyles.bgOrb2}
        aria-hidden="true"
      />
      <div
        className="gc-orb-3"
        style={themeStyles.bgOrb3}
        aria-hidden="true"
      />
    </div>
  );

  // ─── SUCCESS SCREEN ──────────────────────────────────────────────
  if (isSubmitted && createdCard) {
    return (
      <div style={themeStyles.container}>
        <BackgroundLayer />
        <div style={themeStyles.successWrap}>
          <SEO
            title="Gift Card Purchased | ASudha Beauty"
            description="Your ASudha Beauty gift card has been created successfully. Share the gift of natural Ayurvedic beauty."
            keywords="gift card, e-gift card, digital gift card, Ayurvedic gift"
            url="/gift-cards"
          />

          <div style={themeStyles.successSection}>
            <div style={themeStyles.successAccentBar} />
            <div style={themeStyles.successIconWrap}>
              <FaCheckCircle style={themeStyles.successIcon} />
            </div>
            <h2 style={themeStyles.successTitle}>
              Gift Card Created Successfully! 🎉
            </h2>
            <p style={themeStyles.successSubtitle}>
              Your gift card has been sent to{" "}
              <strong style={{ color: T.text }}>{recipientEmail}</strong>.
              <br />
              They can now experience the power of 100% natural Ayurvedic
              beauty.
            </p>

            <div style={themeStyles.codeBox}>
              <span style={themeStyles.giftCardCode}>{createdCard.code}</span>
              <button
                style={themeStyles.copyButton}
                className="gc-copy-btn"
                onClick={handleCopyCode}
                aria-label="Copy gift card code"
              >
                {copied ? (
                  <>
                    <FaCheckCircle /> Copied!
                  </>
                ) : (
                  <>
                    <FaCopy /> Copy
                  </>
                )}
              </button>
            </div>

            <p style={themeStyles.successAmount}>
              Amount:
              <span style={themeStyles.successAmountValue}>₹{amount}</span>
            </p>

            <p style={themeStyles.shareTitle}>Share the joy</p>
            <div style={themeStyles.shareButtons}>
              <button
                style={themeStyles.shareButton}
                className="gc-share-btn"
                onClick={() => handleShare("whatsapp")}
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp />
              </button>
              <button
                style={themeStyles.shareButton}
                className="gc-share-btn"
                onClick={() => handleShare("facebook")}
                aria-label="Share on Facebook"
              >
                <FaFacebook />
              </button>
              <button
                style={themeStyles.shareButton}
                className="gc-share-btn"
                onClick={() => handleShare("twitter")}
                aria-label="Share on Twitter"
              >
                <FaTwitter />
              </button>
              <button
                style={themeStyles.shareButton}
                className="gc-share-btn"
                onClick={() => handleShare("email")}
                aria-label="Share via Email"
              >
                <FaMail />
              </button>
            </div>

            <button
              style={themeStyles.actionButton}
              className="gc-action-btn"
              onClick={() => navigate("/shop")}
            >
              Explore Our Herbal Powders <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── MAIN FORM ────────────────────────────────────────────────────
  return (
    <div style={themeStyles.container}>
      <BackgroundLayer />
      <div style={themeStyles.content}>
        <SEO
          title="Gift Cards | ASudha Beauty"
          description="Send an ASudha Beauty gift card to your loved ones. Perfect for birthdays, anniversaries, or any special occasion."
          keywords="gift card, e-gift card, digital gift card, beauty gift card, Ayurvedic gift"
          url="/gift-cards"
        />

        <button
          onClick={() => navigate(-1)}
          style={themeStyles.backButton}
          className="gc-back-btn"
          type="button"
        >
          <FaArrowLeft /> Back
        </button>

        <div style={themeStyles.header}>
          {/* <div style={themeStyles.heroBadge}>
            <FaLeaf style={{ fontSize: "0.7rem" }} /> Share the Goodness
          </div> */}
          <h1 style={themeStyles.title}>
            <FaGift style={themeStyles.titleIcon} /> Gift Cards
            <span style={themeStyles.titleAccent} aria-hidden="true" />
          </h1>
          <p style={themeStyles.subtitle}>
            Give the gift of nature. Send an ASudha Beauty gift card to your
            loved ones — so they can explore our 100% natural Ayurvedic powders.
          </p>
        </div>

        <div style={themeStyles.grid}>
          {/* Gift Card Form */}
          <div style={themeStyles.formSection}>
            <div style={themeStyles.formAccentBar} />
            <div style={themeStyles.formTitleRow}>
              <span style={themeStyles.formTitleIcon}>
                <FaHeart />
              </span>
              <h2 style={themeStyles.formTitle}>Create a Gift Card</h2>
            </div>

            {error && <div style={themeStyles.error}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>
                  <FaRupeeSign style={themeStyles.labelIcon} /> Select Amount *
                </label>
                <div style={themeStyles.amountGrid}>
                  {giftCardAmounts.map((cardAmount) => (
                    <button
                      key={cardAmount}
                      type="button"
                      style={{
                        ...themeStyles.amountButton,
                        ...(amount === cardAmount
                          ? themeStyles.activeAmount
                          : {}),
                      }}
                      className="gc-amount-btn"
                      onClick={() => setAmount(cardAmount)}
                    >
                      ₹{cardAmount}
                    </button>
                  ))}
                </div>
                <div style={themeStyles.customAmount}>
                  <label style={themeStyles.label}>
                    <FaGift style={themeStyles.labelIcon} /> Or enter custom
                    amount
                  </label>
                  <div style={themeStyles.inputWithIcon}>
                    <FaRupeeSign style={themeStyles.inputIcon} />
                    <input
                      type="number"
                      value={amount === 0 ? "" : amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      style={{ ...themeStyles.input, paddingLeft: "2.75rem" }}
                      className="gc-input"
                      placeholder="Enter amount"
                      min="100"
                      max="50000"
                    />
                  </div>
                </div>
              </div>

              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>
                  <FaUser style={themeStyles.labelIcon} /> Recipient's Name *
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  style={themeStyles.input}
                  className="gc-input"
                  placeholder="Enter recipient's name"
                  required
                />
              </div>

              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>
                  <FaEnvelope style={themeStyles.labelIcon} /> Recipient's Email *
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  style={themeStyles.input}
                  className="gc-input"
                  placeholder="recipient@email.com"
                  required
                />
              </div>

              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>
                  <FaHeart style={themeStyles.labelIcon} /> Your Name *
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  style={themeStyles.input}
                  className="gc-input"
                  placeholder="Your name"
                  required
                />
              </div>

              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label}>
                  <FaCommentAlt style={themeStyles.labelIcon} /> Personal
                  Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={themeStyles.textarea}
                  className="gc-input"
                  placeholder="Write a personal message for your gift..."
                />
              </div>

              <button
                type="submit"
                style={themeStyles.submitButton}
                className="gc-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  "Creating..."
                ) : (
                  <>
                    <FaGift /> Purchase Gift Card
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Information Section */}
          <div style={themeStyles.infoSection}>
            <div style={themeStyles.infoAccentBar} />
            <div style={themeStyles.infoTitleRow}>
              <span style={themeStyles.infoTitleIcon}>
                <FaSpa />
              </span>
              <h2 style={themeStyles.infoTitle}>How It Works</h2>
            </div>

            <div style={themeStyles.infoCard} className="gc-info-card">
              <span
                style={themeStyles.infoIconWrap}
                className="gc-info-icon"
              >
                <FaGift />
              </span>
              <div style={themeStyles.infoCardBody}>
                <div style={themeStyles.infoCardTitle}>Choose Amount</div>
                <p style={themeStyles.infoCardText}>
                  Select from our popular amounts or enter a custom value
                  between ₹100 and ₹50,000.
                </p>
              </div>
            </div>

            <div style={themeStyles.infoCard} className="gc-info-card">
              <span
                style={themeStyles.infoIconWrap}
                className="gc-info-icon"
              >
                <FaEnvelope />
              </span>
              <div style={themeStyles.infoCardBody}>
                <div style={themeStyles.infoCardTitle}>
                  Personalize &amp; Send
                </div>
                <p style={themeStyles.infoCardText}>
                  Add a personal message and we&apos;ll send the gift card
                  directly to the recipient&apos;s email.
                </p>
              </div>
            </div>

            <div style={themeStyles.infoCard} className="gc-info-card">
              <span
                style={themeStyles.infoIconWrap}
                className="gc-info-icon"
              >
                <FaShoppingBag />
              </span>
              <div style={themeStyles.infoCardBody}>
                <div style={themeStyles.infoCardTitle}>Redeem Instantly</div>
                <p style={themeStyles.infoCardText}>
                  Recipient can use the gift card code at checkout for any
                  purchase of our 100% natural Ayurvedic products.
                </p>
              </div>
            </div>

            <div style={themeStyles.infoCard} className="gc-info-card">
              <span
                style={themeStyles.infoIconWrap}
                className="gc-info-icon"
              >
                <FaRegClock />
              </span>
              <div style={themeStyles.infoCardBody}>
                <div style={themeStyles.infoCardTitle}>No Expiry</div>
                <p style={themeStyles.infoCardText}>
                  Our gift cards never expire and can be used for the full value
                  at any time.
                </p>
              </div>
            </div>

            <div style={themeStyles.trustCard}>
              <p style={themeStyles.trustText}>
                <FaStar style={{ color: isDarkMode ? T.gold : brandColors.goldDark }} />
                Trusted by 5000+ happy customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;