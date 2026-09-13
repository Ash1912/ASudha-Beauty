import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { useCart } from "../context/CartContext";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaLeaf,
  FaSpa,
  FaTint,
  FaGem,
  FaBoxOpen,
  FaCalendarAlt,
  FaSignOutAlt,
  FaEnvelope,
  FaSpinner,
  FaRedo,
} from "react-icons/fa";
import SEO from "../components/SEO";

const Profile = () => {
  const { isDarkMode } = useTheme();
  const { user, logout, updateProfile } = useAuth();
  const { getOrdersByUser, getLiveStatus } = useOrders();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [reorderMessage, setReorderMessage] = useState(null);

  // ASudha Beauty Brand Palette
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

  // Theme tokens
  const T = {
    bg: isDarkMode ? brandColors.black : brandColors.cream,
    bgAlt: isDarkMode ? "#141414" : "#ffffff",
    card: isDarkMode ? brandColors.darkSlate : "#ffffff",
    cardAlt: isDarkMode ? "#222222" : "#f9f4f0",
    border: isDarkMode
      ? "rgba(212, 175, 55, 0.14)"
      : "rgba(62, 39, 35, 0.06)",
    borderSoft: isDarkMode
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(62, 39, 35, 0.04)",
    text: isDarkMode ? "#f5f0eb" : "#3e2723",
    textMuted: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
    textDim: "#8d7d76",
    gold: brandColors.gold,
    goldSoft: "rgba(212, 175, 55, 0.12)",
    shadow: isDarkMode
      ? "0 10px 30px rgba(0, 0, 0, 0.55)"
      : "0 10px 30px rgba(62, 39, 35, 0.06)",
    shadowLift: isDarkMode
      ? "0 20px 40px rgba(0, 0, 0, 0.65)"
      : "0 20px 40px rgba(62, 39, 35, 0.1)",
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const orders = user?.email ? getOrdersByUser(user.email) : [];

  const skincareStats = { totalProducts: 7, naturalProducts: 7, favorites: 3 };

  const handleUpdateProfile = async () => {
    setSaving(true);
    const result = await updateProfile({
      name: editedName,
      email: editedEmail,
    });
    setSaving(false);

    if (result?.success) {
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    }
  };

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      logout();
      navigate("/");
    }, 400);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(user?.name || "");
    setEditedEmail(user?.email || "");
  };

  const handleReorder = (order) => {
    if (!order.items || order.items.length === 0) return;

    order.items.forEach((item) => {
      addToCart(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category || "Skincare",
          inStock: true,
          shades: [],
        },
        item.selectedShade || null,
        item.quantity || 1
      );
    });

    setReorderMessage(`Added ${order.items.length} item(s) to cart`);
    setTimeout(() => setReorderMessage(null), 2500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return { bg: brandColors.green, label: "Delivered" };
      case "Shipped":
        return { bg: "#ff9800", label: "Shipped" };
      case "Processing":
        return { bg: "#2196f3", label: "Processing" };
      default:
        return { bg: "#999", label: status || "Processing" };
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  const themeStyles = {
    // ─── Page wrapper: NO inner scroll, natural page scroll ───
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile
        ? "1.25rem 0.75rem 3rem"
        : isNarrow
        ? "1.5rem 1rem 4rem"
        : "2.5rem 1.5rem 5rem",
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100%", // ✅ was "100vh" — no forced viewport height
      position: "relative",
      // ✅ overflowX removed — no inner scroll container
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },

    // ─── Fixed blobs: stay in place, no horizontal overflow ───
    bgBlob1: {
      position: "fixed",
      top: "-150px",
      left: "-150px",
      width: "420px",
      height: "420px",
      maxWidth: "60vw",
      maxHeight: "60vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 30% 30%, #f5346b 0%, #f7d794 70%, transparent 100%)",
      opacity: isDarkMode ? 0.12 : 0.08,
      filter: "blur(110px)",
      pointerEvents: "none",
      zIndex: 0,
    },
    bgBlob2: {
      position: "fixed",
      bottom: "-150px",
      right: "-150px",
      width: "420px",
      height: "420px",
      maxWidth: "60vw",
      maxHeight: "60vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 70% 70%, #4caf50 0%, #f7d794 70%, transparent 100%)",
      opacity: isDarkMode ? 0.12 : 0.08,
      filter: "blur(110px)",
      pointerEvents: "none",
      zIndex: 0,
    },

    backButton: {
      position: "relative",
      zIndex: 2,
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: isNarrow ? "1.25rem" : "2rem",
      padding: "0.6rem 1.35rem",
      background: T.card,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      color: T.text,
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: T.shadow,
    },

    successMessage: {
      position: "relative",
      zIndex: 2,
      background: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.1)",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      padding: "1rem 1.25rem",
      borderRadius: "16px",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontWeight: "600",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.25)" : "rgba(76, 175, 80, 0.2)"
      }`,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      animation: "fadeInUp 0.35s ease",
    },

    reorderMessage: {
      position: "fixed",
      bottom: "1.5rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      padding: "0.9rem 1.6rem",
      borderRadius: "50px",
      fontWeight: "700",
      fontSize: "0.9rem",
      boxShadow: "0 12px 34px rgba(245, 52, 107, 0.45)",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      animation: "fadeInUp 0.35s ease",
      whiteSpace: "nowrap",
    },

    profileGrid: {
      position: "relative",
      zIndex: 2,
      display: "grid",
      gridTemplateColumns: isNarrow
        ? "1fr"
        : "minmax(0, 1fr) minmax(0, 2fr)",
      gap: isNarrow ? "1.25rem" : "2rem",
      width: "100%",
      boxSizing: "border-box",
    },

    // ─── Sidebar card ───
    sidebar: {
      backgroundColor: T.card,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: isNarrow ? "22px" : "26px",
      padding: isMobile ? "1.75rem 1.35rem" : "2.25rem 1.85rem",
      textAlign: "center",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      height: "fit-content",
      boxSizing: "border-box",
      width: "100%",
      position: "relative",
      overflow: "hidden",
    },
    // Subtle top accent line on sidebar
    sidebarAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #f7d794, #f5346b, #4caf50)",
      opacity: 0.85,
    },

    avatarWrapper: {
      width: isMobile ? "105px" : "135px",
      height: isMobile ? "105px" : "135px",
      margin: "0 auto 1.35rem",
      borderRadius: "50%",
      padding: "4px",
      background: "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      boxShadow: "0 12px 34px rgba(245, 52, 107, 0.28)",
    },
    avatar: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      background: isDarkMode ? brandColors.black : "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? "2.35rem" : "3.1rem",
      color: brandColors.primary,
    },
    userName: {
      fontSize: isMobile ? "1.25rem" : "1.45rem",
      fontWeight: "800",
      marginBottom: "0.35rem",
      color: T.text,
      wordBreak: "break-word",
      letterSpacing: "-0.2px",
    },
    userEmail: {
      color: T.textMuted,
      marginBottom: "1.35rem",
      fontSize: "0.9rem",
      wordBreak: "break-word",
    },
    naturalBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.5rem 1.15rem",
      background: "linear-gradient(135deg, #4caf50, #8bc34a)",
      color: "#ffffff",
      borderRadius: "50px",
      fontSize: "0.78rem",
      fontWeight: "700",
      marginBottom: "1.35rem",
      boxShadow: "0 8px 22px rgba(76,175,80,0.35)",
      letterSpacing: "0.2px",
    },

    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "0.5rem",
      marginBottom: "1.5rem",
      padding: "1.35rem 0",
      borderTop: `1px solid ${T.borderSoft}`,
      borderBottom: `1px solid ${T.borderSoft}`,
    },
    statItem: { textAlign: "center", minWidth: 0 },
    statValue: {
      fontSize: isMobile ? "1.25rem" : "1.45rem",
      fontWeight: "900",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: "1.1",
    },
    statLabel: {
      fontSize: "0.68rem",
      color: T.textMuted,
      textTransform: "uppercase",
      marginTop: "0.3rem",
      fontWeight: "600",
      letterSpacing: "0.6px",
    },

    logoutButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      width: "100%",
      padding: "0.85rem",
      marginTop: "1.35rem",
      background: isDarkMode
        ? "rgba(255,255,255,0.06)"
        : "rgba(62,39,35,0.04)",
      color: T.text,
      border: `1px solid ${T.borderSoft}`,
      borderRadius: "50px",
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },

    // ─── Content card ───
    content: {
      backgroundColor: T.card,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: isNarrow ? "22px" : "26px",
      padding: isMobile ? "1.6rem 1.25rem" : "2.25rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
    sectionTitle: {
      fontSize: isMobile ? "1.05rem" : "1.2rem",
      fontWeight: "800",
      marginBottom: "1.35rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      flexWrap: "wrap",
      letterSpacing: "-0.1px",
    },

    // ─── Info rows ───
    infoRow: {
      display: "flex",
      alignItems: isNarrow ? "flex-start" : "center",
      flexDirection: isNarrow ? "column" : "row",
      gap: isNarrow ? "0.4rem" : "0.75rem",
      padding: "1.15rem 0",
      borderBottom: `1px solid ${T.borderSoft}`,
    },
    infoLabel: {
      width: isNarrow ? "100%" : "130px",
      color: T.textMuted,
      fontSize: "0.78rem",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      flexShrink: 0,
    },
    infoValue: {
      flex: 1,
      color: T.text,
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      wordBreak: "break-word",
      minWidth: 0,
    },
    infoValueRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      flex: 1,
      width: "100%",
      minWidth: 0,
    },
    editInput: {
      flex: 1,
      padding: "0.7rem 1rem",
      background: isDarkMode ? brandColors.black : brandColors.cream,
      border: `1px solid ${T.border}`,
      borderRadius: "12px",
      color: T.text,
      fontSize: "0.95rem",
      width: "100%",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    },
    editActions: {
      display: "flex",
      gap: "0.4rem",
      marginLeft: isNarrow ? 0 : "0.75rem",
      flexShrink: 0,
    },
    iconButton: {
      background: isDarkMode
        ? "rgba(255,255,255,0.06)"
        : "rgba(62,39,35,0.04)",
      border: `1px solid ${T.borderSoft}`,
      color: brandColors.primary,
      cursor: "pointer",
      fontSize: "0.95rem",
      padding: "0.55rem 0.75rem",
      borderRadius: "50px",
      transition: "all 0.3s ease",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },

    // ─── Order cards ───
    orderCard: {
      backgroundColor: isDarkMode ? brandColors.black : "#fdfaf7",
      borderRadius: "18px",
      padding: isMobile ? "1.1rem" : "1.35rem",
      marginBottom: "0.95rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: isNarrow ? "flex-start" : "center",
      flexDirection: isNarrow ? "column" : "row",
      flexWrap: "wrap",
      gap: "0.85rem",
      border: `1px solid ${T.borderSoft}`,
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },
    orderInfo: { flex: 1, minWidth: 0, width: "100%" },
    orderId: {
      fontSize: "0.95rem",
      fontWeight: "800",
      marginBottom: "0.4rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      flexWrap: "wrap",
      wordBreak: "break-all",
    },
    orderDate: {
      fontSize: "0.8rem",
      color: T.textMuted,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    orderItems: {
      fontSize: "0.82rem",
      color: T.textMuted,
      marginTop: "0.4rem",
      wordBreak: "break-word",
      lineHeight: "1.55",
    },
    orderRight: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      width: isNarrow ? "100%" : "auto",
      justifyContent: isNarrow ? "space-between" : "flex-end",
      flexWrap: "wrap",
    },
    orderTotal: {
      fontSize: isMobile ? "1.25rem" : "1.45rem",
      fontWeight: "900",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    orderStatus: {
      display: "inline-block",
      padding: "0.38rem 1rem",
      borderRadius: "50px",
      fontSize: "0.72rem",
      fontWeight: "700",
      color: "#ffffff",
      letterSpacing: "0.4px",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    reorderButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      padding: "0.45rem 1rem",
      background: "transparent",
      color: brandColors.primary,
      border: `1px solid ${brandColors.primary}`,
      borderRadius: "50px",
      fontSize: "0.75rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
    },

    // ─── Collection grid ───
    collectionGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(2, minmax(0, 1fr))"
        : isNarrow
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: "0.85rem",
      marginTop: "0.5rem",
    },
    collectionCard: {
      background: isDarkMode ? brandColors.black : "#fdfaf7",
      padding: isMobile ? "1.15rem 0.85rem" : "1.4rem 1.1rem",
      borderRadius: "18px",
      textAlign: "center",
      border: `1px solid ${T.borderSoft}`,
      transition: "all 0.3s ease",
      cursor: "default",
      position: "relative",
      overflow: "hidden",
    },
    collectionIcon: {
      fontSize: isMobile ? "1.85rem" : "2.35rem",
      marginBottom: "0.5rem",
    },
    collectionName: {
      fontSize: "0.85rem",
      fontWeight: "700",
      marginBottom: "0.2rem",
      color: T.text,
    },
    collectionSub: {
      fontSize: "0.7rem",
      color: T.textMuted,
      fontWeight: "500",
      letterSpacing: "0.2px",
    },

    emptyState: {
      textAlign: "center",
      padding: "2.5rem 1rem",
      color: T.textMuted,
    },
  };

  return (
    <>
      <SEO
        title="My Profile | ASudha Beauty"
        description="Manage your ASudha Beauty account, view order history, and explore your natural skincare collection."
      />
      <div style={themeStyles.container}>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .profile-back-btn:hover {
            transform: translateX(-4px);
            background: linear-gradient(135deg, #f7d794, #f5346b) !important;
            color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
            border-color: transparent !important;
          }
          .profile-logout:hover {
            background: ${brandColors.primary} !important;
            color: #ffffff !important;
            border-color: ${brandColors.primary} !important;
            transform: translateY(-2px);
          }
          .profile-icon-btn:hover {
            background: linear-gradient(135deg, #f7d794, #f5346b) !important;
            color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
            border-color: transparent !important;
            transform: translateY(-2px);
          }
          .profile-order-card:hover {
            transform: translateY(-4px);
            box-shadow: ${T.shadowLift};
            border-color: rgba(212, 175, 55, 0.4) !important;
          }
          .profile-collection-card:hover {
            transform: translateY(-6px);
            box-shadow: ${T.shadowLift};
            border-color: rgba(212, 175, 55, 0.4) !important;
          }
          .profile-edit-input:focus {
            border-color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important;
            box-shadow: 0 0 0 3px ${isDarkMode ? "rgba(212, 175, 55, 0.18)" : "rgba(199, 125, 66, 0.12)"};
          }
          .profile-wishlist-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 14px 32px rgba(245, 52, 107, 0.4);
          }
          .profile-reorder-btn:hover {
            background: ${brandColors.primary} !important;
            color: #ffffff !important;
            transform: translateY(-2px);
          }
        `}</style>

        <div style={themeStyles.bgBlob1}></div>
        <div style={themeStyles.bgBlob2}></div>

        <button
          onClick={() => navigate(-1)}
          style={themeStyles.backButton}
          className="profile-back-btn"
        >
          <FaArrowLeft /> Back
        </button>

        {updateSuccess && (
          <div style={themeStyles.successMessage}>
            <FaCheckCircle /> Profile updated successfully!
          </div>
        )}

        {reorderMessage && (
          <div style={themeStyles.reorderMessage}>
            <FaCheckCircle /> {reorderMessage}
          </div>
        )}

        <div style={themeStyles.profileGrid}>
          {/* Sidebar */}
          <div style={themeStyles.sidebar}>
            <div style={themeStyles.sidebarAccent} />
            <div style={themeStyles.avatarWrapper}>
              <div style={themeStyles.avatar}>
                <FaUser />
              </div>
            </div>
            <h2 style={themeStyles.userName}>{user?.name || "Guest"}</h2>
            <p style={themeStyles.userEmail}>
              {user?.email || "guest@asudha.com"}
            </p>

            <div style={themeStyles.naturalBadge}>
              <FaLeaf /> Natural Skincare Lover
            </div>

            <div style={themeStyles.stats}>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statValue}>
                  {skincareStats.totalProducts}
                </div>
                <div style={themeStyles.statLabel}>Products</div>
              </div>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statValue}>100%</div>
                <div style={themeStyles.statLabel}>Natural</div>
              </div>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statValue}>
                  {skincareStats.favorites}
                </div>
                <div style={themeStyles.statLabel}>Favorites</div>
              </div>
            </div>

            <button
              style={themeStyles.logoutButton}
              className="profile-logout"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? (
                <>
                  <FaSpinner
                    style={{ animation: "spin 1s linear infinite" }}
                  />{" "}
                  Logging out...
                </>
              ) : (
                <>
                  <FaSignOutAlt /> Logout
                </>
              )}
            </button>
          </div>

          {/* Main Content */}
          <div style={themeStyles.content}>
            <div style={themeStyles.sectionTitle}>
              <FaUser /> Profile Information
            </div>

            {/* Name row */}
            <div style={themeStyles.infoRow}>
              <span style={themeStyles.infoLabel}>Name</span>
              {isEditing ? (
                <div style={themeStyles.infoValueRow}>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    style={themeStyles.editInput}
                    className="profile-edit-input"
                    placeholder="Your name"
                  />
                  <div style={themeStyles.editActions}>
                    <button
                      style={themeStyles.iconButton}
                      className="profile-icon-btn"
                      onClick={handleUpdateProfile}
                      disabled={saving}
                      aria-label="Save"
                    >
                      {saving ? (
                        <FaSpinner
                          style={{ animation: "spin 1s linear infinite" }}
                        />
                      ) : (
                        <FaSave />
                      )}
                    </button>
                    <button
                      style={themeStyles.iconButton}
                      className="profile-icon-btn"
                      onClick={handleCancelEdit}
                      aria-label="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ) : (
                <div style={themeStyles.infoValueRow}>
                  <span style={themeStyles.infoValue}>{user?.name}</span>
                  <button
                    style={themeStyles.iconButton}
                    className="profile-icon-btn"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>

            {/* Email row */}
            <div style={themeStyles.infoRow}>
              <span style={themeStyles.infoLabel}>Email</span>
              {isEditing ? (
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  style={themeStyles.editInput}
                  className="profile-edit-input"
                  placeholder="your@email.com"
                />
              ) : (
                <span style={themeStyles.infoValue}>
                  <FaEnvelope
                    style={{
                      color: isDarkMode ? T.gold : brandColors.bronze,
                      fontSize: "0.8rem",
                    }}
                  />
                  {user?.email}
                </span>
              )}
            </div>

            {/* Member since */}
            <div style={themeStyles.infoRow}>
              <span style={themeStyles.infoLabel}>Member Since</span>
              <span style={themeStyles.infoValue}>
                <FaCalendarAlt
                  style={{
                    marginRight: "0.5rem",
                    color: isDarkMode ? T.gold : brandColors.bronze,
                    fontSize: "0.8rem",
                  }}
                />
                {new Date(user?.createdAt || Date.now()).toLocaleDateString(
                  "en-IN",
                  { day: "numeric", month: "long", year: "numeric" }
                )}
              </span>
            </div>

            {/* Skin type */}
            <div style={{ ...themeStyles.infoRow, borderBottom: "none" }}>
              <span style={themeStyles.infoLabel}>Skin Type</span>
              <span style={themeStyles.infoValue}>All Skin Types 🌿</span>
            </div>

            {/* Order History */}
            <div style={{ ...themeStyles.sectionTitle, marginTop: "2rem" }}>
              <FaShoppingBag /> Recent Orders
            </div>

            {orders.length > 0 ? (
              orders.slice(0, 5).map((order) => {
                const liveStatus = getLiveStatus(order);
                const statusStyle = getStatusColor(liveStatus);

                return (
                  <div
                    key={order.id}
                    style={themeStyles.orderCard}
                    className="profile-order-card"
                  >
                    <div style={themeStyles.orderInfo}>
                      <div style={themeStyles.orderId}>
                        <FaBoxOpen
                          style={{
                            color: brandColors.primary,
                            fontSize: "0.85rem",
                          }}
                        />{" "}
                        {order.id}
                      </div>
                      <div style={themeStyles.orderDate}>
                        <FaCalendarAlt style={{ fontSize: "0.75rem" }} />{" "}
                        {formatDate(order.date)}
                      </div>
                      <div style={themeStyles.orderItems}>
                        {order.items
                          .map((it) => `${it.name} × ${it.quantity}`)
                          .join(" • ")}
                      </div>
                    </div>
                    <div style={themeStyles.orderRight}>
                      <div style={themeStyles.orderTotal}>
                        ₹{Number(order.total).toFixed(2)}
                      </div>
                      <span
                        style={{
                          ...themeStyles.orderStatus,
                          backgroundColor: statusStyle.bg,
                        }}
                      >
                        {statusStyle.label}
                      </span>
                      <button
                        style={themeStyles.reorderButton}
                        className="profile-reorder-btn"
                        onClick={() => handleReorder(order)}
                        aria-label="Buy again"
                      >
                        <FaRedo /> Buy Again
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={themeStyles.emptyState}>
                <FaBoxOpen
                  style={{
                    fontSize: "2.25rem",
                    opacity: 0.3,
                    marginBottom: "0.6rem",
                  }}
                />
                <p style={{ margin: "0 0 1.25rem" }}>No orders yet</p>
                <button
                  onClick={() => navigate("/shop")}
                  style={{
                    ...themeStyles.logoutButton,
                    background: "linear-gradient(135deg, #f7d794, #f5346b)",
                    color: isDarkMode ? brandColors.black : "#ffffff",
                    border: "none",
                    fontWeight: "700",
                    width: "auto",
                    padding: "0.75rem 1.6rem",
                    marginTop: 0,
                    boxShadow: "0 8px 22px rgba(245,52,107,0.35)",
                  }}
                >
                  Start Shopping
                </button>
              </div>
            )}

            {/* Natural Skincare Collection */}
            <div style={{ ...themeStyles.sectionTitle, marginTop: "2rem" }}>
              <FaSpa /> Natural Skincare Collection
            </div>
            <div style={themeStyles.collectionGrid}>
              {[
                { name: "Multani Mitti", icon: <FaTint />, color: "#8bc34a" },
                { name: "Ubtan Powder", icon: <FaGem />, color: "#ffb74d" },
                { name: "Shikakai", icon: <FaLeaf />, color: "#66bb6a" },
                { name: "Reetha", icon: <FaLeaf />, color: "#a1887f" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={themeStyles.collectionCard}
                  className="profile-collection-card"
                >
                  <div
                    style={{
                      ...themeStyles.collectionIcon,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={themeStyles.collectionName}>{item.name}</div>
                  <div style={themeStyles.collectionSub}>100% Natural</div>
                </div>
              ))}
            </div>

            {/* Wishlist */}
            <div style={{ ...themeStyles.sectionTitle, marginTop: "2rem" }}>
              <FaHeart /> Saved Items
            </div>
            <p
              style={{
                color: T.textMuted,
                marginBottom: "1.15rem",
                fontSize: "0.9rem",
                lineHeight: "1.65",
              }}
            >
              View your favorite natural skincare products
            </p>
            <button
              style={{
                ...themeStyles.logoutButton,
                background: "linear-gradient(135deg, #f7d794, #f5346b)",
                color: isDarkMode ? brandColors.black : "#ffffff",
                border: "none",
                fontWeight: "700",
                boxShadow: "0 8px 24px rgba(245, 52, 107, 0.32)",
              }}
              className="profile-wishlist-btn"
              onClick={() => navigate("/wishlist")}
            >
              <FaHeart /> Go to Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;