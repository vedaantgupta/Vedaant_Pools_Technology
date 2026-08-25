"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

// Curated default equipment catalog
const DEFAULT_EQUIPMENT = [
  {
    _id: "eq_filter_sand_1",
    title: "High-Efficiency Commercial Sand Filter System",
    category: "Sanitation & Upkeep",
    price: 45000,
    mrp: 58000,
    imageUrl: "/uploads/sand-filter.png",
    description: "Heavy-duty fiberglass reinforced sand filter with multiport valve for ultra-clear pool water filtration.",
    isEssential: true,
    defaultQty: 1,
    specs: { "Flow Rate": "18 m³/hr", "Valve": "6-Way Multiport", "Warranty": "2 Years" }
  },
  {
    _id: "eq_pump_1",
    title: "Self-Priming Heavy Duty Pool Circulation Pump (1.5 HP)",
    category: "Plumbing & Controls",
    price: 28000,
    mrp: 35000,
    imageUrl: "/uploads/pool-pump.png",
    description: "Silent operation, corrosion-resistant thermopolymer casing with extra-large strainer basket.",
    isEssential: true,
    defaultQty: 1,
    specs: { "Power": "1.5 HP / 1.1 kW", "Max Head": "16m", "Noise Level": "<60 dB" }
  },
  {
    _id: "eq_drain_main_1",
    title: "Heavy Duty Anti-Vortex Main Drain (8-Inch Stainless)",
    category: "Plumbing & Controls",
    price: 3500,
    mrp: 4500,
    imageUrl: "/uploads/main-drain.png",
    description: "Anti-entrapment safety main drain grid for deep-end suction recirculation.",
    isEssential: true,
    defaultQty: 2,
    specs: { "Material": "SS 316 / ABS", "Connection": "2-Inch Bottom", "Compliance": "VGB Safety" }
  },
  {
    _id: "eq_inlet_wall_1",
    title: "Directional Eyeball Wall Return Inlet Fittings",
    category: "Plumbing & Controls",
    price: 1200,
    mrp: 1800,
    imageUrl: "/uploads/wall-inlet.png",
    description: "Adjustable nozzle for uniform filtered water distribution throughout the pool basin.",
    isEssential: true,
    defaultQty: 4,
    specs: { "Nozzle Diameter": "1.5 Inch", "Material": "UV ABS", "Adjustment": "360-Degree" }
  },
  {
    _id: "eq_led_rgb_1",
    title: "Ultra-Slim RGB Underwater LED Pool Light (18W)",
    category: "Atmospheric Lighting",
    price: 6500,
    mrp: 9000,
    imageUrl: "/uploads/led-light.png",
    description: "IP68 fully resin-filled waterproof LED light with 16 dynamic color scenes and remote controller.",
    isEssential: true,
    defaultQty: 2,
    specs: { "Wattage": "18W LED", "Voltage": "12V AC Safe", "Rating": "IP68 Waterproof" }
  },
  {
    _id: "eq_transformer_light_1",
    title: "Step-Down Underwater Light Transformer (100W / 12V)",
    category: "Atmospheric Lighting",
    price: 4800,
    mrp: 6200,
    imageUrl: "/uploads/transformer.png",
    description: "Isolated heavy copper coil transformer to convert 220V mains to safe 12V low-voltage underwater lighting.",
    isEssential: true,
    defaultQty: 1,
    specs: { "Output": "12V AC", "Capacity": "100W", "Protection": "Overload Fuse" }
  },
  {
    _id: "eq_chemical_starter_1",
    title: "Complete Water Care & Sanitation Chemical Kit",
    category: "Sanitation & Upkeep",
    price: 8500,
    mrp: 11000,
    imageUrl: "/uploads/chemical-kit.png",
    description: "Includes TCCA 90% Chlorine granules (5kg), Algaecide (5L), pH Increaser/Decreaser & DPD Test Kit.",
    isEssential: true,
    defaultQty: 1,
    specs: { "Supply": "3 Months Pool Upkeep", "Certifications": "ISO Sanitation", "Packaging": "Sealed Drums" }
  },
  {
    _id: "eq_ladder_ss_1",
    title: "3-Step Stainless Steel 304 Pool Ladder",
    category: "Structural Accents",
    price: 14500,
    mrp: 18500,
    imageUrl: "/uploads/pool-ladder.png",
    description: "Mirror-polish SS304 handrails with anti-slip tread steps and rubber bumpers.",
    isEssential: false,
    defaultQty: 1,
    specs: { "Grade": "SS 304 High-Polish", "Steps": "3 Treads", "Load Cap": "150 kg" }
  },
  {
    _id: "eq_salt_chlorinator_1",
    title: "Automated Saltwater Electrolysis Chlorinator (25g/hr)",
    category: "Sanitation & Upkeep",
    price: 58000,
    mrp: 72000,
    imageUrl: "/uploads/salt-chlorinator.png",
    description: "Converts natural salt into soft, odor-free chlorine automatically. Eliminates red eyes & harsh chemicals.",
    isEssential: false,
    defaultQty: 1,
    specs: { "Chlorine Output": "25 g/hr", "Self-Cleaning": "Reverse Polarity Cell", "Pool Size": "Up to 60,000L" }
  },
  {
    _id: "eq_heat_pump_1",
    title: "Inverter All-Season Pool Heat Pump Heater (12 kW)",
    category: "Spa & Wellness",
    price: 185000,
    mrp: 230000,
    imageUrl: "/uploads/heat-pump.png",
    description: "Titanium heat exchanger inverter heat pump for year-round warm swimming even in cold winter.",
    isEssential: false,
    defaultQty: 1,
    specs: { "Capacity": "12 kW Heat", "Exchanger": "Pure Titanium", "COP Efficiency": "up to 5.8" }
  },
  {
    _id: "eq_waterfall_blade_1",
    title: "Stainless Steel Sheer Descent Waterfall Spillway (600mm)",
    category: "Structural Accents",
    price: 24000,
    mrp: 31000,
    imageUrl: "/uploads/waterfall.png",
    description: "Sleek wall-recessed water curtain blade for relaxing hydro-acoustic visual effect.",
    isEssential: false,
    defaultQty: 1,
    specs: { "Width": "600 mm", "Material": "SS 316 Non-Corrosive", "LED Sync": "RGB Compatible" }
  },
  {
    _id: "eq_robot_cleaner_1",
    title: "Automatic Robotic Pool Vacuum Cleaner",
    category: "Sanitation & Upkeep",
    price: 95000,
    mrp: 120000,
    imageUrl: "/uploads/robotic-cleaner.png",
    description: "Smart wall-climbing robotic vacuum cleaner with active scrubbing brushes and micro-filter bag.",
    isEssential: false,
    defaultQty: 1,
    specs: { "Coverage": "Floor, Wall & Waterline", "Cycle Time": "2 Hours", "Cable Length": "18 Meters" }
  }
];

