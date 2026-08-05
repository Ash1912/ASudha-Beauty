import React from 'react';
import { Helmet } from 'react-helmet-async';

// Enhanced SEO component with more meta tags
const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url = '',
  type = 'website',
  product = null,
  publishedTime,
  modifiedTime,
  author = 'ASudha Beauty',
  section,
  tags = [],
  noindex = false
}) => {
  
  const siteTitle = 'ASudha Beauty';
  const siteUrl = '';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const twitterHandle = '@asudhabeauty'; // Add your Twitter handle
  
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const fullDescription = description || 'Premium quality, cruelty-free color cosmetics. Shop lipsticks, foundations, eyeliners and more at ASudha Beauty.';
  const fullImage = image || defaultImage;
  const fullUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

  // Generate keywords string from array or use provided string
  const keywordsString = Array.isArray(keywords) 
    ? keywords.join(', ') 
    : keywords || 'cosmetics, makeup, lipstick, foundation, cruelty-free, beauty products, Indian makeup';

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
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* ===== LANGUAGE & GEO ===== */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="geo.region" content="IN-DL" />
      <meta name="geo.placename" content="Delhi" />
      
      {/* ===== OPEN GRAPH / FACEBOOK ===== */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_IN" />
      
      {/* ===== ARTICLE SPECIFIC META ===== */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {tags.map(tag => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}
      
      {/* ===== TWITTER CARD ===== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      
      {/* ===== CANONICAL URL ===== */}
      <link rel="canonical" href={fullUrl} />
      
      {/* ===== ADDITIONAL META ===== */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#f5346b" />
      
      {/* ===== PRODUCT SCHEMA (if product data provided) ===== */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.image,
            "sku": product.itemNo,
            "mpn": product.itemNo,
            "brand": {
              "@type": "Brand",
              "name": "ASudha Beauty"
            },
            "offers": {
              "@type": "Offer",
              "url": fullUrl,
              "priceCurrency": "INR",
              "price": product.price,
              "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "itemCondition": "https://schema.org/NewCondition"
            },
            "aggregateRating": product.rating ? {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviews || 0
            } : undefined
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;