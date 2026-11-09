// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { FaWhatsapp } from "react-icons/fa";
import ReactGA from "react-ga4"; // 👈 GA4
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { GiftCardProvider } from "./context/GiftCardContext";
import { OrdersProvider } from "./context/OrdersContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WishlistPage from "./pages/WishlistPage";
import SearchPage from "./pages/SearchPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import GiftCards from "./pages/GiftCards";
import Testimonials from "./pages/Testimonials";
import AffiliateProgram from "./pages/AffiliateProgram";
import BecomePartner from "./pages/BecomePartner";
import TermsConditions from "./pages/TermsConditions";
import SizeGuide from "./pages/SizeGuide";
import TrackOrder from "./pages/TrackOrder";
import ReturnsExchanges from "./pages/ReturnsExchanges";
import ShippingInfo from "./pages/ShippingInfo";
import FAQs from "./pages/FAQs";
import Privacy from "./pages/Privacy"; // 👈 ADDED IMPORT

// ─── Site constants ───
const SITE_URL = "https://www.asudhabeauty.shop";
const SITE_NAME = "ASudha Beauty";
const WHATSAPP_NUMBER = "917518217726";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi ASudha Beauty! I'd like to know more about your natural Ayurvedic products.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/og-default.png`;
const LOGO_URL = `${SITE_URL}/assets/images/Logo.png`;

// ─── Global JSON-LD ───
const GLOBAL_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
        width: 512,
        height: 512,
      },
      description:
        "ASudha Beauty crafts 100% natural, chemical-free Ayurvedic skincare and hair care products — Multani Mitti, Ubtan, Amla, Reetha & Shikakai — backed by 5,000 years of tradition and modern science.",
      sameAs: [
        "https://www.facebook.com/people/ASudha-Beauty/61596257331515/?sk=photos",
        "https://www.instagram.com/asudha_beauty?utm_source=qr&igsh=aGY4bHp3aGo2MzN6",
        "https://youtube.com/@asudhabeauty?si=oZqbLl7COM0Kiqrr",
        "https://www.linkedin.com/in/asudha-beauty-a7b994448/"
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: `+${WHATSAPP_NUMBER}`,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
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
    },
  ],
};

// ─── Scroll to top on every route change ───
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

// ─── Analytics Page Tracker (GA4 & GTM) ───
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname + location.search;

    // 1. Existing React-GA4 tracking
    ReactGA.send({
      hitType: "pageview",
      page: pagePath,
    });

    // 2. Push virtual pageview to Google Tag Manager dataLayer
    setTimeout(() => {
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "virtual_pageview",
          page: {
            path: pagePath,
            title: document.title,
            url: window.location.href,
          },
        });
      }
    }, 100);
    
  }, [location]);

  return null;
};

// ─── Dynamic default canonical ───
const DefaultCanonical = () => {
  const { pathname } = useLocation();
  const cleanPath = pathname === "/" ? "" : pathname;
  return (
    <Helmet>
      <link rel="canonical" href={`${SITE_URL}${cleanPath}`} />
    </Helmet>
  );
};

// ─── 404 Page ───
const NotFound = () => (
  <>
    <Helmet>
      <title>Page Not Found (404) | ASudha Beauty</title>
      <meta
        name="description"
        content="The page you're looking for could not be found. Browse our Ayurvedic skincare and hair care collection instead."
      />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href={`${SITE_URL}/404`} />
    </Helmet>
    <div style={styles.notFoundWrapper}>
      <div style={styles.notFoundCard}>
        <h1 style={styles.notFoundTitle}>404 — Page Not Found</h1>
        <p style={styles.notFoundText}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={styles.notFoundActions}>
          <Link to="/" style={styles.notFoundPrimary}>
            ← Back to Home
          </Link>
          <Link to="/shop" style={styles.notFoundSecondary}>
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  </>
);

