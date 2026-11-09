// src/pages/BlogPost.jsx
import React, { useState, useEffect, useLayoutEffect } from "react";
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
    id: 1,
    title: "Multani Mitti & Ubtan for Glowing Skin",
    label: "Multani Mitti for oily skin",
    icon: <FaSpa />,
  },
  {
    id: 3,
    title: "Amla, Reetha & Shikakai: The Ultimate Ayurvedic Hair Care Trio",
    label: "Amla-Reetha-Shikakai natural hair care",
    icon: <FaTint />,
  },
  {
    id: 6,
    title: "The Ultimate Guide to Herbal Face Packs for Every Skin Type",
    label: "Herbal face packs for every skin type",
    icon: <FaLeaf />,
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
      "Multani Mitti for Oily Skin & Ubtan for Glowing Skin: Complete Ayurvedic Guide (2026)",
    excerpt:
      "Evidence-backed guide to Multani Mitti benefits for oily skin and Ubtan for glowing skin. Learn how this 5,000-year-old Ayurvedic duo deep-cleanses, controls oil, and restores natural radiance — validated by peer-reviewed research.",
    slug: "multani-mitti-ubtan-glowing-skin",
    image: "/assets/images/blog/multani-ubtan-guide.png",
    category: "Skincare",
    tags: ["Multani Mitti", "Ubtan", "Oily Skin", "Glowing Skin", "Ayurveda"],
    author: "Ashram Mishra",
    authorAvatar: "/assets/images/founders/ashram.jpeg",
    authorBio: "Ashram Mishra is the founder of ASudha Beauty, driven by a passion for Ayurvedic wellness.",
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
    ],
    faqs: [
      {
        q: "What are the benefits of Multani Mitti for oily skin?",
        a: "Multani Mitti (Fuller's Earth) absorbs up to 200% of its weight in oil, deep-cleans pores, and gently exfoliates — making it ideal for oily and acne-prone skin.",
      },
      {
        q: "How do I use Ubtan for glowing skin?",
        a: "Mix 2 tablespoons of Ubtan powder with milk, curd, or rose water to form a paste. Apply to damp skin, leave for 10 minutes, then gently scrub while rinsing.",
      },
    ],
    content: `
      <p>In a world of 10-step routines and synthetic actives, the most powerful skincare solutions are often the ones our grandmothers swore by. <strong>Multani Mitti (Fuller's Earth)</strong> and <strong>Ubtan</strong> are two such ancient Ayurvedic formulations — and modern science is finally catching up. A 2025 study in <em>Cosmetics</em> (MDPI) confirmed that Multani Mitti inhibits key aging-related enzymes, providing the first scientific evidence for its traditional anti-aging use <a href="https://www.mdpi.com/2079-9284/12/3/124" target="_blank" rel="noopener noreferrer">[reference:0]</a>.</p>

      <div class="highlight-box">
        <p><strong>Key takeaway:</strong> Multani Mitti controls excess oil and gently exfoliates; Ubtan brightens and nourishes. Together they form a complete, chemical-free skincare ritual.</p>
      </div>

      <h2>What Is Multani Mitti (Fuller's Earth)?</h2>
      <p>Multani Mitti is a mineral-rich calcium bentonite clay that has been used in India for over 2,000 years. It is best known for absorbing excess sebum — up to 200% of its weight in oil — making it the go-to remedy for <strong>oily and combination skin</strong> <a href="https://www.mdpi.com/2079-9284/12/3/124" target="_blank" rel="noopener noreferrer">[reference:1]</a>.</p>

      <h2>What Is Ubtan?</h2>
      <p>Ubtan is a traditional Ayurvedic blend of turmeric, sandalwood, gram flour (besan), and herbs. A PubMed-indexed evaluation of traditional Indian Ubtan formulations found significant <strong>antioxidant, sun-protection (SPF), and anti-tyrosinase activity</strong> — the latter being the mechanism behind its skin-brightening reputation <a href="https://pubmed.ncbi.nlm.nih.gov/?term=ubtan+traditional+indian+skin+care+formulation" target="_blank" rel="noopener noreferrer"></a>. In short, <strong>Ubtan for glowing skin</strong> is not folklore; it is measurable biochemistry.</p>

      <h2>Why Multani Mitti and Ubtan Work Better Together</h2>
      <p>Multani Mitti is the <em>detoxifier</em>; Ubtan is the <em>nourisher</em>. Multani Mitti pulls out excess oil and debris, while Ubtan delivers antioxidants, mild exfoliation, and a natural glow. Together they address the two most common skincare concerns — <strong>oiliness and dullness</strong> — without a single synthetic chemical.</p>

      <ul>
        <li><strong>Step 1 — Cleanse:</strong> Mix 2 tbsp Multani Mitti with rose water. Apply, leave 10–15 minutes, rinse.</li>
        <li><strong>Step 2 — Nourish:</strong> Mix 2 tbsp Ubtan with milk or curd. Apply, leave 10 minutes, scrub gently while rinsing.</li>
        <li><strong>Step 3 — Moisturise:</strong> Follow with a light, natural moisturiser.</li>
      </ul>

      <h2>The ASudha Promise</h2>
      <p>ASudha Beauty crafts 100% natural, paraben-free, cruelty-free Multani Mitti and Ubtan powders. No fillers, no synthetic fragrance — just the pure goodness of Ayurveda. <em>Pure. Natural. You.</em></p>
    `,
  },
  2: {
    id: 2,
    title: "Ubtan for Glowing Skin: The 5000-Year-Old Ayurvedic Ritual",
    excerpt: "Ubtan has been a staple in Indian households for centuries. Learn how this traditional turmeric, sandalwood & besan blend gives you a chemical-free glow without harsh side effects.",
    slug: "ubtan-for-glowing-skin",
    image: "/assets/images/blog/ubtan-guide.png",
    category: "Ayurveda",
    tags: ["Ubtan", "Glowing Skin", "Turmeric", "Natural Glow", "Ayurveda"],
    author: "Ashish Kumar Mishra",
    authorAvatar: "/assets/images/founders/ashish.jpg",
    authorBio: "Ashish Kumar Mishra is the co-founder of ASudha Beauty, focused on bringing traditional Ayurvedic remedies to modern routines.",
    date: "March 10, 2026",
    readTime: "6 min read",
    views: 987,
    likes: 54,
    primaryKeyword: "ubtan for glowing skin",
    faqs: [
      {
        q: "What are the main ingredients in Ubtan?",
        a: "Traditional Ubtan is made from a blend of gram flour (besan), turmeric, sandalwood powder, and sometimes milk or rose water. ASudha's Ubtan uses 100% natural, chemical-free ingredients.",
      }
    ],
    content: `
      <p>If you've ever attended an Indian wedding, you've likely heard of the "haldi ceremony" or the "ubtan ritual." For centuries, brides and grooms have been massaged with a thick, fragrant paste known as <strong>Ubtan</strong> to cleanse, exfoliate, and brighten their skin before the big day. But Ubtan isn't just a wedding tradition — it's a powerful, science-backed skincare treatment that anyone can use.</p>

      <div class="highlight-box">
        <p><strong>The Science of Ubtan:</strong> Ubtan is packed with curcumin (from turmeric), which is a potent anti-inflammatory, and saponins (from besan), which gently cleanse the skin without stripping its natural oils.</p>
      </div>

      <h2>Why is Ubtan a Skincare Powerhouse?</h2>
      <p>Unlike harsh chemical scrubs that use microplastics to exfoliate, Ubtan uses natural grain powders to gently slough off dead skin cells. The turmeric in Ubtan helps reduce hyperpigmentation, calm acne, and give the skin a natural, golden glow.</p>

      <h2>How to Use Ubtan for Glowing Skin</h2>
      <p>You can use Ubtan as a daily face wash or a weekly face mask. Here is the best way to use it:</p>
      <ul>
        <li><strong>For Oily Skin:</strong> Mix Ubtan powder with rose water or plain yogurt. Apply, leave for 10 minutes, and wash off with a gentle circular motion.</li>
        <li><strong>For Dry Skin:</strong> Mix Ubtan powder with raw milk or a few drops of honey. Massage gently and rinse with lukewarm water.</li>
      </ul>

      <h2>The ASudha Guarantee</h2>
      <p>Many commercial Ubtan powders contain synthetic fragrances and dyes. ASudha Beauty's Ubtan is 100% natural, paraben-free, and cruelty-free. Experience the ancient ritual, validated by modern science.</p>
    `,
  },
  3: {
    id: 3,
    title: "Amla, Reetha & Shikakai for Hair: The Ultimate Natural Hair Care Trio",
    excerpt: "Ditch chemical-laden shampoos. Discover how the ancient combination of Amla, Reetha, and Shikakai restores hair strength, shine, and vitality.",
    slug: "amla-reetha-shikakai-hair-care",
    image: "/assets/images/blog/hair-care-trio.png",
    category: "Hair Care",
    tags: ["Amla", "Reetha", "Shikakai", "Natural Shampoo", "Hair Fall"],
    author: "Ashram Mishra",
    authorAvatar: "/assets/images/founders/ashram.jpeg",
    authorBio: "Ashram Mishra is the founder of ASudha Beauty, driven by a passion for Ayurvedic wellness.",
    date: "March 5, 2026",
    readTime: "7 min read",
    views: 1543,
    likes: 112,
    primaryKeyword: "amla reetha shikakai for hair",
    faqs: [
      {
        q: "Can Amla Reetha Shikakai stop hair fall?",
        a: "Yes. Amla strengthens the hair roots, Reetha gently cleanses the scalp, and Shikakai conditions the hair, collectively reducing hair fall and dandruff.",
      }
    ],
    content: `
      <p>Before the era of plastic bottles and chemical foaming agents, Indian households relied on nature for healthy hair. The ultimate trio — <strong>Amla, Reetha, and Shikakai</strong> — has been the cornerstone of Ayurvedic hair care for thousands of years. Modern hair care is finally catching up to what our ancestors knew: chemical-free is the best way to maintain healthy hair.</p>

      <div class="benefits-grid">
        <div class="benefit-item"><strong>Amla:</strong> Vitamin C powerhouse that prevents premature greying and strengthens roots.</div>
        <div class="benefit-item"><strong>Reetha:</strong> Nature's soap. Contains saponins that gently cleanse the scalp without stripping natural oils.</div>
        <div class="benefit-item"><strong>Shikakai:</strong> The ultimate natural conditioner. Detangles hair and adds a lustrous shine.</div>
      </div>

      <h2>The Benefits of Going Chemical-Free</h2>
      <p>Commercial shampoos often contain sulfates and parabens that strip your hair of its natural moisture, leading to frizz, split ends, and eventually, hair fall. Amla, Reetha, and Shikakai provide a gentle, natural alternative that balances the scalp's pH and nourishes the hair shaft.</p>

      <h2>How to Make a Natural Shampoo Paste</h2>
      <p>Mix equal parts of Amla, Reetha, and Shikakai powder. Add warm water to form a thick paste. Let it sit for a few hours (or overnight) to activate the saponins in the Reetha. Apply the paste to your scalp, massage gently, and rinse thoroughly. It won't produce thick chemical foam, but your hair will feel incredibly clean and soft.</p>
    `,
  },
  4: {
    id: 4,
    title: "5 Simple Ways to Add Ayurvedic Powders to Your Daily Skincare Routine",
    excerpt: "Wondering how to use Multani Mitti, Ubtan, and herbal hair powders? Here are 5 practical, easy ways to build a natural beauty ritual.",
    slug: "daily-ayurvedic-routine",
    image: "/assets/images/blog/daily-ayurvedic-routine.png",
    category: "Beauty Tips",
    tags: ["Ayurvedic Skincare Routine", "Daily Routine", "Natural Beauty"],
    author: "Ashish Kumar Mishra",
    authorAvatar: "/assets/images/founders/ashish.jpg",
    authorBio: "Ashish Kumar Mishra is the co-founder of ASudha Beauty.",
    date: "February 28, 2026",
    readTime: "4 min read",
    views: 876,
    likes: 67,
    primaryKeyword: "ayurvedic skincare routine",
    faqs: [],
    content: `
      <p>Starting an Ayurvedic skincare routine might seem overwhelming, but it doesn't have to be. You don't need 20 different products; you just need a few high-quality, natural ingredients. Here are five simple ways to incorporate Ayurvedic powders into your daily life.</p>

      <h2>1. The 3-Minute Morning Cleanse</h2>
      <p>Instead of a harsh foaming cleanser, mix a teaspoon of Ubtan powder with a little water and gently rub it onto your damp face. Rinse it off to reveal an instant, natural glow.</p>

      <h2>2. The Weekly Detox Mask</h2>
      <p>Once a week, take 2 tablespoons of Multani Mitti and mix it with rose water. Apply it as a mask, leave it for 10 minutes, and wash off. It acts like a magnet for excess oil and impurities.</p>

      <h2>3. The Pre-Shampoo Hair Oil Treatment</h2>
      <p>Mix Amla powder with warm coconut oil. Massage it into your scalp and leave it on for 30 minutes before washing. It deeply nourishes the roots and prevents premature greying.</p>

      <h2>4. The Targeted Spot Treatment</h2>
      <p>For a stubborn pimple, mix a pinch of Multani Mitti with a drop of tea tree oil and water. Apply it directly to the blemish overnight to reduce inflammation.</p>

      <h2>5. The Foot Soak</h2>
      <p>Add a spoonful of Reetha powder to a tub of warm water. It acts as a gentle cleanser and deodorizer, leaving your feet feeling fresh and relaxed.</p>
    `,
  },
  5: {
    id: 5,
    title: "Clean Beauty in India: Why 100% Natural, Chemical-Free Powders Matter",
    excerpt: "Clean beauty is more than a trend — it's a health choice. Discover why switching to paraben-free, chemical-free herbal powders matters.",
    slug: "clean-beauty-india",
    image: "/assets/images/blog/clean-beauty-ayurveda.png",
    category: "Beauty Trends",
    tags: ["Clean Beauty", "Chemical Free", "Paraben Free", "Natural Beauty"],
    author: "Ashram Mishra",
    authorAvatar: "/assets/images/founders/ashram.jpeg",
    authorBio: "Founder of ASudha Beauty.",
    date: "February 20, 2026",
    readTime: "5 min read",
    views: 1120,
    likes: 103,
    primaryKeyword: "chemical free skincare",
    faqs: [],
    content: `
      <p>The global "clean beauty" movement has finally taken root in India. Consumers are becoming increasingly aware of the ingredients in their skincare products, and they are demanding safer, more natural alternatives. But what does "clean beauty" actually mean, and why is it so important?</p>

      <h2>What is Clean Beauty?</h2>
      <p>Clean beauty refers to products formulated without known toxins or harmful chemicals. This includes avoiding parabens, sulfates, synthetic fragrances, and phthalates. Ayurvedic powders, like Multani Mitti and Ubtan, are the original clean beauty products.</p>

      <h2>Why You Should Make the Switch</h2>
      <p>Your skin is your largest organ. What you put on it gets absorbed into your bloodstream. Chemical preservatives like parabens have been linked to hormonal imbalances. By switching to 100% natural, chemical-free powders, you are not just avoiding harsh chemicals; you are nourishing your skin with vitamins, minerals, and antioxidants.</p>

      <h2>The ASudha Commitment</h2>
      <p>At ASudha Beauty, we believe that nature provides everything we need for healthy skin. Our products are 100% natural, cruelty-free, and free from synthetic fillers. We are proud to be part of the clean beauty revolution in India.</p>
    `,
  },
  6: {
    id: 6,
    title: "Herbal Face Pack for Glowing Skin: The Ultimate Guide for Every Skin Type",
    excerpt: "From oily to dry to sensitive, find the perfect natural face pack. Explore how ingredients like Multani Mitti and Ubtan transform your complexion.",
    slug: "herbal-face-pack-guide",
    image: "/assets/images/blog/herbal-face-packs.png",
    category: "Skincare",
    tags: ["Herbal Face Pack", "Natural Face Pack", "Multani Mitti", "Ubtan"],
    author: "Ashish Kumar Mishra",
    authorAvatar: "/assets/images/founders/ashish.jpg",
    authorBio: "Co-founder of ASudha Beauty.",
    date: "February 12, 2026",
    readTime: "8 min read",
    views: 2100,
    likes: 178,
    primaryKeyword: "herbal face pack for glowing skin",
    faqs: [
      {
        q: "Which natural face pack is best for oily skin?",
        a: "Multani Mitti (Fuller's Earth) mixed with rose water is the best natural face pack for oily skin, as it absorbs excess sebum and tightens pores.",
      }
    ],
    content: `
      <p>There is no one-size-fits-all solution in skincare. A mask that works wonders for your friend with oily skin might cause a breakout on your dry skin. This is why Ayurveda emphasizes personalized, balancing routines. Here is how to choose the right herbal face pack for your specific skin type.</p>

      <h2>For Oily and Acne-Prone Skin</h2>
      <p><strong>The Hero Ingredient:</strong> Multani Mitti.<br/>
      Multani Mitti is highly absorbent and acts like a magnet for excess oil. Mix 2 tablespoons with rose water or mint tea. Leave it on for 10 minutes. Do not let it dry completely to avoid over-drying the skin.</p>

      <h2>For Dry and Flaky Skin</h2>
      <p><strong>The Hero Ingredient:</strong> Ubtan.<br/>
      Ubtan contains gram flour and turmeric, which gently exfoliate without stripping moisture. Mix Ubtan powder with raw milk, yogurt, or honey to create a hydrating paste. Rinse gently after 10 minutes.</p>

      <h2>For Sensitive Skin</h2>
      <p><strong>The Hero Ingredient:</strong> Sandalwood (Chandan) or Multani Mitti.<br/>
      If your skin reacts easily, stick to cooling and soothing ingredients. Multani Mitti mixed with plain water or aloe vera gel can calm redness without irritating the skin.</p>

      <h2>The Golden Rule</h2>
      <p>Always do a patch test on your inner arm before applying any new face pack. And remember, consistency is key. A 10-minute mask once a week will yield better results than a 30-minute mask once a month.</p>
    `,
  },
  7: {
    id: 7,
    title: "The Science Behind Ayurvedic Herbs: Why Amla, Reetha & Shikakai Work",
    excerpt: "Ayurveda is rooted in ancient wisdom — and modern science explains why. Discover the clinical evidence behind Amla, Reetha, and Shikakai.",
    slug: "science-behind-ayurvedic-herbs",
    image: "/assets/images/blog/ayurvedic-science.png",
    category: "Ayurveda",
    tags: ["Ayurvedic Herbs", "Amla", "Reetha", "Shikakai", "Science"],
    author: "Ashram Mishra",
    authorAvatar: "/assets/images/founders/ashram.jpeg",
    authorBio: "Founder of ASudha Beauty.",
    date: "February 5, 2026",
    readTime: "6 min read",
    views: 1342,
    likes: 94,
    primaryKeyword: "ayurvedic herbs science",
    faqs: [],
    content: `
      <p>Many people view Ayurveda as purely "traditional" or "folklore." However, modern biochemistry is increasingly validating the claims made by ancient Ayurvedic texts. The combination of Amla, Reetha, and Shikakai is a perfect example of this intersection between ancient wisdom and modern science.</p>

      <h2>Amla (Indian Gooseberry)</h2>
      <p><strong>The Science:</strong> Amla is incredibly rich in Vitamin C and polyphenols. Studies show that its high antioxidant content inhibits the activity of 5-alpha-reductase, an enzyme linked to hair loss. It also promotes collagen synthesis when used on the skin.</p>

      <h2>Reetha (Soapnut)</h2>
      <p><strong>The Science:</strong> Reetha contains natural saponins—plant-based glycosides that act as surfactants. When mixed with water, they create a mild lather that lifts dirt and oil from the scalp. Unlike synthetic sulfates (like SLS), Reetha's natural saponins do not strip the hair of its natural oils.</p>

      <h2>Shikakai (Acacia concinna)</h2>
      <p><strong>The Science:</strong> Shikakai is naturally acidic. This low pH helps close the hair cuticles, which locks in moisture and adds an incredible shine. It also contains compounds with antifungal and antibacterial properties, helping to keep dandruff at bay.</p>

      <h2>The Takeaway</h2>
      <p>When you use Ayurvedic herbs, you aren't just following a tradition; you are using ingredients that have been time-tested for thousands of years and are now backed by modern clinical research.</p>
    `,
  },
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
  const [authorAvatarError, setAuthorAvatarError] = useState(false);

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "/assets/images/team/priya.jpg",
      date: "March 16, 2026",
      text: "I've been using ASudha's Multani Mitti for 3 weeks now, and the difference in my skin is incredible! My oily T-zone is finally under control.",
      verified: true,
    },
    {
      id: 2,
      name: "Rahul Verma",
      avatar: "/assets/images/team/michael.jpg",
      date: "March 15, 2026",
      text: "I never knew Ubtan had so many benefits! I tried the honey and milk mix and my skin feels so soft and glowing.",
      verified: false,
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

  const post = POST_DATA[id] || POST_DATA[1];

  useEffect(() => {
    setAuthorAvatarError(false);
  }, [id]);

  const articleUrl = `${SITE_URL}/blog/${post.id}/${post.slug || ""}`;

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
          isDarkMode ? "rgba(212, 175, 55, 0.28)" : "rgba(212, 175, 55, 0.2)"
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
          isDarkMode ? "rgba(212, 175, 55, 0.16)" : "rgba(212, 175, 55, 0.12)"
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
          isDarkMode ? "rgba(76, 175, 80, 0.28)" : "rgba(76, 175, 80, 0.18)"
        };
        border-radius: 18px;
        padding: 1.5rem 1.75rem;
        margin: 2rem 0;
        border-left: 4px solid ${brandColors.green};
      }
      .post-content .tip-box p { margin: 0; font-size: 1rem; }

      .back-btn { transition: all 0.3s ease; }
      .back-btn:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        transform: translateX(-4px);
      }
      .tag { transition: all 0.25s ease; }
      .tag:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        transform: translateY(-2px);
      }
      .action-btn { transition: all 0.25s ease; }
      .action-btn:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        transform: translateY(-2px);
      }
      .share-btn { transition: all 0.25s ease; }
      .share-btn:hover {
        background-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
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
          isDarkMode ? "rgba(212, 175, 55, 0.18)" : "rgba(199, 125, 66, 0.1)"
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
      <SEO
        title={`${post.title} | ASudha Beauty`}
        description={post.excerpt}
        keywords={[
          ...(post.secondaryKeywords || post.tags),
          "multani mitti for oily skin",
          "ubtan for glowing skin",
          "natural face pack for glowing skin",
          "ayurvedic skincare routine",
        ]}
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
          { name: post.title, url: `/blog/${post.id}` },
        ]}
      />

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

      <main style={themeStyles.mainContent}>
        <div style={themeStyles.categoryBadgeWrap}>
          <span style={themeStyles.categoryBadge}>
            <FaLeaf aria-hidden="true" style={{ fontSize: "0.65rem" }} />
            {post.category}
          </span>
        </div>

        <h1 style={themeStyles.postTitle}>{post.title}</h1>
        <div style={themeStyles.titleUnderline} aria-hidden="true" />

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

        <div style={themeStyles.authorInfo}>
          <div style={themeStyles.authorAccent} aria-hidden="true" />
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

        <article
          style={themeStyles.postContent}
          className="post-content"
          dangerouslySetInnerHTML={renderContent()}
        />

        <div style={themeStyles.pullQuote}>
          <FaQuoteLeft style={themeStyles.pullQuoteIcon} aria-hidden="true" />
          Pure. Natural. You. — The ASudha promise, woven into every grain of
          our powders.
        </div>

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

        <section
          style={themeStyles.relatedSection}
          aria-labelledby="related-reading-title"
        >
          <h3 id="related-reading-title" style={themeStyles.relatedTitle}>
            <FaBookOpen aria-hidden="true" /> Related Reading
          </h3>
          <ul style={themeStyles.relatedList}>
            {RELATED_POSTS.filter(rp => rp.id !== post.id).map((rp) => (
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