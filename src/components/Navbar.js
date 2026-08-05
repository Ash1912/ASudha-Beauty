import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { FaShoppingCart, FaBars, FaTimes, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import WishlistButton from "./WishlistButton";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { getCartCount } = useCart();
  const { isDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Refs for handling clicks
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setShowMobileSearch(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu if clicking outside
      if (
        isMenuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }

      // Close mobile search if clicking outside
      if (
        showMobileSearch &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        !event.target.closest(".search-bar-container")
      ) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, showMobileSearch]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setShowMobileSearch(false);
  };

  const toggleMobileSearch = (e) => {
    e.stopPropagation();
    setShowMobileSearch(!showMobileSearch);
    if (!showMobileSearch) {
      setIsMenuOpen(false);
    }
  };

  // Get responsive logo size
  const getLogoSize = () => {
    if (isSmallMobile) return "30px";
    return "40px";
  };

  // Get responsive padding
  const getNavbarPadding = () => {
    if (isSmallMobile) return "0.4rem 0";
    if (isScrolled) return "0.5rem 0";
    return "0.75rem 0";
  };

  const themeStyles = {
    navbar: {
      backgroundColor: isDarkMode
        ? isScrolled
          ? "#1a1a1a"
          : "#2d2d2d"
        : isScrolled
          ? "#f5346b"
          : "#f5346b",
      boxShadow: isDarkMode
        ? "0 2px 8px rgba(0,0,0,0.3)"
        : "0 2px 8px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      transition: "all 0.3s ease",
      padding: getNavbarPadding(),
      width: "100%",
    },
    navContainer: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: isSmallMobile ? "0 0.5rem" : "0 1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: isSmallMobile ? "0.25rem" : "1rem",
      position: "relative",
      width: "100%",
      boxSizing: "border-box",
    },
    logo: {
      height: getLogoSize(),
      width: "auto",
      maxWidth: isSmallMobile ? "100px" : "120px",
      display: "block",
      filter: "brightness(0) invert(1)",
      transition: "all 0.3s ease",
      objectFit: "contain",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      flexShrink: 0,
      maxWidth: isSmallMobile ? "100px" : "150px",
    },
    // Desktop Navigation Links
    navLinks: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginLeft: "1rem",
    },
    link: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: isSmallMobile ? "0.9rem" : "1rem",
      padding: isSmallMobile ? "0.4rem 0.6rem" : "0.5rem 1rem",
      borderRadius: "4px",
      transition: "all 0.3s ease",
      fontWeight: "500",
      whiteSpace: "nowrap",
      backgroundColor: "transparent",
      ":hover": {
        backgroundColor: isDarkMode ? "#404040" : "#ff4d7a",
      },
    },
    cartLink: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: isSmallMobile ? "1rem" : "1.2rem",
      position: "relative",
      padding: isSmallMobile ? "0.4rem" : "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      flexShrink: 0,
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
    },
    cartCount: {
      position: "absolute",
      top: "-5px",
      right: "-5px",
      backgroundColor: isDarkMode ? "#f5346b" : "#333333",
      color: "#ffffff",
      borderRadius: "50%",
      padding: "2px 6px",
      fontSize: isSmallMobile ? "0.6rem" : "0.8rem",
      minWidth: "16px",
      height: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontWeight: "600",
    },
    menuButton: {
      display: isMobile ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      background: "none",
      fontSize: isSmallMobile ? "1.2rem" : "1.5rem",
      cursor: "pointer",
      color: "#ffffff",
      padding: isSmallMobile ? "0.3rem" : "0.5rem",
      transition: "all 0.3s ease",
      borderRadius: "4px",
      flexShrink: 0,
      minWidth: isSmallMobile ? "32px" : "40px",
      minHeight: isSmallMobile ? "32px" : "40px",
      border: "none",
    },
    mobileSearchButton: {
      display: isMobile ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      background: "none",
      fontSize: isSmallMobile ? "1rem" : "1.2rem",
      cursor: "pointer",
      color: "#ffffff",
      padding: isSmallMobile ? "0.3rem" : "0.5rem",
      transition: "all 0.3s ease",
      borderRadius: "4px",
      flexShrink: 0,
      minWidth: isSmallMobile ? "32px" : "40px",
      minHeight: isSmallMobile ? "32px" : "40px",
      border: "none",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      gap: isSmallMobile ? "0.25rem" : "0.5rem",
      flexShrink: 0,
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: isSmallMobile ? "0.1rem" : "0.5rem",
      flexShrink: 0,
    },
    desktopSearchWrapper: {
      flex: 1,
      maxWidth: "500px",
      margin: "0 1rem",
      minWidth: "200px",
    },
    mobileSearchWrapper: {
      width: "100%",
      padding: "0.75rem",
      boxSizing: "border-box",
      position: "absolute",
      top: "100%",
      left: 0,
      backgroundColor: isDarkMode ? "#2d2d2d" : "#f5346b",
      zIndex: 1001,
      boxShadow: isDarkMode
        ? "0 4px 8px rgba(0,0,0,0.3)"
        : "0 4px 8px rgba(0,0,0,0.1)",
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
      border: "none",
    },
    mobileMenu: {
      position: "fixed",
      top: isSmallMobile ? "55px" : "65px",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDarkMode ? "#2d2d2d" : "#f5346b",
      display: isMenuOpen ? "flex" : "none",
      flexDirection: "column",
      padding: isSmallMobile ? "1rem" : "2rem",
      zIndex: 999,
      overflowY: "auto",
      animation: "slideDown 0.3s ease",
      boxSizing: "border-box",
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      borderTopColor: isDarkMode ? "#404040" : "#ff6b8a",
      borderBottomWidth: "0",
      borderLeftWidth: "0",
      borderRightWidth: "0",
    },
    mobileNavLinks: {
      display: "flex",
      flexDirection: "column",
      gap: isSmallMobile ? "0.5rem" : "1rem",
      marginBottom: isSmallMobile ? "1rem" : "2rem",
    },
    mobileLink: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: isSmallMobile ? "1rem" : "1.2rem",
      padding: isSmallMobile ? "0.6rem" : "1rem",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      fontWeight: "500",
      textAlign: "center",
      backgroundColor: "rgba(255,255,255,0.1)",
      width: "100%",
      boxSizing: "border-box",
      border: "none",
      cursor: "pointer",
      display: "block",
    },
    mobileActions: {
      display: "flex",
      justifyContent: "space-around",
      gap: isSmallMobile ? "0.5rem" : "1rem",
      marginTop: isSmallMobile ? "0.5rem" : "1.5rem",
      paddingTop: isSmallMobile ? "0.5rem" : "1.5rem",
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      borderTopColor: "rgba(255,255,255,0.2)",
      borderBottomWidth: "0",
      borderLeftWidth: "0",
      borderRightWidth: "0",
      flexWrap: "wrap",
    },
    mobileActionItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.3rem",
      color: "#ffffff",
      textDecoration: "none",
      minWidth: "60px",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
    },
    mobileActionIcon: {
      fontSize: isSmallMobile ? "1.2rem" : "1.5rem",
    },
    mobileActionLabel: {
      fontSize: isSmallMobile ? "0.7rem" : "0.8rem",
      whiteSpace: "nowrap",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 998,
      display: isMenuOpen ? "block" : "none",
      border: "none",
    },
  };

  // Add keyframes for animations
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;

    try {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    } catch (e) {
      // Keyframes already added
    }
  }, []);

  return (
    <>
      <nav ref={navbarRef} style={themeStyles.navbar}>
        <div style={themeStyles.navContainer}>
          {/* Left Section - Menu Button (Mobile) + Logo */}
          <div style={themeStyles.leftSection}>
            {/* Hamburger Menu - Only on Mobile */}
            {isMobile && (
              <button
                style={themeStyles.menuButton}
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setShowMobileSearch(false);
                }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            )}

            {/* Logo */}
            <Link to="/" style={themeStyles.logoContainer}>
              <img
                src="/assets/images/Logo.png"
                alt="ASudha Beauty"
                style={themeStyles.logo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/120x40/f8f8f8/e88ca6?text=NC";
                }}
              />
            </Link>
          </div>

          {/* Desktop Search Bar - Only on Desktop */}
          {!isMobile && (
            <div
              style={themeStyles.desktopSearchWrapper}
              className="search-bar-container"
            >
              <SearchBar />
            </div>
          )}

          {/* Desktop Navigation Links - Only on Desktop */}
          {!isMobile && (
            <div style={themeStyles.navLinks}>
              <Link to="/shop" style={themeStyles.link}>
                Shop
              </Link>
              <Link to="/about" style={themeStyles.link}>
                About
              </Link>
              <Link to="/blog" style={themeStyles.link}>
                Blog
              </Link>
              <Link to="/contact" style={themeStyles.link}>
                Contact
              </Link>
            </div>
          )}

          {/* Right Section - Icons */}
          <div style={themeStyles.rightSection}>
            {/* Mobile Search Toggle - Only on Mobile */}
            {isMobile && (
              <button
                ref={searchButtonRef}
                style={themeStyles.mobileSearchButton}
                onClick={toggleMobileSearch}
                aria-label="Toggle search"
              >
                <FaSearch />
              </button>
            )}

            {/* Desktop Icons - All Icons */}
            {!isMobile && (
              <>
                {user ? (
                  <Link to="/profile" style={themeStyles.cartLink}>
                    <FaUser />
                  </Link>
                ) : (
                  <Link to="/login" style={themeStyles.cartLink}>
                    <FaUser />
                  </Link>
                )}
                <WishlistButton />
                <Link to="/cart" style={themeStyles.cartLink}>
                  <FaShoppingCart />
                  {getCartCount() > 0 && (
                    <span style={themeStyles.cartCount}>{getCartCount()}</span>
                  )}
                </Link>
                <ThemeToggle />
              </>
            )}

            {/* Mobile Icons - All Icons */}
            {isMobile && (
              <>
                {user ? (
                  <Link to="/profile" style={themeStyles.cartLink}>
                    <FaUser />
                  </Link>
                ) : (
                  <Link to="/login" style={themeStyles.cartLink}>
                    <FaUser />
                  </Link>
                )}
                <WishlistButton />
                <Link to="/cart" style={themeStyles.cartLink}>
                  <FaShoppingCart />
                  {getCartCount() > 0 && (
                    <span style={themeStyles.cartCount}>{getCartCount()}</span>
                  )}
                </Link>
                <ThemeToggle />
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar (when toggled) */}
        {isMobile && showMobileSearch && (
          <div
            style={themeStyles.mobileSearchWrapper}
            className="search-bar-container"
            onClick={(e) => e.stopPropagation()}
          >
            <SearchBar />
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div style={themeStyles.overlay} onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <div
          ref={mobileMenuRef}
          style={themeStyles.mobileMenu}
          className="mobile-menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div style={themeStyles.mobileNavLinks}>
            <Link
              to="/shop"
              style={themeStyles.mobileLink}
              onClick={handleLinkClick}
            >
              Shop
            </Link>
            <Link
              to="/about"
              style={themeStyles.mobileLink}
              onClick={handleLinkClick}
            >
              About
            </Link>
            <Link
              to="/blog"
              style={themeStyles.mobileLink}
              onClick={handleLinkClick}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              style={themeStyles.mobileLink}
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Action Icons (Only for logout if needed) */}
          <div style={themeStyles.mobileActions}>
            {user && (
              <button
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                style={themeStyles.mobileActionItem}
              >
                <FaSignOutAlt style={themeStyles.mobileActionIcon} />
                <span style={themeStyles.mobileActionLabel}>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;