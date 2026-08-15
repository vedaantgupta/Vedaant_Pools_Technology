"use client";

import { useState, useEffect } from 'react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  
  // Dynamic Categories State
  const defaultCategories = [
    'Turnkey Pools',
    'Structural Waterproofing',
    'Water Features & Fountains',
    'Wellness & Spa',
    'Construction Phase'
  ];
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategoryInput, setNewCategoryInput] = useState('');

  // Form State
  const [editModeId, setEditModeId] = useState(null); // null means create mode
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: 'Turnkey Pools',
    description: '',
    imageUrl: '', // Primary image (grid cover)
    videoUrl: '', // Primary video
    media: [] // Array of { url, mediaType }
  });

  // Fetch projects and categories on mount
  const loadDashboardData = async () => {
    try {
      // 1. Fetch categories setting
      const resCat = await fetch('/api/settings?key=portfolio_categories');
      if (resCat.ok) {
        const dataCat = await resCat.json();
        if (dataCat && Array.isArray(dataCat.value) && dataCat.value.length > 0) {
          setCategories(dataCat.value);
          // Set form category default to first category in setting list
          setFormData(prev => ({ ...prev, category: dataCat.value[0] }));
        }
      }

      // 2. Fetch projects
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch projects');
      setProjects(Array.isArray(data) ? data : []);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setProjects([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Add category handler
  const handleAddCategory = async () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;
    if (categories.includes(trimmed)) {
      alert('Category already exists.');
      return;
    }

    const updated = [...categories, trimmed];
    setCategories(updated);
    setNewCategoryInput('');
    await saveCategoriesToDB(updated);
  };

  // Remove category handler
  const handleRemoveCategory = async (catToRemove) => {
    if (!confirm(`Are you sure you want to delete the category "${catToRemove}"? Projects categorized under this will stay intact but won't match this filter.`)) return;
    const updated = categories.filter(c => c !== catToRemove);
    setCategories(updated);
    
    // Adjust select value if active category was deleted
    if (formData.category === catToRemove) {
      setFormData(prev => ({ ...prev, category: updated[0] || '' }));
    }
    
    await saveCategoriesToDB(updated);
  };

  // Save categories to MongoDB settings
  const saveCategoriesToDB = async (list) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'portfolio_categories',
          value: list
        })
      });
      if (!res.ok) throw new Error('Failed to update category setting in database.');
    } catch (err) {
      alert(err.message);
    }
  };

  // Primary Cover Image Upload
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Cover photo file size exceeds 5MB limit.');
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload cover photo');

      setFormData(prev => {
        const updatedMedia = [...prev.media];
        if (!updatedMedia.some(m => m.url === data.imageUrl)) {
          updatedMedia.push({ url: data.imageUrl, mediaType: 'image' });
        }
        return {
          ...prev,
          imageUrl: data.imageUrl,
          media: updatedMedia
        };
      });
      alert('📤 Cover photo uploaded!');
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Multiple Media Upload (Image or Video)
  const handleAddMediaUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = type === 'video';
    const limit = isVideo ? 30 * 1024 * 1024 : 5 * 1024 * 1024;

    if (file.size > limit) {
      alert(`File size exceeds limit of ${isVideo ? '30MB' : '5MB'}.`);
      return;
    }

    setUploadingMedia(true);
    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload media asset');

      setFormData(prev => {
        const updatedMedia = [...prev.media, { url: data.imageUrl, mediaType: type }];
        
        let autoCover = prev.imageUrl;
        if (!autoCover && type === 'image') {
          autoCover = data.imageUrl;
        }

        let autoVideo = prev.videoUrl;
        if (!autoVideo && type === 'video') {
          autoVideo = data.imageUrl;
        }

        return {
          ...prev,
          imageUrl: autoCover,
          videoUrl: autoVideo,
          media: updatedMedia
        };
      });
      alert(`📤 Added ${type} file successfully!`);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploadingMedia(false);
    }
  };

  // Remove Media Asset from list
  const handleRemoveMedia = (indexToRemove) => {
    setFormData(prev => {
      const filtered = prev.media.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        media: filtered
      };
    });
  };

  // Save project (POST or PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editModeId ? `/api/projects/${editModeId}` : '/api/projects';
      const method = editModeId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save project');

      alert(`🎉 Project ${editModeId ? 'saved' : 'created'} successfully!`);
      resetForm();
      fetchProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  // Load project to edit
  const handleEditClick = (proj) => {
    setEditModeId(proj._id);
    
    let initialMedia = proj.media || [];
    if (initialMedia.length === 0) {
      if (proj.imageUrl) {
        initialMedia.push({ url: proj.imageUrl, mediaType: 'image' });
      }
      if (proj.videoUrl) {
        initialMedia.push({ url: proj.videoUrl, mediaType: 'video' });
      }
    }

    setFormData({
      title: proj.title || '',
      location: proj.location || '',
      category: proj.category || (categories[0] || ''),
      description: proj.description || '',
      imageUrl: proj.imageUrl || '',
      videoUrl: proj.videoUrl || '',
      featured: proj.featured || false,
      media: initialMedia
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete project
  const handleDeleteClick = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this project from the portfolio?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete project');
      fetchProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setEditModeId(null);
    setFormData({
      title: '',
      location: '',
      category: categories[0] || '',
      description: '',
      imageUrl: '',
      videoUrl: '',
      featured: false,
      media: []
    });
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--text-white)' }}>Manage Portfolio Projects</h1>
        <p style={{ color: 'var(--text-gray)' }}>Add, edit, or remove client pool showcases. Manage categories dynamically.</p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '1.2fr 1.8fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Left: Project Form */}
        <div className="glass-card" style={{ padding: '30px', position: 'sticky', top: '100px', maxHeight: '85vh', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text-white)', marginBottom: '24px' }}>
            {editModeId ? '✏️ Edit Portfolio Item' : '➕ Add Portfolio Item'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project Title (Optional)"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location (Optional)"
                className="form-input"
              />
            </div>

            <div className="form-group">
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

            {/* Cover image uploader */}
            <div className="form-group" style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>
              <label className="form-label">Primary Cover Image (Grid Thumbnail)</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Cover photo URL (Optional)..."
                />
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', width: '100%' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  disabled={uploading}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '10px 0', pointerEvents: 'none' }}
                >
                  {uploading ? 'Uploading cover...' : '📤 Select Cover Photo'}
                </button>
              </div>
            </div>

            {/* Dynamic Gallery Manager */}
            <div className="form-group" style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px', paddingTop: '8px' }}>
              <label className="form-label">Multi-Image & Video Assets (Optional)</label>

              {/* Upload buttons row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAddMediaUpload(e, 'image')}
                    disabled={uploadingMedia}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '8px 0', fontSize: '12px', pointerEvents: 'none' }}
                  >
                    🖼️ + Add Image
                  </button>
                </div>

                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleAddMediaUpload(e, 'video')}
                    disabled={uploadingMedia}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '8px 0', fontSize: '12px', pointerEvents: 'none' }}
                  >
                    🎥 + Add Video
                  </button>
                </div>
              </div>

              {uploadingMedia && <p style={{ fontSize: '12px', color: 'var(--secondary-color)', textAlign: 'center', marginBottom: '10px' }}>Uploading media element...</p>}

              {formData.media.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '8px',
                  borderRadius: '8px'
                }}>
                  {formData.media.map((item, idx) => (
                    <div key={idx} style={{ position: 'relative', aspectRatio: '1', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                      {item.mediaType === 'video' ? (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030a16', fontSize: '18px' }}>
                          🎥
                        </div>
                      ) : (
                        <img src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Asset" />
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(idx)}
                        style={{
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                          background: 'rgba(220, 53, 69, 0.8)',
                          border: 'none',
                          color: '#fff',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          fontSize: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                style={{ width: '18px', height: '18px', accentColor: 'var(--secondary-color)', cursor: 'pointer' }}
              />
              <label htmlFor="featured" style={{ color: 'var(--text-white)', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                Featured Project (show on highlights)
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">Brief Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                placeholder="Brief description (Optional)..."
              />
            </div>

            {/* Dynamic Category Manager */}
            <div className="form-group" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginTop: '20px' }}>
              <label className="form-label">Dynamic Categories Manager</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="New category (e.g. Resort Pools)"
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  className="form-input"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="btn btn-secondary"
                  style={{ padding: '0 16px', fontSize: '12px' }}
                >
                  + Add
                </button>
              </div>

              {categories.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  maxHeight: '120px',
                  overflowY: 'auto',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '8px',
                  borderRadius: '8px'
                }}>
                  {categories.map((cat, idx) => (
                    <span key={idx} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'var(--bg-navy)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-light)',
                      fontSize: '11px',
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
                      {cat}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(cat)}
                        style={{ border: 'none', background: 'none', color: '#dc3545', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                {editModeId ? 'Save Project' : 'Publish Project'}
              </button>
              {editModeId && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right: Projects List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {loading ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-gray)' }}>Loading portfolio projects...</p>
            </div>
          ) : error ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: '#dc3545' }}>
              <p>Error: {error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-gray)' }}>No projects found in portfolio catalog.</p>
            </div>
          ) : (
            projects.map((proj) => (
              <div
                key={proj._id}
                className="glass-card"
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px',
                  alignItems: 'center',
                  background: proj.featured ? 'rgba(0, 210, 255, 0.02)' : 'var(--bg-glass)'
                }}
              >
                {/* Image preview */}
                <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', background: '#051329', flexShrink: 0, border: '1px solid var(--border-glass)' }}>
                  {proj.imageUrl ? (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title || "Project Preview"}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#091c36', fontSize: '24px' }}>
                      🖼️
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--secondary-color)',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}>
                      {proj.category || 'Uncategorized'}
                    </span>
                    {proj.featured && (
                      <span style={{
                        background: 'rgba(255, 203, 5, 0.1)',
                        border: '1px solid #ffcb05',
                        color: '#ffcb05',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '10px'
                      }}>
                        ★ Featured
                      </span>
                    )}
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-white)',
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}>
                      📁 {(proj.media && proj.media.length > 0) ? proj.media.length : (proj.imageUrl ? 1 : 0) + (proj.videoUrl ? 1 : 0)} Asset(s)
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', marginTop: '8px', color: 'var(--text-white)' }}>{proj.title || "Untitled Project"}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginTop: '4px' }}>📍 {proj.location || "No location specified"}</p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => handleEditClick(proj)}
                    className="btn btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '10px' }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(proj._id)}
                    className="btn"
                    style={{
                      padding: '8px 16px',
                      fontSize: '13px',
                      borderRadius: '10px',
                      background: 'rgba(220, 53, 69, 0.1)',
                      border: '1px solid rgba(220, 53, 69, 0.3)',
                      color: '#dc3545',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
