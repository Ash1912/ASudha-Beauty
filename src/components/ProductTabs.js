// src/components/ProductTabs.jsx
import React, { useState, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  FaSpa,
  FaBookOpen,
  FaArrowRight,
  FaExternalLinkAlt,
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

// ─── Ayurvedic tips data ───
const AYURVEDIC_TIPS = [
  {
    icon: <FaSpa />,
    label: "For Oily Skin:",
    text: "Mix with rose water or plain water for a refreshing feel",
  },
  {
    icon: <FaTint />,
    label: "For Dry Skin:",
    text: "Mix with milk or curd for deep hydration and nourishment",
  },
  {
    icon: <FaStar />,
    label: "For Radiant Glow:",
    text: "Mix with honey and a pinch of turmeric for a natural glow",
  },
  {
    icon: <FaLeaf />,
    label: "For Acne / Inflammation:",
    text: "Mix with neem water or aloe vera for a soothing effect",
  },
];

// ─── Sample reviews (data-driven) ───
const SAMPLE_REVIEWS = [
  {
    id: "r1",
    name: "Verified Buyer",
    verified: true,
    rating: 5,
    date: "2 weeks ago",
    text: "Amazing product! My skin feels so soft and naturally glowing after using this herbal powder. Highly recommend!",
  },
  {
    id: "r2",
    name: "Priya Sharma",
    verified: true,
    rating: 4,
    date: "1 month ago",
    text: "I've been using this for 3 weeks now and my skin has never looked better. The glow is real!",
  },
];

// ─── Contextual internal link to the most relevant blog guide ───
const getRelatedBlogLink = (product) => {
  const name = (product?.name || "").toLowerCase();
  const category = (product?.category || "").toLowerCase();

  if (
    name.includes("multani") ||
    name.includes("clay") ||
    name.includes("fuller")
  ) {
    return {
      to: "/blog/1",
      label: "Complete Multani Mitti benefits guide",
    };
  }
  if (name.includes("ubtan")) {
    return { to: "/blog/2", label: "The Ubtan ritual for glowing skin" };
  }
  if (
    name.includes("amla") ||
    name.includes("reetha") ||
    name.includes("shikakai") ||
    category.includes("hair")
  ) {
    return {
      to: "/blog/3",
      label: "Amla-Reetha-Shikakai hair care science",
    };
  }
  if (category.includes("skincare") || name.includes("face pack")) {
    return { to: "/blog/6", label: "Herbal face packs for every skin type" };
  }
  return null;
};

const ProductTabs = ({ product }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("description");
  const tabRefs = useRef([]);

  const isNatural =
    product?.category === "Skincare" || product?.category === "Hair Care";

  const reviewsCount = Number(product?.reviews) || 0;
  const ratingValue = Number(product?.rating) || 0;

  const tabs = [
    { id: "description", label: "Description", icon: <FaInfo /> },
    { id: "howToUse", label: "How to Use", icon: <FaVideo /> },
    { id: "ingredients", label: "Ingredients", icon: <FaLeaf /> },
    { id: "specs", label: "Specifications", icon: <FaBox /> },
    {
      id: "reviews",
      label: `Reviews (${reviewsCount})`,
      icon: <FaStar />,
    },
  ];

  const getCategoryIcon = () => {
    if (isNatural) return <FaLeaf style={{ color: brandColors.green }} />;
    return <FaHeart style={{ color: brandColors.primary }} />;
  };

  // ─── Theme styles ───
  const themeStyles = {
    tabsContainer: {
      marginTop: "3rem",
    },
    tabHeaders: {
      display: "flex",
      gap: "0.5rem",
      borderBottom: `2px solid ${
        isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(62, 39, 35, 0.06)"
      }`,
      paddingBottom: "0.5rem",
      overflowX: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: `${
        isDarkMode ? brandColors.gold : brandColors.goldDark
      } transparent`,
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
      fontFamily: "inherit",
    },
    activeTabHeader: {
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.1)"
        : "rgba(199, 125, 66, 0.06)",
      fontWeight: "600",
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
      outline: "none",
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
      margin: "0 0 1rem 0",
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
    blogLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      marginTop: "1.5rem",
      padding: "0.55rem 1rem",
      fontSize: "0.82rem",
      fontWeight: "700",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "none",
      borderRadius: "8px",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.08)"
        : "rgba(199, 125, 66, 0.06)",
      border: `1px dashed ${
        isDarkMode ? "rgba(212, 175, 55, 0.25)" : "rgba(199, 125, 66, 0.2)"
      }`,
      width: "fit-content",
      transition: "all 0.25s ease",
    },
    citationBlock: {
      marginTop: "1.5rem",
      paddingTop: "1rem",
      borderTop: isDarkMode
        ? "1px solid rgba(255,255,255,0.06)"
        : "1px solid rgba(62, 39, 35, 0.06)",
      fontSize: "0.75rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "0.35rem",
      lineHeight: 1.7,
    },
    citationLink: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "underline",
      fontWeight: "600",
      transition: "color 0.2s ease",
    },
  };

  // ─── Injected CSS: fixes broken pseudo-selectors and adds real hovers ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-product-tabs="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-product-tabs", "true");
    style.textContent = `
      /* Tab button hover */
      .pt-tab-btn:hover {
        color: ${isDarkMode ? brandColors.gold : brandColors.bronze};
        background-color: ${
          isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(62, 39, 35, 0.04)"
        };
      }
      .pt-tab-btn:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: 2px;
      }

      /* Active tab underline (the inline ::after rule never applied) */
      .pt-tab-btn.pt-active::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 3px;
        border-radius: 2px;
        background: ${isDarkMode ? brandColors.gold : brandColors.bronze};
      }

      /* Tab strip scrollbar (the inline ::-webkit-scrollbar never applied) */
      .pt-tabs::-webkit-scrollbar {
        height: 4px;
      }
      .pt-tabs::-webkit-scrollbar-thumb {
        background: ${isDarkMode ? brandColors.gold : brandColors.goldDark};
        border-radius: 4px;
      }
      .pt-tabs::-webkit-scrollbar-track {
        background: ${
          isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"
        };
        border-radius: 4px;
      }

      /* Spec card hover */
      .pt-spec-item:hover {
        transform: translateY(-2px);
        box-shadow: ${
          isDarkMode
            ? "0 4px 16px rgba(0,0,0,0.5)"
            : "0 4px 16px rgba(62, 39, 35, 0.06)"
        };
      }

      /* Review card hover */
      .pt-review-item:hover {
        box-shadow: ${
          isDarkMode
            ? "0 4px 16px rgba(0,0,0,0.5)"
            : "0 4px 16px rgba(62, 39, 35, 0.06)"
        };
      }

      /* Internal blog link hover */
      .pt-blog-link:hover,
      .pt-blog-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        gap: 0.6rem;
        outline: none;
      }

      /* Citation link hover */
      .pt-citation-link:hover,
      .pt-citation-link:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary} !important;
        outline: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .pt-tab-btn,
        .pt-spec-item,
        .pt-review-item,
        .pt-blog-link {
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-product-tabs="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  // ─── Keyboard navigation for tabs (WAI-ARIA tabs pattern) ───
  const handleTabKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  const relatedBlogLink = getRelatedBlogLink(product);
  const benefits = Array.isArray(product?.benefits) ? product.benefits : [];

  // ─── Tab content renderer ───
  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div>
            <h3 style={themeStyles.sectionTitle}>
              {getCategoryIcon()} About This Product
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>{product?.description}</p>

            {benefits.length > 0 && (
              <>
                <h4
                  style={{
                    ...themeStyles.sectionTitle,
                    fontSize: "1rem",
                    marginTop: "1.5rem",
                  }}
                >
                  <FaHeart
                    aria-hidden="true"
                    style={{ color: brandColors.primary }}
                  />{" "}
                  Key Benefits
                </h4>
                <ul style={themeStyles.benefitList}>
                  {benefits.map((benefit, index) => (
                    <li
                      key={`${benefit}-${index}`}
                      style={themeStyles.benefitItem}
                    >
                      <FaCheckCircle
                        aria-hidden="true"
                        style={themeStyles.benefitIcon}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {isNatural && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem 1.25rem",
                  background: isDarkMode
                    ? "rgba(46, 125, 50, 0.1)"
                    : "rgba(46, 125, 50, 0.05)",
                  borderRadius: "12px",
                  border: `1px solid ${
                    isDarkMode
                      ? "rgba(46, 125, 50, 0.2)"
                      : "rgba(46, 125, 50, 0.1)"
                  }`,
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
                  <FaLeaf aria-hidden="true" />
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
                  Made with pure, natural ingredients rooted in ancient
                  Ayurvedic wisdom. No chemicals, no parabens — just the
                  goodness of nature.
                </p>
              </div>
            )}

            {/* Contextual internal link to the relevant blog guide */}
            {relatedBlogLink && (
              <Link
                to={relatedBlogLink.to}
                className="pt-blog-link"
                style={themeStyles.blogLink}
                aria-label={`Learn more: ${relatedBlogLink.label}`}
              >
                <FaBookOpen aria-hidden="true" style={{ fontSize: "0.75rem" }} />
                Learn more: {relatedBlogLink.label}
                <FaArrowRight
                  aria-hidden="true"
                  style={{ fontSize: "0.65rem" }}
                />
              </Link>
            )}
          </div>
        );

      case "howToUse":
        return (
          <div>
            <h3 style={themeStyles.sectionTitle}>
              <FaVideo aria-hidden="true" style={{ color: brandColors.primary }} />{" "}
              How to Use
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>{product?.howToUse}</p>

            {isNatural && (
              <>
                <h4
                  style={{
                    ...themeStyles.sectionTitle,
                    fontSize: "1rem",
                    marginTop: "1.5rem",
                  }}
                >
                  <FaTint
                    aria-hidden="true"
                    style={{ color: brandColors.goldDark }}
                  />{" "}
                  Ayurvedic Pro Tips
                </h4>
                <ul style={themeStyles.benefitList}>
                  {AYURVEDIC_TIPS.map((tip, index) => (
                    <li
                      key={`${tip.label}-${index}`}
                      style={themeStyles.benefitItem}
                    >
                      <span
                        style={themeStyles.benefitIcon}
                        aria-hidden="true"
                      >
                        {tip.icon}
                      </span>
                      <div>
                        <strong>{tip.label}</strong> {tip.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div style={themeStyles.tipBox}>
              <div style={themeStyles.tipTitle}>
                <FaStar
                  aria-hidden="true"
                  style={{ color: brandColors.goldDark }}
                />
                Recommended Usage
              </div>
              <p
                style={{
                  marginTop: "0.5rem",
                  color: isDarkMode ? "#d1d1d1" : brandColors.earthLight,
                }}
              >
                For best results, use 2–3 times per week. Consistency is the
                key to unlocking the full benefits of natural Ayurvedic
                products.
              </p>
            </div>

            {relatedBlogLink && (
              <Link
                to={relatedBlogLink.to}
                className="pt-blog-link"
                style={themeStyles.blogLink}
                aria-label={`Learn more: ${relatedBlogLink.label}`}
              >
                <FaBookOpen aria-hidden="true" style={{ fontSize: "0.75rem" }} />
                Learn more: {relatedBlogLink.label}
                <FaArrowRight
                  aria-hidden="true"
                  style={{ fontSize: "0.65rem" }}
                />
              </Link>
            )}
          </div>
        );

      case "ingredients":
        return (
          <div>
            <h3 style={themeStyles.sectionTitle}>
              <FaLeaf aria-hidden="true" style={{ color: brandColors.green }} />{" "}
              Ingredients
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>{product?.ingredients}</p>

            <div style={{ marginBottom: "1.5rem" }}>
              <span style={themeStyles.herbBadge}>
                <FaLeaf aria-hidden="true" style={{ fontSize: "0.6rem" }} /> 100%
                Natural
              </span>
              <span style={themeStyles.herbBadge}>
                <FaShieldAlt aria-hidden="true" style={{ fontSize: "0.6rem" }} />{" "}
                Chemical Free
              </span>
              <span style={themeStyles.herbBadge}>
                <FaShieldAlt aria-hidden="true" style={{ fontSize: "0.6rem" }} />{" "}
                Paraben Free
              </span>
              <span style={themeStyles.herbBadge}>
                <FaShieldAlt aria-hidden="true" style={{ fontSize: "0.6rem" }} />{" "}
                Preservative Free
              </span>
              <span style={themeStyles.herbBadge}>
                <FaSmile aria-hidden="true" style={{ fontSize: "0.6rem" }} /> All
                Skin Types
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
                <FaCheckCircle aria-hidden="true" />
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
                Our products are made with pure, natural ingredients sourced
                from trusted suppliers. No harmful chemicals, no artificial
                fragrances — just the healing power of Ayurveda for your skin
                and hair.
              </p>
            </div>

            {/* Authoritative citation (E-E-A-T signal) */}
            <div style={themeStyles.citationBlock}>
              <FaBookOpen
                aria-hidden="true"
                style={{ fontSize: "0.7rem" }}
              />
              <span>
                Formulations inspired by traditional Ayurveda and referenced
                against peer-reviewed research from{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/?term=multani+mitti+fuller%27s+earth+skin"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={themeStyles.citationLink}
                  className="pt-citation-link"
                >
                  PubMed
                </a>{" "}
                and{" "}
                <a
                  href="https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={themeStyles.citationLink}
                  className="pt-citation-link"
                >
                  NIH NCCIH
                </a>
                .
              </span>
              <FaExternalLinkAlt
                aria-hidden="true"
                style={{ fontSize: "0.55rem", opacity: 0.6 }}
              />
            </div>
          </div>
        );

      case "specs":
        return (
          <div style={themeStyles.specsGrid}>
            <div style={themeStyles.specItem} className="pt-spec-item">
              <div style={themeStyles.specLabel}>Item Number</div>
              <div style={themeStyles.specValue}>
                {product?.itemNo || "N/A"}
              </div>
            </div>
            <div style={themeStyles.specItem} className="pt-spec-item">
              <div style={themeStyles.specLabel}>Category</div>
              <div style={themeStyles.specValue}>
                {isNatural ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <FaLeaf
                      aria-hidden="true"
                      style={{
                        color: brandColors.green,
                        fontSize: "0.8rem",
                      }}
                    />
                    {product?.category}
                  </span>
                ) : (
                  product?.category
                )}
              </div>
            </div>
            <div style={themeStyles.specItem} className="pt-spec-item">
              <div style={themeStyles.specLabel}>Sub Category</div>
              <div style={themeStyles.specValue}>
                {product?.subCategory || "N/A"}
              </div>
            </div>
            <div style={themeStyles.specItem} className="pt-spec-item">
              <div style={themeStyles.specLabel}>Type</div>
              <div style={themeStyles.specValue}>{product?.type || "N/A"}</div>
            </div>
            {product?.weight && (
              <div style={themeStyles.specItem} className="pt-spec-item">
                <div style={themeStyles.specLabel}>Net Weight</div>
                <div style={themeStyles.specValue}>{product.weight}</div>
              </div>
            )}
            <div style={themeStyles.specItem} className="pt-spec-item">
              <div style={themeStyles.specLabel}>Shades Available</div>
              <div style={themeStyles.specValue}>
                {typeof product?.shades === "number"
                  ? `${product.shades} shades`
                  : `${product?.shades?.length || 0} shades`}
              </div>
            </div>
            <div style={themeStyles.specItem} className="pt-spec-item">
              <div style={themeStyles.specLabel}>Availability</div>
              <div
                style={{
                  ...themeStyles.specValue,
                  color: product?.inStock ? brandColors.green : "#c62828",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: product?.inStock
                      ? brandColors.green
                      : "#c62828",
                  }}
                />
                {product?.inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>
            {product?.packing && (
              <div style={themeStyles.specItem} className="pt-spec-item">
                <div style={themeStyles.specLabel}>Packing</div>
                <div style={themeStyles.specValue}>{product.packing}</div>
              </div>
            )}
          </div>
        );

      case "reviews":
        return (
          <div>
            <h3 style={themeStyles.sectionTitle}>
              <FaStar aria-hidden="true" style={{ color: "#ffc107" }} />{" "}
              Customer Reviews
            </h3>

            {reviewsCount > 0 ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                  aria-label={`Rated ${ratingValue} out of 5 from ${reviewsCount} reviews`}
                >
                  <div style={{ display: "flex", gap: "0.2rem" }}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        aria-hidden="true"
                        color={
                          i < Math.floor(ratingValue) ? "#ffc107" : "#e0e0e0"
                        }
                        size={16}
                      />
                    ))}
                  </div>
                  <span style={{ fontWeight: "600" }}>{ratingValue}</span>
                  <span
                    style={{ color: isDarkMode ? "#a0a0a0" : "#bcaaa4" }}
                  >
                    ({reviewsCount} reviews)
                  </span>
                </div>

                {SAMPLE_REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    style={themeStyles.reviewItem}
                    className="pt-review-item"
                  >
                    <div style={themeStyles.reviewHeader}>
                      <div style={themeStyles.reviewerName}>
                        <FaUser
                          aria-hidden="true"
                          style={{ fontSize: "0.8rem" }}
                        />
                        {review.name}
                        {review.verified && (
                          <span style={themeStyles.reviewVerified}>
                            <FaCheckCircle
                              aria-hidden="true"
                              style={{ fontSize: "0.5rem" }}
                            />{" "}
                            Verified
                          </span>
                        )}
                      </div>
                      <div
                        style={themeStyles.reviewRating}
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            aria-hidden="true"
                            size={14}
                            color={i < review.rating ? "#ffc107" : "#e0e0e0"}
                          />
                        ))}
                      </div>
                    </div>
                    <div style={themeStyles.reviewDate}>
                      <FaRegClock
                        aria-hidden="true"
                        style={{ fontSize: "0.6rem" }}
                      />{" "}
                      Reviewed {review.date}
                    </div>
                    <div style={themeStyles.reviewText}>
                      <FaQuoteLeft
                        aria-hidden="true"
                        style={{
                          fontSize: "0.8rem",
                          opacity: 0.5,
                          marginRight: "0.3rem",
                        }}
                      />
                      {review.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
                }}
              >
                <FaStar
                  aria-hidden="true"
                  style={{
                    fontSize: "3rem",
                    opacity: 0.3,
                    marginBottom: "0.5rem",
                  }}
                />
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
    <section
      style={themeStyles.tabsContainer}
      aria-label="Product details"
    >
      {/* Tab strip */}
      <div
        style={themeStyles.tabHeaders}
        className="pt-tabs"
        role="tablist"
        aria-label="Product information tabs"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[index] = el)}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`pt-tab-btn${isActive ? " pt-active" : ""}`}
              style={{
                ...themeStyles.tabHeader,
                ...(isActive ? themeStyles.activeTabHeader : {}),
              }}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
            >
              <span aria-hidden="true">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        style={themeStyles.tabContent}
      >
        {renderContent()}
      </div>
    </section>
  );
};

export default ProductTabs;