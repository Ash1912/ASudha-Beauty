import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";
import ImageGallery from "../components/ImageGallery";
import ProductTabs from "../components/ProductTabs";
import ShadeCatalog from "../components/ShadeCatalog";
import {
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaStar,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaArrowLeft,
  FaLeaf,
  FaSpa,
  FaBoxOpen,
  FaCopy,
} from "react-icons/fa";
import { usePixelTracking } from "../context/PixelContext";
import SEO from "../components/SEO";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find((p) => p.id === parseInt(id));

  // ASudha Beauty Brand Palette
  const brandColors = {
    primary: "#f5346b",
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    black: "#0f0f0f",
    darkSlate: "#1a1a1a",
    earthLight: "#6d4c41",
    cream: "#fcf8f5",
    green: "#4caf50",
  };

  // Theme tokens
  const T = {
    bg: isDarkMode ? brandColors.black : brandColors.cream,
    card: isDarkMode ? brandColors.darkSlate : "#ffffff",
    cardAlt: isDarkMode ? "#222222" : "#f9f4f0",
    border: isDarkMode ? "rgba(212, 175, 55, 0.12)" : "rgba(62, 39, 35, 0.06)",
    borderSoft: isDarkMode
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(62, 39, 35, 0.04)",
    divider: isDarkMode
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(62, 39, 35, 0.06)",
    text: isDarkMode ? "#f5f0eb" : "#3e2723",
    textMuted: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
    textDim: isDarkMode ? "#8d7d76" : "#8d7d76",
    gold: brandColors.gold,
    green: brandColors.green,
    danger: isDarkMode ? "#ff8a80" : "#c62828",
    star: "#ffc107",
    starEmpty: isDarkMode ? "rgba(255, 255, 255, 0.15)" : "#e0e0e0",
    shadow: isDarkMode
      ? "0 10px 30px rgba(0, 0, 0, 0.55)"
      : "0 10px 30px rgba(62, 39, 35, 0.06)",
    shadowLift: isDarkMode
      ? "0 20px 40px rgba(0, 0, 0, 0.65)"
      : "0 20px 40px rgba(62, 39, 35, 0.1)",
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // ✅ Initialize the selected shade from the product (fixes wishlist bug)
  const [selectedShade, setSelectedShade] = useState(() => {
    if (!product?.shades || !Array.isArray(product.shades)) return "";
    return product.shades.length > 0 ? product.shades[0] : "";
  });
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [copied, setCopied] = useState(false);
  const trackEvent = usePixelTracking();

  const inWishlist = product ? isInWishlist(product.id, selectedShade) : false;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (product) {
      trackEvent.viewContent(product);
      window.scrollTo(0, 0);
    }
  }, [product, trackEvent]);

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  const handleShadeSelect = (shade) => setSelectedShade(shade);

  const handleAddToCart = () => {
    if (!product?.inStock) return;
    addToCart(product, selectedShade || "", quantity);
    trackEvent.addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleQuantityChange = (delta) =>
    setQuantity((prev) => Math.max(1, prev + delta));

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleWishlist(product, selectedShade);
  };

  const handleShare = async () => {
    if (!product) return;
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // fallback for older browsers
        const el = document.createElement("textarea");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const discount =
    product?.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const themeStyles = {
    // ✅ Removed overflowX: "hidden" — page scrolls naturally via <body>.
    // Horizontal overflow is prevented globally in the <style> block below.
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: isMobile
        ? "1.25rem 0.75rem 3rem"
        : isNarrow
          ? "1.5rem 1rem 3rem"
          : "2rem 1rem 4rem",
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100vh",
      position: "relative",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },

    // Absolute clipped blobs
    bgBlob1: {
      position: "absolute",
      top: "-120px",
      left: "-120px",
      width: "400px",
      height: "400px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f5346b, #f7d794)",
      opacity: isDarkMode ? 0.1 : 0.07,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
      clipPath: "circle(50% at 50% 50%)",
    },
    bgBlob2: {
      position: "absolute",
      bottom: "-120px",
      right: "-120px",
      width: "400px",
      height: "400px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #4caf50, #f7d794)",
      opacity: isDarkMode ? 0.1 : 0.07,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
      clipPath: "circle(50% at 50% 50%)",
    },

    // Back button
    backButton: {
      position: "relative",
      zIndex: 2,
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: isNarrow ? "1.25rem" : "2rem",
      padding: "0.55rem 1.25rem",
      backgroundColor: T.card,
      backdropFilter: "blur(10px)",
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      color: T.text,
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
    },

    // Grid
    productGrid: {
      position: "relative",
      zIndex: 2,
      display: "grid",
      gridTemplateColumns: isNarrow
        ? "minmax(0, 1fr)"
        : "minmax(0, 1fr) minmax(0, 1fr)",
      gap: isMobile ? "1.5rem" : "2.5rem",
      marginBottom: "2rem",
      width: "100%",
      boxSizing: "border-box",
    },

    // Info card
    info: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: T.card,
      borderRadius: "24px",
      padding: isMobile ? "1.5rem 1.25rem" : "2.25rem",
      boxShadow: T.shadow,
      border: `1px solid ${T.border}`,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },

    // Header
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1rem",
      gap: "0.75rem",
    },
    category: {
      fontSize: "0.82rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontWeight: "700",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    wishlistButton: {
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
      padding: "0.25rem",
      borderRadius: "50%",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    name: {
      fontSize: isMobile ? "1.6rem" : isNarrow ? "2rem" : "2.35rem",
      marginBottom: "0.5rem",
      color: T.text,
      fontWeight: "800",
      lineHeight: "1.2",
    },
    itemNo: {
      fontSize: "0.85rem",
      color: T.textMuted,
      marginBottom: "1rem",
    },

    // Rating row
    ratingRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1rem",
      flexWrap: "wrap",
    },
    ratingStars: {
      display: "flex",
      gap: "0.15rem",
      color: T.star,
    },
    ratingText: {
      fontSize: "0.88rem",
      color: T.textMuted,
    },

    // Price
    priceContainer: {
      display: "flex",
      alignItems: "baseline",
      gap: "1rem",
      marginBottom: "1rem",
      flexWrap: "wrap",
    },
    price: {
      fontSize: isMobile ? "1.75rem" : "2.25rem",
      fontWeight: "900",
      background: isDarkMode
        ? "linear-gradient(135deg, #f7d794, #f5346b)"
        : "linear-gradient(135deg, #d4af37, #f5346b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: "1.1",
    },
    mrp: {
      fontSize: "1.1rem",
      color: T.textDim,
      textDecoration: "line-through",
      opacity: 0.8,
    },
    discount: {
      fontSize: "1rem",
      color: brandColors.green,
      fontWeight: "700",
    },

    // Stock
    stock: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.4rem 1rem",
      borderRadius: "50px",
      fontSize: "0.82rem",
      fontWeight: "700",
      marginBottom: "1.25rem",
      letterSpacing: "0.5px",
      width: "fit-content",
      backgroundColor: product?.inStock
        ? "rgba(76, 175, 80, 0.12)"
        : "rgba(198, 40, 40, 0.12)",
      color: product?.inStock ? brandColors.green : T.danger,
      border: product?.inStock
        ? "1px solid rgba(76, 175, 80, 0.3)"
        : "1px solid rgba(198, 40, 40, 0.3)",
    },

    // Shades
    shadeLabel: {
      display: "block",
      fontSize: "0.95rem",
      color: T.text,
      marginBottom: "0.5rem",
      fontWeight: "600",
    },
    shadeOptions: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginBottom: "1.5rem",
    },
    shadeButton: {
      padding: "0.5rem 1.15rem",
      border: `1px solid ${T.border}`,
      background: "transparent",
      color: T.text,
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: "0.88rem",
      fontFamily: "inherit",
      fontWeight: "600",
    },
    shadeButtonSelected: {
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "1px solid transparent",
      fontWeight: "700",
      boxShadow: "0 4px 15px rgba(245, 52, 107, 0.3)",
    },

    // Quantity
    quantityControl: {
      display: "flex",
      alignItems: "center",
      gap: "0.85rem",
      marginBottom: "1.75rem",
      backgroundColor: isDarkMode ? brandColors.black : "#fcf8f5",
      padding: "0.4rem",
      borderRadius: "50px",
      border: `1px solid ${T.border}`,
      width: "fit-content",
    },
    quantityButton: {
      width: "38px",
      height: "38px",
      border: "none",
      cursor: "pointer",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      borderRadius: "50%",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      fontFamily: "inherit",
      flexShrink: 0,
    },
    quantityValue: {
      fontSize: "1.15rem",
      minWidth: "30px",
      textAlign: "center",
      fontWeight: "700",
      color: T.text,
    },

    // Action buttons
    actionButtons: {
      display: "flex",
      gap: "0.75rem",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
    },
    addToCartButton: {
      flex: "2 1 200px",
      padding: "1rem",
      border: "none",
      borderRadius: "50px",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      fontSize: "1rem",
      fontWeight: "700",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.6rem",
      boxShadow: "0 8px 24px rgba(245, 52, 107, 0.3)",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      whiteSpace: "nowrap",
    },
    shareButton: {
      flex: "1 1 120px",
      padding: "1rem",
      backgroundColor: "transparent",
      color: T.text,
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      fontSize: "1rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      fontWeight: "600",
    },

    // Toast
    toast: {
      position: "fixed",
      top: "5rem",
      right: isMobile ? "1rem" : "2rem",
      left: isMobile ? "1rem" : "auto",
      zIndex: 9999,
      padding: "0.9rem 1.25rem",
      backgroundColor: isDarkMode ? "#1a3a1a" : "#e8f5e9",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      fontSize: "0.92rem",
      fontWeight: "600",
      border: isDarkMode
        ? "1px solid rgba(76, 175, 80, 0.3)"
        : "1px solid rgba(76, 175, 80, 0.25)",
      boxShadow: T.shadowLift,
      animation: "slideInRight 0.4s ease",
      maxWidth: isMobile ? "calc(100% - 2rem)" : "360px",
      boxSizing: "border-box",
    },

    // Info blocks
    keyFeatures: {
      marginTop: "1.25rem",
      padding: isMobile ? "1.15rem" : "1.35rem",
      borderRadius: "16px",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(62, 39, 35, 0.03)",
      border: `1px solid ${T.borderSoft}`,
      boxSizing: "border-box",
    },
    featureTitle: {
      fontSize: "1.05rem",
      fontWeight: "700",
      marginBottom: "0.9rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: T.text,
    },
    featureList: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "0.6rem",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.88rem",
      color: T.textMuted,
      lineHeight: "1.5",
    },

    deliveryInfo: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isNarrow
          ? "repeat(2, minmax(0, 1fr))"
          : "repeat(3, minmax(0, 1fr))",
      gap: "0.85rem",
      marginTop: "1.25rem",
      padding: isMobile ? "1.15rem" : "1.35rem",
      borderRadius: "16px",
      backgroundColor: isDarkMode
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(62, 39, 35, 0.03)",
      border: `1px solid ${T.borderSoft}`,
      boxSizing: "border-box",
    },
    deliveryItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      fontSize: "0.85rem",
      color: T.textMuted,
      lineHeight: "1.5",
    },

    // Not-found state
    notFound: {
      textAlign: "center",
      paddingTop: isMobile ? "4rem" : "6rem",
      paddingBottom: "4rem",
      position: "relative",
      zIndex: 2,
    },
    notFoundIcon: {
      fontSize: "4rem",
      color: brandColors.primary,
      marginBottom: "1rem",
    },
    notFoundTitle: {
      fontSize: isMobile ? "1.5rem" : "2rem",
      fontWeight: "800",
      marginBottom: "1rem",
      color: T.text,
    },
    notFoundText: {
      marginBottom: "2rem",
      color: T.textMuted,
      lineHeight: "1.6",
    },
  };

  // ─── NOT FOUND ─────────────────────────────────────────────────────
  if (!product) {
    return (
      <div style={themeStyles.container}>
        <SEO
          title="Product Not Found | ASudha Beauty"
          description="The product you're looking for doesn't exist. Browse our 100% natural Ayurvedic collection."
          url={`/product/${id}`}
        />
        <div style={themeStyles.bgBlob1}></div>
        <div style={themeStyles.bgBlob2}></div>

        <div style={themeStyles.notFound}>
          <FaBoxOpen style={themeStyles.notFoundIcon} />
          <h2 style={themeStyles.notFoundTitle}>Product Not Found</h2>
          <p style={themeStyles.notFoundText}>
            The Ayurvedic product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/shop")}
            style={themeStyles.addToCartButton}
          >
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  const productImages = product.images || [product.image];

  return (
    <div style={themeStyles.container}>
      <SEO
        title={`${product.name} | ASudha Beauty`}
        description={product.description}
        type="product"
        product={product}
      />

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        /* ✅ Prevent horizontal scroll globally — page uses body scroll only */
        html, body {
          overflow-x: hidden;
          max-width: 100%;
        }

        .pd-back-btn:hover {
          transform: translateX(-4px);
          background: linear-gradient(135deg, #f7d794, #f5346b) !important;
          color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
          border-color: transparent !important;
        }
        .pd-shade-btn:hover {
          border-color: ${brandColors.primary} !important;
          color: ${brandColors.primary} !important;
        }
        .pd-qty-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 4px 15px rgba(245, 52, 107, 0.4);
        }
        .pd-add-cart-btn:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 15px 40px rgba(245, 52, 107, 0.4);
        }
        .pd-add-cart-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .pd-share-btn:hover {
          background: rgba(245, 52, 107, 0.1);
          border-color: ${brandColors.primary} !important;
          color: ${brandColors.primary} !important;
        }
        .pd-wishlist-btn:hover {
          transform: scale(1.15);
        }
      `}</style>

      <div style={themeStyles.bgBlob1}></div>
      <div style={themeStyles.bgBlob2}></div>

      {/* Success toast */}
      {addedToCart && (
        <div style={themeStyles.toast}>
          <FaCheckCircle /> Added to cart successfully!
        </div>
      )}

      {/* Copy toast */}
      {copied && (
        <div style={themeStyles.toast}>
          <FaCopy /> Link copied to clipboard!
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        style={themeStyles.backButton}
        className="pd-back-btn"
        aria-label="Go back"
      >
        <FaArrowLeft /> Back
      </button>

      <div style={themeStyles.productGrid}>
        {/* Image Gallery */}
        <ImageGallery
          images={productImages}
          video={product.video}
          videoThumbnail={product.videoThumbnail}
          productName={product.name}
        />

        {/* Info */}
        <div style={themeStyles.info}>
          <div style={themeStyles.header}>
            <span style={themeStyles.category}>
              <FaLeaf style={{ fontSize: "0.75rem" }} /> {product.category}
            </span>
            <button
              style={{
                ...themeStyles.wishlistButton,
                color: inWishlist
                  ? brandColors.primary
                  : isDarkMode
                    ? T.textDim
                    : "#b0a29a",
              }}
              className="pd-wishlist-btn"
              onClick={handleWishlistToggle}
              aria-label={
                inWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              {inWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <h1 style={themeStyles.name}>{product.name}</h1>
          {product.itemNo && (
            <p style={themeStyles.itemNo}>Item No: {product.itemNo}</p>
          )}

          {product.rating && (
            <div style={themeStyles.ratingRow}>
              <div style={themeStyles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    color={
                      i < Math.floor(product.rating) ? T.star : T.starEmpty
                    }
                  />
                ))}
              </div>
              <span style={themeStyles.ratingText}>
                {product.rating} ({product.reviews || 0} reviews)
              </span>
            </div>
          )}

          <div style={themeStyles.priceContainer}>
            <span style={themeStyles.price}>
              ₹{Number(product.price).toFixed(2)}
            </span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span style={themeStyles.mrp}>
                  ₹{Number(product.mrp).toFixed(2)}
                </span>
                <span style={themeStyles.discount}>{discount}% OFF</span>
              </>
            )}
          </div>

          <div style={themeStyles.stock}>
            <FaSpa /> {product.inStock ? "In Stock" : "Out of Stock"}
          </div>

          {/* Shades */}
          {product.shades &&
            Array.isArray(product.shades) &&
            product.shades.length > 0 && (
              <div style={{ marginBottom: "0.5rem" }}>
                <label style={themeStyles.shadeLabel}>Select Variant:</label>
                <div style={themeStyles.shadeOptions}>
                  {product.shades.map((shade) => (
                    <button
                      key={shade}
                      style={{
                        ...themeStyles.shadeButton,
                        ...(selectedShade === shade
                          ? themeStyles.shadeButtonSelected
                          : {}),
                      }}
                      className="pd-shade-btn"
                      onClick={() => setSelectedShade(shade)}
                      aria-pressed={selectedShade === shade}
                    >
                      {shade}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Quantity */}
          <div>
            <label style={themeStyles.shadeLabel}>Quantity:</label>
            <div style={themeStyles.quantityControl}>
              <button
                style={themeStyles.quantityButton}
                className="pd-qty-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span style={themeStyles.quantityValue}>{quantity}</span>
              <button
                style={themeStyles.quantityButton}
                className="pd-qty-btn"
                onClick={() => handleQuantityChange(1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div style={themeStyles.actionButtons}>
            <button
              style={themeStyles.addToCartButton}
              className="pd-add-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <FaShoppingCart />{" "}
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              style={themeStyles.shareButton}
              className="pd-share-btn"
              onClick={handleShare}
              aria-label="Share product"
            >
              <FaShare /> Share
            </button>
          </div>

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div style={themeStyles.keyFeatures}>
              <h4 style={themeStyles.featureTitle}>
                <FaLeaf style={{ color: brandColors.green }} /> Ayurvedic
                Benefits
              </h4>
              <div style={themeStyles.featureList}>
                {product.benefits.map((benefit, index) => (
                  <div key={index} style={themeStyles.featureItem}>
                    <span
                      style={{
                        color: brandColors.green,
                        fontWeight: "bold",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>{" "}
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery */}
          <div style={themeStyles.deliveryInfo}>
            <div style={themeStyles.deliveryItem}>
              <FaTruck style={{ color: brandColors.primary, flexShrink: 0 }} />{" "}
              Free shipping on orders above ₹500
            </div>
            <div style={themeStyles.deliveryItem}>
              <FaShieldAlt
                style={{ color: brandColors.primary, flexShrink: 0 }}
              />{" "}
              100% Natural & Authentic
            </div>
            <div style={themeStyles.deliveryItem}>
              <FaUndo style={{ color: brandColors.primary, flexShrink: 0 }} />{" "}
              30-day easy returns
            </div>
          </div>
        </div>
      </div>

      {product.catalog && (
        <ShadeCatalog
          catalog={product.catalog}
          onSelectShade={handleShadeSelect}
          selectedShade={selectedShade}
        />
      )}
      <ProductTabs product={product} />
    </div>
  );
};

export default ProductDetail;