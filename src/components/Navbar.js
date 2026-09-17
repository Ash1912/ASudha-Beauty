import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import WishlistButton from "./WishlistButton";

const Navbar = () => {
  const { getCartCount } = useCart();
  const { isDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // ─── Responsive breakpoints ─────────────────────────────────────
  const isSmallMobile = windowWidth <= 360;
  const isMobile = windowWidth <= 992;
  const isTablet = windowWidth <= 768;

  // ─── Close menus on route change ─────────────────────────────────
  useEffect(() => {
    setIsMenuOpen(false);
    setShowMobileSearch(false);
  }, [location.pathname, location.search]);

  // ─── Single resize + scroll listener ─────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width > 992) {
        setIsMenuOpen(false);
        setShowMobileSearch(false);
      }
    };

    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ─── Click outside (mobile menu) ─────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // ─── Lock body scroll while mobile menu open ─────────────────────
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : previous || "";
    return () => {
      document.body.style.overflow = previous || "";
    };
  }, [isMenuOpen]);

  // ─── Escape key closes mobile menu ───────────────────────────────
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setShowMobileSearch(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
    setShowMobileSearch(false);
  }, []);

  const toggleMobileSearch = useCallback((e) => {
    e?.stopPropagation();
    setShowMobileSearch((prev) => !prev);
    setIsMenuOpen(false);
  }, []);

  // ─── Brand tokens ────────────────────────────────────────────────
  const brandColors = useMemo(
    () => ({
      gold: "#f7d794",
      pink: "#f5346b",
      pinkDark: "#cf2a57",

      espresso: "#2F1B24",
      burgundy: "#6B253C",
      burgundyDark: "#4A1728",

      black: "#0f0f0f",
      darkSlate: "#1a1a1a",
      cream: "#fcf8f5",
      earthDark: "#3e2723",
    }),
    [],
  );

  const navLinks = useMemo(
    () => [
      { to: "/shop", label: "Shop" },
      { to: "/about", label: "About" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
    ],
    [],
  );

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  const getLogoSize = () => {
    if (isSmallMobile) return "30px";
    if (isTablet) return "36px";
    if (isMobile) return "40px";
    return "54px";
  };

  const getNavbarPadding = () =>
    isSmallMobile ? "0.5rem 0" : isScrolled ? "0.55rem 0" : "0.75rem 0";

  const getNavbarBackground = () => {
    if (isDarkMode) {
      return isScrolled ? "rgba(15, 15, 15, 0.92)" : brandColors.black;
    }
    return isScrolled
      ? `linear-gradient(135deg, ${brandColors.gold}cc 0%, ${brandColors.pink}cc 100%)`
      : `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.pink} 100%)`;
  };

  // ✅ Logo forced to BLACK in light theme, WHITE in dark theme
  const getLogoFilter = () =>
    isDarkMode ? "brightness(0) invert(1)" : "brightness(0)";

  const themeStyles = {
    navbar: {
      background: getNavbarBackground(),
      backdropFilter: isScrolled ? "blur(12px)" : "none",
      WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
      boxShadow: isDarkMode
        ? isScrolled
          ? "0 4px 30px rgba(0,0,0,0.6)"
          : "0 2px 20px rgba(0,0,0,0.4)"
        : isScrolled
          ? "0 4px 30px rgba(245, 52, 107, 0.25)"
          : "0 2px 20px rgba(245, 52, 107, 0.12)",
      position: "sticky",
      top: 0,
      zIndex: 1200,
      transition:
        "background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease",
      padding: getNavbarPadding(),
      width: "100%",
      maxWidth: "100vw",
      borderBottom: isScrolled
        ? "none"
        : `1px solid ${
            isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.15)"
          }`,
    },
    navContainer: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: isSmallMobile ? "0 0.5rem" : isTablet ? "0 0.75rem" : "0 1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: isSmallMobile ? "0.2rem" : isTablet ? "0.35rem" : "0.5rem",
      position: "relative",
      width: "100%",
      boxSizing: "border-box",
    },
    logo: {
      height: getLogoSize(),
      width: "auto",
      maxWidth: isSmallMobile
        ? "80px"
        : isTablet
          ? "105px"
          : isMobile
            ? "140px"
            : "190px",
      display: "block",
      filter: getLogoFilter(),
      transition: "filter 0.3s ease, height 0.3s ease",
      objectFit: "contain",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      flexShrink: 0,
      padding: "0.2rem",
      borderRadius: "10px",
      transition: "transform 0.3s ease",
    },
    navLinks: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      gap: "0.15rem",
      marginLeft: "1rem",
      flexShrink: 1,
    },
    link: (active) => ({
      color: isDarkMode
        ? "#fff"
        : active
          ? brandColors.burgundyDark
          : brandColors.espresso,

      textDecoration: "none",

      fontSize: "0.95rem",

      fontWeight: active ? "700" : "600",

      letterSpacing: "0.3px",

      padding: "0.55rem 1rem",

      borderRadius: "999px",

      transition: "all .25s ease",

      whiteSpace: "nowrap",

      backgroundColor: active
        ? isDarkMode
          ? "rgba(255,255,255,.15)"
          : "rgba(255,255,255,.22)"
        : "transparent",

      display: "flex",
      alignItems: "center",

      position: "relative",
    }),
    cartLink: {
      color: isDarkMode ? "#ffffff" : brandColors.espresso,
      textDecoration: "none",
      fontSize: isSmallMobile ? "0.9rem" : isTablet ? "1rem" : "1.05rem",
      position: "relative",
      padding: isSmallMobile ? "0.2rem" : "0.3rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      flexShrink: 0,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.08)",
      border: "none",
      cursor: "pointer",
      borderRadius: "50%",
      width: isSmallMobile ? "32px" : isTablet ? "36px" : "40px",
      height: isSmallMobile ? "32px" : isTablet ? "36px" : "40px",
      fontFamily: "inherit",
    },
    cartCount: {
      position: "absolute",
      top: "-3px",
      right: "-3px",
      backgroundColor: isDarkMode ? brandColors.gold : "#ffffff",
      color: isDarkMode ? brandColors.black : brandColors.pink,
      borderRadius: "50%",
      padding: "1px 5px",
      fontSize: isSmallMobile ? "0.5rem" : "0.6rem",
      minWidth: "17px",
      height: "17px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "800",
      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
      border: `2px solid ${isDarkMode ? brandColors.black : "#ffffff"}`,
    },
    iconButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isDarkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.22)",
      fontSize: isSmallMobile ? "0.9rem" : "1rem",
      cursor: "pointer",
      color: isDarkMode ? "#ffffff" : "#111111",
      padding: isSmallMobile ? "0.2rem" : "0.3rem",
      transition: "all 0.3s ease",
      borderRadius: "50%",
      flexShrink: 0,
      minWidth: isSmallMobile ? "32px" : "40px",
      minHeight: isSmallMobile ? "32px" : "40px",
      border: "none",
      fontFamily: "inherit",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      gap: isSmallMobile ? "0.15rem" : "0.35rem",
      flexShrink: 0,
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: isSmallMobile ? "0.15rem" : isTablet ? "0.25rem" : "0.4rem",
      flexShrink: 0,
    },
    desktopSearchWrapper: {
      flex: 1,
      maxWidth: "500px",
      margin: "0 1rem",
      minWidth: "150px",
    },
    mobileSearchWrapper: {
      width: "100%",
      padding: "0.6rem 0.85rem",
      boxSizing: "border-box",
      position: "absolute",
      top: "100%",
      left: 0,
      background: isDarkMode
        ? "linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)"
        : `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.pink} 100%)`,
      zIndex: 1250,
      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      borderBottomLeftRadius: "14px",
      borderBottomRightRadius: "14px",
      border: "none",
      animation: "slideDown 0.3s ease",
    },
    mobileMenu: {
      position: "fixed",
      top: isSmallMobile ? "52px" : isTablet ? "60px" : "68px",
      left: 0,
      right: 0,
      bottom: 0,
      background: isDarkMode
        ? "linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)"
        : `linear-gradient(180deg, ${brandColors.pink} 0%, ${brandColors.pinkDark} 100%)`,
      display: isMenuOpen ? "flex" : "none",
      flexDirection: "column",
      padding: isSmallMobile ? "1rem" : isTablet ? "1.5rem" : "2rem",
      zIndex: 1190,
      overflowY: "auto",
      animation: "slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      boxSizing: "border-box",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "inset 0 20px 40px rgba(0,0,0,0.2)",
    },
    mobileNavLinks: {
      display: "flex",
      flexDirection: "column",
      gap: isSmallMobile ? "0.4rem" : isTablet ? "0.5rem" : "0.75rem",
      marginBottom: isSmallMobile ? "1rem" : isTablet ? "1.5rem" : "2rem",
    },
    mobileLink: (active) => ({
      color: "#ffffff",
      textDecoration: "none",
      fontSize: isSmallMobile ? "0.9rem" : isTablet ? "1rem" : "1.1rem",
      padding: isSmallMobile ? "0.65rem" : isTablet ? "0.75rem" : "0.85rem",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      fontWeight: active ? "700" : "500",
      letterSpacing: "0.5px",
      textAlign: "center",
      backgroundColor: active
        ? "rgba(255,255,255,0.18)"
        : "rgba(255,255,255,0.06)",
      width: "100%",
      boxSizing: "border-box",
      border: active
        ? "1px solid rgba(255,255,255,0.25)"
        : "1px solid transparent",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    }),
    mobileActions: {
      display: "flex",
      justifyContent: "space-around",
      gap: isSmallMobile ? "0.3rem" : "0.5rem",
      marginTop: "auto",
      paddingTop: isSmallMobile ? "0.75rem" : "1rem",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      flexWrap: "wrap",
      paddingBottom: isSmallMobile ? "0.75rem" : "1.5rem",
    },
    mobileActionItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.25rem",
      color: "#ffffff",
      textDecoration: "none",
      minWidth: "60px",
      backgroundColor: "rgba(255,255,255,0.08)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      padding: "0.5rem 0.75rem",
      transition: "all 0.3s ease",
      fontSize: isSmallMobile ? "0.7rem" : "0.8rem",
      fontFamily: "inherit",
    },
    mobileActionIcon: {
      fontSize: isSmallMobile ? "1rem" : "1.2rem",
    },
    mobileActionLabel: {
      fontSize: isSmallMobile ? "0.6rem" : "0.7rem",
      whiteSpace: "nowrap",
      fontWeight: "600",
    },
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      zIndex: 1180,
      display: isMenuOpen ? "block" : "none",
      border: "none",
      animation: "fadeIn 0.3s ease",
    },
  };

  // ─── Global CSS ───────────────────────────────────────────────────
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-15px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* ─── Nav links ─── */
      .nav-link-item {
        position: relative;
      }
      .nav-link-item::after {
        content: "";
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 55%;
        height: 2px;
        background: ${isDarkMode ? "#ffffff" : "#111111"};
        border-radius: 2px;
        transition: transform 0.3s ease;
      }
      .nav-link-item:hover {
        background-color: ${
          isDarkMode ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.12)"
        } !important;
        transform: translateY(2px);   /* ✅ press DOWN on hover */
      }
      .nav-link-item:hover::after,
      .nav-link-item.nav-link-active::after {
        transform: translateX(-50%) scaleX(1);
      }
      .nav-link-item.nav-link-active {
        background-color: ${
          isDarkMode ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.14)"
        } !important;
      }

      /* ─── Icon buttons: press DOWN on hover ─── */
      .nav-icon-btn {
        transition: background-color 0.25s ease, box-shadow 0.25s ease,
          transform 0.25s ease;
      }
      .nav-icon-btn:hover {
        background-color: ${
          isDarkMode ? "rgba(255, 255, 255, 0.22)" : "rgba(0, 0, 0, 0.16)"
        } !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        transform: translateY(3px) scale(0.98);   /* ✅ press DOWN */
      }
      .nav-icon-btn:active {
        transform: translateY(4px) scale(0.94);
        transition: transform 0.15s ease;
      }

      /* ─── Logo ─── */
      .nav-logo-link:hover {
        transform: scale(1.03);
      }

      /* ─── Mobile menu links ─── */
      .mobile-menu-link {
        transition: transform 0.25s ease, background-color 0.25s ease,
          border-color 0.25s ease;
      }
      .mobile-menu-link:hover {
        background-color: rgba(255, 255, 255, 0.18) !important;
        transform: translateX(4px);
      }

      /* ─── Mobile action buttons ─── */
      .mobile-action-btn {
        transition: background-color 0.25s ease, transform 0.25s ease;
      }
      .mobile-action-btn:hover {
        background-color: rgba(255, 255, 255, 0.2) !important;
        transform: translateY(3px) scale(0.98);   /* ✅ press DOWN */
      }
      .mobile-action-btn:active {
        transform: translateY(4px) scale(0.94);
      }

      /* ─── Theme toggle wrapper ─── */
      .theme-toggle-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .theme-toggle-wrapper svg {
        color: ${isDarkMode ? "#ffffff" : "#111111"} !important;
        fill: ${isDarkMode ? "#ffffff" : "#111111"} !important;
        stroke: ${isDarkMode ? "#ffffff" : "#111111"} !important;
      }
      .theme-toggle-wrapper button {
        color: ${isDarkMode ? "#ffffff" : "#111111"} !important;
        background-color: ${
          isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"
        } !important;
        transition: background-color 0.25s ease, transform 0.25s ease,
          box-shadow 0.25s ease;
      }
      .theme-toggle-wrapper button:hover {
        background-color: ${
          isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.16)"
        } !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        transform: translateY(3px) scale(0.98);   /* ✅ press DOWN */
      }
      .theme-toggle-wrapper button:active {
        transform: translateY(4px) scale(0.94);
      }

      @media (max-width: 480px) {
        .mobile-menu {
          padding: 1rem !important;
        }
        .mobile-menu a,
        .mobile-menu button {
          font-size: 0.9rem !important;
          padding: 0.65rem !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [isDarkMode]);

  return (
    <>
      <nav ref={navbarRef} style={themeStyles.navbar}>
        <div style={themeStyles.navContainer}>
          <div style={themeStyles.leftSection}>
            {isMobile && (
              <button
                style={themeStyles.iconButton}
                className="nav-icon-btn"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setShowMobileSearch(false);
                }}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                type="button"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            )}

            <Link
              to="/"
              style={themeStyles.logoContainer}
              className="nav-logo-link"
              aria-label="ASudha Beauty home"
            >
              <img
                src="/assets/images/Logo.png"
                alt="ASudha Beauty"
                style={themeStyles.logo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/200x60/f8f8f8/e88ca6?text=ASudha";
                }}
              />
            </Link>
          </div>

          {!isMobile && (
            <div
              style={themeStyles.desktopSearchWrapper}
              className="search-bar-container"
            >
              <SearchBar />
            </div>
          )}

          {!isMobile && (
            <div style={themeStyles.navLinks}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={themeStyles.link(isActive(link.to))}
                  className={`nav-link-item${
                    isActive(link.to) ? " nav-link-active" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div style={themeStyles.rightSection}>
            {isMobile && (
              <button
                style={themeStyles.iconButton}
                className="nav-icon-btn"
                onClick={toggleMobileSearch}
                aria-label="Toggle search"
                aria-expanded={showMobileSearch}
                type="button"
              >
                <FaSearch />
              </button>
            )}

            <Link
              to={user ? "/profile" : "/login"}
              style={themeStyles.cartLink}
              className="nav-icon-btn"
              aria-label={user ? "Profile" : "Login"}
            >
              <FaUser />
            </Link>

            <WishlistButton />

            <Link
              to="/cart"
              style={themeStyles.cartLink}
              className="nav-icon-btn"
              aria-label={`Cart${
                getCartCount() > 0 ? ` (${getCartCount()})` : ""
              }`}
            >
              <FaShoppingCart />
              {getCartCount() > 0 && (
                <span style={themeStyles.cartCount}>{getCartCount()}</span>
              )}
            </Link>

            <div className="theme-toggle-wrapper">
              <ThemeToggle />
            </div>
          </div>
        </div>

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

      {isMobile && isMenuOpen && (
        <div
          style={themeStyles.overlay}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {isMobile && (
        <div
          ref={mobileMenuRef}
          style={themeStyles.mobileMenu}
          className="mobile-menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div style={themeStyles.mobileNavLinks}>
            <Link
              to="/"
              style={themeStyles.mobileLink(isActive("/"))}
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <FaHome style={{ fontSize: "0.9em" }} />
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={themeStyles.mobileLink(isActive(link.to))}
                className="mobile-menu-link"
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={themeStyles.mobileActions}>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                style={themeStyles.mobileActionItem}
                className="mobile-action-btn"
                type="button"
              >
                <FaSignOutAlt style={themeStyles.mobileActionIcon} />
                <span style={themeStyles.mobileActionLabel}>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                style={themeStyles.mobileActionItem}
                className="mobile-action-btn"
                onClick={handleLinkClick}
              >
                <FaUser style={themeStyles.mobileActionIcon} />
                <span style={themeStyles.mobileActionLabel}>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
