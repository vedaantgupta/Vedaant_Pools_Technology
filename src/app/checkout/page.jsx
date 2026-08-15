"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  // Load cart
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('vpt_cart') || '[]');
      setCartItems(cart);
      if (cart.length === 0) {
        router.push('/store');
      }
    } catch (err) {
      console.error(err);
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      // Map cartItems to schema format
      const formattedItems = cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }));

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          items: formattedItems
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit checkout.');

      // Clear Cart
      localStorage.removeItem('vpt_cart');
      window.dispatchEvent(new Event('vpt-cart-changed'));

      setStatus({ loading: false, success: true, error: null });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  if (status.success) {
    return (
      <div className="section flex-center" style={{ minHeight: '80vh', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '50px 40px', maxWidth: '600px', margin: '0 auto' }}>
          <span style={{ fontSize: '64px', display: 'block', marginBottom: '20px' }}>🎉</span>
          <h1 className="text-gradient" style={{ fontSize: '32px', marginBottom: '16px' }}>Inquiry Submitted!</h1>
          <p style={{ color: 'var(--text-gray)', marginBottom: '30px', lineHeight: '1.7' }}>
            Thank you! Your quotation request has been securely saved in our database. Founder <strong>Yogendra Gupta</strong> or a B2B representative from our Nanda Nagar correspondence office will email/call you shortly with an official price sheet.
          </p>
          <Link href="/store" className="btn btn-accent">
            Back to Product Store
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((total, item) => {
    return total + ((item.product.price || 0) * item.quantity);
  }, 0);

  return (
    <div className="section" style={{ background: 'var(--bg-deep)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ marginBottom: '40px' }}>
          <h1 className="text-gradient" style={{ fontSize: '38px' }}>Quotation Checkout</h1>
          <p style={{ color: 'var(--text-gray)' }}>Complete your company details to submit the quotation request.</p>
        </div>

        <div className="grid-3" style={{ gridTemplateColumns: '1.8fr 1.2fr', gap: '30px', alignItems: 'start' }}>
          
          {/* Left: Contact Information Form */}
          <div className="glass-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '22px', color: 'var(--text-white)', marginBottom: '24px' }}>
              Buyer Information
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Mobile / Office Contact"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Company Name / Site Name (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. Vedaant Hotels, Indore"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Note / Custom Specs Request</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Please specify if you require urgent delivery by road, customized pipe lengths, or special voltage light bulbs..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-accent w-100"
                style={{ width: '100%', padding: '14px 0' }}
                disabled={status.loading}
              >
                {status.loading ? 'Submitting Sourcing Inquiry...' : 'Submit Official Quote Request'}
              </button>

              {status.error && (
                <p style={{ marginTop: '16px', color: '#dc3545', fontSize: '14px', fontWeight: '500' }}>
                  ❌ Error: {status.error}
                </p>
              )}
            </form>
          </div>

          {/* Right: Items Overview */}
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '20px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
              Items Selected ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', paddingRight: '8px' }}>
              {cartItems.map((item) => (
                <div key={item.product._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <div style={{ width: '70%' }}>
                    <span style={{ color: 'var(--text-white)', fontWeight: '600', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.product.title}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} • {item.product.category}
                    </span>
                  </div>
                  <span style={{ color: 'var(--accent-color)', fontWeight: '700' }}>
                    {item.product.price ? `₹${(item.product.price * item.quantity).toLocaleString()}` : 'Custom'}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontWeight: '600', color: 'var(--text-white)' }}>Total Estimate:</span>
              <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-color)' }}>
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '12px', fontSize: '11px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
              ℹ️ <strong>RTGS/NEFT payment</strong>, cash transactions, or cheque payments will be aligned directly after the quotation sheet is finalized. Shipping is handled directly <strong>By Road</strong> commercial carriage.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
