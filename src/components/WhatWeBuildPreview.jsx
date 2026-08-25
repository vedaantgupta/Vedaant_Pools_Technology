"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultMainCategories = [
  {
    title: "Custom Swimming Pools",
    categoryKey: "Swimming Pools",
    desc: "Turnkey residential villa pools, farmhouse retreats, resort infinity edges, and FINA-compliant competition pools.",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800",
    types: "Residential, Farmhouse, Resort & Competition",
    highlights: ["Monolithic M30/M40 Shells", "10-Year Water Tightness", "Schedule-80 Hydraulics"]
  },
  {
    title: "Fountains & Water Bodies",
    categoryKey: "Fountains & Water Bodies",
    desc: "Outdoor stone cascades, architectural reflective ponds, natural koi canals, and DMX-choreographed musical fountains.",
    img: "/Fountain construction Installation.jpg",
    types: "Architectural, Cascades & DMX Musical",
    highlights: ["AISI-316 Stainless Nozzles", "DMX Light & Sound Sync", "Biological UV Ponds"]
  },
  {
    title: "Waterparks & Splash Parks",
    categoryKey: "Waterparks",
    desc: "Turnkey commercial water amusement complexes, multi-lane body slides, interactive kids' splash pads, and wave pools.",
    img: "/Water Park CONSTRUCTION AND Development.jpg",
    types: "Multi-Lane Slides, Splash Pads & Wave Pools",
    highlights: ["FRP Spiral & Speed Flumes", "Zero-Depth Splash Play", "Commercial Wave Machines"]
  }
];

export default function WhatWeBuildPreview() {
  const [categories, setCategories] = useState(defaultMainCategories);

  useEffect(() => {
    const fetchDynamicBuilds = async () => {
      try {
        const res = await fetch('/api/settings?key=what_we_build_items');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.value) && data.value.length > 0) {
            const builds = data.value;
            const poolItem = builds.find(b => b.category === 'Swimming Pools') || builds[0];
            const fountainItem = builds.find(b => b.category === 'Fountains & Water Bodies') || builds[5] || builds[6];
            const waterparkItem = builds.find(b => b.category === 'Waterparks') || builds[8];

            setCategories([
              {
                ...defaultMainCategories[0],
                img: poolItem?.img || defaultMainCategories[0].img
              },
              {
                ...defaultMainCategories[1],
                img: fountainItem?.img || defaultMainCategories[1].img
              },
              {
                ...defaultMainCategories[2],
                img: waterparkItem?.img || defaultMainCategories[2].img
              }
            ]);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic builds preview:', err);
      }
    };
    fetchDynamicBuilds();
  }, []);

  return (
    <section className="section" style={{ background: 'var(--bg-deep)', position: 'relative', borderTop: '1px solid var(--border-glass)' }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0, 210, 255, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
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
            TURNKEY CONSTRUCTION PORTFOLIO
          </span>
          <h2 className="text-gradient" style={{ fontSize: '38px', fontWeight: '800', margin: '0 0 14px 0', letterSpacing: '-0.02em' }}>
            What We Build
          </h2>
          <div style={{
            width: '70px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            margin: '0 auto',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.4)'
          }} />
          <p style={{ color: 'var(--text-gray)', maxWidth: '720px', margin: '18px auto 0 auto', fontSize: '15.5px', lineHeight: '1.7' }}>
            Indore's premier turnkey contractor for reinforced concrete swimming pools, DMX musical fountains, waterscapes, and commercial waterpark developments across Central India.
          </p>
        </div>

        {/* 3 Main Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          {categories.map((item, idx) => (
            <div key={idx} className="build-card">
              {/* Image Preview */}
              <div className="build-img-wrapper">
                <span className="build-badge">
                  {item.categoryKey}
                </span>
                <img
                  src={item.img}
                  alt={item.title}
                  className="build-img"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="build-card-body">
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    {item.types}
                  </span>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-white)', marginBottom: '10px', lineHeight: '1.3' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6', minHeight: '44px' }}>
                    {item.desc}
                  </p>
                </div>

                {/* Highlight Chips */}
                <div className="build-chips-container" style={{ margin: '14px 0 20px 0' }}>
                  {item.highlights.map((chip, cIdx) => (
                    <span key={cIdx} className="build-chip">
                      ✓ {chip}
                    </span>
                  ))}
                </div>

                {/* Card Action */}
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Turnkey Engineering
                  </span>
                  <Link
                    href="/what-we-build"
                    className="btn btn-primary"
                    style={{ padding: '8px 18px', fontSize: '13px', borderRadius: 'var(--radius-sm)' }}
                  >
                    Explore Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Center "View All" Button */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/what-we-build"
            className="btn btn-secondary"
            style={{
              padding: '13px 36px',
              fontSize: '14px',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            View All Builds & Details (12+ Categories) &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
