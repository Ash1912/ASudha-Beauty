// src/pages/Blog.jsx
import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTheme } from "../context/ThemeContext";
import {
  FaClock,
  FaUser,
  FaComment,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaEye,
  FaSearch,
  FaLeaf,
  FaSpa,
  FaTags,
  FaNewspaper,
  FaCalendarAlt,
  FaStar,
  FaExternalLinkAlt,
  FaBookOpen,
  FaFlask,
  FaShieldAlt,
  FaSeedling,
} from "react-icons/fa";

// ─── Site constants ───
const SITE_URL = "https://www.asudhabeauty.shop";
const SITE_NAME = "ASudha Beauty";

const brandColors = {
  primary: "#f5346b",
  primaryDark: "#cf2a57",
  gold: "#f7d794",
  goldDark: "#d4af37",
  bronze: "#c77d42",
  black: "#0f0f0f",
  darkSlate: "#1a1a1a",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

// ─── Authoritative external sources (high-DA backlink targets) ───
const AUTHORITATIVE_SOURCES = [
  {
    label: "PubMed — Multani Mitti (Fuller's Earth) anti-aging study",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=multani+mitti+fuller%27s+earth+skin",
    domain: "pubmed.ncbi.nlm.nih.gov",
    icon: <FaFlask />,
  },
  {
    label: "NIH NCCIH — Ayurveda: In Depth",
    href: "https://www.nccih.nih.gov/health/ayurveda",
    domain: "nccih.nih.gov",
    icon: <FaShieldAlt />,
  },
  {
    label: "Healthline — 12 Ayurvedic Herbs & Spices",
    href: "https://www.healthline.com/nutrition/ayurvedic-herbs",
    domain: "healthline.com",
    icon: <FaSeedling />,
  },
  {
    label: "WebMD — Ayurvedic Skin Care: History & Benefits",
    href: "https://www.webmd.com/beauty/what-is-ayurvedic-skin-care",
    domain: "webmd.com",
    icon: <FaSpa />,
  },
  {
    label: "AYUSH Research Portal — Government of India",
    href: "https://ayushresearch.gov.in/",
    domain: "ayushresearch.gov.in",
    icon: <FaBookOpen />,
  },
  {
    label: "Journal of Ayurveda & Integrative Medicine",
    href: "https://www.jaim.in/",
    domain: "jaim.in",
    icon: <FaFlask />,
  },
];

// ─── Per-post contextual external citations (E-E-A-T hyperlinks) ───
const POST_CITATIONS = {
  1: {
    label: "Multani Mitti anti-aging mechanisms — Cosmetics (MDPI, 2025)",
    href: "https://www.mdpi.com/2079-9284/12/3/124",
    anchor: "peer-reviewed 2025 study in Cosmetics",
  },
  2: {
    label: "Ubtan traditional formulation evaluation — PubMed",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=ubtan+traditional+indian+skin+care",
    anchor: "clinical evaluation of traditional Ubtan formulations",
  },
  3: {
    label: "Amla, Reetha & Shikakai herbal shampoo review — IJPS",
    href: "https://ijpsjournal.com/",
    anchor: "review of polyherbal shampoos using Amla, Reetha & Shikakai",
  },
  4: {
    label: "Ayurvedic daily routine — NIH NCCIH",
    href: "https://www.nccih.nih.gov/health/ayurveda",
    anchor: "NIH NCCIH overview of Ayurvedic practices",
  },
  5: {
    label: "Clean beauty consumer trends India — Mintel 2024",
    href: "https://www.mintel.com/",
    anchor: "2024 Mintel clean beauty consumer research",
  },
  6: {
    label: "Herbal face pack formulation — IJCRT 2025",
    href: "https://ijcrt.org/",
    anchor: "peer-reviewed herbal face pack formulation studies",
  },
  7: {
    label: "Ethnodermatological plants in India — PubMed review",
    href: "https://pubmed.ncbi.nlm.nih.gov/34954266/",
    anchor: "ethnodermatological review of Indian medicinal plants",
  },
};

const Blog = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);

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
  const isSplit = windowWidth <= 900;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ─── Blog posts with keyword-optimised titles, excerpts & citations ───
  const blogPosts = [
    {
      id: 1,
      title:
        "Multani Mitti Benefits for Glowing Skin: The Complete Ayurvedic Guide",
      excerpt:
        "Discover the science-backed benefits of 100% natural Multani Mitti (Fuller's Earth) for oily and acne-prone skin. Learn how this healing clay deep-cleanses, controls oil, and reveals your natural radiance — validated by a ",
      image: "/assets/images/blog/multani-mitti-guide.png",
      category: "Skincare",
      tags: [
        "Multani Mitti",
        "Multani Mitti benefits",
        "Fuller's Earth",
        "Skincare",
        "Ayurveda",
        "Oily Skin",
        "Natural Beauty",
      ],
      author: "Ashram Mishra",
      authorAvatar: "/assets/images/founders/ashram.jpeg",
      date: "March 15, 2026",
      readTime: "5 min read",
      views: 1345,
      comments: 23,
      likes: 89,
      featured: true,
      relatedId: 6,
      relatedLabel: "Herbal Face Packs for Every Skin Type",
      primaryKeyword: "multani mitti benefits for skin",
    },
    {
      id: 2,
      title: "Ubtan for Glowing Skin: The 5000-Year-Old Ayurvedic Ritual",
      excerpt:
        "Ubtan has been a staple in Indian households for centuries. Here's how this traditional turmeric, sandalwood & besan blend gives you a chemical-free glow — supported by ",
      image: "/assets/images/blog/ubtan-guide.png",
      category: "Ayurveda",
      tags: [
        "Ubtan",
        "Ubtan benefits",
        "Ayurvedic ubtan",
        "Glowing Skin",
        "Turmeric",
        "Natural Glow",
        "Herbal",
      ],
      author: "Ashish Kumar Mishra",
      authorAvatar: "/assets/images/founders/ashish.jpg",
      date: "March 10, 2026",
      readTime: "7 min read",
      views: 2103,
      comments: 45,
      likes: 156,
      featured: true,
      relatedId: 1,
      relatedLabel: "Multani Mitti Benefits for Glowing Skin",
      primaryKeyword: "ubtan benefits for glowing skin",
    },
    {
      id: 3,
      title:
        "Amla, Reetha & Shikakai for Hair: The Ultimate Natural Hair Care Trio",
      excerpt:
        "Ditch chemical-laden shampoos. Discover how Amla, Reetha, and Shikakai restore hair strength, shine, and vitality — backed by a ",
      image: "/assets/images/blog/hair-care-trio.png",
      category: "Hair Care",
      tags: [
        "Amla Reetha Shikakai",
        "Natural Shampoo",
        "Hair Fall Remedy",
        "Ayurvedic Hair Care",
        "Chemical Free Hair",
      ],
      author: "Ashram Mishra",
      authorAvatar: "/assets/images/founders/ashram.jpeg",
      date: "March 5, 2026",
      readTime: "6 min read",
      views: 1876,
      comments: 32,
      likes: 112,
      featured: true,
      relatedId: 7,
      relatedLabel: "The Science Behind Ayurvedic Herbs",
      primaryKeyword: "amla reetha shikakai for hair",
    },
    {
      id: 4,
      title:
        "5 Simple Ways to Add Ayurvedic Powders to Your Daily Skincare Routine",
      excerpt:
        "Wondering how to use Multani Mitti, Ubtan, and herbal hair powders? Here are 5 practical, easy ways to build a natural beauty ritual — guided by the ",
      image: "/assets/images/blog/daily-ayurvedic-routine.png",
      category: "Beauty Tips",
      tags: [
        "Ayurvedic Skincare Routine",
        "Daily Routine",
        "Natural Beauty Tips",
        "Herbal Powders",
        "Ayurveda",
      ],
      author: "Ashish Kumar Mishra",
      authorAvatar: "/assets/images/founders/ashish.jpg",
      date: "February 28, 2026",
      readTime: "4 min read",
      views: 987,
      comments: 15,
      likes: 67,
      featured: false,
      relatedId: 2,
      relatedLabel: "Ubtan Ritual for Radiant Skin",
      primaryKeyword: "ayurvedic skincare routine",
    },
    {
      id: 5,
      title:
        "Clean Beauty in India: Why 100% Natural, Chemical-Free Powders Matter",
      excerpt:
        "Clean beauty is more than a trend — it's a health choice. Discover why switching to paraben-free, chemical-free herbal powders matters, according to ",
      image: "/assets/images/blog/clean-beauty-ayurveda.png",
      category: "Beauty Trends",
      tags: [
        "Clean Beauty",
        "Chemical Free Skincare",
        "Paraben Free",
        "Natural Beauty India",
        "Sustainable Beauty",
      ],
      author: "Ashram Mishra",
      authorAvatar: "/assets/images/founders/ashram.jpeg",
      date: "February 20, 2026",
      readTime: "6 min read",
      views: 1567,
      comments: 28,
      likes: 103,
      featured: false,
      relatedId: 7,
      relatedLabel: "The Science Behind Ayurvedic Herbs",
      primaryKeyword: "chemical free skincare",
    },
    {
      id: 6,
      title:
        "Herbal Face Pack for Glowing Skin: The Ultimate Guide for Every Skin Type",
      excerpt:
        "From oily to dry to sensitive, find the perfect natural face pack. Explore how ingredients like Multani Mitti and Ubtan transform your complexion — supported by ",
      image: "/assets/images/blog/herbal-face-packs.png",
      category: "Skincare",
      tags: [
        "Herbal Face Pack",
        "Natural Face Pack",
        "Multani Mitti Face Pack",
        "Ubtan Face Pack",
        "Glowing Skin",
      ],
      author: "Ashish Kumar Mishra",
      authorAvatar: "/assets/images/founders/ashish.jpg",
      date: "February 12, 2026",
      readTime: "8 min read",
      views: 2345,
      comments: 52,
      likes: 178,
      featured: false,
      relatedId: 2,
      relatedLabel: "Ubtan for Glowing Skin",
      primaryKeyword: "herbal face pack for glowing skin",
    },
    {
      id: 7,
      title:
        "The Science Behind Ayurvedic Herbs: Why Amla, Reetha & Shikakai Work",
      excerpt:
        "Ayurveda is rooted in ancient wisdom — and modern science explains why. Discover the clinical evidence behind Amla, Reetha, and Shikakai for skin and hair wellness, drawn from ",
      image: "/assets/images/blog/ayurvedic-science.png",
      category: "Ayurveda",
      tags: [
        "Ayurvedic Herbs",
        "Herbal Science",
        "Amla Benefits",
        "Reetha Benefits",
        "Shikakai Benefits",
        "Ayurveda",
      ],
      author: "Ashram Mishra",
      authorAvatar: "/assets/images/founders/ashram.jpeg",
      date: "February 5, 2026",
      readTime: "5 min read",
      views: 1432,
      comments: 31,
      likes: 94,
      featured: false,
      relatedId: 3,
      relatedLabel: "Amla, Reetha & Shikakai Hair Care Trio",
      primaryKeyword: "ayurvedic herbs science",
    },
  ];

  const categories = useMemo(
    () => [
      { name: "all", count: blogPosts.length, icon: <FaNewspaper /> },
      {
        name: "Skincare",
        count: blogPosts.filter((p) => p.category === "Skincare").length,
        icon: <FaSpa />,
      },
      {
        name: "Hair Care",
        count: blogPosts.filter((p) => p.category === "Hair Care").length,
        icon: <FaLeaf />,
      },
      {
        name: "Ayurveda",
        count: blogPosts.filter((p) => p.category === "Ayurveda").length,
        icon: <FaTags />,
      },
      {
        name: "Beauty Tips",
        count: blogPosts.filter((p) => p.category === "Beauty Tips").length,
        icon: <FaHeart />,
      },
      {
        name: "Beauty Trends",
        count: blogPosts.filter((p) => p.category === "Beauty Trends").length,
        icon: <FaStar />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  const featuredPosts = blogPosts.filter((post) => post.featured);

  useEffect(() => {
    if (featuredPosts.length === 0) return;
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  const allTags = [...new Set(blogPosts.flatMap((post) => post.tags || []))];
  const currentFeatured = featuredPosts[featuredIndex];

  // ─── JSON-LD: Blog + BlogPosting (with citation) + BreadcrumbList + ItemList ───
  const blogJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          name: `${SITE_NAME} Ayurvedic Beauty Blog`,
          description:
            "Evidence-backed guides on Multani Mitti benefits, Ubtan for glowing skin, and Amla-Reetha-Shikakai hair care — India's most trusted Ayurvedic beauty resource.",
          url: `${SITE_URL}/blog`,
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/assets/logo.png`,
            },
          },
          blogPost: blogPosts.map((post) => {
            const citation = POST_CITATIONS[post.id];
            return {
              "@type": "BlogPosting",
              "@id": `${SITE_URL}/blog/${post.id}#article`,
              headline: post.title,
              description: post.excerpt,
              image: `${SITE_URL}${post.image}`,
              datePublished: new Date(post.date).toISOString().split("T")[0],
              dateModified: new Date(post.date).toISOString().split("T")[0],
              author: {
                "@type": "Person",
                name: post.author,
                url: `${SITE_URL}/about`,
              },
              publisher: {
                "@type": "Organization",
                name: SITE_NAME,
                url: SITE_URL,
              },
              url: `${SITE_URL}/blog/${post.id}`,
              keywords: post.tags.join(", "),
              articleSection: post.category,
              inLanguage: "en-IN",
              ...(citation && {
                citation: {
                  "@type": "CreativeWork",
                  name: citation.label,
                  url: citation.href,
                },
                isBasedOn: citation.href,
              }),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${SITE_URL}/blog/${post.id}`,
              },
            };
          }),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL}/blog#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Ayurvedic Beauty Blog",
              item: `${SITE_URL}/blog`,
            },
          ],
        },
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/blog#posts`,
          name: "Ayurvedic Beauty Articles",
          numberOfItems: blogPosts.length,
          itemListElement: blogPosts.map((post, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${SITE_URL}/blog/${post.id}`,
            name: post.title,
          })),
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // ─── Injected CSS ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-blog-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    const style = document.createElement("style");
    style.setAttribute("data-blog-styles", "true");
    style.textContent = `
      .blog-card { transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.4s ease, border-color 0.3s ease; }
      .blog-card:hover { transform: translateY(-8px); box-shadow: ${isDarkMode ? "0 24px 50px rgba(0,0,0,0.7)" : "0 24px 50px rgba(62,39,35,0.1)"}; border-color: ${isDarkMode ? "rgba(212,175,55,0.4)" : "rgba(199,125,66,0.25)"}; }
      .blog-card:hover .blog-image { transform: scale(1.05); }
      .blog-title-link { transition: color 0.3s ease; }
      .blog-title-link:hover { color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important; }
      .read-more-btn { transition: gap 0.3s ease, color 0.3s ease; }
      .read-more-btn:hover { gap: 0.6rem; color: ${isDarkMode ? brandColors.goldDark : brandColors.primary} !important; }
      .related-link { transition: color 0.25s ease, gap 0.25s ease; }
      .related-link:hover { color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important; gap: 0.55rem; }
      .external-link { transition: color 0.25s ease, border-color 0.25s ease; }
      .external-link:hover { color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important; border-color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important; }
      .view-all-link { transition: gap 0.3s ease; }
      .view-all-link:hover { gap: 0.6rem; }
      .featured-btn { transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease; }
      .featured-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 38px rgba(245,52,107,0.45); gap: 0.75rem; }
      .carousel-btn { transition: all 0.3s ease; }
      .carousel-btn:hover { background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important; border-color: transparent !important; color: ${isDarkMode ? brandColors.black : "#ffffff"} !important; transform: translateY(-2px); }
      .category-link { transition: all 0.25s ease; border: none; background: transparent; cursor: pointer; font-family: inherit; width: 100%; text-align: left; }
      .category-link:hover, .category-link:focus-visible { color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important; background-color: ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(62,39,35,0.03)"} !important; outline: none; }
      .popular-title { transition: color 0.3s ease; }
      .popular-title:hover { color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important; }
      .tag { transition: all 0.25s ease; border: none; font-family: inherit; cursor: pointer; }
      .tag:hover, .tag:focus-visible { background-color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important; color: ${isDarkMode ? brandColors.black : "#ffffff"} !important; outline: none; }
      .page-btn { transition: all 0.25s ease; }
      .page-btn:hover:not(:disabled) { background-color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important; color: ${isDarkMode ? brandColors.black : "#ffffff"} !important; border-color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important; }
      .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      button:focus-visible, a:focus-visible { outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary}; outline-offset: 3px; border-radius: 6px; }
      @keyframes blogFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
    return () => {
      document
        .querySelectorAll('style[data-blog-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  const themeStyles = {
    container: {
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100%",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },
    hero: {
      position: "relative",
      background: isDarkMode
        ? "linear-gradient(160deg, #1a1212 0%, #0f0f0f 100%)"
        : "linear-gradient(160deg, #fbf3ec 0%, #fcf8f5 100%)",
      padding: isNarrow ? "3.5rem 1.25rem 3rem" : "5rem 2rem 4.5rem",
      textAlign: "center",
      overflow: "hidden",
      borderBottom: `1px solid ${T.borderSoft}`,
    },
    heroOrb1: {
      position: "absolute",
      top: "-140px",
      left: "-140px",
      width: "380px",
      height: "380px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(245,52,107,0.22) 0%, transparent 70%)",
      filter: "blur(80px)",
      pointerEvents: "none",
      opacity: isDarkMode ? 0.55 : 0.4,
    },
    heroOrb2: {
      position: "absolute",
      bottom: "-140px",
      right: "-140px",
      width: "380px",
      height: "380px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(212,175,55,0.22) 0%, transparent 70%)",
      filter: "blur(80px)",
      pointerEvents: "none",
      opacity: isDarkMode ? 0.55 : 0.4,
    },
    heroContent: {
      maxWidth: "820px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },
    heroTitle: {
      fontSize: isMobile ? "2rem" : isNarrow ? "2.5rem" : "3.2rem",
      fontWeight: "900",
      marginBottom: "1.25rem",
      color: isDarkMode ? brandColors.gold : brandColors.earthLight,
      lineHeight: "1.1",
      letterSpacing: "-0.5px",
      position: "relative",
      display: "inline-block",
      paddingBottom: "0.75rem",
    },
    heroTitleAccent: {
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
      width: "90px",
      height: "4px",
      borderRadius: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
    },
    heroText: {
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      color: T.textMuted,
      lineHeight: "1.8",
      marginBottom: 0,
      maxWidth: "660px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    featuredSection: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isNarrow ? "2.5rem 1.25rem" : "4rem 2rem",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.75rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    sectionTitle: {
      fontSize: isNarrow ? "1.4rem" : "1.8rem",
      fontWeight: "900",
      color: T.text,
      margin: 0,
      letterSpacing: "-0.3px",
    },
    viewAllLink: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "none",
      fontSize: "0.92rem",
      fontWeight: "700",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
    },
    featuredCard: {
      display: "grid",
      gridTemplateColumns: isSplit ? "1fr" : "1.15fr 1fr",
      backgroundColor: T.card,
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: T.shadowLift,
      border: `1px solid ${T.border}`,
      position: "relative",
      minHeight: isSplit ? "auto" : "460px",
    },
    featuredImageWrap: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: isDarkMode ? "#000" : brandColors.cream,
      minHeight: isSplit ? "240px" : "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    featuredImage: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center",
      display: "block",
      padding: isSplit ? "1rem" : "1.5rem",
      boxSizing: "border-box",
      transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
    },
    featuredContent: {
      padding: isNarrow ? "1.75rem 1.5rem" : "3rem 2.5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      color: T.text,
    },
    featuredCategory: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      padding: "0.35rem 0.95rem",
      borderRadius: "50px",
      fontSize: "0.7rem",
      fontWeight: "800",
      color: isDarkMode ? brandColors.black : "#ffffff",
      marginBottom: "1rem",
      width: "fit-content",
      letterSpacing: "0.8px",
      textTransform: "uppercase",
    },
    featuredTitle: {
      fontSize: isMobile ? "1.25rem" : isNarrow ? "1.5rem" : "1.75rem",
      fontWeight: "800",
      marginBottom: "1rem",
      lineHeight: "1.3",
      color: T.text,
      letterSpacing: "-0.3px",
    },
    featuredExcerpt: {
      fontSize: isNarrow ? "0.9rem" : "0.98rem",
      marginBottom: "1.5rem",
      lineHeight: "1.7",
      color: T.textMuted,
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    featuredMeta: {
      display: "flex",
      flexWrap: "wrap",
      gap: isMobile ? "0.75rem" : "1.25rem",
      fontSize: "0.8rem",
      color: T.textMuted,
      marginBottom: "1.5rem",
      paddingTop: "1.25rem",
      borderTop: `1px solid ${T.borderSoft}`,
    },
    featuredMetaItem: { display: "flex", alignItems: "center", gap: "0.35rem" },
    featuredButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.8rem 1.8rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontSize: "0.9rem",
      fontWeight: "800",
      width: "fit-content",
      boxShadow: "0 10px 26px rgba(245,52,107,0.35)",
      letterSpacing: "0.2px",
    },
    featuredControls: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "1.5rem",
      gap: "1rem",
      flexWrap: "wrap",
    },
    carouselDots: { display: "flex", gap: "0.5rem" },
    carouselDot: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.2)"
        : "rgba(62,39,35,0.15)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "none",
      padding: 0,
    },
    carouselDotActive: {
      width: "32px",
      borderRadius: "5px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
    },
    carouselControls: { display: "flex", gap: "0.5rem" },
    carouselButton: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      backgroundColor: T.card,
      border: `1px solid ${T.border}`,
      color: T.text,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: T.shadow,
    },
    mainContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isNarrow ? "1.5rem 1.25rem 3rem" : "2.5rem 2rem 4rem",
      display: "grid",
      gridTemplateColumns: isNarrow ? "1fr" : "3fr 1fr",
      gap: isNarrow ? "2.5rem" : "3rem",
    },
    blogGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "1.5rem",
    },
    blogCard: {
      backgroundColor: T.card,
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: T.shadow,
      border: `1px solid ${T.border}`,
      display: "flex",
      flexDirection: "column",
    },
    blogImageContainer: {
      position: "relative",
      height: "220px",
      overflow: "hidden",
      backgroundColor: isDarkMode ? "#0f0f0f" : brandColors.cream,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    blogImage: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      transition: "transform 0.5s ease",
      padding: "0.75rem",
      boxSizing: "border-box",
    },
    blogCategory: {
      position: "absolute",
      top: "1rem",
      left: "1rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      padding: "0.3rem 1rem",
      borderRadius: "50px",
      fontSize: "0.7rem",
      fontWeight: "800",
      zIndex: 2,
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      letterSpacing: "0.6px",
      textTransform: "uppercase",
      boxShadow: "0 6px 18px rgba(245,52,107,0.35)",
    },
    blogContent: {
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    blogTitle: {
      fontSize: "1.1rem",
      fontWeight: "800",
      marginBottom: "0.75rem",
      color: T.text,
      lineHeight: "1.4",
      textDecoration: "none",
      letterSpacing: "-0.2px",
    },
    blogExcerpt: {
      fontSize: "0.9rem",
      color: T.textMuted,
      lineHeight: "1.65",
      marginBottom: "0.85rem",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    citationLink: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "underline",
      fontWeight: "600",
    },
    relatedLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      fontSize: "0.78rem",
      fontWeight: "700",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "none",
      marginBottom: "1rem",
      padding: "0.35rem 0.7rem",
      borderRadius: "6px",
      backgroundColor: isDarkMode
        ? "rgba(212,175,55,0.08)"
        : "rgba(199,125,66,0.06)",
      border: `1px dashed ${isDarkMode ? "rgba(212,175,55,0.25)" : "rgba(199,125,66,0.2)"}`,
      width: "fit-content",
    },
    blogMeta: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      fontSize: "0.78rem",
      color: T.textMuted,
      marginBottom: "1rem",
    },
    metaItem: { display: "flex", alignItems: "center", gap: "0.3rem" },
    blogFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "1rem",
      borderTop: `1px solid ${T.borderSoft}`,
      marginTop: "auto",
    },
    readMoreButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "none",
      fontSize: "0.85rem",
      fontWeight: "700",
    },
    postStats: {
      display: "flex",
      gap: "0.75rem",
      color: T.textMuted,
      fontSize: "0.78rem",
    },
    statItem: { display: "flex", alignItems: "center", gap: "0.25rem" },
    sidebar: { display: "flex", flexDirection: "column", gap: "1.75rem" },
    sidebarWidget: {
      backgroundColor: T.card,
      padding: "1.6rem",
      borderRadius: "20px",
      boxShadow: T.shadow,
      border: `1px solid ${T.border}`,
      color: T.text,
    },
    widgetTitle: {
      fontSize: "1.1rem",
      fontWeight: "800",
      marginBottom: "1.25rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      paddingBottom: "0.6rem",
      borderBottom: `2px solid ${isDarkMode ? "rgba(212,175,55,0.2)" : "rgba(199,125,66,0.12)"}`,
      display: "inline-block",
      letterSpacing: "-0.2px",
    },
    categoryList: { listStyle: "none", padding: 0, margin: 0 },
    categoryItem: { marginBottom: "0.35rem" },
    categoryLink: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.55rem 0.65rem",
      color: T.textMuted,
      textDecoration: "none",
      cursor: "pointer",
      borderRadius: "10px",
      fontSize: "0.9rem",
      fontWeight: "600",
      boxSizing: "border-box",
    },
    categoryIcon: { marginRight: "0.55rem", fontSize: "0.8rem", opacity: 0.85 },
    categoryCount: {
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(62,39,35,0.05)",
      padding: "0.15rem 0.55rem",
      borderRadius: "50px",
      fontSize: "0.72rem",
      color: T.textMuted,
      fontWeight: "700",
    },
    popularPost: {
      display: "flex",
      gap: "0.75rem",
      marginBottom: "1.1rem",
      paddingBottom: "1.1rem",
      borderBottom: `1px solid ${T.borderSoft}`,
    },
    popularImage: {
      width: "62px",
      height: "62px",
      borderRadius: "12px",
      objectFit: "cover",
      flexShrink: 0,
      backgroundColor: isDarkMode ? "#0f0f0f" : brandColors.cream,
      border: `1px solid ${T.borderSoft}`,
    },
    popularInfo: { flex: 1, minWidth: 0 },
    popularTitle: {
      fontSize: "0.9rem",
      fontWeight: "700",
      marginBottom: "0.25rem",
      color: T.text,
      textDecoration: "none",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      lineHeight: "1.4",
    },
    popularDate: {
      fontSize: "0.72rem",
      color: T.textMuted,
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
    },
    tagCloud: { display: "flex", flexWrap: "wrap", gap: "0.45rem" },
    tag: {
      padding: "0.3rem 0.85rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.06)"
        : "rgba(62,39,35,0.05)",
      color: T.textMuted,
      borderRadius: "50px",
      fontSize: "0.78rem",
      fontWeight: "600",
      textDecoration: "none",
      cursor: "pointer",
      boxSizing: "border-box",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "3rem",
      flexWrap: "wrap",
    },
    pageButton: {
      minWidth: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: "12px",
      color: T.text,
      cursor: "pointer",
      boxShadow: T.shadow,
      fontFamily: "inherit",
      fontWeight: "700",
    },
    activePage: {
      backgroundColor: isDarkMode ? brandColors.gold : brandColors.primary,
      color: isDarkMode ? brandColors.black : "#ffffff",
      borderColor: isDarkMode ? brandColors.gold : brandColors.primary,
    },
    sourcesList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    sourceLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
      padding: "0.55rem 0.7rem",
      borderRadius: "8px",
      fontSize: "0.82rem",
      fontWeight: "600",
      color: T.textMuted,
      textDecoration: "none",
      border: `1px solid ${T.borderSoft}`,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.02)"
        : "rgba(62,39,35,0.02)",
    },
    breadcrumb: {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      fontSize: "0.78rem",
      color: T.textDim,
      marginBottom: "1rem",
      flexWrap: "wrap",
    },
    breadcrumbLink: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  const getCategoryIcon = (categoryName) => {
    const found = categories.find((c) => c.name === categoryName);
    return found ? found.icon : <FaNewspaper />;
  };

  return (
    <div style={themeStyles.container}>
      {/* ─── SEO: Meta + JSON-LD ─── */}
      <Helmet>
        <title>
          Ayurvedic Beauty Blog | Multani Mitti, Ubtan &amp; Amla Reetha
          Shikakai Guides | ASudha
        </title>
        <meta
          name="description"
          content="Evidence-backed Ayurvedic beauty guides: Multani Mitti benefits for skin, Ubtan for glowing skin, and Amla-Reetha-Shikakai hair care. 100% natural, chemical-free routines from ASudha."
        />
        <meta
          name="keywords"
          content="multani mitti benefits, multani mitti for oily skin, ubtan for glowing skin, ubtan cream benefits, amla reetha shikakai for hair, natural shampoo for hair fall, ayurvedic skincare routine, chemical free skincare, herbal face pack for glowing skin, natural beauty tips India, paraben free skincare"
        />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content={SITE_NAME} />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta
          property="og:title"
          content="Ayurvedic Beauty Blog | Multani Mitti, Ubtan & Amla Reetha Shikakai | ASudha"
        />
        <meta
          property="og:description"
          content="Evidence-backed guides on Multani Mitti benefits, Ubtan for glowing skin, and Amla-Reetha-Shikakai hair care."
        />
        <meta
          property="og:image"
          content={`${SITE_URL}/assets/images/blog/og-blog.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ayurvedic Beauty Blog | ASudha" />
        <meta
          name="twitter:description"
          content="Multani Mitti, Ubtan & Amla-Reetha-Shikakai — evidence-backed Ayurvedic guides."
        />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/assets/images/blog/og-blog.png`}
        />

        <script type="application/ld+json">{JSON.stringify(blogJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section style={themeStyles.hero} aria-labelledby="blog-hero-title">
        <div style={themeStyles.heroOrb1} aria-hidden="true" />
        <div style={themeStyles.heroOrb2} aria-hidden="true" />
        <div style={themeStyles.heroContent}>
          <h1 id="blog-hero-title" style={themeStyles.heroTitle}>
            The ASudha Ayurvedic Beauty Blog
            <span style={themeStyles.heroTitleAccent} aria-hidden="true" />
          </h1>
          <p style={themeStyles.heroText}>
            Discover evidence-backed guides on Multani Mitti benefits, Ubtan for
            glowing skin, and Amla–Reetha–Shikakai hair care — rooted in 5,000
            years of Ayurveda and validated by modern science.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featuredPosts.length > 0 && currentFeatured && (
        <section
          style={themeStyles.featuredSection}
          aria-labelledby="featured-articles-title"
        >
          <div style={themeStyles.sectionHeader}>
            <h2 id="featured-articles-title" style={themeStyles.sectionTitle}>
              Featured Articles
            </h2>
            <Link
              to="/blog/all"
              style={themeStyles.viewAllLink}
              className="view-all-link"
            >
              View All{" "}
              <FaArrowRight aria-hidden="true" style={{ fontSize: "0.8rem" }} />
            </Link>
          </div>

          <div style={themeStyles.featuredCard}>
            <div style={themeStyles.featuredImageWrap}>
              <img
                key={currentFeatured.id}
                src={currentFeatured.image}
                alt={`${currentFeatured.title} — ${currentFeatured.primaryKeyword} guide by ASudha`}
                style={themeStyles.featuredImage}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/800x600/fcf8f5/3e2723?text=" +
                    encodeURIComponent(currentFeatured.title);
                }}
              />
            </div>

            <div style={themeStyles.featuredContent}>
              <span style={themeStyles.featuredCategory}>
                <FaSpa aria-hidden="true" style={{ fontSize: "0.6rem" }} />{" "}
                {currentFeatured.category}
              </span>
              <h3 style={themeStyles.featuredTitle}>{currentFeatured.title}</h3>
              <p style={themeStyles.featuredExcerpt}>
                {currentFeatured.excerpt}
                {POST_CITATIONS[currentFeatured.id] && (
                  <a
                    href={POST_CITATIONS[currentFeatured.id].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={themeStyles.citationLink}
                  >
                    {POST_CITATIONS[currentFeatured.id].anchor}
                  </a>
                )}
                .
              </p>

              <div style={themeStyles.featuredMeta}>
                <span style={themeStyles.featuredMetaItem}>
                  <FaUser aria-hidden="true" style={{ fontSize: "0.7rem" }} />{" "}
                  {currentFeatured.author}
                </span>
                <span style={themeStyles.featuredMetaItem}>
                  <FaClock aria-hidden="true" style={{ fontSize: "0.7rem" }} />{" "}
                  {currentFeatured.readTime}
                </span>
                <span style={themeStyles.featuredMetaItem}>
                  <FaComment
                    aria-hidden="true"
                    style={{ fontSize: "0.7rem" }}
                  />{" "}
                  {currentFeatured.comments}
                </span>
              </div>

              <Link
                to={`/blog/${currentFeatured.id}`}
                style={themeStyles.featuredButton}
                className="featured-btn"
                aria-label={`Read the full article: ${currentFeatured.title}`}
              >
                Read Article <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div style={themeStyles.featuredControls}>
            <div style={themeStyles.carouselDots}>
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  style={{
                    ...themeStyles.carouselDot,
                    ...(featuredIndex === index &&
                      themeStyles.carouselDotActive),
                  }}
                  onClick={() => setFeaturedIndex(index)}
                  aria-label={`Go to featured article ${index + 1} of ${featuredPosts.length}`}
                  aria-current={featuredIndex === index ? "true" : "false"}
                />
              ))}
            </div>
            <div style={themeStyles.carouselControls}>
              <button
                type="button"
                style={themeStyles.carouselButton}
                className="carousel-btn"
                onClick={() =>
                  setFeaturedIndex(
                    (prev) =>
                      (prev - 1 + featuredPosts.length) % featuredPosts.length,
                  )
                }
                aria-label="Previous featured article"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                style={themeStyles.carouselButton}
                className="carousel-btn"
                onClick={() =>
                  setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length)
                }
                aria-label="Next featured article"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main */}
      <div style={themeStyles.mainContent}>
        <div>
          {currentPosts.length > 0 ? (
            <div style={themeStyles.blogGrid}>
              {currentPosts.map((post) => {
                const citation = POST_CITATIONS[post.id];
                return (
                  <article
                    key={post.id}
                    style={themeStyles.blogCard}
                    className="blog-card"
                  >
                    <div style={themeStyles.blogImageContainer}>
                      <img
                        src={post.image}
                        alt={`${post.title} — ${post.primaryKeyword} by ASudha`}
                        style={themeStyles.blogImage}
                        className="blog-image"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/400x300/fcf8f5/3e2723?text=" +
                            encodeURIComponent(post.title);
                        }}
                      />
                      <span style={themeStyles.blogCategory}>
                        {getCategoryIcon(post.category)}
                        {post.category}
                      </span>
                    </div>
                    <div style={themeStyles.blogContent}>
                      <Link
                        to={`/blog/${post.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <h3
                          style={themeStyles.blogTitle}
                          className="blog-title-link"
                        >
                          {post.title}
                        </h3>
                      </Link>

                      {/* Excerpt with contextual external citation hyperlink */}
                      <p style={themeStyles.blogExcerpt}>
                        {post.excerpt}
                        {citation && (
                          <a
                            href={citation.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={themeStyles.citationLink}
                          >
                            {citation.anchor}
                          </a>
                        )}
                        .
                      </p>

                      {/* Internal related link */}
                      {post.relatedId && post.relatedLabel && (
                        <Link
                          to={`/blog/${post.relatedId}`}
                          style={themeStyles.relatedLink}
                          className="related-link"
                          aria-label={`Related reading: ${post.relatedLabel}`}
                        >
                          <FaBookOpen
                            aria-hidden="true"
                            style={{ fontSize: "0.7rem" }}
                          />
                          Related: {post.relatedLabel}
                          <FaArrowRight
                            aria-hidden="true"
                            style={{ fontSize: "0.65rem" }}
                          />
                        </Link>
                      )}

                      <div style={themeStyles.blogMeta}>
                        <span style={themeStyles.metaItem}>
                          <FaUser aria-hidden="true" /> {post.author}
                        </span>
                        <span style={themeStyles.metaItem}>
                          <FaClock aria-hidden="true" /> {post.readTime}
                        </span>
                        <span style={themeStyles.metaItem}>
                          <FaComment aria-hidden="true" /> {post.comments}
                        </span>
                      </div>
                      <div style={themeStyles.blogFooter}>
                        <Link
                          to={`/blog/${post.id}`}
                          style={themeStyles.readMoreButton}
                          className="read-more-btn"
                          aria-label={`Read more about ${post.title}`}
                        >
                          Read More{" "}
                          <FaArrowRight
                            aria-hidden="true"
                            style={{ fontSize: "0.7rem" }}
                          />
                        </Link>
                        <div style={themeStyles.postStats}>
                          <span style={themeStyles.statItem}>
                            <FaEye aria-hidden="true" /> {post.views}
                          </span>
                          <span style={themeStyles.statItem}>
                            <FaHeart aria-hidden="true" /> {post.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: T.textMuted,
                backgroundColor: T.card,
                borderRadius: "20px",
                border: `1px solid ${T.border}`,
              }}
            >
              <FaSearch
                aria-hidden="true"
                style={{ fontSize: "3rem", opacity: 0.3, marginBottom: "1rem" }}
              />
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                  color: T.text,
                  fontWeight: "800",
                }}
              >
                No articles found
              </h3>
              <p>Try adjusting your filter criteria</p>
            </div>
          )}

          {totalPages > 1 && (
            <nav style={themeStyles.pagination} aria-label="Blog pagination">
              <button
                type="button"
                style={themeStyles.pageButton}
                className="page-btn"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  type="button"
                  style={{
                    ...themeStyles.pageButton,
                    ...(currentPage === i + 1 && themeStyles.activePage),
                  }}
                  className="page-btn"
                  onClick={() => setCurrentPage(i + 1)}
                  aria-label={`Go to page ${i + 1}`}
                  aria-current={currentPage === i + 1 ? "page" : "false"}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                style={themeStyles.pageButton}
                className="page-btn"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            </nav>
          )}
        </div>

        {/* Sidebar */}
        <aside style={themeStyles.sidebar} aria-label="Blog sidebar">
          <div style={themeStyles.sidebarWidget}>
            <h3 style={themeStyles.widgetTitle}>Explore Categories</h3>
            <ul style={themeStyles.categoryList}>
              {categories.map((category) => (
                <li key={category.name} style={themeStyles.categoryItem}>
                  <button
                    type="button"
                    style={{
                      ...themeStyles.categoryLink,
                      ...(selectedCategory === category.name && {
                        color: isDarkMode
                          ? brandColors.gold
                          : brandColors.bronze,
                        backgroundColor: isDarkMode
                          ? "rgba(212,175,55,0.1)"
                          : "rgba(199,125,66,0.06)",
                      }),
                    }}
                    className="category-link"
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setCurrentPage(1);
                    }}
                    aria-pressed={selectedCategory === category.name}
                  >
                    <span>
                      <span style={themeStyles.categoryIcon} aria-hidden="true">
                        {category.icon}
                      </span>
                      {category.name === "all" ? "All Articles" : category.name}
                    </span>
                    <span style={themeStyles.categoryCount}>
                      {category.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div style={themeStyles.sidebarWidget}>
            <h3 style={themeStyles.widgetTitle}>Most Loved</h3>
            {[...blogPosts]
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 3)
              .map((post, idx, arr) => (
                <div
                  key={post.id}
                  style={{
                    ...themeStyles.popularPost,
                    ...(idx === arr.length - 1 && {
                      marginBottom: 0,
                      paddingBottom: 0,
                      borderBottom: "none",
                    }),
                  }}
                >
                  <img
                    src={post.image}
                    alt={`${post.title} — popular Ayurvedic guide`}
                    style={themeStyles.popularImage}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/60x60/fcf8f5/3e2723?text=Post";
                    }}
                  />
                  <div style={themeStyles.popularInfo}>
                    <Link
                      to={`/blog/${post.id}`}
                      style={themeStyles.popularTitle}
                      className="popular-title"
                    >
                      {post.title}
                    </Link>
                    <div style={themeStyles.popularDate}>
                      <FaCalendarAlt
                        aria-hidden="true"
                        style={{ fontSize: "0.6rem" }}
                      />{" "}
                      {post.date}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div style={themeStyles.sidebarWidget}>
            <h3 style={themeStyles.widgetTitle}>Popular Herbs &amp; Topics</h3>
            <div style={themeStyles.tagCloud}>
              {allTags.slice(0, 12).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  style={themeStyles.tag}
                  className="tag"
                  onClick={() => setSearchTerm(tag)}
                  aria-label={`Filter articles by ${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* High-authority external backlinks (E-E-A-T) */}
          <div style={themeStyles.sidebarWidget}>
            <h3 style={themeStyles.widgetTitle}>Trusted Sources</h3>
            <p
              style={{
                fontSize: "0.78rem",
                color: T.textDim,
                marginTop: 0,
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}
            >
              Every guide is cross-referenced with peer-reviewed research and
              government health resources.
            </p>
            <ul style={themeStyles.sourcesList}>
              {AUTHORITATIVE_SOURCES.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={themeStyles.sourceLink}
                    className="external-link"
                    title={`${source.label} (${source.domain})`}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.45rem",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{ fontSize: "0.75rem", opacity: 0.7 }}
                      >
                        {source.icon}
                      </span>
                      <span>{source.label}</span>
                    </span>
                    <FaExternalLinkAlt
                      aria-hidden="true"
                      style={{ fontSize: "0.6rem", flexShrink: 0 }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blog;
