"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ProductBuyBox({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [addedNotice, setAddedNotice] = useState(false);

  const price = product.price || 0;
  const mrp = product.mrp || (price ? Math.round(price * 1.25) : 0);
  const inStock = product.inStock !== false;

  const handleQtyChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('vpt_cart') || '[]');
      const existingItemIdx = cart.findIndex((item) => item.product._id === product._id);

      if (existingItemIdx > -1) {
        cart[existingItemIdx].quantity += quantity;
      } else {
        cart.push({ product, quantity });
      }

      localStorage.setItem('vpt_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('vpt-cart-changed'));

      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 3500);
    } catch (err) {
      alert('Failed to add product to inquiry cart.');
    }
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length >= 6) {
      setDeliveryResult(`Estimated delivery by ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })} to PIN ${pincode}`);
    } else {
      setDeliveryResult('Please enter a valid 6-digit Indian PIN code');
    }
  };

  // WhatsApp instant quote query
  const whatsappUrl = `https://wa.me/919479940047?text=${encodeURIComponent(`Hello Yogendra Gupta (Vedaant Pools), I would like to request an instant quote for: "${product.title}" (Qty: ${quantity}). Please share bulk pricing and delivery terms.`)}`;

  return (
    <div className="product-buybox-card glass-card">
      
      {/* Price Header inside Buybox */}
      <div className="buybox-price-header">
        {price ? (
          <div>
            <div className="buybox-price">₹{(price * quantity).toLocaleString()}</div>
            <div className="buybox-unit-price">
              {quantity > 1 ? `(₹${price.toLocaleString()} each)` : 'Inclusive of all taxes'}
            </div>
          </div>
        ) : (
          <div className="buybox-quote-text">Wholesale Quote on Request</div>
        )}

        <div className={`stock-badge ${inStock ? 'in-stock' : 'out-of-stock'}`}>
          <span className="stock-dot" />
          {inStock ? 'In Stock (Ready to Dispatch)' : 'Pre-order on Request'}
        </div>
      </div>

      {/* Quantity Stepper */}
      <div className="quantity-row">
        <label className="qty-label">Quantity:</label>
        <div className="stepper-wrap">
          <button
            type="button"
            onClick={() => handleQtyChange(-1)}
            disabled={quantity <= 1}
            className="stepper-btn"
          >
            -
          </button>
          <span className="stepper-value">{quantity}</span>
          <button
            type="button"
            onClick={() => handleQtyChange(1)}
            className="stepper-btn"
          >
            +
          </button>
        </div>
      </div>

      {/* Add To Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!inStock}
        className="btn btn-primary buybox-cart-btn"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        Add to Inquiry Cart
      </button>

      {/* Instant Quote / WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="buybox-whatsapp-btn"
      >
        <span style={{ fontSize: '18px' }}>💬</span>
        Instant WhatsApp Quote / Call
      </a>

      {/* Added notice banner */}
      {addedNotice && (
        <div className="cart-feedback-banner">
          ✓ Added {quantity} item(s) to Inquiry Cart!
          <Link href="/cart" style={{ marginLeft: '6px', color: 'var(--secondary-color)', fontWeight: '700', textDecoration: 'underline' }}>
            Go to Cart
          </Link>
        </div>
      )}

      {/* B2B Procurement info */}
      <div className="b2b-info-list">
        <div className="b2b-item">
          <span className="b2b-icon">🏢</span>
          <div>
            <strong>Sold by:</strong> Vedaant Pools Technology Warehouse
          </div>
        </div>
        <div className="b2b-item">
          <span className="b2b-icon">🧾</span>
          <div>
            <strong>GST Invoice:</strong> Available for Input Tax Credit
          </div>
        </div>
        <div className="b2b-item">
          <span className="b2b-icon">📦</span>
          <div>
            <strong>Bulk Discount:</strong> For orders over 5+ units
          </div>
        </div>
      </div>

      {/* Pincode delivery check */}
      <div className="pincode-checker-box">
        <label className="pincode-label">Check Dispatch & Delivery:</label>
        <form onSubmit={handlePincodeCheck} className="pincode-form">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit Pincode"
            className="pincode-input"
          />
          <button type="submit" className="pincode-check-btn">
            Check
          </button>
        </form>
        {deliveryResult && (
          <div className="delivery-status-text">
            {deliveryResult}
          </div>
        )}
      </div>

      {/* Buybox Styles */}
      <style jsx>{`
        .product-buybox-card {
          padding: 24px;
          border-radius: 20px;
          border: 1px solid var(--border-active);
          background: rgba(9, 28, 54, 0.95);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          position: sticky;
          top: 100px;
        }

        .buybox-price-header {
          margin-bottom: 18px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-glass);
        }

        .buybox-price {
          font-size: 30px;
          font-weight: 800;
          color: var(--accent-color);
          line-height: 1.2;
        }

        .buybox-unit-price {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .buybox-quote-text {
          font-size: 18px;
          font-weight: 700;
          color: var(--secondary-color);
        }

        .stock-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          margin-top: 10px;
          padding: 4px 10px;
          border-radius: 12px;
        }

        .stock-badge.in-stock {
          background: rgba(0, 200, 83, 0.15);
          color: #00e676;
          border: 1px solid rgba(0, 200, 83, 0.3);
        }

        .stock-badge.out-of-stock {
          background: rgba(255, 153, 0, 0.15);
          color: #ffb400;
          border: 1px solid rgba(255, 153, 0, 0.3);
        }

        .stock-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
        }

        .quantity-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .qty-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-light);
        }

        .stepper-wrap {
          display: flex;
          align-items: center;
          background: var(--bg-deep);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          overflow: hidden;
        }

        .stepper-btn {
          width: 34px;
          height: 34px;
          background: none;
          border: none;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .stepper-btn:hover:not(:disabled) {
          background: rgba(0, 210, 255, 0.2);
        }

        .stepper-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .stepper-value {
          width: 38px;
          text-align: center;
          font-weight: 700;
          color: #fff;
          font-size: 14px;
        }

        .buybox-cart-btn {
          width: 100%;
          padding: 14px;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .buybox-whatsapp-btn {
          width: 100%;
          padding: 12px;
          font-size: 13px;
          font-weight: 700;
          background: rgba(37, 211, 102, 0.15);
          color: #25d366;
          border: 1px solid rgba(37, 211, 102, 0.4);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          text-align: center;
        }

        .buybox-whatsapp-btn:hover {
          background: #25d366;
          color: #000;
        }

        .cart-feedback-banner {
          margin-top: 12px;
          padding: 8px 12px;
          background: rgba(0, 200, 83, 0.15);
          border: 1px solid #00c853;
          border-radius: 8px;
          font-size: 12px;
          color: #69f0ae;
          text-align: center;
        }

        .b2b-info-list {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border-glass);
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 12px;
          color: var(--text-gray);
        }

        .b2b-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .b2b-item strong {
          color: var(--text-light);
        }

        .b2b-icon {
          font-size: 14px;
        }

        .pincode-checker-box {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border-glass);
        }

        .pincode-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-light);
          display: block;
          margin-bottom: 6px;
        }

        .pincode-form {
          display: flex;
          gap: 8px;
        }

        .pincode-input {
          flex: 1;
          background: var(--bg-deep);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 6px 10px;
          color: #fff;
          font-size: 13px;
          outline: none;
        }

        .pincode-input:focus {
          border-color: var(--secondary-color);
        }

        .pincode-check-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--border-glass);
          color: var(--text-white);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .pincode-check-btn:hover {
          background: var(--primary-color);
        }

        .delivery-status-text {
          margin-top: 8px;
          font-size: 11px;
          color: #00e676;
        }
      `}</style>
    </div>
  );
}
