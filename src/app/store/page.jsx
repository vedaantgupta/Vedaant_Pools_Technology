"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function StoreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = [
    'All',
    'Sanitation & Upkeep',
    'Plumbing & Controls',
    'Atmospheric Lighting',
    'Spa & Wellness',
    'Structural Accents',
  ];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Update selected category when query param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Filter products
  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  // Add to inquiry cart local handler
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    try {
      const cart = JSON.parse(localStorage.getItem('vpt_cart') || '[]');
      const existingItemIdx = cart.findIndex(item => item.product._id === product._id);

      if (existingItemIdx > -1) {
        cart[existingItemIdx].quantity += 1;
      } else {
        cart.push({ product, quantity: 1 });
      }

      localStorage.setItem('vpt_cart', JSON.stringify(cart));
      
      // Dispatch custom event to notify Navbar
      window.dispatchEvent(new Event('vpt-cart-changed'));
      
      alert(`🛒 Added "${product.title}" to your Inquiry Cart!`);
    } catch (err) {
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div className="section" style={{ background: 'var(--bg-deep)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="accent-gradient" style={{
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'block',
            marginBottom: '10px'
          }}>
            VPT Retail Store
          </span>
          <h1 className="text-gradient" style={{ fontSize: '42px', marginBottom: '16px' }}>
            Pool Hardware & Spa Equipments
          </h1>
          <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>
            Select products and add them to your inquiry cart to request wholesale B2B quotations.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '50px'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="btn"
              style={{
                background: activeCategory === cat ? 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)' : 'rgba(255, 255, 255, 0.05)',
                color: activeCategory === cat ? 'var(--text-white)' : 'var(--text-gray)',
                border: activeCategory === cat ? 'none' : '1px solid var(--border-glass)',
                padding: '8px 20px',
                fontSize: '14px',
                borderRadius: '20px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid var(--border-glass)', borderTopColor: 'var(--secondary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-gray)', marginTop: '16px' }}>Loading catalog items...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#dc3545' }}>
            <p>Error: {error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: 'var(--text-gray)' }}>No products found in this category.</p>
          </div>
        ) : (
          <div className="grid-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map(prod => (
              <div key={prod._id} className="glass-card" style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '16px'
              }}>
                {/* Image */}
                <div style={{
                  height: '240px',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  position: 'relative'
                }}>
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'var(--bg-navy)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--secondary-color)',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    textTransform: 'uppercase'
                  }}>
                    {prod.category}
                  </span>
                </div>

                {/* Details */}
                <div style={{
                  padding: '24px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h3 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '10px', minHeight: '52px' }}>
                      {prod.title}
                    </h3>
                    <p style={{
                      color: 'var(--text-gray)',
                      fontSize: '13px',
                      lineHeight: '1.5',
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {prod.description || 'No description available.'}
                    </p>
                  </div>

                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '18px'
                    }}>
                      <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-color)' }}>
                        {prod.price ? `₹${prod.price.toLocaleString()}` : 'Custom Quote'}
                      </span>
                      <Link href={`/store/${prod._id}`} style={{ fontSize: '13px', color: 'var(--secondary-color)', fontWeight: '600' }}>
                        View Specs &rarr;
                      </Link>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, prod)}
                      className="btn btn-primary"
                      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    >
                      Add to Inquiry Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}><p>Loading...</p></div>}>
      <StoreContent />
    </Suspense>
  );
}
