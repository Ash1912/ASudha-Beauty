// src/pages/TrackOrder.jsx
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useOrders } from "../context/OrdersContext";
import SEO from "../components/SEO";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaBoxOpen,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLeaf,
  FaBookOpen,
  FaExternalLinkAlt,
  FaArrowRight,
  FaShieldAlt,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaQuestionCircle,
  FaUndo,
  FaShippingFast,
  FaHeadset,
  FaInfoCircle,
} from "react-icons/fa";

// ─── Site constants ───
const SITE_URL = "https://www.asudhabeauty.shop";

// ─── Brand palette (module scope: stable) ───
const brandColors = {
  primary: "#f5346b",
  gold: "#f7d794",
  goldDark: "#d4af37",
  bronze: "#c77d42",
  black: "#0f0f0f",
  darkSlate: "#1a1a1a",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
};

// ─── Internal backlinks (help pages) ───
const RELATED_PAGES = [
  {
    to: "/shipping",
    label: "Shipping information & timelines",
    icon: <FaShippingFast />,
  },
  {
    to: "/returns",
    label: "Returns & exchanges policy",
    icon: <FaUndo />,
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
    label: "Continue shopping",
    icon: <FaBox />,
  },
];

// ─── Authoritative external hyperlinks ───
const TRUSTED_SOURCES = [
  {
    label:
      "India Post — Speed Post & Parcel Services (our primary delivery partner)",
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

// ─── Tracking FAQs (used for FAQPage schema) ───
const TRACKING_FAQS = [
  {
    q: "How do I track my ASudha Beauty order?",
    a: "Enter your Order ID (it starts with 'ASU-') and the email address you used at checkout. You'll see real-time status updates including dispatch, transit, and delivery confirmation.",
  },
  {
    q: "Where can I find my Order ID?",
    a: "Your Order ID is in the confirmation email we sent when you placed the order. It starts with 'ASU-'. Check your spam folder if you don't see it.",
  },
  {
    q: "Why isn't my tracking number showing?",
    a: "Tracking numbers appear within 24–48 hours of shipment. If it's been longer, contact our support team and we'll look it up for you.",
  },
  {
    q: "Can I change my delivery address after placing an order?",
    a: "Contact us within 2 hours of placing your order. Once your order is dispatched with our carrier, the address cannot be changed.",
  },
  {
    q: "What if my order is delayed?",
    a: "Occasionally weather, festivals, or carrier issues cause delays. If your package is more than 3 business days late, contact our support team and we'll investigate.",
  },
  {
    q: "Is Cash on Delivery (COD) available for tracking?",
    a: "Yes — COD orders are tracked the same way. Payment is collected at the time of delivery, and status updates appear exactly like prepaid orders.",
  },
];

const TrackOrder = () => {
  const { isDarkMode } = useTheme();
  const { findOrder, getLiveStatus } = useOrders();

  // ─── SSR-safe window width ───
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ─── Responsive breakpoints ───
  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  const responsive = useMemo(
    () => ({
      containerPadding: isMobile ? "1rem" : isNarrow ? "1.5rem" : "2rem",
      fontSizeHeading: isMobile ? "1.6rem" : isNarrow ? "2rem" : "2.5rem",
      formPadding: isMobile ? "1.25rem" : isNarrow ? "1.5rem" : "2rem",
    }),
    [isMobile, isNarrow]
  );

  // ─── Theme tokens ───
  const T = {
    bg: isDarkMode ? brandColors.black : brandColors.cream,
    text: isDarkMode ? "#f5f0eb" : "#3e2723",
    textMuted: isDarkMode ? "#a0a0a0" : "#6d4c41",
    card: isDarkMode ? brandColors.darkSlate : "#ffffff",
    cardAlt: isDarkMode ? "#222222" : "#f9f4f0",
    border: isDarkMode
      ? "rgba(212, 175, 55, 0.12)"
      : "rgba(62, 39, 35, 0.08)",
    borderSoft: isDarkMode
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(62, 39, 35, 0.05)",
    shadow: isDarkMode
      ? "0 20px 60px rgba(0, 0, 0, 0.55)"
      : "0 20px 60px rgba(62, 39, 35, 0.08)",
  };

  // ─── Tracking helpers ───
  const buildHistory = (order, liveStatus) => {
    const base = new Date(order.createdAt || order.date || Date.now());
    const dayMs = 24 * 60 * 60 * 1000;

    const events = [
      { date: base, status: "Order Confirmed", location: "Online" },
    ];

    if (["Shipped", "Delivered"].includes(liveStatus)) {
      events.push({
        date: new Date(base.getTime() + dayMs),
        status: "Shipped",
        location: "Delhi Hub",
      });
    }

    if (liveStatus === "Delivered") {
      events.push({
        date: new Date(base.getTime() + 3 * dayMs),
        status: "Delivered",
        location: "Customer Address",
      });
    }

    return events.map((e) => ({
      date: e.date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      status: e.status,
      location: e.location,
    }));
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) {
      setError("Please enter both Order ID and Email");
      return;
    }

    setIsTracking(true);
    setError("");
    setOrderData(null);

    setTimeout(() => {
      const found = findOrder(orderId.trim(), email.trim());

      if (!found) {
        setOrderData(null);
        setError(
          "No order found with those details. Please check your Order ID and Email."
        );
        setIsTracking(false);
        return;
      }

      const liveStatus = getLiveStatus(found);
      const codeMap = { Processing: 1, Shipped: 2, Delivered: 4 };
      const statusCode = codeMap[liveStatus] ?? 1;

      setOrderData({
        id: found.id,
        date: new Date(found.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        status: liveStatus.toLowerCase(),
        statusCode,
        total: `₹${(found.total || 0).toFixed(2)}`,
        items: (found.items || []).map((it) => ({
          name: it.name,
          quantity: it.quantity,
          price: `₹${(it.price * it.quantity).toFixed(2)}`,
        })),
        tracking: {
          current: liveStatus,
          estimatedDelivery: found.estimatedDelivery || "5-7 business days",
          carrier: "ASudha Express",
          trackingNumber:
            found.trackingNumber ||
            "ASU-TRK-" +
              Math.random().toString(36).substring(2, 9).toUpperCase(),
          history: buildHistory(found, liveStatus),
        },
        shippingAddress: found.customer || {},
      });
      setIsTracking(false);
    }, 600);
  };

  const getStatusSteps = () => [
    {
      label: "Order Placed",
      icon: <FaCheckCircle />,
      completed: (orderData?.statusCode ?? -1) >= 0,
    },
    {
      label: "Confirmed",
      icon: <FaCheckCircle />,
      completed: (orderData?.statusCode ?? -1) >= 1,
    },
    {
      label: "Processing",
      icon: <FaBoxOpen />,
      completed: (orderData?.statusCode ?? -1) >= 1,
    },
    {
      label: "Shipped",
      icon: <FaTruck />,
      completed: (orderData?.statusCode ?? -1) >= 2,
    },
    {
      label: "Out for Delivery",
      icon: <FaTruck />,
      completed: (orderData?.statusCode ?? -1) >= 3,
    },
    {
      label: "Delivered",
      icon: <FaBox />,
      completed: (orderData?.statusCode ?? -1) >= 4,
    },
  ];

  // ─── JSON-LD: WebPage + BreadcrumbList + FAQPage ───
  const trackOrderJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/track-order#webpage`,
          url: `${SITE_URL}/track-order`,
          name: "Track Your Order | ASudha Beauty",
          description:
            "Track your ASudha Beauty order in real time using your Order ID and email address. Live shipping updates, delivery estimates, and carrier tracking.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: "en-IN",
          breadcrumb: { "@id": `${SITE_URL}/track-order#breadcrumb` },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${SITE_URL}/assets/images/og-default.png`,
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL}/track-order#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Track Order",
              item: `${SITE_URL}/track-order`,
            },
          ],
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/track-order#faq`,
          mainEntity: TRACKING_FAQS.map((faq) => ({
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
      { name: "Track Order", url: "/track-order" },
    ],
    []
  );

  const citations = useMemo(
    () => TRUSTED_SOURCES.map((s) => ({ label: s.label, href: s.href })),
    []
  );

  // ─── Injected CSS — only depends on isDarkMode ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-trackorder-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-trackorder-styles", "true");
    style.textContent = `
      .trk-input:focus {
        border-color: ${brandColors.primary} !important;
        box-shadow: 0 0 0 4px rgba(245,52,107,0.15) !important;
        outline: none;
      }
      .trk-input::placeholder {
        color: #8d7d76;
      }
      .trk-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .trk-btn:hover:not(:disabled),
      .trk-btn:focus-visible:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 15px 40px rgba(245,52,107,0.4);
        outline: none;
      }
      .trk-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .trk-btn:focus-visible {
        outline: 2px solid ${brandColors.primary};
        outline-offset: 2px;
      }

      .trk-order-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .trk-order-card:hover {
        transform: translateY(-2px);
      }

      /* Related pages / citation links */
      .trk-related-link {
        transition: color 0.25s ease, gap 0.25s ease;
      }
      .trk-related-link:hover,
      .trk-related-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        gap: 0.6rem;
        outline: none;
      }
      .trk-citation-link:hover,
      .trk-citation-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        outline: none;
      }
      .trk-breadcrumb-link:hover {
        text-decoration: underline;
      }

      /* FAQ toggle */
      .trk-faq-btn {
        background: none;
        border: none;
        text-align: left;
        font-family: inherit;
        width: 100%;
        cursor: pointer;
        transition: color 0.25s ease;
      }
      .trk-faq-btn:hover {
        color: ${brandColors.primary};
      }
      .trk-faq-btn:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: 2px;
        border-radius: 8px;
      }

      @media (prefers-reduced-motion: reduce) {
        .trk-input, .trk-btn, .trk-order-card,
        .trk-related-link, .trk-citation-link, .trk-faq-btn {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-trackorder-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  // ─── Theme styles ───
  const themeStyles = {
    container: {
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100vh",
      transition: "background-color 0.3s ease, color 0.3s ease",
      padding: "2rem 0",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      width: "100%",
    },
    bgBlob1: {
      position: "absolute",
      top: "-100px",
      left: "-100px",
      width: "400px",
      height: "400px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      opacity: isDarkMode ? 0.1 : 0.07,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
    },
    bgBlob2: {
      position: "absolute",
      bottom: "-100px",
      right: "-100px",
      width: "400px",
      height: "400px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #4caf50, #f7d794)",
      opacity: isDarkMode ? 0.1 : 0.07,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
    },

    // ─── Breadcrumb ───
    breadcrumb: {
      position: "relative",
      zIndex: 2,
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "0 1rem 1rem" : "0 2rem 1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      fontSize: "0.78rem",
      color: T.textMuted,
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
      zIndex: 2,
      textAlign: "center",
      padding: `0 ${responsive.containerPadding} 2rem`,
      maxWidth: "1200px",
      margin: "0 auto",
    },
    title: {
      fontSize: responsive.fontSizeHeading,
      fontWeight: "900",
      marginBottom: "0.5rem",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    subtitle: {
      fontSize: isMobile ? "0.9rem" : "1.05rem",
      color: T.textMuted,
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.35rem",
      flexWrap: "wrap",
    },

    // ─── Form ───
    formContainer: {
      maxWidth: "600px",
      margin: "2rem auto",
      padding: responsive.formPadding,
      backgroundColor: T.card,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: "24px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      zIndex: 2,
      boxSizing: "border-box",
    },
    formGroup: { marginBottom: "1.5rem" },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "700",
      color: T.text,
    },
    input: {
      width: "100%",
      padding: "1rem",
      borderRadius: "12px",
      border: `1px solid ${T.border}`,
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: T.text,
      fontSize: "1rem",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      fontFamily: "inherit",
    },
    button: {
      width: "100%",
      padding: "1rem",
      border: "none",
      borderRadius: "50px",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: "#ffffff",
      fontSize: "1.1rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 10px 30px rgba(245,52,107,0.3)",
      transition: "all 0.4s ease",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      boxSizing: "border-box",
      fontFamily: "inherit",
      gap: "0.5rem",
    },
    errorMessage: {
      marginTop: "1rem",
      padding: "1rem",
      backgroundColor: "rgba(244,67,54,0.1)",
      color: "#f44336",
      borderRadius: "12px",
      textAlign: "center",
      border: "1px solid rgba(244,67,54,0.2)",
      fontWeight: "600",
    },
    loading: {
      textAlign: "center",
      padding: "2rem",
      color: T.textMuted,
    },

    // ─── Order details ───
    orderDetails: {
      position: "relative",
      zIndex: 2,
      maxWidth: "1200px",
      margin: "2rem auto",
      padding: `0 ${responsive.containerPadding}`,
      boxSizing: "border-box",
    },
    orderCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: isMobile ? "1.25rem" : "2rem",
      marginBottom: "1.5rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "0.75rem",
      marginBottom: "1.5rem",
      paddingBottom: "1.5rem",
      borderBottom: `1px solid ${T.borderSoft}`,
    },
    orderId: {
      fontSize: isMobile ? "1rem" : "1.2rem",
      fontWeight: "800",
      color: brandColors.primary,
      wordBreak: "break-word",
    },
    orderDate: {
      fontSize: "0.85rem",
      color: T.textMuted,
    },
    infoTitle: {
      fontSize: "1.1rem",
      fontWeight: "800",
      marginBottom: "1rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    infoContent: {
      fontSize: "0.95rem",
      color: T.textMuted,
      lineHeight: "1.6",
    },

    // ─── Status timeline ───
    statusTimeline: { margin: "2rem 0" },
    stepsContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      position: "relative",
      gap: "0.5rem",
    },
    step: {
      flex: 1,
      minWidth: "70px",
      textAlign: "center",
      position: "relative",
      padding: "0 0.25rem",
    },
    stepIcon: {
      fontSize: isMobile ? "1.2rem" : "1.5rem",
      marginBottom: "0.5rem",
      color: isDarkMode ? "#555" : "#ccc",
      display: "inline-block",
      position: "relative",
      zIndex: 2,
    },
    stepIconCompleted: {
      color: brandColors.green,
      textShadow: "0 0 20px rgba(76,175,80,0.5)",
    },
    stepLabel: {
      fontSize: isMobile ? "0.68rem" : "0.85rem",
      color: T.textMuted,
    },
    stepLabelCompleted: {
      color: brandColors.green,
      fontWeight: "700",
    },

    // ─── Tracking info grid ───
    trackingInfo: {
      display: "grid",
      gridTemplateColumns: isNarrow ? "1fr" : "repeat(2, 1fr)",
      gap: "1rem",
    },
    infoBox: {
      backgroundColor: isDarkMode ? brandColors.black : "#f9f4f0",
      padding: isMobile ? "1rem" : "1.5rem",
      borderRadius: "16px",
      border: `1px solid ${T.borderSoft}`,
      boxSizing: "border-box",
    },

    // ─── History ───
    historyItem: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1.25rem",
      paddingBottom: "1.25rem",
      borderBottom: `1px solid ${T.borderSoft}`,
    },
    historyIcon: {
      fontSize: "1.2rem",
      color: brandColors.green,
      background: "rgba(76,175,80,0.1)",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    historyContent: { flex: 1, minWidth: 0 },
    historyStatus: {
      fontWeight: "800",
      marginBottom: "0.25rem",
      color: T.text,
    },
    historyDate: {
      fontSize: "0.75rem",
      color: T.textMuted,
    },
    historyLocation: {
      fontSize: "0.8rem",
      color: T.textMuted,
      marginTop: "0.25rem",
    },

    // ─── Items ───
    itemRow: {
      marginBottom: "0.75rem",
      display: "flex",
      justifyContent: "space-between",
      gap: "0.5rem",
      borderBottom: `1px solid ${T.borderSoft}`,
      paddingBottom: "0.75rem",
      flexWrap: "wrap",
    },

    // ─── Contact support ───
    contactCard: {
      backgroundColor: T.cardAlt,
      borderRadius: "22px",
      padding: isMobile ? "1.75rem 1.25rem" : "2.25rem 2rem",
      textAlign: "center",
      marginTop: "2rem",
      border: `1px solid ${T.border}`,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
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
    contactIconWrap: {
      width: "60px",
      height: "60px",
      margin: "0 auto 1.15rem",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.4rem",
      boxShadow: "0 12px 30px rgba(245,52,107,0.35)",
    },
    contactTitle: {
      fontSize: isMobile ? "1.2rem" : "1.35rem",
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
    contactButtons: {
      display: "flex",
      gap: "0.6rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    contactBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: isMobile ? "0.75rem 1.3rem" : "0.85rem 1.6rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      boxShadow: "0 10px 24px rgba(245,52,107,0.3)",
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
    },
    contactBtnSecondary: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: isMobile ? "0.75rem 1.3rem" : "0.85rem 1.6rem",
      backgroundColor: "transparent",
      color: T.text,
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      border: `2px solid ${T.border}`,
      cursor: "pointer",
      fontFamily: "inherit",
    },
    contactBtnWhatsApp: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: isMobile ? "0.75rem 1.3rem" : "0.85rem 1.6rem",
      backgroundColor: "#25D366",
      color: "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      boxShadow: "0 10px 24px rgba(37,211,102,0.35)",
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
    },

    // ─── Related pages ───
    relatedSection: {
      maxWidth: "1200px",
      margin: "2rem auto 0",
      padding: `0 ${responsive.containerPadding}`,
      boxSizing: "border-box",
    },
    relatedCard: {
      backgroundColor: T.card,
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      padding: isMobile ? "1.5rem" : "2rem",
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

    // ─── Citations ───
    citationSection: {
      maxWidth: "1200px",
      margin: "1.5rem auto 3rem",
      padding: `0 ${responsive.containerPadding}`,
      boxSizing: "border-box",
    },
    citationCard: {
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.06)"
        : "rgba(212, 175, 55, 0.04)",
      borderRadius: "18px",
      padding: isMobile ? "1.5rem" : "1.75rem",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.15)"
        : "1px solid rgba(212, 175, 55, 0.12)",
      borderLeft: `4px solid ${brandColors.goldDark}`,
    },
    citationTitle: {
      fontSize: "0.88rem",
      fontWeight: "800",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
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
      color: T.textMuted,
      opacity: 0.7,
      marginTop: "0.1rem",
    },
  };

  return (
    <div style={themeStyles.container}>
      {/* ─── SEO: meta + JSON-LD + breadcrumb + citations ─── */}
      <SEO
        title="Track Your Order | ASudha Beauty — Real-Time Shipping Updates"
        description="Track your ASudha Beauty order in real time using your Order ID and email. Live shipping updates, delivery estimates, carrier tracking, and order history."
        keywords="track order, order status, order tracking, ASudha Beauty order status, shipping tracking, real time order tracking india, natural skincare order tracking"
        url="/track-order"
        breadcrumb={breadcrumb}
        citations={citations}
      />

      {/* Extra JSON-LD: WebPage + BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(trackOrderJsonLd),
        }}
      />

      <div style={themeStyles.bgBlob1} aria-hidden="true" />
      <div style={themeStyles.bgBlob2} aria-hidden="true" />

      <header style={themeStyles.header}>
        <h1 style={themeStyles.title}>Track Your Order</h1>
        <p style={themeStyles.subtitle}>
          <FaLeaf aria-hidden="true" style={{ color: brandColors.green }} />
          Enter your order ID and email address to track your natural package.
        </p>
      </header>

      {!orderData ? (
        <div style={themeStyles.formContainer}>
          <form onSubmit={handleTrackOrder} noValidate>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label} htmlFor="track-order-id">
                Order ID *
              </label>
              <input
                id="track-order-id"
                type="text"
                placeholder="e.g., ASUXXXXXXX"
                style={themeStyles.input}
                className="trk-input"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                autoComplete="off"
                aria-describedby={error ? "track-order-error" : undefined}
              />
            </div>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label} htmlFor="track-email">
                Email Address *
              </label>
              <input
                id="track-email"
                type="email"
                placeholder="your@email.com"
                style={themeStyles.input}
                className="trk-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                aria-describedby={error ? "track-order-error" : undefined}
              />
            </div>
            <button
              type="submit"
              style={themeStyles.button}
              className="trk-btn"
              disabled={isTracking}
            >
              {isTracking ? (
                <>
                  <FaClock aria-hidden="true" /> Tracking…
                </>
              ) : (
                <>
                  <FaTruck aria-hidden="true" /> Track Order
                </>
              )}
            </button>
            {error && (
              <div
                id="track-order-error"
                style={themeStyles.errorMessage}
                role="alert"
                aria-live="assertive"
              >
                {error}
              </div>
            )}
          </form>
        </div>
      ) : isTracking ? (
        <div
          style={themeStyles.loading}
          role="status"
          aria-live="polite"
        >
          Loading order details…
        </div>
      ) : (
        <section
          style={themeStyles.orderDetails}
          aria-live="polite"
          aria-label="Order tracking details"
        >
          <div style={themeStyles.orderCard} className="trk-order-card">
            <div style={themeStyles.orderHeader}>
              <div>
                <div style={themeStyles.orderId}>Order #{orderData.id}</div>
                <div style={themeStyles.orderDate}>
                  Placed on {orderData.date}
                </div>
              </div>
              <div style={themeStyles.orderId}>Total: {orderData.total}</div>
            </div>

            <div style={themeStyles.statusTimeline}>
              <div
                style={themeStyles.stepsContainer}
                role="list"
                aria-label="Order status steps"
              >
                {getStatusSteps().map((step, idx) => (
                  <div
                    key={idx}
                    style={themeStyles.step}
                    role="listitem"
                    aria-label={`${step.label} — ${
                      step.completed ? "Completed" : "Pending"
                    }`}
                  >
                    <div
                      style={{
                        ...themeStyles.stepIcon,
                        ...(step.completed
                          ? themeStyles.stepIconCompleted
                          : {}),
                      }}
                      aria-hidden="true"
                    >
                      {step.icon}
                    </div>
                    <div
                      style={{
                        ...themeStyles.stepLabel,
                        ...(step.completed
                          ? themeStyles.stepLabelCompleted
                          : {}),
                      }}
                    >
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={themeStyles.trackingInfo}>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>
                  <FaInfoCircle aria-hidden="true" /> Current Status
                </div>
                <div style={themeStyles.infoContent}>
                  {orderData.tracking.current}
                </div>
              </div>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>
                  <FaCalendarAlt aria-hidden="true" /> Estimated Delivery
                </div>
                <div style={themeStyles.infoContent}>
                  {orderData.tracking.estimatedDelivery}
                </div>
              </div>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>
                  <FaTruck aria-hidden="true" /> Carrier
                </div>
                <div style={themeStyles.infoContent}>
                  {orderData.tracking.carrier}
                </div>
              </div>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>
                  <FaBox aria-hidden="true" /> Tracking Number
                </div>
                <div style={themeStyles.infoContent}>
                  {orderData.tracking.trackingNumber}
                </div>
              </div>
            </div>
          </div>

          <div style={themeStyles.orderCard} className="trk-order-card">
            <h3 style={themeStyles.infoTitle}>
              <FaBox aria-hidden="true" /> Order Items
            </h3>
            {orderData.items.map((item, idx) => (
              <div key={idx} style={themeStyles.itemRow}>
                <span style={{ color: T.textMuted }}>
                  {item.name} × {item.quantity}
                </span>
                <span style={{ fontWeight: "700", color: brandColors.green }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          <div style={themeStyles.orderCard} className="trk-order-card">
            <h3 style={themeStyles.infoTitle}>
              <FaMapMarkerAlt aria-hidden="true" /> Shipping Address
            </h3>
            <div style={themeStyles.infoContent}>
              <div>{orderData.shippingAddress.name || "—"}</div>
              <div>{orderData.shippingAddress.address || "—"}</div>
              <div>
                {orderData.shippingAddress.city || ""}
                {orderData.shippingAddress.state
                  ? `, ${orderData.shippingAddress.state}`
                  : ""}
                {orderData.shippingAddress.pincode
                  ? ` - ${orderData.shippingAddress.pincode}`
                  : ""}
              </div>
              <div>{orderData.shippingAddress.phone || ""}</div>
            </div>
          </div>

          <div style={themeStyles.orderCard} className="trk-order-card">
            <h3 style={themeStyles.infoTitle}>
              <FaClock aria-hidden="true" /> Tracking History
            </h3>
            {orderData.tracking.history.map((event, idx) => (
              <div key={idx} style={themeStyles.historyItem}>
                <div style={themeStyles.historyIcon} aria-hidden="true">
                  <FaCheckCircle />
                </div>
                <div style={themeStyles.historyContent}>
                  <div style={themeStyles.historyStatus}>{event.status}</div>
                  <div style={themeStyles.historyDate}>{event.date}</div>
                  <div style={themeStyles.historyLocation}>
                    <FaMapMarkerAlt
                      aria-hidden="true"
                      style={{
                        marginRight: "0.25rem",
                        color: brandColors.green,
                        fontSize: "0.7rem",
                      }}
                    />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ─── Contact Support ─── */}
          <div style={themeStyles.contactCard}>
            <div style={themeStyles.contactAccentBar} aria-hidden="true" />
            <div style={themeStyles.contactIconWrap} aria-hidden="true">
              <FaHeadset />
            </div>
            <h3 style={themeStyles.contactTitle}>Need Help With This Order?</h3>
            <p style={themeStyles.contactText}>
              Our support team is here 7 days a week. Reach out about delivery,
              address changes, or product questions.
            </p>
            <div style={themeStyles.contactButtons}>
              <Link to="/contact" style={themeStyles.contactBtn}>
                <FaEnvelope aria-hidden="true" /> Contact Us
              </Link>
              <a
                href="tel:+917518217726"
                style={themeStyles.contactBtnSecondary}
              >
                <FaPhone aria-hidden="true" /> Call Us
              </a>
              <a
                href="https://wa.me/917518217726"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.contactBtnWhatsApp}
              >
                <FaWhatsapp aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ─── Related pages (internal backlinks) ─── */}
      <section
        style={themeStyles.relatedSection}
        aria-labelledby="track-related-title"
      >
        <div style={themeStyles.relatedCard}>
          <h2 id="track-related-title" style={themeStyles.relatedTitle}>
            <FaBookOpen aria-hidden="true" /> Related Help Pages
          </h2>
          <ul style={themeStyles.relatedList}>
            {RELATED_PAGES.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  style={themeStyles.relatedLink}
                  className="trk-related-link"
                  aria-label={`Read: ${item.label}`}
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
        </div>
      </section>

      {/* ─── Sources & References (external hyperlinks) ─── */}
      <section
        style={themeStyles.citationSection}
        aria-labelledby="track-sources-title"
      >
        <div style={themeStyles.citationCard}>
          <h2 id="track-sources-title" style={themeStyles.citationTitle}>
            <FaShieldAlt aria-hidden="true" /> Delivery Partners &amp; Consumer
            Protection
          </h2>
          <ul style={themeStyles.citationList}>
            {TRUSTED_SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={themeStyles.citationLink}
                  className="trk-citation-link"
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
        </div>
      </section>
    </div>
  );
};

export default TrackOrder;