"use client";

import { useState, useEffect } from 'react';

// Default initial sets for fallback & pre-population
const defaultWhatWeBuild = [
  {
    title: "Residential & Private Swimming Pools",
    category: "Swimming Pools",
    desc: "Customized residential concrete pools built to complement private villa aesthetics with integrated stairs, tanning ledges, and underwater lighting.",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800",
    highlights: ["Bespoke Villa Layouts", "LED Underwater Illumination", "Non-Slip Mosaic Coping", "Quiet Inverter Pumps"]
  },
  {
    title: "Farm House Swimming Pools",
    category: "Swimming Pools",
    desc: "Spacious country home and recreational farmhouse pools engineered with natural stone copings, deck pergolas, and heavy-duty sand filtration.",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800",
    highlights: ["Natural Stone Decks", "High-Volume Filtration", "Integrated Sunken Seating", "Low Chemical Salt Chlorination"]
  },
  {
    title: "Resort & Hotel Pools",
    category: "Swimming Pools",
    desc: "High-capacity commercial pools with vanishing edge overflows, zero-entry beach slopes, swim-up bars, and continuous turnover circulation.",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
    highlights: ["Vanishing Horizon Edges", "Commercial Surge Tanks", "Bespoke Swim-Up Bars", "Ozone Disinfection Systems"]
  },
  {
    title: "Institutional & Competition Pools",
    category: "Swimming Pools",
    desc: "FINA standard semi-Olympic and Olympic-size pools for universities, sports academies, and clubs with precision racing lane markers.",
    img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800",
    highlights: ["FINA Certified Dimensions", "Stainless Starting Blocks", "Sub-Surface Lane Markers", "High-Velocity Sand Filters"]
  },
  {
    title: "Overflow & Vanishing Edge Pools",
    category: "Swimming Pools",
    desc: "Mirror-flat water surface pools with perimeter slot channels and vanishing edge weir walls that blend into surrounding scenic landscapes.",
    img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800",
    highlights: ["Perimeter Slot Gutters", "Mirror Water Reflection", "Surge Tank Automation", "Zero Water Wastage"]
  },
  {
    title: "Water Bodies & Architectural Waterscapes",
    category: "Fountains & Water Bodies",
    desc: "Reflective water canals, natural koi ponds, stepping stone water channels, and decorative indoor/outdoor architectural water bodies.",
    img: "/artificial Waterfall Construction in the house .jpg",
    highlights: ["Natural Stone Cascades", "Biological UV Clarifiers", "Architectural Stepping Stones", "Submersible LED Mood Spots"]
  },
  {
    title: "Outdoor Water Fountains",
    category: "Fountains & Water Bodies",
    desc: "Majestic stone tier fountains, foaming spouts, bubbling geysers, and high-pressure artificial waterfalls designed for plazas and gardens.",
    img: "/Fountain construction Installation.jpg",
    highlights: ["AISI-316 Stainless Nozzles", "High-Head Submersible Pumps", "Wind Sensor Automation", "Algae Resistance Coatings"]
  },
  {
    title: "Musical & Dynamic Fountains",
    category: "Fountains & Water Bodies",
    desc: "State-of-the-art DMX-choreographed musical fountains with programmable variable speed pumps, solenoid valves, and synchronized music shows.",
    img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800",
    highlights: ["DMX Digital Controllers", "Solenoid Fast Action Jets", "Synchronized RGB Arrays", "Custom Audio Integration"]
  },
  {
    title: "Waterparks & Splash Parks",
    category: "Waterparks",
    desc: "Turnkey waterpark development including multi-lane body slides, interactive kids' splash pads, rain dance zones, and wave pool machinery.",
    img: "/Water Park CONSTRUCTION AND Development.jpg",
    highlights: ["FRP Spiral & Speed Slides", "Kids Splash Water Buckets", "Rain Dance Misting Panels", "Certified Safety Life Lines"]
  },
  {
    title: "Steam Bath Suites",
    category: "Spas & Wellness",
    desc: "Custom commercial and residential steam bath rooms featuring heavy-duty steam boilers, digital temperature controls, and aroma injection.",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
    highlights: ["Heavy-Duty Steam Boilers", "Digital Touch Control", "Aromatherapy Dispensers", "Thermal Insulated Glass"]
  },
  {
    title: "Finnish Sauna Rooms",
    category: "Spas & Wellness",
    desc: "Authentic Nordic pine and Finnish cedar wood saunas equipped with specialized volcanic rock electric heaters and humidity regulators.",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800",
    highlights: ["Imported Finnish Pine Wood", "Volcanic Peridotite Rocks", "Digital Thermostat Units", "Toughened Safety Glass"]
  },
  {
    title: "Hydrotherapy Jacuzzis & Hot Tubs",
    category: "Spas & Wellness",
    desc: "Ergonomic therapeutic whirlpools and heated hot tubs with hydro-massage water jets, air blowers, and inline titanium heaters.",
    img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800",
    highlights: ["Targeted Hydro-Massage Jets", "Titanium Inline Heaters", "Ozone Water Sanitization", "Ergonomic Body Loungers"]
  }
];

