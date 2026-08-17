"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultAbout = {
  founderName: "Yogendra Gupta",
  founderRole: "Founder & Managing Director",
  founderImage: "/owner.jpg",
  overviewImage: "/Construction of Swimming Pools (1).jpg",
  founderBio: "Under the visionary leadership of Yogendra Gupta, Vedaant Pools Technology has established itself as the most reliable aquatic engineering contractor and equipment distributor across Indore and Central India."
};

export default function AboutQuickSection() {
  const [aboutData, setAboutData] = useState(defaultAbout);

  useEffect(() => {
    const fetchDynamicAbout = async () => {
      try {
        const res = await fetch('/api/settings?key=about_page_content');
        if (res.ok) {
          const data = await res.json();
          if (data && data.value) {
            setAboutData(prev => ({ ...prev, ...data.value }));
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic about data:', err);
      }
    };
    fetchDynamicAbout();
  }, []);

  const stats = [
    {
      metric: "2018",
      metricSub: "Established",
      desc: "Founded in Indore as a registered Sole Proprietorship specialized in turnkey swimming pool design, mechanical plant installation, and structural waterproofing."
    },
    {
      metric: "15+ Yrs",
      metricSub: "Domain Mastery",
      desc: "Deep technical stewardship by Yogendra Gupta, overseeing site excavations, Fe500 dual-layer steel inspections, and Schedule-80 UPVC hydraulics."
    },
    {
      metric: "10-Yr",
      metricSub: "Waterproofing Guarantee",
      desc: "High-grade M30/M40 concrete cast with monolithic crystalline polymer admixtures to ensure zero water leakage and structural permanence."
    },
    {
      metric: "5.0 ★",
      metricSub: "Trade Sentiment",
      desc: "Spotless local execution rating across private villas, luxury farmhouses, resort hotels, institutions, and commercial water amusement parks."
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-deep)', position: 'relative', borderBottom: '1px solid var(--border-glass)', padding: '90px 0' }}>
      
      {/* Background Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '2%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 210, 255, 0.05) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Main 2-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 380px) 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Executive Founder Profile Card */}
          <div>
            <div style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}>
              <div style={{
                height: '440px',
                background: '#040d1c',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src={aboutData.founderImage || "/owner.jpg"}
                  alt={`${aboutData.founderName || "Yogendra Gupta"} - Founder & Owner`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    transition: 'transform 0.6s ease'
                  }}
                />
                
                {/* Overlay Vignette */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(3, 10, 22, 0.95) 0%, rgba(3, 10, 22, 0.3) 50%, transparent 100%)',
                  pointerEvents: 'none'
                }} />

                {/* Nameplate & Credentials Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 20px 20px',
                  textAlign: 'center',
                  zIndex: 3
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '3px 12px',
                    borderRadius: '20px',
                    background: 'rgba(0, 210, 255, 0.1)',
                    border: '1px solid rgba(0, 210, 255, 0.3)',
                    color: 'var(--secondary-color)',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '8px'
                  }}>
                    Executive Leadership
                  </div>

                  <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-white)', margin: '0 0 4px 0', letterSpacing: '-0.01em' }}>
                    Mr. {aboutData.founderName || "Yogendra Gupta"}
                  </h3>
                  
                  <span style={{ fontSize: '13px', color: 'var(--secondary-color)', fontWeight: '600' }}>
                    {aboutData.founderRole || "Founder & Managing Director"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Badge Under Card */}
            <div style={{
              marginTop: '16px',
              padding: '12px 18px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12.5px'
            }}>
              <span style={{ color: 'var(--text-gray)' }}>📍 Indore, Madhya Pradesh</span>
              <span style={{ color: 'var(--accent-color)', fontWeight: '700' }}>GSTIN Verified</span>
            </div>
          </div>

          {/* Right Column: Organization Profile & Sleek Stats */}
          <div>
            
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary-color)', boxShadow: '0 0 8px var(--secondary-color)' }} />
                <span className="accent-gradient" style={{
                  fontSize: '13px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '2.5px'
                }}>
                  ABOUT OUR ORGANIZATION
                </span>
              </div>

              <h2 className="text-gradient" style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 14px 0', lineHeight: '1.25', letterSpacing: '-0.02em' }}>
                Best Swimming Pools Construction and Aquatic Engineering in Central India
              </h2>
              
              <div style={{
                width: '70px',
                height: '4px',
                background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                marginBottom: '18px',
                borderRadius: '2px',
                boxShadow: '0 0 10px rgba(0, 210, 255, 0.4)'
              }} />
              
              <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.75', margin: 0 }}>
                Established in <strong>2018</strong> in Indore, <strong>Vedaant Pools Technology</strong> has emerged as Central India's benchmark turnkey contractor, manufacturer, and equipment distributor for luxury residential pools, fountains, wellness spas, and commercial waterparks.
              </p>
            </div>

            {/* Sleek Horizontal Stats Rows (Inspired by Reference 2) */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '36px' }}>
              {stats.map((st, idx) => (
                <div key={idx} style={{
                  display: 'grid',
                  gridTemplateColumns: '130px 1fr',
                  gap: '24px',
                  alignItems: 'baseline',
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div>
                    <span style={{ fontSize: '28px', fontWeight: '900', color: 'var(--secondary-color)', display: 'block', lineHeight: '1', letterSpacing: '-0.02em' }}>
                      {st.metric}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px', marginTop: '4px', display: 'block' }}>
                      {st.metricSub}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6', margin: 0 }}>
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                href="/about"
                className="btn btn-primary"
                style={{
                  padding: '13px 32px',
                  fontSize: '14px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Read More About Us &rarr;
              </Link>
              
              <Link
                href="/contact"
                className="btn btn-secondary"
                style={{
                  padding: '13px 28px',
                  fontSize: '14px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Schedule Site Inspection
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
