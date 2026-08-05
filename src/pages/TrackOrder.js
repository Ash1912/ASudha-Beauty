// src/pages/TrackOrder.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  FaBox, FaTruck, FaCheckCircle, FaBoxOpen,
  FaClock, FaMapMarkerAlt, FaCalendarAlt
} from 'react-icons/fa';

const TrackOrder = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderId || !email) {
      setError('Please enter both Order ID and Email');
      return;
    }

    setIsTracking(true);
    setError('');

    setTimeout(() => {
      const mockOrder = {
        id: orderId,
        date: 'March 15, 2024',
        status: 'shipped',
        statusCode: 2,
        total: '₹1,299',
        items: [
          { name: 'Matte Lipstick - Ruby Red', quantity: 1, price: '₹399' },
          { name: 'Kajal - Black', quantity: 2, price: '₹199 each' }
        ],
        tracking: {
          current: 'In Transit',
          estimatedDelivery: 'March 22, 2024',
          carrier: 'Delhivery',
          trackingNumber: 'DLV123456789',
          history: [
            { date: 'March 16, 2024', status: 'Order Confirmed', location: 'Online' },
            { date: 'March 17, 2024', status: 'Processing', location: 'Warehouse' },
            { date: 'March 18, 2024', status: 'Shipped', location: 'Delhi Hub' },
            { date: 'March 19, 2024', status: 'In Transit', location: 'Mumbai' }
          ]
        },
        shippingAddress: {
          name: 'John Doe',
          address: '123 Main Street, Andheri East',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          phone: '+91-9876543210'
        }
      };
      setOrderData(mockOrder);
      setIsTracking(false);
    }, 1500);
  };

  const getStatusSteps = () => {
    const steps = [
      { label: 'Order Placed', icon: <FaCheckCircle />, completed: orderData?.statusCode >= 0 },
      { label: 'Confirmed', icon: <FaCheckCircle />, completed: orderData?.statusCode >= 1 },
      { label: 'Processing', icon: <FaBoxOpen />, completed: orderData?.statusCode >= 1 },
      { label: 'Shipped', icon: <FaTruck />, completed: orderData?.statusCode >= 2 },
      { label: 'Out for Delivery', icon: <FaTruck />, completed: orderData?.statusCode >= 3 },
      { label: 'Delivered', icon: <FaBox />, completed: orderData?.statusCode >= 4 }
    ];
    return steps;
  };

  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        containerPadding: '1rem',
        fontSizeHeading: '1.5rem',
        formPadding: '1rem'
      };
    } else if (windowWidth <= 768) {
      return {
        containerPadding: '1.5rem',
        fontSizeHeading: '2rem',
        formPadding: '1.5rem'
      };
    } else {
      return {
        containerPadding: '2rem',
        fontSizeHeading: '2.5rem',
        formPadding: '2rem'
      };
    }
  };

  const responsive = getResponsiveStyles();

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      transition: 'all 0.3s ease',
      padding: '2rem 0'
    },
    header: {
      textAlign: 'center',
      padding: `0 ${responsive.containerPadding} 2rem`,
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      fontSize: responsive.fontSizeHeading,
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#e88ca6' : '#333'
    },
    subtitle: {
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      color: isDarkMode ? '#cccccc' : '#666',
      maxWidth: '600px',
      margin: '0 auto'
    },
    formContainer: {
      maxWidth: '600px',
      margin: '2rem auto',
      padding: responsive.formPadding,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: isDarkMode ? '#ffffff' : '#333'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333',
      fontSize: '0.9rem'
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    errorMessage: {
      marginTop: '1rem',
      padding: '0.75rem',
      backgroundColor: '#f44336',
      color: '#ffffff',
      borderRadius: '0.5rem',
      textAlign: 'center'
    },
    loading: {
      textAlign: 'center',
      padding: '2rem',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    orderDetails: {
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: `0 ${responsive.containerPadding}`
    },
    orderCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`
    },
    orderId: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#e88ca6'
    },
    orderDate: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#999' : '#999'
    },
    statusTimeline: {
      margin: '1.5rem 0'
    },
    stepsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      position: 'relative'
    },
    step: {
      flex: 1,
      textAlign: 'center',
      position: 'relative',
      padding: '0 0.5rem'
    },
    stepIcon: {
      fontSize: windowWidth <= 480 ? '1.2rem' : '1.5rem',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#666' : '#ccc'
    },
    stepIconCompleted: {
      color: '#4caf50'
    },
    stepLabel: {
      fontSize: windowWidth <= 480 ? '0.7rem' : '0.85rem',
      color: isDarkMode ? '#999' : '#999'
    },
    stepLabelCompleted: {
      color: '#4caf50'
    },
    trackingInfo: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
      gap: '1rem',
      marginTop: '1rem'
    },
    infoBox: {
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8',
      padding: '1rem',
      borderRadius: '0.5rem'
    },
    infoTitle: {
      fontSize: '0.85rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#e88ca6' : '#e88ca6'
    },
    infoContent: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    historyItem: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`
    },
    historyIcon: {
      fontSize: '1.2rem',
      color: '#e88ca6'
    },
    historyContent: {
      flex: 1
    },
    historyStatus: {
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    historyDate: {
      fontSize: '0.75rem',
      color: isDarkMode ? '#999' : '#999'
    },
    historyLocation: {
      fontSize: '0.8rem',
      color: isDarkMode ? '#999' : '#999'
    }
  };

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>Track Your Order</h1>
        <p style={themeStyles.subtitle}>
          Enter your order ID and email address to track your package
        </p>
      </div>

      {!orderData ? (
        <div style={themeStyles.formContainer}>
          <form onSubmit={handleTrackOrder}>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Order ID *</label>
              <input
                type="text"
                placeholder="e.g., NC-12345"
                style={themeStyles.input}
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <div style={themeStyles.formGroup}>
              <label style={themeStyles.label}>Email Address *</label>
              <input
                type="email"
                placeholder="your@email.com"
                style={themeStyles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" style={themeStyles.button} disabled={isTracking}>
              {isTracking ? 'Tracking...' : 'Track Order'}
            </button>
            {error && <div style={themeStyles.errorMessage}>{error}</div>}
          </form>
        </div>
      ) : isTracking ? (
        <div style={themeStyles.loading}>Loading order details...</div>
      ) : (
        <div style={themeStyles.orderDetails}>
          <div style={themeStyles.orderCard}>
            <div style={themeStyles.orderHeader}>
              <div>
                <div style={themeStyles.orderId}>Order #{orderData.id}</div>
                <div style={themeStyles.orderDate}>Placed on {orderData.date}</div>
              </div>
              <div style={themeStyles.orderId}>Total: {orderData.total}</div>
            </div>

            <div style={themeStyles.statusTimeline}>
              <div style={themeStyles.stepsContainer}>
                {getStatusSteps().map((step, idx) => (
                  <div key={idx} style={themeStyles.step}>
                    <div style={{
                      ...themeStyles.stepIcon,
                      ...(step.completed ? themeStyles.stepIconCompleted : {})
                    }}>
                      {step.icon}
                    </div>
                    <div style={{
                      ...themeStyles.stepLabel,
                      ...(step.completed ? themeStyles.stepLabelCompleted : {})
                    }}>
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={themeStyles.trackingInfo}>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>Current Status</div>
                <div style={themeStyles.infoContent}>{orderData.tracking.current}</div>
              </div>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>Estimated Delivery</div>
                <div style={themeStyles.infoContent}>
                  <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                  {orderData.tracking.estimatedDelivery}
                </div>
              </div>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>Carrier</div>
                <div style={themeStyles.infoContent}>{orderData.tracking.carrier}</div>
              </div>
              <div style={themeStyles.infoBox}>
                <div style={themeStyles.infoTitle}>Tracking Number</div>
                <div style={themeStyles.infoContent}>{orderData.tracking.trackingNumber}</div>
              </div>
            </div>
          </div>

          <div style={themeStyles.orderCard}>
            <h3 style={themeStyles.infoTitle}>Order Items</h3>
            {orderData.items.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.name} x {item.quantity}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>

          <div style={themeStyles.orderCard}>
            <h3 style={themeStyles.infoTitle}>Shipping Address</h3>
            <div style={themeStyles.infoContent}>
              <div>{orderData.shippingAddress.name}</div>
              <div>{orderData.shippingAddress.address}</div>
              <div>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} - {orderData.shippingAddress.pincode}</div>
              <div>{orderData.shippingAddress.phone}</div>
            </div>
          </div>

          <div style={themeStyles.orderCard}>
            <h3 style={themeStyles.infoTitle}>Tracking History</h3>
            {orderData.tracking.history.map((event, idx) => (
              <div key={idx} style={themeStyles.historyItem}>
                <div style={themeStyles.historyIcon}>
                  <FaClock />
                </div>
                <div style={themeStyles.historyContent}>
                  <div style={themeStyles.historyStatus}>{event.status}</div>
                  <div style={themeStyles.historyDate}>{event.date}</div>
                  <div style={themeStyles.historyLocation}>
                    <FaMapMarkerAlt style={{ marginRight: '0.25rem' }} />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/contact" style={themeStyles.button}>
              Need Help? Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;