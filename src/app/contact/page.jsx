"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('inquiry'); // 'inquiry' | 'review' | 'waterproofing'

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

  // Quick WhatsApp Quote Builder State
  const [quickService, setQuickService] = useState('Swimming Pool Construction');
  const [quickCity, setQuickCity] = useState('Indore');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Check URL parameters for pre-filled query
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const querySubject = params.get('subject');
      const queryMessage = params.get('message');
      const queryTab = params.get('tab');

      if (queryTab === 'waterproofing' || querySubject?.toLowerCase().includes('waterproof')) {
        setActiveTab('waterproofing');
        setContactData(prev => ({
          ...prev,
          subject: 'Pool Waterproofing Consultation',
          message: queryMessage || 'I need an urgent structural pool leakage inspection.'
        }));
      } else if (querySubject || queryMessage) {
        setContactData(prev => ({
          ...prev,
          subject: querySubject || prev.subject,
          message: queryMessage || prev.message
        }));
      }
    }
  }, []);

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.message ? 'message' : e.target.name]: e.target.value });
  };

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
          company: activeTab === 'waterproofing' ? 'Emergency Waterproofing Request' : 'General Contact Form',
          message: `[Subject: ${contactData.subject}] ${contactData.message}`,
          items: []
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit message.');

      setContactStatus({ loading: false, success: '🎉 Thank you! Your inquiry has been sent directly to Yogendra Gupta. Our engineers will call you back within 2 hours.', error: null });
      setContactData({ name: '', email: '', phone: '', subject: 'Swimming Pool Construction', message: '' });
    } catch (err) {
      setContactStatus({ loading: false, success: null, error: err.message });
    }
  };

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

      setReviewStatus({ loading: false, success: '✨ Thank you! Your client review was submitted successfully and will appear on our homepage once moderated.', error: null });
      setReviewData({ name: '', location: '', rating: 5, message: '' });
    } catch (err) {
      setReviewStatus({ loading: false, success: null, error: err.message });
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How long does a turnkey pool construction project take?",
      a: "Typical residential concrete pools (20x10ft to 30x15ft) take 4 to 8 weeks from excavation to water filling. Prefabricated fiberglass pools can be installed in as little as 10 to 14 days."
    },
    {
      q: "Do you provide structural waterproofing warranties?",
      a: "Yes! Vedaant Pools Technology provides up to 10 years structural waterproofing warranty using specialized crystalline and elastomeric RCC membrane treatments."
    },
    {
      q: "Can I buy pool equipment in bulk for hotels or resort projects?",
      a: "Absolutely! We supply commercial sand filters, pumps, underwater lights, and sanitation chemicals across Indore, MP, and Pan-India at wholesale rates."
    },
    {
      q: "Where is your corporate head office located?",
      a: "Our head office is located at House No. L-1, Vandana Vihar, Bhangarh Road, Indore, MP. You are welcome to visit us for live material samples and 3D design consultations."
    }
  ];

  // Dynamic WhatsApp quick quote URL
  const quickWhatsappUrl = `https://wa.me/919479940047?text=${encodeURIComponent(`Hello Yogendra Gupta (Vedaant Pools), I am requesting a fast quote for "${quickService}" in ${quickCity}. Please share pricing & engineering details.`)}`;

  return (
    <div className="section" style={{ background: 'var(--bg-deep)', minHeight: '90vh', paddingBottom: '120px' }}>
      <div className="container">
        
        {/* Page Title & Status Badge */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(39, 174, 96, 0.15)', border: '1px solid rgba(39, 174, 96, 0.4)', padding: '6px 16px', borderRadius: '20px', marginBottom: '14px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27ae60', boxShadow: '0 0 10px #27ae60' }} />
            <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#27ae60' }}>
              🟢 Engineers Currently Available (Mon - Sat: 9:00 AM – 8:00 PM IST)
            </span>
          </div>

          <h1 className="text-gradient" style={{ fontSize: '44px', marginBottom: '14px' }}>
            Get in Touch with Vedaant Pools Technology
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto', fontSize: '16px', lineHeight: '1.6' }}>
            Book structural pool waterproofing site inspections, order wholesale B2B equipment, calculate instant custom quotes, or submit client feedback.
          </p>
        </div>

        {/* 1-Click WhatsApp Quick Inquiry Generator Bar */}
        <div className="glass-card" style={{
          padding: '20px 24px',
          borderRadius: '10px',
          marginBottom: '40px',
          border: '1px solid rgba(37, 211, 102, 0.3)',
          background: 'rgba(37, 211, 102, 0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '26px' }}>⚡</span>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#25D366' }}>
                1-Click Direct WhatsApp Consultation
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Select service & city to chat directly with Founder Yogendra Gupta on WhatsApp.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <select
              value={quickService}
              onChange={(e) => setQuickService(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-light)',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Swimming Pool Construction" style={{ background: '#111' }}>🏊 New Pool Construction</option>
              <option value="Pool Waterproofing Consultation" style={{ background: '#111' }}>🛠️ Leakage Waterproofing</option>
              <option value="Pool Equipment Wholesale" style={{ background: '#111' }}>📦 B2B Equipment Bulk Order</option>
              <option value="Outdoor Water Fountain" style={{ background: '#111' }}>⛲ Fountain & Waterscapes</option>
              <option value="Steam & Sauna Suite" style={{ background: '#111' }}>♨️ Steam Bath & Sauna Suite</option>
            </select>

            <input
              type="text"
              placeholder="Your City (e.g. Indore)"
              value={quickCity}
              onChange={(e) => setQuickCity(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-light)',
                fontSize: '13px',
                width: '130px',
                outline: 'none'
              }}
            />

            <a
              href={quickWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: '#25D366',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '13px',
                padding: '8px 18px',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              💬 WhatsApp Quote ➔
            </a>
          </div>
        </div>

        {/* Quick Contact Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}>
          
          {/* Phone */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border-glass)' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(0, 210, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 14px auto',
              border: '1px solid rgba(0, 210, 255, 0.3)'
            }}>
              📞
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '8px' }}>
              Direct Phone Lines
            </h3>
            <div style={{ marginBottom: '10px' }}>
              <a href="tel:+919479940047" style={{ fontSize: '18px', fontWeight: '800', color: 'var(--secondary-color)', display: 'block' }}>
                +91 94799 40047
              </a>
              <a href="tel:+919827841047" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)', display: 'block' }}>
                +91 98278 41047
              </a>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Managing Owner: Yogendra Gupta</div>
          </div>

          {/* WhatsApp */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border-glass)' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(37, 211, 102, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 14px auto',
              border: '1px solid rgba(37, 211, 102, 0.3)'
            }}>
              💬
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '8px' }}>
              WhatsApp Consultation
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: '1.4' }}>
              Send design layouts or site pictures for instant evaluation.
            </p>
            <a
              href="https://wa.me/919479940047?text=Hello%20Yogendra%20Gupta%2C%20I%20would%20like%20to%20request%20a%20pool%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: '#25D366', color: '#fff', fontSize: '12.5px', padding: '8px 16px', borderRadius: '20px', fontWeight: '700' }}
            >
              Open WhatsApp ➔
            </a>
          </div>

          {/* Address */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border-glass)' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 14px auto',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              📍
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '8px' }}>
              Indore Office Address
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 6px 0' }}>
              House No. L-1, Vandana Vihar,<br />Bhangarh Road, Indore, MP, 452006
            </p>
            <div style={{ fontSize: '11.5px', color: 'var(--secondary-color)', fontWeight: '700' }}>
              GSTIN: 23AGZPG1057G1ZD
            </div>
          </div>

          {/* Email */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border-glass)' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(155, 81, 224, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 14px auto',
              border: '1px solid rgba(155, 81, 224, 0.3)'
            }}>
              ✉️
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '8px' }}>
              Official Email
            </h3>
            <a href="mailto:vedaantpools@gmail.com" style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--accent-color)', display: 'block', marginBottom: '10px', wordBreak: 'break-all' }}>
              vedaantpools@gmail.com
            </a>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Pan-India Engineering Inquiries
            </div>
          </div>

        </div>

        {/* Tabbed Interactive Section (Form Selector) */}
        <div className="glass-card" style={{ padding: '32px', borderRadius: '12px', marginBottom: '60px', border: '1px solid var(--border-glass)' }}>
          
          {/* Tab Buttons Header */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('inquiry')}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                background: activeTab === 'inquiry' ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'inquiry' ? '#fff' : 'var(--text-muted)',
                border: activeTab === 'inquiry' ? 'none' : '1px solid var(--border-glass)',
                transition: 'all 0.2s ease'
              }}
            >
              📩 Project Consultation & Inquiry
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('waterproofing')}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                background: activeTab === 'waterproofing' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'waterproofing' ? '#ef4444' : 'var(--text-muted)',
                border: activeTab === 'waterproofing' ? '1px solid #ef4444' : '1px solid var(--border-glass)',
                transition: 'all 0.2s ease'
              }}
            >
              🛠️ Structural Leakage Waterproofing Survey
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('review')}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                background: activeTab === 'review' ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'review' ? '#000' : 'var(--text-muted)',
                border: activeTab === 'review' ? 'none' : '1px solid var(--border-glass)',
                transition: 'all 0.2s ease'
              }}
            >
              ⭐ Submit Verified Client Review
            </button>
          </div>

          {/* Form Content 1: Project Inquiry or Waterproofing */}
          {(activeTab === 'inquiry' || activeTab === 'waterproofing') && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '6px' }}>
                  {activeTab === 'waterproofing' ? '🛠️ Book Structural Waterproofing Site Survey' : '📩 Send Detailed Project Inquiry'}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  {activeTab === 'waterproofing'
                    ? 'Our structural waterproofing engineer will inspect your pool basin, plumbing joints, and tile voids.'
                    : 'Tell us about your pool dimensions, equipment needs, or architectural project requirements.'}
                </p>
              </div>

              <form onSubmit={handleContactSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={contactData.name}
                      onChange={handleContactChange}
                      className="form-input"
                      placeholder="e.g. Rahul Sharma"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactData.phone}
                      onChange={handleContactChange}
                      className="form-input"
                      placeholder="+91-98XXXXXXXX"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Email Address *</label>
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
                </div>

                <div className="form-group">
                  <label className="form-label">Service Request Category</label>
                  <select
                    name="subject"
                    value={contactData.subject}
                    onChange={handleContactChange}
                    className="form-input"
                    style={{ background: 'var(--bg-navy)' }}
                  >
                    <option value="Pool Waterproofing Consultation">Pool Structural Waterproofing Consultation</option>
                    <option value="Residential & Private Swimming Pools">Residential & Private Swimming Pools</option>
                    <option value="Farm House Swimming Pools">Farm House Swimming Pools</option>
                    <option value="Resort & Hotel Pools">Resort & Hotel Pools</option>
                    <option value="Overflow & Vanishing Edge Pools">Overflow & Vanishing Edge Pools</option>
                    <option value="Outdoor Water Fountains">Outdoor Water Fountains</option>
                    <option value="Musical & Dynamic Fountains">Musical & Dynamic Fountains</option>
                    <option value="Waterparks & Splash Parks">Waterparks & Splash Parks</option>
                    <option value="Steam Bath & Sauna Suites">Steam Bath & Sauna Suites</option>
                    <option value="Hydrotherapy Jacuzzis & Hot Tubs">Hydrotherapy Jacuzzis & Hot Tubs</option>
                    <option value="B2B Equipment Wholesale Order">B2B Equipment Wholesale Order</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Message & Specifications *</label>
                  <textarea
                    name="message"
                    value={contactData.message}
                    onChange={handleContactChange}
                    className="form-input"
                    style={{ minHeight: '120px' }}
                    placeholder="Provide details such as pool length x width, location city, or specific equipment required..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '14px 28px', fontSize: '15px', borderRadius: '8px' }}
                  disabled={contactStatus.loading}
                >
                  {contactStatus.loading ? 'Submitting Inquiry...' : 'Submit Inquiry Request'}
                </button>

                {contactStatus.success && (
                  <div style={{ marginTop: '20px', color: '#27ae60', background: 'rgba(39, 174, 96, 0.1)', padding: '14px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' }}>
                    {contactStatus.success}
                  </div>
                )}
                {contactStatus.error && (
                  <div style={{ marginTop: '20px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '14px', borderRadius: '8px', fontSize: '14px' }}>
                    ❌ {contactStatus.error}
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Form Content 2: Review Submission */}
          {activeTab === 'review' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '6px' }}>
                  ⭐ Submit a Verified Client Review
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  Share your experience working with Yogendra Gupta and Vedaant Pools Technology.
                </p>
              </div>

              <form onSubmit={handleReviewSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label className="form-label">Your Name / Company *</label>
                    <input
                      type="text"
                      name="name"
                      value={reviewData.name}
                      onChange={handleReviewChange}
                      className="form-input"
                      placeholder="e.g. Manish Godha (Godha Estate)"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">City / Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={reviewData.location}
                      onChange={handleReviewChange}
                      className="form-input"
                      placeholder="e.g. Indore, MP"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Rating Score</label>
                    <select
                      name="rating"
                      value={reviewData.rating}
                      onChange={handleReviewChange}
                      className="form-input"
                      style={{ background: 'var(--bg-navy)' }}
                    >
                      <option value="5">★★★★★ (5/5 Excellent Service)</option>
                      <option value="4">★★★★☆ (4/5 Good)</option>
                      <option value="3">★★★☆☆ (3/5 Average)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Review Experience *</label>
                  <textarea
                    name="message"
                    value={reviewData.message}
                    onChange={handleReviewChange}
                    className="form-input"
                    style={{ minHeight: '120px' }}
                    placeholder="Describe your pool construction, waterproofing, or equipment installation experience..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ padding: '14px 28px', fontSize: '15px', borderRadius: '8px', background: 'var(--secondary-color)', color: '#000', fontWeight: '800' }}
                  disabled={reviewStatus.loading}
                >
                  {reviewStatus.loading ? 'Submitting...' : 'Submit Public Review'}
                </button>

                {reviewStatus.success && (
                  <div style={{ marginTop: '20px', color: '#27ae60', background: 'rgba(39, 174, 96, 0.1)', padding: '14px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' }}>
                    {reviewStatus.success}
                  </div>
                )}
                {reviewStatus.error && (
                  <div style={{ marginTop: '20px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '14px', borderRadius: '8px', fontSize: '14px' }}>
                    ❌ {reviewStatus.error}
                  </div>
                )}
              </form>
            </div>
          )}

        </div>

        {/* ACCURATE INDORE GOOGLE MAP EMBED & Corporate Verification Card */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '60px' }} className="calculator-layout-grid">
          
          {/* Office Address & Business Card */}
          <div className="glass-card" style={{ padding: '32px', borderRadius: '10px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-color)', letterSpacing: '1px' }}>
                Verified Corporate Headquarters
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-light)', marginTop: '4px', marginBottom: '16px' }}>
                Vedaant Pools Technology
              </h2>
              
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
                <p style={{ margin: '0 0 10px 0' }}>
                  🏢 <strong>Registered Head Office:</strong><br />
                  House No. L-1, Vandana Vihar, Bhangarh Road, Indore, Madhya Pradesh - 452006, India
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  📋 <strong>GSTIN Registration:</strong> <span style={{ color: 'var(--secondary-color)', fontWeight: '700' }}>23AGZPG1057G1ZD</span>
                </p>
                <p style={{ margin: '0 0 10px 0' }}>
                  👨‍💼 <strong>Founder & Owner:</strong> Yogendra Gupta
                </p>
                <p style={{ margin: 0 }}>
                  ⏰ <strong>Working Hours:</strong> Mon – Sat: 9:00 AM to 8:00 PM IST
                </p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Vandana+Vihar+Bhangarh+Road+Indore+Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '12.5px', padding: '8px 16px', borderRadius: '8px', fontWeight: '700' }}
              >
                🗺️ Get Directions in Google Maps ➔
              </a>
              <Link href="/calculator" className="btn btn-secondary" style={{ fontSize: '12.5px', padding: '8px 16px', borderRadius: '8px' }}>
                🏊 Civil Pool Estimator
              </Link>
              <Link href="/equipment-calculator" className="btn btn-secondary" style={{ fontSize: '12.5px', padding: '8px 16px', borderRadius: '8px' }}>
                ⚙️ Equipment Calculator
              </Link>
            </div>
          </div>

          {/* ACCURATE GOOGLE MAP EMBED FRAME pointing to Vandana Vihar, Bhangarh Road, Indore */}
          <div className="glass-card" style={{ padding: '12px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-glass)', minHeight: '340px' }}>
            <iframe
              title="Vedaant Pools Indore Head Office Map"
              src="https://maps.google.com/maps?q=Vandana+Vihar+Bhangarh+Road+Indore+Madhya+Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px', minHeight: '340px' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-light)' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Quick answers regarding our engineering services, warranties, and bulk equipment supply.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    color: 'var(--text-light)',
                    fontSize: '16px',
                    fontWeight: '700',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--primary-color)', fontSize: '20px' }}>
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>

                {openFaq === idx && (
                  <div style={{ padding: '0 24px 20px 24px', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
