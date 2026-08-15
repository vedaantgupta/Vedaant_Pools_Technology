"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [branding, setBranding] = useState(null);
  const pathname = usePathname();

  // Load site branding settings on mount
  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const res = await fetch('/api/settings?key=site_branding');
        if (res.ok) {
          const data = await res.json();
          if (data && data.value) {
            setBranding(data.value);
          }
        }
      } catch (err) {
        console.error('Failed to load branding in navbar:', err);
      }
    };
    fetchBranding();
  }, []);

  // Listen to custom cart changes or updates in localStorage
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('vpt_cart') || '[]');
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        setCartCount(count);
      } catch (err) {
        setCartCount(0);
      }
    };

    updateCartCount();

    // Custom event to listen to local cart changes
    window.addEventListener('vpt-cart-changed', updateCartCount);
    // Standard storage listener for changes across other tabs
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('vpt-cart-changed', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Store', path: '/store' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Contact', path: '/contact' },
  ];

  // Helper to determine if link is active
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Logo */}
        <Link href="/" className="logo-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {branding?.logoImageUrl ? (
            /* Custom Uploaded Logo Icon */
            <img
              src={branding.logoImageUrl}
              alt="VPT Logo"
              style={{
                width: '38px',
                height: '38px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 5px rgba(0, 210, 255, 0.4))'
              }}
            />
          ) : (
            /* Styled V Icon (Fallback) */
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-glass)',
              fontSize: '18px',
              fontWeight: '900',
              color: '#ef4444',
              textShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
              marginRight: '2px',
              fontFamily: 'var(--font-title)'
            }}>
              V
            </span>
          )}

          {/* Full Logo Text */}
          <div style={{
            fontSize: '15px',
            fontWeight: '900',
            fontFamily: 'var(--font-title)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'baseline',
            position: 'relative',
            paddingBottom: '2px'
          }}>
            <span style={{ position: 'relative', paddingBottom: '2px', marginRight: '6px' }}>
              <span style={{ color: '#ef4444' }}>V</span>
              <span style={{ color: '#4460f1' }}>EDAANT</span>
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2.5px',
                backgroundColor: '#ef4444',
                borderRadius: '1px'
              }} />
            </span>
            <span style={{ color: '#4460f1' }}>POOLS TECHNOLOGY</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.name} onClick={() => setMobileMenuOpen(false)}>
                <Link
                  href={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {/* Mobile Admin Link */}
            <li className="lg-hidden" style={{ display: 'none' }}>
              <Link href="/admin" className="nav-link">
                Dashboard
              </Link>
            </li>
          </ul>

          {/* Cart Icon & Admin Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/cart" className="cart-badge-btn flex-center" aria-label="View Cart">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>

            <Link href="/admin" className="btn btn-secondary" style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '13px' }}>
              Admin
            </Link>

            {/* Hamburger Toggle */}
            <button
              className="menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
              <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
              <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
