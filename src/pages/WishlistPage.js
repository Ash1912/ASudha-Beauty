// src/pages/WishlistPage.jsx
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import {
  FaHeart,
  FaLeaf,
  FaSpa,
  FaRegHeart,
  FaArrowRight,
  FaShoppingBag,
  FaBookOpen,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaFlask,
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

// ─── Related blog guides (internal backlinks) ───
const RELATED_GUIDES = [
  {
    to: "/blog/1",
    label: "Multani Mitti benefits for oily skin",
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
    to: "/shop",
    label: "Browse the full Ayurvedic collection",
    icon: <FaShoppingBag />,
  },
];

// ─── Authoritative external hyperlinks (E-E-A-T) ───
const TRUSTED_SOURCES = [
  {
    label: "NIH NCCIH — Ayurvedic Medicine: In Depth",
    href: "https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth",
    domain: "nccih.nih.gov",
  },
  {
    label: "PubMed — Multani Mitti (Fuller's Earth) skin research",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=multani+mitti+fuller%27s+earth+skin",
    domain: "pubmed.ncbi.nlm.nih.gov",
  },
  {
    label: "Ministry of AYUSH — Government of India",
    href: "https://ayush.gov.in/",
    domain: "ayush.gov.in",
  },
];

const WishlistPage = () => {
  const { isDarkMode } = useTheme();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

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

  // ─── Add to cart (keep item in wishlist) ───
  const handleAddToCart = (product) => {
    addToCart(
      product,
      Array.isArray(product.shades) && product.shades.length > 0
        ? product.shades[0]
        : "",
      1
    );
  };

  // ─── Derived wishlist data ───
  const naturalCount = wishlistItems.filter(
    (p) => p.category === "Skincare" || p.category === "Hair Care"
  ).length;

  const wishlistNames = wishlistItems.map((p) => p.name);

  // ─── JSON-LD: WebPage + BreadcrumbList + ItemList of wishlist items ───
  const wishlistJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/wishlist#webpage`,
          url: `${SITE_URL}/wishlist`,
          name: "My Wishlist | ASudha Beauty",
          description:
            "Your saved natural skincare and hair care favorites at ASudha Beauty. Save Ayurvedic products for later.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: "en-IN",
          breadcrumb: { "@id": `${SITE_URL}/wishlist#breadcrumb` },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${SITE_URL}/assets/images/og-default.png`,
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL}/wishlist#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "My Wishlist",
              item: `${SITE_URL}/wishlist`,
            },
          ],
        },
        ...(wishlistItems.length > 0
          ? [
              {
                "@type": "ItemList",
                "@id": `${SITE_URL}/wishlist#items`,
                name: "Saved Ayurvedic products",
                numberOfItems: wishlistItems.length,
                itemListElement: wishlistItems.map((p, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  item: {
                    "@type": "Product",
                    name: p.name,
                    image: `${SITE_URL}${p.image}`,
                    url: `${SITE_URL}/product/${p.id}`,
                    category: p.category,
                    ...(p.price > 0 && {
                      offers: {
                        "@type": "Offer",
                        price: String(p.price),
                        priceCurrency: "INR",
                        availability:
                          p.inStock !== false
                            ? "https://schema.org/InStock"
                            : "https://schema.org/OutOfStock",
                        url: `${SITE_URL}/product/${p.id}`,
                      },
                    }),
                  },
                })),
              },
            ]
          : []),
      ],
    }),
    [wishlistItems]
  );

  const breadcrumb = useMemo(
    () => [
      { name: "Home", url: "/" },
      { name: "My Wishlist", url: "/wishlist" },
    ],
    []
  );

  const citations = useMemo(
    () => TRUSTED_SOURCES.map((s) => ({ label: s.label, href: s.href })),
    []
  );

  // ─── Injected CSS — only depends on isDarkMode ───
  // T.shadowLift and T.border are inlined as isDarkMode ternaries to satisfy
  // react-hooks/exhaustive-deps without eslint-disable comments.
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-wishlist-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-wishlist-styles", "true");
    style.textContent = `
      @keyframes wlFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes wlFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes wlFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }
      @keyframes wlHeartBeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }

      .wl-orb-1 { animation: wlFloat1 16s ease-in-out infinite; }
      .wl-orb-2 { animation: wlFloat2 20s ease-in-out infinite; }
      .wl-orb-3 { animation: wlFloat3 18s ease-in-out infinite; }

      .wl-heart-pulse {
        animation: wlHeartBeat 2.4s ease-in-out infinite;
      }

      .wl-cta-primary {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .wl-cta-primary:hover,
      .wl-cta-primary:focus-visible {
        transform: translateY(-3px);
        box-shadow: 0 16px 40px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
        outline: none;
      }

      .wl-cta-secondary {
        transition: transform 0.3s ease, border-color 0.3s ease,
                    color 0.3s ease;
      }
      .wl-cta-secondary:hover,
      .wl-cta-secondary:focus-visible {
        border-color: ${brandColors.primary} !important;
        color: ${brandColors.primary} !important;
        transform: translateY(-3px);
        outline: none;
      }

      .wl-chip {
        transition: transform 0.25s ease, box-shadow 0.25s ease,
                    border-color 0.25s ease;
      }
      .wl-chip:hover {
        transform: translateY(-2px);
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.35)"
            : "rgba(199, 125, 66, 0.28)"
        } !important;
        box-shadow: 0 8px 20px rgba(245, 52, 107, 0.15);
      }

      .wl-cta-card {
        transition: transform 0.35s ease, box-shadow 0.35s ease,
                    border-color 0.3s ease;
      }
      .wl-cta-card:hover {
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

      /* Related / citation links */
      .wl-related-link {
        transition: color 0.25s ease, gap 0.25s ease;
      }
      .wl-related-link:hover,
      .wl-related-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        gap: 0.6rem;
        outline: none;
      }
      .wl-citation-link:hover,
      .wl-citation-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        outline: none;
      }
      .wl-breadcrumb-link:hover {
        text-decoration: underline;
      }

      @media (prefers-reduced-motion: reduce) {
        .wl-orb-1, .wl-orb-2, .wl-orb-3, .wl-heart-pulse {
          animation: none !important;
        }
        .wl-cta-primary, .wl-cta-secondary, .wl-chip, .wl-cta-card,
        .wl-related-link, .wl-citation-link {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-wishlist-styles="true"]')
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
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      fontSize: "0.78rem",
      color: T.textDim,
      marginBottom: "1.5rem",
      flexWrap: "wrap",
      fontWeight: "600",
    },
    breadcrumbLink: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "none",
      fontWeight: "700",
    },

    content: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile
        ? "1.5rem 1rem 3rem"
        : isNarrow
        ? "2rem 1.25rem 4rem"
        : "2.5rem 1.5rem 5rem",
      width: "100%",
      boxSizing: "border-box",
    },

    // ─── Header ───
    title: {
      fontSize: isMobile ? "1.75rem" : isNarrow ? "2.1rem" : "2.6rem",
      fontWeight: "900",
      marginBottom: "0.85rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      lineHeight: "1.15",
      letterSpacing: "-0.5px",
      flexWrap: "wrap",
    },
    titleIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      fontSize: "0.85em",
    },
    subtitle: {
      fontSize: isMobile ? "0.92rem" : "1rem",
      color: T.textMuted,
      marginBottom: "2rem",
      display: "flex",
      alignItems: "center",
      gap: "0.85rem",
      flexWrap: "wrap",
      fontWeight: "600",
    },
    naturalBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1.15rem",
      background: `linear-gradient(135deg, ${brandColors.green}, #8bc34a)`,
      color: "#ffffff",
      borderRadius: "50px",
      fontSize: "0.82rem",
      fontWeight: "800",
      boxShadow: "0 10px 24px rgba(76,175,80,0.35)",
      letterSpacing: "0.2px",
    },

    // ─── Empty state ───
    emptyWishlist: {
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      padding: isMobile ? "3rem 1.5rem" : "5rem 2.5rem",
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "26px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      maxWidth: "720px",
      margin: "2rem auto 0",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    emptyAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    emptyIconWrapper: {
      width: isMobile ? "88px" : "104px",
      height: isMobile ? "88px" : "104px",
      margin: "0 auto 1.75rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? "2.35rem" : "2.85rem",
      color: isDarkMode ? brandColors.black : "#ffffff",
      boxShadow: "0 20px 48px rgba(245,52,107,0.35)",
    },
    emptyTitle: {
      fontSize: isMobile ? "1.5rem" : "1.85rem",
      fontWeight: "900",
      marginBottom: "1rem",
      color: T.text,
      letterSpacing: "-0.4px",
    },
    emptyText: {
      color: T.textMuted,
      marginBottom: "2.25rem",
      maxWidth: "520px",
      margin: "0 auto 2.25rem",
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      lineHeight: "1.7",
    },
    emptyActions: {
      display: "flex",
      gap: "0.85rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    shopButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      padding: isMobile ? "0.9rem 1.75rem" : "1rem 2.25rem",
      border: "none",
      borderRadius: "50px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      fontWeight: "800",
      fontSize: isMobile ? "0.92rem" : "1rem",
      boxShadow: "0 12px 30px rgba(245,52,107,0.35)",
      cursor: "pointer",
      whiteSpace: "nowrap",
      letterSpacing: "0.2px",
    },
    browseButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      padding: isMobile ? "0.9rem 1.75rem" : "1rem 2.25rem",
      border: `2px solid ${T.border}`,
      borderRadius: "50px",
      background: "transparent",
      color: T.text,
      textDecoration: "none",
      fontWeight: "700",
      fontSize: isMobile ? "0.92rem" : "1rem",
      cursor: "pointer",
      whiteSpace: "nowrap",
    },

    // ─── Collection strip ───
    naturalCollection: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      flexWrap: "wrap",
      padding: isMobile ? "1.25rem" : "1.5rem 1.75rem",
      marginBottom: "2rem",
      backgroundColor: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      overflow: "hidden",
    },
    collectionAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.85,
    },
    collectionLabel: {
      fontWeight: "900",
      fontSize: "0.95rem",
      color: T.text,
      whiteSpace: "nowrap",
      letterSpacing: "-0.1px",
    },
    collectionItem: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: "0.45rem 1rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(62,39,35,0.04)",
      borderRadius: "50px",
      fontSize: "0.83rem",
      fontWeight: "700",
      color: T.text,
      border: `1px solid ${T.borderSoft}`,
      whiteSpace: "nowrap",
    },

    // ─── Product grid ───
    wishlistGrid: {
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
      gap: isMobile ? "1.15rem" : "1.5rem",
      marginTop: "0.5rem",
      alignItems: "stretch",
      width: "100%",
    },

    // ─── CTA card ───
    ctaCard: {
      position: "relative",
      zIndex: 1,
      marginTop: "3rem",
      padding: isMobile ? "2rem 1.5rem" : "2.5rem 2.25rem",
      backgroundColor: T.cardAlt,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "24px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowLift,
      textAlign: "center",
      boxSizing: "border-box",
      width: "100%",
      overflow: "hidden",
    },
    ctaAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    ctaTitle: {
      fontSize: isMobile ? "1.25rem" : "1.55rem",
      fontWeight: "900",
      marginBottom: "0.65rem",
      color: T.text,
      letterSpacing: "-0.3px",
    },
    ctaText: {
      color: T.textMuted,
      marginBottom: "1.5rem",
      fontSize: isMobile ? "0.9rem" : "1rem",
      lineHeight: "1.7",
      maxWidth: "520px",
      margin: "0 auto 1.5rem",
    },
    ctaButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55rem",
      padding: isMobile ? "0.9rem 1.75rem" : "1rem 2.25rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: isMobile ? "0.92rem" : "1rem",
      boxShadow: "0 12px 30px rgba(245,52,107,0.35)",
      letterSpacing: "0.2px",
    },

    // ─── Related Reading (internal backlinks) ───
    relatedCard: {
      position: "relative",
      zIndex: 1,
      marginTop: "2rem",
      padding: isMobile ? "1.5rem" : "2rem",
      backgroundColor: T.card,
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
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

    // ─── Sources ───
    citationCard: {
      position: "relative",
      zIndex: 1,
      marginTop: "1.5rem",
      padding: isMobile ? "1.5rem" : "1.75rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.06)"
        : "rgba(212, 175, 55, 0.04)",
      borderRadius: "18px",
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

  // ─── Shared background JSX (inline, not a component — avoids remounts) ───
  const backgroundJSX = (
    <div style={themeStyles.bgLayer} aria-hidden="true">
      <div style={themeStyles.bgGradient} />
      <div style={themeStyles.bgGrid} />
      <div className="wl-orb-1" style={themeStyles.bgOrb1} />
      <div className="wl-orb-2" style={themeStyles.bgOrb2} />
      <div className="wl-orb-3" style={themeStyles.bgOrb3} />
    </div>
  );

  // ─── Shared "Related Reading" + "Sources" sections ───
  const auxiliarySectionsJSX = (
    <>
      <section
        style={themeStyles.relatedCard}
        aria-labelledby="wishlist-related-title"
      >
        <h2
          id="wishlist-related-title"
          style={themeStyles.relatedTitle}
        >
          <FaBookOpen aria-hidden="true" /> Learn About the Products
        </h2>
        <ul style={themeStyles.relatedList}>
          {RELATED_GUIDES.map((guide) => (
            <li key={guide.to}>
              <Link
                to={guide.to}
                style={themeStyles.relatedLink}
                className="wl-related-link"
                aria-label={`Read: ${guide.label}`}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <span style={themeStyles.relatedIcon} aria-hidden="true">
                    {guide.icon}
                  </span>
                  {guide.label}
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

      <section
        style={themeStyles.citationCard}
        aria-labelledby="wishlist-sources-title"
      >
        <h2
          id="wishlist-sources-title"
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
                className="wl-citation-link"
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
    </>
  );

  // ─── EMPTY STATE ───
  if (wishlistItems.length === 0) {
    return (
      <div style={themeStyles.container}>
        <SEO
          title="My Wishlist | ASudha Beauty — Save Ayurvedic Favorites"
          description="Your saved natural skincare and hair care favorites at ASudha Beauty. Save 100% natural Ayurvedic products — Multani Mitti, Ubtan, Amla, Reetha, Shikakai — for later."
          keywords="wishlist, saved products, natural skincare favorites, ayurvedic wishlist, asudha beauty wishlist"
          url="/wishlist"
          breadcrumb={breadcrumb}
          citations={citations}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(wishlistJsonLd),
          }}
        />

        {backgroundJSX}

        <main style={themeStyles.content}>

          <h1 style={themeStyles.title}>
            <FaHeart aria-hidden="true" style={themeStyles.titleIcon} />
            My Natural Wishlist
          </h1>

          <div style={themeStyles.emptyWishlist}>
            <div style={themeStyles.emptyAccentBar} aria-hidden="true" />
            <div style={themeStyles.emptyIconWrapper} aria-hidden="true">
              <FaRegHeart className="wl-heart-pulse" />
            </div>
            <h2 style={themeStyles.emptyTitle}>Your wishlist is empty</h2>
            <p style={themeStyles.emptyText}>
              Discover our collection of 100% natural, Ayurvedic skincare and
              hair care products — save your favorites here for later!
            </p>
            <div style={themeStyles.emptyActions}>
              <Link
                to="/shop?category=Skincare"
                style={themeStyles.shopButton}
                className="wl-cta-primary"
              >
                <FaLeaf aria-hidden="true" /> Explore Skincare
              </Link>
              <Link
                to="/shop?category=Hair Care"
                style={themeStyles.browseButton}
                className="wl-cta-secondary"
              >
                <FaSpa aria-hidden="true" /> Explore Hair Care{" "}
                <FaArrowRight
                  aria-hidden="true"
                  style={{ fontSize: "0.75em" }}
                />
              </Link>
            </div>
          </div>

          {auxiliarySectionsJSX}
        </main>
      </div>
    );
  }

  // ─── WISHLIST WITH ITEMS ───
  return (
    <div style={themeStyles.container}>
      <SEO
        title={`My Wishlist (${wishlistItems.length}) | ASudha Beauty`}
        description={`You have ${wishlistItems.length} natural Ayurvedic products saved in your wishlist at ASudha Beauty — Multani Mitti, Ubtan, Amla, Reetha, and Shikakai.`}
        keywords="wishlist, saved products, natural skincare favorites, ayurvedic wishlist, asudha beauty wishlist"
        url="/wishlist"
        breadcrumb={breadcrumb}
        citations={citations}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(wishlistJsonLd),
        }}
      />

      {backgroundJSX}

      <main style={themeStyles.content}>
        <h1 style={themeStyles.title}>
          <FaHeart aria-hidden="true" style={themeStyles.titleIcon} />
          My Natural Wishlist
        </h1>

        <div style={themeStyles.subtitle}>
          <span
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {wishlistItems.length} item
            {wishlistItems.length !== 1 ? "s" : ""} saved
          </span>
          {naturalCount > 0 && (
            <span style={themeStyles.naturalBadge}>
              <FaLeaf aria-hidden="true" /> {naturalCount} Natural Product
              {naturalCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Wishlist collection chips */}
        {wishlistNames.length > 0 && (
          <div style={themeStyles.naturalCollection}>
            <div
              style={themeStyles.collectionAccentBar}
              aria-hidden="true"
            />
            <FaSpa
              aria-hidden="true"
              style={{ color: brandColors.green, fontSize: "1.25rem" }}
            />
            <span style={themeStyles.collectionLabel}>Your Collection:</span>
            {wishlistNames.slice(0, 4).map((name) => (
              <span
                key={name}
                style={themeStyles.collectionItem}
                className="wl-chip"
              >
                <FaLeaf
                  aria-hidden="true"
                  style={{ color: brandColors.green, fontSize: "0.7rem" }}
                />
                {name}
              </span>
            ))}
            {wishlistNames.length > 4 && (
              <span
                style={themeStyles.collectionItem}
                className="wl-chip"
              >
                +{wishlistNames.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Products grid */}
        <section
          style={themeStyles.wishlistGrid}
          aria-label={`${wishlistItems.length} saved products`}
        >
          {wishlistItems.map((product) => (
            <ProductCard
              key={`${product.id}-${product.selectedShade || "default"}`}
              product={product}
              onAddToCart={handleAddToCart}
              onRemove={() =>
                removeFromWishlist(product.id, product.selectedShade)
              }
              showBadge={
                product.category === "Skincare" ||
                product.category === "Hair Care"
              }
              badgeText={
                product.category === "Skincare" ||
                product.category === "Hair Care"
                  ? "Natural"
                  : ""
              }
            />
          ))}
        </section>

        {/* Continue shopping CTA */}
        <div style={themeStyles.ctaCard} className="wl-cta-card">
          <div style={themeStyles.ctaAccentBar} aria-hidden="true" />
          <h2 style={themeStyles.ctaTitle}>Looking for more?</h2>
          <p style={themeStyles.ctaText}>
            <FaLeaf
              aria-hidden="true"
              style={{
                color: brandColors.green,
                marginRight: "0.4rem",
              }}
            />
            Explore our full collection of 100% natural, Ayurvedic skincare
            and hair care powders.
          </p>
          <Link
            to="/shop"
            style={themeStyles.ctaButton}
            className="wl-cta-primary"
          >
            <FaShoppingBag aria-hidden="true" /> Continue Shopping{" "}
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        {auxiliarySectionsJSX}
      </main>
    </div>
  );
};

export default WishlistPage;