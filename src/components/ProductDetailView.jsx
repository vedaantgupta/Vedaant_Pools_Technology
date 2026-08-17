"use client";

import Link from 'next/link';
import ProductImageZoom from '@/components/ProductImageZoom';
import ProductBuyBox from '@/components/ProductBuyBox';
import ProductReviewsSection from '@/components/ProductReviewsSection';

export default function ProductDetailView({ product, relatedProducts = [] }) {
  if (!product) return null;

  // Convert specs to array of entries if needed
  const specsObj = product.specs ? (product.specs instanceof Map ? Object.fromEntries(product.specs) : product.specs) : {};
  const specsEntries = Object.entries(specsObj);

  // Setup gallery images array
  const imageList = product.images && product.images.length > 0 ? product.images : [product.imageUrl];

  // Pricing calculations
  const price = product.price;
  const mrp = product.mrp || (price ? Math.round(price * 1.25) : null);
  const discountPercent = mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const rating = product.rating || 4.8;
  const numReviews = product.numReviews || (product.reviews ? product.reviews.length : 18);

  // Highlights list
  const highlights = product.highlights && product.highlights.length > 0
    ? product.highlights
    : [
        `Engineered specifically for heavy-duty ${product.category} applications.`,
        'High-density corrosion-resistant structural materials built to withstand swimming pool chlorination and UV exposure.',
        'Precision engineered by Vedaant Pools Technology with standard industry universal fitting compatibility.',
        'Supplied with manufacturer warranty and full on-site B2B technical installation guidance.'
      ];

  return (
    <div className="product-detail-view" style={{ background: 'var(--bg-deep)', minHeight: '100vh', padding: '16px 0 60px 0' }}>
      <div className="detail-wide-container">
        
        {/* ---------- Breadcrumbs Navigation ---------- */}
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="crumb-sep">/</span>
          <Link href="/store">Store</Link>
          <span className="crumb-sep">/</span>
          <Link href={`/store?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{product.title}</span>
        </nav>

        {/* ---------- Top 3-Column Product Showcase ---------- */}
        <div className="product-showcase-grid">
          
          {/* Column 1: Amazon-Style Multi-Image Interactive Zoom Stage */}
          <div className="showcase-left-col">
            <ProductImageZoom
              images={imageList}
              title={product.title}
              category={product.category}
              badge={product.featured ? 'Best Seller' : ''}
            />
          </div>

          {/* Column 2: Product Core Info & Specs Highlights */}
          <div className="showcase-mid-col">
            
            {/* Brand / Series Pill */}
            <div className="brand-header-row">
              <span className="brand-badge-pill">
                {product.brand || 'VPT Pro Series'}
              </span>
              <span className="verified-mfg-tag">
                ✓ Manufacturer Direct
              </span>
            </div>

            {/* Title */}
            <h1 className="product-main-title">
              {product.title}
            </h1>

            {/* Rating Stars & Customer Count (Amazon Style) */}
            <div className="product-rating-summary-strip">
              <div className="stars-group">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ color: s <= Math.round(rating) ? '#ffb400' : 'rgba(255,255,255,0.2)' }}>
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-score-bold">{Number(rating).toFixed(1)}</span>
              <span className="rating-divider">|</span>
              <a href="#customer-reviews" className="rating-reviews-link">
                {numReviews} verified ratings
              </a>
              <span className="rating-divider">|</span>
              <span className="bought-past-month">100+ units supplied</span>
            </div>

            <div className="divider-line" />

            {/* Price Block */}
            <div className="product-pricing-box">
              {price ? (
                <>
                  <div className="price-primary-row">
                    {discountPercent > 0 && (
                      <span className="discount-percent-badge">
                        -{discountPercent}%
                      </span>
                    )}
                    <span className="price-currency-symbol">₹</span>
                    <span className="price-amount-large">{price.toLocaleString()}</span>
                    <span className="price-per-unit">/ Unit</span>
                  </div>

                  {mrp && mrp > price && (
                    <div className="mrp-row">
                      <span className="mrp-label">M.R.P.:</span>
                      <span className="mrp-strikethrough">₹{mrp.toLocaleString()}</span>
                      <span className="mrp-savings">You Save: ₹{(mrp - price).toLocaleString()} ({discountPercent}%)</span>
                    </div>
                  )}

                  <div className="tax-notice">
                    Inclusive of all taxes • GST Input Tax Credit available on invoice
                  </div>
                </>
              ) : (
                <div className="quote-only-pricing">
                  <div className="quote-title">Custom Project Quotation Required</div>
                  <div className="tax-notice">Contact our engineering desk for customized volume-based pricing.</div>
                </div>
              )}
            </div>

            {/* Amazon-style Feature Trust Badges Row */}
            <div className="trust-badges-bar">
              <div className="trust-badge-item">
                <div className="trust-badge-icon">🚚</div>
                <div className="trust-badge-title">Fast Dispatch</div>
                <div className="trust-badge-sub">24-48 Hours</div>
              </div>
              <div className="trust-badge-item">
                <div className="trust-badge-icon">🔄</div>
                <div className="trust-badge-title">7 Days</div>
                <div className="trust-badge-sub">Replacement</div>
              </div>
              <div className="trust-badge-item">
                <div className="trust-badge-icon">🛡️</div>
                <div className="trust-badge-title">1-2 Year</div>
                <div className="trust-badge-sub">VPT Warranty</div>
              </div>
              <div className="trust-badge-item">
                <div className="trust-badge-icon">🛠️</div>
                <div className="trust-badge-title">Installation</div>
                <div className="trust-badge-sub">On-Site Support</div>
              </div>
            </div>

            <div className="divider-line" />

            {/* Key Specs Table Preview (IndiaMART style) */}
            <div className="quick-specs-container">
              <h3 className="specs-section-title">Technical Specifications Overview</h3>
              <div className="quick-specs-grid">
                <div className="spec-item-cell">
                  <span className="spec-cell-label">Category:</span>
                  <span className="spec-cell-value">{product.category}</span>
                </div>
                <div className="spec-item-cell">
                  <span className="spec-cell-label">Manufacturer:</span>
                  <span className="spec-cell-value">Vedaant Pools</span>
                </div>
                {specsEntries.slice(0, 4).map(([k, v]) => (
                  <div key={k} className="spec-item-cell">
                    <span className="spec-cell-label">{k}:</span>
                    <span className="spec-cell-value">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* "About This Item" Highlights (Amazon style) */}
            <div className="about-item-section">
              <h3 className="specs-section-title">About this item</h3>
              <ul className="about-bullets-list">
                {highlights.map((h, i) => (
                  <li key={i} className="about-bullet-item">
                    <span className="bullet-dot">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Column 3: Amazon Style Sticky Buy & Instant Inquiry Box */}
          <div className="showcase-right-col">
            <ProductBuyBox product={product} />
          </div>

        </div>

        {/* ---------- Full Technical Specifications Sheet ---------- */}
        <div className="glass-card full-specs-card" style={{ padding: '28px', marginTop: '36px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text-white)', marginBottom: '16px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
            Complete Engineering & Material Specifications
          </h2>

          <div className="full-specs-table-wrapper">
            <table className="full-specs-table">
              <thead>
                <tr>
                  <th style={{ width: '38%' }}>Technical Parameter</th>
                  <th>Value / Engineering Standard</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="spec-param-name">Product Model</td>
                  <td className="spec-param-val">{product.title}</td>
                </tr>
                <tr>
                  <td className="spec-param-name">Application Domain</td>
                  <td className="spec-param-val">{product.category}</td>
                </tr>
                <tr>
                  <td className="spec-param-name">Manufacturer & Distributor</td>
                  <td className="spec-param-val">Vedaant Pools Technology (Indore, Madhya Pradesh)</td>
                </tr>
                {specsEntries.map(([key, val]) => (
                  <tr key={key}>
                    <td className="spec-param-name">{key}</td>
                    <td className="spec-param-val">{val}</td>
                  </tr>
                ))}
                <tr>
                  <td className="spec-param-name">Chemical Compatibility</td>
                  <td className="spec-param-val">Resistant to Chlorine, Saltwater, Bromine, and UV Clarifiers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- Ratings & Customer Reviews Section ---------- */}
        <div id="customer-reviews">
          <ProductReviewsSection
            productId={product._id}
            initialRating={product.rating || 4.8}
            initialNumReviews={product.numReviews || (product.reviews ? product.reviews.length : 0)}
            initialReviews={product.reviews || []}
          />
        </div>

        {/* ---------- Frequently Bought Together / Related Hardware ---------- */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section" style={{ marginTop: '48px' }}>
            <div style={{ marginBottom: '18px' }}>
              <span className="accent-gradient" style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Frequently Bought Together
              </span>
              <h2 style={{ fontSize: '22px', color: 'var(--text-white)', marginTop: '4px' }}>
                Related Aquatic Hardware & Fittings
              </h2>
            </div>

            <div className="related-grid">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/store/${rel._id}`}
                  className="related-item-card glass-card"
                >
                  <div className="related-img-box">
                    <img src={rel.imageUrl} alt={rel.title} />
                  </div>
                  <div className="related-info">
                    <span className="related-category">{rel.category}</span>
                    <h4 className="related-title">{rel.title}</h4>
                    <div className="related-price">
                      {rel.price ? `₹${rel.price.toLocaleString()}` : 'Custom Quote'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        .product-detail-view {
          color: var(--text-light);
        }

        .detail-wide-container {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Breadcrumb */
        .detail-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-gray);
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .crumb-sep {
          color: var(--text-muted);
        }

        .crumb-active {
          color: var(--text-white);
          font-weight: 600;
        }

        /* 3-Column Showcase Grid with compact margins & gaps */
        .product-showcase-grid {
          display: grid;
          grid-template-columns: 420px 1fr 310px;
          gap: 22px;
          align-items: start;
        }

        .showcase-left-col {
          position: sticky;
          top: 90px;
        }

        .showcase-mid-col {
          display: flex;
          flex-direction: column;
        }

        /* Mid Column Elements */
        .brand-header-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .brand-badge-pill {
          background: rgba(0, 210, 255, 0.1);
          border: 1px solid var(--border-active);
          color: var(--secondary-color);
          font-size: 10px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .verified-mfg-tag {
          font-size: 11px;
          color: #00e676;
          font-weight: 600;
        }

        .product-main-title {
          font-size: 26px;
          font-weight: 700;
          color: var(--text-white);
          line-height: 1.3;
          margin-bottom: 10px;
        }

        .product-rating-summary-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          flex-wrap: wrap;
        }

        .stars-group {
          font-size: 14px;
          letter-spacing: 1px;
        }

        .rating-score-bold {
          font-weight: 700;
          color: var(--text-white);
        }

        .rating-divider {
          color: var(--border-glass);
        }

        .rating-reviews-link {
          color: var(--secondary-color);
          text-decoration: underline;
          cursor: pointer;
        }

        .bought-past-month {
          color: var(--text-muted);
          font-size: 11px;
        }

        .divider-line {
          height: 1px;
          background: var(--border-glass);
          margin: 14px 0;
        }

        /* Pricing Box */
        .product-pricing-box {
          margin-bottom: 14px;
        }

        .price-primary-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .discount-percent-badge {
          color: #ff5252;
          font-size: 24px;
          font-weight: 500;
          line-height: 1;
        }

        .price-currency-symbol {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-white);
          margin-right: -2px;
        }

        .price-amount-large {
          font-size: 32px;
          font-weight: 800;
          color: var(--text-white);
          line-height: 1;
        }

        .price-per-unit {
          font-size: 13px;
          color: var(--text-gray);
          margin-left: 4px;
        }

        .mrp-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
          font-size: 12px;
        }

        .mrp-label {
          color: var(--text-muted);
        }

        .mrp-strikethrough {
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .mrp-savings {
          color: #00e676;
          font-weight: 600;
        }

        .tax-notice {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .quote-only-pricing {
          padding: 10px 14px;
          background: rgba(0, 210, 255, 0.06);
          border-left: 3px solid var(--secondary-color);
          border-radius: 4px;
        }

        .quote-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--secondary-color);
        }

        /* Trust Badges Bar */
        .trust-badges-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin: 14px 0;
          padding: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          text-align: center;
        }

        .trust-badge-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .trust-badge-icon {
          font-size: 18px;
          margin-bottom: 2px;
        }

        .trust-badge-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-white);
        }

        .trust-badge-sub {
          font-size: 10px;
          color: var(--text-muted);
        }

        /* Quick Specs Table Grid */
        .quick-specs-container {
          margin-bottom: 16px;
        }

        .specs-section-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 8px;
        }

        .quick-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 10px;
          padding: 10px 12px;
        }

        .spec-item-cell {
          display: flex;
          font-size: 12px;
        }

        .spec-cell-label {
          color: var(--text-muted);
          min-width: 90px;
          font-weight: 500;
        }

        .spec-cell-value {
          color: var(--text-light);
          font-weight: 600;
        }

        /* About Item Highlights */
        .about-item-section {
          margin-top: 8px;
        }

        .about-bullets-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .about-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-light);
        }

        .bullet-dot {
          color: var(--secondary-color);
          font-weight: bold;
        }

        /* Full Specifications Table */
        .full-specs-table-wrapper {
          overflow-x: auto;
        }

        .full-specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          text-align: left;
        }

        .full-specs-table th {
          padding: 10px 12px;
          color: var(--secondary-color);
          border-bottom: 2px solid var(--border-glass);
          font-weight: 700;
        }

        .full-specs-table td {
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-glass);
        }

        .spec-param-name {
          color: var(--text-white);
          font-weight: 600;
        }

        .spec-param-val {
          color: var(--text-gray);
        }

        /* Related Products Grid */
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }

        .related-item-card {
          border-radius: 14px;
          overflow: hidden;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .related-item-card:hover {
          transform: translateY(-4px);
          border-color: var(--secondary-color);
        }

        .related-img-box {
          height: 140px;
          background: #fff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        .related-img-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .related-category {
          font-size: 10px;
          color: var(--secondary-color);
          text-transform: uppercase;
          font-weight: 700;
        }

        .related-title {
          font-size: 13px;
          color: var(--text-white);
          margin: 2px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .related-price {
          font-size: 15px;
          font-weight: 800;
          color: var(--accent-color);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .product-showcase-grid {
            grid-template-columns: 380px 1fr;
          }
          .showcase-right-col {
            grid-column: span 2;
          }
        }

        @media (max-width: 860px) {
          .product-showcase-grid {
            grid-template-columns: 1fr;
          }
          .showcase-left-col {
            position: static;
          }
          .showcase-right-col {
            grid-column: span 1;
          }
          .trust-badges-bar {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
