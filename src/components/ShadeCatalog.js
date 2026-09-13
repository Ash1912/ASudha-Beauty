import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaCheck,
  FaTimes,
  FaPalette,
  FaFilter,
  FaTh,
  FaBars,
} from "react-icons/fa";

const ShadeCatalog = ({ catalog, onSelectShade, selectedShade }) => {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState("all"); // 'all', 'inStock', 'outOfStock'
  const [viewMode, setViewMode] = useState("grid"); // 'grid', 'list'

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

  const filteredItems = catalog.items.filter((item) => {
    if (filter === "inStock") return item.inStock;
    if (filter === "outOfStock") return !item.inStock;
    return true;
  });

  // Get stock count
  const inStockCount = catalog.items.filter((i) => i.inStock).length;
  const outOfStockCount = catalog.items.filter((i) => !i.inStock).length;

  const themeStyles = {
    catalogContainer: {
      marginTop: "2.5rem",
      borderTop: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(62, 39, 35, 0.06)"}`,
      paddingTop: "2rem",
    },
    catalogHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem",
      marginBottom: "1rem",
    },
    catalogTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      // UPDATED: Crisp white text
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      letterSpacing: "0.5px",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    titleIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
    },
    viewToggle: {
      display: "flex",
      gap: "0.3rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(62, 39, 35, 0.04)",
      padding: "0.25rem",
      borderRadius: "10px",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
    },
    viewButton: {
      padding: "0.4rem 0.7rem",
      borderRadius: "8px",
      border: "none",
      background: "transparent",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: "0.8rem",
      display: "flex",
      alignItems: "center",
      gap: "0.2rem",
      ":hover": {
        color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      },
    },
    activeViewButton: {
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.15)"
        : "rgba(199, 125, 66, 0.08)",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      boxShadow: isDarkMode
        ? "0 2px 8px rgba(0,0,0,0.5)"
        : "0 2px 8px rgba(0,0,0,0.04)",
    },
    filterBar: {
      display: "flex",
      gap: "0.75rem",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
    },
    filterButton: {
      padding: "0.5rem 1.25rem",
      borderRadius: "50px",
      border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(62, 39, 35, 0.08)"}`,
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.8)" // UPDATED
        : "rgba(255,255,255,0.6)",
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight,
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontWeight: "500",
      fontSize: "0.85rem",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
      ":hover": {
        backgroundColor: isDarkMode ? brandColors.gold : brandColors.bronze,
        color: "#ffffff",
        borderColor: isDarkMode ? brandColors.gold : brandColors.bronze,
        transform: "translateY(-1px)",
      },
    },
    activeFilter: {
      background: isDarkMode
        ? "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)"
        : "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      color: isDarkMode ? brandColors.earthDark : "#ffffff",
      borderColor: "transparent",
      boxShadow: "0 4px 12px rgba(245, 52, 107, 0.2)",
    },
    // Grid View
    catalogGrid: {
      display: "grid",
      gridTemplateColumns:
        viewMode === "grid" ? "repeat(auto-fill, minmax(110px, 1fr))" : "1fr",
      gap: viewMode === "grid" ? "1rem" : "0.75rem",
      maxHeight: "450px",
      overflowY: "auto",
      padding: viewMode === "grid" ? "1.25rem" : "0.5rem",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.8)" // UPDATED
        : "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(8px)",
      borderRadius: "16px",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.06)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      scrollbarWidth: "thin",
      "::-webkit-scrollbar": {
        width: "6px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: isDarkMode ? brandColors.gold : brandColors.bronze,
        borderRadius: "10px",
      },
    },
    // Grid Item
    catalogItem: {
      position: "relative",
      cursor: "pointer",
      borderRadius: "12px",
      overflow: "hidden",
      aspectRatio: viewMode === "grid" ? "1/1" : "auto",
      border: "2px solid transparent",
      transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      boxShadow: isDarkMode
        ? "0 2px 8px rgba(0,0,0,0.4)" // UPDATED
        : "0 2px 8px rgba(62, 39, 35, 0.04)",
      backgroundColor: isDarkMode ? "#0f0f0f" : "#ffffff", // UPDATED
      display: viewMode === "list" ? "flex" : "block",
      alignItems: viewMode === "list" ? "center" : "stretch",
      gap: viewMode === "list" ? "1rem" : "0",
      padding: viewMode === "list" ? "0.5rem 1rem" : "0",
      minHeight: viewMode === "list" ? "60px" : "auto",
      ":hover": {
        transform: viewMode === "grid" ? "translateY(-3px)" : "translateX(3px)",
        boxShadow: isDarkMode
          ? "0 4px 16px rgba(0,0,0,0.6)" // UPDATED
          : "0 4px 16px rgba(62, 39, 35, 0.08)",
      },
    },
    selectedItem: {
      borderColor: isDarkMode ? brandColors.gold : brandColors.bronze,
      transform: viewMode === "grid" ? "scale(1.03)" : "translateX(3px)",
      boxShadow: `0 0 0 3px ${isDarkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(199, 125, 66, 0.1)"}`,
    },
    itemImageWrapper: {
      flexShrink: 0,
      width: viewMode === "list" ? "50px" : "100%",
      height: viewMode === "list" ? "50px" : "100%",
      borderRadius: viewMode === "list" ? "8px" : "0",
      overflow: "hidden",
      backgroundColor: isDarkMode ? "#0f0f0f" : brandColors.cream, // UPDATED
    },
    itemImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    itemName: {
      position: viewMode === "grid" ? "absolute" : "static",
      bottom: 0,
      left: 0,
      right: 0,
      padding: viewMode === "grid" ? "0.35rem" : "0",
      backgroundColor:
        viewMode === "grid"
          ? "rgba(15, 15, 15, 0.9)" // UPDATED
          : "transparent",
      backdropFilter: viewMode === "grid" ? "blur(4px)" : "none",
      color:
        viewMode === "grid"
          ? "#ffffff"
          : isDarkMode
            ? "#ffffff"
            : brandColors.earthDark, // UPDATED
      fontSize: viewMode === "grid" ? "0.8rem" : "0.9rem",
      textAlign: viewMode === "grid" ? "center" : "left",
      fontWeight: viewMode === "grid" ? "500" : "600",
      letterSpacing: viewMode === "grid" ? "0.3px" : "0.5px",
      flex: 1,
    },
    itemStockStatus: {
      fontSize: "0.7rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4", // UPDATED
      display: viewMode === "list" ? "block" : "none",
      marginTop: "0.1rem",
    },
    outOfStockOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDarkMode
        ? "rgba(15, 15, 15, 0.8)" // UPDATED
        : "rgba(62, 39, 35, 0.5)",
      backdropFilter: "blur(2px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: isDarkMode ? "#a0a0a0" : "#d7ccc8", // UPDATED
      fontSize: "0.85rem",
      fontWeight: "600",
      flexDirection: "column",
      gap: "0.25rem",
    },
    badge: {
      position: "absolute",
      top: "0.35rem",
      left: "0.35rem",
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.7rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
      border: "1px solid rgba(255,255,255,0.15)",
    },
    selectedBadge: {
      backgroundColor: isDarkMode ? brandColors.green : brandColors.greenDark,
      color: "#ffffff",
    },
    outOfStockBadge: {
      backgroundColor: isDarkMode ? "#6d4c41" : brandColors.bronze,
      color: "#ffffff",
    },
    // List view additional styles
    listItemInfo: {
      display: viewMode === "list" ? "flex" : "none",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.25rem 0",
    },
    listItemSelect: {
      display: viewMode === "list" ? "flex" : "none",
      alignItems: "center",
      gap: "0.5rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4", // UPDATED
      fontSize: "0.8rem",
    },
    // Count badge
    countBadge: {
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.1)"
        : "rgba(199, 125, 66, 0.06)",
      padding: "0.2rem 0.7rem",
      borderRadius: "20px",
      fontSize: "0.75rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      fontWeight: "500",
    },
  };

  return (
    <div style={themeStyles.catalogContainer}>
      <div style={themeStyles.catalogHeader}>
        <h3 style={themeStyles.catalogTitle}>
          <FaPalette style={themeStyles.titleIcon} />
          Available Variants
          <span style={themeStyles.countBadge}>
            {inStockCount} / {catalog.items.length} in stock
          </span>
        </h3>

        {/* View Toggle */}
        <div style={themeStyles.viewToggle}>
          <button
            style={{
              ...themeStyles.viewButton,
              ...(viewMode === "grid" ? themeStyles.activeViewButton : {}),
            }}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <FaTh /> Grid
          </button>
          <button
            style={{
              ...themeStyles.viewButton,
              ...(viewMode === "list" ? themeStyles.activeViewButton : {}),
            }}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <FaBars /> List
          </button>
        </div>
      </div>

      <div style={themeStyles.filterBar}>
        <button
          style={{
            ...themeStyles.filterButton,
            ...(filter === "all" ? themeStyles.activeFilter : {}),
          }}
          onClick={() => setFilter("all")}
        >
          <FaFilter style={{ fontSize: "0.7rem" }} />
          All ({catalog.items.length})
        </button>
        <button
          style={{
            ...themeStyles.filterButton,
            ...(filter === "inStock" ? themeStyles.activeFilter : {}),
          }}
          onClick={() => setFilter("inStock")}
        >
          <FaCheck style={{ fontSize: "0.7rem" }} />
          In Stock ({inStockCount})
        </button>
        <button
          style={{
            ...themeStyles.filterButton,
            ...(filter === "outOfStock" ? themeStyles.activeFilter : {}),
          }}
          onClick={() => setFilter("outOfStock")}
        >
          <FaTimes style={{ fontSize: "0.7rem" }} />
          Out of Stock ({outOfStockCount})
        </button>
      </div>

      <div style={themeStyles.catalogGrid}>
        {filteredItems.map((item, index) => (
          <div
            key={index}
            style={{
              ...themeStyles.catalogItem,
              ...(selectedShade === item.shade ? themeStyles.selectedItem : {}),
              opacity: item.inStock ? 1 : 0.6,
            }}
            onClick={() => item.inStock && onSelectShade(item.shade)}
          >
            <div style={themeStyles.itemImageWrapper}>
              <img
                src={item.image || "/assets/images/placeholder-shade.jpg"}
                alt={item.shade}
                style={themeStyles.itemImage}
              />
            </div>

            {viewMode === "grid" ? (
              <>
                <div style={themeStyles.itemName}>{item.shade}</div>

                {selectedShade === item.shade && item.inStock && (
                  <div
                    style={{
                      ...themeStyles.badge,
                      ...themeStyles.selectedBadge,
                    }}
                  >
                    <FaCheck />
                  </div>
                )}

                {!item.inStock && (
                  <div style={themeStyles.outOfStockOverlay}>
                    <FaTimes style={{ fontSize: "1.2rem" }} />
                    <span style={{ fontSize: "0.65rem", fontWeight: "500" }}>
                      Out of Stock
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div style={themeStyles.listItemInfo}>
                <div>
                  <div style={themeStyles.itemName}>{item.shade}</div>
                  <div style={themeStyles.itemStockStatus}>
                    {item.inStock ? (
                      <span
                        style={{
                          color: brandColors.green,
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: brandColors.green,
                          }}
                        />
                        In Stock
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#c62828",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "#c62828",
                          }}
                        />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
                <div style={themeStyles.listItemSelect}>
                  {selectedShade === item.shade && (
                    <FaCheck style={{ color: brandColors.green }} />
                  )}
                  {selectedShade === item.shade ? "Selected" : "Select"}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShadeCatalog;