const defaultServices = [
  {
    title: "Pool Construction",
    category: "Construction",
    desc: "Heavy-duty concrete excavation, steel reinforcement, and structural shell casting.",
    longDesc: "We carry out high-strength reinforced cement concrete (RCC) pool constructions engineered to withstand heavy hydrostatic and soil pressures. Our civil engineering teams manage structural excavation, layout formwork, double-layer Fe500 steel reinforcement grids, and monolithic concrete casting with crystalline waterproof additives.",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800",
    pipeline: ["Excavation", "Steel Reinforcement", "Concrete Casting", "Water Testing"],
    specs: {
      "Typical Timeline": "45 - 90 Days",
      "Structural Material": "M30 Grade Concrete with Fe500 Steel",
      "Waterproofing": "Monolithic Crystalline Admixtures",
      "Engineering Standards": "IS 456 & IS 3370 Compliant"
    }
  },
  {
    title: "3D Pool Designing",
    category: "Designing",
    desc: "Custom architectural planning, 3D CAD modeling, and hydraulic system blueprints.",
    longDesc: "Our design studio creates precise 3D architectural renders and virtual walk-throughs of your pool concepts. We map out structural topography, surrounding pool deck integrations, hydraulic piping friction loss calculations, and mechanical filter room layouts. This ensures perfect sizing before any soil is moved.",
    img: "https://images.unsplash.com/photo-1503387762458-bf48293b1d30?q=80&w=800",
    pipeline: ["Concept Sketch", "3D Modeling", "Hydraulic Sizing", "Approved Blueprints"],
    specs: {
      "Turnaround": "5 - 12 Days",
      "Software Stack": "AutoCAD, SolidWorks & 3ds Max Studio",
      "Deliverables": "3D Photorealistic Visuals & 2D Hydraulic Blueprints",
      "Design Standards": "SP 34 & IS Code Guidelines"
    }
  },
  {
    title: "Turnkey Facility Building",
    category: "Building",
    desc: "End-to-end commercial builders for resorts, waterparks, and competition pools.",
    longDesc: "We specialize in constructing large-scale commercial aquatic projects for hotels, high-end housing clubs, and waterparks. Our engineering division manages structural planning, electrical control automation, perimeter overflow channels, surge tanks, and high-rate mechanical filtration operations.",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800",
    pipeline: ["Structural Design", "Hydraulic Piping", "Mechanical Rooms", "Surge Tank Testing"],
    specs: {
      "Scope Size": "Commercial & Resort Complexes",
      "Compliance": "FINA Standard Compliant",
      "Sanitation Systems": "High-Output Ozone & Surge Tank Systems",
      "Project Period": "90 - 180 Days"
    }
  },
  {
    title: "Filtration & Pipe Installing",
    category: "Installing",
    desc: "Precision plumbing, high-rate filtration plant, and automated chemical controls.",
    longDesc: "We install heavy-duty, pressure-rated schedule-80 UPVC piping layouts designed to optimize pool water circulation and eliminate dead-zones. Our mechanical crew sets up premium high-rate fiberglass sand filter plants, automated disinfection units, and variable speed pump systems.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
    pipeline: ["Pipe Layouts", "Equipment Sizing", "Filter Placement", "Pressure Balancing"],
    specs: {
      "Pipe Quality": "Schedule-80 Heavy Duty UPVC Pipes",
      "Filters Used": "Fiberglass Sand & Multi-Port Valve Plants",
      "Sanitation Controls": "Automated Chlorine Dosing & UV Disinfection",
      "Test Standard": "Pressure Tested up to 10 Bar"
    }
  },
  {
    title: "Structural Consulting",
    category: "Consultant",
    desc: "Expert soil testing, leak investigations, waterproofing planning, and site assessments.",
    longDesc: "VPT provides professional diagnostic and consulting services for water containment structures. Our engineers run pressure testing, chemical concrete analysis, and moisture tracking to diagnose structural cracks and design detailed waterproofing repair specifications.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
    pipeline: ["Site Inspection", "Pressure Diagnostics", "Load Assessment", "Structural Report"],
    specs: {
      "Services Offered": "Leak detection, Soil load analysis & Crack forensics",
      "Diagnostics Used": "Thermal Imaging & Pressure Diagnostics",
      "Consultant Status": "Licensed Structural Engineers",
      "Reporting": "Detailed CAD Reports in 3 Days"
    }
  },
  {
    title: "Pool Equipment Supply",
    category: "Equipment",
    desc: "Direct B2B supply of heavy-duty commercial sand filters, pumps, and sanitization systems.",
    longDesc: "As a major Central India distributor, we offer direct B2B pricing on commercial pool hardware. We supply high-efficiency pool pumps, glass filter media, multi-port control valves, salt-chlorine generators, and automated chemical control panels directly to developers and site contractors.",
    img: "https://images.unsplash.com/photo-1622322428943-e11418701a30?q=80&w=800",
    pipeline: ["Equipment Specs", "Direct Quote", "Quality Packing", "Wholesale Shipping"],
    specs: {
      "Equipment Catalog": "Pumps, Filtration Plants, Salt Sanitizers",
      "Brands Sourced": "AstralPool, Hayward, VPT Specialty",
      "Warranty Offered": "2-Year Manufacturer Warranty",
      "Wholesale Shipping": "Central India Delivery within 48 Hours"
    }
  },
  {
    title: "Premium Accessories",
    category: "Accessories",
    desc: "High-quality stainless steel ladders, underwater LED lights, and custom water fountains.",
    longDesc: "Enhance pool aesthetics with our premium hardware catalog. We manufacture and supply AISI-304/316 stainless steel pool ladders, underwater RGB LED lights, custom water fountain nozzles, and overflow drain grates built to withstand chemical pool environments.",
    img: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800",
    pipeline: ["Accessory Spec", "Metal Grade Sizing", "IP68 Testing", "Custom Fitment"],
    specs: {
      "Metal Grade": "AISI 304 & AISI 316 Stainless Steel",
      "Aesthetics": "RGB LED Remote Lights (IP68 Waterproof)",
      "Accessories": "Ladders, Grab Rails, Fountain Nozzles",
      "Corrosion Guarantee": "5-Year Rust Free Warranty"
    }
  },
  {
    title: "Boutique Pool Maintenance",
    category: "Maintenance",
    desc: "Annual maintenance contracts (AMC), water balancing, sanitization, and deep cleaning.",
    longDesc: "Bespoke annual maintenance contracts (AMC) for commercial resort facilities and residential estates. Our certified pool operators manage weekly water chemistry audits, filter backwashing, system inspections, wall brushing, and automatic robotic vacuum cleaning.",
    img: "https://images.unsplash.com/photo-1500333917452-484122b8b9e0?q=80&w=800",
    pipeline: ["AMC Agreement", "Chemistry Auditing", "Deep Sanitization", "Equipment Tuning"],
    specs: {
      "Visit Frequency": "Weekly & Bi-Weekly Packages",
      "Chemical Controls": "pH, Chlorine, Algaecide & Hardness Balancing",
      "Upkeep Systems": "Robotic Wall Cleaners & Skimmer Maintenance",
      "Emergency AMC": "24-Hour Callout Resolution"
    }
  },
  {
    title: "Modern Pool Renovation",
    category: "Renovation",
    desc: "Complete mosaic retiling, structural leak-proofing, and mechanical system restoration.",
    longDesc: "We restore aged, leaking, or structurally failing pools back to pristine condition. Our team strips old mosaic tiles, repairs concrete degradation with pressure epoxy injections, replaces piping layouts, and upgrades mechanical systems with energy-efficient hardware.",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
    pipeline: ["Demolition & Stripping", "Leak-Proof Coatings", "Tiling & Fitting", "System Commissioning"],
    specs: {
      "Renovations Offered": "Tiling, Plumbing & Deck Remodeling",
      "Waterproofing Repair": "Crystalline Leak-Proof Polymer Coatings",
      "Mechanicals Upgrade": "Energy-Efficient Variable Speed Pumps",
      "Aesthetic Conversion": "Skimmer to Infinity Overflow Upgrade"
    }
  }
];

