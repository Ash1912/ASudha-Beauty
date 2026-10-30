// src/pages/Profile.jsx
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
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
  FaTruck,
  FaSyncAlt,
  FaExclamationTriangle,
  FaArrowRight,
} from "react-icons/fa";
import SEO from "../components/SEO";

// ─── Site constants ───
const ORDERS_STORAGE_KEY = "asudha_orders"; 
const ORDERS_STORAGE_KEYS = [
  ORDERS_STORAGE_KEY,
  "orders",
  "asudha-beauty-orders",
  "asudhaOrders",
];

// ─── Brand palette (module scope: stable) ───
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

// ─── Product colors for collection grid ───
const COLLECTION_ITEMS = [
  { name: "Multani Mitti", icon: <FaTint />, color: "#8bc34a" },
  { name: "Ubtan Powder", icon: <FaGem />, color: "#ffb74d" },
  { name: "Shikakai", icon: <FaLeaf />, color: "#66bb6a" },
  { name: "Reetha", icon: <FaLeaf />, color: "#a1887f" },
];

// ─── Read orders from localStorage (multi-key fallback) ───
const readStoredOrders = () => {
  if (typeof window === "undefined") return [];
  for (const key of ORDERS_STORAGE_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      /* ignore malformed storage */
    }
  }
  return [];
};

