// src/pages/Login.jsx
import React, { useState, useLayoutEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaLeaf,
  FaSpa,
  FaExclamationTriangle,
  FaTimesCircle,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import SEO from "../components/SEO";

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
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 24px 60px rgba(0, 0, 0, 0.75)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 24px 60px rgba(62, 39, 35, 0.15)";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const Login = () => {
  const { isDarkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef(null);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // ─── Theme tokens ───
  const dark = {
    bg: brandColors.black,
    bgAlt: "#141414",
    card: "rgba(26, 26, 26, 0.85)",
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
    inputBg: "rgba(15, 15, 15, 0.7)",
    inputBorder: "rgba(255, 255, 255, 0.1)",
    inputIcon: "#888888",
    errorBg: "rgba(244, 67, 54, 0.15)",
    errorBorder: "rgba(244, 67, 54, 0.3)",
    errorText: "#ff8a80",
    shadow: DARK_SHADOW,
    shadowLift: DARK_SHADOW_LIFT,
  };

  const light = {
    bg: brandColors.cream,
    bgAlt: "#ffffff",
    card: "rgba(255, 255, 255, 0.85)",
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
    inputBg: "rgba(255, 255, 255, 0.95)",
    inputBorder: "rgba(62, 39, 35, 0.1)",
    inputIcon: "#a1887f",
    errorBg: "rgba(244, 67, 54, 0.1)",
    errorBorder: "rgba(244, 67, 54, 0.25)",
    errorText: "#c62828",
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (error) setError("");
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      nextErrors.password = "Please enter your password";
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) {
      const first = Object.keys(fieldErrors)[0];
      if (first) document.getElementById(`login-${first}`)?.focus();
      return;
    }
    setLoading(true);
    const result = await login(formData.email.trim(), formData.password);
    setLoading(false);
    if (result?.success) {
      // If user was redirected here by ProtectedRoute, send them back.
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } else {
      setError(result?.error || "Invalid email or password. Please try again.");
      emailRef.current?.focus();
    }
  };

  // ─── Injected CSS — only depends on isDarkMode ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-login-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-login-styles", "true");
    style.textContent = `
      @keyframes loginFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(50px, 60px) scale(1.1); }
      }
      @keyframes loginFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-60px, -45px) scale(1.08); }
      }
      @keyframes loginFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(35px, -40px) scale(1.06); }
      }
      @keyframes loginFadeUp {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes loginSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .login-orb-1 { animation: loginFloat1 12s ease-in-out infinite; }
      .login-orb-2 { animation: loginFloat2 14s ease-in-out infinite; }
      .login-orb-3 { animation: loginFloat3 16s ease-in-out infinite; }

      .login-card {
        animation: loginFadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .login-input {
        transition: border-color 0.25s ease, box-shadow 0.25s ease,
                    background-color 0.25s ease;
      }
      .login-input:focus {
        border-color: ${
          isDarkMode ? brandColors.gold : brandColors.primary
        } !important;
        box-shadow: 0 0 0 4px ${
          isDarkMode
            ? "rgba(212, 175, 55, 0.18)"
            : "rgba(245, 52, 107, 0.12)"
        } !important;
        background-color: ${
          isDarkMode ? "rgba(0, 0, 0, 0.6)" : "#ffffff"
        } !important;
      }
      .login-input::placeholder {
        color: ${isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(62,39,35,0.35)"};
      }
      .login-input[aria-invalid="true"] {
        border-color: #f44336 !important;
      }
      .login-input[aria-invalid="true"]:focus {
        box-shadow: 0 0 0 4px rgba(244, 67, 54, 0.15) !important;
      }

      .login-back-btn { transition: all 0.25s ease; }
      .login-back-btn:hover,
      .login-back-btn:focus-visible {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        border-color: transparent !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        transform: translateX(-4px);
        outline: none;
      }

      .login-pw-toggle { transition: color 0.25s ease, transform 0.25s ease; }
      .login-pw-toggle:hover,
      .login-pw-toggle:focus-visible {
        color: ${brandColors.primary} !important;
        transform: translateY(-50%) scale(1.1);
        outline: none;
      }
      .login-pw-toggle:focus-visible {
        outline: 2px solid ${
          isDarkMode ? brandColors.gold : brandColors.primary
        };
        outline-offset: 2px;
        border-radius: 50%;
      }

      .login-submit-btn {
        transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.35s ease;
        position: relative;
        overflow: hidden;
      }
      .login-submit-btn:hover:not(:disabled),
      .login-submit-btn:focus-visible:not(:disabled) {
        transform: translateY(-3px) scale(1.01);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
        outline: none;
      }
      .login-submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .login-submit-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }

      /* Shine sweep on the button */
      .login-submit-btn::after {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          ${isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)"},
          transparent
        );
        transition: left 0.7s ease;
      }
      .login-submit-btn:hover:not(:disabled)::after {
        left: 100%;
      }

      .login-link { transition: all 0.25s ease; }
      .login-link:hover,
      .login-link:focus-visible {
        text-decoration: underline;
        color: ${brandColors.primaryDark};
        outline: none;
      }

      .login-forgot-link { transition: color 0.2s ease; }
      .login-forgot-link:hover,
      .login-forgot-link:focus-visible {
        text-decoration: underline;
        color: ${brandColors.primary};
        outline: none;
      }

      .login-checkbox {
        accent-color: ${brandColors.primary};
        width: 16px;
        height: 16px;
        cursor: pointer;
        flex-shrink: 0;
      }
      .login-checkbox:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline-offset: 2px;
      }

      .login-legal-source {
        transition: color 0.2s ease;
        text-decoration: underline;
        color: inherit;
      }
      .login-legal-source:hover,
      .login-legal-source:focus-visible {
        color: ${isDarkMode ? brandColors.gold : brandColors.primary};
        outline: none;
      }

      .login-spinner {
        animation: loginSpin 1s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .login-orb-1, .login-orb-2, .login-orb-3, .login-card {
          animation: none !important;
        }
        .login-input, .login-back-btn, .login-pw-toggle, .login-submit-btn,
        .login-link, .login-forgot-link, .login-legal-source, .login-spinner {
          transition: none !important;
          transform: none !important;
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-login-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  const themeStyles = {
    container: {
      position: "relative",
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isDarkMode
        ? `linear-gradient(135deg, ${brandColors.black}, ${brandColors.darkSlate})`
        : `linear-gradient(135deg, ${brandColors.cream}, #fdf0ed)`,
      padding: "1.5rem 1rem",
      overflow: "hidden",
      transition: "background 0.4s ease",
      boxSizing: "border-box",
      width: "100%",
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
        ? "radial-gradient(circle at 15% 8%, rgba(245, 52, 107, 0.18) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.14) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(76, 175, 80, 0.1) 0%, transparent 50%)"
        : "radial-gradient(circle at 15% 8%, rgba(245, 52, 107, 0.1) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.09) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(76, 175, 80, 0.08) 0%, transparent 50%)",
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
      top: "-120px",
      left: "-120px",
      width: "440px",
      height: "440px",
      maxWidth: "60vw",
      maxHeight: "60vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(245, 52, 107, 0.4) 0%, transparent 70%)",
      filter: "blur(90px)",
      opacity: isDarkMode ? 0.5 : 0.4,
    },
    bgOrb2: {
      position: "absolute",
      bottom: "-140px",
      right: "-140px",
      width: "460px",
      height: "460px",
      maxWidth: "60vw",
      maxHeight: "60vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(76, 175, 80, 0.38) 0%, transparent 70%)",
      filter: "blur(90px)",
      opacity: isDarkMode ? 0.5 : 0.4,
    },
    bgOrb3: {
      position: "absolute",
      top: "40%",
      right: "-100px",
      width: "380px",
      height: "380px",
      maxWidth: "50vw",
      maxHeight: "50vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.35) 0%, transparent 70%)",
      filter: "blur(90px)",
      opacity: isDarkMode ? 0.42 : 0.32,
    },

    loginBox: {
      position: "relative",
      zIndex: 1,
      maxWidth: "440px",
      width: "100%",
      backgroundColor: T.card,
      borderRadius: "28px",
      padding: "2.75rem 2.5rem",
      boxShadow: T.shadowLift,
      border: `1px solid ${T.border}`,
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      transition: "all 0.4s ease",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    cardAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
      opacity: 0.9,
    },

    backButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1.75rem",
      padding: "0.5rem 1.1rem",
      background: "transparent",
      border: `1.5px solid ${T.border}`,
      borderRadius: "50px",
      color: T.text,
      cursor: "pointer",
      fontSize: "0.85rem",
      fontWeight: "700",
      fontFamily: "inherit",
      letterSpacing: "0.2px",
    },

    iconWrapper: {
      width: "68px",
      height: "68px",
      borderRadius: "20px",
      margin: "0 auto 1.5rem",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.65rem",
      color: isDarkMode ? brandColors.black : "#ffffff",
      boxShadow: "0 16px 40px rgba(245, 52, 107, 0.4)",
    },

    title: {
      fontSize: "1.9rem",
      fontWeight: "900",
      textAlign: "center",
      marginBottom: "0.75rem",
      color: T.text,
      letterSpacing: "-0.5px",
      lineHeight: "1.15",
    },
    subtitle: {
      textAlign: "center",
      color: T.textMuted,
      fontSize: "0.9rem",
      marginBottom: "2rem",
      lineHeight: "1.65",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.4rem",
      flexWrap: "wrap",
      width: "100%",
    },

    errorBox: {
      background: T.errorBg,
      color: T.errorText,
      padding: "0.85rem 1rem",
      borderRadius: "14px",
      fontSize: "0.88rem",
      textAlign: "center",
      marginBottom: "1.5rem",
      border: `1px solid ${T.errorBorder}`,
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },

    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      marginBottom: "1.35rem",
    },
    label: {
      fontSize: "0.78rem",
      fontWeight: "800",
      color: T.text,
      letterSpacing: "0.8px",
      textTransform: "uppercase",
    },
    inputWrapper: { position: "relative" },
    inputIcon: {
      position: "absolute",
      left: "1.1rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: T.inputIcon,
      fontSize: "0.95rem",
      pointerEvents: "none",
      zIndex: 1,
      transition: "color 0.3s ease",
    },
    input: {
      width: "100%",
      padding: "0.95rem 2.75rem 0.95rem 3rem",
      background: T.inputBg,
      border: `1.5px solid ${T.inputBorder}`,
      borderRadius: "14px",
      fontSize: "0.95rem",
      color: T.text,
      outline: "none",
      fontFamily: "inherit",
      fontWeight: "600",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
    },
    passwordToggle: {
      position: "absolute",
      right: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: T.inputIcon,
      cursor: "pointer",
      fontSize: "1rem",
      padding: "0.35rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      fontFamily: "inherit",
    },
    fieldError: {
      fontSize: "0.75rem",
      color: T.errorText,
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
      marginTop: "0.1rem",
    },

    // ─── Remember me row ───
    rememberRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
    },
    rememberLabel: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.83rem",
      color: T.textMuted,
      fontWeight: "600",
      cursor: "pointer",
      userSelect: "none",
    },
    forgotLink: {
      fontSize: "0.83rem",
      color: isDarkMode ? brandColors.gold : brandColors.primary,
      fontWeight: "700",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.25rem",
      fontFamily: "inherit",
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
    },

    loginButton: {
      width: "100%",
      padding: "1.05rem",
      border: "none",
      borderRadius: "50px",
      cursor: loading ? "not-allowed" : "pointer",
      background: `linear-gradient(135deg, ${brandColors.gold} 0%, ${brandColors.primary} 100%)`,
      color: isDarkMode ? brandColors.black : "#ffffff",
      fontSize: "1rem",
      fontWeight: "800",
      letterSpacing: "0.3px",
      boxShadow: "0 12px 30px rgba(245, 52, 107, 0.35)",
      fontFamily: "inherit",
      marginTop: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      opacity: loading ? 0.65 : 1,
    },

    footer: {
      textAlign: "center",
      marginTop: "1.5rem",
      fontSize: "0.9rem",
      color: T.textMuted,
      fontWeight: "600",
    },
    link: {
      color: T.accent,
      fontWeight: "800",
      textDecoration: "none",
      marginLeft: "0.25rem",
    },

    // ─── Legal footnote ───
    legalFootnote: {
      marginTop: "1.5rem",
      paddingTop: "1.15rem",
      borderTop: `1px solid ${T.divider}`,
      fontSize: "0.72rem",
      color: T.textDim,
      lineHeight: "1.7",
      display: "flex",
      alignItems: "flex-start",
      gap: "0.5rem",
    },
  };

  return (
    <>
      <SEO
        title="Login | ASudha Beauty — Access Your Account"
        description="Login to your ASudha Beauty account to track orders, manage your wishlist, and continue shopping 100% natural Ayurvedic skincare and hair care."
        keywords="asudha beauty login, sign in, account access, ayurvedic skincare account"
        url="/login"
        noindex
      />

      <div style={themeStyles.container}>
        {/* Animated background */}
        <div style={themeStyles.bgLayer} aria-hidden="true">
          <div style={themeStyles.bgGradient} />
          <div style={themeStyles.bgGrid} />
          <div className="login-orb-1" style={themeStyles.bgOrb1} />
          <div className="login-orb-2" style={themeStyles.bgOrb2} />
          <div className="login-orb-3" style={themeStyles.bgOrb3} />
        </div>

        <main style={themeStyles.loginBox} className="login-card">
          <div style={themeStyles.cardAccentBar} aria-hidden="true" />

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={themeStyles.backButton}
            className="login-back-btn"
            aria-label="Go back to previous page"
          >
            <FaArrowLeft aria-hidden="true" /> Back
          </button>

          <div style={themeStyles.iconWrapper} aria-hidden="true">
            <FaSpa />
          </div>
          <h1 style={themeStyles.title}>Welcome Back!</h1>
          <p style={themeStyles.subtitle}>
            <FaLeaf
              aria-hidden="true"
              style={{
                color: isDarkMode ? brandColors.gold : brandColors.bronze,
                fontSize: "0.8rem",
              }}
            />
            Login to continue your pure, natural journey.
          </p>

          {error && (
            <div
              style={themeStyles.errorBox}
              role="alert"
              aria-live="assertive"
            >
              <FaExclamationTriangle aria-hidden="true" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label} htmlFor="login-email">
                Email Address
              </label>
              <div style={themeStyles.inputWrapper}>
                <FaEnvelope aria-hidden="true" style={themeStyles.inputIcon} />
                <input
                  ref={emailRef}
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  style={themeStyles.input}
                  className="login-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  autoFocus
                  aria-required="true"
                  aria-invalid={fieldErrors.email ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.email ? "login-email-error" : undefined
                  }
                />
              </div>
              {fieldErrors.email && (
                <div
                  id="login-email-error"
                  style={themeStyles.fieldError}
                  role="alert"
                >
                  <FaTimesCircle aria-hidden="true" /> {fieldErrors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label} htmlFor="login-password">
                Password
              </label>
              <div style={themeStyles.inputWrapper}>
                <FaLock aria-hidden="true" style={themeStyles.inputIcon} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  style={themeStyles.input}
                  className="login-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  aria-required="true"
                  aria-invalid={fieldErrors.password ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.password ? "login-password-error" : undefined
                  }
                />
                <button
                  type="button"
                  style={themeStyles.passwordToggle}
                  className="login-pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <FaEyeSlash aria-hidden="true" />
                  ) : (
                    <FaEye aria-hidden="true" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <div
                  id="login-password-error"
                  style={themeStyles.fieldError}
                  role="alert"
                >
                  <FaTimesCircle aria-hidden="true" />
                  {fieldErrors.password}
                </div>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div style={themeStyles.rememberRow}>
              <label style={themeStyles.rememberLabel} htmlFor="login-remember">
                <input
                  id="login-remember"
                  type="checkbox"
                  className="login-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                style={themeStyles.forgotLink}
                className="login-forgot-link"
              >
                Forgot password?
                <FaArrowRight
                  aria-hidden="true"
                  style={{ fontSize: "0.65rem" }}
                />
              </Link>
            </div>

            <button
              type="submit"
              style={themeStyles.loginButton}
              className="login-submit-btn"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="login-spinner" aria-hidden="true">
                    <FaLock />
                  </span>
                  Logging in…
                </>
              ) : (
                "Login to Your Account"
              )}
            </button>
          </form>

          <div style={themeStyles.footer}>
            New to ASudha Beauty?{" "}
            <Link to="/signup" style={themeStyles.link} className="login-link">
              Create an account
            </Link>
          </div>

          {/* ─── Legal footnote ─── */}
          <div style={themeStyles.legalFootnote}>
            <FaShieldAlt
              aria-hidden="true"
              style={{
                color: isDarkMode ? brandColors.gold : brandColors.green,
                fontSize: "0.8rem",
                marginTop: "0.1rem",
                flexShrink: 0,
              }}
            />
            <span>
              By logging in you agree to our{" "}
              <Link to="/terms" className="login-legal-source">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link to="/returns" className="login-legal-source">
                Returns Policy
              </Link>
              . Your data is protected — we never share your personal
              information.
            </span>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;