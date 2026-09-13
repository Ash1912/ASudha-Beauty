import React from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaLeaf,
  FaSmile,
  FaTint,
  FaShieldAlt,
  FaRegSnowflake,
  FaRegSun,
  FaStar,
  FaSeedling,
  FaHandHoldingHeart,
  FaSpa,
  FaCheckCircle,
  FaHeart,
  FaGem,
  FaWater,
  FaTree,
} from "react-icons/fa";

const SkincareBenefits = ({ benefits, isNatural = true }) => {
  const { isDarkMode } = useTheme();

  // ASudha Beauty Brand Palette
  const brandColors = {
    primary: "#f5346b",
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    earthDark: "#3e2723",
    earthLight: "#6d4c41",
    cream: "#fcf8f5",
    green: "#4caf50",
    greenDark: "#2e7d32",
  };

  // Enhanced benefit icons with more variety
  const benefitIcons = {
    // Skincare
    "Deep cleansing": <FaWater />,
    "Oil control": <FaRegSun />,
    "Improves skin texture": <FaSmile />,
    "Makes skin glow": <FaStar />,
    "Natural and pure": <FaLeaf />,
    "Ayurvedic goodness": <FaSpa />,
    "Nourishes and cleanses": <FaTint />,
    "Revitalizes natural glow": <FaGem />,
    "Chemical free": <FaLeaf />,
    "Paraben free": <FaShieldAlt />,
    "Preservative free": <FaShieldAlt />,
    "Suitable for all skin types": <FaRegSnowflake />,
    
    // Hair Care
    "Promotes hair growth": <FaSeedling />,
    "Strengthens hair roots": <FaTree />,
    "Adds natural shine": <FaGem />,
    "Restores hair health": <FaHandHoldingHeart />,
    "Reduces hair fall": <FaRegSnowflake />,
    "100% natural cleansing": <FaLeaf />,
    "Herbal mix goodness": <FaSpa />,
    
    // Product Specific
    "Multani Mitti benefits": <FaHandHoldingHeart />,
    "Ubtan glow": <FaStar />,
    "Amla goodness": <FaSeedling />,
    "Reetha nourishment": <FaTint />,
    "Shikakai strength": <FaShieldAlt />,
    "Herbal hair care": <FaTree />,
    "Natural radiance": <FaGem />,
  };

  // Get icon for benefit with fallback
  const getBenefitIcon = (benefit) => {
    const icon = benefitIcons[benefit];
    if (icon) return icon;
    
    // Check if benefit contains keywords
    if (benefit.toLowerCase().includes("glow") || benefit.toLowerCase().includes("radiance")) {
      return <FaGem />;
    }
    if (benefit.toLowerCase().includes("hair") || benefit.toLowerCase().includes("growth")) {
      return <FaTree />;
    }
    if (benefit.toLowerCase().includes("skin") || benefit.toLowerCase().includes("face")) {
      return <FaSmile />;
    }
    return <FaHeart />;
  };

  const themeStyles = {
    container: {
      marginTop: "2.5rem",
      paddingTop: "1rem",
    },
    // Section divider
    divider: {
      height: "1px",
      background: isDarkMode
        ? "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)"
        : "linear-gradient(90deg, transparent, rgba(199, 125, 66, 0.1), transparent)",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "1.1rem",
      fontWeight: "600",
      marginBottom: "1.25rem",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      letterSpacing: "0.5px",
    },
    titleIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      fontSize: "1.2rem",
    },
    badgeContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.6rem",
      marginBottom: "2rem",
    },
    badge: {
      padding: "0.5rem 1.25rem",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.8)" // UPDATED
        : "rgba(255,255,255,0.6)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderRadius: "50px",
      fontSize: "0.85rem",
      fontWeight: "500",
      color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      boxShadow: isDarkMode
        ? "0 2px 8px rgba(0,0,0,0.5)"
        : "0 2px 8px rgba(62, 39, 35, 0.02)",
      transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      ":hover": {
        transform: "translateY(-3px) scale(1.02)",
        boxShadow: isDarkMode
          ? "0 4px 16px rgba(0,0,0,0.7)"
          : "0 4px 16px rgba(62, 39, 35, 0.08)",
        borderColor: isDarkMode ? brandColors.gold : brandColors.bronze,
      },
    },
    // 100% Natural Gold Badge
    naturalBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6rem",
      padding: "0.7rem 1.75rem",
      background: isDarkMode
        ? "linear-gradient(135deg, #f7d794 0%, #d4af37 100%)"
        : "linear-gradient(135deg, #f7d794 0%, #d4af37 100%)",
      color: isDarkMode ? "#0f0f0f" : "#ffffff", // UPDATED
      borderRadius: "50px",
      fontSize: "0.9rem",
      fontWeight: "700",
      marginTop: "0.5rem",
      letterSpacing: "0.8px",
      boxShadow: "0 4px 20px rgba(212, 175, 55, 0.4)",
      border: "1px solid rgba(255,255,255,0.2)",
      transition: "all 0.3s ease",
      ":hover": {
        transform: "scale(1.03)",
        boxShadow: "0 6px 30px rgba(212, 175, 55, 0.5)",
      },
    },
    // Claims Container with glassmorphism
    claimsContainer: {
      marginTop: "1.5rem",
      padding: "1.5rem",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.6)" // UPDATED
        : "rgba(255,255,255,0.5)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "16px",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      display: "grid",
      gridTemplateColumns: window.innerWidth <= 480 
        ? "1fr 1fr" 
        : "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "0.75rem",
    },
    claimItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
      fontSize: "0.8rem",
      fontWeight: "500",
      padding: "0.3rem 0.5rem",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      ":hover": {
        backgroundColor: isDarkMode
          ? "rgba(255,255,255,0.06)"
          : "rgba(62, 39, 35, 0.02)",
      },
    },
    claimIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      fontSize: "0.8rem",
      flexShrink: 0,
    },
    // Trusted by nature section
    trustSection: {
      marginTop: "1.5rem",
      padding: "1rem 1.25rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.08)"
        : "rgba(212, 175, 55, 0.04)",
      borderRadius: "12px",
      borderLeft: `4px solid ${brandColors.goldDark}`,
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      flexWrap: "wrap",
    },
    trustText: {
      color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
      fontSize: "0.85rem",
      fontStyle: "italic",
    },
    trustIcon: {
      color: brandColors.gold,
      fontSize: "1.2rem",
    },
    // Category badge
    categoryBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      padding: "0.2rem 0.8rem",
      borderRadius: "20px",
      fontSize: "0.65rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    skincareBadge: {
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.2)"
        : "rgba(76, 175, 80, 0.08)",
      color: brandColors.green,
    },
    hairBadge: {
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.2)"
        : "rgba(212, 175, 55, 0.08)",
      color: brandColors.goldDark,
    },
  };

  // Clean Beauty Claims
  const freeFromClaims = [
    { label: "No Parabens", icon: <FaShieldAlt /> },
    { label: "No Harsh Chemicals", icon: <FaLeaf /> },
    { label: "No Artificial Preservatives", icon: <FaShieldAlt /> },
    { label: "Cruelty Free", icon: <FaHeart /> },
    { label: "100% Natural & Pure", icon: <FaLeaf /> },
  ];

  // Detect if benefits are hair-related
  const isHairCare = benefits.some(b => 
    b.toLowerCase().includes("hair") || 
    b.toLowerCase().includes("growth") ||
    b.toLowerCase().includes("roots")
  );

  return (
    <div style={themeStyles.container}>
      {/* Divider */}
      <div style={themeStyles.divider} />

      {/* Category Badge */}
      <div style={{ marginBottom: "1rem" }}>
        <span style={{
          ...themeStyles.categoryBadge,
          ...(isHairCare ? themeStyles.hairBadge : themeStyles.skincareBadge),
        }}>
          {isHairCare ? <FaTree /> : <FaSpa />}
          {isHairCare ? "Hair Care" : "Skincare"}
        </span>
      </div>

      <h3 style={themeStyles.title}>
        <FaLeaf style={themeStyles.titleIcon} />
        Key Benefits
        <span style={{
          fontSize: "0.6rem",
          color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
          fontWeight: "400",
          marginLeft: "0.3rem",
        }}>
          ✦ {benefits.length} benefits
        </span>
      </h3>

      <div style={themeStyles.badgeContainer}>
        {benefits.map((benefit, index) => {
          const icon = getBenefitIcon(benefit);
          return (
            <span key={index} style={themeStyles.badge}>
              <span style={{ color: isDarkMode ? brandColors.gold : brandColors.bronze, fontSize: "0.8rem" }}>
                {icon}
              </span>
              {benefit}
            </span>
          );
        })}
      </div>

      {isNatural && (
        <>
          <h3 style={themeStyles.title}>
            <FaShieldAlt style={themeStyles.titleIcon} />
            Pure Goodness of Nature
          </h3>

          <div style={themeStyles.claimsContainer}>
            {freeFromClaims.map((claim, index) => (
              <div key={index} style={themeStyles.claimItem}>
                <FaCheckCircle style={themeStyles.claimIcon} />
                {claim.label}
              </div>
            ))}
          </div>

          {/* 100% Natural Gold Badge */}
          <div style={themeStyles.naturalBadge}>
            <FaLeaf /> 100% Natural & Ayurvedic
          </div>

          {/* Trusted by nature section */}
          <div style={themeStyles.trustSection}>
            <FaHeart style={themeStyles.trustIcon} />
            <span style={themeStyles.trustText}>
              "Trusted by nature, loved by you — Pure goodness for your skin and hair."
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default SkincareBenefits;