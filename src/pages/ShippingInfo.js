// src/pages/ShippingInfo.jsx
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import SEO from "../components/SEO";
import {
  FaTruck,
  FaClock,
  FaMapMarkerAlt,
  FaBox,
  FaCheckCircle,
  FaShippingFast,
  FaGlobe,
  FaGlobeAmericas,
  FaQuestionCircle,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaLeaf,
  FaHeadset,
  FaBookOpen,
  FaExternalLinkAlt,
  FaArrowRight,
  FaUndo,
  FaShoppingBag,
  FaSearchLocation,
  FaShieldAlt,
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
  info: "#2196f3",
  warn: "#ff9800",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

// ─── Shipping methods (module scope) ───
const SHIPPING_METHODS = [
  {
    name: "Standard Shipping",
    icon: <FaTruck />,
    cost: "Free on orders ₹500+",
    deliveryTime: "5–7 business days",
    details: "Reliable delivery with tracking",
  },
  {
    name: "Express Shipping",
    icon: <FaShippingFast />,
    cost: "₹99",
    deliveryTime: "2–3 business days",
    details: "Priority handling and faster delivery",
  },
  {
    name: "Same Day Delivery",
    icon: <FaClock />,
    cost: "₹199",
    deliveryTime: "Same day (select cities)",
    details: "Order before 12 PM for same-day delivery",
  },
];

// ─── FAQ data (module scope: reused by JSON-LD + UI) ───
const SHIPPING_FAQS = [
  {
    q: "Can I change my shipping address after placing an order?",
    a: "Please contact us within 2 hours of placing your order. After that, we cannot guarantee address changes as orders are processed quickly.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order on our Track Order page.",
  },
  {
    q: "What if my package is delayed?",
    a: "While we strive for on-time delivery, sometimes delays occur due to weather, holidays, or carrier issues. If your package is significantly delayed, please contact our support team.",
  },
  {
    q: "Do you offer cash on delivery?",
    a: "Yes, COD is available for orders up to ₹5,000. A small convenience fee may apply.",
  },
  {
    q: "What are the shipping charges on ASudha Beauty?",
    a: "Shipping is free on all orders above ₹500 across India. For orders below ₹500, a flat ₹50 fee applies. Express and same-day shipping are available at additional cost.",
  },
  {
    q: "Do you ship across all pin codes in India?",
    a: "Yes, we ship to all serviceable pin codes across India — from metro cities to remote locations. Delivery times vary based on the pin code.",
  },
];

// ─── Internal backlinks (related pages) ───
const RELATED_PAGES = [
  {
    to: "/returns",
    label: "Returns & Exchanges policy",
    icon: <FaUndo />,
  },
  {
    to: "/track-order",
    label: "Track your order",
    icon: <FaSearchLocation />,
  },
  {
    to: "/faqs",
    label: "Frequently asked questions",
    icon: <FaQuestionCircle />,
  },
  {
    to: "/contact",
    label: "Contact customer support",
    icon: <FaHeadset />,
  },
  {
    to: "/shop",
    label: "Browse 100% natural products",
    icon: <FaShoppingBag />,
  },
];

// ─── Internal blog backlinks ───
const RELATED_READING = [
  {
    to: "/blog/1",
    label: "Multani Mitti benefits for glowing skin",
    icon: <FaLeaf />,
  },
  {
    to: "/blog/2",
    label: "Ubtan for glowing skin: the Ayurvedic ritual",
    icon: <FaLeaf />,
  },
  {
    to: "/blog/3",
    label: "Amla-Reetha-Shikakai natural hair care",
    icon: <FaLeaf />,
  },
];

// ─── Authoritative external hyperlinks (E-E-A-T + policy references) ───
const TRUSTED_SOURCES = [
  {
    label: "India Post — Speed Post & Parcel Services",
    href: "https://www.indiapost.gov.in/",
    domain: "indiapost.gov.in",
  },
  {
    label:
      "Department of Consumer Affairs — E-Commerce Rules, Government of India",
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

const ShippingInfo = () => {
  const { isDarkMode } = useTheme();
  const { getCartTotal, getCartCount } = useCart();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [openFaq, setOpenFaq] = useState(null);

  const cartTotal = Number(getCartTotal()) || 0;
  const cartCount = Number(getCartCount()) || 0;
  const freeShippingThreshold = 500;

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
    heading: brandColors.gold,
    info: "#64b5f6",
    warn: "#ffb74d",
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
    heading: brandColors.bronze,
    info: brandColors.info,
    warn: brandColors.warn,
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;
  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  const responsive = {
    containerPadding: isMobile ? "1rem" : isNarrow ? "1.5rem" : "2rem",
    fontSizeHeading: isMobile ? "1.9rem" : isNarrow ? "2.4rem" : "3rem",
    gridColumns: isMobile
      ? "minmax(0, 1fr)"
      : isNarrow
      ? "repeat(2, minmax(0, 1fr))"
      : "repeat(3, minmax(0, 1fr))",
  };

  const progressPercent = Math.min(
    (cartTotal / freeShippingThreshold) * 100,
    100
  );
  const remaining = Math.max(0, freeShippingThreshold - cartTotal);
  const qualified = cartTotal >= freeShippingThreshold;

  // ─── JSON-LD: FAQPage + BreadcrumbList + WebPage ───
  const shippingJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/shipping#faq`,
          mainEntity: SHIPPING_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL}/shipping#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Shipping Information",
              item: `${SITE_URL}/shipping`,
            },
          ],
        },
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/shipping#webpage`,
          url: `${SITE_URL}/shipping`,
          name: "Shipping Information | ASudha Beauty",
          description:
            "Free shipping on orders above ₹500 across India. Learn about our shipping options, delivery timelines, COD availability, and policies.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: {
            "@type": "Thing",
            name: "Shipping & delivery information for 100% natural Ayurvedic products in India",
          },
          breadcrumb: { "@id": `${SITE_URL}/shipping#breadcrumb` },
        },
      ],
    }),
    []
  );

  const breadcrumb = useMemo(
    () => [
      { name: "Home", url: "/" },
      { name: "Shipping Information", url: "/shipping" },
    ],
    []
  );

  const citations = useMemo(
    () =>
      TRUSTED_SOURCES.map((s) => ({
        label: s.label,
        href: s.href,
      })),
    []
  );

  // ─── Injected CSS — only depends on isDarkMode ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-shipping-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-shipping-styles", "true");
    style.textContent = `
      @keyframes shipFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes shipFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes shipFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }

      .ship-orb-1 { animation: shipFloat1 16s ease-in-out infinite; }
      .ship-orb-2 { animation: shipFloat2 20s ease-in-out infinite; }
      .ship-orb-3 { animation: shipFloat3 18s ease-in-out infinite; }

      .si-shipping-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s ease, border-color 0.3s ease;
      }
      .si-shipping-card:hover {
        transform: translateY(-8px);
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
      .si-shipping-card:hover .si-shipping-icon {
        transform: scale(1.08) rotate(-6deg);
        box-shadow: 0 14px 34px rgba(245, 52, 107, 0.45);
      }
      .si-shipping-icon {
        transition: transform 0.4s ease, box-shadow 0.35s ease;
      }

      .si-info-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .si-info-card:hover {
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

      .si-faq-toggle {
        transition: all 0.25s ease;
      }
      .si-faq-toggle:hover .si-faq-q {
        color: ${brandColors.primary} !important;
      }
      .si-faq-toggle:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: -2px;
        border-radius: 8px;
      }

      /* Related pages / reading list */
      .si-related-link {
        transition: color 0.25s ease, gap 0.25s ease;
      }
      .si-related-link:hover,
      .si-related-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        gap: 0.6rem;
        outline: none;
      }
      .si-citation-link:hover,
      .si-citation-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        outline: none;
      }
      .si-breadcrumb-link:hover {
        text-decoration: underline;
      }

      @media (prefers-reduced-motion: reduce) {
        .ship-orb-1, .ship-orb-2, .ship-orb-3 { animation: none !important; }
        .si-shipping-card, .si-info-card, .si-related-link, .si-citation-link {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-shipping-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  // ─── Theme styles ───
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
      fontSize: responsive.fontSizeHeading,
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
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      flexWrap: "wrap",
    },

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

    // ─── Free shipping progress ───
    progressContainer: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.5rem 1.25rem" : "1.75rem 1.6rem",
      marginBottom: "2.25rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    progressAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    progressTitle: {
      fontSize: isMobile ? "1rem" : "1.1rem",
      fontWeight: "800",
      marginBottom: "0.9rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.55rem",
      flexWrap: "wrap",
      letterSpacing: "-0.2px",
    },
    progressBarOuter: {
      height: "10px",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(62, 39, 35, 0.08)",
      borderRadius: "10px",
      overflow: "hidden",
      position: "relative",
    },
    progressBarInner: {
      height: "100%",
      background: qualified
        ? `linear-gradient(90deg, ${brandColors.green}, #8bc34a)`
        : `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      borderRadius: "10px",
      transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      width: `${progressPercent}%`,
      boxShadow: qualified
        ? "0 0 12px rgba(76, 175, 80, 0.5)"
        : "0 0 12px rgba(245, 52, 107, 0.5)",
    },
    progressText: {
      marginTop: "0.85rem",
      fontSize: "0.9rem",
      fontWeight: "700",
      color: qualified ? T.green : T.textMuted,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "0.5rem",
    },

    // ─── Section title ───
    sectionTitle: {
      fontSize: isMobile ? "1.15rem" : "1.35rem",
      fontWeight: "900",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      color: T.text,
      flexWrap: "wrap",
      letterSpacing: "-0.3px",
    },
    sectionTitleIconWrap: {
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
    shippingGrid: {
      display: "grid",
      gridTemplateColumns: responsive.gridColumns,
      gap: isMobile ? "1.25rem" : "1.5rem",
      marginBottom: "2.5rem",
    },
    shippingCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.75rem 1.35rem" : "2rem 1.6rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
    },
    shippingCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.85,
    },
    shippingIconWrapper: {
      width: "76px",
      height: "76px",
      margin: "0 auto 1.35rem",
      borderRadius: "22px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.9rem",
      boxShadow: "0 12px 32px rgba(245,52,107,0.35)",
      flexShrink: 0,
    },
    shippingName: {
      fontSize: "1.15rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.2px",
    },
    shippingCost: {
      fontSize: "1.05rem",
      fontWeight: "800",
      marginBottom: "0.45rem",
      color: isDarkMode ? T.gold : brandColors.primary,
    },
    shippingTime: {
      fontSize: "0.9rem",
      marginBottom: "0.7rem",
      color: T.textMuted,
      fontWeight: "600",
    },
    shippingDetails: {
      fontSize: "0.85rem",
      color: T.textMuted,
      lineHeight: "1.6",
      margin: 0,
    },

    // ─── Info card ───
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
    infoTitle: {
      fontSize: isMobile ? "1.15rem" : "1.3rem",
      fontWeight: "900",
      marginBottom: "1.35rem",
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
      color: T.text,
      flexWrap: "wrap",
      letterSpacing: "-0.3px",
    },
    infoTitleIconWrap: {
      width: "38px",
      height: "38px",
      borderRadius: "11px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.95rem",
      boxShadow: "0 6px 18px rgba(245, 52, 107, 0.28)",
      flexShrink: 0,
    },
    listItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.85rem",
      marginBottom: "1rem",
      fontSize: isMobile ? "0.9rem" : "0.96rem",
      color: T.textMuted,
      lineHeight: "1.65",
      padding: "0.15rem 0",
    },
    listIcon: {
      marginTop: "0.25rem",
      fontSize: "1rem",
      flexShrink: 0,
    },
    bold: {
      color: T.text,
      fontWeight: "800",
    },

    // ─── Delivery timeline ───
    deliveryTimeline: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      paddingLeft: "0.25rem",
    },
    deliveryItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.85rem",
      fontSize: isMobile ? "0.9rem" : "0.96rem",
      color: T.textMuted,
    },
    deliveryDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: T.green,
      flexShrink: 0,
      boxShadow: isDarkMode
        ? "0 0 14px rgba(102,187,106,0.7)"
        : "0 0 10px rgba(76,175,80,0.4)",
    },

    // ─── FAQ ───
    faqItem: {
      marginBottom: "0.5rem",
      borderBottom: `1px solid ${T.divider}`,
      paddingBottom: "0.35rem",
    },
    faqQuestionContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      padding: "1rem 0",
      gap: "1rem",
      background: "none",
      border: "none",
      width: "100%",
      textAlign: "left",
      color: T.text,
      fontFamily: "inherit",
    },
    faqQuestion: {
      fontWeight: "800",
      fontSize: isMobile ? "0.92rem" : "1rem",
      color: T.text,
      lineHeight: "1.5",
      letterSpacing: "-0.1px",
    },
    faqChevron: (index) => ({
      transition: "transform 0.3s ease",
      color: isDarkMode ? T.gold : brandColors.primary,
      flexShrink: 0,
      transform: openFaq === index ? "rotate(180deg)" : "rotate(0deg)",
    }),
    faqAnswer: (index) => ({
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      color: T.textMuted,
      lineHeight: "1.75",
      maxHeight: openFaq === index ? "500px" : "0",
      opacity: openFaq === index ? 1 : 0,
      overflow: "hidden",
      transition:
        "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
      paddingBottom: openFaq === index ? "1rem" : "0",
    }),

    // ─── Related pages / reading ───
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
      padding: "0.7rem 1rem",
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
    relatedLinkText: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
    },
    relatedIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
      fontSize: "0.8rem",
    },

    // ─── Citations ───
    citationSection: {
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.06)"
        : "rgba(212, 175, 55, 0.04)",
      borderRadius: "18px",
      padding: isMobile ? "1.5rem 1.25rem" : "1.75rem",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.15)"
        : "1px solid rgba(212, 175, 55, 0.12)",
      borderLeft: `4px solid ${brandColors.goldDark}`,
      marginBottom: "1.5rem",
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
        title="Shipping Information | ASudha Beauty — Free Delivery Above ₹500"
        description="Free shipping on orders above ₹500 across India. Learn about our shipping options, delivery timelines, COD availability, and policies for 100% natural Ayurvedic skincare products."
        keywords="shipping information, free shipping india, delivery timeline, cash on delivery, ayurvedic skincare shipping, natural beauty delivery, shipping policy india"
        url="/shipping"
        breadcrumb={breadcrumb}
        citations={citations}
      />

      {/* Separate JSON-LD graph for FAQPage + BreadcrumbList + WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shippingJsonLd) }}
      />

      {/* Animated background */}
      <div style={themeStyles.bgLayer} aria-hidden="true">
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div className="ship-orb-1" style={themeStyles.bgOrb1} />
        <div className="ship-orb-2" style={themeStyles.bgOrb2} />
        <div className="ship-orb-3" style={themeStyles.bgOrb3} />
      </div>

      {/* Header */}
      <header style={themeStyles.header}>
        <h1 style={themeStyles.title}>
          Shipping Information
          <span style={themeStyles.titleAccent} aria-hidden="true" />
        </h1>
        <p style={themeStyles.subtitle}>
          <FaLeaf aria-hidden="true" style={{ color: T.green }} />
          Fast, reliable delivery across India. Learn about our shipping
          options and policies.
        </p>
      </header>

      <main style={themeStyles.section}>
        {/* Free Shipping Progress */}
        <section
          style={themeStyles.progressContainer}
          aria-labelledby="progress-title"
        >
          <div style={themeStyles.progressAccentBar} aria-hidden="true" />
          <h2 id="progress-title" style={themeStyles.progressTitle}>
            {qualified ? (
              <FaCheckCircle
                aria-hidden="true"
                style={{
                  color: T.green,
                  fontSize: "1rem",
                }}
              />
            ) : (
              <FaTruck
                aria-hidden="true"
                style={{
                  color: isDarkMode ? T.gold : brandColors.primary,
                  fontSize: "1rem",
                }}
              />
            )}
            {cartTotal === 0
              ? "Add items to your cart to unlock free shipping!"
              : qualified
              ? "You qualify for FREE shipping!"
              : `Add ₹${remaining.toFixed(2)} more for FREE shipping`}
          </h2>
          <div
            style={themeStyles.progressBarOuter}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={freeShippingThreshold}
            aria-valuenow={Math.min(cartTotal, freeShippingThreshold)}
            aria-label="Progress toward free shipping"
          >
            <div style={themeStyles.progressBarInner} />
          </div>
          <div style={themeStyles.progressText}>
            <span>
              {cartTotal === 0
                ? "Your cart is currently empty"
                : `Cart total: ₹${cartTotal.toFixed(2)} / ₹${freeShippingThreshold}`}
            </span>
            {cartCount > 0 && (
              <span>
                {cartCount} item{cartCount !== 1 ? "s" : ""} in cart
              </span>
            )}
          </div>
        </section>

        {/* Shipping Methods */}
        <h2 id="shipping-options-title" style={themeStyles.sectionTitle}>
          <span style={themeStyles.sectionTitleIconWrap} aria-hidden="true">
            <FaBox />
          </span>
          Shipping Options
        </h2>
        <div
          style={themeStyles.shippingGrid}
          role="list"
          aria-labelledby="shipping-options-title"
        >
          {SHIPPING_METHODS.map((method) => (
            <article
              key={method.name}
              style={themeStyles.shippingCard}
              className="si-shipping-card"
              role="listitem"
            >
              <div
                style={themeStyles.shippingCardAccent}
                aria-hidden="true"
              />
              <div
                style={themeStyles.shippingIconWrapper}
                className="si-shipping-icon"
                aria-hidden="true"
              >
                {method.icon}
              </div>
              <h3 style={themeStyles.shippingName}>{method.name}</h3>
              <div style={themeStyles.shippingCost}>{method.cost}</div>
              <div style={themeStyles.shippingTime}>{method.deliveryTime}</div>
              <div style={themeStyles.shippingDetails}>{method.details}</div>
            </article>
          ))}
        </div>

        {/* Policy Details */}
        <section
          style={themeStyles.infoCard}
          className="si-info-card"
          aria-labelledby="shipping-policy-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="shipping-policy-title" style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap} aria-hidden="true">
              <FaTruck />
            </span>
            Shipping Policy
          </h2>
          <div style={themeStyles.listItem}>
            <FaCheckCircle
              aria-hidden="true"
              style={{ ...themeStyles.listIcon, color: T.green }}
            />
            <span>
              <strong style={themeStyles.bold}>Free Shipping:</strong> On all
              orders above ₹500 within India
            </span>
          </div>
          <div style={themeStyles.listItem}>
            <FaClock
              aria-hidden="true"
              style={{ ...themeStyles.listIcon, color: T.accent }}
            />
            <span>
              <strong style={themeStyles.bold}>Processing Time:</strong> Orders
              are processed within 24–48 hours
            </span>
          </div>
          <div style={themeStyles.listItem}>
            <FaMapMarkerAlt
              aria-hidden="true"
              style={{ ...themeStyles.listIcon, color: T.info }}
            />
            <span>
              <strong style={themeStyles.bold}>Delivery Areas:</strong> We ship
              to all serviceable pin codes across India
            </span>
          </div>
          <div style={themeStyles.listItem}>
            <FaBox
              aria-hidden="true"
              style={{ ...themeStyles.listIcon, color: T.warn }}
            />
            <span>
              <strong style={themeStyles.bold}>Tracking:</strong> Receive
              tracking details via email/SMS once shipped
            </span>
          </div>
        </section>

        {/* Delivery Timeline */}
        <section
          style={themeStyles.infoCard}
          className="si-info-card"
          aria-labelledby="delivery-timeline-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="delivery-timeline-title" style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap} aria-hidden="true">
              <FaClock />
            </span>
            Estimated Delivery Times
          </h2>
          <div style={themeStyles.deliveryTimeline}>
            <div style={themeStyles.deliveryItem}>
              <div style={themeStyles.deliveryDot} aria-hidden="true" />
              <span>
                <strong style={themeStyles.bold}>Metro Cities:</strong> 2–4
                business days
              </span>
            </div>
            <div style={themeStyles.deliveryItem}>
              <div style={themeStyles.deliveryDot} aria-hidden="true" />
              <span>
                <strong style={themeStyles.bold}>Tier 2 Cities:</strong> 3–5
                business days
              </span>
            </div>
            <div style={themeStyles.deliveryItem}>
              <div style={themeStyles.deliveryDot} aria-hidden="true" />
              <span>
                <strong style={themeStyles.bold}>Rural Areas:</strong> 5–7
                business days
              </span>
            </div>
            <div style={themeStyles.deliveryItem}>
              <div style={themeStyles.deliveryDot} aria-hidden="true" />
              <span>
                <strong style={themeStyles.bold}>Remote Locations:</strong> 7–10
                business days
              </span>
            </div>
          </div>
        </section>

        {/* International Shipping */}
        <section
          style={themeStyles.infoCard}
          className="si-info-card"
          aria-labelledby="international-shipping-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="international-shipping-title" style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap} aria-hidden="true">
              <FaGlobeAmericas />
            </span>
            International Shipping
          </h2>
          <div style={themeStyles.listItem}>
            <FaGlobe
              aria-hidden="true"
              style={{ ...themeStyles.listIcon, color: T.info }}
            />
            <span>
              Currently, we ship only within India. International shipping is
              coming soon — we&apos;re excited to bring 100% natural Ayurvedic
              skincare to the world.
            </span>
          </div>
        </section>

        {/* FAQs */}
        <section
          style={themeStyles.infoCard}
          className="si-info-card"
          aria-labelledby="shipping-faq-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="shipping-faq-title" style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap} aria-hidden="true">
              <FaQuestionCircle />
            </span>
            Frequently Asked Questions
          </h2>

          {SHIPPING_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            const answerId = `shipping-faq-answer-${idx}`;
            return (
              <div key={faq.q} style={themeStyles.faqItem}>
                <button
                  type="button"
                  style={themeStyles.faqQuestionContainer}
                  className="si-faq-toggle"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span style={themeStyles.faqQuestion} className="si-faq-q">
                    {faq.q}
                  </span>
                  <FaChevronDown
                    aria-hidden="true"
                    style={themeStyles.faqChevron(idx)}
                  />
                </button>
                <div
                  id={answerId}
                  style={themeStyles.faqAnswer(idx)}
                  role="region"
                  aria-label={faq.q}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </section>

        {/* ─── Related Pages: internal backlinks ─── */}
        <section
          style={themeStyles.infoCard}
          className="si-info-card"
          aria-labelledby="related-pages-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="related-pages-title" style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap} aria-hidden="true">
              <FaBookOpen />
            </span>
            Related Pages
          </h2>
          <ul style={themeStyles.relatedList}>
            {RELATED_PAGES.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  style={themeStyles.relatedLink}
                  className="si-related-link"
                  aria-label={item.label}
                >
                  <span style={themeStyles.relatedLinkText}>
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

        {/* ─── Related Reading: blog internal backlinks ─── */}
        <section
          style={themeStyles.infoCard}
          className="si-info-card"
          aria-labelledby="related-reading-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="related-reading-title" style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap} aria-hidden="true">
              <FaBookOpen />
            </span>
            Related Reading
          </h2>
          <ul style={themeStyles.relatedList}>
            {RELATED_READING.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  style={themeStyles.relatedLink}
                  className="si-related-link"
                  aria-label={item.label}
                >
                  <span style={themeStyles.relatedLinkText}>
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

        {/* ─── Sources & References: external hyperlinks ─── */}
        <section
          style={themeStyles.citationSection}
          aria-labelledby="shipping-sources-title"
        >
          <h2 id="shipping-sources-title" style={themeStyles.citationTitle}>
            <FaShieldAlt aria-hidden="true" /> Sources &amp; References
          </h2>
          <ul style={themeStyles.citationList}>
            {TRUSTED_SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={themeStyles.citationLink}
                  className="si-citation-link"
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

        {/* ─── Contact Support ─── */}
        <section
          style={themeStyles.infoCard}
          className="si-info-card"
          aria-labelledby="contact-support-title"
        >
          <div style={themeStyles.infoCardAccent} aria-hidden="true" />
          <h2 id="contact-support-title" style={themeStyles.infoTitle}>
            <span style={themeStyles.infoTitleIconWrap} aria-hidden="true">
              <FaHeadset />
            </span>
            Need Help?
          </h2>
          <div style={themeStyles.listItem}>
            <FaEnvelope
              aria-hidden="true"
              style={{ ...themeStyles.listIcon, color: T.accent }}
            />
            <span>
              <strong style={themeStyles.bold}>Email:</strong>{" "}
              <a
                href="mailto:asudhabeauty@gmail.com"
                style={{ color: T.accent, textDecoration: "underline" }}
              >
                asudhabeauty@gmail.com
              </a>
            </span>
          </div>
          <div style={themeStyles.listItem}>
            <FaPhone
              aria-hidden="true"
              style={{ ...themeStyles.listIcon, color: T.accent }}
            />
            <span>
              <strong style={themeStyles.bold}>Phone:</strong>{" "}
              <a
                href="tel:+917518217726"
                style={{ color: T.accent, textDecoration: "underline" }}
              >
                +91-7518217726
              </a>{" "}
              (Mon–Sun, 10 AM – 7 PM)
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShippingInfo;