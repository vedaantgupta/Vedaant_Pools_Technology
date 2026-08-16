"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultBuildItems = [
  {
    title: "Residential & Private Swimming Pools",
    category: "Swimming Pools",
    desc: "Customized residential concrete pools built to complement private villa aesthetics with integrated stairs, tanning ledges, and underwater lighting.",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800",
    highlights: ["Bespoke Villa Layouts", "LED Underwater Illumination", "Non-Slip Mosaic Coping", "Quiet Inverter Pumps"]
  },
  {
    title: "Farm House Swimming Pools",
    category: "Swimming Pools",
    desc: "Spacious country home and recreational farmhouse pools engineered with natural stone copings, deck pergolas, and heavy-duty sand filtration.",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800",
    highlights: ["Natural Stone Decks", "High-Volume Filtration", "Integrated Sunken Seating", "Low Chemical Salt Chlorination"]
  },
  {
    title: "Resort & Hotel Pools",
    category: "Swimming Pools",
    desc: "High-capacity commercial pools with vanishing edge overflows, zero-entry beach slopes, swim-up bars, and continuous turnover circulation.",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
    highlights: ["Vanishing Horizon Edges", "Commercial Surge Tanks", "Bespoke Swim-Up Bars", "Ozone Disinfection Systems"]
  },
  {
    title: "Institutional & Competition Pools",
    category: "Swimming Pools",
    desc: "FINA standard semi-Olympic and Olympic-size pools for universities, sports academies, and clubs with precision racing lane markers.",
    img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800",
    highlights: ["FINA Certified Dimensions", "Stainless Starting Blocks", "Sub-Surface Lane Markers", "High-Velocity Sand Filters"]
  },
  {
    title: "Overflow & Vanishing Edge Pools",
    category: "Swimming Pools",
    desc: "Mirror-flat water surface pools with perimeter slot channels and vanishing edge weir walls that blend into surrounding scenic landscapes.",
    img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800",
    highlights: ["Perimeter Slot Gutters", "Mirror Water Reflection", "Surge Tank Automation", "Zero Water Wastage"]
  },
  {
    title: "Water Bodies & Architectural Waterscapes",
    category: "Fountains & Water Bodies",
    desc: "Reflective water canals, natural koi ponds, stepping stone water channels, and decorative indoor/outdoor architectural water bodies.",
    img: "/artificial Waterfall Construction in the house .jpg",
    highlights: ["Natural Stone Cascades", "Biological UV Clarifiers", "Architectural Stepping Stones", "Submersible LED Mood Spots"]
  },
  {
    title: "Outdoor Water Fountains",
    category: "Fountains & Water Bodies",
    desc: "Majestic stone tier fountains, foaming spouts, bubbling geysers, and high-pressure artificial waterfalls designed for plazas and gardens.",
    img: "/Fountain construction Installation.jpg",
    highlights: ["AISI-316 Stainless Nozzles", "High-Head Submersible Pumps", "Wind Sensor Automation", "Algae Resistance Coatings"]
  },
  {
    title: "Musical & Dynamic Fountains",
    category: "Fountains & Water Bodies",
    desc: "State-of-the-art DMX-choreographed musical fountains with programmable variable speed pumps, solenoid valves, and synchronized music shows.",
    img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800",
    highlights: ["DMX Digital Controllers", "Solenoid Fast Action Jets", "Synchronized RGB Arrays", "Custom Audio Integration"]
  },
  {
    title: "Waterparks & Splash Parks",
    category: "Waterparks",
    desc: "Turnkey waterpark development including multi-lane body slides, interactive kids' splash pads, rain dance zones, and wave pool machinery.",
    img: "/Water Park CONSTRUCTION AND Development.jpg",
    highlights: ["FRP Spiral & Speed Slides", "Kids Splash Water Buckets", "Rain Dance Misting Panels", "Certified Safety Life Lines"]
  },
  {
    title: "Steam Bath Suites",
    category: "Spas & Wellness",
    desc: "Custom commercial and residential steam bath rooms featuring heavy-duty steam boilers, digital temperature controls, and aroma injection.",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
    highlights: ["Heavy-Duty Steam Boilers", "Digital Touch Control", "Aromatherapy Dispensers", "Thermal Insulated Glass"]
  },
  {
    title: "Finnish Sauna Rooms",
    category: "Spas & Wellness",
    desc: "Authentic Nordic pine and Finnish cedar wood saunas equipped with specialized volcanic rock electric heaters and humidity regulators.",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800",
    highlights: ["Imported Finnish Pine Wood", "Volcanic Peridotite Rocks", "Digital Thermostat Units", "Toughened Safety Glass"]
  },
  {
    title: "Hydrotherapy Jacuzzis & Hot Tubs",
    category: "Spas & Wellness",
    desc: "Ergonomic therapeutic whirlpools and heated hot tubs with hydro-massage water jets, air blowers, and inline titanium heaters.",
    img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800",
    highlights: ["Targeted Hydro-Massage Jets", "Titanium Inline Heaters", "Ozone Water Sanitization", "Ergonomic Body Loungers"]
  }
];

