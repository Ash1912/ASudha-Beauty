// src/pages/TrackOrder.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useOrders } from "../context/OrdersContext";
import SEO from "../components/SEO";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaBoxOpen,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLeaf,
} from "react-icons/fa";

const TrackOrder = () => {
  const { isDarkMode } = useTheme();
  const { findOrder, getLiveStatus } = useOrders();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Build a plausible tracking history from the saved order
  const buildHistory = (order, liveStatus) => {
    const base = new Date(order.createdAt || order.date || Date.now());
    const dayMs = 24 * 60 * 60 * 1000;

    const events = [
      {
        date: base,
        status: "Order Confirmed",
        location: "Online",
      },
    ];

    if (["Shipped", "Delivered"].includes(liveStatus)) {
      events.push({
        date: new Date(base.getTime() + dayMs),
        status: "Shipped",
        location: "Delhi Hub",
      });
    }

    if (liveStatus === "Delivered") {
      events.push({
        date: new Date(base.getTime() + 3 * dayMs),
        status: "Delivered",
        location: "Customer Address",
      });
    }

    return events.map((e) => ({
      date: e.date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      status: e.status,
      location: e.location,
    }));
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderId || !email) {
      setError("Please enter both Order ID and Email");
      return;
    }

    setIsTracking(true);
    setError("");

    setTimeout(() => {
      const found = findOrder(orderId, email);

      if (!found) {
        setOrderData(null);
        setError(
          "No order found with those details. Please check your Order ID and Email."
        );
        setIsTracking(false);
        return;
      }

      const liveStatus = getLiveStatus(found);

      // Map live status → statusCode for the timeline visual
      const codeMap = { Processing: 1, Shipped: 2, Delivered: 4 };
      const statusCode = codeMap[liveStatus] ?? 1;

      setOrderData({
        id: found.id,
        date: new Date(found.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        status: liveStatus.toLowerCase(),
        statusCode,
        total: `₹${(found.total || 0).toFixed(2)}`,
        items: (found.items || []).map((it) => ({
          name: it.name,
          quantity: it.quantity,
          price: `₹${(it.price * it.quantity).toFixed(2)}`,
        })),
        tracking: {
          current: liveStatus,
          estimatedDelivery: found.estimatedDelivery || "5-7 business days",
          carrier: "ASudha Express",
          trackingNumber:
            found.trackingNumber ||
            "ASU-TRK-" +
              Math.random().toString(36).substring(2, 9).toUpperCase(),
          history: buildHistory(found, liveStatus),
        },
        shippingAddress: found.customer || {},
      });
      setIsTracking(false);
    }, 600);
  };

  const getStatusSteps = () => [
    {
      label: "Order Placed",
      icon: <FaCheckCircle />,
      completed: (orderData?.statusCode ?? -1) >= 0,
    },
    {
      label: "Confirmed",
      icon: <FaCheckCircle />,
      completed: (orderData?.statusCode ?? -1) >= 1,
    },
    {
      label: "Processing",
      icon: <FaBoxOpen />,
      completed: (orderData?.statusCode ?? -1) >= 1,
    },
    {
      label: "Shipped",
      icon: <FaTruck />,
      completed: (orderData?.statusCode ?? -1) >= 2,
    },
    {
      label: "Out for Delivery",
      icon: <FaTruck />,
      completed: (orderData?.statusCode ?? -1) >= 3,
    },
    {
      label: "Delivered",
      icon: <FaBox />,
      completed: (orderData?.statusCode ?? -1) >= 4,
    },
  ];

  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        containerPadding: "1rem",
        fontSizeHeading: "1.5rem",
        formPadding: "1rem",
      };
    } else if (windowWidth <= 768) {
      return {
        containerPadding: "1.5rem",
        fontSizeHeading: "2rem",
        formPadding: "1.5rem",
      };
    }
    return {
      containerPadding: "2rem",
      fontSizeHeading: "2.5rem",
      formPadding: "2rem",
    };
  };

  const responsive = getResponsiveStyles();

  // Theme tokens — aligned to brandColors.black for consistency
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

  const T = {
    bg: isDarkMode ? brandColors.black : brandColors.cream,
    text: isDarkMode ? "#f5f0eb" : "#3e2723",
    textMuted: isDarkMode ? "#a0a0a0" : "#6d4c41",
    card: isDarkMode ? brandColors.darkSlate : "#ffffff",
    cardAlt: isDarkMode ? "#222222" : "#f9f4f0",
    border: isDarkMode
      ? "rgba(212, 175, 55, 0.12)"
      : "rgba(62, 39, 35, 0.08)",
    borderSoft: isDarkMode
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(62, 39, 35, 0.05)",
    shadow: isDarkMode
      ? "0 20px 60px rgba(0, 0, 0, 0.55)"
      : "0 20px 60px rgba(62, 39, 35, 0.08)",
  };

  const themeStyles = {
    container: {
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100vh",
      transition: "background-color 0.3s ease, color 0.3s ease",
      padding: "2rem 0",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      width: "100%",
    },
    bgBlob1: {
      position: "absolute",
      top: "-100px",
      left: "-100px",
      width: "400px",
      height: "400px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      opacity: isDarkMode ? 0.1 : 0.07,
      filter: "blur(100px)",
      zIndex: 0,
      pointerEvents: "none",
    },
    bgBlob2: {
      position: "absolute",
      bottom: "-100px",
      right: "-100px",
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
    },
    header: {
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      padding: `0 ${responsive.containerPadding} 2rem`,
      maxWidth: "1200px",
      margin: "0 auto",
    },
    title: {
      fontSize: responsive.fontSizeHeading,
      fontWeight: "900",
      marginBottom: "0.5rem",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    subtitle: {
      fontSize: windowWidth <= 480 ? "0.9rem" : "1.05rem",
      color: T.textMuted,
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
    },

    formContainer: {
      maxWidth: "600px",
      margin: "2rem auto",
      padding: responsive.formPadding,
      backgroundColor: T.card,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: "24px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      position: "relative",
      zIndex: 2,
      boxSizing: "border-box",
    },
    formGroup: { marginBottom: "1.5rem" },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "700",
      color: T.text,
    },
    input: {
      width: "100%",
      padding: "1rem",
      borderRadius: "12px",
      border: `1px solid ${T.border}`,
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      color: T.text,
      fontSize: "1rem",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "1rem",
      border: "none",
      borderRadius: "50px",
      background: "linear-gradient(135deg, #f7d794, #f5346b)",
      color: "#ffffff",
      fontSize: "1.1rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 10px 30px rgba(245,52,107,0.3)",
      transition: "all 0.4s ease",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      boxSizing: "border-box",
    },
    errorMessage: {
      marginTop: "1rem",
      padding: "1rem",
      backgroundColor: "rgba(244,67,54,0.1)",
      color: "#f44336",
      borderRadius: "12px",
      textAlign: "center",
      border: "1px solid rgba(244,67,54,0.2)",
    },
    loading: {
      textAlign: "center",
      padding: "2rem",
      color: T.textMuted,
    },

    orderDetails: {
      position: "relative",
      zIndex: 2,
      maxWidth: "1200px",
      margin: "2rem auto",
      padding: `0 ${responsive.containerPadding}`,
      boxSizing: "border-box",
    },
    orderCard: {
      backgroundColor: T.card,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: windowWidth <= 480 ? "1.25rem" : "2rem",
      marginBottom: "1.5rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      boxSizing: "border-box",
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "0.75rem",
      marginBottom: "1.5rem",
      paddingBottom: "1.5rem",
      borderBottom: `1px solid ${T.borderSoft}`,
    },
    orderId: {
      fontSize: windowWidth <= 480 ? "1rem" : "1.2rem",
      fontWeight: "800",
      color: brandColors.primary,
      wordBreak: "break-word",
    },
    orderDate: {
      fontSize: "0.85rem",
      color: T.textMuted,
    },
    infoTitle: {
      fontSize: "1.1rem",
      fontWeight: "800",
      marginBottom: "1rem",
      color: isDarkMode ? T.gold : brandColors.bronze,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    infoContent: {
      fontSize: "0.95rem",
      color: T.textMuted,
      lineHeight: "1.6",
    },

    statusTimeline: { margin: "2rem 0" },
    stepsContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      position: "relative",
      gap: "0.5rem",
    },
    step: {
      flex: 1,
      minWidth: "70px",
      textAlign: "center",
      position: "relative",
      padding: "0 0.25rem",
    },
    stepIcon: {
      fontSize: windowWidth <= 480 ? "1.2rem" : "1.5rem",
      marginBottom: "0.5rem",
      color: isDarkMode ? "#555" : "#ccc",
      display: "inline-block",
      position: "relative",
      zIndex: 2,
    },
    stepIconCompleted: {
      color: brandColors.green,
      textShadow: "0 0 20px rgba(76,175,80,0.5)",
    },
    stepLabel: {
      fontSize: windowWidth <= 480 ? "0.68rem" : "0.85rem",
      color: T.textMuted,
    },
    stepLabelCompleted: {
      color: brandColors.green,
      fontWeight: "700",
    },

    trackingInfo: {
      display: "grid",
      gridTemplateColumns: windowWidth <= 768 ? "1fr" : "repeat(2, 1fr)",
      gap: "1rem",
    },
    infoBox: {
      backgroundColor: isDarkMode ? brandColors.black : "#f9f4f0",
      padding: windowWidth <= 480 ? "1rem" : "1.5rem",
      borderRadius: "16px",
      border: `1px solid ${T.borderSoft}`,
      boxSizing: "border-box",
    },

    historyItem: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1.25rem",
      paddingBottom: "1.25rem",
      borderBottom: `1px solid ${T.borderSoft}`,
    },
    historyIcon: {
      fontSize: "1.2rem",
      color: brandColors.green,
      background: "rgba(76,175,80,0.1)",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    historyContent: { flex: 1, minWidth: 0 },
    historyStatus: {
      fontWeight: "800",
      marginBottom: "0.25rem",
      color: T.text,
    },
    historyDate: {
      fontSize: "0.75rem",
      color: T.textMuted,
    },
    historyLocation: {
      fontSize: "0.8rem",
      color: T.textMuted,
      marginTop: "0.25rem",
    },
    itemRow: {
      marginBottom: "0.75rem",
      display: "flex",
      justifyContent: "space-between",
      gap: "0.5rem",
      borderBottom: `1px solid ${T.borderSoft}`,
      paddingBottom: "0.75rem",
      flexWrap: "wrap",
    },
  };

  return (
    <div style={themeStyles.container}>
      <style>{`
        .trk-input:focus {
          border-color: ${brandColors.primary} !important;
          box-shadow: 0 0 0 4px rgba(245,52,107,0.1);
        }
        .trk-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(245,52,107,0.4);
        }
        .trk-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .trk-order-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .trk-order-card:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <div style={themeStyles.bgBlob1}></div>
      <div style={themeStyles.bgBlob2}></div>

      <SEO
        title="Track Your Order | ASudha Beauty"
        description="Track your ASudha Beauty order in real time using your Order ID and email address."
        keywords="track order, order status, shipping, ASudha Beauty"
        url="/track-order"
      />

      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>Track Your Order</h1>
        <p style={themeStyles.subtitle}>
          <FaLeaf
            style={{ color: brandColors.green, marginRight: "5px" }}
          />
          Enter your order ID and email address to track your natural package.
        </p>
      </div>

      {!orderData ? (
        <div style={themeStyles.formContainer}>
          <form onSubmit={handleTrackOrder}>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Order ID *</label>
              <input
                type="text"
                placeholder="e.g., ASUXXXXXXX"
                style={themeStyles.input}
                className="trk-input"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Email Address *</label>
              <input
                type="email"
                placeholder="your@email.com"
                style={themeStyles.input}
                className="trk-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              style={themeStyles.button}
              className="trk-btn"
              disabled={isTracking}
            >
              {isTracking ? "Tracking..." : "Track Order"}
            </button>
            {error && (
              <div style={themeStyles.errorMessage}>{error}</div>
            )}
          </form>
        </div>
      ) : isTracking ? (
        <div style={themeStyles.loading}>Loading order details...</div>
      ) : (
        <div style={themeStyles.orderDetails}>
          <div style={themeStyles.orderCard} className="trk-order-card">
            <div style={themeStyles.orderHeader}>
              <div>
                <div style={themeStyles.orderId}>Order #{orderData.id}</div>
                <div style={themeStyles.orderDate}>
                  Placed on {orderData.date}
                </div>
              </div>
              <div style={themeStyles.orderId}>Total: {orderData.total}</div>
            </div>

            <div style={themeStyles.statusTimeline}>
              <div style={themeStyles.stepsContainer}>
                {getStatusSteps().map((step, idx) => (
                  <div key={idx} style={themeStyles.step}>
                    <div
                      style={{
                        ...themeStyles.stepIcon,
                        ...(step.completed
                          ? themeStyles.stepIconCompleted
                          : {}),
                      }}
                    >
                      {step.icon}
                    </div>
                    <div
                      style={{
                        ...themeStyles.stepLabel,
                        ...(step.completed
                          ? themeStyles.stepLabelCompleted
                          : {}),
                      }}
                    >
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={themeStyles.trackingInfo}>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>Current Status</div>
                <div style={themeStyles.infoContent}>
                  {orderData.tracking.current}
                </div>
              </div>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>Estimated Delivery</div>
                <div style={themeStyles.infoContent}>
                  <FaCalendarAlt
                    style={{
                      marginRight: "0.5rem",
                      color: brandColors.primary,
                    }}
                  />
                  {orderData.tracking.estimatedDelivery}
                </div>
              </div>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>Carrier</div>
                <div style={themeStyles.infoContent}>
                  {orderData.tracking.carrier}
                </div>
              </div>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>Tracking Number</div>
                <div style={themeStyles.infoContent}>
                  {orderData.tracking.trackingNumber}
                </div>
              </div>
            </div>
          </div>

          <div style={themeStyles.orderCard} className="trk-order-card">
            <h3 style={themeStyles.infoTitle}>
              <FaBox /> Order Items
            </h3>
            {orderData.items.map((item, idx) => (
              <div key={idx} style={themeStyles.itemRow}>
                <span style={{ color: T.textMuted }}>
                  {item.name} x {item.quantity}
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    color: brandColors.green,
                  }}
                >
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          <div style={themeStyles.orderCard} className="trk-order-card">
            <h3 style={themeStyles.infoTitle}>
              <FaMapMarkerAlt /> Shipping Address
            </h3>
            <div style={themeStyles.infoContent}>
              <div>{orderData.shippingAddress.name || "—"}</div>
              <div>{orderData.shippingAddress.address || "—"}</div>
              <div>
                {orderData.shippingAddress.city || ""}
                {orderData.shippingAddress.state
                  ? `, ${orderData.shippingAddress.state}`
                  : ""}
                {orderData.shippingAddress.pincode
                  ? ` - ${orderData.shippingAddress.pincode}`
                  : ""}
              </div>
              <div>{orderData.shippingAddress.phone || ""}</div>
            </div>
          </div>

          <div style={themeStyles.orderCard} className="trk-order-card">
            <h3 style={themeStyles.infoTitle}>
              <FaClock /> Tracking History
            </h3>
            {orderData.tracking.history.map((event, idx) => (
              <div key={idx} style={themeStyles.historyItem}>
                <div style={themeStyles.historyIcon}>
                  <FaCheckCircle />
                </div>
                <div style={themeStyles.historyContent}>
                  <div style={themeStyles.historyStatus}>{event.status}</div>
                  <div style={themeStyles.historyDate}>{event.date}</div>
                  <div style={themeStyles.historyLocation}>
                    <FaMapMarkerAlt
                      style={{
                        marginRight: "0.25rem",
                        color: brandColors.green,
                        fontSize: "0.7rem",
                      }}
                    />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link
              to="/contact"
              style={{
                ...themeStyles.button,
                width: "auto",
                padding: "1rem 2.5rem",
              }}
              className="trk-btn"
            >
              Need Help? Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;