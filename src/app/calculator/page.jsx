"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0);

  // Pool Specification State
  const [dimensions, setDimensions] = useState({ length: 24, width: 12, depth: 5 });
  const [poolType, setPoolType] = useState('concrete-liner');
  const [poolShape, setPoolShape] = useState('rectangular');
  const [filtration, setFiltration] = useState('sand');
  const [finish, setFinish] = useState('liner');
  const [addons, setAddons] = useState({
    rgbLights: false,
    heating: false,
    spaJets: false,
    swimJet: false,
    waterfall: false,
    cover: false
  });
  const [logistics, setLogistics] = useState({
    soil: 'normal',
    access: 'easy',
    region: 'local'
  });

  // User Lead Capture Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: null, error: null });

  // Auto-adjust interior finish option based on pool type
  useEffect(() => {
    if (poolType === 'concrete-liner') {
      setFinish('liner');
    } else if (poolType === 'concrete-tiled' && finish === 'liner') {
      setFinish('mosaic');
    } else if (poolType === 'fiberglass') {
      setFinish('none');
    } else if (poolType === 'above-ground') {
      setFinish('none');
    }
  }, [poolType]);

  // Stepper steps configuration
  const steps = [
    { label: "Size & Shape", icon: "📐" },
    { label: "Structure", icon: "🏗️" },
    { label: "Filtration", icon: "🌀" },
    { label: "Finishes", icon: "✨" },
    { label: "Add-ons & Site", icon: "💡" },
    { label: "Estimate", icon: "📋" }
  ];

  // Mathematical Calculations
  const length = Number(dimensions.length);
  const width = Number(dimensions.width);
  const depth = Number(dimensions.depth);

  const surfaceArea = length * width; // Sq. Ft.
  const perimeter = 2 * (length + width); // Ft.
  const wallArea = perimeter * depth; // Sq. Ft.
  const totalPoolSurfaceArea = surfaceArea + wallArea; // Sq. Ft.

  const volumeCuFt = length * width * depth;
  const volumeLitres = Math.round(volumeCuFt * 28.3168);
  const volumeGallons = Math.round(volumeCuFt * 7.48052);

  // 1. Civil and Structural shell cost
  let baseCivilRate = 1300; // Concrete Liner (Tile-less) base
  if (poolType === 'concrete-tiled') baseCivilRate = 1500;
  if (poolType === 'fiberglass') baseCivilRate = 1100;
  if (poolType === 'above-ground') baseCivilRate = 500;

  const shapeMultipliers = {
    rectangular: 1.0,
    oval: 1.12,
    freeform: 1.25,
    'l-shape': 1.20
  };
  const shapeMultiplier = shapeMultipliers[poolShape] || 1.0;
  const civilCost = Math.round((surfaceArea * baseCivilRate) * shapeMultiplier);

  // 2. Filtration cost
  let filtrationCost = 85000; // Base Sand Filter + Pump
  if (filtration === 'cartridge') filtrationCost = 110000;
  if (filtration === 'salt') filtrationCost = 150000; // Base filter + salt chlorinator
  if (filtration === 'uv-ozone') filtrationCost = 180000; // Base filter + UV Ozonator

  // 3. Finishes cost
  let finishCost = 0;
  if (poolType === 'concrete-liner') {
    finishCost = Math.round(totalPoolSurfaceArea * 250); // Premium German Liner sheet
  } else if (poolType === 'concrete-tiled') {
    if (finish === 'mosaic') finishCost = Math.round(totalPoolSurfaceArea * 450); // Glass Mosaic
    if (finish === 'ceramic') finishCost = Math.round(totalPoolSurfaceArea * 280); // Ceramic
    if (finish === 'plaster') finishCost = Math.round(totalPoolSurfaceArea * 350); // Pebble plaster
  }

  // 4. Addons & Wellness accessories
  let wellnessCost = 0;
  if (addons.rgbLights) wellnessCost += 25000;
  if (addons.heating) wellnessCost += 220000;
  if (addons.spaJets) wellnessCost += 120000;
  if (addons.swimJet) wellnessCost += 150000;
  if (addons.waterfall) wellnessCost += 60000;
  if (addons.cover) wellnessCost += 180000;

  // 5. Soil & Logistics preparation cost
  let logisticsCost = 0;
  // Soil surcharge
  if (logistics.soil === 'cotton') logisticsCost += 75000; // Surchage for RCC pile foundation in black cotton soil
  if (logistics.soil === 'rocky') logisticsCost += 95000; // Surchage for breaker/jackhammer excavation
  // Access surcharge
  if (logistics.access === 'restricted') logisticsCost += 40000; // Extra manual haulage
  // Geography surcharge
  if (logistics.region === 'regional') logisticsCost += 60000; // Indore outskirt logistics
  if (logistics.region === 'national') logisticsCost += 120000; // Pan-India mobilization

  // Subtotal and final estimations
  const subtotal = civilCost + filtrationCost + finishCost + wellnessCost + logisticsCost;
  const engineeringFee = Math.round(subtotal * 0.05); // 5% consultation, layouts & mechanical design
  const gst = Math.round((subtotal + engineeringFee) * 0.18); // 18% GST (Works Contract Services)
  const grandTotal = subtotal + engineeringFee + gst;

  // Pie chart breakdown percentages
  const breakDownItems = [
    { label: "Civil & Structure", value: civilCost, color: "var(--primary-color)", class: "fill-civil" },
    { label: "Interior Finish", value: finishCost, color: "var(--secondary-color)", class: "fill-finish" },
    { label: "Filtration & Piping", value: filtrationCost, color: "#9b51e0", class: "fill-filtration" },
    { label: "Wellness Upgrades", value: wellnessCost, color: "#f2c94c", class: "fill-wellness" },
    { label: "Site Logistics", value: logisticsCost, color: "#27ae60", class: "fill-site" }
  ];

  // Filter out zero categories for drawing donut chart segments
  const activeBreakdown = breakDownItems.filter(item => item.value > 0);
  const totalBreakdownVal = activeBreakdown.reduce((sum, item) => sum + item.value, 0) || 1;

  // Calculate SVG Donut chart properties
  // radius = 50, circumference = 2 * PI * r = 314.159
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  const donutSegments = activeBreakdown.map((item) => {
    const percent = item.value / totalBreakdownVal;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -currentOffset;
    currentOffset += percent * circumference;
    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      percent: Math.round(percent * 100)
    };
  });

  // Handle Form changes
  const handleInputChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  // Submit estimate to `/api/inquiries`
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: null, error: null });

    const formattedMessage = `
--- POOL CALCULATOR QUOTE SPECIFICATION ---
Pool Type: ${poolType === 'concrete-liner' ? 'Concrete Tile-less Liner' : poolType === 'concrete-tiled' ? 'Concrete Tiled Pool' : poolType === 'fiberglass' ? 'Prefabricated Fiberglass Shell' : 'Above-ground Modular'}
Shape: ${poolShape.toUpperCase()}
Dimensions: ${length}ft L x ${width}ft W x ${depth}ft D
Volume: ${volumeLitres.toLocaleString()} Litres (${volumeGallons.toLocaleString()} Gallons)
Surface Area: ${surfaceArea} sq.ft.
Filtration System: ${filtration === 'sand' ? 'Sand Filter + Pump' : filtration === 'cartridge' ? 'Cartridge Filter' : filtration === 'salt' ? 'Saltwater Chlorinator' : 'UV + Ozonator (Chemical Free)'}
Interior Finish: ${finish === 'liner' ? 'Heavy-duty German Algae-Proof PVC Liner' : finish === 'mosaic' ? 'Spanish Glass Mosaic' : finish === 'ceramic' ? 'Ceramic Tiles' : finish === 'plaster' ? 'Marble plaster' : 'None'}

Wellness Enhancements:
${addons.rgbLights ? '- RGB Multi-color LED Lighting\n' : ''}${addons.heating ? '- Heat Pump Pool Heater\n' : ''}${addons.spaJets ? '- Hot Tub Spa Jacuzzi Jets\n' : ''}${addons.swimJet ? '- Counter-current Swim Jet\n' : ''}${addons.waterfall ? '- Sheer Descent Waterfall\n' : ''}${addons.cover ? '- Automatic Pool Cover\n' : ''}${!addons.rgbLights && !addons.heating && !addons.spaJets && !addons.swimJet && !addons.waterfall && !addons.cover ? 'None\n' : ''}
Logistics:
- Soil: ${logistics.soil === 'normal' ? 'Normal Soil' : logistics.soil === 'cotton' ? 'Black Cotton Soil (RCC Piles needed)' : 'Rocky Terrain (Breaker needed)'}
- Site Access: ${logistics.access === 'easy' ? 'Easy Access' : 'Restricted Site Space'}
- Location: ${logistics.region === 'local' ? 'Indore Local Area' : logistics.region === 'regional' ? 'Central India (<200km)' : 'Pan-India'}

--- ESTIMATED VALUATION ---
Subtotal Civil + Mechanical: ₹${subtotal.toLocaleString()}
Structural Drawing & Engg (5%): ₹${engineeringFee.toLocaleString()}
Works Contract GST (18%): ₹${gst.toLocaleString()}
GRAND TOTAL: ₹${grandTotal.toLocaleString()}

Customer Note: ${contactData.message || 'No additional note.'}
    `;

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          company: 'Pool Cost Calculator',
          message: formattedMessage,
          items: [] // Empty items to denote calculator inquiry
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit estimate request.');

      setSubmitStatus({
        loading: false,
        success: '🎉 Your estimate has been submitted successfully! Our structural engineer will call you shortly with drawings.',
        error: null
      });
      setContactData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setSubmitStatus({ loading: false, success: null, error: err.message });
    }
  };

  // Triggers window.print() styled via media print query
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="section" style={{ background: 'var(--bg-deep)', minHeight: '90vh' }}>
      <div className="container">

        {/* Stepper Node header (hidden on print) */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="accent-gradient" style={{
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'block',
            marginBottom: '10px'
          }}>
            Vedaant Pools interactive quotation suite
          </span>
          <h1 className="text-gradient" style={{ fontSize: '42px', marginBottom: '12px' }}>
            Pool Construction Cost Estimator
          </h1>
          <p style={{ color: 'var(--text-gray)', maxWidth: '700px', margin: '0 auto' }}>
            Design your pool and spas custom specifications. Calculate soil excavations, premium filtration, tile-less finishes, and get instant budgetary breakdowns.
          </p>
        </div>

        {/* Stepper Tracker */}
        <div className="stepper-wrapper">
          <div className="stepper-line" />
          <div
            className="stepper-line-active"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((node, index) => (
            <div
              key={index}
              className={`step-node ${index === currentStep ? 'active' : index < currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              <div className="step-circle">
                {index < currentStep ? '✓' : node.icon}
              </div>
              <span className="step-label">{node.label}</span>
            </div>
          ))}
        </div>

        {/* Calculator Main Layout Grid */}
        <div className="calc-container">

          {/* Left Steps Panel */}
          <div className="calc-steps-left" style={{ display: 'flex', flexDirection: 'column' }}>

            {/* STEP 1: Dimensions & Shape */}
            {currentStep === 0 && (
              <div className="glass-card" style={{ padding: '36px' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📐</span> Pool Dimensions & Shape
                </h2>

                {/* Length Slider */}
                <div className="slider-container">
                  <div className="slider-header">
                    <label className="form-label" style={{ margin: 0 }}>Pool Length</label>
                    <span className="slider-val-bubble">{dimensions.length} ft</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={dimensions.length}
                    onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                    className="calc-range-slider"
                  />
                  <div className="slider-limits">
                    <span>10 ft (Plunge Pool)</span>
                    <span>60 ft (Semi-Olympic)</span>
                  </div>
                </div>

                {/* Width Slider */}
                <div className="slider-container">
                  <div className="slider-header">
                    <label className="form-label" style={{ margin: 0 }}>Pool Width</label>
                    <span className="slider-val-bubble">{dimensions.width} ft</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="30"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    className="calc-range-slider"
                  />
                  <div className="slider-limits">
                    <span>6 ft (Narrow Spa)</span>
                    <span>30 ft (Wide Residential)</span>
                  </div>
                </div>

                {/* Depth Slider */}
                <div className="slider-container">
                  <div className="slider-header">
                    <label className="form-label" style={{ margin: 0 }}>Average Depth</label>
                    <span className="slider-val-bubble">{dimensions.depth} ft</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="8"
                    step="0.5"
                    value={dimensions.depth}
                    onChange={(e) => setDimensions({ ...dimensions, depth: e.target.value })}
                    className="calc-range-slider"
                  />
                  <div className="slider-limits">
                    <span>3.0 ft (Wading/Shallow)</span>
                    <span>8.0 ft (Diving Depth)</span>
                  </div>
                </div>

                {/* Shape Selector */}
                <label className="form-label" style={{ marginTop: '20px', marginBottom: '12px' }}>Choose Pool Geometry</label>
                <div className="option-grid-sm">
                  {[
                    { id: 'rectangular', label: 'Rectangular', desc: 'Standard & classic design', icon: '🟦' },
                    { id: 'oval', label: 'Oval / Circular', desc: 'Elegant curved shapes', icon: '🟢' },
                    { id: 'freeform', label: 'Freeform', desc: 'Natural oasis contour (+25%)', icon: '🌀' },
                    { id: 'l-shape', label: 'L-Shaped', desc: 'Sectional swimming zone (+20%)', icon: '📐' }
                  ].map((shape) => (
                    <div
                      key={shape.id}
                      className={`select-card ${poolShape === shape.id ? 'active' : ''}`}
                      onClick={() => setPoolShape(shape.id)}
                      style={{ padding: '16px 12px' }}
                    >
                      <span className="select-card-icon" style={{ fontSize: '24px' }}>{shape.icon}</span>
                      <span className="select-card-title" style={{ fontSize: '14px' }}>{shape.label}</span>
                      <span className="select-card-desc" style={{ fontSize: '10px' }}>{shape.desc}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                  <button onClick={() => setCurrentStep(1)} className="btn btn-primary">
                    Next: Structure Type &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Structure & Construction Type */}
            {currentStep === 1 && (
              <div className="glass-card" style={{ padding: '36px' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🏗️</span> Pool Structural Integrity
                </h2>

                <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
                  Select the structural base. Concrete options are engineered for permanent structures, whereas above ground designs are temporary or modular.
                </p>

                <div className="option-grid">
                  {[
                    {
                      id: 'concrete-liner',
                      title: 'RCC Concrete (Tile-less)',
                      desc: 'VPT Premium. Durable concrete shell finished with heavy-duty German PVC membranes. 100% leakproof, zero tiles falling out.',
                      icon: '🛡️',
                      badge: 'VPT Choice'
                    },
                    {
                      id: 'concrete-tiled',
                      title: 'RCC Concrete (Tiled)',
                      desc: 'Traditional structural concrete shell finished with custom tiles (ceramic or premium glass mosaic accent tiles). Highly custom aesthetics.',
                      icon: '🧱',
                      badge: 'Traditional'
                    },
                    {
                      id: 'fiberglass',
                      title: 'Prefabricated Fiberglass',
                      desc: 'Factory molded fiberglass shell transported to site and craned into excavation. Fast installation, standard preset shapes.',
                      icon: '🧪',
                      badge: 'Fast Install'
                    },
                    {
                      id: 'above-ground',
                      title: 'Above Ground (Modular)',
                      desc: 'Steel-walled structure placed directly on concrete plinth. Quick assemble, economical, no excavation required.',
                      icon: '📦',
                      badge: 'Budget'
                    }
                  ].map((type) => (
                    <div
                      key={type.id}
                      className={`select-card ${poolType === type.id ? 'active' : ''}`}
                      onClick={() => setPoolType(type.id)}
                    >
                      {type.badge && <span className="select-card-badge">{type.badge}</span>}
                      <span className="select-card-icon">{type.icon}</span>
                      <span className="select-card-title">{type.title}</span>
                      <p className="select-card-desc">{type.desc}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                  <button onClick={() => setCurrentStep(0)} className="btn btn-secondary">
                    &larr; Dimensions
                  </button>
                  <button onClick={() => setCurrentStep(2)} className="btn btn-primary">
                    Next: Filtration & Treatment &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Filtration & Sanitation Systems */}
            {currentStep === 2 && (
              <div className="glass-card" style={{ padding: '36px' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🌀</span> Filtration & Sanitation Plants
                </h2>

                <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
                  Filtration controls water clarity and hygiene. Saltwater and UV Ozonators reduce chlorine use, minimizing eye irritation and strong odors.
                </p>

                <div className="option-grid">
                  {[
                    {
                      id: 'sand',
                      title: 'Heavy Duty Sand Filter',
                      desc: 'Standard commercial pool grade filtration. Multiport sand valve, filters down to 20 microns. Requires routine backwashing.',
                      icon: '🏖️',
                      price: 'Base Price'
                    },
                    {
                      id: 'cartridge',
                      title: 'Compact Cartridge Filter',
                      desc: 'Polyester core cartridge filters. Filters down to 10 microns, eco-friendly as it saves water by avoiding backwash cycles.',
                      icon: '📜',
                      price: '+ ₹25,000'
                    },
                    {
                      id: 'salt',
                      title: 'Saltwater Chlorination',
                      desc: 'Converts mild dissolved salt into natural, soothing chlorine. Soft on the skin, prevents dry hair, automated sanitation.',
                      icon: '🧂',
                      price: '+ ₹65,000'
                    },
                    {
                      id: 'uv-ozone',
                      title: 'UV Ozonator Combo',
                      desc: 'Ultra-premium. Advanced B2B disinfection. Neutralizes bacteria with zero chemicals. Recommended for child wellness.',
                      icon: '⚡',
                      price: '+ ₹95,000'
                    }
                  ].map((filter) => (
                    <div
                      key={filter.id}
                      className={`select-card ${filtration === filter.id ? 'active' : ''}`}
                      onClick={() => setFiltration(filter.id)}
                    >
                      <span className="select-card-icon">{filter.icon}</span>
                      <span className="select-card-title">{filter.title}</span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--secondary-color)', margin: '4px 0' }}>
                        {filter.price}
                      </span>
                      <p className="select-card-desc">{filter.desc}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                  <button onClick={() => setCurrentStep(1)} className="btn btn-secondary">
                    &larr; Structure
                  </button>
                  <button onClick={() => setCurrentStep(3)} className="btn btn-primary">
                    Next: Finishes & Lining &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Interior Finishes & Coverings */}
            {currentStep === 3 && (
              <div className="glass-card" style={{ padding: '36px' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>✨</span> Interior Linings & Finishes
                </h2>

                {poolType === 'concrete-liner' && (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
                    <h3 style={{ marginBottom: '12px' }}>Reinforced PVC Membrane Included</h3>
                    <p style={{ color: 'var(--text-gray)', fontSize: '14px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
                      Since you selected the **RCC Concrete (Tile-less)** structure, it includes a premium heavy-duty, algae-resistant reinforced PVC liner sheet. This ensures permanent water-tightness with a 10-year warranty.
                    </p>
                  </div>
                )}

                {poolType === 'concrete-tiled' && (
                  <div>
                    <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
                      Choose your interior lining finish. Pricing is calculated dynamically based on total pool interior surface area (Floor + Walls = **{totalPoolSurfaceArea.toLocaleString()} sq.ft.**).
                    </p>
                    <div className="option-grid">
                      {[
                        {
                          id: 'mosaic',
                          title: 'Spanish Glass Mosaic',
                          desc: 'Premium glossy blue tiles reflecting light. Resistant to chemical corrosion, luxury aesthetic.',
                          icon: '💎',
                          price: '₹450 / sq.ft.'
                        },
                        {
                          id: 'ceramic',
                          title: 'Standard Ceramic Tiles',
                          desc: 'Traditional blue pool ceramic tile squares. Cost effective but requires grouting maintenance.',
                          icon: '🟦',
                          price: '₹280 / sq.ft.'
                        },
                        {
                          id: 'plaster',
                          title: 'PebbleTec / Plaster',
                          desc: 'Seamless blended marble dust and pebble finish. Unique textured resort styling.',
                          icon: '🐚',
                          price: '₹350 / sq.ft.'
                        }
                      ].map((finishOption) => (
                        <div
                          key={finishOption.id}
                          className={`select-card ${finish === finishOption.id ? 'active' : ''}`}
                          onClick={() => setFinish(finishOption.id)}
                        >
                          <span className="select-card-icon">{finishOption.icon}</span>
                          <span className="select-card-title">{finishOption.title}</span>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--secondary-color)', margin: '4px 0' }}>
                            {finishOption.price}
                          </span>
                          <p className="select-card-desc">{finishOption.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {poolType === 'fiberglass' && (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧪</div>
                    <h3 style={{ marginBottom: '12px' }}>Factory Finish Gelcoat Included</h3>
                    <p style={{ color: 'var(--text-gray)', fontSize: '14px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
                      Fiberglass pools are delivered pre-finished with a premium marine-grade Gelcoat surface which is ultra-smooth, stain-resistant and requires no extra tiling or linings.
                    </p>
                  </div>
                )}

                {poolType === 'above-ground' && (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
                    <h3 style={{ marginBottom: '12px' }}>Integrated Liner Included</h3>
                    <p style={{ color: 'var(--text-gray)', fontSize: '14px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
                      Above Ground pools include their own custom-fit vinyl lining package, requiring no further selections.
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                  <button onClick={() => setCurrentStep(2)} className="btn btn-secondary">
                    &larr; Filtration
                  </button>
                  <button onClick={() => setCurrentStep(4)} className="btn btn-primary">
                    Next: Add-ons & Logistics &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Accessories, Wellness & Site Logistics */}
            {currentStep === 4 && (
              <div className="glass-card" style={{ padding: '36px' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>💡</span> Accessories & Installation Logistics
                </h2>

                <h3 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '16px' }}>Wellness Upgrades</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                  {[
                    { id: 'rgbLights', name: 'RGB Multi-Color Submersible Lights', desc: 'Remote controlled color-changing LED lighting (Includes transform units)', price: 25000, icon: '💡' },
                    { id: 'heating', name: 'Electric Heat Pump Heating Plant', desc: 'Extend swim season through winter with automated solar/thermo regulation', price: 220000, icon: '🔥' },
                    { id: 'spaJets', name: 'Hot Tub Jacuzzi Jet Package', desc: '4 booster jets integrated in pool bench, controlled by secondary pump blower', price: 120000, icon: '🛁' },
                    { id: 'swimJet', name: 'Counter-Current Swim Trainer Jet', desc: 'High pressure resistance jet stream, allowing endless swimming in compact pools', price: 150000, icon: '🏊‍♂️' },
                    { id: 'waterfall', name: 'Custom Sheer Descent Waterfall', desc: '3-foot wide sleek water sheet feature cascading from decorative stone wall', price: 60000, icon: '🌊' },
                    { id: 'cover', name: 'Automated Hard Cover Assembly', desc: 'Motorized roller cover for pool protection, safety barriers and leaf prevention', price: 180000, icon: '🛡️' }
                  ].map((addon) => (
                    <div
                      key={addon.id}
                      className={`toggle-item ${addons[addon.id] ? 'active' : ''}`}
                      onClick={() => setAddons({ ...addons, [addon.id]: !addons[addon.id] })}
                    >
                      <div className="toggle-info">
                        <span className="toggle-icon">{addon.icon}</span>
                        <div>
                          <div className="toggle-name">{addon.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>{addon.desc}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span className="toggle-price">+ ₹{addon.price.toLocaleString()}</span>
                        <label className="switch" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={addons[addon.id]}
                            onChange={() => setAddons({ ...addons, [addon.id]: !addons[addon.id] })}
                          />
                          <span className="slider-toggle"></span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '16px' }}>Site Constraints & Location</h3>

                <div className="form-group">
                  <label className="form-label">Excavation Soil Condition</label>
                  <select
                    value={logistics.soil}
                    onChange={(e) => setLogistics({ ...logistics, soil: e.target.value })}
                    className="form-input"
                    style={{ background: 'var(--bg-navy)' }}
                  >
                    <option value="normal">Normal Soil (Standard Earth Excavation - ₹0)</option>
                    <option value="cotton">Black Cotton Soil (Requires RCC Underreamed Foundation Piles - +₹75,000)</option>
                    <option value="rocky">Rocky/Chert Strata (Requires Heavy Hydraulic Breakers & Excavator - +₹95,000)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Site Accessibility</label>
                  <select
                    value={logistics.access}
                    onChange={(e) => setLogistics({ ...logistics, access: e.target.value })}
                    className="form-input"
                    style={{ background: 'var(--bg-navy)' }}
                  >
                    <option value="easy">Easy Accessibility (Tractor/JCB can enter project plot - ₹0)</option>
                    <option value="restricted">Restricted Access (Manual earth haulage & concrete carrying - +₹40,000)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label className="form-label">Installation Location</label>
                  <select
                    value={logistics.region}
                    onChange={(e) => setLogistics({ ...logistics, region: e.target.value })}
                    className="form-input"
                    style={{ background: 'var(--bg-navy)' }}
                  >
                    <option value="local">Indore District & Bypass Area (Local mobilize - ₹0)</option>
                    <option value="regional">Central India (Ujjain, Bhopal, Dhar, Dewas etc - +₹60,000)</option>
                    <option value="national">Pan-India Installation (Specialized structural crew mobilize - +₹1,20,000)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                  <button onClick={() => setCurrentStep(3)} className="btn btn-secondary">
                    &larr; Finishes
                  </button>
                  <button onClick={() => setCurrentStep(5)} className="btn btn-primary">
                    Next: Cost Summary &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Lead Form, Detailed Invoice Request */}
            {currentStep === 5 && (
              <div className="glass-card" style={{ padding: '36px' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📋</span> Save Estimate & Get Drawings
                </h2>
                <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
                  Submit this specification to our engineering team. We will generate detailed 2D structural layouts, plumbing flow charts, and email a formal commercial quotation.
                </p>

                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={contactData.name}
                      onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="+91 98..."
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message / Custom Requirements (Optional)</label>
                    <textarea
                      name="message"
                      value={contactData.message}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Add any details like: expected start date, site photos, overflow channel deck design, pool enclosure request..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-accent"
                    style={{ width: '100%' }}
                    disabled={submitStatus.loading}
                  >
                    {submitStatus.loading ? 'Submitting Specifications...' : 'Request Official Quote'}
                  </button>

                  {submitStatus.success && (
                    <div style={{ marginTop: '16px', color: '#28a745', fontSize: '14px', fontWeight: '500', background: 'rgba(40, 167, 69, 0.1)', border: '1px solid #28a745', padding: '12px', borderRadius: '8px' }}>
                      {submitStatus.success}
                    </div>
                  )}
                  {submitStatus.error && (
                    <div style={{ marginTop: '16px', color: '#dc3545', fontSize: '14px', fontWeight: '500', background: 'rgba(220, 53, 69, 0.1)', border: '1px solid #dc3545', padding: '12px', borderRadius: '8px' }}>
                      ❌ Error: {submitStatus.error}
                    </div>
                  )}
                </form>

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '30px' }}>
                  <button onClick={() => setCurrentStep(4)} className="btn btn-secondary">
                    &larr; Add-ons & Site Info
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Live Ticker Panel (Hidden on print) */}
          <div className="sticky-summary">
            <h2 className="summary-heading">Budget Summary</h2>

            {/* Live Pricing Bubble */}
            <div className="live-price-box">
              <span className="live-price-title">Estimated Valuation</span>
              <div className="live-price-amount">
                ₹{grandTotal.toLocaleString()}*
              </div>
              <span className="live-price-subtitle">*Excludes local earth disposal cartage</span>
            </div>

            {/* Volume Stats */}
            <div className="capacity-stats">
              <div className="stat-item" style={{ borderRight: '1px solid var(--border-glass)' }}>
                <span className="stat-label">Water Capacity</span>
                <div className="stat-val">{volumeLitres.toLocaleString()} Litres</div>
              </div>
              <div className="stat-item">
                <span className="stat-label">Pool Surface Area</span>
                <div className="stat-val">{surfaceArea} sq.ft.</div>
              </div>
            </div>

            {/* Dynamic Donut Chart */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="chart-wrapper">
                <svg width="150" height="150" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={strokeWidth}
                  />
                  {donutSegments.map((segment, idx) => (
                    <circle
                      key={idx}
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="transparent"
                      stroke={segment.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={segment.strokeDasharray}
                      strokeDashoffset={segment.strokeDashoffset}
                      transform="rotate(-90 60 60)"
                      style={{ transition: 'stroke-dasharray 0.4s ease, stroke-dashoffset 0.4s ease' }}
                    />
                  ))}
                </svg>
                <div className="chart-center-text">
                  <span className="chart-center-val">₹{(subtotal/100000).toFixed(1)}L</span>
                  <span className="chart-center-lbl">Net Cost</span>
                </div>
              </div>

              {/* Chart Legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px', justifyContent: 'center', marginTop: '10px' }}>
                {donutSegments.map((segment, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: segment.color }} />
                    <span style={{ fontSize: '11px', color: 'var(--text-gray)' }}>
                      {segment.label} ({segment.percent}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Breakdown Progress Bars */}
            <div className="breakdown-list" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '15px' }}>
              {breakDownItems.map((item, idx) => {
                if (item.value === 0) return null;
                const percentage = Math.round((item.value / subtotal) * 100);
                return (
                  <div key={idx} className="breakdown-row">
                    <div className="breakdown-header">
                      <span className="breakdown-label">{item.label}</span>
                      <span className="breakdown-val">₹{item.value.toLocaleString()} ({percentage}%)</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className={`progress-fill ${item.class}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="breakdown-row" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', marginTop: '5px' }}>
                <div className="breakdown-header">
                  <span className="breakdown-label" style={{ fontWeight: '700' }}>Engineering Fee (5%)</span>
                  <span className="breakdown-val">₹{engineeringFee.toLocaleString()}</span>
                </div>
              </div>
              <div className="breakdown-row">
                <div className="breakdown-header">
                  <span className="breakdown-label" style={{ fontWeight: '700' }}>GST (18% Works Contract)</span>
                  <span className="breakdown-val">₹{gst.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Print and Save Actions */}
            <div className="summary-actions">
              <button onClick={triggerPrint} className="btn btn-secondary" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <span>🖨️</span> Print detailed estimate
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="btn btn-primary"
                style={{ background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--accent-color) 100%)', color: '#030a16', fontWeight: '700' }}
              >
                📥 Save Specification
              </button>
            </div>

            <p className="summary-disclaimer">
              Calculations are engineered estimates. Final commercial billing is subject to geotechnical soil reports.
            </p>
          </div>

        </div>

      </div>

      {/* ================= PRINT-ONLY INVOICE LAYOUT ================= */}
      <div className="print-only-invoice">
        <div className="print-header">
          <div>
            <div className="print-title">VEDAANT POOLS TECHNOLOGY</div>
            <div className="print-subtitle">Turnkey Pool Construction | Waterproofing | Wellness Spas</div>
            <div className="print-subtitle">House No. L-1, Vandana Vihar, Bhangarh Road, Indore, MP | +91 9479940047, +91 9827841047</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>BUDGET ESTIMATE SHEET</div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>
              Estimate Code: VPT-EST-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}
            </div>
            <div style={{ fontSize: '11px', color: '#555' }}>
              Date: {new Date().toLocaleDateString('en-IN')}
            </div>
          </div>
        </div>

        <div className="print-meta-grid">
          <div className="print-meta-block">
            <h4>1. PROJECT GEOMETRY & SIZING</h4>
            <table style={{ width: '100%', fontSize: '11px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '4px 0', border: 'none', fontWeight: 'bold' }}>Dimensions:</td>
                  <td style={{ padding: '4px 0', border: 'none' }}>{length} ft Long × {width} ft Wide × {depth} ft Average Depth</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0', border: 'none', fontWeight: 'bold' }}>Total Area:</td>
                  <td style={{ padding: '4px 0', border: 'none' }}>{surfaceArea} Sq.Ft.</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0', border: 'none', fontWeight: 'bold' }}>Water Capacity:</td>
                  <td style={{ padding: '4px 0', border: 'none' }}>{volumeLitres.toLocaleString()} Litres ({volumeGallons.toLocaleString()} Gallons)</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0', border: 'none', fontWeight: 'bold' }}>Pool Shape:</td>
                  <td style={{ padding: '4px 0', border: 'none' }} style={{ textTransform: 'capitalize' }}>{poolShape}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="print-meta-block">
            <h4>2. CORE SPECIFICATION</h4>
            <table style={{ width: '100%', fontSize: '11px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '4px 0', border: 'none', fontWeight: 'bold' }}>Pool Shell Construction:</td>
                  <td style={{ padding: '4px 0', border: 'none' }}>
                    {poolType === 'concrete-liner' ? 'RCC Concrete (Tile-less Membrane)' : poolType === 'concrete-tiled' ? 'RCC Concrete (Tile Finished)' : poolType === 'fiberglass' ? 'Prefabricated Fiberglass Shell' : 'Above-ground Modular'}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0', border: 'none', fontWeight: 'bold' }}>Water Sanitizer Plant:</td>
                  <td style={{ padding: '4px 0', border: 'none' }}>
                    {filtration === 'sand' ? 'High-Bed Sand Filter + Multiport valve' : filtration === 'cartridge' ? 'Compact Cartridge Filter' : filtration === 'salt' ? 'Saltwater Chlorine Generator' : 'UV Sanitization + Ozonator'}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0', border: 'none', fontWeight: 'bold' }}>Interior Finish:</td>
                  <td style={{ padding: '4px 0', border: 'none' }}>
                    {finish === 'liner' ? 'Heavy-duty German Algae-Proof PVC Liner' : finish === 'mosaic' ? 'Spanish Glass Mosaic Tiling' : finish === 'ceramic' ? 'Ceramic Tiles' : finish === 'plaster' ? 'Marble Plaster' : 'Factory Gelcoat Finish'}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0', border: 'none', fontWeight: 'bold' }}>Installation Region:</td>
                  <td style={{ padding: '4px 0', border: 'none' }}>
                    {logistics.region === 'local' ? 'Indore District (Local)' : logistics.region === 'regional' ? 'Central India (Regional)' : 'Pan-India Installation'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h4>3. BUDGET ESTIMATE ITEMIZED COST SHEET</h4>
        <table className="print-table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>S.No.</th>
              <th style={{ width: '55%' }}>Item Description & Technical Specs</th>
              <th style={{ width: '15%', textAlign: 'right' }}>Tax Base</th>
              <th style={{ width: '20%', textAlign: 'right' }}>Total (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <strong>RCC Shell Construction & Excavation Works</strong><br />
                Structural excavation, timber shuttering, reinforcement steel mesh, laying of M25 concrete shell conforming to IS:3370 water retaining standards.
              </td>
              <td style={{ textAlign: 'right' }}>Base Area Rate</td>
              <td style={{ textAlign: 'right' }}>₹{civilCost.toLocaleString()}</td>
            </tr>

            {finishCost > 0 && (
              <tr>
                <td>2</td>
                <td>
                  <strong>Interior Waterproof Finish & Membrane Lining</strong><br />
                  Application of multi-layer waterproof render with {finish === 'liner' ? 'Heavy-duty reinforced German PVC membrane' : finish === 'mosaic' ? 'Spanish Glass Mosaic tile sheet grids' : finish === 'ceramic' ? 'High-density pool ceramic tiles' : 'Pebble/Marble dust plaster'} including waterproofing grout joints.
                </td>
                <td style={{ textAlign: 'right' }}>Surface Area</td>
                <td style={{ textAlign: 'right' }}>₹{finishCost.toLocaleString()}</td>
              </tr>
            )}

            <tr>
              <td>3</td>
              <td>
                <strong>Recirculation & Filtration System Plant</strong><br />
                Equipment layout conforming to turnover rate of 6 hours. Includes {filtration === 'sand' ? 'Heavy duty Sand filter' : filtration === 'cartridge' ? 'Eco-cartridge filter' : filtration === 'salt' ? 'Saltwater chlorination cell' : 'Automated UV Sanitizer and Ozonator'}, circulation pump, skimmers, main drain grids, inlets, UPVC Class 9 plumbing network pipes & fittings.
              </td>
              <td style={{ textAlign: 'right' }}>Plant Sizing</td>
              <td style={{ textAlign: 'right' }}>₹{filtrationCost.toLocaleString()}</td>
            </tr>

            {wellnessCost > 0 && (
              <tr>
                <td>4</td>
                <td>
                  <strong>Wellness Spa Hardware & Accessories Upgrades</strong><br />
                  {addons.rgbLights ? '- RGB LED underwater lights (multi-color with RF receiver)\n' : ''}
                  {addons.heating ? '- Electric thermodynamic heat pump heater plant\n' : ''}
                  {addons.spaJets ? '- Jacuzzi hydro-jets (4 nozzles + 2HP booster blower pump)\n' : ''}
                  {addons.swimJet ? '- High pressure Counter-current endless swim trainer jet\n' : ''}
                  {addons.waterfall ? '- Sheer Descent 3ft wide waterfall fountain cascade\n' : ''}
                  {addons.cover ? '- Automated safety lock roll-on pool cover assembly\n' : ''}
                </td>
                <td style={{ textAlign: 'right' }}>Selected Units</td>
                <td style={{ textAlign: 'right' }}>₹{wellnessCost.toLocaleString()}</td>
              </tr>
            )}

            {logisticsCost > 0 && (
              <tr>
                <td>5</td>
                <td>
                  <strong>Site Mobilization, Foundations & Logistics Surcharges</strong><br />
                  Includes {logistics.soil === 'cotton' ? 'Raft pile reinforcement foundation for black cotton soil' : logistics.soil === 'rocky' ? 'Hydraulic breaker jackhammers for rock excavation' : 'Standard soil prep'}.
                  {logistics.access === 'restricted' ? ' Manual cartage haulage surcharge for tight workspace.' : ''}
                  {logistics.region === 'regional' ? ' Regional mobilization transport & site lodging.' : logistics.region === 'national' ? ' Outstation logistics, machinery transport & outstation mobilization.' : ''}
                </td>
                <td style={{ textAlign: 'right' }}>Logistics flat</td>
                <td style={{ textAlign: 'right' }}>₹{logisticsCost.toLocaleString()}</td>
              </tr>
            )}

            <tr style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}>
              <td colSpan="3" style={{ textAlign: 'right' }}>Net Civil & Mechanical Subtotal:</td>
              <td style={{ textAlign: 'right' }}>₹{subtotal.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan="3" style={{ textAlign: 'right' }}>Structural Drawing & Layout Engineering Fee (5%):</td>
              <td style={{ textAlign: 'right' }}>₹{engineeringFee.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan="3" style={{ textAlign: 'right' }}>Works Contract Services GST (18%):</td>
              <td style={{ textAlign: 'right' }}>₹{gst.toLocaleString()}</td>
            </tr>
            <tr className="print-total-row">
              <td colSpan="3" style={{ textAlign: 'right', fontSize: '14px', color: '#0b5edd' }}>GRAND ESTIMATED BUDGET:</td>
              <td style={{ textAlign: 'right', fontSize: '14px', color: '#0b5edd' }}>₹{grandTotal.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '20px', fontSize: '11px', lineHeight: '1.5' }}>
          <strong>TERMS AND CONDITIONS:</strong>
          <ul style={{ paddingLeft: '20px', margin: '6px 0' }}>
            <li>Water & electrical connection points at the site plant room must be provided by the client.</li>
            <li>Earth disposal from excavator cartage outside the property line is in the client's scope of work.</li>
            <li>Vedaant Pools provides a 10-Year structural guarantee on concrete tightness & waterproofing.</li>
            <li>Warranty on pump/filters is 2 years, lights and wellness elements carry a 1-year manufacturer warranty.</li>
          </ul>
        </div>

        <div className="print-footer">
          This document is a computerized budgetary estimate generated by the Vedaant Pools interactive quotation engine.<br />
          For detailed site inspection & architectural layouts, contact vedaantpools@gmail.com or call +91-9479940047 / +91-9827841047.
        </div>
      </div>

    </div>
  );
}
