"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const gallerySlides = [
  {
    id: 1,
    title: "Luxury Residential Villa Infinity Pool",
    category: "Swimming Pools",
    location: "Indore, Madhya Pradesh",
    desc: "Turnkey RCC concrete infinity pool with vanishing horizon edge, glass mosaic tiling, and automated LED mood lighting.",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800"
  },
  {
    id: 2,
    title: "DMX Choreographed Musical Fountain Show",
    category: "Fountains",
    location: "Bhopal, Madhya Pradesh",
    desc: "State-of-the-art DMX programmed musical fountain complex with stainless AISI-316 nozzles and synchronized RGB spot lights.",
    img: "/Fountain construction Installation.jpg"
  },
  {
    id: 3,
    title: "Turnkey Commercial Waterpark & Splash Complex",
    category: "Waterparks",
    location: "Ujjain, Madhya Pradesh",
    desc: "Multi-lane FRP speed slides, zero-depth kids splash play pad, and high-volume commercial wave pool machinery.",
    img: "/Water Park CONSTRUCTION AND Development.jpg"
  },
  {
    id: 4,
    title: "Country Farmhouse Pool & Sunken Deck",
    category: "Swimming Pools",
    location: "Dhar, Madhya Pradesh",
    desc: "Spacious country retreat swimming pool engineered with natural stone copings, sand filtration, and quiet inverter pumps.",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800"
  },
  {
    id: 5,
    title: "Indoor Artificial Waterfall & Koi Water Body",
    category: "Fountains & Waterscapes",
    location: "Indore, Madhya Pradesh",
    desc: "Architectural indoor stone waterfall cascade with biological UV clarifiers and submersible LED accent spots.",
    img: "/artificial Waterfall Construction in the house .jpg"
  },
  {
    id: 6,
    title: "Commercial Resort Overflow Pool & Swim-Up Bar",
    category: "Resort Pools",
    location: "Indore, Madhya Pradesh",
    desc: "High-capacity hotel overflow pool featuring perimeter slot gutters, surge tank automation, and integrated swim-up cocktail bar.",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800"
  }
];

export default function HomeGalleryShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play slide timer (every 4.5 seconds)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gallerySlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gallerySlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + gallerySlides.length) % gallerySlides.length);
  };

  // Get current 3 slides visible in slider
  const visibleSlides = [
    gallerySlides[currentIndex],
    gallerySlides[(currentIndex + 1) % gallerySlides.length],
    gallerySlides[(currentIndex + 2) % gallerySlides.length]
  ];

  return (
    <section
      className="section"
      style={{ background: 'var(--bg-navy)', borderTop: '1px solid var(--border-glass)', position: 'relative' }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container">

        {/* Unified Header */}
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
            Completed Project Portfolio
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
            Browse through our real-world concrete pool projects, fountain cascades, and commercial aquatic developments across Indore and Central India.
          </p>
        </div>

        {/* Interactive Slider ("Sider") Container */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>

          {/* Navigation Controls Arrow Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            style={{
              position: 'absolute',
              top: '50%',
              left: '-20px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(5, 19, 41, 0.9)',
              border: '1px solid rgba(0, 210, 255, 0.4)',
              color: '#00d2ff',
              fontSize: '22px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              transition: 'all 0.2s ease'
            }}
          >
            ❮
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            style={{
              position: 'absolute',
              top: '50%',
              right: '-20px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(5, 19, 41, 0.9)',
              border: '1px solid rgba(0, 210, 255, 0.4)',
              color: '#00d2ff',
              fontSize: '22px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              transition: 'all 0.2s ease'
            }}
          >
            ❯
          </button>

          {/* 3 Active Visible Slide Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {visibleSlides.map((slide, idx) => (
              <div
                key={`${slide.id}-${idx}`}
                className="glass-card"
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  border: idx === 0 ? '1px solid rgba(0, 210, 255, 0.4)' : '1px solid var(--border-glass)',
                  transform: idx === 0 ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.4)'
                }}
              >
                {/* Photo Preview Container */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={slide.img}
                    alt={slide.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {/* Category Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'rgba(5, 19, 41, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#00d2ff',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '5px 12px',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 210, 255, 0.3)'
                  }}>
                    {slide.category}
                  </span>

                  {/* Location Badge */}
                  <span style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '10px'
                  }}>
                    📍 {slide.location}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--text-white)', marginBottom: '10px', lineHeight: '1.35' }}>
                      {slide.title}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '16px' }}>
                      {slide.desc}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#00d2ff', fontWeight: '600' }}>
                      Verified Execution
                    </span>
                    <Link
                      href="/gallery"
                      style={{ fontSize: '12.5px', color: 'var(--text-white)', fontWeight: '700', textDecoration: 'none' }}
                    >
                      View Photo ➔
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Slide Indicator Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
          {gallerySlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: currentIndex === idx ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: currentIndex === idx ? '#00d2ff' : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* View Full Gallery CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/gallery"
            className="btn btn-primary"
            style={{
              padding: '13px 34px',
              fontSize: '14.5px',
              borderRadius: '24px',
              fontWeight: '700',
              boxShadow: '0 6px 20px rgba(11, 94, 221, 0.4)'
            }}
          >
            Explore Full Project Photo Gallery ➔
          </Link>
        </div>

      </div>
    </section>
  );
}
