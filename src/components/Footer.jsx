import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div>
            <div className="footer-logo">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: 'var(--secondary-color)' }}
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>Vedaant Pools</span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
              Indore's leading aquatic contractor, manufacturing high-quality swimming pool accessories, custom fountains, and structural waterproofing since 2018.
            </p>
            <p style={{ fontWeight: '600', color: 'var(--text-white)' }}>
              Founder & Owner: Yogendra Gupta
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Turnkey Services</Link></li>
              <li><Link href="/about">About Corporate</Link></li>
              <li><Link href="/store">Product Store</Link></li>
              <li><Link href="/contact">Leakage waterproofing</Link></li>
            </ul>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="footer-title">Products</h4>
            <ul className="footer-links">
              <li><Link href="/store?category=Sanitation%20%26%20Upkeep">Sanitation & Upkeep</Link></li>
              <li><Link href="/store?category=Atmospheric%20Lighting">Underwater Lights</Link></li>
              <li><Link href="/store?category=Spa%20%26%20Wellness">Wellness Steam Generators</Link></li>
              <li><Link href="/store?category=Plumbing%20%26%20Controls">Pool Skimmers & Valves</Link></li>
            </ul>
          </div>

          {/* B2B Hotline */}
          <div>
            <h4 className="footer-title">Central India B2B Sourcing</h4>
            <p style={{ marginBottom: '12px' }}>Registered Office: Bhangarh, Indore, MP</p>
            <p style={{ marginBottom: '16px' }}>Correspondence: 450/3, Nanda Nagar, Indore, MP</p>
            <p style={{ color: 'var(--text-white)', fontWeight: '700', fontSize: '15px' }}>
              📞 Sourcing Hotline:
            </p>
            <a
              href="tel:+918043862448"
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--secondary-color)',
                display: 'block',
                marginTop: '4px',
              }}
            >
              +91-8043862448
            </a>
            <a
              href="tel:+919479940047"
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--text-light)',
                display: 'block',
                marginTop: '4px',
              }}
            >
              Alternative: +91 9479940047
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Vedaant Pools Technology. All Rights Reserved. Indore, MP.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/admin" style={{ fontSize: '13px', hover: 'color: var(--secondary-color)' }}>
              System Access Panel
            </Link>
            <span style={{ fontSize: '13px' }}>GSTIN: 23AGZPG1057G1ZD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
