"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Premium project seeds matching gallery items
const defaultProjects = [
  {
    _id: 'seed-1',
    title: "Luxury Residential Villa Infinity Pool",
    location: "Indore, Madhya Pradesh",
    category: "Turnkey Pools",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200",
    media: [
      { url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200", mediaType: "image" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200", mediaType: "image" },
      { url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200", mediaType: "image" }
    ]
  },
  {
    _id: 'seed-2',
    title: "Commercial Waterpark & Multi-Lane Slides",
    location: "Ujjain, Madhya Pradesh",
    category: "Waterparks",
    imageUrl: "/Water Park CONSTRUCTION AND Development.jpg",
    media: [
      { url: "/Water Park CONSTRUCTION AND Development.jpg", mediaType: "image" },
      { url: "https://www.w3schools.com/html/mov_bbb.mp4", mediaType: "video" }
    ]
  },
  {
    _id: 'seed-3',
    title: "DMX Musical Fountain & Laser Water Show",
    location: "Bhopal, Madhya Pradesh",
    category: "Fountains",
    imageUrl: "/Fountain construction Installation.jpg",
    media: [
      { url: "/Fountain construction Installation.jpg", mediaType: "image" },
      { url: "https://www.w3schools.com/html/mov_bbb.mp4", mediaType: "video" }
    ]
  },
  {
    _id: 'seed-4',
    title: "Country Farmhouse Pool & Sunken Deck",
    location: "Dhar, Madhya Pradesh",
    category: "Turnkey Pools",
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200",
    media: [
      { url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200", mediaType: "image" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200", mediaType: "image" }
    ]
  },
  {
    _id: 'seed-5',
    title: "Indoor Artificial Waterfall & Koi Water Body",
    location: "Indore, Madhya Pradesh",
    category: "Water Features & Fountains",
    imageUrl: "/artificial Waterfall Construction in the house .jpg",
    media: [
      { url: "/artificial Waterfall Construction in the house .jpg", mediaType: "image" },
      { url: "https://www.w3schools.com/html/mov_bbb.mp4", mediaType: "video" }
    ]
  },
  {
    _id: 'seed-6',
    title: "Automated Commercial Steam Suite & Spa",
    location: "Indore, Madhya Pradesh",
    category: "Wellness & Spa",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
    media: [
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200", mediaType: "image" }
    ]
  },
  {
    _id: 'seed-7',
    title: "Turnkey Pool Concrete Shell Construction",
    location: "Indore, Madhya Pradesh",
    category: "Construction Phase",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1200",
    media: [
      { url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1200", mediaType: "image" }
    ]
  },
  {
    _id: 'seed-8',
    title: "Resort Overflow Pool & Swim-Up Bar",
    location: "Indore, Madhya Pradesh",
    category: "Turnkey Pools",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
    media: [
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200", mediaType: "image" }
    ]
  }
];

export default function HomeGalleryShowcase({ initialProjects = [] }) {
  const [projects, setProjects] = useState(
    initialProjects && initialProjects.length > 0 ? initialProjects : defaultProjects
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Lightbox Modal State
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);

  // Touch Swipe Handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive cardsToShow adjustment
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setCardsToShow(1);
        } else if (window.innerWidth < 1024) {
          setCardsToShow(2);
        } else {
          setCardsToShow(3);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch projects client-side if needed
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!initialProjects || initialProjects.length === 0) {
          const res = await fetch('/api/projects');
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setProjects(data);
            }
          }
        }
      } catch (err) {
        console.error('Error loading projects:', err);
      }
    };
    fetchProjects();
  }, [initialProjects]);

  const maxIndex = Math.max(0, projects.length - cardsToShow);

  // Auto-play timer (every 3 seconds)
  useEffect(() => {
    if (!isAutoPlaying || maxIndex === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, projects.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      handlePrev();
    }
  };

  // Visual media array helper for lightbox
  const getActiveProjectMedia = () => {
    if (!selectedProject) return [];
    if (selectedProject.media && selectedProject.media.length > 0) {
      return selectedProject.media;
    }
    const list = [];
    if (selectedProject.imageUrl) list.push({ url: selectedProject.imageUrl, mediaType: 'image' });
    if (selectedProject.videoUrl) list.push({ url: selectedProject.videoUrl, mediaType: 'video' });
    return list;
  };

  const activeMediaList = getActiveProjectMedia();
  const currentMedia = activeMediaList[activeMediaIdx];

  const handlePrevMedia = (e) => {
    e.stopPropagation();
    if (activeMediaList.length <= 1) return;
    setActiveMediaIdx((prev) => (prev === 0 ? activeMediaList.length - 1 : prev - 1));
  };

  const handleNextMedia = (e) => {
    e.stopPropagation();
    if (activeMediaList.length <= 1) return;
    setActiveMediaIdx((prev) => (prev === activeMediaList.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') setSelectedProject(null);
      if (e.key === 'ArrowLeft') handlePrevMedia(e);
      if (e.key === 'ArrowRight') handleNextMedia(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, activeMediaIdx]);

  return (
    <section
      className="section"
      style={{
        background: 'var(--bg-navy)',
        borderTop: '1px solid var(--border-glass)',
        position: 'relative',
        padding: '70px 0 85px 0',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container">

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#00d2ff',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'inline-block',
            marginBottom: '12px',
            padding: '6px 16px',
            background: 'rgba(0, 210, 255, 0.1)',
            borderRadius: '20px',
            border: '1px solid rgba(0, 210, 255, 0.25)'
          }}>
            REAL-WORLD EXECUTIONS
          </span>
          <h2 className="text-gradient" style={{ fontSize: '38px', fontWeight: '800', marginBottom: '14px', letterSpacing: '-0.02em' }}>
            Completed Projects & Construction Works
          </h2>
          <div style={{
            width: '70px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            margin: '0 auto 18px auto',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.4)'
          }} />
          <p style={{ color: 'var(--text-gray)', maxWidth: '720px', margin: '0 auto', fontSize: '15.5px', lineHeight: '1.7' }}>
            Explore verified photos and videos of our swimming pools, musical fountains, waterparks, and wellness spa installations.
          </p>
        </div>

        {/* Single Row Slider Wrapper with Side Controls */}
        <div
          style={{ position: 'relative', marginBottom: '32px' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            style={{
              position: 'absolute',
              top: '50%',
              left: '-18px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(5, 19, 41, 0.92)',
              border: '1px solid rgba(0, 210, 255, 0.4)',
              color: '#00d2ff',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(8px)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#00d2ff';
              e.currentTarget.style.color = '#030a16';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 210, 255, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(5, 19, 41, 0.92)';
              e.currentTarget.style.color = '#00d2ff';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.6)';
            }}
          >
            ❮
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            style={{
              position: 'absolute',
              top: '50%',
              right: '-18px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(5, 19, 41, 0.92)',
              border: '1px solid rgba(0, 210, 255, 0.4)',
              color: '#00d2ff',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(8px)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#00d2ff';
              e.currentTarget.style.color = '#030a16';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 210, 255, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(5, 19, 41, 0.92)';
              e.currentTarget.style.color = '#00d2ff';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.6)';
            }}
          >
            ❯
          </button>

          {/* Smooth Carousel Overflow Window */}
          <div style={{ overflow: 'hidden', borderRadius: '10px', padding: '6px 0' }}>
            {/* Sliding Track */}
            <div
              style={{
                display: 'flex',
                transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`
              }}
            >
              {projects.map((proj, idx) => {
                const mediaList = proj.media && proj.media.length > 0 
                  ? proj.media 
                  : [{ url: proj.imageUrl, mediaType: 'image' }, { url: proj.videoUrl, mediaType: 'video' }].filter((m) => m.url);
                const assetCount = mediaList.length;
                const hasVideo = mediaList.some((m) => m.mediaType === 'video');
                const coverPath = proj.imageUrl || (mediaList.length > 0 ? mediaList[0].url : 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200');

                return (
                  <div
                    key={proj._id || idx}
                    style={{
                      flex: `0 0 ${100 / cardsToShow}%`,
                      padding: '0 12px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Gallery Card */}
                    <div
                      className="glass-card"
                      onClick={() => {
                        setSelectedProject(proj);
                        setActiveMediaIdx(0);
                      }}
                      style={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '330px',
                        boxShadow: 'var(--shadow-premium)',
                        border: '1px solid var(--border-glass)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = 'rgba(0, 210, 255, 0.45)';
                        e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 210, 255, 0.15)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'var(--border-glass)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                      }}
                    >
                      {/* Image Cover Container */}
                      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                        <img
                          src={coverPath}
                          alt={proj.title || "Showcase Project"}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                        />

                        {/* Category Badge Top-Left */}
                        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px', zIndex: 2 }}>
                          <span style={{
                            background: 'rgba(5, 19, 41, 0.88)',
                            border: '1px solid rgba(0, 210, 255, 0.3)',
                            backdropFilter: 'blur(8px)',
                            color: '#00d2ff',
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '4px 10px',
                            borderRadius: '20px'
                          }}>
                            {proj.category || 'Turnkey Pools'}
                          </span>
                        </div>

                        {/* Media Count Badge Top-Right */}
                        {assetCount > 1 && (
                          <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2 }}>
                            <span style={{
                              background: 'rgba(5, 19, 41, 0.88)',
                              border: '1px solid var(--border-glass)',
                              backdropFilter: 'blur(8px)',
                              color: '#fff',
                              fontSize: '11px',
                              fontWeight: '600',
                              padding: '4px 10px',
                              borderRadius: '20px'
                            }}>
                              📁 {assetCount} Media
                            </span>
                          </div>
                        )}

                        {/* Video Play Overlay */}
                        {hasVideo && (
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '54px',
                            height: '54px',
                            borderRadius: '50%',
                            background: 'rgba(0, 210, 255, 0.25)',
                            border: '2px solid var(--secondary-color)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 22px rgba(0, 210, 255, 0.5)',
                            zIndex: 2
                          }}>
                            <span style={{ fontSize: '18px', color: '#fff', marginLeft: '4px' }}>▶</span>
                          </div>
                        )}

                        {/* Hover Information Plate */}
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(3, 10, 22, 0.96) 0%, rgba(3, 10, 22, 0.7) 60%, rgba(3, 10, 22, 0) 100%)',
                          padding: '20px 22px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          height: '54%'
                        }}>
                          <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            📍 {proj.location || 'Indore, MP'}
                          </span>
                          <h3 style={{ fontSize: '16px', marginTop: '6px', color: '#fff', fontWeight: '700', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {proj.title || 'Client Project'}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Slide Indicator Dots */}
        {maxIndex > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '36px' }}>
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: currentIndex === idx ? '28px' : '10px',
                  height: '8px',
                  borderRadius: '4px',
                  background: currentIndex === idx ? '#00d2ff' : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: currentIndex === idx ? '0 0 10px rgba(0, 210, 255, 0.5)' : 'none'
                }}
              />
            ))}
          </div>
        )}

        {/* View Full Gallery CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/gallery"
            className="btn btn-primary"
            style={{
              padding: '14px 38px',
              fontSize: '14.5px',
              borderRadius: '30px',
              fontWeight: '700',
              boxShadow: '0 6px 24px rgba(11, 94, 221, 0.45)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>Explore Complete Photo & Video Gallery</span>
            <span>➔</span>
          </Link>
        </div>

        {/* Lightbox / Clean Fullscreen Image & Video Slideshow Modal */}
        {selectedProject && currentMedia && (
          <div
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(3, 10, 22, 0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Centered Media Frame */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '85vw',
                height: '65vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                marginBottom: '20px'
              }}
            >
              {currentMedia.mediaType === 'video' ? (
                <video
                  key={currentMedia.url}
                  src={currentMedia.url}
                  controls
                  autoPlay
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderRadius: '12px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    border: '1px solid var(--border-glass)'
                  }}
                />
              ) : (
                <img
                  src={currentMedia.url}
                  alt={selectedProject.title || "Project visual"}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    border: '1px solid var(--border-glass)'
                  }}
                />
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0px',
                  border: 'none',
                  background: 'none',
                  color: '#94a3b8',
                  fontSize: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s',
                  outline: 'none'
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                ✕
              </button>

              {/* Navigation Arrows */}
              {activeMediaList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevMedia}
                    style={{
                      position: 'absolute',
                      left: '-60px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--secondary-color)',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      fontSize: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backdropFilter: 'blur(5px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.borderColor = 'var(--secondary-color)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNextMedia}
                    style={{
                      position: 'absolute',
                      right: '-60px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--secondary-color)',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      fontSize: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backdropFilter: 'blur(5px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.borderColor = 'var(--secondary-color)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption & Thumbnails */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '600px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', color: '#fff', fontWeight: '700' }}>
                  {selectedProject.title || "Untitled Project"}
                </h3>
                <span style={{ fontSize: '13px', color: 'var(--secondary-color)' }}>
                  📍 {selectedProject.location || "General Showcase"} • {selectedProject.category || "Turnkey Pools"} (Asset {activeMediaIdx + 1} of {activeMediaList.length})
                </span>
              </div>

              {/* Thumbnails Row */}
              {activeMediaList.length > 1 && (
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-glass)',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  maxWidth: '100%',
                  overflowX: 'auto'
                }}>
                  {activeMediaList.map((media, idx) => {
                    const isSelected = activeMediaIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveMediaIdx(idx)}
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: isSelected ? '2px solid var(--secondary-color)' : '1px solid var(--border-glass)',
                          boxShadow: isSelected ? '0 0 10px rgba(0, 210, 255, 0.4)' : 'none',
                          transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                          transition: 'all 0.2s',
                          position: 'relative',
                          flexShrink: 0
                        }}
                      >
                        {media.mediaType === 'video' ? (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030a16', fontSize: '14px' }}>
                            <span>🎥</span>
                          </div>
                        ) : (
                          <img src={media.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="thumb" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