function App() {
  // Inject global CSS for WhatsApp button, skip-link, 404 page
  useEffect(() => {
    const existing = document.querySelector('style[data-app-styles="true"]');
    if (existing) existing.parentNode?.removeChild(existing);

    const style = document.createElement("style");
    style.setAttribute("data-app-styles", "true");
    style.textContent = `
      @keyframes whatsapp-pulse {
        0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
        70%  { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
        100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
      }

      .whatsapp-float {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        color: #ffffff;
        padding: 0.85rem 1.5rem;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 800;
        text-decoration: none;
        box-shadow: 0 10px 26px rgba(37, 211, 102, 0.4);
        z-index: 9999;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: whatsapp-pulse 2s infinite;
        letter-spacing: 0.5px;
        font-family: inherit;
      }

      .whatsapp-float:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 14px 34px rgba(37, 211, 102, 0.6);
        animation: none;
      }

      .whatsapp-float:focus-visible {
        outline: 2px solid #f5346b;
        outline-offset: 3px;
      }

      .whatsapp-float svg {
        font-size: 1.4rem;
      }

      /* Push the back-to-top button up so it doesn't overlap the WhatsApp button */
      .footer-back-top {
        bottom: 6rem !important;
      }

      /* Accessible skip-link: hidden until keyboard focus */
      .skip-link {
        position: absolute;
        left: -9999px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
        z-index: 10000;
      }
      .skip-link:focus {
        position: fixed !important;
        left: 1rem !important;
        top: 1rem !important;
        width: auto !important;
        height: auto !important;
        padding: 0.75rem 1.25rem !important;
        background: #f5346b !important;
        color: #ffffff !important;
        border-radius: 8px !important;
        font-weight: 700 !important;
        text-decoration: none !important;
        z-index: 10000 !important;
        outline: 2px solid #d4af37 !important;
        outline-offset: 2px !important;
      }

      @media (max-width: 768px) {
        .whatsapp-float {
          padding: 0.85rem;
          border-radius: 50%;
          bottom: 1.5rem;
          right: 1.5rem;
        }
        .whatsapp-float span {
          display: none; /* Hide text on mobile, show only icon */
        }
        .footer-back-top {
          bottom: 5.5rem !important;
          right: 1.5rem !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .whatsapp-float {
          animation: none;
          transition: none;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  return (
    <HelmetProvider>
      {/* ─── App-wide SEO defaults (per-page Helmet overrides these) ─── */}
      <Helmet htmlAttributes={{ lang: "en-IN" }}>
        <title>
          ASudha Beauty | 100% Natural Ayurvedic Skincare &amp; Hair Care
        </title>
        <meta
          name="description"
          content="Shop 100% natural, chemical-free Ayurvedic skincare and hair care from ASudha Beauty — Multani Mitti, Ubtan, Amla, Reetha & Shikakai. Rooted in 5,000 years of tradition, validated by modern science."
        />
        <meta
          name="keywords"
          content="ayurvedic skincare, natural face pack, multani mitti, ubtan for glowing skin, amla reetha shikakai, chemical free skincare, paraben free products, herbal hair care, natural beauty India"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content={SITE_NAME} />
        <meta name="application-name" content={SITE_NAME} />
        <meta name="theme-color" content="#f5346b" />
        <meta name="format-detection" content="telephone=no" />

        {/* Sitemap reference (helps crawlers discover it) */}
        <link
          rel="sitemap"
          type="application/xml"
          href={`${SITE_URL}/sitemap.xml`}
        />

        {/* Resource hints for Core Web Vitals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://via.placeholder.com" />
        <link rel="dns-prefetch" href="https://via.placeholder.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Open Graph defaults — pages override og:title/og:description */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="ASudha Beauty — 100% Natural Ayurvedic Skincare & Hair Care"
        />

        {/* Twitter defaults */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

        {/* Global Organization + WebSite schema (Knowledge Panel + Sitelinks Search Box) */}
        <script type="application/ld+json">
          {JSON.stringify(GLOBAL_JSON_LD)}
        </script>
      </Helmet>

      <Router>
        <ScrollToTop />
        <DefaultCanonical />
        <RouteTracker />

        <ThemeProvider>
          <AuthProvider>
            <OrdersProvider>
              <CartProvider>
                <WishlistProvider>
                  <GiftCardProvider>
                    <div style={styles.app}>
                      {/* Accessibility: skip navigation for keyboard users */}
                      <a href="#main-content" className="skip-link">
                        Skip to main content
                      </a>

                      <Navbar />

                      <main id="main-content" style={styles.main}>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/shop" element={<Shop />} />
                          <Route
                            path="/product/:slug"
                            element={<ProductDetail />}
                          />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/wishlist" element={<WishlistPage />} />
                          <Route path="/search" element={<SearchPage />} />

                          {/* Blog routes */}
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/blog/all" element={<Blog />} />
                          <Route path="/blog/:id" element={<BlogPost />} />

                          <Route path="/gift-cards" element={<GiftCards />} />
                          <Route
                            path="/testimonials"
                            element={<Testimonials />}
                          />
                          <Route
                            path="/affiliate"
                            element={<AffiliateProgram />}
                          />
                          <Route path="/partners" element={<BecomePartner />} />
                          <Route path="/terms" element={<TermsConditions />} />
                          {/* 👇 ADDED PRIVACY ROUTE 👇 */}
                          <Route path="/privacy" element={<Privacy />} /> 
                          <Route path="/size-guide" element={<SizeGuide />} />
                          <Route path="/track-order" element={<TrackOrder />} />
                          <Route
                            path="/returns"
                            element={<ReturnsExchanges />}
                          />
                          <Route path="/shipping" element={<ShippingInfo />} />
                          <Route path="/faqs" element={<FAQs />} />

                          <Route
                            path="/checkout"
                            element={
                              <ProtectedRoute>
                                <Checkout />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/profile"
                            element={
                              <ProtectedRoute>
                                <Profile />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />

                          {/* 404 catch-all: prevents soft-404 SEO penalty */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>

                      <Footer />

                      {/* Global Floating WhatsApp Button — prefilled message
                          improves conversion + analytics tracking */}
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-float"
                        aria-label="Chat with ASudha Beauty on WhatsApp"
                        title="Chat with ASudha Beauty on WhatsApp"
                      >
                        <FaWhatsapp aria-hidden="true" /> <span>Chat Now</span>
                      </a>
                    </div>
                  </GiftCardProvider>
                </WishlistProvider>
              </CartProvider>
            </OrdersProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflowX: "clip",
    boxSizing: "border-box",
    position: "relative",
  },
  main: {
    flex: 1,
    width: "100%",
    minWidth: 0,
    overflowX: "clip",
    boxSizing: "border-box",
  },

  // ─── 404 Page ───
  notFoundWrapper: {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 1.5rem",
    background: "linear-gradient(160deg, #fbf3ec 0%, #fcf8f5 100%)",
  },
  notFoundCard: {
    maxWidth: "520px",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    padding: "3rem 2rem",
    textAlign: "center",
    boxShadow: "0 22px 48px rgba(62, 39, 35, 0.12)",
    border: "1px solid rgba(62, 39, 35, 0.08)",
  },
  notFoundTitle: {
    fontSize: "1.75rem",
    fontWeight: "900",
    color: "#3e2723",
    marginTop: 0,
    marginBottom: "1rem",
    letterSpacing: "-0.3px",
  },
  notFoundText: {
    fontSize: "1rem",
    color: "#6d4c41",
    lineHeight: "1.7",
    marginBottom: "2rem",
  },
  notFoundActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "center",
  },
  notFoundPrimary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.75rem 1.75rem",
    background: "linear-gradient(135deg, #f7d794 0%, #f5346b 100%)",
    color: "#ffffff",
    fontWeight: "800",
    fontSize: "0.92rem",
    borderRadius: "50px",
    textDecoration: "none",
    boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
  },
  notFoundSecondary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.75rem 1.75rem",
    background: "transparent",
    color: "#c77d42",
    fontWeight: "800",
    fontSize: "0.92rem",
    borderRadius: "50px",
    textDecoration: "none",
    border: "2px solid #c77d42",
  },
};

export default App;