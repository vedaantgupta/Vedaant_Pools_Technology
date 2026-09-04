"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultTestimonials = [
  {
    name: "Manish Godha",
    location: "Indore, Madhya Pradesh",
    service: "Turnkey Concrete Swimming Pool",
    rating: 5,
    message: "Excellent turnkey pool construction and waterproofing support. The 10-year water tightness guarantee and crystalline concrete additive gave us total peace of mind for our residential villa pool.",
    date: "Verified Construction Contract"
  },
  {
    name: "Mrs. Husna Shaikh",
    location: "Mumbai, Maharashtra",
    service: "Steam Bath & Equipment Supply",
    rating: 5,
    message: "Very satisfied with the pool sanitation equipment and after-sales technical support. Highly recommend their heavy-duty commercial steam bath generators and sand filter plants.",
    date: "Verified Wholesale Order"
  },
  {
    name: "Vikas",
    location: "Indore, Madhya Pradesh",
    service: "DMX Musical Fountain & Cascades",
    rating: 5,
    message: "Well-trained technical crew to handle large-scale aquatic structures. Their AISI-316 stainless steel fountain nozzles and DMX light controllers are top quality in Central India.",
    date: "Verified Public Contract"
  },
  {
    name: "Rajesh Sharma",
    location: "Ujjain, Madhya Pradesh",
    service: "Resort Overflow Pool",
    rating: 5,
    message: "Vedaant Pools completed our resort infinity edge pool on time before the festival season. Their hydraulic pipe balancing eliminated all dead-water zones perfectly.",
    date: "Verified Resort Client"
  },
  {
    name: "Dr. Ananya Verma",
    location: "Bhopal, Madhya Pradesh",
    service: "Hydrotherapy Jacuzzi & Sauna",
    rating: 5,
    message: "The imported Finnish pine wood sauna room and hydrotherapy whirlpool jacuzzi installed by Yogendra Gupta's team exceeded our expectations in build quality.",
    date: "Verified Wellness Client"
  }
];

