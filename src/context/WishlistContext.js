import React, { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("asudha_wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (err) {
      console.error("Failed to load wishlist:", err);
      return [];
    }
  });

  const [wishlistMessage, setWishlistMessage] = useState(null);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("asudha_wishlist", JSON.stringify(wishlistItems));
    } catch (err) {
      console.error("Failed to save wishlist:", err);
    }
  }, [wishlistItems]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (wishlistMessage) {
      const timer = setTimeout(() => {
        setWishlistMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [wishlistMessage]);

  /**
   * Add a product to the wishlist
   */
  const addToWishlist = (product, selectedShade = null) => {
    setWishlistItems((prev) => {
      const exists = prev.some(
        (item) =>
          item.id === product.id && item.selectedShade === selectedShade,
      );

      if (!exists) {
        setWishlistMessage({
          type: "success",
          text: `💖 Added "${product.name}" to your wishlist!`,
        });
        return [
          ...prev,
          {
            ...product,
            selectedShade,
            addedAt: new Date().toISOString(),
          },
        ];
      }
      return prev;
    });
  };

  /**
   * Remove a product from the wishlist
   */
  const removeFromWishlist = (productId, selectedShade = null) => {
    const item = wishlistItems.find(
      (item) => item.id === productId && item.selectedShade === selectedShade,
    );
    setWishlistItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === productId && item.selectedShade === selectedShade),
      ),
    );
    if (item) {
      setWishlistMessage({
        type: "info",
        text: `🗑️ Removed "${item.name}" from wishlist.`,
      });
    }
  };

  /**
   * Check if a product is in the wishlist
   */
  const isInWishlist = (productId, selectedShade = null) => {
    return wishlistItems.some(
      (item) => item.id === productId && item.selectedShade === selectedShade,
    );
  };

  /**
   * Toggle a product in the wishlist
   */
  const toggleWishlist = (product, selectedShade = null) => {
    if (isInWishlist(product.id, selectedShade)) {
      removeFromWishlist(product.id, selectedShade);
    } else {
      addToWishlist(product, selectedShade);
    }
  };

  /**
   * Get total wishlist count
   */
  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  /**
   * Get unique product count (without variants)
   */
  const getUniqueProductCount = () => {
    const uniqueIds = new Set(wishlistItems.map((item) => item.id));
    return uniqueIds.size;
  };

  /**
   * Clear the entire wishlist
   */
  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem("asudha_wishlist");
    setWishlistMessage({
      type: "info",
      text: "🔄 Wishlist cleared.",
    });
  };

  /**
   * Get sorted wishlist (newest first)
   */
  const getSortedWishlist = () => {
    return [...wishlistItems].sort(
      (a, b) => new Date(b.addedAt) - new Date(a.addedAt),
    );
  };

  /**
   * Get wishlist items by category
   */
  const getWishlistByCategory = (category) => {
    return wishlistItems.filter((item) => item.category === category);
  };

  /**
   * Get natural products count in wishlist
   */
  const getNaturalCount = () => {
    return wishlistItems.filter(
      (item) => item.category === "Skincare" || item.category === "Hair Care",
    ).length;
  };

  const clearWishlistMessage = () => setWishlistMessage(null);

  const value = {
    wishlistItems,
    wishlistMessage,
    clearWishlistMessage,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    getWishlistCount,
    getUniqueProductCount,
    getNaturalCount,
    clearWishlist,
    getSortedWishlist,
    getWishlistByCategory,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};