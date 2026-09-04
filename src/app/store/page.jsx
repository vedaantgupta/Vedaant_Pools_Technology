"use client";

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function StoreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters & State
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  const categories = [
    'All',
    'Sanitation & Upkeep',
    'Plumbing & Controls',
    'Atmospheric Lighting',
    'Spa & Wellness',
    'Structural Accents',
    'Turnkey Services',
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync category with URL query param
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Filtered & Sorted products
  const processedProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // In-stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.inStock !== false);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'rating') return (b.rating || 4.8) - (a.rating || 4.8);
      if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

    return list;
  }, [products, activeCategory, searchQuery, sortBy, inStockOnly]);

  // Compute count by category
  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Add to inquiry cart local handler
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation(); // Stop navigation!
    try {
      const cart = JSON.parse(localStorage.getItem('vpt_cart') || '[]');
      const existingItemIdx = cart.findIndex((item) => item.product._id === product._id);

      if (existingItemIdx > -1) {
        cart[existingItemIdx].quantity += 1;
      } else {
        cart.push({ product, quantity: 1 });
      }

      localStorage.setItem('vpt_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('vpt-cart-changed'));

      setAddedItemNotice(product.title);
      setTimeout(() => setAddedItemNotice(null), 3000);
    } catch (err) {
      alert('Failed to add product to inquiry cart.');
    }
  };

  return (
    <div className="store-page-root" style={{ background: 'var(--bg-deep)', minHeight: '100vh', paddingBottom: '70px' }}>
      
      {/* Toast Notice when product is added to cart */}
      {addedItemNotice && (
        <div className="cart-toast-notification">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Added <strong>"{addedItemNotice}"</strong> to Inquiry Cart!</span>
          <Link href="/cart" className="toast-cart-link">View Cart &rarr;</Link>
        </div>
      )}

      {/* ---------- Simple, Clean, Best Header Section ---------- */}
      <section className="store-hero-clean">
        <div className="store-wide-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          
          {/* Prominent High-Visibility Store Badge */}
          <div className="store-official-badge">
            <span className="badge-glow-dot" />
            <span className="badge-title-text">VPT Official Hardware Store</span>
          </div>

          <h1 className="text-gradient" style={{ fontSize: '40px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Pool Hardware & Spa Equipments
          </h1>

          <div style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            margin: '0 auto 14px auto',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.4)'
          }} />

          <p style={{ color: 'var(--text-gray)', maxWidth: '700px', margin: '0 auto', fontSize: '15px', lineHeight: '1.6' }}>
            Select premium products and add them to your inquiry cart to request direct factory wholesale B2B quotations. Click any product card to view detailed specifications, multi-angle photos, and reviews.
          </p>

          {/* Value Propositions Strip */}
          <div className="store-perks-strip">
            <div className="perk-item">
              <span className="perk-icon">🚚</span>
              <span>All-India Fast Dispatch</span>
            </div>
            <div className="perk-divider" />
            <div className="perk-item">
              <span className="perk-icon">🛡️</span>
              <span>100% Genuine Quality Tested</span>
            </div>
            <div className="perk-divider" />
            <div className="perk-item">
              <span className="perk-icon">📑</span>
              <span>GST Invoicing for B2B Orders</span>
            </div>
            <div className="perk-divider" />
            <div className="perk-item">
              <span className="perk-icon">⚡</span>
              <span>Direct Factory Pricing</span>
            </div>
          </div>

        </div>
      </section>

      <div className="store-wide-container">

        {/* ---------- Search & Filtering Controls ---------- */}
        <div className="store-controls-card glass-card">
          
          {/* Top Row: Search bar & Sort selector */}
          <div className="controls-top-row">
            
            <div className="search-bar-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, category, or specs..."
                className="store-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="sort-filter-group">
              <div className="stock-toggle">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              <div className="sort-dropdown-wrap">
                <label style={{ fontSize: '13px', color: 'var(--text-muted)', marginRight: '6px' }}>Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="store-select"
                >
                  <option value="featured">⭐ Featured First</option>
                  <option value="rating">🏆 Highest Rated</option>
                  <option value="price-low">💵 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="newest">🕒 Newest Arrivals</option>
                </select>
              </div>
            </div>

          </div>

          {/* Bottom Row: Category Tabs */}
          <div className="category-chips-strip">
            {categories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`category-chip ${isActive ? 'active' : ''}`}
                >
                  <span>{cat}</span>
                  <span className="chip-count">{count}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter & Active Filters Reset */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ color: 'var(--text-gray)', fontSize: '13px' }}>
            Showing <strong style={{ color: 'var(--text-white)' }}>{processedProducts.length}</strong> pool products
            {activeCategory !== 'All' && <span> in <strong style={{ color: 'var(--secondary-color)' }}>{activeCategory}</strong></span>}
            {searchQuery && <span> matching "<em>{searchQuery}</em>"</span>}
          </div>

          {(activeCategory !== 'All' || searchQuery || inStockOnly || sortBy !== 'featured') && (
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setInStockOnly(false);
                setSortBy('featured');
              }}
              className="reset-filters-btn"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* ---------- Products Grid (Every Card Opens Detail Page) ---------- */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '70px 0' }}>
            <div style={{ display: 'inline-block', width: '44px', height: '44px', border: '3px solid var(--border-glass)', borderTopColor: 'var(--secondary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-gray)', marginTop: '16px', fontSize: '14px' }}>Loading catalog inventory...</p>
          </div>
        ) : error ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px', color: '#dc3545', border: '1px solid rgba(220, 53, 69, 0.3)' }}>
            <p style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Failed to Load Catalog</p>
            <p style={{ color: 'var(--text-gray)', fontSize: '13px' }}>{error}</p>
          </div>
        ) : processedProducts.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '8px' }}>No matching products found</h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '13px', maxWidth: '400px', margin: '0 auto 16px auto' }}>
              We couldn't find any products matching your current category or search criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setInStockOnly(false);
              }}
              className="btn btn-primary"
            >
              View Full Catalog
            </button>
          </div>
        ) : (
          <div className="products-responsive-grid">
            {processedProducts.map((prod) => {
              const displayPrice = prod.price;
              const displayMrp = prod.mrp || (displayPrice ? Math.round(displayPrice * 1.25) : null);
              const discountPercent = displayMrp && displayPrice ? Math.round(((displayMrp - displayPrice) / displayMrp) * 100) : 0;
              const ratingVal = prod.rating || 4.8;
              const reviewsVal = prod.numReviews || (prod.reviews ? prod.reviews.length : 12);
              const imageArray = prod.images && prod.images.length > 0 ? prod.images : [prod.imageUrl];

              return (
                <div
                  key={prod._id}
                  onClick={() => router.push(`/store/${prod._id}`)}
                  className="product-card-interactive glass-card"
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') router.push(`/store/${prod._id}`);
                  }}
                >
                  {/* Top Badges */}
                  <div className="card-top-badges">
                    <span className="category-pill-tag">
                      {prod.category}
                    </span>
                    {prod.featured && (
                      <span className="bestseller-tag">
                        ★ Best Seller
                      </span>
                    )}
                    {discountPercent > 0 && !prod.featured && (
                      <span className="discount-tag">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Product Image Area */}
                  <div className="card-image-box">
                    <img
                      src={imageArray[0]}
                      alt={prod.title}
                      className="card-main-img"
                    />
                    
                    {/* Hover indicator pill */}
                    <div className="card-hover-hint">
                      <span>Click to view details &rarr;</span>
                    </div>

                    {/* Stock Status Dot */}
                    <div className="stock-dot-status">
                      <span className="status-dot-green" />
                      <span>In Stock</span>
                    </div>
                  </div>

                  {/* Product Body Content */}
                  <div className="card-body">
                    
                    {/* Brand & Star Rating Row */}
                    <div className="card-rating-row">
                      <span className="brand-label">{prod.brand || 'VPT Pro Series'}</span>
                      <div className="card-stars">
                        <span className="star-char">★</span>
                        <span className="rating-score">{Number(ratingVal).toFixed(1)}</span>
                        <span className="rating-count">({reviewsVal})</span>
                      </div>
                    </div>

                    {/* Product Title */}
                    <h3 className="card-title" title={prod.title}>
                      {prod.title}
                    </h3>

                    {/* Description preview */}
                    <p className="card-desc">
                      {prod.description || 'Professional grade pool engineering fixture designed for commercial longevity and precision flow.'}
                    </p>

                    {/* Price Section */}
                    <div className="card-price-section">
                      {displayPrice ? (
                        <div className="price-block">
                          <span className="current-price">₹{displayPrice.toLocaleString()}</span>
                          {displayMrp && displayMrp > displayPrice && (
                            <span className="mrp-price">₹{displayMrp.toLocaleString()}</span>
                          )}
                        </div>
                      ) : (
                        <div className="custom-quote-badge">
                          Custom Quotation
                        </div>
                      )}
                      <span className="tax-inclusive-tag">Tax Included</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="card-actions-row">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, prod)}
                        className="btn btn-primary card-cart-btn"
                        title="Add to Inquiry Cart"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Add to Cart
                      </button>

                      <span
                        className="card-detail-link"
                        title="View Full Specifications"
                      >
                        Details &rarr;
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Scoped CSS for Store Experience */}
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .store-wide-container {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Toast Notification */
        .cart-toast-notification {
          position: fixed;
          top: 90px;
          right: 24px;
          background: var(--bg-navy);
          border: 1px solid var(--border-active);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 210, 255, 0.2);
          color: #ffffff;
          padding: 12px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 9999;
          font-size: 13px;
          animation: slideInToast 0.3s ease;
        }

        @keyframes slideInToast {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .toast-cart-link {
          color: var(--secondary-color);
          font-weight: 700;
          margin-left: 6px;
          text-decoration: underline;
        }

        /* Store Hero */
        .store-hero-clean {
          padding: 40px 0 25px 0;
          background: linear-gradient(180deg, rgba(9, 28, 54, 0.6) 0%, transparent 100%);
          position: relative;
        }

        /* Highly Visible VPT Store Badge */
        .store-official-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 210, 255, 0.12);
          border: 1px solid rgba(0, 210, 255, 0.35);
          box-shadow: 0 0 16px rgba(0, 210, 255, 0.2);
          padding: 6px 18px;
          border-radius: 30px;
          margin-bottom: 14px;
        }

        .badge-glow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00f2fe;
          box-shadow: 0 0 8px #00f2fe;
        }

        .badge-title-text {
          color: #00f2fe;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .store-perks-strip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          padding: 8px 20px;
          border-radius: 30px;
          margin-top: 18px;
          flex-wrap: wrap;
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-light);
          font-weight: 500;
        }

        .perk-icon {
          font-size: 14px;
        }

        .perk-divider {
          width: 1px;
          height: 12px;
          background: var(--border-glass);
        }

        /* Store Controls */
        .store-controls-card {
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 10px;
        }

        .controls-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-glass);
        }

        .search-bar-wrapper {
          flex: 1;
          min-width: 260px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-navy);
          border: 1px solid var(--border-glass);
          border-radius: 10px;
          padding: 0 12px;
          height: 40px;
          transition: border-color 0.2s ease;
        }

        .search-bar-wrapper:focus-within {
          border-color: var(--secondary-color);
          box-shadow: 0 0 10px rgba(0, 210, 255, 0.2);
        }

        .store-search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: #fff;
          font-size: 13px;
          font-family: inherit;
        }

        .search-clear-btn {
          background: none;
          border: none;
          color: var(--text-gray);
          font-size: 16px;
          cursor: pointer;
        }

        .sort-filter-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-light);
          cursor: pointer;
        }

        .checkbox-label input {
          accent-color: var(--secondary-color);
          cursor: pointer;
        }

        .store-select {
          background: var(--bg-navy);
          color: var(--text-white);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12px;
          cursor: pointer;
          outline: none;
        }

        .store-select:focus {
          border-color: var(--secondary-color);
        }

        /* Category Chips */
        .category-chips-strip {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 2px;
          scrollbar-width: thin;
        }

        .category-chip {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-gray);
          border: 1px solid var(--border-glass);
          padding: 6px 14px;
          font-size: 12px;
          border-radius: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .category-chip:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--border-active);
        }

        .category-chip.active {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
          color: #ffffff;
          border-color: var(--secondary-color);
          box-shadow: 0 3px 12px rgba(0, 100, 255, 0.3);
        }

        .chip-count {
          font-size: 10px;
          background: rgba(0, 0, 0, 0.3);
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 600;
        }

        .reset-filters-btn {
          background: none;
          border: none;
          color: var(--secondary-color);
          font-size: 12px;
          cursor: pointer;
          text-decoration: underline;
        }

        /* Products Grid */
        .products-responsive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        /* Interactive Product Card - Clickable Everywhere */
        .product-card-interactive {
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--border-glass);
          position: relative;
          user-select: none;
        }

        .product-card-interactive:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 210, 255, 0.5);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45), 0 0 20px rgba(0, 210, 255, 0.2);
        }

        /* Badges */
        .card-top-badges {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 6;
          pointer-events: none;
        }

        .category-pill-tag {
          background: var(--bg-navy);
          border: 1px solid var(--border-glass);
          color: var(--secondary-color);
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .bestseller-tag {
          background: linear-gradient(135deg, #ff9900 0%, #ff5500 100%);
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .discount-tag {
          background: #00c853;
          color: #000;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 4px;
        }

        /* Image Box */
        .card-image-box {
          height: 210px;
          background: #ffffff;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          overflow: hidden;
        }

        .card-main-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .product-card-interactive:hover .card-main-img {
          transform: scale(1.06);
        }

        .card-hover-hint {
          position: absolute;
          bottom: 8px;
          background: rgba(5, 19, 41, 0.88);
          color: var(--secondary-color);
          font-size: 10px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 12px;
          opacity: 0;
          transform: translateY(4px);
          transition: all 0.2s ease;
          pointer-events: none;
        }

        .product-card-interactive:hover .card-hover-hint {
          opacity: 1;
          transform: translateY(0);
        }

        .stock-dot-status {
          position: absolute;
          bottom: 8px;
          right: 10px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          color: #2e7d32;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.9);
          padding: 2px 7px;
          border-radius: 10px;
        }

        .status-dot-green {
          width: 5px;
          height: 5px;
          background: #00c853;
          border-radius: 50%;
        }

        /* Card Body */
        .card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
        }

        .card-rating-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .brand-label {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .card-stars {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 11px;
        }

        .star-char {
          color: #ffb400;
        }

        .rating-score {
          font-weight: 700;
          color: var(--text-white);
        }

        .rating-count {
          color: var(--text-muted);
          font-size: 10px;
        }

        .card-title {
          font-size: 15px;
          color: var(--text-white);
          font-weight: 700;
          line-height: 1.35;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 42px;
          transition: color 0.2s ease;
        }

        .product-card-interactive:hover .card-title {
          color: var(--secondary-color);
        }

        .card-desc {
          font-size: 12px;
          color: var(--text-gray);
          line-height: 1.45;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-price-section {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 14px;
          padding-top: 10px;
          border-top: 1px solid var(--border-glass);
        }

        .price-block {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .current-price {
          font-size: 20px;
          font-weight: 800;
          color: var(--accent-color);
        }

        .mrp-price {
          font-size: 12px;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .custom-quote-badge {
          font-size: 14px;
          font-weight: 700;
          color: var(--secondary-color);
        }

        .tax-inclusive-tag {
          font-size: 10px;
          color: var(--text-muted);
        }

        .card-actions-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .card-cart-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          font-size: 12px;
        }

        .card-detail-link {
          color: var(--secondary-color);
          font-size: 12px;
          font-weight: 700;
          padding: 7px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          transition: all 0.2s ease;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
        }

        .product-card-interactive:hover .card-detail-link {
          background: rgba(0, 210, 255, 0.2);
          border-color: var(--secondary-color);
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-gray)' }}><p>Loading VPT Store...</p></div>}>
      <StoreContent />
    </Suspense>
  );
}
