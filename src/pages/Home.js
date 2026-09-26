import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaUserCircle,
  FaLeaf,
  FaTruck,
  FaShieldAlt,
  FaHeart,
  FaRegSnowflake,
} from "react-icons/fa";

const Home = () => {
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();

  const valuesSectionRef = useRef(null);
  const categoriesSectionRef = useRef(null);
  const productsSectionRef = useRef(null);
  const testimonialsSectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState({
    values: false,
    categories: false,
    products: false,
    testimonials: false,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTestimonialAutoPlaying, setIsTestimonialAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [testimonialTouchStart, setTestimonialTouchStart] = useState(0);
  const [testimonialTouchEnd, setTestimonialTouchEnd] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imageErrors, setImageErrors] = useState({});

  const brandColors = {
    primary: "#f5346b",
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    black: "#0f0f0f",
    darkSlate: "#1a1a1a",
    earthLight: "#6d4c41",
    earthDark: "#3e2723",
    cream: "#fcf8f5",
    green: "#4caf50",
  };

  // ─── Intersection Observer ──────────────────────────────────────
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setIsVisible((prev) => ({ ...prev, [id]: true }));
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = [
      { ref: valuesSectionRef, id: "values" },
      { ref: categoriesSectionRef, id: "categories" },
      { ref: productsSectionRef, id: "products" },
      { ref: testimonialsSectionRef, id: "testimonials" },
    ];
    sections.forEach((section) => {
      if (section.ref.current) {
        section.ref.current.id = section.id;
        observer.observe(section.ref.current);
      }
    });
    return () => observer.disconnect();
  }, []);

  // ─── Global CSS ─────────────────────────────────────────────────
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; }
      html, body, #root { overflow-x: hidden; max-width: 100%; }

      /* ─── Animations ─── */
      @keyframes meshMove {
        0%   { transform: translate(0, 0) scale(1); }
        50%  { transform: translate(40px, -30px) scale(1.08); }
        100% { transform: translate(0, 0) scale(1); }
      }
      @keyframes meshMoveAlt {
        0%   { transform: translate(0, 0) scale(1); }
        50%  { transform: translate(-50px, 40px) scale(1.1); }
        100% { transform: translate(0, 0) scale(1); }
      }
      @keyframes meshDrift {
        0%   { transform: translate(0, 0) scale(1) rotate(0deg); }
        33%  { transform: translate(30px, 40px) scale(1.05) rotate(120deg); }
        66%  { transform: translate(-20px, -30px) scale(1.1) rotate(240deg); }
        100% { transform: translate(0, 0) scale(1) rotate(360deg); }
      }
      @keyframes meshPulse {
        0%, 100% { opacity: var(--base-opacity); transform: scale(1); }
        50%      { opacity: calc(var(--base-opacity) * 1.5); transform: scale(1.08); }
      }
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50%      { background-position: 100% 50%; }
      }
      @keyframes shineSweep {
        0%   { left: -120%; }
        100% { left: 120%; }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.94); }
        to   { opacity: 1; transform: scale(1); }
      }
      @keyframes leafSpin {
        0%   { transform: rotate(0deg) scale(1); }
        50%  { transform: rotate(8deg) scale(1.08); }
        100% { transform: rotate(0deg) scale(1); }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.15; }
        50%      { opacity: 0.45; }
      }

      /* ─── Aurora mesh background layers ─── */
      .hm-bg {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }

      /* Layer 1: Base gradient overlay */
      .hm-bg::before {
        content: "";
        position: absolute;
        inset: 0;
        background: ${isDarkMode
          ? `radial-gradient(ellipse at 20% 0%, rgba(245, 52, 107, 0.08) 0%, transparent 50%),
             radial-gradient(ellipse at 80% 30%, rgba(212, 175, 55, 0.06) 0%, transparent 50%),
             radial-gradient(ellipse at 50% 100%, rgba(76, 175, 80, 0.05) 0%, transparent 60%)`
          : `radial-gradient(ellipse at 20% 0%, rgba(245, 52, 107, 0.06) 0%, transparent 50%),
             radial-gradient(ellipse at 80% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
             radial-gradient(ellipse at 50% 100%, rgba(76, 175, 80, 0.06) 0%, transparent 60%)`};
      }

      /* Layer 2: Dot grid pattern */
      .hm-bg::after {
        content: "";
        position: absolute;
        inset: 0;
        background-image: radial-gradient(
          circle,
          ${isDarkMode ? "rgba(212, 175, 55, 0.10)" : "rgba(62, 39, 35, 0.08)"} 1px,
          transparent 1px
        );
        background-size: 28px 28px;
        opacity: ${isDarkMode ? 0.35 : 0.5};
        mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
        -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%);
      }

      .hm-mesh {
        position: absolute;
        border-radius: 50%;
        filter: blur(110px);
        pointer-events: none;
      }

      .hm-mesh-1 {
        top: -180px; left: -180px;
        width: 560px; height: 560px;
        background: radial-gradient(circle, #f5346b 0%, transparent 70%);
        --base-opacity: ${isDarkMode ? 0.28 : 0.18};
        opacity: var(--base-opacity);
        animation: meshMove 18s ease-in-out infinite;
      }
      .hm-mesh-2 {
        top: 18%; right: -200px;
        width: 600px; height: 600px;
        background: radial-gradient(circle, #f7d794 0%, transparent 70%);
        --base-opacity: ${isDarkMode ? 0.22 : 0.16};
        opacity: var(--base-opacity);
        animation: meshMoveAlt 22s ease-in-out infinite;
      }
      .hm-mesh-3 {
        bottom: -200px; left: 25%;
        width: 540px; height: 540px;
        background: radial-gradient(circle, #4caf50 0%, transparent 70%);
        --base-opacity: ${isDarkMode ? 0.18 : 0.12};
        opacity: var(--base-opacity);
        animation: meshMove 26s ease-in-out infinite;
      }
      .hm-mesh-4 {
        top: 45%; left: -160px;
        width: 480px; height: 480px;
        background: radial-gradient(circle, #c77d42 0%, transparent 70%);
        --base-opacity: ${isDarkMode ? 0.20 : 0.14};
        opacity: var(--base-opacity);
        animation: meshDrift 30s ease-in-out infinite;
      }
      .hm-mesh-5 {
        top: 65%; right: 10%;
        width: 420px; height: 420px;
        background: radial-gradient(circle, #b388ff 0%, transparent 70%);
        --base-opacity: ${isDarkMode ? 0.16 : 0.10};
        opacity: var(--base-opacity);
        animation: meshPulse 12s ease-in-out infinite;
      }

      /* Twinkling light dots */
      .hm-sparkle {
        position: absolute;
        width: 3px; height: 3px;
        border-radius: 50%;
        background: ${isDarkMode ? "#f7d794" : "#c77d42"};
        animation: twinkle 4s ease-in-out infinite;
        pointer-events: none;
      }
      .hm-sparkle-1 { top: 15%; left: 10%; animation-delay: 0s; }
      .hm-sparkle-2 { top: 40%; right: 15%; animation-delay: 1.2s; }
      .hm-sparkle-3 { top: 70%; left: 20%; animation-delay: 2.4s; }
      .hm-sparkle-4 { top: 25%; right: 30%; animation-delay: 3.6s; }
      .hm-sparkle-5 { top: 85%; right: 40%; animation-delay: 0.8s; }
      .hm-sparkle-6 { top: 55%; left: 45%; animation-delay: 2s; }

      /* ─── Buttons ─── */
      .primary-btn {
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 1;
      }
      .primary-btn::after {
        content: "";
        position: absolute;
        top: 0; left: -120%;
        width: 60%; height: 100%;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
        transform: skewX(-20deg);
        z-index: -1;
      }
      .primary-btn:hover {
        transform: translateY(-3px) scale(1.03);
      }
      .primary-btn:hover::after {
        animation: shineSweep 0.9s ease forwards;
      }

      .secondary-btn {
        position: relative;
        overflow: hidden;
        z-index: 1;
        transition: color 0.4s ease, border-color 0.4s ease, transform 0.3s ease;
      }
      .secondary-btn::before {
        content: "";
        position: absolute;
        top: 0; left: 0;
        width: 0%; height: 100%;
        background: linear-gradient(135deg, #f7d794 0%, #f5346b 100%);
        transition: width 0.4s ease;
        z-index: -1;
      }
      .secondary-btn:hover {
        color: #ffffff !important;
        border-color: transparent !important;
        transform: translateY(-2px);
      }
      .secondary-btn:hover::before { width: 100%; }

      /* ─── Value cards ─── */
      .value-item-link, .product-item { height: 100%; display: block; }
      .value-item {
        height: 100%;
        display: flex; flex-direction: column;
        align-items: flex-start; justify-content: center;
        border: 1px solid transparent;
        transition: all 0.4s ease;
        position: relative; overflow: hidden;
      }
      .value-item::after {
        content: "";
        position: absolute;
        top: 0; left: -100%;
        width: 100%; height: 100%;
        background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%);
        transition: left 0.7s ease;
        pointer-events: none;
      }
      .value-item:hover::after { left: 100%; }
      .value-item:hover {
        transform: translateY(-8px);
        border-color: rgba(212, 175, 55, 0.5) !important;
      }
      .value-item:hover .value-icon {
        transform: rotate(-6deg) scale(1.12);
      }
      .value-icon {
        width: 52px; height: 52px;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.55rem; border-radius: 14px; margin-bottom: 14px;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      /* ─── Category cards ─── */
      .category-item {
        position: relative;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .category-item .category-img {
        transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .category-item:hover .category-img {
        transform: scale(1.09);
      }
      .category-item:hover {
        transform: translateY(-6px);
      }

      /* ─── Product 3D tilt ─── */
      .product-item { perspective: 1000px; }
      .product-item > div {
        height: 100%; width: 100%;
        display: flex; flex-direction: column;
        border-radius: 16px; overflow: hidden;
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .product-item:hover > div {
        transform: translateY(-8px) rotateX(3deg);
      }

      /* ─── Feature badge ─── */
      .feature-badge { transition: all 0.35s ease; }
      .feature-badge:hover {
        transform: translateY(-3px);
        border-color: rgba(245, 52, 107, 0.4) !important;
        box-shadow: 0 8px 24px rgba(245, 52, 107, 0.15);
      }

      /* ─── Testimonial avatar ring ─── */
      .testi-avatar { transition: all 0.4s ease; }
      .testi-avatar:hover {
        transform: scale(1.06);
        box-shadow: 0 0 0 6px rgba(245, 52, 107, 0.12);
      }

      /* ─── CTA banner ─── */
      .cta-banner { position: relative; overflow: hidden; }
      .cta-banner::before {
        content: "";
        position: absolute;
        top: -50%; left: -50%;
        width: 200%; height: 200%;
        background: radial-gradient(circle at 30% 30%, rgba(247,215,148,0.15), transparent 60%),
                    radial-gradient(circle at 70% 70%, rgba(245,52,107,0.12), transparent 60%);
        animation: meshMove 20s ease-in-out infinite;
        pointer-events: none;
      }
      .cta-leaf {
        animation: leafSpin 4s ease-in-out infinite;
        display: inline-block;
      }

      .fade-up { opacity: 0; animation: fadeInUp 0.8s ease forwards; }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [isDarkMode]);

  const sliderImages = [
    {
      url: "/assets/images/home/MultaniMitti_Hero.jpeg",
      alt: "Multani Mitti Powder",
      title: "Multani Mitti",
      subtitle: "Deep Cleansing & Oil Control",
      link: "/product/11001",
    },
    {
      url: "/assets/images/home/UbtanPowder_Hero.jpeg",
      alt: "Ubtan Powder",
      title: "Ubtan Powder",
      subtitle: "Traditional Glow & Radiance",
      link: "/product/11002",
    },
    {
      url: "/assets/images/home/AmlaPowder_Hero.jpeg",
      alt: "Amla Powder",
      title: "Amla Powder",
      subtitle: "Stronger, Shinier Hair",
      link: "/product/12001",
    },
    {
      url: "/assets/images/home/ReethaPowder_Hero.jpeg",
      alt: "Reetha Powder",
      title: "Reetha Powder",
      subtitle: "Natural Hair Cleanser",
      link: "/product/12002",
    },
    {
      url: "/assets/images/home/ShikakaiPowder_Hero.jpeg",
      alt: "Shikakai Powder",
      title: "Shikakai Powder",
      subtitle: "Soft Silky & Shiny Hair",
      link: "/product/12003",
    },
    {
      url: "/assets/images/home/HerbalMix_Hero.jpeg",
      alt: "Herbal Mix",
      title: "Herbal Mix",
      subtitle: "Complete Hair Care Pack",
      link: "/product/12004",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Beauty Enthusiast",
      avatar: "/assets/images/team/priya.jpg",
      content:
        "The Multani Mitti powder from ASudha Beauty is 100% natural and effective! It deeply cleanses my skin, controls oil, and gives me a natural glow. Pure Ayurvedic goodness!",
      rating: 5,
      date: "March 2026",
      productLink: "/product/11001",
      productName: "Multani Mitti",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Makeup Artist",
      avatar: "/assets/images/team/michael.jpg",
      content:
        "The Ubtan powder is amazing! Made with traditional ingredients, it nourishes and revitalizes my skin. Chemical-free, paraben-free, and suitable for all skin types.",
      rating: 5,
      date: "February 2026",
      productLink: "/product/11002",
      productName: "Ubtan Powder",
    },
    {
      id: 3,
      name: "Anita Desai",
      role: "Skincare Specialist",
      avatar: "/assets/images/team/priya.jpg",
      content:
        "ASudha Beauty's Amla powder is a game-changer for my hair! It strengthens my roots, adds natural shine, and reduces hair fall. 100% natural and chemical-free.",
      rating: 5,
      date: "January 2026",
      productLink: "/product/12001",
      productName: "Amla Powder",
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Customer",
      avatar: "/assets/images/team/david.jpg",
      content:
        "The Herbal Mix Hair Pack is incredible! A unique blend of Bhringraj, Amla, Shikakai, and Hibiscus. My hair feels stronger, softer, and silkier after just 3 uses.",
      rating: 5,
      date: "June 2026",
      productLink: "/product/12004",
      productName: "Herbal Mix",
    },
    {
      id: 5,
      name: "Neha Gupta",
      role: "Beauty Blogger",
      avatar: "/assets/images/team/sarah.jpg",
      content:
        "I love ASudha Beauty's Reetha and Shikakai powders! They gently cleanse my hair without harsh chemicals. My hair is now soft, shiny, and naturally healthy.",
      rating: 5,
      date: "July 2026",
      productLink: "/product/12002",
      productName: "Reetha & Shikakai",
    },
  ];

  const categories = [
    {
      name: "Skincare",
      image: "/assets/images/categories/skincare.png",
      productCount: 2,
      color: "#A8E6CF",
      link: "/shop?category=Skincare",
      description: "Multani Mitti & Ubtan",
    },
    {
      name: "Hair Care",
      image: "/assets/images/categories/haircare.png",
      productCount: 4,
      color: "#D4A5F0",
      link: "/shop?category=Hair Care",
      description: "Amla, Reetha & Shikakai",
    },
  ];

  const allProducts = products;
  const explicitBestSellers = allProducts.filter((p) => p.bestSeller === true);
  const bestSellingProducts =
    explicitBestSellers.length > 0
      ? explicitBestSellers.slice(0, 8)
      : allProducts.slice(0, 4);

  const values = [
    {
      icon: "🌿",
      title: "100% Natural",
      description: "Pure, natural, and effective products. No chemicals, no parabens.",
      color: brandColors.green,
      link: "/about",
    },
    {
      icon: "✨",
      title: "Ayurvedic Care",
      description: "Rooted in ancient Indian wellness, trusted for generations.",
      color: brandColors.gold,
      link: "/about",
    },
    {
      icon: "🌱",
      title: "Cruelty Free",
      description: "Ethical, sustainable, and kind to both people and the planet.",
      color: brandColors.primary,
      link: "/about",
    },
    {
      icon: "💧",
      title: "Deep Cleansing",
      description: "Removes excess oil and impurities for clear, healthy skin.",
      color: "#87CEEB",
      link: "/about",
    },
    {
      icon: "🌟",
      title: "Natural Glow",
      description: "Makes your skin glow naturally with every use.",
      color: brandColors.primary,
      link: "/about",
    },
    {
      icon: "💪",
      title: "Chemical Free",
      description: "No harsh chemicals, no artificial fragrances—just pure nature.",
      color: "#C1E1C1",
      link: "/about",
    },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying)
      interval = setInterval(
        () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length),
        4000
      );
    return () => clearInterval(interval);
  }, [isAutoPlaying, sliderImages.length]);

  useEffect(() => {
    let interval;
    if (isTestimonialAutoPlaying)
      interval = setInterval(
        () => setTestimonialSlide((prev) => (prev + 1) % testimonials.length),
        5000
      );
    return () => clearInterval(interval);
  }, [isTestimonialAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextTestimonial = () => {
    setTestimonialSlide((prev) => (prev + 1) % testimonials.length);
    setIsTestimonialAutoPlaying(false);
    setTimeout(() => setIsTestimonialAutoPlaying(true), 8000);
  };
  const prevTestimonial = () => {
    setTestimonialSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsTestimonialAutoPlaying(false);
    setTimeout(() => setIsTestimonialAutoPlaying(true), 8000);
  };
  const goToTestimonial = (index) => {
    setTestimonialSlide(index);
    setIsTestimonialAutoPlaying(false);
    setTimeout(() => setIsTestimonialAutoPlaying(true), 8000);
  };

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleTestimonialTouchStart = (e) =>
    setTestimonialTouchStart(e.targetTouches[0].clientX);
  const handleTestimonialTouchMove = (e) =>
    setTestimonialTouchEnd(e.targetTouches[0].clientX);
  const handleTestimonialTouchEnd = () => {
    if (!testimonialTouchStart || !testimonialTouchEnd) return;
    const distance = testimonialTouchStart - testimonialTouchEnd;
    if (distance > 50) nextTestimonial();
    if (distance < -50) prevTestimonial();
    setTestimonialTouchStart(0);
    setTestimonialTouchEnd(0);
  };

  const handleImageError = (index) =>
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  const scrollToValues = (e) => {
    e.preventDefault();
    valuesSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth <= 768;
  const isSmallMobile = windowWidth <= 360;

  const getResponsiveStyles = () => {
    const base = {
      heroSectionGrid: "1fr 1fr",
      heroLeftPadding: "2rem",
      heroRightHeight: "540px",
      heroStatsFlexDirection: "row",
      heroStatsGap: "0.75rem",
      heroButtonsFlexDirection: "row",
      primaryButtonWidth: "auto",
      secondaryButtonWidth: "auto",
      valuesGridColumns: "repeat(3, 1fr)",
      categoriesGridColumns: "repeat(2, 1fr)",
      productsGridColumns: "repeat(4, 1fr)",
      heroSectionHeight: "550px",
      heroMinHeight: "550px",
      valuesGridGap: "1.5rem",
      valuesPadding: "1.5rem",
      heroLeftTextAlign: "left",
      heroLeftPaddingBottom: "0",
      heroBorderRadius: "28px",
      heroPadding: "1rem",
      slideBottom: "3.5rem",
      slideLeft: "2rem",
      slideRight: "2rem",
      slideTitleSize: "1.5rem",
      slideSubtitleSize: "0.82rem",
      slideShopLinkSize: "0.72rem",
      slideShopLinkPadding: "0.28rem 0.95rem",
      controlBottom: "0.8rem",
      dotsBottom: "0.8rem",
      gradientHeight: "42%",
      statNumberSize: "1.15rem",
      statLabelSize: "0.6rem",
      statPadding: "0.45rem 0.85rem",
      heroTitleSize: "2.8rem",
      heroSubtitleSize: "0.92rem",
      featureBadgeGap: "0.6rem",
      featureBadgePadding: "0.45rem 1rem",
      featureBadgeFontSize: "0.78rem",
      sectionTitleSize: "1.75rem",
      productGap: "1rem",
      sliderImageFit: "cover",
      sliderImagePosition: "center 30%",
      heroRightBg: isDarkMode ? "#0f0f0f" : "#f5f0eb",
    };

    if (isSmallMobile) {
      return {
        ...base,
        heroSectionGrid: "1fr",
        heroLeftPadding: "1.25rem",
        heroRightHeight: "260px",
        heroStatsFlexDirection: "row",
        heroStatsGap: "0.3rem",
        heroButtonsFlexDirection: "column",
        primaryButtonWidth: "100%",
        secondaryButtonWidth: "100%",
        valuesGridColumns: "1fr",
        categoriesGridColumns: "1fr",
        productsGridColumns: "1fr",
        heroSectionHeight: "auto",
        heroMinHeight: "auto",
        heroLeftTextAlign: "center",
        heroLeftPaddingBottom: "1rem",
        heroBorderRadius: "18px",
        heroPadding: "0.5rem",
        slideBottom: "1.5rem",
        slideLeft: "0.6rem",
        slideRight: "0.6rem",
        slideTitleSize: "0.85rem",
        slideSubtitleSize: "0.55rem",
        slideShopLinkSize: "0.5rem",
        slideShopLinkPadding: "0.15rem 0.5rem",
        statNumberSize: "0.8rem",
        statLabelSize: "0.42rem",
        statPadding: "0.25rem 0.45rem",
        heroTitleSize: "1.5rem",
        heroSubtitleSize: "0.75rem",
        featureBadgeGap: "0.3rem",
        featureBadgePadding: "0.25rem 0.55rem",
        featureBadgeFontSize: "0.6rem",
        sectionTitleSize: "1.15rem",
        productGap: "0.6rem",
        sliderImageFit: "contain",
        sliderImagePosition: "center",
      };
    }
    if (isMobile) {
      return {
        ...base,
        heroSectionGrid: "1fr",
        heroLeftPadding: "1.5rem",
        heroRightHeight: "300px",
        heroStatsGap: "0.4rem",
        heroButtonsFlexDirection: "column",
        primaryButtonWidth: "100%",
        secondaryButtonWidth: "100%",
        valuesGridColumns: "1fr",
        categoriesGridColumns: "repeat(2, 1fr)",
        productsGridColumns: "1fr",
        heroSectionHeight: "auto",
        heroMinHeight: "auto",
        heroLeftTextAlign: "center",
        heroLeftPaddingBottom: "1rem",
        heroBorderRadius: "20px",
        heroPadding: "0.75rem",
        slideBottom: "1.8rem",
        slideLeft: "0.8rem",
        slideRight: "0.8rem",
        slideTitleSize: "0.95rem",
        slideSubtitleSize: "0.62rem",
        slideShopLinkSize: "0.55rem",
        slideShopLinkPadding: "0.2rem 0.7rem",
        statNumberSize: "0.9rem",
        statLabelSize: "0.5rem",
        statPadding: "0.3rem 0.6rem",
        heroTitleSize: "1.7rem",
        heroSubtitleSize: "0.82rem",
        featureBadgeGap: "0.4rem",
        featureBadgePadding: "0.28rem 0.65rem",
        featureBadgeFontSize: "0.68rem",
        sectionTitleSize: "1.35rem",
        productGap: "0.75rem",
        sliderImageFit: "contain",
        sliderImagePosition: "center",
      };
    }
    if (isTablet) {
      return {
        ...base,
        heroLeftPadding: "2rem",
        heroRightHeight: "420px",
        valuesGridColumns: "repeat(2, 1fr)",
        productsGridColumns: "repeat(2, 1fr)",
        heroSectionHeight: "460px",
        heroMinHeight: "460px",
        slideBottom: "2.5rem",
        slideTitleSize: "1.15rem",
        slideSubtitleSize: "0.72rem",
        heroTitleSize: "2.2rem",
        heroSubtitleSize: "0.85rem",
        sectionTitleSize: "1.5rem",
        sliderImageFit: "contain",
        sliderImagePosition: "center",
      };
    }
    if (windowWidth <= 1100) {
      return {
        ...base,
        heroLeftPadding: "2.5rem",
        heroRightHeight: "560px",
        valuesGridColumns: "repeat(3, 1fr)",
        productsGridColumns: "repeat(3, 1fr)",
        heroSectionHeight: "620px",
        heroMinHeight: "620px",
        slideBottom: "3rem",
        slideTitleSize: "1.4rem",
        heroTitleSize: "2.4rem",
        sectionTitleSize: "1.6rem",
        sliderImageFit: "contain",
        sliderImagePosition: "center",
      };
    }
    return base;
  };

  const responsive = getResponsiveStyles();

  const hyperlinkStyles = {
    featureBadges: {
      display: "flex",
      justifyContent: "center",
      gap: responsive.featureBadgeGap,
      marginTop: "2rem",
      marginBottom: "2rem",
      flexWrap: "wrap",
      padding: isMobile ? "0 0.75rem" : "0 1rem",
    },
    featureBadge: {
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
      padding: responsive.featureBadgePadding,
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderRadius: "50px",
      fontSize: responsive.featureBadgeFontSize,
      color: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
      textDecoration: "none",
      border: isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.08)"
        : "1px solid rgba(62, 39, 35, 0.06)",
    },
    featureBadgeIcon: {
      fontSize: isMobile ? "0.7rem" : "0.9rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
    },
    categoryDescription: {
      fontSize: "0.72rem",
      marginTop: "0.2rem",
      opacity: 0.9,
      color: "#ffffff",
    },
    valueItemLink: { textDecoration: "none", width: "100%", display: "block" },
    testimonialProductLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      marginTop: "0.75rem",
      padding: "0.4rem 1rem",
      background: "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontSize: "0.75rem",
      fontWeight: "700",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 14px rgba(245, 52, 107, 0.25)",
    },
  };

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      minHeight: "100vh",
      width: "100%",
      transition: "background-color 0.4s ease, color 0.4s ease",
      position: "relative",
      paddingTop: "0",
      boxSizing: "border-box",
      overflowX: "hidden",
    },

    bgWrapper: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      zIndex: 0,
      pointerEvents: "none",
    },

    heroWrapper: {
      padding: responsive.heroPadding,
      paddingTop: "0.5rem",
      position: "relative",
      zIndex: 1,
    },
    heroSection: {
      display: "grid",
      gridTemplateColumns: responsive.heroSectionGrid,
      height: responsive.heroSectionHeight,
      minHeight: responsive.heroMinHeight,
      position: "relative",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      borderRadius: responsive.heroBorderRadius,
      overflow: "hidden",
      margin: 0,
      boxShadow: isDarkMode
        ? "0 30px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(212, 175, 55, 0.08)"
        : "0 30px 80px rgba(62, 39, 35, 0.1), 0 0 0 1px rgba(212, 175, 55, 0.1)",
    },
    heroLeft: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems:
        responsive.heroLeftTextAlign === "center" ? "center" : "flex-start",
      textAlign: responsive.heroLeftTextAlign,
      padding: responsive.heroLeftPadding,
      paddingBottom: responsive.heroLeftPaddingBottom,
      backgroundColor: isDarkMode
        ? "rgba(15, 15, 15, 0.96)"
        : "rgba(252, 248, 245, 0.96)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      position: "relative",
      zIndex: 2,
      borderRadius: isTablet
        ? `${responsive.heroBorderRadius} ${responsive.heroBorderRadius} 0 0`
        : `${responsive.heroBorderRadius} 0 0 ${responsive.heroBorderRadius}`,
      borderRight: isTablet
        ? "none"
        : `1px solid ${
            isDarkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(62, 39, 35, 0.05)"
          }`,
      overflow: "hidden",
    },
    heroTitleContainer: {
      display: "flex",
      flexDirection: isTablet || isMobile ? "column" : "row",
      alignItems:
        responsive.heroLeftTextAlign === "center" ? "center" : "flex-start",
      marginBottom: "0.75rem",
      flexWrap: "wrap",
      lineHeight: "1.05",
    },
    heroTitlePart1: {
      fontSize: responsive.heroTitleSize,
      fontWeight: "900",
      lineHeight: "1.05",
      color: brandColors.primary,
      display: "inline-block",
      letterSpacing: "-0.02em",
    },
    heroTitlePart2: {
      fontSize: responsive.heroTitleSize,
      fontWeight: "900",
      lineHeight: "1.05",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      display: "inline-block",
      letterSpacing: "-0.02em",
    },
    heroTitlePart3: {
      fontSize: responsive.heroTitleSize,
      fontWeight: "900",
      lineHeight: "1.05",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      display: "inline-block",
      letterSpacing: "-0.02em",
    },
    heroSubtitle: {
      fontSize: responsive.heroSubtitleSize,
      color: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
      lineHeight: "1.65",
      marginBottom: "1rem",
      maxWidth: isTablet ? "100%" : "480px",
      animation: "fadeInUp 0.8s ease 0.2s both",
    },
    heroStats: {
      display: "flex",
      flexDirection: responsive.heroStatsFlexDirection,
      gap: responsive.heroStatsGap,
      marginBottom: "1.25rem",
      justifyContent:
        responsive.heroLeftTextAlign === "center" ? "center" : "flex-start",
      flexWrap: "wrap",
      animation: "fadeInUp 0.8s ease 0.4s both",
    },
    statItem: {
      textAlign: "left",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.04)"
        : "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      padding: responsive.statPadding,
      borderRadius: "14px",
      border: isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.08)"
        : "1px solid rgba(62, 39, 35, 0.06)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "default",
      minWidth: "fit-content",
    },
    statNumber: {
      fontSize: responsive.statNumberSize,
      fontWeight: "900",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      lineHeight: "1",
      letterSpacing: "-0.02em",
    },
    statLabel: {
      fontSize: responsive.statLabelSize,
      color: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginTop: "0.2rem",
      fontWeight: "600",
    },
    heroButtons: {
      display: "flex",
      flexDirection: responsive.heroButtonsFlexDirection,
      gap: "0.6rem",
      flexWrap: "wrap",
      justifyContent:
        responsive.heroLeftTextAlign === "center" ? "center" : "flex-start",
      animation: "fadeInUp 0.8s ease 0.6s both",
    },
    primaryButton: {
      padding: isMobile ? "0.7rem 1.4rem" : "0.85rem 1.85rem",
      background: "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "0.8rem" : "0.92rem",
      fontWeight: "700",
      border: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.4rem",
      width: responsive.primaryButtonWidth,
      cursor: "pointer",
      boxShadow: "0 10px 30px rgba(245, 52, 107, 0.35)",
      fontFamily: "inherit",
    },
    secondaryButton: {
      padding: isMobile ? "0.7rem 1.4rem" : "0.85rem 1.85rem",
      backgroundColor: "transparent",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      textDecoration: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "0.8rem" : "0.92rem",
      fontWeight: "600",
      border: `2px solid ${
        isDarkMode ? "rgba(255, 255, 255, 0.18)" : "rgba(62, 39, 35, 0.12)"
      }`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.4rem",
      width: responsive.secondaryButtonWidth,
      cursor: "pointer",
      fontFamily: "inherit",
    },

    heroRight: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: responsive.heroRightBg,
      height: responsive.heroRightHeight,
      borderRadius: isTablet
        ? `0 0 ${responsive.heroBorderRadius} ${responsive.heroBorderRadius}`
        : `0 ${responsive.heroBorderRadius} ${responsive.heroBorderRadius} 0`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: isTablet ? "0" : "1.25rem",
    },
    sliderFrame: {
      position: "relative",
      width: "100%",
      height: "100%",
      borderRadius: isTablet ? "0" : "20px",
      overflow: "hidden",
      boxShadow: isTablet
        ? "none"
        : isDarkMode
        ? "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(212, 175, 55, 0.15)"
        : "0 20px 50px rgba(62, 39, 35, 0.12), 0 0 0 1px rgba(212, 175, 55, 0.15)",
    },
    sliderContainer: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    sliderTrack: {
      display: "flex",
      transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      height: "100%",
      transform: `translateX(-${currentSlide * 100}%)`,
    },
    sliderSlide: {
      flex: "0 0 100%",
      height: "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: responsive.heroRightBg,
      overflow: "hidden",
    },
    sliderImageWrapper: {
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    sliderImage: {
      width: "100%",
      height: "100%",
      objectFit: responsive.sliderImageFit,
      objectPosition: responsive.sliderImagePosition,
      display: "block",
    },
    imageOverlay: {
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background:
        "linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.02) 100%)",
      pointerEvents: "none",
    },
    slideGradient: {
      position: "absolute",
      bottom: 0, left: 0, right: 0,
      height: responsive.gradientHeight,
      background:
        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
      pointerEvents: "none",
    },
    slideContent: {
      position: "absolute",
      bottom: responsive.slideBottom,
      left: responsive.slideLeft,
      right: responsive.slideRight,
      color: "#ffffff",
      zIndex: 2,
      textShadow: "0 2px 12px rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      animation: "fadeInUp 0.9s ease 0.3s both",
      gap: "0.5rem",
    },
    slideLeftContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    slideTitle: {
      fontSize: responsive.slideTitleSize,
      fontWeight: "800",
      marginBottom: "0.2rem",
      letterSpacing: "0.3px",
      lineHeight: "1.2",
    },
    slideSubtitle: {
      fontSize: responsive.slideSubtitleSize,
      opacity: 0.92,
      fontWeight: "500",
      letterSpacing: "0.3px",
      marginBottom: "0",
    },
    slideShopLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      padding: responsive.slideShopLinkPadding,
      background: "rgba(255,255,255,0.2)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: "50px",
      color: "#ffffff",
      textDecoration: "none",
      fontSize: responsive.slideShopLinkSize,
      fontWeight: "700",
      border: "1px solid rgba(255,255,255,0.35)",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
      marginLeft: isMobile ? "0.5rem" : "1rem",
    },
    sliderControls: {
      position: "absolute",
      bottom: responsive.controlBottom,
      left: "0.8rem",
      display: "flex",
      gap: "0.4rem",
      zIndex: 10,
    },
    controlButton: {
      width: isSmallMobile ? "26px" : isMobile ? "30px" : "36px",
      height: isSmallMobile ? "26px" : isMobile ? "30px" : "36px",
      borderRadius: "50%",
      backgroundColor: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.2)",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: isSmallMobile ? "0.45rem" : isMobile ? "0.55rem" : "0.75rem",
      fontFamily: "inherit",
    },
    dotsContainer: {
      position: "absolute",
      bottom: responsive.dotsBottom,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "0.3rem",
      zIndex: 10,
      backgroundColor: "rgba(0,0,0,0.4)",
      padding: isSmallMobile ? "0.2rem 0.35rem" : "0.25rem 0.6rem",
      borderRadius: "50px",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },
    dot: {
      width: isSmallMobile ? "5px" : isMobile ? "6px" : "8px",
      height: isSmallMobile ? "5px" : isMobile ? "6px" : "8px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.5)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      padding: 0,
      border: "none",
    },
    activeDot: {
      width: isSmallMobile ? "12px" : isMobile ? "14px" : "20px",
      borderRadius: "10px",
      backgroundColor: isDarkMode ? brandColors.gold : brandColors.primary,
    },
    playPauseButton: {
      position: "absolute",
      top: "0.6rem",
      right: "0.6rem",
      width: isSmallMobile ? "26px" : isMobile ? "30px" : "36px",
      height: isSmallMobile ? "26px" : isMobile ? "30px" : "36px",
      borderRadius: "50%",
      background: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.2)",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      zIndex: 10,
      fontSize: isSmallMobile ? "0.45rem" : isMobile ? "0.55rem" : "0.75rem",
      fontFamily: "inherit",
    },

    sectionTitleBlock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "1.75rem",
      opacity: 0,
      animation: "fadeInDown 0.8s ease 0.1s forwards",
    },
    sectionTitle: {
      fontSize: responsive.sectionTitleSize,
      textAlign: "center",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      fontWeight: "800",
      margin: 0,
      letterSpacing: "-0.01em",
    },
    sectionTitleUnderline: {
      width: "64px",
      height: "3px",
      borderRadius: "3px",
      background: "linear-gradient(90deg, #f7d794 0%, #f5346b 100%)",
      marginTop: "0.75rem",
    },

    valuesSection: {
      padding: isMobile ? "2rem 0.9rem" : "3rem 1.5rem",
      maxWidth: "1200px",
      margin: "0 auto",
      scrollMarginTop: "80px",
      opacity: isVisible.values ? 1 : 0,
      transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      zIndex: 1,
    },
    valuesHeader: { textAlign: "center", marginBottom: "1.5rem" },
    valuesTitle: {
      fontSize: responsive.sectionTitleSize,
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      marginBottom: "0.5rem",
      fontWeight: "800",
    },
    valuesSubtitle: {
      fontSize: isMobile ? "0.82rem" : "0.92rem",
      color: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
      textAlign: "center",
      margin: 0,
      lineHeight: "1.6",
    },
    valuesGrid: {
      display: "grid",
      gridTemplateColumns: responsive.valuesGridColumns,
      gap: responsive.valuesGridGap,
      marginTop: "1rem",
      alignItems: "stretch",
    },
    valueItem: {
      backgroundColor: isDarkMode ? brandColors.darkSlate : "#ffffff",
      borderRadius: "18px",
      padding: responsive.valuesPadding,
      boxShadow: isDarkMode
        ? "0 8px 24px rgba(0, 0, 0, 0.5)"
        : "0 8px 24px rgba(62, 39, 35, 0.05)",
      transition: "all 0.4s ease",
      border: isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.06)"
        : "1px solid rgba(62, 39, 35, 0.05)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      height: "100%",
    },
    valueIconContainer: {
      width: "52px",
      height: "52px",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "14px",
      fontSize: "1.55rem",
      transition: "all 0.4s ease",
    },
    valueTitle: {
      fontSize: isSmallMobile ? "0.9rem" : "1rem",
      fontWeight: "800",
      marginBottom: "0.25rem",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
    },
    valueTitleUnderline: {
      width: "22px",
      height: "2px",
      borderRadius: "2px",
      marginTop: "0.2rem",
      marginBottom: "0.3rem",
    },
    valueDescription: {
      fontSize: isSmallMobile ? "0.72rem" : "0.82rem",
      color: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
      lineHeight: "1.55",
      margin: 0,
    },

    categoriesSection: {
      padding: isMobile ? "2rem 0.9rem" : "3rem 1.5rem",
      maxWidth: "1200px",
      margin: "0 auto",
      opacity: isVisible.categories ? 1 : 0,
      transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s",
      position: "relative",
      zIndex: 1,
    },
    categoriesGrid: {
      display: "grid",
      gridTemplateColumns: responsive.categoriesGridColumns,
      gap: responsive.productGap,
      marginTop: "1rem",
    },
    categoryCard: {
      position: "relative",
      borderRadius: "20px",
      overflow: "hidden",
      cursor: "pointer",
      aspectRatio: "4/3",
      boxShadow: isDarkMode
        ? "0 10px 30px rgba(0, 0, 0, 0.5)"
        : "0 10px 30px rgba(62, 39, 35, 0.06)",
      border: isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.06)"
        : "1px solid rgba(62, 39, 35, 0.04)",
    },
    categoryImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    categoryOverlay: {
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background:
        "linear-gradient(to top, rgba(15, 15, 15, 0.92) 0%, rgba(15, 15, 15, 0.4) 55%, rgba(15, 15, 15, 0.05) 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "1.25rem",
      color: "#ffffff",
    },
    categoryName: {
      fontSize: isMobile ? "1rem" : "1.2rem",
      fontWeight: "800",
      marginBottom: "0.2rem",
      letterSpacing: "-0.01em",
    },
    categoryCount: {
      fontSize: isMobile ? "0.65rem" : "0.75rem",
      opacity: 0.9,
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      fontWeight: "600",
    },

    productsSection: {
      padding: isMobile ? "2rem 0.9rem" : "3rem 1.5rem",
      maxWidth: "1200px",
      margin: "0 auto",
      opacity: isVisible.products ? 1 : 0,
      transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
      position: "relative",
      zIndex: 1,
    },
    productsGrid: {
      display: "grid",
      gridTemplateColumns: responsive.productsGridColumns,
      gap: responsive.productGap,
      marginBottom: "1.5rem",
      alignItems: "stretch",
    },
    viewAllContainer: { textAlign: "center" },

    ctaSection: {
      padding: isMobile ? "2rem 0.9rem" : "3rem 1.5rem",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
    },
    ctaBanner: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "24px",
      padding: isSmallMobile
        ? "1.75rem 1.25rem"
        : isMobile
        ? "2rem 1.5rem"
        : "3rem 2rem",
      textAlign: "center",
      background: isDarkMode
        ? "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)"
        : "linear-gradient(135deg, #f7f0eb 0%, #fcf8f5 100%)",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.15)"
        : "1px solid rgba(62, 39, 35, 0.06)",
      boxShadow: isDarkMode
        ? "0 20px 50px rgba(0, 0, 0, 0.6)"
        : "0 20px 50px rgba(62, 39, 35, 0.08)",
    },
    ctaLeaf: {
      fontSize: isSmallMobile ? "2rem" : "2.5rem",
      color: brandColors.green,
      marginBottom: "0.75rem",
      display: "inline-block",
    },
    ctaTitle: {
      fontSize: isSmallMobile ? "1.15rem" : isMobile ? "1.35rem" : "1.65rem",
      marginBottom: "0.5rem",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      fontWeight: "800",
      letterSpacing: "-0.01em",
    },
    ctaText: {
      fontSize: isSmallMobile ? "0.8rem" : "0.95rem",
      color: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
      marginBottom: "1.25rem",
      lineHeight: "1.6",
      maxWidth: "600px",
      margin: "0 auto 1.25rem",
    },

    testimonialsSection: {
      padding: isMobile ? "2rem 0.9rem 3rem" : "3rem 1.5rem 4rem",
      maxWidth: "1200px",
      margin: "0 auto",
      opacity: isVisible.testimonials ? 1 : 0,
      transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.45s",
      position: "relative",
      zIndex: 1,
    },
    testimonialsContainer: {
      position: "relative",
      backgroundColor: isDarkMode ? brandColors.darkSlate : "#ffffff",
      borderRadius: "24px",
      padding: isMobile ? "1.5rem 1rem" : "2.5rem 2rem",
      overflow: "hidden",
      boxShadow: isDarkMode
        ? "0 20px 50px rgba(0, 0, 0, 0.5)"
        : "0 20px 50px rgba(62, 39, 35, 0.06)",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.12)"
        : "1px solid rgba(62, 39, 35, 0.05)",
    },
    testimonialsSlider: {
      position: "relative",
      width: "100%",
      overflow: "hidden",
    },
    testimonialsTrack: {
      display: "flex",
      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: `translateX(-${testimonialSlide * 100}%)`,
    },
    testimonialSlide: {
      flex: "0 0 100%",
      padding: isMobile ? "0.5rem" : "1rem",
      boxSizing: "border-box",
    },
    testimonialContent: {
      maxWidth: "680px",
      margin: "0 auto",
      textAlign: "center",
    },
    quoteIcon: {
      fontSize: isMobile ? "1.3rem" : "1.6rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      opacity: 0.35,
      marginBottom: "0.5rem",
    },
    testimonialText: {
      fontSize: isMobile ? "0.88rem" : "0.98rem",
      lineHeight: "1.7",
      color: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
      marginBottom: "0.75rem",
      fontStyle: "italic",
    },
    testimonialAvatar: {
      width: isMobile ? "56px" : "68px",
      height: isMobile ? "56px" : "68px",
      borderRadius: "50%",
      objectFit: "cover",
      margin: "0 auto 0.75rem",
      border: `3px solid ${isDarkMode ? brandColors.gold : brandColors.bronze}`,
      boxShadow: "0 8px 20px rgba(245, 52, 107, 0.2)",
    },
    testimonialAvatarFallback: {
      width: isMobile ? "56px" : "68px",
      height: isMobile ? "56px" : "68px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 0.75rem",
      fontSize: isMobile ? "1.4rem" : "1.7rem",
      color: "#ffffff",
      boxShadow: "0 8px 20px rgba(245, 52, 107, 0.25)",
    },
    testimonialName: {
      fontSize: isMobile ? "0.9rem" : "1rem",
      fontWeight: "800",
      marginBottom: "0.15rem",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
    },
    testimonialRole: {
      fontSize: isMobile ? "0.7rem" : "0.78rem",
      color: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
      marginBottom: "0.4rem",
    },
    testimonialRating: {
      display: "flex",
      justifyContent: "center",
      gap: "0.15rem",
      color: "#ffc107",
      marginBottom: "0.25rem",
    },
    testimonialDate: {
      fontSize: "0.72rem",
      color: isDarkMode ? "#8d7d76" : "#8d7d76",
    },
    testimonialControls: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "1rem",
    },
    testimonialControlButton: {
      width: isMobile ? "34px" : "38px",
      height: isMobile ? "34px" : "38px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.06)"
        : "rgba(62, 39, 35, 0.04)",
      backdropFilter: "blur(4px)",
      border: isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.08)"
        : "1px solid rgba(62, 39, 35, 0.06)",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: isMobile ? "0.6rem" : "0.75rem",
      fontFamily: "inherit",
    },
    testimonialDots: {
      display: "flex",
      justifyContent: "center",
      gap: "0.35rem",
      marginTop: "0.75rem",
    },
    testimonialDot: {
      width: isMobile ? "6px" : "7px",
      height: isMobile ? "6px" : "7px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(62, 39, 35, 0.12)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "none",
      padding: 0,
    },
    testimonialActiveDot: {
      width: isMobile ? "18px" : "22px",
      borderRadius: "10px",
      background: "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
    },
  };

  return (
    <div style={themeStyles.container}>
      {/* ─── Rich animated background ─────────────────────────────── */}
      <div style={themeStyles.bgWrapper} className="hm-bg">
        <div className="hm-mesh hm-mesh-1" />
        <div className="hm-mesh hm-mesh-2" />
        <div className="hm-mesh hm-mesh-3" />
        <div className="hm-mesh hm-mesh-4" />
        <div className="hm-mesh hm-mesh-5" />
        <div className="hm-sparkle hm-sparkle-1" />
        <div className="hm-sparkle hm-sparkle-2" />
        <div className="hm-sparkle hm-sparkle-3" />
        <div className="hm-sparkle hm-sparkle-4" />
        <div className="hm-sparkle hm-sparkle-5" />
        <div className="hm-sparkle hm-sparkle-6" />
      </div>

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <div style={themeStyles.heroWrapper}>
        <section style={themeStyles.heroSection}>
          <div style={themeStyles.heroLeft}>
            <div style={themeStyles.heroTitleContainer}>
              <span style={themeStyles.heroTitlePart1}>Pure.</span>
              <span style={themeStyles.heroTitlePart2}>&nbsp;Natural.</span>
              <span style={themeStyles.heroTitlePart3}>&nbsp;You.</span>
            </div>

            <p style={themeStyles.heroSubtitle}>
              Discover the power of 100% natural Ayurvedic powders. Deep
              cleansing, oil control, and natural radiance—trusted by nature,
              loved by you.
            </p>

            <div style={themeStyles.heroStats}>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statNumber}>6+</div>
                <div style={themeStyles.statLabel}>Herbal Powders</div>
              </div>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statNumber}>100%</div>
                <div style={themeStyles.statLabel}>Natural</div>
              </div>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statNumber}>100%</div>
                <div style={themeStyles.statLabel}>Cruelty Free</div>
              </div>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statNumber}>5000+</div>
                <div style={themeStyles.statLabel}>Happy Customers</div>
              </div>
            </div>

            <div style={themeStyles.heroButtons}>
              <Link
                to="/shop"
                style={themeStyles.primaryButton}
                className="primary-btn"
              >
                Shop Now <FaArrowRight />
              </Link>
              <button
                onClick={scrollToValues}
                style={themeStyles.secondaryButton}
                className="secondary-btn"
                type="button"
              >
                Learn More
              </button>
            </div>
          </div>

          <div style={themeStyles.heroRight}>
            <div style={themeStyles.sliderFrame}>
              <button
                style={themeStyles.playPauseButton}
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                aria-label={isAutoPlaying ? "Pause" : "Play"}
                type="button"
              >
                {isAutoPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <div style={themeStyles.sliderControls}>
                <button
                  style={themeStyles.controlButton}
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  type="button"
                >
                  <FaChevronLeft />
                </button>
                <button
                  style={themeStyles.controlButton}
                  onClick={nextSlide}
                  aria-label="Next slide"
                  type="button"
                >
                  <FaChevronRight />
                </button>
              </div>

              <div style={themeStyles.dotsContainer}>
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    style={{
                      ...themeStyles.dot,
                      ...(currentSlide === index ? themeStyles.activeDot : {}),
                    }}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    type="button"
                  />
                ))}
              </div>

              <div
                style={themeStyles.sliderContainer}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div style={themeStyles.sliderTrack}>
                  {sliderImages.map((image, index) => (
                    <div key={index} style={themeStyles.sliderSlide}>
                      {!imageErrors[index] ? (
                        <Link
                          to={image.link}
                          style={{
                            textDecoration: "none",
                            width: "100%",
                            height: "100%",
                            display: "block",
                          }}
                        >
                          <div style={themeStyles.sliderImageWrapper}>
                            <img
                              src={image.url}
                              alt={image.alt}
                              style={themeStyles.sliderImage}
                              loading={index === 0 ? "eager" : "lazy"}
                              onError={() => handleImageError(index)}
                            />
                            <div style={themeStyles.imageOverlay} />
                            <div style={themeStyles.slideGradient} />
                            <div style={themeStyles.slideContent}>
                              <div style={themeStyles.slideLeftContent}>
                                <h3 style={themeStyles.slideTitle}>
                                  {image.title}
                                </h3>
                                <p style={themeStyles.slideSubtitle}>
                                  {image.subtitle}
                                </p>
                              </div>
                              <span style={themeStyles.slideShopLink}>
                                Shop{" "}
                                <FaArrowRight style={{ fontSize: "0.55rem" }} />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isDarkMode
                              ? "#1a1a1a"
                              : "#f5f0eb",
                            color: isDarkMode
                              ? "#ffffff"
                              : brandColors.earthDark,
                            fontSize: "0.9rem",
                            textAlign: "center",
                            padding: "0.75rem",
                            flexDirection: "column",
                            gap: "0.5rem",
                          }}
                        >
                          <span style={{ fontSize: "2rem" }}>🌿</span>
                          {image.title}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ─── FEATURE BADGES ──────────────────────────────────────── */}
      <div style={{ ...hyperlinkStyles.featureBadges, position: "relative", zIndex: 1 }}>
        {[
          { icon: <FaTruck />, label: "Free Shipping ₹500+" },
          { icon: <FaShieldAlt />, label: "100% Natural" },
          { icon: <FaLeaf />, label: "Ayurvedic Care" },
          { icon: <FaHeart />, label: "Chemical Free" },
          { icon: <FaRegSnowflake />, label: "All Skin Types" },
        ].map((b, i) => (
          <div
            key={i}
            style={hyperlinkStyles.featureBadge}
            className="feature-badge fade-up"
          >
            <span style={hyperlinkStyles.featureBadgeIcon}>{b.icon}</span>
            <span>{b.label}</span>
          </div>
        ))}
      </div>

      {/* ─── VALUES ───────────────────────────────────────────────── */}
      <section ref={valuesSectionRef} style={themeStyles.valuesSection}>
        <div style={themeStyles.valuesHeader}>
          <h2 style={themeStyles.valuesTitle}>
            Pure Goodness. Ayurvedic Care.
          </h2>
          <p style={themeStyles.valuesSubtitle}>
            Trusted by nature, loved by you
          </p>
        </div>
        <div style={themeStyles.valuesGrid}>
          {values.map((value, index) => (
            <Link
              to={value.link}
              key={index}
              style={hyperlinkStyles.valueItemLink}
              className="value-item-link"
            >
              <div
                style={{
                  ...themeStyles.valueItem,
                  animationDelay: `${index * 0.06}s`,
                }}
                className="value-item"
              >
                <div
                  style={{
                    ...themeStyles.valueIconContainer,
                    backgroundColor: isDarkMode
                      ? `${value.color}25`
                      : `${value.color}18`,
                    color: value.color,
                  }}
                  className="value-icon"
                >
                  <span>{value.icon}</span>
                </div>
                <h3 style={themeStyles.valueTitle}>{value.title}</h3>
                <div
                  style={{
                    ...themeStyles.valueTitleUnderline,
                    backgroundColor: value.color,
                  }}
                />
                <p style={themeStyles.valueDescription}>{value.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────────── */}
      <section
        ref={categoriesSectionRef}
        style={themeStyles.categoriesSection}
      >
        <div style={themeStyles.sectionTitleBlock}>
          <h2 style={themeStyles.sectionTitle}>Shop By Category</h2>
          <div style={themeStyles.sectionTitleUnderline} />
        </div>
        <div style={themeStyles.categoriesGrid}>
          {categories.map((category, index) => (
            <Link
              to={category.link}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <div style={themeStyles.categoryCard} className="category-item">
                <img
                  src={category.image}
                  alt={category.name}
                  style={themeStyles.categoryImage}
                  className="category-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x300/fcf8f5/3e2723?text=" +
                      category.name;
                  }}
                />
                <div style={themeStyles.categoryOverlay}>
                  <h3 style={themeStyles.categoryName}>{category.name}</h3>
                  <p style={hyperlinkStyles.categoryDescription}>
                    {category.description}
                  </p>
                  <p style={themeStyles.categoryCount}>
                    <FaStar style={{ fontSize: "0.6rem" }} />{" "}
                    {category.productCount} Products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── BEST SELLERS ─────────────────────────────────────────── */}
      <section
        ref={productsSectionRef}
        style={themeStyles.productsSection}
      >
        <div style={themeStyles.sectionTitleBlock}>
          <h2 style={themeStyles.sectionTitle}>Best Sellers</h2>
          <div style={themeStyles.sectionTitleUnderline} />
        </div>
        {bestSellingProducts.length > 0 ? (
          <>
            <div style={themeStyles.productsGrid}>
              {bestSellingProducts.map((product, index) => (
                <div
                  key={product.id}
                  style={{
                    animationDelay: `${index * 0.05 + 0.1}s`,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                  className="product-item"
                >
                  <ProductCard
                    product={product}
                    onAddToCart={() =>
                      addToCart(
                        product,
                        Array.isArray(product.shades) &&
                          product.shades.length > 0
                          ? product.shades[0]
                          : "",
                        1
                      )
                    }
                    showBadge={true}
                    badgeText={
                      product.category === "Skincare" ||
                      product.category === "Hair Care"
                        ? "Natural"
                        : "Best Seller"
                    }
                  />
                </div>
              ))}
            </div>
            <div style={themeStyles.viewAllContainer}>
              <Link
                to="/shop?sort=best-selling"
                style={themeStyles.primaryButton}
                className="primary-btn"
              >
                View All <FaArrowRight />
              </Link>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "1.5rem" }}>
            <p>Loading products...</p>
          </div>
        )}
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────────── */}
      <section style={themeStyles.ctaSection}>
        <div style={themeStyles.ctaBanner} className="cta-banner">
          <FaLeaf style={themeStyles.ctaLeaf} className="cta-leaf" />
          <h3 style={themeStyles.ctaTitle}>100% Natural Ayurvedic Care</h3>
          <p style={themeStyles.ctaText}>
            Chemical Free • Paraben Free • Preservative Free • Suitable for All
            Skin & Hair Types
          </p>
          <Link
            to="/shop?category=Skincare"
            style={{ ...themeStyles.primaryButton, display: "inline-flex" }}
            className="primary-btn"
          >
            Explore Our Herbal Powders <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────── */}
      <section
        ref={testimonialsSectionRef}
        style={themeStyles.testimonialsSection}
      >
        <div style={themeStyles.sectionTitleBlock}>
          <h2 style={themeStyles.sectionTitle}>What Our Customers Say</h2>
          <div style={themeStyles.sectionTitleUnderline} />
        </div>
        <div style={themeStyles.testimonialsContainer}>
          <div style={themeStyles.testimonialsSlider}>
            <div
              style={themeStyles.testimonialsTrack}
              onTouchStart={handleTestimonialTouchStart}
              onTouchMove={handleTestimonialTouchMove}
              onTouchEnd={handleTestimonialTouchEnd}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} style={themeStyles.testimonialSlide}>
                  <div style={themeStyles.testimonialContent}>
                    <FaQuoteLeft style={themeStyles.quoteIcon} />
                    <p style={themeStyles.testimonialText}>
                      {testimonial.content}
                    </p>
                    <FaQuoteRight
                      style={{ ...themeStyles.quoteIcon, marginTop: "0.5rem" }}
                    />
                    {testimonial.avatar &&
                    !imageErrors[`avatar-${testimonial.id}`] ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        style={themeStyles.testimonialAvatar}
                        className="testi-avatar"
                        onError={() =>
                          handleImageError(`avatar-${testimonial.id}`)
                        }
                      />
                    ) : (
                      <div style={themeStyles.testimonialAvatarFallback}>
                        <FaUserCircle />
                      </div>
                    )}
                    <h3 style={themeStyles.testimonialName}>
                      {testimonial.name}
                    </h3>
                    <p style={themeStyles.testimonialRole}>
                      {testimonial.role}
                    </p>
                    <div style={themeStyles.testimonialRating}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          color={i < testimonial.rating ? "#ffc107" : "#e0e0e0"}
                          size={isMobile ? 10 : 12}
                        />
                      ))}
                    </div>
                    <p style={themeStyles.testimonialDate}>
                      {testimonial.date}
                    </p>
                    <Link
                      to={testimonial.productLink}
                      style={hyperlinkStyles.testimonialProductLink}
                    >
                      Shop {testimonial.productName} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={themeStyles.testimonialControls}>
            <button
              style={themeStyles.testimonialControlButton}
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              type="button"
            >
              <FaChevronLeft />
            </button>
            <button
              style={themeStyles.testimonialControlButton}
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              type="button"
            >
              <FaChevronRight />
            </button>
          </div>
          <div style={themeStyles.testimonialDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                style={{
                  ...themeStyles.testimonialDot,
                  ...(testimonialSlide === index
                    ? themeStyles.testimonialActiveDot
                    : {}),
                }}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;