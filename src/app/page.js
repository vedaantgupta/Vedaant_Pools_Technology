import Link from 'next/link';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Testimonial from '@/models/Testimonial';
import Setting from '@/models/Setting';
import HeroSection from '@/components/HeroSection';
import AboutQuickSection from '@/components/AboutQuickSection';
import ServicesCatalog from '@/components/ServicesCatalog';
import WhatWeBuildPreview from '@/components/WhatWeBuildPreview';
import HomeCalculatorsShowcase from '@/components/HomeCalculatorsShowcase';
import HomeStoreShowcase from '@/components/HomeStoreShowcase';
import HomeGalleryShowcase from '@/components/HomeGalleryShowcase';
import HomeTestimonialsSection from '@/components/HomeTestimonialsSection';

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
    testimonials = await Testimonial.find({ status: 'approved' }).limit(6).lean();

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

  return (
    <div style={{ position: 'relative' }}>

      {/* 1. Hero Section */}
      <HeroSection backgroundImages={heroBackgrounds} branding={siteBranding} />

      {/* 2. About Organization Section */}
      <AboutQuickSection />

      {/* 3. Services Catalog Section */}
      <ServicesCatalog />

      {/* 4. What We Build Section */}
      <WhatWeBuildPreview />

      {/* 5. Dual Cost Calculators Showcase (Civil Estimator & Equipment Calculator) */}
      <HomeCalculatorsShowcase />

      {/* 6. B2B Store & Equipment Showcase */}
      <HomeStoreShowcase initialProducts={JSON.parse(JSON.stringify(featuredProducts))} />

      {/* 7. Featured Project Photo Gallery Showcase */}
      <HomeGalleryShowcase />

      {/* 8. Upgraded Client Reviews & Testimonials Section */}
      <HomeTestimonialsSection initialTestimonials={JSON.parse(JSON.stringify(testimonials))} />

    </div>
  );
}
