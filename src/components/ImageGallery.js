// src/components/ImageGallery.jsx
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaTimes,
  FaExpand,
  FaCompress,
  FaRegImage,
  FaVideo,
} from "react-icons/fa";

// ─── Brand palette (module scope: stable) ───
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

const ImageGallery = ({
  images = [],
  video,
  videoThumbnail,
  productName = "Product",
}) => {
  const { isDarkMode } = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [mouseEntered, setMouseEntered] = useState(false);
  const [imageVisible, setImageVisible] = useState(true);

  const fullscreenRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // ─── Null-safe, memoized media list ───
  const allMedia = useMemo(() => {
    const list = [];
    if (video) {
      list.push({ type: "video", src: video, thumbnail: videoThumbnail });
    }
    if (Array.isArray(images)) {
      images.forEach((src, i) => {
        list.push({ type: "image", src, index: i });
      });
    }
    return list;
  }, [video, videoThumbnail, images]);

  const totalMedia = allMedia.length;
  const currentMedia = allMedia[activeIndex];
  const isVideo = currentMedia?.type === "video";

  // ─── Navigation ───
  const goTo = useCallback(
    (index) => {
      if (totalMedia === 0) return;
      const next = ((index % totalMedia) + totalMedia) % totalMedia;
      setImageVisible(false);
      setActiveIndex(next);
      setShowVideo(false);
      setIsZoomed(false);
      requestAnimationFrame(() => setImageVisible(true));
    },
    [totalMedia]
  );

  const nextMedia = useCallback(
    () => goTo(activeIndex + 1),
    [goTo, activeIndex]
  );
  const prevMedia = useCallback(
    () => goTo(activeIndex - 1),
    [goTo, activeIndex]
  );

  // ─── Handlers ───
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
    setIsZoomed(false);
  }, []);

  const toggleZoom = useCallback(
    (e) => {
      e?.preventDefault?.();
      if (allMedia[activeIndex]?.type === "image") {
        setIsZoomed((prev) => !prev);
      }
    },
    [allMedia, activeIndex]
  );

  const handleMouseMove = (e) => {
    if (!isZoomed || allMedia[activeIndex]?.type !== "image") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  // ─── Fullscreen: focus trap, scroll lock, restore focus ───
  useEffect(() => {
    if (!isFullscreen) return;

    previouslyFocusedRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((p) => (p + 1) % totalMedia);
        setShowVideo(false);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((p) => (p - 1 + totalMedia) % totalMedia);
        setShowVideo(false);
      } else if (e.key === "Tab") {
        const nodes = fullscreenRef.current?.querySelectorAll(
          'button, [href], video, [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isFullscreen, totalMedia]);

  // ─── Theme styles ───
  const themeStyles = {
    galleryContainer: {
      position: "relative",
      width: "100%",
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
      cursor: currentMedia?.type === "image" ? "zoom-in" : "default",
      backgroundColor: isDarkMode ? "#0f0f0f" : "#ffffff",
      overflow: "hidden",
    },
    mainImageWrapper: {
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
      opacity: imageVisible ? 1 : 0,
      transition: "opacity 0.35s ease",
    },
    // Zoom button wrapper: reset button chrome so the img looks like content
    zoomButton: {
      width: "100%",
      height: "100%",
      border: "none",
      padding: 0,
      background: "transparent",
      cursor: "inherit",
      display: "block",
      outline: "none",
      fontFamily: "inherit",
    },
    mainImage: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      padding: "1.25rem",
      boxSizing: "border-box",
      transform: isZoomed ? "scale(2.5)" : "scale(1)",
      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
      display: "block",
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
      padding: 0,
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      fontFamily: "inherit",
    },
    mediaCounter: {
      position: "absolute",
      bottom: "1rem",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "0.35rem 1rem",
      backgroundColor: isDarkMode
        ? "rgba(15, 15, 15, 0.8)"
        : "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
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
      zIndex: 2,
      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      padding: 0,
      transition: "all 0.3s ease",
    },
    prevButton: { left: "0.75rem" },
    nextButton: { right: "0.75rem" },
    thumbnailStrip: {
      display: "flex",
      gap: "0.6rem",
      padding: "1rem 1.25rem",
      overflowX: "auto",
      backgroundColor: isDarkMode ? "#1a1a1a" : brandColors.cream,
      scrollbarWidth: "thin",
      borderTop: isDarkMode
        ? "1px solid rgba(255,255,255,0.05)"
        : "1px solid rgba(62, 39, 35, 0.04)",
      scrollbarColor: `${
        isDarkMode ? brandColors.gold : brandColors.goldDark
      } transparent`,
    },
    thumbnail: {
      flex: "0 0 74px",
      height: "74px",
      borderRadius: "12px",
      overflow: "hidden",
      cursor: "pointer",
      border: "2px solid transparent",
      opacity: 0.55,
      backgroundColor: isDarkMode ? "#0f0f0f" : "#ffffff",
      position: "relative",
      padding: 0,
      transition: "all 0.3s ease",
      fontFamily: "inherit",
    },
    activeThumbnail: {
      borderColor: isDarkMode ? brandColors.gold : brandColors.goldDark,
      opacity: 1,
      transform: "scale(1.06)",
      boxShadow: isDarkMode
        ? "0 0 20px rgba(247, 215, 148, 0.25)"
        : "0 0 20px rgba(212, 175, 55, 0.2)",
    },
    thumbnailImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
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
      backgroundColor: "rgba(15, 15, 15, 0.96)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      animation: "igFadeIn 0.25s ease",
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
      padding: 0,
      transition: "all 0.4s ease",
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
      padding: 0,
      transition: "all 0.3s ease",
    },
    zoomIndicator: {
      position: "absolute",
      bottom: "1rem",
      right: "1rem",
      padding: "0.4rem 0.8rem",
      backgroundColor: isDarkMode
        ? "rgba(15, 15, 15, 0.8)"
        : "rgba(255, 255, 255, 0.85)",
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
      pointerEvents: "none",
      opacity: mouseEntered && !isVideo ? 1 : 0,
      transition: "opacity 0.3s ease",
    },
  };

  // ─── Injected CSS: real hovers + animations + scrollbar ───
  useLayoutEffect(() => {
    document
      .querySelectorAll('style[data-image-gallery="true"]')
      .forEach((el) => el.parentNode && el.parentNode.removeChild(el));

    const style = document.createElement("style");
    style.setAttribute("data-image-gallery", "true");
    style.textContent = `
      @keyframes igFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes igPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50%      { transform: translate(-50%, -50%) scale(1.06); }
      }

      /* Play button hover + idle pulse */
      .ig-play-btn:hover,
      .ig-play-btn:focus-visible {
        transform: translate(-50%, -50%) scale(1.12) !important;
        background: rgba(212, 175, 55, 0.35) !important;
        border-color: ${brandColors.gold} !important;
        box-shadow: 0 8px 40px rgba(212, 175, 55, 0.35) !important;
        outline: none;
      }
      .ig-play-btn {
        animation: igPulse 2.4s ease-in-out infinite;
      }
      .ig-play-btn:hover {
        animation: none;
      }

      /* Nav button hover (thumbnail arrows) */
      .ig-nav-btn:hover,
      .ig-nav-btn:focus-visible {
        background-color: ${brandColors.gold} !important;
        color: ${brandColors.darkBrown} !important;
        transform: translateY(-50%) scale(1.08) !important;
        border-color: ${brandColors.gold} !important;
        box-shadow: 0 4px 20px rgba(212, 175, 55, 0.35) !important;
        outline: none;
      }

      /* Thumbnail hover */
      .ig-thumb {
        opacity: 0.55;
      }
      .ig-thumb:hover {
        opacity: 0.85;
        transform: scale(1.03);
      }
      .ig-thumb.ig-active {
        opacity: 1 !important;
        transform: scale(1.06);
      }
      .ig-thumb:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.pink};
        outline-offset: 2px;
      }

      /* Zoom button focus */
      .ig-zoom-btn:focus-visible {
        outline: 2px solid ${isDarkMode ? brandColors.gold : brandColors.pink};
        outline-offset: -2px;
        border-radius: 16px;
      }

      /* Fullscreen close button hover */
      .ig-close-btn:hover,
      .ig-close-btn:focus-visible {
        background-color: ${brandColors.gold} !important;
        color: ${brandColors.darkBrown} !important;
        transform: rotate(90deg) scale(1.06) !important;
        border-color: ${brandColors.gold} !important;
        outline: none;
      }

      /* Fullscreen nav hover */
      .ig-fs-nav:hover,
      .ig-fs-nav:focus-visible {
        background-color: ${brandColors.gold} !important;
        color: ${brandColors.darkBrown} !important;
        transform: translateY(-50%) scale(1.08) !important;
        border-color: ${brandColors.gold} !important;
        outline: none;
      }

      /* Thumbnail strip scrollbar (inline ::-webkit never applied) */
      .ig-thumbstrip::-webkit-scrollbar {
        height: 4px;
      }
      .ig-thumbstrip::-webkit-scrollbar-thumb {
        background: ${isDarkMode ? brandColors.gold : brandColors.goldDark};
        border-radius: 2px;
      }
      .ig-thumbstrip::-webkit-scrollbar-track {
        background: ${
          isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"
        };
        border-radius: 2px;
      }

      @media (prefers-reduced-motion: reduce) {
        .ig-play-btn { animation: none !important; }
        .ig-thumb,
        .ig-nav-btn,
        .ig-close-btn,
        .ig-fs-nav,
        .ig-zoom-btn {
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document
        .querySelectorAll('style[data-image-gallery="true"]')
        .forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, [isDarkMode]);

  // ─── Nothing to render guard ───
  if (totalMedia === 0) {
    return null;
  }

  return (
    <>
      <div
        style={themeStyles.galleryContainer}
        aria-roledescription="carousel"
        aria-label={`${productName} image gallery`}
      >
        {/* Decorative accent bar */}
        <div style={themeStyles.accentBar} aria-hidden="true" />

        {/* Main Media Display */}
        <div
          style={themeStyles.mainMedia}
          onMouseEnter={() => setMouseEntered(true)}
          onMouseLeave={() => setMouseEntered(false)}
          onMouseMove={handleMouseMove}
        >
          <div style={themeStyles.mainImageWrapper}>
            {isVideo ? (
              <div style={themeStyles.videoContainer}>
                <video
                  src={currentMedia.src}
                  controls={showVideo}
                  autoPlay={showVideo}
                  style={themeStyles.video}
                  poster={currentMedia.thumbnail}
                  aria-label={`${productName} product video`}
                  preload="metadata"
                />
                {!showVideo && (
                  <button
                    type="button"
                    style={themeStyles.playButton}
                    className="ig-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVideo(true);
                    }}
                    aria-label={`Play ${productName} product video`}
                  >
                    <FaPlay aria-hidden="true" style={{ marginLeft: "4px" }} />
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                style={themeStyles.zoomButton}
                className="ig-zoom-btn"
                onClick={toggleZoom}
                aria-pressed={isZoomed}
                aria-label={
                  isZoomed
                    ? `Zoom out of ${productName} — view ${activeIndex + 1} of ${totalMedia}`
                    : `Zoom in on ${productName} — view ${activeIndex + 1} of ${totalMedia}`
                }
              >
                <img
                  src={currentMedia.src}
                  alt={`${productName} — ${currentMedia.type} ${
                    activeIndex + 1
                  } of ${totalMedia}`}
                  style={themeStyles.mainImage}
                  loading={activeIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </button>
            )}
          </div>

          {/* Media Counter — live region announces slide changes */}
          {totalMedia > 1 && (
            <div
              style={themeStyles.mediaCounter}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <FaRegImage aria-hidden="true" style={{ fontSize: "0.7rem" }} />
              {activeIndex + 1} / {totalMedia}
              {isVideo && (
                <FaVideo
                  aria-hidden="true"
                  style={{ fontSize: "0.7rem", marginLeft: "0.3rem" }}
                />
              )}
            </div>
          )}

          {/* Zoom Indicator */}
          {!isVideo && (
            <div style={themeStyles.zoomIndicator} aria-hidden="true">
              {isZoomed ? (
                <FaCompress style={{ fontSize: "0.7rem" }} />
              ) : (
                <FaExpand style={{ fontSize: "0.7rem" }} />
              )}
              {isZoomed ? "Zoom Out" : "Zoom In"}
            </div>
          )}

          {/* Navigation Arrows */}
          {totalMedia > 1 && (
            <>
              <button
                type="button"
                style={{ ...themeStyles.navButton, ...themeStyles.prevButton }}
                className="ig-nav-btn"
                onClick={prevMedia}
                aria-label="Show previous media"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                style={{ ...themeStyles.navButton, ...themeStyles.nextButton }}
                className="ig-nav-btn"
                onClick={nextMedia}
                aria-label="Show next media"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {totalMedia > 1 && (
          <div
            style={themeStyles.thumbnailStrip}
            className="ig-thumbstrip"
            role="group"
            aria-label="Choose a media thumbnail"
          >
            {allMedia.map((media, index) => {
              const isActive = activeIndex === index;
              const label =
                media.type === "video"
                  ? `Show product video`
                  : `Show image ${index - (video ? 1 : 0) + 1}`;
              return (
                <button
                  key={`${media.type}-${media.src}-${index}`}
                  type="button"
                  style={{
                    ...themeStyles.thumbnail,
                    ...(isActive ? themeStyles.activeThumbnail : {}),
                  }}
                  className={`ig-thumb${isActive ? " ig-active" : ""}`}
                  onClick={() => goTo(index)}
                  aria-label={label}
                  aria-current={isActive ? "true" : "false"}
                >
                  <img
                    src={
                      media.type === "video"
                        ? media.thumbnail || media.src
                        : media.src
                    }
                    alt=""
                    style={themeStyles.thumbnailImage}
                    loading="lazy"
                    decoding="async"
                  />
                  {media.type === "video" && (
                    <>
                      <div
                        style={themeStyles.thumbnailPlayIcon}
                        aria-hidden="true"
                      >
                        <FaPlay
                          style={{ fontSize: "0.6rem", marginLeft: "1px" }}
                        />
                      </div>
                      <div
                        style={themeStyles.thumbnailTypeIcon}
                        aria-hidden="true"
                      >
                        <FaVideo style={{ fontSize: "0.5rem" }} />
                      </div>
                    </>
                  )}
                  {media.type === "image" && (
                    <div
                      style={themeStyles.thumbnailTypeIcon}
                      aria-hidden="true"
                    >
                      <FaRegImage style={{ fontSize: "0.5rem" }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Fullscreen Modal ─── */}
      {isFullscreen && (
        <div
          ref={fullscreenRef}
          style={themeStyles.fullscreenOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} — fullscreen gallery`}
          onClick={toggleFullscreen}
        >
          <div
            style={themeStyles.fullscreenContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              type="button"
              style={themeStyles.closeButton}
              className="ig-close-btn"
              onClick={toggleFullscreen}
              aria-label="Close fullscreen gallery"
            >
              <FaTimes aria-hidden="true" />
            </button>

            {totalMedia > 1 && (
              <>
                <button
                  type="button"
                  style={{ ...themeStyles.fullscreenNav, left: "1rem" }}
                  className="ig-fs-nav"
                  onClick={prevMedia}
                  aria-label="Show previous media"
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  style={{ ...themeStyles.fullscreenNav, right: "1rem" }}
                  className="ig-fs-nav"
                  onClick={nextMedia}
                  aria-label="Show next media"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
              </>
            )}

            {isVideo ? (
              <video
                src={currentMedia.src}
                controls
                autoPlay
                style={{ ...themeStyles.video, height: "100%", padding: 0 }}
                poster={currentMedia.thumbnail}
                aria-label={`${productName} product video — fullscreen`}
              />
            ) : (
              <img
                src={currentMedia.src}
                alt={`${productName} — view ${activeIndex + 1} of ${totalMedia} — fullscreen`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "2rem",
                  boxSizing: "border-box",
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;