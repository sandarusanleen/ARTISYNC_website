import React from 'react';

/**
 * Artisync Logo
 *
 * Props:
 *  onClick  — callback when logo is clicked (e.g. navigate home)
 *  size     — 'sm' | 'md' | 'lg'  (default: 'md')
 */
const SIZES = {
  sm: '1.1rem',
  md: '1.35rem',
  lg: '1.8rem',
};

export default function Logo({ onClick, size = 'md' }) {
  const fontSize = SIZES[size] ?? SIZES.md;

  return (
    <div
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'inline-flex',
        alignItems: 'baseline',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize,
          fontWeight: 900,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}
      >
        Arti
      </span>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize,
          fontWeight: 900,
          letterSpacing: '-0.02em',
          color: 'var(--accent)',
          lineHeight: 1,
        }}
      >
        sync
      </span>
    </div>
  );
}
