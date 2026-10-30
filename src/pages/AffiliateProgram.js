// src/pages/AffiliateProgram.jsx
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
  FaMoneyBillWave,
  FaUsers,
  FaChartLine,
  FaGift,
  FaCheckCircle,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLaptopCode,
  FaHeart,
  FaRocket,
  FaArrowRight,
  FaHandshake,
  FaChevronDown,
  FaPenNib,
  FaExclamationTriangle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaBookOpen,
  FaShoppingBag,
  FaQuestionCircle,
  FaHeadset,
  FaGavel,
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
  instagram: "#E4405F",
  youtube: "#FF0000",
  facebook: "#1877F2",
  twitter: "#1DA1F2",
  blog: "#FF5722",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

// ─── Content data (module scope: stable references) ───
const BENEFITS = [
  {
    icon: <FaMoneyBillWave />,
    title: "Generous Commission",
    description:
      "Earn up to 10% commission on every referral sale. No caps, just pure earnings.",
    color: brandColors.gold,
  },
  {
    icon: <FaUsers />,
    title: "Dedicated Support",
    description:
      "Get personalized onboarding and support from our Ayurvedic beauty team.",
    color: brandColors.primary,
  },
  {
    icon: <FaChartLine />,
    title: "Real-time Analytics",
    description:
      "Track your clicks, sales, and commissions with a simple, transparent dashboard.",
    color: brandColors.bronze,
  },
  {
    icon: <FaGift />,
    title: "Free Product Samples",
    description:
      "Receive complimentary product kits to create authentic, honest reviews.",
    color: brandColors.gold,
  },
  {
    icon: <FaLaptopCode />,
    title: "Creative Assets",
    description:
      "Access high-resolution product imagery, banners, and herbal ingredient guides.",
    color: brandColors.primary,
  },
  {
    icon: <FaRocket />,
    title: "Fast Payouts",
    description:
      "Monthly payouts via bank transfer or digital wallets. Minimum payout is ₹500.",
    color: brandColors.bronze,
  },
];

const PLATFORMS = [
  {
    name: "Instagram",
    icon: <FaInstagram />,
    followers: "500+",
    color: brandColors.instagram,
  },
  {
    name: "YouTube",
    icon: <FaYoutube />,
    followers: "100+",
    color: brandColors.youtube,
  },
  {
    name: "Facebook",
    icon: <FaFacebook />,
    followers: "1K+",
    color: brandColors.facebook,
  },
  {
    name: "Twitter/X",
    icon: <FaTwitter />,
    followers: "500+",
    color: brandColors.twitter,
  },
  {
    name: "Blog",
    icon: <FaLaptopCode />,
    followers: "500+",
    color: brandColors.blog,
  },
];

const STEPS = [
  {
    step: "1",
    title: "Apply",
    description: "Fill out our simple application form below.",
  },
  {
    step: "2",
    title: "Get Approved",
    description:
      "Our team reviews and approves your application within 48 hours.",
  },
  {
    step: "3",
    title: "Share Your Links",
    description: "Get your unique affiliate links for our herbal powders.",
  },
  {
    step: "4",
    title: "Earn & Grow",
    description: "Get paid monthly for every verified sale you generate.",
  },
];

const STATS = [
  { number: "10%", label: "Commission Rate" },
  { number: "100+", label: "Active Affiliates" },
  { number: "₹5k+", label: "Avg. Monthly Earnings" },
  { number: "30-Day", label: "Cookie Duration" },
];

