import React, { useState } from 'react';

/**
 * NavLink
 *
 * Props:
 *  children  — link label
 *  onClick   — navigation handler
 *  active    — highlight as current page
 */
export default function NavLink({ children, onClick, active = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: active || hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'color 0.18s ease',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      {children}
      {/* active underline */}
      {active && (
        <span
          style={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: 1,
            background: 'var(--accent)',
            borderRadius: 1,
          }}
        />
      )}
    </span>
  );
}
