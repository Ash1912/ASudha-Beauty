// src/components/SkincareBenefits.jsx
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
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
  FaBookOpen,
  FaExternalLinkAlt,
  FaArrowRight,
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

// ─── Benefit → icon map ───
const BENEFIT_ICONS = {
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
  // Hair care
  "Promotes hair growth": <FaSeedling />,
  "Strengthens hair roots": <FaTree />,
  "Adds natural shine": <FaGem />,
  "Restores hair health": <FaHandHoldingHeart />,
  "Reduces hair fall": <FaRegSnowflake />,
  "100% natural cleansing": <FaLeaf />,
  "Herbal mix goodness": <FaSpa />,
  // Product specific
  "Multani Mitti benefits": <FaHandHoldingHeart />,
  "Ubtan glow": <FaStar />,
  "Amla goodness": <FaSeedling />,
  "Reetha nourishment": <FaTint />,
  "Shikakai strength": <FaShieldAlt />,
  "Herbal hair care": <FaTree />,
  "Natural radiance": <FaGem />,
};

// ─── Contextual internal link resolver (hub-and-spoke linking) ───
// Maps a benefit string → most relevant blog guide for topical-cluster
// internal linking. Returns null if no match (no link emitted).
const getRelatedGuide = (benefit) => {
  const b = String(benefit || "").toLowerCase();
  if (
    b.includes("multani") ||
    b.includes("oil control") ||
    b.includes("deep cleansing") ||
    b.includes("oil") ||
    b.includes("clay")
  ) {
    return { to: "/blog/1", label: "Multani Mitti Benefits Guide" };
  }
  if (
    b.includes("ubtan") ||
    b.includes("glow") ||
    b.includes("radiance") ||
    b.includes("tan")
  ) {
    return { to: "/blog/2", label: "Ubtan for Glowing Skin" };
  }
  if (
    b.includes("amla") ||
    b.includes("reetha") ||
    b.includes("shikakai") ||
    b.includes("hair") ||
    b.includes("roots") ||
    b.includes("growth")
  ) {
    return { to: "/blog/3", label: "Amla-Reetha-Shikakai Hair Care" };
  }
  if (b.includes("skin") || b.includes("texture") || b.includes("face")) {
    return { to: "/blog/6", label: "Herbal Face Packs for Every Skin Type" };
  }
  return null;
};

// ─── Authoritative external citations (E-E-A-T hyperlinks) ───
const TRUSTED_CITATIONS = [
  {
    label: "PubMed research on Fuller's Earth (Multani Mitti)",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=multani+mitti+fuller%27s+earth+skin",
  },
  {
    label: "NIH NCCIH — Ayurvedic Medicine overview",
    href: "https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth",
  },
];

// ─── Clean-beauty claims ───
const FREE_FROM_CLAIMS = [
  { label: "No Parabens", icon: <FaShieldAlt /> },
  { label: "No Harsh Chemicals", icon: <FaLeaf /> },
  { label: "No Artificial Preservatives", icon: <FaShieldAlt /> },
  { label: "Cruelty Free", icon: <FaHeart /> },
  { label: "100% Natural & Pure", icon: <FaLeaf /> },
];