const defaultAboutContent = {
  founderName: "Yogendra Gupta",
  founderRole: "Founder & Managing Director",
  founderImage: "/owner.jpg",
  overviewImage: "/Construction of Swimming Pools (1).jpg",
  tagline: "Indore's premier turnkey aquatic engineering contractor, manufacturer, and wholesale distributor.",
  establishedYear: "2018",
  domainExperience: "15+ Yrs",
  tradeRating: "5.0 ★",
  officeAddress: "House No. L-1, Vandana Vihar, Bhangarh Road, Indore, Madhya Pradesh, India",
  phoneNumbers: "+91-9479940047 / +91-9827841047",
  gstin: "23AGZPG1057G1ZD",
  founderBio: "Under the visionary leadership of Yogendra Gupta, Vedaant Pools Technology has established itself as the most reliable aquatic partner in Central India. Mr. Gupta brings deep technical expertise in structural concrete behaviour, soil load bearing, and high-pressure pool hydraulics. Unlike generic contractors, our founder personally supervises site layout planning, reinforcement steel grid inspections, and filtration plant pressure calibrations."
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('branding'); // 'branding' | 'backgrounds' | 'whatwebuild' | 'services' | 'about'
  
  // State variables for all dynamic settings
  const [backgrounds, setBackgrounds] = useState([]);
  const [newBgUrl, setNewBgUrl] = useState('');
  
  const [branding, setBranding] = useState({
    logoText: 'VEDAANT POOLS TECHNOLOGY',
    logoImageUrl: '',
    tagline: 'From Conceptualization to Finalisation',
    slogan: 'We specialize in the end-to-end design, construction, and maintenance of premium swimming pools and professional water bodies.'
  });

  const [whatWeBuild, setWhatWeBuild] = useState(defaultWhatWeBuild);
  const [services, setServices] = useState(defaultServices);
  const [aboutContent, setAboutContent] = useState(defaultAboutContent);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null); // tracking upload state per item
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch all configuration documents on mount
  const fetchAllSettings = async () => {
    try {
      // 1. Backgrounds
      const resBg = await fetch('/api/settings?key=hero_backgrounds');
      if (resBg.ok) {
        const d = await resBg.json();
        if (d && Array.isArray(d.value)) setBackgrounds(d.value);
      }

      // 2. Branding
      const resBrand = await fetch('/api/settings?key=site_branding');
      if (resBrand.ok) {
        const d = await resBrand.json();
        if (d && d.value) setBranding(prev => ({ ...prev, ...d.value }));
      }

      // 3. What We Build
      const resBuild = await fetch('/api/settings?key=what_we_build_items');
      if (resBuild.ok) {
        const d = await resBuild.json();
        if (d && Array.isArray(d.value) && d.value.length > 0) setWhatWeBuild(d.value);
      }

      // 4. Services
      const resSvc = await fetch('/api/settings?key=services_items');
      if (resSvc.ok) {
        const d = await resSvc.json();
        if (d && Array.isArray(d.value) && d.value.length > 0) setServices(d.value);
      }

      // 5. About
      const resAbout = await fetch('/api/settings?key=about_page_content');
      if (resAbout.ok) {
        const d = await resAbout.json();
        if (d && d.value) setAboutContent(prev => ({ ...prev, ...d.value }));
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSettings();
  }, []);

  // Generic Save Handler to MongoDB Setting collection
  const saveSettingKey = async (key, value, successMsg) => {
    setSaving(true);
    setMessage('');
    setError(null);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Failed to save ${key}`);

      setMessage(`🎉 ${successMsg}`);
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Image Upload Helper for specific items
  const uploadImageFile = async (file, onUploaded, idTag) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5MB limit.');
      return;
    }

    setUploadingIdx(idTag);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload image');

      onUploaded(data.imageUrl);
      setMessage('📤 Image uploaded successfully! Remember to click Save.');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingIdx(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <p style={{ color: 'var(--text-gray)' }}>Loading site configurations & media assets...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '30px', color: 'var(--text-white)' }}>Site Content & Media Manager</h1>
        <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>
          Upload and manage images, titles, and details for What We Build, Services, About page, Hero Backgrounds, and Branding.
        </p>
      </div>

      {/* Notifications */}
      {message && (
        <div style={{ padding: '14px 18px', background: 'rgba(40, 167, 69, 0.12)', border: '1px solid #28a745', color: '#28a745', borderRadius: '8px', fontWeight: '600', marginBottom: '24px', fontSize: '14px' }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ padding: '14px 18px', background: 'rgba(220, 53, 69, 0.12)', border: '1px solid #dc3545', color: '#dc3545', borderRadius: '8px', fontWeight: '600', marginBottom: '24px', fontSize: '14px' }}>
          ⚠️ Error: {error}
        </div>
      )}

      {/* 5-Tab Navigation Bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-glass)',
        marginBottom: '30px',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {[
          { id: 'branding', label: '🏷️ Logo & Branding' },
          { id: 'backgrounds', label: '🖼️ Hero Backgrounds' },
          { id: 'whatwebuild', label: '🏗️ What We Build' },
          { id: 'services', label: '🛠️ Services Catalog' },
          { id: 'about', label: '🏢 About Page Media' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid var(--secondary-color)' : '3px solid transparent',
              color: activeTab === tab.id ? 'var(--text-white)' : 'var(--text-gray)',
              fontWeight: activeTab === tab.id ? '700' : '500',
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition-smooth)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== TAB 1: LOGO & BRANDING ==================== */}
      {activeTab === 'branding' && (
        <div className="glass-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text-white)', marginBottom: '20px' }}>
            Brand Identity & Logo Configuration
          </h2>

          <form onSubmit={(e) => { e.preventDefault(); saveSettingKey('site_branding', branding, 'Brand logo and settings saved successfully!'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
              <div>
                <div className="form-group">
                  <label className="form-label">Emblem / Header Logo Text</label>
                  <input
                    type="text"
                    value={branding.logoText}
                    onChange={(e) => setBranding({ ...branding, logoText: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hero Tagline</label>
                  <input
                    type="text"
                    value={branding.tagline}
                    onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hero Short Description</label>
                  <textarea
                    value={branding.slogan}
                    onChange={(e) => setBranding({ ...branding, slogan: e.target.value })}
                    className="form-input"
                    style={{ minHeight: '100px' }}
                    required
                  />
                </div>
              </div>

              {/* Logo Upload Box */}
              <div>
                <label className="form-label">Corporate Logo Image</label>
                <div style={{
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  height: '170px',
                  background: 'rgba(9, 28, 54, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px',
                  marginBottom: '14px',
                  position: 'relative'
                }}>
                  {branding.logoImageUrl ? (
                    <>
                      <img src={branding.logoImageUrl} alt="Logo" style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }} />
                      <button
                        type="button"
                        onClick={() => setBranding({ ...branding, logoImageUrl: '' })}
                        style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(220, 53, 69, 0.2)', border: '1px solid #dc3545', color: '#dc3545', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer' }}
                      >
                        &times;
                      </button>
                    </>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>No custom image. Stylized text will be used.</span>
                  )}
                </div>

                <label className="btn btn-secondary" style={{ width: '100%', padding: '10px 0', fontSize: '13px', cursor: 'pointer', textAlign: 'center', display: 'block' }}>
                  {uploadingIdx === 'logo' ? 'Uploading...' : '📤 Select & Upload Logo Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => uploadImageFile(e.target.files?.[0], (url) => setBranding(prev => ({ ...prev, logoImageUrl: url })), 'logo')}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>

            <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
              <button type="submit" disabled={saving} className="btn btn-accent" style={{ padding: '12px 28px', borderRadius: '8px' }}>
                {saving ? 'Saving...' : '💾 Save Branding Settings'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==================== TAB 2: HERO BACKGROUNDS ==================== */}
      {activeTab === 'backgrounds' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }}>
          <div className="glass-card" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '18px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
              Homepage Slideshow Sequence ({backgrounds.length})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {backgrounds.map((url, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '8px' }}>
                  <div style={{ width: '70px', height: '45px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, background: '#091c36' }}>
                    <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, fontSize: '12px', color: 'var(--text-light)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {url}
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button type="button" onClick={() => { if (idx > 0) { const a = [...backgrounds]; const t = a[idx]; a[idx] = a[idx-1]; a[idx-1] = t; setBackgrounds(a); } }} style={{ padding: '4px 8px', background: 'none', border: '1px solid var(--border-glass)', color: 'var(--text-light)', cursor: 'pointer', borderRadius: '4px' }}>▲</button>
                    <button type="button" onClick={() => { if (idx < backgrounds.length - 1) { const a = [...backgrounds]; const t = a[idx]; a[idx] = a[idx+1]; a[idx+1] = t; setBackgrounds(a); } }} style={{ padding: '4px 8px', background: 'none', border: '1px solid var(--border-glass)', color: 'var(--text-light)', cursor: 'pointer', borderRadius: '4px' }}>▼</button>
                    <button type="button" onClick={() => setBackgrounds(backgrounds.filter((_, i) => i !== idx))} style={{ padding: '4px 8px', background: 'rgba(220,53,69,0.15)', border: '1px solid #dc3545', color: '#dc3545', cursor: 'pointer', borderRadius: '4px' }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => saveSettingKey('hero_backgrounds', backgrounds, 'Slideshow images saved successfully!')}
                disabled={saving}
                className="btn btn-accent"
                style={{ width: '100%', padding: '12px 0', borderRadius: '8px' }}
              >
                {saving ? 'Saving...' : '💾 Save Slideshow Order'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '14px' }}>📤 Upload Background Image File</h3>
              <label className="btn btn-secondary" style={{ width: '100%', padding: '12px 0', fontSize: '13px', cursor: 'pointer', textAlign: 'center', display: 'block' }}>
                {uploadingIdx === 'bg_file' ? 'Uploading...' : '📁 Select & Upload Slide File'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadImageFile(e.target.files?.[0], (url) => setBackgrounds(prev => [...prev, url]), 'bg_file')}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--text-white)', marginBottom: '14px' }}>🔗 Add Background Image URL</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="https://... or /uploads/..."
                  value={newBgUrl}
                  onChange={(e) => setNewBgUrl(e.target.value)}
                  className="form-input"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => { if (newBgUrl.trim()) { setBackgrounds([...backgrounds, newBgUrl.trim()]); setNewBgUrl(''); } }}
                  className="btn btn-secondary"
                  style={{ padding: '0 16px', borderRadius: '8px' }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: WHAT WE BUILD ==================== */}
      {activeTab === 'whatwebuild' && (
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h2 style={{ fontSize: '20px', color: 'var(--text-white)' }}>What We Build Image & Content Manager</h2>
              <p style={{ color: 'var(--text-gray)', fontSize: '13px' }}>Manage photography, titles, descriptions, and category tags across all 12 build infrastructure types.</p>
            </div>
            <button
              type="button"
              onClick={() => saveSettingKey('what_we_build_items', whatWeBuild, 'What We Build items saved successfully!')}
              disabled={saving}
              className="btn btn-accent"
              style={{ padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold' }}
            >
              {saving ? 'Saving...' : '💾 Save All Build Items'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {whatWeBuild.map((item, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '24px',
                display: 'grid',
                gridTemplateColumns: '240px 1fr',
                gap: '24px'
              }}>
                {/* Image & Upload Control */}
                <div>
                  <div style={{
                    width: '100%',
                    height: '150px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#051329',
                    border: '1px solid var(--border-glass)',
                    marginBottom: '10px',
                    position: 'relative'
                  }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <label className="btn btn-secondary" style={{ width: '100%', padding: '8px 0', fontSize: '12px', cursor: 'pointer', textAlign: 'center', display: 'block', marginBottom: '8px' }}>
                    {uploadingIdx === `build_${idx}` ? 'Uploading...' : '📤 Upload New Photo'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadImageFile(e.target.files?.[0], (url) => {
                        const updated = [...whatWeBuild];
                        updated[idx].img = url;
                        setWhatWeBuild(updated);
                      }, `build_${idx}`)}
                      style={{ display: 'none' }}
                    />
                  </label>

                  <input
                    type="text"
                    value={item.img}
                    onChange={(e) => {
                      const updated = [...whatWeBuild];
                      updated[idx].img = e.target.value;
                      setWhatWeBuild(updated);
                    }}
                    placeholder="Image URL..."
                    className="form-input"
                    style={{ fontSize: '11px', padding: '6px 8px' }}
                  />
                </div>

                {/* Content Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '15px' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '12px' }}>Build Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...whatWeBuild];
                          updated[idx].title = e.target.value;
                          setWhatWeBuild(updated);
                        }}
                        className="form-input"
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label" style={{ fontSize: '12px' }}>Category Tag</label>
                      <select
                        value={item.category}
                        onChange={(e) => {
                          const updated = [...whatWeBuild];
                          updated[idx].category = e.target.value;
                          setWhatWeBuild(updated);
                        }}
                        className="form-input"
                        style={{ background: 'var(--bg-navy)' }}
                      >
                        <option value="Swimming Pools">Swimming Pools</option>
                        <option value="Fountains & Water Bodies">Fountains & Water Bodies</option>
                        <option value="Spas & Wellness">Spas & Wellness</option>
                        <option value="Waterparks">Waterparks</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '12px' }}>Short Description</label>
                    <textarea
                      value={item.desc}
                      onChange={(e) => {
                        const updated = [...whatWeBuild];
                        updated[idx].desc = e.target.value;
                        setWhatWeBuild(updated);
                      }}
                      className="form-input"
                      style={{ minHeight: '60px', fontSize: '13px' }}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '12px' }}>Highlights (Comma-Separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(item.highlights) ? item.highlights.join(', ') : item.highlights}
                      onChange={(e) => {
                        const updated = [...whatWeBuild];
                        updated[idx].highlights = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        setWhatWeBuild(updated);
                      }}
                      className="form-input"
                      placeholder="Highlight 1, Highlight 2, Highlight 3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => saveSettingKey('what_we_build_items', whatWeBuild, 'What We Build items saved successfully!')}
              disabled={saving}
              className="btn btn-accent"
              style={{ padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold' }}
            >
              {saving ? 'Saving...' : '💾 Save All Build Items'}
            </button>
          </div>
        </div>
      )}

      {/* ==================== TAB 4: SERVICES CATALOG ==================== */}
      {activeTab === 'services' && (
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h2 style={{ fontSize: '20px', color: 'var(--text-white)' }}>Services Catalog & Media Manager</h2>
              <p style={{ color: 'var(--text-gray)', fontSize: '13px' }}>Upload photos and edit engineering details for the 9 core turnkey services.</p>
            </div>
            <button
              type="button"
              onClick={() => saveSettingKey('services_items', services, 'Services items saved successfully!')}
              disabled={saving}
              className="btn btn-accent"
              style={{ padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold' }}
            >
              {saving ? 'Saving...' : '💾 Save All Services'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {services.map((svc, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '24px',
                display: 'grid',
                gridTemplateColumns: '240px 1fr',
                gap: '24px'
              }}>
                {/* Image & Upload Control */}
                <div>
                  <div style={{
                    width: '100%',
                    height: '150px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#051329',
                    border: '1px solid var(--border-glass)',
                    marginBottom: '10px'
                  }}>
                    <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <label className="btn btn-secondary" style={{ width: '100%', padding: '8px 0', fontSize: '12px', cursor: 'pointer', textAlign: 'center', display: 'block', marginBottom: '8px' }}>
                    {uploadingIdx === `svc_${idx}` ? 'Uploading...' : '📤 Upload Service Photo'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadImageFile(e.target.files?.[0], (url) => {
                        const updated = [...services];
                        updated[idx].img = url;
                        setServices(updated);
                      }, `svc_${idx}`)}
                      style={{ display: 'none' }}
                    />
                  </label>

                  <input
                    type="text"
                    value={svc.img}
                    onChange={(e) => {
                      const updated = [...services];
                      updated[idx].img = e.target.value;
                      setServices(updated);
                    }}
                    placeholder="Image URL..."
                    className="form-input"
                    style={{ fontSize: '11px', padding: '6px 8px' }}
                  />
                </div>

                {/* Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '15px' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '12px' }}>Service Title</label>
                      <input
                        type="text"
                        value={svc.title}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[idx].title = e.target.value;
                          setServices(updated);
                        }}
                        className="form-input"
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label" style={{ fontSize: '12px' }}>Category</label>
                      <input
                        type="text"
                        value={svc.category}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[idx].category = e.target.value;
                          setServices(updated);
                        }}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '12px' }}>Short Description (Home Page Card)</label>
                    <input
                      type="text"
                      value={svc.desc}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[idx].desc = e.target.value;
                        setServices(updated);
                      }}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '12px' }}>Detailed Engineering Narrative (/services page)</label>
                    <textarea
                      value={svc.longDesc || svc.desc}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[idx].longDesc = e.target.value;
                        setServices(updated);
                      }}
                      className="form-input"
                      style={{ minHeight: '65px', fontSize: '13px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => saveSettingKey('services_items', services, 'Services items saved successfully!')}
              disabled={saving}
              className="btn btn-accent"
              style={{ padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold' }}
            >
              {saving ? 'Saving...' : '💾 Save All Services'}
            </button>
          </div>
        </div>
      )}

      {/* ==================== TAB 5: ABOUT PAGE MEDIA ==================== */}
      {activeTab === 'about' && (
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h2 style={{ fontSize: '20px', color: 'var(--text-white)' }}>About Page Media & Profile Manager</h2>
              <p style={{ color: 'var(--text-gray)', fontSize: '13px' }}>Upload the founder photograph, company project photos, and manage corporate overview bio.</p>
            </div>
            <button
              type="button"
              onClick={() => saveSettingKey('about_page_content', aboutContent, 'About page content and photos saved successfully!')}
              disabled={saving}
              className="btn btn-accent"
              style={{ padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold' }}
            >
              {saving ? 'Saving...' : '💾 Save About Page'}
            </button>
          </div>

          {/* Photos Upload Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            
            {/* Founder Photo */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '20px' }}>
              <label className="form-label">Founder & Owner Photograph</label>
              <div style={{
                width: '100%',
                height: '200px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#051329',
                border: '1px solid var(--border-glass)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={aboutContent.founderImage} alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <label className="btn btn-secondary" style={{ width: '100%', padding: '10px 0', fontSize: '12px', cursor: 'pointer', textAlign: 'center', display: 'block', marginBottom: '8px' }}>
                {uploadingIdx === 'founder_img' ? 'Uploading...' : '📤 Upload Founder Photo'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadImageFile(e.target.files?.[0], (url) => setAboutContent(prev => ({ ...prev, founderImage: url })), 'founder_img')}
                  style={{ display: 'none' }}
                />
              </label>

              <input
                type="text"
                value={aboutContent.founderImage}
                onChange={(e) => setAboutContent({ ...aboutContent, founderImage: e.target.value })}
                placeholder="Image path..."
                className="form-input"
                style={{ fontSize: '11px', padding: '6px 8px' }}
              />
            </div>

            {/* Overview Construction Photo */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '20px' }}>
              <label className="form-label">Company Overview Project Photo</label>
              <div style={{
                width: '100%',
                height: '200px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#051329',
                border: '1px solid var(--border-glass)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={aboutContent.overviewImage} alt="Overview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <label className="btn btn-secondary" style={{ width: '100%', padding: '10px 0', fontSize: '12px', cursor: 'pointer', textAlign: 'center', display: 'block', marginBottom: '8px' }}>
                {uploadingIdx === 'overview_img' ? 'Uploading...' : '📤 Upload Project Photo'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadImageFile(e.target.files?.[0], (url) => setAboutContent(prev => ({ ...prev, overviewImage: url })), 'overview_img')}
                  style={{ display: 'none' }}
                />
              </label>

              <input
                type="text"
                value={aboutContent.overviewImage}
                onChange={(e) => setAboutContent({ ...aboutContent, overviewImage: e.target.value })}
                placeholder="Image path..."
                className="form-input"
                style={{ fontSize: '11px', padding: '6px 8px' }}
              />
            </div>

          </div>

          {/* Details & Biography */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label className="form-label">Founder Name</label>
              <input
                type="text"
                value={aboutContent.founderName}
                onChange={(e) => setAboutContent({ ...aboutContent, founderName: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Founder Role / Title</label>
              <input
                type="text"
                value={aboutContent.founderRole}
                onChange={(e) => setAboutContent({ ...aboutContent, founderRole: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Founder Biography</label>
            <textarea
              value={aboutContent.founderBio}
              onChange={(e) => setAboutContent({ ...aboutContent, founderBio: e.target.value })}
              className="form-input"
              style={{ minHeight: '110px' }}
            />
          </div>

          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => saveSettingKey('about_page_content', aboutContent, 'About page content and photos saved successfully!')}
              disabled={saving}
              className="btn btn-accent"
              style={{ padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold' }}
            >
              {saving ? 'Saving...' : '💾 Save About Page Content'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
