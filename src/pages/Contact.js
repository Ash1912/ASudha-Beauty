import React, { useState, useEffect, useLayoutEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowRight,
  FaLeaf,
  FaHeart,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaCheckCircle,
  FaUser,
  FaComment,
  FaSpa,
  FaPaperPlane,
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
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-contact-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-contact-styles", "true");
    style.textContent = `
      .contact-input {
        transition: border-color 0.25s ease, box-shadow 0.25s ease,
                    background-color 0.25s ease;
      }
      .contact-input:focus {
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.bronze
        } !important;
        box-shadow: 0 0 0 4px ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.18)"
            : "rgba(199, 125, 66, 0.1)"
        } !important;
        background-color: ${isDarkMode ? "#0a0a0a" : "#ffffff"} !important;
      }
      .contact-input::placeholder {
        color: ${isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(62,39,35,0.35)"};
      }

      .submit-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .submit-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
      }

      .chat-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .chat-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 32px rgba(37, 211, 102, 0.5);
      }

      .social-link {
        transition: all 0.3s ease;
      }
      .social-link:hover {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        transform: translateY(-4px) rotate(-6deg);
        box-shadow: 0 12px 24px rgba(245, 52, 107, 0.35);
      }

      .info-item {
        transition: transform 0.25s ease;
      }
      .info-item:hover {
        transform: translateX(4px);
      }
      .info-item:hover .info-icon-wrap {
        transform: scale(1.1) rotate(-6deg);
        box-shadow: 0 10px 26px rgba(245, 52, 107, 0.35);
      }

      .info-icon-wrap {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .contact-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-contact-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // ✅ T / brandColors are stable derivations of isDarkMode
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const themeStyles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile
        ? "1.5rem 1rem 3rem"
        : isNarrow
        ? "2rem 1.25rem 4rem"
        : "3rem 1.5rem 5rem",
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100%",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
      position: "relative",
    },

    // ─── Decorative orbs ───
    bgOrb1: {
      position: "fixed",
      top: "-160px",
      left: "-160px",
      width: "420px",
      height: "420px",
      maxWidth: "55vw",
      maxHeight: "55vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(245, 52, 107, 0.28) 0%, transparent 70%)",
      filter: "blur(100px)",
      pointerEvents: "none",
      opacity: isDarkMode ? 0.35 : 0.25,
      zIndex: 0,
    },
    bgOrb2: {
      position: "fixed",
      bottom: "-160px",
      right: "-160px",
      width: "420px",
      height: "420px",
      maxWidth: "55vw",
      maxHeight: "55vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(212, 175, 55, 0.28) 0%, transparent 70%)",
      filter: "blur(100px)",
      pointerEvents: "none",
      opacity: isDarkMode ? 0.35 : 0.25,
      zIndex: 0,
    },

    // ─── Hero ───
    hero: {
      textAlign: "center",
      padding: isMobile ? "1.5rem 0 2rem" : "2rem 0 3rem",
      position: "relative",
      zIndex: 1,
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
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      marginBottom: "1.25rem",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.32)"
        : "1px solid rgba(199, 125, 66, 0.18)",
      fontWeight: "800",
      letterSpacing: "1px",
      textTransform: "uppercase",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },
    title: {
      fontSize: isMobile ? "2rem" : isNarrow ? "2.5rem" : "3.2rem",
      fontWeight: "900",
      marginBottom: "1.25rem",
      color: T.text,
      letterSpacing: "-0.5px",
      lineHeight: "1.1",
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
      color: T.textMuted,
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.75",
    },

    // ─── Grid ───
    contactGrid: {
      display: "grid",
      gridTemplateColumns: isNarrow ? "1fr" : "1.05fr 1fr",
      gap: isNarrow ? "1.5rem" : "2rem",
      position: "relative",
      zIndex: 1,
    },

    // ─── Form card ───
    formSection: {
      backgroundColor: T.card,
      padding: isMobile ? "1.75rem 1.35rem" : "2.5rem 2.25rem",
      borderRadius: "24px",
      boxShadow: T.shadow,
      border: `1px solid ${T.border}`,
      position: "relative",
      overflow: "hidden",
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
      marginBottom: "0.4rem",
    },
    formTitleIcon: {
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
    formTitle: {
      fontSize: isMobile ? "1.15rem" : "1.3rem",
      fontWeight: "900",
      color: T.text,
      margin: 0,
      letterSpacing: "-0.2px",
    },
    formSubtitle: {
      color: T.textMuted,
      fontSize: "0.88rem",
      marginBottom: "1.75rem",
      paddingLeft: "56px",
      lineHeight: "1.6",
    },
    successMessage: {
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.1)",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      padding: "0.85rem 1rem",
      borderRadius: "14px",
      marginBottom: "1.25rem",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.25)" : "rgba(76, 175, 80, 0.18)"
      }`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontSize: "0.9rem",
      fontWeight: "700",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.15rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "0.5rem",
      color: T.text,
      fontWeight: "700",
      fontSize: "0.82rem",
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      letterSpacing: "0.3px",
    },
    labelIcon: {
      fontSize: "0.72rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
    },
    input: {
      padding: "0.85rem 1.15rem",
      border: `1.5px solid ${T.border}`,
      borderRadius: "14px",
      fontSize: "0.95rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: T.text,
      transition: "all 0.3s ease",
      outline: "none",
      fontFamily: "inherit",
      width: "100%",
      boxSizing: "border-box",
    },
    textarea: {
      padding: "0.85rem 1.15rem",
      border: `1.5px solid ${T.border}`,
      borderRadius: "14px",
      fontSize: "0.95rem",
      resize: "vertical",
      fontFamily: "inherit",
      minHeight: "120px",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: T.text,
      transition: "all 0.3s ease",
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
    },
    submitButton: {
      padding: "0.95rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "0.98rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontFamily: "inherit",
      letterSpacing: "0.3px",
      marginTop: "0.35rem",
    },

    // ─── Info section ───
    infoSection: {
      backgroundColor: T.card,
      padding: isMobile ? "1.75rem 1.35rem" : "2.5rem 2.25rem",
      borderRadius: "24px",
      boxShadow: T.shadow,
      border: `1px solid ${T.border}`,
      position: "relative",
      overflow: "hidden",
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
      marginBottom: "0.4rem",
    },
    infoTitleIcon: {
      width: "42px",
      height: "42px",
      borderRadius: "12px",
      background: `linear-gradient(135deg, ${brandColors.green}, #8bc34a)`,
      color: "#ffffff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      boxShadow: "0 8px 20px rgba(76, 175, 80, 0.35)",
      flexShrink: 0,
    },
    infoTitle: {
      fontSize: isMobile ? "1.15rem" : "1.3rem",
      fontWeight: "900",
      color: T.text,
      margin: 0,
      letterSpacing: "-0.2px",
    },
    infoSub: {
      color: T.textMuted,
      fontSize: "0.88rem",
      marginBottom: "1.75rem",
      paddingLeft: "56px",
      lineHeight: "1.6",
    },
    infoItem: {
      display: "flex",
      gap: "0.9rem",
      marginBottom: "1.15rem",
      alignItems: "flex-start",
    },
    infoIconWrap: {
      width: "42px",
      height: "42px",
      borderRadius: "12px",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.12)"
        : "rgba(212, 175, 55, 0.1)",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      flexShrink: 0,
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.2)"
        : "1px solid rgba(212, 175, 55, 0.14)",
    },
    infoSubtitle: {
      fontSize: "0.92rem",
      fontWeight: "800",
      marginBottom: "0.25rem",
      color: T.text,
      letterSpacing: "-0.1px",
    },
    infoText: {
      color: T.textMuted,
      lineHeight: "1.55",
      fontSize: "0.87rem",
      margin: 0,
    },

    // ─── WhatsApp chat card ───
    chatSection: {
      textAlign: "center",
      padding: isMobile ? "1.5rem 1.25rem" : "1.75rem 1.5rem",
      background: isDarkMode
        ? "linear-gradient(135deg, rgba(37, 211, 102, 0.12), rgba(76, 175, 80, 0.06))"
        : "linear-gradient(135deg, rgba(37, 211, 102, 0.09), rgba(76, 175, 80, 0.04))",
      borderRadius: "18px",
      border: `1px solid ${
        isDarkMode ? "rgba(37, 211, 102, 0.28)" : "rgba(37, 211, 102, 0.18)"
      }`,
      marginTop: "1.5rem",
      position: "relative",
      overflow: "hidden",
    },
    chatIcon: {
      fontSize: "2rem",
      marginBottom: "0.5rem",
      lineHeight: 1,
    },
    chatTitle: {
      fontSize: "1.1rem",
      marginBottom: "0.35rem",
      color: T.text,
      fontWeight: "800",
      letterSpacing: "-0.2px",
    },
    chatText: {
      color: T.textMuted,
      marginBottom: "1.15rem",
      fontSize: "0.87rem",
      lineHeight: "1.5",
    },
    chatButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "0.75rem 2rem",
      backgroundColor: brandColors.whatsapp,
      color: "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "0.92rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 10px 24px rgba(37, 211, 102, 0.35)",
      textDecoration: "none",
      fontFamily: "inherit",
      letterSpacing: "0.3px",
    },

    // ─── Social ───
    socialSection: {
      marginTop: "1.75rem",
      textAlign: "center",
    },
    socialTitle: {
      fontSize: "0.78rem",
      color: T.textMuted,
      marginBottom: "0.85rem",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1.2px",
    },
    socialLinks: {
      display: "flex",
      justifyContent: "center",
      gap: "0.65rem",
      flexWrap: "wrap",
    },
    socialLink: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.06)"
        : "rgba(62, 39, 35, 0.05)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: T.textMuted,
      fontSize: "1rem",
      textDecoration: "none",
      border: `1px solid ${T.borderSoft}`,
    },

    // ─── Trust badge ───
    trustBadge: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "1.5rem",
      padding: "0.8rem 1rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.04)"
        : "rgba(255,255,255,0.6)",
      borderRadius: "14px",
      color: T.textMuted,
      fontSize: "0.75rem",
      flexWrap: "wrap",
      fontWeight: "700",
      letterSpacing: "0.2px",
      border: `1px solid ${T.borderSoft}`,
    },
    trustIcon: {
      fontSize: "0.85rem",
    },
  };

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.bgOrb1} />
      <div style={themeStyles.bgOrb2} />

      {/* Hero */}
      <div style={themeStyles.hero}>
        {/* <div style={themeStyles.heroBadge}>
          <FaLeaf style={{ fontSize: "0.7rem" }} />
          Let&apos;s Connect
        </div> */}
        <h1 style={themeStyles.title}>
          Connect with Us
          <span style={themeStyles.titleAccent} aria-hidden="true" />
        </h1>
        <p style={themeStyles.subtitle}>
          Have questions about our Ayurvedic powders? Need help choosing the
          right product? We&apos;re here to guide you on your natural beauty
          journey.
        </p>
      </div>

      <div style={themeStyles.contactGrid}>
        {/* Form card */}
        <div style={themeStyles.formSection}>
          <div style={themeStyles.formAccentBar} />
          <div style={themeStyles.formTitleRow}>
            <span style={themeStyles.formTitleIcon}>
              <FaComment />
            </span>
            <h2 style={themeStyles.formTitle}>Send Us a Message</h2>
          </div>
          <p style={themeStyles.formSubtitle}>
            We&apos;ll respond within 24 hours.
          </p>

          {isSubmitted && (
            <div style={themeStyles.successMessage}>
              <FaCheckCircle /> Thank you! We&apos;ll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} style={themeStyles.form}>
            <div style={themeStyles.formGroup}>
              <label htmlFor="name" style={themeStyles.label}>
                <FaUser style={themeStyles.labelIcon} /> Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={themeStyles.input}
                className="contact-input"
                placeholder="Enter your name"
              />
            </div>

            <div style={themeStyles.formGroup}>
              <label htmlFor="email" style={themeStyles.label}>
                <FaEnvelope style={themeStyles.labelIcon} /> Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={themeStyles.input}
                className="contact-input"
                placeholder="your@email.com"
              />
            </div>

            <div style={themeStyles.formGroup}>
              <label htmlFor="message" style={themeStyles.label}>
                <FaComment style={themeStyles.labelIcon} /> Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={themeStyles.textarea}
                className="contact-input"
                placeholder="How can we help you?"
                rows="4"
              />
            </div>

            <button type="submit" style={themeStyles.submitButton} className="submit-btn">
              <FaPaperPlane style={{ fontSize: "0.9rem" }} />
              Send Message <FaArrowRight style={{ fontSize: "0.8rem" }} />
            </button>
          </form>
        </div>

        {/* Info card */}
        <div style={themeStyles.infoSection}>
          <div style={themeStyles.infoAccentBar} />
          <div style={themeStyles.infoTitleRow}>
            <span style={themeStyles.infoTitleIcon}>
              <FaSpa />
            </span>
            <h2 style={themeStyles.infoTitle}>Get in Touch</h2>
          </div>
          <p style={themeStyles.infoSub}>
            Reach out through any of these channels.
          </p>

          <div style={themeStyles.infoItem} className="info-item">
            <span style={themeStyles.infoIconWrap} className="info-icon-wrap">
              <FaPhone />
            </span>
            <div>
              <h3 style={themeStyles.infoSubtitle}>Call Us</h3>
              <p style={themeStyles.infoText}>+91-7518217726</p>
              <p style={themeStyles.infoText}>+91-9335975525</p>
            </div>
          </div>

          <div style={themeStyles.infoItem} className="info-item">
            <span style={themeStyles.infoIconWrap} className="info-icon-wrap">
              <FaEnvelope />
            </span>
            <div>
              <h3 style={themeStyles.infoSubtitle}>Email</h3>
              <p style={themeStyles.infoText}>asudhabeauty@gmail.com</p>
            </div>
          </div>

          <div style={themeStyles.infoItem} className="info-item">
            <span style={themeStyles.infoIconWrap} className="info-icon-wrap">
              <FaMapMarkerAlt />
            </span>
            <div>
              <h3 style={themeStyles.infoSubtitle}>Visit Our Store</h3>
              <p style={themeStyles.infoText}>
                Shop No. 51/T-11/28, Pandariba Gali
                <br />
                Shahmaruf, Gorakhpur - 273001
              </p>
            </div>
          </div>

          <div style={themeStyles.infoItem} className="info-item">
            <span style={themeStyles.infoIconWrap} className="info-icon-wrap">
              <FaClock />
            </span>
            <div>
              <h3 style={themeStyles.infoSubtitle}>Business Hours</h3>
              <p style={themeStyles.infoText}>
                Mon - Sun: 10:00 AM - 7:00 PM
              </p>
            </div>
          </div>

          <div style={themeStyles.chatSection}>
            <div style={themeStyles.chatIcon}>👋</div>
            <h2 style={themeStyles.chatTitle}>Need Quick Help?</h2>
            <p style={themeStyles.chatText}>
              Chat with us on WhatsApp for instant support.
            </p>
            <a
              href="https://wa.me/917518217726"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button style={themeStyles.chatButton} className="chat-btn">
                <FaWhatsapp /> Chat Now
              </button>
            </a>
          </div>

          <div style={themeStyles.socialSection}>
            <p style={themeStyles.socialTitle}>Follow Us</p>
            <div style={themeStyles.socialLinks}>
              <a
                href="https://www.instagram.com/asudha_beauty"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                className="social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/asudhabeauty"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                className="social-link"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com/asudhabeauty"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                className="social-link"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                className="social-link"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div style={themeStyles.trustBadge}>
            <FaHeart
              style={{ ...themeStyles.trustIcon, color: brandColors.primary }}
            />
            <span>100% Natural</span>
            <span>•</span>
            <FaLeaf
              style={{ ...themeStyles.trustIcon, color: brandColors.green }}
            />
            <span>Ayurvedic Care</span>
            <span>•</span>
            <FaCheckCircle
              style={{ ...themeStyles.trustIcon, color: brandColors.green }}
            />
            <span>5000+ Trusted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;