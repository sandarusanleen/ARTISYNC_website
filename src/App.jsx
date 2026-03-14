import React, { useState } from 'react';
import './styles/globals.css';
import Landing from './pages/Landing';

/**
 * App — root component
 *
 * Wiring guide:
 *  If you're using React Router v6, replace the nav() calls
 *  below with useNavigate() from 'react-router-dom'.
 *
 *  Example:
 *    import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
 *    const navigate = useNavigate();
 *    onSignup={() => navigate('/signup')}
 */
export default function App() {
  // Simple in-memory router (swap for React Router in production)
  const [page, setPage] = useState('landing');
  const [selectedCreator, setSelectedCreator] = useState(null);

  const nav = (destination, data = {}) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (data.creator) setSelectedCreator(data.creator);
    setPage(destination);
  };

  return (
    <>
      {page === 'landing' && (
        <Landing
          onSignup={() => nav('signup')}
          onLogin={() => nav('login')}
          onExplore={() => nav('home')}
          onCreatorClick={(creator) => nav('portfolio', { creator })}
        />
      )}

      {/* Placeholder pages — replace with real components as you build them */}
      {page === 'signup' && (
        <PlaceholderPage title="Sign Up" onBack={() => nav('landing')} />
      )}
      {page === 'login' && (
        <PlaceholderPage title="Log In" onBack={() => nav('landing')} />
      )}
      {page === 'home' && (
        <PlaceholderPage title="Browse Creators" onBack={() => nav('landing')} />
      )}
      {page === 'portfolio' && (
        <PlaceholderPage
          title={`Portfolio — ${selectedCreator?.name}`}
          onBack={() => nav('home')}
        />
      )}
    </>
  );
}

/** Temporary placeholder for pages you haven't built yet */
function PlaceholderPage({ title, onBack }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        fontFamily: 'var(--font-body)',
        color: 'var(--text-secondary)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </div>
      <p style={{ fontSize: '0.9rem' }}>This page is coming soon.</p>
      <button
        onClick={onBack}
        style={{
          padding: '0.6rem 1.5rem',
          background: 'transparent',
          border: '1px solid var(--border-2)',
          color: 'var(--text-secondary)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        ← Go Back
      </button>
    </div>
  );
}
