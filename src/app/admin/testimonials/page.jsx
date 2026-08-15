"use client";

import { useState, useEffect } from 'react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch testimonials');
      setTestimonials(Array.isArray(data) ? data : []);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setTestimonials([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Update status (Approve / Reject)
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (!res.ok) throw new Error('Failed to moderate review');

      alert(`Testimonial status set to ${status}!`);
      // Update local state
      setTestimonials(testimonials.map(t => t._id === id ? { ...t, status } : t));
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete review
  const handleDeleteReview = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this client review?')) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) throw new Error('Failed to delete review');

      setTestimonials(testimonials.filter(t => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <p style={{ color: 'var(--text-gray)' }}>Loading client reviews...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--text-white)' }}>Moderate Client Reviews</h1>
        <p style={{ color: 'var(--text-gray)' }}>Approve pending reviews to show them on the public homepage, or delete spam submissions.</p>
      </div>

      {/* Reviews List */}
      <div className="glass-card" style={{ padding: '30px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--text-white)', marginBottom: '24px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
          All Submitted Reviews ({testimonials.length})
        </h2>

        {error ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ color: '#dc3545' }}>Error loading testimonials: {error}</p>
          </div>
        ) : !Array.isArray(testimonials) || testimonials.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--text-gray)' }}>No reviews found in the database.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {testimonials.map((review) => {
              const dateStr = review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A';
              
              // Status Styling
              let statusText = 'Pending Approval';
              let badgeColor = '#ffc107';
              let badgeBg = 'rgba(255, 193, 7, 0.1)';

              if (review.status === 'approved') {
                statusText = 'Approved & Public';
                badgeColor = '#28a745';
                badgeBg = 'rgba(40, 167, 69, 0.1)';
              } else if (review.status === 'rejected') {
                statusText = 'Rejected / Hidden';
                badgeColor = '#dc3545';
                badgeBg = 'rgba(220, 53, 69, 0.1)';
              }

              return (
                <div key={review._id} style={{
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.01)'
                }}>
                  {/* Review Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '14px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', color: 'var(--text-white)' }}>
                        {review.name} <span style={{ fontSize: '13px', color: 'var(--text-gray)', fontWeight: 'normal' }}>({review.location})</span>
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        📅 Submitted on: {dateStr}
                      </p>
                    </div>

                    {/* Actions & Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        color: badgeColor,
                        background: badgeBg,
                        border: `1px solid ${badgeColor}`,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase'
                      }}>
                        {statusText}
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteReview(review._id)}
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

                  {/* Rating & Review Body */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ color: '#ffcb05', fontSize: '16px', marginBottom: '10px' }}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginLeft: '10px', fontWeight: 'bold' }}>({review.rating}/5 Stars)</span>
                    </div>

                    <p style={{ fontSize: '14px', color: 'var(--text-light)', fontStyle: 'italic' }}>
                      "{review.message}"
                    </p>
                  </div>

                  {/* Moderation Controls (Only shown for pending reviews) */}
                  {review.status !== 'approved' && (
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                      <button
                        onClick={() => handleUpdateStatus(review._id, 'approved')}
                        className="btn btn-primary"
                        style={{ padding: '8px 20px', fontSize: '13px', background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)', boxShadow: 'none' }}
                      >
                        ✅ Approve Review
                      </button>
                      {review.status !== 'rejected' && (
                        <button
                          onClick={() => handleUpdateStatus(review._id, 'rejected')}
                          className="btn btn-secondary"
                          style={{ padding: '8px 20px', fontSize: '13px', color: '#dc3545', borderColor: '#dc3545', background: 'none' }}
                        >
                          🚫 Hide Review
                        </button>
                      )}
                    </div>
                  )}

                  {/* Approve/Reject undo triggers */}
                  {review.status === 'approved' && (
                    <div style={{ marginTop: '12px' }}>
                      <button
                        onClick={() => handleUpdateStatus(review._id, 'pending')}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}
                      >
                        Move back to Pending List
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