// ─── Normalize an order so UI can never crash on it ───
const normalizeOrder = (o, userEmail) => ({
  id:
    o?.id ||
    o?.orderId ||
    o?.orderNumber ||
    `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  date:
    o?.date || o?.createdAt || o?.orderDate || new Date().toISOString(),
  total:
    typeof o?.total === "number"
      ? o.total
      : parseFloat(o?.total ?? o?.amount ?? 0) || 0,
  items: Array.isArray(o?.items)
    ? o.items.map((it) => ({
        id: it.id,
        name: it.name || "Product",
        quantity: Number(it.quantity) || 1,
        price: Number(it.price) || 0,
        image: it.image,
        category: it.category || "Skincare",
        selectedShade: it.selectedShade,
      }))
    : [],
  customer: o?.customer || {
    name: "",
    email: userEmail || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  },
  userEmail:
    o?.userEmail ||
    o?.email ||
    o?.customer?.email ||
    userEmail ||
    "",
});

const Profile = () => {
  const { isDarkMode } = useTheme();
  const { user, logout, updateProfile } = useAuth();
  const { getOrdersByUser, getLiveStatus } = useOrders();
  const { addToCart } = useCart();
  const { wishlistItems = [] } = useWishlist() || {};
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [reorderMessage, setReorderMessage] = useState(null);

  // ✅ Robust order state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [diagnostic, setDiagnostic] = useState(null);

  // ─── Theme tokens ───
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

  // ✅ Robust order loading with 3 fallbacks
  const loadOrders = useCallback(() => {
    setOrdersLoading(true);
    setDiagnostic(null);

    try {
      const normalizedEmail = (user?.email || "").toLowerCase().trim();
      let found = [];
      let source = "none";

      // Fallback 1: Use OrdersContext
      if (normalizedEmail && typeof getOrdersByUser === "function") {
        try {
          const ctxOrders = getOrdersByUser(user.email);
          if (Array.isArray(ctxOrders) && ctxOrders.length > 0) {
            found = ctxOrders;
            source = "context";
          }
        } catch (e) {
          console.warn("[Profile] getOrdersByUser failed:", e);
        }
      }

      // Fallback 2: LocalStorage, match by email
      if (found.length === 0) {
        const stored = readStoredOrders();
        if (stored.length > 0) {
          const matched = stored.filter((o) => {
            const oEmail = (
              o?.userEmail ||
              o?.email ||
              o?.customer?.email ||
              ""
            )
              .toLowerCase()
              .trim();
            return oEmail === normalizedEmail;
          });
          if (matched.length > 0) {
            found = matched;
            source = "localStorage-email";
          } else if (normalizedEmail) {
            setDiagnostic({
              type: "no-match",
              totalStored: stored.length,
              userEmail: normalizedEmail,
              sampleEmails: stored
                .slice(0, 3)
                .map(
                  (o) =>
                    o?.userEmail || o?.email || o?.customer?.email || "(none)"
                ),
            });
          }
        }
      }

      // Fallback 3: Match by user ID
      if (found.length === 0 && user?.id) {
        const stored = readStoredOrders();
        const matched = stored.filter(
          (o) => String(o?.userId) === String(user.id)
        );
        if (matched.length > 0) {
          found = matched;
          source = "localStorage-userId";
        }
      }

      // Normalize every order so a single bad order can't break the list
      const normalized = found.map((o) => normalizeOrder(o, user?.email));

      // Sort newest first
      normalized.sort((a, b) => new Date(b.date) - new Date(a.date));

      setOrders(normalized);

      if (process.env.NODE_ENV === "development") {
        console.info(
          `[Profile] Loaded ${normalized.length} orders (source: ${source})`
        );
      }
    } catch (err) {
      console.error("[Profile] Failed to load orders:", err);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, [user?.email, user?.id, getOrdersByUser]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // ─── Derived stats ───
  const totalItemsPurchased = orders.reduce(
    (sum, o) => sum + (o.items?.reduce((s, it) => s + it.quantity, 0) || 0),
    0
  );

  const wishlistCount = Array.isArray(wishlistItems)
    ? wishlistItems.length
    : 0;

  const skincareStats = {
    orders: orders.length,
    itemsPurchased: totalItemsPurchased,
    favorites: wishlistCount,
  };

  // ─── Handlers ───
  const handleUpdateProfile = async () => {
    setUpdateError("");
    if (!editedName.trim()) {
      setUpdateError("Name cannot be empty");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(editedEmail.trim())) {
      setUpdateError("Please enter a valid email address");
      return;
    }
    setSaving(true);
    const result = await updateProfile({
      name: editedName.trim(),
      email: editedEmail.trim(),
    });
    setSaving(false);

    if (result?.success) {
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } else {
      setUpdateError(result?.error || "Could not update profile. Try again.");
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
    setUpdateError("");
  };

  const handleReorder = (order) => {
    try {
      if (!order?.items || order.items.length === 0) {
        setReorderMessage("This order has no items to re-order.");
        setTimeout(() => setReorderMessage(null), 2500);
        return;
      }
      let added = 0;
      order.items.forEach((item) => {
        if (!item?.id) return;
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
        added += 1;
      });
      setReorderMessage(`Added ${added} item(s) to cart`);
      setTimeout(() => setReorderMessage(null), 2500);
    } catch (err) {
      console.error("[Profile] Reorder failed:", err);
      setReorderMessage("Could not re-order items. Please try again.");
      setTimeout(() => setReorderMessage(null), 2500);
    }
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
      return String(dateStr);
    }
  };

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  // ─── Injected CSS (only depends on isDarkMode) ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-profile-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-profile-styles", "true");
    style.textContent = `
      @keyframes profileFadeInUp {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes profileSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .profile-back-btn { transition: all 0.3s ease; }
      .profile-back-btn:hover,
      .profile-back-btn:focus-visible {
        transform: translateX(-4px);
        background: linear-gradient(135deg, #f7d794, #f5346b) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        border-color: transparent !important;
        outline: none;
      }

      .profile-logout { transition: all 0.3s ease; }
      .profile-logout:hover,
      .profile-logout:focus-visible {
        background: ${brandColors.primary} !important;
        color: #ffffff !important;
        border-color: ${brandColors.primary} !important;
        transform: translateY(-2px);
        outline: none;
      }

      .profile-icon-btn { transition: all 0.3s ease; }
      .profile-icon-btn:hover,
      .profile-icon-btn:focus-visible {
        background: linear-gradient(135deg, #f7d794, #f5346b) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        border-color: transparent !important;
        transform: translateY(-2px);
        outline: none;
      }

      .profile-order-card { transition: all 0.3s ease; }
      .profile-order-card:hover {
        transform: translateY(-4px);
        box-shadow: ${
          isDarkMode
            ? "0 20px 40px rgba(0, 0, 0, 0.65)"
            : "0 20px 40px rgba(62, 39, 35, 0.1)"
        };
        border-color: rgba(212, 175, 55, 0.4) !important;
      }

      .profile-collection-card { transition: all 0.3s ease; }
      .profile-collection-card:hover,
      .profile-collection-card:focus-visible {
        transform: translateY(-6px);
        box-shadow: ${
          isDarkMode
            ? "0 20px 40px rgba(0, 0, 0, 0.65)"
            : "0 20px 40px rgba(62, 39, 35, 0.1)"
        };
        border-color: rgba(212, 175, 55, 0.4) !important;
        outline: none;
      }

      .profile-edit-input { transition: border-color 0.25s ease, box-shadow 0.25s ease; }
      .profile-edit-input:focus {
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.bronze
        } !important;
        box-shadow: 0 0 0 3px ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.18)"
            : "rgba(199, 125, 66, 0.12)"
        };
        outline: none;
      }

      .profile-wishlist-btn { transition: all 0.3s ease; }
      .profile-wishlist-btn:hover,
      .profile-wishlist-btn:focus-visible {
        transform: translateY(-3px);
        box-shadow: 0 14px 32px rgba(245, 52, 107, 0.4);
        outline: none;
      }

      .profile-reorder-btn { transition: all 0.3s ease; }
      .profile-reorder-btn:hover,
      .profile-reorder-btn:focus-visible {
        background: ${brandColors.primary} !important;
        color: #ffffff !important;
        transform: translateY(-2px);
        outline: none;
      }

      .profile-refresh-btn { transition: all 0.25s ease; }
      .profile-refresh-btn:hover,
      .profile-refresh-btn:focus-visible {
        color: ${brandColors.primary} !important;
        border-color: ${brandColors.primary} !important;
        outline: none;
      }
      .profile-refresh-btn .spinner {
        animation: profileSpin 1s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .profile-back-btn, .profile-logout, .profile-icon-btn,
        .profile-order-card, .profile-collection-card, .profile-edit-input,
        .profile-wishlist-btn, .profile-reorder-btn, .profile-refresh-btn {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-profile-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  const themeStyles = {
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
      minHeight: "100%",
      position: "relative",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },
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
      fontFamily: "inherit",
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
      animation: "profileFadeInUp 0.35s ease",
    },
    errorMessage: {
      position: "relative",
      zIndex: 2,
      background: isDarkMode
        ? "rgba(244, 67, 54, 0.15)"
        : "rgba(244, 67, 54, 0.1)",
      color: isDarkMode ? "#ff8a80" : "#c62828",
      padding: "0.85rem 1.15rem",
      borderRadius: "14px",
      marginBottom: "1.25rem",
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      fontWeight: "600",
      border: `1px solid ${
        isDarkMode ? "rgba(244, 67, 54, 0.3)" : "rgba(244, 67, 54, 0.25)"
      }`,
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
      animation: "profileFadeInUp 0.35s ease",
      whiteSpace: "nowrap",
      maxWidth: "calc(100vw - 2rem)",
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
      fontFamily: "inherit",
    },
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
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.75rem",
      flexWrap: "wrap",
      marginTop: "2rem",
      marginBottom: "1.15rem",
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
      margin: 0,
    },
    sectionSubtitle: {
      color: T.textMuted,
      marginBottom: "1.15rem",
      fontSize: "0.9rem",
      lineHeight: "1.65",
    },
    orderBadge: {
      fontSize: "0.72rem",
      fontWeight: "800",
      color: T.textMuted,
      padding: "0.2rem 0.7rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.06)"
        : "rgba(62,39,35,0.04)",
      borderRadius: "50px",
      letterSpacing: "0.3px",
    },
    refreshButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.4rem 0.85rem",
      background: "transparent",
      color: T.textMuted,
      border: `1px solid ${T.borderSoft}`,
      borderRadius: "50px",
      cursor: "pointer",
      fontSize: "0.75rem",
      fontWeight: "700",
      fontFamily: "inherit",
    },
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
      fontFamily: "inherit",
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
      fontFamily: "inherit",
    },
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
      fontFamily: "inherit",
    },
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
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      textDecoration: "none",
      display: "block",
      color: T.text,
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
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.02)"
        : "rgba(62,39,35,0.02)",
      borderRadius: "16px",
      border: `1px dashed ${T.borderSoft}`,
    },
    emptyTitle: {
      fontSize: "1rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
      color: T.text,
    },
    emptyText: {
      margin: "0 0 1.25rem",
      lineHeight: "1.65",
      fontSize: "0.88rem",
    },
    loadingState: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.6rem",
      padding: "2rem 1rem",
      color: T.textMuted,
      fontSize: "0.92rem",
      fontWeight: "600",
    },
    diagnosticBox: {
      padding: "0.85rem 1rem",
      borderRadius: "12px",
      backgroundColor: isDarkMode
        ? "rgba(255, 152, 0, 0.1)"
        : "rgba(255, 152, 0, 0.08)",
      border: `1px solid ${
        isDarkMode ? "rgba(255, 152, 0, 0.3)" : "rgba(255, 152, 0, 0.25)"
      }`,
      color: isDarkMode ? "#ffb74d" : "#e65100",
      fontSize: "0.8rem",
      lineHeight: "1.6",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "flex-start",
      gap: "0.5rem",
    },
    trackLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      fontSize: "0.8rem",
      fontWeight: "700",
      color: brandColors.primary,
      textDecoration: "none",
      marginTop: "0.4rem",
    },
    shopCTA: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.6rem",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontWeight: "700",
      fontSize: "0.9rem",
      cursor: "pointer",
      boxShadow: "0 8px 22px rgba(245,52,107,0.35)",
      fontFamily: "inherit",
      textDecoration: "none",
    },
    wishlistButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      width: "100%",
      padding: "0.85rem",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontWeight: "700",
      cursor: "pointer",
      fontSize: "0.95rem",
      boxShadow: "0 8px 24px rgba(245, 52, 107, 0.32)",
      fontFamily: "inherit",
    },
  };

  return (
    <>
      <SEO
        title="My Profile | ASudha Beauty"
        description="Manage your ASudha Beauty account, view order history, and explore your natural skincare collection."
        url="/profile"
        noindex
      />

      <div style={themeStyles.container}>
        <div style={themeStyles.bgBlob1} aria-hidden="true" />
        <div style={themeStyles.bgBlob2} aria-hidden="true" />

        <button
          type="button"
          onClick={() => navigate(-1)}
          style={themeStyles.backButton}
          className="profile-back-btn"
          aria-label="Go back to previous page"
        >
          <FaArrowLeft aria-hidden="true" /> Back
        </button>

        {updateSuccess && (
          <div
            style={themeStyles.successMessage}
            role="status"
            aria-live="polite"
          >
            <FaCheckCircle aria-hidden="true" /> Profile updated successfully!
          </div>
        )}
        {updateError && (
          <div
            style={themeStyles.errorMessage}
            role="alert"
            aria-live="assertive"
          >
            <FaExclamationTriangle aria-hidden="true" /> {updateError}
          </div>
        )}
        {reorderMessage && (
          <div
            style={themeStyles.reorderMessage}
            role="status"
            aria-live="polite"
          >
            <FaCheckCircle aria-hidden="true" /> {reorderMessage}
          </div>
        )}

        <div style={themeStyles.profileGrid}>
          {/* Sidebar */}
          <aside style={themeStyles.sidebar} aria-label="Account summary">
            <div style={themeStyles.sidebarAccent} aria-hidden="true" />
            <div style={themeStyles.avatarWrapper}>
              <div style={themeStyles.avatar} aria-hidden="true">
                <FaUser />
              </div>
            </div>
            <h1 style={themeStyles.userName}>{user?.name || "Guest"}</h1>
            <p style={themeStyles.userEmail}>
              {user?.email || "guest@asudha.com"}
            </p>

            <div style={themeStyles.naturalBadge}>
              <FaLeaf aria-hidden="true" /> Natural Skincare Lover
            </div>

            <div style={themeStyles.stats}>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statValue}>
                  {skincareStats.orders}
                </div>
                <div style={themeStyles.statLabel}>Orders</div>
              </div>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statValue}>
                  {skincareStats.itemsPurchased}
                </div>
                <div style={themeStyles.statLabel}>Items</div>
              </div>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statValue}>
                  {skincareStats.favorites}
                </div>
                <div style={themeStyles.statLabel}>Favorites</div>
              </div>
            </div>

            <button
              type="button"
              style={themeStyles.logoutButton}
              className="profile-logout"
              onClick={handleLogout}
              disabled={loggingOut}
              aria-label="Logout of your account"
            >
              {loggingOut ? (
                <>
                  <FaSpinner
                    aria-hidden="true"
                    style={{ animation: "profileSpin 1s linear infinite" }}
                  />{" "}
                  Logging out…
                </>
              ) : (
                <>
                  <FaSignOutAlt aria-hidden="true" /> Logout
                </>
              )}
            </button>
          </aside>

          {/* Main Content */}
          <main style={themeStyles.content}>
            <h2 style={themeStyles.sectionTitle}>
              <FaUser aria-hidden="true" /> Profile Information
            </h2>

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
                    aria-label="Your name"
                  />
                  <div style={themeStyles.editActions}>
                    <button
                      type="button"
                      style={themeStyles.iconButton}
                      className="profile-icon-btn"
                      onClick={handleUpdateProfile}
                      disabled={saving}
                      aria-label="Save changes"
                    >
                      {saving ? (
                        <FaSpinner
                          aria-hidden="true"
                          style={{
                            animation: "profileSpin 1s linear infinite",
                          }}
                        />
                      ) : (
                        <FaSave aria-hidden="true" />
                      )}
                    </button>
                    <button
                      type="button"
                      style={themeStyles.iconButton}
                      className="profile-icon-btn"
                      onClick={handleCancelEdit}
                      aria-label="Cancel editing"
                    >
                      <FaTimes aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ) : (
                <div style={themeStyles.infoValueRow}>
                  <span style={themeStyles.infoValue}>
                    {user?.name || "—"}
                  </span>
                  <button
                    type="button"
                    style={themeStyles.iconButton}
                    className="profile-icon-btn"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit name and email"
                  >
                    <FaEdit aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

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
                  aria-label="Your email address"
                />
              ) : (
                <span style={themeStyles.infoValue}>
                  <FaEnvelope
                    aria-hidden="true"
                    style={{
                      color: isDarkMode ? T.gold : brandColors.bronze,
                      fontSize: "0.8rem",
                    }}
                  />
                  {user?.email || "—"}
                </span>
              )}
            </div>

            <div style={themeStyles.infoRow}>
              <span style={themeStyles.infoLabel}>Member Since</span>
              <span style={themeStyles.infoValue}>
                <FaCalendarAlt
                  aria-hidden="true"
                  style={{
                    marginRight: "0.5rem",
                    color: isDarkMode ? T.gold : brandColors.bronze,
                    fontSize: "0.8rem",
                  }}
                />
                {user?.createdAt ? (
                  <time dateTime={user.createdAt}>
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                ) : (
                  "Recently joined"
                )}
              </span>
            </div>

            <div
              style={{
                ...themeStyles.infoRow,
                borderBottom: "none",
              }}
            >
              <span style={themeStyles.infoLabel}>Skin Type</span>
              <span style={themeStyles.infoValue}>
                <FaLeaf
                  aria-hidden="true"
                  style={{ color: brandColors.green, fontSize: "0.85rem" }}
                />
                All Skin Types
              </span>
            </div>

            <div style={themeStyles.sectionHeader}>
              <h2 style={themeStyles.sectionTitle}>
                <FaShoppingBag aria-hidden="true" /> Recent Orders
                {orders.length > 0 && (
                  <span style={themeStyles.orderBadge}>
                    {orders.length}
                  </span>
                )}
              </h2>
              <button
                type="button"
                style={themeStyles.refreshButton}
                className="profile-refresh-btn"
                onClick={loadOrders}
                aria-label="Refresh orders"
              >
                <FaSyncAlt
                  aria-hidden="true"
                  className={ordersLoading ? "spinner" : ""}
                  style={{
                    animation: ordersLoading
                      ? "profileSpin 1s linear infinite"
                      : "none",
                  }}
                />
                Refresh
              </button>
            </div>

            {diagnostic?.type === "no-match" && (
              <div style={themeStyles.diagnosticBox}>
                <FaExclamationTriangle
                  aria-hidden="true"
                  style={{ flexShrink: 0, marginTop: "0.1rem" }}
                />
                <div>
                  <strong>Couldn&apos;t match your orders.</strong> Found{" "}
                  {diagnostic.totalStored} order
                  {diagnostic.totalStored !== 1 ? "s" : ""} in storage, but none
                  are linked to <strong>{diagnostic.userEmail}</strong>. If
                  you&apos;re sure you placed an order, try{" "}
                  <Link to="/track-order" style={{ color: "inherit", textDecoration: "underline" }}>
                    tracking it by Order ID
                  </Link>{" "}
                  or{" "}
                  <Link to="/contact" style={{ color: "inherit", textDecoration: "underline" }}>
                    contact support
                  </Link>
                  .
                </div>
              </div>
            )}

            {ordersLoading ? (
              <div style={themeStyles.loadingState} role="status" aria-live="polite">
                <FaSpinner
                  aria-hidden="true"
                  style={{ animation: "profileSpin 1s linear infinite" }}
                />
                Loading your orders…
              </div>
            ) : orders.length > 0 ? (
              orders.slice(0, 5).map((order) => {
                let liveStatus = "Processing";
                try {
                  liveStatus =
                    typeof getLiveStatus === "function"
                      ? getLiveStatus(order)
                      : order.status || "Processing";
                } catch {
                  liveStatus = order.status || "Processing";
                }
                const statusStyle = getStatusColor(liveStatus);

                return (
                  <article
                    key={order.id}
                    style={themeStyles.orderCard}
                    className="profile-order-card"
                  >
                    <div style={themeStyles.orderInfo}>
                      <div style={themeStyles.orderId}>
                        <FaBoxOpen
                          aria-hidden="true"
                          style={{
                            color: brandColors.primary,
                            fontSize: "0.85rem",
                          }}
                        />{" "}
                        {order.id}
                      </div>
                      <div style={themeStyles.orderDate}>
                        <FaCalendarAlt
                          aria-hidden="true"
                          style={{ fontSize: "0.75rem" }}
                        />{" "}
                        <time dateTime={order.date}>
                          {formatDate(order.date)}
                        </time>
                      </div>
                      <div style={themeStyles.orderItems}>
                        {order.items.length > 0
                          ? order.items
                              .map((it) => `${it.name} × ${it.quantity}`)
                              .join(" • ")
                          : "No items recorded"}
                      </div>
                      <Link
                        to="/track-order"
                        style={themeStyles.trackLink}
                        aria-label={`Track order ${order.id}`}
                      >
                        <FaTruck aria-hidden="true" /> Track this order{" "}
                        <FaArrowRight
                          aria-hidden="true"
                          style={{ fontSize: "0.65rem" }}
                        />
                      </Link>
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
                        type="button"
                        style={themeStyles.reorderButton}
                        className="profile-reorder-btn"
                        onClick={() => handleReorder(order)}
                        aria-label={`Buy again: order ${order.id}`}
                      >
                        <FaRedo aria-hidden="true" /> Buy Again
                      </button>
                    </div>
                  </article>
                );
              })
            ) : (
              <div style={themeStyles.emptyState}>
                <FaBoxOpen
                  aria-hidden="true"
                  style={{
                    fontSize: "2.25rem",
                    opacity: 0.3,
                    marginBottom: "0.6rem",
                  }}
                />
                <h3 style={themeStyles.emptyTitle}>No orders yet</h3>
                <p style={themeStyles.emptyText}>
                  Once you place an order, it will appear here. Explore our
                  100% natural Ayurvedic collection to get started.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/shop")}
                  style={themeStyles.shopCTA}
                >
                  <FaShoppingBag aria-hidden="true" /> Start Shopping
                </button>
              </div>
            )}

            <h2
              style={{
                ...themeStyles.sectionTitle,
                marginTop: "2rem",
              }}
            >
              <FaSpa aria-hidden="true" /> Natural Skincare Collection
            </h2>
            <div style={themeStyles.collectionGrid}>
              {COLLECTION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={`/shop?q=${encodeURIComponent(item.name)}`}
                  style={themeStyles.collectionCard}
                  className="profile-collection-card"
                  aria-label={`Browse ${item.name}`}
                >
                  <div
                    style={{
                      ...themeStyles.collectionIcon,
                      color: item.color,
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div style={themeStyles.collectionName}>{item.name}</div>
                  <div style={themeStyles.collectionSub}>100% Natural</div>
                </Link>
              ))}
            </div>

            <h2
              style={{
                ...themeStyles.sectionTitle,
                marginTop: "2rem",
              }}
            >
              <FaHeart aria-hidden="true" /> Saved Items
            </h2>
            <p style={themeStyles.sectionSubtitle}>
              View your favorite natural skincare products
              {wishlistCount > 0
                ? ` — you have ${wishlistCount} saved ${
                    wishlistCount === 1 ? "item" : "items"
                  }`
                : ""}
              .
            </p>
            <button
              type="button"
              style={themeStyles.wishlistButton}
              className="profile-wishlist-btn"
              onClick={() => navigate("/wishlist")}
              aria-label="Go to your wishlist"
            >
              <FaHeart aria-hidden="true" /> Go to Wishlist
              {wishlistCount > 0 && ` (${wishlistCount})`}
            </button>
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;