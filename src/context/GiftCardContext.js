import React, { createContext, useState, useContext, useEffect } from 'react';

const GiftCardContext = createContext();

export const useGiftCard = () => {
  const context = useContext(GiftCardContext);
  if (!context) {
    throw new Error('useGiftCard must be used within a GiftCardProvider');
  }
  return context;
};

export const GiftCardProvider = ({ children }) => {
  const [giftCards, setGiftCards] = useState([]);
  const [appliedGiftCard, setAppliedGiftCard] = useState(null);
  const [giftCardDiscount, setGiftCardDiscount] = useState(0);

  // Load gift cards from localStorage
  useEffect(() => {
    const savedGiftCards = localStorage.getItem('giftCards');
    if (savedGiftCards) {
      setGiftCards(JSON.parse(savedGiftCards));
    }
  }, []);

  // Save gift cards to localStorage
  useEffect(() => {
    localStorage.setItem('giftCards', JSON.stringify(giftCards));
  }, [giftCards]);

  // Generate a unique gift card code
  const generateGiftCardCode = () => {
    const prefix = 'NC';
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    let code = prefix;
    for (let i = 0; i < 10; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  // Create a new gift card
  const createGiftCard = (amount, recipientName, recipientEmail, senderName, message) => {
    const newGiftCard = {
      id: Date.now().toString(),
      code: generateGiftCardCode(),
      amount: amount,
      remainingBalance: amount,
      recipientName: recipientName,
      recipientEmail: recipientEmail,
      senderName: senderName,
      message: message,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year expiry
      isActive: true,
      usedTransactions: []
    };

    setGiftCards(prev => [...prev, newGiftCard]);
    return newGiftCard;
  };

  // Validate and apply gift card
  const validateGiftCard = (code) => {
    const giftCard = giftCards.find(gc => gc.code === code && gc.isActive);
    
    if (!giftCard) {
      return { valid: false, error: 'Invalid gift card code' };
    }
    
    if (new Date(giftCard.expiresAt) < new Date()) {
      return { valid: false, error: 'Gift card has expired' };
    }
    
    if (giftCard.remainingBalance <= 0) {
      return { valid: false, error: 'Gift card has no remaining balance' };
    }
    
    return { valid: true, giftCard };
  };

  // Apply gift card to order
  const applyGiftCard = (code, orderTotal) => {
    const validation = validateGiftCard(code);
    
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    
    const giftCard = validation.giftCard;
    const discountAmount = Math.min(giftCard.remainingBalance, orderTotal);
    
    setAppliedGiftCard({
      ...giftCard,
      appliedAmount: discountAmount
    });
    setGiftCardDiscount(discountAmount);
    
    return { 
      success: true, 
      discount: discountAmount,
      remainingBalance: giftCard.remainingBalance - discountAmount
    };
  };

  // Remove applied gift card
  const removeAppliedGiftCard = () => {
    setAppliedGiftCard(null);
    setGiftCardDiscount(0);
  };

  // Redeem gift card (use balance)
  const redeemGiftCard = (code, amount, orderId) => {
    const giftCard = giftCards.find(gc => gc.code === code);
    if (!giftCard) return false;
    
    const newBalance = giftCard.remainingBalance - amount;
    const updatedGiftCard = {
      ...giftCard,
      remainingBalance: newBalance,
      usedTransactions: [
        ...giftCard.usedTransactions,
        {
          orderId,
          amount,
          date: new Date().toISOString()
        }
      ],
      isActive: newBalance > 0
    };
    
    setGiftCards(prev => prev.map(gc => 
      gc.code === code ? updatedGiftCard : gc
    ));
    
    return true;
  };

  // Get gift card by code
  const getGiftCardByCode = (code) => {
    return giftCards.find(gc => gc.code === code);
  };

  // Get all active gift cards
  const getActiveGiftCards = () => {
    return giftCards.filter(gc => gc.isActive && gc.remainingBalance > 0);
  };

  const value = {
    giftCards,
    appliedGiftCard,
    giftCardDiscount,
    createGiftCard,
    validateGiftCard,
    applyGiftCard,
    removeAppliedGiftCard,
    redeemGiftCard,
    getGiftCardByCode,
    getActiveGiftCards
  };

  return (
    <GiftCardContext.Provider value={value}>
      {children}
    </GiftCardContext.Provider>
  );
};