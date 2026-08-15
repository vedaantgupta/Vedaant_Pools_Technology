import Link from 'next/link';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import AddToCartButton from '@/components/AddToCartButton';

// Next.js dynamic route page
export default async function ProductDetailPage({ params }) {
  let product = null;
  let errorMsg = null;

  try {
    await dbConnect();
    const { id } = await params;
    product = await Product.findById(id);
  } catch (err) {
    console.error('Error fetching product detail:', err);
    errorMsg = err.message;
  }

  if (!product) {
    return (
      <div className="section flex-center" style={{ minHeight: '60vh', textAlign: 'center' }}>
        <div>
          <h2 style={{ fontSize: '32px', color: '#dc3545', marginBottom: '20px' }}>Product Not Found</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>
            {errorMsg ? `Database error: ${errorMsg}` : 'The product you are looking for does not exist in our catalog.'}
          </p>
          <Link href="/store" className="btn btn-primary">
            Back to Store Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Convert Mongoose map to standard JS object
  const specsObj = product.specs ? (product.specs instanceof Map ? Object.fromEntries(product.specs) : product.specs) : {};
  const specsEntries = Object.entries(specsObj);

  return (
    <div className="section" style={{ background: 'var(--bg-deep)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Back Link */}
        <Link href="/store" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-gray)', marginBottom: '40px', fontWeight: '500' }}>
          &larr; Back to Store Catalog
        </Link>

        {/* Product Info Row */}
        <div className="grid-2" style={{ gap: '50px', alignItems: 'start', marginBottom: '60px' }}>
          {/* Left: Product Image */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            border: '1px solid var(--border-glass)'
          }}>
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Right: Product Details */}
          <div>
            <span style={{
              background: 'rgba(0, 210, 255, 0.1)',
              border: '1px solid var(--border-active)',
              color: 'var(--secondary-color)',
              fontSize: '12px',
              fontWeight: '700',
              padding: '6px 14px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              {product.category}
            </span>
            <h1 className="text-gradient" style={{ fontSize: '36px', lineHeight: '1.2', marginBottom: '16px' }}>
              {product.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent-color)' }}>
                {product.price ? `₹${product.price.toLocaleString()}` : 'Custom Quote Required'}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Tax & Freight computed at checkout
              </span>
            </div>
            
            <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>
              {product.description || 'No description available for this item. Please consult specifications sheet or connect with Yogendra Gupta via the sourcing hotline for custom order inquiries.'}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <AddToCartButton product={JSON.parse(JSON.stringify(product))} />
              <Link href="/contact" className="btn btn-secondary" style={{ padding: '14px 28px' }}>
                Consultation Request
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications Sheet Table */}
        <div className="glass-card" style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--text-white)', marginBottom: '24px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
            Technical Specifications Sheet
          </h2>

          {specsEntries.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-glass)', color: 'var(--secondary-color)' }}>
                    <th style={{ padding: '14px 10px', fontWeight: '700' }}>Specification Property</th>
                    <th style={{ padding: '14px 10px', fontWeight: '700' }}>Value / Technical Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {specsEntries.map(([key, val]) => (
                    <tr key={key} style={{ borderBottom: '1px solid var(--border-glass)', transition: 'background 0.2s' }}>
                      <td style={{ padding: '14px 10px', fontWeight: '600', color: 'var(--text-white)', width: '35%' }}>{key}</td>
                      <td style={{ padding: '14px 10px', color: 'var(--text-gray)' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <p style={{ color: 'var(--text-gray)' }}>Standard industry configuration. For exact technical measurements, please request a catalog data sheet via the contact form.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
