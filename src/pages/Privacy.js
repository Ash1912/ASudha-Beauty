// src/pages/Privacy.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";
import { 
  FaShieldAlt, 
  FaUserSecret, 
  FaCookieBite, 
  FaLock, 
  FaShareAlt, 
  FaUserCheck, 
  FaEnvelope 
} from "react-icons/fa";

// ─── Brand palette ───
const brandColors = {
  primary: "#f5346b",
  gold: "#f7d794",
  goldDark: "#d4af37",
  bronze: "#c77d42",
  black: "#0f0f0f",
  darkSlate: "#1a1a1a",
  earthLight: "#6d4c41",
  cream: "#fcf8f5",
  green: "#4caf50",
};

const Privacy = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 480;
  const isNarrow = windowWidth <= 768;

  // ─── Theme tokens ───
  const T = {
    bg: isDarkMode ? brandColors.black : brandColors.cream,
    card: isDarkMode ? brandColors.darkSlate : "#ffffff",
    border: isDarkMode ? "rgba(212, 175, 55, 0.14)" : "rgba(62, 39, 35, 0.08)",
    borderSoft: isDarkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(62, 39, 35, 0.04)",
    text: isDarkMode ? "#f5f0eb" : "#3e2723",
    textMuted: isDarkMode ? "#c9b8b0" : brandColors.earthLight,
    gold: isDarkMode ? brandColors.gold : brandColors.goldDark,
    shadow: isDarkMode ? "0 10px 30px rgba(0, 0, 0, 0.55)" : "0 10px 30px rgba(62, 39, 35, 0.06)",
  };

  const themeStyles = {
    container: {
      backgroundColor: T.bg,
      color: T.text,
      minHeight: "100vh",
      paddingBottom: "4rem",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    inner: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: isMobile ? "1.5rem 1rem" : isNarrow ? "2rem 1.5rem" : "3rem 2rem",
    },
    backButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "2rem",
      padding: "0.6rem 1.35rem",
      backgroundColor: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: "50px",
      color: T.text,
      textDecoration: "none",
      fontSize: "0.9rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: T.shadow,
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
      position: "relative",
    },
    iconWrapper: {
      width: "70px",
      height: "70px",
      margin: "0 auto 1.5rem",
      borderRadius: "20px",
      background: `linear-gradient(135deg, ${brandColors.gold}, ${brandColors.primary})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.8rem",
      color: isDarkMode ? brandColors.black : "#ffffff",
      boxShadow: "0 14px 34px rgba(245, 52, 107, 0.35)",
    },
    title: {
      fontSize: isMobile ? "2rem" : "2.8rem",
      fontWeight: "900",
      color: T.text,
      marginBottom: "1rem",
      letterSpacing: "-0.5px",
    },
    lastUpdated: {
      fontSize: "0.85rem",
      color: T.textMuted,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    contentCard: {
      backgroundColor: T.card,
      borderRadius: "24px",
      padding: isMobile ? "1.5rem 1.25rem" : "3rem 2.5rem",
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
    },
    section: {
      marginBottom: "2.5rem",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "800",
      color: isDarkMode ? T.gold : brandColors.bronze,
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
    },
    paragraph: {
      fontSize: "1rem",
      lineHeight: "1.8",
      color: T.textMuted,
      marginBottom: "1rem",
    },
    list: {
      paddingLeft: "1.5rem",
      marginBottom: "1rem",
      color: T.textMuted,
      lineHeight: "1.8",
      fontSize: "1rem",
    },
    listItem: {
      marginBottom: "0.5rem",
    },
    strong: {
      color: T.text,
      fontWeight: "700",
    },
    link: {
      color: isDarkMode ? T.gold : brandColors.primary,
      textDecoration: "underline",
      fontWeight: "600",
    },
    contactBox: {
      marginTop: "3rem",
      padding: "1.5rem",
      backgroundColor: isDarkMode ? "rgba(212, 175, 55, 0.08)" : "rgba(245, 52, 107, 0.04)",
      borderRadius: "16px",
      border: `1px solid ${isDarkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(245, 52, 107, 0.15)"}`,
      textAlign: "center",
    },
  };

  return (
    <div style={themeStyles.container}>
      <SEO
        title="Privacy Policy | ASudha Beauty"
        description="Learn how ASudha Beauty collects, uses, and protects your personal information. Read our Privacy Policy to understand your rights and data security."
        url="/privacy"
        noindex={true}
      />

      <div style={themeStyles.inner}>

        <header style={themeStyles.header}>
          <div style={themeStyles.iconWrapper}>
            <FaUserSecret />
          </div>
          <h1 style={themeStyles.title}>Privacy Policy</h1>
          <p style={themeStyles.lastUpdated}>Last Updated: November 2026</p>
        </header>

        <div style={themeStyles.contentCard}>
          <section style={themeStyles.section}>
            <p style={themeStyles.paragraph}>
              At <strong style={themeStyles.strong}>ASudha Beauty</strong>, we are committed to protecting the privacy and security of our customers. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.asudhabeauty.shop" style={themeStyles.link}>www.asudhabeauty.shop</a>.
            </p>
            <p style={themeStyles.paragraph}>
              By using our website, you consent to the data practices described in this policy. This policy is compliant with the <strong style={themeStyles.strong}>Information Technology Act, 2000</strong> and the <strong style={themeStyles.strong}>Digital Personal Data Protection (DPDP) Act, 2023</strong> of India.
            </p>
          </section>

          <section style={themeStyles.section}>
            <h2 style={themeStyles.sectionTitle}>
              <FaShieldAlt /> 1. Information We Collect
            </h2>
            <p style={themeStyles.paragraph}>
              We may collect the following types of information when you interact with our store:
            </p>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}><strong style={themeStyles.strong}>Personal Data:</strong> Name, email address, phone number, shipping/billing address, and payment details (processed securely by our payment partners).</li>
              <li style={themeStyles.listItem}><strong style={themeStyles.strong}>Account Data:</strong> If you create an account, we store your login credentials and order history.</li>
              <li style={themeStyles.listItem}><strong style={themeStyles.strong}>Communication Data:</strong> Messages you send us via our Contact Form, WhatsApp, or email.</li>
              <li style={themeStyles.listItem}><strong style={themeStyles.strong}>Technical Data:</strong> IP address, browser type, device information, and browsing behavior on our site.</li>
            </ul>
          </section>

          <section style={themeStyles.section}>
            <h2 style={themeStyles.sectionTitle}>
              <FaCookieBite /> 2. Cookies and Tracking Technologies
            </h2>
            <p style={themeStyles.paragraph}>
              We use cookies and similar tracking technologies to enhance your experience, analyze site traffic, and understand where our visitors are coming from. 
            </p>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}><strong style={themeStyles.strong}>Google Analytics & Google Tag Manager:</strong> We use these tools to measure website performance and user behavior. You can opt-out via your browser settings.</li>
              <li style={themeStyles.listItem}><strong style={themeStyles.strong}>Essential Cookies:</strong> Required to remember your shopping cart, wishlist, and theme preferences (Dark/Light mode).</li>
            </ul>
          </section>

          <section style={themeStyles.section}>
            <h2 style={themeStyles.sectionTitle}>
              <FaLock /> 3. How We Use Your Information
            </h2>
            <p style={themeStyles.paragraph}>Your information is used strictly to provide and improve our services:</p>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}>To process and fulfill your orders, including shipping and returns.</li>
              <li style={themeStyles.listItem}>To communicate with you regarding order updates, customer support, and promotions (if opted-in).</li>
              <li style={themeStyles.listItem}>To improve our website's functionality, product offerings, and user experience.</li>
              <li style={themeStyles.listItem}>To comply with legal obligations and prevent fraudulent transactions.</li>
            </ul>
          </section>

          <section style={themeStyles.section}>
            <h2 style={themeStyles.sectionTitle}>
              <FaShareAlt /> 4. Third-Party Sharing
            </h2>
            <p style={themeStyles.paragraph}>
              We <strong style={themeStyles.strong}>do not sell, rent, or trade</strong> your personal information to third parties. We only share necessary data with trusted partners to operate our business:
            </p>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}><strong style={themeStyles.strong}>Payment Gateways:</strong> To securely process transactions (e.g., Razorpay, Paytm).</li>
              <li style={themeStyles.listItem}><strong style={themeStyles.strong}>Shipping Partners:</strong> To deliver your products (e.g., India Post, Delhivery).</li>
              <li style={themeStyles.listItem}><strong style={themeStyles.strong}>Service Providers:</strong> Tools like Web3Forms (for contact submissions) and WhatsApp Business API (for customer support).</li>
            </ul>
          </section>

          <section style={themeStyles.section}>
            <h2 style={themeStyles.sectionTitle}>
              <FaUserCheck /> 5. Your Data Rights
            </h2>
            <p style={themeStyles.paragraph}>Under the DPDP Act, you have the right to:</p>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}>Access the personal data we hold about you.</li>
              <li style={themeStyles.listItem}>Request correction of inaccurate data.</li>
              <li style={themeStyles.listItem}>Request deletion of your data (subject to legal retention requirements).</li>
              <li style={themeStyles.listItem}>Withdraw consent for marketing communications at any time.</li>
            </ul>
            <p style={themeStyles.paragraph}>
              To exercise these rights, please contact us using the details below.
            </p>
          </section>

          <section style={themeStyles.section}>
            <h2 style={themeStyles.sectionTitle}>
              <FaShieldAlt /> 6. Data Security
            </h2>
            <p style={themeStyles.paragraph}>
              We implement industry-standard security measures to protect your data. Our website uses HTTPS encryption, and we restrict access to personal information to authorized personnel only. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <div style={themeStyles.contactBox}>
            <h3 style={{ ...themeStyles.sectionTitle, justifyContent: "center", marginBottom: "0.5rem" }}>
              <FaEnvelope /> Contact Us
            </h3>
            <p style={{ ...themeStyles.paragraph, margin: 0 }}>
              If you have any questions about this Privacy Policy or your data, please contact us at:
              <br />
              <strong style={themeStyles.strong}>Email:</strong> asudhabeauty@gmail.com
              <br />
              <strong style={themeStyles.strong}>Address:</strong> Shop No. 51/T-11/28, Pandariba Gali, Shahmaruf, Gorakhpur - 273001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;