"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          username: formData.username,
          password: formData.password
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid username or password.');

      // Success: Redirect to Admin Dashboard
      router.push('/admin');
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <div className="flex-center" style={{
      minHeight: '80vh',
      background: 'radial-gradient(circle at center, #071f43 0%, #030a16 100%)',
      padding: '24px'
    }}>
      <div className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '10px' }}>🔐</span>
          <h1 className="text-gradient" style={{ fontSize: '28px', marginBottom: '8px' }}>Admin Login</h1>
          <p style={{ color: 'var(--text-gray)', fontSize: '14px' }}>
            VPT Central India Operations Access Panel
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">System Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Security Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-accent w-100"
            style={{ width: '100%', padding: '14px 0', marginTop: '10px' }}
            disabled={status.loading}
          >
            {status.loading ? 'Authenticating Credentials...' : 'Access Control Panel'}
          </button>

          {status.error && (
            <p style={{ marginTop: '16px', color: '#dc3545', fontSize: '13px', textAlign: 'center', fontWeight: '600' }}>
              ❌ {status.error}
            </p>
          )}
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--text-gray)' }}>
            &larr; Back to Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
