// src/components/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

// ─── Site constants ───
const SITE_URL = "https://www.asudhabeauty.shop";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/og-default.png`;
const LOGO_URL = `${SITE_URL}/assets/images/Logo.png`;

// ─── Brand colors ───
const brandColors = {
  primary: "#f5346b",
  gold: "#d4af37",
  bronze: "#c77d42",
  earthDark: "#3e2723",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  black: "#0f0f0f",
  darkSlate: "#1a1a1a",
};

// ─── High-volume keyword clusters (validated via Semrush) ───
const DEFAULT_KEYWORDS = [
  "multani mitti",
  "multani mitti for oily skin",
  "multani mitti face pack",
  "fuller's earth",
  "ubtan powder",
  "ubtan face wash",
  "ubtan for glowing skin",
  "ubtan cream",
  "amla reetha shikakai",
  "amla reetha shikakai shampoo",
  "amla powder for hair",
  "reetha powder",
  "shikakai powder",
  "natural shampoo for hair fall",
  "herbal face pack for glowing skin",
  "chemical free skincare",
  "paraben free face wash",
  "natural hair cleanser",
  "oil control face pack",
  "ayurvedic skincare routine",
  "natural beauty products India",
  "ASudha Beauty",
  "ayurvedic beauty products",
  "herbal skincare",
  "cruelty free cosmetics",
  "natural face pack for glowing skin",
  "best ayurvedic face pack for oily skin",
  "chemical free face wash india",
];

// ─── Authoritative external sources for E-E-A-T ───
const TRUSTED_SOURCES = {
  nccih: {
    name: "NIH NCCIH — Ayurvedic Medicine: In Depth",
    url: "https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth",
    domain: "nccih.nih.gov",
  },
  ayush: {
    name: "Ministry of AYUSH — Government of India",
    url: "https://ayush.gov.in/",
    domain: "ayush.gov.in",
  },
  ayushResearch: {
    name: "AYUSH Research Portal",
    url: "https://ayushresearch.gov.in/",
    domain: "ayushresearch.gov.in",
  },
  pubmedMultani: {
    name: "PubMed — Multani Mitti (Fuller's Earth) research",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=multani+mitti+fuller%27s+earth+skin",
    domain: "pubmed.ncbi.nlm.nih.gov",
  },
  mdpiMultani: {
    name: "Cosmetics (MDPI, 2025) — Multi-Target Anti-Aging Mechanisms of Multani Mitti",
    url: "https://doi.org/10.3390/cosmetics12030124",
    domain: "mdpi.com",
  },
  pubmedClayMask: {
    name: "PubMed — Clay mask efficacy in oily and acne skin (PMID 38009030)",
    url: "https://pubmed.ncbi.nlm.nih.gov/38009030/",
    domain: "pubmed.ncbi.nlm.nih.gov",
  },
  pubmedUbtan: {
    name: "PubMed — Evaluation of traditional Ubtan formulations",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=ubtan+traditional+indian+skin+care+formulation",
    domain: "pubmed.ncbi.nlm.nih.gov",
  },
};

// ─── Default FAQ for product pages (powers FAQPage rich results) ───
const DEFAULT_PRODUCT_FAQS = [
  {
    q: "Is ASudha Multani Mitti 100% natural?",
    a: "Yes. ASudha Multani Mitti is 100% natural fuller's earth with no added preservatives, parabens, or synthetic fragrances.",
  },
  {
    q: "How often should I use a Multani Mitti face pack for oily skin?",
    a: "For oily and acne-prone skin, use a Multani Mitti face pack 2–3 times per week. For dry or sensitive skin, once a week is sufficient.",
  },
  {
    q: "What is the difference between Ubtan and Multani Mitti?",
    a: "Ubtan is a traditional Ayurvedic blend of turmeric, sandalwood, besan, and herbs used for glow and exfoliation. Multani Mitti (fuller's earth) is a mineral-rich clay used primarily for oil control and deep cleansing.",
  },
  {
    q: "Are ASudha products cruelty-free and chemical-free?",
    a: "Yes. All ASudha Beauty products are cruelty-free, paraben-free, and free from synthetic chemicals, made in India with traditional Ayurvedic formulations.",
  },
  {
    q: "How do I use Amla, Reetha, and Shikakai powder for hair?",
    a: "Mix equal parts Amla, Reetha, and Shikakai powder with water to form a paste. Apply to wet hair, massage into the scalp, leave for 5–10 minutes, and rinse thoroughly. Use 1–2 times per week as a natural shampoo alternative.",
  },
  {
    q: "Can I use Ubtan face wash daily?",
    a: "Yes, ASudha Ubtan face wash is gentle enough for daily use. It cleanses without stripping natural oils and is suitable for all skin types.",
  },
];

// ─── Small helpers ───
const safeArray = (value) => (Array.isArray(value) ? value : []);
const safeString = (value, fallback = "") =>
  typeof value === "string" ? value : value == null ? fallback : String(value);

/**
 * SEO Component
 *
 * HOW TO USE FOR ON-PAGE SEO RANKING:
 * 1. `title`: Keep under 60 chars. Put Primary Keyword first.
 * 2. `description`: Keep under 160 chars. Include Primary & Secondary keywords naturally.
 * 3. `keywords`: Pass an array of your secondary keywords for this specific page.
 * 4. `url`: Always start with a slash (e.g., "/product/multani-mitti").
 * 5. `product`: Pass the product object to generate Product Schema.
 * 6. `faqs`: Pass an array of Q&A objects to generate FAQ Schema.
 */
const SEO = ({
  title,
  description,
  keywords,
  image,
  url = "",
  type = "website",
  product = null,
  publishedTime,
  modifiedTime,
  author = "ASudha Beauty",
  authorUrl,
  section,
  tags,
  noindex = false,
  citations,
  faqs,
  breadcrumb,
  ogType,
  articleSection,
}) => {
  const safeTags = safeArray(tags);
  const safeCitations = safeArray(citations);
  const safeBreadcrumb = safeArray(breadcrumb);

  const resolvedFaqs =
    Array.isArray(faqs) && faqs.length > 0
      ? faqs
      : product
      ? DEFAULT_PRODUCT_FAQS
      : [];

  const fullTitle = title
    ? title.includes("ASudha")
      ? title
      : `${title} | ASudha Beauty`
    : "ASudha Beauty | 100% Natural Ayurvedic Skincare & Haircare";

  const fullDescription =
    description ||
    "Shop 100% natural, chemical-free Ayurvedic skincare & hair care from ASudha Beauty — Multani Mitti, Ubtan, Amla, Reetha & Shikakai. Free shipping above ₹500.";

  const fullImage = image || DEFAULT_OG_IMAGE;

  const fullUrl = url
    ? url.startsWith("http")
      ? url
      : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`
    : SITE_URL;

  // ─── Keywords: merge defaults + page-specific ───
  const keywordsString = Array.isArray(keywords)
    ? [...new Set([...keywords, ...DEFAULT_KEYWORDS])].join(", ")
    : typeof keywords === "string" && keywords.trim()
    ? `${keywords}, ${DEFAULT_KEYWORDS.join(", ")}`
    : DEFAULT_KEYWORDS.join(", ");

  const effectiveOgType =
    ogType || (type === "article" ? "article" : "website");
  const effectiveSection = articleSection || section;

  const breadcrumbItems =
    safeBreadcrumb.length > 0
      ? safeBreadcrumb.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: safeString(item?.name, "Untitled"),
          item:
            typeof item?.url === "string" && item.url.startsWith("http")
              ? item.url
              : `${SITE_URL}${safeString(item?.url, "")}`,
        }))
      : url && url !== "/"
      ? [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: title || "Page",
            item: fullUrl,
          },
        ]
      : [];

  return (
    <Helmet htmlAttributes={{ lang: "en-IN" }}>
      {/* ===== BASIC META ===== */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* ===== ROBOTS ===== */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* ===== LANGUAGE & GEO ===== */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Gorakhpur" />
      <meta name="geo.position" content="26.7606,83.3733" />
      <meta name="ICBM" content="26.7606,83.3733" />

      {/* ===== OPEN GRAPH ===== */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:secure_url" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content={`${fullTitle} — ASudha Beauty Ayurvedic Skincare`}
      />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={effectiveOgType} />
      <meta property="og:site_name" content="ASudha Beauty" />
      <meta property="og:locale" content="en_IN" />

      {/* ===== ARTICLE META ===== */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && effectiveSection && (
        <meta property="article:section" content={effectiveSection} />
      )}
      {type === "article" &&
        safeTags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

      {/* ===== TWITTER CARD ===== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={`${fullTitle} — ASudha Beauty`} />

      {/* ===== CANONICAL ===== */}
      <link rel="canonical" href={fullUrl} />

      {/* ===== ADDITIONAL META ===== */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content={brandColors.primary} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* ===== BRAND SIGNALS ===== */}
      <meta name="brand" content="ASudha Beauty" />
      <meta name="product-line" content="Ayurvedic Skincare & Hair Care" />
      <meta name="natural" content="100% Natural" />
      <meta name="cruelty-free" content="Yes" />

      {/* ===== ORGANIZATION SCHEMA ===== */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "ASudha Beauty",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: LOGO_URL,
            width: 512,
            height: 512,
          },
          image: DEFAULT_OG_IMAGE,
          description:
            "ASudha Beauty crafts 100% natural, chemical-free Ayurvedic skincare and hair care products — Multani Mitti, Ubtan, Amla, Reetha & Shikakai — rooted in 5,000 years of tradition and validated by modern science.",
          slogan: "Pure. Natural. You.",
          brand: { "@type": "Brand", name: "ASudha Beauty" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Gorakhpur",
            addressRegion: "UP",
            postalCode: "273001",
            addressCountry: "IN",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+91-7518217726",
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
          ],
          sameAs: [
            "https://www.facebook.com/people/ASudha-Beauty/61596257331515/",
            "https://www.instagram.com/asudha_beauty/",
          ],
        })}
      </script>

      {/* ===== WEBSITE SCHEMA (Sitelinks Search Box) ===== */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "ASudha Beauty",
          description:
            "100% natural Ayurvedic skincare and hair care — Multani Mitti, Ubtan, Amla, Reetha & Shikakai.",
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en-IN",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        })}
      </script>

      {/* ===== PRODUCT SCHEMA ===== */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HealthAndBeautyProduct",
            "@id": `${fullUrl}#product`,
            productType: "Natural Ayurvedic Skincare & Hair Care",
            name: product.name,
            description: product.description,
            image: Array.isArray(product.image)
              ? product.image
              : [product.image || DEFAULT_OG_IMAGE],
            sku: product.itemNo || product.id,
            mpn: product.itemNo || product.id,
            brand: {
              "@type": "Brand",
              name: "ASudha Beauty",
              slogan: "Pure. Natural. You.",
            },
            manufacturer: {
              "@type": "Organization",
              name: "ASudha Beauty",
              url: SITE_URL,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gorakhpur",
                addressRegion: "UP",
                postalCode: "273001",
                addressCountry: "IN",
              },
            },
            category: product.category || "Ayurvedic Skincare",
            offers: {
              "@type": "Offer",
              "@id": `${fullUrl}#offer`,
              url: fullUrl,
              priceCurrency: "INR",
              price: String(product.price),
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              itemCondition: "https://schema.org/NewCondition",
              priceValidUntil:
                product.priceValidUntil ||
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                  .toISOString()
                  .split("T")[0],
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: "0",
                  currency: "INR",
                },
                shippingDestination: {
                  "@type": "DefinedRegion",
                  addressCountry: "IN",
                },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: {
                    "@type": "QuantitativeValue",
                    minValue: 1,
                    maxValue: 2,
                    unitCode: "DAY",
                  },
                  transitTime: {
                    "@type": "QuantitativeValue",
                    minValue: 3,
                    maxValue: 7,
                    unitCode: "DAY",
                  },
                },
              },
              hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "IN",
                returnPolicyCategory:
                  "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 7,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn",
              },
            },
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Natural Ingredients",
                value: "100% Natural",
              },
              {
                "@type": "PropertyValue",
                name: "Chemical Free",
                value: "No Parabens, No Preservatives, No Synthetics",
              },
              {
                "@type": "PropertyValue",
                name: "Suitable For",
                value: "All Skin Types",
              },
              { "@type": "PropertyValue", name: "Cruelty Free", value: "Yes" },
              { "@type": "PropertyValue", name: "Ayurvedic", value: "Yes" },
              { "@type": "PropertyValue", name: "Made In", value: "India" },
            ],
            ...(product.rating
              ? {
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: String(product.rating),
                    reviewCount: String(product.reviews || 1),
                    bestRating: "5",
                    worstRating: "1",
                  },
                }
              : {}),
            ...(product.weight != null
              ? {
                  weight: {
                    "@type": "QuantitativeValue",
                    value: String(
                      parseFloat(
                        String(product.weight).replace(/[^0-9.]/g, "")
                      ) || 0
                    ),
                    unitCode: "GRM",
                    unitText: "g",
                  },
                }
              : {}),
            ...(safeCitations.length > 0 && {
              citation: safeCitations.map((c) => ({
                "@type": "CreativeWork",
                name: c?.label || "",
                url: c?.href || "",
              })),
            }),
            isBasedOn: [
              TRUSTED_SOURCES.mdpiMultani.url,
              TRUSTED_SOURCES.pubmedClayMask.url,
              TRUSTED_SOURCES.nccih.url,
            ],
          })}
        </script>
      )}

      {/* ===== FAQ PAGE SCHEMA ===== */}
      {resolvedFaqs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${fullUrl}#faq`,
            mainEntity: resolvedFaqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          })}
        </script>
      )}

      {/* ===== BREADCRUMB SCHEMA ===== */}
      {breadcrumbItems.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${fullUrl}#breadcrumb`,
            itemListElement: breadcrumbItems,
          })}
        </script>
      )}

      {/* ===== ARTICLE SCHEMA ===== */}
      {type === "article" && title && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${fullUrl}#article`,
            headline: title,
            description: fullDescription,
            image: fullImage,
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime,
            author: {
              "@type": "Person",
              name: author,
              ...(authorUrl && { url: authorUrl }),
            },
            publisher: { "@id": `${SITE_URL}/#organization` },
            url: fullUrl,
            mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
            ...(effectiveSection && { articleSection: effectiveSection }),
            ...(safeTags.length > 0 && { keywords: safeTags.join(", ") }),
            ...(safeCitations.length > 0 && {
              citation: safeCitations.map((c) => ({
                "@type": "CreativeWork",
                name: c?.label || "",
                url: c?.href || "",
              })),
            }),
          })}
        </script>
      )}

      {/* ===== MANIFEST & FAVICONS ===== */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" type="image/png" href="/Logo.png" />
      <link rel="apple-touch-icon" href="/Logo.png" />

      {/* ===== RESOURCE HINTS ===== */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </Helmet>
  );
};

export default SEO;

export { TRUSTED_SOURCES, DEFAULT_KEYWORDS, DEFAULT_PRODUCT_FAQS };