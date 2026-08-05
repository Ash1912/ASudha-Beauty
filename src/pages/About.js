import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaLeaf, FaHeart, FaRocket, FaShieldAlt, FaUsers, FaGem } from 'react-icons/fa';

const About = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const values = [
    {
      icon: <FaHeart />,
      title: "Authenticity",
      description: "Raw, unfiltered beauty. No unrealistic beauty standards, just you, enhanced.",
      color: "#FF6B6B"
    },
    {
      icon: <FaRocket />,
      title: "Empowerment",
      description: "Every product is designed to make you feel bold, confident, and unstoppable.",
      color: "#4ECDC4"
    },
    {
      icon: <FaShieldAlt />,
      title: "Integrity",
      description: "Transparency is at the core of everything we do, from ingredients to business ethics.",
      color: "#45B7D1"
    },
    {
      icon: <FaLeaf />,
      title: "Sustainability",
      description: "We prioritize eco-friendly practices and responsible sourcing for a better tomorrow.",
      color: "#96CEB4"
    },
    {
      icon: <FaUsers />,
      title: "Inclusivity",
      description: "We embrace all skin tones, types, and identities, ensuring no one is left out.",
      color: "#FFEAA7"
    },
    {
      icon: <FaGem />,
      title: "Innovation",
      description: "We're constantly pushing boundaries to create game-changing cosmetic products.",
      color: "#D4A5F0"
    }
  ];

  const stats = [
    { number: "50+", label: "Products", icon: "✨" },
    { number: "10k+", label: "Happy Customers", icon: "❤️" },
    { number: "100%", label: "Cruelty Free", icon: "🌱" },
    { number: "24/7", label: "Customer Support", icon: "💬" }
  ];

  const team = [
    { name: "Vikas Sachdeva", role: "Founder & CEO", image: "/assets/images/team/michael.jpg" },
    { name: "Ashi Sachdeva", role: "Head of Product Development", image: "/assets/images/team/sarah.jpg" },
    { name: "Priya Patel", role: "Creative Director", image: "/assets/images/team/priya.jpg" },
    { name: "David Kim", role: "Sustainability Officer", image: "/assets/images/team/david.jpg" }
  ];

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    },
    // Hero Section
    hero: {
      position: 'relative',
      background: isDarkMode 
        ? 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)'
        : 'linear-gradient(135deg, #fff5f7 0%, #ffe4e8 100%)',
      padding: windowWidth <= 768 ? '3rem 1rem' : '5rem 2rem',
      textAlign: 'center',
      overflow: 'hidden'
    },
    heroPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(232,140,166,0.1) 0%, transparent 50%)',
      pointerEvents: 'none'
    },
    heroContent: {
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    },
    heroTitle: {
      fontSize: windowWidth <= 480 ? '2rem' : windowWidth <= 768 ? '2.5rem' : '3.5rem',
      fontWeight: '800',
      marginBottom: '1.5rem',
      background: 'linear-gradient(135deg, #e88ca6, #f5b3c5)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroText: {
      fontSize: windowWidth <= 480 ? '1rem' : '1.2rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      lineHeight: '1.8',
      marginBottom: '2rem'
    },
    heroStats: {
      display: 'grid',
      gridTemplateColumns: `repeat(${windowWidth <= 480 ? 2 : 4}, 1fr)`,
      gap: '1.5rem',
      marginTop: '3rem'
    },
    statCard: {
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(10px)',
      padding: '1.5rem',
      borderRadius: '1rem',
      boxShadow: isDarkMode 
        ? '0 4px 20px rgba(0,0,0,0.3)' 
        : '0 4px 20px rgba(232,140,166,0.15)',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'translateY(-5px)'
      }
    },
    statNumber: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#e88ca6',
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },

    // Story Section
    storySection: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      display: 'grid',
      gridTemplateColumns: windowWidth <= 768 ? '1fr' : '1fr 1fr',
      gap: '4rem',
      alignItems: 'center'
    },
    storyContent: {
      paddingRight: windowWidth <= 768 ? '0' : '2rem'
    },
    storyTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      position: 'relative',
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: '-10px',
        left: '0',
        width: '80px',
        height: '4px',
        background: 'linear-gradient(90deg, #e88ca6, #f5b3c5)',
        borderRadius: '2px'
      }
    },
    storyText: {
      fontSize: '1.1rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      lineHeight: '1.8',
      marginBottom: '1.5rem'
    },
    storyHighlight: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#e88ca6',
      marginTop: '2rem',
      padding: '1rem',
      backgroundColor: isDarkMode ? 'rgba(232,140,166,0.1)' : 'rgba(232,140,166,0.05)',
      borderRadius: '1rem',
      borderLeft: '4px solid #e88ca6'
    },
    storyImageContainer: {
      position: 'relative',
      height: windowWidth <= 768 ? '300px' : '400px',
      borderRadius: '2rem',
      overflow: 'hidden',
      boxShadow: isDarkMode 
        ? '0 20px 40px rgba(0,0,0,0.4)' 
        : '0 20px 40px rgba(232,140,166,0.2)'
    },
    storyImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
      ':hover': {
        transform: 'scale(1.05)'
      }
    },

    // Mission Section
    missionSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff5f7',
      padding: '4rem 2rem'
    },
    missionContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: windowWidth <= 768 ? '1fr' : '1fr 1fr',
      gap: '4rem',
      alignItems: 'center'
    },
    missionCard: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      padding: '2rem',
      borderRadius: '2rem',
      boxShadow: isDarkMode 
        ? '0 10px 30px rgba(0,0,0,0.3)' 
        : '0 10px 30px rgba(232,140,166,0.1)'
    },
    missionTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: isDarkMode ? '#e88ca6' : '#333333'
    },
    missionText: {
      fontSize: '1.1rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      lineHeight: '1.8',
      marginBottom: '1.5rem'
    },
    missionIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      color: '#e88ca6'
    },

    // Values Section
    valuesSection: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      textAlign: 'center',
      fontWeight: '700',
      marginBottom: '3rem',
      color: isDarkMode ? '#e88ca6' : '#333333',
      position: 'relative',
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: '-15px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: '4px',
        background: 'linear-gradient(90deg, transparent, #e88ca6, #f5b3c5, #e88ca6, transparent)',
        borderRadius: '2px'
      }
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 480 ? '1fr' : windowWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: '2rem'
    },
    valueCard: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      padding: '2rem',
      borderRadius: '1.5rem',
      boxShadow: isDarkMode 
        ? '0 10px 30px rgba(0,0,0,0.2)' 
        : '0 10px 30px rgba(232,140,166,0.1)',
      transition: 'all 0.3s ease',
      border: `1px solid ${isDarkMode ? '#404040' : 'transparent'}`,
      ':hover': {
        transform: 'translateY(-10px)',
        boxShadow: isDarkMode 
          ? '0 20px 40px rgba(0,0,0,0.3)' 
          : '0 20px 40px rgba(232,140,166,0.15)',
        borderColor: '#e88ca6'
      }
    },
    valueIcon: {
      fontSize: '2.5rem',
      marginBottom: '1.5rem'
    },
    valueTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    valueDescription: {
      fontSize: '0.95rem',
      color: isDarkMode ? '#cccccc' : '#666666',
      lineHeight: '1.6'
    },

    // Team Section
    teamSection: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      padding: '4rem 2rem'
    },
    teamContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 480 ? '1fr' : windowWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '2rem',
      marginTop: '3rem'
    },
    teamCard: {
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderRadius: '1.5rem',
      boxShadow: isDarkMode 
        ? '0 10px 30px rgba(0,0,0,0.2)' 
        : '0 10px 30px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'scale(1.05)'
      }
    },
    teamImageContainer: {
      width: '120px',
      height: '120px',
      margin: '0 auto 1.5rem',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '3px solid #e88ca6'
    },
    teamImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    teamName: {
      fontSize: '1.2rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    teamRole: {
      fontSize: '0.95rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },

    // CTA Section
    ctaSection: {
      background: isDarkMode 
        ? 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)'
        : 'linear-gradient(135deg, #e88ca6 0%, #f5b3c5 100%)',
      padding: '4rem 2rem',
      textAlign: 'center',
      color: '#ffffff'
    },
    ctaTitle: {
      fontSize: windowWidth <= 480 ? '1.8rem' : '2.5rem',
      fontWeight: '700',
      marginBottom: '1rem'
    },
    ctaText: {
      fontSize: windowWidth <= 480 ? '1rem' : '1.2rem',
      marginBottom: '2rem',
      opacity: '0.9'
    },
    ctaButton: {
      display: 'inline-block',
      padding: '1rem 2.5rem',
      backgroundColor: '#ffffff',
      color: '#e88ca6',
      textDecoration: 'none',
      borderRadius: '2rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
      }
    }
  };

  return (
    <div style={themeStyles.container}>
      {/* Hero Section */}
      <section style={themeStyles.hero}>
        <div style={themeStyles.heroPattern} />
        <div style={themeStyles.heroContent}>
          <h1 style={themeStyles.heroTitle}>Who We Are</h1>
          <p style={themeStyles.heroText}>
            We are ASudha Beauty, and for us, beauty is more than just makeup—
            it's confidence, self-expression, and empowerment. Our journey began with 
            a passion for clean beauty and a bold mission to redefine industry standards.
          </p>
          
          {/* Stats */}
          <div style={themeStyles.heroStats}>
            {stats.map((stat, index) => (
              <div key={index} style={themeStyles.statCard}>
                <div style={themeStyles.statNumber}>{stat.number}</div>
                <div style={themeStyles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={themeStyles.storySection}>
        <div style={themeStyles.storyContent}>
          <h2 style={themeStyles.storyTitle}>Our Story</h2>
          <p style={themeStyles.storyText}>
            Founded in 2026, ASudha Beauty began with a simple idea: create beauty products 
            that actually work while being kind to your skin and the planet. What started as a 
            small batch of lipsticks in a kitchen has grown into a beloved brand with thousands 
            of happy customers worldwide.
          </p>
          <p style={themeStyles.storyText}>
            Today, we're proud to offer a wide range of high-performance cosmetics that celebrate 
            individuality and self-expression. Every product is carefully formulated with premium 
            ingredients and rigorous testing to ensure you look and feel your best.
          </p>
          <div style={themeStyles.storyHighlight}>
            "Beauty isn't one-size-fits-all—it's limitless, personal, and powerful, just like you."
          </div>
        </div>
        <div style={themeStyles.storyImageContainer}>
          <img 
            src="/assets/images/about/story.jpeg" 
            alt="Our Story" 
            style={themeStyles.storyImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/800x600/f8f8f8/e88ca6?text=ASudha+Beauty";
            }}
          />
        </div>
      </section>

      {/* Mission Section */}
      <section style={themeStyles.missionSection}>
        <div style={themeStyles.missionContainer}>
          <div style={themeStyles.missionCard}>
            <div style={themeStyles.missionIcon}>🎯</div>
            <h2 style={themeStyles.missionTitle}>Our Mission</h2>
            <p style={themeStyles.missionText}>
              Each of our formulas are crafted with care, blending nature and science 
              to create high-performance products that feel as good as they look.
            </p>
            <p style={themeStyles.missionText}>
              We're committed to pushing boundaries while maintaining the highest standards 
              of quality, safety, and sustainability.
            </p>
          </div>
          <div style={themeStyles.missionCard}>
            <div style={themeStyles.missionIcon}>👁️</div>
            <h2 style={themeStyles.missionTitle}>Our Vision</h2>
            <p style={themeStyles.missionText}>
              To become the world's most trusted and beloved cosmetics brand, known for 
              innovation, inclusivity, and uncompromising quality.
            </p>
            <p style={themeStyles.missionText}>
              We envision a future where everyone can express their unique beauty without 
              compromising on ethics or performance.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={themeStyles.valuesSection}>
        <h2 style={themeStyles.sectionTitle}>Our Core Values</h2>
        <div style={themeStyles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} style={themeStyles.valueCard}>
              <div style={{...themeStyles.valueIcon, color: value.color}}>
                {value.icon}
              </div>
              <h3 style={themeStyles.valueTitle}>{value.title}</h3>
              <p style={themeStyles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section style={themeStyles.teamSection}>
        <div style={themeStyles.teamContainer}>
          <h2 style={themeStyles.sectionTitle}>Meet Our Team</h2>
          <div style={themeStyles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} style={themeStyles.teamCard}>
                <div style={themeStyles.teamImageContainer}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={themeStyles.teamImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/200x200/f8f8f8/e88ca6?text=" + member.name.charAt(0);
                    }}
                  />
                </div>
                <h3 style={themeStyles.teamName}>{member.name}</h3>
                <p style={themeStyles.teamRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={themeStyles.ctaSection}>
        <h2 style={themeStyles.ctaTitle}>Ready to Find Your Perfect Look?</h2>
        <p style={themeStyles.ctaText}>
          Explore our collection of high-performance cosmetics and discover what makes ASudha special.
        </p>
        <a href="/shop" style={themeStyles.ctaButton}>
          Shop Now
        </a>
      </section>
    </div>
  );
};

export default About;