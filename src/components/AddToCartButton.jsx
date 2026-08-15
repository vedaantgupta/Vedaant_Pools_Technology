"use client";

export default function AddToCartButton({ product }) {
  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('vpt_cart') || '[]');
      const existingItemIdx = cart.findIndex(item => item.product._id === product._id);

      if (existingItemIdx > -1) {
        cart[existingItemIdx].quantity += 1;
      } else {
        cart.push({ product, quantity: 1 });
      }

      localStorage.setItem('vpt_cart', JSON.stringify(cart));
      
      // Dispatch custom event to notify Navbar
      window.dispatchEvent(new Event('vpt-cart-changed'));
      
      alert(`🛒 Added "${product.title}" to your Inquiry Cart!`);
    } catch (err) {
      alert('Failed to add product to cart.');
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn btn-primary"
      style={{ padding: '14px 32px', fontSize: '16px' }}
    >
      Add to Inquiry Cart
    </button>
  );
}
