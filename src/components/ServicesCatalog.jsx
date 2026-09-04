"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const defaultServices = [
  {
    title: "Pool Construction",
    category: "Construction",
    desc: "Heavy-duty concrete excavation, steel reinforcement, and structural shell casting.",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600"
  },
  {
    title: "3D Pool Designing",
    category: "Designing",
    desc: "Custom architectural planning, 3D CAD modeling, and hydraulic system blueprints.",
    img: "https://images.unsplash.com/photo-1503387762458-bf48293b1d30?q=80&w=600"
  },
  {
    title: "Turnkey Facility Building",
    category: "Building",
    desc: "End-to-end commercial builders for resorts, waterparks, and competition pools.",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600"
  },
  {
    title: "Filtration & Pipe Installing",
    category: "Installing",
    desc: "Precision plumbing, high-rate filtration plant, and automated chemical controls.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
  },
  {
    title: "Structural Consulting",
    category: "Consultant",
    desc: "Expert soil testing, leak investigations, waterproofing planning, and site assessments.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600"
  },
  {
    title: "Pool Equipment Supply",
    category: "Equipment",
    desc: "Direct B2B supply of heavy-duty commercial sand filters, pumps, and sanitization systems.",
    img: "https://images.unsplash.com/photo-1622322428943-e11418701a30?q=80&w=600"
  },
  {
    title: "Premium Accessories",
    category: "Accessories",
    desc: "High-quality stainless steel ladders, underwater LED lights, and custom water fountains.",
    img: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=600"
  },
  {
    title: "Boutique Pool Maintenance",
    category: "Maintenance",
    desc: "Annual maintenance contracts (AMC), water balancing, sanitization, and deep cleaning.",
    img: "https://images.unsplash.com/photo-1500333917452-484122b8b9e0?q=80&w=600"
  },
  {
    title: "Modern Pool Renovation",
    category: "Renovation",
    desc: "Complete mosaic retiling, structural leak-proofing, and mechanical system restoration.",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600"
  }
];

