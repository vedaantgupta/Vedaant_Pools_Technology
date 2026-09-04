"use client";

import { useState, useRef, useEffect } from 'react';

export default function ProductImageZoom({ images = [], title = "Product", category = "", badge = "" }) {
  // Ensure array has at least one valid image
  const imageList = Array.isArray(images) && images.length > 0
    ? images.filter(Boolean)
    : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [lensDimensions, setLensDimensions] = useState({ width: 130, height: 130 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const mainImageRef = useRef(null);
  const containerRef = useRef(null);

  const currentImage = imageList[activeIndex] || '/placeholder.png';

  // Handle mouse move over main image for Amazon-style zoom
  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const lensW = lensDimensions.width;
    const lensH = lensDimensions.height;

    // Constrain lens inside the image boundary
    let x = mouseX - lensW / 2;
    let y = mouseY - lensH / 2;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > rect.width - lensW) x = rect.width - lensW;
    if (y > rect.height - lensH) y = rect.height - lensH;

    setLensPos({ x, y });

    // Calculate background percentage position for the zoomed window (2.6x zoom)
    const bgX = (x / Math.max(1, rect.width - lensW)) * 100;
    const bgY = (y / Math.max(1, rect.height - lensH)) * 100;

    setBgPos({ x: bgX, y: bgY });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  // Keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % imageList.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, imageList.length]);

  return (
    <div className="product-image-zoom-container" ref={containerRef}>

      {/* Gallery Wrapper: Left Thumbnails + Center Main Image */}
      <div className="gallery-layout">

        {/* Thumbnails strip (Amazon style) */}
        {imageList.length > 1 && (
          <div className="thumbnail-strip">
            {imageList.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`thumbnail-btn ${activeIndex === idx ? 'active' : ''}`}
                aria-label={`View product image ${idx + 1}`}
              >
                <img src={img} alt={`${title} view ${idx + 1}`} />
              </button>
            ))}
          </div>
        )}

        {/* Main Image Stage */}
        <div className="main-image-stage">
          <div
            ref={mainImageRef}
            className="main-image-box"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsLightboxOpen(true)}
          >
            <img
              src={currentImage}
              alt={title}
              className="main-display-img"
            />

            {/* Badges */}
            {category && (
              <span className="image-category-badge">
                {category}
              </span>
            )}

            {badge && (
              <span className="image-promo-badge">
                {badge}
              </span>
            )}

            {/* Amazon Zoom Lens (appears on mouse hover) */}
            {isZooming && (
              <div
                className="zoom-lens"
                style={{
                  top: `${lensPos.y}px`,
                  left: `${lensPos.x}px`,
                  width: `${lensDimensions.width}px`,
                  height: `${lensDimensions.height}px`,
                }}
              />
            )}

            {/* Hint overlay */}
            <div className="zoom-hint">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              <span>Hover zoom • Click full view</span>
            </div>
          </div>

          {/* Amazon High-Resolution Zoom Window (pops out beside the image) */}
          {isZooming && (
            <div className="zoom-flyout-window">
              <div
                className="zoom-flyout-bg"
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
                  backgroundSize: '280%',
                }}
              />
              <div className="zoom-flyout-label">High-Definition 2.8x Zoom</div>
            </div>
          )}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-backdrop" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen view"
            >
              &times;
            </button>

            <div className="lightbox-img-wrapper">
              <img src={currentImage} alt={title} className="lightbox-img" />
            </div>

            {imageList.length > 1 && (
              <>
                <button
                  className="lightbox-nav-btn prev"
                  onClick={() => setActiveIndex((prev) => (prev - 1 + imageList.length) % imageList.length)}
                  aria-label="Previous image"
                >
                  &#10094;
                </button>
                <button
                  className="lightbox-nav-btn next"
                  onClick={() => setActiveIndex((prev) => (prev + 1) % imageList.length)}
                  aria-label="Next image"
                >
                  &#10095;
                </button>

                <div className="lightbox-thumbnails">
                  {imageList.map((img, idx) => (
                    <button
                      key={idx}
                      className={`lightbox-thumb ${activeIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveIndex(idx)}
                    >
                      <img src={img} alt={`Thumb ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="lightbox-footer">
              <span>{title}</span>
              <span>{activeIndex + 1} / {imageList.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Component Styles */}
      <style jsx>{`
        .product-image-zoom-container {
          position: relative;
          width: 100%;
        }

        .gallery-layout {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        /* Thumbnails Strip */
        .thumbnail-strip {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 380px;
          overflow-y: auto;
          padding-right: 2px;
          scrollbar-width: thin;
        }

        .thumbnail-btn {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          background: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.15);
          padding: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          overflow: hidden;
          flex-shrink: 0;
        }

        .thumbnail-btn:hover {
          border-color: var(--secondary-color);
          transform: translateY(-2px);
        }

        .thumbnail-btn.active {
          border-color: var(--secondary-color);
          box-shadow: 0 0 10px rgba(0, 210, 255, 0.4);
        }

        .thumbnail-btn img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        /* Main Image Stage */
        .main-image-stage {
          flex: 1;
          position: relative;
        }

        .main-image-box {
          position: relative;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          width: 100%;
          min-height: 280px;
          max-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          cursor: crosshair;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }

        .main-display-img {
          max-width: 100%;
          max-height: 340px;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: transform 0.2s ease;
        }

        .image-category-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: var(--bg-navy);
          border: 1px solid var(--border-glass);
          color: var(--secondary-color);
          font-size: 10px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          pointer-events: none;
          z-index: 5;
        }

        .image-promo-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: linear-gradient(135deg, #ff9900 0%, #ff5500 100%);
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 5px;
          pointer-events: none;
          z-index: 5;
          text-transform: uppercase;
        }

        /* Amazon Zoom Lens */
        .zoom-lens {
          position: absolute;
          background: rgba(0, 210, 255, 0.22);
          border: 1px solid rgba(0, 210, 255, 0.9);
          box-shadow: inset 0 0 8px rgba(0, 210, 255, 0.3);
          pointer-events: none;
          z-index: 10;
          cursor: crosshair;
        }

        .zoom-hint {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(5, 19, 41, 0.88);
          backdrop-filter: blur(8px);
          color: var(--text-gray);
          border: 1px solid var(--border-glass);
          font-size: 10px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 5px;
          pointer-events: none;
          z-index: 5;
          white-space: nowrap;
        }

        /* Amazon Zoom Flyout Window (Side Magnifier) */
        .zoom-flyout-window {
          position: absolute;
          top: 0;
          left: calc(100% + 16px);
          width: 480px;
          height: 380px;
          background: #ffffff;
          border-radius: 14px;
          border: 2px solid var(--secondary-color);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 210, 255, 0.3);
          overflow: hidden;
          z-index: 999;
          pointer-events: none;
        }

        .zoom-flyout-bg {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
        }

        .zoom-flyout-label {
          position: absolute;
          bottom: 8px;
          right: 10px;
          background: rgba(0, 0, 0, 0.75);
          color: #fff;
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
        }

        /* Lightbox Fullscreen */
        .lightbox-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(5, 19, 41, 0.95);
          backdrop-filter: blur(12px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .lightbox-content {
          position: relative;
          max-width: 860px;
          width: 100%;
          max-height: 90vh;
          background: #ffffff;
          border-radius: 20px;
          padding: 30px 24px 16px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        }

        .lightbox-close-btn {
          position: absolute;
          top: 12px;
          right: 14px;
          background: rgba(0, 0, 0, 0.08);
          border: none;
          font-size: 26px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          transition: background 0.2s;
        }

        .lightbox-close-btn:hover {
          background: rgba(0, 0, 0, 0.18);
        }

        .lightbox-img-wrapper {
          width: 100%;
          height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(5, 19, 41, 0.7);
          color: #fff;
          border: none;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .lightbox-nav-btn:hover {
          background: var(--primary-color);
        }

        .lightbox-nav-btn.prev {
          left: 16px;
        }

        .lightbox-nav-btn.next {
          right: 16px;
        }

        .lightbox-thumbnails {
          display: flex;
          gap: 6px;
          margin-top: 12px;
          max-width: 100%;
          overflow-x: auto;
          padding: 4px;
        }

        .lightbox-thumb {
          width: 46px;
          height: 46px;
          border-radius: 6px;
          background: #fff;
          border: 2px solid #ddd;
          padding: 2px;
          cursor: pointer;
        }

        .lightbox-thumb.active {
          border-color: var(--primary-color);
        }

        .lightbox-thumb img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .lightbox-footer {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 10px;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #eee;
          padding-top: 8px;
        }

        /* Disabled gallery layout collapse under 1024px to preserve desktop image layout on all devices */
        /*
        @media (max-width: 1024px) {
          .zoom-flyout-window {
            display: none !important;
          }
          .gallery-layout {
            flex-direction: column-reverse;
          }
          .thumbnail-strip {
            flex-direction: row;
            max-height: none;
            overflow-x: auto;
            width: 100%;
          }
          .main-image-box {
            min-height: 240px;
            max-height: 320px;
          }
        }
        */
      `}</style>
    </div>
  );
}
