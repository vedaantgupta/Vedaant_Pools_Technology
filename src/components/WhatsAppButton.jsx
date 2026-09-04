"use client";

import { useState } from 'react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "919479940047";
  const altPhoneNumber = "919827841047";

  const quickPrompts = [
    {
      label: "🏊 Turnkey Pool Construction",
      text: "Hi VPT Team, I would like to inquire about turnkey swimming pool design and construction for my property."
    },
    {
      label: "🛡️ Pool Waterproofing & Leak Repair",
      text: "Hi VPT Team, I need inspection and waterproofing solutions for swimming pool water leakage."
    },
    {
      label: "🛒 Equipment & B2B Wholesale",
      text: "Hi VPT Team, I am interested in purchasing pool pumps, filters, LED lights, or maintenance chemicals."
    },
    {
      label: "✨ Fountain / Wellness Spa Setup",
      text: "Hi VPT Team, I would like details and pricing on steam bath generators, fountains, and jacuzzi installations."
    }
  ];

  const handleStartChat = (customText) => {
    const message = encodeURIComponent(
      customText || "Hi Vedaant Pools Technology, I would like to inquire about your products and aquatic engineering services."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleCall = () => {
    window.location.href = `tel:+${phoneNumber}`;
  };

  return (
    <div style={{ position: 'fixed', bottom: '26px', right: '26px', zIndex: 9995 }}>
      
      {/* ---------- WhatsApp Quick Chat Floating Card ---------- */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '75px',
            right: '0',
            width: '350px',
            maxWidth: 'calc(100vw - 36px)',
            background: 'rgba(5, 19, 41, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 210, 255, 0.3)',
            borderRadius: '10px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(37, 211, 102, 0.2)',
            overflow: 'hidden',
            animation: 'slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'var(--font-sans, sans-serif)'
          }}
        >
          {/* Card Header (WhatsApp Emerald Gradient) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #075E54 0%, #128C7E 50%, #25D366 100%)',
              padding: '18px 20px',
              color: '#ffffff',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'rgba(0, 0, 0, 0.2)',
                border: 'none',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.2)')}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  <svg viewBox="0 0 32 32" width="28" height="28" fill="#25D366">
                    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.73.71 5.3 1.95 7.54L.5 31.5l8.21-1.92A15.4 15.4 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.37c-2.39 0-4.66-.63-6.64-1.74l-.48-.27-4.88 1.14 1.16-4.75-.31-.5A12.87 12.87 0 0 1 3.13 16C3.13 8.9 8.9 3.13 16 3.13S28.87 8.9 28.87 16 23.1 28.87 16 28.87zm7.65-9.6c-.42-.21-2.48-1.22-2.86-1.36-.39-.14-.67-.21-.95.21-.28.42-1.09 1.36-1.33 1.64-.25.28-.49.32-.91.11-.42-.21-1.78-.66-3.39-2.1-1.25-1.12-2.1-2.5-2.34-2.92-.25-.42-.03-.65.18-.86.19-.19.42-.49.63-.74.21-.25.28-.42.42-.7.14-.28.07-.53-.04-.74-.1-.21-.95-2.29-1.3-3.14-.34-.83-.69-.72-.95-.73-.25-.01-.53-.01-.81-.01s-.74.1-1.13.53c-.39.42-1.48 1.45-1.48 3.53s1.52 4.09 1.73 4.37c.21.28 2.99 4.56 7.24 6.4 1.01.44 1.8.7 2.41.9.1.03.2.06.31.09.9.29 1.73.25 2.38.15.73-.11 2.25-.92 2.57-1.81.32-.88.32-1.64.22-1.81-.09-.15-.36-.25-.78-.46z" />
                  </svg>
                </div>
                {/* Green Pulsing Live Dot */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#25D366',
                    border: '2px solid #ffffff',
                    boxShadow: '0 0 8px #25D366'
                  }}
                />
              </div>

              <div>
                <h4 style={{ fontSize: '15.5px', fontWeight: '700', margin: 0, letterSpacing: '-0.01em' }}>
                  Vedaant Pools Support
                </h4>
                <span style={{ fontSize: '12px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a7f3d0' }} />
                  Online | Fast Technical Reply
                </span>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div style={{ padding: '18px 20px' }}>
            {/* Chat Bubble Message */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                borderTopLeftRadius: '2px',
                padding: '14px 16px',
                marginBottom: '16px',
                color: 'var(--text-light, #e2e8f0)',
                fontSize: '13.5px',
                lineHeight: '1.5'
              }}
            >
              👋 <strong>Namaste!</strong> Welcome to Vedaant Pools Technology.
              <p style={{ margin: '6px 0 0 0', color: 'var(--text-gray, #94a3b8)', fontSize: '12.5px' }}>
                How can our engineering team assist you today? Select a topic below to chat instantly on WhatsApp:
              </p>
            </div>

            {/* Quick Prompt Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStartChat(prompt.text)}
                  style={{
                    textAlign: 'left',
                    background: 'rgba(0, 210, 255, 0.05)',
                    border: '1px solid rgba(0, 210, 255, 0.15)',
                    color: 'var(--text-white, #ffffff)',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    padding: '9px 13px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(37, 211, 102, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.4)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 210, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(0, 210, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>{prompt.label}</span>
                  <span style={{ color: '#25D366', fontSize: '14px' }}>&rarr;</span>
                </button>
              ))}
            </div>

            {/* Main Action CTA Button */}
            <button
              onClick={() => handleStartChat()}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 18px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
              }}
            >
              <svg viewBox="0 0 32 32" width="18" height="18" fill="#ffffff">
                <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.73.71 5.3 1.95 7.54L.5 31.5l8.21-1.92A15.4 15.4 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.37c-2.39 0-4.66-.63-6.64-1.74l-.48-.27-4.88 1.14 1.16-4.75-.31-.5A12.87 12.87 0 0 1 3.13 16C3.13 8.9 8.9 3.13 16 3.13S28.87 8.9 28.87 16 23.1 28.87 16 28.87zm7.65-9.6c-.42-.21-2.48-1.22-2.86-1.36-.39-.14-.67-.21-.95.21-.28.42-1.09 1.36-1.33 1.64-.25.28-.49.32-.91.11-.42-.21-1.78-.66-3.39-2.1-1.25-1.12-2.1-2.5-2.34-2.92-.25-.42-.03-.65.18-.86.19-.19.42-.49.63-.74.21-.25.28-.42.42-.7.14-.28.07-.53-.04-.74-.1-.21-.95-2.29-1.3-3.14-.34-.83-.69-.72-.95-.73-.25-.01-.53-.01-.81-.01s-.74.1-1.13.53c-.39.42-1.48 1.45-1.48 3.53s1.52 4.09 1.73 4.37c.21.28 2.99 4.56 7.24 6.4 1.01.44 1.8.7 2.41.9.1.03.2.06.31.09.9.29 1.73.25 2.38.15.73-.11 2.25-.92 2.57-1.81.32-.88.32-1.64.22-1.81-.09-.15-.36-.25-.78-.46z" />
              </svg>
              Start Chat on WhatsApp
            </button>

            {/* Direct Phone Call Alternative */}
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted, #64748b)' }}>
                Or call direct: <button onClick={handleCall} style={{ background: 'none', border: 'none', color: 'var(--secondary-color, #00d2ff)', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>+91-9479940047</button>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Floating Trigger Button ---------- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact on WhatsApp"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          color: '#ffffff',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.5), 0 0 15px rgba(37, 211, 102, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'whatsappPulse 2.5s infinite'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.7), 0 0 25px rgba(37, 211, 102, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.5), 0 0 15px rgba(37, 211, 102, 0.3)';
        }}
      >
        {/* WhatsApp Icon */}
        <svg viewBox="0 0 32 32" width="34" height="34" fill="#ffffff">
          <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.73.71 5.3 1.95 7.54L.5 31.5l8.21-1.92A15.4 15.4 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.37c-2.39 0-4.66-.63-6.64-1.74l-.48-.27-4.88 1.14 1.16-4.75-.31-.5A12.87 12.87 0 0 1 3.13 16C3.13 8.9 8.9 3.13 16 3.13S28.87 8.9 28.87 16 23.1 28.87 16 28.87zm7.65-9.6c-.42-.21-2.48-1.22-2.86-1.36-.39-.14-.67-.21-.95.21-.28.42-1.09 1.36-1.33 1.64-.25.28-.49.32-.91.11-.42-.21-1.78-.66-3.39-2.1-1.25-1.12-2.1-2.5-2.34-2.92-.25-.42-.03-.65.18-.86.19-.19.42-.49.63-.74.21-.25.28-.42.42-.7.14-.28.07-.53-.04-.74-.1-.21-.95-2.29-1.3-3.14-.34-.83-.69-.72-.95-.73-.25-.01-.53-.01-.81-.01s-.74.1-1.13.53c-.39.42-1.48 1.45-1.48 3.53s1.52 4.09 1.73 4.37c.21.28 2.99 4.56 7.24 6.4 1.01.44 1.8.7 2.41.9.1.03.2.06.31.09.9.29 1.73.25 2.38.15.73-.11 2.25-.92 2.57-1.81.32-.88.32-1.64.22-1.81-.09-.15-.36-.25-.78-.46z" />
        </svg>


      </button>

      {/* Embedded CSS Keyframes for WhatsApp Pulse and Animations */}
      <style jsx global>{`
        @keyframes whatsappPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6), 0 8px 25px rgba(37, 211, 102, 0.4);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(37, 211, 102, 0), 0 8px 25px rgba(37, 211, 102, 0.4);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 8px 25px rgba(37, 211, 102, 0.4);
          }
        }
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
