// src/pages/SizeGuide.js
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
FaEye, FaUser,
  FaInfoCircle, FaDownload, FaPaintBrush, FaMagic
} from 'react-icons/fa';

const SizeGuide = () => {
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState('lipstick');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'lipstick', label: 'Lipstick', icon: <FaMagic /> },
    { id: 'foundation', label: 'Foundation', icon: <FaUser /> },
    { id: 'eyeliner', label: 'Eyeliner', icon: <FaEye /> },
    { id: 'nailpolish', label: 'Nail Polish', icon: <FaPaintBrush /> }
  ];

  const sizeData = {
    lipstick: {
      title: "Lipstick Size Guide",
      description: "Choose the perfect lipstick shade and finish for your look.",
      sizes: [
        { name: "Matte", description: "Long-lasting, non-transfer formula", finish: "Matte finish", coverage: "Full coverage" },
        { name: "Cream", description: "Hydrating, smooth application", finish: "Satin finish", coverage: "Medium coverage" },
        { name: "Gloss", description: "Shiny, plumping effect", finish: "Glossy finish", coverage: "Sheer coverage" },
        { name: "Liquid", description: "Intense color, long wear", finish: "Matte or Satin", coverage: "Full coverage" }
      ],
      tips: [
        "For a natural look, choose shades close to your natural lip color",
        "Matte lipsticks last longer but can be drying - prep with lip balm",
        "Liquid lipsticks offer the most longevity and transfer-resistance",
        "Apply lip liner for better definition and to prevent feathering"
      ]
    },
    foundation: {
      title: "Foundation Shade Guide",
      description: "Find your perfect foundation match for a flawless complexion.",
      shades: [
        { range: "Fair", skinTone: "Very light skin", undertone: "Cool/Pink", shades: "Ivory, Porcelain" },
        { range: "Light", skinTone: "Light skin", undertone: "Neutral/Warm", shades: "Beige, Natural" },
        { range: "Medium", skinTone: "Olive/Tan skin", undertone: "Warm/Golden", shades: "Sand, Honey" },
        { range: "Tan", skinTone: "Medium tan skin", undertone: "Golden/Peach", shades: "Caramel, Tan" },
        { range: "Deep", skinTone: "Dark skin", undertone: "Red/Neutral", shades: "Mocha, Espresso" }
      ],
      tips: [
        "Test foundation on your jawline for the most accurate match",
        "Consider your undertone - cool (pink), warm (yellow), or neutral",
        "Foundation can oxidize over time - wait a few minutes to see true color",
        "Use concealer one shade lighter for under-eye brightening"
      ]
    },
    eyeliner: {
      title: "Eyeliner Guide",
      description: "Choose the right eyeliner for your desired look.",
      types: [
        { name: "Liquid", description: "Sharp, precise lines", bestFor: "Winged liner, dramatic looks", skillLevel: "Advanced" },
        { name: "Kajal", description: "Soft, smudgeable", bestFor: "Waterline, smoky eyes", skillLevel: "Beginner" },
        { name: "Gel", description: "Creamy, long-wearing", bestFor: "Precise lines, tightlining", skillLevel: "Intermediate" },
        { name: "Pencil", description: "Easy to use", bestFor: "Everyday wear, waterline", skillLevel: "Beginner" }
      ],
      tips: [
        "Use tape for the perfect winged liner",
        "Set pencil eyeliner with matching eyeshadow for longer wear",
        "Apply kajal to waterline for wide-awake eyes",
        "Use a thin brush for precise gel liner application"
      ]
    },
    nailpolish: {
      title: "Nail Polish Guide",
      description: "Choose the perfect nail polish formula for your style.",
      finishes: [
        { name: "Cream", description: "Solid, opaque finish", durability: "7-10 days", bestFor: "Everyday wear" },
        { name: "Shimmer", description: "Subtle sparkle", durability: "5-7 days", bestFor: "Special occasions" },
        { name: "Glitter", description: "Full glitter coverage", durability: "10-14 days", bestFor: "Party looks" },
        { name: "Matte", description: "Velvet finish", durability: "5-7 days", bestFor: "Modern, chic looks" }
      ],
      tips: [
        "Apply base coat to prevent staining and extend wear",
        "Apply thin coats rather than one thick coat",
        "Cap the free edge to prevent chipping",
        "Use top coat for added shine and durability"
      ]
    }
  };

  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        containerPadding: '1rem',
        fontSizeHeading: '1.5rem',
        tabPadding: '0.5rem 1rem',
        tabFontSize: '0.8rem',
        tableFontSize: '0.75rem'
      };
    } else if (windowWidth <= 768) {
      return {
        containerPadding: '1.5rem',
        fontSizeHeading: '2rem',
        tabPadding: '0.75rem 1.5rem',
        tabFontSize: '0.9rem',
        tableFontSize: '0.85rem'
      };
    } else {
      return {
        containerPadding: '2rem',
        fontSizeHeading: '2.5rem',
        tabPadding: '1rem 2rem',
        tabFontSize: '1rem',
        tableFontSize: '0.9rem'
      };
    }
  };

  const responsive = getResponsiveStyles();
  const currentData = sizeData[activeTab];

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
    tabsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      justifyContent: 'center',
      marginBottom: '2rem',
      maxWidth: '1200px',
      margin: '0 auto 2rem',
      padding: `0 ${responsive.containerPadding}`
    },
    tab: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: responsive.tabPadding,
      borderRadius: '2rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      color: isDarkMode ? '#cccccc' : '#666',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: responsive.tabFontSize,
      border: 'none'
    },
    activeTab: {
      backgroundColor: '#e88ca6',
      color: '#ffffff'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: `0 ${responsive.containerPadding}`
    },
    card: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '1rem',
      padding: '2rem',
      border: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#e88ca6'
    },
    description: {
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      color: isDarkMode ? '#cccccc' : '#666',
      marginBottom: '1.5rem',
      lineHeight: '1.6'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '1.5rem',
      fontSize: responsive.tableFontSize
    },
    th: {
      textAlign: 'left',
      padding: '0.75rem',
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8',
      color: isDarkMode ? '#ffffff' : '#333',
      fontWeight: '600',
      borderBottom: `2px solid ${isDarkMode ? '#555' : '#ddd'}`
    },
    td: {
      padding: '0.75rem',
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#f0f0f0'}`,
      color: isDarkMode ? '#cccccc' : '#666'
    },
    tipsSection: {
      backgroundColor: isDarkMode ? '#404040' : '#f8f8f8',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      marginTop: '1rem'
    },
    tipsTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    tipItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      fontSize: windowWidth <= 480 ? '0.85rem' : '0.9rem',
      color: isDarkMode ? '#cccccc' : '#666'
    },
    downloadButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '2rem',
      fontWeight: '600',
      marginTop: '1rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none'
    }
  };

  return (
    <div style={themeStyles.container}>
      <div style={themeStyles.header}>
        <h1 style={themeStyles.title}>Size Guide</h1>
        <p style={themeStyles.subtitle}>
          Find the perfect fit for all your beauty needs. Use our comprehensive guide 
          to choose the right products for your style.
        </p>
      </div>

      <div style={themeStyles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            style={{
              ...themeStyles.tab,
              ...(activeTab === tab.id ? themeStyles.activeTab : {})
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div style={themeStyles.content}>
        <div style={themeStyles.card}>
          <h2 style={themeStyles.sectionTitle}>{currentData.title}</h2>
          <p style={themeStyles.description}>{currentData.description}</p>

          {activeTab === 'lipstick' && (
            <table style={themeStyles.table}>
              <thead>
                <tr>
                  <th style={themeStyles.th}>Type</th>
                  <th style={themeStyles.th}>Description</th>
                  <th style={themeStyles.th}>Finish</th>
                  <th style={themeStyles.th}>Coverage</th>
                 </tr>
              </thead>
              <tbody>
                {currentData.sizes.map((item, idx) => (
                  <tr key={idx}>
                    <td style={themeStyles.td}>{item.name}</td>
                    <td style={themeStyles.td}>{item.description}</td>
                    <td style={themeStyles.td}>{item.finish}</td>
                    <td style={themeStyles.td}>{item.coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'foundation' && (
            <table style={themeStyles.table}>
              <thead>
                <tr>
                  <th style={themeStyles.th}>Skin Tone Range</th>
                  <th style={themeStyles.th}>Skin Tone</th>
                  <th style={themeStyles.th}>Undertone</th>
                  <th style={themeStyles.th}>Shades</th>
                 </tr>
              </thead>
              <tbody>
                {currentData.shades.map((item, idx) => (
                  <tr key={idx}>
                    <td style={themeStyles.td}>{item.range}</td>
                    <td style={themeStyles.td}>{item.skinTone}</td>
                    <td style={themeStyles.td}>{item.undertone}</td>
                    <td style={themeStyles.td}>{item.shades}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'eyeliner' && (
            <table style={themeStyles.table}>
              <thead>
                <tr>
                  <th style={themeStyles.th}>Type</th>
                  <th style={themeStyles.th}>Description</th>
                  <th style={themeStyles.th}>Best For</th>
                  <th style={themeStyles.th}>Skill Level</th>
                 </tr>
              </thead>
              <tbody>
                {currentData.types.map((item, idx) => (
                  <tr key={idx}>
                    <td style={themeStyles.td}>{item.name}</td>
                    <td style={themeStyles.td}>{item.description}</td>
                    <td style={themeStyles.td}>{item.bestFor}</td>
                    <td style={themeStyles.td}>{item.skillLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'nailpolish' && (
            <table style={themeStyles.table}>
              <thead>
                <tr>
                  <th style={themeStyles.th}>Finish</th>
                  <th style={themeStyles.th}>Description</th>
                  <th style={themeStyles.th}>Durability</th>
                  <th style={themeStyles.th}>Best For</th>
                 </tr>
              </thead>
              <tbody>
                {currentData.finishes.map((item, idx) => (
                  <tr key={idx}>
                    <td style={themeStyles.td}>{item.name}</td>
                    <td style={themeStyles.td}>{item.description}</td>
                    <td style={themeStyles.td}>{item.durability}</td>
                    <td style={themeStyles.td}>{item.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={themeStyles.tipsSection}>
            <h3 style={themeStyles.tipsTitle}>
              <FaInfoCircle /> Pro Tips
            </h3>
            {currentData.tips.map((tip, idx) => (
              <div key={idx} style={themeStyles.tipItem}>
                <span>•</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button style={themeStyles.downloadButton}>
              <FaDownload /> Download Size Guide PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;