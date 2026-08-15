"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ products: 0, inquiries: 0, testimonials: 0 });
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats and inquiries
  const loadDashboardData = async () => {
    try {
      // 1. Fetch products
      const pRes = await fetch('/api/products');
      const productsData = await pRes.json();
      if (!pRes.ok) throw new Error(productsData.error || 'Failed to fetch products');

      // 2. Fetch inquiries
      const iRes = await fetch('/api/inquiries');
      const inquiriesData = await iRes.json();
      if (!iRes.ok) throw new Error(inquiriesData.error || 'Failed to fetch inquiries');

      // 3. Fetch testimonials
      const tRes = await fetch('/api/testimonials');
      const testimonialsData = await tRes.json();
      if (!tRes.ok) throw new Error(testimonialsData.error || 'Failed to fetch testimonials');

      setStats({
        products: Array.isArray(productsData) ? productsData.length : 0,
        inquiries: Array.isArray(inquiriesData) ? inquiriesData.length : 0,
        testimonials: Array.isArray(testimonialsData) ? testimonialsData.length : 0
      });
      setInquiries(Array.isArray(inquiriesData) ? inquiriesData : []);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setInquiries([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Update Inquiry Status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      
      // Update local state
      setInquiries(inquiries.map(inq => inq._id === id ? { ...inq, status: newStatus } : inq));
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this sourcing inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete inquiry');
      
      setInquiries(inquiries.filter(inq => inq._id !== id));
      setStats(prev => ({ ...prev, inquiries: prev.inquiries - 1 }));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <p style={{ color: 'var(--text-gray)' }}>Loading dashboard statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: '#dc3545', textAlign: 'center', padding: '40px 0' }}>
        <p>Error loading dashboard data: {error}</p>
        <button onClick={loadDashboardData} className="btn btn-secondary" style={{ marginTop: '16px' }}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--text-white)' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-gray)' }}>VPT Sourcing inquiries, catalog volume, and review statistics.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid-3" style={{ marginBottom: '50px', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', position: 'relative', borderLeft: '4px solid var(--secondary-color)' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
            Products In Catalog
          </span>
          <h2 style={{ fontSize: '36px', color: 'var(--text-white)', marginTop: '8px' }}>
            {stats.products}
          </h2>
          <Link href="/admin/products" style={{ display: 'inline-block', marginTop: '12px', fontSize: '13px', color: 'var(--secondary-color)', fontWeight: '600' }}>
            Manage Catalog &rarr;
          </Link>
        </div>

        <div className="glass-card" style={{ padding: '24px', position: 'relative', borderLeft: '4px solid var(--accent-color)' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
            Quotation Inquiries
          </span>
          <h2 style={{ fontSize: '36px', color: 'var(--text-white)', marginTop: '8px' }}>
            {stats.inquiries}
          </h2>
          <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '13px', color: 'var(--accent-color)', fontWeight: '600' }}>
            Customer Requests
          </span>
        </div>

        <div className="glass-card" style={{ padding: '24px', position: 'relative', borderLeft: '4px solid #ffcb05' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
            Total Client Reviews
          </span>
          <h2 style={{ fontSize: '36px', color: 'var(--text-white)', marginTop: '8px' }}>
            {stats.testimonials}
          </h2>
          <Link href="/admin/testimonials" style={{ display: 'inline-block', marginTop: '12px', fontSize: '13px', color: '#ffcb05', fontWeight: '600' }}>
            Approve Testimonials &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="glass-card" style={{ padding: '30px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--text-white)', marginBottom: '24px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
          Quotation Requests & general messages
        </h2>

        {inquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--text-gray)' }}>No inquiries found in the database.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {inquiries.map((inq) => {
              const dateStr = inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'N/A';
              
              // Status Badge color
              let badgeColor = 'var(--text-gray)';
              let badgeBg = 'rgba(255, 255, 255, 0.05)';
              if (inq.status === 'pending') {
                badgeColor = '#ffc107';
                badgeBg = 'rgba(255, 193, 7, 0.1)';
              } else if (inq.status === 'reviewed') {
                badgeColor = 'var(--secondary-color)';
                badgeBg = 'rgba(0, 210, 255, 0.1)';
              } else if (inq.status === 'completed') {
                badgeColor = '#28a745';
                badgeBg = 'rgba(40, 167, 69, 0.1)';
              }

              const isGeneralContact = inq.items.length === 0;

              return (
                <div key={inq._id} style={{
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.01)'
                }}>
                  {/* Inquiry Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', color: 'var(--text-white)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        <span>{inq.customerName}</span>
                        {inq.company && <span style={{ fontSize: '13px', color: 'var(--text-gray)', fontWeight: 'normal' }}>({inq.company})</span>}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        📧 {inq.email} • 📞 {inq.phone} • 📅 {dateStr}
                      </p>
                    </div>

                    {/* Status & Delete */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {/* Status Selector */}
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateStatus(inq._id, e.target.value)}
                        style={{
                          background: badgeBg,
                          color: badgeColor,
                          border: `1px solid ${badgeColor}`,
                          borderRadius: '20px',
                          padding: '4px 12px',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="pending" style={{ background: 'var(--bg-navy)', color: '#ffc107' }}>Pending Review</option>
                        <option value="reviewed" style={{ background: 'var(--bg-navy)', color: 'var(--secondary-color)' }}>Contacted / Reviewed</option>
                        <option value="completed" style={{ background: 'var(--bg-navy)', color: '#28a745' }}>Fulfilled</option>
                      </select>

                      <button
                        onClick={() => handleDeleteInquiry(inq._id)}
                        className="btn"
                        style={{
                          padding: '6px 12px',
                          fontSize: '12px',
                          borderRadius: '20px',
                          background: 'rgba(220, 53, 69, 0.1)',
                          border: '1px solid rgba(220, 53, 69, 0.3)',
                          color: '#dc3545',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Inquiry Content */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '16px' }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-light)', fontStyle: 'italic', marginBottom: isGeneralContact ? '0' : '16px' }}>
                      "{inq.message || 'No custom message specified.'}"
                    </p>

                    {/* Cart Items Table */}
                    {!isGeneralContact && (
                      <div style={{ borderTop: '1px dashed var(--border-glass)', paddingTop: '14px' }}>
                        <h4 style={{ fontSize: '13px', color: 'var(--secondary-color)', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>
                          Items Requested for Quotation
                        </h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {inq.items.map((item, idx) => {
                            if (!item.product) {
                              return <li key={idx} style={{ fontSize: '13px', color: 'var(--text-muted)' }}>[Product deleted from catalog] • Qty: {item.quantity}</li>;
                            }
                            return (
                              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-light)' }}>
                                <span>🔹 {item.product.title} <span style={{ color: 'var(--text-muted)' }}>({item.product.category})</span></span>
                                <span style={{ fontWeight: '600' }}>
                                  Qty: {item.quantity} • {item.product.price ? `₹${(item.product.price * item.quantity).toLocaleString()}` : 'Custom'}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
