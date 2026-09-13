import React, { useState } from "react";
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

const ProductCard = ({
  product,
  onAddToCart,
  showBadge = false,
  badgeText = "",
}) => {
  const { isDarkMode } = useTheme();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
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

  const getImageStyle = () => {
    if (!imageLoaded || imageDimensions.width === 0) {
      return {
        ...themeStyles.image,
        objectFit: "cover",
      };
    }

    const aspectRatio = imageDimensions.width / imageDimensions.height;

    if (aspectRatio > 1.5 || aspectRatio < 0.67) {
      return {
        ...themeStyles.image,
        objectFit: "contain",
        backgroundColor: isDarkMode ? "#1a1a1a" : "#f7f0eb", // UPDATED
        padding: "15px",
      };
    } else {
      return {
        ...themeStyles.image,
        objectFit: "cover",
      };
    }
  };

  // Brand colors derived from the packaging
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

  // FIXED: Removed duplicate boxShadow key
  const themeStyles = {
    card: {
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff", // UPDATED
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: isDarkMode
        ? "0 8px 24px rgba(0,0,0,0.6)" // UPDATED
        : "0 6px 24px rgba(62, 39, 35, 0.06)",
      transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      cursor: "pointer",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)" // UPDATED
        : "1px solid rgba(62, 39, 35, 0.04)",
      transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      // boxShadow is now handled conditionally based on isHovered
    },
    // Decorative top accent
    cardAccent: {
      height: "4px",
      background: isDarkMode
        ? "linear-gradient(90deg, #f7d794 0%, #f5346b 50%, #f7d794 100%)"
        : "linear-gradient(90deg, #d4af37 0%, #f5346b 50%, #d4af37 100%)",
      width: "100%",
      opacity: isHovered ? 1 : 0.6,
      transition: "opacity 0.4s ease",
    },
    wishlistButton: {
      position: "absolute",
      top: "12px",
      right: "12px",
      background: isDarkMode
        ? "rgba(26, 26, 26, 0.8)" // UPDATED
        : "rgba(255,255,255, 0.85)",
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
      transition: "all 0.3s ease",
      color: inWishlist
        ? brandColors.primary
        : isDarkMode
          ? "#ffffff"
          : brandColors.earthDark,
      boxShadow: "0 2px 12px rgba(0,0,0,0.3)", // UPDATED
      ":hover": {
        transform: "scale(1.12)",
        background: isDarkMode ? "rgba(255,255,255,0.1)" : "#ffffff", // UPDATED
        borderColor: inWishlist ? brandColors.primary : brandColors.gold,
      },
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      paddingTop: "100%",
      overflow: "hidden",
      backgroundColor: isDarkMode ? "#0f0f0f" : brandColors.cream, // UPDATED
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
      transition: "transform 0.6s ease",
      transform: isHovered ? "scale(1.03)" : "scale(1)",
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      width: "auto",
      height: "auto",
      transition: "transform 0.6s ease",
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
      backgroundColor: isDarkMode ? "#0f0f0f" : brandColors.cream, // UPDATED
      color: isDarkMode ? "#888888" : "#a1887f", // UPDATED
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
        ? "rgba(15, 15, 15, 0.9)" // UPDATED
        : "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      transform: isHovered ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.4s ease",
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
    category: {
      fontSize: "0.7rem",
      color: brandColors.gold,
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      marginBottom: "0.15rem",
      fontWeight: "600",
    },
    name: {
      fontSize: "1rem",
      margin: "0.3rem 0 0.2rem 0",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark, // UPDATED
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
      color: isDarkMode ? "#a0a0a0" : "#8d6e63", // UPDATED
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
      color: isDarkMode ? "#a0a0a0" : "#a1887f", // UPDATED
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
      color: isDarkMode ? "#a0a0a0" : "#a1887f", // UPDATED
      marginLeft: "0.2rem",
    },
    button: {
      width: "100%",
      padding: "0.7rem",
      background: isDarkMode
        ? "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)"
        : "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      color: isDarkMode ? "#0f0f0f" : "#ffffff", // UPDATED text color for contrast
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      transition: "all 0.3s ease",
      fontSize: "0.85rem",
      fontWeight: "600",
      boxShadow: isDarkMode
        ? "0 4px 12px rgba(245, 52, 107, 0.4)" // UPDATED
        : "0 4px 12px rgba(245, 52, 107, 0.15)",
      letterSpacing: "0.3px",
      ":hover": {
        transform: "scale(1.02)",
        boxShadow: "0 6px 20px rgba(245, 52, 107, 0.5)", // UPDATED
      },
    },
    content: {
      padding: "1.2rem 1rem 1rem 1rem",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
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

  // Compute card style with dynamic boxShadow
  const getCardStyle = () => {
    const baseStyle = { ...themeStyles.card };
    // Override boxShadow based on hover state
    baseStyle.boxShadow = isHovered
      ? isDarkMode
        ? "0 16px 40px rgba(0,0,0,0.8)" // UPDATED
        : "0 16px 40px rgba(245, 52, 107, 0.12)"
      : isDarkMode
        ? "0 8px 24px rgba(0,0,0,0.6)" // UPDATED
        : "0 6px 24px rgba(62, 39, 35, 0.06)";
    return baseStyle;
  };

  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const getBadgeStyle = () => {
    if (
      badgeText === "Natural" ||
      product.category === "Skincare" ||
      product.category === "Hair Care"
    ) {
      return themeStyles.naturalBadge;
    }
    return themeStyles.badge;
  };

  const shouldShowBadge =
    showBadge === true || (product.bestSeller === true && badgeText === "");
  const finalBadgeText = badgeText || (product.bestSeller ? "Best Seller" : "");

  const isNatural =
    product.category === "Skincare" || product.category === "Hair Care";

  return (
    <div
      style={getCardStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={themeStyles.cardAccent} />

      <button
        style={themeStyles.wishlistButton}
        onClick={handleWishlistClick}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {inWishlist ? (
          <FaHeart style={{ color: brandColors.primary }} />
        ) : (
          <FaRegHeart />
        )}
      </button>

      {shouldShowBadge && finalBadgeText && (
        <div style={getBadgeStyle()}>
          {isNatural ? (
            <FaLeaf style={{ fontSize: "0.6rem" }} />
          ) : (
            <FaStar style={{ fontSize: "0.6rem" }} />
          )}
          {finalBadgeText}
        </div>
      )}

      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", display: "block", height: "100%" }}
      >
        <div style={themeStyles.imageContainer}>
          <div style={themeStyles.imageWrapper}>
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
                  <span>Loading...</span>
                </div>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              style={{
                ...themeStyles.image,
                ...(imageLoaded ? getImageStyle() : { opacity: 0 }),
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </div>

          <div style={themeStyles.quickViewOverlay}>
            <span style={themeStyles.quickViewText}>
              <FaEye style={{ fontSize: "0.8rem" }} />
              Quick View
            </span>
          </div>
        </div>

        <div style={themeStyles.content}>
          <span style={themeStyles.category}>
            {isNatural ? "🌿 " : ""}
            {product.category}
          </span>
          <h3 style={themeStyles.name}>{product.name}</h3>

          {product.itemNo && (
            <p style={themeStyles.itemNo}>#{product.itemNo}</p>
          )}

          {product.rating && (
            <div style={themeStyles.ratingContainer}>
              <div style={themeStyles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={
                      i < Math.floor(product.rating) ? "#ffc107" : "#e0e0e0"
                    }
                    size={12}
                  />
                ))}
              </div>
              <span style={themeStyles.ratingCount}>
                ({product.reviews || 0})
              </span>
            </div>
          )}

          <div style={themeStyles.priceContainer}>
            <span style={themeStyles.price}>₹{product.price.toFixed(2)}</span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span style={themeStyles.mrp}>₹{product.mrp.toFixed(2)}</span>
                <span style={themeStyles.discount}>{discount}% OFF</span>
              </>
            )}
          </div>

          {product.inStock !== false && (
            <div style={themeStyles.inStockIndicator}>
              <span style={{ color: brandColors.green, fontSize: "0.6rem" }}>
                ●
              </span>
              In Stock
            </div>
          )}

          <button
            style={themeStyles.button}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <FaShoppingCart style={{ fontSize: "0.85rem" }} />
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
