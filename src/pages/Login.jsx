import React, { useState } from 'react';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { MOCK_CREATORS } from '../data/constants';

/**
 * Login — Sign In Page
 *
 * Props:
 *  onLoginSuccess: (user: object) => void
 *  onNavigate: (page: string) => void
 */
export default function Login({ onLoginSuccess, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Find matching creator or construct user session
      const foundCreator = MOCK_CREATORS.find(
        (c) => c.name.toLowerCase().includes(email.split('@')[0].toLowerCase())
      );

      const user = foundCreator || {
        id: Date.now(),
        name: email.split('@')[0],
        email,
        jobType: 'Digital Artist',
        role: 'Creator',
        accent: 'var(--accent)',
        avatar: email.slice(0, 2).toUpperCase(),
        projects: 1,
        hires: 0,
        bio: 'Digital artist and visual designer on Artisync.',
        artworks: [],
        software: ['Photoshop', 'Illustrator', 'Figma'],
        artworkIds: [0, 1, 2],
      };

      setLoading(false);
      onLoginSuccess(user);
    }, 600);
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      setError('Please enter your email address to receive password reset instructions.');
      return;
    }
    setError('');
    setResetSent(true);
    setTimeout(() => setResetSent(false), 5000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow & grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(200,169,110,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--border-1) 1px, transparent 1px), linear-gradient(90deg, var(--border-1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      {/* Center Auth Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'var(--surface-1)',
          border: '1px solid var(--border-2)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2.5rem',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 25px 70px rgba(0,0,0,0.7)',
          animation: 'fadeUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Logo onClick={() => onNavigate('landing')} size="lg" />
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.4rem',
            }}
          >
            Welcome Back
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Sign in to access your portfolio and direct client inquiries.
          </p>
        </div>

        {/* Notifications */}
        {error && (
          <div
            style={{
              padding: '0.65rem 0.9rem',
              background: 'rgba(248,113,113,0.12)',
              border: '1px solid #f87171',
              borderRadius: 'var(--radius-sm)',
              color: '#f87171',
              fontSize: '0.76rem',
              marginBottom: '1.25rem',
            }}
          >
            {error}
          </div>
        )}

        {resetSent && (
          <div
            style={{
              padding: '0.65rem 0.9rem',
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent)',
              fontSize: '0.76rem',
              marginBottom: '1.25rem',
            }}
          >
            Password reset link sent to your email address.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '0.4rem',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'var(--surface-2)',
                border: '1px solid var(--border-2)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'var(--transition)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-2)')}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
              >
                Password
              </label>
              <span
                onClick={handleForgotPassword}
                style={{ fontSize: '0.72rem', color: 'var(--accent)', cursor: 'pointer' }}
              >
                Forgot?
              </span>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'var(--surface-2)',
                border: '1px solid var(--border-2)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'var(--transition)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-2)')}
            />
          </div>

          <Button
            size="lg"
            fullWidth
            disabled={loading}
            style={{ marginTop: '0.5rem' }}
          >
            {loading ? 'Signing In...' : 'Sign In to Artisync'}
          </Button>
        </form>

        {/* Switch to Signup */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <span
            onClick={() => onNavigate('signup')}
            style={{
              color: 'var(--accent)',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Create Creator Account
          </span>
        </div>

        {/* Return back */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span
            onClick={() => onNavigate('landing')}
            style={{
              fontSize: '0.74rem',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            ← Back to Artisync Home
          </span>
        </div>
      </div>
    </div>
  );
}
