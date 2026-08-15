import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '100vh', position: 'relative' }}>
      
      {/* ---------- Hero Section ---------- */}
      <section className="about-hero">
        <div className="services-hero-glow" />
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <span className="accent-gradient" style={{
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'inline-block',
            marginBottom: '16px',
            padding: '6px 16px',
            background: 'rgba(0, 210, 255, 0.08)',
            borderRadius: '20px',
            border: '1px solid rgba(0, 210, 255, 0.2)'
          }}>
            Corporate Profile &amp; Heritage
          </span>
          <h1 className="text-gradient" style={{ fontSize: '46px', fontWeight: '800', marginBottom: '18px', letterSpacing: '-0.02em' }}>
            About Vedaant Pools Technology
          </h1>
          <p style={{ color: 'var(--text-gray)', maxWidth: '760px', margin: '0 auto', fontSize: '17px', lineHeight: '1.7', marginBottom: '32px' }}>
            India&apos;s premier aquatic engineering contractor, commercial swimming pool manufacturer, structural leak-proofing specialist, and wholesale B2B distributor since 2018.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13.5px', background: 'rgba(255, 255, 255, 0.04)', padding: '8px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', color: 'var(--text-light)' }}>
              🏊 Turnkey Aquatic Projects in India
            </span>
            <span style={{ fontSize: '13.5px', background: 'rgba(255, 255, 255, 0.04)', padding: '8px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', color: 'var(--text-light)' }}>
              🛡️ 10-Year Water Tightness Guarantee
            </span>
            <span style={{ fontSize: '13.5px', background: 'rgba(255, 255, 255, 0.04)', padding: '8px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', color: 'var(--text-light)' }}>
              ⚡ Direct Pan-India B2B Wholesale
            </span>
            <span style={{ fontSize: '13.5px', background: 'rgba(255, 255, 255, 0.04)', padding: '8px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', color: 'var(--text-light)' }}>
              ⭐ 5.0 Star Industry Track Record
            </span>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '40px 24px 80px' }}>

        {/* ---------- Key Metrics / Stat Counter Strip ---------- */}
        <div className="about-stat-strip">
          <div className="about-stat-item">
            <div className="about-stat-number">500+</div>
            <div className="about-stat-label">Turnkey Projects</div>
            <div className="about-stat-subtext">Delivered across India</div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-number">15+ Yrs</div>
            <div className="about-stat-label">Domain Expertise</div>
            <div className="about-stat-subtext">Civil hydraulics &amp; engineering</div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-number">5.0 ★</div>
            <div className="about-stat-label">Satisfaction Score</div>
            <div className="about-stat-subtext">Verified on industrial trade portals</div>
          </div>
          <div className="about-stat-item">
            <div className="about-stat-number">100%</div>
            <div className="about-stat-label">Pan-India Freight</div>
            <div className="about-stat-subtext">Direct road dispatch network</div>
          </div>
        </div>

        {/* ---------- Company Overview Block ---------- */}
        <div className="grid-2" style={{ alignItems: 'center', marginBottom: '80px', gap: '50px' }}>
          <div style={{ position: 'relative' }}>
            <div className="service-detail-img-wrapper" style={{ aspectRatio: '1.3/1' }}>
              <img
                src="/Construction of Swimming Pools (1).jpg"
                alt="Swimming Pool Construction in India"
                className="service-detail-img"
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-15px',
              right: '-15px',
              background: 'var(--bg-navy)',
              border: '1px solid var(--border-active)',
              padding: '12px 20px',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '24px' }}>🏆</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-white)' }}>ISO &amp; IS 3370 Quality</div>
                <div style={{ fontSize: '11px', color: 'var(--secondary-color)' }}>Industrial Standards Compliance</div>
              </div>
            </div>
          </div>

          <div>
            <span className="accent-gradient" style={{
              fontSize: '12px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              display: 'block',
              marginBottom: '10px'
            }}>
              Engineering Excellence in India
            </span>
            <h2 style={{ fontSize: '32px', color: 'var(--text-white)', fontWeight: '800', marginBottom: '20px', lineHeight: '1.3' }}>
              The Benchmark in Luxury Pool Construction &amp; Aquatic Systems
            </h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '16px', lineHeight: '1.8', fontSize: '15px' }}>
              <strong>Vedaant Pools Technology</strong> was established in <strong>2018</strong> by founder and owner <strong>Yogendra Gupta</strong>. Built upon over a decade and a half of dedicated domain mastery, the firm operates as a premier registered enterprise specializing in turnkey swimming pool design, concrete shell engineering, mechanical filtration setups, and structural leak-proofing.
            </p>
            <p style={{ color: 'var(--text-gray)', marginBottom: '16px', lineHeight: '1.8', fontSize: '15px' }}>
              As both an end-to-end works contractor and a wholesale retail supplier, we distribute premium hardware accessories across national commercial channels (including IndiaMART) and coordinate directly with architects, municipal resorts, educational institutions, wellness retreats, and luxury residential developers across India.
            </p>
            <p style={{ color: 'var(--text-gray)', lineHeight: '1.8', fontSize: '15px' }}>
              Holding a perfect <strong>5.0-star verified local track record</strong> on industrial trade platforms, we adhere to strict quality control, standard dispatch warranties, and comprehensive post-handover maintenance agreements.
            </p>
          </div>
        </div>

        {/* ---------- Founder Profile & Leadership Section ---------- */}
        <div className="founder-card">
          <div className="founder-image-wrapper">
            <img
              src="/owner.jpg"
              alt="Yogendra Gupta - Founder & Owner"
              className="founder-image"
            />
          </div>

          <div>
            <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(0, 210, 255, 0.1)', border: '1px solid var(--border-active)', borderRadius: 'var(--radius-sm)', color: 'var(--secondary-color)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Founding Leadership
            </div>
            <h3 style={{ fontSize: '30px', color: 'var(--text-white)', fontWeight: '800', marginBottom: '6px' }}>
              Yogendra Gupta
            </h3>
            <div style={{ fontSize: '14px', color: 'var(--secondary-color)', fontWeight: '600', marginBottom: '18px' }}>
              Founder &amp; Principal Aquatic Engineer (Vedaant Pools Technology)
            </div>
            
            <p style={{ color: 'var(--text-light)', fontSize: '14.5px', lineHeight: '1.8', marginBottom: '14px' }}>
              With over 15 years of hands-on leadership in hydraulic pool sizing, structural concrete casting, and industrial waterproofing chemistry, Yogendra Gupta has spearheaded Vedaant Pools Technology into one of India&apos;s most reliable names in water construction.
            </p>
            <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>
              His philosophy combines rigorous civil engineering rigor with modern architectural aesthetics, personally overseeing technical drawings, site excavation, pipe pressure testing, and chemical commissioning for every major project.
            </p>

            <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid var(--border-glass)', paddingTop: '18px', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Specialization</span>
                <span style={{ fontSize: '14px', color: 'var(--text-white)', fontWeight: '600' }}>Turnkey RCC Pools &amp; Leakage Forensics</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Direct Sourcing Line</span>
                <a href="tel:+918043862448" style={{ fontSize: '14px', color: 'var(--secondary-color)', fontWeight: '700' }}>+91-8043862448</a>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Mission & Vision Grid ---------- */}
        <div className="grid-2" style={{ gap: '40px', marginBottom: '80px' }}>
          
          {/* Mission Card */}
          <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid var(--secondary-color)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <span style={{ fontSize: '32px' }}>🎯</span>
                <h3 style={{ fontSize: '24px', color: 'var(--text-white)', fontWeight: '700' }}>Our Mission</h3>
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
                To craft exceptional, leak-proof swimming pools and aquatic infrastructures across India that seamlessly unite aesthetic architectural beauty with long-term structural permanence. We strive to provide private clients and commercial developers with uncompromising engineering quality and dependable after-sales support.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', fontSize: '13px', color: 'var(--secondary-color)', fontWeight: '600' }}>
              ✓ Precision Sizing &amp; 10-Year Water Tightness Guarantee
            </div>
          </div>

          {/* Vision Card */}
          <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid var(--primary-color)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <span style={{ fontSize: '32px' }}>🌐</span>
                <h3 style={{ fontSize: '24px', color: 'var(--text-white)', fontWeight: '700' }}>Our Vision</h3>
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
                To establish Vedaant Pools Technology as India&apos;s foremost recognized standard for turnkey commercial waterpark development, luxury residential pool suites, and high-efficiency filtration hardware. We aim to redefine aquatic recreation through continuous technological innovation and ethical business practices.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', fontSize: '13px', color: 'var(--primary-color)', fontWeight: '600' }}>
              ✓ Pan-India Engineering Leadership &amp; B2B Trust
            </div>
          </div>

        </div>

        {/* ---------- Core Values Section ---------- */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="accent-gradient" style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              Guiding Principles
            </span>
            <h2 className="text-gradient" style={{ fontSize: '34px', fontWeight: '800' }}>
              Our Core Values
            </h2>
            <p style={{ color: 'var(--text-gray)', maxWidth: '550px', margin: '0 auto', fontSize: '14.5px' }}>
              We are an organization built upon foundational engineering ethics and lasting client relationships across India.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '30px' }}>
            <div className="values-card">
              <div className="values-icon-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', color: 'var(--text-white)', fontWeight: '700', marginBottom: '12px' }}>
                INTEGRITY
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.7' }}>
                We uphold transparent dealings, clear cost breakdowns, full GST compliance, and honest dispatch warranties across all projects in India.
              </p>
            </div>

            <div className="values-card">
              <div className="values-icon-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', color: 'var(--text-white)', fontWeight: '700', marginBottom: '12px' }}>
                COMMITMENT
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.7' }}>
                From initial 3D drawing approvals to final tile grouting and hydrostatic water testing, we deliver projects strictly on time and within scope.
              </p>
            </div>

            <div className="values-card">
              <div className="values-icon-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10" />
                  <path d="M12 20V4" />
                  <path d="M6 20v-6" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', color: 'var(--text-white)', fontWeight: '700', marginBottom: '12px' }}>
                EFFICIENCY
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.7' }}>
                Smart utilization of high-rate sand filtration plants, schedule-80 UPVC piping, and variable automation to minimize client energy &amp; chemical costs.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Corporate Particulars Table Card ---------- */}
        <div className="glass-card" style={{ padding: '40px', marginBottom: '80px', borderLeft: '4px solid var(--secondary-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
            <div>
              <span className="accent-gradient" style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '4px' }}>
                Official Verification Data
              </span>
              <h3 style={{ fontSize: '24px', color: 'var(--text-white)', fontWeight: '800' }}>
                Corporate Particulars &amp; Registration
              </h3>
            </div>
            <div style={{ padding: '8px 16px', background: 'rgba(0, 210, 255, 0.1)', border: '1px solid var(--border-active)', borderRadius: 'var(--radius-sm)', color: 'var(--secondary-color)', fontSize: '13px', fontWeight: '700' }}>
              ✓ Verified Sole Proprietorship
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Legal Entity Name</span>
              <span style={{ fontSize: '16px', color: 'var(--text-white)', fontWeight: '700' }}>Vedaant Pools Technology</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Leadership &amp; Ownership</span>
              <span style={{ fontSize: '16px', color: 'var(--text-white)', fontWeight: '700' }}>Yogendra Gupta (Founder &amp; Owner)</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Nature of Business</span>
              <span style={{ fontSize: '15px', color: 'var(--text-white)', fontWeight: '600' }}>Manufacturer, Retailer, Works Contractor &amp; Service Provider</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>GSTIN Registration</span>
              <span style={{ fontSize: '16px', color: 'var(--accent-color)', fontWeight: '800' }}>23AGZPG1057G1ZD (Madhya Pradesh)</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Year of Establishment</span>
              <span style={{ fontSize: '16px', color: 'var(--text-white)', fontWeight: '700' }}>2018 (15+ Years Industry Experience)</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Primary Sourcing Hotline</span>
              <span style={{ fontSize: '16px', color: 'var(--secondary-color)', fontWeight: '800' }}>+91-8043862448 / +91 9479940047</span>
            </div>
          </div>
        </div>

        {/* ---------- Geographic Coordinates & Offices ---------- */}
        <div style={{ marginBottom: '80px' }}>
          <h2 className="text-gradient" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '36px', fontWeight: '800' }}>
            Registered Coordinates &amp; Operating Offices
          </h2>
          
          <div className="grid-2" style={{ gap: '30px' }}>
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '36px' }}>🏢</span>
                <div>
                  <h3 style={{ fontSize: '19px', color: 'var(--text-white)', marginBottom: '8px', fontWeight: '700' }}>
                    Registered Head Office
                  </h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14.5px', lineHeight: '1.7' }}>
                    House No L-1, Vandana Vihar Colony Road, Bhangarh,<br />
                    Indore, Madhya Pradesh, India
                  </p>
                  <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '700', textTransform: 'uppercase' }}>
                    Turnkey Billing, Accounts &amp; Operations
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '36px' }}>✉️</span>
                <div>
                  <h3 style={{ fontSize: '19px', color: 'var(--text-white)', marginBottom: '8px', fontWeight: '700' }}>
                    Commercial Correspondence Office
                  </h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14.5px', lineHeight: '1.7' }}>
                    450/3, Nanda Nagar,<br />
                    Indore - 452003, Madhya Pradesh, India
                  </p>
                  <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '700', textTransform: 'uppercase' }}>
                    Pan-India B2B Dispatch &amp; Sourcing Hub
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Logistics and B2B Terms ---------- */}
        <div className="glass-card" style={{ padding: '40px', background: 'var(--bg-navy)', marginBottom: '60px' }}>
          <h3 style={{ fontSize: '24px', color: 'var(--text-white)', marginBottom: '24px', textAlign: 'center', fontWeight: '800' }}>
            Pan-India Logistics &amp; Commercial Terms
          </h3>
          
          <div className="grid-3" style={{ gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}>🚛</span>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '6px', fontWeight: '700' }}>Pan-India Freight Dispatch</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                All equipment catalogs and hardware orders are dispatched directly <strong>By Road</strong> using certified regional commercial freight across India.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}>💳</span>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '6px', fontWeight: '700' }}>Secure Payment Modes</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                We accept direct RTGS/NEFT Bank Transfers, Online Net Banking, Credit Cards, Cheques, Demand Drafts (DD), and Cash on delivery terms.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}>⚖️</span>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '6px', fontWeight: '700' }}>Dispatch Guarantees</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                Free shipping is offered on eligible equipment arrays across India. Custom-cut structural lines &amp; bespoke liners are strictly non-returnable.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Bottom Call To Action ---------- */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(11, 94, 221, 0.2) 0%, rgba(0, 210, 255, 0.15) 100%)',
          border: '1px solid var(--border-active)',
          borderRadius: 'var(--radius-sm)',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h2 className="text-gradient" style={{ fontSize: '30px', fontWeight: '800', marginBottom: '12px' }}>
            Partner with India&apos;s Leading Aquatic Contractors
          </h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 24px auto', fontSize: '15px', lineHeight: '1.7' }}>
            Whether you need a commercial resort infinity pool, structural leak remediation, or direct wholesale hardware pricing, our engineers are ready to assist.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '12px 32px', borderRadius: 'var(--radius-sm)' }}>
              Schedule Technical Consultation
            </Link>
            <Link href="/services" className="btn btn-secondary" style={{ padding: '12px 28px', borderRadius: 'var(--radius-sm)' }}>
              Explore Our Services
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
