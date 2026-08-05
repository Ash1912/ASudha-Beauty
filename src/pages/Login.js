import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import SEO from '../components/SEO';

const Login = () => {
  const { isDarkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const themeStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f8f8',
      padding: '1rem'
    },
    loginBox: {
      maxWidth: '450px',
      width: '100%',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: isDarkMode 
        ? '0 10px 40px rgba(0,0,0,0.3)' 
        : '0 10px 40px rgba(232,140,166,0.1)'
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#404040' : '#f0f0f0',
      border: 'none',
      borderRadius: '2rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff'
      }
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#e88ca6' : '#333333'
    },
    subtitle: {
      color: isDarkMode ? '#cccccc' : '#666666',
      fontSize: '0.95rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.95rem',
      fontWeight: '500',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    inputIcon: {
      position: 'absolute',
      left: '1rem',
      color: isDarkMode ? '#999' : '#666',
      fontSize: '1rem'
    },
    input: {
      width: '100%',
      padding: '0.875rem 1rem 0.875rem 2.5rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '12px',
      fontSize: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      transition: 'all 0.3s ease',
      outline: 'none',
      ':focus': {
        borderColor: '#e88ca6',
        boxShadow: '0 0 0 3px rgba(232,140,166,0.2)'
      }
    },
    passwordToggle: {
      position: 'absolute',
      right: '1rem',
      background: 'none',
      border: 'none',
      color: isDarkMode ? '#999' : '#666',
      cursor: 'pointer',
      fontSize: '1.1rem',
      ':hover': {
        color: '#e88ca6'
      }
    },
    error: {
      backgroundColor: '#ff4444',
      color: '#ffffff',
      padding: '0.75rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      textAlign: 'center'
    },
    loginButton: {
      padding: '1rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      },
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        transform: 'none'
      }
    },
    footer: {
      marginTop: '2rem',
      textAlign: 'center',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    link: {
      color: '#e88ca6',
      textDecoration: 'none',
      fontWeight: '600',
      ':hover': {
        textDecoration: 'underline'
      }
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      margin: '1.5rem 0',
      color: isDarkMode ? '#666' : '#999'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0'
    }
  };

  return (
    <>
      <SEO 
        title="Login"
        description="Login to your ASudha Beauty account to manage orders, wishlist, and more."
        keywords="login, sign in, account access"
        url="/login"
      />
      
      <div style={themeStyles.container}>
        <div style={themeStyles.loginBox}>
          <button 
            onClick={() => navigate(-1)} 
            style={themeStyles.backButton}
          >
            <FaArrowLeft /> Back
          </button>

          <div style={themeStyles.header}>
            <h1 style={themeStyles.title}>Welcome Back</h1>
            <p style={themeStyles.subtitle}>Login to your account to continue</p>
          </div>

          {error && (
            <div style={themeStyles.error}>
              {error}
            </div>
          )}

          <form style={themeStyles.form} onSubmit={handleSubmit}>
            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label}>Email Address</label>
              <div style={themeStyles.inputWrapper}>
                <FaEnvelope style={themeStyles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  style={themeStyles.input}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label}>Password</label>
              <div style={themeStyles.inputWrapper}>
                <FaLock style={themeStyles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  style={themeStyles.input}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  style={themeStyles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              style={themeStyles.loginButton}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={themeStyles.footer}>
            Don't have an account?{' '}
            <Link to="/signup" style={themeStyles.link}>
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;