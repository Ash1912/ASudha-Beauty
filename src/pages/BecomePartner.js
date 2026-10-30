// src/pages/BecomePartner.jsx
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
  FaStore,
  FaTruck,
  FaHandshake,
  FaChartLine,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaLeaf,
  FaArrowRight,
  FaWhatsapp,
  FaChevronDown,
  FaClipboardList,
  FaExclamationTriangle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaBookOpen,
  FaShoppingBag,
  FaQuestionCircle,
  FaHeadset,
  FaGavel,
  FaUserTie,
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
  whatsapp: "#25D366",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

// ─── Content arrays (module scope: stable references) ───
const BENEFITS = [
  {
    icon: <FaStore />,
    title: "Become a Stockist",
    description:
      "Carry our full range of 100% natural Ayurvedic powders in your store.",
    color: brandColors.gold,
  },
  {
    icon: <FaHandshake />,
    title: "Distributor Partnership",
    description:
      "Become our regional partner and distribute our herbal powders.",
    color: brandColors.primary,
  },
  {
    icon: <FaChartLine />,
    title: "High Profit Margins",
    description:
      "Enjoy highly competitive wholesale pricing with attractive margins.",
    color: brandColors.bronze,
  },
  {
    icon: <FaTruck />,
    title: "Free Shipping",
    description:
      "Free pan-India shipping on all wholesale orders above ₹15,000.",
    color: brandColors.gold,
  },
];

const WHY_CHOOSE = [
  {
    icon: <FaStar />,
    title: "Premium Quality",
    description:
      "100% natural, herbal powders crafted with Ayurvedic expertise.",
    color: brandColors.gold,
  },
  {
    icon: <FaHeart />,
    title: "Growing Brand",
    description: "Trusted by thousands of customers across India.",
    color: brandColors.primary,
  },
  {
    icon: <FaShieldAlt />,
    title: "100% Authentic",
    description: "Genuine products with full quality assurance.",
    color: brandColors.gold,
  },
  {
    icon: <FaLeaf />,
    title: "Cruelty Free",
    description: "Ethical, sustainable, and kind to people and the planet.",
    color: brandColors.green,
  },
];

const REQUIREMENTS = [
  "GST registered business entity (Valid GSTIN required)",
  "Physical retail store or warehouse space",
  "Minimum order quantity: ₹15,000",
  "Commitment to maintain brand quality and packaging standards",
  "Willingness to support local marketing initiatives",
];

const BUSINESS_TYPES = [
  "Retail Store (General Store)",
  "Ayurvedic / Wellness Store",
  "Salon / Beauty Parlor",
  "Online Store / E-commerce",
  "Department Store",
  "Distributor / Wholesaler",
  "Other",
];

// ─── FAQs (used for FAQPage schema AND visible accordion) ───
const PARTNER_FAQS = [
  {
    q: "What is the minimum order quantity for wholesale?",
    a: "The minimum order quantity for wholesale is ₹15,000. This ensures you receive the best wholesale pricing and free shipping across India.",
  },
  {
    q: "Do I need a GST registration to become a partner?",
    a: "Yes, a valid GST registration is required to become an authorized ASudha Beauty partner. This is mandatory for B2B wholesale transactions in India under the GST Act.",
  },
  {
    q: "How long does it take to get approved?",
    a: "We typically review and approve applications within 2–3 business days. Our team will contact you via email and WhatsApp to share the wholesale catalog and pricing.",
  },
  {
    q: "What support do you provide to partners?",
    a: "We provide marketing materials, product samples, and dedicated account support to help you grow your business. This includes Instagram-ready graphics, product photography, and educational content about Ayurvedic ingredients.",
  },
  {
    q: "Can I sell ASudha Beauty products on online marketplaces like Amazon and Flipkart?",
    a: "Yes — authorized online sellers can list on Amazon, Flipkart, Meesho, and other marketplaces. We recommend approving the listing plan with us first so we can protect brand consistency and avoid pricing conflicts with other partners.",
  },
  {
    q: "What are the payment terms for wholesale orders?",
    a: "We accept 100% advance payment for the first order and offer flexible terms (50% advance / 50% on delivery) for repeat orders after 3 successful transactions. All payments are processed through secure bank transfer or UPI.",
  },
  {
    q: "Do you offer exclusivity in a territory?",
    a: "Yes — for distributors committing to a minimum monthly volume, we offer territory exclusivity in their city or district. Contact our partnership team to discuss volume commitments and terms.",
  },
];

// ─── Internal backlinks ───
const RELATED_PAGES = [
  {
    to: "/affiliate",
    label: "Explore the Affiliate Program",
    icon: <FaUserTie />,
  },
  {
    to: "/shop",
    label: "Browse our full Ayurvedic collection",
    icon: <FaShoppingBag />,
  },
  {
    to: "/blog",
    label: "Read our Ayurvedic beauty guides",
    icon: <FaBookOpen />,
  },
  {
    to: "/faqs",
    label: "Frequently asked questions",
    icon: <FaQuestionCircle />,
  },
  {
    to: "/contact",
    label: "Contact our team",
    icon: <FaHeadset />,
  },
  {
    to: "/terms",
    label: "Terms & Conditions",
    icon: <FaGavel />,
  },
];

