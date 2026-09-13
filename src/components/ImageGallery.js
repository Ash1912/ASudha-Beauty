import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaTimes,
  FaExpand,
  FaRegImage,
  FaVideo,
} from "react-icons/fa";

const ImageGallery = ({ images, video, videoThumbnail, productName }) => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mouseEntered, setMouseEntered] = useState(false);

  const allMedia = [
    ...(video
      ? [{ type: "video", src: video, thumbnail: videoThumbnail }]
      : []),
    ...images.map((src) => ({ type: "image", src })),
  ];

  const nextMedia = () => {
    setActiveIndex((prev) => (prev + 1) % allMedia.length);
    setShowVideo(false);
  };

  const prevMedia = () => {
    setActiveIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    setShowVideo(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsZoomed(false);
  };

  const toggleZoom = (e) => {
    if (allMedia[activeIndex].type === "image") {
      setIsZoomed(!isZoomed);
    }
  };

  const handleMouseMove = (e) => {
    if (isZoomed && allMedia[activeIndex].type === "image") {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
    }
  };

  // Brand color palette matching your Ayurvedic packaging
  const brandColors = {
    gold: "#f7d794",
    goldDark: "#d4af37",
    bronze: "#c77d42",
    pink: "#f5346b",
    darkBrown: "#3e2723",
    lightBrown: "#6d4c41",
    cream: "#fcf8f5",
    green: "#4caf50",
  };

  const themeStyles = {
    galleryContainer: {
      position: "relative",
      width: "100%",
      // UPDATED: Modern Black / Dark Slate
      backgroundColor: isDarkMode ? "#1a1a1a" : brandColors.cream,
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: isDarkMode
        ? "0 8px 30px rgba(0,0,0,0.5)"
        : "0 4px 30px rgba(62, 39, 35, 0.06)",
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.04)",
    },
    // Decorative top border accent
    accentBar: {
      height: "4px",
      background: isDarkMode
        ? "linear-gradient(90deg, #f7d794 0%, #f5346b 50%, #f7d794 100%)"
        : "linear-gradient(90deg, #d4af37 0%, #f5346b 50%, #d4af37 100%)",
      width: "100%",
    },
    mainMedia: {
      position: "relative",
      width: "100%",
      aspectRatio: "1/1",
      cursor: allMedia[activeIndex]?.type === "image" ? "zoom-in" : "default",
      // UPDATED: Pure Black Background
      backgroundColor: isDarkMode ? "#0f0f0f" : "#ffffff",
      overflow: "hidden",
    },
    mainImageWrapper: {
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
    },
    mainImage: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      transition: "transform 0.3s ease",
      padding: "1.25rem",
      boxSizing: "border-box",
      transform: isZoomed ? `scale(2.5)` : "scale(1)",
      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
    },
    videoContainer: {
      width: "100%",
      height: "100%",
      position: "relative",
    },
    video: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      padding: "1.25rem",
      boxSizing: "border-box",
    },
    playButton: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.12)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: "2px solid rgba(247, 215, 148, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "#ffffff",
      fontSize: "2rem",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      ":hover": {
        transform: "translate(-50%, -50%) scale(1.12)",
        background: "rgba(212, 175, 55, 0.35)",
        borderColor: brandColors.gold,
        boxShadow: "0 8px 40px rgba(212, 175, 55, 0.3)",
      },
    },
    playButtonInner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
    },
    // Media counter badge
    mediaCounter: {
      position: "absolute",
      bottom: "1rem",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "0.3rem 1rem",
      // UPDATED: Pure Black background
      backgroundColor: isDarkMode
        ? "rgba(15, 15, 15, 0.8)"
        : "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(8px)",
      borderRadius: "50px",
      fontSize: "0.75rem",
      fontWeight: "500",
      color: isDarkMode ? brandColors.gold : brandColors.darkBrown,
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.06)",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      zIndex: 3,
      letterSpacing: "0.5px",
    },
    navButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      // UPDATED: Dark Slate background
      backgroundColor: isDarkMode
        ? "rgba(26, 26, 26, 0.8)"
        : "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      border: "1px solid rgba(212, 175, 55, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: isDarkMode ? brandColors.gold : brandColors.bronze,
      fontSize: "1.2rem",
      transition: "all 0.3s ease",
      zIndex: 2,
      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      ":hover": {
        backgroundColor: isDarkMode ? brandColors.gold : brandColors.gold,
        color: isDarkMode ? brandColors.darkBrown : "#ffffff",
        transform: "translateY(-50%) scale(1.08)",
        borderColor: isDarkMode ? brandColors.gold : brandColors.gold,
        boxShadow: "0 4px 20px rgba(212, 175, 55, 0.3)",
      },
    },
    prevButton: {
      left: "0.75rem",
    },
    nextButton: {
      right: "0.75rem",
    },
    thumbnailStrip: {
      display: "flex",
      gap: "0.5rem",
      padding: "1rem 1.25rem",
      overflowX: "auto",
      // UPDATED: Dark Slate background
      backgroundColor: isDarkMode ? "#1a1a1a" : brandColors.cream,
      scrollbarWidth: "thin",
      borderTop: isDarkMode
        ? "1px solid rgba(255,255,255,0.05)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      "::-webkit-scrollbar": {
        height: "4px",
      },
      "::-webkit-scrollbar-thumb": {
        background: isDarkMode ? brandColors.gold : brandColors.goldDark,
        borderRadius: "2px",
      },
      "::-webkit-scrollbar-track": {
        background: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
        borderRadius: "2px",
      },
    },
    thumbnail: {
      flex: "0 0 72px",
      height: "72px",
      borderRadius: "12px",
      overflow: "hidden",
      cursor: "pointer",
      border: "2px solid transparent",
      transition: "all 0.3s ease",
      opacity: 0.5,
      // UPDATED: Pure Black background
      backgroundColor: isDarkMode ? "#0f0f0f" : "#ffffff",
      position: "relative",
      ":hover": {
        opacity: 0.8,
        transform: "scale(1.03)",
      },
    },
    activeThumbnail: {
      borderColor: isDarkMode ? brandColors.gold : brandColors.goldDark,
      opacity: 1,
      transform: "scale(1.06)",
      boxShadow: isDarkMode
        ? "0 0 20px rgba(247, 215, 148, 0.2)"
        : "0 0 20px rgba(212, 175, 55, 0.15)",
    },
    thumbnailImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    videoThumbnail: {
      position: "relative",
    },
    thumbnailPlayIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "#ffffff",
      backgroundColor: "rgba(212, 175, 55, 0.9)",
      borderRadius: "50%",
      width: "28px",
      height: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.7rem",
      boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
    },
    thumbnailTypeIcon: {
      position: "absolute",
      bottom: "4px",
      right: "4px",
      // UPDATED: Pure Black background
      backgroundColor: isDarkMode
        ? "rgba(15, 15, 15, 0.8)"
        : "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(4px)",
      borderRadius: "6px",
      padding: "2px 4px",
      fontSize: "0.6rem",
      color: isDarkMode ? brandColors.gold : brandColors.darkBrown,
      display: "flex",
      alignItems: "center",
      gap: "2px",
    },
    fullscreenOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // UPDATED: Modern Black backdrop
      backgroundColor: "rgba(15, 15, 15, 0.95)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    },
    fullscreenContent: {
      position: "relative",
      width: "92%",
      height: "92%",
    },
    closeButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "1.3rem",
      zIndex: 1001,
      transition: "all 0.4s ease",
      ":hover": {
        backgroundColor: brandColors.gold,
        transform: "rotate(90deg) scale(1.05)",
        borderColor: brandColors.gold,
        color: isDarkMode ? brandColors.darkBrown : "#ffffff",
      },
    },
    fullscreenNav: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "1.2rem",
      zIndex: 1001,
      transition: "all 0.3s ease",
      ":hover": {
        backgroundColor: brandColors.gold,
        color: isDarkMode ? brandColors.darkBrown : "#ffffff",
      },
    },
    // Zoom indicator
    zoomIndicator: {
      position: "absolute",
      bottom: "1rem",
      right: "1rem",
      padding: "0.4rem 0.8rem",
      // UPDATED: Pure Black background
      backgroundColor: isDarkMode
        ? "rgba(15, 15, 15, 0.8)"
        : "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderRadius: "50px",
      fontSize: "0.7rem",
      color: isDarkMode ? brandColors.gold : brandColors.darkBrown,
      border: isDarkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(62, 39, 35, 0.06)",
      zIndex: 3,
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      opacity: mouseEntered && allMedia[activeIndex]?.type === "image" ? 1 : 0,
      transition: "opacity 0.3s ease",
    },
  };

  // Add keyframes for animations
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.05); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const currentMedia = allMedia[activeIndex];
  const isVideo = currentMedia?.type === "video";

  return (
    <>
      <div style={themeStyles.galleryContainer}>
        {/* Decorative accent bar */}
        <div style={themeStyles.accentBar} />

        {/* Main Media Display */}
        <div
          style={themeStyles.mainMedia}
          onMouseEnter={() => setMouseEntered(true)}
          onMouseLeave={() => setMouseEntered(false)}
          onMouseMove={handleMouseMove}
        >
          <div style={themeStyles.mainImageWrapper}>
            {allMedia.length > 0 &&
              (currentMedia.type === "video" ? (
                <div style={themeStyles.videoContainer}>
                  <video
                    src={currentMedia.src}
                    controls={showVideo}
                    autoPlay={showVideo}
                    style={themeStyles.video}
                    poster={currentMedia.thumbnail}
                  />
                  {!showVideo && (
                    <div
                      style={themeStyles.playButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowVideo(true);
                      }}
                    >
                      <div style={themeStyles.playButtonInner}>
                        <FaPlay />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={currentMedia.src}
                  alt={`${productName} - View ${activeIndex + 1}`}
                  style={themeStyles.mainImage}
                  onClick={toggleZoom}
                />
              ))}
          </div>

          {/* Media Counter */}
          {allMedia.length > 1 && (
            <div style={themeStyles.mediaCounter}>
              <FaRegImage style={{ fontSize: "0.7rem" }} />
              {activeIndex + 1} / {allMedia.length}
              {isVideo && (
                <FaVideo style={{ fontSize: "0.7rem", marginLeft: "0.3rem" }} />
              )}
            </div>
          )}

          {/* Zoom Indicator */}
          {allMedia[activeIndex]?.type === "image" && (
            <div style={themeStyles.zoomIndicator}>
              <FaExpand style={{ fontSize: "0.7rem" }} />
              {isZoomed ? "Zoom Out" : "Zoom In"}
            </div>
          )}

          {/* Navigation Arrows */}
          {allMedia.length > 1 && (
            <>
              <button
                style={{ ...themeStyles.navButton, ...themeStyles.prevButton }}
                onClick={prevMedia}
                aria-label="Previous"
              >
                <FaChevronLeft />
              </button>
              <button
                style={{ ...themeStyles.navButton, ...themeStyles.nextButton }}
                onClick={nextMedia}
                aria-label="Next"
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
                  ...(activeIndex === index ? themeStyles.activeThumbnail : {}),
                }}
                onClick={() => {
                  setActiveIndex(index);
                  if (media.type === "video") setShowVideo(false);
                  setIsZoomed(false);
                }}
              >
                {media.type === "video" ? (
                  <div style={themeStyles.videoThumbnail}>
                    <img
                      src={media.thumbnail || media.src}
                      alt={`Video ${index + 1}`}
                      style={themeStyles.thumbnailImage}
                    />
                    <div style={themeStyles.thumbnailPlayIcon}>
                      <FaPlay
                        style={{ fontSize: "0.6rem", marginLeft: "1px" }}
                      />
                    </div>
                    <div style={themeStyles.thumbnailTypeIcon}>
                      <FaVideo style={{ fontSize: "0.5rem" }} />
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={media.src}
                      alt={`Thumbnail ${index + 1}`}
                      style={themeStyles.thumbnailImage}
                    />
                    <div style={themeStyles.thumbnailTypeIcon}>
                      <FaRegImage style={{ fontSize: "0.5rem" }} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          style={themeStyles.fullscreenOverlay}
          onClick={toggleFullscreen}
          onKeyDown={(e) => {
            if (e.key === "Escape") toggleFullscreen();
            if (e.key === "ArrowRight") nextMedia();
            if (e.key === "ArrowLeft") prevMedia();
          }}
        >
          <div
            style={themeStyles.fullscreenContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={themeStyles.closeButton}
              onClick={toggleFullscreen}
              aria-label="Close fullscreen"
            >
              <FaTimes />
            </button>

            {allMedia.length > 1 && (
              <>
                <button
                  style={{
                    ...themeStyles.fullscreenNav,
                    left: "1rem",
                  }}
                  onClick={prevMedia}
                  aria-label="Previous"
                >
                  <FaChevronLeft />
                </button>
                <button
                  style={{
                    ...themeStyles.fullscreenNav,
                    right: "1rem",
                  }}
                  onClick={nextMedia}
                  aria-label="Next"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            {allMedia.length > 0 &&
              (currentMedia.type === "video" ? (
                <video
                  src={currentMedia.src}
                  controls
                  autoPlay
                  style={{ ...themeStyles.video, height: "100%", padding: 0 }}
                  poster={currentMedia.thumbnail}
                />
              ) : (
                <img
                  src={currentMedia.src}
                  alt={`${productName} - Fullscreen`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "2rem",
                    boxSizing: "border-box",
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
