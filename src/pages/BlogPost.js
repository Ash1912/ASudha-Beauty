import React, {
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FaArrowLeft,
  FaUser,
  FaClock,
  FaComment,
  FaHeart,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaEnvelope,
  FaUserCircle,
  FaTags,
  FaEye,
  FaCheckCircle,
  FaLeaf,
  FaQuoteLeft,
} from "react-icons/fa";

// ─── Brand palette (module-scope: stable references) ───
const brandColors = {
  primary: "#f5346b",
  primaryDark: "#cf2a57",
  gold: "#f7d794",
  goldDark: "#d4af37",
  bronze: "#c77d42",
  black: "#0f0f0f",
  darkSlate: "#1a1a1a",
  earthDark: "#3e2723",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const BlogPost = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "/assets/images/team/priya.jpg",
      date: "March 16, 2026",
      text: "I've been using ASudha's Multani Mitti for 3 weeks now, and the difference in my skin is incredible! My oily T-zone is finally under control. Thank you for this detailed guide!",
      verified: true,
    },
    {
      id: 2,
      name: "Rahul Verma",
      avatar: "/assets/images/team/michael.jpg",
      date: "March 15, 2026",
      text: "I never knew Ubtan had so many benefits! I tried the honey and milk mix and my skin feels so soft and glowing. Cannot wait to try more ASudha products.",
      verified: false,
    },
    {
      id: 3,
      name: "Ananya Gupta",
      avatar: "/assets/images/team/sarah.jpg",
      date: "March 14, 2026",
      text: "Love the Ayurvedic approach! I appreciate that ASudha is 100% chemical-free. This blog post made it so easy to understand how to use the products properly.",
      verified: true,
    },
  ]);
  const [avatarErrors, setAvatarErrors] = useState({});
  const [isCommentPosted, setIsCommentPosted] = useState(false);

  // ─── Theme tokens ───
  const dark = {
    bg: brandColors.black,
    bgAlt: "#141414",
    card: brandColors.darkSlate,
    cardAlt: "#222222",
    border: "rgba(212, 175, 55, 0.14)",
    borderSoft: "rgba(255, 255, 255, 0.06)",
    divider: "rgba(255, 255, 255, 0.08)",
    text: "#f5f0eb",
    textMuted: "#c9b8b0",
    textDim: "#8d7d76",
    gold: brandColors.gold,
    green: brandColors.green,
    accent: brandColors.primary,
    shadow: DARK_SHADOW,
    shadowLift: DARK_SHADOW_LIFT,
  };

  const light = {
    bg: brandColors.cream,
    bgAlt: "#ffffff",
    card: "#ffffff",
    cardAlt: "#f9f4f0",
    border: "rgba(62, 39, 35, 0.08)",
    borderSoft: "rgba(62, 39, 35, 0.04)",
    divider: "rgba(62, 39, 35, 0.06)",
    text: "#3e2723",
    textMuted: brandColors.earthLight,
    textDim: "#8d7d76",
    gold: brandColors.goldDark,
    green: brandColors.green,
    accent: brandColors.primary,
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const post = {
    id: 1,
    title: "Multani Mitti & Ubtan: The Ancient Ayurvedic Duo for Glowing Skin",
    excerpt:
      "Discover the timeless Ayurvedic benefits of 100% natural Multani Mitti and Ubtan. Learn how this powerful herbal duo can deep-cleanse, exfoliate, and reveal your natural radiance.",
    content: `
      <p>In the world of modern skincare, we often look for complex solutions. But sometimes, the most powerful remedies are the ones that have been passed down through generations. Enter <strong>Multani Mitti (Fuller's Earth)</strong> and <strong>Ubtan</strong>—two ancient Ayurvedic formulations that have been trusted for centuries to reveal glowing, healthy skin.</p>

      <div class="highlight-box">
        <p><strong>✨ Did You Know?</strong> Multani Mitti has been used in India for over 2,000 years, while Ubtan is a 5,000-year-old beauty ritual!</p>
      </div>

      <h2>What is Multani Mitti?</h2>
      <p>Multani Mitti, also known as Fuller's Earth, is a calcium bentonite clay that has been used in India and the Middle East for over 2,000 years. It is celebrated for its incredible ability to absorb excess oil, remove impurities, and gently exfoliate dead skin cells. At <strong>ASudha Beauty</strong>, our Multani Mitti is 100% natural, chemical-free, and sourced directly from the earth to ensure you get the purest experience.</p>

      <div class="benefits-grid">
        <div class="benefit-item">🧴 Deep Cleansing</div>
        <div class="benefit-item">💧 Oil Control</div>
        <div class="benefit-item">✨ Skin Glow</div>
        <div class="benefit-item">🌿 Natural Purity</div>
      </div>

      <h2>What is Ubtan?</h2>
      <p>Ubtan is a traditional Ayurvedic herbal paste made from a blend of natural ingredients like turmeric, sandalwood, gram flour, and various herbs. It has been a staple in Indian households for over 5,000 years. Ubtan is not just a face pack; it is a holistic beauty ritual that nourishes the skin, improves texture, and imparts a natural, golden glow.</p>

      <h2>Why These Two Are a Match Made in Ayurveda</h2>
      <p>Together, Multani Mitti and Ubtan form the perfect skincare duo. Multani Mitti acts as a deep-cleansing agent that draws out impurities and excess oil. Ubtan, on the other hand, nourishes and revitalizes the skin with its blend of herbs and spices. When used together, they provide a complete skincare routine:</p>
      <ul>
        <li><strong>Deep Cleansing:</strong> Multani Mitti removes dirt, oil, and blackheads from deep within the pores.</li>
        <li><strong>Exfoliation:</strong> Ubtan gently scrubs away dead skin cells, revealing fresh, new skin.</li>
        <li><strong>Nourishment:</strong> The herbs in Ubtan deliver essential nutrients to the skin, leaving it soft and supple.</li>
        <li><strong>Natural Glow:</strong> Together, they restore the skin's natural radiance, giving you a healthy, youthful appearance.</li>
      </ul>

      <h2>How to Use Them in Your Routine</h2>
      <p>At ASudha Beauty, we believe in simplicity and purity. Here's how you can incorporate our 100% natural Multani Mitti and Ubtan powders into your weekly skincare ritual:</p>
      <ol>
        <li><strong>Step 1:</strong> Mix 2 tablespoons of Multani Mitti powder with rose water or plain water to form a smooth paste. Apply evenly on your face and neck. Leave it on for 10-15 minutes until it dries. Rinse with lukewarm water. <em>This deep-cleanses your pores.</em></li>
        <li><strong>Step 2:</strong> Take 2 tablespoons of Ubtan powder. Add milk, curd, or honey to form a paste. Apply over your damp face. Leave for 10 minutes. Gently scrub in circular motions while washing off. <em>This exfoliates and nourishes.</em></li>
        <li><strong>Step 3:</strong> Finish with a light moisturizer to lock in hydration.</li>
      </ol>
      <p>Use this routine 2-3 times a week for the best results. Your skin will thank you!</p>

      <div class="tip-box">
        <p><strong>🌿 ASudha Tip:</strong> For an extra glow, add a pinch of turmeric to your Ubtan paste. Turmeric has natural anti-inflammatory properties that brighten the skin.</p>
      </div>

      <h2>The ASudha Promise</h2>
      <p>At ASudha Beauty, we take pride in crafting products that are <strong>100% natural, paraben-free, chemical-free, and cruelty-free</strong>. Our Multani Mitti and Ubtan powders are made with the purest ingredients, ensuring that you receive only the goodness of nature. <em>Pure. Natural. You.</em></p>
    `,
    image: "/assets/images/blog/multani-ubtan-guide.png",
    category: "Skincare",
    tags: [
      "Multani Mitti",
      "Ubtan",
      "Ayurveda",
      "Natural Skincare",
      "Chemical Free",
    ],
    author: "Ashram Mishra",
    authorAvatar: "/assets/images/founders/ashram.jpeg",
    authorBio:
      "Ashram Mishra is the founder of ASudha Beauty, driven by a passion for Ayurvedic wellness and a mission to bring 100% natural, chemical-free beauty products to every home. He believes that true beauty comes from the earth.",
    date: "March 15, 2026",
    readTime: "5 min read",
    views: 1245,
    likes: 89,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  const handleAvatarError = (commentId) => {
    setAvatarErrors((prev) => ({ ...prev, [commentId]: true }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        name: "You",
        avatar: "",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        text: comment.trim(),
        verified: false,
      };
      setComments([newComment, ...comments]);
      setComment("");
      setIsCommentPosted(true);
      setTimeout(() => setIsCommentPosted(false), 3000);
    }
  };

  const renderContent = () => ({ __html: post.content });

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  // ✅ The effect intentionally only re-runs when isDarkMode changes.
  //    T.text / T.textMuted / T.border etc. are derived directly from
  //    isDarkMode, so re-running on isDarkMode covers all of them.
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-blogpost-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-blogpost-styles", "true");
    style.textContent = `
      /* ─── Article typography ─── */
      .post-content {
        font-size: 1.08rem;
        line-height: 1.9;
        color: ${T.textMuted};
      }
      .post-content > p:first-of-type::first-letter {
        font-size: 3.4rem;
        font-weight: 900;
        float: left;
        line-height: 0.9;
        padding: 0.4rem 0.75rem 0.1rem 0;
        margin: 0.15rem 0.35rem 0 0;
        color: ${isDarkMode ? brandColors.gold : brandColors.primary};
        font-family: Georgia, serif;
      }
      .post-content h2 {
        font-size: 1.55rem;
        margin: 2.75rem 0 1.15rem;
        color: ${T.text};
        font-weight: 800;
        padding-left: 1.15rem;
        border-left: 4px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        letter-spacing: -0.3px;
        line-height: 1.3;
      }
      .post-content h3 {
        font-size: 1.28rem;
        margin: 2rem 0 0.75rem;
        color: ${T.text};
        font-weight: 700;
        letter-spacing: -0.2px;
      }
      .post-content p { margin-bottom: 1.5rem; }
      .post-content ul, .post-content ol {
        margin-bottom: 1.5rem;
        padding-left: 1.5rem;
      }
      .post-content li { margin-bottom: 0.6rem; }
      .post-content li::marker {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary};
        font-weight: 700;
      }
      .post-content strong { color: ${T.text}; font-weight: 700; }
      .post-content em { font-style: italic; opacity: 0.95; }

      .post-content .highlight-box {
        background: ${
          isDarkMode
            ? "linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(245, 52, 107, 0.06) 100%)"
            : "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(245, 52, 107, 0.05) 100%)"
        };
        border: 1px solid ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.28)"
            : "rgba(212, 175, 55, 0.2)"
        };
        border-radius: 18px;
        padding: 1.5rem 1.75rem;
        margin: 2rem 0;
        position: relative;
        overflow: hidden;
      }
      .post-content .highlight-box::before {
        content: "";
        position: absolute;
        top: 0; left: 0; bottom: 0;
        width: 4px;
        background: linear-gradient(180deg, ${brandColors.gold}, ${brandColors.primary});
      }
      .post-content .highlight-box p { margin: 0; font-size: 1rem; }

      .post-content .benefits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 0.85rem;
        margin: 2rem 0;
      }
      .post-content .benefit-item {
        background: ${
          isDarkMode
            ? "linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(245, 52, 107, 0.04))"
            : "linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(245, 52, 107, 0.04))"
        };
        padding: 1rem 0.75rem;
        border-radius: 14px;
        text-align: center;
        font-size: 0.88rem;
        font-weight: 700;
        color: ${T.text};
        border: 1px solid ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.16)"
            : "rgba(212, 175, 55, 0.12)"
        };
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }
      .post-content .benefit-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 24px ${
          isDarkMode ? "rgba(245, 52, 107, 0.2)" : "rgba(245, 52, 107, 0.12)"
        };
      }

      .post-content .tip-box {
        background: ${
          isDarkMode
            ? "linear-gradient(135deg, rgba(76, 175, 80, 0.12), rgba(139, 195, 74, 0.06))"
            : "linear-gradient(135deg, rgba(76, 175, 80, 0.09), rgba(139, 195, 74, 0.04))"
        };
        border: 1px solid ${
          isDarkMode
            ? "rgba(76, 175, 80, 0.28)"
            : "rgba(76, 175, 80, 0.18)"
        };
        border-radius: 18px;
        padding: 1.5rem 1.75rem;
        margin: 2rem 0;
        border-left: 4px solid ${brandColors.green};
        position: relative;
      }
      .post-content .tip-box p { margin: 0; font-size: 1rem; }

      /* ─── Hover interactions ─── */
      .back-btn {
        transition: all 0.3s ease;
      }
      .back-btn:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        transform: translateX(-4px);
      }

      .tag {
        transition: all 0.25s ease;
      }
      .tag:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        transform: translateY(-2px);
      }

      .action-btn {
        transition: all 0.25s ease;
      }
      .action-btn:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        transform: translateY(-2px);
      }

      .share-btn {
        transition: all 0.25s ease;
      }
      .share-btn:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        transform: translateY(-3px);
      }

      .comment-btn {
        transition: all 0.3s ease;
      }
      .comment-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(245, 52, 107, 0.5);
      }

      .comment-input {
        transition: border-color 0.25s ease, box-shadow 0.25s ease;
      }
      .comment-input:focus {
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.bronze
        } !important;
        box-shadow: 0 0 0 4px ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.18)"
            : "rgba(199, 125, 66, 0.1)"
        };
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-blogpost-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // ✅ T (and T.text, T.textMuted, etc.) is derived from isDarkMode —
    //    re-running on theme change is sufficient. ESLint flags this as a
    //    false positive because it can't see through the derived object.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const themeStyles = {
    container: {
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100%",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },

    // ─── Hero ───
    hero: {
      position: "relative",
      width: "100%",
      backgroundColor: isDarkMode ? brandColors.black : "#1a1a1a",
      lineHeight: 0,
      overflow: "hidden",
    },
    heroOrb: {
      position: "absolute",
      top: "10%",
      right: "-100px",
      width: "340px",
      height: "340px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 50% 50%, rgba(245, 52, 107, 0.4) 0%, transparent 70%)",
      filter: "blur(80px)",
      pointerEvents: "none",
      zIndex: 1,
    },
    heroImage: {
      width: "100%",
      height: "auto",
      maxHeight: isNarrow ? "340px" : "580px",
      objectFit: "contain",
      objectPosition: "center",
      display: "block",
      margin: "0 auto",
      position: "relative",
      zIndex: 0,
    },
    heroBottomFade: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "110px",
      background: `linear-gradient(to top, ${T.bg} 0%, transparent 100%)`,
      pointerEvents: "none",
      zIndex: 2,
    },

    backButton: {
      position: "absolute",
      top: isMobile ? "1rem" : "1.5rem",
      left: isMobile ? "1rem" : "1.5rem",
      zIndex: 10,
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: isMobile ? "0.5rem 1.1rem" : "0.6rem 1.5rem",
      backgroundColor: "rgba(15,15,15,0.7)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      color: "#ffffff",
      textDecoration: "none",
      borderRadius: "50px",
      border: "1px solid rgba(255,255,255,0.25)",
      fontWeight: "600",
      fontSize: isMobile ? "0.82rem" : "0.9rem",
    },

    // ─── Main content ───
    mainContent: {
      maxWidth: "820px",
      margin: "0 auto",
      padding: isNarrow ? "2rem 1.25rem" : "3.5rem 2rem",
    },

    // Category badge above title
    categoryBadgeWrap: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "1.25rem",
      marginTop: isNarrow ? "0.5rem" : "1rem",
    },
    categoryBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: "0.4rem 1.1rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      borderRadius: "50px",
      fontSize: "0.72rem",
      fontWeight: "800",
      letterSpacing: "1px",
      textTransform: "uppercase",
      boxShadow: "0 8px 22px rgba(245, 52, 107, 0.3)",
    },

    // Post title
    postTitle: {
      fontSize: isMobile ? "1.65rem" : isNarrow ? "2rem" : "2.5rem",
      fontWeight: "900",
      lineHeight: "1.2",
      letterSpacing: "-0.5px",
      color: T.text,
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    // Decorative underline
    titleUnderline: {
      width: "80px",
      height: "4px",
      margin: "0 auto 2rem",
      borderRadius: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
    },

    // Meta row (below title)
    postMeta: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: isNarrow ? "1rem" : "1.75rem",
      marginBottom: "2.5rem",
      fontSize: "0.85rem",
      color: T.textMuted,
    },
    metaItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      fontWeight: "600",
    },
    metaIcon: {
      fontSize: "0.75rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
    },

    // Author card
    authorInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1.25rem",
      marginBottom: "3rem",
      padding: "1.5rem 1.75rem",
      backgroundColor: T.card,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      flexWrap: isMobile ? "wrap" : "nowrap",
      position: "relative",
      overflow: "hidden",
    },
    authorAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      width: "4px",
      background: `linear-gradient(180deg, ${brandColors.gold}, ${brandColors.primary})`,
    },
    authorAvatar: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `2px solid ${isDarkMode ? brandColors.gold : brandColors.bronze}`,
      flexShrink: 0,
      padding: "2px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
    },
    authorAvatarInner: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
      display: "block",
    },
    authorAvatarFallback: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#f5f0eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.8rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      border: `2px solid ${isDarkMode ? brandColors.gold : brandColors.bronze}`,
      flexShrink: 0,
    },
    authorDetails: {
      flex: 1,
      minWidth: 0,
    },
    authorName: {
      fontSize: "1.05rem",
      fontWeight: "800",
      marginBottom: "0.35rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      flexWrap: "wrap",
    },
    authorVerified: {
      fontSize: "0.62rem",
      color: brandColors.green,
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.18)"
        : "rgba(76, 175, 80, 0.1)",
      padding: "0.15rem 0.55rem",
      borderRadius: "50px",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.25rem",
      fontWeight: "700",
      letterSpacing: "0.3px",
    },
    authorBio: {
      color: T.textMuted,
      fontSize: "0.88rem",
      lineHeight: "1.6",
    },

    // Post body
    postContent: {
      marginBottom: "3rem",
    },

    // Quote pull (divider)
    pullQuote: {
      margin: "2.5rem 0",
      padding: "1.5rem 0 1.5rem 1.75rem",
      borderLeft: `4px solid ${
        isDarkMode ? brandColors.gold : brandColors.primary
      }`,
      fontSize: "1.15rem",
      fontStyle: "italic",
      color: T.text,
      lineHeight: "1.7",
      fontWeight: "500",
      position: "relative",
    },
    pullQuoteIcon: {
      position: "absolute",
      top: "0.5rem",
      left: "-0.35rem",
      fontSize: "1.4rem",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      opacity: 0.4,
      backgroundColor: T.bg,
      padding: "0 0.35rem",
    },

    // Tags
    tagsSection: {
      marginBottom: "2.5rem",
      padding: "1.5rem 0",
      borderTop: `1px solid ${T.divider}`,
      borderBottom: `1px solid ${T.divider}`,
    },
    tagsTitle: {
      fontSize: "0.85rem",
      fontWeight: "800",
      marginBottom: "1rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    tagsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    tag: {
      padding: "0.4rem 1rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(62, 39, 35, 0.05)",
      color: T.textMuted,
      borderRadius: "50px",
      fontSize: "0.8rem",
      fontWeight: "700",
      textDecoration: "none",
      border: `1px solid ${T.borderSoft}`,
    },

    // Actions
    actionsSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "3rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    actionButtons: {
      display: "flex",
      gap: "0.75rem",
    },
    actionButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.55rem 1.35rem",
      backgroundColor: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      color: T.text,
      cursor: "pointer",
      fontSize: "0.88rem",
      fontWeight: "700",
      fontFamily: "inherit",
    },
    activeActionButton: {
      backgroundColor: isDarkMode ? brandColors.gold : brandColors.primary,
      color: isDarkMode ? brandColors.black : "#ffffff",
      borderColor: isDarkMode ? brandColors.gold : brandColors.primary,
    },
    shareButtons: {
      display: "flex",
      gap: "0.5rem",
    },
    shareButton: {
      width: "40px",
      height: "40px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: "50%",
      color: T.text,
      cursor: "pointer",
      textDecoration: "none",
      fontSize: "0.85rem",
    },

    // Comments
    commentsSection: {
      marginBottom: "3rem",
      paddingTop: "2.5rem",
      borderTop: `2px solid ${T.divider}`,
    },
    commentsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.75rem",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    commentsTitle: {
      fontSize: "1.4rem",
      fontWeight: "900",
      color: T.text,
      margin: 0,
      letterSpacing: "-0.3px",
    },
    commentsCount: {
      fontSize: "0.85rem",
      color: T.textMuted,
      fontWeight: "600",
      padding: "0.35rem 0.85rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(62, 39, 35, 0.04)",
      borderRadius: "50px",
    },
    commentForm: {
      display: "flex",
      flexDirection: "column",
      gap: "0.85rem",
      marginBottom: "2rem",
      padding: "1.75rem",
      backgroundColor: T.card,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: "22px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
    },
    commentInput: {
      padding: "1rem 1.15rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      border: `1px solid ${T.border}`,
      borderRadius: "14px",
      color: T.text,
      fontSize: "0.95rem",
      resize: "vertical",
      minHeight: "110px",
      outline: "none",
      fontFamily: "inherit",
      boxSizing: "border-box",
      width: "100%",
    },
    commentButton: {
      alignSelf: "flex-end",
      padding: "0.7rem 2rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "0.92rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.3)",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },
    commentSuccess: {
      marginTop: "0.5rem",
      padding: "0.65rem 1rem",
      backgroundColor: isDarkMode ? "rgba(76,175,80,0.15)" : "#e8f5e9",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      borderRadius: "12px",
      fontSize: "0.85rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: "700",
    },
    commentList: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    comment: {
      padding: "1.35rem",
      backgroundColor: T.card,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: "18px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
    },
    commentHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.85rem",
      marginBottom: "0.6rem",
    },
    commentAvatar: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `1px solid ${T.borderSoft}`,
      flexShrink: 0,
    },
    commentAvatarFallback: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#f5f0eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
    },
    commentInfo: {
      flex: 1,
      minWidth: 0,
    },
    commentName: {
      fontSize: "0.95rem",
      fontWeight: "800",
      marginBottom: "0.1rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      flexWrap: "wrap",
    },
    commentVerified: {
      fontSize: "0.58rem",
      color: brandColors.green,
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.18)"
        : "rgba(76, 175, 80, 0.1)",
      padding: "0.1rem 0.45rem",
      borderRadius: "50px",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.2rem",
      fontWeight: "700",
    },
    commentDate: {
      fontSize: "0.75rem",
      color: T.textMuted,
      fontWeight: "600",
    },
    commentText: {
      fontSize: "0.92rem",
      lineHeight: "1.7",
      color: T.textMuted,
      margin: 0,
    },
  };

  return (
    <div style={themeStyles.container}>
      {/* Hero — image only with orbs + fade */}
      <section style={themeStyles.hero}>
        <div style={themeStyles.heroOrb} />
        <img
          src={post.image}
          alt={post.title}
          style={themeStyles.heroImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/1200x600/fcf8f5/3e2723?text=" +
              encodeURIComponent(post.title);
          }}
        />
        <div style={themeStyles.heroBottomFade} />
        <Link to="/blog" style={themeStyles.backButton} className="back-btn">
          <FaArrowLeft /> Back to Blog
        </Link>
      </section>

      {/* Main Content */}
      <div style={themeStyles.mainContent}>
        {/* Category badge */}
        <div style={themeStyles.categoryBadgeWrap}>
          <span style={themeStyles.categoryBadge}>
            <FaLeaf style={{ fontSize: "0.65rem" }} />
            {post.category}
          </span>
        </div>

        {/* Post title */}
        <h1 style={themeStyles.postTitle}>{post.title}</h1>
        <div style={themeStyles.titleUnderline} />

        {/* Meta */}
        <div style={themeStyles.postMeta}>
          <span style={themeStyles.metaItem}>
            <FaUser style={themeStyles.metaIcon} /> {post.author}
          </span>
          <span style={themeStyles.metaItem}>
            <FaClock style={themeStyles.metaIcon} /> {post.readTime}
          </span>
          <span style={themeStyles.metaItem}>
            <FaComment style={themeStyles.metaIcon} /> {comments.length} comments
          </span>
          <span style={themeStyles.metaItem}>
            <FaEye style={themeStyles.metaIcon} /> {post.views} views
          </span>
        </div>

        {/* Author card */}
        <div style={themeStyles.authorInfo}>
          <div style={themeStyles.authorAccent} />
          {post.authorAvatar ? (
            <div style={themeStyles.authorAvatar}>
              <img
                src={post.authorAvatar}
                alt={post.author}
                style={themeStyles.authorAvatarInner}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/64x64/fcf8f5/3e2723?text=" +
                    post.author.charAt(0);
                }}
              />
            </div>
          ) : (
            <div style={themeStyles.authorAvatarFallback}>
              <FaUserCircle />
            </div>
          )}
          <div style={themeStyles.authorDetails}>
            <div style={themeStyles.authorName}>
              {post.author}
              <span style={themeStyles.authorVerified}>
                <FaCheckCircle style={{ fontSize: "0.5rem" }} /> Verified
              </span>
            </div>
            <div style={themeStyles.authorBio}>{post.authorBio}</div>
          </div>
        </div>

        {/* Post content */}
        <div
          style={themeStyles.postContent}
          className="post-content"
          dangerouslySetInnerHTML={renderContent()}
        />

        {/* Pull quote */}
        <div style={themeStyles.pullQuote}>
          <FaQuoteLeft style={themeStyles.pullQuoteIcon} />
          Pure. Natural. You. — The ASudha promise, woven into every grain of
          our powders.
        </div>

        {/* Tags */}
        <div style={themeStyles.tagsSection}>
          <h4 style={themeStyles.tagsTitle}>
            <FaTags style={{ fontSize: "0.8rem" }} /> Explore More Ayurvedic Topics
          </h4>
          <div style={themeStyles.tagsContainer}>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                style={themeStyles.tag}
                className="tag"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={themeStyles.actionsSection}>
          <div style={themeStyles.actionButtons}>
            <button
              style={{
                ...themeStyles.actionButton,
                ...(liked && themeStyles.activeActionButton),
              }}
              className="action-btn"
              onClick={() => setLiked(!liked)}
            >
              <FaHeart /> {liked ? "Liked" : "Like"} (
              {post.likes + (liked ? 1 : 0)})
            </button>
          </div>
          <div style={themeStyles.shareButtons}>
            <button
              style={themeStyles.shareButton}
              className="share-btn"
              onClick={handleShare}
              aria-label="Share"
            >
              <FaShare />
            </button>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.shareButton}
              className="share-btn"
              aria-label="Share on Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.shareButton}
              className="share-btn"
              aria-label="Share on Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}&media=${encodeURIComponent(
                post.image
              )}&description=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.shareButton}
              className="share-btn"
              aria-label="Share on Pinterest"
            >
              <FaPinterest />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(
                post.title
              )}&body=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              style={themeStyles.shareButton}
              className="share-btn"
              aria-label="Share via Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Comments */}
        <div style={themeStyles.commentsSection}>
          <div style={themeStyles.commentsHeader}>
            <h3 style={themeStyles.commentsTitle}>Join the Conversation</h3>
            <span style={themeStyles.commentsCount}>
              {comments.length} comments
            </span>
          </div>

          <form style={themeStyles.commentForm} onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Share your Ayurvedic skincare experience..."
              style={themeStyles.commentInput}
              className="comment-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              style={themeStyles.commentButton}
              className="comment-btn"
            >
              Post Comment
            </button>
            {isCommentPosted && (
              <div style={themeStyles.commentSuccess}>
                <FaCheckCircle /> Your comment has been posted!
              </div>
            )}
          </form>

          <div style={themeStyles.commentList}>
            {comments.map((c) => (
              <div key={c.id} style={themeStyles.comment}>
                <div style={themeStyles.commentHeader}>
                  {!avatarErrors[c.id] && c.avatar ? (
                    <img
                      src={c.avatar}
                      alt={c.name}
                      style={themeStyles.commentAvatar}
                      onError={() => handleAvatarError(c.id)}
                    />
                  ) : (
                    <div style={themeStyles.commentAvatarFallback}>
                      <FaUserCircle />
                    </div>
                  )}
                  <div style={themeStyles.commentInfo}>
                    <div style={themeStyles.commentName}>
                      {c.name}
                      {c.verified && (
                        <span style={themeStyles.commentVerified}>
                          <FaCheckCircle style={{ fontSize: "0.4rem" }} />{" "}
                          Verified
                        </span>
                      )}
                    </div>
                    <div style={themeStyles.commentDate}>{c.date}</div>
                  </div>
                </div>
                <p style={themeStyles.commentText}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;