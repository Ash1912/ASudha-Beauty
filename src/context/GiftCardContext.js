import React, { createContext, useState, useContext, useEffect } from "react";

const GiftCardContext = createContext();

export const useGiftCard = () => {
  const context = useContext(GiftCardContext);
  if (!context) {
    throw new Error("useGiftCard must be used within a GiftCardProvider");
  }
  return context;
};

// Brand-specific gift card themes
const GIFT_CARD_THEMES = {
  NATURAL: "🌿",
  GLOW: "✨",
  RADIANCE: "🌟",
  HERBAL: "🌱",
  AYURVEDA: "🪷",
};

export const GiftCardProvider = ({ children }) => {
  const [giftCards, setGiftCards] = useState([]);
  const [appliedGiftCard, setAppliedGiftCard] = useState(null);
  const [giftCardDiscount, setGiftCardDiscount] = useState(0);
  const [giftCardMessage, setGiftCardMessage] = useState(null);

  // Load gift cards from localStorage
  useEffect(() => {
    const savedGiftCards = localStorage.getItem("asudha_giftCards");
    if (savedGiftCards) {
      try {
        setGiftCards(JSON.parse(savedGiftCards));
      } catch (err) {
        console.error("Failed to load gift cards:", err);
      }
    }
  }, []);

  // Save gift cards to localStorage
  useEffect(() => {
    localStorage.setItem("asudha_giftCards", JSON.stringify(giftCards));
  }, [giftCards]);

  // Clear messages
  useEffect(() => {
    if (giftCardMessage) {
      const timer = setTimeout(() => {
        setGiftCardMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [giftCardMessage]);

  // Generate a unique, brand-specific gift card code
  const generateGiftCardCode = () => {
    const prefix = "ASUDHA";
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
    let code = prefix;
    for (let i = 0; i < 8; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  // Create a new gift card
  const createGiftCard = (
    amount,
    recipientName,
    recipientEmail,
    senderName,
    message,
    customCode = null,
  ) => {
    const newCode = customCode || generateGiftCardCode();

    if (customCode && giftCards.some((gc) => gc.code === customCode)) {
      return {
        success: false,
        error: "Gift card code already exists. Please use a different code.",
      };
    }

    const themeKeys = Object.keys(GIFT_CARD_THEMES);
    const randomTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)];

    const newGiftCard = {
      id: Date.now().toString(),
      code: newCode,
      amount: Number(amount),
      remainingBalance: Number(amount),
      recipientName: recipientName.trim(),
      recipientEmail: recipientEmail.trim().toLowerCase(),
      senderName: senderName.trim(),
      message: message.trim() || "✨ Wishing you radiant health and natural beauty!",
      theme: GIFT_CARD_THEMES[randomTheme],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      usedTransactions: [],
      isGifted: true,
    };

    setGiftCards((prev) => [...prev, newGiftCard]);
    setGiftCardMessage({
      type: "success",
      text: `🎁 Gift card ${newCode} created successfully!`,
    });

    return { success: true, giftCard: newGiftCard };
  };

  // Validate a gift card
  const validateGiftCard = (code) => {
    const normalizedCode = code.trim().toUpperCase();
    const giftCard = giftCards.find((gc) => gc.code === normalizedCode);

    if (!giftCard) {
      return {
        valid: false,
        error: "Invalid gift card code. Please check and try again.",
      };
    }

    if (!giftCard.isActive) {
      return { valid: false, error: "This gift card has been deactivated." };
    }

    if (new Date(giftCard.expiresAt) < new Date()) {
      return { valid: false, error: "This gift card has expired." };
    }

    if (giftCard.remainingBalance <= 0) {
      return {
        valid: false,
        error: "This gift card has a zero balance and cannot be used.",
      };
    }

    return { valid: true, giftCard };
  };

  // Apply gift card to order
  const applyGiftCard = (code, orderTotal) => {
    removeAppliedGiftCard();

    const validation = validateGiftCard(code);

    if (!validation.valid) {
      setGiftCardMessage({
        type: "error",
        text: `❌ ${validation.error}`,
      });
      return { success: false, error: validation.error };
    }

    const giftCard = validation.giftCard;
    const discountAmount = Math.min(giftCard.remainingBalance, orderTotal);

    setAppliedGiftCard({
      ...giftCard,
      appliedAmount: discountAmount,
    });
    setGiftCardDiscount(discountAmount);

    setGiftCardMessage({
      type: "success",
      text: `🎉 Gift card ${giftCard.code} applied! You saved ₹${discountAmount.toFixed(2)}.`,
    });

    return {
      success: true,
      discount: discountAmount,
      remainingBalance: giftCard.remainingBalance - discountAmount,
    };
  };

  // Remove applied gift card
  const removeAppliedGiftCard = () => {
    if (appliedGiftCard) {
      setGiftCardMessage({
        type: "info",
        text: `💳 Gift card ${appliedGiftCard.code} removed.`,
      });
    }
    setAppliedGiftCard(null);
    setGiftCardDiscount(0);
  };

  // Redeem gift card
  const redeemGiftCard = (code, amount, orderId) => {
    const normalizedCode = code.trim().toUpperCase();
    const giftCardIndex = giftCards.findIndex(
      (gc) => gc.code === normalizedCode,
    );

    if (giftCardIndex === -1) {
      return { success: false, error: "Gift card not found" };
    }

    const giftCard = giftCards[giftCardIndex];
    const newBalance = giftCard.remainingBalance - Number(amount);

    if (newBalance < 0) {
      return { success: false, error: "Insufficient balance on gift card" };
    }

    const updatedGiftCard = {
      ...giftCard,
      remainingBalance: newBalance,
      usedTransactions: [
        ...giftCard.usedTransactions,
        {
          orderId,
          amount: Number(amount),
          date: new Date().toISOString(),
        },
      ],
      isActive: newBalance > 0,
    };

    const updatedGiftCards = [...giftCards];
    updatedGiftCards[giftCardIndex] = updatedGiftCard;
    setGiftCards(updatedGiftCards);

    if (appliedGiftCard && appliedGiftCard.code === normalizedCode) {
      setAppliedGiftCard({
        ...updatedGiftCard,
        appliedAmount: 0,
      });
      setGiftCardDiscount(0);
    }

    setGiftCardMessage({
      type: "success",
      text: `✅ ₹${amount} redeemed from gift card ${normalizedCode}. Remaining: ₹${newBalance}.`,
    });

    return { success: true, remainingBalance: newBalance };
  };

  // Get gift card by code
  const getGiftCardByCode = (code) => {
    return giftCards.find((gc) => gc.code === code.trim().toUpperCase());
  };

  // Get all active gift cards
  const getActiveGiftCards = () => {
    return giftCards.filter((gc) => gc.isActive && gc.remainingBalance > 0);
  };

  // Get total gift card balance
  const getTotalGiftCardBalance = () => {
    return giftCards.reduce((total, gc) => total + gc.remainingBalance, 0);
  };

  // Calculate discounted total
  const calculateDiscountedTotal = (subtotal) => {
    if (!appliedGiftCard || giftCardDiscount === 0) return subtotal;
    return Math.max(0, subtotal - giftCardDiscount);
  };

  // Clear message
  const clearGiftCardMessage = () => setGiftCardMessage(null);

  const value = {
    giftCards,
    appliedGiftCard,
    giftCardDiscount,
    giftCardMessage,
    clearGiftCardMessage,
    createGiftCard,
    validateGiftCard,
    applyGiftCard,
    removeAppliedGiftCard,
    redeemGiftCard,
    getGiftCardByCode,
    getActiveGiftCards,
    getTotalGiftCardBalance,
    calculateDiscountedTotal,
  };

  return (
    <GiftCardContext.Provider value={value}>
      {children}
    </GiftCardContext.Provider>
  );
};