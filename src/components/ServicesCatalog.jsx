import Link from 'next/link';

export default function ServicesCatalog() {
  const services = [
    {
      title: "Pool Construction",
      category: "Construction",
      desc: "Heavy-duty concrete excavation, steel reinforcement, and structural shell casting.",
      img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600"
    },
    {
      title: "3D Pool Designing",
      category: "Designing",
      desc: "Custom architectural planning, 3D CAD modeling, and hydraulic system blueprints.",
      img: "https://images.unsplash.com/photo-1503387762458-bf48293b1d30?q=80&w=600"
    },
    {
      title: "Turnkey Facility Building",
      category: "Building",
      desc: "End-to-end commercial builders for resorts, waterparks, and competition pools.",
      img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600"
    },
    {
      title: "Filtration & Pipe Installing",
      category: "Installing",
      desc: "Precision plumbing, high-rate filtration plant, and automated chemical controls.",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
    },
    {
      title: "Structural Consulting",
      category: "Consultant",
      desc: "Expert soil testing, leak investigations, waterproofing planning, and site assessments.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600"
    },
    {
      title: "Pool Equipment Supply",
      category: "Equipment",
      desc: "Direct B2B supply of heavy-duty commercial sand filters, pumps, and sanitization systems.",
      img: "https://images.unsplash.com/photo-1622322428943-e11418701a30?q=80&w=600"
    },
    {
      title: "Premium Accessories",
      category: "Accessories",
      desc: "High-quality stainless steel ladders, underwater LED lights, and custom water fountains.",
      img: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=600"
    },
    {
      title: "Boutique Pool Maintenance",
      category: "Maintenance",
      desc: "Annual maintenance contracts (AMC), water balancing, sanitization, and deep cleaning.",
      img: "https://images.unsplash.com/photo-1500333917452-484122b8b9e0?q=80&w=600"
    },
    {
      title: "Modern Pool Renovation",
      category: "Renovation",
      desc: "Complete mosaic retiling, structural leak-proofing, and mechanical system restoration.",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600"
    }
  ];

  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-navy) 100%)', position: 'relative' }}>
      {/* Decorative background glows */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'rgba(0, 210, 255, 0.04)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(11, 94, 221, 0.04)',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        {/* Section Header */}
        <div className="services-section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="text-gradient" style={{ fontSize: '42px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Our Services
          </h2>
          <div style={{
            width: '70px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            margin: '12px auto 24px auto',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.4)'
          }} />
          <p style={{ color: 'var(--text-gray)', maxWidth: '650px', margin: '0 auto', fontSize: '16px', lineHeight: '1.6' }}>
            We design, construct, equip, and maintain premium aquatic infrastructures. Select a service below to request a site inspection and price quote.
          </p>
        </div>

        {/* Services Grid (3 columns on desktop, responsive) */}
        <div className="services-catalog-grid">
          {services.map((service, idx) => {
            const querySubject = encodeURIComponent(service.title);
            const queryMessage = encodeURIComponent(`Hi VPT Team, I am looking to get a price quote and details for the "${service.title}" service. Please contact me with more information.`);
            const inquiryUrl = `/contact?subject=${querySubject}&message=${queryMessage}`;

            return (
              <div key={idx} className="service-card-premium">
                {/* Image Container with Badge */}
                <div className="service-image-container">
                  <span className="service-card-badge-overlay">
                    {service.category}
                  </span>
                  <img
                    src={service.img}
                    alt={service.title}
                    className="service-image-zoom"
                    loading="lazy"
                  />
                </div>

                {/* Card Body */}
                <div className="service-card-body">
                  <div className="service-card-header" style={{ marginBottom: '24px' }}>
                    <h3 className="service-card-heading" style={{ fontSize: '20px', marginBottom: '8px' }}>
                      {service.title}
                    </h3>
                    <p className="service-card-subheading" style={{ fontSize: '13.5px', minHeight: '40px' }}>
                      {service.desc}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="service-card-pricing-section" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span className="service-card-price-label" style={{ fontSize: '12px' }}>Estimate</span>
                      <span className="service-card-price-amount" style={{ fontSize: '15px' }}>Request for Price</span>
                    </div>

                    <Link href={inquiryUrl} className="service-card-action-btn" style={{ padding: '10px 20px', fontSize: '13px' }}>
                      Enquire Now
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
