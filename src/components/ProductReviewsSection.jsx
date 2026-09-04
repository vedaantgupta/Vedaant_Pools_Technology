"use client";

import { useState } from 'react';

export default function ProductReviewsSection({
  productId,
  initialRating = 4.8,
  initialNumReviews = 0,
  initialReviews = [],
}) {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [avgRating, setAvgRating] = useState(initialRating || 4.8);
  const [totalCount, setTotalCount] = useState(initialNumReviews || (initialReviews ? initialReviews.length : 0));

  // Filter & Sort
  const [starFilter, setStarFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Write Review Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    title: '',
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState({ type: '', text: '' });
  const [helpfulVotes, setHelpfulVotes] = useState({});

  // Compute breakdown
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
  });

  const getPercent = (count) => {
    if (!reviews.length) return 0;
    return Math.round((count / reviews.length) * 100);
  };

  // Filter and Sort Reviews
  const filteredReviews = reviews
    .filter((r) => {
      if (starFilter === 'all') return true;
      return Math.round(r.rating) === Number(starFilter);
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      return 0;
    });

  const handleHelpfulClick = (idx) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 1,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.title.trim() || !formData.comment.trim()) {
      setFormMsg({ type: 'error', text: 'Please complete all required fields.' });
      return;
    }

    setSubmitting(true);
    setFormMsg({ type: '', text: '' });

    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          city: formData.city || 'India',
          rating: formRating,
          title: formData.title,
          comment: formData.comment,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit review');

      // Update state
      if (data.reviews) {
        setReviews(data.reviews);
      } else if (data.review) {
        setReviews([data.review, ...reviews]);
      }
      if (data.rating) setAvgRating(data.rating);
      if (data.numReviews) setTotalCount(data.numReviews);

      setFormMsg({ type: 'success', text: 'Thank you! Your verified review has been published.' });
      setFormData({ name: '', city: '', title: '', comment: '' });
      setFormRating(5);

      setTimeout(() => {
        setIsFormOpen(false);
        setFormMsg({ type: '', text: '' });
      }, 1800);

    } catch (err) {
      setFormMsg({ type: 'error', text: err.message || 'Error publishing review.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reviews-section glass-card" style={{ padding: '28px', marginTop: '36px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>
        <div>
          <span className="accent-gradient" style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '4px' }}>
            Customer Feedback & Verification
          </span>
          <h2 style={{ fontSize: '24px', color: 'var(--text-white)' }}>
            Customer Ratings & Reviews
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', fontSize: '13px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Write a Review
        </button>
      </div>

      {/* Main Grid: Left Rating Breakdown & Right Reviews List */}
      <div className="reviews-main-grid">

        {/* Left Column: Rating Score & Star Breakdown (Amazon Style) */}
        <div className="rating-overview-card">
          <div className="score-summary">
            <div className="big-rating-number">{Number(avgRating).toFixed(1)}</div>
            <div className="score-details">
              <div className="stars-row">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="star-icon" style={{ color: s <= Math.round(avgRating) ? '#ffb400' : 'rgba(255,255,255,0.2)' }}>
                    ★
                  </span>
                ))}
              </div>
              <p className="rating-subtitle">
                {totalCount > 0 ? `${totalCount} verified global ratings` : 'Be the first to rate this hardware'}
              </p>
            </div>
          </div>

          {/* Star Percent Breakdown Bars */}
          <div className="star-breakdown-list">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingCounts[star] || 0;
              const percent = getPercent(count);
              const isActive = starFilter === String(star);

              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setStarFilter(isActive ? 'all' : String(star))}
                  className={`star-bar-row ${isActive ? 'active-filter' : ''}`}
                >
                  <span className="star-label">{star} star</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="percent-label">{percent}%</span>
                </button>
              );
            })}
          </div>

          {starFilter !== 'all' && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                onClick={() => setStarFilter('all')}
                style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear {starFilter}★ filter (Show all)
              </button>
            </div>
          )}

          <div className="guarantee-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-color)" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <div>
              <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-white)' }}>100% Genuine Verified Hardware</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tested for commercial & residential pool water resistance.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Reviews Feed */}
        <div className="reviews-feed-column">

          {/* Filter Bar */}
          <div className="reviews-feed-controls">
            <div style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
              Showing {filteredReviews.length} of {reviews.length} reviews
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-gray)' }}>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          {filteredReviews.length === 0 ? (
            <div className="empty-reviews-state">
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>💬</div>
              <h3 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '8px' }}>
                No reviews found {starFilter !== 'all' ? `for ${starFilter} stars` : 'yet'}
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '20px' }}>
                Share your installation experience with this pool equipment!
              </p>
              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="btn btn-secondary"
              >
                Write First Review
              </button>
            </div>
          ) : (
            <div className="reviews-list">
              {filteredReviews.map((rev, idx) => (
                <div key={idx} className="review-card">
                  <div className="review-user-row">
                    <div className="avatar-circle">
                      {(rev.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="user-name">
                        {rev.name}
                        {rev.city && <span className="user-city">({rev.city})</span>}
                      </div>
                      {rev.verified !== false && (
                        <div className="verified-badge">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Verified Buyer
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="review-rating-row">
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} style={{ color: s <= rev.rating ? '#ffb400' : 'rgba(255,255,255,0.2)' }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="review-title">{rev.title}</span>
                  </div>

                  <div className="review-date">
                    Reviewed on {new Date(rev.createdAt || Date.now()).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>

                  <p className="review-comment">
                    {rev.comment}
                  </p>

                  <div className="review-actions">
                    <button
                      type="button"
                      onClick={() => handleHelpfulClick(idx)}
                      className="helpful-btn"
                    >
                      👍 Helpful {(helpfulVotes[idx] ? `(${helpfulVotes[idx]})` : '')}
                    </button>
                    <span className="helpful-count">
                      {helpfulVotes[idx] ? `${helpfulVotes[idx]} people found this helpful` : 'Found this helpful?'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Write a Review Modal Form */}
      {isFormOpen && (
        <div className="review-modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="review-modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsFormOpen(false)}
            >
              &times;
            </button>

            <h3 style={{ fontSize: '22px', color: 'var(--text-white)', marginBottom: '8px' }}>
              Create Customer Review
            </h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '13px', marginBottom: '24px' }}>
              Your feedback helps pool owners and architects select genuine equipment.
            </p>

            {formMsg.text && (
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  fontSize: '14px',
                  background: formMsg.type === 'success' ? 'rgba(0, 200, 83, 0.15)' : 'rgba(255, 23, 68, 0.15)',
                  border: `1px solid ${formMsg.type === 'success' ? '#00c853' : '#ff1744'}`,
                  color: formMsg.type === 'success' ? '#69f0ae' : '#ff8a80',
                }}
              >
                {formMsg.text}
              </div>
            )}

            <form onSubmit={handleFormSubmit}>
              {/* Star Selector */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-light)', marginBottom: '8px' }}>
                  Overall Rating *
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormRating(star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '32px',
                        cursor: 'pointer',
                        color: star <= (hoverRating || formRating) ? '#ffb400' : 'rgba(255,255,255,0.2)',
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      ★
                    </button>
                  ))}
                  <span style={{ marginLeft: '10px', fontSize: '14px', fontWeight: '600', color: 'var(--accent-color)' }}>
                    {formRating === 5 && '⭐⭐⭐⭐⭐ 5/5 (Excellent)'}
                    {formRating === 4 && '⭐⭐⭐⭐ 4/5 (Very Good)'}
                    {formRating === 3 && '⭐⭐⭐ 3/5 (Average)'}
                    {formRating === 2 && '⭐⭐ 2/5 (Below Average)'}
                    {formRating === 1 && '⭐ 1/5 (Poor)'}
                  </span>
                </div>
              </div>

              {/* Name & City */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-light)', marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Sharma"
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-light)', marginBottom: '6px' }}>
                    City / State
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Indore, MP"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Headline */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-light)', marginBottom: '6px' }}>
                  Headline / Review Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Highly durable aluminium frame, cleaned 50ft pool effortlessly"
                  className="form-input"
                />
              </div>

              {/* Comment */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-light)', marginBottom: '6px' }}>
                  Detailed Review *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="What did you like or dislike? How was the fitment, durability, and packaging?"
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ minWidth: '140px' }}
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scoped CSS */}
      <style jsx>{`
        .reviews-main-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 40px;
          align-items: flex-start;
        }

        .rating-overview-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          border-radius: 16px;
          padding: 24px;
        }

        .score-summary {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-glass);
        }

        .big-rating-number {
          font-size: 52px;
          font-weight: 800;
          color: var(--text-white);
          line-height: 1;
        }

        .stars-row {
          font-size: 20px;
          display: flex;
          gap: 3px;
          margin-bottom: 4px;
        }

        .rating-subtitle {
          font-size: 12px;
          color: var(--text-gray);
        }

        .star-breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .star-bar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 6px;
          transition: background 0.2s ease;
          width: 100%;
          text-align: left;
        }

        .star-bar-row:hover, .star-bar-row.active-filter {
          background: rgba(0, 210, 255, 0.08);
        }

        .star-label {
          font-size: 13px;
          color: var(--text-light);
          min-width: 48px;
          white-space: nowrap;
        }

        .bar-track {
          flex: 1;
          height: 10px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff9900 0%, #ffc837 100%);
          border-radius: 6px;
          transition: width 0.4s ease;
        }

        .percent-label {
          font-size: 12px;
          color: var(--text-gray);
          min-width: 36px;
          text-align: right;
          font-weight: 600;
        }

        .guarantee-box {
          margin-top: 24px;
          padding: 14px;
          background: rgba(0, 210, 255, 0.05);
          border: 1px solid rgba(0, 210, 255, 0.2);
          border-radius: 12px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        /* Reviews Feed Column */
        .reviews-feed-column {
          flex: 1;
        }

        .reviews-feed-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-glass);
        }

        .sort-select {
          background: var(--bg-navy);
          color: var(--text-white);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 13px;
          cursor: pointer;
        }

        .empty-reviews-state {
          text-align: center;
          padding: 50px 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          border: 1px dashed var(--border-glass);
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .review-card {
          padding: 22px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          transition: border-color 0.2s ease;
        }

        .review-card:hover {
          border-color: rgba(0, 210, 255, 0.3);
        }

        .review-user-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .avatar-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-white);
        }

        .user-city {
          font-weight: 400;
          color: var(--text-muted);
          font-size: 12px;
          margin-left: 6px;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #00e676;
          font-weight: 600;
          margin-top: 2px;
        }

        .review-rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .review-stars {
          font-size: 16px;
          letter-spacing: 2px;
        }

        .review-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-white);
        }

        .review-date {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .review-comment {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-light);
          margin-bottom: 16px;
        }

        .review-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 12px;
        }

        .helpful-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-glass);
          color: var(--text-light);
          padding: 4px 12px;
          border-radius: 16px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
        }

        .helpful-btn:hover {
          background: rgba(0, 210, 255, 0.15);
          border-color: var(--secondary-color);
        }

        .helpful-count {
          color: var(--text-muted);
        }

        /* Modal Styles */
        .review-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(5, 19, 41, 0.85);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .review-modal-content {
          position: relative;
          max-width: 600px;
          width: 100%;
          background: var(--bg-navy) !important;
          border: 1px solid var(--border-active) !important;
          border-radius: 20px;
          padding: 34px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
        }

        .modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          background: none;
          border: none;
          color: var(--text-gray);
          font-size: 26px;
          cursor: pointer;
        }

        .modal-close-btn:hover {
          color: #fff;
        }

        /* Disabled reviews collapse under 900px to maintain desktop 2-column layout on all devices */
        /*
        @media (max-width: 900px) {
          .reviews-main-grid {
            grid-template-columns: 1fr;
          }
        }
        */
      `}</style>
    </div>
  );
}
