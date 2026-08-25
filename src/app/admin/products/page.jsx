"use client";

import { useState, useEffect } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form State
  const [editModeId, setEditModeId] = useState(null); // null means create mode
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sanitation & Upkeep',
    price: '',
    mrp: '',
    description: '',
    imageUrl: '',
    featured: false,
    isEssential: false
  });
  
  // Specifications List (Key-Value array for UI management)
  const [specsList, setSpecsList] = useState([{ key: '', value: '' }]);

  const categories = [
    'Sanitation & Upkeep',
    'Plumbing & Controls',
    'Atmospheric Lighting',
    'Spa & Wellness',
    'Structural Accents',
    'Turnkey Services',
  ];

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch products');
      setProducts(Array.isArray(data) ? data : []);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setProducts([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Specs List controls
  const handleSpecChange = (index, field, value) => {
    const updated = [...specsList];
    updated[index][field] = value;
    setSpecsList(updated);
  };

  const addSpecField = () => {
    setSpecsList([...specsList, { key: '', value: '' }]);
  };

  const removeSpecField = (index) => {
    setSpecsList(specsList.filter((_, idx) => idx !== index));
  };

  // Convert specs key-val list to key-value object
  const serializeSpecs = () => {
    const obj = {};
    specsList.forEach(item => {
      if (item.key.trim() && item.value.trim()) {
        obj[item.key.trim()] = item.value.trim();
      }
    });
    return obj;
  };

  // Convert specs object to key-value list for form editing
  const deserializeSpecs = (specsObj) => {
    const entries = Object.entries(specsObj || {});
    if (entries.length === 0) return [{ key: '', value: '' }];
    return entries.map(([key, value]) => ({ key, value }));
  };

  // Save product (POST or PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check required fields
    if (!formData.title.trim() || !formData.imageUrl.trim()) {
      alert('Product Title and Image URL are required!');
      return;
    }

    const payload = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : undefined,
      mrp: formData.mrp ? parseFloat(formData.mrp) : undefined,
      specs: serializeSpecs()
    };

    try {
      const url = editModeId ? `/api/products/${editModeId}` : '/api/products';
      const method = editModeId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save product');

      alert(`🎉 Product ${editModeId ? 'updated' : 'added'} successfully!`);
      resetForm();
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  // Load product to edit
  const handleEditClick = (prod) => {
    setEditModeId(prod._id);
    setFormData({
      title: prod.title,
      category: prod.category,
      price: prod.price || '',
      mrp: prod.mrp || '',
      description: prod.description || '',
      imageUrl: prod.imageUrl,
      featured: prod.featured || false,
      isEssential: prod.isEssential || false
    });
    setSpecsList(deserializeSpecs(prod.specs));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete product
  const handleDeleteClick = async (id) => {
    if (!confirm('Are you sure you want to delete this product from the store?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setEditModeId(null);
    setFormData({
      title: '',
      category: 'Sanitation & Upkeep',
      price: '',
      mrp: '',
      description: '',
      imageUrl: '',
      featured: false,
      isEssential: false
    });
    setSpecsList([{ key: '', value: '' }]);
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--text-white)' }}>Manage Store Catalog</h1>
        <p style={{ color: 'var(--text-gray)' }}>Add, edit, or remove swimming pool accessories and wellness hardware.</p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '1.2fr 1.8fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Left: Product Form */}
        <div className="glass-card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text-white)', marginBottom: '24px' }}>
            {editModeId ? '✏️ Edit Catalog Item' : '➕ Add Catalog Item'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. 18-inch Aluminium Vacuum Head"
                required
              />
            </div>

            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <div>
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input"
                  style={{ background: 'var(--bg-navy)' }}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Sale Price ₹</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Selling Price"
                />
              </div>
              <div>
                <label className="form-label">MRP Price ₹</label>
                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Original MRP"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Product Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="https://..."
                required
              />
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--secondary-color)', cursor: 'pointer' }}
                />
                <label htmlFor="featured" style={{ color: 'var(--text-white)', fontWeight: '600', cursor: 'pointer', fontSize: '13.5px' }}>
                  Featured Product
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="isEssential"
                  name="isEssential"
                  checked={formData.isEssential}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', accentColor: '#ffc107', cursor: 'pointer' }}
                />
                <label htmlFor="isEssential" style={{ color: '#ffc107', fontWeight: '700', cursor: 'pointer', fontSize: '13.5px' }}>
                  🌟 Necessary Essential Equipment
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                placeholder="Product details, material, and packaging..."
              />
            </div>

            {/* Specifications Key-Val Inputs */}
            <div className="form-group" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Specs Sheet Properties</span>
                <button
                  type="button"
                  onClick={addSpecField}
                  style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                >
                  + Add Row
                </button>
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                {specsList.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={item.key}
                      onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                      placeholder="Property (e.g. Width)"
                      className="form-input"
                      style={{ padding: '8px 10px', fontSize: '13px' }}
                    />
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                      placeholder="Value (e.g. 18 Inches)"
                      className="form-input"
                      style={{ padding: '8px 10px', fontSize: '13px' }}
                    />
                    {specsList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecField(idx)}
                        style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', padding: '0 4px' }}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button type="submit" className="btn btn-accent" style={{ flex: 1 }}>
                {editModeId ? 'Save Changes' : 'Publish Product'}
              </button>
              {editModeId && (
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right: Products List */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text-white)', marginBottom: '24px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
            Products Catalog List
          </h2>

          {loading ? (
            <p style={{ color: 'var(--text-gray)' }}>Loading catalog items...</p>
          ) : error ? (
            <p style={{ color: '#dc3545' }}>Error loading products: {error}</p>
          ) : !Array.isArray(products) || products.length === 0 ? (
            <p style={{ color: 'var(--text-gray)' }}>Catalog is empty. Add a product to get started.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-glass)', color: 'var(--secondary-color)' }}>
                    <th style={{ padding: '12px 6px' }}>Image</th>
                    <th style={{ padding: '12px 6px' }}>Title</th>
                    <th style={{ padding: '12px 6px' }}>Category</th>
                    <th style={{ padding: '12px 6px' }}>Price</th>
                    <th style={{ padding: '12px 6px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(prod => (
                    <tr key={prod._id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <td style={{ padding: '12px 6px' }}>
                        <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '6px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={prod.imageUrl} alt={prod.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                      </td>
                      <td style={{ padding: '12px 6px', fontWeight: '600', color: 'var(--text-white)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {prod.title}
                        {prod.featured && <span style={{ fontSize: '10px', background: '#ffcb05', color: '#000', padding: '2px 6px', borderRadius: '10px', marginLeft: '6px', fontWeight: 'bold' }}>Featured</span>}
                      </td>
                      <td style={{ padding: '12px 6px', color: 'var(--text-gray)' }}>{prod.category}</td>
                      <td style={{ padding: '12px 6px', color: 'var(--accent-color)', fontWeight: '700' }}>
                        {prod.price ? `₹${prod.price.toLocaleString()}` : 'Custom'}
                      </td>
                      <td style={{ padding: '12px 6px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center', height: '65px' }}>
                        <button
                          onClick={() => handleEditClick(prod)}
                          style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(prod._id)}
                          style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
