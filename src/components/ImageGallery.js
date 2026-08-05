import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaChevronLeft, FaChevronRight, FaPlay, FaTimes } from 'react-icons/fa';

const ImageGallery = ({ images, video, videoThumbnail, productName }) => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const allMedia = [
    ...(video ? [{ type: 'video', src: video, thumbnail: videoThumbnail }] : []),
    ...images.map(src => ({ type: 'image', src }))
  ];

  const nextMedia = () => {
    setActiveIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    setActiveIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const themeStyles = {
    galleryContainer: {
      position: 'relative',
      width: '100%',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '12px',
      overflow: 'hidden'
    },
    mainMedia: {
      position: 'relative',
      width: '100%',
      aspectRatio: '1/1',
      cursor: 'pointer',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'
    },
    mainImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      transition: 'transform 0.3s ease'
    },
    videoContainer: {
      width: '100%',
      height: '100%',
      position: 'relative'
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    playButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'rgba(232,140,166,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#ffffff',
      fontSize: '1.5rem',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translate(-50%, -50%) scale(1.1)',
        backgroundColor: '#e88ca6'
      }
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.8)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: isDarkMode ? '#333' : '#666',
      fontSize: '1.2rem',
      transition: 'all 0.3s ease',
      zIndex: 2,
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff'
      }
    },
    prevButton: {
      left: '1rem'
    },
    nextButton: {
      right: '1rem'
    },
    thumbnailStrip: {
      display: 'flex',
      gap: '0.5rem',
      padding: '1rem',
      overflowX: 'auto',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      scrollbarWidth: 'thin',
      '::-webkit-scrollbar': {
        height: '4px'
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#e88ca6',
        borderRadius: '2px'
      }
    },
    thumbnail: {
      flex: '0 0 80px',
      height: '80px',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      border: '2px solid transparent',
      transition: 'all 0.3s ease',
      opacity: 0.6
    },
    activeThumbnail: {
      borderColor: '#e88ca6',
      opacity: 1,
      transform: 'scale(1.05)'
    },
    thumbnailImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    videoThumbnail: {
      position: 'relative'
    },
    thumbnailPlayIcon: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#ffffff',
      backgroundColor: 'rgba(232,140,166,0.8)',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem'
    },
    fullscreenOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    fullscreenContent: {
      position: 'relative',
      width: '90%',
      height: '90%'
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.2)',
      border: 'none',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '1.2rem',
      zIndex: 1001,
      ':hover': {
        backgroundColor: 'rgba(255,255,255,0.3)'
      }
    }
  };

  const renderMedia = (media, isFullscreenMode = false) => {
    if (media.type === 'video') {
      return (
        <div style={themeStyles.videoContainer}>
          <video
            src={media.src}
            controls={showVideo || isFullscreenMode}
            autoPlay={showVideo}
            style={themeStyles.video}
            poster={media.thumbnail}
          />
          {!showVideo && !isFullscreenMode && (
            <div
              style={themeStyles.playButton}
              onClick={() => setShowVideo(true)}
            >
              <FaPlay />
            </div>
          )}
        </div>
      );
    } else {
      return (
        <img
          src={media.src}
          alt={`${productName} - View ${activeIndex + 1}`}
          style={themeStyles.mainImage}
          onClick={toggleFullscreen}
        />
      );
    }
  };

  return (
    <>
      <div style={themeStyles.galleryContainer}>
        {/* Main Media Display */}
        <div style={themeStyles.mainMedia}>
          {allMedia.length > 0 && renderMedia(allMedia[activeIndex])}

          {/* Navigation Arrows */}
          {allMedia.length > 1 && (
            <>
              <button
                style={{ ...themeStyles.navButton, ...themeStyles.prevButton }}
                onClick={prevMedia}
              >
                <FaChevronLeft />
              </button>
              <button
                style={{ ...themeStyles.navButton, ...themeStyles.nextButton }}
                onClick={nextMedia}
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {allMedia.length > 1 && (
          <div style={themeStyles.thumbnailStrip}>
            {allMedia.map((media, index) => (
              <div
                key={index}
                style={{
                  ...themeStyles.thumbnail,
                  ...(activeIndex === index ? themeStyles.activeThumbnail : {})
                }}
                onClick={() => {
                  setActiveIndex(index);
                  if (media.type === 'video') setShowVideo(false);
                }}
              >
                {media.type === 'video' ? (
                  <div style={themeStyles.videoThumbnail}>
                    <img
                      src={media.thumbnail || media.src}
                      alt={`Video thumbnail ${index + 1}`}
                      style={themeStyles.thumbnailImage}
                    />
                    <div style={themeStyles.thumbnailPlayIcon}>
                      <FaPlay style={{ fontSize: '0.6rem' }} />
                    </div>
                  </div>
                ) : (
                  <img
                    src={media.src}
                    alt={`Thumbnail ${index + 1}`}
                    style={themeStyles.thumbnailImage}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div style={themeStyles.fullscreenOverlay} onClick={toggleFullscreen}>
          <div style={themeStyles.fullscreenContent} onClick={(e) => e.stopPropagation()}>
            <button style={themeStyles.closeButton} onClick={toggleFullscreen}>
              <FaTimes />
            </button>
            {allMedia.length > 0 && renderMedia(allMedia[activeIndex], true)}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;