// Preset pool configurations
const PRESETS = [
  {
    id: "essential",
    name: "🌟 Standard Essential Package",
    subtitle: "Recommended starter setup for typical pools (20x10ft)",
    icon: "⚡",
    apply: (products) => {
      const selected = {};
      products.forEach(p => {
        if (p.isEssential) selected[p._id] = p.defaultQty || 1;
      });
      return selected;
    }
  },
  {
    id: "small_pool",
    name: "🏠 Small Backyard / Rooftop Pool (15x10 ft)",
    subtitle: "Compact, efficient filtration & single LED lighting",
    icon: "🏊",
    apply: (products) => {
      const selected = {};
      products.forEach(p => {
        if (p._id === "eq_filter_sand_1") selected[p._id] = 1;
        if (p._id === "eq_pump_1") selected[p._id] = 1;
        if (p._id === "eq_drain_main_1") selected[p._id] = 1;
        if (p._id === "eq_inlet_wall_1") selected[p._id] = 2;
        if (p._id === "eq_led_rgb_1") selected[p._id] = 1;
        if (p._id === "eq_transformer_light_1") selected[p._id] = 1;
        if (p._id === "eq_chemical_starter_1") selected[p._id] = 1;
      });
      return selected;
    }
  },
  {
    id: "medium_villa",
    name: "🏡 Medium Villa Pool (30x15 ft)",
    subtitle: "Complete filtration, dual LED, ladder & upkeep kit",
    icon: "✨",
    apply: (products) => {
      const selected = {};
      products.forEach(p => {
        if (p._id === "eq_filter_sand_1") selected[p._id] = 1;
        if (p._id === "eq_pump_1") selected[p._id] = 1;
        if (p._id === "eq_drain_main_1") selected[p._id] = 2;
        if (p._id === "eq_inlet_wall_1") selected[p._id] = 4;
        if (p._id === "eq_led_rgb_1") selected[p._id] = 2;
        if (p._id === "eq_transformer_light_1") selected[p._id] = 1;
        if (p._id === "eq_chemical_starter_1") selected[p._id] = 1;
        if (p._id === "eq_ladder_ss_1") selected[p._id] = 1;
      });
      return selected;
    }
  },
  {
    id: "commercial_resort",
    name: "🏨 Large Commercial Resort Pool (50x25 ft)",
    subtitle: "High-capacity filtration, salt chlorinator & robotic cleaner",
    icon: "🌴",
    apply: (products) => {
      const selected = {};
      products.forEach(p => {
        if (p._id === "eq_filter_sand_1") selected[p._id] = 2;
        if (p._id === "eq_pump_1") selected[p._id] = 2;
        if (p._id === "eq_drain_main_1") selected[p._id] = 4;
        if (p._id === "eq_inlet_wall_1") selected[p._id] = 8;
        if (p._id === "eq_led_rgb_1") selected[p._id] = 4;
        if (p._id === "eq_transformer_light_1") selected[p._id] = 2;
        if (p._id === "eq_salt_chlorinator_1") selected[p._id] = 1;
        if (p._id === "eq_chemical_starter_1") selected[p._id] = 2;
        if (p._id === "eq_robot_cleaner_1") selected[p._id] = 1;
        if (p._id === "eq_ladder_ss_1") selected[p._id] = 2;
      });
      return selected;
    }
  },
  {
    id: "luxury_spa",
    name: "💎 Luxury Heated Spa & Wellness Setup",
    subtitle: "Heat pump, waterfall spillway & saltwater chlorination",
    icon: "♨️",
    apply: (products) => {
      const selected = {};
      products.forEach(p => {
        if (p._id === "eq_filter_sand_1") selected[p._id] = 1;
        if (p._id === "eq_pump_1") selected[p._id] = 1;
        if (p._id === "eq_drain_main_1") selected[p._id] = 2;
        if (p._id === "eq_inlet_wall_1") selected[p._id] = 4;
        if (p._id === "eq_led_rgb_1") selected[p._id] = 2;
        if (p._id === "eq_transformer_light_1") selected[p._id] = 1;
        if (p._id === "eq_heat_pump_1") selected[p._id] = 1;
        if (p._id === "eq_waterfall_blade_1") selected[p._id] = 1;
        if (p._id === "eq_salt_chlorinator_1") selected[p._id] = 1;
      });
      return selected;
    }
  }
];

