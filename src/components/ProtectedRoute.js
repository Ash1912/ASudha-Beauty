import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaLeaf, FaSpa } from "react-icons/fa";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isDarkMode } = useTheme();

  // Brand Color Palette
  const brandColors = {
    primary: "#f5346b",
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    earthDark: "#3e2723",
    earthLight: "#6d4c41",
    cream: "#fcf8f5",
    green: "#4caf50",
  };

  const themeStyles = {
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      // UPDATED: Pure Black theme
      backgroundColor: isDarkMode ? "#0f0f0f" : brandColors.cream,
      transition: "background-color 0.3s ease",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    },
    // Decorative background elements
    bgDecor: {
      position: "absolute",
      borderRadius: "50%",
      opacity: 0.04,
      pointerEvents: "none",
    },
    decor1: {
      top: "-10%",
      right: "-5%",
      width: "300px",
      height: "300px",
      backgroundColor: isDarkMode ? brandColors.gold : brandColors.primary,
    },
    decor2: {
      bottom: "-10%",
      left: "-5%",
      width: "250px",
      height: "250px",
      backgroundColor: isDarkMode ? brandColors.gold : brandColors.bronze,
    },
    decor3: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      height: "400px",
      // UPDATED: High contrast border
      border: `2px solid ${isDarkMode ? "rgba(212, 175, 55, 0.08)" : "rgba(62, 39, 35, 0.03)"}`,
      borderRadius: "50%",
    },
    spinnerWrapper: {
      position: "relative",
      width: "80px",
      height: "80px",
      marginBottom: "2rem",
    },
    loadingSpinner: {
      width: "60px",
      height: "60px",
      border: "3px solid transparent",
      borderTop: `3px solid ${isDarkMode ? brandColors.gold : brandColors.primary}`,
      borderBottom: `3px solid ${isDarkMode ? brandColors.gold : brandColors.primary}`,
      borderRadius: "50%",
      animation: "spin 0.8s cubic-bezier(0.6, 0.2, 0.4, 0.8) infinite",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      boxShadow: `0 0 30px ${isDarkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(245, 52, 107, 0.1)"}`,
      background: isDarkMode
        ? "rgba(255,255,255,0.03)"
        : "rgba(255,255,255,0.6)",
      backdropFilter: "blur(8px)",
    },
    spinnerInner: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: isDarkMode ? brandColors.gold : brandColors.primary,
      opacity: 0.15,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      animation: "pulse 1.5s ease-in-out infinite",
    },
    leafIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "1.2rem",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      animation: "float 2s ease-in-out infinite",
    },
    loadingText: {
      // UPDATED: Crisp white text
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      fontSize: "1.2rem",
      fontWeight: "600",
      letterSpacing: "0.5px",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    tagline: {
      // UPDATED: Cleaner gray text
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight,
      fontSize: "0.8rem",
      letterSpacing: "3px",
      fontWeight: "300",
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    taglineDot: {
      display: "inline-block",
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      backgroundColor: isDarkMode ? brandColors.gold : brandColors.primary,
    },
  };

  if (loading) {
    return (
      <div style={themeStyles.loadingContainer}>
        {/* Decorative Background Elements */}
        <div style={{ ...themeStyles.bgDecor, ...themeStyles.decor1 }} />
        <div style={{ ...themeStyles.bgDecor, ...themeStyles.decor2 }} />
        <div style={{ ...themeStyles.bgDecor, ...themeStyles.decor3 }} />

        {/* Spinner */}
        <div style={themeStyles.spinnerWrapper}>
          <div style={themeStyles.loadingSpinner} />
          <div style={themeStyles.spinnerInner} />
          <FaLeaf style={themeStyles.leafIcon} />
        </div>

        {/* Text */}
        <p style={themeStyles.loadingText}>
          <FaSpa style={{ fontSize: "1rem", opacity: 0.6 }} />
          Loading...
        </p>
        <p style={themeStyles.tagline}>
          <span style={themeStyles.taglineDot} />
          Pure
          <span style={themeStyles.taglineDot} />
          Natural
          <span style={themeStyles.taglineDot} />
          Effective
          <span style={themeStyles.taglineDot} />
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Add keyframes for animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.25; }
  }
  @keyframes float {
    0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
    50% { transform: translate(-50%, -50%) translateY(-8px); }
  }
`;
if (!document.head.querySelector("#protected-route-styles")) {
  styleSheet.id = "protected-route-styles";
  document.head.appendChild(styleSheet);
}

export default ProtectedRoute;