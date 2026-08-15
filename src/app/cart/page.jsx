"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('vpt_cart') || '[]');
      setCartItems(cart);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update quantity in cart
  const updateQuantity = (productID, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item => {
      if (item.product._id === productID) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('vpt_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('vpt-cart-changed'));
  };

  // Remove item from cart
  const removeItem = (productID) => {
    const filtered = cartItems.filter(item => item.product._id !== productID);
    setCartItems(filtered);
    localStorage.setItem('vpt_cart', JSON.stringify(filtered));
    window.dispatchEvent(new Event('vpt-cart-changed'));
  };

  // Compute Total Quote Estimate
  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.product.price || 0;
    return total + (price * item.quantity);
  }, 0);

  if (loading) {
    return (
      <div className="section flex-center" style={{ minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-gray)' }}>Loading your inquiry cart...</p>
      </div>
    );
  }

  return (
    <div className="section" style={{ background: 'var(--bg-deep)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ marginBottom: '40px' }}>
          <h1 className="text-gradient" style={{ fontSize: '38px' }}>Your Inquiry Cart</h1>
          <p style={{ color: 'var(--text-gray)' }}>Review items selected for quotation before submitting the request.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="glass-card" style={{ padding: '60px 40px', textAlign: 'center' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '20px' }}>🛒</span>
            <h2 style={{ fontSize: '22px', color: 'var(--text-white)', marginBottom: '10px' }}>Your Cart is Empty</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>You haven't selected any pool hardware or wellness generators for quotation yet.</p>
            <Link href="/store" className="btn btn-primary">
              Browse Store Products
            </Link>
          </div>
        ) : (
          <div className="grid-3" style={{ gridTemplateColumns: '2.2fr 1fr', gap: '30px', alignItems: 'start' }}>
            
            {/* Left: Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item) => (
                <div key={item.product._id} className="glass-card" style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}>
                  {/* Image */}
                  <div style={{
                    width: '90px',
                    height: '90px',
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--secondary-color)', fontWeight: '600', textTransform: 'uppercase' }}>
                      {item.product.category}
                    </span>
                    <h3 style={{ fontSize: '16px', color: 'var(--text-white)', margin: '4px 0 8px 0' }}>
                      {item.product.title}
                    </h3>
                    <span style={{ fontSize: '17px', fontWeight: '800', color: 'var(--accent-color)' }}>
                      {item.product.price ? `₹${item.product.price.toLocaleString()}` : 'Custom Quote'}
                    </span>
                  </div>

                  {/* Quantity & Delete Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                    {/* Qty Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '4px 12px' }}>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-white)', cursor: 'pointer', fontSize: '16px', padding: '0 8px' }}
                      >
                        -
                      </button>
                      <span style={{ padding: '0 12px', fontWeight: '700', color: 'var(--text-white)', fontSize: '15px' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-white)', cursor: 'pointer', fontSize: '16px', padding: '0 8px' }}
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Icon Button */}
                    <button
                      onClick={() => removeItem(item.product._id)}
                      style={{
                        background: 'rgba(220, 53, 69, 0.1)',
                        border: '1px solid rgba(220, 53, 69, 0.3)',
                        color: '#dc3545',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'var(--transition-smooth)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#dc3545'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(220, 53, 69, 0.1)'; e.currentTarget.style.color = '#dc3545'; }}
                      aria-label="Remove item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Summary Card */}
            <div className="glass-card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '20px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
                Quotation Summary
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: 'var(--text-gray)' }}>
                <span>Selected Items:</span>
                <span style={{ color: 'var(--text-white)', fontWeight: '600' }}>
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Units
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '14px', color: 'var(--text-gray)' }}>
                <span>Subtotal (Estimate):</span>
                <span style={{ color: 'var(--accent-color)', fontWeight: '800', fontSize: '18px' }}>
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px dashed var(--border-glass)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                  ⚠️ <strong>B2B Inquiry Notice:</strong> This is a price quotation request estimate. Shipping costs, GST taxes, and bulk trade discounts will be computed and communicated directly by Yogendra Gupta's sales team upon review.
                </p>
              </div>

              <Link href="/checkout" className="btn btn-accent" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                Proceed to Checkout
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
