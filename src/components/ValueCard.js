import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaLeaf } from "react-icons/fa";

const ValueCard = ({ icon, title, description, color }) => {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // ASudha Beauty Brand Palette
  const brandColors = {
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    primary: "#f5346b",
    earthDark: "#3e2723",
    earthLight: "#6d4c41",
    cream: "#fcf8f5",
    green: "#4caf50",
    black: "#0f0f0f",
    darkSlate: "#1a1a1a",
  };

  // Use provided color or default
  const accentColor = color || (isDarkMode ? brandColors.gold : brandColors.bronze);

  const themeStyles = {
    card: {
      padding: "2.5rem 2rem",
      backgroundColor: isDarkMode ? brandColors.darkSlate : "#ffffff", // UPDATED
      borderRadius: "20px",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      textAlign: "center",
      cursor: "default",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)" // UPDATED
        : "1px solid rgba(62, 39, 35, 0.03)",
      position: "relative",
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      borderColor: isHovered
        ? isDarkMode
          ? "rgba(212, 175, 55, 0.4)" // UPDATED
          : "rgba(199, 125, 66, 0.2)"
        : isDarkMode
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(62, 39, 35, 0.03)",
    },
    // Decorative corner accent
    cornerAccent: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "60px",
      height: "60px",
      background: isDarkMode
        ? `linear-gradient(135deg, transparent 50%, ${accentColor}25 50%)` // UPDATED opacity
        : `linear-gradient(135deg, transparent 50%, ${accentColor}10 50%)`,
      pointerEvents: "none",
      transition: "all 0.4s ease",
      opacity: isHovered ? 1 : 0.5,
    },
    // Bottom accent bar
    bottomAccent: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
      opacity: isHovered ? 1 : 0.3,
      transition: "all 0.4s ease",
    },
    iconContainer: {
      width: "80px",
      height: "80px",
      margin: "0 auto 1.5rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)" // UPDATED
        : `rgba(255,255,255,0.6)`,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.5rem",
      transition: "all 0.4s ease",
      border: `2px solid ${isDarkMode ? `${accentColor}40` : `${accentColor}15`}`, // UPDATED
      color: accentColor,
      transform: isHovered ? "scale(1.1)" : "scale(1)",
      borderColor: isHovered
        ? isDarkMode
          ? `${accentColor}80` // UPDATED
          : `${accentColor}40`
        : isDarkMode
          ? `${accentColor}40`
          : `${accentColor}15`,
    },
    // Decorative ring around icon
    iconRing: {
      position: "absolute",
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      border: `2px dashed ${isDarkMode ? `${accentColor}30` : `${accentColor}10`}`, // UPDATED
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      animation: isHovered ? "spin 20s linear infinite" : "none",
      pointerEvents: "none",
    },
    title: {
      fontSize: "1.2rem",
      marginBottom: "0.75rem",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark, // UPDATED
      fontWeight: "600",
      letterSpacing: "0.5px",
      position: "relative",
    },
    titleUnderline: {
      height: "2px",
      background: `linear-gradient(90deg, ${accentColor}, transparent)`,
      margin: "0 auto 0.75rem",
      transition: "all 0.4s ease",
      width: isHovered ? "50px" : "30px",
    },
    description: {
      fontSize: "0.9rem",
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight, // UPDATED
      lineHeight: "1.8",
      maxWidth: "90%",
      margin: "0 auto",
    },
    // Number badge for order
    numberBadge: {
      position: "absolute",
      top: "0.75rem",
      left: "0.75rem",
      fontSize: "0.6rem",
      fontWeight: "700",
      color: isDarkMode ? `${accentColor}80` : `${accentColor}30`, // UPDATED
      letterSpacing: "1px",
      opacity: 0.5,
    },
    // Leaf accent
    leafAccent: {
      position: "absolute",
      bottom: "0.75rem",
      right: "0.75rem",
      fontSize: "0.7rem",
      color: isDarkMode ? `${accentColor}30` : `${accentColor}10`, // UPDATED
      transform: isHovered ? "scale(1.2) rotate(20deg)" : "scale(1) rotate(0deg)",
      transition: "all 0.4s ease",
      pointerEvents: "none",
    },
  };

  // Get card style with dynamic boxShadow
  const getCardStyle = () => {
    const baseStyle = { ...themeStyles.card };
    baseStyle.boxShadow = isHovered
      ? isDarkMode
        ? "0 16px 48px rgba(0,0,0,0.8)" // UPDATED
        : "0 16px 48px rgba(62, 39, 35, 0.08)"
      : isDarkMode
        ? "0 8px 24px rgba(0,0,0,0.6)" // UPDATED
        : "0 4px 20px rgba(62, 39, 35, 0.04)";
    return baseStyle;
  };

  // Get icon container style with dynamic boxShadow
  const getIconContainerStyle = () => {
    const baseStyle = { ...themeStyles.iconContainer };
    baseStyle.boxShadow = isHovered
      ? isDarkMode
        ? `0 0 30px ${accentColor}30` // UPDATED
        : `0 0 30px ${accentColor}10`
      : isDarkMode
        ? "0 4px 16px rgba(0,0,0,0.5)" // UPDATED
        : "0 4px 16px rgba(62, 39, 35, 0.04)";
    return baseStyle;
  };

  // Add keyframes for animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      style={getCardStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner Accent */}
      <div style={themeStyles.cornerAccent} />

      {/* Bottom Accent Bar */}
      <div style={themeStyles.bottomAccent} />

      {/* Number Badge */}
      <div style={themeStyles.numberBadge}>✦</div>

      {/* Leaf Accent */}
      <FaLeaf style={themeStyles.leafAccent} />

      <div style={getIconContainerStyle()}>
        {/* Decorative Ring */}
        <div style={themeStyles.iconRing} />
        {icon}
      </div>

      <h3 style={themeStyles.title}>{title}</h3>
      <div style={themeStyles.titleUnderline} />
      <p style={themeStyles.description}>{description}</p>
    </div>
  );
};

export default ValueCard;