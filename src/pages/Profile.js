import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, FaShoppingBag, FaHeart, FaArrowLeft, FaEdit, 
  FaSave, FaTimes, FaCheckCircle 
} from 'react-icons/fa';
import SEO from '../components/SEO';

const Profile = () => {
  const { isDarkMode } = useTheme();
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // Removed unused 'error' state

  // Mock order history
  const orders = [
    { id: 'ORD123456', date: '2024-03-15', total: 1299, status: 'Delivered' },
    { id: 'ORD123789', date: '2024-03-10', total: 849, status: 'Shipped' }
  ];

  const handleUpdateProfile = async () => {
    const result = await updateProfile({ name: editedName });
    if (result.success) {
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    }
    // Removed error handling since we're not using it
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const themeStyles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh'
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '2rem',
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      borderRadius: '2rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      cursor: 'pointer',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },
    profileGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '2rem'
    },
    sidebar: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center'
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: '#e88ca6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      fontSize: '3rem',
      color: '#ffffff'
    },
    userName: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    userEmail: {
      color: isDarkMode ? '#cccccc' : '#666666',
      marginBottom: '1.5rem',
      fontSize: '0.95rem'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    statItem: {
      textAlign: 'center'
    },
    statValue: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#e88ca6'
    },
    statLabel: {
      fontSize: '0.8rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      textTransform: 'uppercase'
    },
    content: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '16px',
      padding: '2rem'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem 0',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      ':last-child': {
        borderBottom: 'none'
      }
    },
    infoLabel: {
      width: '120px',
      color: isDarkMode ? '#cccccc' : '#666666',
      fontSize: '0.95rem'
    },
    infoValue: {
      flex: 1,
      color: isDarkMode ? '#ffffff' : '#333333',
      fontWeight: '500'
    },
    editInput: {
      padding: '0.5rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: '8px',
      color: isDarkMode ? '#ffffff' : '#333333',
      fontSize: '0.95rem',
      width: '300px'
    },
    editActions: {
      display: 'flex',
      gap: '0.5rem',
      marginLeft: '1rem'
    },
    iconButton: {
      background: 'none',
      border: 'none',
      color: '#e88ca6',
      cursor: 'pointer',
      fontSize: '1.1rem',
      padding: '0.5rem',
      ':hover': {
        color: '#d47a94'
      }
    },
    editButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      }
    },
    logoutButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: 'transparent',
      color: isDarkMode ? '#ffffff' : '#333333',
      border: `1px solid ${isDarkMode ? '#404040' : '#ddd'}`,
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      marginTop: '1rem',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#ff4444',
        color: '#ffffff',
        borderColor: '#ff4444'
      }
    },
    successMessage: {
      backgroundColor: '#4caf50',
      color: '#ffffff',
      padding: '0.75rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    orderCard: {
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    orderInfo: {
      flex: 1,
      minWidth: '200px'
    },
    orderId: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.25rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    orderDate: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    orderTotal: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: '#e88ca6'
    },
    orderStatus: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: (status) => 
        status === 'Delivered' ? '#4caf50' : '#ff9800',
      color: '#ffffff',
      borderRadius: '2rem',
      fontSize: '0.8rem',
      fontWeight: '600',
      whiteSpace: 'nowrap'
    }
  };

  return (
    <>
      <SEO 
        title="My Profile"
        description="Manage your ASudha Beauty account, view orders, and update preferences."
        keywords="profile, account, orders, settings"
        url="/profile"
      />
      
      <div style={themeStyles.container}>
        <button 
          onClick={() => navigate(-1)} 
          style={themeStyles.backButton}
        >
          <FaArrowLeft /> Back
        </button>

        {updateSuccess && (
          <div style={themeStyles.successMessage}>
            <FaCheckCircle /> Profile updated successfully!
          </div>
        )}

        <div style={themeStyles.profileGrid}>
          {/* Sidebar */}
          <div style={themeStyles.sidebar}>
            <div style={themeStyles.avatar}>
              <FaUser />
            </div>
            <h2 style={themeStyles.userName}>{user?.name}</h2>
            <p style={themeStyles.userEmail}>{user?.email}</p>
            
            <div style={themeStyles.stats}>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statValue}>2</div>
                <div style={themeStyles.statLabel}>Orders</div>
              </div>
              <div style={themeStyles.statItem}>
                <div style={themeStyles.statValue}>3</div>
                <div style={themeStyles.statLabel}>Wishlist</div>
              </div>
            </div>

            <button 
              style={themeStyles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div style={themeStyles.content}>
            {/* Profile Information */}
            <div style={themeStyles.sectionTitle}>
              <FaUser /> Profile Information
            </div>
            
            <div style={themeStyles.infoRow}>
              <span style={themeStyles.infoLabel}>Name</span>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    style={themeStyles.editInput}
                  />
                  <div style={themeStyles.editActions}>
                    <button 
                      style={themeStyles.iconButton}
                      onClick={handleUpdateProfile}
                    >
                      <FaSave />
                    </button>
                    <button 
                      style={themeStyles.iconButton}
                      onClick={() => {
                        setIsEditing(false);
                        setEditedName(user?.name);
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span style={themeStyles.infoValue}>{user?.name}</span>
                  <button 
                    style={themeStyles.iconButton}
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit />
                  </button>
                </>
              )}
            </div>

            <div style={themeStyles.infoRow}>
              <span style={themeStyles.infoLabel}>Email</span>
              <span style={themeStyles.infoValue}>{user?.email}</span>
            </div>

            <div style={themeStyles.infoRow}>
              <span style={themeStyles.infoLabel}>Member Since</span>
              <span style={themeStyles.infoValue}>
                {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>

            {/* Order History */}
            <div style={{ ...themeStyles.sectionTitle, marginTop: '2rem' }}>
              <FaShoppingBag /> Recent Orders
            </div>

            {orders.map(order => (
              <div key={order.id} style={themeStyles.orderCard}>
                <div style={themeStyles.orderInfo}>
                  <div style={themeStyles.orderId}>{order.id}</div>
                  <div style={themeStyles.orderDate}>{order.date}</div>
                </div>
                <div style={themeStyles.orderTotal}>₹{order.total}</div>
                <span style={{
                  ...themeStyles.orderStatus,
                  backgroundColor: order.status === 'Delivered' ? '#4caf50' : '#ff9800'
                }}>
                  {order.status}
                </span>
              </div>
            ))}

            {/* Wishlist Link */}
            <div style={{ ...themeStyles.sectionTitle, marginTop: '2rem' }}>
              <FaHeart /> Saved Items
            </div>
            <p style={{ color: isDarkMode ? '#ccc' : '#666', marginBottom: '1rem' }}>
              View items you've added to your wishlist
            </p>
            <button 
              style={themeStyles.editButton}
              onClick={() => navigate('/wishlist')}
            >
              Go to Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;