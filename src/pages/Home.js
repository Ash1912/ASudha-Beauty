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
  FaSmile,
  FaTint,
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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

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

  const sliderImages = [
    {
      url: "/assets/images/home/Foundation.jpg",
      alt: "Flawless Foundation",
      title: "Flawless Foundation",
      objectPosition: "center",
      link: "/shop?category=face",
    },
    {
      url: "/assets/images/home/Kajal-Mascara.jpg",
      alt: "Intense Kajal",
      title: "Intense Kajal",
      objectPosition: "center",
      link: "/shop?category=eyes",
    },
    {
      url: "/assets/images/home/LonglastingLipstick.jpg",
      alt: "Long-lasting Lipstick",
      title: "Long-lasting Lipsticks",
      objectPosition: "center",
      link: "/shop?category=lips",
    },
    {
      url: "/assets/images/home/MultaniMitti.jpeg",
      alt: "Multani Mitti Powder",
      title: "Multani Mitti",
      objectPosition: "center",
      link: "/product/11001",
    },
    {
      url: "/assets/images/home/Ubtan.jpeg",
      alt: "Ubtan Powder",
      title: "Ubtan Powder",
      objectPosition: "center",
      link: "/product/11002",
    },
    {
      url: "/assets/images/home/Nail-Polish.jpg",
      alt: "Nail Polish Collection",
      title: "Nail Polish",
      objectPosition: "center",
      link: "/shop?category=nails",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Beauty Enthusiast",
      avatar: "/assets/images/team/sarah.jpg",
      content:
        "I've been using ASudha Beauty for over a year now, and I'm absolutely in love with their products! The lipsticks are long-lasting and the foundation gives me a flawless finish.",
      rating: 5,
      date: "March 2024",
      productLink: "/shop?category=lips",
      productName: "Matte Lipsticks",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Makeup Artist",
      avatar: "/assets/images/team/priya.jpg",
      content:
        "As a professional makeup artist, I need products that perform. ASudha's range is exceptional - the pigmentation, blendability, and longevity are top-notch.",
      rating: 5,
      date: "February 2024",
      productLink: "/shop?category=face",
      productName: "Face Makeup",
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Skincare Specialist",
      avatar: "/assets/images/team/priya.jpg",
      content:
        "The Multani Mitti powder from ASudha Beauty is 100% natural and effective! It deeply cleanses my skin, controls oil, and gives me a natural glow. Pure Ayurvedic goodness!",
      rating: 5,
      date: "January 2024",
      productLink: "/product/11001",
      productName: "Multani Mitti",
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      role: "Customer",
      avatar: "/assets/images/team/michael.jpg",
      content:
        "The Ubtan powder is amazing! Made with traditional ingredients, it nourishes and revitalizes my skin. Chemical-free, paraben-free, and suitable for all skin types.",
      rating: 5,
      date: "December 2023",
      productLink: "/product/11002",
      productName: "Ubtan Powder",
    },
    {
      id: 5,
      name: "Anita Desai",
      role: "Beauty Blogger",
      avatar: "/assets/images/team/priya.jpg",
      content:
        "ASudha Beauty's Multani Mitti is pure, natural, and effective. It helps with deep cleansing, oil control, and improves skin texture. Makes my skin glow! Trusted by nature!",
      rating: 5,
      date: "November 2023",
      productLink: "/product/11001",
      productName: "Multani Mitti",
    },
  ];

  const categories = [
    {
      name: "Face",
      image: "/assets/images/categories/face.png",
      productCount: 15,
      color: "#FFB6C1",
      link: "/shop?category=face",
      description: "Foundations & powders",
    },
    {
      name: "Eyes",
      image: "/assets/images/categories/eyes.png",
      productCount: 12,
      color: "#C1E1C1",
      link: "/shop?category=eyes",
      description: "Kajal & mascara",
    },
    {
      name: "Lips",
      image: "/assets/images/categories/lips.png",
      productCount: 18,
      color: "#FFC3A0",
      link: "/shop?category=lips",
      description: "Lipsticks & gloss",
    },
    {
      name: "Skincare",
      image: "/assets/images/categories/skincare.png",
      productCount: 2,
      color: "#A8E6CF",
      link: "/shop?category=Skincare",
      description: "100% Natural Face Packs",
    },
    {
      name: "Nails",
      image: "/assets/images/categories/nails.png",
      productCount: 8,
      color: "#D4A5F0",
      link: "/shop?category=nails",
      description: "Nail paints",
    },
    {
      name: "Sindoor",
      image: "/assets/images/categories/sindoor.png",
      productCount: 5,
      color: "#FF9AA2",
      link: "/shop?category=sindoor",
      description: "Traditional sindoor",
    },
    {
      name: "Extras",
      image: "/assets/images/categories/extras.jpg",
      productCount: 10,
      color: "#B5EAD7",
      link: "/shop?category=extras",
      description: "Fixers & primers",
    },
    {
      name: "Palettes",
      image: "/assets/images/categories/palette.jpg",
      productCount: 7,
      color: "#FBC1C1",
      link: "/shop?category=palettes",
      description: "Eyeshadow palettes",
    },
  ];

  // Get best selling products
  const allProducts = products;
  const bestSellingMakeup = allProducts.filter(p => p.bestSeller === true);
  const skincareProducts = allProducts.filter(p => p.category === "Skincare");
  
  const bestSellingProducts = [...bestSellingMakeup, ...skincareProducts]
    .filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    )
    .slice(0, 8);

  const values = [
    {
      icon: "🌿",
      title: "100% Natural",
      description: "Pure, natural, and effective products. No chemicals, no parabens.",
      color: "#4caf50",
      link: "/about",
    },
    {
      icon: "✨",
      title: "Authenticity",
      description: "Raw, unfiltered beauty. Just you, enhanced.",
      color: "#FFB6C1",
      link: "/about",
    },
    {
      icon: "🌱",
      title: "Ayurvedic Goodness",
      description: "Trusted Ayurvedic care for healthy, radiant skin.",
      color: "#C1E1C1",
      link: "/about",
    },
    {
      icon: "💪",
      title: "Empowerment",
      description: "Feel bold, confident, and unstoppable.",
      color: "#FFC3A0",
      link: "/about",
    },
    {
      icon: "💧",
      title: "Deep Cleansing",
      description: "Removes excess oil and impurities for clear skin.",
      color: "#87CEEB",
      link: "/about",
    },
    {
      icon: "🌟",
      title: "Skin Glow",
      description: "Makes your skin glow naturally with every use.",
      color: "#FFD700",
      link: "/about",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, sliderImages.length]);

  useEffect(() => {
    let interval;
    if (isTestimonialAutoPlaying) {
      interval = setInterval(() => {
        setTestimonialSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
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

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleTestimonialTouchStart = (e) => {
    setTestimonialTouchStart(e.targetTouches[0].clientX);
  };

  const handleTestimonialTouchMove = (e) => {
    setTestimonialTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTestimonialTouchEnd = () => {
    if (!testimonialTouchStart || !testimonialTouchEnd) return;
    const distance = testimonialTouchStart - testimonialTouchEnd;
    if (distance > 50) nextTestimonial();
    if (distance < -50) prevTestimonial();
    setTestimonialTouchStart(0);
    setTestimonialTouchEnd(0);
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const scrollToValues = (e) => {
    e.preventDefault();
    valuesSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        heroSectionGrid: "1fr",
        heroLeftPadding: "1rem",
        heroRightHeight: "220px",
        heroStatsFlexDirection: "row",
        heroStatsGap: "0.5rem",
        heroButtonsFlexDirection: "column",
        primaryButtonWidth: "100%",
        secondaryButtonWidth: "100%",
        valuesGridColumns: "1fr",
        categoriesGridColumns: "repeat(2, 1fr)",
        productsGridColumns: "1fr",
        testimonialsGridColumns: "1fr",
        heroSectionHeight: "auto",
        heroMinHeight: "auto",
        heroMarginTop: "0.5rem",
        valuesGridGap: "1rem",
        valuesPadding: "1rem",
        heroLeftTextAlign: "center",
        heroLeftPaddingBottom: "1rem",
      };
    } else if (windowWidth <= 768) {
      return {
        heroSectionGrid: "1fr",
        heroLeftPadding: "1.5rem",
        heroRightHeight: "280px",
        heroStatsFlexDirection: "row",
        heroStatsGap: "1rem",
        heroButtonsFlexDirection: "row",
        primaryButtonWidth: "auto",
        secondaryButtonWidth: "auto",
        valuesGridColumns: "repeat(2, 1fr)",
        categoriesGridColumns: "repeat(3, 1fr)",
        productsGridColumns: "repeat(2, 1fr)",
        testimonialsGridColumns: "1fr",
        heroSectionHeight: "auto",
        heroMinHeight: "auto",
        heroMarginTop: "1rem",
        valuesGridGap: "1rem",
        valuesPadding: "1rem",
        heroLeftTextAlign: "center",
        heroLeftPaddingBottom: "1.5rem",
      };
    } else if (windowWidth <= 1024) {
      return {
        heroSectionGrid: "1fr 1fr",
        heroLeftPadding: "2rem",
        heroRightHeight: "380px",
        heroStatsFlexDirection: "row",
        heroStatsGap: "1.5rem",
        heroButtonsFlexDirection: "row",
        primaryButtonWidth: "auto",
        secondaryButtonWidth: "auto",
        valuesGridColumns: "repeat(3, 1fr)",
        categoriesGridColumns: "repeat(4, 1fr)",
        productsGridColumns: "repeat(3, 1fr)",
        testimonialsGridColumns: "1fr",
        heroSectionHeight: "450px",
        heroMinHeight: "450px",
        heroMarginTop: "1rem",
        valuesGridGap: "1.5rem",
        valuesPadding: "1.25rem",
        heroLeftTextAlign: "left",
        heroLeftPaddingBottom: "0",
      };
    } else {
      return {
        heroSectionGrid: "1fr 1fr",
        heroLeftPadding: "3rem",
        heroRightHeight: "450px",
        heroStatsFlexDirection: "row",
        heroStatsGap: "2rem",
        heroButtonsFlexDirection: "row",
        primaryButtonWidth: "auto",
        secondaryButtonWidth: "auto",
        valuesGridColumns: "repeat(3, 1fr)",
        categoriesGridColumns: "repeat(4, 1fr)",
        productsGridColumns: "repeat(4, 1fr)",
        testimonialsGridColumns: "1fr",
        heroSectionHeight: "520px",
        heroMinHeight: "520px",
        heroMarginTop: "1.5rem",
        valuesGridGap: "2rem",
        valuesPadding: "1.5rem",
        heroLeftTextAlign: "left",
        heroLeftPaddingBottom: "0",
      };
    }
  };

  const responsive = getResponsiveStyles();

  const hyperlinkStyles = {
    featureBadges: {
      display: "flex",
      justifyContent: "center",
      gap: windowWidth <= 480 ? "0.5rem" : "0.75rem",
      marginTop: "1.5rem",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
      padding: windowWidth <= 480 ? "0 0.5rem" : "0",
    },
    featureBadge: {
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
      padding: windowWidth <= 480 ? "0.3rem 0.6rem" : "0.4rem 0.8rem",
      backgroundColor: isDarkMode ? "#2d2d2d" : "#f8f8f8",
      borderRadius: "2rem",
      fontSize: windowWidth <= 480 ? "0.7rem" : "0.8rem",
      color: isDarkMode ? "#cccccc" : "#666666",
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
    featureBadgeIcon: {
      fontSize: windowWidth <= 480 ? "0.7rem" : "0.85rem",
      color: "#e88ca6",
    },
    categoryDescription: {
      fontSize: "0.65rem",
      marginTop: "0.2rem",
      opacity: 0.8,
      color: "#ffffff",
    },
    valueItemLink: {
      textDecoration: "none",
      width: "100%",
      display: "block",
    },
    testimonialProductLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      marginTop: "0.5rem",
      padding: "0.2rem 0.8rem",
      backgroundColor: "#e88ca6",
      color: "#ffffff",
      textDecoration: "none",
      borderRadius: "2rem",
      fontSize: "0.75rem",
      transition: "all 0.3s ease",
    },
  };

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#333333",
      minHeight: "100vh",
      transition: "all 0.3s ease",
      overflowX: "hidden",
      paddingTop: "0",
    },
    heroSection: {
      display: "grid",
      gridTemplateColumns: responsive.heroSectionGrid,
      height: responsive.heroSectionHeight,
      minHeight: responsive.heroMinHeight,
      position: "relative",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
      borderRadius: windowWidth <= 768 ? "0 0 1.5rem 1.5rem" : "0 0 2rem 2rem",
      overflow: "hidden",
      margin: `${responsive.heroMarginTop} 0.75rem 0 0.75rem`,
      boxShadow: isDarkMode
        ? "0 5px 15px rgba(0,0,0,0.2)"
        : "0 5px 15px rgba(232,140,166,0.1)",
    },
    heroLeft: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: responsive.heroLeftTextAlign === "center" ? "center" : "flex-start",
      textAlign: responsive.heroLeftTextAlign,
      padding: responsive.heroLeftPadding,
      paddingBottom: responsive.heroLeftPaddingBottom,
      backgroundColor: isDarkMode ? "#2d2d2d" : "#fff5f7",
      position: "relative",
      zIndex: 2,
      borderRadius: windowWidth <= 768 ? "1.5rem" : "2rem 0 0 2rem",
    },
    heroTitle: {
      fontSize: windowWidth <= 480 ? "1.4rem" : windowWidth <= 768 ? "1.8rem" : "clamp(1.6rem, 3.5vw, 2.5rem)",
      fontWeight: "700",
      lineHeight: "1.3",
      marginBottom: "0.75rem",
      color: isDarkMode ? "#e88ca6" : "#333333",
    },
    heroSubtitle: {
      fontSize: windowWidth <= 480 ? "0.75rem" : "0.85rem",
      color: isDarkMode ? "#cccccc" : "#666666",
      lineHeight: "1.5",
      marginBottom: "1rem",
      maxWidth: windowWidth <= 768 ? "100%" : "400px",
    },
    heroStats: {
      display: "flex",
      flexDirection: responsive.heroStatsFlexDirection,
      gap: responsive.heroStatsGap,
      marginBottom: "1rem",
      justifyContent: responsive.heroLeftTextAlign === "center" ? "center" : "flex-start",
      flexWrap: "wrap",
    },
    statItem: {
      textAlign: "left",
      backgroundColor: isDarkMode ? "#404040" : "#ffffff",
      padding: windowWidth <= 480 ? "0.4rem 0.8rem" : "0.5rem 1rem",
      borderRadius: "0.75rem",
      boxShadow: isDarkMode
        ? "0 2px 5px rgba(0,0,0,0.2)"
        : "0 2px 5px rgba(232,140,166,0.1)",
      transition: "transform 0.3s ease",
    },
    statNumber: {
      fontSize: windowWidth <= 480 ? "1rem" : "1.2rem",
      fontWeight: "700",
      color: "#e88ca6",
      lineHeight: "1",
    },
    statLabel: {
      fontSize: windowWidth <= 480 ? "0.6rem" : "0.7rem",
      color: isDarkMode ? "#cccccc" : "#666666",
      textTransform: "uppercase",
      letterSpacing: "0.3px",
    },
    heroButtons: {
      display: "flex",
      flexDirection: responsive.heroButtonsFlexDirection,
      gap: "0.75rem",
      flexWrap: "wrap",
      justifyContent: responsive.heroLeftTextAlign === "center" ? "center" : "flex-start",
    },
    primaryButton: {
      padding: windowWidth <= 480 ? "0.5rem 1.2rem" : "0.6rem 1.5rem",
      backgroundColor: "#e88ca6",
      color: "#ffffff",
      textDecoration: "none",
      borderRadius: "2rem",
      fontSize: windowWidth <= 480 ? "0.75rem" : "0.85rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      border: "2px solid transparent",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.4rem",
      width: responsive.primaryButtonWidth,
      cursor: "pointer",
      boxShadow: "0 3px 10px rgba(232,140,166,0.3)",
    },
    secondaryButton: {
      padding: windowWidth <= 480 ? "0.5rem 1.2rem" : "0.6rem 1.5rem",
      backgroundColor: "transparent",
      color: isDarkMode ? "#ffffff" : "#333333",
      textDecoration: "none",
      borderRadius: "2rem",
      fontSize: windowWidth <= 480 ? "0.75rem" : "0.85rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      border: `2px solid ${isDarkMode ? "#ffffff" : "#e88ca6"}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.4rem",
      width: responsive.secondaryButtonWidth,
      cursor: "pointer",
    },
    heroRight: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f0f0",
      height: responsive.heroRightHeight,
      borderRadius: windowWidth <= 768 ? "0 0 1.5rem 1.5rem" : "0 2rem 2rem 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    sliderContainer: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    sliderTrack: {
      display: "flex",
      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
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
      backgroundColor: isDarkMode ? "#2d2d2d" : "#f8f8f8",
      overflow: "hidden",
    },
    sliderImage: {
      maxWidth: "100%",
      maxHeight: "100%",
      width: "auto",
      height: "auto",
      objectFit: "contain",
      objectPosition: "center",
      display: "block",
    },
    imageOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(232,140,166,0.2) 0%, rgba(0,0,0,0.1) 100%)",
      pointerEvents: "none",
    },
    slideContent: {
      position: "absolute",
      bottom: windowWidth <= 480 ? "0.75rem" : "1rem",
      right: windowWidth <= 480 ? "0.75rem" : "1rem",
      color: "#ffffff",
      textAlign: "right",
      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
      backgroundColor: "rgba(232,140,166,0.85)",
      padding: windowWidth <= 480 ? "0.3rem 0.75rem" : "0.4rem 1rem",
      borderRadius: "1.5rem",
      backdropFilter: "blur(5px)",
      zIndex: 2,
    },
    slideTitle: {
      fontSize: windowWidth <= 480 ? "0.8rem" : "1rem",
      fontWeight: "600",
      marginBottom: "0.1rem",
    },
    sliderControls: {
      position: "absolute",
      bottom: "0.75rem",
      left: "0.75rem",
      display: "flex",
      gap: "0.5rem",
      zIndex: 10,
    },
    controlButton: {
      width: windowWidth <= 480 ? "28px" : "32px",
      height: windowWidth <= 480 ? "28px" : "32px",
      borderRadius: "50%",
      backgroundColor: "rgba(0,0,0,0.5)",
      border: "1.5px solid #ffffff",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: windowWidth <= 480 ? "0.7rem" : "0.8rem",
    },
    dotsContainer: {
      position: "absolute",
      bottom: "0.75rem",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "0.4rem",
      zIndex: 10,
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: "0.2rem 0.6rem",
      borderRadius: "1.5rem",
      backdropFilter: "blur(5px)",
    },
    dot: {
      width: windowWidth <= 480 ? "5px" : "6px",
      height: windowWidth <= 480 ? "5px" : "6px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.6)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      padding: 0,
      border: "none",
    },
    activeDot: {
      width: windowWidth <= 480 ? "16px" : "20px",
      borderRadius: "10px",
      backgroundColor: "#e88ca6",
    },
    playPauseButton: {
      position: "absolute",
      top: "0.75rem",
      right: "0.75rem",
      width: windowWidth <= 480 ? "28px" : "32px",
      height: windowWidth <= 480 ? "28px" : "32px",
      borderRadius: "50%",
      backgroundColor: "rgba(232,140,166,0.9)",
      border: "none",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      zIndex: 10,
      backdropFilter: "blur(5px)",
    },
    sectionTitle: {
      fontSize: windowWidth <= 480 ? "1.4rem" : windowWidth <= 768 ? "1.6rem" : "1.8rem",
      textAlign: "center",
      marginBottom: "1.5rem",
      color: isDarkMode ? "#e88ca6" : "#333333",
      position: "relative",
      paddingBottom: "0.75rem",
      fontWeight: "600",
    },
    valuesSection: {
      padding: windowWidth <= 480 ? "1.5rem 1rem" : "2.5rem 1.5rem",
      maxWidth: "1200px",
      margin: "0 auto",
      scrollMarginTop: "80px",
      opacity: isVisible.values ? 1 : 0,
      transform: isVisible.values ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    valuesHeader: {
      textAlign: "center",
      marginBottom: "1.5rem",
    },
    valuesTitle: {
      fontSize: windowWidth <= 480 ? "1.4rem" : windowWidth <= 768 ? "1.6rem" : "1.8rem",
      color: isDarkMode ? "#e88ca6" : "#333333",
      marginBottom: "0.75rem",
      fontWeight: "600",
    },
    valuesGrid: {
      display: "grid",
      gridTemplateColumns: responsive.valuesGridColumns,
      gap: responsive.valuesGridGap,
      marginTop: "0.5rem",
    },
    valueItem: {
      backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
      borderRadius: "0.75rem",
      padding: responsive.valuesPadding,
      boxShadow: isDarkMode
        ? "0 5px 15px rgba(0,0,0,0.2)"
        : "0 5px 15px rgba(232,140,166,0.08)",
      transition: "all 0.3s ease",
      border: `1px solid ${isDarkMode ? "#404040" : "#f0f0f0"}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    valueIconContainer: {
      width: "40px",
      height: "40px",
      borderRadius: "0.75rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "0.75rem",
      fontSize: "1.2rem",
      transition: "all 0.3s ease",
    },
    valueTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      marginBottom: "0.3rem",
      color: isDarkMode ? "#ffffff" : "#333333",
    },
    valueTitleUnderline: {
      width: "25px",
      height: "2px",
      borderRadius: "2px",
      marginTop: "0.2rem",
      marginBottom: "0.3rem",
    },
    valueDescription: {
      fontSize: "0.75rem",
      color: isDarkMode ? "#cccccc" : "#666666",
      lineHeight: "1.4",
      marginBottom: "0.3rem",
    },
    categoriesSection: {
      padding: windowWidth <= 480 ? "1.5rem 1rem" : "2.5rem 1.5rem",
      maxWidth: "1200px",
      margin: "0 auto",
      opacity: isVisible.categories ? 1 : 0,
      transform: isVisible.categories ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
    },
    categoriesGrid: {
      display: "grid",
      gridTemplateColumns: responsive.categoriesGridColumns,
      gap: "0.75rem",
      marginTop: "1rem",
    },
    categoryCard: {
      position: "relative",
      borderRadius: "0.75rem",
      overflow: "hidden",
      cursor: "pointer",
      aspectRatio: "1/1",
      boxShadow: isDarkMode
        ? "0 5px 10px rgba(0,0,0,0.2)"
        : "0 5px 10px rgba(232,140,166,0.08)",
      transition: "all 0.3s ease",
    },
    categoryImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    categoryOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "0.75rem",
      color: "#ffffff",
    },
    categoryName: {
      fontSize: windowWidth <= 480 ? "0.9rem" : "1.1rem",
      fontWeight: "600",
      marginBottom: "0.2rem",
    },
    categoryCount: {
      fontSize: windowWidth <= 480 ? "0.6rem" : "0.7rem",
      opacity: "0.9",
      display: "flex",
      alignItems: "center",
      gap: "0.2rem",
    },
    productsSection: {
      padding: windowWidth <= 480 ? "1.5rem 1rem" : "2.5rem 1.5rem",
      maxWidth: "1200px",
      margin: "0 auto",
      opacity: isVisible.products ? 1 : 0,
      transform: isVisible.products ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
    },
    productsGrid: {
      display: "grid",
      gridTemplateColumns: responsive.productsGridColumns,
      gap: "0.75rem",
      marginBottom: "1.5rem",
    },
    viewAllContainer: {
      textAlign: "center",
    },
    testimonialsSection: {
      padding: windowWidth <= 480 ? "1.5rem 1rem" : "2.5rem 1.5rem",
      maxWidth: "1200px",
      margin: "0 auto",
      opacity: isVisible.testimonials ? 1 : 0,
      transform: isVisible.testimonials ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s",
    },
    testimonialsContainer: {
      position: "relative",
      backgroundColor: isDarkMode ? "#2d2d2d" : "#f8f8f8",
      borderRadius: "0.75rem",
      padding: windowWidth <= 480 ? "1rem" : "1.5rem",
      overflow: "hidden",
    },
    testimonialsSlider: {
      position: "relative",
      width: "100%",
      overflow: "hidden",
    },
    testimonialsTrack: {
      display: "flex",
      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: `translateX(-${testimonialSlide * 100}%)`,
    },
    testimonialSlide: {
      flex: "0 0 100%",
      padding: windowWidth <= 480 ? "0.75rem" : "1rem",
      boxSizing: "border-box",
    },
    testimonialContent: {
      maxWidth: "700px",
      margin: "0 auto",
      textAlign: "center",
    },
    quoteIcon: {
      fontSize: windowWidth <= 480 ? "1.5rem" : "2rem",
      color: "#e88ca6",
      opacity: 0.5,
      marginBottom: "0.75rem",
    },
    testimonialText: {
      fontSize: windowWidth <= 480 ? "0.8rem" : "0.9rem",
      lineHeight: "1.5",
      color: isDarkMode ? "#cccccc" : "#666666",
      marginBottom: "0.75rem",
      fontStyle: "italic",
    },
    testimonialAvatar: {
      width: windowWidth <= 480 ? "50px" : "60px",
      height: windowWidth <= 480 ? "50px" : "60px",
      borderRadius: "50%",
      objectFit: "cover",
      margin: "0 auto 0.75rem",
      border: `2px solid #e88ca6`,
    },
    testimonialAvatarFallback: {
      width: windowWidth <= 480 ? "50px" : "60px",
      height: windowWidth <= 480 ? "50px" : "60px",
      borderRadius: "50%",
      backgroundColor: isDarkMode ? "#404040" : "#e0e0e0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 0.75rem",
      fontSize: windowWidth <= 480 ? "1.2rem" : "1.5rem",
    },
    testimonialName: {
      fontSize: windowWidth <= 480 ? "0.9rem" : "1rem",
      fontWeight: "600",
      marginBottom: "0.2rem",
      color: isDarkMode ? "#ffffff" : "#333333",
    },
    testimonialRole: {
      fontSize: windowWidth <= 480 ? "0.7rem" : "0.8rem",
      color: isDarkMode ? "#cccccc" : "#666666",
      marginBottom: "0.4rem",
    },
    testimonialRating: {
      display: "flex",
      justifyContent: "center",
      gap: "0.15rem",
      color: "#ffc107",
      marginBottom: "0.3rem",
    },
    testimonialDate: {
      fontSize: "0.65rem",
      color: isDarkMode ? "#999" : "#999",
    },
    testimonialControls: {
      display: "flex",
      justifyContent: "center",
      gap: "0.75rem",
      marginTop: "0.75rem",
    },
    testimonialControlButton: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: isDarkMode ? "#404040" : "#ffffff",
      border: `1px solid ${isDarkMode ? "#555" : "#ddd"}`,
      color: isDarkMode ? "#ffffff" : "#333333",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    testimonialDots: {
      display: "flex",
      justifyContent: "center",
      gap: "0.4rem",
      marginTop: "0.75rem",
    },
    testimonialDot: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: isDarkMode ? "#404040" : "#ddd",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "none",
      padding: 0,
    },
    testimonialActiveDot: {
      width: "20px",
      borderRadius: "10px",
      backgroundColor: "#e88ca6",
    },
  };

  return (
    <div style={themeStyles.container}>
      {/* Hero Section */}
      <section style={themeStyles.heroSection}>
        <div style={themeStyles.heroLeft}>
          <h1 style={themeStyles.heroTitle}>
            Pure. Natural. Effective.
          </h1>
          <p style={themeStyles.heroSubtitle}>
            Discover the power of 100% natural Multani Mitti and Ayurvedic Ubtan. 
            Deep cleansing, oil control, and natural glow - trusted by nature, loved by you.
          </p>

          <div style={themeStyles.heroStats}>
            <div style={themeStyles.statItem}>
              <div style={themeStyles.statNumber}>50+</div>
              <div style={themeStyles.statLabel}>Products</div>
            </div>
            <div style={themeStyles.statItem}>
              <div style={themeStyles.statNumber}>10k+</div>
              <div style={themeStyles.statLabel}>Happy Customers</div>
            </div>
            <div style={themeStyles.statItem}>
              <div style={themeStyles.statNumber}>100%</div>
              <div style={themeStyles.statLabel}>Natural</div>
            </div>
            <div style={themeStyles.statItem}>
              <div style={themeStyles.statNumber}>100%</div>
              <div style={themeStyles.statLabel}>Cruelty Free</div>
            </div>
          </div>

          <div style={themeStyles.heroButtons}>
            <Link to="/shop" style={themeStyles.primaryButton}>
              Shop Now <FaArrowRight />
            </Link>
            <button onClick={scrollToValues} style={themeStyles.secondaryButton}>
              Learn More
            </button>
          </div>
        </div>

        <div style={themeStyles.heroRight}>
          <button
            style={themeStyles.playPauseButton}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            aria-label={isAutoPlaying ? "Pause" : "Play"}
          >
            {isAutoPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <div style={themeStyles.sliderControls}>
            <button style={themeStyles.controlButton} onClick={prevSlide}>
              <FaChevronLeft />
            </button>
            <button style={themeStyles.controlButton} onClick={nextSlide}>
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
                    <Link to={image.link} style={{ textDecoration: "none", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={image.url} alt={image.alt} style={themeStyles.sliderImage} loading={index === 0 ? "eager" : "lazy"} onError={() => handleImageError(index)} />
                      <div style={themeStyles.imageOverlay} />
                      <div style={themeStyles.slideContent}>
                        <h3 style={themeStyles.slideTitle}>{image.title}</h3>
                        <span style={{ fontSize: windowWidth <= 480 ? "0.6rem" : "0.7rem" }}>Shop →</span>
                      </div>
                    </Link>
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: isDarkMode ? "#404040" : "#f0f0f0", color: isDarkMode ? "#ffffff" : "#666666", fontSize: "0.9rem", textAlign: "center", padding: "0.75rem" }}>
                      {image.title}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges */}
      <div style={hyperlinkStyles.featureBadges}>
        <div style={hyperlinkStyles.featureBadge}><FaTruck style={hyperlinkStyles.featureBadgeIcon} /><span>Free Shipping ₹500+</span></div>
        <div style={hyperlinkStyles.featureBadge}><FaShieldAlt style={hyperlinkStyles.featureBadgeIcon} /><span>100% Natural</span></div>
        <div style={hyperlinkStyles.featureBadge}><FaLeaf style={hyperlinkStyles.featureBadgeIcon} /><span>Ayurvedic Care</span></div>
        <div style={hyperlinkStyles.featureBadge}><FaHeart style={hyperlinkStyles.featureBadgeIcon} /><span>Chemical Free</span></div>
        <div style={hyperlinkStyles.featureBadge}><FaRegSnowflake style={hyperlinkStyles.featureBadgeIcon} /><span>All Skin Types</span></div>
      </div>

      {/* Values Section */}
      <section ref={valuesSectionRef} style={themeStyles.valuesSection}>
        <div style={themeStyles.valuesHeader}>
          <h2 style={themeStyles.valuesTitle}>Pure Goodness. Ayurvedic Care.</h2>
          <p style={{ fontSize: "0.85rem", color: isDarkMode ? "#cccccc" : "#666666", textAlign: "center" }}>
            Trusted by nature, loved by you
          </p>
        </div>
        <div style={themeStyles.valuesGrid}>
          {values.map((value, index) => (
            <Link to={value.link} key={index} style={hyperlinkStyles.valueItemLink}>
              <div style={themeStyles.valueItem}>
                <div style={{ ...themeStyles.valueIconContainer, backgroundColor: isDarkMode ? `${value.color}30` : `${value.color}20`, color: value.color }}>
                  <span>{value.icon}</span>
                </div>
                <h3 style={themeStyles.valueTitle}>{value.title}</h3>
                <div style={{ ...themeStyles.valueTitleUnderline, backgroundColor: value.color }} />
                <p style={themeStyles.valueDescription}>{value.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesSectionRef} style={themeStyles.categoriesSection}>
        <h2 style={themeStyles.sectionTitle}>Shop By Category</h2>
        <div style={themeStyles.categoriesGrid}>
          {categories.map((category, index) => (
            <Link to={category.link} key={index} style={{ textDecoration: "none" }}>
              <div style={themeStyles.categoryCard}>
                <img src={category.image} alt={category.name} style={themeStyles.categoryImage} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x400/f8f8f8/e88ca6?text=" + category.name; }} />
                <div style={themeStyles.categoryOverlay}>
                  <h3 style={themeStyles.categoryName}>{category.name}</h3>
                  <p style={hyperlinkStyles.categoryDescription}>{category.description}</p>
                  <p style={themeStyles.categoryCount}><FaStar style={{ fontSize: "0.6rem" }} /> {category.productCount} Products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Selling Products Section */}
      <section ref={productsSectionRef} style={themeStyles.productsSection}>
        <h2 style={themeStyles.sectionTitle}>Best Sellers</h2>
        {bestSellingProducts.length > 0 ? (
          <>
            <div style={themeStyles.productsGrid}>
              {bestSellingProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product, Array.isArray(product.shades) && product.shades.length > 0 ? product.shades[0] : "", 1)}
                  showBadge={true}
                  badgeText={product.category === "Skincare" ? "Natural" : "Best Seller"}
                />
              ))}
            </div>
            <div style={themeStyles.viewAllContainer}>
              <Link to="/shop?sort=best-selling" style={themeStyles.primaryButton}>View All <FaArrowRight /></Link>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "1.5rem" }}><p>Loading products...</p></div>
        )}
      </section>

      {/* Natural Skincare Banner */}
      <section style={{ ...themeStyles.productsSection, paddingTop: 0 }}>
        <div style={{
          backgroundColor: isDarkMode ? "#2d2d2d" : "#f8f8f8",
          borderRadius: "1rem",
          padding: windowWidth <= 480 ? "1.5rem" : "2rem",
          textAlign: "center",
          background: isDarkMode ? "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)" : "linear-gradient(135deg, #fff5f7 0%, #f8f8f8 100%)",
        }}>
          <FaLeaf style={{ fontSize: "2rem", color: "#4caf50", marginBottom: "0.5rem" }} />
          <h3 style={{ fontSize: windowWidth <= 480 ? "1.2rem" : "1.4rem", marginBottom: "0.5rem", color: isDarkMode ? "#e88ca6" : "#333" }}>
            100% Natural Skincare
          </h3>
          <p style={{ fontSize: "0.85rem", color: isDarkMode ? "#cccccc" : "#666", marginBottom: "1rem" }}>
            Chemical Free • Paraben Free • Preservative Free • Suitable for All Skin Types
          </p>
          <Link to="/shop?category=Skincare" style={{ ...themeStyles.primaryButton, display: "inline-flex" }}>
            Explore Natural Skincare <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsSectionRef} style={themeStyles.testimonialsSection}>
        <h2 style={themeStyles.sectionTitle}>What Our Customers Say</h2>
        <div style={themeStyles.testimonialsContainer}>
          <div style={themeStyles.testimonialsSlider}>
            <div style={themeStyles.testimonialsTrack} onTouchStart={handleTestimonialTouchStart} onTouchMove={handleTestimonialTouchMove} onTouchEnd={handleTestimonialTouchEnd}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} style={themeStyles.testimonialSlide}>
                  <div style={themeStyles.testimonialContent}>
                    <FaQuoteLeft style={themeStyles.quoteIcon} />
                    <p style={themeStyles.testimonialText}>{testimonial.content}</p>
                    <FaQuoteRight style={{ ...themeStyles.quoteIcon, marginTop: "0.5rem" }} />

                    {testimonial.avatar && !imageErrors[`avatar-${testimonial.id}`] ? (
                      <img src={testimonial.avatar} alt={testimonial.name} style={themeStyles.testimonialAvatar} onError={() => handleImageError(`avatar-${testimonial.id}`)} />
                    ) : (
                      <div style={themeStyles.testimonialAvatarFallback}><FaUserCircle /></div>
                    )}

                    <h3 style={themeStyles.testimonialName}>{testimonial.name}</h3>
                    <p style={themeStyles.testimonialRole}>{testimonial.role}</p>
                    <div style={themeStyles.testimonialRating}>{[...Array(5)].map((_, i) => (<FaStar key={i} color={i < testimonial.rating ? "#ffc107" : "#e0e0e0"} size={windowWidth <= 480 ? 10 : 12} />))}</div>
                    <p style={themeStyles.testimonialDate}>{testimonial.date}</p>
                    <Link to={testimonial.productLink} style={hyperlinkStyles.testimonialProductLink}>Shop {testimonial.productName} →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={themeStyles.testimonialControls}>
            <button style={themeStyles.testimonialControlButton} onClick={prevTestimonial}><FaChevronLeft /></button>
            <button style={themeStyles.testimonialControlButton} onClick={nextTestimonial}><FaChevronRight /></button>
          </div>

          <div style={themeStyles.testimonialDots}>
            {testimonials.map((_, index) => (
              <button key={index} style={{ ...themeStyles.testimonialDot, ...(testimonialSlide === index ? themeStyles.testimonialActiveDot : {}) }} onClick={() => goToTestimonial(index)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;