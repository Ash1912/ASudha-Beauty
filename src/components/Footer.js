import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaApple,
  FaGooglePay,
  FaAmazonPay,
  FaArrowUp,
  FaHeart,
  FaLeaf,
  FaShoppingBag,
  FaGem,
  FaTags,
  FaBlog,
  FaEye,
  FaTruck,
  FaStar,
  FaUserCircle,
  FaLock,
  FaQuestionCircle,
  FaInfoCircle,
  FaGift,
  FaNewspaper,
  FaRegHeart,
  FaPaperPlane,
} from "react-icons/fa";
import { SiRazorpay, SiPaytm, SiPhonepe } from "react-icons/si";

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

const Footer = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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

  const getLogoFilter = () =>
    isDarkMode ? "brightness(0) invert(1)" : "brightness(0)";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterSubscribed(true);
      setEmail("");
      setTimeout(() => setNewsletterSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;
  const isMedium = windowWidth <= 1024;

  const getGridColumns = () => {
    if (isMobile) return "1fr";
    if (isNarrow) return "repeat(2, 1fr)";
    if (isMedium) return "repeat(4, 1fr)";
    return "repeat(5, 1fr)";
  };

  const additionalLinks = [
    { name: "New Arrivals", link: "/shop?sort=new", icon: <FaGem /> },
    { name: "Best Sellers", link: "/shop?sort=best-selling", icon: <FaStar /> },
    { name: "Offers", link: "/shop?sort=offers", icon: <FaGift /> },
    { name: "Sale", link: "/shop?sort=sale", icon: <FaTags /> },
    { name: "Gift Cards", link: "/gift-cards", icon: <FaGift /> },
  ];

  const helpLinks = [
    { name: "FAQs", link: "/faqs", icon: <FaQuestionCircle /> },
    { name: "Shipping Info", link: "/shipping", icon: <FaTruck /> },
    { name: "Returns & Exchanges", link: "/returns", icon: <FaTags /> },
    { name: "Track Order", link: "/track-order", icon: <FaEye /> },
    { name: "Product Guide", link: "/size-guide", icon: <FaInfoCircle /> },
    { name: "Terms & Conditions", link: "/terms", icon: <FaLock /> },
  ];

  const resourceLinks = [
    { name: "Blog", link: "/blog", icon: <FaBlog /> },
    { name: "Beauty Tips", link: "/blog?category=beauty-tips", icon: <FaNewspaper /> },
    { name: "Tutorials", link: "/blog?category=tutorials", icon: <FaEye /> },
    { name: "Customer Reviews", link: "/testimonials", icon: <FaStar /> },
    { name: "Affiliate Program", link: "/affiliate", icon: <FaHeart /> },
    { name: "Become a Partner", link: "/partners", icon: <FaUserCircle /> },
  ];

  // ─── Injected CSS (theme-dependent) ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-footer-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-footer-styles", "true");
    style.textContent = `
      @keyframes ftFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      @keyframes ftFadeUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .footer-orb {
        animation: ftFloat 12s ease-in-out infinite;
      }
      .footer-newsletter-success {
        animation: ftFadeUp 0.35s ease;
      }

      /* All links: subtle underline + icon tint */
      .footer-link {
        position: relative;
        transition: color 0.25s ease, transform 0.25s ease,
                    padding-left 0.25s ease;
      }
      .footer-link svg {
        color: ${
          isDarkMode ? "rgba(212,175,55,0.65)" : "rgba(199,125,66,0.7)"
        };
        transition: color 0.25s ease, transform 0.25s ease;
      }
      .footer-link:hover {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        transform: translateX(4px);
      }
      .footer-link:hover svg {
        color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        transform: scale(1.15);
      }

      /* Social icons */
      .footer-social {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .footer-social:hover {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        transform: translateY(-5px) rotate(-6deg);
        box-shadow: 0 12px 26px rgba(245, 52, 107, 0.4);
      }

      /* Payment icons */
      .footer-pay {
        transition: transform 0.25s ease, color 0.25s ease,
                    background-color 0.25s ease;
      }
      .footer-pay:hover {
        transform: translateY(-3px);
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
      }

      /* Newsletter input focus ring */
      .footer-input:focus {
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.bronze
        } !important;
        box-shadow: 0 0 0 4px ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.18)"
            : "rgba(199, 125, 66, 0.12)"
        };
      }
      .footer-input::placeholder {
        color: ${
          isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(62,39,35,0.35)"
        };
      }

      /* Newsletter button */
      .footer-subscribe {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .footer-subscribe:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
      }

      /* Back to top */
      .footer-back-top {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .footer-back-top:hover {
        transform: translateY(-4px) scale(1.05);
        box-shadow: 0 14px 34px rgba(245, 52, 107, 0.55);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-footer-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const themeStyles = {
    // ─── Footer wrapper ───
    footer: {
      position: "relative",
      backgroundColor: T.bg,
      padding: isMobile ? "2.5rem 0 1rem 0" : "3.5rem 0 1.25rem 0",
      marginTop: "3rem",
      borderTop: `1px solid ${T.borderSoft}`,
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxShadow: isDarkMode
        ? "0 -10px 40px rgba(0,0,0,0.4)"
        : "0 -10px 40px rgba(62, 39, 35, 0.05)",
      overflow: "hidden",
    },
    // Decorative ambient orbs
    footerOrb1: {
      position: "absolute",
      top: "-120px",
      left: "-120px",
      width: "360px",
      height: "360px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(245, 52, 107, 0.18) 0%, transparent 70%)",
      filter: "blur(80px)",
      pointerEvents: "none",
      opacity: isDarkMode ? 0.6 : 0.4,
      zIndex: 0,
    },
    footerOrb2: {
      position: "absolute",
      bottom: "-120px",
      right: "-120px",
      width: "360px",
      height: "360px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(212, 175, 55, 0.18) 0%, transparent 70%)",
      filter: "blur(80px)",
      pointerEvents: "none",
      opacity: isDarkMode ? 0.6 : 0.4,
      zIndex: 0,
    },
    container: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "0 0.85rem" : "0 1.25rem",
    },

    // ─── Newsletter block ───
    newsletterSection: {
      position: "relative",
      backgroundColor: T.card,
      padding: isMobile ? "1.75rem 1.25rem" : "2.75rem 2.5rem",
      borderRadius: "24px",
      marginBottom: "3rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      overflow: "hidden",
      boxShadow: T.shadow,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    newsletterAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    newsletterIconWrap: {
      width: "56px",
      height: "56px",
      margin: "0 auto 1rem",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.35rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
    },
    newsletterTitle: {
      fontSize: isMobile ? "1.2rem" : "1.5rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.3px",
    },
    newsletterText: {
      fontSize: isMobile ? "0.88rem" : "0.98rem",
      color: T.textMuted,
      marginBottom: "1.5rem",
      maxWidth: "500px",
      margin: "0 auto 1.5rem",
      lineHeight: "1.7",
    },
    newsletterForm: {
      display: "flex",
      gap: "0.75rem",
      maxWidth: "520px",
      margin: "0 auto",
      flexDirection: isMobile ? "column" : "row",
    },
    newsletterInput: {
      flex: 1,
      padding: isMobile ? "0.9rem 1.25rem" : "0.95rem 1.35rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      border: `1.5px solid ${T.border}`,
      borderRadius: "50px",
      color: T.text,
      fontSize: "0.95rem",
      outline: "none",
      fontFamily: "inherit",
      fontWeight: "600",
      transition: "all 0.3s ease",
      minWidth: 0,
    },
    newsletterButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.9rem 1.5rem" : "0.95rem 2rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "0.95rem",
      fontWeight: "800",
      cursor: "pointer",
      whiteSpace: "nowrap",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },
    newsletterSuccess: {
      marginTop: "1rem",
      padding: "0.7rem 1.15rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.1)",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      borderRadius: "50px",
      fontSize: "0.88rem",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.28)" : "rgba(76, 175, 80, 0.2)"
      }`,
      fontWeight: "700",
    },

    // ─── Grid ───
    grid: {
      display: "grid",
      gridTemplateColumns: getGridColumns(),
      gap: isMobile ? "2rem" : isNarrow ? "2.5rem" : "2.75rem",
      marginBottom: "2.5rem",
    },
    section: {
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
    },
    heading: {
      fontSize: isMobile ? "1rem" : "1.1rem",
      fontWeight: "900",
      marginBottom: "1.15rem",
      color: T.text,
      position: "relative",
      paddingBottom: "0.6rem",
      borderBottom: `2px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(199, 125, 66, 0.15)"
      }`,
      letterSpacing: "0.3px",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    // Tri-color underline accent for headings
    headingAccent: {
      position: "absolute",
      left: 0,
      bottom: "-2px",
      height: "2px",
      width: "42px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      borderRadius: "2px",
    },
    text: {
      color: T.textMuted,
      lineHeight: "1.8",
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      marginBottom: "1.25rem",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      marginBottom: "0.65rem",
    },
    link: {
      color: T.textMuted,
      textDecoration: "none",
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      lineHeight: "1.8",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6rem",
      cursor: "pointer",
      fontWeight: "600",
    },
    contactInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "0.85rem",
      marginTop: "1rem",
    },
    contactItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
      color: T.textMuted,
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      lineHeight: "1.6",
      fontWeight: "600",
    },
    contactIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      fontSize: isMobile ? "1rem" : "1.05rem",
      minWidth: "20px",
      marginTop: "0.15rem",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: "0.4rem 0.9rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.12)"
        : "rgba(76, 175, 80, 0.08)",
      borderRadius: "50px",
      fontSize: "0.75rem",
      fontWeight: "800",
      color: brandColors.green,
      marginTop: "0.5rem",
      width: "fit-content",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.22)" : "rgba(76, 175, 80, 0.18)"
      }`,
      letterSpacing: "0.2px",
    },

    // ─── Social ───
    socialLinks: {
      display: "flex",
      gap: isMobile ? "0.6rem" : "0.75rem",
      flexWrap: "wrap",
      marginTop: "0.5rem",
      marginBottom: "1.5rem",
    },
    socialLink: {
      color: T.textMuted,
      fontSize: isMobile ? "1rem" : "1.05rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: isMobile ? "40px" : "44px",
      height: isMobile ? "40px" : "44px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(62, 39, 35, 0.04)",
      border: `1px solid ${T.borderSoft}`,
      textDecoration: "none",
    },

    // ─── Payment block ───
    paymentSection: {
      marginTop: "0.5rem",
      padding: isMobile ? "1.25rem 1rem" : "1.5rem 1.25rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.03)"
        : "rgba(62, 39, 35, 0.03)",
      borderRadius: "18px",
      textAlign: "center",
      border: `1px solid ${T.borderSoft}`,
    },
    paymentTitle: {
      fontSize: isMobile ? "0.78rem" : "0.82rem",
      fontWeight: "800",
      marginBottom: "1rem",
      color: T.text,
      letterSpacing: "0.4px",
      textTransform: "uppercase",
    },
    paymentIcons: {
      display: "flex",
      gap: isMobile ? "0.55rem" : "0.65rem",
      justifyContent: "center",
      flexWrap: "wrap",
      alignItems: "center",
    },
    // ✅ Payment icon "chip" — light pill so the icon is always visible
    paymentIconChip: {
      width: isMobile ? "40px" : "46px",
      height: isMobile ? "28px" : "30px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#ffffff" : "#ffffff",
      borderRadius: "8px",
      border: `1px solid ${T.borderSoft}`,
      boxShadow: isDarkMode
        ? "0 2px 8px rgba(0,0,0,0.35)"
        : "0 2px 8px rgba(62, 39, 35, 0.08)",
    },
    // ✅ Icon itself — always dark on white chip so it's ALWAYS visible
    paymentIcon: {
      fontSize: isMobile ? "1.1rem" : "1.25rem",
      color: isDarkMode ? "#1a1a1a" : brandColors.earthDark,
    },

    // ─── Footer bottom ───
    footerBottom: {
      display: "flex",
      flexDirection: isNarrow ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      padding: "1.5rem 0 0.75rem 0",
      borderTop: `1px solid ${T.divider}`,
      marginTop: "1rem",
    },
    copyright: {
      color: T.textMuted,
      fontSize: isMobile ? "0.75rem" : "0.85rem",
      textAlign: isNarrow ? "center" : "left",
      fontWeight: "600",
      margin: 0,
    },
    footerLinks: {
      display: "flex",
      gap: isMobile ? "0.9rem" : "1.5rem",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    footerLink: {
      color: T.textMuted,
      textDecoration: "none",
      fontSize: isMobile ? "0.75rem" : "0.85rem",
      transition: "color 0.25s ease",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      fontWeight: "600",
    },

    // ─── Back to top ───
    backToTop: {
      position: "fixed",
      bottom: "2rem",
      right: "2rem",
      width: isMobile ? "46px" : "52px",
      height: isMobile ? "46px" : "52px",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: showBackToTop ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "none",
      fontSize: isMobile ? "1.15rem" : "1.3rem",
      boxShadow: "0 14px 34px rgba(245, 52, 107, 0.4)",
      zIndex: 100,
    },
  };

  return (
    <footer style={themeStyles.footer}>
      {/* Ambient background orbs */}
      <div
        className="footer-orb"
        style={themeStyles.footerOrb1}
        aria-hidden="true"
      />
      <div
        className="footer-orb"
        style={themeStyles.footerOrb2}
        aria-hidden="true"
      />

      <div style={themeStyles.container}>
        {/* ─── Newsletter ─── */}
        <div style={themeStyles.newsletterSection}>
          <div style={themeStyles.newsletterAccentBar} />
          <div style={themeStyles.newsletterIconWrap}>
            <FaRegHeart />
          </div>
          <h3 style={themeStyles.newsletterTitle}>Join the ASudha Family</h3>
          <p style={themeStyles.newsletterText}>
            Get 10% off your first order and receive natural beauty tips &
            exclusive offers.
          </p>
          <form
            style={themeStyles.newsletterForm}
            onSubmit={handleNewsletterSubmit}
          >
            <input
              type="email"
              placeholder="Your email address"
              style={themeStyles.newsletterInput}
              className="footer-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              style={themeStyles.newsletterButton}
              className="footer-subscribe"
            >
              <FaPaperPlane /> Subscribe
            </button>
          </form>
          {newsletterSubscribed && (
            <div
              style={themeStyles.newsletterSuccess}
              className="footer-newsletter-success"
              role="status"
            >
              <FaHeart /> Welcome to the family! Thanks for subscribing.
            </div>
          )}
        </div>

        {/* ─── Grid ─── */}
        <div style={themeStyles.grid}>
          {/* Brand */}
          <div style={themeStyles.section}>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                marginBottom: "1.15rem",
              }}
            >
              <img
                src="/assets/images/Logo.png"
                alt="ASudha Beauty"
                style={{
                  height: "52px",
                  width: "auto",
                  maxWidth: "170px",
                  filter: getLogoFilter(),
                  objectFit: "contain",
                  transition: "filter 0.3s ease",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
            </Link>
            <p style={themeStyles.text}>
              Pure. Natural. You. Empowering you with the goodness of Ayurveda
              to feel confident and embrace your natural radiance.
            </p>
            <div style={themeStyles.badge}>
              <FaLeaf /> 100% Natural & Ayurvedic
            </div>
            <div style={themeStyles.badge}>
              <FaHeart /> Proudly Made in India
            </div>

            <div style={themeStyles.contactInfo}>
              <div style={themeStyles.contactItem}>
                <FaMapMarkerAlt style={themeStyles.contactIcon} />
                <span>
                  Shop No. 51/T-11/28, Pandariba Gali, Shahmaruf, Gorakhpur -
                  273001
                </span>
              </div>
              <div style={themeStyles.contactItem}>
                <FaPhone style={themeStyles.contactIcon} />
                <span>+91-7518217726</span>
              </div>
              <div style={themeStyles.contactItem}>
                <FaEnvelope style={themeStyles.contactIcon} />
                <span>asudhabeauty@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>
              Shop
              <span style={themeStyles.headingAccent} aria-hidden="true" />
            </h3>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}>
                <Link
                  to="/shop"
                  style={themeStyles.link}
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  <FaShoppingBag /> Shop All
                </Link>
              </li>
              {additionalLinks.map((link, index) => (
                <li key={index} style={themeStyles.listItem}>
                  <Link
                    to={link.link}
                    style={themeStyles.link}
                    className="footer-link"
                    onClick={handleLinkClick}
                  >
                    {link.icon} {link.name}
                  </Link>
                </li>
              ))}
              <li style={themeStyles.listItem}>
                <Link
                  to="/shop?category=Skincare"
                  style={themeStyles.link}
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  <FaLeaf /> Herbal Skincare
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/shop?category=Face"
                  style={themeStyles.link}
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  <FaTags /> Face Powders
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/shop?category=Hair"
                  style={themeStyles.link}
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  <FaTags /> Hair Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>
              Quick Links
              <span style={themeStyles.headingAccent} aria-hidden="true" />
            </h3>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}>
                <Link
                  to="/about"
                  style={themeStyles.link}
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  About Us
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/blog"
                  style={themeStyles.link}
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  <FaBlog /> Blog
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/contact"
                  style={themeStyles.link}
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  Contact Us
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/wishlist"
                  style={themeStyles.link}
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  <FaHeart /> Wishlist
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/track-order"
                  style={themeStyles.link}
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  <FaEye /> Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>
              Help & Support
              <span style={themeStyles.headingAccent} aria-hidden="true" />
            </h3>
            <ul style={themeStyles.list}>
              {helpLinks.map((link, index) => (
                <li key={index} style={themeStyles.listItem}>
                  <Link
                    to={link.link}
                    style={themeStyles.link}
                    className="footer-link"
                    onClick={handleLinkClick}
                  >
                    {link.icon} {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>
              Resources
              <span style={themeStyles.headingAccent} aria-hidden="true" />
            </h3>
            <ul style={themeStyles.list}>
              {resourceLinks.map((link, index) => (
                <li key={index} style={themeStyles.listItem}>
                  <Link
                    to={link.link}
                    style={themeStyles.link}
                    className="footer-link"
                    onClick={handleLinkClick}
                  >
                    {link.icon} {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3
              style={{
                ...themeStyles.heading,
                marginTop: "1.75rem",
              }}
            >
              Connect With Us
              <span style={themeStyles.headingAccent} aria-hidden="true" />
            </h3>
            <div style={themeStyles.socialLinks}>
              <a
                href="https://www.instagram.com/asudha_beauty?utm_source=qr&igsh=aGY4bHp3aGo2MzN6"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                className="footer-social"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                className="footer-social"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                className="footer-social"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                className="footer-social"
                aria-label="Pinterest"
              >
                <FaPinterest />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                className="footer-social"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>

            {/* Payment block — icons always visible on white chips */}
            <div style={themeStyles.paymentSection}>
              <h4 style={themeStyles.paymentTitle}>
                Trusted & Secure Payments
              </h4>
              <div style={themeStyles.paymentIcons}>
                <span style={themeStyles.paymentIconChip}>
                  <FaCcVisa
                    style={themeStyles.paymentIcon}
                    className="footer-pay"
                  />
                </span>
                <span style={themeStyles.paymentIconChip}>
                  <FaCcMastercard
                    style={themeStyles.paymentIcon}
                    className="footer-pay"
                  />
                </span>
                <span style={themeStyles.paymentIconChip}>
                  <FaCcPaypal
                    style={themeStyles.paymentIcon}
                    className="footer-pay"
                  />
                </span>
                <span style={themeStyles.paymentIconChip}>
                  <FaCcAmex
                    style={themeStyles.paymentIcon}
                    className="footer-pay"
                  />
                </span>
                <span style={themeStyles.paymentIconChip}>
                  <FaApple
                    style={themeStyles.paymentIcon}
                    className="footer-pay"
                  />
                </span>
                <span style={themeStyles.paymentIconChip}>
                  <FaGooglePay
                    style={themeStyles.paymentIcon}
                    className="footer-pay"
                  />
                </span>
                <span style={themeStyles.paymentIconChip}>
                  <FaAmazonPay
                    style={themeStyles.paymentIcon}
                    className="footer-pay"
                  />
                </span>
                <span style={themeStyles.paymentIconChip}>
                  <SiRazorpay
                    style={themeStyles.paymentIcon}
                    className="footer-pay"
                  />
                </span>
                <span style={themeStyles.paymentIconChip}>
                  <SiPaytm
                    style={themeStyles.paymentIcon}
                    className="footer-pay"
                  />
                </span>
                <span style={themeStyles.paymentIconChip}>
                  <SiPhonepe
                    style={themeStyles.paymentIcon}
                    className="footer-pay"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Footer bottom ─── */}
        <div style={themeStyles.footerBottom}>
          <p style={themeStyles.copyright}>
            &copy; {new Date().getFullYear()} ASudha Beauty. All rights
            reserved.
          </p>
          <div style={themeStyles.footerLinks}>
            <Link
              to="/privacy"
              style={themeStyles.footerLink}
              className="footer-link"
              onClick={handleLinkClick}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={themeStyles.footerLink}
              className="footer-link"
              onClick={handleLinkClick}
            >
              Terms of Service
            </Link>
            <Link
              to="/shipping"
              style={themeStyles.footerLink}
              className="footer-link"
              onClick={handleLinkClick}
            >
              Shipping Policy
            </Link>
            <Link
              to="/returns"
              style={themeStyles.footerLink}
              className="footer-link"
              onClick={handleLinkClick}
            >
              Returns
            </Link>
          </div>
        </div>
      </div>

      <button
        style={themeStyles.backToTop}
        className="footer-back-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;