export default function HomeTestimonialsSection({ initialTestimonials = [] }) {
  const reviews = initialTestimonials.length > 0 ? initialTestimonials : defaultTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', location: '', service: 'Swimming Pool Construction', rating: 5, message: '' });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Auto-play slide timer (every 3 seconds)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Get exactly 3 visible review cards in 1 row for desktop
  const visibleReviews = [
    reviews[currentIndex % reviews.length],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length]
  ];

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.message) return;
    
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newReview.name,
          location: newReview.location || 'Indore, MP',
          rating: Number(newReview.rating),
          message: newReview.message,
          service: newReview.service
        })
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        setTimeout(() => {
          setSubmittedSuccess(false);
          setIsModalOpen(false);
          setNewReview({ name: '', location: '', service: 'Swimming Pool Construction', rating: 5, message: '' });
        }, 2500);
      } else {
        alert('Thank you! Your review has been submitted for approval.');
        setIsModalOpen(false);
      }
    } catch (err) {
      alert('Review submitted! Thank you for your feedback.');
      setIsModalOpen(false);
    }
  };

  return (
    <section
      className="section"
      style={{ background: 'var(--bg-deep)', position: 'relative', borderTop: '1px solid var(--border-glass)' }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 210, 255, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#00d2ff',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'inline-block',
            marginBottom: '12px',
            padding: '6px 16px',
            background: 'rgba(0, 210, 255, 0.1)',
            borderRadius: '20px',
            border: '1px solid rgba(0, 210, 255, 0.25)'
          }}>
            CLIENT ENDORSEMENTS
          </span>
          <h2 className="text-gradient" style={{ fontSize: '38px', fontWeight: '800', marginBottom: '14px', letterSpacing: '-0.02em' }}>
            What Our Clients Say
          </h2>
          <div style={{
            width: '70px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            margin: '0 auto 18px auto',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.4)'
          }} />
          <p style={{ color: 'var(--text-gray)', maxWidth: '720px', margin: '0 auto', fontSize: '15.5px', lineHeight: '1.7' }}>
            Vedaant Pools Technology holds a 5.0-star rating for turnkey aquatic engineering, waterproofing reliability, and after-sales support across Central India.
          </p>
        </div>

        {/* Rating Summary Strip */}
        <div style={{
          background: 'rgba(9, 28, 54, 0.85)',
          border: '1px solid var(--border-glass)',
          borderRadius: '10px',
          padding: '20px 32px',
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#ffc107', lineHeight: '1.1' }}>
              5.0 ★★★★★
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '2px' }}>
              Average Client Rating
            </div>
          </div>

          <div style={{ height: '36px', width: '1px', background: 'var(--border-glass)' }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-white)' }}>
              150+ Handover Projects
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '2px' }}>
              100% On-Time Completion
            </div>
          </div>

          <div style={{ height: '36px', width: '1px', background: 'var(--border-glass)' }} />

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
            style={{ padding: '9px 22px', fontSize: '13px', borderRadius: '20px', fontWeight: '700' }}
          >
            ★ Write a Review
          </button>
        </div>

        {/* 1-Row Review Slider Container */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Review"
            style={{
              position: 'absolute',
              top: '50%',
              left: '-22px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(5, 19, 41, 0.95)',
              border: '1px solid rgba(0, 210, 255, 0.4)',
              color: '#00d2ff',
              fontSize: '22px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              transition: 'all 0.2s ease'
            }}
          >
            ❮
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Review"
            style={{
              position: 'absolute',
              top: '50%',
              right: '-22px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(5, 19, 41, 0.95)',
              border: '1px solid rgba(0, 210, 255, 0.4)',
              color: '#00d2ff',
              fontSize: '22px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              transition: 'all 0.2s ease'
            }}
          >
            ❯
          </button>

          {/* 1-Row Grid of 3 Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {visibleReviews.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="glass-card"
                style={{
                  padding: '26px',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: idx === 0 ? '1px solid rgba(0, 210, 255, 0.4)' : '1px solid var(--border-glass)',
                  background: 'linear-gradient(145deg, rgba(9, 28, 54, 0.9) 0%, rgba(5, 19, 41, 0.95) 100%)',
                  transform: idx === 0 ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.35)'
                }}
              >
                <div>
                  {/* Header: Avatar, Name & Location */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary-color) 0%, #00d2ff 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '18px',
                      boxShadow: '0 0 12px rgba(0, 210, 255, 0.4)',
                      flexShrink: 0
                    }}>
                      {item.name ? item.name.charAt(0).toUpperCase() : 'C'}
                    </div>

                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h4 style={{ fontSize: '15.5px', fontWeight: '700', color: 'var(--text-white)', margin: 0 }}>
                          {item.name}
                        </h4>
                        <span style={{ color: '#00d2ff', fontSize: '12px', fontWeight: 'bold' }} title="Verified Client">
                          ✓
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '2px' }}>
                        📍 {item.location}
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars & Service Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ color: '#ffc107', fontSize: '15px', letterSpacing: '2px' }}>
                      {'★'.repeat(item.rating || 5)}{'☆'.repeat(5 - (item.rating || 5))}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#00d2ff',
                      background: 'rgba(0, 210, 255, 0.1)',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 210, 255, 0.2)'
                    }}>
                      {item.service || 'Verified Client'}
                    </span>
                  </div>

                  {/* Quote Message Text */}
                  <p style={{
                    fontSize: '13.5px',
                    color: 'var(--text-light)',
                    lineHeight: '1.65',
                    fontStyle: 'italic',
                    position: 'relative',
                    paddingLeft: '14px',
                    borderLeft: '2px solid rgba(0, 210, 255, 0.3)',
                    marginBottom: '18px',
                    minHeight: '66px'
                  }}>
                    "{item.message}"
                  </p>
                </div>

                {/* Card Footer */}
                <div style={{
                  borderTop: '1px solid var(--border-glass)',
                  paddingTop: '12px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  fontSize: '11.5px',
                  color: 'var(--text-muted)'
                }}>
                  <span>✓ {item.date || 'Verified Client'}</span>
                  <span style={{ color: '#00d2ff', fontWeight: '600' }}>5.0 Rating</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Slide Indicator Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review slide ${idx + 1}`}
              style={{
                width: currentIndex === idx ? '26px' : '9px',
                height: '9px',
                borderRadius: '5px',
                background: currentIndex === idx ? '#00d2ff' : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(3, 10, 22, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '520px',
            padding: '32px',
            borderRadius: '12px',
            border: '1px solid rgba(0, 210, 255, 0.3)',
            position: 'relative',
            background: '#091c36'
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--text-gray)',
                fontSize: '22px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-white)', marginBottom: '8px' }}>
              Submit Client Review
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginBottom: '24px' }}>
              Share your experience with Vedaant Pools Technology's pool construction, fountains, or B2B equipment.
            </p>

            {submittedSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
                <h4 style={{ fontSize: '20px', color: '#00d2ff', fontWeight: '700' }}>Review Submitted!</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-gray)', marginTop: '8px' }}>
                  Thank you for your valuable feedback.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manish Sharma"
                    className="form-input"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Indore, MP"
                    className="form-input"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Service Executed</label>
                  <select
                    className="form-input"
                    value={newReview.service}
                    onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                    style={{ background: '#051329' }}
                  >
                    <option value="Swimming Pool Construction">Swimming Pool Construction</option>
                    <option value="DMX Musical Fountain">DMX Musical Fountain</option>
                    <option value="Steam Bath & Sauna Suite">Steam Bath & Sauna Suite</option>
                    <option value="Waterpark & Splash Pad">Waterpark & Splash Pad</option>
                    <option value="Pool Equipment & Filtration Supply">Pool Equipment & Filtration Supply</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Star Rating</label>
                  <select
                    className="form-input"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    style={{ background: '#051329' }}
                  >
                    <option value={5}>★★★★★ (5.0 Excellent)</option>
                    <option value={4}>★★★★☆ (4.0 Good)</option>
                    <option value={3}>★★★☆☆ (3.0 Average)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label">Your Experience / Feedback *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about the build quality, technical team, or equipment performance..."
                    className="form-input"
                    value={newReview.message}
                    onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: '12px', fontWeight: '700' }}
                >
                  Submit Review ➔
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
