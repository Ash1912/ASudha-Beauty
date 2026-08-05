import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, 
  FaArrowLeft, FaCheckCircle 
} from 'react-icons/fa';
import SEO from '../components/SEO';

const Signup = () => {
  const { isDarkMode } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');

    const result = await signup(formData.name, formData.email, formData.password);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
    signupBox: {
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
    success: {
      backgroundColor: '#4caf50',
      color: '#ffffff',
      padding: '1rem',
      borderRadius: '8px',
      fontSize: '1rem',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    signupButton: {
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
    passwordHint: {
      fontSize: '0.8rem',
      color: isDarkMode ? '#999' : '#999',
      marginTop: '0.25rem'
    }
  };

  return (
    <>
      <SEO 
        title="Create Account"
        description="Sign up for a ASudha Beauty account to enjoy exclusive offers, track orders, and save your favorites."
        keywords="signup, register, create account"
        url="/signup"
      />
      
      <div style={themeStyles.container}>
        <div style={themeStyles.signupBox}>
          <button 
            onClick={() => navigate(-1)} 
            style={themeStyles.backButton}
          >
            <FaArrowLeft /> Back
          </button>

          <div style={themeStyles.header}>
            <h1 style={themeStyles.title}>Create Account</h1>
            <p style={themeStyles.subtitle}>Join us to start shopping</p>
          </div>

          {success && (
            <div style={themeStyles.success}>
              <FaCheckCircle /> Account created successfully! Redirecting...
            </div>
          )}

          {error && (
            <div style={themeStyles.error}>
              {error}
            </div>
          )}

          <form style={themeStyles.form} onSubmit={handleSubmit}>
            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label}>Full Name</label>
              <div style={themeStyles.inputWrapper}>
                <FaUser style={themeStyles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  style={themeStyles.input}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a password"
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
              <p style={themeStyles.passwordHint}>Must be at least 6 characters</p>
            </div>

            <div style={themeStyles.inputGroup}>
              <label style={themeStyles.label}>Confirm Password</label>
              <div style={themeStyles.inputWrapper}>
                <FaLock style={themeStyles.inputIcon} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  style={themeStyles.input}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  style={themeStyles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              style={themeStyles.signupButton}
              disabled={loading || success}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={themeStyles.footer}>
            Already have an account?{' '}
            <Link to="/login" style={themeStyles.link}>
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;