// ─── Authoritative external hyperlinks (B2B legal framework) ───
const TRUSTED_SOURCES = [
  {
    label:
      "GST Council — Government of India (Goods & Services Tax registration)",
    href: "https://www.gst.gov.in/",
    domain: "gst.gov.in",
  },
  {
    label:
      "Udyam Registration — Ministry of Micro, Small & Medium Enterprises",
    href: "https://udyamregistration.gov.in/",
    domain: "udyamregistration.gov.in",
  },
  {
    label:
      "Ministry of Corporate Affairs — Company & LLP Registration",
    href: "https://www.mca.gov.in/",
    domain: "mca.gov.in",
  },
  {
    label:
      "Consumer Protection Act, 2019 — Department of Consumer Affairs",
    href: "https://consumeraffairs.nic.in/",
    domain: "consumeraffairs.nic.in",
  },
];

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

const BecomePartner = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    city: "",
    state: "",
    experience: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [activeFaq, setActiveFaq] = useState(null);

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
    errorBg: "rgba(244, 67, 54, 0.15)",
    errorBorder: "rgba(244, 67, 54, 0.3)",
    errorText: "#ff8a80",
    successBg: "rgba(76, 175, 80, 0.15)",
    successBorder: "rgba(76, 175, 80, 0.25)",
    successText: "#a5d6a7",
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
    errorBg: "rgba(244, 67, 54, 0.1)",
    errorBorder: "rgba(244, 67, 54, 0.25)",
    errorText: "#c62828",
    successBg: "rgba(76, 175, 80, 0.1)",
    successBorder: "rgba(76, 175, 80, 0.25)",
    successText: "#2e7d32",
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  // ─── Form handlers ───
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (formError) setFormError("");
  };

  const validateForm = () => {
    const errors = {};
    if (formData.businessName.trim().length < 2) {
      errors.businessName = "Please enter your business name";
    }
    if (formData.contactName.trim().length < 2) {
      errors.contactName = "Please enter the contact person's full name";
    }
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!PHONE_REGEX.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number";
    }
    if (!formData.businessType) {
      errors.businessType = "Please select your business type";
    }
    if (!formData.experience) {
      errors.experience = "Please select your years in business";
    }
    if (formData.city.trim().length < 2) {
      errors.city = "Please enter your city";
    }
    if (formData.state.trim().length < 2) {
      errors.state = "Please enter your state";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstKey = Object.keys(fieldErrors)[0] || "businessName";
      document.getElementById(`bp-${firstKey}`)?.focus();
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 8000);
    setFormData({
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      businessType: "",
      city: "",
      state: "",
      experience: "",
      message: "",
    });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // ─── JSON-LD: WebPage + FAQPage (no breadcrumb per user request) ───
  const partnerJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/partners#webpage`,
          url: `${SITE_URL}/partners`,
          name: "Become a Partner | ASudha Beauty — B2B Wholesale Program",
          description:
            "Join ASudha Beauty's B2B wholesale program as a stockist or distributor of 100% natural Ayurvedic skincare and haircare powders. GST-registered businesses welcome.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: "en-IN",
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${SITE_URL}/assets/images/og-default.png`,
          },
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/partners#faq`,
          mainEntity: PARTNER_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        },
      ],
    }),
    []
  );

  const citations = useMemo(
    () => TRUSTED_SOURCES.map((s) => ({ label: s.label, href: s.href })),
    []
  );

  // ─── Injected CSS — only depends on isDarkMode ───
  // T.shadowLift is inlined as isDarkMode ternary to satisfy exhaustive-deps.
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-partner-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-partner-styles", "true");
    style.textContent = `
      @keyframes bpFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes bpFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes bpFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }
      @keyframes bpFade {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .bp-orb-1 { animation: bpFloat1 16s ease-in-out infinite; }
      .bp-orb-2 { animation: bpFloat2 20s ease-in-out infinite; }
      .bp-orb-3 { animation: bpFloat3 18s ease-in-out infinite; }

      .bp-input {
        transition: border-color 0.25s ease, box-shadow 0.25s ease,
                    background-color 0.25s ease;
      }
      .bp-input:focus {
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
      .bp-input::placeholder {
        color: ${isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(62,39,35,0.35)"};
      }
      .bp-input[aria-invalid="true"] {
        border-color: #f44336 !important;
      }
      .bp-input[aria-invalid="true"]:focus {
        box-shadow: 0 0 0 4px rgba(244, 67, 54, 0.15) !important;
      }
      select.bp-input option {
        background-color: ${
          isDarkMode ? brandColors.darkSlate : "#ffffff"
        } !important;
        color: ${isDarkMode ? "#ffffff" : brandColors.earthLight} !important;
      }

      .bp-benefit-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s ease, border-color 0.3s ease;
      }
      .bp-benefit-card:hover {
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
      .bp-benefit-card:hover .bp-benefit-icon {
        transform: scale(1.1) rotate(-6deg);
      }
      .bp-benefit-icon {
        transition: transform 0.4s ease;
      }

      .bp-choose-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .bp-choose-card:hover {
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
      .bp-choose-card:hover .bp-choose-icon {
        transform: scale(1.1) rotate(-6deg);
      }
      .bp-choose-icon {
        transition: transform 0.35s ease;
      }

      .bp-requirement-row {
        transition: background-color 0.25s ease, transform 0.25s ease;
      }
      .bp-requirement-row:hover {
        background-color: ${
          isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(62,39,35,0.03)"
        } !important;
        transform: translateX(4px);
      }

      /* FAQ toggle — real button */
      .bp-faq-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        width: 100%;
        padding: 1.35rem 1.6rem;
        background: transparent;
        border: none;
        text-align: left;
        font-family: inherit;
        cursor: pointer;
        color: inherit;
        transition: background-color 0.25s ease;
      }
      .bp-faq-btn:hover,
      .bp-faq-btn:focus-visible {
        background-color: ${
          isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(62,39,35,0.04)"
        } !important;
        outline: none;
      }
      .bp-faq-btn:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: -2px;
      }
      .bp-faq-icon {
        transition: transform 0.3s ease;
      }
      .bp-faq-answer {
        animation: bpFade 0.3s ease;
      }

      .bp-contact-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .bp-contact-card:hover {
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
      .bp-contact-card:hover .bp-contact-icon {
        transform: scale(1.1) rotate(-6deg);
      }
      .bp-contact-icon {
        transition: transform 0.35s ease;
      }

      .bp-cta-primary {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .bp-cta-primary:hover,
      .bp-cta-primary:focus-visible {
        transform: translateY(-3px);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
        gap: 0.75rem;
        outline: none;
      }

      .bp-cta-secondary {
        transition: transform 0.3s ease, border-color 0.3s ease,
                    color 0.3s ease;
      }
      .bp-cta-secondary:hover,
      .bp-cta-secondary:focus-visible {
        transform: translateY(-3px);
        border-color: ${brandColors.primary} !important;
        color: ${brandColors.primary} !important;
        outline: none;
      }

      .bp-submit-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .bp-submit-btn:hover:not(:disabled),
      .bp-submit-btn:focus-visible:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
        outline: none;
      }
      .bp-submit-btn:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: 2px;
      }

      /* Related / citation links */
      .bp-related-link {
        transition: color 0.25s ease, gap 0.25s ease;
      }
      .bp-related-link:hover,
      .bp-related-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        gap: 0.6rem;
        outline: none;
      }
      .bp-citation-link:hover,
      .bp-citation-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        outline: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .bp-orb-1, .bp-orb-2, .bp-orb-3 { animation: none !important; }
        .bp-benefit-card, .bp-benefit-icon, .bp-choose-card,
        .bp-choose-icon, .bp-requirement-row, .bp-faq-btn,
        .bp-faq-icon, .bp-contact-card, .bp-contact-icon,
        .bp-cta-primary, .bp-cta-secondary, .bp-submit-btn,
        .bp-related-link, .bp-citation-link {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-partner-styles="true"]')
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

    hero: {
      position: "relative",
      zIndex: 1,
      padding: isMobile
        ? "3rem 1rem 2.5rem"
        : isNarrow
        ? "4rem 1.5rem 3rem"
        : "5.5rem 2rem 4rem",
      textAlign: "center",
      borderBottom: `1px solid ${T.borderSoft}`,
      overflow: "hidden",
    },
    heroContent: {
      position: "relative",
      zIndex: 2,
      maxWidth: "860px",
      margin: "0 auto",
    },
    heroTitle: {
      fontSize: isMobile ? "2rem" : isNarrow ? "2.5rem" : "3.4rem",
      fontWeight: "900",
      marginBottom: "1.25rem",
      color: T.text,
      lineHeight: "1.1",
      letterSpacing: "-0.5px",
      position: "relative",
      display: "inline-block",
      paddingBottom: "0.85rem",
    },
    heroTitleAccent: {
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
      width: "110px",
      height: "4px",
      borderRadius: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
    },
    heroSubtitle: {
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      color: T.textMuted,
      maxWidth: "700px",
      margin: "0 auto 2.25rem",
      lineHeight: "1.75",
    },
    heroButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    ctaButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      padding: isMobile ? "0.95rem 1.85rem" : "1.05rem 2.4rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.92rem" : "1rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
      border: "none",
      cursor: "pointer",
    },
    secondaryButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      padding: isMobile ? "0.95rem 1.85rem" : "1.05rem 2.4rem",
      backgroundColor: "transparent",
      color: T.text,
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "700",
      fontSize: isMobile ? "0.92rem" : "1rem",
      border: `2px solid ${T.border}`,
      fontFamily: "inherit",
      letterSpacing: "0.2px",
      cursor: "pointer",
    },

    section: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile
        ? "3rem 1rem"
        : isNarrow
        ? "3.5rem 1.5rem"
        : "4.5rem 2rem",
    },
    sectionTitleRow: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "1rem",
    },
    sectionTitle: {
      fontSize: isMobile ? "1.75rem" : "2.3rem",
      textAlign: "center",
      margin: 0,
      color: T.text,
      fontWeight: "900",
      letterSpacing: "-0.4px",
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
      marginBottom: "3rem",
      fontSize: isMobile ? "0.92rem" : "1.02rem",
      maxWidth: "640px",
      margin: "1.25rem auto 3rem",
      lineHeight: "1.7",
    },

    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "minmax(0, 1fr)"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: isMobile ? "1.15rem" : "1.5rem",
    },
    benefitCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "2rem 1.5rem" : "2.25rem 1.5rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    benefitCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.85,
    },
    benefitIconWrap: {
      width: "76px",
      height: "76px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      marginBottom: "1.35rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.25)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      flexShrink: 0,
    },
    benefitTitle: {
      fontSize: isMobile ? "1.05rem" : "1.15rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.2px",
      lineHeight: "1.35",
    },
    benefitDescription: {
      fontSize: isMobile ? "0.88rem" : "0.92rem",
      color: T.textMuted,
      lineHeight: "1.7",
      margin: 0,
    },

    chooseGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "minmax(0, 1fr)"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: isMobile ? "1.15rem" : "1.5rem",
    },
    chooseCard: {
      textAlign: "center",
      padding: isMobile ? "1.85rem 1.35rem" : "2rem 1.5rem",
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    chooseCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.85,
    },
    chooseIconWrap: {
      width: "72px",
      height: "72px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.85rem",
      marginBottom: "1.15rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.25)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      flexShrink: 0,
    },
    chooseTitle: {
      fontSize: isMobile ? "1.05rem" : "1.1rem",
      fontWeight: "900",
      marginBottom: "0.55rem",
      color: T.text,
      letterSpacing: "-0.1px",
    },
    chooseDescription: {
      fontSize: isMobile ? "0.86rem" : "0.9rem",
      color: T.textMuted,
      lineHeight: "1.7",
      margin: 0,
    },

    requirementsCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "24px",
      padding: isMobile ? "1.75rem 1.35rem" : "2.5rem 2.25rem",
      marginTop: "1rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    },
    requirementsAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    requirementRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.85rem",
      marginBottom: "0.35rem",
      fontSize: isMobile ? "0.9rem" : "0.98rem",
      color: T.text,
      padding: "0.85rem 1rem",
      borderRadius: "14px",
      lineHeight: "1.6",
      fontWeight: "600",
    },
    requirementCheckWrap: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.1)",
      color: brandColors.green,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.85rem",
      flexShrink: 0,
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.28)" : "rgba(76, 175, 80, 0.2)"
      }`,
      marginTop: "0.1rem",
    },

    faqItem: {
      marginBottom: "0.85rem",
      border: `1px solid ${T.border}`,
      backgroundColor: T.card,
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: T.shadow,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
    },
    faqQuestion: {
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      fontWeight: "800",
      color: T.text,
      flex: 1,
      lineHeight: "1.5",
      letterSpacing: "-0.1px",
      textAlign: "left",
    },
    faqIconWrap: {
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.12)"
        : "rgba(245, 52, 107, 0.08)",
      color: isDarkMode ? T.gold : brandColors.primary,
      fontSize: "0.8rem",
      flexShrink: 0,
    },
    faqAnswer: {
      padding: isMobile
        ? "0 1.25rem 1.25rem 1.25rem"
        : "0 1.6rem 1.5rem 1.6rem",
      color: T.textMuted,
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      lineHeight: "1.75",
      borderTop: `1px solid ${T.divider}`,
      paddingTop: "1.15rem",
      fontWeight: "500",
    },

    formContainer: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "26px",
      padding: isMobile ? "1.75rem 1.35rem" : "2.75rem 2.5rem",
      marginTop: "2rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
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
    formGrid: {
      display: "grid",
      gridTemplateColumns: isNarrow
        ? "minmax(0, 1fr)"
        : "repeat(2, minmax(0, 1fr))",
      gap: isMobile ? "1rem" : "1.25rem",
      marginBottom: "1.25rem",
    },
    formGroup: {
      marginBottom: "0.5rem",
    },
    formGroupFull: {
      marginBottom: "1.25rem",
      gridColumn: "1 / -1",
    },
    label: {
      display: "block",
      marginBottom: "0.55rem",
      fontWeight: "800",
      color: T.text,
      fontSize: "0.8rem",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
    },
    input: {
      width: "100%",
      padding: isMobile ? "0.85rem 1.1rem" : "0.9rem 1.25rem",
      borderRadius: "14px",
      border: `1.5px solid ${T.border}`,
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: T.text,
      fontSize: "0.92rem",
      outline: "none",
      fontFamily: "inherit",
      fontWeight: "600",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: isMobile ? "0.85rem 1.1rem" : "0.9rem 1.25rem",
      borderRadius: "14px",
      border: `1.5px solid ${T.border}`,
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: T.text,
      fontSize: "0.92rem",
      outline: "none",
      fontFamily: "inherit",
      fontWeight: "600",
      boxSizing: "border-box",
      colorScheme: isDarkMode ? "dark" : "light",
      cursor: "pointer",
    },
    textarea: {
      width: "100%",
      padding: isMobile ? "0.85rem 1.1rem" : "0.9rem 1.25rem",
      borderRadius: "14px",
      border: `1.5px solid ${T.border}`,
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: T.text,
      fontSize: "0.92rem",
      minHeight: "130px",
      fontFamily: "inherit",
      outline: "none",
      resize: "vertical",
      boxSizing: "border-box",
      fontWeight: "600",
      lineHeight: "1.6",
    },
    fieldError: {
      fontSize: "0.75rem",
      color: T.errorText,
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
      marginTop: "0.4rem",
    },
    formError: {
      marginTop: "1rem",
      padding: "0.85rem 1.15rem",
      backgroundColor: T.errorBg,
      color: T.errorText,
      borderRadius: "14px",
      border: `1px solid ${T.errorBorder}`,
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      fontWeight: "600",
      fontSize: "0.9rem",
    },
    submitButton: {
      width: "100%",
      padding: isMobile ? "0.95rem" : "1.1rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "0.95rem" : "1.02rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.55rem",
      fontFamily: "inherit",
      letterSpacing: "0.3px",
      marginTop: "0.5rem",
    },
    successMessage: {
      marginTop: "1.5rem",
      padding: "1rem 1.15rem",
      backgroundColor: T.successBg,
      color: T.successText,
      borderRadius: "14px",
      textAlign: "center",
      border: `1px solid ${T.successBorder}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.55rem",
      fontWeight: "700",
      fontSize: "0.92rem",
    },

    contactInfo: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "minmax(0, 1fr)"
        : isNarrow
        ? "repeat(3, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
      gap: isMobile ? "1.15rem" : "1.5rem",
      marginTop: "1rem",
    },
    contactCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "2rem 1.5rem" : "2.25rem 1.75rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    contactCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.85,
    },
    contactIconWrap: {
      width: "68px",
      height: "68px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.75rem",
      marginBottom: "1.25rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.25)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      flexShrink: 0,
    },
    contactTitle: {
      fontSize: "1.05rem",
      fontWeight: "900",
      marginBottom: "0.65rem",
      color: T.text,
      letterSpacing: "-0.2px",
    },
    contactText: {
      color: T.textMuted,
      lineHeight: "1.65",
      fontSize: isMobile ? "0.88rem" : "0.94rem",
      fontWeight: "700",
      margin: 0,
    },
    contactSub: {
      color: T.textMuted,
      fontSize: "0.85rem",
      margin: "0.25rem 0 0",
      fontWeight: "600",
    },

    // ─── Related pages ───
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

    // ─── Citations ───
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

  return (
    <div style={themeStyles.container}>
      {/* ─── SEO: meta + JSON-LD (no breadcrumb per user request) ─── */}
      <SEO
        title="Become a Partner | ASudha Beauty — B2B Wholesale Program"
        description="Join ASudha Beauty's B2B wholesale program as a stockist or distributor of 100% natural Ayurvedic skincare and haircare powders. GST-registered businesses welcome. Minimum order ₹15,000."
        keywords="b2b partnership india, wholesale ayurvedic products, stockist program, distributor program, natural beauty wholesale, ayurvedic skincare wholesale india, become stockist asudha, wholesale herbal powders"
        url="/partners"
        citations={citations}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(partnerJsonLd),
        }}
      />

      {/* Animated background */}
      <div style={themeStyles.bgLayer} aria-hidden="true">
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div className="bp-orb-1" style={themeStyles.bgOrb1} />
        <div className="bp-orb-2" style={themeStyles.bgOrb2} />
        <div className="bp-orb-3" style={themeStyles.bgOrb3} />
      </div>

      {/* Hero */}
      <section style={themeStyles.hero}>
        <div style={themeStyles.heroContent}>
          <h1 style={themeStyles.heroTitle}>
            Become a Partner
            <span style={themeStyles.heroTitleAccent} aria-hidden="true" />
          </h1>
          <p style={themeStyles.heroSubtitle}>
            Join the ASudha Beauty family and bring the power of 100% natural
            Ayurvedic powders to your customers. Let&apos;s grow together.
          </p>
          <div style={themeStyles.heroButtons}>
            <a
              href="#apply"
              style={themeStyles.ctaButton}
              className="bp-cta-primary"
            >
              Apply Now <FaArrowRight aria-hidden="true" />
            </a>
            <a
              href="#benefits"
              style={themeStyles.secondaryButton}
              className="bp-cta-secondary"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section
        id="benefits"
        style={themeStyles.section}
        aria-labelledby="benefits-title"
      >
        <div style={themeStyles.sectionTitleRow}>
          <h2 id="benefits-title" style={themeStyles.sectionTitle}>
            Why Partner With Us?
          </h2>
          <div
            style={themeStyles.sectionTitleUnderline}
            aria-hidden="true"
          />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Exclusive wholesale opportunities for retailers, distributors, and
          wellness stores.
        </p>
        <div style={themeStyles.benefitsGrid}>
          {BENEFITS.map((benefit) => (
            <article
              key={benefit.title}
              style={themeStyles.benefitCard}
              className="bp-benefit-card"
            >
              <div
                style={themeStyles.benefitCardAccent}
                aria-hidden="true"
              />
              <div
                style={{
                  ...themeStyles.benefitIconWrap,
                  background: `linear-gradient(135deg, ${benefit.color}, ${benefit.color}dd)`,
                }}
                className="bp-benefit-icon"
                aria-hidden="true"
              >
                {benefit.icon}
              </div>
              <h3 style={themeStyles.benefitTitle}>{benefit.title}</h3>
              <p style={themeStyles.benefitDescription}>
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        style={themeStyles.section}
        aria-labelledby="why-asudha-title"
      >
        <div style={themeStyles.sectionTitleRow}>
          <h2 id="why-asudha-title" style={themeStyles.sectionTitle}>
            Why ASudha Beauty?
          </h2>
          <div
            style={themeStyles.sectionTitleUnderline}
            aria-hidden="true"
          />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Built on trust, quality, and the timeless wisdom of Ayurveda.
        </p>
        <div style={themeStyles.chooseGrid}>
          {WHY_CHOOSE.map((item) => (
            <article
              key={item.title}
              style={themeStyles.chooseCard}
              className="bp-choose-card"
            >
              <div
                style={themeStyles.chooseCardAccent}
                aria-hidden="true"
              />
              <div
                style={{
                  ...themeStyles.chooseIconWrap,
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                }}
                className="bp-choose-icon"
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <h3 style={themeStyles.chooseTitle}>{item.title}</h3>
              <p style={themeStyles.chooseDescription}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section
        style={themeStyles.section}
        aria-labelledby="requirements-title"
      >
        <div style={themeStyles.sectionTitleRow}>
          <h2 id="requirements-title" style={themeStyles.sectionTitle}>
            Partner Requirements
          </h2>
          <div
            style={themeStyles.sectionTitleUnderline}
            aria-hidden="true"
          />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Simple requirements to ensure a successful partnership.
        </p>
        <div style={themeStyles.requirementsCard}>
          <div
            style={themeStyles.requirementsAccentBar}
            aria-hidden="true"
          />
          {REQUIREMENTS.map((req) => (
            <div
              key={req}
              style={themeStyles.requirementRow}
              className="bp-requirement-row"
            >
              <span
                style={themeStyles.requirementCheckWrap}
                aria-hidden="true"
              >
                <FaCheckCircle />
              </span>
              <span>{req}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section
        style={themeStyles.section}
        aria-labelledby="partner-faq-title"
      >
        <div style={themeStyles.sectionTitleRow}>
          <h2 id="partner-faq-title" style={themeStyles.sectionTitle}>
            Frequently Asked Questions
          </h2>
          <div
            style={themeStyles.sectionTitleUnderline}
            aria-hidden="true"
          />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Everything you need to know about becoming an ASudha Beauty partner.
        </p>
        {PARTNER_FAQS.map((faq, index) => {
          const isOpen = activeFaq === index;
          const answerId = `partner-faq-answer-${index}`;
          return (
            <div key={faq.q} style={themeStyles.faqItem}>
              <button
                type="button"
                className="bp-faq-btn"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span style={themeStyles.faqQuestion}>{faq.q}</span>
                <span
                  style={{
                    ...themeStyles.faqIconWrap,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  className="bp-faq-icon"
                  aria-hidden="true"
                >
                  <FaChevronDown />
                </span>
              </button>
              {isOpen && (
                <div
                  id={answerId}
                  style={themeStyles.faqAnswer}
                  className="bp-faq-answer"
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

      {/* Application Form */}
      <section
        id="apply"
        style={themeStyles.section}
        aria-labelledby="apply-title"
      >
        <div style={themeStyles.sectionTitleRow}>
          <h2 id="apply-title" style={themeStyles.sectionTitle}>
            Partner Application
          </h2>
          <div
            style={themeStyles.sectionTitleUnderline}
            aria-hidden="true"
          />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Fill out the form below to start your wholesale journey with ASudha
          Beauty.
        </p>
        <div style={themeStyles.formContainer}>
          <div style={themeStyles.formAccentBar} aria-hidden="true" />
          <form onSubmit={handleSubmit} noValidate>
            <div style={themeStyles.formGrid}>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="bp-businessName">
                  Business Name *
                </label>
                <input
                  id="bp-businessName"
                  type="text"
                  name="businessName"
                  style={themeStyles.input}
                  className="bp-input"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your business name"
                  required
                  aria-required="true"
                  aria-invalid={
                    fieldErrors.businessName ? "true" : "false"
                  }
                  aria-describedby={
                    fieldErrors.businessName
                      ? "bp-businessName-error"
                      : undefined
                  }
                  autoComplete="organization"
                />
                {fieldErrors.businessName && (
                  <div
                    id="bp-businessName-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" />{" "}
                    {fieldErrors.businessName}
                  </div>
                )}
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="bp-contactName">
                  Contact Person Name *
                </label>
                <input
                  id="bp-contactName"
                  type="text"
                  name="contactName"
                  style={themeStyles.input}
                  className="bp-input"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  required
                  aria-required="true"
                  aria-invalid={
                    fieldErrors.contactName ? "true" : "false"
                  }
                  aria-describedby={
                    fieldErrors.contactName
                      ? "bp-contactName-error"
                      : undefined
                  }
                  autoComplete="name"
                />
                {fieldErrors.contactName && (
                  <div
                    id="bp-contactName-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" />{" "}
                    {fieldErrors.contactName}
                  </div>
                )}
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="bp-email">
                  Email Address *
                </label>
                <input
                  id="bp-email"
                  type="email"
                  name="email"
                  style={themeStyles.input}
                  className="bp-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@business.com"
                  required
                  aria-required="true"
                  aria-invalid={fieldErrors.email ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.email ? "bp-email-error" : undefined
                  }
                  autoComplete="email"
                />
                {fieldErrors.email && (
                  <div
                    id="bp-email-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" /> {fieldErrors.email}
                  </div>
                )}
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="bp-phone">
                  Phone Number *
                </label>
                <input
                  id="bp-phone"
                  type="tel"
                  name="phone"
                  style={themeStyles.input}
                  className="bp-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit Indian mobile number"
                  required
                  aria-required="true"
                  aria-invalid={fieldErrors.phone ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.phone ? "bp-phone-error" : undefined
                  }
                  autoComplete="tel"
                />
                {fieldErrors.phone && (
                  <div
                    id="bp-phone-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" /> {fieldErrors.phone}
                  </div>
                )}
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="bp-businessType">
                  Business Type *
                </label>
                <select
                  id="bp-businessType"
                  name="businessType"
                  style={themeStyles.select}
                  className="bp-input"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={
                    fieldErrors.businessType ? "true" : "false"
                  }
                  aria-describedby={
                    fieldErrors.businessType
                      ? "bp-businessType-error"
                      : undefined
                  }
                >
                  <option value="">Select business type</option>
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {fieldErrors.businessType && (
                  <div
                    id="bp-businessType-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" />{" "}
                    {fieldErrors.businessType}
                  </div>
                )}
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="bp-experience">
                  Years in Business *
                </label>
                <select
                  id="bp-experience"
                  name="experience"
                  style={themeStyles.select}
                  className="bp-input"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={fieldErrors.experience ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.experience
                      ? "bp-experience-error"
                      : undefined
                  }
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0–1 year</option>
                  <option value="1-3">1–3 years</option>
                  <option value="3-5">3–5 years</option>
                  <option value="5+">5+ years</option>
                </select>
                {fieldErrors.experience && (
                  <div
                    id="bp-experience-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" />{" "}
                    {fieldErrors.experience}
                  </div>
                )}
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="bp-city">
                  City *
                </label>
                <input
                  id="bp-city"
                  type="text"
                  name="city"
                  style={themeStyles.input}
                  className="bp-input"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                  aria-required="true"
                  aria-invalid={fieldErrors.city ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.city ? "bp-city-error" : undefined
                  }
                  autoComplete="address-level2"
                />
                {fieldErrors.city && (
                  <div
                    id="bp-city-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" /> {fieldErrors.city}
                  </div>
                )}
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="bp-state">
                  State *
                </label>
                <input
                  id="bp-state"
                  type="text"
                  name="state"
                  style={themeStyles.input}
                  className="bp-input"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  required
                  aria-required="true"
                  aria-invalid={fieldErrors.state ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.state ? "bp-state-error" : undefined
                  }
                  autoComplete="address-level1"
                />
                {fieldErrors.state && (
                  <div
                    id="bp-state-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" /> {fieldErrors.state}
                  </div>
                )}
              </div>
            </div>
            <div style={themeStyles.formGroupFull}>
              <label style={themeStyles.label} htmlFor="bp-message">
                Additional Information / Message
              </label>
              <textarea
                id="bp-message"
                name="message"
                style={themeStyles.textarea}
                className="bp-input"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your store, your current product range, and why you want to partner with us..."
              />
            </div>
            <button
              type="submit"
              style={themeStyles.submitButton}
              className="bp-submit-btn"
            >
              <FaClipboardList aria-hidden="true" /> Submit Application
            </button>
            {formError && (
              <div
                style={themeStyles.formError}
                role="alert"
                aria-live="assertive"
              >
                <FaExclamationTriangle aria-hidden="true" /> {formError}
              </div>
            )}
            {formSubmitted && (
              <div
                style={themeStyles.successMessage}
                role="status"
                aria-live="polite"
              >
                <FaCheckCircle aria-hidden="true" /> Application submitted
                successfully! Our team will contact you within 2–3 business
                days.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Contact Information */}
      <section
        style={themeStyles.section}
        aria-labelledby="contact-title"
      >
        <div style={themeStyles.sectionTitleRow}>
          <h2 id="contact-title" style={themeStyles.sectionTitle}>
            Get In Touch
          </h2>
          <div
            style={themeStyles.sectionTitleUnderline}
            aria-hidden="true"
          />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Our team is ready to help you start your partnership journey.
        </p>
        <div style={themeStyles.contactInfo}>
          <div style={themeStyles.contactCard} className="bp-contact-card">
            <div style={themeStyles.contactCardAccent} aria-hidden="true" />
            <div
              style={{
                ...themeStyles.contactIconWrap,
                background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.goldDark})`,
              }}
              className="bp-contact-icon"
              aria-hidden="true"
            >
              <FaEnvelope />
            </div>
            <h3 style={themeStyles.contactTitle}>Email Us</h3>
            <a
              href="mailto:asudhabeauty@gmail.com"
              style={{
                ...themeStyles.contactText,
                color: brandColors.primary,
                textDecoration: "underline",
              }}
            >
              asudhabeauty@gmail.com
            </a>
          </div>
          <div style={themeStyles.contactCard} className="bp-contact-card">
            <div style={themeStyles.contactCardAccent} aria-hidden="true" />
            <div
              style={{
                ...themeStyles.contactIconWrap,
                background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.primaryDark})`,
              }}
              className="bp-contact-icon"
              aria-hidden="true"
            >
              <FaPhone />
            </div>
            <h3 style={themeStyles.contactTitle}>Call Us</h3>
            <a
              href="tel:+917518217726"
              style={{
                ...themeStyles.contactText,
                color: brandColors.primary,
                textDecoration: "underline",
              }}
            >
              +91-7518217726
            </a>
            <a
              href="tel:+919335975525"
              style={{
                ...themeStyles.contactSub,
                color: brandColors.primary,
                textDecoration: "underline",
              }}
            >
              +91-9335975525
            </a>
          </div>
          <div style={themeStyles.contactCard} className="bp-contact-card">
            <div style={themeStyles.contactCardAccent} aria-hidden="true" />
            <div
              style={{
                ...themeStyles.contactIconWrap,
                background: `linear-gradient(135deg, ${brandColors.whatsapp}, #128C7E)`,
              }}
              className="bp-contact-icon"
              aria-hidden="true"
            >
              <FaWhatsapp />
            </div>
            <h3 style={themeStyles.contactTitle}>WhatsApp</h3>
            <a
              href="https://wa.me/917518217726"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...themeStyles.contactText,
                color: brandColors.primary,
                textDecoration: "underline",
              }}
            >
              +91-7518217726
            </a>
          </div>
        </div>

        {/* ─── Related pages (internal backlinks) ─── */}
        <div style={themeStyles.relatedCard}>
          <h2 style={themeStyles.relatedTitle}>
            <FaBookOpen aria-hidden="true" /> Related Pages
          </h2>
          <ul style={themeStyles.relatedList}>
            {RELATED_PAGES.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  style={themeStyles.relatedLink}
                  className="bp-related-link"
                  aria-label={item.label}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <span
                      style={themeStyles.relatedIcon}
                      aria-hidden="true"
                    >
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

        {/* ─── Sources & References (external hyperlinks / E-E-A-T) ─── */}
        <div style={themeStyles.citationCard}>
          <h2 style={themeStyles.citationTitle}>
            <FaShieldAlt aria-hidden="true" /> B2B Legal &amp; Compliance
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
                  className="bp-citation-link"
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

export default BecomePartner;