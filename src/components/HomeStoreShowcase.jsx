"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function HomeStoreShowcase({ initialProducts = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartToast, setCartToast] = useState(null);

  const categories = [
    { id: 'All', label: 'All Equipment' },
    { id: 'Sanitation & Upkeep', label: 'Sanitation & Upkeep' },
    { id: 'Plumbing & Controls', label: 'Plumbing & Pumps' },
    { id: 'Atmospheric Lighting', label: 'Underwater Lighting' },
    { id: 'Spa & Wellness', label: 'Spa & Steam' },
    { id: 'Structural Accents', label: 'Structural Fittings' },
  ];

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return initialProducts.slice(0, 8);
    return initialProducts.filter(p => p.category === activeCategory).slice(0, 8);
  }, [activeCategory, initialProducts]);

  // Quick Add To Cart handler with custom toast
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const cart = JSON.parse(localStorage.getItem('vpt_cart') || '[]');
      const existingItemIdx = cart.findIndex(item => item.product._id === product._id);

      if (existingItemIdx > -1) {
        cart[existingItemIdx].quantity += 1;
      } else {
        cart.push({ product, quantity: 1 });
      }

      localStorage.setItem('vpt_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('vpt-cart-changed'));

      // Show toast
      setCartToast({
        title: product.title,
        price: product.price
      });

      setTimeout(() => {
        setCartToast(null);
      }, 4000);
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  return (
    <section className="section" style={{ background: 'var(--bg-navy)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0, 210, 255, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(90px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '2%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(11, 94, 221, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(90px)',
        pointerEvents: 'none'
      }} />

      {/* Interactive Cart Toast */}
      {cartToast && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 9999,
          background: 'rgba(5, 19, 41, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--secondary-color)',
          borderRadius: '16px',
          padding: '16px 22px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 25px rgba(0, 210, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '420px',
          animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.2), rgba(11, 94, 221, 0.3))',
            border: '1px solid rgba(0, 210, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0
          }}>
            🛒
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12px', color: 'var(--secondary-color)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Added To Inquiry Cart
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-white)', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {cartToast.title}
            </div>
            {cartToast.price && (
              <div style={{ fontSize: '13px', color: 'var(--accent-color)', fontWeight: '700', marginTop: '2px' }}>
                ₹{cartToast.price.toLocaleString('en-IN')}
              </div>
            )}
          </div>
          <Link
            href="/cart"
            className="btn btn-accent"
            style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '20px', flexShrink: 0 }}
          >
            View Cart
          </Link>
        </div>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '36px',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary-color)', boxShadow: '0 0 8px var(--secondary-color)' }} />
              <span className="accent-gradient" style={{
                fontSize: '12.5px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                DIRECT DISTRIBUTOR & OEM CATALOG
              </span>
            </div>

            <h2 className="text-gradient" style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
              Commercial Aquatic Store & Equipment
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '15px', maxWidth: '640px', margin: 0 }}>
              Heavy-duty filtration plants, commercial sand filters, underwater LED illumination, steam bath generators, and chemical dosing systems with certified warranties.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href="/store"
              className="btn btn-primary"
              style={{ padding: '12px 26px', fontSize: '14px', borderRadius: 'var(--radius-sm)' }}
            >
              Explore Full Catalog ({initialProducts.length}+ Items) &rarr;
            </Link>
            <Link
              href="/contact"
              className="btn btn-secondary"
              style={{ padding: '12px 22px', fontSize: '14px', borderRadius: 'var(--radius-sm)' }}
            >
              Request Bulk B2B Quote
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '36px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {categories.map((cat) => {
            const count = cat.id === 'All'
              ? initialProducts.length
              : initialProducts.filter(p => p.category === cat.id).length;
            
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? '700' : '500',
                  border: isActive ? '1px solid var(--secondary-color)' : '1px solid var(--border-glass)',
                  background: isActive ? 'rgba(0, 210, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? 'var(--secondary-color)' : 'var(--text-light)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 16px rgba(0, 210, 255, 0.2)' : 'none'
                }}
              >
                <span>{cat.label}</span>
                {count > 0 && (
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 7px',
                    borderRadius: '12px',
                    background: isActive ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.1)',
                    color: isActive ? '#030a16' : 'var(--text-gray)',
                    fontWeight: '800'
                  }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '26px',
            marginBottom: '50px'
          }}>
            {filteredProducts.map((prod) => {
              // Extract a couple of specs if available
              const specsEntries = prod.specs ? Object.entries(prod.specs) : [];
              const highlightSpecs = specsEntries.slice(0, 2);

              return (
                <div
                  key={prod._id}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: '18px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative'
                  }}
                >
                  {/* Image Container with White Background Canvas */}
                  <Link
                    href={`/store/${prod._id}`}
                    style={{
                      height: '220px',
                      background: 'radial-gradient(circle, #ffffff 60%, #f1f5f9 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '20px',
                      position: 'relative',
                      overflow: 'hidden',
                      textDecoration: 'none'
                    }}
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      style={{
                        maxWidth: '85%',
                        maxHeight: '85%',
                        objectFit: 'contain',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />

                    {/* Category Badge */}
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(5, 19, 41, 0.92)',
                      border: '1px solid rgba(0, 210, 255, 0.4)',
                      color: 'var(--secondary-color)',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {prod.category}
                    </span>

                    {/* Stock / OEM Tag */}
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(16, 185, 129, 0.95)',
                      color: '#ffffff',
                      fontSize: '10.5px',
                      fontWeight: '700',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}>
                      ✓ OEM Verified
                    </span>
                  </Link>

                  {/* Card Body */}
                  <div style={{
                    padding: '22px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      {/* Rating & Review info */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ color: '#ffc107', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ★★★★★ <span style={{ color: 'var(--text-gray)', fontSize: '11.5px', fontWeight: '500' }}>(5.0)</span>
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          GST Invoiced
                        </span>
                      </div>

                      {/* Product Title */}
                      <Link href={`/store/${prod._id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{
                          fontSize: '16.5px',
                          fontWeight: '700',
                          margin: '0 0 10px 0',
                          lineHeight: '1.4',
                          color: 'var(--text-white)',
                          minHeight: '46px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {prod.title}
                        </h3>
                      </Link>

                      {/* Specs Highlights Chips */}
                      {highlightSpecs.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                          {highlightSpecs.map(([key, val], sIdx) => (
                            <span key={sIdx} style={{
                              fontSize: '11px',
                              background: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              color: 'var(--text-light)'
                            }}>
                              <strong style={{ color: 'var(--text-gray)' }}>{key}:</strong> {val}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p style={{
                          fontSize: '12.5px',
                          color: 'var(--text-gray)',
                          lineHeight: '1.5',
                          margin: '0 0 16px 0',
                          minHeight: '38px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {prod.description || "Industrial grade aquatic equipment tested for continuous duty and commercial longevity."}
                        </p>
                      )}
                    </div>

                    {/* Price and Actions */}
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        paddingTop: '14px',
                        borderTop: '1px solid var(--border-glass)',
                        marginBottom: '16px'
                      }}>
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Trade Price
                          </span>
                          <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--accent-color)', letterSpacing: '-0.02em' }}>
                            {prod.price ? `₹${prod.price.toLocaleString('en-IN')}` : 'Request Quote'}
                          </span>
                        </div>
                        
                        <Link
                          href={`/store/${prod._id}`}
                          style={{
                            fontSize: '12.5px',
                            color: 'var(--secondary-color)',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          Specs Sheet &rarr;
                        </Link>
                      </div>

                      {/* Dual Action Buttons */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <button
                          onClick={(e) => handleAddToCart(prod, e)}
                          className="btn btn-secondary"
                          style={{
                            padding: '9px 12px',
                            fontSize: '12.5px',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: '600',
                            gap: '6px'
                          }}
                        >
                          🛒 Add to Cart
                        </button>
                        
                        <Link
                          href={`/store/${prod._id}`}
                          className="btn btn-primary"
                          style={{
                            padding: '9px 12px',
                            fontSize: '12.5px',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: '600',
                            textAlign: 'center'
                          }}
                        >
                          Buy / Specs
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '50px'
          }}>
            <p style={{ color: 'var(--text-gray)', fontSize: '16px', margin: '0 0 16px 0' }}>
              No products found in "{activeCategory}". View our complete store inventory.
            </p>
            <Link href="/store" className="btn btn-primary">
              Browse All Store Products
            </Link>
          </div>
        )}

        {/* B2B Advantage Badges Strip */}
        <div style={{
          background: 'rgba(5, 19, 41, 0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-md)',
          padding: '28px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '24px', flexShrink: 0 }}>🚚</div>
            <div>
              <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-white)', margin: '0 0 4px 0' }}>
                Pan-India Logistics
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-gray)', margin: 0, lineHeight: '1.5' }}>
                Palletized secure transit directly across Madhya Pradesh and all major Indian states.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '24px', flexShrink: 0 }}>🛡️</div>
            <div>
              <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-white)', margin: '0 0 4px 0' }}>
                100% Genuine OEM
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-gray)', margin: 0, lineHeight: '1.5' }}>
                Authorized distributor equipment with factory serial tracking and manufacturer warranties.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '24px', flexShrink: 0 }}>📑</div>
            <div>
              <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-white)', margin: '0 0 4px 0' }}>
                GST Tax Invoicing
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-gray)', margin: 0, lineHeight: '1.5' }}>
                Instant GST input credit invoices for builders, contractors, architects, and resort operators.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '24px', flexShrink: 0 }}>🛠️</div>
            <div>
              <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--text-white)', margin: '0 0 4px 0' }}>
                Technical Engineering
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-gray)', margin: 0, lineHeight: '1.5' }}>
                Pump hydraulic curves sizing, pipe sizing calculations, and installation guidance included.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
