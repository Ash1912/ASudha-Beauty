import React, { useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCheckCircle,
  FaLeaf,
  FaExclamationTriangle,
} from "react-icons/fa";
import SEO from "../components/SEO";

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
  greenLight: "#8bc34a",
  danger: "#f44336",
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 24px 60px rgba(0, 0, 0, 0.75)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 24px 60px rgba(62, 39, 35, 0.15)";

const Signup = () => {
  const { isDarkMode } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
    successBg: "rgba(76, 175, 80, 0.15)",
    successBorder: "rgba(76, 175, 80, 0.3)",
    successText: "#a5d6a7",
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
    successBg: "rgba(76, 175, 80, 0.1)",
    successBorder: "rgba(76, 175, 80, 0.25)",
    successText: "#2e7d32",
    shadow: LIGHT_SHADOW,
    shadowLift: LIGHT_SHADOW_LIFT,
  };

  const T = isDarkMode ? dark : light;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (trimmedName.length < 2) {
      setError("Please enter your full name");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    const result = await signup(
      formData.name.trim(),
      formData.email.trim(),
      formData.password
    );
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-signup-styles="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-signup-styles", "true");
    style.textContent = `
      @keyframes signupFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-50px, 50px) scale(1.1); }
      }
      @keyframes signupFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(45px, -55px) scale(1.08); }
      }
      @keyframes signupFloat3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(35px, 40px) scale(1.06); }
      }
      @keyframes signupFadeUp {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .signup-orb-1 { animation: signupFloat1 12s ease-in-out infinite; }
      .signup-orb-2 { animation: signupFloat2 14s ease-in-out infinite; }
      .signup-orb-3 { animation: signupFloat3 16s ease-in-out infinite; }

      .signup-card {
        animation: signupFadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .signup-input {
        transition: border-color 0.25s ease, box-shadow 0.25s ease,
                    background-color 0.25s ease;
      }
      .signup-input:focus {
        border-color: ${brandColors.green} !important;
        box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.15) !important;
        background-color: ${
          isDarkMode ? "rgba(0, 0, 0, 0.6)" : "#ffffff"
        } !important;
      }
      .signup-input::placeholder {
        color: ${isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(62,39,35,0.35)"};
      }

      .signup-back-btn {
        transition: all 0.25s ease;
      }
      .signup-back-btn:hover {
        background: linear-gradient(135deg, ${brandColors.green}, ${brandColors.greenLight}) !important;
        border-color: transparent !important;
        color: #ffffff !important;
        transform: translateX(-4px);
      }

      .signup-pw-toggle {
        transition: color 0.25s ease, transform 0.25s ease;
      }
      .signup-pw-toggle:hover {
        color: ${brandColors.green} !important;
        transform: translateY(-50%) scale(1.1);
      }

      .signup-submit-btn {
        transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.35s ease;
        position: relative;
        overflow: hidden;
      }
      .signup-submit-btn:hover:not(:disabled) {
        transform: translateY(-3px) scale(1.01);
        box-shadow: 0 16px 42px rgba(76, 175, 80, 0.5);
      }
      .signup-submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      /* Shine sweep */
      .signup-submit-btn::after {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          ${
            isDarkMode
              ? "rgba(255,255,255,0.15)"
              : "rgba(255,255,255,0.5)"
          },
          transparent
        );
        transition: left 0.7s ease;
      }
      .signup-submit-btn:hover:not(:disabled)::after {
        left: 100%;
      }

      .signup-link {
        transition: all 0.25s ease;
      }
      .signup-link:hover {
        text-decoration: underline;
        color: ${brandColors.greenLight};
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-signup-styles="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const themeStyles = {
    // ─── Page wrapper ───
    container: {
      position: "relative",
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isDarkMode
        ? `linear-gradient(135deg, ${brandColors.black}, ${brandColors.darkSlate})`
        : `linear-gradient(135deg, ${brandColors.cream}, #eef9ee)`,
      padding: "1.5rem 1rem",
      overflow: "hidden",
      transition: "background 0.4s ease",
      boxSizing: "border-box",
      width: "100%",
    },

    // ─── Animated background layer ───
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
        ? "radial-gradient(circle at 15% 8%, rgba(76, 175, 80, 0.18) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.14) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(245, 52, 107, 0.1) 0%, transparent 50%)"
        : "radial-gradient(circle at 15% 8%, rgba(76, 175, 80, 0.12) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.09) 0%, transparent 45%), radial-gradient(circle at 50% 105%, rgba(245, 52, 107, 0.08) 0%, transparent 50%)",
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
      right: "-120px",
      width: "440px",
      height: "440px",
      maxWidth: "60vw",
      maxHeight: "60vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 40% 40%, rgba(76, 175, 80, 0.42) 0%, transparent 70%)",
      filter: "blur(90px)",
      opacity: isDarkMode ? 0.5 : 0.4,
    },
    bgOrb2: {
      position: "absolute",
      bottom: "-140px",
      left: "-140px",
      width: "460px",
      height: "460px",
      maxWidth: "60vw",
      maxHeight: "60vw",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 60% 60%, rgba(245, 52, 107, 0.4) 0%, transparent 70%)",
      filter: "blur(90px)",
      opacity: isDarkMode ? 0.5 : 0.4,
    },
    bgOrb3: {
      position: "absolute",
      top: "40%",
      left: "20%",
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

    // ─── Signup card ───
    signupBox: {
      position: "relative",
      zIndex: 1,
      maxWidth: "460px",
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
    // Tri-color accent bar — matches the rest of the app
    cardAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.gold}, ${brandColors.primary})`,
      opacity: 0.9,
    },

    // ─── Back button ───
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

    // ─── Icon ───
    iconWrapper: {
      width: "68px",
      height: "68px",
      borderRadius: "20px",
      margin: "0 auto 1.5rem",
      background: `linear-gradient(135deg, ${brandColors.green}, ${brandColors.greenLight})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.65rem",
      color: "#ffffff",
      boxShadow: "0 16px 40px rgba(76, 175, 80, 0.4)",
    },

    // ─── Title ───
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

    // ─── Status boxes ───
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
    successBox: {
      background: T.successBg,
      color: T.successText,
      padding: "0.85rem 1rem",
      borderRadius: "14px",
      fontSize: "0.9rem",
      textAlign: "center",
      marginBottom: "1.5rem",
      border: `1px solid ${T.successBorder}`,
      fontWeight: "800",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },

    // ─── Form ───
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      marginBottom: "1.25rem",
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
    },

    // ─── Submit ───
    signupButton: {
      width: "100%",
      padding: "1.05rem",
      border: "none",
      borderRadius: "50px",
      cursor: loading || success ? "not-allowed" : "pointer",
      background: `linear-gradient(135deg, ${brandColors.green} 0%, ${brandColors.greenLight} 100%)`,
      color: "#ffffff",
      fontSize: "1rem",
      fontWeight: "800",
      letterSpacing: "0.3px",
      boxShadow: "0 12px 30px rgba(76, 175, 80, 0.35)",
      fontFamily: "inherit",
      marginTop: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      opacity: loading || success ? 0.65 : 1,
    },

    // ─── Footer ───
    footer: {
      textAlign: "center",
      marginTop: "2rem",
      fontSize: "0.9rem",
      color: T.textMuted,
      fontWeight: "600",
    },
    link: {
      color: T.green,
      fontWeight: "800",
      textDecoration: "none",
      marginLeft: "0.25rem",
    },
  };

  return (
    <>
      <SEO
        title="Sign Up | ASudha Beauty"
        description="Create your ASudha Beauty account and start your natural Ayurvedic journey today."
      />
      <div style={themeStyles.container}>
        {/* Animated background */}
        <div style={themeStyles.bgLayer}>
          <div style={themeStyles.bgGradient} />
          <div style={themeStyles.bgGrid} />
          <div
            className="signup-orb-1"
            style={themeStyles.bgOrb1}
            aria-hidden="true"
          />
          <div
            className="signup-orb-2"
            style={themeStyles.bgOrb2}
            aria-hidden="true"
          />
          <div
            className="signup-orb-3"
            style={themeStyles.bgOrb3}
            aria-hidden="true"
          />
        </div>

        <div style={themeStyles.signupBox} className="signup-card">
          <div style={themeStyles.cardAccentBar} />

          <button
            onClick={() => navigate(-1)}
            style={themeStyles.backButton}
            className="signup-back-btn"
            type="button"
          >
            <FaArrowLeft /> Back
          </button>

          <div style={themeStyles.iconWrapper}>
            <FaLeaf />
          </div>
          <h1 style={themeStyles.title}>Create Account</h1>
          <p style={themeStyles.subtitle}>
            Join us and embrace natural beauty
          </p>

          {success && (
            <div style={themeStyles.successBox} role="status">
              <FaCheckCircle /> Account created! Redirecting...
            </div>
          )}
          {error && (
            <div style={themeStyles.errorBox} role="alert">
              <FaExclamationTriangle /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label} htmlFor="signup-name">
                Full Name
              </label>
              <div style={themeStyles.inputWrapper}>
                <FaUser style={themeStyles.inputIcon} />
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  style={themeStyles.input}
                  className="signup-input"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label} htmlFor="signup-email">
                Email Address
              </label>
              <div style={themeStyles.inputWrapper}>
                <FaEnvelope style={themeStyles.inputIcon} />
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  style={themeStyles.input}
                  className="signup-input"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label} htmlFor="signup-password">
                Password
              </label>
              <div style={themeStyles.inputWrapper}>
                <FaLock style={themeStyles.inputIcon} />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min 6 characters"
                  style={themeStyles.input}
                  className="signup-input"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  style={themeStyles.passwordToggle}
                  className="signup-pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label} htmlFor="signup-confirm">
                Confirm Password
              </label>
              <div style={themeStyles.inputWrapper}>
                <FaLock style={themeStyles.inputIcon} />
                <input
                  id="signup-confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  style={themeStyles.input}
                  className="signup-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  style={themeStyles.passwordToggle}
                  className="signup-pw-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={themeStyles.signupButton}
              className="signup-submit-btn"
              disabled={loading || success}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div style={themeStyles.footer}>
            Already have an account?
            <Link to="/login" style={themeStyles.link} className="signup-link">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;