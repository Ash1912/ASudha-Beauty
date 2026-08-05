import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { 
  FaArrowLeft, FaTruck, FaCreditCard, FaMoneyBill, 
  FaUniversity, FaQrcode, FaLock, FaShieldAlt,
  FaCheckCircle, FaGooglePay, FaAmazonPay, FaUpload,
  FaTimes, FaGift
} from 'react-icons/fa';
import { SiPaytm, SiPhonepe } from 'react-icons/si';
import { usePixelTracking } from '../context/PixelContext';
import GiftCardInput from '../components/GiftCardInput';
import { useGiftCard } from '../context/GiftCardContext';

const Checkout = () => {
  const trackEvent = usePixelTracking();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { giftCardDiscount, appliedGiftCard, redeemGiftCard, removeAppliedGiftCard } = useGiftCard();
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [qrCodeSrc, setQrCodeSrc] = useState('/assets/images/payment/qr-code.jpeg');
  const [qrError, setQrError] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [initiateCheckoutTracked, setInitiateCheckoutTracked] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [setCouponDiscount] = useState(0);
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    saveInfo: false
  });

  const [errors, setErrors] = useState({});

  // Track InitiateCheckout when checkout page loads
  useEffect(() => {
    if (cartItems.length > 0 && !initiateCheckoutTracked && !orderComplete) {
      trackEvent.initiateCheckout(cartItems, getCartTotal());
      setInitiateCheckoutTracked(true);
    }
  }, [cartItems, trackEvent, initiateCheckoutTracked, orderComplete, getCartTotal]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      navigate('/cart');
    }
  }, [cartItems, navigate, orderComplete]);

  // Calculate totals with coupon and gift card
  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.18;
  const discountFromCoupon = couponApplied ? subtotal * 0.1 : 0;
  const totalBeforeGift = subtotal - discountFromCoupon + shipping + tax;
  const total = Math.max(0, totalBeforeGift - giftCardDiscount);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
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
    setCurrentStep(prev => prev - 1);
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      setCouponApplied(true);
      setCouponDiscount(subtotal * 0.1);
      alert("Coupon applied successfully! 10% discount");
    } else {
      alert("Invalid coupon code");
    }
  };

  const initiatePayment = async () => {
    setProcessing(true);
    
    setTimeout(() => {
      const newOrderId = 'ORD' + Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Redeem gift card if applied
      if (appliedGiftCard && giftCardDiscount > 0) {
        redeemGiftCard(appliedGiftCard.code, giftCardDiscount, newOrderId);
      }
      
      setOrderId(newOrderId);
      setOrderComplete(true);
      
      // Track Purchase event
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
      alert(`Initiating payment to UPI ID: ${upiId}`);
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

  // Function to handle QR code upload
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

  // Helper function to get step number style
  const getStepNumberStyle = (step) => {
    if (step < currentStep) {
      return {
        backgroundColor: '#4caf50',
        color: '#ffffff'
      };
    }
    if (step === currentStep) {
      return {
        backgroundColor: '#e88ca6',
        color: '#ffffff'
      };
    }
    return {
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      color: isDarkMode ? '#ffffff' : '#333333'
    };
  };

  // Helper function to get step label style
  const getStepLabelStyle = (step) => {
    if (step <= currentStep) {
      return {
        color: isDarkMode ? '#ffffff' : '#333333',
        fontWeight: step === currentStep ? '600' : '400'
      };
    }
    return {
      color: isDarkMode ? '#666' : '#999',
      fontWeight: '400'
    };
  };

  // Get responsive values
  const getContainerPadding = () => {
    if (windowWidth <= 480) return '1rem 0.5rem';
    if (windowWidth <= 768) return '1.5rem 1rem';
    return '2rem 1rem';
  };

  const getTitleSize = () => {
    if (windowWidth <= 480) return '1.5rem';
    if (windowWidth <= 768) return '1.8rem';
    return '2rem';
  };

  const getGridColumns = () => {
    if (windowWidth <= 768) return '1fr';
    return '2fr 1fr';
  };

  const getFormGridColumns = () => {
    if (windowWidth <= 480) return '1fr';
    return 'repeat(2, 1fr)';
  };

  const getPaymentMethodsGrid = () => {
    if (windowWidth <= 480) return 'repeat(2, 1fr)';
    if (windowWidth <= 768) return 'repeat(4, 1fr)';
    return 'repeat(auto-fit, minmax(150px, 1fr))';
  };

  const themeStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: getContainerPadding(),
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      transition: 'all 0.3s ease',
      overflowX: 'hidden',
      width: '100%',
      boxSizing: 'border-box'
    },

    // Header
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: windowWidth <= 480 ? '1rem' : '2rem',
      flexWrap: 'wrap',
      width: '100%',
      boxSizing: 'border-box'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: windowWidth <= 480 ? '0.4rem 0.8rem' : '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      borderRadius: '2rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      textDecoration: 'none',
      fontSize: windowWidth <= 480 ? '0.85rem' : '0.95rem',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },
    title: {
      fontSize: getTitleSize(),
      fontWeight: '700',
      color: isDarkMode ? '#e88ca6' : '#333333',
      margin: 0,
      flex: 1,
      minWidth: windowWidth <= 480 ? '120px' : 'auto',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    mobileSummaryToggle: {
      display: windowWidth <= 768 ? 'flex' : 'none',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '2rem',
      fontSize: '0.9rem',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    },

    // Steps
    stepsContainer: {
      marginBottom: windowWidth <= 480 ? '1rem' : '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box'
    },
    step: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
      flex: 1,
      minWidth: 0
    },
    stepNumber: {
      width: windowWidth <= 480 ? '32px' : '40px',
      height: windowWidth <= 480 ? '32px' : '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      marginBottom: '0.25rem',
      fontSize: windowWidth <= 480 ? '0.85rem' : '1rem'
    },
    stepLabel: {
      fontSize: windowWidth <= 480 ? '0.7rem' : '0.9rem',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
      padding: '0 0.25rem'
    },
    stepLine: {
      position: 'absolute',
      top: windowWidth <= 480 ? '16px' : '20px',
      left: '0',
      right: '0',
      height: '2px',
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      zIndex: 1
    },
    stepLineFill: {
      position: 'absolute',
      top: windowWidth <= 480 ? '16px' : '20px',
      left: '0',
      height: '2px',
      backgroundColor: '#e88ca6',
      width: `${(currentStep - 1) * 50}%`,
      transition: 'width 0.3s ease',
      zIndex: 1
    },

    // Checkout Grid
    checkoutGrid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(),
      gap: windowWidth <= 480 ? '1rem' : '2rem',
      width: '100%',
      boxSizing: 'border-box'
    },

    // Form Section
    formSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: windowWidth <= 480 ? '1rem' : '1.5rem',
      padding: windowWidth <= 480 ? '1rem' : '2rem',
      marginBottom: windowWidth <= 480 ? '1rem' : '2rem',
      width: '100%',
      boxSizing: 'border-box'
    },
    sectionTitle: {
      fontSize: windowWidth <= 480 ? '1.1rem' : '1.3rem',
      fontWeight: '600',
      marginBottom: windowWidth <= 480 ? '1rem' : '1.5rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: getFormGridColumns(),
      gap: windowWidth <= 480 ? '0.75rem' : '1rem',
      width: '100%',
      boxSizing: 'border-box'
    },
    formGroup: {
      marginBottom: '1rem',
      gridColumn: windowWidth <= 480 ? '1 / -1' : 'auto',
      width: '100%',
      boxSizing: 'border-box'
    },
    label: {
      display: 'block',
      marginBottom: '0.25rem',
      fontSize: windowWidth <= 480 ? '0.85rem' : '0.95rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    input: {
      width: '100%',
      padding: windowWidth <= 480 ? '0.7rem' : '0.75rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: windowWidth <= 480 ? '2rem' : '0.75rem',
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box',
      ':focus': {
        borderColor: '#e88ca6',
        boxShadow: '0 0 0 3px rgba(232,140,166,0.2)'
      }
    },
    error: {
      color: '#ff4444',
      fontSize: '0.8rem',
      marginTop: '0.25rem',
      marginLeft: '0.5rem'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      color: isDarkMode ? '#cccccc' : '#666666',
      fontSize: windowWidth <= 480 ? '0.85rem' : '0.95rem',
      flexWrap: 'wrap'
    },

    // Coupon Section
    couponSection: {
      marginBottom: '1.5rem',
      padding: '1rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: '1rem'
    },
    couponTitle: {
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      fontWeight: '600',
      marginBottom: '0.75rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    couponInput: {
      display: 'flex',
      gap: '0.5rem',
      flexDirection: windowWidth <= 480 ? 'column' : 'row'
    },
    couponInputField: {
      flex: 1,
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '2rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      fontSize: '0.9rem',
      outline: 'none'
    },
    applyCouponButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '2rem',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      }
    },

    // Payment Methods
    paymentMethods: {
      display: 'grid',
      gridTemplateColumns: getPaymentMethodsGrid(),
      gap: windowWidth <= 480 ? '0.5rem' : '1rem',
      marginBottom: '2rem',
      width: '100%',
      boxSizing: 'border-box'
    },
    paymentMethod: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.25rem',
      padding: windowWidth <= 480 ? '0.75rem' : '1.5rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `2px solid ${isDarkMode ? '#555' : '#e0e0e0'}`,
      borderRadius: windowWidth <= 480 ? '0.75rem' : '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      width: '100%',
      ':hover': {
        transform: windowWidth <= 768 ? 'none' : 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(232,140,166,0.2)'
      }
    },
    activePaymentMethod: {
      borderColor: '#e88ca6',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff5f7'
    },
    paymentIcon: {
      fontSize: windowWidth <= 480 ? '1.5rem' : '2rem',
      color: '#e88ca6'
    },
    paymentName: {
      fontSize: windowWidth <= 480 ? '0.7rem' : '0.9rem',
      fontWeight: '500',
      textAlign: 'center',
      color: isDarkMode ? '#ffffff' : '#333333'
    },

    // UPI Section
    upiSection: {
      marginTop: '2rem',
      padding: windowWidth <= 480 ? '1rem' : '2rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: windowWidth <= 480 ? '1rem' : '1rem',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box'
    },
    qrCode: {
      width: windowWidth <= 480 ? '180px' : '250px',
      height: windowWidth <= 480 ? '180px' : '250px',
      margin: '0 auto 1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: windowWidth <= 480 ? '0.75rem' : '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${isDarkMode ? '#555' : '#ddd'}`,
      overflow: 'hidden',
      padding: '0.5rem',
      boxSizing: 'border-box'
    },
    qrImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain'
    },
    qrPlaceholder: {
      textAlign: 'center',
      color: isDarkMode ? '#999' : '#666',
      fontSize: windowWidth <= 480 ? '0.8rem' : '1rem'
    },
    qrUploadButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: windowWidth <= 480 ? '0.6rem 1rem' : '0.75rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '2rem',
      fontSize: windowWidth <= 480 ? '0.85rem' : '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'all 0.3s ease',
      width: windowWidth <= 480 ? '100%' : 'auto',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: windowWidth <= 768 ? 'none' : 'translateY(-2px)'
      }
    },
    upiInput: {
      display: 'flex',
      flexDirection: windowWidth <= 480 ? 'column' : 'row',
      gap: '0.5rem',
      maxWidth: '400px',
      margin: '1rem auto',
      width: '100%',
      boxSizing: 'border-box'
    },
    verifyButton: {
      padding: windowWidth <= 480 ? '0.7rem' : '0.75rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: windowWidth <= 480 ? '2rem' : '0.75rem',
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      width: windowWidth <= 480 ? '100%' : 'auto',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: windowWidth <= 768 ? 'none' : 'translateY(-2px)'
      }
    },
    paymentConfirmed: {
      marginTop: '1rem',
      padding: '0.75rem',
      backgroundColor: '#4caf50',
      color: '#ffffff',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontSize: windowWidth <= 480 ? '0.85rem' : '1rem',
      flexWrap: 'wrap',
      width: '100%',
      boxSizing: 'border-box'
    },

    // Order Summary
    summary: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: windowWidth <= 480 ? '1rem' : '1.5rem',
      padding: windowWidth <= 480 ? '1rem' : '1.5rem',
      position: windowWidth <= 768 ? 'fixed' : 'sticky',
      top: windowWidth <= 768 ? 'auto' : '100px',
      bottom: windowWidth <= 768 ? '0' : 'auto',
      left: windowWidth <= 768 ? '0' : 'auto',
      right: windowWidth <= 768 ? '0' : 'auto',
      zIndex: windowWidth <= 768 ? 1000 : 1,
      transform: windowWidth <= 768 && showMobileSummary ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s ease',
      maxHeight: windowWidth <= 768 ? '80vh' : 'none',
      overflowY: windowWidth <= 768 ? 'auto' : 'visible',
      borderTopLeftRadius: windowWidth <= 768 ? '1.5rem' : '1.5rem',
      borderTopRightRadius: windowWidth <= 768 ? '1.5rem' : '1.5rem',
      borderBottomLeftRadius: windowWidth <= 768 ? '0' : '1.5rem',
      borderBottomRightRadius: windowWidth <= 768 ? '0' : '1.5rem',
      boxShadow: windowWidth <= 768 ? '0 -5px 20px rgba(0,0,0,0.15)' : 'none',
      width: windowWidth <= 768 ? '100%' : 'auto',
      boxSizing: 'border-box'
    },
    summaryHeader: {
      display: windowWidth <= 768 ? 'flex' : 'none',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      paddingBottom: '0.75rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    closeSummary: {
      background: 'none',
      border: 'none',
      fontSize: '1.2rem',
      cursor: 'pointer',
      color: isDarkMode ? '#ffffff' : '#333333',
      padding: '0.5rem'
    },
    summaryTitle: {
      fontSize: windowWidth <= 480 ? '1.1rem' : '1.3rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: isDarkMode ? '#e88ca6' : '#333333'
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.75rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      fontSize: windowWidth <= 480 ? '0.85rem' : '1rem',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    discountItem: {
      color: '#4caf50'
    },
    giftCardItem: {
      color: '#e88ca6'
    },
    summaryDivider: {
      height: '1px',
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      margin: '0.75rem 0'
    },
    summaryTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: windowWidth <= 480 ? '1rem' : '1.2rem',
      fontWeight: '700',
      color: isDarkMode ? '#e88ca6' : '#333333',
      marginTop: '0.75rem',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    productItem: {
      display: 'flex',
      gap: windowWidth <= 480 ? '0.5rem' : '1rem',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      flexWrap: windowWidth <= 480 ? 'wrap' : 'nowrap',
      ':last-child': {
        borderBottom: 'none',
        marginBottom: 0,
        paddingBottom: 0
      }
    },
    productImage: {
      width: windowWidth <= 480 ? '50px' : '60px',
      height: windowWidth <= 480 ? '50px' : '60px',
      borderRadius: '0.5rem',
      objectFit: 'cover',
      flexShrink: 0
    },
    productDetails: {
      flex: 1,
      minWidth: 0
    },
    productName: {
      fontSize: windowWidth <= 480 ? '0.85rem' : '0.95rem',
      fontWeight: '600',
      marginBottom: '0.25rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      whiteSpace: 'normal',
      wordBreak: 'break-word'
    },
    productMeta: {
      fontSize: windowWidth <= 480 ? '0.75rem' : '0.85rem',
      color: isDarkMode ? '#999' : '#999',
      marginBottom: '0.25rem',
      whiteSpace: 'normal',
      wordBreak: 'break-word'
    },
    productPrice: {
      fontSize: windowWidth <= 480 ? '0.85rem' : '0.95rem',
      fontWeight: '600',
      color: '#e88ca6'
    },

    // Action Buttons
    actionButtons: {
      display: 'flex',
      flexDirection: windowWidth <= 480 ? 'column' : 'row',
      gap: '0.75rem',
      marginTop: '1.5rem',
      width: '100%',
      boxSizing: 'border-box'
    },
    primaryButton: {
      flex: 1,
      padding: windowWidth <= 480 ? '0.875rem' : '1rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: windowWidth <= 480 ? '2rem' : '0.75rem',
      fontSize: windowWidth <= 480 ? '0.95rem' : '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: windowWidth <= 480 ? '100%' : 'auto',
      whiteSpace: 'nowrap',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: windowWidth <= 768 ? 'none' : 'translateY(-2px)'
      },
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    },
    secondaryButton: {
      flex: 1,
      padding: windowWidth <= 480 ? '0.875rem' : '1rem',
      backgroundColor: 'transparent',
      color: isDarkMode ? '#ffffff' : '#333333',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      borderRadius: windowWidth <= 480 ? '2rem' : '0.75rem',
      fontSize: windowWidth <= 480 ? '0.95rem' : '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: windowWidth <= 480 ? '100%' : 'auto',
      whiteSpace: 'nowrap',
      ':hover': {
        backgroundColor: isDarkMode ? '#404040' : '#f8f8f8'
      }
    },

    // Security Badge
    securityBadge: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '1.5rem',
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: '0.75rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      fontSize: windowWidth <= 480 ? '0.8rem' : '0.9rem',
      flexWrap: 'wrap',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box'
    },

    // Order Complete
    orderComplete: {
      textAlign: 'center',
      padding: windowWidth <= 480 ? '2rem 1rem' : '4rem 2rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: windowWidth <= 480 ? '1.5rem' : '2rem',
      width: '100%',
      boxSizing: 'border-box'
    },
    successIcon: {
      fontSize: windowWidth <= 480 ? '3rem' : '5rem',
      color: '#4caf50',
      marginBottom: '1rem'
    },
    orderNumber: {
      fontSize: windowWidth <= 480 ? '0.9rem' : '1.2rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      margin: '1rem 0',
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: '0.75rem',
      display: 'inline-block',
      wordBreak: 'break-all',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }
  };

  // Render order complete screen
  if (orderComplete) {
    return (
      <div style={themeStyles.container}>
        <SEO 
          title="Order Confirmed"
          description="Your order has been placed successfully at ASudha Beauty."
          keywords="order confirmation, purchase success, order placed"
          url="/checkout/success"
          type="website"
        />
        
        <div style={themeStyles.orderComplete}>
          <FaCheckCircle style={themeStyles.successIcon} />
          <h2 style={{ fontSize: windowWidth <= 480 ? '1.5rem' : '2rem', marginBottom: '0.75rem' }}>
            Order Placed Successfully!
          </h2>
          <p style={{ color: isDarkMode ? '#ccc' : '#666', marginBottom: '1rem' }}>
            Thank you for your purchase. We'll send you an email with order details.
          </p>
          <div style={themeStyles.orderNumber}>
            Order ID: {orderId}
          </div>
          <Link 
            to="/shop" 
            style={{
              ...themeStyles.primaryButton,
              display: 'inline-block',
              width: 'auto',
              marginTop: '1.5rem',
              textDecoration: 'none',
              padding: windowWidth <= 480 ? '0.75rem 1.5rem' : '1rem 2rem'
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={themeStyles.container}>
      <SEO 
        title="Checkout"
        description="Secure checkout at ASudha Beauty. Complete your purchase safely with multiple payment options."
        keywords="checkout, payment, secure checkout, buy cosmetics"
        url="/checkout"
        type="website"
      />
      
      {/* Header */}
      <div style={themeStyles.header}>
        <Link to="/cart" style={themeStyles.backButton}>
          <FaArrowLeft /> Back
        </Link>
        <h1 style={themeStyles.title}>Checkout</h1>
        {windowWidth <= 768 && (
          <button 
            style={themeStyles.mobileSummaryToggle}
            onClick={() => setShowMobileSummary(!showMobileSummary)}
          >
            {showMobileSummary ? 'Hide' : 'Show'} Summary
          </button>
        )}
      </div>

      {/* Progress Steps */}
      <div style={themeStyles.stepsContainer}>
        <div style={themeStyles.stepLine} />
        <div style={themeStyles.stepLineFill} />
        
        <div style={themeStyles.step}>
          <div style={{...themeStyles.stepNumber, ...getStepNumberStyle(1)}}>1</div>
          <div style={{...themeStyles.stepLabel, ...getStepLabelStyle(1)}}>Shipping</div>
        </div>
        <div style={themeStyles.step}>
          <div style={{...themeStyles.stepNumber, ...getStepNumberStyle(2)}}>2</div>
          <div style={{...themeStyles.stepLabel, ...getStepLabelStyle(2)}}>Payment</div>
        </div>
        <div style={themeStyles.step}>
          <div style={{...themeStyles.stepNumber, ...getStepNumberStyle(3)}}>3</div>
          <div style={{...themeStyles.stepLabel, ...getStepLabelStyle(3)}}>Confirm</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={themeStyles.checkoutGrid}>
        {/* Left Column - Forms */}
        <div>
          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <div style={themeStyles.formSection}>
              <h2 style={themeStyles.sectionTitle}>
                <FaTruck /> Shipping Information
              </h2>
              
              <div style={themeStyles.formGrid}>
                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="your@email.com"
                  />
                  {errors.email && <div style={themeStyles.error}>{errors.email}</div>}
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="10 digit mobile number"
                  />
                  {errors.phone && <div style={themeStyles.error}>{errors.phone}</div>}
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="First name"
                  />
                  {errors.firstName && <div style={themeStyles.error}>{errors.firstName}</div>}
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="Last name"
                  />
                  {errors.lastName && <div style={themeStyles.error}>{errors.lastName}</div>}
                </div>

                <div style={{ ...themeStyles.formGroup, gridColumn: '1 / -1' }}>
                  <label style={themeStyles.label}>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="Street address"
                  />
                  {errors.address && <div style={themeStyles.error}>{errors.address}</div>}
                </div>

                <div style={{ ...themeStyles.formGroup, gridColumn: '1 / -1' }}>
                  <label style={themeStyles.label}>Apartment (optional)</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="Apartment, suite, etc."
                  />
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="City"
                  />
                  {errors.city && <div style={themeStyles.error}>{errors.city}</div>}
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="State"
                  />
                  {errors.state && <div style={themeStyles.error}>{errors.state}</div>}
                </div>

                <div style={themeStyles.formGroup}>
                  <label style={themeStyles.label}>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    style={themeStyles.input}
                    placeholder="6 digit pincode"
                  />
                  {errors.pincode && <div style={themeStyles.error}>{errors.pincode}</div>}
                </div>

                <div style={{ ...themeStyles.formGroup, gridColumn: '1 / -1' }}>
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
                <Link to="/cart" style={themeStyles.secondaryButton}>
                  Cancel
                </Link>
                <button onClick={handleNextStep} style={themeStyles.primaryButton}>
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <div style={themeStyles.formSection}>
              <h2 style={themeStyles.sectionTitle}>
                <FaCreditCard /> Payment Method
              </h2>

              {/* Coupon Section */}
              <div style={themeStyles.couponSection}>
                <h3 style={themeStyles.couponTitle}>
                  <FaGift /> Have a coupon?
                </h3>
                <div style={themeStyles.couponInput}>
                  <input
                    type="text"
                    style={themeStyles.couponInputField}
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button 
                    style={themeStyles.applyCouponButton}
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <div style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#4caf50', color: '#fff', borderRadius: '2rem', textAlign: 'center', fontSize: '0.85rem' }}>
                    <FaCheckCircle /> 10% discount applied!
                  </div>
                )}
              </div>

              {/* Gift Card Section */}
              <GiftCardInput 
                orderTotal={totalBeforeGift}
                onApply={(result) => {
                  // Gift card applied
                }}
                onRemove={() => {
                  removeAppliedGiftCard();
                }}
              />

              <div style={themeStyles.paymentMethods}>
                <div
                  style={{
                    ...themeStyles.paymentMethod,
                    ...(paymentMethod === 'card' && themeStyles.activePaymentMethod)
                  }}
                  onClick={() => setPaymentMethod('card')}
                >
                  <FaCreditCard style={themeStyles.paymentIcon} />
                  <span style={themeStyles.paymentName}>Card</span>
                </div>

                <div
                  style={{
                    ...themeStyles.paymentMethod,
                    ...(paymentMethod === 'upi' && themeStyles.activePaymentMethod)
                  }}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <FaQrcode style={themeStyles.paymentIcon} />
                  <span style={themeStyles.paymentName}>UPI</span>
                </div>

                <div
                  style={{
                    ...themeStyles.paymentMethod,
                    ...(paymentMethod === 'netbanking' && themeStyles.activePaymentMethod)
                  }}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <FaUniversity style={themeStyles.paymentIcon} />
                  <span style={themeStyles.paymentName}>Net Banking</span>
                </div>

                <div
                  style={{
                    ...themeStyles.paymentMethod,
                    ...(paymentMethod === 'wallet' && themeStyles.activePaymentMethod)
                  }}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <FaMoneyBill style={themeStyles.paymentIcon} />
                  <span style={themeStyles.paymentName}>Wallet</span>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div style={themeStyles.formGrid}>
                  <div style={{ ...themeStyles.formGroup, gridColumn: '1 / -1' }}>
                    <label style={themeStyles.label}>Card Number</label>
                    <input
                      type="text"
                      style={themeStyles.input}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>Expiry Date</label>
                    <input
                      type="text"
                      style={themeStyles.input}
                      placeholder="MM/YY"
                    />
                  </div>

                  <div style={themeStyles.formGroup}>
                    <label style={themeStyles.label}>CVV</label>
                    <input
                      type="text"
                      style={themeStyles.input}
                      placeholder="123"
                    />
                  </div>

                  <div style={{ ...themeStyles.formGroup, gridColumn: '1 / -1' }}>
                    <label style={themeStyles.label}>Name on Card</label>
                    <input
                      type="text"
                      style={themeStyles.input}
                      placeholder="As shown on card"
                    />
                  </div>
                </div>
              )}

              {/* UPI Payment */}
              {paymentMethod === 'upi' && (
                <div style={themeStyles.upiSection}>
                  <h3 style={{ marginBottom: '1rem', fontSize: windowWidth <= 480 ? '1rem' : '1.2rem' }}>
                    Scan QR Code to Pay
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
                        <FaQrcode style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
                        <p>QR Code not found</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      type="file"
                      id="qr-upload"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleQrUpload}
                    />
                    <label htmlFor="qr-upload" style={themeStyles.qrUploadButton}>
                      <FaUpload /> Upload QR
                    </label>
                  </div>

                  <p style={{ margin: '1rem 0', color: isDarkMode ? '#ccc' : '#666' }}>
                    Or enter UPI ID
                  </p>

                  <div style={themeStyles.upiInput}>
                    <input
                      type="text"
                      style={themeStyles.input}
                      placeholder="username@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <button 
                      style={themeStyles.verifyButton}
                      onClick={handleUPIPayment}
                      disabled={processing}
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
                      style={{...themeStyles.verifyButton, marginTop: '1rem', width: windowWidth <= 480 ? '100%' : 'auto'}}
                      onClick={handleQRPayment}
                      disabled={processing}
                    >
                      I have scanned and paid
                    </button>
                  )}
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div>
                  <select style={{ ...themeStyles.input, marginBottom: '1rem' }}>
                    <option value="">Select your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Wallet */}
              {paymentMethod === 'wallet' && (
                <div style={themeStyles.paymentMethods}>
                  <div style={themeStyles.paymentMethod}>
                    <SiPhonepe style={{ ...themeStyles.paymentIcon, color: '#5F259F' }} />
                    <span style={themeStyles.paymentName}>PhonePe</span>
                  </div>
                  <div style={themeStyles.paymentMethod}>
                    <SiPaytm style={{ ...themeStyles.paymentIcon, color: '#00BAF2' }} />
                    <span style={themeStyles.paymentName}>Paytm</span>
                  </div>
                  <div style={themeStyles.paymentMethod}>
                    <FaGooglePay style={{ ...themeStyles.paymentIcon, color: '#4285F4' }} />
                    <span style={themeStyles.paymentName}>Google Pay</span>
                  </div>
                  <div style={themeStyles.paymentMethod}>
                    <FaAmazonPay style={{ ...themeStyles.paymentIcon, color: '#FF9900' }} />
                    <span style={themeStyles.paymentName}>Amazon Pay</span>
                  </div>
                </div>
              )}

              <div style={themeStyles.actionButtons}>
                <button onClick={handlePreviousStep} style={themeStyles.secondaryButton}>
                  Back
                </button>
                <button 
                  onClick={handlePlaceOrder}
                  style={themeStyles.primaryButton}
                  disabled={processing || (paymentMethod === 'upi' && !paymentConfirmed)}
                >
                  {processing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                </button>
              </div>

              <div style={themeStyles.securityBadge}>
                <FaLock /> <FaShieldAlt />
                <span>256-bit encrypted</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div style={themeStyles.summary}>
          {windowWidth <= 768 && (
            <div style={themeStyles.summaryHeader}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Order Summary</h3>
              <button 
                style={themeStyles.closeSummary}
                onClick={() => setShowMobileSummary(false)}
              >
                <FaTimes />
              </button>
            </div>
          )}
          
          <h2 style={themeStyles.summaryTitle}>Order Summary</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            {cartItems.map(item => (
              <div key={`${item.id}-${item.selectedShade}`} style={themeStyles.productItem}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={themeStyles.productImage}
                />
                <div style={themeStyles.productDetails}>
                  <div style={themeStyles.productName}>{item.name}</div>
                  {item.selectedShade && (
                    <div style={themeStyles.productMeta}>Shade: {item.selectedShade}</div>
                  )}
                  <div style={themeStyles.productMeta}>Qty: {item.quantity}</div>
                  <div style={themeStyles.productPrice}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={themeStyles.summaryDivider} />

          <div style={themeStyles.summaryItem}>
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          {couponApplied && (
            <div style={{...themeStyles.summaryItem, ...themeStyles.discountItem}}>
              <span>Discount (10%)</span>
              <span>-₹{discountFromCoupon.toFixed(2)}</span>
            </div>
          )}
          
          {giftCardDiscount > 0 && (
            <div style={{...themeStyles.summaryItem, ...themeStyles.giftCardItem}}>
              <span><FaGift /> Gift Card</span>
              <span>-₹{giftCardDiscount.toFixed(2)}</span>
            </div>
          )}
          
          <div style={themeStyles.summaryItem}>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
          </div>
          <div style={themeStyles.summaryItem}>
            <span>Tax (18% GST)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div style={themeStyles.summaryDivider} />

          <div style={themeStyles.summaryTotal}>
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {subtotal > 500 && (
            <div style={{
              marginTop: '1rem',
              padding: '0.5rem',
              backgroundColor: '#4caf50',
              color: '#ffffff',
              borderRadius: '0.75rem',
              textAlign: 'center',
              fontSize: windowWidth <= 480 ? '0.8rem' : '0.9rem'
            }}>
              🎉 Free Shipping Applied!
            </div>
          )}
          
          {giftCardDiscount > 0 && (
            <div style={{
              marginTop: '1rem',
              padding: '0.5rem',
              backgroundColor: '#e88ca6',
              color: '#ffffff',
              borderRadius: '0.75rem',
              textAlign: 'center',
              fontSize: windowWidth <= 480 ? '0.8rem' : '0.9rem'
            }}>
              🎁 Gift Card Applied! You saved ₹{giftCardDiscount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;