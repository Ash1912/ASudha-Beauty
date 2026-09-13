import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaApple,
  FaGooglePay,
  FaAmazonPay,
  FaArrowUp,
  FaHeart,
  FaLeaf,
  FaShoppingBag,
  FaGem,
  FaTags,
  FaBlog,
  FaEye,
  FaTruck,
  FaStar,
  FaUserCircle,
  FaLock,
  FaQuestionCircle,
  FaInfoCircle,
  FaGift,
  FaNewspaper,
} from "react-icons/fa";
import { SiRazorpay, SiPaytm, SiPhonepe } from "react-icons/si";

const Footer = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Brand Color Palette matching your packaging
  const brandColors = {
    primary: "#f5346b",
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    earthDark: "#3e2723",
    earthLight: "#6d4c41",
    cream: "#fcf8f5",
  };

  // Get logo filter based on theme
  const getLogoFilter = () => {
    if (isDarkMode) {
      return "brightness(0) invert(1)"; // White logo for dark theme
    } else {
      return "brightness(0) invert(0)"; // Dark logo for light theme
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterSubscribed(true);
      setEmail("");
      setTimeout(() => setNewsletterSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getGridColumns = () => {
    if (windowWidth <= 480) return "1fr";
    if (windowWidth <= 768) return "repeat(2, 1fr)";
    if (windowWidth <= 1024) return "repeat(4, 1fr)";
    return "repeat(5, 1fr)";
  };

  const getHeadingSize = () => {
    if (windowWidth <= 480) return "1rem";
    return "1.1rem";
  };

  const getTextSize = () => {
    if (windowWidth <= 480) return "0.85rem";
    return "0.9rem";
  };

  const additionalLinks = [
    { name: "New Arrivals", link: "/shop?sort=new", icon: <FaGem /> },
    { name: "Best Sellers", link: "/shop?sort=best-selling", icon: <FaStar /> },
    { name: "Offers", link: "/shop?sort=offers", icon: <FaGift /> },
    { name: "Sale", link: "/shop?sort=sale", icon: <FaTags /> },
    { name: "Gift Cards", link: "/gift-cards", icon: <FaGift /> },
  ];

  const helpLinks = [
    { name: "FAQs", link: "/faqs", icon: <FaQuestionCircle /> },
    { name: "Shipping Info", link: "/shipping", icon: <FaTruck /> },
    { name: "Returns & Exchanges", link: "/returns", icon: <FaTags /> },
    { name: "Track Order", link: "/track-order", icon: <FaEye /> },
    { name: "Size Guide", link: "/size-guide", icon: <FaInfoCircle /> },
    { name: "Terms & Conditions", link: "/terms", icon: <FaLock /> },
  ];

  const resourceLinks = [
    { name: "Blog", link: "/blog", icon: <FaBlog /> },
    {
      name: "Beauty Tips",
      link: "/blog?category=beauty-tips",
      icon: <FaNewspaper />,
    },
    { name: "Tutorials", link: "/blog?category=tutorials", icon: <FaEye /> },
    { name: "Customer Reviews", link: "/testimonials", icon: <FaStar /> },
    { name: "Affiliate Program", link: "/affiliate", icon: <FaHeart /> },
    { name: "Become a Partner", link: "/partners", icon: <FaUserCircle /> },
  ];

  const themeStyles = {
    footer: {
      backgroundColor: isDarkMode ? "#0f0f0f" : "#fcf8f5", // Changed to Pure Black / Cream
      padding: windowWidth <= 480 ? "2rem 0 0.5rem 0" : "3rem 0 1rem 0",
      marginTop: "3rem",
      borderTop: isDarkMode
        ? "1px solid rgba(255,255,255,0.05)"
        : `1px solid rgba(62, 39, 35, 0.05)`,
      transition: "all 0.3s ease",
      position: "relative",
      boxShadow: isDarkMode
        ? "0 -8px 30px rgba(0,0,0,0.3)"
        : "0 -8px 30px rgba(62, 39, 35, 0.04)",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: windowWidth <= 480 ? "0 0.75rem" : "0 1rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: getGridColumns(),
      gap: windowWidth <= 480 ? "1.5rem" : "2.5rem",
      marginBottom: "2rem",
    },
    section: {
      display: "flex",
      flexDirection: "column",
    },
    heading: {
      fontSize: getHeadingSize(),
      fontWeight: "700",
      marginBottom: "1rem",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      position: "relative",
      paddingBottom: "0.5rem",
      borderBottom: `2px solid ${isDarkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(62, 39, 35, 0.08)"}`,
      letterSpacing: "0.5px",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    text: {
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight, // Changed textSecondary
      lineHeight: "1.8",
      fontSize: getTextSize(),
      marginBottom: "1rem",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      marginBottom: "0.6rem",
    },
    link: {
      color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
      textDecoration: "none",
      fontSize: getTextSize(),
      lineHeight: "1.8",
      transition: "all 0.3s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer",
      fontWeight: "400",
      ":hover": {
        color: isDarkMode ? brandColors.gold : brandColors.bronze,
        transform: windowWidth <= 768 ? "none" : "translateX(5px)",
      },
    },
    contactInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      marginTop: "0.5rem",
    },
    contactItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
      color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
      fontSize: getTextSize(),
      lineHeight: "1.6",
    },
    contactIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      fontSize: windowWidth <= 480 ? "1rem" : "1.1rem",
      minWidth: "20px",
      marginTop: "0.1rem",
    },
    socialLinks: {
      display: "flex",
      gap: windowWidth <= 480 ? "0.75rem" : "1rem",
      flexWrap: "wrap",
      marginTop: "0.5rem",
    },
    socialLink: {
      color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
      fontSize: windowWidth <= 480 ? "1.2rem" : "1.3rem",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: windowWidth <= 480 ? "36px" : "42px",
      height: windowWidth <= 480 ? "36px" : "42px",
      borderRadius: "50%",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(62, 39, 35, 0.04)",
      textDecoration: "none",
      ":hover": {
        color: "#ffffff",
        backgroundColor: isDarkMode ? brandColors.gold : brandColors.primary,
        transform: windowWidth <= 768 ? "none" : "translateY(-4px)",
      },
    },
    newsletterSection: {
      backgroundColor: isDarkMode ? "#1a1a1a" : brandColors.cream, // Changed Surface
      padding: windowWidth <= 480 ? "1.5rem" : "2.5rem",
      borderRadius: "16px",
      marginBottom: "2.5rem",
      textAlign: "center",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.05)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      position: "relative",
      overflow: "hidden",
    },
    newsletterTitle: {
      fontSize: windowWidth <= 480 ? "1.1rem" : "1.3rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      letterSpacing: "0.5px",
    },
    newsletterText: {
      fontSize: getTextSize(),
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight, // Changed TextSecondary
      marginBottom: "1.25rem",
    },
    newsletterForm: {
      display: "flex",
      gap: "0.75rem",
      maxWidth: "500px",
      margin: "0 auto",
      flexDirection: windowWidth <= 480 ? "column" : "row",
    },
    newsletterInput: {
      flex: 1,
      padding: windowWidth <= 480 ? "0.9rem 1.25rem" : "0.8rem 1.25rem",
      backgroundColor: isDarkMode ? "#0f0f0f" : "#ffffff", // Changed pure black
      border: `1px solid ${isDarkMode ? "#333333" : "#d1c7c0"}`,
      borderRadius: "30px",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      fontSize: getTextSize(),
      outline: "none",
      transition: "all 0.3s ease",
      ":focus": {
        borderColor: brandColors.gold,
        boxShadow: `0 0 0 3px ${isDarkMode ? "rgba(212, 175, 55, 0.15)" : "rgba(212, 175, 55, 0.1)"}`,
      },
    },
    newsletterButton: {
      padding: windowWidth <= 480 ? "0.9rem 1.5rem" : "0.8rem 2rem",
      background: isDarkMode
        ? "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)"
        : "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      color: isDarkMode ? brandColors.earthDark : "#ffffff",
      border: "none",
      borderRadius: "30px",
      fontSize: getTextSize(),
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
      boxShadow: isDarkMode
        ? "0 4px 12px rgba(245, 52, 107, 0.25)"
        : "0 4px 12px rgba(245, 52, 107, 0.15)",
      ":hover": {
        transform: windowWidth <= 768 ? "none" : "translateY(-2px)",
        boxShadow: "0 6px 20px rgba(245, 52, 107, 0.35)",
      },
    },
    newsletterSuccess: {
      marginTop: "0.75rem",
      padding: "0.6rem",
      backgroundColor: isDarkMode ? "#1a3a1a" : "#e8f5e9",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      borderRadius: "30px",
      fontSize: getTextSize(),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      border: `1px solid ${isDarkMode ? "#2a5a2a" : "#c8e6c9"}`,
    },
    paymentSection: {
      marginTop: "1.5rem",
      padding: "1rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.03)"
        : "rgba(62, 39, 35, 0.03)",
      borderRadius: "12px",
      textAlign: "center",
    },
    paymentTitle: {
      fontSize: windowWidth <= 480 ? "0.8rem" : "0.85rem",
      fontWeight: "600",
      marginBottom: "0.75rem",
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight, // Changed TextSecondary
    },
    paymentIcons: {
      display: "flex",
      gap: windowWidth <= 480 ? "0.5rem" : "0.75rem",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    paymentIcon: {
      fontSize: windowWidth <= 480 ? "1.2rem" : "1.5rem",
      color: isDarkMode ? "#333333" : "#bcaaa4",
      transition: "color 0.3s ease",
      ":hover": {
        color: isDarkMode ? brandColors.gold : brandColors.bronze,
      },
    },
    footerBottom: {
      display: "flex",
      flexDirection: windowWidth <= 768 ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      padding: "1.5rem 0 0.5rem 0",
      borderTop: `1px solid ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(62, 39, 35, 0.06)"}`,
      marginTop: "2rem",
    },
    copyright: {
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4", // Changed TextSecondary
      fontSize: windowWidth <= 480 ? "0.75rem" : "0.85rem",
      textAlign: windowWidth <= 768 ? "center" : "left",
    },
    footerLinks: {
      display: "flex",
      gap: "1.5rem",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    footerLink: {
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4", // Changed TextSecondary
      textDecoration: "none",
      fontSize: windowWidth <= 480 ? "0.75rem" : "0.85rem",
      transition: "color 0.3s ease",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      ":hover": {
        color: isDarkMode ? brandColors.gold : brandColors.bronze,
      },
    },
    backToTop: {
      position: "fixed",
      bottom: "2rem",
      right: "2rem",
      width: windowWidth <= 480 ? "44px" : "50px",
      height: windowWidth <= 480 ? "44px" : "50px",
      borderRadius: "50%",
      background: isDarkMode
        ? "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)"
        : "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      color: isDarkMode ? brandColors.earthDark : "#ffffff",
      display: showBackToTop ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "none",
      fontSize: windowWidth <= 480 ? "1.2rem" : "1.4rem",
      boxShadow: "0 6px 20px rgba(245, 52, 107, 0.3)",
      transition: "all 0.3s ease",
      zIndex: 100,
      ":hover": {
        transform: "scale(1.1)",
        boxShadow: "0 8px 25px rgba(245, 52, 107, 0.4)",
      },
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.3rem 0.8rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(62, 39, 35, 0.04)",
      borderRadius: "20px",
      fontSize: "0.75rem",
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight, // Changed TextSecondary
      marginTop: "0.5rem",
      width: "fit-content",
    },
  };

  return (
    <footer style={themeStyles.footer}>
      <div style={themeStyles.container}>
        <div style={themeStyles.newsletterSection}>
          <h3 style={themeStyles.newsletterTitle}>Join the ASudha Family</h3>
          <p style={themeStyles.newsletterText}>
            Get 10% off your first order and receive natural beauty tips &
            exclusive offers
          </p>
          <form
            style={themeStyles.newsletterForm}
            onSubmit={handleNewsletterSubmit}
          >
            <input
              type="email"
              placeholder="Your email address"
              style={themeStyles.newsletterInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" style={themeStyles.newsletterButton}>
              Subscribe
            </button>
          </form>
          {newsletterSubscribed && (
            <div style={themeStyles.newsletterSuccess}>
              <FaHeart /> Welcome to the family! Thanks for subscribing.
            </div>
          )}
        </div>

        <div style={themeStyles.grid}>
          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <img
                  src="/assets/images/Logo.png"
                  alt="ASudha Beauty"
                  style={{
                    height: "48px",
                    width: "auto",
                    maxWidth: "160px",
                    filter: getLogoFilter(), // Dynamic filter based on theme
                    objectFit: "contain",
                    transition: "all 0.3s ease",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
              </Link>
            </h3>
            <p style={themeStyles.text}>
              Pure. Natural. You. Empowering you with the goodness of Ayurveda
              to feel confident and embrace your natural radiance.
            </p>
            <div style={themeStyles.badge}>
              <FaLeaf /> 100% Natural & Ayurvedic
            </div>
            <div style={themeStyles.badge}>
              <FaHeart /> Proudly Made in India
            </div>
            <div style={themeStyles.contactInfo}>
              <div style={themeStyles.contactItem}>
                <FaMapMarkerAlt style={themeStyles.contactIcon} />
                <span>
                  Shop No. 51/T-11/28, Pandariba Gali, Shahmaruf, Gorakhpur -
                  273001
                </span>
              </div>
              <div style={themeStyles.contactItem}>
                <FaPhone style={themeStyles.contactIcon} />
                <span>+91-7518217726</span>
              </div>
              <div style={themeStyles.contactItem}>
                <FaEnvelope style={themeStyles.contactIcon} />
                <span>asudhabeauty@gmail.com</span>
              </div>
            </div>
          </div>

          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Shop</h3>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}>
                <Link
                  to="/shop"
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  <FaShoppingBag /> Shop All
                </Link>
              </li>
              {additionalLinks.map((link, index) => (
                <li key={index} style={themeStyles.listItem}>
                  <Link
                    to={link.link}
                    style={themeStyles.link}
                    onClick={handleLinkClick}
                  >
                    {link.icon} {link.name}
                  </Link>
                </li>
              ))}
              <li style={themeStyles.listItem}>
                <Link
                  to="/shop?category=Skincare"
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  <FaLeaf /> Herbal Skincare
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/shop?category=Face"
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  <FaTags /> Face Powders
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/shop?category=Hair"
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  <FaTags /> Hair Care
                </Link>
              </li>
            </ul>
          </div>

          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Quick Links</h3>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}>
                <Link
                  to="/about"
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  About Us
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/blog"
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  <FaBlog /> Blog
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/contact"
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  Contact Us
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/wishlist"
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  <FaHeart /> Wishlist
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link
                  to="/track-order"
                  style={themeStyles.link}
                  onClick={handleLinkClick}
                >
                  <FaEye /> Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Help & Support</h3>
            <ul style={themeStyles.list}>
              {helpLinks.map((link, index) => (
                <li key={index} style={themeStyles.listItem}>
                  <Link
                    to={link.link}
                    style={themeStyles.link}
                    onClick={handleLinkClick}
                  >
                    {link.icon} {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Resources</h3>
            <ul style={themeStyles.list}>
              {resourceLinks.map((link, index) => (
                <li key={index} style={themeStyles.listItem}>
                  <Link
                    to={link.link}
                    style={themeStyles.link}
                    onClick={handleLinkClick}
                  >
                    {link.icon} {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 style={{ ...themeStyles.heading, marginTop: "1.5rem" }}>
              Connect With Us
            </h3>
            <div style={themeStyles.socialLinks}>
              <a
                href="https://www.instagram.com/asudha_beauty?utm_source=qr&igsh=aGY4bHp3aGo2MzN6"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                aria-label="Pinterest"
              >
                <FaPinterest />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={themeStyles.socialLink}
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>

            <div style={themeStyles.paymentSection}>
              <h4 style={themeStyles.paymentTitle}>
                Trusted & Secure Payments
              </h4>
              <div style={themeStyles.paymentIcons}>
                <FaCcVisa style={themeStyles.paymentIcon} />
                <FaCcMastercard style={themeStyles.paymentIcon} />
                <FaCcPaypal style={themeStyles.paymentIcon} />
                <FaCcAmex style={themeStyles.paymentIcon} />
                <FaApple style={themeStyles.paymentIcon} />
                <FaGooglePay style={themeStyles.paymentIcon} />
                <FaAmazonPay style={themeStyles.paymentIcon} />
                <SiRazorpay style={themeStyles.paymentIcon} />
                <SiPaytm style={themeStyles.paymentIcon} />
                <SiPhonepe style={themeStyles.paymentIcon} />
              </div>
            </div>
          </div>
        </div>

        <div style={themeStyles.footerBottom}>
          <div style={themeStyles.copyright}>
            <p>
              &copy; {new Date().getFullYear()} ASudha Beauty. All rights
              reserved.
            </p>
          </div>
          <div style={themeStyles.footerLinks}>
            <Link
              to="/privacy"
              style={themeStyles.footerLink}
              onClick={handleLinkClick}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={themeStyles.footerLink}
              onClick={handleLinkClick}
            >
              Terms of Service
            </Link>
            <Link
              to="/shipping"
              style={themeStyles.footerLink}
              onClick={handleLinkClick}
            >
              Shipping Policy
            </Link>
            <Link
              to="/returns"
              style={themeStyles.footerLink}
              onClick={handleLinkClick}
            >
              Returns
            </Link>
          </div>
        </div>
      </div>

      <button
        style={themeStyles.backToTop}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