// ─── FAQs (used for FAQPage schema AND visible accordion) ───
const AFFILIATE_FAQS = [
  {
    q: "Who can join the ASudha Beauty affiliate program?",
    a: "Anyone who loves natural Ayurvedic products! We welcome beauty influencers, lifestyle bloggers, YouTube creators, and passionate customers who want to share the goodness of Multani Mitti, Amla, Reetha, and more.",
  },
  {
    q: "How much commission can I earn?",
    a: "Affiliates earn a standard 10% commission on each sale generated through your unique link. We also offer bonus incentives for top performers!",
  },
  {
    q: "How do I get paid?",
    a: "Payments are processed monthly via bank transfer or UPI. The minimum payout threshold is just ₹500.",
  },
  {
    q: "How do I track my sales?",
    a: "You'll receive access to a personal affiliate dashboard where you can view clicks, successful referrals, and commissions in real-time.",
  },
  {
    q: "Do I need my own products to promote ASudha Beauty?",
    a: "Not at all! We provide you with sample kits, high-quality product images, and promotional banners so you can easily create authentic content.",
  },
  {
    q: "Do I need to disclose that I'm an affiliate?",
    a: "Yes — this is a legal requirement in India under the Advertising Standards Council of India (ASCI) Influencer Guidelines and the Consumer Protection Act 2019. Every post, video, or blog you publish that includes an affiliate link must clearly disclose the relationship (e.g., '#ad', '#affiliate', 'Paid partnership'). We provide a ready-to-use disclosure kit as part of your welcome package.",
  },
  {
    q: "Can I promote ASudha Beauty in countries outside India?",
    a: "Currently, ASudha Beauty ships only within India. We're expanding internationally — affiliates targeting Indian audiences will earn the most commissions today, but international affiliates can still build awareness for future launches.",
  },
];

// ─── Internal backlinks ───
const RELATED_PAGES = [
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
    to: "/partners",
    label: "Become a brand partner",
    icon: <FaHandshake />,
  },
  {
    to: "/terms",
    label: "Terms & Conditions",
    icon: <FaGavel />,
  },
];

