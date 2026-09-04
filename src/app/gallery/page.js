"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GalleryPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeMediaType, setActiveMediaType] = useState('All'); // 'All', 'Photos', 'Videos'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dynamic Categories State
  const defaultCategories = [
    'Turnkey Pools',
    'Structural Waterproofing',
    'Water Features & Fountains',
    'Wellness & Spa',
    'Construction Phase'
  ];
  const [categories, setCategories] = useState(defaultCategories);

  // Lightbox Modal State
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);

  // Backup premium project seeds in case MongoDB is empty
  const backupProjects = [
    {
      _id: 'seed-1',
      title: "Kempinski Resort Seychelles Infinity Pool",
      location: "Seychelles, East Africa",
      category: "Turnkey Pools",
      imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200",
      media: [
        { url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200", mediaType: "image" },
        { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200", mediaType: "image" },
        { url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200", mediaType: "image" }
      ]
    },
    {
      _id: 'seed-2',
      title: "Aqua Imagica Waterpark System",
      location: "Khopoli, Maharashtra",
      category: "Water Features & Fountains",
      imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200",
      media: [
        { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200", mediaType: "image" },
        { url: "https://www.w3schools.com/html/mov_bbb.mp4", mediaType: "video" }
      ]
    },
    {
      _id: 'seed-3',
      title: "Kopyko Sunset Grill Cafe Lounge Pool",
      location: "Mayfair, Raipur, Chhattisgarh",
      category: "Turnkey Pools",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
      media: [
        { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200", mediaType: "image" }
      ]
    },
    {
      _id: 'seed-4',
      title: "Exotica By The Sea Resort Pool",
      location: "Diveagar, Maharashtra",
      category: "Structural Waterproofing",
      imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200",
      media: [
        { url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200", mediaType: "image" }
      ]
    },
    {
      _id: 'seed-5',
      title: "Automated Commercial Steam Suite & Spa",
      location: "Indore, Madhya Pradesh",
      category: "Wellness & Spa",
      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
      media: [
        { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200", mediaType: "image" }
      ]
    },
    {
      _id: 'seed-6',
      title: "Cascade Rock Waterfall & Water Body",
      location: "Malwa Mill, Indore, MP",
      category: "Water Features & Fountains",
      imageUrl: "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1200",
      media: [
        { url: "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=1200", mediaType: "image" },
        { url: "https://www.w3schools.com/html/mov_bbb.mp4", mediaType: "video" }
      ]
    },
    {
      _id: 'seed-7',
      title: "Turnkey Pool Concrete Shell Construction",
      location: "Indore, Madhya Pradesh",
      category: "Construction Phase",
      imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1200",
      media: [
        { url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1200", mediaType: "image" }
      ]
    }
  ];

  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        // 1. Fetch dynamic categories setting
        const resCat = await fetch('/api/settings?key=portfolio_categories');
        if (resCat.ok) {
          const dataCat = await resCat.json();
          if (dataCat && Array.isArray(dataCat.value) && dataCat.value.length > 0) {
            setCategories(dataCat.value);
          }
        }

        // 2. Fetch projects
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          } else {
            setProjects(backupProjects);
          }
        } else {
          setProjects(backupProjects);
        }
      } catch (err) {
        setProjects(backupProjects);
      } finally {
        setLoading(false);
      }
    };
    loadGalleryData();
  }, []);

  const filterTabs = ['All', ...categories];

  // Filtering Logic with optional chaining & null guards
  const filteredProjects = projects.filter(proj => {
    const matchesCategory = activeCategory === 'All' || proj.category === activeCategory;
    
    let matchesMedia = true;
    const mediaList = proj.media && proj.media.length > 0 
      ? proj.media 
      : [{ url: proj.imageUrl, mediaType: 'image' }, { url: proj.videoUrl, mediaType: 'video' }].filter(m => m.url);
      
    const hasVideo = mediaList.some(m => m.mediaType === 'video');

    if (activeMediaType === 'Photos') matchesMedia = mediaList.some(m => m.mediaType === 'image');
    if (activeMediaType === 'Videos') matchesMedia = hasVideo;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (proj.title || '').toLowerCase().includes(searchLower) || 
                          (proj.location || '').toLowerCase().includes(searchLower);
                          
    return matchesCategory && matchesMedia && matchesSearch;
  });

  // Active Project & Visual media array helper
  const activeProject = selectedIdx !== null ? filteredProjects[selectedIdx] : null;

  const getActiveProjectMedia = () => {
    if (!activeProject) return [];
    if (activeProject.media && activeProject.media.length > 0) {
      return activeProject.media;
    }
    const list = [];
    if (activeProject.imageUrl) list.push({ url: activeProject.imageUrl, mediaType: 'image' });
    if (activeProject.videoUrl) list.push({ url: activeProject.videoUrl, mediaType: 'video' });
    return list;
  };

  const activeMediaList = getActiveProjectMedia();
  const currentMedia = activeMediaList[activeMediaIdx];

  const handlePrevMedia = (e) => {
    e.stopPropagation();
    if (activeMediaList.length <= 1) return;
    setActiveMediaIdx(prev => (prev === 0 ? activeMediaList.length - 1 : prev - 1));
  };

  const handleNextMedia = (e) => {
    e.stopPropagation();
    if (activeMediaList.length <= 1) return;
    setActiveMediaIdx(prev => (prev === activeMediaList.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowLeft') handlePrevMedia(e);
      if (e.key === 'ArrowRight') handleNextMedia(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, activeMediaIdx, activeProject]);

  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '90vh', padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Breadcrumbs */}
        <nav style={{ marginBottom: '20px', fontSize: '13px', color: 'var(--text-gray)', display: 'flex', gap: '6px' }}>
          <Link href="/" style={{ color: 'var(--secondary-color)' }}>Home</Link>
          <span>/</span>
          <span>Gallery</span>
        </nav>

        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="accent-gradient" style={{
            fontSize: '13px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            display: 'block',
            marginBottom: '12px'
          }}>
            Portfolio Gallery
          </span>
          <h1 className="text-gradient" style={{ fontSize: '42px', marginBottom: '16px', lineHeight: '1.2' }}>
            Completed Projects & Construction Works
          </h1>
          <p style={{ color: 'var(--text-gray)', maxWidth: '650px', margin: '0 auto', fontSize: '15px' }}>
            Browse high-definition visual showcases of our client pool construction, water features, and spa installations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '40px',
          borderBottom: '1px solid var(--border-glass)',
          paddingBottom: '24px'
        }}>
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {filterTabs.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSelectedIdx(null); }}
                  className="btn"
                  style={{
                    padding: '8px 20px',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    background: isActive ? 'linear-gradient(135deg, var(--secondary-color) 0%, var(--accent-color) 100%)' : 'rgba(255,255,255,0.03)',
                    color: isActive ? '#030a16' : 'var(--text-white)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--secondary-color)' : 'var(--border-glass)',
                    borderRadius: '20px',
                    fontWeight: isActive ? '700' : '500'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search and Media Toggles Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {/* Search Box */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
              <input
                type="text"
                placeholder="🔍 Search projects by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ padding: '10px 16px 10px 36px', borderRadius: '30px', fontSize: '13px' }}
              />
            </div>

            {/* Media Type Toggles */}
            <div style={{
              display: 'inline-flex',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-glass)',
              borderRadius: '30px',
              padding: '4px'
            }}>
              {['All', 'Photos', 'Videos'].map((type) => {
                const isActive = activeMediaType === type;
                return (
                  <button
                    key={type}
                    onClick={() => { setActiveMediaType(type); setSelectedIdx(null); }}
                    style={{
                      border: 'none',
                      background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      color: isActive ? 'var(--secondary-color)' : 'var(--text-gray)',
                      padding: '6px 18px',
                      fontSize: '12px',
                      fontWeight: isActive ? '700' : '500',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="flex-center" style={{ minHeight: '300px', flexDirection: 'column', gap: '15px' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid var(--border-glass)', borderTopColor: 'var(--secondary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Loading gallery...</p>
            <style jsx global>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="glass-card" style={{ padding: '60px 40px', textAlign: 'center', margin: '40px 0' }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '16px' }}>📷</span>
            <h3 style={{ fontSize: '18px', color: 'var(--text-white)' }}>No Matching Portfolio Items</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px', maxWidth: '400px', margin: '8px auto 0' }}>
              We couldn't find any projects matching the selected criteria.
            </p>
          </div>
        ) : (
          <div className="grid-3" style={{ gap: '24px' }}>
            {filteredProjects.map((proj, idx) => {
              const mediaList = proj.media && proj.media.length > 0 
                ? proj.media 
                : [{ url: proj.imageUrl, mediaType: 'image' }, { url: proj.videoUrl, mediaType: 'video' }].filter(m => m.url);
              const assetCount = mediaList.length;
              const hasVideo = mediaList.some(m => m.mediaType === 'video');

              const coverPath = proj.imageUrl || (mediaList.length > 0 ? mediaList[0].url : 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200');

              return (
                <div
                  key={proj._id}
                  className="glass-card"
                  onClick={() => { setSelectedIdx(idx); setActiveMediaIdx(0); }}
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '320px',
                    boxShadow: 'var(--shadow-premium)'
                  }}
                >
                  {/* Image Cover */}
                  <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={coverPath}
                      alt={proj.title || "Showcase Pool"}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                    />

                    {/* Badges Overlay */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px', zIndex: 2 }}>
                      <span style={{
                        background: 'rgba(5, 19, 41, 0.8)',
                        border: '1px solid var(--border-glass)',
                        backdropFilter: 'blur(5px)',
                        color: 'var(--secondary-color)',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: '20px'
                      }}>
                        {proj.category || 'Turnkey Pools'}
                      </span>
                    </div>

                    {/* Asset Count Badge */}
                    {assetCount > 1 && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2 }}>
                        <span style={{
                          background: 'rgba(5, 19, 41, 0.85)',
                          border: '1px solid var(--border-glass)',
                          backdropFilter: 'blur(5px)',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '4px 10px',
                          borderRadius: '20px'
                        }}>
                          📁 {assetCount} Media
                        </span>
                      </div>
                    )}

                    {/* Video Play Overlay */}
                    {hasVideo && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(0, 210, 255, 0.25)',
                        border: '2px solid var(--secondary-color)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(0, 210, 255, 0.4)',
                        zIndex: 2
                      }}>
                        <span style={{ fontSize: '20px', color: '#fff', marginLeft: '4px' }}>▶</span>
                      </div>
                    )}

                    {/* Hover Information Plate */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(3, 10, 22, 0.95) 0%, rgba(3, 10, 22, 0.7) 60%, rgba(3, 10, 22, 0) 100%)',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      height: '50%'
                    }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        📍 {proj.location || 'Showcase Pool'}
                      </span>
                      <h3 style={{ fontSize: '16px', marginTop: '6px', color: '#fff', fontWeight: '700', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {proj.title || 'Client Project'}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Lightbox / Clean Fullscreen Image & Video Slideshow Modal */}
        {activeProject && currentMedia && (
          <div
            onClick={() => setSelectedIdx(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(3, 10, 22, 0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Centered Media Frame */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '85vw',
                height: '65vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                marginBottom: '20px'
              }}
            >
              {currentMedia.mediaType === 'video' ? (
                <video
                  key={currentMedia.url}
                  src={currentMedia.url}
                  controls
                  autoPlay
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderRadius: '12px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    border: '1px solid var(--border-glass)'
                  }}
                />
              ) : (
                <img
                  src={currentMedia.url}
                  alt={activeProject.title || "Project visual"}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    border: '1px solid var(--border-glass)'
                  }}
                />
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0px',
                  border: 'none',
                  background: 'none',
                  color: '#94a3b8',
                  fontSize: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s',
                  outline: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                ✕
              </button>

              {/* Navigation Arrows */}
              {activeMediaList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevMedia}
                    style={{
                      position: 'absolute',
                      left: '-60px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--secondary-color)',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      fontSize: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backdropFilter: 'blur(5px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.borderColor = 'var(--secondary-color)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNextMedia}
                    style={{
                      position: 'absolute',
                      right: '-60px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--secondary-color)',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      fontSize: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backdropFilter: 'blur(5px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.borderColor = 'var(--secondary-color)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption & Thumbnails */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '600px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', color: '#fff', fontWeight: '700' }}>
                  {activeProject.title || "Untitled Project"}
                </h3>
                <span style={{ fontSize: '13px', color: 'var(--secondary-color)' }}>
                  📍 {activeProject.location || "General Showcase"} • {activeProject.category || "Turnkey Pools"} (Asset {activeMediaIdx + 1} of {activeMediaList.length})
                </span>
              </div>

              {/* Thumbnails Row */}
              {activeMediaList.length > 1 && (
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-glass)',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  maxWidth: '100%',
                  overflowX: 'auto'
                }}>
                  {activeMediaList.map((media, idx) => {
                    const isSelected = activeMediaIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveMediaIdx(idx)}
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: isSelected ? '2px solid var(--secondary-color)' : '1px solid var(--border-glass)',
                          boxShadow: isSelected ? '0 0 10px rgba(0, 210, 255, 0.4)' : 'none',
                          transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                          transition: 'all 0.2s',
                          position: 'relative',
                          flexShrink: 0
                        }}
                      >
                        {media.mediaType === 'video' ? (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030a16', fontSize: '14px' }}>
                            <span>🎥</span>
                          </div>
                        ) : (
                          <img src={media.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="thumb" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
