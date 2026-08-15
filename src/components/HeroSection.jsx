"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection({ backgroundImages, branding }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Default branding configurations
  const logoText = branding?.logoText || 'VEDAANT POOLS TECHNOLOGY';
  const logoImageUrl = branding?.logoImageUrl || '';
  const tagline = branding?.tagline || 'From Conceptualization to Finalisation';
  const slogan = branding?.slogan || 'We specialize in the end-to-end design, construction, and maintenance of premium swimming pools and professional water bodies.';

  // Default fallback pool background images
  const defaultImages = [
    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600',
    'https://images.unsplash.com/photo-1560185893-a55cbc2c78a9?q=80&w=1600',
    'https://images.unsplash.com/photo-1529258283582-9480d0d8a31e?q=80&w=1600'
  ];

  const slides = (backgroundImages && backgroundImages.length > 0) ? backgroundImages : defaultImages;

  // Trigger animations on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Autoplay background slideshow
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Track mouse position for parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5; // range: -0.5 to 0.5
    const y = (clientY - top) / height - 0.5; // range: -0.5 to 0.5
    setMousePosition({ x, y });
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section 
      className="hero-section-wrapper" 
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        color: 'var(--text-white)',
        padding: '80px 0'
      }}
    >
      {/* Background Parallax Layer */}
      <div style={{
        position: 'absolute',
        top: '-5%',
        left: '-5%',
        right: '-5%',
        bottom: '-5%',
        width: '110%',
        height: '110%',
        zIndex: 1,
        transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
      }}>
        {/* Background Slideshow (With Ken Burns slow zoom) */}
        {slides.map((imgUrl, index) => (
          <div
            key={'full-bg-' + index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentSlide ? 0.35 : 0,
              transform: index === currentSlide ? 'scale(1.15) translate(10px, -10px)' : 'scale(1.0)',
              transition: 'opacity 1.5s ease-in-out, transform 6s ease-out',
            }}
          />
        ))}
      </div>

      {/* Deep Navy Gradient Overlay for Text Readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(5, 19, 41, 0.95) 0%, rgba(3, 10, 22, 0.8) 50%, rgba(5, 19, 41, 0.95) 100%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* Floating Animated Bubbles / Bokeh Particles Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={'bubble-' + i}
            className="floating-bubble"
            style={{
              left: `${8 + i * 4.5}%`,
              width: `${12 + (i % 4) * 5}px`,
              height: `${12 + (i % 4) * 5}px`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${10 + (i % 4) * 3}s`
            }}
          />
        ))}
      </div>

      {/* Bottom wave fade-out */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '140px',
        background: 'linear-gradient(to top, var(--bg-deep), transparent)',
        zIndex: 3,
        pointerEvents: 'none'
      }} />

      {/* Two-Column Layout Container */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 4,
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div className="hero-split-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 0.95fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Typography Branding & Slogans */}
          <div className="hero-left-content" style={{ textAlign: 'left' }}>
            
            {/* Custom stylized logo text */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: 'calc(1.6rem + 1vw)',
                fontWeight: '900',
                fontFamily: 'var(--font-title)',
                letterSpacing: '0.02em',
                display: 'inline-flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                lineHeight: '1.2',
                textTransform: 'uppercase'
              }}>
                <span style={{
                  position: 'relative',
                  display: 'inline-block',
                  paddingBottom: '5px',
                  marginRight: '12px'
                }}>
                  {/* Red V with glow and border */}
                  <span style={{
                    color: '#ef4444',
                    fontWeight: '900',
                    fontSize: '1.05em',
                    textShadow: '0 0 10px rgba(239, 68, 68, 0.6), 0 0 20px rgba(239, 68, 68, 0.3), 0 2px 4px rgba(0,0,0,0.6)',
                    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.15)'
                  }}>V</span>
                  {/* EDAANT with blue glow and border */}
                  <span style={{
                    color: '#4460f1',
                    textShadow: '0 0 10px rgba(68, 96, 241, 0.6), 0 0 20px rgba(68, 96, 241, 0.3), 0 2px 4px rgba(0,0,0,0.6)',
                    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.15)'
                  }}>EDAANT</span>
                  {/* Red Underline with glow */}
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    backgroundColor: '#ef4444',
                    borderRadius: '2px',
                    boxShadow: '0 0 8px rgba(239, 68, 68, 0.8), 0 2px 4px rgba(0,0,0,0.5)'
                  }} />
                </span>

                {/* POOLS TECHNOLOGY with blue glow and border */}
                <span style={{
                  color: '#4460f1',
                  textShadow: '0 0 10px rgba(68, 96, 241, 0.6), 0 0 20px rgba(68, 96, 241, 0.3), 0 2px 4px rgba(0,0,0,0.6)',
                  WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.15)'
                }}>
                  POOLS TECHNOLOGY
                </span>
              </div>
            </div>

            {/* Tagline: From Conceptualization to Finalisation */}
            <div style={{ display: 'inline-block', marginBottom: '28px' }}>
              <h2 className="hero-tagline-text" style={{
                fontSize: 'calc(1.15rem + 0.5vw)',
                fontWeight: '400',
                fontFamily: 'var(--font-sans)',
                color: '#ffffff',
                letterSpacing: '1px',
                lineHeight: '1.4',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                margin: 0
              }}>
                {(() => {
                  if (tagline.toLowerCase().includes('conceptualization') && tagline.toLowerCase().includes('finalisation')) {
                    const parts = tagline.split(/(conceptualization|finalisation)/i);
                    return parts.map((part, index) => {
                      if (part.toLowerCase() === 'conceptualization' || part.toLowerCase() === 'finalisation') {
                        return (
                          <span key={index} style={{
                            fontWeight: '800',
                            background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--accent-color) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 15px rgba(0, 210, 255, 0.35)',
                            display: 'inline-block'
                          }}>
                            {part}
                          </span>
                        );
                      }
                      return <span key={index}>{part}</span>;
                    });
                  }
                  return <span>{tagline}</span>;
                })()}
              </h2>
            </div>

            {/* Slogan Description */}
            <p style={{
              color: 'var(--text-gray)',
              fontSize: '17px',
              lineHeight: '1.8',
              maxWidth: '650px',
              marginBottom: '40px',
              fontWeight: '400',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              {slogan}
            </p>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/store"
                className="btn-premium-primary"
                style={{
                  padding: '14px 32px',
                  borderRadius: '30px',
                  fontWeight: '700',
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%)',
                  color: '#030a16',
                  boxShadow: '0 8px 24px rgba(0, 210, 255, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <span>View Products</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>

              <Link
                href="/contact"
                className="btn-premium-secondary"
                style={{
                  padding: '13px 31px',
                  borderRadius: '30px',
                  fontWeight: '600',
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-white)',
                  backdropFilter: 'blur(10px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <span>Get Free Quote</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Dynamic Circular Logo Display */}
          <div className="hero-right-visual" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            {/* Animated rotating border rings */}
            <div className="glowing-ring" style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              aspectRatio: '1/1',
              flexShrink: 0,
              borderRadius: '50%',
              border: '2px dashed rgba(0, 210, 255, 0.35)',
              animation: 'spinRing 25s linear infinite',
              zIndex: 1
            }} />
            
            <div className="glowing-ring-solid" style={{
              position: 'absolute',
              width: '336px',
              height: '336px',
              aspectRatio: '1/1',
              flexShrink: 0,
              borderRadius: '50%',
              border: '2px solid rgba(68, 96, 241, 0.25)',
              boxShadow: '0 0 40px rgba(0, 210, 255, 0.15)',
              zIndex: 1
            }} />

            {/* Circular Glassmorphism Logo Badge */}
            <div className="logo-badge-container" style={{
              width: '320px',
              height: '320px',
              aspectRatio: '1/1',
              flexShrink: 0,
              borderRadius: '50%',
              background: 'rgba(9, 28, 54, 0.75)',
              border: '4px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 24px rgba(0, 210, 255, 0.1)',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}>
              {logoImageUrl ? (
                /* Dynamic Uploaded Logo Image from Admin (perfect circle crop) */
                <img
                  src={logoImageUrl}
                  alt="Vedaant Pools Logo"
                  className="logo-badge-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    filter: 'drop-shadow(0 0 12px rgba(0, 210, 255, 0.5))',
                    animation: 'logoPulse 4s ease-in-out infinite alternate'
                  }}
                />
              ) : (
                /* Stylized Fallback Emblem with Logo style */
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'logoPulse 4s ease-in-out infinite alternate'
                }}>
                  {/* Emblem V */}
                  <div style={{
                    fontSize: '96px',
                    fontWeight: '900',
                    color: '#ef4444',
                    lineHeight: '1',
                    fontFamily: 'var(--font-title)',
                    textShadow: '0 0 20px rgba(239, 68, 68, 0.8), 0 0 35px rgba(239, 68, 68, 0.4), 0 4px 10px rgba(0,0,0,0.6)',
                    position: 'relative',
                    WebkitTextStroke: '1px rgba(255,255,255,0.1)'
                  }}>
                    V
                    {/* Emblem Underline */}
                    <span style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '70px',
                      height: '5px',
                      backgroundColor: '#ef4444',
                      borderRadius: '3px',
                      boxShadow: '0 0 10px rgba(239, 68, 68, 0.9)'
                    }} />
                  </div>
                  {/* Emblem Text */}
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#4460f1',
                    letterSpacing: '5px',
                    marginTop: '20px',
                    textShadow: '0 0 10px rgba(68, 96, 241, 0.8)'
                  }}>
                    VEDAANT
                  </div>
                </div>
              )}
            </div>


          </div>

        </div>

        {/* Slideshow Indicator Dots */}
        {slides.length > 1 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            marginTop: '60px'
          }}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to background slide ${index + 1}`}
                style={{
                  width: index === currentSlide ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: index === currentSlide ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'var(--transition-smooth)'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Mouse Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: 0.5,
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '20px',
          height: '32px',
          borderRadius: '10px',
          border: '2px solid var(--text-gray)',
          position: 'relative'
        }}>
          <div style={{
            width: '4px',
            height: '6px',
            borderRadius: '2px',
            backgroundColor: 'var(--secondary-color)',
            position: 'absolute',
            top: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'scrollWheelAnimation 1.8s infinite ease-in-out'
          }} />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatBubble {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-105vh) scale(1.2); opacity: 0; }
        }
        @keyframes logoPulse {
          0% { transform: scale(0.97); filter: drop-shadow(0 0 10px rgba(0, 210, 255, 0.3)); }
          100% { transform: scale(1.03); filter: drop-shadow(0 0 20px rgba(0, 210, 255, 0.55)); }
        }
        @keyframes scrollWheelAnimation {
          0% { top: 5px; opacity: 0; }
          30% { opacity: 1; }
          100% { top: 18px; opacity: 0; }
        }
        .btn-premium-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 210, 255, 0.45) !important;
          filter: brightness(1.1);
        }
        .btn-premium-secondary:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: var(--secondary-color) !important;
          box-shadow: 0 6px 15px rgba(0, 210, 255, 0.15);
        }
        .slide-arrow-btn:hover {
          background: var(--secondary-color) !important;
          color: #030a16 !important;
          border-color: var(--secondary-color) !important;
        }

        /* Responsive Layout Stacking */
        @media (max-width: 991px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
          .hero-left-content {
            text-align: center !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-left-content p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-left-content div {
            justify-content: center;
          }
          .hero-right-visual {
            order: -1; /* Place emblem ABOVE text on mobile screens */
          }
          .glowing-ring, .glowing-ring-solid {
            width: 290px !important;
            height: 290px !important;
            aspect-ratio: 1/1 !important;
            flex-shrink: 0 !important;
          }
          .logo-badge-container {
            width: 270px !important;
            height: 270px !important;
            aspect-ratio: 1/1 !important;
            flex-shrink: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .glowing-ring, .glowing-ring-solid {
            width: 230px !important;
            height: 230px !important;
            aspect-ratio: 1/1 !important;
            flex-shrink: 0 !important;
          }
          .logo-badge-container {
            width: 210px !important;
            height: 210px !important;
            aspect-ratio: 1/1 !important;
            flex-shrink: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
