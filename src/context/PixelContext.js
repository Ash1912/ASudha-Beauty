import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A brand-aligned tracking hook for ASudha Beauty.
 * Tracks user interactions for analytics and insights.
 */
export const usePixelTracking = () => {
  const location = useLocation();

  // Track page views automatically on route change
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🌿 ASudha Analytics | Page View:", {
        page_title: document.title,
        page_path: location.pathname,
        timestamp: new Date().toISOString(),
      });
    }
  }, [location]);

  /**
   * Collection of tracking event functions
   */
  const trackEvent = {
    /**
     * Track product view
     */
    viewContent: (product) => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | ViewContent:", {
          product_name: product?.name,
          product_id: product?.id,
          category: product?.category,
          is_natural: product?.category === "Skincare" || product?.category === "Hair Care",
        });
      }
    },

    /**
     * Track add to cart
     */
    addToCart: (product, quantity = 1) => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | AddToCart:", {
          product_name: product?.name,
          product_id: product?.id,
          quantity: quantity,
          price: product?.price,
          category: product?.category,
        });
      }
    },

    /**
     * Track checkout initiation
     */
    initiateCheckout: (cartItems, total) => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | InitiateCheckout:", {
          item_count: cartItems?.length || 0,
          total_value: total,
          natural_items: cartItems?.filter(
            (item) => item.category === "Skincare" || item.category === "Hair Care"
          ).length,
          timestamp: new Date().toISOString(),
        });
      }
    },

    /**
     * Track purchase completion
     */
    purchase: (orderId, total, cartItems) => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | Purchase:", {
          order_id: orderId,
          total: total,
          item_count: cartItems?.length || 0,
          timestamp: new Date().toISOString(),
        });
      }
    },

    /**
     * Track search
     */
    search: (query, resultsCount = 0) => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | Search:", {
          query: query,
          results_count: resultsCount,
          timestamp: new Date().toISOString(),
        });
      }
    },

    /**
     * Track add to wishlist
     */
    addToWishlist: (product) => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | AddToWishlist:", {
          product_name: product?.name,
          product_id: product?.id,
          category: product?.category,
        });
      }
    },

    /**
     * Track contact form submission
     */
    contact: (method = "form") => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | Contact:", {
          method: method,
          timestamp: new Date().toISOString(),
        });
      }
    },

    /**
     * Track newsletter signup
     */
    newsletterSignup: (email = null) => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | NewsletterSignup:", {
          email_provided: email ? true : false,
          timestamp: new Date().toISOString(),
        });
      }
    },

    /**
     * Track gift card purchase
     */
    giftCardPurchase: (amount, recipientEmail) => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | GiftCardPurchase:", {
          amount: amount,
          recipient_provided: recipientEmail ? true : false,
          timestamp: new Date().toISOString(),
        });
      }
    },

    /**
     * Track category view
     */
    viewCategory: (category, productCount) => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | ViewCategory:", {
          category: category,
          product_count: productCount,
          timestamp: new Date().toISOString(),
        });
      }
    },

    /**
     * Track share
     */
    share: (product, platform) => {
      if (process.env.NODE_ENV === "development") {
        console.log("🌿 ASudha Analytics | Share:", {
          product_name: product?.name,
          platform: platform,
          timestamp: new Date().toISOString(),
        });
      }
    },
  };

  return trackEvent;
};