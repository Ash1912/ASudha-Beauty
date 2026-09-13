import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authMessage, setAuthMessage] = useState(null);

  // Check for saved user on initial load
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem("asudha_user");
        const savedUsers = localStorage.getItem("asudha_users");

        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);

          if (savedUsers) {
            const users = JSON.parse(savedUsers);
            const exists = users.some(
              (u) => u.email.toLowerCase() === parsedUser.email.toLowerCase(),
            );

            if (exists) {
              setUser(parsedUser);
              setAuthMessage({
                type: "success",
                text: `Welcome back, ${parsedUser.name}! 🌿`,
              });
            } else {
              localStorage.removeItem("asudha_user");
            }
          } else {
            localStorage.removeItem("asudha_user");
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        localStorage.removeItem("asudha_user");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (authMessage) {
      const timer = setTimeout(() => {
        setAuthMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authMessage]);

  const clearError = () => setError(null);
  const clearMessage = () => setAuthMessage(null);

  // Signup function
  const signup = async (name, email, password, phone = "", address = "") => {
    try {
      clearError();

      const normalizedEmail = email.toLowerCase().trim();

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("asudha_users") || "[]");
      if (existingUsers.some((u) => u.email.toLowerCase() === normalizedEmail)) {
        throw new Error("An account with this email already exists. Please login instead.");
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: normalizedEmail,
        password: password,
        phone: phone.trim(),
        address: address.trim(),
        avatar: null,
        preferences: {
          skinType: "",
          allergies: [],
          favoriteProducts: [],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        orders: [],
        wishlist: [],
      };

      existingUsers.push(newUser);
      localStorage.setItem("asudha_users", JSON.stringify(existingUsers));

      const { password: _, ...safeUser } = newUser;
      setUser(safeUser);
      localStorage.setItem("asudha_user", JSON.stringify(safeUser));

      setAuthMessage({
        type: "success",
        text: `✨ Welcome to ASudha Beauty, ${safeUser.name}! Start your natural beauty journey.`,
      });

      return { success: true, message: "Account created successfully!" };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      clearError();

      const normalizedEmail = email.toLowerCase().trim();
      const users = JSON.parse(localStorage.getItem("asudha_users") || "[]");

      const foundUser = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail && u.password === password,
      );

      if (!foundUser) {
        throw new Error("Invalid email or password. Please try again.");
      }

      const { password: _, ...safeUser } = foundUser;
      setUser(safeUser);
      localStorage.setItem("asudha_user", JSON.stringify(safeUser));

      setAuthMessage({
        type: "success",
        text: `🌿 Welcome back, ${safeUser.name}!`,
      });

      return { success: true, message: "Welcome back!" };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("asudha_user");
    clearError();
    setAuthMessage({
      type: "info",
      text: "👋 You have been logged out. See you soon!",
    });
  };

  // Update profile
  const updateProfile = async (updates) => {
    try {
      clearError();

      if (!user) {
        throw new Error("You must be logged in to update your profile.");
      }

      const users = JSON.parse(localStorage.getItem("asudha_users") || "[]");
      const userIndex = users.findIndex(
        (u) => u.email.toLowerCase() === user.email.toLowerCase(),
      );

      if (userIndex === -1) {
        throw new Error("User record not found. Please login again.");
      }

      const updatedUserData = {
        ...users[userIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      if (!updatedUserData.password) {
        updatedUserData.password = users[userIndex].password;
      }

      users[userIndex] = updatedUserData;
      localStorage.setItem("asudha_users", JSON.stringify(users));

      const { password: _, ...safeUser } = updatedUserData;
      setUser(safeUser);
      localStorage.setItem("asudha_user", JSON.stringify(safeUser));

      setAuthMessage({
        type: "success",
        text: "✅ Profile updated successfully!",
      });

      return { success: true, message: "Profile updated successfully!" };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Add to wishlist
  const addToWishlist = async (productId) => {
    if (!user) return { success: false, error: "Please login first" };
    
    try {
      const users = JSON.parse(localStorage.getItem("asudha_users") || "[]");
      const userIndex = users.findIndex(
        (u) => u.email.toLowerCase() === user.email.toLowerCase(),
      );

      if (userIndex === -1) return { success: false, error: "User not found" };

      if (!users[userIndex].wishlist) {
        users[userIndex].wishlist = [];
      }

      if (!users[userIndex].wishlist.includes(productId)) {
        users[userIndex].wishlist.push(productId);
        users[userIndex].updatedAt = new Date().toISOString();
        localStorage.setItem("asudha_users", JSON.stringify(users));
        
        const { password: _, ...safeUser } = users[userIndex];
        setUser(safeUser);
        localStorage.setItem("asudha_user", JSON.stringify(safeUser));
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    if (!user) return { success: false, error: "Please login first" };
    
    try {
      const users = JSON.parse(localStorage.getItem("asudha_users") || "[]");
      const userIndex = users.findIndex(
        (u) => u.email.toLowerCase() === user.email.toLowerCase(),
      );

      if (userIndex === -1) return { success: false, error: "User not found" };

      if (users[userIndex].wishlist) {
        users[userIndex].wishlist = users[userIndex].wishlist.filter(
          (id) => id !== productId
        );
        users[userIndex].updatedAt = new Date().toISOString();
        localStorage.setItem("asudha_users", JSON.stringify(users));
        
        const { password: _, ...safeUser } = users[userIndex];
        setUser(safeUser);
        localStorage.setItem("asudha_user", JSON.stringify(safeUser));
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    authMessage,
    clearError,
    clearMessage,
    signup,
    login,
    logout,
    updateProfile,
    addToWishlist,
    removeFromWishlist,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};