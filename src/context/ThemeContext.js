import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Brand colors for consistent theming
const brandColors = {
  light: {
    background: "#fcf8f5",          // Warm Cream
    surface: "#ffffff",             // Pure White
    text: "#3e2723",                // Deep Brown
    textSecondary: "#6d4c41",       // Muted Brown
    border: "rgba(62, 39, 35, 0.06)",
    shadow: "rgba(62, 39, 35, 0.04)",
    primary: "#f5346b",             // Brand Pink
    gold: "#d4af37",                // Gold
    bronze: "#c77d42",              // Bronze
    cream: "#fcf8f5",
    green: "#4caf50",
  },
  dark: {
    background: "#0f0f0f",          // Modern Pure Black
    surface: "#1a1a1a",             // Dark Slate Card
    hover: "#242424",               // Slightly lighter hover
    text: "#f5f5f5",                // Near White
    textSecondary: "#a0a0a0",       // Muted Light Gray
    border: "rgba(255, 255, 255, 0.08)",
    shadow: "rgba(0, 0, 0, 0.5)",
    primary: "#f5346b",             // Brand Pink (Stays the same)
    gold: "#f7d794",                // Gold
    bronze: "#c77d42",              // Bronze
    cream: "#1a1a1a",
    green: "#4caf50",
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("asudha_theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return true;
    }

    return false;
  });

  // Get current theme colors
  const getThemeColors = () => {
    return isDarkMode ? brandColors.dark : brandColors.light;
  };

  // Update DOM whenever theme changes
  useEffect(() => {
    localStorage.setItem("asudha_theme", isDarkMode ? "dark" : "light");

    const body = document.body;
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    if (isDarkMode) {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
      
      // NEW: Pure Black/Dark Slate colors
      body.style.backgroundColor = "#0f0f0f";
      body.style.color = "#f5f5f5";
      
      if (metaTheme) {
        metaTheme.setAttribute("content", "#0f0f0f");
      }
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
      
      // Light Theme
      body.style.backgroundColor = "#fcf8f5";
      body.style.color = "#3e2723";
      
      if (metaTheme) {
        metaTheme.setAttribute("content", "#fcf8f5");
      }
    }

    // Add smooth transition for theme changes
    body.style.transition = "background-color 0.3s ease, color 0.3s ease";
  }, [isDarkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e) => {
      if (!localStorage.getItem("asudha_theme")) {
        setIsDarkMode(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemChange);
    } else {
      mediaQuery.addListener(handleSystemChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSystemChange);
      } else {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const getOppositeTheme = () => (isDarkMode ? "light" : "dark");

  const value = {
    isDarkMode,
    toggleTheme,
    getOppositeTheme,
    getThemeColors,
    colors: getThemeColors(),
    brandColors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};