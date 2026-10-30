// src/pages/SizeGuide.jsx
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";
import {
  FaLeaf,
  FaSpa,
  FaFlask,
  FaGem,
  FaInfoCircle,
  FaDownload,
  FaCheckCircle,
  FaMagic,
  FaBookOpen,
  FaExternalLinkAlt,
  FaArrowRight,
  FaShieldAlt,
  FaShoppingBag,
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
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

// ─── Tab config (module scope) ───
const TABS = [
  { id: "facepack", label: "Face Packs", icon: <FaFlask /> },
  { id: "haircare", label: "Hair Care", icon: <FaSpa /> },
  { id: "ingredients", label: "Key Ingredients", icon: <FaGem /> },
  { id: "howtouse", label: "How to Use", icon: <FaInfoCircle /> },
];

// ─── Size guide data (module scope) ───
const SIZEGUIDE_DATA = {
  facepack: {
    title: "Natural Face Pack Guide",
    description:
      "Unlock the secret to glowing skin with our 100% pure Ayurvedic face packs.",
    sizes: [
      {
        name: "Multani Mitti Powder",
        description:
          "Deep cleansing, removes excess oil & impurities. Makes your skin glow naturally.",
        skinType: "Oily/Combination",
        howToUse: "Mix 2 tbsp with rose water or milk. Apply for 10–15 mins.",
      },
      {
        name: "Ubtan Powder",
        description:
          "Traditional glow & radiance. Nourishes, cleanses, and revitalizes your natural glow.",
        skinType: "All Skin Types",
        howToUse:
          "Mix 2 tbsp with curd or honey. Gently scrub while washing off.",
      },
    ],
    tips: [
      "Always do a patch test on your inner arm before applying any new powder.",
      "Use rose water or milk instead of water for extra hydration.",
      "Apply evenly and let it dry for 10–15 minutes, then rinse with lukewarm water.",
      "Use 2–3 times a week for best results.",
    ],
  },
  haircare: {
    title: "Herbal Hair Care Guide",
    description:
      "Strengthen your hair naturally with our chemical-free herbal powders.",
    sizes: [
      {
        name: "Amla Powder",
        description:
          "Rich in Vitamin C, strengthens roots, reduces hair fall, and adds natural shine.",
        hairType: "All Hair Types",
        howToUse: "Mix 2–3 tbsp with water or oil. Apply for 20–30 mins.",
      },
      {
        name: "Reetha Powder",
        description:
          "Natural cleanser, removes dirt without stripping oils. Gives soft, silky hair.",
        hairType: "All Hair Types",
        howToUse: "Soak overnight, blend into paste. Use as shampoo.",
      },
      {
        name: "Shikakai Powder",
        description:
          "Promotes hair growth, adds shine & softness. Strengthens from the roots.",
        hairType: "All Hair Types",
        howToUse: "Mix with water or curd. Massage gently for 5–10 mins.",
      },
      {
        name: "Herbal Mix Hair Pack",
        description:
          "A unique blend of Bhringraj, Amla, Shikakai, Hibiscus & Fenugreek for deep nourishment.",
        hairType: "All Hair Types",
        howToUse:
          "Mix 2–3 tbsp with water or aloe vera juice. Leave for 30–45 mins.",
      },
    ],
    tips: [
      "Mix herbal powders in a glass or plastic bowl, never metal.",
      "Leave the hair mask on for 30–45 minutes for deep conditioning.",
      "Apply to damp hair for better absorption.",
      "For best results, use Reetha + Shikakai + Amla together as a hair pack.",
    ],
  },
  ingredients: {
    title: "Key Ayurvedic Ingredients",
    description: "Know your ingredients and their superpowers.",
    ingredientsList: [
      {
        name: "Multani Mitti (Fuller's Earth)",
        benefits: "Oil control, deep cleansing, removes blackheads",
      },
      {
        name: "Ubtan Blend",
        benefits:
          "Turmeric, Sandalwood, & Gram Flour for brightening and glow",
      },
      {
        name: "Amla (Indian Gooseberry)",
        benefits: "Vitamin C, hair growth, anti-aging",
      },
      {
        name: "Reetha (Soapnut)",
        benefits: "Natural soap, dandruff control, shine",
      },
      {
        name: "Shikakai (Acacia concinna)",
        benefits: "Detangles, boosts hair volume, scalp health",
      },
      {
        name: "Herbal Mix",
        benefits: "Bhringraj, Hibiscus, Fenugreek for deep hair nourishment",
      },
    ],
    tips: [
      "Our products are 100% pure and contain no synthetic chemicals.",
      "Store in an airtight container away from direct sunlight.",
      "Check the 'How to Use' label on the back of each pack for exact proportions.",
      "Always consult a dermatologist if you have severe skin issues.",
    ],
  },
  howtouse: {
    title: "General Usage Instructions",
    description:
      "Follow these simple steps to get the maximum benefit from your ASudha Beauty powders.",
    steps: [
      {
        step: "01",
        title: "Cleanse",
        description:
          "Always start with a clean face or hair to allow the powders to penetrate effectively.",
      },
      {
        step: "02",
        title: "Mix",
        description:
          "Mix the powder with rose water, milk, curd, or plain water as per the product label.",
      },
      {
        step: "03",
        title: "Apply",
        description:
          "Apply evenly using a brush or your fingers. Avoid the eye and lip area.",
      },
      {
        step: "04",
        title: "Rinse",
        description:
          "Let it dry for 10–30 minutes (depending on the product), then rinse with lukewarm water.",
      },
    ],
    tips: [
      "Always follow up with a moisturizer or hair oil to lock in hydration.",
      "Do not use metal bowls to mix your powders.",
      "Use 1–2 times a week for the best natural results.",
      "Our products are gentle but always consult a doctor if you have allergies.",
    ],
  },
};

// ─── Internal blog backlinks ───
const RELATED_BLOGS = [
  {
    to: "/blog/1",
    label: "Complete Multani Mitti benefits guide",
    icon: <FaLeaf />,
  },
  {
    to: "/blog/2",
    label: "Ubtan for glowing skin — the Ayurvedic ritual",
    icon: <FaSpa />,
  },
  {
    to: "/blog/3",
    label: "Amla-Reetha-Shikakai hair care science",
    icon: <FaLeaf />,
  },
  {
    to: "/blog/6",
    label: "Herbal face packs for every skin type",
    icon: <FaFlask />,
  },
  {
    to: "/blog/7",
    label: "The science behind Ayurvedic herbs",
    icon: <FaFlask />,
  },
  {
    to: "/shop",
    label: "Shop the full Ayurvedic collection",
    icon: <FaShoppingBag />,
  },
];

// ─── Authoritative external citations (E-E-A-T) ───
const TRUSTED_SOURCES = [
  {
    label:
      "MDPI Cosmetics 2025 — Multi-Target Anti-Aging Mechanisms of Multani Mitti",
    href: "https://www.mdpi.com/2079-9284/12/3/124",
    domain: "mdpi.com",
  },
  {
    label: "PubMed — Multani Mitti (Fuller's Earth) skin research",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=multani+mitti+fuller%27s+earth+skin",
    domain: "pubmed.ncbi.nlm.nih.gov",
  },
  {
    label: "NIH NCCIH — Ayurvedic Medicine: In Depth",
    href: "https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth",
    domain: "nccih.nih.gov",
  },
  {
    label: "Ministry of AYUSH — Government of India",
    href: "https://ayush.gov.in/",
    domain: "ayush.gov.in",
  },
];

// ─── FAQ for schema ───
const SIZEGUIDE_FAQS = [
  {
    q: "How do I use Multani Mitti powder for oily skin?",
    a: "Mix 2 tablespoons of Multani Mitti with rose water or plain water to form a smooth paste. Apply evenly on your face and neck, leave for 10–15 minutes until dry, and rinse with lukewarm water. Use 2–3 times per week for best results.",
  },
  {
    q: "Can I use Ubtan powder every day?",
    a: "Ubtan is gentle enough to use 2–3 times per week. Daily use may over-exfoliate sensitive skin, so we recommend starting twice a week and adjusting to your skin's response.",
  },
  {
    q: "What is the correct way to use Amla, Reetha, and Shikakai powder together?",
    a: "Mix equal parts Amla, Reetha, and Shikakai powder with water to form a paste. Apply to damp hair, massage into the scalp, leave for 20–30 minutes, and rinse thoroughly. Use as a natural shampoo alternative 1–2 times per week.",
  },
  {
    q: "Should I use a metal bowl to mix herbal powders?",
    a: "No. Always use a glass, ceramic, or wooden bowl — metal can react with the active compounds in Ayurvedic herbs and reduce their effectiveness.",
  },
  {
    q: "Are ASudha Beauty powders safe for sensitive skin?",
    a: "Yes — all powders are 100% natural and chemical-free. However, we recommend a patch test on your inner arm 24 hours before first use, especially if you have sensitive skin or known allergies.",
  },
];

// ─── How-to steps for HowTo schema ───
const HOWTO_STEPS = [
  {
    name: "Cleanse",
    text: "Always start with a clean face or hair to allow the powders to penetrate effectively.",
  },
  {
    name: "Mix",
    text: "Mix the powder with rose water, milk, curd, or plain water as per the product label.",
  },
  {
    name: "Apply",
    text: "Apply evenly using a brush or your fingers. Avoid the eye and lip area.",
  },
  {
    name: "Rinse",
    text: "Let it dry for 10–30 minutes (depending on the product), then rinse with lukewarm water.",
  },
];

const SizeGuide = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [activeTab, setActiveTab] = useState("facepack");
  const tabRefs = useRef([]);

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
  const useCardLayout = windowWidth <= 720;

  const currentData = SIZEGUIDE_DATA[activeTab];

  // ─── JSON-LD: HowTo + FAQPage + BreadcrumbList + WebPage ───
  const sizeGuideJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HowTo",
          "@id": `${SITE_URL}/size-guide#howto`,
          name: "How to Use ASudha Beauty Ayurvedic Powders",
          description:
            "Step-by-step guide to using ASudha Beauty's 100% natural Ayurvedic powders — Multani Mitti, Ubtan, Amla, Reetha, Shikakai — for glowing skin and healthy hair.",
          image: `${SITE_URL}/assets/images/og-size-guide.png`,
          totalTime: "PT30M",
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: "INR",
            value: "0",
          },
          supply: [
            { "@type": "HowToSupply", name: "ASudha Ayurvedic powder" },
            { "@type": "HowToSupply", name: "Rose water or milk" },
            { "@type": "HowToSupply", name: "Glass mixing bowl" },
          ],
          tool: [
            { "@type": "HowToTool", name: "Face brush (optional)" },
          ],
          step: HOWTO_STEPS.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
            url: `${SITE_URL}/size-guide#panel-howtouse`,
          })),
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/size-guide#faq`,
          mainEntity: SIZEGUIDE_FAQS.map((faq) => ({
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
          "@id": `${SITE_URL}/size-guide#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Ayurvedic Usage Guide",
              item: `${SITE_URL}/size-guide`,
            },
          ],
        },
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/size-guide#webpage`,
          url: `${SITE_URL}/size-guide`,
          name: "Ayurvedic Usage Guide | ASudha Beauty",
          description:
            "Learn how to use ASudha Beauty's 100% natural Ayurvedic face packs and hair care powders. Detailed ingredient, usage, and pro-tip guide.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: {
            "@type": "Thing",
            name: "How to use Ayurvedic skincare and hair care powders — Multani Mitti, Ubtan, Amla, Reetha, Shikakai",
          },
          breadcrumb: { "@id": `${SITE_URL}/size-guide#breadcrumb` },
        },
      ],
    }),
    []
  );

  const breadcrumb = useMemo(
    () => [
      { name: "Home", url: "/" },
      { name: "Ayurvedic Usage Guide", url: "/size-guide" },
    ],
    []
  );

  const citations = useMemo(
    () =>
      TRUSTED_SOURCES.map((s) => ({ label: s.label, href: s.href })),
    []
  );

  // ─── Download handler ───
  const handleDownload = () => {
    const rows = (currentData.sizes || currentData.ingredientsList || [])
      .map((item) => {
        const title = item.name;
        const detail = item.description || item.benefits || "";
        const meta = item.skinType || item.hairType || "";
        const usage = item.howToUse || "";
        return `
          <div class="item">
            <h3>${title}</h3>
            <p>${detail}</p>
            ${meta ? `<p><strong>Type:</strong> ${meta}</p>` : ""}
            ${usage ? `<p><strong>How to Use:</strong> ${usage}</p>` : ""}
          </div>`;
      })
      .join("");

    const tipsHtml = currentData.tips.map((t) => `<li>${t}</li>`).join("");

    const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8" />
<title>${currentData.title} — ASudha Beauty</title>
<style>
  body { font-family: Georgia, serif; max-width: 720px; margin: 40px auto; padding: 24px; color: #3e2723; }
  h1 { color: #f5346b; border-bottom: 2px solid #f7d794; padding-bottom: 8px; }
  h3 { color: #c77d42; margin-top: 24px; }
  p { line-height: 1.6; }
  .item { background: #fcf8f5; border-left: 4px solid #f5346b; padding: 12px 16px; margin: 16px 0; border-radius: 6px; }
  ul { background: #f9f4f0; padding: 16px 32px; border-radius: 6px; }
  li { margin-bottom: 8px; }
  footer { margin-top: 40px; font-size: 0.85em; color: #6d4c41; border-top: 1px solid #ddd; padding-top: 12px; }
</style>
</head>
<body>
  <h1>${currentData.title}</h1>
  <p>${currentData.description}</p>
  ${rows}
  <h2>Pro Tips</h2>
  <ul>${tipsHtml}</ul>
  <footer>ASudha Beauty • Pure. Natural. You. • asudhabeauty@gmail.com</footer>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ASudha-Beauty-${activeTab}-guide.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ─── Keyboard navigation for tabs ───
  const handleTabKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % TABS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = TABS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  // ─── Injected CSS — only depends on isDarkMode ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-sizeguide-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-sizeguide-styles", "true");
    style.textContent = `
      @keyframes sgFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes sgFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes sgFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }

      .sg-orb-1 { animation: sgFloat1 16s ease-in-out infinite; }
      .sg-orb-2 { animation: sgFloat2 20s ease-in-out infinite; }
      .sg-orb-3 { animation: sgFloat3 18s ease-in-out infinite; }

      .sg-tab {
        transition: transform 0.3s ease, box-shadow 0.3s ease,
                    border-color 0.3s ease, color 0.3s ease,
                    background 0.3s ease;
      }
      .sg-tab:hover {
        transform: translateY(-3px);
        box-shadow: ${
          isDarkMode
            ? "0 22px 48px rgba(0, 0, 0, 0.7)"
            : "0 22px 48px rgba(62, 39, 35, 0.12)"
        };
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.3)"
        };
        color: ${isDarkMode ? brandColors.gold : brandColors.primary};
      }
      .sg-tab:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: 2px;
      }

      .sg-download-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .sg-download-btn:hover,
      .sg-download-btn:focus-visible {
        transform: translateY(-3px);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
        gap: 0.75rem;
        outline: none;
      }

      .sg-ingredient-card,
      .sg-step-card,
      .sg-product-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .sg-ingredient-card:hover,
      .sg-step-card:hover,
      .sg-product-card:hover {
        transform: translateY(-5px);
        box-shadow: ${
          isDarkMode
            ? "0 22px 48px rgba(0, 0, 0, 0.7)"
            : "0 22px 48px rgba(62, 39, 35, 0.12)"
        };
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.35)"
            : "rgba(199, 125, 66, 0.28)"
        } !important;
      }
      .sg-ingredient-card:hover .sg-ingredient-icon {
        transform: scale(1.1) rotate(-8deg);
      }
      .sg-ingredient-icon {
        transition: transform 0.35s ease;
      }

      .sg-tip-row {
        transition: transform 0.25s ease;
      }
      .sg-tip-row:hover {
        transform: translateX(3px);
      }

      /* Related / citation links */
      .sg-related-link {
        transition: color 0.25s ease, gap 0.25s ease;
      }
      .sg-related-link:hover,
      .sg-related-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        gap: 0.6rem;
        outline: none;
      }
      .sg-citation-link:hover,
      .sg-citation-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        outline: none;
      }
      .sg-breadcrumb-link:hover {
        text-decoration: underline;
      }

      @media (prefers-reduced-motion: reduce) {
        .sg-orb-1, .sg-orb-2, .sg-orb-3 { animation: none !important; }
        .sg-tab, .sg-download-btn, .sg-ingredient-card,
        .sg-step-card, .sg-product-card, .sg-tip-row,
        .sg-related-link, .sg-citation-link {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-sizeguide-styles="true"]')
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

    // ─── Tabs ───
    tabsContainer: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexWrap: "wrap",
      gap: "0.6rem",
      justifyContent: "center",
      marginBottom: "2rem",
      maxWidth: "1100px",
      margin: "0 auto 2rem",
      padding: isMobile ? "0 1rem" : isNarrow ? "0 1.5rem" : "0 2rem",
      boxSizing: "border-box",
    },
    tab: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.6rem 1.05rem" : "0.75rem 1.45rem",
      borderRadius: "50px",
      backgroundColor: T.card,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: `1.5px solid ${T.border}`,
      color: T.textMuted,
      cursor: "pointer",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      fontWeight: "700",
      fontFamily: "inherit",
      whiteSpace: "nowrap",
      boxShadow: T.shadow,
    },
    activeTab: {
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "1.5px solid transparent",
      boxShadow: "0 12px 28px rgba(245, 52, 107, 0.35)",
    },

    // ─── Content ───
    content: {
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
    card: {
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "24px",
      padding: isMobile ? "1.75rem 1.35rem" : "2.5rem 2.25rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      marginBottom: "2rem",
      boxSizing: "border-box",
      width: "100%",
      position: "relative",
      overflow: "hidden",
      outline: "none",
    },
    cardAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    sectionTitleRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "0.85rem",
    },
    sectionTitleIcon: {
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
    sectionTitle: {
      fontSize: isMobile ? "1.2rem" : "1.45rem",
      fontWeight: "900",
      margin: 0,
      color: T.text,
      letterSpacing: "-0.3px",
      lineHeight: "1.3",
    },
    description: {
      fontSize: isMobile ? "0.92rem" : "1rem",
      color: T.textMuted,
      marginBottom: "1.85rem",
      lineHeight: "1.7",
      paddingLeft: isMobile ? 0 : "calc(44px + 0.75rem)",
    },

    // ─── Table ───
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
      marginBottom: "2rem",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      tableLayout: "auto",
      borderRadius: "14px",
      overflow: "hidden",
      border: `1px solid ${T.border}`,
    },
    th: {
      textAlign: "left",
      padding: isMobile ? "0.85rem 0.75rem" : "1.1rem 1.15rem",
      fontWeight: "900",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.08)"
        : "rgba(212, 175, 55, 0.07)",
      color: isDarkMode ? T.gold : brandColors.bronze,
      borderBottom: `1px solid ${T.divider}`,
      fontSize: isMobile ? "0.72rem" : "0.82rem",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
    },
    td: {
      padding: isMobile ? "0.9rem 0.75rem" : "1.1rem 1.15rem",
      borderBottom: `1px solid ${T.borderSoft}`,
      color: T.textMuted,
      lineHeight: "1.6",
      verticalAlign: "top",
    },
    tdStrong: {
      color: T.text,
      fontWeight: "800",
      display: "block",
      marginBottom: "0.2rem",
      letterSpacing: "-0.1px",
    },

    // ─── Mobile product cards ───
    productCardMobile: {
      backgroundColor: T.cardAlt,
      border: `1px solid ${T.border}`,
      borderLeft: `4px solid ${brandColors.primary}`,
      borderRadius: "16px",
      padding: "1.35rem 1.25rem",
      marginBottom: "0.95rem",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    productCardMobileName: {
      fontSize: "1rem",
      fontWeight: "900",
      color: T.text,
      marginBottom: "0.6rem",
      letterSpacing: "-0.2px",
    },
    productCardMobileDesc: {
      fontSize: "0.88rem",
      color: T.textMuted,
      lineHeight: "1.65",
      marginBottom: "0.7rem",
    },
    productCardMobileMeta: {
      fontSize: "0.82rem",
      color: T.textMuted,
      lineHeight: "1.6",
      marginBottom: "0.35rem",
    },
    productCardMobileMetaLabel: {
      color: isDarkMode ? T.gold : brandColors.bronze,
      fontWeight: "800",
    },

    // ─── Tips ───
    tipsSection: {
      background: isDarkMode
        ? "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.05))"
        : "linear-gradient(135deg, rgba(76, 175, 80, 0.08), rgba(139, 195, 74, 0.04))",
      borderRadius: "18px",
      padding: isMobile ? "1.5rem 1.25rem" : "1.85rem 1.75rem",
      marginTop: "2rem",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.25)" : "rgba(76, 175, 80, 0.2)"
      }`,
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    tipsAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      width: "4px",
      background: brandColors.green,
      opacity: 0.9,
    },
    tipsTitle: {
      fontSize: isMobile ? "1rem" : "1.15rem",
      fontWeight: "900",
      marginBottom: "1.15rem",
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      color: brandColors.green,
      letterSpacing: "-0.2px",
    },
    tipItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
      marginBottom: "0.85rem",
      fontSize: isMobile ? "0.86rem" : "0.92rem",
      color: T.textMuted,
      lineHeight: "1.65",
    },
    tipIcon: {
      color: brandColors.green,
      marginTop: "0.35rem",
      fontSize: "0.8rem",
      flexShrink: 0,
    },

    // ─── Ingredients grid ───
    ingredientsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "1.15rem",
    },
    ingredientCard: {
      backgroundColor: T.cardAlt,
      padding: isMobile ? "1.35rem" : "1.6rem 1.5rem",
      borderRadius: "18px",
      border: `1px solid ${T.border}`,
      height: "100%",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    ingredientCardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.85,
    },
    ingredientIconWrap: {
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      background: `linear-gradient(135deg, ${brandColors.green}, #8bc34a)`,
      color: "#ffffff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.05rem",
      boxShadow: "0 8px 20px rgba(76, 175, 80, 0.3)",
      flexShrink: 0,
    },
    ingredientName: {
      fontSize: "1.05rem",
      fontWeight: "900",
      color: T.text,
      marginBottom: "0.4rem",
      letterSpacing: "-0.2px",
      lineHeight: "1.35",
    },
    ingredientBenefits: {
      fontSize: "0.9rem",
      lineHeight: "1.65",
      color: T.textMuted,
      margin: 0,
    },

    // ─── Steps grid ───
    stepsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1.25rem",
    },
    stepCard: {
      backgroundColor: T.cardAlt,
      padding: isMobile ? "1.6rem 1.35rem" : "1.9rem 1.65rem",
      borderRadius: "18px",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      height: "100%",
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
      fontSize: "2.25rem",
      fontWeight: "900",
      color: isDarkMode ? T.gold : brandColors.primary,
      marginBottom: "0.65rem",
      lineHeight: 1,
      letterSpacing: "-0.5px",
    },
    stepTitle: {
      fontSize: "1.05rem",
      fontWeight: "900",
      marginBottom: "0.6rem",
      color: T.text,
      letterSpacing: "-0.2px",
    },
    stepDescription: {
      fontSize: "0.9rem",
      lineHeight: "1.65",
      color: T.textMuted,
      margin: 0,
    },

    // ─── Download ───
    downloadWrapper: {
      textAlign: "center",
      marginTop: "2rem",
    },
    downloadButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6rem",
      padding: isMobile ? "0.95rem 1.75rem" : "1.05rem 2.25rem",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      fontWeight: "800",
      fontSize: isMobile ? "0.92rem" : "1rem",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      fontFamily: "inherit",
      letterSpacing: "0.3px",
      maxWidth: "100%",
      boxSizing: "border-box",
    },

    // ─── Related Reading (internal backlinks) ───
    relatedSection: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1100px",
      margin: "0 auto",
      padding: isMobile ? "0 1rem 3rem" : "0 2rem 4rem",
      boxSizing: "border-box",
      width: "100%",
    },
    relatedCard: {
      backgroundColor: T.card,
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      padding: isMobile ? "1.5rem" : "2rem",
      marginBottom: "1.5rem",
    },
    relatedTitle: {
      fontSize: "1.1rem",
      fontWeight: "800",
      color: T.text,
      marginBottom: "1.25rem",
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
      position: "relative",
      zIndex: 1,
      maxWidth: "1100px",
      margin: "0 auto 3rem",
      padding: isMobile ? "1.5rem 1rem" : "1.75rem 2rem",
      boxSizing: "border-box",
      width: "100%",
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
      {/* ─── SEO: meta + JSON-LD + breadcrumb + citations ─── */}
      <SEO
        title="Ayurvedic Usage Guide — How to Use Multani Mitti, Ubtan, Amla | ASudha"
        description="Learn how to use ASudha Beauty's 100% natural Ayurvedic face packs and hair care powders. Detailed ingredient, usage, and pro-tip guide for Multani Mitti, Ubtan, Amla, Reetha, and Shikakai."
        keywords="how to use multani mitti, how to use ubtan powder, how to use amla reetha shikakai, ayurvedic skincare guide, natural face pack usage, herbal hair care routine, ayurvedic usage guide, multani mitti face pack instructions"
        url="/size-guide"
        breadcrumb={breadcrumb}
        citations={citations}
      />

      {/* Extra JSON-LD graph: HowTo + FAQPage + BreadcrumbList + WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sizeGuideJsonLd) }}
      />

      {/* Animated background */}
      <div style={themeStyles.bgLayer} aria-hidden="true">
        <div style={themeStyles.bgGradient} />
        <div style={themeStyles.bgGrid} />
        <div className="sg-orb-1" style={themeStyles.bgOrb1} />
        <div className="sg-orb-2" style={themeStyles.bgOrb2} />
        <div className="sg-orb-3" style={themeStyles.bgOrb3} />
      </div>

      {/* Header */}
      <header style={themeStyles.header}>
        <h1 style={themeStyles.title}>
          Ayurvedic Usage Guide
          <span style={themeStyles.titleAccent} aria-hidden="true" />
        </h1>
        <p style={themeStyles.subtitle}>
          Understand the perfect way to use our 100% natural, herbal powders
          for skin and hair.
        </p>
      </header>

      {/* Tabs */}
      <div
        style={themeStyles.tabsContainer}
        role="tablist"
        aria-label="Usage guide sections"
        aria-orientation="horizontal"
      >
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[index] = el)}
              type="button"
              style={{
                ...themeStyles.tab,
                ...(isActive ? themeStyles.activeTab : {}),
              }}
              className="sg-tab"
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
            >
              <span aria-hidden="true">{tab.icon}</span> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <main
        style={themeStyles.content}
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
      >
        <div style={themeStyles.card}>
          <div style={themeStyles.cardAccentBar} aria-hidden="true" />
          <div style={themeStyles.sectionTitleRow}>
            <span style={themeStyles.sectionTitleIcon} aria-hidden="true">
              <FaCheckCircle />
            </span>
            <h2 style={themeStyles.sectionTitle}>{currentData.title}</h2>
          </div>
          <p style={themeStyles.description}>{currentData.description}</p>

          {/* Product data — table on desktop, cards on mobile */}
          {(activeTab === "facepack" || activeTab === "haircare") && (
            <>
              {!useCardLayout ? (
                <table style={themeStyles.table}>
                  <thead>
                    <tr>
                      <th style={themeStyles.th}>Product</th>
                      <th style={themeStyles.th}>Benefits</th>
                      <th style={themeStyles.th}>Type</th>
                      <th style={themeStyles.th}>How to Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.sizes.map((item) => (
                      <tr key={item.name}>
                        <td style={themeStyles.td}>
                          <strong style={themeStyles.tdStrong}>
                            {item.name}
                          </strong>
                        </td>
                        <td style={themeStyles.td}>{item.description}</td>
                        <td style={themeStyles.td}>
                          {item.skinType || item.hairType}
                        </td>
                        <td style={themeStyles.td}>{item.howToUse}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ marginBottom: "2rem" }}>
                  {currentData.sizes.map((item) => (
                    <div
                      key={item.name}
                      style={themeStyles.productCardMobile}
                      className="sg-product-card"
                    >
                      <div style={themeStyles.productCardMobileName}>
                        {item.name}
                      </div>
                      <div style={themeStyles.productCardMobileDesc}>
                        {item.description}
                      </div>
                      <div style={themeStyles.productCardMobileMeta}>
                        <span style={themeStyles.productCardMobileMetaLabel}>
                          Type:{" "}
                        </span>
                        {item.skinType || item.hairType}
                      </div>
                      <div style={themeStyles.productCardMobileMeta}>
                        <span style={themeStyles.productCardMobileMetaLabel}>
                          How to Use:{" "}
                        </span>
                        {item.howToUse}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Ingredients */}
          {activeTab === "ingredients" && (
            <div style={themeStyles.ingredientsGrid}>
              {currentData.ingredientsList.map((item) => (
                <div
                  key={item.name}
                  style={themeStyles.ingredientCard}
                  className="sg-ingredient-card"
                >
                  <div
                    style={themeStyles.ingredientCardAccent}
                    aria-hidden="true"
                  />
                  <div
                    style={themeStyles.ingredientIconWrap}
                    className="sg-ingredient-icon"
                    aria-hidden="true"
                  >
                    <FaMagic />
                  </div>
                  <div>
                    <h3 style={themeStyles.ingredientName}>{item.name}</h3>
                    <p style={themeStyles.ingredientBenefits}>
                      {item.benefits}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* How to Use steps */}
          {activeTab === "howtouse" && (
            <div style={themeStyles.stepsGrid}>
              {currentData.steps.map((item) => (
                <div
                  key={item.step}
                  style={themeStyles.stepCard}
                  className="sg-step-card"
                >
                  <div
                    style={themeStyles.stepCardAccent}
                    aria-hidden="true"
                  />
                  <div style={themeStyles.stepNumber}>{item.step}</div>
                  <h3 style={themeStyles.stepTitle}>{item.title}</h3>
                  <p style={themeStyles.stepDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tips */}
          <div style={themeStyles.tipsSection}>
            <div style={themeStyles.tipsAccent} aria-hidden="true" />
            <h3 style={themeStyles.tipsTitle}>
              <FaLeaf aria-hidden="true" /> Pro Tips for Best Results
            </h3>
            {currentData.tips.map((tip) => (
              <div
                key={tip}
                style={themeStyles.tipItem}
                className="sg-tip-row"
              >
                <FaLeaf
                  aria-hidden="true"
                  style={themeStyles.tipIcon}
                />
                <span>{tip}</span>
              </div>
            ))}
          </div>

          {/* Download */}
          <div style={themeStyles.downloadWrapper}>
            <button
              type="button"
              style={themeStyles.downloadButton}
              className="sg-download-btn"
              onClick={handleDownload}
              aria-label="Download this guide as an HTML file"
            >
              <FaDownload aria-hidden="true" /> Download Guide
            </button>
          </div>
        </div>
      </main>

      {/* ─── Related Reading (internal backlinks) ─── */}
      <section
        style={themeStyles.relatedSection}
        aria-labelledby="size-guide-related-title"
      >
        <div style={themeStyles.relatedCard}>
          <h2
            id="size-guide-related-title"
            style={themeStyles.relatedTitle}
          >
            <FaBookOpen aria-hidden="true" /> Related Reading
          </h2>
          <ul style={themeStyles.relatedList}>
            {RELATED_BLOGS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={themeStyles.relatedLink}
                  className="sg-related-link"
                  aria-label={`Read: ${link.label}`}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <span style={themeStyles.relatedIcon} aria-hidden="true">
                      {link.icon}
                    </span>
                    {link.label}
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

      {/* ─── Sources & References (external hyperlinks / E-E-A-T) ─── */}
      <section
        style={themeStyles.citationSection}
        aria-labelledby="size-guide-sources-title"
      >
        <div style={themeStyles.citationCard}>
          <h2
            id="size-guide-sources-title"
            style={themeStyles.citationTitle}
          >
            <FaShieldAlt aria-hidden="true" /> Sources &amp; Further Reading
          </h2>
          <ul style={themeStyles.citationList}>
            {TRUSTED_SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={themeStyles.citationLink}
                  className="sg-citation-link"
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

export default SizeGuide;