// src/pages/Checkout.jsx
import React, {
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
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
  FaExclamationTriangle,
} from "react-icons/fa";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import { usePixelTracking } from "../context/PixelContext";
import GiftCardInput from "../components/GiftCardInput";
import { useGiftCard } from "../context/GiftCardContext";

// ─── Site constants ───
// const SITE_URL = "https://www.asudhabeauty.shop";
const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_FEE = 40;

// ─── Brand palette (module scope: stable) ───
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
  const [qrCodeSrc] = useState(
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
  const [couponError, setCouponError] = useState("");
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

  // Lock body scroll while mobile summary sheet is open + Escape to close
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

  useEffect(() => {
    if (!showMobileSummary) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") setShowMobileSummary(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showMobileSummary]);

  // ─── Price calculation (MRP already includes GST) ───
  const subtotal = Number(getCartTotal()) || 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
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

  const focusFirstError = (errs) => {
    const firstKey = Object.keys(errs)[0];
    if (firstKey) {
      document.getElementById(`co-${firstKey}`)?.focus();
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

  const validatePayment = () => {
    const newErrors = {};

    if (paymentMethod === "card") {
      const cleanCard = cardNumber.replace(/\s/g, "");
      if (!/^\d{16}$/.test(cleanCard)) {
        newErrors.cardNumber = "Enter a valid 16-digit card number";
      }
      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        newErrors.expiryDate = "Enter expiry as MM/YY";
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        newErrors.cvv = "Enter a valid CVV";
      }
      if (!cardName.trim()) {
        newErrors.cardName = "Enter the name on the card";
      }
    }

    if (paymentMethod === "upi" && !paymentConfirmed) {
      newErrors.upi = "Please confirm your UPI payment first";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (Object.keys(errors).length > 0) {
      focusFirstError(errors);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyCoupon = () => {
    const validCoupons = {
      ASUDHA10: { discount: 10 },
      WELCOME: { discount: 5 },
      NATURAL: { discount: 15 },
      GLOW: { discount: 20 },
    };

    const code = couponCode.toUpperCase().trim();
    if (!code) {
      setCouponError("Enter a coupon code first");
      return;
    }
    if (validCoupons[code]) {
      setCouponApplied(true);
      setCouponDiscount(subtotal * (validCoupons[code].discount / 100));
      setCouponError("");
    } else {
      setCouponError(
        "Invalid coupon code. Try ASUDHA10, WELCOME, NATURAL, or GLOW"
      );
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
    if (currentStep !== 2) return;
    if (!validatePayment()) {
      focusFirstError(errors);
      return;
    }
    await initiatePayment();
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
    return { color: T.textMuted, fontWeight: "500" };
  };

  // ─── Breakpoints ───
  const isSmallMobile = windowWidth <= 360;
  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth <= 1024;
  const isNarrow = windowWidth <= 768;

  // ─── Injected CSS — only depends on isDarkMode ───
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
      .co-input[aria-invalid="true"] {
        border-color: #f44336 !important;
      }
      .co-input[aria-invalid="true"]:focus {
        box-shadow: 0 0 0 4px rgba(244, 67, 54, 0.15) !important;
      }

      .co-payment-method {
        transition: transform 0.25s ease, box-shadow 0.25s ease,
                    border-color 0.25s ease, background-color 0.25s ease;
        font-family: inherit;
      }
      .co-payment-method:hover,
      .co-payment-method:focus-visible {
        transform: translateY(-3px);
        box-shadow: ${
          isDarkMode
            ? "0 14px 32px rgba(0, 0, 0, 0.5)"
            : "0 14px 32px rgba(62, 39, 35, 0.1)"
        };
        border-color: ${
          isDarkMode ? "rgba(212, 175, 55, 0.3)" : "rgba(199, 125, 66, 0.25)"
        } !important;
        outline: none;
      }
      .co-payment-method:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: 2px;
      }

      .co-primary-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease, gap 0.3s ease;
      }
      .co-primary-btn:hover:not(:disabled),
      .co-primary-btn:focus-visible:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(245, 52, 107, 0.5);
        gap: 0.7rem;
        outline: none;
      }
      .co-primary-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : "#ffffff"};
        outline-offset: 2px;
      }
      .co-primary-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .co-secondary-btn {
        transition: transform 0.25s ease, background-color 0.25s ease,
                    border-color 0.25s ease;
      }
      .co-secondary-btn:hover,
      .co-secondary-btn:focus-visible {
        transform: translateY(-2px);
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        outline: none;
      }

      .co-coupon-btn {
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }
      .co-coupon-btn:hover:not(:disabled),
      .co-coupon-btn:focus-visible:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(245, 52, 107, 0.4);
        outline: none;
      }

      .co-back-btn {
        transition: all 0.25s ease;
      }
      .co-back-btn:hover,
      .co-back-btn:focus-visible {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        border-color: transparent !important;
        transform: translateX(-4px);
        outline: none;
      }

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
          ${isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)"},
          transparent
        );
        transform: translateX(-120%) skewX(-20deg);
        animation: checkoutShine 4s ease-in-out infinite;
        pointer-events: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .co-orb-1, .co-orb-2, .co-orb-3 { animation: none !important; }
        .co-total-shine::after { animation: none !important; }
        .co-input, .co-payment-method, .co-primary-btn,
        .co-secondary-btn, .co-coupon-btn, .co-back-btn {
          transition: none !important;
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-checkout-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  const themeStyles = {
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
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
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
    couponError: {
      marginTop: "0.75rem",
      padding: "0.7rem 1rem",
      backgroundColor: isDarkMode
        ? "rgba(244, 67, 54, 0.15)"
        : "rgba(244, 67, 54, 0.1)",
      color: T.danger,
      border: `1px solid ${
        isDarkMode ? "rgba(244, 67, 54, 0.3)" : "rgba(244, 67, 54, 0.25)"
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
      fontFamily: "inherit",
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
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
      borderBottomLeftRadius: isTablet ? "0" : "24px",
      borderBottomRightRadius: isTablet ? "0" : "24px",
      boxShadow: isTablet ? "0 -12px 40px rgba(0, 0, 0, 0.45)" : T.shadowLift,
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
      fontFamily: "inherit",
    },
    summaryTitle: {
      fontSize: isMobile ? "1.15rem" : "1.3rem",
      fontWeight: "900",
      marginBottom: "1.25rem",
      color: T.text,
      display: isTablet ? "none" : "flex",
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
    discountItem: { color: brandColors.green, fontWeight: "800" },
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
    productDetails: { flex: 1, minWidth: 0 },
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

  // ─── Shared background JSX (inline, not a component — avoids remounts) ───
  const backgroundJSX = (
    <div style={themeStyles.bgLayer} aria-hidden="true">
      <div style={themeStyles.bgGradient} />
      <div style={themeStyles.bgGrid} />
      <div className="co-orb-1" style={themeStyles.bgOrb1} />
      <div className="co-orb-2" style={themeStyles.bgOrb2} />
      <div className="co-orb-3" style={themeStyles.bgOrb3} />
    </div>
  );

  if (orderComplete) {
    return (
      <div style={themeStyles.container}>
        <SEO
          title="Order Confirmed | ASudha Beauty"
          description="Your order has been placed successfully at ASudha Beauty. Thank you for choosing natural Ayurvedic products."
          keywords="order confirmation, purchase success, order placed, Ayurvedic beauty"
          url="/checkout/success"
          type="website"
          noindex
        />

        {backgroundJSX}

        <main style={themeStyles.orderCompleteWrap}>
          <div style={themeStyles.orderComplete}>
            <div
              style={themeStyles.orderCompleteAccent}
              aria-hidden="true"
            />
            <div style={themeStyles.successIconWrap} aria-hidden="true">
              <FaCheckCircle style={themeStyles.successIcon} />
            </div>
            <h1
              style={{
                fontSize: isMobile ? "1.55rem" : "2rem",
                marginBottom: "0.85rem",
                color: T.text,
                fontWeight: "900",
                letterSpacing: "-0.4px",
              }}
            >
              Order Placed Successfully
            </h1>
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
              <FaLeaf
                aria-hidden="true"
                style={{ color: brandColors.green }}
              />
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
                <FaTruck aria-hidden="true" style={{ marginRight: "0.4rem" }} />
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
        </main>
      </div>
    );
  }

  return (
    <div style={themeStyles.container}>
      <SEO
        title="Checkout | ASudha Beauty — Secure Payment"
        description="Secure checkout at ASudha Beauty. Complete your purchase safely with multiple payment options — card, UPI, netbanking, and wallets."
        keywords="checkout, secure payment, buy ayurvedic products online, natural skincare checkout"
        url="/checkout"
        type="website"
        noindex
      />

      {backgroundJSX}

      {/* Backdrop for mobile summary sheet */}
      <div
        style={themeStyles.summaryBackdrop}
        onClick={() => setShowMobileSummary(false)}
        aria-hidden="true"
      />

      <main style={themeStyles.content}>
        <div style={themeStyles.header}>
          <Link
            to="/cart"
            style={themeStyles.backButton}
            className="co-back-btn"
            aria-label="Back to cart"
          >
            <FaArrowLeft aria-hidden="true" /> Back
          </Link>
          <h1 style={themeStyles.title}>
            <FaShoppingCart
              aria-hidden="true"
              style={themeStyles.titleIcon}
            />
            Checkout
          </h1>
          {isTablet && (
            <button
              style={themeStyles.mobileSummaryToggle}
              onClick={() => setShowMobileSummary(!showMobileSummary)}
              type="button"
              aria-expanded={showMobileSummary}
              aria-controls="checkout-summary"
            >
              {showMobileSummary ? "Hide Summary" : "Show Summary"}
            </button>
          )}
        </div>

        {/* Steps */}
        <div
          style={themeStyles.stepsContainer}
          role="list"
          aria-label="Checkout progress"
        >
          <div style={themeStyles.stepLine} aria-hidden="true" />
          <div style={themeStyles.stepLineFill} aria-hidden="true" />

          <div style={themeStyles.step} role="listitem">
            <div style={{ ...themeStyles.stepNumber, ...getStepNumberStyle(1) }}>
              1
            </div>
            <div style={{ ...themeStyles.stepLabel, ...getStepLabelStyle(1) }}>
              Shipping
            </div>
          </div>
          <div style={themeStyles.step} role="listitem">
            <div style={{ ...themeStyles.stepNumber, ...getStepNumberStyle(2) }}>
              2
            </div>
            <div style={{ ...themeStyles.stepLabel, ...getStepLabelStyle(2) }}>
              Payment
            </div>
          </div>
          <div style={themeStyles.step} role="listitem">
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
                <div
                  style={themeStyles.formAccentBar}
                  aria-hidden="true"
                />
                <h2 style={themeStyles.sectionTitle}>
                  <span
                    style={themeStyles.sectionIconWrap}
                    aria-hidden="true"
                  >
                    <FaTruck />
                  </span>
                  Shipping Information
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNextStep();
                  }}
                  noValidate
                >
                  <div style={themeStyles.formGrid}>
                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label} htmlFor="co-email">
                        <FaEnvelope
                          aria-hidden="true"
                          style={themeStyles.labelIcon}
                        />{" "}
                        Email *
                      </label>
                      <input
                        id="co-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="your@email.com"
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={
                          errors.email ? "co-email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <div
                          id="co-email-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label} htmlFor="co-phone">
                        <FaPhone
                          aria-hidden="true"
                          style={themeStyles.labelIcon}
                        />{" "}
                        Phone *
                      </label>
                      <input
                        id="co-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="10 digit mobile number"
                        autoComplete="tel"
                        aria-required="true"
                        aria-invalid={errors.phone ? "true" : "false"}
                        aria-describedby={
                          errors.phone ? "co-phone-error" : undefined
                        }
                      />
                      {errors.phone && (
                        <div
                          id="co-phone-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.phone}
                        </div>
                      )}
                    </div>

                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label} htmlFor="co-firstName">
                        <FaUser
                          aria-hidden="true"
                          style={themeStyles.labelIcon}
                        />{" "}
                        First Name *
                      </label>
                      <input
                        id="co-firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="First name"
                        autoComplete="given-name"
                        aria-required="true"
                        aria-invalid={errors.firstName ? "true" : "false"}
                        aria-describedby={
                          errors.firstName ? "co-firstName-error" : undefined
                        }
                      />
                      {errors.firstName && (
                        <div
                          id="co-firstName-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label} htmlFor="co-lastName">
                        <FaUser
                          aria-hidden="true"
                          style={themeStyles.labelIcon}
                        />{" "}
                        Last Name *
                      </label>
                      <input
                        id="co-lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="Last name"
                        autoComplete="family-name"
                        aria-required="true"
                        aria-invalid={errors.lastName ? "true" : "false"}
                        aria-describedby={
                          errors.lastName ? "co-lastName-error" : undefined
                        }
                      />
                      {errors.lastName && (
                        <div
                          id="co-lastName-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.lastName}
                        </div>
                      )}
                    </div>

                    <div
                      style={{ ...themeStyles.formGroup, gridColumn: "1 / -1" }}
                    >
                      <label style={themeStyles.label} htmlFor="co-address">
                        <FaMapMarkerAlt
                          aria-hidden="true"
                          style={themeStyles.labelIcon}
                        />{" "}
                        Address *
                      </label>
                      <input
                        id="co-address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="Street address"
                        autoComplete="street-address"
                        aria-required="true"
                        aria-invalid={errors.address ? "true" : "false"}
                        aria-describedby={
                          errors.address ? "co-address-error" : undefined
                        }
                      />
                      {errors.address && (
                        <div
                          id="co-address-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.address}
                        </div>
                      )}
                    </div>

                    <div
                      style={{ ...themeStyles.formGroup, gridColumn: "1 / -1" }}
                    >
                      <label style={themeStyles.label} htmlFor="co-apartment">
                        <FaBuilding
                          aria-hidden="true"
                          style={themeStyles.labelIcon}
                        />{" "}
                        Apartment (optional)
                      </label>
                      <input
                        id="co-apartment"
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="Apartment, suite, etc."
                        autoComplete="address-line2"
                      />
                    </div>

                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label} htmlFor="co-city">
                        <FaCity
                          aria-hidden="true"
                          style={themeStyles.labelIcon}
                        />{" "}
                        City *
                      </label>
                      <input
                        id="co-city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="City"
                        autoComplete="address-level2"
                        aria-required="true"
                        aria-invalid={errors.city ? "true" : "false"}
                        aria-describedby={
                          errors.city ? "co-city-error" : undefined
                        }
                      />
                      {errors.city && (
                        <div
                          id="co-city-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.city}
                        </div>
                      )}
                    </div>

                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label} htmlFor="co-state">
                        <FaRegAddressCard
                          aria-hidden="true"
                          style={themeStyles.labelIcon}
                        />{" "}
                        State *
                      </label>
                      <input
                        id="co-state"
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="State"
                        autoComplete="address-level1"
                        aria-required="true"
                        aria-invalid={errors.state ? "true" : "false"}
                        aria-describedby={
                          errors.state ? "co-state-error" : undefined
                        }
                      />
                      {errors.state && (
                        <div
                          id="co-state-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.state}
                        </div>
                      )}
                    </div>

                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label} htmlFor="co-pincode">
                        <FaMapMarkerAlt
                          aria-hidden="true"
                          style={themeStyles.labelIcon}
                        />{" "}
                        Pincode *
                      </label>
                      <input
                        id="co-pincode"
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="6 digit pincode"
                        autoComplete="postal-code"
                        inputMode="numeric"
                        aria-required="true"
                        aria-invalid={errors.pincode ? "true" : "false"}
                        aria-describedby={
                          errors.pincode ? "co-pincode-error" : undefined
                        }
                      />
                      {errors.pincode && (
                        <div
                          id="co-pincode-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.pincode}
                        </div>
                      )}
                    </div>

                    <div
                      style={{ ...themeStyles.formGroup, gridColumn: "1 / -1" }}
                    >
                      <label
                        style={themeStyles.checkboxLabel}
                        htmlFor="co-saveInfo"
                      >
                        <input
                          id="co-saveInfo"
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
                      <FaArrowRight
                        aria-hidden="true"
                        style={{ marginLeft: "0.35rem" }}
                      />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div style={themeStyles.formSection}>
                <div
                  style={themeStyles.formAccentBar}
                  aria-hidden="true"
                />
                <h2 style={themeStyles.sectionTitle}>
                  <span
                    style={themeStyles.sectionIconWrap}
                    aria-hidden="true"
                  >
                    <FaCreditCard />
                  </span>
                  Payment Method
                </h2>

                <div style={themeStyles.couponSection}>
                  <h3 style={themeStyles.couponTitle}>
                    <FaGift
                      aria-hidden="true"
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
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        if (couponError) setCouponError("");
                      }}
                      aria-label="Coupon code"
                      aria-invalid={couponError ? "true" : "false"}
                    />
                    <button
                      style={themeStyles.applyCouponButton}
                      className="co-coupon-btn"
                      onClick={handleApplyCoupon}
                      disabled={couponApplied}
                      type="button"
                    >
                      {couponApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {couponApplied && (
                    <div
                      style={themeStyles.couponSuccess}
                      role="status"
                      aria-live="polite"
                    >
                      <FaCheckCircle aria-hidden="true" /> Discount applied!
                    </div>
                  )}
                  {couponError && (
                    <div
                      style={themeStyles.couponError}
                      role="alert"
                      aria-live="assertive"
                    >
                      <FaExclamationTriangle aria-hidden="true" />{" "}
                      {couponError}
                    </div>
                  )}
                </div>

                <GiftCardInput
                  orderTotal={totalBeforeGift}
                  onApply={() => {}}
                  onRemove={() => {
                    removeAppliedGiftCard();
                  }}
                />

                <div
                  style={themeStyles.paymentMethods}
                  role="radiogroup"
                  aria-label="Select payment method"
                >
                  <button
                    type="button"
                    style={{
                      ...themeStyles.paymentMethod,
                      ...(paymentMethod === "card" &&
                        themeStyles.activePaymentMethod),
                    }}
                    className="co-payment-method"
                    onClick={() => setPaymentMethod("card")}
                    aria-pressed={paymentMethod === "card"}
                  >
                    <FaCreditCard
                      aria-hidden="true"
                      style={themeStyles.paymentIcon}
                    />
                    <span style={themeStyles.paymentName}>Card</span>
                  </button>

                  <button
                    type="button"
                    style={{
                      ...themeStyles.paymentMethod,
                      ...(paymentMethod === "upi" &&
                        themeStyles.activePaymentMethod),
                    }}
                    className="co-payment-method"
                    onClick={() => setPaymentMethod("upi")}
                    aria-pressed={paymentMethod === "upi"}
                  >
                    <FaQrcode
                      aria-hidden="true"
                      style={themeStyles.paymentIcon}
                    />
                    <span style={themeStyles.paymentName}>UPI</span>
                  </button>

                  <button
                    type="button"
                    style={{
                      ...themeStyles.paymentMethod,
                      ...(paymentMethod === "netbanking" &&
                        themeStyles.activePaymentMethod),
                    }}
                    className="co-payment-method"
                    onClick={() => setPaymentMethod("netbanking")}
                    aria-pressed={paymentMethod === "netbanking"}
                  >
                    <FaUniversity
                      aria-hidden="true"
                      style={themeStyles.paymentIcon}
                    />
                    <span style={themeStyles.paymentName}>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    style={{
                      ...themeStyles.paymentMethod,
                      ...(paymentMethod === "wallet" &&
                        themeStyles.activePaymentMethod),
                    }}
                    className="co-payment-method"
                    onClick={() => setPaymentMethod("wallet")}
                    aria-pressed={paymentMethod === "wallet"}
                  >
                    <FaWallet
                      aria-hidden="true"
                      style={themeStyles.paymentIcon}
                    />
                    <span style={themeStyles.paymentName}>Wallet</span>
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <div style={themeStyles.formGrid}>
                    <div
                      style={{ ...themeStyles.formGroup, gridColumn: "1 / -1" }}
                    >
                      <label style={themeStyles.label} htmlFor="co-cardNumber">
                        Card Number *
                      </label>
                      <input
                        id="co-cardNumber"
                        type="text"
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        inputMode="numeric"
                        autoComplete="cc-number"
                        aria-required="true"
                        aria-invalid={errors.cardNumber ? "true" : "false"}
                        aria-describedby={
                          errors.cardNumber
                            ? "co-cardNumber-error"
                            : undefined
                        }
                      />
                      {errors.cardNumber && (
                        <div
                          id="co-cardNumber-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.cardNumber}
                        </div>
                      )}
                    </div>

                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label} htmlFor="co-expiryDate">
                        Expiry Date *
                      </label>
                      <input
                        id="co-expiryDate"
                        type="text"
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        aria-required="true"
                        aria-invalid={errors.expiryDate ? "true" : "false"}
                        aria-describedby={
                          errors.expiryDate
                            ? "co-expiryDate-error"
                            : undefined
                        }
                      />
                      {errors.expiryDate && (
                        <div
                          id="co-expiryDate-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.expiryDate}
                        </div>
                      )}
                    </div>

                    <div style={themeStyles.formGroup}>
                      <label style={themeStyles.label} htmlFor="co-cvv">
                        CVV *
                      </label>
                      <input
                        id="co-cvv"
                        type="password"
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="•••"
                        maxLength="4"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        aria-required="true"
                        aria-invalid={errors.cvv ? "true" : "false"}
                        aria-describedby={
                          errors.cvv ? "co-cvv-error" : undefined
                        }
                      />
                      {errors.cvv && (
                        <div
                          id="co-cvv-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.cvv}
                        </div>
                      )}
                    </div>

                    <div
                      style={{ ...themeStyles.formGroup, gridColumn: "1 / -1" }}
                    >
                      <label style={themeStyles.label} htmlFor="co-cardName">
                        Name on Card *
                      </label>
                      <input
                        id="co-cardName"
                        type="text"
                        style={themeStyles.input}
                        className="co-input"
                        placeholder="As shown on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        autoComplete="cc-name"
                        aria-required="true"
                        aria-invalid={errors.cardName ? "true" : "false"}
                        aria-describedby={
                          errors.cardName ? "co-cardName-error" : undefined
                        }
                      />
                      {errors.cardName && (
                        <div
                          id="co-cardName-error"
                          style={themeStyles.error}
                          role="alert"
                        >
                          <FaExclamationTriangle aria-hidden="true" />{" "}
                          {errors.cardName}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div style={themeStyles.upiSection}>
                    <h3 style={themeStyles.upiTitle}>
                      <FaQrcode aria-hidden="true" /> Scan QR Code to Pay
                    </h3>

                    <div style={themeStyles.qrCode}>
                      {!qrError ? (
                        <img
                          src={qrCodeSrc}
                          alt="UPI payment QR code for ASudha Beauty"
                          style={themeStyles.qrImage}
                          onError={() => setQrError(true)}
                        />
                      ) : (
                        <div style={themeStyles.qrPlaceholder}>
                          <FaQrcode
                            aria-hidden="true"
                            style={{
                              fontSize: "2rem",
                              marginBottom: "0.5rem",
                            }}
                          />
                          <p>QR Code not available</p>
                          <p style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
                            Use UPI ID below
                          </p>
                        </div>
                      )}
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
                        aria-label="Your UPI ID"
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
                      <div
                        style={themeStyles.paymentConfirmed}
                        role="status"
                        aria-live="polite"
                      >
                        <FaCheckCircle aria-hidden="true" /> Payment
                        Successful!
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

                    {errors.upi && (
                      <div
                        style={{ ...themeStyles.error, justifyContent: "center" }}
                        role="alert"
                      >
                        <FaExclamationTriangle aria-hidden="true" />{" "}
                        {errors.upi}
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div>
                    <label style={themeStyles.label} htmlFor="co-bank">
                      Select Your Bank
                    </label>
                    <select
                      id="co-bank"
                      style={{ ...themeStyles.input, marginBottom: "1rem" }}
                      className="co-input"
                      aria-label="Select your bank"
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
                    <div style={themeStyles.paymentMethod}>
                      <SiPhonepe
                        aria-hidden="true"
                        style={{ ...themeStyles.paymentIcon, color: "#5F259F" }}
                      />
                      <span style={themeStyles.paymentName}>PhonePe</span>
                    </div>
                    <div style={themeStyles.paymentMethod}>
                      <SiPaytm
                        aria-hidden="true"
                        style={{ ...themeStyles.paymentIcon, color: "#00BAF2" }}
                      />
                      <span style={themeStyles.paymentName}>Paytm</span>
                    </div>
                    <div style={themeStyles.paymentMethod}>
                      <FaGooglePay
                        aria-hidden="true"
                        style={{ ...themeStyles.paymentIcon, color: "#4285F4" }}
                      />
                      <span style={themeStyles.paymentName}>Google Pay</span>
                    </div>
                    <div style={themeStyles.paymentMethod}>
                      <FaAmazonPay
                        aria-hidden="true"
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
                    aria-hidden="true"
                    style={{
                      color: isDarkMode
                        ? brandColors.gold
                        : brandColors.primary,
                    }}
                  />
                  <FaShieldAlt
                    aria-hidden="true"
                    style={{
                      color: isDarkMode
                        ? brandColors.gold
                        : brandColors.primary,
                    }}
                  />
                  <span>256-bit encrypted</span>
                  <span aria-hidden="true">•</span>
                  <span>Secure checkout</span>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <aside
            id="checkout-summary"
            style={themeStyles.summary}
            role={isTablet ? "dialog" : "complementary"}
            aria-modal={isTablet && showMobileSummary ? "true" : undefined}
            aria-labelledby="checkout-summary-title"
            aria-hidden={isTablet && !showMobileSummary ? "true" : undefined}
          >
            <div
              style={themeStyles.summaryAccentBar}
              aria-hidden="true"
            />
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
                  <FaTimes aria-hidden="true" />
                </button>
              </div>
            )}

            <h2
              id="checkout-summary-title"
              style={themeStyles.summaryTitle}
            >
              <FaSpa
                aria-hidden="true"
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
                    key={`${item.id}-${item.selectedShade || "default"}`}
                    style={themeStyles.productItem}
                  >
                    <img
                      src={item.image}
                      alt={`${item.name}${
                        item.selectedShade ? ` — ${item.selectedShade}` : ""
                      }`}
                      style={themeStyles.productImage}
                      loading="lazy"
                      decoding="async"
                    />
                    <div style={themeStyles.productDetails}>
                      <div style={themeStyles.productName}>
                        {item.name}
                        {isNatural && (
                          <span style={themeStyles.naturalBadge}>
                            <FaLeaf
                              aria-hidden="true"
                              style={{ fontSize: "0.45rem" }}
                            />{" "}
                            Natural
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <FaGift aria-hidden="true" /> Gift Card
                </span>
                <span>-₹{applicableGiftCardAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={themeStyles.summaryItem}>
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span
                    style={{
                      color: brandColors.green,
                      fontWeight: "800",
                    }}
                  >
                    Free
                  </span>
                ) : (
                  `₹${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div style={themeStyles.mrpNote}>
              <FaCheckCircle
                aria-hidden="true"
                style={{ fontSize: "0.7rem" }}
              />
              All prices include GST
            </div>

            <div style={themeStyles.summaryDivider} />

            <div
              style={themeStyles.summaryTotal}
              role="status"
              aria-live="polite"
            >
              <span>Total</span>
              <span
                style={themeStyles.totalAmount}
                className="co-total-shine"
              >
                ₹{total.toFixed(2)}
              </span>
            </div>

            {hasNaturalItems && (
              <div style={themeStyles.naturalBadgeNote}>
                <FaLeaf aria-hidden="true" /> Includes 100% Natural Products
              </div>
            )}

            {subtotal >= FREE_SHIPPING_THRESHOLD && (
              <div style={themeStyles.freeShippingNote}>
                <FaCheckCircle aria-hidden="true" /> Free Shipping Applied
              </div>
            )}

            {applicableGiftCardAmount > 0 && (
              <div style={themeStyles.giftCardNote}>
                <FaGift
                  aria-hidden="true"
                  style={{ marginRight: "0.35rem" }}
                />
                Gift Card Applied — You saved ₹
                {applicableGiftCardAmount.toFixed(0)}
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Checkout;