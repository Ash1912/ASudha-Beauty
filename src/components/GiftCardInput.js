import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useGiftCard } from "../context/GiftCardContext";
import {
  FaGift,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
  FaLeaf,
  FaStar,
} from "react-icons/fa";

const GiftCardInput = ({ onApply, onRemove, orderTotal }) => {
  const { isDarkMode } = useTheme();
  const { applyGiftCard, removeAppliedGiftCard, appliedGiftCard } =
    useGiftCard();

  const [giftCardCode, setGiftCardCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Brand color palette derived from your packaging
  const brandColors = {
    primary: "#f5346b",
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    earthDark: "#3e2723",
    earthLight: "#6d4c41",
    cream: "#fcf8f5",
    green: "#2e7d32",
    greenLight: "#a5d6a7",
  };

  const handleApplyGiftCard = () => {
    if (!giftCardCode.trim()) {
      setError("Please enter a gift card code");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      const result = applyGiftCard(giftCardCode, orderTotal);

      if (result.success) {
        setSuccess(true);
        setError("");
        setGiftCardCode("");
        if (onApply) onApply(result);

        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error);
      }

      setLoading(false);
    }, 500);
  };

  const handleRemoveGiftCard = () => {
    removeAppliedGiftCard();
    if (onRemove) onRemove();
    setGiftCardCode("");
    setError("");
  };

  const themeStyles = {
    container: {
      marginBottom: "2rem",
      padding: "1.5rem",
      // UPDATED: Pure Black + Dark Slate
      backgroundColor: isDarkMode ? "#1a1a1a" : brandColors.cream,
      borderRadius: "20px",
      boxShadow: isDarkMode
        ? "0 4px 20px rgba(0,0,0,0.5)"
        : "0 4px 30px rgba(62, 39, 35, 0.06)",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    // Decorative corner accent
    cornerAccent: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "60px",
      height: "60px",
      background: isDarkMode
        ? "linear-gradient(135deg, transparent 50%, rgba(245, 52, 107, 0.08) 50%)"
        : "linear-gradient(135deg, transparent 50%, rgba(212, 175, 55, 0.06) 50%)",
      pointerEvents: "none",
    },
    title: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1.25rem",
      fontSize: "1.05rem",
      fontWeight: "700",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      letterSpacing: "0.5px",
    },
    titleIcon: {
      color: brandColors.gold,
      fontSize: "1.3rem",
    },
    inputGroup: {
      display: "flex",
      gap: "0.75rem",
      flexDirection: window.innerWidth <= 480 ? "column" : "row",
    },
    inputWrapper: {
      flex: 1,
      position: "relative",
    },
    inputIcon: {
      position: "absolute",
      left: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight,
      fontSize: "0.9rem",
    },
    input: {
      width: "100%",
      padding: "0.9rem 1rem 0.9rem 2.8rem",
      // UPDATED: Pure Black background for inputs
      backgroundColor: isDarkMode ? "#0f0f0f" : "#ffffff",
      border: `2px solid ${isDarkMode ? "#2a2a2a" : "#e8e0d8"}`,
      borderRadius: "50px",
      fontSize: "0.95rem",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      outline: "none",
      transition: "all 0.3s ease",
      boxShadow: isDarkMode
        ? "inset 0 2px 4px rgba(0,0,0,0.5)"
        : "inset 0 1px 3px rgba(0,0,0,0.04)",
      ":focus": {
        borderColor: brandColors.gold,
        boxShadow: `0 0 0 4px ${isDarkMode ? "rgba(212, 175, 55, 0.15)" : "rgba(212, 175, 55, 0.1)"}`,
      },
      "::placeholder": {
        color: isDarkMode ? "#666666" : "#bcaaa4",
        fontWeight: "400",
      },
    },
    button: {
      padding: "0.9rem 2.2rem",
      background: isDarkMode
        ? "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)"
        : "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      color: isDarkMode ? brandColors.earthDark : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "0.95rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      whiteSpace: "nowrap",
      boxShadow: isDarkMode
        ? "0 4px 15px rgba(245, 52, 107, 0.25)"
        : "0 4px 15px rgba(245, 52, 107, 0.15)",
      letterSpacing: "0.5px",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      justifyContent: "center",
      ":hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(245, 52, 107, 0.35)",
      },
      ":disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
        transform: "none",
        boxShadow: "none",
      },
    },
    error: {
      marginTop: "0.75rem",
      padding: "0.7rem 1.2rem",
      backgroundColor: isDarkMode ? "#2d1212" : "#fde8e8",
      color: isDarkMode ? "#ff8a8a" : "#c62828",
      border: `1px solid ${isDarkMode ? "#5a2020" : "#f5c6c6"}`,
      borderRadius: "50px",
      fontSize: "0.85rem",
      textAlign: "center",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    success: {
      marginTop: "0.75rem",
      padding: "0.7rem 1.2rem",
      backgroundColor: isDarkMode ? "#113311" : "#e8f5e9",
      color: isDarkMode ? brandColors.greenLight : brandColors.green,
      border: `1px solid ${isDarkMode ? "#2a5a2a" : "#c8e6c9"}`,
      borderRadius: "50px",
      fontSize: "0.85rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontWeight: "500",
      animation: "fadeInUp 0.3s ease",
    },
    appliedCard: {
      marginTop: "0.5rem",
      padding: "1.25rem 1.5rem",
      backgroundColor: isDarkMode ? "#113311" : "#e8f5e9",
      border: `2px solid ${isDarkMode ? "#2e7d32" : brandColors.greenLight}`,
      borderRadius: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 20px rgba(46, 125, 50, 0.12)",
      animation: "fadeInUp 0.3s ease",
    },
    appliedCardContent: {
      display: "flex",
      flexDirection: "column",
      gap: "0.3rem",
      color: isDarkMode ? "#e8f5e9" : "#1b5e20",
    },
    appliedCardCode: {
      fontWeight: "700",
      fontSize: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      letterSpacing: "0.5px",
    },
    appliedCardCodeIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.goldDark,
      fontSize: "1.1rem",
    },
    appliedCardSub: {
      fontSize: "0.85rem",
      opacity: 0.8,
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    appliedCardAmount: {
      fontWeight: "700",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      fontSize: "1rem",
    },
    removeButton: {
      background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(0,0,0,0.06)",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      cursor: "pointer",
      fontSize: "1rem",
      padding: "0.5rem 0.75rem",
      borderRadius: "50px",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      fontWeight: "500",
      ":hover": {
        backgroundColor: isDarkMode
          ? "rgba(255,255,255,0.12)"
          : "rgba(0,0,0,0.08)",
        transform: "scale(1.02)",
        color: "#c62828",
      },
    },
    // Spinner animation
    spin: {
      animation: "spin 1s linear infinite",
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
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (appliedGiftCard) {
    return (
      <div style={themeStyles.container}>
        <div style={themeStyles.cornerAccent} />
        <div style={themeStyles.appliedCard}>
          <div style={themeStyles.appliedCardContent}>
            <div style={themeStyles.appliedCardCode}>
              <FaLeaf style={themeStyles.appliedCardCodeIcon} />
              {appliedGiftCard.code}
              <FaStar style={{ color: brandColors.gold, fontSize: "0.8rem" }} />
            </div>
            <div style={themeStyles.appliedCardSub}>
              <FaGift style={{ fontSize: "0.8rem" }} />
              Discount Applied:{" "}
              <span style={themeStyles.appliedCardAmount}>
                ₹{appliedGiftCard.appliedAmount}
              </span>
            </div>
          </div>
          <button
            onClick={handleRemoveGiftCard}
            style={themeStyles.removeButton}
            aria-label="Remove gift card"
          >
            <FaTimes /> Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.cornerAccent} />
      <div style={themeStyles.title}>
        <FaGift style={themeStyles.titleIcon} />
        Apply Gift Card
        <FaLeaf
          style={{
            color: brandColors.gold,
            fontSize: "0.8rem",
            marginLeft: "0.3rem",
          }}
        />
      </div>

      <div style={themeStyles.inputGroup}>
        <div style={themeStyles.inputWrapper}>
          <FaGift style={themeStyles.inputIcon} />
          <input
            type="text"
            placeholder="Enter gift card code (e.g., ASUDHA10)"
            value={giftCardCode}
            onChange={(e) => setGiftCardCode(e.target.value.toUpperCase())}
            style={themeStyles.input}
          />
        </div>
        <button
          onClick={handleApplyGiftCard}
          style={themeStyles.button}
          disabled={loading}
        >
          {loading ? (
            <FaSpinner style={themeStyles.spin} />
          ) : (
            <>
              <FaCheckCircle /> Apply
            </>
          )}
        </button>
      </div>

      {error && (
        <div style={themeStyles.error}>
          <FaTimes /> {error}
        </div>
      )}
      {success && (
        <div style={themeStyles.success}>
          <FaCheckCircle /> Gift card applied successfully!
        </div>
      )}
    </div>
  );
};

export default GiftCardInput;
