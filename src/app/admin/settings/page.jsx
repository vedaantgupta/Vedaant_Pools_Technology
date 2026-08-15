"use client";

import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('branding'); // 'branding' or 'backgrounds'
  
  // Backgrounds state
  const [backgrounds, setBackgrounds] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  
  // Branding state
  const [branding, setBranding] = useState({
    logoText: 'VEDAANT POOLS TECHNOLOGY',
    logoImageUrl: '',
    tagline: 'From Conceptualization to Finalisation',
    slogan: 'We specialize in the end-to-end design, construction, and maintenance of premium swimming pools and professional water bodies.'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch current database configurations
  const fetchSettings = async () => {
    try {
      // 1. Fetch backgrounds
      const resBg = await fetch('/api/settings?key=hero_backgrounds');
      const dataBg = await resBg.json();
      if (resBg.ok && dataBg && Array.isArray(dataBg.value)) {
        setBackgrounds(dataBg.value);
      }

      // 2. Fetch site branding
      const resBranding = await fetch('/api/settings?key=site_branding');
      const dataBranding = await resBranding.json();
      if (resBranding.ok && dataBranding && dataBranding.value) {
        setBranding((prev) => ({
          ...prev,
          ...dataBranding.value
        }));
      }
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Save Background Slideshow list
  const handleSaveBackgrounds = async () => {
    setSaving(true);
    setMessage('');
    setError(null);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'hero_backgrounds',
          value: backgrounds
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save background settings');
      
      setMessage('🎉 Homepage background slideshow order updated successfully!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Save Branding configurations (Logo, Tagline, Slogan)
  const handleSaveBranding = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError(null);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'site_branding',
          value: branding
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save branding configurations');
      
      setMessage('🎉 Brand logo text, tagline, and details updated successfully!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Handle logo image upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size exceeds 2MB limit.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload logo');

      setBranding({ ...branding, logoImageUrl: data.imageUrl });
      setMessage('📤 Logo image uploaded successfully! Save changes to finalize.');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Add a manual background URL
  const handleAddBgUrl = (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    
    if (!newUrl.startsWith('/') && !newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      alert('Please enter a valid image URL (e.g. starting with http://, https://, or /)');
      return;
    }

    setBackgrounds([...backgrounds, newUrl.trim()]);
    setNewUrl('');
  };

  // Upload local background file
  const handleBgFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5MB limit.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload background image');

      setBackgrounds([...backgrounds, data.imageUrl]);
      setMessage('📤 Background image uploaded and appended to slideshow!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveBg = (indexToRemove) => {
    setBackgrounds(backgrounds.filter((_, index) => index !== indexToRemove));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...backgrounds];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setBackgrounds(updated);
  };

  const handleMoveDown = (index) => {
    if (index === backgrounds.length - 1) return;
    const updated = [...backgrounds];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setBackgrounds(updated);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <p style={{ color: 'var(--text-gray)' }}>Loading site configurations...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--text-white)' }}>Site Configurations</h1>
        <p style={{ color: 'var(--text-gray)' }}>Edit landing page slogans, taglines, logo assets, and hero backgrounds.</p>
      </div>

      {/* Notifications */}
      {message && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(40, 167, 69, 0.1)',
          border: '1px solid #28a745',
          color: '#28a745',
          borderRadius: '8px',
          fontWeight: '600',
          marginBottom: '24px',
          fontSize: '14px'
        }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(220, 53, 69, 0.1)',
          border: '1px solid #dc3545',
          color: '#dc3545',
          borderRadius: '8px',
          fontWeight: '600',
          marginBottom: '24px',
          fontSize: '14px'
        }}>
          ⚠️ Error: {error}
        </div>
      )}

      {/* Tabs Selector Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-glass)',
        marginBottom: '32px',
        gap: '24px'
      }}>
        <button
          onClick={() => setActiveTab('branding')}
          style={{
            padding: '12px 16px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'branding' ? '3px solid var(--secondary-color)' : '3px solid transparent',
            color: activeTab === 'branding' ? 'var(--text-white)' : 'var(--text-gray)',
            fontWeight: '700',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          🏷️ Logo & Branding
        </button>
        <button
          onClick={() => setActiveTab('backgrounds')}
          style={{
            padding: '12px 16px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'backgrounds' ? '3px solid var(--secondary-color)' : '3px solid transparent',
            color: activeTab === 'backgrounds' ? 'var(--text-white)' : 'var(--text-gray)',
            fontWeight: '700',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          🖼️ Hero Backgrounds
        </button>
      </div>

      {/* Tab Panel 1: Site Branding */}
      {activeTab === 'branding' && (
        <div className="glass-card" style={{ padding: '35px' }}>
          <h2 style={{ fontSize: '20px', color: 'var(--text-white)', marginBottom: '24px' }}>
            Branding Configurations
          </h2>

          <form onSubmit={handleSaveBranding}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
              
              {/* Left Column Fields */}
              <div>
                {/* Logo Text */}
                <div className="form-group">
                  <label className="form-label">Navbar & Emblem Logo Text</label>
                  <input
                    type="text"
                    value={branding.logoText}
                    onChange={(e) => setBranding({ ...branding, logoText: e.target.value })}
                    className="form-input"
                    placeholder="VEDAANT POOLS TECHNOLOGY"
                    required
                  />
                  <small style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block', marginTop: '4px' }}>
                    Used on the navbar and hero as fallback text if no graphical logo image is uploaded.
                  </small>
                </div>

                {/* Tagline */}
                <div className="form-group">
                  <label className="form-label">Hero Tagline</label>
                  <input
                    type="text"
                    value={branding.tagline}
                    onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                    className="form-input"
                    placeholder="From Conceptualization to Finalisation"
                    required
                  />
                </div>

                {/* Slogan */}
                <div className="form-group">
                  <label className="form-label">Hero Short Slogan / Description</label>
                  <textarea
                    value={branding.slogan}
                    onChange={(e) => setBranding({ ...branding, slogan: e.target.value })}
                    className="form-input"
                    style={{ minHeight: '110px' }}
                    placeholder="We specialize in..."
                    required
                  />
                </div>
              </div>

              {/* Right Column: Logo Image Upload */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Corporate Logo Image</label>
                
                {/* Logo Preview box */}
                <div style={{
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  height: '180px',
                  background: 'rgba(9, 28, 54, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '16px'
                }}>
                  {branding.logoImageUrl ? (
                    <div style={{ textAlign: 'center', position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={branding.logoImageUrl}
                        alt="Logo Uploaded"
                        style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }}
                      />
                      <button
                        type="button"
                        onClick={() => setBranding({ ...branding, logoImageUrl: '' })}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          background: 'rgba(220, 53, 69, 0.15)',
                          border: '1px solid rgba(220, 53, 69, 0.3)',
                          color: '#dc3545',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                        title="Remove Logo Image"
                      >
                        &times;
                      </button>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                      <span>No custom logo file uploaded.</span>
                      <small style={{ display: 'block', marginTop: '6px' }}>Falling back to stylized logo text.</small>
                    </div>
                  )}
                </div>

                {/* Upload Trigger Input */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
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
                    {uploading ? 'Uploading logo file...' : '📤 Select Logo File'}
                  </button>
                </div>
                <small style={{ color: 'var(--text-muted)', fontSize: '11px', textAlign: 'center' }}>
                  Recommended: Transparent PNG or SVG logo files. Max: 2MB.
                </small>
              </div>

            </div>

            {/* Save Buttons */}
            <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
              <button
                type="submit"
                disabled={saving}
                className="btn btn-accent"
                style={{ padding: '12px 32px', borderRadius: '8px', fontWeight: 'bold' }}
              >
                {saving ? 'Saving changes...' : '💾 Save Site Branding'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab Panel 2: Background Images */}
      {activeTab === 'backgrounds' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* List Order */}
          <div className="glass-card" style={{ padding: '30px' }}>
            <h2 style={{ fontSize: '20px', color: 'var(--text-white)', marginBottom: '20px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
              Slideshow Sequence
            </h2>

            {backgrounds.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', border: '1px dashed var(--border-glass)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>No custom background images configured.</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '6px' }}>Landing page displays high-quality defaults.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {backgrounds.map((url, index) => (
                  <div key={url + '-' + index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '12px'
                  }}>
                    {/* Preview Thumbnail */}
                    <div style={{
                      width: '80px',
                      height: '50px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      background: '#091c36',
                      flexShrink: 0,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <img
                        src={url}
                        alt={`Slide ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=200';
                        }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', color: 'var(--secondary-color)', fontWeight: 'bold' }}>Slide {index + 1}</div>
                      <div style={{
                        fontSize: '11px',
                        color: 'var(--text-gray)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginTop: '4px'
                      }} title={url}>
                        {url}
                      </div>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        style={{
                          padding: '6px 10px',
                          background: 'none',
                          border: '1px solid var(--border-glass)',
                          borderRadius: '6px',
                          color: index === 0 ? 'var(--text-muted)' : 'var(--text-light)',
                          cursor: index === 0 ? 'not-allowed' : 'pointer',
                          fontSize: '12px'
                        }}
                        title="Move Up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === backgrounds.length - 1}
                        style={{
                          padding: '6px 10px',
                          background: 'none',
                          border: '1px solid var(--border-glass)',
                          borderRadius: '6px',
                          color: index === backgrounds.length - 1 ? 'var(--text-muted)' : 'var(--text-light)',
                          cursor: index === backgrounds.length - 1 ? 'not-allowed' : 'pointer',
                          fontSize: '12px'
                        }}
                        title="Move Down"
                      >
                        ▼
                      </button>
                      <button
                        onClick={() => handleRemoveBg(index)}
                        style={{
                          padding: '6px 10px',
                          background: 'rgba(220, 53, 69, 0.1)',
                          border: '1px solid rgba(220, 53, 69, 0.2)',
                          borderRadius: '6px',
                          color: '#dc3545',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}
                        title="Delete Slide"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '30px' }}>
              <button
                onClick={handleSaveBackgrounds}
                disabled={saving}
                className="btn btn-accent"
                style={{ width: '100%', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {saving ? 'Saving changes...' : '💾 Save Slide Layout'}
              </button>
            </div>
          </div>

          {/* Add Image options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* File Upload background */}
            <div className="glass-card" style={{ padding: '30px' }}>
              <h2 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '18px' }}>
                📤 Upload Background File
              </h2>
              <div style={{
                border: '2px dashed var(--border-glass)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.01)',
                position: 'relative',
                cursor: 'pointer'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBgFileUpload}
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
                <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>📷</span>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-light)' }}>
                  {uploading ? 'Uploading image...' : 'Select image file'}
                </span>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Max size: 5MB
                </span>
              </div>
            </div>

            {/* URL input */}
            <div className="glass-card" style={{ padding: '30px' }}>
              <h2 style={{ fontSize: '18px', color: 'var(--text-white)', marginBottom: '18px' }}>
                🔗 Add Background by URL
              </h2>
              <form onSubmit={handleAddBgUrl}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="form-input"
                    placeholder="https://images.unsplash.com/... or /uploads/..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '10px 0', borderRadius: '8px', cursor: 'pointer' }}
                >
                  ＋ Add Image URL
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
