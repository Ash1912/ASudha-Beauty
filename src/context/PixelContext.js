import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This hook works WITHOUT any Pixel ID - safe to use even without Facebook setup
export const usePixelTracking = () => {
  const location = useLocation();

  // Track page views on route change (optional - just logs)
  useEffect(() => {
    // Only log in development - no actual tracking happens
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Page View:', {
        page_title: document.title,
        page_path: location.pathname
      });
    }
  }, [location]);

  // Safe tracking functions - they won't break if Pixel isn't installed
  const trackEvent = {
    // Track when someone views a product
    viewContent: (product) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 ViewContent:', product?.name);
      }
      // No actual Facebook call - completely safe
    },

    // Track add to cart
    addToCart: (product, quantity = 1) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 AddToCart:', product?.name, 'x', quantity);
      }
      // No actual Facebook call - completely safe
    },

    // Track initiate checkout
    initiateCheckout: (cartItems, total) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 InitiateCheckout:', {
          itemCount: cartItems?.length,
          total: total
        });
      }
      // No actual Facebook call - completely safe
    },

    // Track purchases
    purchase: (orderId, total, cartItems) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Purchase:', {
          orderId,
          total,
          itemCount: cartItems?.length
        });
      }
      // No actual Facebook call - completely safe
    },

    // Track searches
    search: (query, resultsCount) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Search:', { query, resultsCount });
      }
      // No actual Facebook call - completely safe
    },

    // Track add to wishlist
    addToWishlist: (product) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 AddToWishlist:', product?.name);
      }
      // No actual Facebook call - completely safe
    },

    // Track contact form submissions
    contact: (method = 'form') => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Contact:', method);
      }
      // No actual Facebook call - completely safe
    },

    // Track newsletter signups
    newsletterSignup: (email) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 NewsletterSignup:', email ? 'Email provided' : 'No email');
      }
      // No actual Facebook call - completely safe
    }
  };

  return trackEvent;
};