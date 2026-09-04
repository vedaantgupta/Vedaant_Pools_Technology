"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

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

    window.addEventListener('vpt-cart-changed', updateCartCount);
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('vpt-cart-changed', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCalcDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'What We Build', path: '/what-we-build' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Store', path: '/store' },
  ];

  const isCalcActive = pathname.startsWith('/calculator') || pathname.startsWith('/equipment-calculator') || pathname.startsWith('/product-calculator');

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        
        {/* Exact Vector SVG Logo from User's Branding */}
        <Link
          href="/"
          className="logo-wrapper"
          style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
          aria-label="Vedaant Pools Technology Home"
        >
          <svg
            viewBox="0 0 540 36"
            style={{ height: '23px', width: 'auto', display: 'block' }}
            role="img"
          >
            {/* VEDAANT POOLS TECHNOLOGY Text */}
            <text
              x="0"
              y="22"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="900"
              fontSize="22"
              letterSpacing="0.6"
            >
              <tspan fill="#EF3838">V</tspan>
              <tspan fill="#4169E1">EDAANT</tspan>
              <tspan fill="#4169E1"> POOLS TECHNOLOGY</tspan>
            </text>

            {/* Red Underline strictly under VEDAANT */}
            <rect x="0" y="28" width="116" height="3" rx="1.5" fill="#EF3838" />
          </svg>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ul className="nav-links">
            
            {/* Primary Links: Home, About, What We Build, Services, Store */}
            {primaryNavItems.map((item) => (
              <li key={item.name} onClick={() => setMobileMenuOpen(false)}>
                <Link
                  href={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Dropdown Menu for Calculators */}
            <li
              ref={dropdownRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setCalcDropdownOpen(true)}
              onMouseLeave={() => setCalcDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCalcDropdownOpen(!calcDropdownOpen)}
                className={`nav-link ${isCalcActive ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'inherit'
                }}
              >
                Calculators <span style={{ fontSize: '10px', opacity: 0.8 }}>▼</span>
              </button>

              {/* Dropdown Box */}
              {calcDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#091830',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '14px',
                    padding: '8px',
                    minWidth: '260px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    zIndex: 1100,
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <Link
                    href="/calculator"
                    onClick={() => { setCalcDropdownOpen(false); setMobileMenuOpen(false); }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      color: pathname === '/calculator' ? 'var(--secondary-color)' : 'var(--text-light)',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: pathname === '/calculator' ? 'rgba(0, 210, 255, 0.1)' : 'transparent',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <span>🏊</span> Pool Construction Estimator
                  </Link>

                  <Link
                    href="/equipment-calculator"
                    onClick={() => { setCalcDropdownOpen(false); setMobileMenuOpen(false); }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      color: pathname === '/equipment-calculator' ? 'var(--secondary-color)' : 'var(--text-light)',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: pathname === '/equipment-calculator' ? 'rgba(0, 210, 255, 0.1)' : 'transparent',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <span>⚙️</span> Equipment & Product Calculator
                  </Link>
                </div>
              )}
            </li>

            {/* Contact Link */}
            <li onClick={() => setMobileMenuOpen(false)}>
              <Link
                href="/contact"
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Action Items: Cart Icon & Admin Portal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            
            {/* Inquiry Cart Icon Button */}
            <Link href="/cart" className="cart-badge-btn flex-center" aria-label="View Cart">
              <svg
                width="19"
                height="19"
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

            {/* Admin System Link */}
            <Link
              href="/admin"
              className="btn btn-secondary"
              style={{
                padding: '7px 14px',
                borderRadius: '18px',
                fontSize: '12.5px',
                fontWeight: '700',
                whiteSpace: 'nowrap'
              }}
            >
              Admin
            </Link>
          </div>

        </nav>
      </div>
    </header>
  );
}
