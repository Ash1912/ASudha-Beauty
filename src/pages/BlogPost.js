// src/pages/BlogPost.jsx
import React, {
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO"; 
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
  FaBookOpen,
  FaExternalLinkAlt,
  FaFlask,
  FaSpa,
  FaTint,
  FaStar,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";

// ─── Site constants ───
const SITE_URL = "https://www.asudhabeauty.shop";

// ─── Brand palette (module scope: stable) ───
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

// ─── Authoritative citations (E-E-A-T) ───
const CITATIONS = {
  mdpiMultani: {
    label:
      "Multi-Target Anti-Aging Mechanisms of Multani Mitti — Cosmetics (MDPI, 2025)",
    url: "https://www.mdpi.com/2079-9284/12/3/124",
    domain: "mdpi.com",
  },
  pubmedUbtan: {
    label:
      "Evaluation of Ubtan — a traditional Indian skin care formulation (PubMed, 2016)",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=ubtan+traditional+indian+skin+care+formulation",
    domain: "pubmed.ncbi.nlm.nih.gov",
  },
  nccihAyurveda: {
    label: "NIH NCCIH — Ayurvedic Medicine: In Depth",
    url: "https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth",
    domain: "nccih.nih.gov",
  },
};

// ─── Related blog posts (internal backlinks / topic cluster) ───
const RELATED_POSTS = [
  {
    id: 2,
    title: "Ubtan for Glowing Skin: The 5000-Year-Old Ayurvedic Ritual",
    label: "Ubtan for glowing skin",
    icon: <FaSpa />,
  },
  {
    id: 6,
    title: "The Ultimate Guide to Herbal Face Packs for Every Skin Type",
    label: "Herbal face packs for every skin type",
    icon: <FaLeaf />,
  },
  {
    id: 3,
    title: "Amla, Reetha & Shikakai: The Ultimate Ayurvedic Hair Care Trio",
    label: "Amla-Reetha-Shikakai natural hair care",
    icon: <FaTint />,
  },
];

// ─── Related shop products (product-page internal links) ───
const RELATED_PRODUCTS = [
  {
    id: "multani-mitti",
    name: "ASudha Multani Mitti Face Pack",
    slug: "/product/multani-mitti",
    icon: <FaShoppingBag />,
  },
  {
    id: "ubtan",
    name: "ASudha Ubtan Powder for Glowing Skin",
    slug: "/product/ubtan",
    icon: <FaStar />,
  },
];

// ─── Mock Database for Blog Posts ───
const POST_DATA = {
  1: {
    id: 1,
    title:
      "Multani Mitti & Ubtan for Glowing Skin: The Complete Ayurvedic Guide",
    excerpt:
      "Evidence-backed guide to Multani Mitti benefits for oily skin and Ubtan for glowing skin. Learn how this 5,000-year-old Ayurvedic duo deep-cleanses, controls oil, and restores natural radiance — validated by peer-reviewed research.",
    slug: "multani-mitti-ubtan-glowing-skin",
    image: "/assets/images/blog/multani-ubtan-guide.png",
    category: "Skincare",
    tags: [
      "Multani Mitti",
      "Ubtan",
      "Multani Mitti benefits for skin",
      "Ubtan for glowing skin",
      "Fuller's Earth",
      "Ayurveda",
      "Natural Skincare",
      "Chemical Free",
      "Oil Control",
    ],
    author: "Ashram Mishra",
    authorAvatar: "/assets/images/founders/ashram.jpeg",
    authorBio:
      "Ashram Mishra is the founder of ASudha Beauty, driven by a passion for Ayurvedic wellness and a mission to bring 100% natural, chemical-free beauty products to every home. He believes that true beauty comes from the earth.",
    date: "March 15, 2026",
    modifiedDate: "March 20, 2026",
    readTime: "7 min read",
    views: 1245,
    likes: 89,
    primaryKeyword: "multani mitti benefits for skin",
    secondaryKeywords: [
      "ubtan for glowing skin",
      "fuller's earth for oily skin",
      "multani mitti face pack",
      "ayurvedic skincare routine",
    ],
    faqs: [
      {
        q: "What are the benefits of Multani Mitti for oily skin?",
        a: "Multani Mitti (Fuller's Earth) absorbs up to 200% of its weight in oil, deep-cleans pores, and gently exfoliates — making it ideal for oily and acne-prone skin. A 2025 MDPI study also confirmed its anti-aging enzyme inhibition.",
      },
      {
        q: "How do I use Ubtan for glowing skin?",
        a: "Mix 2 tablespoons of Ubtan powder with milk, curd, or rose water to form a paste. Apply to damp skin, leave for 10 minutes, then gently scrub while rinsing. Use 2–3 times per week.",
      },
      {
        q: "Can I use Multani Mitti and Ubtan together?",
        a: "Yes. Use Multani Mitti first to deep-cleanse and control oil, then apply Ubtan to nourish and brighten. This two-step ritual is the traditional Ayurvedic approach.",
      },
    ],
    content: `
      <p>In a world of 10-step routines and synthetic actives, the most powerful skincare solutions are often the ones our grandmothers swore by. <strong>Multani Mitti (Fuller's Earth)</strong> and <strong>Ubtan</strong> are two such ancient Ayurvedic formulations — and modern science is finally catching up. A 2025 study in <em>Cosmetics</em> (MDPI) confirmed that Multani Mitti inhibits key aging-related enzymes, including hyaluronidase (IC50 18 μg/mL) and tyrosinase (IC50 27 μg/mL), providing the first scientific evidence for its traditional anti-aging use <a href="https://www.mdpi.com/2079-9284/12/3/124" target="_blank" rel="noopener noreferrer">[reference:0]</a>.</p>

      <div class="highlight-box">
        <p><strong>Key takeaway:</strong> Multani Mitti controls excess oil and gently exfoliates; Ubtan brightens and nourishes. Together they form a complete, chemical-free skincare ritual.</p>
      </div>

      <h2>What Is Multani Mitti (Fuller's Earth)?</h2>
      <p>Multani Mitti is a mineral-rich calcium bentonite clay that has been used in India and the Middle East for over 2,000 years. It is best known for absorbing excess sebum — up to 200% of its weight in oil — making it the go-to remedy for <strong>oily and combination skin</strong> <a href="https://www.mdpi.com/2079-9284/12/3/124" target="_blank" rel="noopener noreferrer">[reference:1]</a>. Unlike harsh cleansers, it draws out impurities without stripping the skin barrier, which is why dermatologists still recommend <strong>Multani Mitti face packs</strong> for acne-prone skin.</p>

      <div class="benefits-grid">
        <div class="benefit-item">Deep cleansing of pores</div>
        <div class="benefit-item">Oil and sebum control</div>
        <div class="benefit-item">Gentle exfoliation</div>
        <div class="benefit-item">Cooling and soothing</div>
      </div>

      <h2>What Is Ubtan?</h2>
      <p>Ubtan is a traditional Ayurvedic blend of turmeric, sandalwood, gram flour (besan), and herbs. A PubMed-indexed evaluation of traditional Indian Ubtan formulations found significant <strong>antioxidant, sun-protection (SPF), and anti-tyrosinase activity</strong> — the latter being the mechanism behind its skin-brightening reputation <a href="https://pubmed.ncbi.nlm.nih.gov/?term=ubtan+traditional+indian+skin+care+formulation" target="_blank" rel="noopener noreferrer"></a>. In short, <strong>Ubtan for glowing skin</strong> is not folklore; it is measurable biochemistry.</p>

      <h2>Why Multani Mitti and Ubtan Work Better Together</h2>
      <p>Multani Mitti is the <em>detoxifier</em>; Ubtan is the <em>nourisher</em>. Multani Mitti pulls out excess oil and debris, while Ubtan delivers antioxidants, mild exfoliation, and a natural glow. Together they address the two most common skincare concerns — <strong>oiliness and dullness</strong> — without a single synthetic chemical.</p>

      <ul>
        <li><strong>Step 1 — Cleanse:</strong> Mix 2 tbsp Multani Mitti with rose water. Apply, leave 10–15 minutes, rinse. This removes oil and blackheads.</li>
        <li><strong>Step 2 — Nourish:</strong> Mix 2 tbsp Ubtan with milk or curd. Apply, leave 10 minutes, scrub gently while rinsing. This brightens and exfoliates.</li>
        <li><strong>Step 3 — Moisturise:</strong> Follow with a light, natural moisturiser.</li>
      </ul>
      <p>Use this ritual 2–3 times per week. Consistency matters more than intensity.</p>

      <div class="tip-box">
        <p><strong>ASudha tip:</strong> For an extra glow, add a pinch of turmeric to your Ubtan paste. Turmeric's curcuminoids are well-documented anti-inflammatory agents.</p>
      </div>

      <h2>The Science Behind the Glow</h2>
      <p>Ayurvedic skincare is often dismissed as “traditional,” but the evidence is mounting. The MDPI study identified beta-sitosterol and other bioactive compounds in Multani Mitti that bind strongly to tyrosinase and hyaluronidase — enzymes involved in pigmentation and skin aging <a href="https://www.mdpi.com/2079-9284/12/3/124" target="_blank" rel="noopener noreferrer">[reference:3]</a>. Similarly, Ubtan's anti-tyrosinase activity explains its traditional use for tan removal and uneven skin tone <a href="https://pubmed.ncbi.nlm.nih.gov/?term=ubtan+traditional+indian+skin+care+formulation" target="_blank" rel="noopener noreferrer">[reference:4]</a>.</p>

      <h2>The ASudha Promise</h2>
      <p>ASudha Beauty crafts 100% natural, paraben-free, cruelty-free Multani Mitti and Ubtan powders. No fillers, no synthetic fragrance — just the pure goodness of Ayurveda. <em>Pure. Natural. You.</em></p>
    `,
  },
  // Fallback for other IDs (so the page doesn't crash)
  2: { id: 2, title: "Ubtan for Glowing Skin", category: "Ayurveda", date: "March 10, 2026", author: "Ashish Kumar Mishra", authorAvatar: "/assets/images/founders/ashish.jpg", authorBio: "Co-founder of ASudha Beauty.", image: "/assets/images/blog/ubtan-guide.png", excerpt: "Coming soon...", content: "<p>This article is being updated.</p>", tags: [] },
  3: { id: 3, title: "Amla, Reetha & Shikakai for Hair", category: "Hair Care", date: "March 5, 2026", author: "Ashram Mishra", authorAvatar: "/assets/images/founders/ashram.jpeg", authorBio: "Founder of ASudha Beauty.", image: "/assets/images/blog/hair-care-trio.png", excerpt: "Coming soon...", content: "<p>This article is being updated.</p>", tags: [] },
  4: { id: 4, title: "5 Simple Ways to Add Ayurvedic Powders", category: "Beauty Tips", date: "February 28, 2026", author: "Ashish Kumar Mishra", authorAvatar: "/assets/images/founders/ashish.jpg", authorBio: "Co-founder of ASudha Beauty.", image: "/assets/images/blog/daily-ayurvedic-routine.png", excerpt: "Coming soon...", content: "<p>This article is being updated.</p>", tags: [] },
  5: { id: 5, title: "Clean Beauty in India", category: "Beauty Trends", date: "February 20, 2026", author: "Ashram Mishra", authorAvatar: "/assets/images/founders/ashram.jpeg", authorBio: "Founder of ASudha Beauty.", image: "/assets/images/blog/clean-beauty-ayurveda.png", excerpt: "Coming soon...", content: "<p>This article is being updated.</p>", tags: [] },
  6: { id: 6, title: "Herbal Face Pack Guide", category: "Skincare", date: "February 12, 2026", author: "Ashish Kumar Mishra", authorAvatar: "/assets/images/founders/ashish.jpg", authorBio: "Co-founder of ASudha Beauty.", image: "/assets/images/blog/herbal-face-packs.png", excerpt: "Coming soon...", content: "<p>This article is being updated.</p>", tags: [] },
  7: { id: 7, title: "Science Behind Ayurvedic Herbs", category: "Ayurveda", date: "February 5, 2026", author: "Ashram Mishra", authorAvatar: "/assets/images/founders/ashram.jpeg", authorBio: "Founder of ASudha Beauty.", image: "/assets/images/blog/ayurvedic-science.png", excerpt: "Coming soon...", content: "<p>This article is being updated.</p>", tags: [] },
};

const BlogPost = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommentPosted, setIsCommentPosted] = useState(false);
  const [avatarErrors, setAvatarErrors] = useState({});
  
  // ✅ ADDED: State to handle author avatar load errors
  const [authorAvatarError, setAuthorAvatarError] = useState(false);

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

  // Dynamically load the post based on the URL id
  const post = POST_DATA[id] || POST_DATA[1];

  // ✅ Reset author avatar error state when the post changes
  useEffect(() => {
    setAuthorAvatarError(false);
  }, [id]);

  const articleUrl = `${SITE_URL}/blog/${post.id}/${post.slug || ""}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ─── Handlers ───
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

  // ─── Injected CSS ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-blogpost-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-blogpost-styles", "true");
    style.textContent = `
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

      /* In-content citation links */
      .post-content a {
        color: ${isDarkMode ? brandColors.gold : brandColors.bronze};
        text-decoration: underline;
        font-weight: 600;
        transition: color 0.2s ease;
      }
      .post-content a:hover {
        color: ${isDarkMode ? brandColors.primary : brandColors.primary};
      }

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
      }
      .post-content .tip-box p { margin: 0; font-size: 1rem; }

      /* Hover interactions */
      .back-btn { transition: all 0.3s ease; }
      .back-btn:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        transform: translateX(-4px);
      }
      .tag { transition: all 0.25s ease; }
      .tag:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        transform: translateY(-2px);
      }
      .action-btn { transition: all 0.25s ease; }
      .action-btn:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        transform: translateY(-2px);
      }
      .share-btn { transition: all 0.25s ease; }
      .share-btn:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.black : "#ffffff"
        } !important;
        transform: translateY(-3px);
      }
      .comment-btn { transition: all 0.3s ease; }
      .comment-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(245, 52, 107, 0.5);
      }
      .comment-input { transition: border-color 0.25s ease, box-shadow 0.25s ease; }
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
      .related-link { transition: all 0.25s ease; }
      .related-link:hover {
        color: ${isDarkMode ? brandColors.gold : brandColors.bronze} !important;
        gap: 0.6rem;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-blogpost-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  // ─── Theme styles ───
  const themeStyles = {
    container: {
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100%",
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
    },
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
    mainContent: {
      maxWidth: "820px",
      margin: "0 auto",
      padding: isNarrow ? "2rem 1.25rem" : "3.5rem 2rem",
    },
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
    postTitle: {
      fontSize: isMobile ? "1.65rem" : isNarrow ? "2rem" : "2.5rem",
      fontWeight: "900",
      lineHeight: "1.2",
      letterSpacing: "-0.5px",
      color: T.text,
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    titleUnderline: {
      width: "80px",
      height: "4px",
      margin: "0 auto 2rem",
      borderRadius: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
    },
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
    authorDetails: { flex: 1, minWidth: 0 },
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
    postContent: { marginBottom: "3rem" },
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
    tagsContainer: { display: "flex", flexWrap: "wrap", gap: "0.5rem" },
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
    actionsSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "3rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    actionButtons: { display: "flex", gap: "0.75rem" },
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
    shareButtons: { display: "flex", gap: "0.5rem" },
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
    // ─── Related reading (internal links) ───
    relatedSection: {
      marginBottom: "3rem",
      padding: "1.75rem",
      backgroundColor: T.card,
      borderRadius: "20px",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
    },
    relatedTitle: {
      fontSize: "1.1rem",
      fontWeight: "800",
      color: T.text,
      marginBottom: "1.25rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    relatedList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    relatedLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
      padding: "0.7rem 0.9rem",
      borderRadius: "10px",
      fontSize: "0.88rem",
      fontWeight: "600",
      color: T.textMuted,
      textDecoration: "none",
      border: `1px solid ${T.borderSoft}`,
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.02)"
        : "rgba(62, 39, 35, 0.02)",
    },
    relatedIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      flexShrink: 0,
    },
    // ─── Sources / citations block ───
    citationSection: {
      marginBottom: "3rem",
      padding: "1.5rem 1.75rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.06)"
        : "rgba(212, 175, 55, 0.04)",
      borderRadius: "16px",
      border: isDarkMode
        ? "1px solid rgba(212, 175, 55, 0.15)"
        : "1px solid rgba(212, 175, 55, 0.12)",
      borderLeft: `4px solid ${brandColors.goldDark}`,
    },
    citationTitle: {
      fontSize: "0.85rem",
      fontWeight: "800",
      color: isDarkMode ? brandColors.gold : brandColors.earthDark,
      marginBottom: "0.85rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    citationList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.55rem",
    },
    citationLink: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.5rem",
      fontSize: "0.82rem",
      fontWeight: "600",
      color: T.textMuted,
      textDecoration: "none",
      lineHeight: 1.5,
    },
    citationDomain: {
      fontSize: "0.7rem",
      color: T.textDim,
      marginTop: "0.1rem",
    },
    // ─── Comments ───
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
    commentList: { display: "flex", flexDirection: "column", gap: "1rem" },
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
    commentInfo: { flex: 1, minWidth: 0 },
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
      {/* ─── SEO: Meta + JSON-LD handled by SEO Component ─── */}
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.secondaryKeywords || post.tags}
        url={`/blog/${post.id}`}
        type="article"
        publishedTime={new Date(post.date).toISOString()}
        modifiedTime={new Date(post.modifiedDate || post.date).toISOString()}
        author={post.author}
        authorUrl={`${SITE_URL}/about`}
        tags={post.tags}
        citations={Object.values(CITATIONS).map((c) => ({
          label: c.label,
          href: c.url,
        }))}
        faqs={post.faqs} 
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.id}` }
        ]}
      />

      {/* Hero */}
      <section style={themeStyles.hero} aria-label="Article cover image">
        <div style={themeStyles.heroOrb} aria-hidden="true" />
        <img
          src={post.image}
          alt={`${post.title} — Ayurvedic skincare guide by ASudha Beauty`}
          style={themeStyles.heroImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/1200x600/fcf8f5/3e2723?text=" +
              encodeURIComponent(post.title);
          }}
        />
        <div style={themeStyles.heroBottomFade} aria-hidden="true" />
        <Link to="/blog" style={themeStyles.backButton} className="back-btn">
          <FaArrowLeft aria-hidden="true" /> Back to Blog
        </Link>
      </section>

      {/* Main Content */}
      <main style={themeStyles.mainContent}>
        {/* Category */}
        <div style={themeStyles.categoryBadgeWrap}>
          <span style={themeStyles.categoryBadge}>
            <FaLeaf aria-hidden="true" style={{ fontSize: "0.65rem" }} />
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 style={themeStyles.postTitle}>{post.title}</h1>
        <div style={themeStyles.titleUnderline} aria-hidden="true" />

        {/* Meta */}
        <div style={themeStyles.postMeta}>
          <span style={themeStyles.metaItem}>
            <FaUser aria-hidden="true" style={themeStyles.metaIcon} />{" "}
            {post.author}
          </span>
          <span style={themeStyles.metaItem}>
            <FaClock aria-hidden="true" style={themeStyles.metaIcon} />{" "}
            {post.readTime || "5 min read"}
          </span>
          <span style={themeStyles.metaItem}>
            <FaComment aria-hidden="true" style={themeStyles.metaIcon} />{" "}
            {comments.length} comments
          </span>
          <span style={themeStyles.metaItem}>
            <FaEye aria-hidden="true" style={themeStyles.metaIcon} />{" "}
            {post.views || 1245} views
          </span>
        </div>

        {/* Author card */}
        <div style={themeStyles.authorInfo}>
          <div style={themeStyles.authorAccent} aria-hidden="true" />
          {/* ✅ FIXED: Handles missing images gracefully with a React icon fallback */}
          {post.authorAvatar && !authorAvatarError ? (
            <div style={themeStyles.authorAvatar}>
              <img
                src={post.authorAvatar}
                alt={`${post.author} — founder of ASudha Beauty`}
                style={themeStyles.authorAvatarInner}
                onError={() => setAuthorAvatarError(true)}
              />
            </div>
          ) : (
            <div style={themeStyles.authorAvatarFallback}>
              <FaUserCircle aria-hidden="true" />
            </div>
          )}
          <div style={themeStyles.authorDetails}>
            <div style={themeStyles.authorName}>
              {post.author}
              <span style={themeStyles.authorVerified}>
                <FaCheckCircle
                  aria-hidden="true"
                  style={{ fontSize: "0.5rem" }}
                />{" "}
                Verified
              </span>
            </div>
            <div style={themeStyles.authorBio}>
              {post.authorBio || "Ayurvedic beauty expert."}
            </div>
          </div>
        </div>

        {/* Post content */}
        <article
          style={themeStyles.postContent}
          className="post-content"
          dangerouslySetInnerHTML={renderContent()}
        />

        {/* Pull quote */}
        <div style={themeStyles.pullQuote}>
          <FaQuoteLeft style={themeStyles.pullQuoteIcon} aria-hidden="true" />
          Pure. Natural. You. — The ASudha promise, woven into every grain of
          our powders.
        </div>

        {/* Tags */}
        <section
          style={themeStyles.tagsSection}
          aria-labelledby="post-tags-title"
        >
          <h4 id="post-tags-title" style={themeStyles.tagsTitle}>
            <FaTags aria-hidden="true" style={{ fontSize: "0.8rem" }} />
            Explore More Ayurvedic Topics
          </h4>
          <div style={themeStyles.tagsContainer}>
            {(post.tags || []).map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                style={themeStyles.tag}
                className="tag"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section
          style={themeStyles.actionsSection}
          aria-label="Like and share this article"
        >
          <div style={themeStyles.actionButtons}>
            <button
              type="button"
              style={{
                ...themeStyles.actionButton,
                ...(liked && themeStyles.activeActionButton),
              }}
              className="action-btn"
              onClick={() => setLiked(!liked)}
              aria-pressed={liked}
              aria-label={liked ? "Unlike this article" : "Like this article"}
            >
              <FaHeart aria-hidden="true" /> {liked ? "Liked" : "Like"} (
              {(post.likes || 0) + (liked ? 1 : 0)})
            </button>
          </div>
          <div style={themeStyles.shareButtons}>
            <button
              type="button"
              style={themeStyles.shareButton}
              className="share-btn"
              onClick={handleShare}
              aria-label="Share this article"
            >
              <FaShare aria-hidden="true" />
            </button>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                articleUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.shareButton}
              className="share-btn"
              aria-label="Share on Facebook"
            >
              <FaFacebook aria-hidden="true" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                articleUrl
              )}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.shareButton}
              className="share-btn"
              aria-label="Share on Twitter"
            >
              <FaTwitter aria-hidden="true" />
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                articleUrl
              )}&media=${encodeURIComponent(
                `${SITE_URL}${post.image}`
              )}&description=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.shareButton}
              className="share-btn"
              aria-label="Share on Pinterest"
            >
              <FaPinterest aria-hidden="true" />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(
                post.title
              )}&body=${encodeURIComponent(articleUrl)}`}
              style={themeStyles.shareButton}
              className="share-btn"
              aria-label="Share via Email"
            >
              <FaEnvelope aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* ─── Related reading: internal backlinks ─── */}
        <section
          style={themeStyles.relatedSection}
          aria-labelledby="related-reading-title"
        >
          <h3 id="related-reading-title" style={themeStyles.relatedTitle}>
            <FaBookOpen aria-hidden="true" /> Related Reading
          </h3>
          <ul style={themeStyles.relatedList}>
            {RELATED_POSTS.map((rp) => (
              <li key={rp.id}>
                <Link
                  to={`/blog/${rp.id}`}
                  style={themeStyles.relatedLink}
                  className="related-link"
                  aria-label={`Read more: ${rp.title}`}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={themeStyles.relatedIcon} aria-hidden="true">
                      {rp.icon}
                    </span>
                    {rp.label}
                  </span>
                  <FaArrowRight
                    aria-hidden="true"
                    style={{ fontSize: "0.65rem", flexShrink: 0 }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Sources & citations (E-E-A-T) ─── */}
        <section
          style={themeStyles.citationSection}
          aria-labelledby="sources-title"
        >
          <h3 id="sources-title" style={themeStyles.citationTitle}>
            <FaFlask aria-hidden="true" /> Sources &amp; Further Reading
          </h3>
          <ul style={themeStyles.citationList}>
            {Object.values(CITATIONS).map((c) => (
              <li key={c.url}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={themeStyles.citationLink}
                  aria-label={`${c.label} — opens in new tab`}
                >
                  <FaExternalLinkAlt
                    aria-hidden="true"
                    style={{
                      fontSize: "0.65rem",
                      marginTop: "0.2rem",
                      flexShrink: 0,
                      color: isDarkMode
                        ? brandColors.gold
                        : brandColors.bronze,
                    }}
                  />
                  <span>
                    {c.label}
                    <div style={themeStyles.citationDomain}>{c.domain}</div>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Related products (internal links to shop) ─── */}
        <section
          style={themeStyles.relatedSection}
          aria-labelledby="shop-products-title"
        >
          <h3 id="shop-products-title" style={themeStyles.relatedTitle}>
            <FaShoppingBag aria-hidden="true" /> Shop the Ritual
          </h3>
          <ul style={themeStyles.relatedList}>
            {RELATED_PRODUCTS.map((p) => (
              <li key={p.id}>
                <Link
                  to={p.slug}
                  style={themeStyles.relatedLink}
                  className="related-link"
                  aria-label={`Shop ${p.name}`}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={themeStyles.relatedIcon} aria-hidden="true">
                      {p.icon}
                    </span>
                    {p.name}
                  </span>
                  <FaArrowRight
                    aria-hidden="true"
                    style={{ fontSize: "0.65rem", flexShrink: 0 }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Comments ─── */}
        <section
          style={themeStyles.commentsSection}
          aria-labelledby="comments-title"
        >
          <div style={themeStyles.commentsHeader}>
            <h3 id="comments-title" style={themeStyles.commentsTitle}>
              Join the Conversation
            </h3>
            <span style={themeStyles.commentsCount}>
              {comments.length} comments
            </span>
          </div>

          <form style={themeStyles.commentForm} onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Share your Ayurvedic skincare experience…"
              style={themeStyles.commentInput}
              className="comment-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              aria-label="Write a comment"
            />
            <button
              type="submit"
              style={themeStyles.commentButton}
              className="comment-btn"
            >
              Post Comment
            </button>
            {isCommentPosted && (
              <div style={themeStyles.commentSuccess} role="status">
                <FaCheckCircle aria-hidden="true" /> Your comment has been
                posted!
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
                      alt={`${c.name} — verified reader`}
                      style={themeStyles.commentAvatar}
                      onError={() => handleAvatarError(c.id)}
                      loading="lazy"
                    />
                  ) : (
                    <div style={themeStyles.commentAvatarFallback}>
                      <FaUserCircle aria-hidden="true" />
                    </div>
                  )}
                  <div style={themeStyles.commentInfo}>
                    <div style={themeStyles.commentName}>
                      {c.name}
                      {c.verified && (
                        <span style={themeStyles.commentVerified}>
                          <FaCheckCircle
                            aria-hidden="true"
                            style={{ fontSize: "0.4rem" }}
                          />{" "}
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
        </section>
      </main>
    </div>
  );
};

export default BlogPost;