const SkincareBenefits = ({ benefits, isNatural = true }) => {
  const { isDarkMode } = useTheme();

  // ─── Null-safe benefits (guards against crashes from bad props) ───
  const safeBenefits = Array.isArray(benefits) ? benefits : [];

  // ─── Responsive: proper state, not inline window.innerWidth read ───
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ─── Icon resolver (exact match → keyword fallback → default) ───
  const getBenefitIcon = (benefit) => {
    const icon = BENEFIT_ICONS[benefit];
    if (icon) return icon;

    const b = String(benefit || "").toLowerCase();
    if (b.includes("glow") || b.includes("radiance")) return <FaGem />;
    if (b.includes("hair") || b.includes("growth")) return <FaTree />;
    if (b.includes("skin") || b.includes("face")) return <FaSmile />;
    return <FaHeart />;
  };

  // ─── Hair vs. skincare detection (null-safe) ───
  const isHairCare = safeBenefits.some((b) => {
    const s = String(b || "").toLowerCase();
    return s.includes("hair") || s.includes("growth") || s.includes("roots");
  });

  // ─── Theme styles ───
  const themeStyles = {
    container: {
      marginTop: "2.5rem",
      paddingTop: "1rem",
    },
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
      flexShrink: 0,
    },
    benefitCount: {
      fontSize: "0.6rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      fontWeight: "400",
      marginLeft: "0.3rem",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.25rem",
    },
    badgeContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.6rem",
      marginBottom: "2rem",
      listStyle: "none",
      padding: 0,
      margin: 0,
      marginBottom: "2rem",
    },
    badge: {
      padding: "0.5rem 1.25rem",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.8)"
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
      boxSizing: "border-box",
    },
    badgeIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      fontSize: "0.8rem",
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
    },
    naturalBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6rem",
      padding: "0.7rem 1.75rem",
      background: "linear-gradient(135deg, #f7d794 0%, #d4af37 100%)",
      color: isDarkMode ? "#0f0f0f" : "#ffffff",
      borderRadius: "50px",
      fontSize: "0.9rem",
      fontWeight: "700",
      marginTop: "0.5rem",
      letterSpacing: "0.8px",
      boxShadow: "0 4px 20px rgba(212, 175, 55, 0.4)",
      border: "1px solid rgba(255,255,255,0.2)",
      transition: "all 0.3s ease",
    },
    claimsContainer: {
      marginTop: "1.5rem",
      padding: "1.5rem",
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.6)"
        : "rgba(255,255,255,0.5)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "16px",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      display: "grid",
      gridTemplateColumns:
        windowWidth <= 480
          ? "1fr 1fr"
          : "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "0.75rem",
      listStyle: "none",
      padding: "1.5rem",
      margin: 0,
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
    },
    claimIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      fontSize: "0.8rem",
      flexShrink: 0,
    },
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
      margin: 0,
    },
    trustIcon: {
      color: brandColors.gold,
      fontSize: "1.2rem",
      flexShrink: 0,
    },
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
    // ─── Internal link to blog guide (contextual backlink) ───
    guideLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      marginTop: "0.35rem",
      fontSize: "0.72rem",
      fontWeight: "700",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "none",
      padding: "0.15rem 0.5rem",
      borderRadius: "6px",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.08)"
        : "rgba(199, 125, 66, 0.06)",
      border: `1px dashed ${
        isDarkMode ? "rgba(212, 175, 55, 0.25)" : "rgba(199, 125, 66, 0.2)"
      }`,
      transition: "all 0.25s ease",
      width: "fit-content",
    },
    // ─── External citation block (E-E-A-T) ───
    citationBlock: {
      marginTop: "1.25rem",
      paddingTop: "1rem",
      borderTop: isDarkMode
        ? "1px solid rgba(255,255,255,0.06)"
        : "1px solid rgba(62, 39, 35, 0.06)",
      fontSize: "0.75rem",
      color: isDarkMode ? "#a0a0a0" : "#bcaaa4",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "0.4rem",
      lineHeight: 1.7,
    },
    citationLink: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      textDecoration: "underline",
      fontWeight: "600",
      transition: "color 0.2s ease",
    },
  };

  // ─── Injected CSS (fixes broken :hover pseudo-selectors in inline styles) ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-skincare-benefits="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-skincare-benefits", "true");
    style.textContent = `
      .sb-badge:hover,
      .sb-badge:focus-within {
        transform: translateY(-3px) scale(1.02);
        box-shadow: ${
          isDarkMode
            ? "0 4px 16px rgba(0,0,0,0.7)"
            : "0 4px 16px rgba(62, 39, 35, 0.08)"
        };
        border-color: ${isDarkMode ? brandColors.gold : brandColors.bronze};
      }

      .sb-natural-badge:hover {
        transform: scale(1.03);
        box-shadow: 0 6px 30px rgba(212, 175, 55, 0.5);
      }

      .sb-claim-item:hover {
        background-color: ${
          isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(62, 39, 35, 0.02)"
        };
      }

      .sb-guide-link:hover,
      .sb-guide-link:focus-visible {
        color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        outline: none;
      }

      .sb-citation-link:hover,
      .sb-citation-link:focus-visible {
        color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        outline: none;
      }

      .sb-trust-icon {
        animation: sb-heartbeat 2.4s ease-in-out infinite;
      }
      @keyframes sb-heartbeat {
        0%, 100% { transform: scale(1); }
        50%      { transform: scale(1.12); }
      }

      @media (prefers-reduced-motion: reduce) {
        .sb-trust-icon { animation: none; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-skincare-benefits="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  return (
    <section
      style={themeStyles.container}
      aria-labelledby="skincare-benefits-title"
    >
      {/* Divider */}
      <div style={themeStyles.divider} aria-hidden="true" />

      {/* Category Badge */}
      <div style={{ marginBottom: "1rem" }}>
        <span
          style={{
            ...themeStyles.categoryBadge,
            ...(isHairCare ? themeStyles.hairBadge : themeStyles.skincareBadge),
          }}
        >
          {isHairCare ? (
            <FaTree aria-hidden="true" />
          ) : (
            <FaSpa aria-hidden="true" />
          )}
          {isHairCare ? "Hair Care" : "Skincare"}
        </span>
      </div>

      {/* Key Benefits heading */}
      <h3 id="skincare-benefits-title" style={themeStyles.title}>
        <FaLeaf aria-hidden="true" style={themeStyles.titleIcon} />
        Key Benefits
        <span style={themeStyles.benefitCount}>
          <FaStar aria-hidden="true" style={{ fontSize: "0.5rem" }} />
          {safeBenefits.length} benefit{safeBenefits.length === 1 ? "" : "s"}
        </span>
      </h3>

      {/* Benefits list — semantic <ul> for better indexability */}
      {safeBenefits.length > 0 ? (
        <ul style={themeStyles.badgeContainer} role="list">
          {safeBenefits.map((benefit, index) => {
            const icon = getBenefitIcon(benefit);
            const guide = getRelatedGuide(benefit);
            return (
              <li
                key={`${benefit}-${index}`}
                style={themeStyles.badge}
                className="sb-badge"
              >
                <span style={themeStyles.badgeIcon} aria-hidden="true">
                  {icon}
                </span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  {benefit}
                  {guide && (
                    <Link
                      to={guide.to}
                      style={themeStyles.guideLink}
                      className="sb-guide-link"
                      aria-label={`Learn more: ${guide.label}`}
                    >
                      <FaBookOpen
                        aria-hidden="true"
                        style={{ fontSize: "0.6rem" }}
                      />
                      {guide.label}
                      <FaArrowRight
                        aria-hidden="true"
                        style={{ fontSize: "0.55rem" }}
                      />
                    </Link>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}

      {/* 100% Natural claims */}
      {isNatural && (
        <>
          <h3 style={themeStyles.title}>
            <FaShieldAlt aria-hidden="true" style={themeStyles.titleIcon} />
            Pure Goodness of Nature
          </h3>

          <ul style={themeStyles.claimsContainer} role="list">
            {FREE_FROM_CLAIMS.map((claim, index) => (
              <li
                key={`${claim.label}-${index}`}
                style={themeStyles.claimItem}
                className="sb-claim-item"
              >
                <FaCheckCircle
                  aria-hidden="true"
                  style={themeStyles.claimIcon}
                />
                {claim.label}
              </li>
            ))}
          </ul>

          {/* 100% Natural Gold Badge */}
          <div style={themeStyles.naturalBadge} className="sb-natural-badge">
            <FaLeaf aria-hidden="true" /> 100% Natural &amp; Ayurvedic
          </div>

          {/* Trusted by nature section */}
          <div style={themeStyles.trustSection}>
            <FaHeart
              aria-hidden="true"
              className="sb-trust-icon"
              style={themeStyles.trustIcon}
            />
            <p style={themeStyles.trustText}>
              &ldquo;Trusted by nature, loved by you — pure goodness for your
              skin and hair.&rdquo;
            </p>
          </div>
        </>
      )}

      {/* ─── Authoritative citations (E-E-A-T hyperlinks) ─── */}
      <div style={themeStyles.citationBlock}>
        <FaBookOpen aria-hidden="true" style={{ fontSize: "0.7rem" }} />
        <span>Formulations inspired by 5,000 years of Ayurveda and cross-referenced with peer-reviewed research from </span>
        {TRUSTED_CITATIONS.map((c, i) => (
          <span key={c.href} style={{ display: "inline" }}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.citationLink}
              className="sb-citation-link"
              title={c.label}
            >
              {c.label.split("—")[0].trim()}
            </a>
            {i < TRUSTED_CITATIONS.length - 1 && <span>, </span>}
          </span>
        ))}
        <span>.</span>
        <FaExternalLinkAlt
          aria-hidden="true"
          style={{ fontSize: "0.55rem", opacity: 0.6 }}
        />
      </div>
    </section>
  );
};

export default SkincareBenefits;