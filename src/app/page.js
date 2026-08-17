import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Testimonial from '@/models/Testimonial';
import Setting from '@/models/Setting';
import HeroSection from '@/components/HeroSection';
import AboutQuickSection from '@/components/AboutQuickSection';
import ServicesCatalog from '@/components/ServicesCatalog';
import WhatWeBuildPreview from '@/components/WhatWeBuildPreview';
import HomeStoreShowcase from '@/components/HomeStoreShowcase';

// Next.js page is server-rendered by default
export default async function Home() {
  let featuredProducts = [];
  let testimonials = [];
  let heroBackgrounds = [];
  let siteBranding = null;

  try {
    await dbConnect();
    // Fetch products for store showcase
    featuredProducts = await Product.find({}).lean();
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

  return (
    <div style={{ position: 'relative' }}>

      {/* 1. Hero Section */}
      <HeroSection backgroundImages={heroBackgrounds} branding={siteBranding} />

      {/* 2. About Organization Section */}
      <AboutQuickSection />

      {/* 3. Services Catalog Section */}
      <ServicesCatalog />

      {/* 4. What We Build Section (After Services) */}
      <WhatWeBuildPreview />

      {/* 5. Upgraded B2B Store & Equipment Showcase */}
      <HomeStoreShowcase initialProducts={JSON.parse(JSON.stringify(featuredProducts))} />

      {/* 6. Testimonials Section */}
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
