// src/pages/ReturnsExchanges.jsx
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
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
  FaChevronDown,
  FaBookOpen,
  FaExternalLinkAlt,
  FaShoppingBag,
  FaQuestionCircle,
  FaSearchLocation,
} from "react-icons/fa";

// ─── Site constants ───
const SITE_URL = "https://www.asudhabeauty.shop";

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
  danger: "#f44336",
  info: "#2196f3",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

// ─── Content data (module scope: stable references) ───
const STEPS = [
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
      "Receive refund within 7–10 business days after inspection.",
  },
];

const POLICY_HIGHLIGHTS = [
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

const NON_RETURNABLE = [
  "Opened or used cosmetics (for hygiene reasons)",
  "Products without original packaging or tags",
  "Items damaged due to misuse",
  "Free items or promotional products",
  "Gift cards",
  "Products purchased more than 30 days ago",
];

const TIMELINE = [
  {
    step: 1,
    title: "Return Received",
    description: "We inspect your return within 2–3 business days.",
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
      "Allow 5–7 business days for the refund to reflect in your account.",
  },
];

const EXCHANGE_STEPS = [
  "Contact us within 15 days of delivery for size / variant exchanges.",
  "We'll arrange a free pickup for the original item from your doorstep.",
  "Your new item ships once we receive the return (subject to availability).",
];

// ─── Return FAQs (used for FAQPage schema AND visible accordion) ───
const RETURN_FAQS = [
  {
    q: "How do I return an ASudha Beauty product?",
    a: "Log into your account, go to your order history, and click 'Return Item'. You'll receive a prepaid return label via email within 24 hours. Pack the unused product in its original packaging, ship it back, and we'll process your refund within 7–10 business days of receiving it.",
  },
  {
    q: "What is the return window?",
    a: "You have 30 days from the date of delivery to initiate a return on eligible items. Requests received after 30 days cannot be accepted.",
  },
  {
    q: "How long does a refund take?",
    a: "After we receive and inspect your return (2–3 business days), we process the refund within 48 hours. Your bank then takes 5–7 business days to reflect the credit in your account — so the total is typically 7–10 business days.",
  },
  {
    q: "Can I exchange a product?",
    a: "Yes — exchanges for size or variant are available within 15 days of delivery. We arrange a free pickup of the original item, and ship the replacement once we receive it (subject to availability).",
  },
  {
    q: "Are opened products returnable?",
    a: "For hygiene reasons, opened or used cosmetics cannot be returned unless they arrived defective or damaged. If you received a defective item, contact us with photos and we'll arrange a free replacement or full refund.",
  },
  {
    q: "Who pays for return shipping?",
    a: "Return shipping is free for defective, damaged, or incorrect items. For change-of-mind returns on unused products, return shipping may be deducted from the refund unless otherwise stated on your order.",
  },
  {
    q: "How will I receive my refund?",
    a: "Refunds are issued to the original payment method. For Cash on Delivery orders, we'll arrange a bank transfer or UPI refund to the account details you provide.",
  },
];

// ─── Internal backlinks ───
const RELATED_PAGES = [
  {
    to: "/track-order",
    label: "Track your order",
    icon: <FaSearchLocation />,
  },
  {
    to: "/shipping",
    label: "Shipping information & timelines",
    icon: <FaTruck />,
  },
  {
    to: "/faqs",
    label: "Frequently asked questions",
    icon: <FaQuestionCircle />,
  },
  {
    to: "/terms",
    label: "Terms & Conditions",
    icon: <FaFileAlt />,
  },
  {
    to: "/contact",
    label: "Contact customer support",
    icon: <FaHeadset />,
  },
  {
    to: "/shop",
    label: "Continue shopping",
    icon: <FaShoppingBag />,
  },
];

// ─── Authoritative external hyperlinks (Indian consumer protection law) ───
const TRUSTED_SOURCES = [
  {
    label:
      "Consumer Protection Act, 2019 — Department of Consumer Affairs, Government of India",
    href: "https://consumeraffairs.nic.in/",
    domain: "consumeraffairs.nic.in",
  },
  {
    label:
      "Consumer Protection (E-Commerce) Rules 2020 — Department of Consumer Affairs",
    href: "https://consumeraffairs.nic.in/",
    domain: "consumeraffairs.nic.in",
  },
  {
    label: "National Consumer Helpline — Government of India",
    href: "https://consumerhelpline.gov.in/",
    domain: "consumerhelpline.gov.in",
  },
  {
    label: "Reserve Bank of India — Payment & Digital Commerce",
    href: "https://www.rbi.org.in/",
    domain: "rbi.org.in",
  },
];

const ReturnsExchanges = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [openFaq, setOpenFaq] = useState(null);

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

  // ─── JSON-LD: WebPage + BreadcrumbList + FAQPage ───
  const returnsJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/returns#webpage`,
          url: `${SITE_URL}/returns`,
          name: "Returns & Exchanges | ASudha Beauty",
          description:
            "Easy 30-day returns and exchanges on all ASudha Beauty natural Ayurvedic products. Learn how to initiate a return, our refund timeline, and non-returnable items.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: "en-IN",
          breadcrumb: { "@id": `${SITE_URL}/returns#breadcrumb` },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${SITE_URL}/assets/images/og-default.png`,
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL}/returns#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Returns & Exchanges",
              item: `${SITE_URL}/returns`,
            },
          ],
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/returns#faq`,
          mainEntity: RETURN_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        },
      ],
    }),
    []
  );

  const breadcrumb = useMemo(
    () => [
      { name: "Home", url: "/" },
      { name: "Returns & Exchanges", url: "/returns" },
    ],
    []
  );

  const citations = useMemo(
    () => TRUSTED_SOURCES.map((s) => ({ label: s.label, href: s.href })),
    []
  );

  // ─── Injected CSS — only depends on isDarkMode ───
  // T.shadowLift is inlined as isDarkMode ternary to satisfy
  // react-hooks/exhaustive-deps without eslint-disable comments.
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
      @keyframes rxFadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
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
        box-shadow: ${
          isDarkMode
            ? "0 22px 48px rgba(0, 0, 0, 0.7)"
            : "0 22px 48px rgba(62, 39, 35, 0.12)"
        };
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
        box-shadow: ${
          isDarkMode
            ? "0 22px 48px rgba(0, 0, 0, 0.7)"
            : "0 22px 48px rgba(62, 39, 35, 0.12)"
        };
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
        box-shadow: ${
          isDarkMode
            ? "0 22px 48px rgba(0, 0, 0, 0.7)"
            : "0 22px 48px rgba(62, 39, 35, 0.12)"
        };
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.35)"
            : "rgba(199, 125, 66, 0.25)"
        } !important;
      }

      .rx-cta-primary {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .rx-cta-primary:hover,
      .rx-cta-primary:focus-visible {
        transform: translateY(-3px);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
        gap: 0.75rem;
        outline: none;
      }
      .rx-cta-secondary {
        transition: transform 0.3s ease, border-color 0.3s ease,
                    color 0.3s ease;
      }
      .rx-cta-secondary:hover,
      .rx-cta-secondary:focus-visible {
        border-color: ${brandColors.primary} !important;
        color: ${brandColors.primary} !important;
        transform: translateY(-3px);
        outline: none;
      }

      /* FAQ toggle */
      .rx-faq-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        width: 100%;
        padding: 1rem 0;
        background: none;
        border: none;
        text-align: left;
        font-family: inherit;
        cursor: pointer;
        color: inherit;
        transition: color 0.25s ease;
      }
      .rx-faq-btn:hover,
      .rx-faq-btn:focus-visible {
        color: ${brandColors.primary} !important;
        outline: none;
      }
      .rx-faq-btn:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: 2px;
        border-radius: 6px;
      }
      .rx-faq-chevron {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
        color: ${isDarkMode ? brandColors.gold : brandColors.primary};
      }
      .rx-faq-answer {
        animation: rxFadeIn 0.3s ease;
      }

      /* Related / citation links */
      .rx-related-link {
        transition: color 0.25s ease, gap 0.25s ease;
      }
      .rx-related-link:hover,
      .rx-related-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        gap: 0.6rem;
        outline: none;
      }
      .rx-citation-link:hover,
      .rx-citation-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        outline: none;
      }
      .rx-breadcrumb-link:hover {
        text-decoration: underline;
      }

      @media (prefers-reduced-motion: reduce) {
        .rx-orb-1, .rx-orb-2, .rx-orb-3 { animation: none !important; }
        .rx-step-card, .rx-step-icon, .rx-highlight-card,
        .rx-highlight-icon, .rx-info-card, .rx-cta-primary,
        .rx-cta-secondary, .rx-faq-btn, .rx-faq-chevron,
        .rx-related-link, .rx-citation-link {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-returns-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  const themeStyles = {
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

    // ─── Breadcrumb ───
    breadcrumb: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1100px",
      margin: "0 auto",
      padding: isMobile ? "1rem 1rem 0" : "1.5rem 2rem 0",
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      fontSize: "0.78rem",
      color: T.textDim,
      flexWrap: "wrap",
      fontWeight: "600",
      boxSizing: "border-box",
    },
    breadcrumbLink: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "none",
      fontWeight: "700",
    },

    // ─── Header ───
    header: {
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      padding: isMobile
        ? "1.5rem 1rem 1.5rem"
        : isNarrow
        ? "2rem 1.5rem 1.5rem"
        : "2.5rem 2rem 2rem",
      maxWidth: "900px",
      margin: "0 auto",
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

    // ─── FAQ ───
    faqItem: {
      marginBottom: "0.5rem",
      borderBottom: `1px solid ${T.divider}`,
      paddingBottom: "0.35rem",
    },
    faqQuestion: {
      fontWeight: "800",
      fontSize: isMobile ? "0.92rem" : "1rem",
      color: T.text,
      lineHeight: "1.5",
      letterSpacing: "-0.1px",
      textAlign: "left",
      flex: 1,
      minWidth: 0,
    },
    faqAnswer: {
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      color: T.textMuted,
      lineHeight: "1.75",
      paddingBottom: "1rem",
      paddingRight: "2rem",
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

    // ─── Related pages (internal backlinks) ───
    relatedCard: {
      backgroundColor: T.card,
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      padding: isMobile ? "1.5rem" : "2rem",
      marginTop: "2rem",
      boxSizing: "border-box",
      width: "100%",
    },
    relatedTitle: {
      fontSize: "1.05rem",
      fontWeight: "800",
      color: T.text,
      marginBottom: "1.15rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      letterSpacing: "-0.2px",
    },
    relatedList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    relatedLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
      padding: "0.75rem 1rem",
      borderRadius: "10px",
      fontSize: "0.9rem",
      fontWeight: "600",
      color: T.textMuted,
      textDecoration: "none",
      border: `1px solid ${T.borderSoft}`,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.02)"
        : "rgba(62, 39, 35, 0.02)",
    },
    relatedIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
      fontSize: "0.8rem",
    },

    // ─── Sources (external hyperlinks) ───
    citationCard: {
      marginTop: "1.5rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.06)"
        : "rgba(212, 175, 55, 0.04)",
      borderRadius: "18px",
      padding: isMobile ? "1.5rem" : "1.75rem",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.15)"
        : "1px solid rgba(212, 175, 55, 0.12)",
      borderLeft: `4px solid ${brandColors.goldDark}`,
      boxSizing: "border-box",
      width: "100%",
    },
    citationTitle: {
      fontSize: "0.88rem",
      fontWeight: "800",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      marginBottom: "0.9rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    citationList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.55rem",
    },
    citationLink: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.5rem",
      fontSize: "0.83rem",
      fontWeight: "600",
      color: T.textMuted,
      textDecoration: "none",
      lineHeight: 1.5,
    },
    citationDomain: {
      fontSize: "0.7rem",
      color: T.textDim,
      marginTop: "0.1rem",
    },
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div style={themeStyles.container}>
      {/* ─── SEO: meta + JSON-LD + breadcrumb + citations ─── */}
      <SEO
        title="Returns & Exchanges | ASudha Beauty — 30-Day Easy Returns"
        description="Easy 30-day returns and exchanges on all ASudha Beauty natural Ayurvedic products. Learn how to initiate a return, our 7–10 day refund timeline, non-returnable items, and free return shipping."
        keywords="returns and exchanges, refund policy india, 30 day return policy, easy returns natural skincare, free returns ayurvedic products, exchange policy, how to return order"
        url="/returns"
        breadcrumb={breadcrumb}
        citations={citations}
      />

      {/* Extra JSON-LD: WebPage + BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(returnsJsonLd) }}
      />

      {/* Animated background */}
      <div style={themeStyles.bgLayer} aria-hidden="true">
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div className="rx-orb-1" style={themeStyles.bgOrb1} />
        <div className="rx-orb-2" style={themeStyles.bgOrb2} />
        <div className="rx-orb-3" style={themeStyles.bgOrb3} />
      </div>

      {/* Header */}
      <header style={themeStyles.header}>
        <h1 style={themeStyles.title}>
          Returns &amp; Exchanges
          <span style={themeStyles.titleAccent} aria-hidden="true" />
        </h1>
        <p style={themeStyles.subtitle}>
          We want you to love your purchase. If something isn&apos;t right,
          we&apos;re here to help.
        </p>
      </header>

      <main style={themeStyles.section}>
        {/* Quick info pills */}
        <div
          style={themeStyles.quickInfoStrip}
          role="list"
          aria-label="Return policy at a glance"
        >
          <span style={themeStyles.quickInfoPill} role="listitem">
            <FaClock aria-hidden="true" style={{ color: brandColors.primary }} />
            30-Day Window
          </span>
          <span style={themeStyles.quickInfoPill} role="listitem">
            <FaUndoAlt aria-hidden="true" style={{ color: brandColors.green }} />
            Free Returns
          </span>
          <span style={themeStyles.quickInfoPill} role="listitem">
            <FaCheckCircle aria-hidden="true" style={{ color: T.info }} />
            Full Refund
          </span>
        </div>

        {/* How to Return */}
        <h2 style={themeStyles.sectionHeading}>
          <span style={themeStyles.sectionIconWrap} aria-hidden="true">
            <FaExchangeAlt />
          </span>
          How to Return an Item
        </h2>
        <div
          style={themeStyles.stepsGrid}
          role="list"
          aria-label="Return process steps"
        >
          {STEPS.map((step, idx) => (
            <article
              key={step.title}
              style={themeStyles.stepCard}
              className="rx-step-card"
              role="listitem"
              aria-label={`Step ${idx + 1}: ${step.title}`}
            >
              <div style={themeStyles.stepCardAccent} aria-hidden="true" />
              <div
                style={themeStyles.stepIconWrapper}
                className="rx-step-icon"
                aria-hidden="true"
              >
                {step.icon}
              </div>
              <h3 style={themeStyles.stepTitle}>{step.title}</h3>
              <p style={themeStyles.stepDescription}>{step.description}</p>
            </article>
          ))}
        </div>

        {/* Policy highlights */}
        <h2 style={themeStyles.sectionHeading}>
          <span style={themeStyles.sectionIconWrap} aria-hidden="true">
            <FaShieldAlt />
          </span>
          Return Policy at a Glance
        </h2>
        <div
          style={themeStyles.highlightsGrid}
          role="list"
          aria-label="Return policy highlights"
        >
          {POLICY_HIGHLIGHTS.map((item) => (
            <article
              key={item.title}
              style={themeStyles.highlightCard}
              className="rx-highlight-card"
              role="listitem"
            >
              <div style={themeStyles.highlightCardAccent} aria-hidden="true" />
              <div
                style={themeStyles.highlightIconWrap}
                className="rx-highlight-icon"
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div style={themeStyles.highlightTitle}>{item.title}</div>
              <p style={themeStyles.highlightDescription}>
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* Non-returnable items */}
        <section
          style={themeStyles.infoCard}
          className="rx-info-card"
          aria-labelledby="non-returnable-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="non-returnable-title" style={themeStyles.sectionHeading}>
            <span
              style={{
                ...themeStyles.sectionIconWrap,
                background: `linear-gradient(135deg, ${brandColors.danger}, #ff8a80)`,
              }}
              aria-hidden="true"
            >
              <FaTimesCircle />
            </span>
            Non-Returnable Items
          </h2>
          {NON_RETURNABLE.map((item) => (
            <div key={item} style={themeStyles.listItem}>
              <FaTimesCircle
                aria-hidden="true"
                style={{ ...themeStyles.listIcon, color: T.danger }}
              />
              <span>{item}</span>
            </div>
          ))}
        </section>

        {/* Refund timeline */}
        <section
          style={themeStyles.infoCard}
          className="rx-info-card"
          aria-labelledby="refund-timeline-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="refund-timeline-title" style={themeStyles.sectionHeading}>
            <span style={themeStyles.sectionIconWrap} aria-hidden="true">
              <FaClock />
            </span>
            Refund Timeline
          </h2>
          <div style={themeStyles.timeline}>
            {TIMELINE.map((item) => (
              <div key={item.step} style={themeStyles.timelineItem}>
                <div style={themeStyles.timelineIcon} aria-hidden="true">
                  {item.step}
                </div>
                <div style={themeStyles.timelineContent}>
                  <div style={themeStyles.timelineTitle}>{item.title}</div>
                  <p style={themeStyles.timelineText}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exchange process */}
        <section
          style={themeStyles.infoCard}
          className="rx-info-card"
          aria-labelledby="exchange-process-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="exchange-process-title" style={themeStyles.sectionHeading}>
            <span style={themeStyles.sectionIconWrap} aria-hidden="true">
              <FaExchangeAlt />
            </span>
            Exchange Process
          </h2>
          {EXCHANGE_STEPS.map((step) => (
            <div key={step} style={themeStyles.listItem}>
              <FaCheckCircle
                aria-hidden="true"
                style={{ ...themeStyles.listIcon, color: brandColors.green }}
              />
              <span>{step}</span>
            </div>
          ))}
        </section>

        {/* ─── FAQ accordion (visible content matching FAQPage schema) ─── */}
        <section
          style={themeStyles.infoCard}
          className="rx-info-card"
          aria-labelledby="returns-faq-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="returns-faq-title" style={themeStyles.sectionHeading}>
            <span style={themeStyles.sectionIconWrap} aria-hidden="true">
              <FaQuestionCircle />
            </span>
            Returns &amp; Refunds FAQ
          </h2>
          {RETURN_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            const answerId = `return-faq-answer-${idx}`;
            return (
              <div key={faq.q} style={themeStyles.faqItem}>
                <button
                  type="button"
                  className="rx-faq-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span style={themeStyles.faqQuestion}>{faq.q}</span>
                  <FaChevronDown
                    aria-hidden="true"
                    className="rx-faq-chevron"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {isOpen && (
                  <div
                    id={answerId}
                    style={themeStyles.faqAnswer}
                    className="rx-faq-answer"
                    role="region"
                    aria-label={faq.q}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Help card */}
        <section
          style={{ ...themeStyles.infoCard, backgroundColor: T.cardAlt }}
          className="rx-info-card"
          aria-labelledby="help-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="help-title" style={themeStyles.sectionHeading}>
            <span style={themeStyles.sectionIconWrap} aria-hidden="true">
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
              aria-hidden="true"
              style={{
                color: isDarkMode ? T.gold : brandColors.bronze,
                marginRight: "0.5rem",
              }}
            />
            Our support team is here for you 24/7. If you have any questions
            about returns, exchanges, or refunds — reach out and we&apos;ll get
            back to you within 24 hours.
          </p>
        </section>

        {/* CTA */}
        <section style={themeStyles.ctaSection} aria-label="Return actions">
          <div style={themeStyles.ctaAccent} aria-hidden="true" />
          <h3 style={themeStyles.ctaHeading}>
            Need to track or return an order?
          </h3>
          <div style={themeStyles.ctaButtons}>
            <Link
              to="/track-order"
              style={themeStyles.ctaButton}
              className="rx-cta-primary"
            >
              <FaSearchLocation aria-hidden="true" /> Track Your Order{" "}
              <FaArrowRight aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              style={themeStyles.ctaSecondary}
              className="rx-cta-secondary"
            >
              <FaHeadset aria-hidden="true" /> Contact Support
            </Link>
          </div>
        </section>

        {/* ─── Related pages (internal backlinks) ─── */}
        <section
          style={themeStyles.relatedCard}
          aria-labelledby="related-pages-title"
        >
          <h2 id="related-pages-title" style={themeStyles.relatedTitle}>
            <FaBookOpen aria-hidden="true" /> Related Pages
          </h2>
          <ul style={themeStyles.relatedList}>
            {RELATED_PAGES.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  style={themeStyles.relatedLink}
                  className="rx-related-link"
                  aria-label={item.label}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <span style={themeStyles.relatedIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  <FaArrowRight
                    aria-hidden="true"
                    style={{ fontSize: "0.65rem", flexShrink: 0 }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Sources & References (external hyperlinks / E-E-A-T) ─── */}
        <section
          style={themeStyles.citationCard}
          aria-labelledby="returns-sources-title"
        >
          <h2
            id="returns-sources-title"
            style={themeStyles.citationTitle}
          >
            <FaShieldAlt aria-hidden="true" /> Consumer Protection &amp; Legal
            Framework
          </h2>
          <ul style={themeStyles.citationList}>
            {TRUSTED_SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={themeStyles.citationLink}
                  className="rx-citation-link"
                  aria-label={`${source.label} — opens in new tab`}
                >
                  <FaExternalLinkAlt
                    aria-hidden="true"
                    style={{
                      fontSize: "0.65rem",
                      marginTop: "0.2rem",
                      flexShrink: 0,
                      color: isDarkMode
                        ? brandColors.gold
                        : brandColors.bronze,
                    }}
                  />
                  <span>
                    {source.label}
                    <div style={themeStyles.citationDomain}>
                      {source.domain}
                    </div>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ReturnsExchanges;