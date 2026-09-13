// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("asudha_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error("Failed to load cart:", err);
      return [];
    }
  });

  const [cartMessage, setCartMessage] = useState(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("asudha_cart", JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  }, [cartItems]);

  // Clear cart messages after 3 seconds
  useEffect(() => {
    if (cartMessage) {
      const timer = setTimeout(() => setCartMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [cartMessage]);

  // ─────────────────────────────────────────────────────────────────────
  // ADD TO CART
  // ─────────────────────────────────────────────────────────────────────
  const addToCart = (product, selectedShade = null, quantity = 1) => {
    setCartItems((prevItems) => {
      if (product.inStock === false) {
        setCartMessage({
          type: "error",
          text: `❌ ${product.name} is currently out of stock.`,
        });
        return prevItems;
      }

      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.selectedShade === selectedShade
      );

      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.id === product.id && item.selectedShade === selectedShade
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        setCartMessage({
          type: "success",
          text: `🛒 Updated ${product.name} quantity in cart.`,
        });
        return updatedItems;
      }

      setCartMessage({
        type: "success",
        text: `✨ Added "${product.name}" to your cart!`,
      });

      return [
        ...prevItems,
        {
          ...product,
          selectedShade,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ];
    });
  };

  // ─────────────────────────────────────────────────────────────────────
  // REMOVE FROM CART
  // ─────────────────────────────────────────────────────────────────────
  const removeFromCart = (productId, selectedShade) => {
    const item = cartItems.find(
      (item) => item.id === productId && item.selectedShade === selectedShade
    );
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === productId && item.selectedShade === selectedShade)
      )
    );
    if (item) {
      setCartMessage({
        type: "info",
        text: `🗑️ Removed "${item.name}" from cart.`,
      });
    }
  };

  // ─────────────────────────────────────────────────────────────────────
  // UPDATE QUANTITY
  // ─────────────────────────────────────────────────────────────────────
  const updateQuantity = (productId, selectedShade, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, selectedShade);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.selectedShade === selectedShade
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // ─────────────────────────────────────────────────────────────────────
  // CLEAR CART
  // ─────────────────────────────────────────────────────────────────────
  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem("asudha_cart");
    } catch (err) {
      console.error("Failed to clear cart from storage:", err);
    }
    setCartMessage({
      type: "info",
      text: "🔄 Cart has been cleared.",
    });
  };

  // ─────────────────────────────────────────────────────────────────────
  // TOTALS & COUNTS
  // ─────────────────────────────────────────────────────────────────────
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getUniqueItemCount = () => {
    return cartItems.length;
  };

  const getShippingEstimate = () => {
    const subtotal = getCartTotal();
    if (subtotal >= 500) return 0;
    if (subtotal === 0) return 0;
    return 50;
  };

  // ─────────────────────────────────────────────────────────────────────
  // UTILITIES
  // ─────────────────────────────────────────────────────────────────────
  const isInCart = (productId, selectedShade) => {
    return cartItems.some(
      (item) => item.id === productId && item.selectedShade === selectedShade
    );
  };

  const getItemQuantity = (productId, selectedShade) => {
    const item = cartItems.find(
      (item) => item.id === productId && item.selectedShade === selectedShade
    );
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    cartMessage,
    clearCartMessage: () => setCartMessage(null),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getUniqueItemCount,
    getShippingEstimate,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;