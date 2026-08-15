export default function AboutPage() {
  return (
    <div className="section" style={{ background: 'var(--bg-deep)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="accent-gradient" style={{
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'block',
            marginBottom: '10px'
          }}>
            Company Profile
          </span>
          <h1 className="text-gradient" style={{ fontSize: '42px', marginBottom: '16px' }}>
            About Vedaant Pools Technology
          </h1>
          <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>
            Providing professional structural engineering and B2B pool supplies across Central India since 2018.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid-2" style={{ alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--text-white)' }}>
              Indore's Premier Aquatic Engineering Partner
            </h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '16px', lineHeight: '1.8' }}>
              Vedaant Pools Technology was established in <strong>2018</strong> by founder and owner <strong>Yogendra Gupta</strong>. Built on a foundation of over a decade of domain expertise, the firm operates as a registered Sole Proprietorship specialized in turnkey swimming pool design, mechanical filtration setups, and structural leak-proofing.
            </p>
            <p style={{ color: 'var(--text-gray)', marginBottom: '16px', lineHeight: '1.8' }}>
              As both a works contractor and a wholesale retail supplier, we distribute premium hardware accessories on regional commercial channels (including IndiaMART) and coordinate directly with engineering teams, schools, commercial resorts, and luxury home builders.
            </p>
            <p style={{ color: 'var(--text-gray)', lineHeight: '1.8' }}>
              With a perfect <strong>5.0-star local execution track record</strong> on top industrial trade platforms, we maintain a customer-first policy, ensuring rigorous post-construction service support and standard dispatch warranties.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '36px', borderLeft: '4px solid var(--secondary-color)' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--text-white)' }}>
              Corporate Particulars
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                  Business Name
                </span>
                <span style={{ fontSize: '16px', color: 'var(--text-white)', fontWeight: '600' }}>
                  Vedaant Pools Technology
                </span>
              </div>
              
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                  Leadership
                </span>
                <span style={{ fontSize: '16px', color: 'var(--text-white)', fontWeight: '600' }}>
                  Yogendra Gupta (Founder & Owner)
                </span>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                  Nature of Business
                </span>
                <span style={{ fontSize: '16px', color: 'var(--text-white)', fontWeight: '600' }}>
                  Manufacturer, Retailer, Works Contractor & Service Provider
                </span>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                  GSTIN Registry
                </span>
                <span style={{ fontSize: '16px', color: 'var(--accent-color)', fontWeight: '700' }}>
                  23AGZPG1057G1ZD (Madhya Pradesh)
                </span>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                  Year of Establishment
                </span>
                <span style={{ fontSize: '16px', color: 'var(--text-white)', fontWeight: '600' }}>
                  2018
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div style={{ marginBottom: '60px' }}>
          <h2 className="text-gradient" style={{ fontSize: '32px', textAlign: 'center', marginBottom: '40px' }}>
            Geographic Coordinates & Offices
          </h2>
          
          <div className="grid-2">
            <div className="glass-card" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '32px' }}>🏢</span>
                <div>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '8px' }}>
                    Registered Head Office
                  </h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.6' }}>
                    House No L-1, Vandana Vihar Colony Road, Bhangarh,<br />
                    Indore, Madhya Pradesh, India
                  </p>
                  <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '600' }}>
                    Turnkey Billing & Operations
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '32px' }}>✉️</span>
                <div>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '8px' }}>
                    Commercial Correspondence
                  </h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '14px', lineHeight: '1.6' }}>
                    450/3, Nanda Nagar,<br />
                    Indore - 452003, Madhya Pradesh, India
                  </p>
                  <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '600' }}>
                    B2B Wholesale Dispatch Office
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logistics and Terms */}
        <div className="glass-card" style={{ padding: '40px', background: 'var(--bg-navy)' }}>
          <h3 style={{ fontSize: '22px', color: 'var(--text-white)', marginBottom: '20px', textAlign: 'center' }}>
            Logistics & B2B Trading Terms
          </h3>
          
          <div className="grid-3" style={{ gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>🚛</span>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '6px' }}>Freight Dispatch</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>
                Equipments and catalog orders are dispatched directly <strong>By Road</strong> using regional commercial freight.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>💳</span>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '6px' }}>Payment Channels</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>
                We accept Cash, Credit Cards, Cheques, Demand Drafts (DD), Net Banking, and direct RTGS/NEFT Bank Transfers.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>⚖️</span>
              <h4 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '6px' }}>B2B Policies</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>
                Free shipping on cataloged equipment arrays. Custom-cut liners or structural lines are strictly non-returnable.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
