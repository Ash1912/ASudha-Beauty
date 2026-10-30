// src/components/ProductCard.jsx
import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";
import {
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaLeaf,
  FaStar,
  FaEye,
} from "react-icons/fa";

// ─── Brand palette (module scope: stable) ───
const brandColors = {
  primary: "#f5346b",
  primaryHover: "#ff4d7a",
  secondary: "#c77d42",
  earthDark: "#3e2723",
  earthLight: "#6d4c41",
  gold: "#f7d794",
  goldDark: "#d4af37",
  green: "#4caf50",
  cream: "#fcf8f5",
};

// Coerce numeric values safely (protects against string prices from API)
const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const ProductCard = ({
  product,
  onAddToCart,
  showBadge = false,
  badgeText = "",
}) => {
  const { isDarkMode } = useTheme();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // ─── Null-safe product ───
  const safeProduct = product || {};

  const inWishlist = isInWishlist(safeProduct.id);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  // ─── Handlers ───
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(safeProduct);
  };

  const handleImageLoad = (e) => {
    setImageLoaded(true);
    setImageDimensions({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight,
    });
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.onerror = null;
    e.target.src =
      "https://via.placeholder.com/500x500/f8f8f8/f5346b?text=ASudha";
  };

  // ─── Computed values ───
  const priceNum = toNumber(safeProduct.price);
  const mrpNum = toNumber(safeProduct.mrp);
  const hasDiscount = mrpNum > priceNum;
  const discount = hasDiscount
    ? Math.round(((mrpNum - priceNum) / mrpNum) * 100)
    : 0;
  const isNatural =
    safeProduct.category === "Skincare" ||
    safeProduct.category === "Hair Care";
  const productUrl = `/product/${safeProduct.id}`;

  const shouldShowBadge =
    showBadge === true ||
    (safeProduct.bestSeller === true && badgeText === "");
  const finalBadgeText =
    badgeText || (safeProduct.bestSeller ? "Best Seller" : "");

  // ─── Image fitting logic ───
  const getImageStyle = () => {
    if (!imageLoaded || imageDimensions.width === 0) {
      return { ...themeStyles.image, objectFit: "cover" };
    }
    const aspectRatio = imageDimensions.width / imageDimensions.height;
    if (aspectRatio > 1.5 || aspectRatio < 0.67) {
      return {
        ...themeStyles.image,
        objectFit: "contain",
        backgroundColor: isDarkMode ? "#1a1a1a" : "#f7f0eb",
        padding: "15px",
      };
    }
    return { ...themeStyles.image, objectFit: "cover" };
  };

  // ─── Theme styles ───
  const themeStyles = {
    card: {
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      cursor: "pointer",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
    },
    cardAccent: {
      height: "4px",
      background: isDarkMode
        ? "linear-gradient(90deg, #f7d794 0%, #f5346b 50%, #f7d794 100%)"
        : "linear-gradient(90deg, #d4af37 0%, #f5346b 50%, #d4af37 100%)",
      width: "100%",
    },
    wishlistButton: {
      position: "absolute",
      top: "12px",
      right: "12px",
      background: isDarkMode
        ? "rgba(26, 26, 26, 0.8)"
        : "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: "1px solid rgba(212, 175, 55, 0.15)",
      borderRadius: "50%",
      width: "38px",
      height: "38px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 10,
      color: inWishlist
        ? brandColors.primary
        : isDarkMode
        ? "#ffffff"
        : brandColors.earthDark,
      boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      fontFamily: "inherit",
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      paddingTop: "100%",
      overflow: "hidden",
      backgroundColor: isDarkMode ? "#0f0f0f" : brandColors.cream,
    },
    imageWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      width: "auto",
      height: "auto",
    },
    imageLoading: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#0f0f0f" : brandColors.cream,
      color: isDarkMode ? "#888888" : "#a1887f",
      fontSize: "0.85rem",
      fontWeight: "500",
      letterSpacing: "0.5px",
    },
    quickViewOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "0.75rem",
      background: isDarkMode
        ? "rgba(15, 15, 15, 0.9)"
        : "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.75rem",
      borderTop: "1px solid rgba(212, 175, 55, 0.15)",
    },
    quickViewText: {
      fontSize: "0.8rem",
      fontWeight: "500",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
    },
    contentTop: {
      padding: "1.2rem 1rem 0 1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      boxSizing: "border-box",
    },
    contentBottom: {
      padding: "0 1rem 1rem 1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flex: 1,
      width: "100%",
      boxSizing: "border-box",
    },
    category: {
      fontSize: "0.7rem",
      color: brandColors.gold,
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      marginBottom: "0.15rem",
      fontWeight: "600",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    name: {
      fontSize: "1rem",
      margin: "0.3rem 0 0.2rem 0",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      fontWeight: "600",
      lineHeight: "1.4",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      minHeight: "2.8rem",
    },
    itemNo: {
      fontSize: "0.75rem",
      color: isDarkMode ? "#a0a0a0" : "#8d6e63",
      marginBottom: "0.2rem",
      fontWeight: "400",
    },
    priceContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      margin: "0.5rem 0 0.75rem 0",
      flexWrap: "wrap",
    },
    price: {
      fontSize: "1.15rem",
      fontWeight: "700",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
    },
    mrp: {
      fontSize: "0.85rem",
      color: isDarkMode ? "#a0a0a0" : "#a1887f",
      textDecoration: "line-through",
    },
    discount: {
      fontSize: "0.75rem",
      color: brandColors.green,
      fontWeight: "600",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.08)",
      padding: "2px 10px",
      borderRadius: "12px",
    },
    ratingContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
      marginBottom: "0.5rem",
    },
    ratingStars: {
      display: "flex",
      gap: "0.1rem",
      color: "#ffc107",
    },
    ratingCount: {
      fontSize: "0.7rem",
      color: isDarkMode ? "#a0a0a0" : "#a1887f",
      marginLeft: "0.2rem",
    },
    button: {
      width: "100%",
      padding: "0.7rem",
      background: "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      color: isDarkMode ? "#0f0f0f" : "#ffffff",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontSize: "0.85rem",
      fontWeight: "600",
      boxShadow: isDarkMode
        ? "0 4px 12px rgba(245, 52, 107, 0.4)"
        : "0 4px 12px rgba(245, 52, 107, 0.15)",
      letterSpacing: "0.3px",
      fontFamily: "inherit",
      marginTop: "auto",
    },
    badge: {
      position: "absolute",
      top: "12px",
      left: "12px",
      background: "linear-gradient(135deg, #f7d794 0%, #d4af37 100%)",
      color: "#ffffff",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.65rem",
      fontWeight: "700",
      zIndex: 10,
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      boxShadow: "0 2px 12px rgba(212, 175, 55, 0.4)",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    naturalBadge: {
      position: "absolute",
      top: "12px",
      left: "12px",
      background: "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
      color: "#ffffff",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.65rem",
      fontWeight: "700",
      zIndex: 10,
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      boxShadow: "0 2px 12px rgba(76, 175, 80, 0.4)",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    inStockIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
      fontSize: "0.7rem",
      color: brandColors.green,
      marginTop: "0.2rem",
    },
  };

  // ─── Injected CSS: hover states that inline styles can't express ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-product-card="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-product-card", "true");
    style.textContent = `
      /* Card hover lift + shadow */
      .pc-card {
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    box-shadow 0.4s ease;
        box-shadow: ${
          isDarkMode
            ? "0 8px 24px rgba(0,0,0,0.6)"
            : "0 6px 24px rgba(62, 39, 35, 0.06)"
        };
      }
      .pc-card:hover,
      .pc-card:focus-within {
        transform: translateY(-8px);
        box-shadow: ${
          isDarkMode
            ? "0 16px 40px rgba(0,0,0,0.8)"
            : "0 16px 40px rgba(245, 52, 107, 0.12)"
        };
      }
      .pc-card:hover .pc-accent { opacity: 1; }
      .pc-card:hover .pc-image-wrap { transform: scale(1.03); }
      .pc-card:hover .pc-quick-view { transform: translateY(0); }

      /* Accent bar */
      .pc-accent {
        opacity: 0.6;
        transition: opacity 0.4s ease;
      }

      /* Image wrapper zoom */
      .pc-image-wrap {
        transition: transform 0.6s ease;
        transform: scale(1);
      }

      /* Quick view slide-in */
      .pc-quick-view {
        transform: translateY(100%);
        transition: transform 0.4s ease;
      }

      /* Wishlist button hover */
      .pc-wishlist-btn {
        transition: all 0.3s ease;
      }
      .pc-wishlist-btn:hover {
        transform: scale(1.12);
        background: ${isDarkMode ? "rgba(255,255,255,0.1)" : "#ffffff"};
      }
      .pc-wishlist-btn:not(.pc-wishlist-active):hover {
        border-color: ${brandColors.gold};
      }
      .pc-wishlist-btn.pc-wishlist-active:hover {
        border-color: ${brandColors.primary};
      }
      .pc-wishlist-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }

      /* Add to cart button hover */
      .pc-add-cart-btn {
        transition: all 0.3s ease;
      }
      .pc-add-cart-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 20px rgba(245, 52, 107, 0.5);
      }
      .pc-add-cart-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }

      /* Image link focus ring */
      .pc-main-link:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 4px;
        border-radius: 12px;
      }

      @media (prefers-reduced-motion: reduce) {
        .pc-card,
        .pc-accent,
        .pc-image-wrap,
        .pc-quick-view,
        .pc-wishlist-btn,
        .pc-add-cart-btn {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-product-card="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  const getBadgeStyle = () => {
    if (
      badgeText === "Natural" ||
      safeProduct.category === "Skincare" ||
      safeProduct.category === "Hair Care"
    ) {
      return themeStyles.naturalBadge;
    }
    return themeStyles.badge;
  };

  return (
    <article style={themeStyles.card} className="pc-card">
      <div
        style={themeStyles.cardAccent}
        className="pc-accent"
        aria-hidden="true"
      />

      {/* Wishlist (outside Link: prevents invalid nesting, keeps click isolated) */}
      <button
        type="button"
        style={themeStyles.wishlistButton}
        className={`pc-wishlist-btn${
          inWishlist ? " pc-wishlist-active" : ""
        }`}
        onClick={handleWishlistClick}
        aria-label={
          inWishlist
            ? `Remove ${safeProduct.name || "product"} from wishlist`
            : `Add ${safeProduct.name || "product"} to wishlist`
        }
        aria-pressed={inWishlist}
      >
        {inWishlist ? (
          <FaHeart aria-hidden="true" style={{ color: brandColors.primary }} />
        ) : (
          <FaRegHeart aria-hidden="true" />
        )}
      </button>

      {shouldShowBadge && finalBadgeText && (
        <div style={getBadgeStyle()}>
          {isNatural ? (
            <FaLeaf aria-hidden="true" style={{ fontSize: "0.6rem" }} />
          ) : (
            <FaStar aria-hidden="true" style={{ fontSize: "0.6rem" }} />
          )}
          {finalBadgeText}
        </div>
      )}

      {/* Clickable link: image + title header only */}
      <Link
        to={productUrl}
        className="pc-main-link"
        style={{ textDecoration: "none", display: "block" }}
        aria-label={`View ${safeProduct.name || "product"} details`}
      >
        <div style={themeStyles.imageContainer}>
          <div style={themeStyles.imageWrapper} className="pc-image-wrap">
            {!imageLoaded && !imageError && (
              <div style={themeStyles.imageLoading}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <span>Loading…</span>
                </div>
              </div>
            )}
            <img
              src={safeProduct.image}
              alt={`${safeProduct.name || "Product"} — ${
                safeProduct.category || "Ayurvedic beauty"
              } by ASudha Beauty`}
              style={{
                ...themeStyles.image,
                ...(imageLoaded ? getImageStyle() : { opacity: 0 }),
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div style={themeStyles.quickViewOverlay} className="pc-quick-view">
            <span style={themeStyles.quickViewText}>
              <FaEye aria-hidden="true" style={{ fontSize: "0.8rem" }} />
              Quick View
            </span>
          </div>
        </div>

        <div style={themeStyles.contentTop}>
          <span style={themeStyles.category}>
            {isNatural && (
              <FaLeaf aria-hidden="true" style={{ fontSize: "0.6rem" }} />
            )}
            {safeProduct.category}
          </span>
          <h3 style={themeStyles.name}>{safeProduct.name}</h3>
          {safeProduct.itemNo && (
            <p style={themeStyles.itemNo}>#{safeProduct.itemNo}</p>
          )}
        </div>
      </Link>

      {/* Non-clickable body: rating, price, stock, Add to Cart */}
      <div style={themeStyles.contentBottom}>
        {safeProduct.rating && (
          <div
            style={themeStyles.ratingContainer}
            role="img"
            aria-label={`Rated ${safeProduct.rating} out of 5 from ${
              safeProduct.reviews || 0
            } reviews`}
          >
            <div style={themeStyles.ratingStars}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  aria-hidden="true"
                  color={
                    i < Math.floor(safeProduct.rating) ? "#ffc107" : "#e0e0e0"
                  }
                  size={12}
                />
              ))}
            </div>
            <span style={themeStyles.ratingCount}>
              ({safeProduct.reviews || 0})
            </span>
          </div>
        )}

        <div style={themeStyles.priceContainer}>
          <span style={themeStyles.price}>₹{priceNum.toFixed(2)}</span>
          {hasDiscount && (
            <>
              <span style={themeStyles.mrp}>₹{mrpNum.toFixed(2)}</span>
              <span style={themeStyles.discount}>{discount}% OFF</span>
            </>
          )}
        </div>

        {safeProduct.inStock !== false && (
          <div style={themeStyles.inStockIndicator}>
            <span
              aria-hidden="true"
              style={{ color: brandColors.green, fontSize: "0.6rem" }}
            >
              ●
            </span>
            In Stock
          </div>
        )}

        <button
          type="button"
          style={themeStyles.button}
          className="pc-add-cart-btn"
          onClick={() => onAddToCart(safeProduct)}
          aria-label={`Add ${safeProduct.name || "product"} to cart`}
        >
          <FaShoppingCart
            aria-hidden="true"
            style={{ fontSize: "0.85rem" }}
          />
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;