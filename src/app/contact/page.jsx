"use client";

import { useState } from 'react';

export default function ContactPage() {
  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Swimming Pool Construction',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState({ loading: false, success: null, error: null });

  // Testimonial Form State
  const [reviewData, setReviewData] = useState({
    name: '',
    location: '',
    rating: 5,
    message: ''
  });
  const [reviewStatus, setReviewStatus] = useState({ loading: false, success: null, error: null });

  // Handle inputs
  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  // Submit Contact Form (Directly creates a general pending inquiry in DB)
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          company: 'General Contact Form',
          message: `[Subject: ${contactData.subject}] ${contactData.message}`,
          items: [] // Empty items indicates general consultation request
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit message.');

      setContactStatus({ loading: false, success: '🎉 Thank you! Your message has been sent. We will contact you shortly.', error: null });
      setContactData({ name: '', email: '', phone: '', subject: 'Swimming Pool Construction', message: '' });
    } catch (err) {
      setContactStatus({ loading: false, success: null, error: err.message });
    }
  };

  // Submit Testimonial Form (Creates review in DB with status: pending)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit review.');

      setReviewStatus({ loading: false, success: '✨ Thank you! Your review was submitted and is pending moderation by the administrator.', error: null });
      setReviewData({ name: '', location: '', rating: 5, message: '' });
    } catch (err) {
      setReviewStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <div className="section" style={{ background: 'var(--bg-deep)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="accent-gradient" style={{
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'block',
            marginBottom: '10px'
          }}>
            Contact Details & Feedback
          </span>
          <h1 className="text-gradient" style={{ fontSize: '42px', marginBottom: '16px' }}>
            Get in Touch with VPT
          </h1>
          <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>
            Book structural pool waterproofing inspections, B2B wholesale orders, or submit customer feedback.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid-3" style={{ marginBottom: '80px', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>📞</span>
            <h3 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '8px' }}>B2B Wholesale Hotline</h3>
            <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--secondary-color)', marginBottom: '4px' }}>
              +91-8043862448
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)' }}>Alternative: +91 9479940047</p>
          </div>

          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>🏢</span>
            <h3 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '8px' }}>Registered Head Office</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
              House No L-1, Vandana Vihar Colony Road,<br />
              Bhangarh, Indore, MP, India
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>✉️</span>
            <h3 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '8px' }}>Correspondence Office</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
              450/3, Nanda Nagar,<br />
              Indore - 452003, MP, India
            </p>
          </div>
        </div>

        {/* Form Forms Row */}
        <div className="grid-2" style={{ alignItems: 'flex-start', gap: '40px' }}>
          
          {/* Form 1: Contact Form */}
          <div className="glass-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '24px', color: 'var(--text-white)', marginBottom: '24px' }}>
              Send a Message
            </h2>
            
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={contactData.name}
                  onChange={handleContactChange}
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
                    value={contactData.email}
                    onChange={handleContactChange}
                    className="form-input"
                    placeholder="email@domain.com"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactData.phone}
                    onChange={handleContactChange}
                    className="form-input"
                    placeholder="+91..."
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Service Request / Subject</label>
                <select
                  name="subject"
                  value={contactData.subject}
                  onChange={handleContactChange}
                  className="form-input"
                  style={{ background: 'var(--bg-navy)' }}
                >
                  <option value="Swimming Pool Construction">Swimming Pool Construction</option>
                  <option value="Pool Waterproofing Consultation">Pool Waterproofing Consultation</option>
                  <option value="Waterpark Development">Waterpark Development</option>
                  <option value="Wellness Steam Generators">Wellness Steam Generators</option>
                  <option value="B2B Equipment Wholesale">B2B Equipment Wholesale</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Project Details / Message</label>
                <textarea
                  name="message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  className="form-input"
                  placeholder="Tell us about your pool dimensions, waterproofing issues, or hardware requirements..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{ width: '100%' }}
                disabled={contactStatus.loading}
              >
                {contactStatus.loading ? 'Submitting...' : 'Send Inquiry Message'}
              </button>

              {contactStatus.success && (
                <p style={{ marginTop: '16px', color: '#28a745', fontSize: '14px', fontWeight: '500' }}>
                  {contactStatus.success}
                </p>
              )}
              {contactStatus.error && (
                <p style={{ marginTop: '16px', color: '#dc3545', fontSize: '14px', fontWeight: '500' }}>
                  ❌ {contactStatus.error}
                </p>
              )}
            </form>
          </div>

          {/* Form 2: Review Form */}
          <div className="glass-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '24px', color: 'var(--text-white)', marginBottom: '24px' }}>
              Write a Client Review
            </h2>
            
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label className="form-label">Client Name</label>
                <input
                  type="text"
                  name="name"
                  value={reviewData.name}
                  onChange={handleReviewChange}
                  className="form-input"
                  placeholder="e.g. Manish Godha"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={reviewData.location}
                  onChange={handleReviewChange}
                  className="form-input"
                  placeholder="e.g. Indore, Madhya Pradesh"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rating Score</label>
                <select
                  name="rating"
                  value={reviewData.rating}
                  onChange={handleReviewChange}
                  className="form-input"
                  style={{ background: 'var(--bg-navy)' }}
                >
                  <option value="5">★★★★★ (5/5 Excellent)</option>
                  <option value="4">★★★★☆ (4/5 Good)</option>
                  <option value="3">★★★☆☆ (3/5 Average)</option>
                  <option value="2">★★☆☆☆ (2/5 Poor)</option>
                  <option value="1">★☆☆☆☆ (1/5 Very Poor)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Review Description</label>
                <textarea
                  name="message"
                  value={reviewData.message}
                  onChange={handleReviewChange}
                  className="form-input"
                  placeholder="Share your experience working with Vedaant Pools..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-accent"
                style={{ width: '100%' }}
                disabled={reviewStatus.loading}
              >
                {reviewStatus.loading ? 'Submitting...' : 'Submit Public Review'}
              </button>

              {reviewStatus.success && (
                <p style={{ marginTop: '16px', color: 'var(--secondary-color)', fontSize: '14px', fontWeight: '500' }}>
                  {reviewStatus.success}
                </p>
              )}
              {reviewStatus.error && (
                <p style={{ marginTop: '16px', color: '#dc3545', fontSize: '14px', fontWeight: '500' }}>
                  ❌ {reviewStatus.error}
                </p>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
