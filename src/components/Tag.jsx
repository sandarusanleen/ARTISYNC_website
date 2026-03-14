import React, { useState } from 'react';

/**
 * Tag / Badge
 *
 * Props:
 *  children  — label text
 *  active    — highlight state (uses accent colour)
 *  accent    — custom hex colour (overrides active)
 *  onClick   — make it a clickable filter chip
 */
export default function Tag({ children, active = false, accent, onClick }) {
  const [hovered, setHovered] = useState(false);

  const isClickable = Boolean(onClick);

  const borderColor = accent
    ? `${accent}44`
    : active
    ? 'var(--accent)'
    : 'var(--border-2)';

  const bgColor = accent
    ? `${accent}18`
    : active
    ? 'var(--accent-dim)'
    : hovered && isClickable
    ? 'var(--surface-2)'
    : 'transparent';

  const textColor = accent
    ? accent
    : active
    ? 'var(--accent)'
    : 'var(--text-secondary)';

  return (
    <span
      onClick={isClickable ? onClick : undefined}
      onMouseEnter={() => isClickable && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-block',
        padding: '0.26rem 0.72rem',
        borderRadius: '100px',
        fontSize: '0.68rem',
        fontWeight: 700,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        cursor: isClickable ? 'pointer' : 'default',
        border: `1px solid ${borderColor}`,
        background: bgColor,
        color: textColor,
        transition: 'var(--transition)',
      }}
    >
      {children}
    </span>
  );
}
