"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  // Check authentication status on layout mount/update
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAuthenticated(true);
            // If already on login, redirect to admin main
            if (isLoginPage) {
              router.push('/admin');
            }
          } else {
            handleUnauth();
          }
        } else {
          handleUnauth();
        }
      } catch (err) {
        handleUnauth();
      } finally {
        setCheckingAuth(false);
      }
    };

    const handleUnauth = () => {
      setAuthenticated(false);
      if (!isLoginPage) {
        router.push('/admin/login');
      }
    };

    checkAuthStatus();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to sign out?')) return;
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' })
      });
      if (res.ok) {
        router.push('/admin/login');
      }
    } catch (err) {
      alert('Logout failed');
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex-center" style={{ minHeight: '80vh', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-glass)', borderTopColor: 'var(--secondary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--text-gray)' }}>Verifying system credentials...</p>
        <style jsx global>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  // For login page, do not render administrative frame
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not logged in and not on login page, render nothing (router is redirecting)
  if (!authenticated) {
    return null;
  }

  const menuItems = [
    { name: 'Dashboard Stats', path: '/admin', icon: '📊' },
    { name: 'Manage Catalog', path: '/admin/products', icon: '🛍️' },
    { name: 'Manage Portfolio', path: '/admin/projects', icon: '📷' },
    { name: 'Moderate Reviews', path: '/admin/testimonials', icon: '⭐' },
    { name: 'Hero Settings', path: '/admin/settings', icon: '🖼️' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '85vh', background: 'var(--bg-deep)' }}>
      {/* Admin Sidebar */}
      <aside style={{
        width: '280px',
        background: 'var(--bg-navy)',
        borderRight: '1px solid var(--border-glass)',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div>
          <div style={{
            fontSize: '18px',
            fontWeight: '800',
            color: 'var(--text-white)',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>⚙️ VPT Admin Panel</span>
          </div>

          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {menuItems.map((item) => {
                const active = pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: active ? '#030a16' : 'var(--text-light)',
                        background: active ? 'linear-gradient(135deg, var(--secondary-color) 0%, var(--accent-color) 100%)' : 'transparent',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href="/" className="btn btn-secondary" style={{ width: '100%', padding: '10px 0', fontSize: '13px', borderRadius: '10px' }}>
            👁️ Visit Client Site
          </Link>
          <button
            onClick={handleLogout}
            className="btn"
            style={{
              width: '100%',
              padding: '10px 0',
              fontSize: '13px',
              borderRadius: '10px',
              background: 'rgba(220, 53, 69, 0.1)',
              border: '1px solid rgba(220, 53, 69, 0.3)',
              color: '#dc3545',
              cursor: 'pointer'
            }}
          >
            ❌ Sign Out Session
          </button>
        </div>
      </aside>

      {/* Main Admin Content Frame */}
      <main style={{ flex: 1, padding: '40px 30px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
