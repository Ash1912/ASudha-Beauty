// src/pages/Contact.jsx
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";
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
  FaCheckCircle,
  FaUser,
  FaComment,
  FaSpa,
  FaPaperPlane,
  FaHeadset,
  FaExclamationTriangle,
  FaSpinner, 
} from "react-icons/fa";

// ─── Site constants ───
const SITE_URL = "https://www.asudhabeauty.shop";
const WA_NUMBER = "917518217726";

// 👇 YOUR WEB3FORMS ACCESS KEY 👇
const WEB3FORMS_ACCESS_KEY = "9cabea26-5fe3-48de-9063-d4eafbc8b677";

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
  whatsapp: "#25D366",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(""); 
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
    danger: "#ff8a80",
    shadow: DARK_SHADOW,
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
    danger: "#c62828",
    shadow: LIGHT_SHADOW,
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (submitError) setSubmitError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = "Please write a slightly longer message (min 10 chars)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      if (firstError) document.getElementById(firstError)?.focus();
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      // 👇 Sends data to Web3Forms API with better error checking 👇
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Contact Form Message from ${formData.name}`, // ✅ Added subject to prevent spam blocks
          from_name: "ASudha Beauty Website", // ✅ Added sender name
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 8000);
      } else {
        console.error("Web3Forms Error:", result); // ✅ Logs exact error to DevTools
        setSubmitError(result.message || "Something went wrong. Please try again or email us directly.");
      }
    } catch (error) {
      console.error("Network Error:", error); // ✅ Logs network error (e.g., AdBlocker)
      setSubmitError("Network error. Please check your connection or disable your AdBlocker and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── JSON-LD: ContactPage ───
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#webpage`,
    url: `${SITE_URL}/contact`,
    name: "Contact Us | ASudha Beauty",
    description: "Get in touch with ASudha Beauty for product questions, support, and wholesale inquiries.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: {
      "@type": "Organization",
      name: "ASudha Beauty",
      telephone: "+91-7518217726",
      email: "asudhabeauty@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop No. 51/T-11/28, Pandariba Gali, Shahmaruf",
        addressLocality: "Gorakhpur",
        addressRegion: "UP",
        postalCode: "273001",
        addressCountry: "IN",
      }
    }
  };

  // ─── Injected CSS ───
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
      .contact-input[aria-invalid="true"] {
        border-color: ${brandColors.danger} !important;
      }
      .contact-input[aria-invalid="true"]:focus {
        box-shadow: 0 0 0 4px rgba(244, 67, 54, 0.15) !important;
      }

      .submit-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .submit-btn:hover:not(:disabled),
      .submit-btn:focus-visible:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
        outline: none;
      }
      .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .spinner {
        animation: spin 1s linear infinite;
      }

      .chat-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .chat-btn:hover,
      .chat-btn:focus-visible {
        transform: translateY(-3px);
        box-shadow: 0 14px 32px rgba(37, 211, 102, 0.5);
        outline: none;
      }

      .social-link {
        transition: all 0.3s ease;
      }
      .social-link:hover,
      .social-link:focus-visible {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        transform: translateY(-4px) rotate(-6deg);
        box-shadow: 0 12px 24px rgba(245, 52, 107, 0.35);
        outline: none;
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

      .info-link {
        color: inherit;
        text-decoration: none;
        transition: color 0.2s ease;
      }
      .info-link:hover {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary};
      }

      @media (prefers-reduced-motion: reduce) {
        .submit-btn, .chat-btn, .social-link, .info-item, .info-icon-wrap, .spinner {
          transition: none !important;
          transform: none !important;
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-contact-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
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
    hero: {
      textAlign: "center",
      padding: isMobile ? "1.5rem 0 2rem" : "2rem 0 3rem",
      position: "relative",
      zIndex: 1,
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
    contactGrid: {
      display: "grid",
      gridTemplateColumns: isNarrow ? "1fr" : "1.05fr 1fr",
      gap: isNarrow ? "1.5rem" : "2rem",
      position: "relative",
      zIndex: 1,
    },
    // ─── Form Section ───
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
    errorMessage: {
      backgroundColor: isDarkMode
        ? "rgba(244, 67, 54, 0.15)"
        : "rgba(244, 67, 54, 0.1)",
      color: isDarkMode ? "#ff8a80" : "#c62828",
      padding: "0.85rem 1rem",
      borderRadius: "14px",
      marginBottom: "1.25rem",
      border: `1px solid ${
        isDarkMode ? "rgba(244, 67, 54, 0.25)" : "rgba(244, 67, 54, 0.18)"
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
    fieldError: {
      fontSize: "0.75rem",
      color: T.danger,
      fontWeight: "700",
      marginTop: "0.35rem",
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
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

    // ─── Info Section ───
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

    // ─── WhatsApp Chat Card ───
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
      color: brandColors.whatsapp,
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

    // ─── Social Section ───
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

    // ─── Trust Badge ───
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
      <SEO
        title="Contact Us | ASudha Beauty — Natural Ayurvedic Skincare Support"
        description="Get in touch with ASudha Beauty for product questions, order support, and wholesale inquiries. Call, email, or chat with us on WhatsApp. Visit our store in Gorakhpur."
        keywords="contact asudha beauty, ayurvedic skincare support, natural beauty store gorakhpur, wholesale ayurvedic products contact"
        url="/contact"
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Contact Us", url: "/contact" }
        ]}
        citations={[
          { label: "Consumer Protection Act, 2019", href: "https://consumeraffairs.nic.in/" },
          { label: "National Consumer Helpline", href: "https://consumerhelpline.gov.in/" }
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <div style={themeStyles.bgOrb1} aria-hidden="true" />
      <div style={themeStyles.bgOrb2} aria-hidden="true" />

      <main>
        <header style={themeStyles.hero}>
          <h1 style={themeStyles.title}>
            Connect with Us
            <span style={themeStyles.titleAccent} aria-hidden="true" />
          </h1>
          <p style={themeStyles.subtitle}>
            Have questions about our Ayurvedic powders? Need help choosing the
            right product? We&apos;re here to guide you on your natural beauty
            journey.
          </p>
        </header>

        <div style={themeStyles.contactGrid}>
          <section style={themeStyles.formSection} aria-labelledby="contact-form-title">
            <div style={themeStyles.formAccentBar} aria-hidden="true" />
            <div style={themeStyles.formTitleRow}>
              <span style={themeStyles.formTitleIcon} aria-hidden="true">
                <FaComment />
              </span>
              <h2 id="contact-form-title" style={themeStyles.formTitle}>
                Send Us a Message
              </h2>
            </div>
            <p style={themeStyles.formSubtitle}>
              We&apos;ll respond within 24 hours.
            </p>

            {isSubmitted && (
              <div
                style={themeStyles.successMessage}
                role="status"
                aria-live="polite"
              >
                <FaCheckCircle aria-hidden="true" /> Thank you! We&apos;ll get back to you soon.
              </div>
            )}

            {submitError && (
              <div
                style={themeStyles.errorMessage}
                role="alert"
                aria-live="assertive"
              >
                <FaExclamationTriangle aria-hidden="true" /> {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} style={themeStyles.form} noValidate>
              <div style={themeStyles.formGroup}>
                <label htmlFor="name" style={themeStyles.label}>
                  <FaUser aria-hidden="true" style={themeStyles.labelIcon} /> Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={themeStyles.input}
                  className="contact-input"
                  placeholder="Enter your full name"
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={isLoading}
                />
                {errors.name && (
                  <div id="name-error" style={themeStyles.fieldError} role="alert">
                    <FaExclamationTriangle aria-hidden="true" /> {errors.name}
                  </div>
                )}
              </div>

              <div style={themeStyles.formGroup}>
                <label htmlFor="email" style={themeStyles.label}>
                  <FaEnvelope aria-hidden="true" style={themeStyles.labelIcon} /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={themeStyles.input}
                  className="contact-input"
                  placeholder="your@email.com"
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={isLoading}
                />
                {errors.email && (
                  <div id="email-error" style={themeStyles.fieldError} role="alert">
                    <FaExclamationTriangle aria-hidden="true" /> {errors.email}
                  </div>
                )}
              </div>

              <div style={themeStyles.formGroup}>
                <label htmlFor="message" style={themeStyles.label}>
                  <FaComment aria-hidden="true" style={themeStyles.labelIcon} /> Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={themeStyles.textarea}
                  className="contact-input"
                  placeholder="How can we help you?"
                  rows="4"
                  aria-required="true"
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  disabled={isLoading}
                />
                {errors.message && (
                  <div id="message-error" style={themeStyles.fieldError} role="alert">
                    <FaExclamationTriangle aria-hidden="true" /> {errors.message}
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                style={themeStyles.submitButton} 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner aria-hidden="true" className="spinner" /> Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane aria-hidden="true" style={{ fontSize: "0.9rem" }} />
                    Send Message <FaArrowRight aria-hidden="true" style={{ fontSize: "0.8rem" }} />
                  </>
                )}
              </button>
            </form>
          </section>

          <section style={themeStyles.infoSection} aria-labelledby="contact-info-title">
            <div style={themeStyles.infoAccentBar} aria-hidden="true" />
            <div style={themeStyles.infoTitleRow}>
              <span style={themeStyles.infoTitleIcon} aria-hidden="true">
                <FaSpa />
              </span>
              <h2 id="contact-info-title" style={themeStyles.infoTitle}>
                Get in Touch
              </h2>
            </div>
            <p style={themeStyles.infoSub}>
              Reach out through any of these channels.
            </p>

            <div style={themeStyles.infoItem} className="info-item">
              <span style={themeStyles.infoIconWrap} className="info-icon-wrap" aria-hidden="true">
                <FaPhone />
              </span>
              <div>
                <h3 style={themeStyles.infoSubtitle}>Call Us</h3>
                <p style={themeStyles.infoText}>
                  <a href="tel:+917518217726" className="info-link">+91-7518217726</a>
                </p>
                <p style={themeStyles.infoText}>
                  <a href="tel:+919335975525" className="info-link">+91-9335975525</a>
                </p>
              </div>
            </div>

            <div style={themeStyles.infoItem} className="info-item">
              <span style={themeStyles.infoIconWrap} className="info-icon-wrap" aria-hidden="true">
                <FaEnvelope />
              </span>
              <div>
                <h3 style={themeStyles.infoSubtitle}>Email</h3>
                <p style={themeStyles.infoText}>
                  <a href="mailto:asudhabeauty@gmail.com" className="info-link">
                    asudhabeauty@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div style={themeStyles.infoItem} className="info-item">
              <span style={themeStyles.infoIconWrap} className="info-icon-wrap" aria-hidden="true">
                <FaMapMarkerAlt />
              </span>
              <div>
                <h3 style={themeStyles.infoSubtitle}>Visit Our Store</h3>
                <address style={{ ...themeStyles.infoText, fontStyle: "normal" }}>
                  Shop No. 51/T-11/28, Pandariba Gali
                  <br />
                  Shahmaruf, Gorakhpur - 273001
                </address>
              </div>
            </div>

            <div style={themeStyles.infoItem} className="info-item">
              <span style={themeStyles.infoIconWrap} className="info-icon-wrap" aria-hidden="true">
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
              <div style={themeStyles.chatIcon} aria-hidden="true">
                <FaHeadset />
              </div>
              <h2 style={themeStyles.chatTitle}>Need Quick Help?</h2>
              <p style={themeStyles.chatText}>
                Chat with us on WhatsApp for instant support.
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                aria-label="Chat with ASudha Beauty on WhatsApp"
              >
                <button style={themeStyles.chatButton} className="chat-btn">
                  <FaWhatsapp aria-hidden="true" /> Chat Now
                </button>
              </a>
            </div>

            <div style={themeStyles.socialSection}>
              <p style={themeStyles.socialTitle}>Follow Us</p>
              <div style={themeStyles.socialLinks}>
                <a
                  href="https://www.instagram.com/asudha_beauty?utm_source=qr&igsh=aGY4bHp3aGo2MzN6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={themeStyles.socialLink}
                  className="social-link"
                  aria-label="Follow ASudha Beauty on Instagram"
                >
                  <FaInstagram aria-hidden="true" />
                </a>
                <a
                  href="https://www.facebook.com/people/ASudha-Beauty/61596257331515/?sk=photos"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={themeStyles.socialLink}
                  className="social-link"
                  aria-label="Follow ASudha Beauty on Facebook"
                >
                  <FaFacebook aria-hidden="true" />
                </a>
              </div>
            </div>

            <div style={themeStyles.trustBadge}>
              <FaHeart
                aria-hidden="true"
                style={{ ...themeStyles.trustIcon, color: brandColors.primary }}
              />
              <span>100% Natural</span>
              <span aria-hidden="true">•</span>
              <FaLeaf
                aria-hidden="true"
                style={{ ...themeStyles.trustIcon, color: brandColors.green }}
              />
              <span>Ayurvedic Care</span>
              <span aria-hidden="true">•</span>
              <FaCheckCircle
                aria-hidden="true"
                style={{ ...themeStyles.trustIcon, color: brandColors.green }}
              />
              <span>5000+ Trusted</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;