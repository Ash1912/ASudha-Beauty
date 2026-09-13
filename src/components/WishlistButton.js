import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaLeaf } from "react-icons/fa";

const WishlistButton = () => {
  const { isDarkMode } = useTheme();
  const { getWishlistCount } = useWishlist();
  const count = getWishlistCount();
  const [isHovered, setIsHovered] = useState(false);

  // ASudha Beauty Brand Palette
  const brandColors = {
    primary: "#f5346b",
    primaryHover: "#ff4d7a",
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    earthDark: "#3e2723",
    earthLight: "#6d4c41",
    cream: "#fcf8f5",
    green: "#4caf50",
  };

  const styles = {
    container: {
      position: "relative",
      padding: "0.15rem",
      borderRadius: "50px",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.8)" // UPDATED
        : "rgba(255, 255, 255, 0.4)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.15)"
        : "1px solid rgba(199, 125, 66, 0.1)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "0.25rem",
    },
    // Glow ring effect
    glowRing: {
      position: "absolute",
      width: "calc(100% + 8px)",
      height: "calc(100% + 8px)",
      borderRadius: "50px",
      background: `radial-gradient(circle, rgba(245, 52, 107, 0.2) 0%, transparent 70%)`,
      opacity: isHovered && count > 0 ? 1 : 0,
      transition: "opacity 0.4s ease",
      pointerEvents: "none",
      top: "-4px",
      left: "-4px",
    },
    wishlistLink: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "1.15rem",
      position: "relative",
      padding: "0.4rem 0.6rem 0.4rem 0.2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.4s ease",
    },
    heartIcon: {
      color: isDarkMode ? brandColors.primary : brandColors.primary,
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      filter: isDarkMode
        ? `drop-shadow(0 0 ${isHovered ? "12px" : "6px"} rgba(245, 52, 107, ${isHovered ? "0.6" : "0.4"}))`
        : `drop-shadow(0 0 ${isHovered ? "12px" : "6px"} rgba(245, 52, 107, ${isHovered ? "0.2" : "0.1"}))`,
      transform: isHovered ? "scale(1.12)" : "scale(1)",
      animation: isHovered ? "heartBeat 1s ease-in-out infinite" : "none",
    },
    wishlistCount: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      backgroundColor: brandColors.primary,
      color: "#ffffff",
      borderRadius: "50px",
      padding: "1px 7px",
      fontSize: "0.65rem",
      minWidth: "18px",
      height: "18px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      letterSpacing: "0.3px",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.2)"
        : "1px solid rgba(255,255,255,0.3)",
      boxShadow: isDarkMode
        ? "0 2px 12px rgba(245, 52, 107, 0.6)"
        : "0 2px 12px rgba(245, 52, 107, 0.3)",
      transform: isHovered ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
    },
    // Tooltip
    tooltip: {
      position: "absolute",
      top: "calc(100% + 10px)",
      left: "50%",
      transform: isHovered
        ? "translateX(-50%) translateY(0)"
        : "translateX(-50%) translateY(-5px)",
      padding: "0.3rem 0.8rem",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.95)" // UPDATED
        : "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(8px)",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      borderRadius: "8px",
      fontSize: "0.65rem",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark, // UPDATED
      whiteSpace: "nowrap",
      opacity: isHovered ? 1 : 0,
      transition: "all 0.3s ease",
      pointerEvents: "none",
      zIndex: 10,
      fontWeight: "500",
      letterSpacing: "0.3px",
    },
    // Tooltip arrow
    tooltipArrow: {
      position: "absolute",
      top: "-6px",
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
      width: "10px",
      height: "10px",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.95)" // UPDATED
        : "rgba(255, 255, 255, 0.95)",
      borderRight: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      borderBottom: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      borderRadius: "2px 0 0 0",
    },
    // Leaf accent
    leafAccent: {
      position: "absolute",
      bottom: "-1px",
      right: "-1px",
      fontSize: "0.4rem",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      opacity: 0.3,
      transform: isHovered
        ? "scale(1.3) rotate(20deg)"
        : "scale(1) rotate(0deg)",
      transition: "all 0.4s ease",
      pointerEvents: "none",
    },
  };

  // Add keyframes for animations
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        14% { transform: scale(1.15); }
        28% { transform: scale(1); }
        42% { transform: scale(1.1); }
        56% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Get container style with dynamic boxShadow
  const getContainerStyle = () => {
    const baseStyle = { ...styles.container };
    // Add boxShadow dynamically based on hover state
    baseStyle.boxShadow = isHovered
      ? isDarkMode
        ? "0 4px 20px rgba(212, 175, 55, 0.2)"
        : "0 4px 20px rgba(199, 125, 66, 0.08)"
      : isDarkMode
        ? "0 2px 12px rgba(0,0,0,0.5)"
        : "0 2px 12px rgba(62, 39, 35, 0.04)";
    // Add transform and borderColor dynamically
    baseStyle.transform = isHovered ? "scale(1.04)" : "scale(1)";
    baseStyle.borderColor = isHovered
      ? isDarkMode
        ? "rgba(212, 175, 55, 0.4)"
        : "rgba(199, 125, 66, 0.3)"
      : isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.15)"
        : "1px solid rgba(199, 125, 66, 0.1)";
    return baseStyle;
  };

  return (
    <div
      style={getContainerStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow ring */}
      <div style={styles.glowRing} />

      {/* Leaf accent */}
      <FaLeaf style={styles.leafAccent} />

      {/* Tooltip */}
      <div style={styles.tooltip}>
        {count > 0
          ? `${count} item${count > 1 ? "s" : ""} in wishlist`
          : "Wishlist"}
        <div style={styles.tooltipArrow} />
      </div>

      <Link to="/wishlist" style={styles.wishlistLink} aria-label="Wishlist">
        <FaHeart style={styles.heartIcon} />
        {count > 0 && <span style={styles.wishlistCount}>{count}</span>}
      </Link>
    </div>
  );
};

export default WishlistButton;
