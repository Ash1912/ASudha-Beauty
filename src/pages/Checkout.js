import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import SEO from "../components/SEO";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTruck,
  FaCreditCard,
  FaUniversity,
  FaQrcode,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
  FaGooglePay,
  FaAmazonPay,
  FaTimes,
  FaGift,
  FaLeaf,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCity,
  FaBuilding,
  FaRegAddressCard,
  FaWallet,
  FaShoppingCart,
  FaSpa,
} from "react-icons/fa";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import { usePixelTracking } from "../context/PixelContext";
import GiftCardInput from "../components/GiftCardInput";
import { useGiftCard } from "../context/GiftCardContext";

// ─── Brand palette (module-scope: stable references) ───
const brandColors = {
  primary: "#f5346b",
  primaryDark: "#cf2a57",
  gold: "#f7d794",
  goldDark: "#d4af37",
  bronze: "#c77d42",
  black: "#0f0f0f",
  darkSlate: "#1a1a1a",
  earthDark: "#3e2723",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
  danger: "#c62828",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 22px 48px rgba(0, 0, 0, 0.7)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 22px 48px rgba(62, 39, 35, 0.12)";

const Checkout = () => {
  const trackEvent = usePixelTracking();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const {
    giftCardDiscount,
    appliedGiftCard,
    redeemGiftCard,
    removeAppliedGiftCard,
  } = useGiftCard();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [qrCodeSrc, setQrCodeSrc] = useState(
    "/assets/images/payment/qr-code.jpeg"
  );
  const [qrError, setQrError] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [initiateCheckoutTracked, setInitiateCheckoutTracked] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    saveInfo: false,
  });

  const [errors, setErrors] = useState({});

  // ─── Theme tokens ───
  const dark = {
    bg: brandColors.black,
    bgAlt: "#141414",
    card: brandColors.darkSlate,
    cardAlt: "#222222",
    border: "rgba(212, 175, 55, 0.14)",
    borderSoft: "rgba(255, 255, 255, 0.06)",
    divider: "rgba(255, 255, 255, 0.08)",
    text: "#f5f0eb",
    textMuted: "#c9b8b0",
    textDim: "#8d7d76",
    gold: brandColors.gold,
    green: brandColors.green,
    accent: brandColors.primary,
    danger: "#ff8a80",
    shadow: DARK_SHADOW,
    shadowLift: DARK_SHADOW_LIFT,
  };

  const light = {
    bg: brandColors.cream,
    bgAlt: "#ffffff",
    card: "#ffffff",
    cardAlt: "#f9f4f0",
    border: "rgba(62, 39, 35, 0.08)",
    borderSoft: "rgba(62, 39, 35, 0.04)",
    divider: "rgba(62, 39, 35, 0.06)",
    text: "#3e2723",
    textMuted: brandColors.earthLight,
    textDim: "#8d7d76",
    gold: brandColors.goldDark,
    green: brandColors.green,
    accent: brandColors.primary,
    danger: brandColors.danger,
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  useEffect(() => {
    if (cartItems.length > 0 && !initiateCheckoutTracked && !orderComplete) {
      trackEvent.initiateCheckout(cartItems, getCartTotal());
      setInitiateCheckoutTracked(true);
    }
  }, [
    cartItems,
    trackEvent,
    initiateCheckoutTracked,
    orderComplete,
    getCartTotal,
  ]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      navigate("/cart");
    }
  }, [cartItems, navigate, orderComplete]);

  // Lock body scroll when the mobile summary sheet is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (showMobileSummary) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev || "";
    }
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [showMobileSummary]);

  // ============================================================
  // PRICE CALCULATION (MRP already includes GST — no tax added)
  // ============================================================
  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 40;
  const discountFromCoupon = couponApplied ? couponDiscount : 0;
  const totalBeforeGift = subtotal - discountFromCoupon + shipping;
  const applicableGiftCardAmount = Math.min(
    giftCardDiscount,
    Math.max(0, totalBeforeGift)
  );
  const total = Math.max(0, totalBeforeGift - applicableGiftCardAmount);

  const hasNaturalItems = cartItems.some(
    (item) => item.category === "Skincare" || item.category === "Hair Care"
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleApplyCoupon = () => {
    const validCoupons = {
      ASUDHA10: { discount: 10 },
      WELCOME: { discount: 5 },
      NATURAL: { discount: 15 },
      GLOW: { discount: 20 },
    };

    const code = couponCode.toUpperCase().trim();
    if (validCoupons[code]) {
      setCouponApplied(true);
      setCouponDiscount(subtotal * (validCoupons[code].discount / 100));
    } else {
      alert("Invalid coupon code. Try: ASUDHA10, WELCOME, NATURAL, or GLOW");
    }
  };

  const initiatePayment = async () => {
    setProcessing(true);

    setTimeout(() => {
      const newOrderId =
        "ASU" + Math.random().toString(36).substring(2, 10).toUpperCase();

      if (appliedGiftCard && applicableGiftCardAmount > 0) {
        redeemGiftCard(
          appliedGiftCard.code,
          applicableGiftCardAmount,
          newOrderId
        );
      }

      addOrder({
        id: newOrderId,
        date: new Date().toISOString().split("T")[0],
        status: "Processing",
        subtotal: subtotal,
        shipping: shipping,
        discount: discountFromCoupon,
        giftCardUsed: applicableGiftCardAmount,
        total: total,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          category: item.category,
          selectedShade: item.selectedShade || null,
        })),
        customer: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: paymentMethod,
        estimatedDelivery: new Date(
          Date.now() + 5 * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      });

      setOrderId(newOrderId);
      setOrderComplete(true);

      trackEvent.purchase(newOrderId, total, cartItems);

      clearCart();
      setProcessing(false);
    }, 2000);
  };

  const handlePlaceOrder = async () => {
    if (currentStep === 2) {
      await initiatePayment();
    }
  };

  const handleUPIPayment = () => {
    if (upiId) {
      setProcessing(true);
      setTimeout(() => {
        setPaymentConfirmed(true);
        setProcessing(false);
      }, 1500);
    }
  };

  const handleQRPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setPaymentConfirmed(true);
      setProcessing(false);
    }, 1500);
  };

  const handleQrUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCodeSrc(reader.result);
        setQrError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStepNumberStyle = (step) => {
    if (step < currentStep) {
      return {
        backgroundColor: brandColors.green,
        color: "#ffffff",
        borderColor: "transparent",
        boxShadow: "0 8px 20px rgba(76, 175, 80, 0.35)",
      };
    }
    if (step === currentStep) {
      return {
        background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
        color: isDarkMode ? brandColors.black : "#ffffff",
        borderColor: "transparent",
        boxShadow: isDarkMode
          ? "0 10px 26px rgba(245, 52, 107, 0.4)"
          : "0 10px 26px rgba(245, 52, 107, 0.3)",
        transform: "scale(1.08)",
      };
    }
    return {
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.06)"
        : "rgba(62, 39, 35, 0.04)",
      color: T.textMuted,
    };
  };

  const getStepLabelStyle = (step) => {
    if (step <= currentStep) {
      return {
        color: T.text,
        fontWeight: step === currentStep ? "800" : "600",
      };
    }
    return {
      color: T.textMuted,
      fontWeight: "500",
    };
  };

  // Breakpoints
  const isSmallMobile = windowWidth <= 360;
  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth <= 1024;
  const isNarrow = windowWidth <= 768;

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-checkout-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-checkout-styles", "true");
    style.textContent = `
      @keyframes checkoutFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -30px) scale(1.08); }
      }
      @keyframes checkoutFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-40px, 25px) scale(1.06); }
      }
      @keyframes checkoutFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(30px, 45px) scale(1.1); }
      }
      @keyframes checkoutShine {
        0% { transform: translateX(-120%) skewX(-20deg); }
        100% { transform: translateX(220%) skewX(-20deg); }
      }

      .co-orb-1 { animation: checkoutFloat1 15s ease-in-out infinite; }
      .co-orb-2 { animation: checkoutFloat2 19s ease-in-out infinite; }
      .co-orb-3 { animation: checkoutFloat3 17s ease-in-out infinite; }

      .co-input {
        transition: border-color 0.25s ease, box-shadow 0.25s ease,
                    background-color 0.25s ease;
      }
      .co-input:focus {
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.bronze
        } !important;
        box-shadow: 0 0 0 4px ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.18)"
            : "rgba(199, 125, 66, 0.1)"
        } !important;
        background-color: ${isDarkMode ? "#0a0a0a" : "#ffffff"} !important;
      }
      .co-input::placeholder {
        color: ${isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(62,39,35,0.35)"};
      }

      .co-payment-method {
        transition: transform 0.25s ease, box-shadow 0.25s ease,
                    border-color 0.25s ease, background-color 0.25s ease;
      }
      .co-payment-method:hover {
        transform: translateY(-3px);
        box-shadow: ${
          isDarkMode
            ? "0 14px 32px rgba(0, 0, 0, 0.5)"
            : "0 14px 32px rgba(62, 39, 35, 0.1)"
        };
        border-color: ${
          isDarkMode ? "rgba(212, 175, 55, 0.3)" : "rgba(199, 125, 66, 0.25)"
        } !important;
      }

      .co-primary-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .co-primary-btn:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
      }
      .co-primary-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .co-secondary-btn {
        transition: transform 0.25s ease, background-color 0.25s ease,
                    border-color 0.25s ease;
      }
      .co-secondary-btn:hover {
        transform: translateY(-2px);
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
      }

      .co-coupon-btn {
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }
      .co-coupon-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(245, 52, 107, 0.4);
      }

      .co-back-btn {
        transition: all 0.25s ease;
      }
      .co-back-btn:hover {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        border-color: transparent !important;
        transform: translateX(-4px);
      }

      /* Shimmer on final total */
      .co-total-shine {
        position: relative;
        display: inline-block;
        overflow: hidden;
      }
      .co-total-shine::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent,
          ${
            isDarkMode
              ? "rgba(255,255,255,0.2)"
              : "rgba(255,255,255,0.6)"
          },
          transparent
        );
        transform: translateX(-120%) skewX(-20deg);
        animation: checkoutShine 4s ease-in-out infinite;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-checkout-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const themeStyles = {
    // ─── Page wrapper ───
    container: {
      position: "relative",
      minHeight: "100%",
      backgroundColor: T.bg,
      color: T.text,
      transition: "background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
      overflowX: "hidden",
    },

    // ─── Animated background layers ───
    bgLayer: {
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
    },
    bgGradient: {
      position: "absolute",
      inset: 0,
      background: isDarkMode
        ? "radial-gradient(circle at 15% 10%, rgba(245, 52, 107, 0.16) 0%, transparent 45%), radial-gradient(circle at 90% 25%, rgba(212, 175, 55, 0.12) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)"
        : "radial-gradient(circle at 15% 10%, rgba(245, 52, 107, 0.09) 0%, transparent 45%), radial-gradient(circle at 90% 25%, rgba(212, 175, 55, 0.08) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(76, 175, 80, 0.07) 0%, transparent 50%)",
    },
    bgGrid: {
      position: "absolute",
      inset: 0,
      backgroundImage: isDarkMode
        ? "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)"
        : "linear-gradient(rgba(62,39,35,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(62,39,35,0.035) 1px, transparent 1px)",
      backgroundSize: "46px 46px",
      maskImage:
        "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
      WebkitMaskImage:
        "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
    },
    bgOrb1: {
      position: "absolute",
      top: "-150px",
      left: "-150px",
      width: "500px",
      height: "500px",
      maxWidth: "65vw",
      maxHeight: "65vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(245, 52, 107, 0.38) 0%, transparent 70%)",
      filter: "blur(95px)",
      opacity: isDarkMode ? 0.42 : 0.32,
    },
    bgOrb2: {
      position: "absolute",
      top: "30%",
      right: "-170px",
      width: "520px",
      height: "520px",
      maxWidth: "65vw",
      maxHeight: "65vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(212, 175, 55, 0.38) 0%, transparent 70%)",
      filter: "blur(95px)",
      opacity: isDarkMode ? 0.42 : 0.32,
    },
    bgOrb3: {
      position: "absolute",
      bottom: "-170px",
      left: "25%",
      width: "460px",
      height: "460px",
      maxWidth: "60vw",
      maxHeight: "60vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.34) 0%, transparent 70%)",
      filter: "blur(95px)",
      opacity: isDarkMode ? 0.38 : 0.28,
    },

    // ─── Content wrapper ───
    content: {
      position: "relative",
      zIndex: 1,
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isSmallMobile
        ? "1rem 0.75rem 2.5rem"
        : isMobile
        ? "1.25rem 1rem 3rem"
        : isNarrow
        ? "2rem 1.25rem 4rem"
        : "2.5rem 1.5rem 5rem",
      width: "100%",
      boxSizing: "border-box",
    },

    // ─── Header ───
    header: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "0.5rem" : "0.85rem",
      marginBottom: isMobile ? "1.25rem" : "2.25rem",
      flexWrap: "wrap",
      width: "100%",
      boxSizing: "border-box",
    },
    backButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.45rem",
      padding: isSmallMobile ? "0.4rem 0.85rem" : "0.55rem 1.15rem",
      backgroundColor: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      color: T.text,
      textDecoration: "none",
      fontSize: isSmallMobile ? "0.75rem" : "0.88rem",
      fontWeight: "700",
      whiteSpace: "nowrap",
      boxShadow: T.shadow,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },
    title: {
      fontSize: isSmallMobile
        ? "1.2rem"
        : isMobile
        ? "1.4rem"
        : isNarrow
        ? "1.7rem"
        : "2.1rem",
      fontWeight: "900",
      color: T.text,
      margin: 0,
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: "0.55rem",
      minWidth: 0,
      letterSpacing: "-0.5px",
    },
    titleIcon: {
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      fontSize: isSmallMobile ? "1.05rem" : "1.5rem",
      flexShrink: 0,
    },
    mobileSummaryToggle: {
      display: isTablet ? "inline-flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.45rem",
      padding: isSmallMobile ? "0.45rem 0.95rem" : "0.6rem 1.35rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: isSmallMobile ? "0.72rem" : "0.85rem",
      fontWeight: "800",
      cursor: "pointer",
      whiteSpace: "nowrap",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      flexShrink: 0,
      fontFamily: "inherit",
    },

    // ─── Steps ───
    stepsContainer: {
      marginBottom: isMobile ? "1.5rem" : "2.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      position: "relative",
      width: "100%",
      boxSizing: "border-box",
      padding: isMobile ? "0 0.5rem" : "0 1rem",
    },
    step: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      zIndex: 2,
      flex: 1,
      minWidth: 0,
    },
    stepNumber: {
      width: isSmallMobile ? "32px" : isMobile ? "38px" : "46px",
      height: isSmallMobile ? "32px" : isMobile ? "38px" : "46px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "800",
      marginBottom: "0.5rem",
      fontSize: isSmallMobile ? "0.8rem" : isMobile ? "0.9rem" : "1.05rem",
      border: `1px solid ${T.borderSoft}`,
      transition: "all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    },
    stepLabel: {
      fontSize: isSmallMobile ? "0.65rem" : isMobile ? "0.75rem" : "0.92rem",
      textAlign: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
      padding: "0 0.15rem",
      letterSpacing: "0.2px",
    },
    stepLine: {
      position: "absolute",
      top: isSmallMobile ? "16px" : isMobile ? "19px" : "23px",
      left: "0",
      right: "0",
      height: "2px",
      backgroundColor: T.borderSoft,
      zIndex: 1,
    },
    stepLineFill: {
      position: "absolute",
      top: isSmallMobile ? "16px" : isMobile ? "19px" : "23px",
      left: "0",
      height: "2px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary})`,
      width: `${(currentStep - 1) * 50}%`,
      transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: 1,
      boxShadow: "0 0 10px rgba(245, 52, 107, 0.5)",
    },

    // ─── Grid ───
    checkoutGrid: {
      display: "grid",
      gridTemplateColumns: isNarrow
        ? "minmax(0, 1fr)"
        : "minmax(0, 2fr) minmax(0, 1fr)",
      gap: isMobile ? "1.25rem" : "2rem",
      width: "100%",
      boxSizing: "border-box",
      alignItems: "stretch",
    },

    // ─── Form card ───
    formSection: {
      backgroundColor: T.card,
      borderRadius: isMobile ? "20px" : "24px",
      padding: isSmallMobile ? "1.25rem" : isMobile ? "1.5rem" : "2.5rem",
      marginBottom: isMobile ? "1.25rem" : "2rem",
      width: "100%",
      boxSizing: "border-box",
      boxShadow: T.shadowLift,
      border: `1px solid ${T.border}`,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      position: "relative",
      overflow: "hidden",
    },
    formAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },
    sectionTitle: {
      fontSize: isMobile ? "1.1rem" : "1.35rem",
      fontWeight: "900",
      marginBottom: isMobile ? "1.25rem" : "1.75rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      flexWrap: "wrap",
      letterSpacing: "-0.3px",
    },
    sectionIconWrap: {
      width: isMobile ? "38px" : "44px",
      height: isMobile ? "38px" : "44px",
      borderRadius: "12px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      boxShadow: "0 8px 20px rgba(245, 52, 107, 0.3)",
      flexShrink: 0,
    },

    formGrid: {
      display: "grid",
      gridTemplateColumns: isNarrow
        ? "minmax(0, 1fr)"
        : "repeat(2, minmax(0, 1fr))",
      gap: isMobile ? "1rem" : "1.15rem",
      width: "100%",
      boxSizing: "border-box",
    },
    formGroup: {
      marginBottom: "0.5rem",
      gridColumn: isNarrow ? "1 / -1" : "auto",
      width: "100%",
      boxSizing: "border-box",
      minWidth: 0,
    },
    label: {
      display: "block",
      marginBottom: "0.45rem",
      fontSize: isMobile ? "0.8rem" : "0.88rem",
      fontWeight: "700",
      color: T.text,
      letterSpacing: "0.2px",
    },
    labelIcon: {
      marginRight: "0.4rem",
      fontSize: "0.75rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
    },
    input: {
      width: "100%",
      padding: isMobile ? "0.8rem 1.15rem" : "0.9rem 1.25rem",
      backgroundColor: isDarkMode ? brandColors.black : brandColors.cream,
      border: `1.5px solid ${T.border}`,
      borderRadius: "14px",
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      color: T.text,
      transition: "all 0.3s ease",
      outline: "none",
      boxSizing: "border-box",
      fontFamily: "inherit",
    },
    error: {
      color: T.danger,
      fontSize: "0.75rem",
      marginTop: "0.35rem",
      marginLeft: "0.5rem",
      fontWeight: "600",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      cursor: "pointer",
      color: T.text,
      fontSize: isMobile ? "0.82rem" : "0.9rem",
      flexWrap: "wrap",
      fontWeight: "600",
    },

    // ─── Coupon ───
    couponSection: {
      marginBottom: "1.5rem",
      padding: isMobile ? "1.25rem" : "1.5rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.06)"
        : "rgba(212, 175, 55, 0.05)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      borderRadius: "18px",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(212, 175, 55, 0.15)"
      }`,
    },
    couponTitle: {
      fontSize: isMobile ? "0.9rem" : "1rem",
      fontWeight: "800",
      marginBottom: "0.9rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      letterSpacing: "-0.2px",
    },
    couponInput: {
      display: "flex",
      gap: "0.6rem",
      flexDirection: isMobile ? "column" : "row",
    },
    couponInputField: {
      flex: 1,
      padding: "0.8rem 1.15rem",
      backgroundColor: isDarkMode ? brandColors.black : "#ffffff",
      border: `1.5px solid ${T.border}`,
      borderRadius: "14px",
      color: T.text,
      fontSize: "0.9rem",
      outline: "none",
      transition: "all 0.3s ease",
      minWidth: 0,
      fontFamily: "inherit",
    },
    applyCouponButton: {
      padding: "0.8rem 1.75rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "0.88rem",
      fontWeight: "800",
      cursor: "pointer",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      width: isMobile ? "100%" : "auto",
      flexShrink: 0,
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },
    couponSuccess: {
      marginTop: "0.75rem",
      padding: "0.7rem 1rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.1)",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.25)" : "rgba(76, 175, 80, 0.2)"
      }`,
      borderRadius: "14px",
      textAlign: "center",
      fontSize: "0.85rem",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },

    // ─── Payment methods ───
    paymentMethods: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(4, minmax(0, 1fr))",
      gap: isMobile ? "0.65rem" : "1rem",
      marginBottom: "2rem",
      width: "100%",
      boxSizing: "border-box",
    },
    paymentMethod: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.45rem",
      padding: isMobile ? "1rem 0.65rem" : "1.4rem 1rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.03)"
        : "rgba(255,255,255,0.7)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      border: `2px solid ${T.border}`,
      borderRadius: "18px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
    activePaymentMethod: {
      borderColor: isDarkMode ? brandColors.gold : brandColors.primary,
      background: isDarkMode
        ? "linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(245, 52, 107, 0.08))"
        : "linear-gradient(135deg, rgba(245, 52, 107, 0.08), rgba(212, 175, 55, 0.05))",
      boxShadow: isDarkMode
        ? "0 12px 28px rgba(245, 52, 107, 0.25)"
        : "0 12px 28px rgba(245, 52, 107, 0.15)",
    },
    paymentIcon: {
      fontSize: isMobile ? "1.6rem" : "2rem",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
    },
    paymentName: {
      fontSize: isSmallMobile ? "0.65rem" : isMobile ? "0.72rem" : "0.88rem",
      fontWeight: "800",
      textAlign: "center",
      color: T.text,
      letterSpacing: "0.2px",
    },

    // ─── UPI section ───
    upiSection: {
      marginTop: "1.5rem",
      padding: isMobile ? "1.5rem 1.25rem" : "2rem 2.25rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.03)"
        : "rgba(255,255,255,0.7)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      borderRadius: "20px",
      textAlign: "center",
      width: "100%",
      boxSizing: "border-box",
      border: `1px solid ${T.border}`,
    },
    upiTitle: {
      marginBottom: "1.25rem",
      fontSize: isMobile ? "1rem" : "1.15rem",
      color: T.text,
      fontWeight: "800",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      letterSpacing: "-0.2px",
    },
    qrCode: {
      width: isSmallMobile ? "170px" : isMobile ? "200px" : "260px",
      height: isSmallMobile ? "170px" : isMobile ? "200px" : "260px",
      margin: "0 auto 1.25rem",
      backgroundColor: isDarkMode ? brandColors.black : "#ffffff",
      borderRadius: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `2px solid ${T.border}`,
      overflow: "hidden",
      padding: "0.65rem",
      boxSizing: "border-box",
      boxShadow: T.shadow,
    },
    qrImage: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
    },
    qrPlaceholder: {
      textAlign: "center",
      color: T.textMuted,
      fontSize: isMobile ? "0.8rem" : "0.95rem",
    },
    upiInput: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "0.65rem",
      maxWidth: "440px",
      margin: "1rem auto",
      width: "100%",
      boxSizing: "border-box",
    },
    verifyButton: {
      padding: isMobile ? "0.8rem 1rem" : "0.85rem 1.75rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "0.88rem" : "0.95rem",
      fontWeight: "800",
      cursor: "pointer",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
      width: isMobile ? "100%" : "auto",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },
    paymentConfirmed: {
      marginTop: "1rem",
      padding: "0.85rem 1rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.15)"
        : "rgba(76, 175, 80, 0.1)",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      flexWrap: "wrap",
      width: "100%",
      boxSizing: "border-box",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.25)" : "rgba(76, 175, 80, 0.2)"
      }`,
      fontWeight: "700",
    },

    // ─── Summary (desktop + mobile sheet) ───
    summary: {
      backgroundColor: T.card,
      borderRadius: isMobile ? "20px" : "24px",
      padding: isMobile ? "1.5rem 1.25rem" : "2rem 1.75rem",
      position: isTablet ? "fixed" : "sticky",
      top: isTablet ? "auto" : "2rem",
      bottom: isTablet ? "0" : "auto",
      left: isTablet ? "0" : "auto",
      right: isTablet ? "0" : "auto",
      zIndex: isTablet ? 1000 : 1,
      transform:
        isTablet && !showMobileSummary ? "translateY(100%)" : "translateY(0)",
      transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      height: isTablet ? "auto" : "fit-content",
      display: "flex",
      flexDirection: "column",
      maxHeight: isTablet ? "85vh" : "none",
      overflowY: isTablet ? "auto" : "visible",
      borderTopLeftRadius: isTablet ? "24px" : "24px",
      borderTopRightRadius: isTablet ? "24px" : "24px",
      borderBottomLeftRadius: isTablet ? "0" : "24px",
      borderBottomRightRadius: isTablet ? "0" : "24px",
      boxShadow: isTablet
        ? "0 -12px 40px rgba(0, 0, 0, 0.45)"
        : T.shadowLift,
      width: isTablet ? "100%" : "auto",
      boxSizing: "border-box",
      border: `1px solid ${T.border}`,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },
    summaryAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
      opacity: 0.9,
    },
    summaryBackdrop: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      zIndex: 999,
      display: isTablet && showMobileSummary ? "block" : "none",
    },
    summaryHeader: {
      display: isTablet ? "flex" : "none",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.15rem",
      paddingBottom: "0.85rem",
      borderBottom: `1px solid ${T.divider}`,
    },
    closeSummary: {
      background: "none",
      border: "none",
      fontSize: "1.2rem",
      cursor: "pointer",
      color: T.text,
      padding: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      transition: "all 0.25s ease",
    },
    summaryTitle: {
      fontSize: isMobile ? "1.15rem" : "1.3rem",
      fontWeight: "900",
      marginBottom: "1.25rem",
      color: T.text,
      display: "flex",
      alignItems: "center",
      gap: "0.55rem",
      letterSpacing: "-0.3px",
    },
    summaryItem: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.6rem",
      color: T.textMuted,
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      flexWrap: "wrap",
      gap: "0.5rem",
      fontWeight: "600",
    },
    discountItem: {
      color: brandColors.green,
      fontWeight: "800",
    },
    giftCardItem: {
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      fontWeight: "800",
    },
    summaryDivider: {
      height: "1px",
      backgroundColor: T.divider,
      margin: "0.9rem 0",
    },
    summaryTotal: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: isMobile ? "1.05rem" : "1.2rem",
      fontWeight: "900",
      color: T.text,
      marginTop: "0.85rem",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    totalAmount: {
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      fontWeight: "900",
    },
    productItem: {
      display: "flex",
      gap: isMobile ? "0.65rem" : "1rem",
      marginBottom: "1.1rem",
      paddingBottom: "1.1rem",
      borderBottom: `1px solid ${T.borderSoft}`,
      flexWrap: isMobile ? "wrap" : "nowrap",
    },
    productImage: {
      width: isMobile ? "54px" : "64px",
      height: isMobile ? "54px" : "64px",
      borderRadius: "14px",
      objectFit: "cover",
      flexShrink: 0,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      border: `1px solid ${T.borderSoft}`,
    },
    productDetails: {
      flex: 1,
      minWidth: 0,
    },
    productName: {
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      fontWeight: "800",
      marginBottom: "0.3rem",
      color: T.text,
      whiteSpace: "normal",
      wordBreak: "break-word",
      letterSpacing: "-0.1px",
    },
    productMeta: {
      fontSize: isMobile ? "0.72rem" : "0.8rem",
      color: T.textMuted,
      marginBottom: "0.25rem",
      whiteSpace: "normal",
      wordBreak: "break-word",
      fontWeight: "600",
    },
    productPrice: {
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      fontWeight: "900",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
    },
    naturalBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.2rem",
      padding: "0.15rem 0.55rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.18)"
        : "rgba(76, 175, 80, 0.1)",
      color: brandColors.green,
      borderRadius: "50px",
      fontSize: "0.58rem",
      fontWeight: "800",
      marginLeft: "0.35rem",
      letterSpacing: "0.4px",
      textTransform: "uppercase",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.3)" : "rgba(76, 175, 80, 0.2)"
      }`,
    },

    // ─── Action buttons ───
    actionButtons: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "0.85rem",
      marginTop: "1.75rem",
      width: "100%",
      boxSizing: "border-box",
    },
    primaryButton: {
      flex: 1,
      padding: isSmallMobile ? "0.85rem" : isMobile ? "0.95rem" : "1.05rem",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: isSmallMobile ? "0.9rem" : isMobile ? "0.95rem" : "1.05rem",
      fontWeight: "800",
      cursor: "pointer",
      transition: "all 0.3s ease",
      width: isMobile ? "100%" : "auto",
      whiteSpace: "nowrap",
      boxShadow: "0 10px 26px rgba(245, 52, 107, 0.35)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      textDecoration: "none",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },
    secondaryButton: {
      flex: 1,
      padding: isSmallMobile ? "0.85rem" : isMobile ? "0.95rem" : "1.05rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.06)"
        : "rgba(62, 39, 35, 0.04)",
      color: T.text,
      border: `1.5px solid ${T.border}`,
      borderRadius: "50px",
      fontSize: isSmallMobile ? "0.9rem" : isMobile ? "0.95rem" : "1.05rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      width: isMobile ? "100%" : "auto",
      whiteSpace: "nowrap",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      fontFamily: "inherit",
    },
    securityBadge: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "1.5rem",
      padding: "0.85rem 1rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.03)"
        : "rgba(255,255,255,0.6)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      borderRadius: "16px",
      color: T.textMuted,
      fontSize: isMobile ? "0.78rem" : "0.88rem",
      flexWrap: "wrap",
      textAlign: "center",
      width: "100%",
      boxSizing: "border-box",
      border: `1px solid ${T.border}`,
      fontWeight: "700",
    },

    // ─── Order complete ───
    orderCompleteWrap: {
      position: "relative",
      zIndex: 1,
      maxWidth: "640px",
      margin: "0 auto",
      padding: isMobile ? "1.5rem 1rem" : "3rem 2rem",
      width: "100%",
      boxSizing: "border-box",
    },
    orderComplete: {
      textAlign: "center",
      padding: isMobile ? "2.5rem 1.5rem" : "4rem 2.5rem",
      backgroundColor: T.card,
      borderRadius: "28px",
      width: "100%",
      boxSizing: "border-box",
      boxShadow: T.shadowLift,
      border: `1px solid ${T.border}`,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      position: "relative",
      overflow: "hidden",
    },
    orderCompleteAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold}, ${brandColors.primary})`,
    },
    successIconWrap: {
      width: isMobile ? "96px" : "120px",
      height: isMobile ? "96px" : "120px",
      margin: "0 auto 1.75rem",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${brandColors.green}, #8bc34a)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 20px 48px rgba(76, 175, 80, 0.4)",
    },
    successIcon: {
      fontSize: isMobile ? "2.75rem" : "3.5rem",
      color: "#ffffff",
    },
    orderNumber: {
      fontSize: isMobile ? "0.9rem" : "1.1rem",
      color: T.text,
      margin: "1.5rem auto",
      padding: "1rem 1.5rem",
      backgroundColor: isDarkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.7)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      borderRadius: "18px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      wordBreak: "break-all",
      maxWidth: "100%",
      boxSizing: "border-box",
      border: `1px solid ${T.border}`,
      fontWeight: "800",
      letterSpacing: "0.5px",
    },

    // ─── Small notes ───
    freeShippingNote: {
      marginTop: "0.85rem",
      padding: "0.65rem 0.85rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.12)"
        : "rgba(76, 175, 80, 0.08)",
      color: isDarkMode ? "#a5d6a7" : "#2e7d32",
      borderRadius: "14px",
      textAlign: "center",
      fontSize: isMobile ? "0.78rem" : "0.88rem",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.4rem",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.25)" : "rgba(76, 175, 80, 0.2)"
      }`,
    },
    giftCardNote: {
      marginTop: "0.85rem",
      padding: "0.65rem 0.85rem",
      backgroundColor: isDarkMode
        ? "rgba(212, 175, 55, 0.12)"
        : "rgba(245, 52, 107, 0.06)",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      borderRadius: "14px",
      textAlign: "center",
      fontSize: isMobile ? "0.78rem" : "0.88rem",
      fontWeight: "700",
      border: `1px solid ${
        isDarkMode ? "rgba(212, 175, 55, 0.22)" : "rgba(245, 52, 107, 0.15)"
      }`,
    },
    mrpNote: {
      marginTop: "0.85rem",
      padding: "0.55rem 0.85rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.08)"
        : "rgba(76, 175, 80, 0.05)",
      color: brandColors.green,
      borderRadius: "14px",
      textAlign: "center",
      fontSize: isMobile ? "0.68rem" : "0.78rem",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.2)" : "rgba(76, 175, 80, 0.15)"
      }`,
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.3rem",
    },
    naturalBadgeNote: {
      marginTop: "0.85rem",
      padding: "0.5rem 0.75rem",
      backgroundColor: isDarkMode
        ? "rgba(76, 175, 80, 0.1)"
        : "rgba(76, 175, 80, 0.06)",
      borderRadius: "14px",
      fontSize: "0.75rem",
      color: brandColors.green,
      textAlign: "center",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.4rem",
      border: `1px solid ${
        isDarkMode ? "rgba(76, 175, 80, 0.2)" : "rgba(76, 175, 80, 0.15)"
      }`,
    },
  };

  // ─── Shared background ───
  const BackgroundLayer = () => (
    <div style={themeStyles.bgLayer}>
      <div style={themeStyles.bgGradient} />
      <div style={themeStyles.bgGrid} />
      <div
        className="co-orb-1"
        style={themeStyles.bgOrb1}
        aria-hidden="true"
      />
      <div
        className="co-orb-2"
        style={themeStyles.bgOrb2}
        aria-hidden="true"
      />
      <div
        className="co-orb-3"
        style={themeStyles.bgOrb3}
        aria-hidden="true"
      />
    </div>
  );

  if (orderComplete) {
    return (
      <div style={themeStyles.container}>
        <BackgroundLayer />
        <div style={themeStyles.orderCompleteWrap}>
          <SEO
            title="Order Confirmed | ASudha Beauty"
            description="Your order has been placed successfully at ASudha Beauty. Thank you for choosing natural Ayurvedic products."
            keywords="order confirmation, purchase success, order placed, Ayurvedic beauty"
            url="/checkout/success"
            type="website"
          />

          <div style={themeStyles.orderComplete}>
            <div style={themeStyles.orderCompleteAccent} />
            <div style={themeStyles.successIconWrap}>
              <FaCheckCircle style={themeStyles.successIcon} />
            </div>
            <h2
              style={{
                fontSize: isMobile ? "1.55rem" : "2rem",
                marginBottom: "0.85rem",
                color: T.text,
                fontWeight: "900",
                letterSpacing: "-0.4px",
              }}
            >
              Order Placed Successfully! 🎉
            </h2>
            <p
              style={{
                color: T.textMuted,
                marginBottom: "1rem",
                lineHeight: "1.7",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              Thank you for choosing ASudha Beauty. Your natural Ayurvedic
              products are on their way!
            </p>
            <div style={themeStyles.orderNumber}>
              <FaLeaf style={{ color: brandColors.green }} />
              Order ID: {orderId}
            </div>
            <p
              style={{
                color: T.textMuted,
                marginTop: "1rem",
                fontSize: "0.9rem",
                lineHeight: "1.65",
              }}
            >
              We&apos;ll send you an email with order details and tracking
              information.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.85rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "2rem",
              }}
            >
              <Link
                to="/track-order"
                style={{
                  ...themeStyles.primaryButton,
                  display: "inline-flex",
                  width: "auto",
                  padding: isMobile ? "0.85rem 1.75rem" : "1rem 2.25rem",
                  flex: "0 1 auto",
                }}
                className="co-primary-btn"
              >
                <FaTruck style={{ marginRight: "0.4rem" }} />
                Track Order
              </Link>
              <Link
                to="/shop"
                style={{
                  ...themeStyles.secondaryButton,
                  display: "inline-flex",
                  width: "auto",
                  padding: isMobile ? "0.85rem 1.75rem" : "1rem 2.25rem",
                  flex: "0 1 auto",
                }}
                className="co-secondary-btn"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={themeStyles.container}>
      <BackgroundLayer />
      <div style={themeStyles.content}>
        <SEO
          title="Checkout | ASudha Beauty"
          description="Secure checkout at ASudha Beauty. Complete your purchase safely with multiple payment options."
          keywords="checkout, payment, secure checkout, buy Ayurvedic products"
          url="/checkout"
          type="website"
        />

        {/* Backdrop for mobile summary sheet */}
        <div
          style={themeStyles.summaryBackdrop}
          onClick={() => setShowMobileSummary(false)}
        />

        <div style={themeStyles.header}>
          <Link to="/cart" style={themeStyles.backButton} className="co-back-btn">
            <FaArrowLeft /> Back
          </Link>
          <h1 style={themeStyles.title}>
            <FaShoppingCart style={themeStyles.titleIcon} />
            Checkout
          </h1>
          {isTablet && (
            <button
              style={themeStyles.mobileSummaryToggle}
              onClick={() => setShowMobileSummary(!showMobileSummary)}
              type="button"
            >
              {showMobileSummary ? "Hide" : "Show"} Summary
            </button>
          )}
        </div>

        {/* Steps */}
        <div style={themeStyles.stepsContainer}>
          <div style={themeStyles.stepLine} />
          <div style={themeStyles.stepLineFill} />

          <div style={themeStyles.step}>
            <div style={{ ...themeStyles.stepNumber, ...getStepNumberStyle(1) }}>
              1
            </div>
            <div style={{ ...themeStyles.stepLabel, ...getStepLabelStyle(1) }}>
              Shipping
            </div>
          </div>
          <div style={themeStyles.step}>
            <div style={{ ...themeStyles.stepNumber, ...getStepNumberStyle(2) }}>
              2
            </div>
            <div style={{ ...themeStyles.stepLabel, ...getStepLabelStyle(2) }}>
              Payment
            </div>
          </div>
          <div style={themeStyles.step}>
            <div style={{ ...themeStyles.stepNumber, ...getStepNumberStyle(3) }}>
              3
            </div>
            <div style={{ ...themeStyles.stepLabel, ...getStepLabelStyle(3) }}>
              Confirm
            </div>
          </div>
        </div>

        <div style={themeStyles.checkoutGrid}>
          <div style={{ minWidth: 0 }}>
            {currentStep === 1 && (
              <div style={themeStyles.formSection}>
                <div style={themeStyles.formAccentBar} />
                <h2 style={themeStyles.sectionTitle}>
                  <span style={themeStyles.sectionIconWrap}>
                    <FaTruck />
                  </span>
                  Shipping Information
                </h2>

                <div style={themeStyles.formGrid}>
                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>
                      <FaEnvelope style={themeStyles.labelIcon} /> Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={themeStyles.input}
                      className="co-input"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <div style={themeStyles.error}>{errors.email}</div>
                    )}
                  </div>

                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>
                      <FaPhone style={themeStyles.labelIcon} /> Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={themeStyles.input}
                      className="co-input"
                      placeholder="10 digit mobile number"
                    />
                    {errors.phone && (
                      <div style={themeStyles.error}>{errors.phone}</div>
                    )}
                  </div>

                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>
                      <FaUser style={themeStyles.labelIcon} /> First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={themeStyles.input}
                      className="co-input"
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <div style={themeStyles.error}>{errors.firstName}</div>
                    )}
                  </div>

                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>
                      <FaUser style={themeStyles.labelIcon} /> Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={themeStyles.input}
                      className="co-input"
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <div style={themeStyles.error}>{errors.lastName}</div>
                    )}
                  </div>

                  <div
                    style={{ ...themeStyles.formGroup, gridColumn: "1 / -1" }}
                  >
                    <label style={themeStyles.label}>
                      <FaMapMarkerAlt style={themeStyles.labelIcon} /> Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      style={themeStyles.input}
                      className="co-input"
                      placeholder="Street address"
                    />
                    {errors.address && (
                      <div style={themeStyles.error}>{errors.address}</div>
                    )}
                  </div>

                  <div
                    style={{ ...themeStyles.formGroup, gridColumn: "1 / -1" }}
                  >
                    <label style={themeStyles.label}>
                      <FaBuilding style={themeStyles.labelIcon} /> Apartment
                      (optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      style={themeStyles.input}
                      className="co-input"
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>
                      <FaCity style={themeStyles.labelIcon} /> City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={themeStyles.input}
                      className="co-input"
                      placeholder="City"
                    />
                    {errors.city && (
                      <div style={themeStyles.error}>{errors.city}</div>
                    )}
                  </div>

                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>
                      <FaRegAddressCard style={themeStyles.labelIcon} /> State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      style={themeStyles.input}
                      className="co-input"
                      placeholder="State"
                    />
                    {errors.state && (
                      <div style={themeStyles.error}>{errors.state}</div>
                    )}
                  </div>

                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>
                      <FaMapMarkerAlt style={themeStyles.labelIcon} /> Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      style={themeStyles.input}
                      className="co-input"
                      placeholder="6 digit pincode"
                    />
                    {errors.pincode && (
                      <div style={themeStyles.error}>{errors.pincode}</div>
                    )}
                  </div>

                  <div
                    style={{ ...themeStyles.formGroup, gridColumn: "1 / -1" }}
                  >
                    <label style={themeStyles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                      />
                      Save this information for next time
                    </label>
                  </div>
                </div>

                <div style={themeStyles.actionButtons}>
                  <Link
                    to="/cart"
                    style={themeStyles.secondaryButton}
                    className="co-secondary-btn"
                  >
                    Cancel
                  </Link>
                  <button
                    onClick={handleNextStep}
                    style={themeStyles.primaryButton}
                    className="co-primary-btn"
                    type="button"
                  >
                    Continue to Payment{" "}
                    <FaArrowRight style={{ marginLeft: "0.35rem" }} />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div style={themeStyles.formSection}>
                <div style={themeStyles.formAccentBar} />
                <h2 style={themeStyles.sectionTitle}>
                  <span style={themeStyles.sectionIconWrap}>
                    <FaCreditCard />
                  </span>
                  Payment Method
                </h2>

                <div style={themeStyles.couponSection}>
                  <h3 style={themeStyles.couponTitle}>
                    <FaGift
                      style={{
                        color: isDarkMode
                          ? brandColors.gold
                          : brandColors.primary,
                      }}
                    />
                    Have a coupon?
                  </h3>
                  <div style={themeStyles.couponInput}>
                    <input
                      type="text"
                      style={themeStyles.couponInputField}
                      className="co-input"
                      placeholder="Enter code (ASUDHA10, WELCOME...)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      style={themeStyles.applyCouponButton}
                      className="co-coupon-btn"
                      onClick={handleApplyCoupon}
                      disabled={couponApplied}
                      type="button"
                    >
                      {couponApplied ? "Applied ✓" : "Apply"}
                    </button>
                  </div>
                  {couponApplied && (
                    <div style={themeStyles.couponSuccess}>
                      <FaCheckCircle /> Discount applied!
                    </div>
                  )}
                </div>

                <GiftCardInput
                  orderTotal={totalBeforeGift}
                  onApply={(result) => {}}
                  onRemove={() => {
                    removeAppliedGiftCard();
                  }}
                />

                <div style={themeStyles.paymentMethods}>
                  <div
                    style={{
                      ...themeStyles.paymentMethod,
                      ...(paymentMethod === "card" &&
                        themeStyles.activePaymentMethod),
                    }}
                    className="co-payment-method"
                    onClick={() => setPaymentMethod("card")}
                    role="button"
                  >
                    <FaCreditCard style={themeStyles.paymentIcon} />
                    <span style={themeStyles.paymentName}>Card</span>
                  </div>

                  <div
                    style={{
                      ...themeStyles.paymentMethod,
                      ...(paymentMethod === "upi" &&
                        themeStyles.activePaymentMethod),
                    }}
                    className="co-payment-method"
                    onClick={() => setPaymentMethod("upi")}
                    role="button"
                  >
                    <FaQrcode style={themeStyles.paymentIcon} />
                    <span style={themeStyles.paymentName}>UPI</span>
                  </div>

                  <div
                    style={{
                      ...themeStyles.paymentMethod,
                      ...(paymentMethod === "netbanking" &&
                        themeStyles.activePaymentMethod),
                    }}
                    className="co-payment-method"
                    onClick={() => setPaymentMethod("netbanking")}
                    role="button"
                  >
                    <FaUniversity style={themeStyles.paymentIcon} />
                    <span style={themeStyles.paymentName}>Net Banking</span>
                  </div>

                  <div
                    style={{
                      ...themeStyles.paymentMethod,
                      ...(paymentMethod === "wallet" &&
                        themeStyles.activePaymentMethod),
                    }}
                    className="co-payment-method"
                    onClick={() => setPaymentMethod("wallet")}
                    role="button"
                  >
                    <FaWallet style={themeStyles.paymentIcon} />
                    <span style={themeStyles.paymentName}>Wallet</span>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div style={themeStyles.formGrid}>
                    <div
                      style={{ ...themeStyles.formGroup, gridColumn: "1 / -1" }}
                    >
                      <label style={themeStyles.label}>Card Number</label>
                      <input
                        type="text"
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>

                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label}>Expiry Date</label>
                      <input
                        type="text"
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>

                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label}>CVV</label>
                      <input
                        type="password"
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="•••"
                        maxLength="4"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>

                    <div
                      style={{ ...themeStyles.formGroup, gridColumn: "1 / -1" }}
                    >
                      <label style={themeStyles.label}>Name on Card</label>
                      <input
                        type="text"
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="As shown on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div style={themeStyles.upiSection}>
                    <h3 style={themeStyles.upiTitle}>
                      <FaQrcode /> Scan QR Code to Pay
                    </h3>

                    <div style={themeStyles.qrCode}>
                      {!qrError ? (
                        <img
                          src={qrCodeSrc}
                          alt="Payment QR Code"
                          style={themeStyles.qrImage}
                          onError={() => setQrError(true)}
                        />
                      ) : (
                        <div style={themeStyles.qrPlaceholder}>
                          <FaQrcode
                            style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
                          />
                          <p>QR Code not found</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <input
                        type="file"
                        id="qr-upload"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleQrUpload}
                      />
                    </div>

                    <p
                      style={{
                        margin: "1rem 0",
                        color: T.textMuted,
                        fontWeight: "700",
                      }}
                    >
                      Or enter UPI ID
                    </p>

                    <div style={themeStyles.upiInput}>
                      <input
                        type="text"
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="username@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                      <button
                        style={themeStyles.verifyButton}
                        className="co-primary-btn"
                        onClick={handleUPIPayment}
                        disabled={processing}
                        type="button"
                      >
                        Pay
                      </button>
                    </div>

                    {paymentConfirmed && (
                      <div style={themeStyles.paymentConfirmed}>
                        <FaCheckCircle /> Payment Successful!
                      </div>
                    )}

                    {!paymentConfirmed && (
                      <button
                        style={{
                          ...themeStyles.verifyButton,
                          marginTop: "1rem",
                          width: isMobile ? "100%" : "auto",
                        }}
                        className="co-primary-btn"
                        onClick={handleQRPayment}
                        disabled={processing}
                        type="button"
                      >
                        I have scanned and paid
                      </button>
                    )}
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div>
                    <select
                      style={{ ...themeStyles.input, marginBottom: "1rem" }}
                      className="co-input"
                    >
                      <option value="">Select your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                      <option value="yes">Yes Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                      <option value="bob">Bank of Baroda</option>
                    </select>
                  </div>
                )}

                {paymentMethod === "wallet" && (
                  <div style={themeStyles.paymentMethods}>
                    <div
                      style={themeStyles.paymentMethod}
                      className="co-payment-method"
                    >
                      <SiPhonepe
                        style={{ ...themeStyles.paymentIcon, color: "#5F259F" }}
                      />
                      <span style={themeStyles.paymentName}>PhonePe</span>
                    </div>
                    <div
                      style={themeStyles.paymentMethod}
                      className="co-payment-method"
                    >
                      <SiPaytm
                        style={{ ...themeStyles.paymentIcon, color: "#00BAF2" }}
                      />
                      <span style={themeStyles.paymentName}>Paytm</span>
                    </div>
                    <div
                      style={themeStyles.paymentMethod}
                      className="co-payment-method"
                    >
                      <FaGooglePay
                        style={{ ...themeStyles.paymentIcon, color: "#4285F4" }}
                      />
                      <span style={themeStyles.paymentName}>Google Pay</span>
                    </div>
                    <div
                      style={themeStyles.paymentMethod}
                      className="co-payment-method"
                    >
                      <FaAmazonPay
                        style={{ ...themeStyles.paymentIcon, color: "#FF9900" }}
                      />
                      <span style={themeStyles.paymentName}>Amazon Pay</span>
                    </div>
                  </div>
                )}

                <div style={themeStyles.actionButtons}>
                  <button
                    onClick={handlePreviousStep}
                    style={themeStyles.secondaryButton}
                    className="co-secondary-btn"
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    style={themeStyles.primaryButton}
                    className="co-primary-btn"
                    disabled={
                      processing ||
                      (paymentMethod === "upi" && !paymentConfirmed)
                    }
                    type="button"
                  >
                    {processing ? (
                      <span>Processing...</span>
                    ) : (
                      <span>Pay ₹{total.toFixed(2)}</span>
                    )}
                  </button>
                </div>

                <div style={themeStyles.securityBadge}>
                  <FaLock
                    style={{
                      color: isDarkMode
                        ? brandColors.gold
                        : brandColors.primary,
                    }}
                  />
                  <FaShieldAlt
                    style={{
                      color: isDarkMode
                        ? brandColors.gold
                        : brandColors.primary,
                    }}
                  />
                  <span>256-bit encrypted</span>
                  <span>•</span>
                  <span>Secure checkout</span>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div style={themeStyles.summary}>
            <div style={themeStyles.summaryAccentBar} />
            {isTablet && (
              <div style={themeStyles.summaryHeader}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.15rem",
                    fontWeight: "800",
                    color: T.text,
                  }}
                >
                  Order Summary
                </h3>
                <button
                  style={themeStyles.closeSummary}
                  onClick={() => setShowMobileSummary(false)}
                  aria-label="Close summary"
                  type="button"
                >
                  <FaTimes />
                </button>
              </div>
            )}

            <h2 style={themeStyles.summaryTitle}>
              <FaSpa
                style={{
                  fontSize: "1rem",
                  color: isDarkMode ? brandColors.gold : brandColors.bronze,
                }}
              />
              Order Summary
            </h2>

            <div style={{ marginBottom: "1.5rem" }}>
              {cartItems.map((item) => {
                const isNatural =
                  item.category === "Skincare" ||
                  item.category === "Hair Care";
                return (
                  <div
                    key={`${item.id}-${item.selectedShade}`}
                    style={themeStyles.productItem}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={themeStyles.productImage}
                    />
                    <div style={themeStyles.productDetails}>
                      <div style={themeStyles.productName}>
                        {item.name}
                        {isNatural && (
                          <span style={themeStyles.naturalBadge}>
                            <FaLeaf style={{ fontSize: "0.45rem" }} /> Natural
                          </span>
                        )}
                      </div>
                      {item.selectedShade && (
                        <div style={themeStyles.productMeta}>
                          Shade: {item.selectedShade}
                        </div>
                      )}
                      <div style={themeStyles.productMeta}>
                        Qty: {item.quantity}
                      </div>
                      <div style={themeStyles.productPrice}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={themeStyles.summaryDivider} />

            <div style={themeStyles.summaryItem}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {couponApplied && (
              <div
                style={{
                  ...themeStyles.summaryItem,
                  ...themeStyles.discountItem,
                }}
              >
                <span>Coupon Discount</span>
                <span>-₹{discountFromCoupon.toFixed(2)}</span>
              </div>
            )}

            {applicableGiftCardAmount > 0 && (
              <div
                style={{
                  ...themeStyles.summaryItem,
                  ...themeStyles.giftCardItem,
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <FaGift /> Gift Card
                </span>
                <span>-₹{applicableGiftCardAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={themeStyles.summaryItem}>
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span
                    style={{ color: brandColors.green, fontWeight: "800" }}
                  >
                    Free
                  </span>
                ) : (
                  `₹${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div style={themeStyles.mrpNote}>
              <FaCheckCircle style={{ fontSize: "0.7rem" }} />
              All prices include GST
            </div>

            <div style={themeStyles.summaryDivider} />

            <div style={themeStyles.summaryTotal}>
              <span>Total</span>
              <span style={themeStyles.totalAmount} className="co-total-shine">
                ₹{total.toFixed(2)}
              </span>
            </div>

            {hasNaturalItems && (
              <div style={themeStyles.naturalBadgeNote}>
                <FaLeaf /> Includes 100% Natural Products
              </div>
            )}

            {subtotal > 500 && (
              <div style={themeStyles.freeShippingNote}>
                <FaTruck /> Free Shipping Applied! 🎉
              </div>
            )}

            {applicableGiftCardAmount > 0 && (
              <div style={themeStyles.giftCardNote}>
                🎁 Gift Card Applied! You saved ₹
                {applicableGiftCardAmount.toFixed(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;