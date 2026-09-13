import React, { useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FaCheckCircle,
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
};

const DARK_SHADOW = "0 10px 30px rgba(0, 0, 0, 0.55)";
const DARK_SHADOW_LIFT = "0 24px 60px rgba(0, 0, 0, 0.75)";
const LIGHT_SHADOW = "0 10px 30px rgba(62, 39, 35, 0.06)";
const LIGHT_SHADOW_LIFT = "0 24px 60px rgba(62, 39, 35, 0.15)";

const Login = () => {
  const { isDarkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(formData.email, formData.password);
    if (result.success) navigate("/");
    else setError(result.error);
    setLoading(false);
  };

  // ─── Injected CSS (theme-dependent) — runs BEFORE paint ───
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

      .login-back-btn {
        transition: all 0.25s ease;
      }
      .login-back-btn:hover {
        background: linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary}) !important;
        border-color: transparent !important;
        color: ${isDarkMode ? brandColors.black : "#ffffff"} !important;
        transform: translateX(-4px);
      }

      .login-pw-toggle {
        transition: color 0.25s ease, transform 0.25s ease;
      }
      .login-pw-toggle:hover {
        color: ${brandColors.primary} !important;
        transform: translateY(-50%) scale(1.1);
      }

      .login-submit-btn {
        transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    box-shadow 0.35s ease;
        position: relative;
        overflow: hidden;
      }
      .login-submit-btn:hover:not(:disabled) {
        transform: translateY(-3px) scale(1.01);
        box-shadow: 0 16px 42px rgba(245, 52, 107, 0.5);
      }
      .login-submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
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
          ${
            isDarkMode
              ? "rgba(255,255,255,0.15)"
              : "rgba(255,255,255,0.5)"
          },
          transparent
        );
        transition: left 0.7s ease;
      }
      .login-submit-btn:hover::after {
        left: 100%;
      }

      .login-link {
        transition: all 0.25s ease;
      }
      .login-link:hover {
        text-decoration: underline;
        color: ${brandColors.primaryDark};
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-login-styles="true"]')
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
        : `linear-gradient(135deg, ${brandColors.cream}, #fdf0ed)`,
      padding: "1.5rem 1rem",
      overflow: "hidden",
      transition: "background 0.4s ease",
      boxSizing: "border-box",
      width: "100%",
    },

    // ─── Background layer ───
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

    // ─── Login card ───
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
    // Decorative top accent bar
    cardAccentBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${brandColors.gold}, ${brandColors.primary}, ${brandColors.green})`,
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
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.65rem",
      color: isDarkMode ? brandColors.black : "#ffffff",
      boxShadow: "0 16px 40px rgba(245, 52, 107, 0.4)",
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

    // ─── Error ───
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

    // ─── Form ───
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
    },

    // ─── Submit ───
    loginButton: {
      width: "100%",
      padding: "1.05rem",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
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
      color: T.accent,
      fontWeight: "800",
      textDecoration: "none",
      marginLeft: "0.25rem",
    },
  };

  return (
    <>
      <SEO
        title="Login | ASudha Beauty"
        description="Login to your ASudha Beauty account to continue your natural Ayurvedic journey."
      />
      <div style={themeStyles.container}>
        {/* Animated background */}
        <div style={themeStyles.bgLayer}>
          <div style={themeStyles.bgGradient} />
          <div style={themeStyles.bgGrid} />
          <div
            className="login-orb-1"
            style={themeStyles.bgOrb1}
            aria-hidden="true"
          />
          <div
            className="login-orb-2"
            style={themeStyles.bgOrb2}
            aria-hidden="true"
          />
          <div
            className="login-orb-3"
            style={themeStyles.bgOrb3}
            aria-hidden="true"
          />
        </div>

        <div style={themeStyles.loginBox} className="login-card">
          <div style={themeStyles.cardAccentBar} />

          <button
            onClick={() => navigate(-1)}
            style={themeStyles.backButton}
            className="login-back-btn"
            type="button"
          >
            <FaArrowLeft /> Back
          </button>

          <div style={themeStyles.iconWrapper}>
            <FaSpa />
          </div>
          <h1 style={themeStyles.title}>Welcome Back!</h1>
          <p style={themeStyles.subtitle}>
            <FaLeaf
              style={{
                color: isDarkMode ? brandColors.gold : brandColors.bronze,
                fontSize: "0.8rem",
              }}
            />
            Login to continue your pure, natural journey.
          </p>

          {error && (
            <div style={themeStyles.errorBox} role="alert">
              <FaCheckCircle style={{ transform: "rotate(45deg)" }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label} htmlFor="login-email">
                Email Address
              </label>
              <div style={themeStyles.inputWrapper}>
                <FaEnvelope style={themeStyles.inputIcon} />
                <input
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
                />
              </div>
            </div>

            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label} htmlFor="login-password">
                Password
              </label>
              <div style={themeStyles.inputWrapper}>
                <FaLock style={themeStyles.inputIcon} />
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
                />
                <button
                  type="button"
                  style={themeStyles.passwordToggle}
                  className="login-pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={themeStyles.loginButton}
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to Your Account"}
            </button>
          </form>

          <div style={themeStyles.footer}>
            New to ASudha Beauty?
            <Link to="/signup" style={themeStyles.link} className="login-link">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;