// src/pages/FAQs.js
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaChevronDown,
  FaSearch,
  FaShoppingBag,
  FaTruck,
  FaUndo,
  FaCreditCard,
  FaBox,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaQuestionCircle,
  FaWhatsapp,
  FaComments,
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

const FAQs = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaqs, setOpenFaqs] = useState([]);

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
    whatsapp: brandColors.whatsapp,
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
    whatsapp: brandColors.whatsapp,
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  // Categories with icons
  const categories = [
    { id: "all", label: "All", icon: <FaQuestionCircle /> },
    { id: "products", label: "Products", icon: <FaBox /> },
    { id: "orders", label: "Orders", icon: <FaShoppingBag /> },
    { id: "shipping", label: "Shipping", icon: <FaTruck /> },
    { id: "returns", label: "Returns", icon: <FaUndo /> },
    { id: "payment", label: "Payment", icon: <FaCreditCard /> },
    { id: "account", label: "Account", icon: <FaUserCircle /> },
  ];

  // FAQs data (unchanged)
  const faqs = [
    {
      id: 1,
      category: "products",
      question: "What makes ASudha Beauty powders 100% natural?",
      answer:
        "ASudha Beauty powders are crafted from pure, natural ingredients sourced directly from nature. Our Multani Mitti, Ubtan, Amla, Reetha, and Shikakai powders contain absolutely no added chemicals, parabens, or artificial preservatives. We believe in the power of nature—just as it is. Pure. Natural. Effective.",
    },
    {
      id: 2,
      category: "products",
      question: "Are your herbal powders safe for sensitive skin?",
      answer:
        "Yes! Our 100% natural Ayurvedic powders are generally safe for all skin types, including sensitive skin. However, we always recommend doing a patch test on a small area of your inner arm before applying to your face or hair, especially if you have known allergies to specific herbs or clays.",
    },
    {
      id: 3,
      category: "products",
      question: "What is Multani Mitti and how do I use it?",
      answer:
        "Multani Mitti (Fuller's Earth) is a natural clay powder used for deep cleansing and oil control. To use, simply mix 2 tablespoons of Multani Mitti powder with rose water, milk, or plain water to form a smooth paste. Apply evenly on your face and neck, leave for 10-15 minutes until dry, and rinse with lukewarm water. Use 2-3 times per week for glowing skin.",
    },
    {
      id: 4,
      category: "products",
      question: "What are the benefits of Amla, Reetha, and Shikakai for hair?",
      answer:
        "Amla (Indian Gooseberry) strengthens hair roots and adds natural shine. Reetha (Soapnut) acts as a gentle, natural cleanser. Shikakai (Acacia concinna) nourishes the scalp and promotes healthy hair growth. Together, they form the ultimate Ayurvedic hair care trio—chemical-free and perfect for all hair types.",
    },
    {
      id: 5,
      category: "orders",
      question: "How do I place an order for your herbal powders?",
      answer:
        "Placing an order is simple! Browse our collection of 100% natural Ayurvedic powders, add your desired products (Multani Mitti, Ubtan, Amla, etc.) to your cart, proceed to checkout, enter your shipping details, choose a secure payment method, and confirm your order. You'll receive an order confirmation email once your order is placed.",
    },
    {
      id: 6,
      category: "orders",
      question: "Can I cancel or modify my order?",
      answer:
        "Orders can be cancelled within 2 hours of placement. Please contact our customer support immediately via email or WhatsApp if you need to modify or cancel your order. Once our team has processed your order for shipping, we cannot make changes.",
    },
    {
      id: 7,
      category: "orders",
      question: "How do I track my order?",
      answer:
        "Once your herbal powder order ships, you'll receive a tracking number via email and SMS. You can also track your order by logging into your ASudha Beauty account and visiting the 'Track Order' section in your dashboard.",
    },
    {
      id: 8,
      category: "shipping",
      question: "What are your shipping charges?",
      answer:
        "We offer free shipping on all orders above ₹500. For orders below ₹500, a flat shipping fee of ₹50 applies. Express shipping options are available at an additional cost. We deliver pan-India, directly from our store in Gorakhpur to your doorstep.",
    },
    {
      id: 9,
      category: "shipping",
      question: "How long does delivery take?",
      answer:
        "Delivery times vary by location: Metro cities (Mumbai, Delhi, Bangalore, etc.): 2-4 business days. Tier 2 cities: 3-5 business days. Rural areas: 5-7 business days. You'll receive tracking information to monitor your delivery status.",
    },
    {
      id: 10,
      category: "shipping",
      question: "Do you ship internationally?",
      answer:
        "Currently, we ship only within India. We are actively working on expanding our Ayurvedic beauty products to international locations. Stay tuned for updates—we're excited to bring the power of nature to the world!",
    },
    {
      id: 11,
      category: "returns",
      question: "What is your return policy for unopened products?",
      answer:
        "We offer a 30-day return policy for completely unused products in their original packaging. Simply initiate a return through your ASudha account or contact our support team. Refunds are processed within 7-10 business days after we receive the returned item.",
    },
    {
      id: 12,
      category: "returns",
      question: "Can I return opened or used products?",
      answer:
        "For hygiene reasons, we cannot accept returns on opened or used herbal powders unless they are defective (e.g., damaged packaging, contamination). If you received a defective product, please contact us immediately with photos of the item, and we will arrange a replacement or refund.",
    },
    {
      id: 13,
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and Cash on Delivery (COD) for orders up to ₹5,000. All payments are processed securely through our trusted payment gateways. Your safety is our priority.",
    },
    {
      id: 14,
      category: "payment",
      question: "Is Cash on Delivery (COD) available?",
      answer:
        "Yes, Cash on Delivery is available for orders up to ₹5,000. A small convenience fee may apply for COD orders. Payment must be made in cash at the time of delivery. Please keep the exact amount ready to ensure a smooth handover.",
    },
    {
      id: 15,
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click on the 'Account' icon at the top right corner of our website and select 'Sign Up'. Enter your details to create an account. Benefits include: faster checkout, order tracking, personalized recommendations, and exclusive offers on our Ayurvedic products.",
    },
    {
      id: 16,
      category: "account",
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login page and enter your registered email. You'll receive instructions to reset your password. Please check your spam folder if you don't see the email in your inbox. If you face any issues, contact our support team.",
    },
  ];

  const getCategoryIcon = (categoryId) => {
    const found = categories.find((c) => c.id === categoryId);
    return found ? found.icon : <FaQuestionCircle />;
  };

  const getCategoryLabel = (categoryId) => {
    const found = categories.find((c) => c.id === categoryId);
    return found ? found.label : "";
  };

  const toggleFaq = (id) => {
    setOpenFaqs((prev) =>
      prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return faqs.length;
    return faqs.filter((f) => f.category === categoryId).length;
  };

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-faq-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-faq-styles", "true");
    style.textContent = `
      @keyframes faqFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes faqFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes faqFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }
      @keyframes faqFade {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .faq-orb-1 { animation: faqFloat1 16s ease-in-out infinite; }
      .faq-orb-2 { animation: faqFloat2 20s ease-in-out infinite; }
      .faq-orb-3 { animation: faqFloat3 18s ease-in-out infinite; }

      .faq-search-input {
        transition: border-color 0.25s ease, box-shadow 0.25s ease,
                    background-color 0.25s ease;
      }
      .faq-search-input:focus {
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
      .faq-search-input::placeholder {
        color: ${isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(62,39,35,0.35)"};
      }

      .faq-category-btn {
        transition: transform 0.25s ease, border-color 0.25s ease,
                    box-shadow 0.25s ease, background 0.25s ease,
                    color 0.25s ease;
      }
      .faq-category-btn:hover {
        transform: translateY(-2px);
        border-color: ${brandColors.primary} !important;
        color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        box-shadow: 0 10px 22px rgba(245, 52, 107, 0.18);
      }

      .faq-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease,
                    border-color 0.3s ease;
      }
      .faq-item:hover {
        transform: translateY(-2px);
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.35)"
            : "rgba(199, 125, 66, 0.28)"
        } !important;
      }
      .faq-item:hover .faq-question-icon {
        transform: scale(1.08) rotate(-6deg);
      }
      .faq-question-icon {
        transition: transform 0.3s ease;
      }

      .faq-question-row {
        transition: color 0.25s ease;
      }
      .faq-question-row:hover {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary};
      }

      .faq-chevron {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .faq-answer {
        animation: faqFade 0.3s ease;
      }

      .faq-contact-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .faq-contact-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(245, 52, 107, 0.45);
        gap: 0.6rem;
      }
      .faq-contact-btn-wa {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .faq-contact-btn-wa:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(37, 211, 102, 0.45);
        gap: 0.6rem;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-faq-styles="true"]')
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

    // ─── Content ───
    content: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1100px",
      margin: "0 auto",
      padding: isMobile
        ? "1.5rem 1rem 3rem"
        : isNarrow
        ? "2rem 1.25rem 4rem"
        : "3rem 1.5rem 5rem",
      width: "100%",
      boxSizing: "border-box",
    },

    // ─── Header ───
    header: {
      textAlign: "center",
      marginBottom: isNarrow ? "2rem" : "2.75rem",
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

    // ─── Search ───
    searchContainer: {
      maxWidth: "520px",
      margin: "2rem auto 1.75rem",
      position: "relative",
    },
    searchIcon: {
      position: "absolute",
      left: "1.15rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: isDarkMode ? T.gold : brandColors.bronze,
      fontSize: "0.95rem",
      pointerEvents: "none",
    },
    searchInput: {
      width: "100%",
      padding: "0.95rem 1.15rem 0.95rem 3rem",
      borderRadius: "50px",
      border: `1.5px solid ${T.border}`,
      backgroundColor: T.card,
      color: T.text,
      fontSize: "0.95rem",
      outline: "none",
      boxSizing: "border-box",
      fontFamily: "inherit",
      fontWeight: "600",
      boxShadow: T.shadow,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },

    // ─── Categories ───
    categoriesContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.55rem",
      justifyContent: "center",
      marginBottom: "2rem",
      boxSizing: "border-box",
    },
    categoryButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.55rem 1rem" : "0.65rem 1.25rem",
      borderRadius: "50px",
      backgroundColor: T.card,
      color: T.textMuted,
      cursor: "pointer",
      fontSize: isMobile ? "0.8rem" : "0.88rem",
      border: `1.5px solid ${T.border}`,
      fontWeight: "700",
      whiteSpace: "nowrap",
      fontFamily: "inherit",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      boxShadow: T.shadow,
    },
    activeCategoryButton: {
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      borderColor: "transparent",
      boxShadow: "0 10px 24px rgba(245, 52, 107, 0.35)",
    },
    categoryCount: {
      backgroundColor: "rgba(255,255,255,0.28)",
      padding: "0.1rem 0.45rem",
      borderRadius: "50px",
      fontSize: "0.68rem",
      fontWeight: "800",
      marginLeft: "0.1rem",
      color: "inherit",
    },

    // ─── FAQ list ───
    faqsContainer: {
      maxWidth: "820px",
      margin: "0 auto",
      width: "100%",
    },
    faqItem: {
      backgroundColor: T.card,
      borderRadius: "18px",
      marginBottom: "0.85rem",
      border: `1px solid ${T.border}`,
      overflow: "hidden",
      boxShadow: T.shadow,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      position: "relative",
    },
    faqQuestion: {
      padding: isMobile ? "1.1rem 1.25rem" : "1.25rem 1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      fontWeight: "800",
      color: T.text,
      fontSize: isMobile ? "0.92rem" : "1rem",
      gap: "0.85rem",
      fontFamily: "inherit",
      letterSpacing: "-0.1px",
      lineHeight: "1.5",
    },
    faqIconWrap: {
      width: "34px",
      height: "34px",
      borderRadius: "10px",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.12)"
        : "rgba(212, 175, 55, 0.1)",
      color: isDarkMode ? T.gold : brandColors.bronze,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.85rem",
      flexShrink: 0,
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.2)"
        : "1px solid rgba(212, 175, 55, 0.15)",
    },
    faqQuestionText: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      gap: "0.85rem",
    },
    faqToggleIcon: {
      color: isDarkMode ? T.gold : brandColors.primary,
      fontSize: "0.9rem",
      flexShrink: 0,
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(62,39,35,0.04)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },
    faqAnswer: {
      padding: isMobile
        ? "0 1.25rem 1.25rem 1.25rem"
        : "0 1.5rem 1.5rem 1.5rem",
      borderTop: `1px solid ${T.divider}`,
      color: T.textMuted,
      lineHeight: "1.8",
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      paddingTop: "1.15rem",
      fontWeight: "500",
    },
    faqCategoryTag: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      padding: "0.2rem 0.7rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(62,39,35,0.04)",
      borderRadius: "50px",
      fontSize: "0.68rem",
      fontWeight: "800",
      color: T.textMuted,
      letterSpacing: "0.4px",
      textTransform: "uppercase",
      marginBottom: "0.75rem",
      border: `1px solid ${T.borderSoft}`,
      width: "fit-content",
    },

    // ─── Empty state ───
    noResults: {
      textAlign: "center",
      padding: isMobile ? "2.5rem 1.5rem" : "4rem 2rem",
      color: T.textMuted,
      backgroundColor: T.card,
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      position: "relative",
      overflow: "hidden",
    },
    noResultsAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    noResultsIconWrap: {
      width: "72px",
      height: "72px",
      margin: "0 auto 1.25rem",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.75rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
    },
    noResultsTitle: {
      fontSize: "1.15rem",
      marginBottom: "0.5rem",
      color: T.text,
      fontWeight: "900",
      letterSpacing: "-0.2px",
    },
    noResultsText: {
      color: T.textMuted,
      fontSize: "0.92rem",
      margin: 0,
    },

    // ─── Contact section ───
    contactSection: {
      maxWidth: "820px",
      margin: "3rem auto 0",
      padding: isMobile ? "2rem 1.5rem" : "2.75rem 2.5rem",
      backgroundColor: T.cardAlt,
      borderRadius: "26px",
      textAlign: "center",
      boxShadow: T.shadowLift,
      border: `1px solid ${T.border}`,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      position: "relative",
      overflow: "hidden",
    },
    contactAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
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
      marginBottom: "1.75rem",
      color: T.textMuted,
      fontSize: isMobile ? "0.9rem" : "1rem",
      lineHeight: "1.7",
      maxWidth: "520px",
      margin: "0 auto 1.75rem",
    },
    contactButtons: {
      display: "flex",
      gap: "0.75rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    contactButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.8rem 1.5rem" : "0.9rem 1.75rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },
    contactButtonSecondary: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.8rem 1.5rem" : "0.9rem 1.75rem",
      backgroundColor: "transparent",
      color: T.text,
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      border: `2px solid ${T.border}`,
      cursor: "pointer",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },
    contactButtonWhatsApp: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.8rem 1.5rem" : "0.9rem 1.75rem",
      backgroundColor: brandColors.whatsapp,
      color: "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      boxShadow: "0 10px 26px rgba(37, 211, 102, 0.35)",
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },
  };

  return (
    <div style={themeStyles.container}>
      {/* Animated background */}
      <div style={themeStyles.bgLayer}>
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div
          className="faq-orb-1"
          style={themeStyles.bgOrb1}
          aria-hidden="true"
        />
        <div
          className="faq-orb-2"
          style={themeStyles.bgOrb2}
          aria-hidden="true"
        />
        <div
          className="faq-orb-3"
          style={themeStyles.bgOrb3}
          aria-hidden="true"
        />
      </div>

      <div style={themeStyles.content}>
        {/* Header */}
        <div style={themeStyles.header}>
          {/* <div style={themeStyles.heroBadge}>
            <FaLeaf style={{ fontSize: "0.7rem" }} />
            Frequently Asked Questions
          </div> */}
          <h1 style={themeStyles.title}>
            How Can We Help?
            <span style={themeStyles.titleAccent} aria-hidden="true" />
          </h1>
          <p style={themeStyles.subtitle}>
            Find answers to commonly asked questions about our 100% natural
            Ayurvedic powders, orders, shipping, and the ASudha Beauty
            experience.
          </p>
        </div>

        {/* Search */}
        <div style={themeStyles.searchContainer}>
          <div style={themeStyles.searchIcon}>
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search for answers..."
            style={themeStyles.searchInput}
            className="faq-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search FAQs"
          />
        </div>

        {/* Categories */}
        <div style={themeStyles.categoriesContainer}>
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                style={{
                  ...themeStyles.categoryButton,
                  ...(isActive ? themeStyles.activeCategoryButton : {}),
                }}
                className="faq-category-btn"
                onClick={() => setActiveCategory(category.id)}
                type="button"
                aria-pressed={isActive}
              >
                {category.icon}
                {category.label}
                <span style={themeStyles.categoryCount}>
                  {getCategoryCount(category.id)}
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQs List */}
        <div style={themeStyles.faqsContainer}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqs.includes(faq.id);
              return (
                <div key={faq.id} style={themeStyles.faqItem} className="faq-item">
                  <div
                    style={themeStyles.faqQuestion}
                    className="faq-question-row"
                    onClick={() => toggleFaq(faq.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleFaq(faq.id);
                      }
                    }}
                    aria-expanded={isOpen}
                  >
                    <span style={themeStyles.faqQuestionText}>
                      <span
                        style={themeStyles.faqIconWrap}
                        className="faq-question-icon"
                      >
                        {getCategoryIcon(faq.category)}
                      </span>
                      <span>{faq.question}</span>
                    </span>
                    <span
                      style={{
                        ...themeStyles.faqToggleIcon,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      className="faq-chevron"
                    >
                      <FaChevronDown />
                    </span>
                  </div>
                  {isOpen && (
                    <div style={themeStyles.faqAnswer} className="faq-answer">
                      <div style={themeStyles.faqCategoryTag}>
                        {getCategoryIcon(faq.category)}
                        {getCategoryLabel(faq.category)}
                      </div>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={themeStyles.noResults}>
              <div style={themeStyles.noResultsAccent} />
              <div style={themeStyles.noResultsIconWrap}>
                <FaSearch />
              </div>
              <h3 style={themeStyles.noResultsTitle}>No answers found</h3>
              <p style={themeStyles.noResultsText}>
                Try searching with different keywords or browse another
                category.
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div style={themeStyles.contactSection}>
          <div style={themeStyles.contactAccentBar} />
          <div style={themeStyles.contactIconWrap}>
            <FaComments />
          </div>
          <h3 style={themeStyles.contactTitle}>Still Have Questions?</h3>
          <p style={themeStyles.contactText}>
            Can&apos;t find what you&apos;re looking for? Our Ayurvedic support
            team is here to help you.
          </p>
          <div style={themeStyles.contactButtons}>
            <Link
              to="/contact"
              style={themeStyles.contactButton}
              className="faq-contact-btn"
            >
              <FaEnvelope /> Contact Us
            </Link>
            <a
              href="tel:+917518217726"
              style={themeStyles.contactButtonSecondary}
              className="faq-contact-btn"
            >
              <FaPhone /> Call Us
            </a>
            <a
              href="https://wa.me/917518217726"
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.contactButtonWhatsApp}
              className="faq-contact-btn-wa"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;