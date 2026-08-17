import Link from 'next/link';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import ProductDetailView from '@/components/ProductDetailView';

// Server-side dynamic product route
export default async function ProductDetailPage({ params }) {
  let product = null;
  let relatedProducts = [];
  let errorMsg = null;

  try {
    await dbConnect();
    const { id } = await params;
    const rawProd = await Product.findById(id).lean();

    if (rawProd) {
      // Serialize Mongoose lean doc to plain JS object for client component
      product = JSON.parse(JSON.stringify(rawProd));
      product._id = product._id.toString();

      // Fetch 4 related products in same or complementary categories
      const rawRelated = await Product.find({ _id: { $ne: rawProd._id } })
        .limit(4)
        .lean();

      relatedProducts = JSON.parse(JSON.stringify(rawRelated)).map(p => ({
        ...p,
        _id: p._id.toString()
      }));
    }
  } catch (err) {
    console.error('Error fetching product detail:', err);
    errorMsg = err.message;
  }

  if (!product) {
    return (
      <div className="section flex-center" style={{ minHeight: '65vh', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '50px 30px', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ fontSize: '50px', marginBottom: '16px' }}>📦</div>
          <h2 style={{ fontSize: '28px', color: '#ff5252', marginBottom: '16px' }}>Product Not Found</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '30px', fontSize: '14px' }}>
            {errorMsg ? `Database error: ${errorMsg}` : 'The product you are looking for does not exist or has been relocated in our catalog.'}
          </p>
          <Link href="/store" className="btn btn-primary">
            &larr; Back to Products Store
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
