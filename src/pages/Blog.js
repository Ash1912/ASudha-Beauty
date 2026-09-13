import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
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
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const Blog = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  // ✅ searchTerm is kept because the "Popular Herbs & Topics" tags
  //    still use it to filter posts when clicked.
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // ─── DARK TOKENS ───
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

  // ─── LIGHT TOKENS ───
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

  // Blog posts
  const blogPosts = [
    {
      id: 1,
      title: "The Ancient Secret of Multani Mitti: Benefits for Glowing Skin",
      excerpt:
        "Discover the timeless Ayurvedic benefits of 100% natural Multani Mitti. Learn how this healing clay can deep-cleanse, control oil, and reveal your natural radiance.",
      content: "Full article content here...",
      image: "/assets/images/blog/multani-mitti-guide.png",
      category: "Skincare",
      tags: ["Multani Mitti", "Skincare", "Ayurveda", "Natural Beauty"],
      author: "Ashram Mishra",
      authorAvatar: "/assets/images/founders/ashram.jpeg",
      date: "March 15, 2026",
      readTime: "5 min read",
      views: 1345,
      comments: 23,
      likes: 89,
      featured: true,
    },
    {
      id: 2,
      title: "Ubtan: The 5000-Year-Old Ayurvedic Ritual for Radiant Skin",
      excerpt:
        "Ubtan has been a staple in Indian households for centuries. Here's how this traditional herbal blend can give you a glowing, chemical-free complexion.",
      image: "/assets/images/blog/ubtan-guide.png",
      category: "Ayurveda",
      tags: ["Ubtan", "Ayurveda", "Natural Glow", "Herbal"],
      author: "Ashish Kumar Mishra",
      authorAvatar: "/assets/images/founders/ashish.jpg",
      date: "March 10, 2026",
      readTime: "7 min read",
      views: 2103,
      comments: 45,
      likes: 156,
      featured: true,
    },
    {
      id: 3,
      title: "Amla, Reetha & Shikakai: The Ultimate Ayurvedic Hair Care Trio",
      excerpt:
        "Ditch chemical-laden shampoos. Discover how the power of Amla, Reetha, and Shikakai can restore your hair's natural strength, shine, and vitality.",
      image: "/assets/images/blog/hair-care-trio.png",
      category: "Hair Care",
      tags: ["Amla", "Reetha", "Shikakai", "Hair Care", "Ayurveda"],
      author: "Ashram Mishra",
      authorAvatar: "/assets/images/founders/ashram.jpeg",
      date: "March 5, 2026",
      readTime: "6 min read",
      views: 1876,
      comments: 32,
      likes: 112,
      featured: true,
    },
    {
      id: 4,
      title: "5 Simple Ways to Incorporate Ayurvedic Powders Into Your Daily Routine",
      excerpt:
        "Wondering how to use Multani Mitti, Ubtan, and herbal hair powders? Here are 5 practical, easy ways to add them to your everyday beauty ritual.",
      image: "/assets/images/blog/daily-ayurvedic-routine.png",
      category: "Beauty Tips",
      tags: ["Routine", "Ayurveda", "Tips", "Natural"],
      author: "Ashish Kumar Mishra",
      authorAvatar: "/assets/images/founders/ashish.jpg",
      date: "February 28, 2026",
      readTime: "4 min read",
      views: 987,
      comments: 15,
      likes: 67,
      featured: false,
    },
    {
      id: 5,
      title: "Clean Beauty: Why Switching to 100% Natural Powders Matters",
      excerpt:
        "Clean beauty is more than a trend. Discover why making the switch to chemical-free, paraben-free herbal powders is crucial for your health and the planet.",
      image: "/assets/images/blog/clean-beauty-ayurveda.png",
      category: "Beauty Trends",
      tags: ["Clean Beauty", "Chemical Free", "Trends", "Sustainability"],
      author: "Ashram Mishra",
      authorAvatar: "/assets/images/founders/ashram.jpeg",
      date: "February 20, 2026",
      readTime: "6 min read",
      views: 1567,
      comments: 28,
      likes: 103,
      featured: false,
    },
    {
      id: 6,
      title: "The Ultimate Guide to Herbal Face Packs for Every Skin Type",
      excerpt:
        "From oily to dry to sensitive, find the perfect natural face pack for your skin. Explore how ingredients like Multani Mitti and Ubtan can transform your complexion.",
      image: "/assets/images/blog/herbal-face-packs.png",
      category: "Skincare",
      tags: ["Face Pack", "Multani Mitti", "Ubtan", "Natural Skincare"],
      author: "Ashish Kumar Mishra",
      authorAvatar: "/assets/images/founders/ashish.jpg",
      date: "February 12, 2026",
      readTime: "8 min read",
      views: 2345,
      comments: 52,
      likes: 178,
      featured: false,
    },
    {
      id: 7,
      title: "The Science Behind Ayurvedic Herbs: Why They Work",
      excerpt:
        "Ayurveda is rooted in ancient wisdom. Here's the science behind why herbs like Amla, Reetha, and Shikakai are so effective for hair and skin wellness.",
      image: "/assets/images/blog/ayurvedic-science.png",
      category: "Ayurveda",
      tags: ["Ayurveda", "Herbs", "Science", "Wellness"],
      author: "Ashram Mishra",
      authorAvatar: "/assets/images/founders/ashram.jpeg",
      date: "February 5, 2026",
      readTime: "5 min read",
      views: 1432,
      comments: 31,
      likes: 94,
      featured: false,
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
    []
  );

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
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

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-blog-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-blog-styles", "true");
    style.textContent = `
      @keyframes blogFadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .blog-card {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.4s ease,
                    border-color 0.3s ease;
      }
      .blog-card:hover {
        transform: translateY(-8px);
        box-shadow: ${
          isDarkMode
            ? "0 24px 50px rgba(0, 0, 0, 0.7)"
            : "0 24px 50px rgba(62, 39, 35, 0.1)"
        };
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.4)"
            : "rgba(199, 125, 66, 0.25)"
        };
      }
      .blog-card:hover .blog-image { transform: scale(1.05); }

      .blog-title-link {
        transition: color 0.3s ease;
      }
      .blog-title-link:hover {
        color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important;
      }

      .read-more-btn {
        transition: gap 0.3s ease, color 0.3s ease;
      }
      .read-more-btn:hover {
        gap: 0.6rem;
        color: ${
          isDarkMode ? brandColors.goldDark : brandColors.primary
        } !important;
      }

      .view-all-link { transition: gap 0.3s ease; }
      .view-all-link:hover { gap: 0.6rem; }

      .featured-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .featured-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 38px rgba(245, 52, 107, 0.45);
        gap: 0.75rem;
      }

      .carousel-btn {
        transition: all 0.3s ease;
      }
      .carousel-btn:hover {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        border-color: transparent !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        transform: translateY(-2px);
      }

      .category-link {
        transition: all 0.25s ease;
      }
      .category-link:hover {
        color: ${
          isDarkMode ? brandColors.gold : brandColors.bronze
        } !important;
        background-color: ${
          isDarkMode
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(62, 39, 35, 0.03)"
        } !important;
      }

      .popular-title {
        transition: color 0.3s ease;
      }
      .popular-title:hover {
        color: ${
          isDarkMode ? brandColors.gold : brandColors.bronze
        } !important;
      }

      .tag {
        transition: all 0.25s ease;
      }
      .tag:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
      }

      .newsletter-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .newsletter-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(245, 52, 107, 0.5);
      }

      .page-btn {
        transition: all 0.25s ease;
      }
      .page-btn:hover:not(:disabled) {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
      }
      .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
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

    // ─── Hero (search removed — cleaner & more compact) ───
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
        "radial-gradient(circle at 40% 40%, rgba(245, 52, 107, 0.22) 0%, transparent 70%)",
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
        "radial-gradient(circle at 60% 60%, rgba(212, 175, 55, 0.22) 0%, transparent 70%)",
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

    // ─── Featured ───
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
      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
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
    featuredMetaItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
    },
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
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
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
    carouselDots: {
      display: "flex",
      gap: "0.5rem",
    },
    carouselDot: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.2)"
        : "rgba(62, 39, 35, 0.15)",
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
    carouselControls: {
      display: "flex",
      gap: "0.5rem",
    },
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

    // ─── Main content ───
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
      boxShadow: "0 6px 18px rgba(245, 52, 107, 0.35)",
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
      marginBottom: "1rem",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    blogMeta: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      fontSize: "0.78rem",
      color: T.textMuted,
      marginBottom: "1rem",
    },
    metaItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
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
    statItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
    },

    // ─── Sidebar ───
    sidebar: {
      display: "flex",
      flexDirection: "column",
      gap: "1.75rem",
    },
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
      borderBottom: `2px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(199, 125, 66, 0.12)"
      }`,
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
    },
    categoryIcon: {
      marginRight: "0.55rem",
      fontSize: "0.8rem",
      opacity: 0.85,
    },
    categoryCount: {
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(62, 39, 35, 0.05)",
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
        : "rgba(62, 39, 35, 0.05)",
      color: T.textMuted,
      borderRadius: "50px",
      fontSize: "0.78rem",
      fontWeight: "600",
      textDecoration: "none",
      cursor: "pointer",
    },
    newsletterForm: { display: "flex", flexDirection: "column", gap: "0.75rem" },
    newsletterInput: {
      padding: "0.75rem 1rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      border: `1px solid ${T.border}`,
      borderRadius: "12px",
      color: T.text,
      fontSize: "0.9rem",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      fontFamily: "inherit",
    },
    newsletterButton: {
      padding: "0.75rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "0.9rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 8px 22px rgba(245, 52, 107, 0.3)",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
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
  };

  const getCategoryIcon = (categoryName) => {
    const found = categories.find((c) => c.name === categoryName);
    return found ? found.icon : <FaNewspaper />;
  };

  return (
    <div style={themeStyles.container}>
      {/* Hero Section — search removed */}
      <section style={themeStyles.hero}>
        <div style={themeStyles.heroOrb1} />
        <div style={themeStyles.heroOrb2} />
        <div style={themeStyles.heroContent}>
          <h1 style={themeStyles.heroTitle}>
            The ASudha Beauty Blog
            <span style={themeStyles.heroTitleAccent} aria-hidden="true" />
          </h1>
          <p style={themeStyles.heroText}>
            Discover the ancient secrets of Ayurveda, explore the benefits of
            100% natural herbs, and learn how to incorporate pure beauty rituals
            into your daily life.
          </p>
        </div>
      </section>

      {/* Featured Section */}
      {featuredPosts.length > 0 && currentFeatured && (
        <section style={themeStyles.featuredSection}>
          <div style={themeStyles.sectionHeader}>
            <h2 style={themeStyles.sectionTitle}>Featured Articles</h2>
            <Link
              to="/blog/all"
              style={themeStyles.viewAllLink}
              className="view-all-link"
            >
              View All <FaArrowRight style={{ fontSize: "0.8rem" }} />
            </Link>
          </div>

          <div style={themeStyles.featuredCard}>
            <div style={themeStyles.featuredImageWrap}>
              <img
                key={currentFeatured.id}
                src={currentFeatured.image}
                alt={currentFeatured.title}
                style={themeStyles.featuredImage}
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
                <FaSpa style={{ fontSize: "0.6rem" }} />{" "}
                {currentFeatured.category}
              </span>
              <h3 style={themeStyles.featuredTitle}>
                {currentFeatured.title}
              </h3>
              <p style={themeStyles.featuredExcerpt}>
                {currentFeatured.excerpt}
              </p>

              <div style={themeStyles.featuredMeta}>
                <span style={themeStyles.featuredMetaItem}>
                  <FaUser style={{ fontSize: "0.7rem" }} />{" "}
                  {currentFeatured.author}
                </span>
                <span style={themeStyles.featuredMetaItem}>
                  <FaClock style={{ fontSize: "0.7rem" }} />{" "}
                  {currentFeatured.readTime}
                </span>
                <span style={themeStyles.featuredMetaItem}>
                  <FaComment style={{ fontSize: "0.7rem" }} />{" "}
                  {currentFeatured.comments}
                </span>
              </div>

              <Link
                to={`/blog/${currentFeatured.id}`}
                style={themeStyles.featuredButton}
                className="featured-btn"
              >
                Read Article <FaArrowRight />
              </Link>
            </div>
          </div>

          <div style={themeStyles.featuredControls}>
            <div style={themeStyles.carouselDots}>
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  style={{
                    ...themeStyles.carouselDot,
                    ...(featuredIndex === index &&
                      themeStyles.carouselDotActive),
                  }}
                  onClick={() => setFeaturedIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <div style={themeStyles.carouselControls}>
              <button
                style={themeStyles.carouselButton}
                className="carousel-btn"
                onClick={() =>
                  setFeaturedIndex(
                    (prev) =>
                      (prev - 1 + featuredPosts.length) % featuredPosts.length
                  )
                }
                aria-label="Previous slide"
              >
                <FaChevronLeft />
              </button>
              <button
                style={themeStyles.carouselButton}
                className="carousel-btn"
                onClick={() =>
                  setFeaturedIndex(
                    (prev) => (prev + 1) % featuredPosts.length
                  )
                }
                aria-label="Next slide"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div style={themeStyles.mainContent}>
        <div>
          {currentPosts.length > 0 ? (
            <div style={themeStyles.blogGrid}>
              {currentPosts.map((post) => (
                <article
                  key={post.id}
                  style={themeStyles.blogCard}
                  className="blog-card"
                >
                  <div style={themeStyles.blogImageContainer}>
                    <img
                      src={post.image}
                      alt={post.title}
                      style={themeStyles.blogImage}
                      className="blog-image"
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
                    <p style={themeStyles.blogExcerpt}>{post.excerpt}</p>
                    <div style={themeStyles.blogMeta}>
                      <span style={themeStyles.metaItem}>
                        <FaUser /> {post.author}
                      </span>
                      <span style={themeStyles.metaItem}>
                        <FaClock /> {post.readTime}
                      </span>
                      <span style={themeStyles.metaItem}>
                        <FaComment /> {post.comments}
                      </span>
                    </div>
                    <div style={themeStyles.blogFooter}>
                      <Link
                        to={`/blog/${post.id}`}
                        style={themeStyles.readMoreButton}
                        className="read-more-btn"
                      >
                        Read More{" "}
                        <FaArrowRight style={{ fontSize: "0.7rem" }} />
                      </Link>
                      <div style={themeStyles.postStats}>
                        <span style={themeStyles.statItem}>
                          <FaEye /> {post.views}
                        </span>
                        <span style={themeStyles.statItem}>
                          <FaHeart /> {post.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
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
                style={{
                  fontSize: "3rem",
                  opacity: 0.3,
                  marginBottom: "1rem",
                }}
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
            <div style={themeStyles.pagination}>
              <button
                style={themeStyles.pageButton}
                className="page-btn"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(1, prev - 1))
                }
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  style={{
                    ...themeStyles.pageButton,
                    ...(currentPage === i + 1 && themeStyles.activePage),
                  }}
                  className="page-btn"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                style={themeStyles.pageButton}
                className="page-btn"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={themeStyles.sidebar}>
          <div style={themeStyles.sidebarWidget}>
            <h3 style={themeStyles.widgetTitle}>Explore Categories</h3>
            <ul style={themeStyles.categoryList}>
              {categories.map((category) => (
                <li key={category.name} style={themeStyles.categoryItem}>
                  <div
                    style={{
                      ...themeStyles.categoryLink,
                      ...(selectedCategory === category.name && {
                        color: isDarkMode
                          ? brandColors.gold
                          : brandColors.bronze,
                        backgroundColor: isDarkMode
                          ? "rgba(212, 175, 55, 0.1)"
                          : "rgba(199, 125, 66, 0.06)",
                      }),
                    }}
                    className="category-link"
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setCurrentPage(1);
                    }}
                  >
                    <span>
                      <span style={themeStyles.categoryIcon}>
                        {category.icon}
                      </span>
                      {category.name === "all" ? "All Articles" : category.name}
                    </span>
                    <span style={themeStyles.categoryCount}>
                      {category.count}
                    </span>
                  </div>
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
                    alt={post.title}
                    style={themeStyles.popularImage}
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
                      <FaCalendarAlt style={{ fontSize: "0.6rem" }} />{" "}
                      {post.date}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div style={themeStyles.sidebarWidget}>
            <h3 style={themeStyles.widgetTitle}>Popular Herbs & Topics</h3>
            <div style={themeStyles.tagCloud}>
              {allTags.slice(0, 12).map((tag) => (
                <span
                  key={tag}
                  style={themeStyles.tag}
                  className="tag"
                  onClick={() => setSearchTerm(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;