import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon, FaLeaf } from "react-icons/fa";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Brand colors tailored to ASudha Beauty
  const brandColors = {
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    primary: "#f5346b",
    earthDark: "#3e2723",
    earthLight: "#6d4c41",
    cream: "#fcf8f5",
    black: "#0f0f0f",
    darkSlate: "#1a1a1a",
  };

  const styles = {
    toggleContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.2rem",
      borderRadius: "50px",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.8)"
        : "rgba(255,255,255,0.8)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      boxShadow: isDarkMode
        ? "0 2px 12px rgba(0,0,0,0.6)"
        : "0 2px 12px rgba(62, 39, 35, 0.04)",
      transition: "all 0.3s ease",
      marginLeft: "0.25rem",
      position: "relative",
    },
    // Animated background glow
    glowRing: {
      position: "absolute",
      width: "calc(100% + 8px)",
      height: "calc(100% + 8px)",
      borderRadius: "50px",
      background: isDarkMode
        ? "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)"
        : "radial-gradient(circle, rgba(245, 52, 107, 0.08) 0%, transparent 70%)",
      opacity: isHovered ? 1 : 0,
      transition: "opacity 0.4s ease",
      pointerEvents: "none",
      top: "-4px",
      left: "-4px",
    },
    toggleButton: {
      background: isDarkMode
        ? "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)"
        : "linear-gradient(135deg, #fcf8f5 0%, #ffffff 100%)",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      cursor: "pointer",
      color: isDarkMode ? "#ffffff" : brandColors.earthLight,
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      boxShadow: isDarkMode
        ? "0 2px 12px rgba(0,0,0,0.5)"
        : "0 2px 12px rgba(62, 39, 35, 0.04)",
      position: "relative",
      zIndex: 1,
      transform: isHovered
        ? "scale(1.08) rotate(10deg)"
        : "scale(1) rotate(0deg)",
      ":hover": {
        boxShadow: isDarkMode
          ? "0 4px 20px rgba(0,0,0,0.8)"
          : "0 4px 20px rgba(62, 39, 35, 0.08)",
        color: isDarkMode ? brandColors.gold : brandColors.bronze,
      },
      ":active": {
        transform: "scale(0.92)",
      },
    },
    // Enhanced icon styling with glow effects
    sunIcon: {
      color: "#f7d794",
      filter: "drop-shadow(0 0 8px rgba(247, 215, 148, 0.5))",
      fontSize: "1.1rem",
      transition: "all 0.4s ease",
      animation: isHovered ? "spin 2s linear infinite" : "none",
    },
    moonIcon: {
      color: "#f5f5f5",
      filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
      fontSize: "1.1rem",
      transition: "all 0.4s ease",
      animation: isHovered ? "float 2s ease-in-out infinite" : "none",
    },
    // Leaf accent for Ayurvedic touch
    leafAccent: {
      position: "absolute",
      bottom: "-2px",
      right: "-2px",
      fontSize: "0.5rem",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      opacity: 0.3,
      transform: isHovered
        ? "scale(1.2) rotate(20deg)"
        : "scale(1) rotate(0deg)",
      transition: "all 0.4s ease",
      pointerEvents: "none",
      zIndex: 0,
    },
    // ─── Tooltip (now BELOW the icon) ───
    tooltip: {
      position: "absolute",
      top: "calc(100% + 10px)",              // ✅ moved below
      left: "50%",
      transform: isHovered
        ? "translateX(-50%) translateY(0)"
        : "translateX(-50%) translateY(-5px)", // ✅ animate from above
      padding: "0.3rem 0.8rem",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.95)"
        : "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(8px)",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      borderRadius: "8px",
      fontSize: "0.7rem",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      whiteSpace: "nowrap",
      opacity: isHovered ? 1 : 0,
      transition: "all 0.3s ease",
      pointerEvents: "none",
      zIndex: 10,
      fontWeight: "500",
      letterSpacing: "0.3px",
    },
    // ─── Tooltip arrow (now pointing UP at the icon) ───
    tooltipArrow: {
      position: "absolute",
      top: "-6px",                            // ✅ arrow at top
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
      width: "10px",
      height: "10px",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.95)"
        : "rgba(255, 255, 255, 0.95)",
      borderLeft: isDarkMode                   // ✅ flipped side
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      borderTop: isDarkMode                    // ✅ flipped side
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      borderRadius: "2px 0 0 0",               // ✅ flipped radius
    },
  };

  // Add keyframes for animations
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      style={styles.toggleContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow ring */}
      <div style={styles.glowRing} />

      {/* Leaf accent */}
      <FaLeaf style={styles.leafAccent} />

      {/* Tooltip */}
      <div style={styles.tooltip}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        <div style={styles.tooltipArrow} />
      </div>

      <button
        onClick={toggleTheme}
        style={styles.toggleButton}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? (
          <FaSun style={styles.sunIcon} />
        ) : (
          <FaMoon style={styles.moonIcon} />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;