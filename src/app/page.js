import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Testimonial from '@/models/Testimonial';
import Setting from '@/models/Setting';
import HeroSection from '@/components/HeroSection';

// Next.js page is server-rendered by default
export default async function Home() {
  let featuredProducts = [];
  let testimonials = [];
  let heroBackgrounds = [];
  let siteBranding = null;

  try {
    await dbConnect();
    // Fetch products
    featuredProducts = await Product.find({}).limit(4);
    // Fetch approved testimonials
    testimonials = await Testimonial.find({ status: 'approved' }).limit(3);

    // Fetch hero background settings
    const settingsDoc = await Setting.findOne({ key: 'hero_backgrounds' });
    if (settingsDoc && Array.isArray(settingsDoc.value)) {
      heroBackgrounds = settingsDoc.value;
    }

    // Fetch site branding settings
    const brandingDoc = await Setting.findOne({ key: 'site_branding' });
    if (brandingDoc) {
      siteBranding = brandingDoc.value;
    }
  } catch (err) {
    console.error('Error fetching home page data:', err);
  }

  // Backup testimonials in case database is empty during initial load
  const backupTestimonials = [
    {
      name: "Mrs. Husna Shaikh",
      location: "Mumbai, Maharashtra",
      rating: 5,
      message: "Very satisfied with the pool sanitation equipment and after-sales support. Highly recommend their heavy-duty steam bath generators."
    },
    {
      name: "Manish Godha",
      location: "Indore, Madhya Pradesh",
      rating: 5,
      message: "Excellent turnkey pool construction and waterproofing support. The 10-year water tightness guarantee gives us peace of mind."
    },
    {
      name: "Vikas",
      location: "Indore, Madhya Pradesh",
      rating: 5,
      message: "Well-trained technical crew to handle large-scale aquatic structures. Their stainless steel fountain nozzles are top quality."
    }
  ];

  const finalTestimonials = testimonials.length > 0 ? testimonials : backupTestimonials;

  const services = [
    {
      title: "Swimming Pool Engineering",
      desc: "Turnkey design, structural excavation, plumbing systems, and filtration plant installation.",
      img: "https://www.aaturnertankers.co.uk/wp-content/uploads/2023/10/iStock-1297375155-1024x683.jpg"
    },
    {
      title: "Structural Waterproofing",
      desc: "Indore's major B2B contractor for concrete pool leak-proofing and structural repair.",
      img: "https://img.freepik.com/free-photo/umbrella-chair_74190-2092.jpg?semt=ais_hybrid&w=740"
    },
    {
      title: "Water Features & Waterparks",
      desc: "Outdoor water amusement structures, artificial waterfalls, and custom rock fountains.",
      img: "https://img.staticmb.com/mbcontent/images/crop/uploads/2024/11/Water-Bodies-and-Indoor-Fountains_0_1200.jpg"
    },
    {
      title: "Wellness & Spa Suites",
      desc: "Automated residential and commercial steam bath generators, saunas, and hot tub jacuzzis.",
      img: "https://img.freepik.com/premium-photo/reflection-illuminated-buddha-statue-with-gazebos-swimming-pool-night_1048944-23840336.jpg?w=900"
    }
  ];

  return (
    <div style={{ position: 'relative' }}>

      {/* ---------- Hero Section ---------- */}
      <HeroSection backgroundImages={heroBackgrounds} branding={siteBranding} />

      {/* ---------- Services Section ---------- */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="text-gradient" style={{ fontSize: '36px', marginBottom: '16px' }}>Turnkey Aquatic Services</h2>
            <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>
              We design and construct premium aquatic infrastructures. Our engineers handle everything from drawing layouts to mechanical setups.
            </p>
          </div>

          <div className="grid-2">
            {services.map((svc, idx) => (
              <div key={idx} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '240px', position: 'relative', background: '#051329' }}>
                  <img
                    src={svc.img}
                    alt={svc.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.85
                    }}
                  />
                </div>
                <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--text-white)' }}>{svc.title}</h3>
                    <p style={{ color: 'var(--text-gray)', fontSize: '14px', marginBottom: '20px' }}>{svc.desc}</p>
                  </div>
                  <Link href="/contact" style={{ color: 'var(--secondary-color)', fontWeight: '600', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    Request Site Inspection &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Featured Products Showcase ---------- */}
      <section className="section" style={{ background: 'var(--bg-navy)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 className="text-gradient" style={{ fontSize: '36px', marginBottom: '10px' }}>B2B Store Catalog</h2>
              <p style={{ color: 'var(--text-gray)' }}>Direct distributor for pool maintenance and spa atmospheric systems.</p>
            </div>
            <Link href="/store" className="btn btn-secondary" style={{ padding: '10px 24px' }}>
              View All Products
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid-4" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}>
              {featuredProducts.map((prod) => (
                <div key={prod._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ height: '220px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative' }}>
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'var(--bg-navy)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--secondary-color)',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      textTransform: 'uppercase'
                    }}>
                      {prod.category}
                    </span>
                  </div>
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', minHeight: '44px', color: 'var(--text-white)' }}>
                      {prod.title}
                    </h3>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent-color)' }}>
                          {prod.price ? `₹${prod.price.toLocaleString()}` : 'Custom Price'}
                        </span>
                        <Link href={`/store/${prod._id}`} style={{
                          fontSize: '13px',
                          color: 'var(--text-white)',
                          borderBottom: '1px solid var(--secondary-color)',
                          fontWeight: '600'
                        }}>
                          Specs Sheet
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: 'var(--text-gray)' }}>No catalog items found. Set up database or log in as Admin to add items.</p>
              <Link href="/admin" className="btn btn-primary" style={{ marginTop: '16px' }}>
                Add Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Testimonials Section ---------- */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="text-gradient" style={{ fontSize: '36px', marginBottom: '16px' }}>Client Endorsements</h2>
            <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto' }}>
              We hold a perfect 5.0-star local track record for turnkey design, installation, and B2B supplies. Here is what our clients say.
            </p>
          </div>

          <div className="grid-3">
            {finalTestimonials.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', color: 'var(--text-white)', fontWeight: '600' }}>{item.name}</h4>
                      <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>{item.location}</span>
                    </div>
                    <span style={{ color: '#ffc107', fontSize: '15px' }}>
                      {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-light)', lineHeight: '1.7' }}>
                    "{item.message}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-glass)', marginTop: '20px', paddingTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  Verified Client
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/contact" className="btn btn-secondary">
              Submit Your Review
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
