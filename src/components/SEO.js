import React from "react";
import { Helmet } from "react-helmet-async";

// Enhanced SEO component tailored for Ayurvedic & Natural Beauty Products
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
  section,
  tags = [],
  noindex = false,
}) => {
  const siteTitle = "ASudha Beauty | Pure. Natural. You.";
  const siteUrl = "https://asudhabeauty.com"; // Add your actual domain URL here
  const defaultImage = `${siteUrl}/assets/images/Logo.png`;
  const twitterHandle = "@asudha_beauty";

  // Brand Colors for theme-color
  const brandColors = {
    primary: "#f5346b",
    gold: "#d4af37",
    bronze: "#c77d42",
    earthDark: "#3e2723",
    earthLight: "#6d4c41",
    cream: "#fcf8f5",
    black: "#0f0f0f", // Updated Pure Black
    darkSlate: "#1a1a1a", // Updated Dark Slate
  };

  const fullTitle = title ? `${title} | ASudha Beauty` : siteTitle;
  const fullDescription =
    description ||
    "Discover the power of Ayurveda with 100% natural, chemical-free beauty powders. Shop authentic Multani Mitti, Ubtan, Amla, Reetha, and Shikakai for glowing skin and healthy hair. Pure. Natural. You.";
  const fullImage = image || defaultImage;
  const fullUrl = url
    ? url.startsWith("http")
      ? url
      : `${siteUrl}${url}`
    : siteUrl;

  // Generate keywords string tailored to your actual product line
  const keywordsString = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords ||
      "multani mitti, fullers earth, ubtan powder, amla powder, reetha powder, shikakai powder, herbal face pack, ayurvedic skincare, natural hair cleanser, chemical free beauty, cruelty free cosmetics, ASudha Beauty, Gorakhpur, natural face powder, herbal hair pack, glowing skin, oil control face pack, pure natural skincare, Ayurvedic beauty products, natural beauty powders, herbal skincare, traditional Ayurveda, herbal mix hair pack";

  // Generate tags if not provided
  const defaultTags = [
    "Natural Beauty",
    "Ayurvedic Skincare",
    "Herbal Products",
    "Chemical Free",
    "Cruelty Free",
    "Made in India",
  ];

  const allTags = tags.length > 0 ? tags : defaultTags;

  return (
    <Helmet>
      {/* ===== BASIC META TAGS ===== */}
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
      <meta httpEquiv="content-language" content="en" />
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Gorakhpur" />
      <meta name="geo.position" content="26.7606,83.3733" />
      <meta name="ICBM" content="26.7606,83.3733" />

      {/* ===== OPEN GRAPH / FACEBOOK ===== */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content={`${fullTitle} - Natural Ayurvedic Beauty`}
      />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="ASudha Beauty" />
      <meta property="og:locale" content="en_IN" />

      {/* ===== ARTICLE SPECIFIC META ===== */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && section && (
        <meta property="article:section" content={section} />
      )}
      {allTags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      {/* ===== TWITTER CARD ===== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta
        name="twitter:image:alt"
        content={`${fullTitle} - Natural Ayurvedic Beauty`}
      />

      {/* ===== CANONICAL URL ===== */}
      <link rel="canonical" href={fullUrl} />

      {/* ===== ADDITIONAL META ===== */}
      <meta name="format-detection" content="telephone=no" />
      {/* Updated theme-color to reflect dark mode / light mode */}
      <meta name="theme-color" content={brandColors.black} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* ===== BRAND SPECIFIC ===== */}
      <meta name="brand" content="ASudha Beauty" />
      <meta name="product-line" content="Ayurvedic Skincare & Hair Care" />
      <meta name="natural" content="100% Natural" />
      <meta name="cruelty-free" content="Yes" />

      {/* ===== SCHEMA MARKUP - Organization ===== */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ASudha Beauty",
          url: siteUrl,
          logo: `${siteUrl}/assets/images/Logo.png`,
          description:
            "Pure. Natural. You. Authentic Ayurvedic beauty products for glowing skin and healthy hair.",
          slogan: "Pure. Natural. You.",
          brand: {
            "@type": "Brand",
            name: "ASudha Beauty",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Gorakhpur",
            addressRegion: "UP",
            postalCode: "273001",
            addressCountry: "IN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-7518217726",
            contactType: "customer service",
            availableLanguage: ["English", "Hindi"],
          },
          sameAs: [
            "https://www.instagram.com/asudha_beauty",
            "https://www.facebook.com/asudhabeauty",
          ],
        })}
      </script>

      {/* ===== PRODUCT SCHEMA (Enhanced for Ayurvedic/Natural Products) ===== */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HealthAndBeautyProduct",
            productType: "Natural Ayurvedic Skincare",
            name: product.name,
            description: product.description,
            image: product.image,
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
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gorakhpur",
                addressRegion: "UP",
                postalCode: "273001",
                addressCountry: "IN",
              },
            },
            offers: {
              "@type": "Offer",
              url: fullUrl,
              priceCurrency: "INR",
              price: product.price,
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              itemCondition: "https://schema.org/NewCondition",
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: 0,
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
            },
            // Additional attributes for Natural/Clean Beauty products
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
              {
                "@type": "PropertyValue",
                name: "Cruelty Free",
                value: "Yes",
              },
              {
                "@type": "PropertyValue",
                name: "Ayurvedic",
                value: "Yes",
              },
            ],
            aggregateRating: product.rating
              ? {
                  "@type": "AggregateRating",
                  ratingValue: product.rating,
                  reviewCount: product.reviews || 0,
                  bestRating: 5,
                  worstRating: 1,
                }
              : undefined,
            // Add product category
            category: product.category,
            // Add weight if available
            ...(product.weight && {
              weight: {
                "@type": "QuantitativeValue",
                value: parseFloat(product.weight.replace(/[^0-9.]/g, "")),
                unitCode: "GRM",
                unitText: "g",
              },
            }),
          })}
        </script>
      )}

      {/* ===== BREADCRUMB LIST SCHEMA (if url is provided) ===== */}
      {url && url !== "/" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: title || "Products",
                item: fullUrl,
              },
            ],
          })}
        </script>
      )}

      {/* ===== WEB APPLICATION MANIFEST LINK ===== */}
      <link rel="manifest" href="/manifest.json" />

      {/* ===== FAVICON ===== */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* ===== PRELOAD KEY RESOURCES ===== */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
    </Helmet>
  );
};

export default SEO;
