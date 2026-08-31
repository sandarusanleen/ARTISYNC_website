import React, { useState } from 'react';
import Logo from './Logo';
import Button from './Button';
import NavLink from './NavLink';

/**
 * AppNav — Top Navigation Bar for Internal Pages
 *
 * Props:
 *  activePage: 'home' | 'portfolio' | 'dashboard' | 'login' | 'signup'
 *  currentUser: object | null
 *  onNavigate: (page: string, data?: object) => void
 *  onLogout: () => void
 *  searchQuery?: string
 *  onSearchChange?: (val: string) => void
 */
export default function AppNav({
  activePage,
  currentUser,
  onNavigate,
  onLogout,
  searchQuery,
  onSearchChange,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const userAvatarUrl =
    currentUser?.avatarUrl ||
    (currentUser?.avatar &&
    (currentUser.avatar.startsWith('data:') || currentUser.avatar.startsWith('http'))
      ? currentUser.avatar
      : null);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 72,
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(8,8,8,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border-1)',
      }}
    >
      {/* Left: Logo & Core Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <Logo onClick={() => onNavigate('landing')} />

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <NavLink
            active={activePage === 'home'}
            onClick={() => onNavigate('home')}
          >
            Explore
          </NavLink>
          <NavLink
            active={activePage === 'dashboard'}
            onClick={() => onNavigate('dashboard')}
          >
            Creator Studio
          </NavLink>
        </nav>
      </div>

      {/* Middle: Quick Search (if handler provided) */}
      {onSearchChange && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 320,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: '0.85rem',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search creators, tools, skills..."
            value={searchQuery ?? ''}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 1rem 0.5rem 2.2rem',
              background: 'var(--surface-1)',
              border: '1px solid var(--border-2)',
              borderRadius: '100px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              outline: 'none',
              transition: 'var(--transition)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-2)')}
          />
        </div>
      )}

      {/* Right: Auth / Profile Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {currentUser ? (
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.35rem 0.75rem',
                background: 'var(--surface-2)',
                border: '1px solid var(--border-2)',
                borderRadius: '100px',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-3)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-2)')}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: currentUser.accent || 'var(--accent)',
                  color: '#080808',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid var(--border-3)',
                }}
              >
                {userAvatarUrl ? (
                  <img
                    src={userAvatarUrl}
                    alt={currentUser.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  currentUser.avatar || currentUser.name?.slice(0, 2).toUpperCase() || 'U'
                )}
              </div>
              <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    maxWidth: 110,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {currentUser.name}
                </div>
                <div
                  style={{
                    fontSize: '0.62rem',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {currentUser.role || currentUser.jobType || 'Creator'}
                </div>
              </div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>▾</span>
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: 210,
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
                  padding: '0.5rem',
                  zIndex: 210,
                }}
              >
                <div
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate('dashboard');
                  }}
                  style={{
                    padding: '0.6rem 0.85rem',
                    fontSize: '0.78rem',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  ⚙ Creator Studio
                </div>
                <div
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate('portfolio', { creator: currentUser });
                  }}
                  style={{
                    padding: '0.6rem 0.85rem',
                    fontSize: '0.78rem',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  ◈ View My Public Portfolio
                </div>
                <div
                  style={{
                    height: 1,
                    background: 'var(--border-1)',
                    margin: '0.4rem 0',
                  }}
                />
                <div
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  style={{
                    padding: '0.6rem 0.85rem',
                    fontSize: '0.78rem',
                    color: '#f87171',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(248,113,113,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  → Sign Out
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Button
              onClick={() => onNavigate('login')}
              variant="ghost"
              size="sm"
            >
              Sign In
            </Button>
            <Button
              onClick={() => onNavigate('signup')}
              size="sm"
            >
              Join Artisync
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