// ─── Authoritative external hyperlinks (legal + compliance references) ───
const TRUSTED_SOURCES = [
  {
    label:
      "Advertising Standards Council of India (ASCI) — Influencer Disclosure Guidelines",
    href: "https://www.ascionline.in/",
    domain: "ascionline.in",
  },
  {
    label:
      "Consumer Protection Act, 2019 — Department of Consumer Affairs, Government of India",
    href: "https://consumeraffairs.nic.in/",
    domain: "consumeraffairs.nic.in",
  },
  {
    label: "Reserve Bank of India — Payment & Digital Commerce",
    href: "https://www.rbi.org.in/",
    domain: "rbi.org.in",
  },
];

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const AffiliateProgram = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    platform: "",
    audienceSize: "",
    reason: "",
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
    if (formData.name.trim().length < 2) {
      errors.name = "Please enter your full name";
    }
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!/^https?:\/\/\S+/.test(formData.website.trim())) {
      errors.website = "Please enter a valid URL starting with http:// or https://";
    }
    if (!formData.platform) {
      errors.platform = "Please select your primary platform";
    }
    if (!formData.audienceSize) {
      errors.audienceSize = "Please select your audience size";
    }
    if (formData.reason.trim().length < 20) {
      errors.reason = "Please tell us a bit more (at least 20 characters)";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstKey = Object.keys(fieldErrors)[0] || "name";
      document.getElementById(`af-${firstKey}`)?.focus();
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 8000);
    setFormData({
      name: "",
      email: "",
      website: "",
      platform: "",
      audienceSize: "",
      reason: "",
    });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // ─── JSON-LD: WebPage + FAQPage (no BreadcrumbList per user request) ───
  const affiliateJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/affiliate#webpage`,
          url: `${SITE_URL}/affiliate`,
          name: "Affiliate Program | ASudha Beauty",
          description:
            "Join the ASudha Beauty affiliate program and earn up to 10% commission by sharing our 100% natural Ayurvedic skincare and haircare powders.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: "en-IN",
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${SITE_URL}/assets/images/og-default.png`,
          },
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/affiliate#faq`,
          mainEntity: AFFILIATE_FAQS.map((faq) => ({
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
  // T.shadowLift inlined as isDarkMode ternary to satisfy exhaustive-deps.
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-affiliate-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-affiliate-styles", "true");
    style.textContent = `
      @keyframes afFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes afFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes afFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }
      @keyframes afFade {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes afSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .af-orb-1 { animation: afFloat1 16s ease-in-out infinite; }
      .af-orb-2 { animation: afFloat2 20s ease-in-out infinite; }
      .af-orb-3 { animation: afFloat3 18s ease-in-out infinite; }

      .af-input {
        transition: border-color 0.25s ease, box-shadow 0.25s ease,
                    background-color 0.25s ease;
      }
      .af-input:focus {
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
      .af-input::placeholder {
        color: ${isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(62,39,35,0.35)"};
      }
      .af-input[aria-invalid="true"] {
        border-color: #f44336 !important;
      }
      .af-input[aria-invalid="true"]:focus {
        box-shadow: 0 0 0 4px rgba(244, 67, 54, 0.15) !important;
      }
      select.af-input option {
        background-color: ${
          isDarkMode ? brandColors.darkSlate : "#ffffff"
        } !important;
        color: ${isDarkMode ? "#ffffff" : brandColors.earthLight} !important;
      }

      .af-benefit-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s ease, border-color 0.3s ease;
      }
      .af-benefit-card:hover {
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
      .af-benefit-card:hover .af-benefit-icon {
        transform: scale(1.1) rotate(-6deg);
      }
      .af-benefit-icon {
        transition: transform 0.4s ease;
      }

      .af-stat-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease,
                    border-color 0.3s ease;
      }
      .af-stat-card:hover {
        transform: translateY(-5px);
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

      .af-platform-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .af-platform-card:hover {
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
      .af-platform-card:hover .af-platform-icon {
        transform: scale(1.15) rotate(-6deg);
      }
      .af-platform-icon {
        transition: transform 0.35s ease;
      }

      .af-step-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .af-step-card:hover {
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
      .af-step-card:hover .af-step-number {
        transform: scale(1.08);
        box-shadow: 0 16px 40px rgba(245, 52, 107, 0.5);
      }
      .af-step-number {
        transition: transform 0.35s ease, box-shadow 0.35s ease;
      }

      .af-cta-primary {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .af-cta-primary:hover,
      .af-cta-primary:focus-visible {
        transform: translateY(-3px);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
        gap: 0.75rem;
        outline: none;
      }

      .af-cta-secondary {
        transition: transform 0.3s ease, border-color 0.3s ease,
                    color 0.3s ease, gap 0.3s ease;
      }
      .af-cta-secondary:hover,
      .af-cta-secondary:focus-visible {
        transform: translateY(-3px);
        border-color: ${brandColors.primary} !important;
        color: ${brandColors.primary} !important;
        gap: 0.65rem;
        outline: none;
      }

      /* FAQ toggle — real button */
      .af-faq-btn {
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
      .af-faq-btn:hover,
      .af-faq-btn:focus-visible {
        background-color: ${
          isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(62,39,35,0.04)"
        } !important;
        outline: none;
      }
      .af-faq-btn:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: -2px;
      }
      .af-faq-icon {
        transition: transform 0.3s ease;
      }
      .af-faq-answer {
        animation: afFade 0.3s ease;
      }

      .af-submit-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .af-submit-btn:hover:not(:disabled),
      .af-submit-btn:focus-visible:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
        outline: none;
      }
      .af-submit-btn:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: 2px;
      }

      /* Related / citation links */
      .af-related-link {
        transition: color 0.25s ease, gap 0.25s ease;
      }
      .af-related-link:hover,
      .af-related-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        gap: 0.6rem;
        outline: none;
      }
      .af-citation-link:hover,
      .af-citation-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        outline: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .af-orb-1, .af-orb-2, .af-orb-3 { animation: none !important; }
        .af-benefit-card, .af-benefit-icon, .af-stat-card,
        .af-platform-card, .af-platform-icon, .af-step-card,
        .af-step-number, .af-cta-primary, .af-cta-secondary,
        .af-faq-btn, .af-faq-icon, .af-submit-btn,
        .af-related-link, .af-citation-link {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-affiliate-styles="true"]')
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
      fontWeight: "800",
      color: isDarkMode ? T.gold : brandColors.bronze,
      marginBottom: "1.5rem",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.3)" : "rgba(199, 125, 66, 0.2)"
      }`,
      letterSpacing: "1px",
      textTransform: "uppercase",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
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

    statsGrid: {
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: isMobile ? "0.85rem" : "1.35rem",
      maxWidth: "1100px",
      margin: "0 auto",
    },
    statCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "1.35rem 1rem" : "1.75rem 1.25rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    },
    statCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.9,
    },
    statNumber: {
      fontSize: isMobile ? "1.75rem" : "2.25rem",
      fontWeight: "900",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      lineHeight: "1.1",
      letterSpacing: "-0.5px",
    },
    statLabel: {
      fontSize: isMobile ? "0.75rem" : "0.82rem",
      color: T.textMuted,
      marginTop: "0.5rem",
      fontWeight: "700",
      letterSpacing: "0.2px",
    },

    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "minmax(0, 1fr)"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))",
      gap: isMobile ? "1.15rem" : "1.5rem",
    },
    benefitCard: {
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
      width: "72px",
      height: "72px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.9rem",
      marginBottom: "1.35rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.25)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      flexShrink: 0,
    },
    benefitTitle: {
      fontSize: isMobile ? "1.1rem" : "1.2rem",
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

    platformsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(5, minmax(0, 1fr))",
      gap: isMobile ? "0.85rem" : "1.15rem",
    },
    platformCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "20px",
      padding: isMobile ? "1.5rem 0.85rem" : "1.75rem 1.15rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    platformCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      opacity: 0.85,
    },
    platformIcon: {
      fontSize: isMobile ? "2.25rem" : "2.5rem",
      marginBottom: "0.75rem",
      display: "inline-block",
    },
    platformName: {
      fontWeight: "900",
      marginBottom: "0.3rem",
      color: T.text,
      fontSize: isMobile ? "0.85rem" : "0.92rem",
      letterSpacing: "-0.1px",
    },
    platformFollowers: {
      fontSize: "0.75rem",
      color: T.textMuted,
      fontWeight: "600",
    },
    platformsNote: {
      textAlign: "center",
      marginTop: "1.85rem",
      color: T.textMuted,
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      fontWeight: "600",
      lineHeight: "1.7",
    },

    stepsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "minmax(0, 1fr)"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: isMobile ? "1.15rem" : "1.5rem",
    },
    stepCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      padding: isMobile ? "2rem 1.35rem" : "2.25rem 1.5rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
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
    stepNumber: {
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.65rem",
      fontWeight: "900",
      margin: "0 auto 1.5rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      letterSpacing: "-0.5px",
    },
    stepTitle: {
      fontSize: isMobile ? "1.1rem" : "1.15rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.2px",
    },
    stepDescription: {
      color: T.textMuted,
      fontSize: isMobile ? "0.88rem" : "0.92rem",
      lineHeight: "1.7",
      margin: 0,
    },

    // ─── FAQ ───
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

    // ─── Form ───
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
    },
    formGroup: {
      marginBottom: "1.25rem",
      gridColumn: isNarrow ? "1 / -1" : "auto",
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
      fontSize: "0.82rem",
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

    // ─── Contact ───
    contactSection: {
      textAlign: "center",
      backgroundColor: T.cardAlt,
      borderRadius: "24px",
      padding: isMobile ? "2rem 1.5rem" : "2.75rem 2.5rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    contactAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold}, ${brandColors.primary})`,
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
      color: T.textMuted,
      marginBottom: "1.75rem",
      fontSize: isMobile ? "0.9rem" : "1rem",
      lineHeight: "1.7",
      maxWidth: "520px",
      margin: "0 auto 1.75rem",
    },
    contactButtons: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "0.75rem",
      justifyContent: "center",
      flexWrap: "wrap",
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
      {/* ─── SEO: meta + JSON-LD (no breadcrumb per request) ─── */}
      <SEO
        title="Affiliate Program | ASudha Beauty — Earn 10% Commission"
        description="Join the ASudha Beauty affiliate program and earn up to 10% commission by sharing our 100% natural Ayurvedic skincare and haircare powders. Free samples, real-time analytics, monthly payouts."
        keywords="affiliate program india, earn commission ayurvedic, natural skincare affiliate, influencer program, earn money promoting skincare, ayurvedic beauty affiliate india, asudha beauty affiliate"
        url="/affiliate"
        citations={citations}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(affiliateJsonLd),
        }}
      />

      {/* Animated background */}
      <div style={themeStyles.bgLayer} aria-hidden="true">
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div className="af-orb-1" style={themeStyles.bgOrb1} />
        <div className="af-orb-2" style={themeStyles.bgOrb2} />
        <div className="af-orb-3" style={themeStyles.bgOrb3} />
      </div>

      {/* Hero */}
      <section style={themeStyles.hero}>
        <div style={themeStyles.heroContent}>
          <div style={themeStyles.heroBadge}>
            <FaHandshake aria-hidden="true" style={{ fontSize: "0.75rem" }} />
            Affiliate Program
          </div>
          <h1 style={themeStyles.heroTitle}>
            Share the Goodness of Nature
            <span style={themeStyles.heroTitleAccent} aria-hidden="true" />
          </h1>
          <p style={themeStyles.heroSubtitle}>
            Join the ASudha Beauty affiliate family! Turn your passion for
            Ayurvedic, 100% natural skincare and haircare into rewards. Share
            our herbal powders and earn generous commissions on every sale you
            inspire.
          </p>
          <div style={themeStyles.heroButtons}>
            <a
              href="#apply"
              style={themeStyles.ctaButton}
              className="af-cta-primary"
            >
              Join Now <FaHeart aria-hidden="true" />
            </a>
            <a
              href="#benefits"
              style={themeStyles.secondaryButton}
              className="af-cta-secondary"
            >
              Learn More <FaArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={themeStyles.section}
        aria-label="Program statistics"
      >
        <div style={themeStyles.statsGrid}>
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={themeStyles.statCard}
              className="af-stat-card"
            >
              <div style={themeStyles.statCardAccent} aria-hidden="true" />
              <div style={themeStyles.statNumber}>{stat.number}</div>
              <div style={themeStyles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
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
          Grow your income while spreading the joy of pure, chemical-free
          Ayurvedic beauty.
        </p>
        <div style={themeStyles.benefitsGrid}>
          {BENEFITS.map((benefit) => (
            <article
              key={benefit.title}
              style={themeStyles.benefitCard}
              className="af-benefit-card"
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
                className="af-benefit-icon"
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

      {/* Platforms */}
      <section
        style={themeStyles.section}
        aria-labelledby="platforms-title"
      >
        <div style={themeStyles.sectionTitleRow}>
          <h2 id="platforms-title" style={themeStyles.sectionTitle}>
            Perfect For
          </h2>
          <div
            style={themeStyles.sectionTitleUnderline}
            aria-hidden="true"
          />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Whether you&apos;re a content creator, blogger, or beauty enthusiast
          — we&apos;d love to work with you.
        </p>
        <div style={themeStyles.platformsGrid}>
          {PLATFORMS.map((platform) => (
            <article
              key={platform.name}
              style={themeStyles.platformCard}
              className="af-platform-card"
            >
              <div
                style={{
                  ...themeStyles.platformCardAccent,
                  background: platform.color,
                }}
                aria-hidden="true"
              />
              <div
                style={{
                  ...themeStyles.platformIcon,
                  color: platform.color,
                }}
                className="af-platform-icon"
                aria-hidden="true"
              >
                {platform.icon}
              </div>
              <div style={themeStyles.platformName}>{platform.name}</div>
              <div style={themeStyles.platformFollowers}>
                {platform.followers} followers
              </div>
            </article>
          ))}
        </div>
        <p style={themeStyles.platformsNote}>
          + Lifestyle Bloggers, Clean Beauty Enthusiasts, Herbalists, and more!
        </p>
      </section>

      {/* Steps */}
      <section
        style={themeStyles.section}
        aria-labelledby="how-it-works-title"
      >
        <div style={themeStyles.sectionTitleRow}>
          <h2 id="how-it-works-title" style={themeStyles.sectionTitle}>
            How It Works
          </h2>
          <div
            style={themeStyles.sectionTitleUnderline}
            aria-hidden="true"
          />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Getting started is simple. Follow these four easy steps to begin your
          journey with us.
        </p>
        <div style={themeStyles.stepsGrid}>
          {STEPS.map((item) => (
            <article
              key={item.step}
              style={themeStyles.stepCard}
              className="af-step-card"
            >
              <div style={themeStyles.stepCardAccent} aria-hidden="true" />
              <div
                style={themeStyles.stepNumber}
                className="af-step-number"
              >
                {item.step}
              </div>
              <h3 style={themeStyles.stepTitle}>{item.title}</h3>
              <p style={themeStyles.stepDescription}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section
        style={themeStyles.section}
        aria-labelledby="affiliate-faq-title"
      >
        <div style={themeStyles.sectionTitleRow}>
          <h2 id="affiliate-faq-title" style={themeStyles.sectionTitle}>
            Frequently Asked Questions
          </h2>
          <div
            style={themeStyles.sectionTitleUnderline}
            aria-hidden="true"
          />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Everything you need to know about the ASudha Beauty affiliate
          program.
        </p>
        {AFFILIATE_FAQS.map((faq, index) => {
          const isOpen = activeFaq === index;
          const answerId = `affiliate-faq-answer-${index}`;
          return (
            <div key={faq.q} style={themeStyles.faqItem}>
              <button
                type="button"
                className="af-faq-btn"
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
                  className="af-faq-icon"
                  aria-hidden="true"
                >
                  <FaChevronDown />
                </span>
              </button>
              {isOpen && (
                <div
                  id={answerId}
                  style={themeStyles.faqAnswer}
                  className="af-faq-answer"
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
            Become an ASudha Affiliate
          </h2>
          <div
            style={themeStyles.sectionTitleUnderline}
            aria-hidden="true"
          />
        </div>
        <p style={themeStyles.sectionSubtitle}>
          Ready to share the power of nature? Fill out the form below and our
          team will get back to you within 48 hours.
        </p>
        <div style={themeStyles.formContainer}>
          <div style={themeStyles.formAccentBar} aria-hidden="true" />
          <form onSubmit={handleSubmit} noValidate>
            <div style={themeStyles.formGrid}>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="af-name">
                  Full Name *
                </label>
                <input
                  id="af-name"
                  type="text"
                  name="name"
                  style={themeStyles.input}
                  className="af-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  aria-required="true"
                  aria-invalid={fieldErrors.name ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.name ? "af-name-error" : undefined
                  }
                  autoComplete="name"
                />
                {fieldErrors.name && (
                  <div
                    id="af-name-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" /> {fieldErrors.name}
                  </div>
                )}
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="af-email">
                  Email Address *
                </label>
                <input
                  id="af-email"
                  type="email"
                  name="email"
                  style={themeStyles.input}
                  className="af-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@email.com"
                  required
                  aria-required="true"
                  aria-invalid={fieldErrors.email ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.email ? "af-email-error" : undefined
                  }
                  autoComplete="email"
                />
                {fieldErrors.email && (
                  <div
                    id="af-email-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" /> {fieldErrors.email}
                  </div>
                )}
              </div>
            </div>

            <div style={themeStyles.formGroupFull}>
              <label style={themeStyles.label} htmlFor="af-website">
                Website / Social Media Profile *
              </label>
              <input
                id="af-website"
                type="url"
                name="website"
                style={themeStyles.input}
                className="af-input"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://..."
                required
                aria-required="true"
                aria-invalid={fieldErrors.website ? "true" : "false"}
                aria-describedby={
                  fieldErrors.website ? "af-website-error" : undefined
                }
                autoComplete="url"
              />
              {fieldErrors.website && (
                <div
                  id="af-website-error"
                  style={themeStyles.fieldError}
                  role="alert"
                >
                  <FaTimesCircle aria-hidden="true" /> {fieldErrors.website}
                </div>
              )}
            </div>

            <div style={themeStyles.formGrid}>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="af-platform">
                  Primary Platform *
                </label>
                <select
                  id="af-platform"
                  name="platform"
                  style={themeStyles.select}
                  className="af-input"
                  value={formData.platform}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={fieldErrors.platform ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.platform ? "af-platform-error" : undefined
                  }
                >
                  <option value="">Select your platform</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="facebook">Facebook</option>
                  <option value="blog">Blog / Website</option>
                  <option value="other">Other</option>
                </select>
                {fieldErrors.platform && (
                  <div
                    id="af-platform-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" />{" "}
                    {fieldErrors.platform}
                  </div>
                )}
              </div>
              <div style={themeStyles.formGroup}>
                <label style={themeStyles.label} htmlFor="af-audienceSize">
                  Audience Size *
                </label>
                <select
                  id="af-audienceSize"
                  name="audienceSize"
                  style={themeStyles.select}
                  className="af-input"
                  value={formData.audienceSize}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-invalid={fieldErrors.audienceSize ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.audienceSize
                      ? "af-audienceSize-error"
                      : undefined
                  }
                >
                  <option value="">Select audience size</option>
                  <option value="100-500">100 – 500 followers</option>
                  <option value="500-1k">500 – 1K followers</option>
                  <option value="1k-5k">1K – 5K followers</option>
                  <option value="5k+">5K+ followers</option>
                </select>
                {fieldErrors.audienceSize && (
                  <div
                    id="af-audienceSize-error"
                    style={themeStyles.fieldError}
                    role="alert"
                  >
                    <FaTimesCircle aria-hidden="true" />{" "}
                    {fieldErrors.audienceSize}
                  </div>
                )}
              </div>
            </div>

            <div style={themeStyles.formGroupFull}>
              <label style={themeStyles.label} htmlFor="af-reason">
                Why do you want to join? *
              </label>
              <textarea
                id="af-reason"
                name="reason"
                style={themeStyles.textarea}
                className="af-input"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Tell us your passion for Ayurveda and how you plan to promote ASudha Beauty..."
                required
                aria-required="true"
                aria-invalid={fieldErrors.reason ? "true" : "false"}
                aria-describedby={
                  fieldErrors.reason ? "af-reason-error" : undefined
                }
              />
              {fieldErrors.reason && (
                <div
                  id="af-reason-error"
                  style={themeStyles.fieldError}
                  role="alert"
                >
                  <FaTimesCircle aria-hidden="true" /> {fieldErrors.reason}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={themeStyles.submitButton}
              className="af-submit-btn"
            >
              <FaPenNib aria-hidden="true" /> Submit Application
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
                successfully! We&apos;ll contact you within 48 hours.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Contact */}
      <section style={themeStyles.section} aria-labelledby="contact-title">
        <div style={themeStyles.contactSection}>
          <div style={themeStyles.contactAccentBar} aria-hidden="true" />
          <div style={themeStyles.contactIconWrap} aria-hidden="true">
            <FaHandshake />
          </div>
          <h2 id="contact-title" style={themeStyles.contactTitle}>
            Questions About the Program?
          </h2>
          <p style={themeStyles.contactText}>
            Our affiliate team is here to help! Reach out anytime.
          </p>
          <div style={themeStyles.contactButtons}>
            <a
              href="mailto:asudhabeauty@gmail.com"
              style={themeStyles.ctaButton}
              className="af-cta-primary"
            >
              <FaEnvelope aria-hidden="true" /> asudhabeauty@gmail.com
            </a>
            <a
              href="https://wa.me/917518217726"
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.secondaryButton}
              className="af-cta-secondary"
            >
              <FaWhatsapp aria-hidden="true" /> WhatsApp
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
                  className="af-related-link"
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
            <FaShieldAlt aria-hidden="true" /> Compliance &amp; Legal Framework
          </h2>
          <ul style={themeStyles.citationList}>
            {TRUSTED_SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={themeStyles.citationLink}
                  className="af-citation-link"
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

export default AffiliateProgram;