"use client";

import Link from 'next/link';

export default function HomeCalculatorsShowcase() {
  return (
    <section className="section" style={{ background: '#030c1d', borderTop: '1px solid var(--border-glass)', position: 'relative' }}>
      {/* Radial background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 210, 255, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
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
            ENGINEERING COST ESTIMATORS
          </span>
          <h2 className="text-gradient" style={{ fontSize: '38px', fontWeight: '800', marginBottom: '14px', letterSpacing: '-0.02em' }}>
            Instant Swimming Pool Cost Calculators
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
            Get accurate, transparent cost estimates in seconds. Choose whether you need full civil pool construction & RCC shell estimates or wholesale equipment package pricing.
          </p>
        </div>

        {/* Dual Calculators Grid */}
        <div className="grid-2" style={{ gap: '32px' }}>

          {/* Calculator Card 1: Civil Construction Estimator */}
          <div className="glass-card" style={{
            padding: '36px',
            borderRadius: '10px',
            border: '1px solid rgba(0, 210, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            background: 'linear-gradient(145deg, rgba(9, 28, 54, 0.9) 0%, rgba(5, 19, 41, 0.95) 100%)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <span style={{
                  fontSize: '36px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  background: 'rgba(0, 210, 255, 0.1)',
                  border: '1px solid rgba(0, 210, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  🏊
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#00d2ff',
                  background: 'rgba(0, 210, 255, 0.15)',
                  padding: '5px 12px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  CIVIL & RCC COST
                </span>
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-white)', marginBottom: '10px' }}>
                Pool Civil Construction Estimator
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '22px' }}>
                Interactive 3-step estimator for structural RCC excavation, steel reinforcement, crystalline waterproofing, tiling, and turnover hydraulic piping.
              </p>

              {/* Feature Bullet Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#00d2ff', fontWeight: 'bold' }}>✓</span> Custom Length, Width & Depth Sizing
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#00d2ff', fontWeight: 'bold' }}>✓</span> Skimmer vs Infinity Overflow Filtration Selection
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#00d2ff', fontWeight: 'bold' }}>✓</span> Instant Printable Cost Specification Sheet
                </div>
              </div>
            </div>

            <Link
              href="/calculator"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14.5px',
                fontWeight: '700',
                borderRadius: '8px',
                textAlign: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(11, 94, 221, 0.4)'
              }}
            >
              Launch Civil Estimator ➔
            </Link>
          </div>

          {/* Calculator Card 2: Equipment & Wholesale Package Calculator */}
          <div className="glass-card" style={{
            padding: '36px',
            borderRadius: '10px',
            border: '1px solid rgba(68, 96, 241, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            background: 'linear-gradient(145deg, rgba(9, 28, 54, 0.9) 0%, rgba(5, 19, 41, 0.95) 100%)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <span style={{
                  fontSize: '36px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  background: 'rgba(68, 96, 241, 0.15)',
                  border: '1px solid rgba(68, 96, 241, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  ⚙️
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#6680ff',
                  background: 'rgba(68, 96, 241, 0.15)',
                  padding: '5px 12px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  WHOLESALE EQUIPMENT
                </span>
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-white)', marginBottom: '10px' }}>
                Equipment & Product Wholesale Calculator
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '22px' }}>
                Configure pool filter plants, pumps, lights, and chemical dosing systems with 1-click pool presets and instant tiered wholesale bulk discounts up to 15% off.
              </p>

              {/* Feature Bullet Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#4460f1', fontWeight: 'bold' }}>✓</span> 1-Click Pool Size Package Presets
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#4460f1', fontWeight: 'bold' }}>✓</span> Tiered Discounts (5% @ ₹50k, 10% @ ₹1.5L, 15% @ ₹3L)
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#4460f1', fontWeight: 'bold' }}>✓</span> Direct WhatsApp Quote & Cart Export
                </div>
              </div>
            </div>

            <Link
              href="/equipment-calculator"
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14.5px',
                fontWeight: '700',
                borderRadius: '8px',
                textAlign: 'center',
                justifyContent: 'center',
                borderColor: 'rgba(68, 96, 241, 0.4)',
                background: 'rgba(68, 96, 241, 0.12)'
              }}
            >
              Launch Equipment Calculator ➔
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