export default function EquipmentCalculatorPage() {
  const [products, setProducts] = useState(DEFAULT_EQUIPMENT);
  const [selectedItems, setSelectedItems] = useState({});
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [essentialsOnly, setEssentialsOnly] = useState(false);
  const [activePreset, setActivePreset] = useState("essential");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [addedNotice, setAddedNotice] = useState(false);

  // Fetch real products from DB and merge with defaults
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const dbProducts = await res.json();
          if (Array.isArray(dbProducts) && dbProducts.length > 0) {
            const formattedDb = dbProducts.map(p => ({
              _id: p._id,
              title: p.title,
              category: p.category || "Sanitation & Upkeep",
              price: p.price || 0,
              mrp: p.mrp || (p.price ? Math.round(p.price * 1.25) : 0),
              imageUrl: p.imageUrl || "/uploads/placeholder.png",
              description: p.description || "",
              isEssential: p.featured || p.category === "Sanitation & Upkeep" || p.category === "Plumbing & Controls",
              defaultQty: 1,
              specs: p.specs ? Object.fromEntries(p.specs instanceof Map ? p.specs : Object.entries(p.specs)) : {}
            }));

            const existingTitles = new Set(formattedDb.map(p => p.title.toLowerCase()));
            const nonDuplicateDefaults = DEFAULT_EQUIPMENT.filter(d => !existingTitles.has(d.title.toLowerCase()));
            setProducts([...formattedDb, ...nonDuplicateDefaults]);
          }
        }
      } catch (err) {
        console.error("Using default equipment catalog:", err);
      }
    }
    loadProducts();
  }, []);

  // Pre-select Essential Package on initial render
  useEffect(() => {
    const defaultPreset = PRESETS.find(p => p.id === "essential");
    if (defaultPreset) {
      setSelectedItems(defaultPreset.apply(products));
    }
  }, [products]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ["ALL", ...Array.from(set)];
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = products.filter(p => {
      const matchCategory = activeCategory === "ALL" || p.category === activeCategory;
      const matchEssentials = !essentialsOnly || p.isEssential;
      const matchSearch = searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchEssentials && matchSearch;
    });

    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "essential") {
      list.sort((a, b) => (b.isEssential ? 1 : 0) - (a.isEssential ? 1 : 0));
    }

    return list;
  }, [products, activeCategory, essentialsOnly, searchQuery, sortBy]);

  // Handle preset selection
  const handleApplyPreset = (preset) => {
    setActivePreset(preset.id);
    setSelectedItems(preset.apply(products));
  };

  // Adjust item quantity (+ / -)
  const handleQtyChange = (id, delta) => {
    setSelectedItems(prev => {
      const current = prev[id] || 0;
      const updated = current + delta;
      const next = { ...prev };
      if (updated <= 0) {
        delete next[id];
      } else {
        next[id] = updated;
      }
      return next;
    });
    setActivePreset("custom");
  };

  // Toggle item selection
  const handleToggleSelect = (id, defaultQty = 1) => {
    setSelectedItems(prev => {
      const next = { ...prev };
      if (next[id] > 0) {
        delete next[id];
      } else {
        next[id] = defaultQty;
      }
      return next;
    });
    setActivePreset("custom");
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedItems({});
    setActivePreset("custom");
  };

  // --- Financial & Bulk Discount Calculations ---
  const selectedList = useMemo(() => {
    return products.filter(p => selectedItems[p._id] > 0).map(p => ({
      ...p,
      qty: selectedItems[p._id]
    }));
  }, [products, selectedItems]);

  const totalItemsCount = useMemo(() => {
    return selectedList.reduce((sum, item) => sum + item.qty, 0);
  }, [selectedList]);

  const subtotal = useMemo(() => {
    return selectedList.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }, [selectedList]);

  // Bulk Discount Tiers
  const discountInfo = useMemo(() => {
    if (subtotal >= 300000) {
      return { rate: 0.15, label: "15% Wholesale Builder Rate", nextTier: null, amountToNext: 0 };
    } else if (subtotal >= 150000) {
      return { rate: 0.10, label: "10% Commercial Contractor Rate", nextTier: "15% Wholesale Rate", amountToNext: 300000 - subtotal };
    } else if (subtotal >= 50000) {
      return { rate: 0.05, label: "5% Bulk Savings", nextTier: "10% Commercial Rate", amountToNext: 150000 - subtotal };
    } else {
      return { rate: 0.0, label: "Standard Retail Rate", nextTier: "5% Bulk Savings", amountToNext: 50000 - subtotal };
    }
  }, [subtotal]);

  const discountAmount = Math.round(subtotal * discountInfo.rate);
  const discountedSubtotal = subtotal - discountAmount;
  const gstAmount = Math.round(discountedSubtotal * 0.18);
  const grandTotal = discountedSubtotal + gstAmount;

  // Add all selected items to Inquiry Cart
  const handleAddToCart = () => {
    if (selectedList.length === 0) return;
    try {
      const cart = JSON.parse(localStorage.getItem('vpt_cart') || '[]');

      selectedList.forEach(item => {
        const existingIdx = cart.findIndex(c => c.product._id === item._id);
        if (existingIdx > -1) {
          cart[existingIdx].quantity += item.qty;
        } else {
          cart.push({ product: item, quantity: item.qty });
        }
      });

      localStorage.setItem('vpt_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('vpt-cart-changed'));

      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 4000);
    } catch (err) {
      alert("Failed to sync package to inquiry cart.");
    }
  };

  // Generate WhatsApp Pre-filled Order Link
  const whatsappUrl = useMemo(() => {
    let msg = `*VEDAANT POOLS TECHNOLOGY - EQUIPMENT PACKAGE ESTIMATE*\n`;
    msg += `-----------------------------------------------\n`;
    msg += `Selected Package (${totalItemsCount} units across ${selectedList.length} products):\n\n`;

    selectedList.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.title} x ${item.qty} = ₹${(item.price * item.qty).toLocaleString()}\n`;
    });

    msg += `\n-----------------------------------------------\n`;
    msg += `Subtotal: ₹${subtotal.toLocaleString()}\n`;

    if (discountInfo.rate > 0) {
      msg += `Applied Tier (${discountInfo.label}): -₹${discountAmount.toLocaleString()}\n`;
    }

    msg += `Discounted Base: ₹${discountedSubtotal.toLocaleString()}\n`;
    msg += `GST (18%): ₹${gstAmount.toLocaleString()}\n`;
    msg += `*ESTIMATED TOTAL: ₹${grandTotal.toLocaleString()}*\n\n`;
    msg += `Hello Yogendra Gupta, please review this custom equipment specification and share wholesale dispatch availability.`;

    return `https://wa.me/919479940047?text=${encodeURIComponent(msg)}`;
  }, [selectedList, totalItemsCount, subtotal, discountInfo, discountAmount, discountedSubtotal, gstAmount, grandTotal]);

  // Native Print Trigger
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="section" style={{ background: 'var(--bg-deep)', minHeight: '90vh', paddingBottom: '140px' }}>
      <div className="container">

        {/* Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="accent-gradient" style={{
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'block',
            marginBottom: '10px'
          }}>
            Vedaant Pools Interactive Equipment Builder
          </span>
          <h1 className="text-gradient" style={{ fontSize: '42px', marginBottom: '14px' }}>
            Equipment & Product Package Calculator
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '16px', lineHeight: '1.6' }}>
            Choose a <strong>1-Click Pool Size Package</strong> or customize your equipment list. Essential items are pre-calculated with real-time wholesale volume discounts.
          </p>
        </div>

        {/* 1-Click Pool Size Package Presets Bar */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', marginBottom: '32px', border: '1px solid var(--border-glass)' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--primary-color)', marginBottom: '14px' }}>
            ⚡ 1-Click Smart Package Presets (Select Your Pool Type)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {PRESETS.map(preset => {
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    background: isActive ? 'rgba(0, 210, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? '2px solid var(--primary-color)' : '1px solid var(--border-glass)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 0 15px rgba(0, 210, 255, 0.2)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>{preset.icon}</div>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: isActive ? 'var(--primary-color)' : 'var(--text-light)', marginBottom: '4px' }}>
                    {preset.name}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                    {preset.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wholesale Tier Progress Bar */}
        <div className="glass-card" style={{ padding: '20px 24px', marginBottom: '32px', borderRadius: '20px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', color: 'var(--primary-color)' }}>
                Active Wholesale Tier
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '2px 0 0 0', color: 'var(--text-light)' }}>
                {discountInfo.label} {discountInfo.rate > 0 && <span style={{ color: '#27ae60', fontSize: '15px' }}>(You save ₹{discountAmount.toLocaleString()}!)</span>}
              </h3>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated Base Package</div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--secondary-color)' }}>
                ₹{discountedSubtotal.toLocaleString()} <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>+ GST</span>
              </div>
            </div>
          </div>

          {discountInfo.nextTier ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                <span>Progress to {discountInfo.nextTier}</span>
                <span>Add ₹{discountInfo.amountToNext.toLocaleString()} more</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, Math.round((subtotal / (subtotal + discountInfo.amountToNext)) * 100))}%`,
                  background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '12.5px', color: '#27ae60', fontWeight: '700' }}>
              🎉 Maximum 15% Wholesale Builder Discount Unlocked!
            </div>
          )}
        </div>

        {/* Search, Sort & Category Filter Controls */}
        <div className="glass-card" style={{ padding: '16px 20px', borderRadius: '16px', marginBottom: '28px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '16px', alignItems: 'center' }} className="calculator-filter-grid">
            
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="🔍 Search equipment by name, pump, filter, lighting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '20px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-light)',
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '20px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-light)',
                  fontSize: '13px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="recommended" style={{ background: '#111' }}>Recommended</option>
                <option value="essential" style={{ background: '#111' }}>Essentials First</option>
                <option value="price-low" style={{ background: '#111' }}>Price: Low to High</option>
                <option value="price-high" style={{ background: '#111' }}>Price: High to Low</option>
              </select>
            </div>

            {/* Smart Essentials Toggle */}
            <button
              type="button"
              onClick={() => setEssentialsOnly(!essentialsOnly)}
              style={{
                padding: '10px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                background: essentialsOnly ? 'rgba(255, 193, 7, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: essentialsOnly ? '1px solid #ffc107' : '1px solid var(--border-glass)',
                color: essentialsOnly ? '#ffc107' : 'var(--text-light)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              🌟 {essentialsOnly ? 'Showing Essentials Only' : 'Filter Essentials'}
            </button>

          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px', borderTop: '1px solid var(--border-glass)', paddingTop: '14px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '12.5px', padding: '6px 14px', borderRadius: '18px' }}
              >
                {cat === 'ALL' ? '✨ All Products' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Products List vs Sticky Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 370px', gap: '32px' }} className="calculator-layout-grid">
          
          {/* Equipment Products List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {filteredProducts.length === 0 ? (
              <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No equipment items matched your query "{searchQuery}".
              </div>
            ) : (
              filteredProducts.map((product) => {
                const isSelected = (selectedItems[product._id] || 0) > 0;
                const qty = selectedItems[product._id] || 0;

                return (
                  <div
                    key={product._id}
                    className="glass-card"
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      border: isSelected ? '1.5px solid var(--primary-color)' : '1px solid var(--border-glass)',
                      background: isSelected ? 'rgba(0, 210, 255, 0.04)' : 'var(--bg-surface)',
                      transition: 'all 0.2s ease',
                      display: 'grid',
                      gridTemplateColumns: '95px 1fr auto',
                      gap: '20px',
                      alignItems: 'center'
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{
                      width: '95px',
                      height: '95px',
                      borderRadius: '12px',
                      background: 'rgba(0,0,0,0.3)',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-glass)'
                    }}>
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=300&auto=format&fit=crop&q=80';
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Details */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: '600' }}>
                          {product.category}
                        </span>

                        {product.isEssential ? (
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            background: 'rgba(255, 193, 7, 0.2)',
                            color: '#ffc107',
                            border: '1px solid rgba(255, 193, 7, 0.4)'
                          }}>
                            🌟 Necessary Essential
                          </span>
                        ) : (
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            background: 'rgba(155, 81, 224, 0.15)',
                            color: '#b57edc'
                          }}>
                            Optional Upgrade
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-light)', marginBottom: '4px' }}>
                        {product.title}
                      </h3>

                      <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: '1.4' }}>
                        {product.description}
                      </p>

                      {/* Specs */}
                      {product.specs && Object.keys(product.specs).length > 0 && (
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {Object.entries(product.specs).slice(0, 3).map(([k, v]) => (
                            <span key={k} style={{
                              fontSize: '11px',
                              background: 'rgba(255,255,255,0.04)',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              color: 'var(--text-muted)'
                            }}>
                              <strong style={{ color: 'var(--text-light)' }}>{k}:</strong> {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price & Stepper Controls */}
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', minWidth: '150px' }}>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-color)' }}>
                          ₹{product.price.toLocaleString()}
                        </div>
                        {product.mrp > product.price && (
                          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            MRP ₹{product.mrp.toLocaleString()}
                          </div>
                        )}
                      </div>

                      {/* Stepper Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          background: 'rgba(0,0,0,0.4)',
                          borderRadius: '8px',
                          border: '1px solid var(--border-glass)',
                          padding: '2px'
                        }}>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(product._id, -1)}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-light)',
                              fontSize: '16px',
                              cursor: 'pointer'
                            }}
                          >
                            -
                          </button>
                          <span style={{ minWidth: '28px', textAlign: 'center', fontSize: '14px', fontWeight: '700', color: isSelected ? 'var(--primary-color)' : 'var(--text-muted)' }}>
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(product._id, 1)}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '6px',
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-light)',
                              fontSize: '16px',
                              cursor: 'pointer'
                            }}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleToggleSelect(product._id, product.defaultQty || 1)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            background: isSelected ? 'rgba(39, 174, 96, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            border: isSelected ? '1px solid #27ae60' : '1px solid var(--border-glass)',
                            color: isSelected ? '#27ae60' : 'var(--text-muted)'
                          }}
                        >
                          {isSelected ? '✓ Added' : '+ Add'}
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Sticky Summary Sidebar */}
          <div>
            <div
              className="glass-card"
              style={{
                position: 'sticky',
                top: '100px',
                padding: '24px',
                borderRadius: '20px',
                border: '1px solid var(--border-glass)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-light)', margin: 0 }}>
                  Package Summary
                </h3>
                <button
                  type="button"
                  onClick={clearAllSelections}
                  style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Clear All
                </button>
              </div>

              {/* Items List */}
              <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '18px', paddingRight: '4px' }}>
                {selectedList.length === 0 ? (
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
                    No equipment added. Select a 1-click preset or click <strong>+ Add</strong> on equipment items.
                  </div>
                ) : (
                  selectedList.map(item => (
                    <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', marginBottom: '10px' }}>
                      <div style={{ maxWidth: '210px' }}>
                        <div style={{ color: 'var(--text-light)', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Qty: {item.qty} × ₹{item.price.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>
                        ₹{(item.price * item.qty).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Calculation Summary */}
              <div style={{ borderTop: '1px dashed var(--border-glass)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span>Selected Equipment Units:</span>
                  <span style={{ color: 'var(--text-light)', fontWeight: '700' }}>{totalItemsCount} units</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span>Retail Subtotal:</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                {discountInfo.rate > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#27ae60', fontWeight: '600' }}>
                    <span>Bulk Tier Discount ({discountInfo.rate * 100}%):</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <span>GST (18%):</span>
                  <span>₹{gstAmount.toLocaleString()}</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '12px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-light)' }}>
                    Final Estimated Total:
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--secondary-color)' }}>
                      ₹{grandTotal.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Incl. taxes & delivery</div>
                  </div>
                </div>
              </div>

              {/* Action Triggers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                
                <a
                  href={selectedList.length > 0 ? whatsappUrl : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (selectedList.length === 0) {
                      e.preventDefault();
                      alert("Please select at least one equipment item to request a wholesale quote.");
                    }
                  }}
                  className="btn"
                  style={{
                    background: '#25D366',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '13.5px',
                    textAlign: 'center',
                    padding: '12px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  💬 Send to WhatsApp for Instant Quote
                </a>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={selectedList.length === 0}
                  className="btn btn-secondary"
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  🛒 Add All ({totalItemsCount}) to Inquiry Cart
                </button>

                <button
                  type="button"
                  onClick={triggerPrint}
                  disabled={selectedList.length === 0}
                  className="btn btn-secondary"
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  🖨️ Print Official Specification Sheet
                </button>

                {addedNotice && (
                  <div style={{
                    fontSize: '12px',
                    color: '#27ae60',
                    textAlign: 'center',
                    fontWeight: '600',
                    background: 'rgba(39, 174, 96, 0.1)',
                    padding: '8px',
                    borderRadius: '8px'
                  }}>
                    ✓ Added to inquiry cart!
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
