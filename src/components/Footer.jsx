"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Footer Quick Callback Form state
  const [phoneInput, setPhoneInput] = useState('');
  const [callbackStatus, setCallbackStatus] = useState({ loading: false, success: null, error: null });

  const handleQuickCallback = async (e) => {
    e.preventDefault();
    if (!phoneInput || phoneInput.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }
    setCallbackStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Quick Footer Callback Request',
          phone: phoneInput,
          email: 'callback@vedaantpools.com',
          company: 'Footer Callback Bar',
          message: `Customer requested an urgent callback for pool consultation to phone number: ${phoneInput}`,
          items: []
        })
      });

      if (!res.ok) throw new Error("Failed to request callback.");

      setCallbackStatus({ loading: false, success: "✓ Request received! Founder Yogendra Gupta will call you shortly.", error: null });
      setPhoneInput('');
    } catch (err) {
      setCallbackStatus({ loading: false, success: null, error: "Failed to request callback. Please call +91-9479940047." });
    }
  };

  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--border-glass)', background: 'var(--bg-surface)' }}>

      {/* Quick Callback Top Ribbon */}
      <div style={{ background: 'rgba(0, 210, 255, 0.05)', borderBottom: '1px solid var(--border-glass)', padding: '18px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-light)' }}>
                Need Immediate Technical Guidance for Your Pool?
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Enter your phone number for a direct callback from Managing Director Yogendra Gupta.
              </div>
            </div>
          </div>

          {/* Quick Callback Input Form */}
          <form onSubmit={handleQuickCallback} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="tel"
              placeholder="+91-98XXXXXXXX"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-light)',
                fontSize: '13px',
                outline: 'none',
                minWidth: '180px'
              }}
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontSize: '12.5px', padding: '8px 16px', borderRadius: '20px', fontWeight: '700' }}
              disabled={callbackStatus.loading}
            >
              {callbackStatus.loading ? 'Requesting...' : 'Request Callback ➔'}
            </button>
          </form>
        </div>

        {callbackStatus.success && (
          <div className="container" style={{ marginTop: '10px', fontSize: '12.5px', color: '#27ae60', fontWeight: '600' }}>
            {callbackStatus.success}
          </div>
        )}
      </div>

      <div className="container" style={{ paddingTop: '50px', paddingBottom: '40px' }}>
        <div className="footer-grid">

          {/* Brand & Corporate Bio */}
          <div>
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '900',
                color: '#ef4444'
              }}>
                V
              </span>
              <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--text-light)', fontFamily: 'var(--font-title)' }}>
                VEDAANT POOLS TECHNOLOGY
              </span>
            </div>

            <p style={{ fontSize: '13.5px', lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Indore's premier aquatic contractor and equipment manufacturer. Specializing in turnkey swimming pool construction, structural RCC waterproofing, outdoor dynamic fountains, and B2B wholesale equipment supply since 2018.
            </p>

            <div style={{ fontSize: '13.5px', color: 'var(--text-light)', fontWeight: '700' }}>
              👨‍💼 Founder & Managing Director: <span style={{ color: 'var(--secondary-color)' }}>Yogendra Gupta</span>
            </div>
          </div>

          {/* Corporate Links */}
          <div>
            <h4 className="footer-title" style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '18px' }}>
              Corporate Navigation
            </h4>
            <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, listStyle: 'none' }}>
              <li><Link href="/">Home Page</Link></li>
              <li><Link href="/what-we-build">What We Build</Link></li>
              <li><Link href="/services">Turnkey Services</Link></li>
              <li><Link href="/about">About Corporate</Link></li>
              <li><Link href="/gallery">Project Gallery Showcase</Link></li>
              <li><Link href="/store">Product Store</Link></li>
            </ul>
          </div>

          {/* Interactive Calculators & Tools */}
          <div>
            <h4 className="footer-title" style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '18px' }}>
              Interactive Tools
            </h4>
            <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, listStyle: 'none' }}>
              <li>
                <Link href="/calculator" style={{ color: 'var(--primary-color)', fontWeight: '700' }}>
                  🏊 Civil Pool Cost Estimator
                </Link>
              </li>
              <li>
                <Link href="/equipment-calculator" style={{ color: 'var(--secondary-color)', fontWeight: '700' }}>
                  ⚙️ Equipment Package Calculator
                </Link>
              </li>
              <li>
                <Link href="/contact?tab=waterproofing" style={{ color: '#ef4444', fontWeight: '600' }}>
                  🛠️ Leakage Waterproofing Inspection
                </Link>
              </li>
              <li>
                <Link href="/contact?subject=B2B%20Equipment%20Wholesale">
                  📦 B2B Equipment Bulk Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Address */}
          <div>
            <h4 className="footer-title" style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '18px' }}>
              Corporate Office & Helpdesk
            </h4>

            <p style={{ marginBottom: '14px', color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
              📍 <strong>Registered Office:</strong><br />
              House No. L-1, Vandana Vihar, Bhangarh Road, Indore, Madhya Pradesh - 452006
            </p>

            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Direct Call Lines:</span>
              <a href="tel:+919479940047" style={{ fontSize: '16px', fontWeight: '800', color: 'var(--secondary-color)', display: 'block' }}>
                +91 94799 40047
              </a>
              <a href="tel:+919827841047" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-light)', display: 'block', marginTop: '2px' }}>
                +91 98278 41047
              </a>
            </div>

            <a
              href="https://wa.me/919479940047?text=Hello%20Yogendra%20Gupta%2C%20I%20would%20like%20to%20inquire%20about%20a%20swimming%20pool%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: '#25D366',
                color: '#fff',
                fontSize: '12.5px',
                fontWeight: '700',
                padding: '6px 14px',
                borderRadius: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '4px'
              }}
            >
              💬 WhatsApp Quick Chat
            </a>
          </div>

        </div>

        {/* Corporate Trust Badges Row */}
        <div style={{
          borderTop: '1px solid var(--border-glass)',
          marginTop: '36px',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '12.5px',
          color: 'var(--text-muted)'
        }}>
          <span>🛡️ ISO Quality Certified Contracting</span>
          <span>🏗️ 10-Year Waterproofing Warranty</span>
          <span>🚚 Pan-India Bulk Equipment Shipping</span>
          <span style={{ color: 'var(--secondary-color)', fontWeight: '700' }}>GSTIN: 23AGZPG1057G1ZD</span>
        </div>

        {/* Footer Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-glass)',
          marginTop: '20px',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '12.5px',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; {currentYear} Vedaant Pools Technology. All Rights Reserved. Indore, Madhya Pradesh.
          </div>

          <div>
            <Link href="/admin" style={{ color: 'var(--text-muted)' }}>
              System Access Panel
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
