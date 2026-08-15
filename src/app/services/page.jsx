import Link from 'next/link';

export default function ServicesPage() {
  const services = [
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
      desc: "Direct B2B supply of heavy-duty commercial sand filters, pumps, and sanitization.",
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

  return (
    <div>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-glow" />
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <span className="accent-gradient" style={{
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'inline-block',
            marginBottom: '16px',
            padding: '6px 16px',
            background: 'rgba(0, 210, 255, 0.08)',
            borderRadius: '20px',
            border: '1px solid rgba(0, 210, 255, 0.2)'
          }}>
            Technical Capabilities
          </span>
          <h1 className="text-gradient" style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Turnkey Services & Engineering Specialties
          </h1>
          <p style={{ color: 'var(--text-gray)', maxWidth: '750px', margin: '0 auto', fontSize: '17px', lineHeight: '1.7', marginBottom: '30px' }}>
            Vedaant Pools Technology delivers industrial-grade concrete swimming pool construction, structural waterproofing solutions, and B2B equipment supply. Discover our detailed process workflows and specifications below.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13.5px', background: 'rgba(255, 255, 255, 0.04)', padding: '8px 18px', borderRadius: '30px', border: '1px solid var(--border-glass)' }}>
              🛡️ 10-Year Leakage Guarantee
            </span>
            <span style={{ fontSize: '13.5px', background: 'rgba(255, 255, 255, 0.04)', padding: '8px 18px', borderRadius: '30px', border: '1px solid var(--border-glass)' }}>
              🏊 FINA Structural Compliance
            </span>
            <span style={{ fontSize: '13.5px', background: 'rgba(255, 255, 255, 0.04)', padding: '8px 18px', borderRadius: '30px', border: '1px solid var(--border-glass)' }}>
              ⚙️ Schedule-80 UPVC Piping
            </span>
          </div>
        </div>
      </section>

      {/* Alternating Services Showcase Section */}
      <section style={{ background: 'var(--bg-deep)', position: 'relative' }}>
        {services.map((service, idx) => {
          const isEven = idx % 2 === 0;
          const querySubject = encodeURIComponent(service.title);
          const queryMessage = encodeURIComponent(`Hi VPT Team, I am interested in scheduling a site consultation and getting a price estimate for your "${service.title}" services. Please let me know your availability.`);
          const inquiryUrl = `/contact?subject=${querySubject}&message=${queryMessage}`;

          return (
            <div key={idx} className="services-detail-section">
              <div className="container">
                <div className="services-detail-row" style={{ flexDirection: isEven ? 'row' : 'row-reverse' }}>
                  
                  {/* Visual Col */}
                  <div className="services-detail-col-img">
                    <div className="service-detail-img-wrapper">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="service-detail-img"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Text Details Col */}
                  <div className="services-detail-col-text">
                    <div>
                      <span className="accent-gradient" style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        display: 'block',
                        marginBottom: '8px'
                      }}>
                        {service.category}
                      </span>
                      <h2 style={{ fontSize: '28px', color: 'var(--text-white)', fontWeight: '700', marginBottom: '14px' }}>
                        {service.title}
                      </h2>
                      <p style={{ color: 'var(--text-light)', fontSize: '14.5px', lineHeight: '1.7', marginBottom: '16px' }}>
                        {service.longDesc}
                      </p>
                    </div>

                    {/* Technical Specifications table */}
                    <div>
                      <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-gray)', letterSpacing: '1px', marginBottom: '8px' }}>
                        Technical Specifications
                      </h4>
                      <table className="service-tech-table">
                        <tbody>
                          {Object.entries(service.specs).map(([key, val], sIdx) => (
                            <tr key={sIdx}>
                              <td>{key}</td>
                              <td>{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Visual pipeline stages */}
                    <div>
                      <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-gray)', letterSpacing: '1px', marginBottom: '8px' }}>
                        Implementation Workflow
                      </h4>
                      <div className="service-pipeline-wrapper">
                        {service.pipeline.map((step, pIdx) => (
                          <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className={`service-pipeline-step ${pIdx === 0 ? 'active' : ''}`}>
                              {pIdx + 1}. {step}
                            </div>
                            {pIdx < service.pipeline.length - 1 && (
                              <span className="service-pipeline-arrow">➔</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price and Inquiry Action */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '20px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estimation</div>
                        <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--accent-color)' }}>Request Quote</div>
                      </div>
                      <Link
                        href={inquiryUrl}
                        className="btn btn-primary"
                        style={{
                          padding: '10px 24px',
                          fontSize: '13.5px',
                          borderRadius: 'var(--radius-sm)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        Request Site Inspection
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Corporate Call To Action */}
      <section className="section" style={{ background: 'var(--bg-navy)', borderTop: '1px solid var(--border-glass)', textAlign: 'center', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <h2 className="text-gradient" style={{ fontSize: '32px', marginBottom: '14px', fontWeight: '800' }}>
            Planning an Aquatic Infrastructure?
          </h2>
          <p style={{ color: 'var(--text-gray)', maxWidth: '550px', margin: '0 auto', fontSize: '15px', marginBottom: '24px', lineHeight: '1.6' }}>
            Connect with Yogendra Gupta and our technical advisory board. We provide full civil consultations and site leak inspections across Central India.
          </p>
          <Link href="/contact" className="btn btn-accent" style={{ padding: '12px 36px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
