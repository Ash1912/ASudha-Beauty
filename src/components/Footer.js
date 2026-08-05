import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  FaInstagram, FaFacebook, FaTwitter, FaPinterest, 
  FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaApple,
  FaGooglePay, FaAmazonPay, FaArrowUp, FaHeart, FaLeaf,
  FaShoppingBag, FaGem, FaTags, FaBlog, FaEye, FaTruck,
  FaShieldAlt, FaStar, FaUserCircle, FaLock, FaCreditCard,
  FaQuestionCircle, FaInfoCircle, FaGift, FaNewspaper
} from 'react-icons/fa';
import { SiRazorpay, SiPaytm, SiPhonepe } from 'react-icons/si';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterSubscribed(true);
      setEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getGridColumns = () => {
    if (windowWidth <= 480) return '1fr';
    if (windowWidth <= 768) return 'repeat(2, 1fr)';
    if (windowWidth <= 1024) return 'repeat(4, 1fr)';
    return 'repeat(5, 1fr)';
  };

  const getHeadingSize = () => {
    if (windowWidth <= 480) return '1rem';
    return '1.1rem';
  };

  const getTextSize = () => {
    if (windowWidth <= 480) return '0.85rem';
    return '0.9rem';
  };

  const additionalLinks = [
    { name: "New Arrivals", link: "/shop?sort=new", icon: <FaGem /> },
    { name: "Best Sellers", link: "/shop?sort=best-selling", icon: <FaStar /> },
    { name: "Offers", link: "/shop?sort=offers", icon: <FaGift /> },
    { name: "Sale", link: "/shop?sort=sale", icon: <FaTags /> },
    { name: "Gift Cards", link: "/gift-cards", icon: <FaGift /> },
  ];

  const helpLinks = [
    { name: "FAQs", link: "/faqs", icon: <FaQuestionCircle /> },
    { name: "Shipping Info", link: "/shipping", icon: <FaTruck /> },
    { name: "Returns & Exchanges", link: "/returns", icon: <FaTags /> },
    { name: "Track Order", link: "/track-order", icon: <FaEye /> },
    { name: "Size Guide", link: "/size-guide", icon: <FaInfoCircle /> },
    { name: "Terms & Conditions", link: "/terms", icon: <FaLock /> },
  ];

  const resourceLinks = [
    { name: "Blog", link: "/blog", icon: <FaBlog /> },
    { name: "Beauty Tips", link: "/blog?category=beauty-tips", icon: <FaNewspaper /> },
    { name: "Tutorials", link: "/blog?category=tutorials", icon: <FaEye /> },
    { name: "Customer Reviews", link: "/testimonials", icon: <FaStar /> },
    { name: "Affiliate Program", link: "/affiliate", icon: <FaHeart /> },
    { name: "Become a Partner", link: "/partners", icon: <FaUserCircle /> },
  ];

  const themeStyles = {
    footer: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      padding: windowWidth <= 480 ? '2rem 0 0.5rem 0' : '3rem 0 1rem 0',
      marginTop: '3rem',
      borderTop: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: windowWidth <= 480 ? '0 0.75rem' : '0 1rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(),
      gap: windowWidth <= 480 ? '1.5rem' : '2rem',
      marginBottom: '2rem'
    },
    section: {
      display: 'flex',
      flexDirection: 'column'
    },
    heading: {
      fontSize: getHeadingSize(),
      fontWeight: '700',
      marginBottom: '1rem',
      color: isDarkMode ? '#e88ca6' : '#333',
      position: 'relative',
      paddingBottom: '0.5rem',
      borderBottom: `2px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    text: {
      color: isDarkMode ? '#cccccc' : '#666',
      lineHeight: '1.6',
      fontSize: getTextSize(),
      marginBottom: '1rem'
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    listItem: {
      marginBottom: '0.5rem'
    },
    link: {
      color: isDarkMode ? '#cccccc' : '#666',
      textDecoration: 'none',
      fontSize: getTextSize(),
      lineHeight: '2',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      ':hover': {
        color: isDarkMode ? '#e88ca6' : '#e88ca6',
        transform: windowWidth <= 768 ? 'none' : 'translateX(5px)'
      }
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginTop: '0.5rem'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: isDarkMode ? '#cccccc' : '#666',
      fontSize: getTextSize()
    },
    contactIcon: {
      color: '#e88ca6',
      fontSize: windowWidth <= 480 ? '1rem' : '1.1rem',
      minWidth: '20px'
    },
    socialLinks: {
      display: 'flex',
      gap: windowWidth <= 480 ? '0.75rem' : '1rem',
      flexWrap: 'wrap',
      marginTop: '0.5rem'
    },
    socialLink: {
      color: isDarkMode ? '#cccccc' : '#666',
      fontSize: windowWidth <= 480 ? '1.2rem' : '1.3rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth <= 480 ? '32px' : '36px',
      height: windowWidth <= 480 ? '32px' : '36px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f0f0f0',
      textDecoration: 'none',
      ':hover': {
        color: '#ffffff',
        backgroundColor: '#e88ca6',
        transform: windowWidth <= 768 ? 'none' : 'translateY(-3px)'
      }
    },
    newsletterSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      padding: windowWidth <= 480 ? '1.5rem' : '2rem',
      borderRadius: '1rem',
      marginBottom: '2rem',
      textAlign: 'center'
    },
    newsletterTitle: {
      fontSize: windowWidth <= 480 ? '1.1rem' : '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#e88ca6' : '#333'
    },
    newsletterText: {
      fontSize: getTextSize(),
      color: isDarkMode ? '#cccccc' : '#666',
      marginBottom: '1rem'
    },
    newsletterForm: {
      display: 'flex',
      gap: '0.5rem',
      maxWidth: '500px',
      margin: '0 auto',
      flexDirection: windowWidth <= 480 ? 'column' : 'row'
    },
    newsletterInput: {
      flex: 1,
      padding: windowWidth <= 480 ? '0.75rem' : '0.6rem 1rem',
      backgroundColor: isDarkMode ? '#404040' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#555' : '#ddd'}`,
      borderRadius: windowWidth <= 480 ? '2rem' : '2rem',
      color: isDarkMode ? '#ffffff' : '#333',
      fontSize: getTextSize(),
      outline: 'none',
      ':focus': {
        borderColor: '#e88ca6'
      }
    },
    newsletterButton: {
      padding: windowWidth <= 480 ? '0.75rem' : '0.6rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: windowWidth <= 480 ? '2rem' : '2rem',
      fontSize: getTextSize(),
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: windowWidth <= 768 ? 'none' : 'translateY(-2px)'
      }
    },
    newsletterSuccess: {
      marginTop: '0.5rem',
      padding: '0.5rem',
      backgroundColor: '#4caf50',
      color: '#ffffff',
      borderRadius: '2rem',
      fontSize: getTextSize(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    paymentSection: {
      marginTop: '1.5rem',
      padding: '1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem',
      textAlign: 'center'
    },
    paymentTitle: {
      fontSize: windowWidth <= 480 ? '0.85rem' : '0.9rem',
      fontWeight: '600',
      marginBottom: '0.75rem',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    paymentIcons: {
      display: 'flex',
      gap: windowWidth <= 480 ? '0.5rem' : '0.75rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    paymentIcon: {
      fontSize: windowWidth <= 480 ? '1.2rem' : '1.5rem',
      color: isDarkMode ? '#666' : '#999',
      transition: 'color 0.3s ease',
      ':hover': {
        color: '#e88ca6'
      }
    },
    trustBadges: {
      display: 'flex',
      justifyContent: 'center',
      gap: windowWidth <= 480 ? '1rem' : '2rem',
      flexWrap: 'wrap',
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem'
    },
    trustBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: getTextSize(),
      color: isDarkMode ? '#cccccc' : '#666'
    },
    trustBadgeIcon: {
      color: '#e88ca6',
      fontSize: '1rem'
    },
    footerBottom: {
      display: 'flex',
      flexDirection: windowWidth <= 768 ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.5rem 0',
      borderTop: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
      marginTop: '2rem'
    },
    copyright: {
      color: isDarkMode ? '#999' : '#999',
      fontSize: windowWidth <= 480 ? '0.8rem' : '0.85rem',
      textAlign: windowWidth <= 768 ? 'center' : 'left'
    },
    footerLinks: {
      display: 'flex',
      gap: '1.5rem',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    footerLink: {
      color: isDarkMode ? '#999' : '#999',
      textDecoration: 'none',
      fontSize: windowWidth <= 480 ? '0.8rem' : '0.85rem',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      ':hover': {
        color: '#e88ca6'
      }
    },
    backToTop: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: windowWidth <= 480 ? '40px' : '50px',
      height: windowWidth <= 480 ? '40px' : '50px',
      borderRadius: '50%',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      display: showBackToTop ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none',
      fontSize: windowWidth <= 480 ? '1.2rem' : '1.5rem',
      boxShadow: '0 4px 12px rgba(232,140,166,0.3)',
      transition: 'all 0.3s ease',
      zIndex: 100,
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'scale(1.1)'
      }
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      padding: '0.2rem 0.5rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f0f0f0',
      borderRadius: '1rem',
      fontSize: '0.7rem',
      color: isDarkMode ? '#cccccc' : '#666',
      marginTop: '0.5rem',
      width: 'fit-content'
    },
    backlinksSection: {
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '0.75rem'
    },
    backlink: {
      color: isDarkMode ? '#999' : '#999',
      textDecoration: 'none',
      fontSize: '0.75rem',
      transition: 'color 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      ':hover': {
        color: '#e88ca6'
      }
    }
  };

  return (
    <footer style={themeStyles.footer}>
      <div style={themeStyles.container}>
        <div style={themeStyles.newsletterSection}>
          <h3 style={themeStyles.newsletterTitle}>Subscribe to Our Newsletter</h3>
          <p style={themeStyles.newsletterText}>
            Get 10% off your first order and receive beauty tips & exclusive offers
          </p>
          <form style={themeStyles.newsletterForm} onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              style={themeStyles.newsletterInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" style={themeStyles.newsletterButton}>
              Subscribe
            </button>
          </form>
          {newsletterSubscribed && (
            <div style={themeStyles.newsletterSuccess}>
              <FaHeart /> Thanks for subscribing!
            </div>
          )}
        </div>

        <div style={themeStyles.trustBadges}>
          <div style={themeStyles.trustBadge}>
            <FaTruck style={themeStyles.trustBadgeIcon} />
            <span>Free Shipping on ₹500+</span>
          </div>
          <div style={themeStyles.trustBadge}>
            <FaShieldAlt style={themeStyles.trustBadgeIcon} />
            <span>100% Authentic Products</span>
          </div>
          <div style={themeStyles.trustBadge}>
            <FaLeaf style={themeStyles.trustBadgeIcon} />
            <span>Cruelty Free</span>
          </div>
          <div style={themeStyles.trustBadge}>
            <FaHeart style={themeStyles.trustBadgeIcon} />
            <span>30-Day Easy Returns</span>
          </div>
          <div style={themeStyles.trustBadge}>
            <FaLock style={themeStyles.trustBadgeIcon} />
            <span>Secure Payments</span>
          </div>
        </div>

        <div style={themeStyles.grid}>
          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>ASudha Beauty</h3>
            <p style={themeStyles.text}>
              Clean beauty for everyone. Empowering you to feel confident, 
              express yourself, and embrace who you are.
            </p>
            <div style={themeStyles.badge}>
              <FaLeaf /> Cruelty Free & Vegan
            </div>
            <div style={themeStyles.badge}>
              <FaHeart /> Proudly Made in India
            </div>
            <div style={themeStyles.contactInfo}>
              <div style={themeStyles.contactItem}>
                <FaMapMarkerAlt style={themeStyles.contactIcon} />
                <span>Shop No. 51/T-11/28, Pandariba Gali, Shahmaruf, Gorakhpur - 273001</span>
              </div>
              <div style={themeStyles.contactItem}>
                <FaPhone style={themeStyles.contactIcon} />
                <span>+91-7518217726</span>
              </div>
              <div style={themeStyles.contactItem}>
                <FaEnvelope style={themeStyles.contactIcon} />
                <span>asudhabeauty@gmail.com</span>
              </div>
            </div>
          </div>

          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Shop</h3>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}>
                <Link to="/shop" style={themeStyles.link} onClick={handleLinkClick}>
                  <FaShoppingBag /> Shop All
                </Link>
              </li>
              {additionalLinks.map((link, index) => (
                <li key={index} style={themeStyles.listItem}>
                  <Link to={link.link} style={themeStyles.link} onClick={handleLinkClick}>
                    {link.icon} {link.name}
                  </Link>
                </li>
              ))}
              <li style={themeStyles.listItem}>
                <Link to="/shop?category=Skincare" style={themeStyles.link} onClick={handleLinkClick}>
                  <FaLeaf /> Skincare
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link to="/shop?category=Face" style={themeStyles.link} onClick={handleLinkClick}>
                  <FaTags /> Face Makeup
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link to="/shop?category=Lips" style={themeStyles.link} onClick={handleLinkClick}>
                  <FaTags /> Lipsticks
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link to="/shop?category=Eyes" style={themeStyles.link} onClick={handleLinkClick}>
                  <FaTags /> Eye Makeup
                </Link>
              </li>
            </ul>
          </div>

          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Quick Links</h3>
            <ul style={themeStyles.list}>
              <li style={themeStyles.listItem}>
                <Link to="/about" style={themeStyles.link} onClick={handleLinkClick}>
                  About Us
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link to="/blog" style={themeStyles.link} onClick={handleLinkClick}>
                  <FaBlog /> Blog
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link to="/contact" style={themeStyles.link} onClick={handleLinkClick}>
                  Contact Us
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link to="/wishlist" style={themeStyles.link} onClick={handleLinkClick}>
                  <FaHeart /> Wishlist
                </Link>
              </li>
              <li style={themeStyles.listItem}>
                <Link to="/track-order" style={themeStyles.link} onClick={handleLinkClick}>
                  <FaEye /> Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Help & Support</h3>
            <ul style={themeStyles.list}>
              {helpLinks.map((link, index) => (
                <li key={index} style={themeStyles.listItem}>
                  <Link to={link.link} style={themeStyles.link} onClick={handleLinkClick}>
                    {link.icon} {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div style={themeStyles.section}>
            <h3 style={themeStyles.heading}>Resources</h3>
            <ul style={themeStyles.list}>
              {resourceLinks.map((link, index) => (
                <li key={index} style={themeStyles.listItem}>
                  <Link to={link.link} style={themeStyles.link} onClick={handleLinkClick}>
                    {link.icon} {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 style={{...themeStyles.heading, marginTop: '1rem'}}>Connect With Us</h3>
            <div style={themeStyles.socialLinks}>
              <a 
                href="https://www.instagram.com/asudha_beauty?utm_source=qr&igsh=aGY4bHp3aGo2MzN6" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={themeStyles.socialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={themeStyles.socialLink}
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={themeStyles.socialLink}
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={themeStyles.socialLink}
                aria-label="Pinterest"
              >
                <FaPinterest />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={themeStyles.socialLink}
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>

            <div style={themeStyles.paymentSection}>
              <h4 style={themeStyles.paymentTitle}>Secure Payments</h4>
              <div style={themeStyles.paymentIcons}>
                <FaCcVisa style={themeStyles.paymentIcon} />
                <FaCcMastercard style={themeStyles.paymentIcon} />
                <FaCcPaypal style={themeStyles.paymentIcon} />
                <FaCcAmex style={themeStyles.paymentIcon} />
                <FaApple style={themeStyles.paymentIcon} />
                <FaGooglePay style={themeStyles.paymentIcon} />
                <FaAmazonPay style={themeStyles.paymentIcon} />
                <SiRazorpay style={themeStyles.paymentIcon} />
                <SiPaytm style={themeStyles.paymentIcon} />
                <SiPhonepe style={themeStyles.paymentIcon} />
              </div>
            </div>
          </div>
        </div>

        <div style={themeStyles.footerBottom}>
          <div style={themeStyles.copyright}>
            <p>&copy; {new Date().getFullYear()} ASudha Beauty. All rights reserved.</p>
          </div>
          <div style={themeStyles.footerLinks}>
            <Link to="/privacy" style={themeStyles.footerLink} onClick={handleLinkClick}>
              Privacy Policy
            </Link>
            <Link to="/terms" style={themeStyles.footerLink} onClick={handleLinkClick}>
              Terms of Service
            </Link>
            <Link to="/shipping" style={themeStyles.footerLink} onClick={handleLinkClick}>
              Shipping Policy
            </Link>
            <Link to="/returns" style={themeStyles.footerLink} onClick={handleLinkClick}>
              Returns
            </Link>
            <Link to="/sitemap" style={themeStyles.footerLink} onClick={handleLinkClick}>
              Sitemap
            </Link>
          </div>
        </div>

        <div style={themeStyles.backlinksSection}>
          <Link to="/shop" style={themeStyles.backlink} onClick={handleLinkClick}>
            <FaShoppingBag /> Shop
          </Link>
          <Link to="/about" style={themeStyles.backlink} onClick={handleLinkClick}>
            <FaInfoCircle /> About
          </Link>
          <Link to="/blog" style={themeStyles.backlink} onClick={handleLinkClick}>
            <FaBlog /> Blog
          </Link>
          <Link to="/contact" style={themeStyles.backlink} onClick={handleLinkClick}>
            <FaEnvelope /> Contact
          </Link>
          <Link to="/faqs" style={themeStyles.backlink} onClick={handleLinkClick}>
            <FaQuestionCircle /> FAQs
          </Link>
          <Link to="/privacy" style={themeStyles.backlink} onClick={handleLinkClick}>
            <FaLock /> Privacy
          </Link>
          <Link to="/terms" style={themeStyles.backlink} onClick={handleLinkClick}>
            <FaCreditCard /> Terms
          </Link>
          <Link to="/wishlist" style={themeStyles.backlink} onClick={handleLinkClick}>
            <FaHeart /> Wishlist
          </Link>
          <Link to="/track-order" style={themeStyles.backlink} onClick={handleLinkClick}>
            <FaTruck /> Track Order
          </Link>
          <a href="https://www.instagram.com/asudha_beauty?utm_source=qr&igsh=aGY4bHp3aGo2MzN6" target="_blank" rel="noopener noreferrer" style={themeStyles.backlink}>
            <FaInstagram /> Instagram
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={themeStyles.backlink}>
            <FaFacebook /> Facebook
          </a>
        </div>
      </div>

      <button 
        style={themeStyles.backToTop}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;