export default function WhatWeBuildPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [buildItems, setBuildItems] = useState(defaultBuildItems);

  useEffect(() => {
    const fetchDynamicBuilds = async () => {
      try {
        const res = await fetch('/api/settings?key=what_we_build_items');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.value) && data.value.length > 0) {
            setBuildItems(data.value);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic build items:', err);
      }
    };
    fetchDynamicBuilds();
  }, []);

  const categories = [
    'All',
    'Swimming Pools',
    'Fountains & Water Bodies',
    'Spas & Wellness',
    'Waterparks'
  ];

  const filteredItems = activeFilter === 'All'
    ? buildItems
    : buildItems.filter(item => item.category === activeFilter);

  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh', position: 'relative' }}>
      
      {/* ---------- Hero Section ---------- */}
      <section className="builds-hero">
        <div style={{
          position: 'absolute',
          top: '-40%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '750px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="accent-gradient" style={{
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'inline-block',
            marginBottom: '12px',
            padding: '4px 14px',
            background: 'rgba(0, 210, 255, 0.06)',
            borderRadius: '20px',
            border: '1px solid rgba(0, 210, 255, 0.15)'
          }}>
            Turnkey Construction Portfolio
          </span>
          <h1 className="text-gradient" style={{ fontSize: '44px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            What We Build & Engineer
          </h1>
          <div style={{
            width: '70px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            margin: '0 auto 20px auto',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.4)'
          }} />
          <p style={{ color: 'var(--text-gray)', maxWidth: '720px', margin: '0 auto', fontSize: '16px', lineHeight: '1.7' }}>
            Explore our specialized aquatic structures engineered across Central India — from private farm retreats and Olympic pools to musical fountains, wellness spas, and commercial waterparks.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '80px' }}>

        {/* ---------- Interactive Category Filter Strip ---------- */}
        <div className="build-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`build-filter-btn ${activeFilter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ---------- Builds Grid (Uniform Card Width, Centered) ---------- */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 380px))',
          gap: '30px',
          justifyContent: 'center',
          marginBottom: '80px'
        }}>
          {filteredItems.map((item, idx) => {
            const querySubject = encodeURIComponent(item.title);
            const queryMessage = encodeURIComponent(`Hi VPT Team, I am looking to construct a "${item.title}". Please get in touch with me to schedule a site inspection and discuss structural estimates.`);
            const inquiryUrl = `/contact?subject=${querySubject}&message=${queryMessage}`;

            return (
              <div key={idx} className="build-card">
                {/* Image Container with Badge */}
                <div className="build-img-wrapper">
                  <span className="build-badge">
                    {item.category}
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
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-white)', marginBottom: '10px', lineHeight: '1.3' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6', minHeight: '44px' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Highlights Chips */}
                  <div className="build-chips-container">
                    {item.highlights.map((chip, cIdx) => (
                      <span key={cIdx} className="build-chip">
                        ✓ {chip}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Turnkey Civil & Hydraulics
                    </span>
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

        {/* ---------- Structural Engineering Guarantee Banner ---------- */}
        <div style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-sm)',
          padding: '40px 30px',
          marginBottom: '80px',
          boxShadow: 'var(--shadow-premium)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="accent-gradient" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>
              Built For Permanence
            </span>
            <h2 className="text-gradient" style={{ fontSize: '28px', fontWeight: '700' }}>
              The Vedaant Pools Engineering Standard
            </h2>
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🏗️</div>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '8px' }}>Monolithic RCC Shells</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                Engineered with M30/M40 concrete and Fe500 grade dual-layer steel reinforcement to withstand extreme hydrostatic and ground pressures.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '16px' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🛡️</div>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '8px' }}>10-Year Water Tightness</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                Multi-layer crystalline and flexible polymer-modified waterproofing admixtures guaranteed against structural leaks.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '16px' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</div>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '8px' }}>High-Rate Hydraulics</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                Heavy-duty Schedule-80 UPVC piping and automated sand/glass filter media plants delivering crystal-clear water with minimal maintenance.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Bottom Call-To-Action ---------- */}
        <div style={{
          textAlign: 'center',
          padding: '50px 30px',
          background: 'linear-gradient(135deg, rgba(11, 94, 221, 0.15) 0%, rgba(0, 210, 255, 0.15) 100%)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-active)'
        }}>
          <h2 className="text-gradient" style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
            Have a Specific Aquatic Vision in Mind?
          </h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 24px auto', fontSize: '15px', lineHeight: '1.6' }}>
            Book a site survey with Yogendra Gupta and our technical engineering team, or calculate instant cost estimates for your pool.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-accent" style={{ padding: '12px 30px', borderRadius: 'var(--radius-sm)' }}>
              Book Site Consultation
            </Link>
            <Link href="/calculator" className="btn btn-secondary" style={{ padding: '12px 30px', borderRadius: 'var(--radius-sm)' }}>
              Estimate Cost Online
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
