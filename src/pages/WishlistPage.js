import React, { useState, useEffect, useLayoutEffect } from "react";
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
  earthDark: "#3e2723",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

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

  // ✅ Keep items in wishlist after adding to cart (do NOT auto-remove)
  const handleAddToCart = (product) => {
    addToCart(
      product,
      Array.isArray(product.shades) && product.shades.length > 0
        ? product.shades[0]
        : "",
      1
    );
  };

  // ✅ Count BOTH Skincare and Hair Care
  const naturalCount = wishlistItems.filter(
    (p) => p.category === "Skincare" || p.category === "Hair Care"
  ).length;

  // ✅ Show the user's actual wishlist names as chips (first 4 + "more")
  const wishlistNames = wishlistItems.map((p) => p.name);

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
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
      .wl-cta-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 40px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
      }

      .wl-cta-secondary {
        transition: transform 0.3s ease, border-color 0.3s ease,
                    color 0.3s ease;
      }
      .wl-cta-secondary:hover {
        border-color: ${brandColors.primary} !important;
        color: ${brandColors.primary} !important;
        transform: translateY(-3px);
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
        box-shadow: ${T.shadowLift};
        border-color: ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.35)"
            : "rgba(199, 125, 66, 0.25)"
        } !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-wishlist-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const themeStyles = {
    // ─── Page wrapper ───
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

    // ─── Animated background ───
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

    // ─── Content wrapper ───
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

    // ─── Continue shopping CTA card ───
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
  };

  // ─── Shared background ───
  const BackgroundLayer = () => (
    <div style={themeStyles.bgLayer}>
      <div style={themeStyles.bgGradient} />
      <div style={themeStyles.bgGrid} />
      <div
        className="wl-orb-1"
        style={themeStyles.bgOrb1}
        aria-hidden="true"
      />
      <div
        className="wl-orb-2"
        style={themeStyles.bgOrb2}
        aria-hidden="true"
      />
      <div
        className="wl-orb-3"
        style={themeStyles.bgOrb3}
        aria-hidden="true"
      />
    </div>
  );

  // ─── EMPTY STATE ─────────────────────────────────────────────────
  if (wishlistItems.length === 0) {
    return (
      <div style={themeStyles.container}>
        <BackgroundLayer />
        <div style={themeStyles.content}>
          <SEO
            title="My Wishlist | ASudha Beauty"
            description="Your saved natural skincare and hair care favorites at ASudha Beauty. Save Ayurvedic products for later."
            url="/wishlist"
          />

          <h1 style={themeStyles.title}>
            <FaHeart style={themeStyles.titleIcon} />
            My Natural Wishlist
          </h1>

          <div style={themeStyles.emptyWishlist}>
            <div style={themeStyles.emptyAccentBar} />
            <div style={themeStyles.emptyIconWrapper}>
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
                <FaLeaf /> Explore Skincare
              </Link>
              <Link
                to="/shop?category=Hair Care"
                style={themeStyles.browseButton}
                className="wl-cta-secondary"
              >
                <FaSpa /> Explore Hair Care{" "}
                <FaArrowRight style={{ fontSize: "0.75em" }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── WISHLIST WITH ITEMS ─────────────────────────────────────────
  return (
    <div style={themeStyles.container}>
      <BackgroundLayer />
      <div style={themeStyles.content}>
        <SEO
          title={`My Wishlist (${wishlistItems.length}) | ASudha Beauty`}
          description={`You have ${wishlistItems.length} natural Ayurvedic products saved in your wishlist.`}
          url="/wishlist"
        />

        <h1 style={themeStyles.title}>
          <FaHeart style={themeStyles.titleIcon} />
          My Natural Wishlist
        </h1>

        <div style={themeStyles.subtitle}>
          <span>
            {wishlistItems.length} item
            {wishlistItems.length !== 1 ? "s" : ""} saved
          </span>
          {naturalCount > 0 && (
            <span style={themeStyles.naturalBadge}>
              <FaLeaf /> {naturalCount} Natural Product
              {naturalCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* ✅ Real wishlist items as chips */}
        {wishlistNames.length > 0 && (
          <div style={themeStyles.naturalCollection}>
            <div style={themeStyles.collectionAccentBar} />
            <FaSpa style={{ color: brandColors.green, fontSize: "1.25rem" }} />
            <span style={themeStyles.collectionLabel}>Your Collection:</span>
            {wishlistNames.slice(0, 4).map((name, idx) => (
              <span
                key={idx}
                style={themeStyles.collectionItem}
                className="wl-chip"
              >
                <FaLeaf
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

        <div style={themeStyles.wishlistGrid}>
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
                  ? "🌿 Natural"
                  : ""
              }
            />
          ))}
        </div>

        {/* Continue shopping CTA */}
        <div style={themeStyles.ctaCard} className="wl-cta-card">
          <div style={themeStyles.ctaAccentBar} />
          <h3 style={themeStyles.ctaTitle}>Looking for more?</h3>
          <p style={themeStyles.ctaText}>
            <FaLeaf
              style={{
                color: brandColors.green,
                marginRight: "0.4rem",
              }}
            />
            Explore our full collection of 100% natural, Ayurvedic skincare and
            hair care powders.
          </p>
          <Link
            to="/shop"
            style={themeStyles.ctaButton}
            className="wl-cta-primary"
          >
            <FaShoppingBag /> Continue Shopping <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;