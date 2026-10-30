// src/components/ShadeCatalog.jsx
import React, { useState, useLayoutEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaCheck,
  FaTimes,
  FaPalette,
  FaFilter,
  FaTh,
  FaBars,
} from "react-icons/fa";

// ─── Brand palette (module scope: stable) ───
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

const ShadeCatalog = ({ catalog, onSelectShade, selectedShade }) => {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState("all"); // 'all' | 'inStock' | 'outOfStock'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  // ─── Null-safe catalog items (guards against bad props) ───
  const items = Array.isArray(catalog?.items) ? catalog.items : [];
  const catalogName = catalog?.name || "product";

  const filteredItems = items.filter((item) => {
    if (filter === "inStock") return item.inStock;
    if (filter === "outOfStock") return !item.inStock;
    return true;
  });

  const inStockCount = items.filter((i) => i.inStock).length;
  const outOfStockCount = items.filter((i) => !i.inStock).length;

  // ─── Theme styles ───
  const themeStyles = {
    catalogContainer: {
      marginTop: "2.5rem",
      borderTop: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(62, 39, 35, 0.06)"
      }`,
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
      color: isDarkMode ? "#ffffff" : brandColors.earthDark,
      letterSpacing: "0.5px",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      flexWrap: "wrap",
    },
    titleIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
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
      fontFamily: "inherit",
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
      border: `1px solid ${
        isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(62, 39, 35, 0.08)"
      }`,
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.8)"
        : "rgba(255,255,255,0.6)",
      color: isDarkMode ? "#a0a0a0" : brandColors.earthLight,
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontWeight: "500",
      fontSize: "0.85rem",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
      fontFamily: "inherit",
    },
    activeFilter: {
      background: "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
      color: isDarkMode ? brandColors.earthDark : "#ffffff",
      borderColor: "transparent",
      boxShadow: "0 4px 12px rgba(245, 52, 107, 0.2)",
    },
    // ── Grid wrapper ──
    catalogGrid: {
      display: "grid",
      gridTemplateColumns:
        viewMode === "grid" ? "repeat(auto-fill, minmax(110px, 1fr))" : "1fr",
      gap: viewMode === "grid" ? "1rem" : "0.75rem",
      maxHeight: "450px",
      overflowY: "auto",
      padding: viewMode === "grid" ? "1.25rem" : "0.5rem",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.8)"
        : "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderRadius: "16px",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.06)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      scrollbarWidth: "thin",
      scrollbarColor: `${
        isDarkMode ? brandColors.gold : brandColors.bronze
      } transparent`,
    },
    // ── Item ──
    catalogItem: {
      position: "relative",
      cursor: "pointer",
      borderRadius: "12px",
      overflow: "hidden",
      aspectRatio: viewMode === "grid" ? "1/1" : "auto",
      border: "2px solid transparent",
      transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      boxShadow: isDarkMode
        ? "0 2px 8px rgba(0,0,0,0.4)"
        : "0 2px 8px rgba(62, 39, 35, 0.04)",
      backgroundColor: isDarkMode ? "#0f0f0f" : "#ffffff",
      display: viewMode === "list" ? "flex" : "block",
      alignItems: viewMode === "list" ? "center" : "stretch",
      gap: viewMode === "list" ? "1rem" : "0",
      padding: viewMode === "list" ? "0.5rem 1rem" : "0",
      minHeight: viewMode === "list" ? "60px" : "auto",
      boxSizing: "border-box",
      width: "100%",
      fontFamily: "inherit",
    },
    disabledItem: {
      cursor: "not-allowed",
    },
    selectedItem: {
      borderColor: isDarkMode ? brandColors.gold : brandColors.bronze,
      transform: viewMode === "grid" ? "scale(1.03)" : "translateX(3px)",
      boxShadow: `0 0 0 3px ${
        isDarkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(199, 125, 66, 0.1)"
      }`,
    },
    itemImageWrapper: {
      flexShrink: 0,
      width: viewMode === "list" ? "50px" : "100%",
      height: viewMode === "list" ? "50px" : "100%",
      borderRadius: viewMode === "list" ? "8px" : "0",
      overflow: "hidden",
      backgroundColor: isDarkMode ? "#0f0f0f" : brandColors.cream,
    },
    itemImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    itemName: {
      position: viewMode === "grid" ? "absolute" : "static",
      bottom: 0,
      left: 0,
      right: 0,
      padding: viewMode === "grid" ? "0.35rem" : "0",
      backgroundColor:
        viewMode === "grid" ? "rgba(15, 15, 15, 0.9)" : "transparent",
      backdropFilter: viewMode === "grid" ? "blur(4px)" : "none",
      WebkitBackdropFilter: viewMode === "grid" ? "blur(4px)" : "none",
      color:
        viewMode === "grid"
          ? "#ffffff"
          : isDarkMode
          ? "#ffffff"
          : brandColors.earthDark,
      fontSize: viewMode === "grid" ? "0.8rem" : "0.9rem",
      textAlign: viewMode === "grid" ? "center" : "left",
      fontWeight: viewMode === "grid" ? "500" : "600",
      letterSpacing: viewMode === "grid" ? "0.3px" : "0.5px",
      flex: 1,
    },
    itemStockStatus: {
      fontSize: "0.7rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      display: viewMode === "list" ? "block" : "none",
      marginTop: "0.1rem",
    },
    stockDot: {
      display: "inline-block",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      marginRight: "0.3rem",
    },
    outOfStockOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDarkMode
        ? "rgba(15, 15, 15, 0.8)"
        : "rgba(62, 39, 35, 0.5)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: isDarkMode ? "#a0a0a0" : "#d7ccc8",
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
    listItemInfo: {
      display: viewMode === "list" ? "flex" : "none",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.25rem 0",
      gap: "0.75rem",
    },
    listItemSelect: {
      display: viewMode === "list" ? "flex" : "none",
      alignItems: "center",
      gap: "0.5rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      fontSize: "0.8rem",
      flexShrink: 0,
    },
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
    emptyState: {
      textAlign: "center",
      padding: "2.5rem 1.5rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      fontSize: "0.9rem",
    },
  };

  // ─── Injected CSS: fixes broken hover styles + scrollbar + focus ring ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-shade-catalog="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-shade-catalog", "true");
    style.textContent = `
      /* View toggle hover */
      .sc-view-btn:hover,
      .sc-view-btn:focus-visible {
        color: ${isDarkMode ? "#ffffff" : brandColors.earthDark} !important;
        outline: none;
      }
      .sc-view-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }

      /* Filter chip hover */
      .sc-filter-btn:hover:not(.sc-active) {
        background-color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important;
        color: #ffffff !important;
        border-color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important;
        transform: translateY(-1px);
      }
      .sc-filter-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }

      /* Catalog item hover */
      .sc-item:hover:not(.sc-disabled) {
        transform: ${
          viewMode === "grid" ? "translateY(-3px)" : "translateX(3px)"
        } !important;
        box-shadow: ${
          isDarkMode
            ? "0 4px 16px rgba(0,0,0,0.6)"
            : "0 4px 16px rgba(62, 39, 35, 0.08)"
        } !important;
      }
      .sc-item:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 3px;
      }
      .sc-item.sc-selected:hover {
        transform: ${
          viewMode === "grid" ? "scale(1.03)" : "translateX(3px)"
        } !important;
      }

      /* Scrollbar (works in Chrome/Edge/Safari — the original inline
         ::-webkit-scrollbar rules never applied) */
      .sc-grid::-webkit-scrollbar {
        width: 6px;
      }
      .sc-grid::-webkit-scrollbar-track {
        background: transparent;
      }
      .sc-grid::-webkit-scrollbar-thumb {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.bronze
        };
        border-radius: 10px;
      }
      .sc-grid::-webkit-scrollbar-thumb:hover {
        background-color: ${
          isDarkMode ? brandColors.goldDark : brandColors.primary
        };
      }

      @media (prefers-reduced-motion: reduce) {
        .sc-item { transition: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-shade-catalog="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode, viewMode]);

  // ─── Keyboard selection for an option ───
  const handleItemKeyDown = (e, item) => {
    if (!item.inStock) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectShade(item.shade);
    }
  };

  return (
    <section
      style={themeStyles.catalogContainer}
      aria-labelledby="shade-catalog-title"
    >
      <div style={themeStyles.catalogHeader}>
        <h3 id="shade-catalog-title" style={themeStyles.catalogTitle}>
          <FaPalette aria-hidden="true" style={themeStyles.titleIcon} />
          Available Variants
          <span style={themeStyles.countBadge}>
            {inStockCount} / {items.length} in stock
          </span>
        </h3>

        {/* View Toggle */}
        <div
          style={themeStyles.viewToggle}
          role="group"
          aria-label="Change layout"
        >
          <button
            type="button"
            style={{
              ...themeStyles.viewButton,
              ...(viewMode === "grid" ? themeStyles.activeViewButton : {}),
            }}
            className="sc-view-btn"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
          >
            <FaTh aria-hidden="true" /> Grid
          </button>
          <button
            type="button"
            style={{
              ...themeStyles.viewButton,
              ...(viewMode === "list" ? themeStyles.activeViewButton : {}),
            }}
            className="sc-view-btn"
            onClick={() => setViewMode("list")}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
          >
            <FaBars aria-hidden="true" /> List
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div
        style={themeStyles.filterBar}
        role="group"
        aria-label="Filter variants by availability"
      >
        <button
          type="button"
          className={`sc-filter-btn${filter === "all" ? " sc-active" : ""}`}
          style={{
            ...themeStyles.filterButton,
            ...(filter === "all" ? themeStyles.activeFilter : {}),
          }}
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
        >
          <FaFilter aria-hidden="true" style={{ fontSize: "0.7rem" }} />
          All ({items.length})
        </button>
        <button
          type="button"
          className={`sc-filter-btn${filter === "inStock" ? " sc-active" : ""}`}
          style={{
            ...themeStyles.filterButton,
            ...(filter === "inStock" ? themeStyles.activeFilter : {}),
          }}
          onClick={() => setFilter("inStock")}
          aria-pressed={filter === "inStock"}
        >
          <FaCheck aria-hidden="true" style={{ fontSize: "0.7rem" }} />
          In Stock ({inStockCount})
        </button>
        <button
          type="button"
          className={`sc-filter-btn${
            filter === "outOfStock" ? " sc-active" : ""
          }`}
          style={{
            ...themeStyles.filterButton,
            ...(filter === "outOfStock" ? themeStyles.activeFilter : {}),
          }}
          onClick={() => setFilter("outOfStock")}
          aria-pressed={filter === "outOfStock"}
        >
          <FaTimes aria-hidden="true" style={{ fontSize: "0.7rem" }} />
          Out of Stock ({outOfStockCount})
        </button>
      </div>

      {/* Catalog grid */}
      <div
        className="sc-grid"
        style={themeStyles.catalogGrid}
        role="listbox"
        aria-label={`Available ${catalogName} variants`}
      >
        {filteredItems.length === 0 ? (
          <div style={themeStyles.emptyState}>
            No variants match the current filter.
          </div>
        ) : (
          filteredItems.map((item) => {
            const isSelected = selectedShade === item.shade;
            const isDisabled = !item.inStock;
            return (
              <div
                key={item.shade || item.id}
                role="option"
                aria-selected={isSelected}
                aria-disabled={isDisabled}
                tabIndex={isDisabled ? -1 : 0}
                style={{
                  ...themeStyles.catalogItem,
                  ...(isSelected ? themeStyles.selectedItem : {}),
                  ...(isDisabled ? themeStyles.disabledItem : {}),
                  opacity: isDisabled ? 0.6 : 1,
                }}
                className={`sc-item${isSelected ? " sc-selected" : ""}${
                  isDisabled ? " sc-disabled" : ""
                }`}
                onClick={() => !isDisabled && onSelectShade(item.shade)}
                onKeyDown={(e) => handleItemKeyDown(e, item)}
              >
                <div style={themeStyles.itemImageWrapper}>
                  <img
                    src={item.image || "/assets/images/placeholder-shade.jpg"}
                    alt={`${item.shade} — ${
                      isDisabled ? "out of stock" : "available"
                    } variant of ${catalogName} by ASudha Beauty`}
                    style={themeStyles.itemImage}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {viewMode === "grid" ? (
                  <>
                    <div style={themeStyles.itemName}>{item.shade}</div>

                    {isSelected && item.inStock && (
                      <div
                        style={{
                          ...themeStyles.badge,
                          ...themeStyles.selectedBadge,
                        }}
                        aria-hidden="true"
                      >
                        <FaCheck />
                      </div>
                    )}

                    {isDisabled && (
                      <div style={themeStyles.outOfStockOverlay}>
                        <FaTimes
                          aria-hidden="true"
                          style={{ fontSize: "1.2rem" }}
                        />
                        <span
                          style={{ fontSize: "0.65rem", fontWeight: "500" }}
                        >
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
                                ...themeStyles.stockDot,
                                backgroundColor: brandColors.green,
                              }}
                              aria-hidden="true"
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
                                ...themeStyles.stockDot,
                                backgroundColor: "#c62828",
                              }}
                              aria-hidden="true"
                            />
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={themeStyles.listItemSelect} aria-hidden="true">
                      {isSelected && (
                        <FaCheck style={{ color: brandColors.green }} />
                      )}
                      {isSelected ? "Selected" : "Select"}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default ShadeCatalog;