"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultAbout = {
  founderName: "Yogendra Gupta",
  founderRole: "Founder & Managing Director",
  founderImage: "/owner.jpg",
  overviewImage: "/Construction of Swimming Pools (1).jpg",
  founderBio: "Under the visionary leadership of Yogendra Gupta, Vedaant Pools Technology has established itself as the most reliable aquatic partner in Central India. Mr. Gupta brings deep technical expertise in structural concrete behaviour, soil load bearing, and high-pressure pool hydraulics."
};

export default function AboutPage() {
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

  const coreValues = [
    {
      title: "Integrity",
      desc: "We maintain absolute transparency, complete GST compliance (23AGZPG1057G1ZD), and standard dispatch warranties in all residential and commercial contracts.",
      icon: "🤝"
    },
    {
      title: "Commitment",
      desc: "From initial 3D drawing approval to final hydrostatic water testing, we deliver projects on time, on budget, and backed by a 10-year waterproofing guarantee.",
      icon: "⏱️"
    },
    {
      title: "Efficiency",
      desc: "Precision hydraulic calculations, schedule-80 UPVC piping, and high-rate sand filtration plants ensure crystal-clear water with minimal operational costs.",
      icon: "⚙️"
    }
  ];

  const corporateFacts = [
    { label: "Company Name", value: "Vedaant Pools Technology" },
    { label: "Founder & Managing Director", value: "Yogendra Gupta" },
    { label: "Headquarters Address", value: "House No. L-1, Vandana Vihar, Bhangarh Road, Indore, MP - 452006, India" },
    { label: "Nature of Business", value: "Manufacturer, Retailer, Works Contractor & Service Provider" },
    { label: "GSTIN Registry", value: "23AGZPG1057G1ZD (Madhya Pradesh)" },
    { label: "Year of Establishment", value: "2018 (Leadership with 15+ Yrs Domain Experience)" },
    { label: "Primary Service Area", value: "Indore, Madhya Pradesh & Central India" },
    { label: "Contact Numbers", value: "+91-9479940047 / +91-9827841047" },
    { label: "Official Email", value: "vedaantpools@gmail.com" },
    { label: "Office Address", value: "House No. L-1, Vandana Vihar, Bhangarh Road, Indore, MP" },
    { label: "Public Sentiment", value: "5.0 ★ Local Track Record on Industry Portals" }
  ];

  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh', position: 'relative' }}>
      
      {/* ---------- Hero Section ---------- */}
      <section className="about-hero">
        <div style={{
          position: 'absolute',
          top: '-40%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="accent-gradient" style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#00d2ff',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'inline-block',
            marginBottom: '12px',
            padding: '6px 16px',
            background: 'rgba(0, 210, 255, 0.12)',
            borderRadius: '20px',
            border: '1px solid rgba(0, 210, 255, 0.3)'
          }}>
            Company Profile & Leadership
          </span>
          <h1 className="text-gradient" style={{ fontSize: '44px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            About Vedaant Pools Technology
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
            Indore's premier turnkey aquatic engineering contractor, manufacturer, and wholesale distributor. Designing structural concrete swimming pools, waterparks, and filtration systems since 2018.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '80px' }}>

        {/* ---------- Key Metric Stat Strip ---------- */}
        <div className="about-stat-strip">
          <div className="about-stat-item">
            <div className="about-stat-number">2018</div>
            <div className="about-stat-label">Established</div>
            <div className="about-stat-subtext">Registered in Indore, MP</div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-number">15+ Yrs</div>
            <div className="about-stat-label">Domain Mastery</div>
            <div className="about-stat-subtext">Aquatic Hydraulics & Civil RCC</div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-number">5.0 ★</div>
            <div className="about-stat-label">Trade Rating</div>
            <div className="about-stat-subtext">Verified Client Satisfaction</div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-number">10-Yr</div>
            <div className="about-stat-label">Guarantee</div>
            <div className="about-stat-subtext">Structural Waterproofing</div>
          </div>
        </div>

        {/* ---------- Company Overview Section ---------- */}
        <div className="grid-2" style={{ alignItems: 'center', gap: '50px', marginBottom: '80px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              border: '1px solid var(--border-glass)',
              boxShadow: 'var(--shadow-premium)',
              aspectRatio: '1.3/1',
              background: '#051329'
            }}>
              <img
                src={aboutData.overviewImage || "/Construction of Swimming Pools (1).jpg"}
                alt="Vedaant Pools Construction"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease'
                }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-14px',
              right: '-14px',
              background: 'rgba(5, 19, 41, 0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--secondary-color)',
              padding: '12px 20px',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase', display: 'block' }}>Specialization</span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--secondary-color)' }}>Turnkey Civil & Hydraulics</span>
            </div>
          </div>

          <div>
            <span className="accent-gradient" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              The Benchmark in Luxury Pool Construction
            </span>
            <h2 style={{ fontSize: '32px', color: 'var(--text-white)', fontWeight: '700', marginBottom: '18px', lineHeight: '1.3' }}>
              Engineering Excellence Across Central India
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.8', marginBottom: '14px' }}>
              <strong>Vedaant Pools Technology</strong> was established in <strong>2018</strong> by founder and owner <strong>{aboutData.founderName || "Yogendra Gupta"}</strong>. Built upon over a decade of hands-on civil and hydraulics expertise, the firm operates as a registered Sole Proprietorship specialized in turnkey swimming pool design, mechanical filtration plant installations, and structural leak-proofing.
            </p>
            <p style={{ color: 'var(--text-gray)', fontSize: '14.5px', lineHeight: '1.8', marginBottom: '14px' }}>
              As both a works contractor and a wholesale equipment distributor, we serve resorts, educational institutes, residential housing societies, and luxury private farmhouses across Indore and neighboring regions. We retail commercial-grade pool hardware, pumps, robotic cleaners, LED illumination systems, and spa equipment directly via regional supply chains and trade networks.
            </p>
            <p style={{ color: 'var(--text-gray)', fontSize: '14.5px', lineHeight: '1.8' }}>
              With a spotless <strong>5.0-star local execution track record</strong>, we maintain a client-first philosophy: ensuring rigorous quality testing at every phase from excavation to water chemistry balancing.
            </p>
          </div>
        </div>

        {/* ---------- Founder & Leadership Section ---------- */}
        <div className="founder-card">
          <div className="founder-image-wrapper">
            <img
              src={aboutData.founderImage || "/owner.jpg"}
              alt={`${aboutData.founderName || "Yogendra Gupta"} - Founder & Owner`}
              className="founder-image"
            />
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              background: 'linear-gradient(to top, rgba(5, 19, 41, 0.95), transparent)',
              padding: '20px 16px 12px',
              textAlign: 'center'
            }}>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', margin: 0 }}>{aboutData.founderName || "Yogendra Gupta"}</h4>
              <span style={{ fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '600' }}>{aboutData.founderRole || "Founder & Managing Director"}</span>
            </div>
          </div>

          <div>
            <span className="accent-gradient" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              Leadership Profile
            </span>
            <h2 style={{ fontSize: '28px', color: 'var(--text-white)', fontWeight: '700', marginBottom: '16px' }}>
              Hands-On Technical Stewardship
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '14.5px', lineHeight: '1.8', marginBottom: '14px' }}>
              {aboutData.founderBio || "Under the visionary leadership of Yogendra Gupta, Vedaant Pools Technology has established itself as the most reliable aquatic partner in Central India. Mr. Gupta brings deep technical expertise in structural concrete behaviour, soil load bearing, and high-pressure pool hydraulics."}
            </p>
            <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>
              Unlike generic contractors, our founder personally supervises site layout planning, reinforcement steel grid inspections, and filtration plant pressure calibrations. This hands-on commitment guarantees zero-leakage durability and long-term operating efficiency for every project delivered.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12.5px', background: 'rgba(0, 210, 255, 0.08)', color: 'var(--secondary-color)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0, 210, 255, 0.2)', fontWeight: '600' }}>
                ✓ Structural Leakage Diagnostics
              </span>
              <span style={{ fontSize: '12.5px', background: 'rgba(0, 210, 255, 0.08)', color: 'var(--secondary-color)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0, 210, 255, 0.2)', fontWeight: '600' }}>
                ✓ Turnkey Hydraulic Design
              </span>
              <span style={{ fontSize: '12.5px', background: 'rgba(0, 210, 255, 0.08)', color: 'var(--secondary-color)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0, 210, 255, 0.2)', fontWeight: '600' }}>
                ✓ Commercial Equipment Supply
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Mission & Vision Section ---------- */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="accent-gradient" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>
              Guiding Principles
            </span>
            <h2 className="text-gradient" style={{ fontSize: '32px', fontWeight: '700' }}>
              Mission & Vision
            </h2>
          </div>

          <div className="grid-2" style={{ gap: '30px' }}>
            <div className="glass-card" style={{ padding: '36px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>🎯</div>
                <h3 style={{ fontSize: '22px', color: 'var(--text-white)', marginBottom: '14px' }}>Our Mission</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '14.5px', lineHeight: '1.8' }}>
                  To craft exceptional, leak-proof swimming pools, fountains, and water amusement facilities that combine architectural beauty with structural permanence. We are dedicated to providing sustainable filtration technologies, high-efficiency equipment, and unwavering after-sales support to every client.
                </p>
              </div>
              <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-glass)', paddingTop: '14px', fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '600' }}>
                Excellence • Reliability • Longevity
              </div>
            </div>

            <div className="glass-card" style={{ padding: '36px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>🔭</div>
                <h3 style={{ fontSize: '22px', color: 'var(--text-white)', marginBottom: '14px' }}>Our Vision</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '14.5px', lineHeight: '1.8' }}>
                  To be recognized as Central India's gold standard for turnkey aquatic construction and commercial waterpark engineering. We aim to continually innovate in energy-saving circulation systems, automated water treatment, and eco-friendly swimming environments.
                </p>
              </div>
              <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-glass)', paddingTop: '14px', fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '600' }}>
                Innovation • Domain Leadership • Trust
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Core Values Section ---------- */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="accent-gradient" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>
              Our Philosophy
            </span>
            <h2 className="text-gradient" style={{ fontSize: '32px', fontWeight: '700' }}>
              Core Values
            </h2>
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {coreValues.map((val, idx) => (
              <div key={idx} className="values-card">
                <div className="values-icon-box">{val.icon}</div>
                <h3 style={{ fontSize: '20px', color: 'var(--text-white)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {val.title}
                </h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.7' }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Corporate Particulars & Fast Facts ---------- */}
        <div className="glass-card" style={{ padding: '40px', marginBottom: '80px', borderLeft: '4px solid var(--secondary-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <span className="accent-gradient" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '4px' }}>
                Official Registry
              </span>
              <h3 style={{ fontSize: '24px', color: 'var(--text-white)' }}>
                Corporate Particulars & Trade Compliance
              </h3>
            </div>
            <span style={{ fontSize: '12px', background: 'rgba(0, 210, 255, 0.1)', color: 'var(--secondary-color)', padding: '6px 14px', borderRadius: '20px', fontWeight: '700', border: '1px solid rgba(0, 210, 255, 0.3)' }}>
              GST Verified Sole Proprietorship
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {corporateFacts.map((fact, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '16px 20px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-glass)'
              }}>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  {fact.label}
                </span>
                <span style={{ fontSize: '15px', color: fact.label.includes('GSTIN') ? 'var(--accent-color)' : 'var(--text-white)', fontWeight: '600' }}>
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Geographic Coordinates & Offices ---------- */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="accent-gradient" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>
              Operational Locations
            </span>
            <h2 className="text-gradient" style={{ fontSize: '32px', fontWeight: '700' }}>
              Geographic Coordinates & Offices
            </h2>
          </div>

          <div className="grid-2" style={{ gap: '30px' }}>
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0, 210, 255, 0.1)',
                  border: '1px solid rgba(0, 210, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  📍
                </div>
                <div>
                  <h3 style={{ fontSize: '19px', color: 'var(--text-white)', marginBottom: '8px' }}>
                    Office & Workshop Location
                  </h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14.5px', lineHeight: '1.7', marginBottom: '12px' }}>
                    House No. L-1, Vandana Vihar,<br />
                    Bhangarh Road, Indore, Madhya Pradesh, India
                  </p>
                  <span style={{ display: 'inline-block', fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '600', background: 'rgba(0, 210, 255, 0.06)', padding: '4px 10px', borderRadius: '4px' }}>
                    Turnkey Construction, Engineering Consultations & Equipment Supply
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0, 210, 255, 0.1)',
                  border: '1px solid rgba(0, 210, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  📞
                </div>
                <div>
                  <h3 style={{ fontSize: '19px', color: 'var(--text-white)', marginBottom: '8px' }}>
                    Direct Contacts & Hours
                  </h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14.5px', lineHeight: '1.7', marginBottom: '12px' }}>
                    Phone: <strong style={{ color: 'var(--secondary-color)' }}>+91-9479940047</strong> / <strong style={{ color: 'var(--text-white)' }}>+91-9827841047</strong><br />
                    Email: <a href="mailto:vedaantpools@gmail.com" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>vedaantpools@gmail.com</a><br />
                    Working Hours: Mon – Sat: 9:00 AM – 8:00 PM
                  </p>
                  <span style={{ display: 'inline-block', fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '600', background: 'rgba(0, 210, 255, 0.06)', padding: '4px 10px', borderRadius: '4px' }}>
                    GSTIN Verified: 23AGZPG1057G1ZD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Logistics & B2B Trading Terms ---------- */}
        <div className="glass-card" style={{ padding: '40px', background: 'var(--bg-navy)' }}>
          <h3 style={{ fontSize: '22px', color: 'var(--text-white)', marginBottom: '24px', textAlign: 'center' }}>
            Logistics & B2B Trading Terms
          </h3>

          <div className="grid-3" style={{ gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}>🚛</span>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '6px' }}>Freight Dispatch</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                Equipment and catalog orders are dispatched directly <strong>By Road</strong> using regional commercial freight across MP and Central India.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}>💳</span>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '6px' }}>Payment Channels</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                We accept Cash, Credit Cards, Cheques, Demand Drafts (DD), Net Banking, and direct RTGS / NEFT Bank Transfers.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}>⚖️</span>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '6px' }}>B2B Policies</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                Free shipping on cataloged equipment arrays. Custom-cut liners or specialized structural orders are strictly non-returnable.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Call To Action ---------- */}
        <div style={{
          marginTop: '60px',
          textAlign: 'center',
          padding: '50px 30px',
          background: 'linear-gradient(135deg, rgba(11, 94, 221, 0.15) 0%, rgba(0, 210, 255, 0.15) 100%)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-active)'
        }}>
          <h2 className="text-gradient" style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
            Ready to Build Your Aquatic Infrastructure?
          </h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 24px auto', fontSize: '15px', lineHeight: '1.6' }}>
            Connect with Yogendra Gupta and our technical engineering team for structural pool blueprints, leak inspections, or wholesale supplies.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-accent" style={{ padding: '12px 30px', borderRadius: 'var(--radius-sm)' }}>
              Request Site Inspection
            </Link>
            <Link href="/services" className="btn btn-secondary" style={{ padding: '12px 30px', borderRadius: 'var(--radius-sm)' }}>
              Explore All Services
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
