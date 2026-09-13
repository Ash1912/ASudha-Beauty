import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaInfo,
  FaVideo,
  FaStar,
  FaBox,
  FaLeaf,
  FaHeart,
  FaTint,
  FaSmile,
  FaShieldAlt,
  FaCheckCircle,
  FaQuoteLeft,
  FaUser,
  FaRegClock,
} from "react-icons/fa";

const ProductTabs = ({ product }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("description");

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

  const tabs = [
    { id: "description", label: "Description", icon: <FaInfo /> },
    { id: "howToUse", label: "How to Use", icon: <FaVideo /> },
    { id: "ingredients", label: "Ingredients", icon: <FaLeaf /> },
    { id: "specs", label: "Specifications", icon: <FaBox /> },
    {
      id: "reviews",
      label: `Reviews (${product.reviews || 0})`,
      icon: <FaStar />,
    },
  ];

  // Check if product is natural skincare/hair care
  const isNatural = product.category === "Skincare" || product.category === "Hair Care";

  // Get category icon
  const getCategoryIcon = () => {
    if (isNatural) return <FaLeaf style={{ color: brandColors.green }} />;
    return <FaHeart style={{ color: brandColors.primary }} />;
  };

  const themeStyles = {
    tabsContainer: {
      marginTop: "3rem",
    },
    tabHeaders: {
      display: "flex",
      gap: "0.5rem",
      borderBottom: `2px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(62, 39, 35, 0.06)"}`,
      paddingBottom: "0.5rem",
      overflowX: "auto",
      scrollbarWidth: "thin",
      "::-webkit-scrollbar": {
        height: "4px",
      },
      "::-webkit-scrollbar-thumb": {
        background: isDarkMode ? brandColors.gold : brandColors.goldDark,
        borderRadius: "4px",
      },
      "::-webkit-scrollbar-track": {
        background: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
        borderRadius: "4px",
      },
    },
    tabHeader: {
      padding: "0.7rem 1.5rem",
      border: "none",
      backgroundColor: "transparent",
      fontSize: "0.9rem",
      cursor: "pointer",
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight,
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      whiteSpace: "nowrap",
      borderRadius: "50px",
      fontWeight: "500",
      position: "relative",
      ":hover": {
        color: isDarkMode ? brandColors.gold : brandColors.bronze,
        backgroundColor: isDarkMode
          ? "rgba(255,255,255,0.05)"
          : "rgba(62, 39, 35, 0.04)",
      },
    },
    activeTabHeader: {
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.1)"
        : "rgba(199, 125, 66, 0.06)",
      fontWeight: "600",
      "::after": {
        content: '""',
        position: "absolute",
        bottom: "-2px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "60%",
        height: "3px",
        borderRadius: "2px",
        background: isDarkMode ? brandColors.gold : brandColors.bronze,
      },
    },
    tabContent: {
      padding: "2.5rem",
      backgroundColor: isDarkMode ? "#1a1a1a" : brandColors.cream,
      borderRadius: "0 0 20px 20px",
      lineHeight: "1.8",
      color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
      minHeight: "200px",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.06)"
        : "1px solid rgba(62, 39, 35, 0.03)",
      borderTop: "none",
    },
    specsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem",
    },
    specItem: {
      padding: "1.25rem",
      backgroundColor: isDarkMode ? "#0f0f0f" : "#ffffff",
      borderRadius: "14px",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      transition: "all 0.3s ease",
      ":hover": {
        transform: "translateY(-2px)",
        boxShadow: isDarkMode
          ? "0 4px 16px rgba(0,0,0,0.5)"
          : "0 4px 16px rgba(62, 39, 35, 0.06)",
      },
    },
    specLabel: {
      fontSize: "0.8rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      marginBottom: "0.25rem",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      fontWeight: "500",
    },
    specValue: {
      fontSize: "1.05rem",
      fontWeight: "600",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
    },
    reviewItem: {
      padding: "1.25rem",
      backgroundColor: isDarkMode ? "#0f0f0f" : "#ffffff",
      borderRadius: "14px",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      marginBottom: "1rem",
      transition: "all 0.3s ease",
      ":hover": {
        boxShadow: isDarkMode
          ? "0 4px 16px rgba(0,0,0,0.5)"
          : "0 4px 16px rgba(62, 39, 35, 0.06)",
      },
    },
    reviewHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.5rem",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    reviewerName: {
      fontWeight: "600",
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
    },
    reviewRating: {
      color: "#ffc107",
      display: "flex",
      gap: "0.1rem",
    },
    reviewDate: {
      fontSize: "0.75rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    reviewText: {
      color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
      marginTop: "0.5rem",
      fontStyle: "italic",
    },
    reviewVerified: {
      fontSize: "0.65rem",
      color: brandColors.green,
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.08)",
      padding: "2px 8px",
      borderRadius: "12px",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.2rem",
    },
    herbBadge: {
      backgroundColor: isDarkMode
        ? "rgba(46, 125, 50, 0.15)"
        : "rgba(46, 125, 50, 0.08)",
      color: brandColors.green,
      padding: "0.3rem 1rem",
      borderRadius: "50px",
      fontSize: "0.7rem",
      fontWeight: "600",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      marginRight: "0.5rem",
      marginBottom: "0.5rem",
      border: isDarkMode
        ? "1px solid rgba(46, 125, 50, 0.2)"
        : "1px solid rgba(46, 125, 50, 0.1)",
    },
    sectionTitle: {
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      marginBottom: "0.75rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: "600",
      fontSize: "1.1rem",
    },
    benefitList: {
      paddingLeft: "1.5rem",
      marginBottom: "1rem",
      listStyle: "none",
    },
    benefitItem: {
      marginBottom: "0.4rem",
      display: "flex",
      alignItems: "flex-start",
      gap: "0.5rem",
      position: "relative",
      paddingLeft: "0.5rem",
    },
    benefitIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      fontSize: "0.8rem",
      marginTop: "0.3rem",
      flexShrink: 0,
    },
    tipBox: {
      marginTop: "1.5rem",
      padding: "1.25rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.08)"
        : "rgba(212, 175, 55, 0.04)",
      borderLeft: `4px solid ${brandColors.goldDark}`,
      borderRadius: "12px",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.15)"
        : "1px solid rgba(212, 175, 55, 0.08)",
    },
    tipTitle: {
      fontWeight: "600",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div>
            <div style={themeStyles.sectionTitle}>
              {getCategoryIcon()} About This Product
            </div>
            <p style={{ marginBottom: "1.5rem" }}>{product.description}</p>

            {product.benefits && (
              <>
                <div
                  style={{
                    ...themeStyles.sectionTitle,
                    fontSize: "1rem",
                    marginTop: "1.5rem",
                  }}
                >
                  <FaHeart style={{ color: brandColors.primary }} /> Key
                  Benefits
                </div>
                <ul style={themeStyles.benefitList}>
                  {product.benefits.map((benefit, index) => (
                    <li key={index} style={themeStyles.benefitItem}>
                      <FaCheckCircle style={themeStyles.benefitIcon} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Natural Product Highlight */}
            {isNatural && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem 1.25rem",
                  background: isDarkMode
                    ? "rgba(46, 125, 50, 0.1)"
                    : "rgba(46, 125, 50, 0.05)",
                  borderRadius: "12px",
                  border: `1px solid ${isDarkMode ? "rgba(46, 125, 50, 0.2)" : "rgba(46, 125, 50, 0.1)"}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: brandColors.green,
                  }}
                >
                  <FaLeaf />
                  <span style={{ fontWeight: "600" }}>
                    100% Natural Ayurvedic Product
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    marginTop: "0.3rem",
                    color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
                  }}
                >
                  Made with pure, natural ingredients rooted in ancient Ayurvedic
                  wisdom. No chemicals, no parabens—just the goodness of nature.
                </p>
              </div>
            )}
          </div>
        );

      case "howToUse":
        return (
          <div>
            <div style={themeStyles.sectionTitle}>
              <FaVideo style={{ color: brandColors.primary }} /> How to Use
            </div>
            <p style={{ marginBottom: "1.5rem" }}>{product.howToUse}</p>

            {/* Ayurvedic Pro Tips for Skincare/Hair Care */}
            {isNatural && (
              <>
                <div
                  style={{
                    ...themeStyles.sectionTitle,
                    fontSize: "1rem",
                    marginTop: "1.5rem",
                  }}
                >
                  <FaTint style={{ color: brandColors.goldDark }} /> Ayurvedic
                  Pro Tips
                </div>
                <ul style={themeStyles.benefitList}>
                  <li style={themeStyles.benefitItem}>
                    <span style={themeStyles.benefitIcon}>🌹</span>
                    <div>
                      <strong>For Oily Skin:</strong> Mix with rose water or
                      plain water for a refreshing feel
                    </div>
                  </li>
                  <li style={themeStyles.benefitItem}>
                    <span style={themeStyles.benefitIcon}>🥛</span>
                    <div>
                      <strong>For Dry Skin:</strong> Mix with milk or curd for
                      deep hydration and nourishment
                    </div>
                  </li>
                  <li style={themeStyles.benefitItem}>
                    <span style={themeStyles.benefitIcon}>🍯</span>
                    <div>
                      <strong>For Radiant Glow:</strong> Mix with honey and a
                      pinch of turmeric for a natural glow
                    </div>
                  </li>
                  <li style={themeStyles.benefitItem}>
                    <span style={themeStyles.benefitIcon}>🌿</span>
                    <div>
                      <strong>For Acne/Inflammation:</strong> Mix with neem
                      water or aloe vera for soothing effect
                    </div>
                  </li>
                </ul>
              </>
            )}

            <div style={themeStyles.tipBox}>
              <div style={themeStyles.tipTitle}>
                <FaStar style={{ color: brandColors.goldDark }} />
                Recommended Usage
              </div>
              <p style={{ marginTop: "0.5rem", color: isDarkMode ? "#d1d1d1" : brandColors.earthLight }}>
                For best results, use 2-3 times per week. Consistency is the key
                to unlocking the full benefits of natural Ayurvedic products.
              </p>
            </div>
          </div>
        );

      case "ingredients":
        return (
          <div>
            <div style={themeStyles.sectionTitle}>
              <FaLeaf style={{ color: brandColors.green }} /> Ingredients
            </div>
            <p style={{ marginBottom: "1.5rem" }}>{product.ingredients}</p>

            {/* Natural Ingredient Badges */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={themeStyles.herbBadge}>
                <FaLeaf style={{ fontSize: "0.6rem" }} /> 100% Natural
              </span>
              <span style={themeStyles.herbBadge}>
                <FaShieldAlt style={{ fontSize: "0.6rem" }} /> Chemical Free
              </span>
              <span style={themeStyles.herbBadge}>
                <FaShieldAlt style={{ fontSize: "0.6rem" }} /> Paraben Free
              </span>
              <span style={themeStyles.herbBadge}>
                <FaShieldAlt style={{ fontSize: "0.6rem" }} /> Preservative Free
              </span>
              <span style={themeStyles.herbBadge}>
                <FaSmile style={{ fontSize: "0.6rem" }} /> All Skin Types
              </span>
            </div>

            <div
              style={{
                padding: "1.5rem",
                background: isDarkMode
                  ? "rgba(46, 125, 50, 0.06)"
                  : "rgba(46, 125, 50, 0.04)",
                borderRadius: "14px",
                border: isDarkMode
                  ? "1px solid rgba(46, 125, 50, 0.15)"
                  : "1px solid rgba(46, 125, 50, 0.08)",
                borderLeft: `4px solid ${brandColors.green}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: brandColors.green,
                  marginBottom: "0.5rem",
                }}
              >
                <FaCheckCircle />
                <span style={{ fontWeight: "600" }}>
                  Pure Goodness of Nature
                </span>
              </div>
              <p
                style={{
                  color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
                  fontSize: "0.9rem",
                  margin: 0,
                }}
              >
                Our products are made with pure, natural ingredients sourced from
                trusted suppliers. No harmful chemicals, no artificial
                fragrances—just the healing power of Ayurveda for your skin and
                hair.
              </p>
            </div>
          </div>
        );

      case "specs":
        return (
          <div style={themeStyles.specsGrid}>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Item Number</div>
              <div style={themeStyles.specValue}>{product.itemNo || "N/A"}</div>
            </div>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Category</div>
              <div style={themeStyles.specValue}>
                {isNatural ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <FaLeaf style={{ color: brandColors.green, fontSize: "0.8rem" }} />
                    {product.category}
                  </span>
                ) : (
                  product.category
                )}
              </div>
            </div>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Sub Category</div>
              <div style={themeStyles.specValue}>
                {product.subCategory || "N/A"}
              </div>
            </div>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Type</div>
              <div style={themeStyles.specValue}>{product.type || "N/A"}</div>
            </div>
            {product.weight && (
              <div style={themeStyles.specItem}>
                <div style={themeStyles.specLabel}>Net Weight</div>
                <div style={themeStyles.specValue}>{product.weight}</div>
              </div>
            )}
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Shades Available</div>
              <div style={themeStyles.specValue}>
                {typeof product.shades === "number"
                  ? `${product.shades} shades`
                  : `${product.shades?.length || 0} shades`}
              </div>
            </div>
            <div style={themeStyles.specItem}>
              <div style={themeStyles.specLabel}>Availability</div>
              <div
                style={{
                  ...themeStyles.specValue,
                  color: product.inStock ? brandColors.green : "#c62828",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: product.inStock
                      ? brandColors.green
                      : "#c62828",
                  }}
                />
                {product.inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>
            {product.packing && (
              <div style={themeStyles.specItem}>
                <div style={themeStyles.specLabel}>Packing</div>
                <div style={themeStyles.specValue}>{product.packing}</div>
              </div>
            )}
          </div>
        );

      case "reviews":
        return (
          <div>
            <div style={themeStyles.sectionTitle}>
              <FaStar style={{ color: "#ffc107" }} /> Customer Reviews
            </div>

            {product.reviews && product.reviews > 0 ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.2rem" }}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={
                          i < Math.floor(product.rating || 0)
                            ? "#ffc107"
                            : "#e0e0e0"
                        }
                        size={16}
                      />
                    ))}
                  </div>
                  <span style={{ fontWeight: "600" }}>
                    {product.rating || 0}
                  </span>
                  <span style={{ color: isDarkMode ? "#a0a0a0" : "#bcaaa4" }}>
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Sample Review */}
                <div style={themeStyles.reviewItem}>
                  <div style={themeStyles.reviewHeader}>
                    <div style={themeStyles.reviewerName}>
                      <FaUser style={{ fontSize: "0.8rem" }} />
                      Verified Buyer
                      <span style={themeStyles.reviewVerified}>
                        <FaCheckCircle style={{ fontSize: "0.5rem" }} /> Verified
                      </span>
                    </div>
                    <div style={themeStyles.reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={14} />
                      ))}
                    </div>
                  </div>
                  <div style={themeStyles.reviewDate}>
                    <FaRegClock style={{ fontSize: "0.6rem" }} /> Reviewed 2
                    weeks ago
                  </div>
                  <div style={themeStyles.reviewText}>
                    <FaQuoteLeft style={{ fontSize: "0.8rem", opacity: 0.5, marginRight: "0.3rem" }} />
                    Amazing product! My skin feels so soft and naturally
                    glowing after using this herbal powder. Highly recommend!
                  </div>
                </div>

                <div style={themeStyles.reviewItem}>
                  <div style={themeStyles.reviewHeader}>
                    <div style={themeStyles.reviewerName}>
                      <FaUser style={{ fontSize: "0.8rem" }} />
                      Priya Sharma
                      <span style={themeStyles.reviewVerified}>
                        <FaCheckCircle style={{ fontSize: "0.5rem" }} /> Verified
                      </span>
                    </div>
                    <div style={themeStyles.reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={14} color={i < 4 ? "#ffc107" : "#e0e0e0"} />
                      ))}
                    </div>
                  </div>
                  <div style={themeStyles.reviewDate}>
                    <FaRegClock style={{ fontSize: "0.6rem" }} /> Reviewed 1
                    month ago
                  </div>
                  <div style={themeStyles.reviewText}>
                    <FaQuoteLeft style={{ fontSize: "0.8rem", opacity: 0.5, marginRight: "0.3rem" }} />
                    I've been using this for 3 weeks now and my skin has never
                    looked better. The glow is real!
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
                }}
              >
                <FaStar style={{ fontSize: "3rem", opacity: 0.3, marginBottom: "0.5rem" }} />
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={themeStyles.tabsContainer}>
      <div style={themeStyles.tabHeaders}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            style={{
              ...themeStyles.tabHeader,
              ...(activeTab === tab.id ? themeStyles.activeTabHeader : {}),
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div style={themeStyles.tabContent}>{renderContent()}</div>
    </div>
  );
};

export default ProductTabs;