export default function ServicesCatalog() {
  const [services, setServices] = useState(defaultServices);
  const [isGridView, setIsGridView] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchDynamicServices = async () => {
      try {
        const res = await fetch('/api/settings?key=services_items');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.value) && data.value.length > 0) {
            setServices(data.value);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic services in catalog:', err);
      }
    };
    fetchDynamicServices();
  }, []);

  // Slide navigation with loop-around
  const slideLeft = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft <= 10) {
        sliderRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: -360, behavior: 'smooth' });
      }
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: 360, behavior: 'smooth' });
      }
    }
  };

  // Auto-move slider every 3 seconds (pauses on hover and when in full grid view)
  useEffect(() => {
    if (!isAutoPlaying || isGridView) return;
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: 360, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isGridView, services]);

  return (
    <section
      className="section"
      style={{ background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-navy) 100%)', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Decorative background glows */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(0, 210, 255, 0.05)',
        filter: 'blur(90px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'rgba(11, 94, 221, 0.06)',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header (Center Aligned) */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary-color)', boxShadow: '0 0 8px var(--secondary-color)' }} />
            <span className="accent-gradient" style={{
              fontSize: '12.5px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              TURNKEY AQUATIC ENGINEERING
            </span>
          </div>

          <h2 className="text-gradient" style={{ fontSize: '40px', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
            Our Turnkey Services
          </h2>
          <div style={{
            width: '70px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            margin: '0 auto 16px auto',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.4)'
          }} />
          <p style={{ color: 'var(--text-gray)', maxWidth: '680px', margin: '0 auto', fontSize: '15.5px', lineHeight: '1.6' }}>
            From 3D architectural blueprints and monolithic concrete casting to high-rate filtration plant setups and leak-proof waterproofing.
          </p>
        </div>

        {/* Carousel / Slider Container with Middle Floating Navigation Buttons */}
        <div style={{ position: 'relative', margin: '0 -10px' }}>
          
          {/* Middle Left Arrow Button (visible in slider mode) */}
          {!isGridView && (
            <button
              onClick={slideLeft}
              aria-label="Slide Left"
              style={{
                position: 'absolute',
                top: '45%',
                left: '-16px',
                transform: 'translateY(-50%)',
                zIndex: 15,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(5, 19, 41, 0.92)',
                border: '1.5px solid var(--secondary-color)',
                color: 'var(--secondary-color)',
                fontSize: '22px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 210, 255, 0.3)',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.background = 'var(--secondary-color)';
                e.currentTarget.style.color = '#051329';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.background = 'rgba(5, 19, 41, 0.92)';
                e.currentTarget.style.color = 'var(--secondary-color)';
              }}
            >
              &#10094;
            </button>
          )}

          {/* Middle Right Arrow Button (visible in slider mode) */}
          {!isGridView && (
            <button
              onClick={slideRight}
              aria-label="Slide Right"
              style={{
                position: 'absolute',
                top: '45%',
                right: '-16px',
                transform: 'translateY(-50%)',
                zIndex: 15,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(5, 19, 41, 0.92)',
                border: '1.5px solid var(--secondary-color)',
                color: 'var(--secondary-color)',
                fontSize: '22px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 210, 255, 0.3)',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.background = 'var(--secondary-color)';
                e.currentTarget.style.color = '#051329';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.background = 'rgba(5, 19, 41, 0.92)';
                e.currentTarget.style.color = 'var(--secondary-color)';
              }}
            >
              &#10095;
            </button>
          )}

          {/* Cards Track: Slider View (Default) or Expanded Full Grid */}
          <div
            ref={sliderRef}
            style={
              isGridView
                ? {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '24px',
                    padding: '10px',
                    transition: 'all 0.3s ease'
                  }
                : {
                    display: 'flex',
                    gap: '24px',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    padding: '10px 14px 20px 14px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    scrollBehavior: 'smooth'
                  }
            }
          >
            {services.map((service, idx) => {
              const querySubject = encodeURIComponent(service.title);
              const queryMessage = encodeURIComponent(`Hi VPT Team, I am looking to get a price quote and site inspection for the "${service.title}" service. Please contact me.`);
              const inquiryUrl = `/contact?subject=${querySubject}&message=${queryMessage}`;

              return (
                <div
                  key={idx}
                  className="service-card-premium glass-card"
                  style={{
                    ...(isGridView
                      ? { width: '100%' }
                      : { minWidth: '320px', maxWidth: '350px', flex: '0 0 auto', scrollSnapAlign: 'start' }),
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  {/* Image Container with Badge */}
                  <div style={{ height: '210px', position: 'relative', overflow: 'hidden', background: '#051329' }}>
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      zIndex: 3,
                      background: 'rgba(5, 19, 41, 0.85)',
                      border: '1px solid rgba(0, 210, 255, 0.4)',
                      color: 'var(--secondary-color)',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {service.category}
                    </span>
                    <img
                      src={service.img}
                      alt={service.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      loading="lazy"
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--text-white)', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                        {service.title}
                      </h3>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6', margin: '0 0 18px 0', minHeight: '44px' }}>
                        {service.desc}
                      </p>
                    </div>

                    {/* Action Section */}
                    <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Estimate</span>
                        <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--accent-color)' }}>Request Quote</span>
                      </div>

                      <Link
                        href={inquiryUrl}
                        className="btn btn-primary"
                        style={{ padding: '8px 18px', fontSize: '13px', borderRadius: 'var(--radius-sm)' }}
                      >
                        Enquire Now &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Center Options: View More / View Less Toggle + Services Page Link */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginTop: '45px',
          flexWrap: 'wrap'
        }}>
          {/* View More / View Less Toggle Button */}
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="btn btn-secondary"
            style={{
              padding: '13px 28px',
              fontSize: '14.5px',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {isGridView ? '▲ View Less (Slider View)' : `▼ View More Services (${services.length}+ All Services)`}
          </button>

          {/* Dedicated Services Page Link */}
          <Link
            href="/services"
            className="btn btn-primary"
            style={{
              padding: '13px 32px',
              fontSize: '14.5px',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '700'
            }}
          >
            Explore Full Services Page &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
