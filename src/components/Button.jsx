import React, { useState } from 'react';

/**
 * Button
 *
 * Props:
 *  children   — button label
 *  onClick    — click handler
 *  variant    — 'primary' | 'outline' | 'ghost' | 'danger'   (default: 'primary')
 *  size       — 'sm' | 'md' | 'lg' | 'xl'                   (default: 'md')
 *  fullWidth  — stretch to 100% container width
 *  disabled   — disabled state
 *  style      — inline style overrides
 */

const SIZE_MAP = {
  sm: { padding: '0.38rem 1rem',   fontSize: '0.72rem' },
  md: { padding: '0.6rem 1.5rem',  fontSize: '0.8rem'  },
  lg: { padding: '0.78rem 2rem',   fontSize: '0.88rem' },
  xl: { padding: '0.95rem 2.6rem', fontSize: '0.95rem' },
};

const VARIANT_MAP = {
  primary: (hovered) => ({
    background: hovered ? '#d4b77a' : 'var(--accent)',
    color: '#080808',
    border: 'none',
  }),
  outline: (hovered) => ({
    background: hovered ? 'var(--accent-dim)' : 'transparent',
    color: 'var(--accent)',
    border: '1px solid var(--accent)',
  }),
  ghost: (hovered) => ({
    background: hovered ? 'var(--surface-2)' : 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-2)',
  }),
  danger: (hovered) => ({
    background: hovered ? 'rgba(248,113,113,0.1)' : 'transparent',
    color: '#f87171',
    border: '1px solid #f87171',
  }),
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  style: styleOverride = {},
}) {
  const [hovered, setHovered] = useState(false);

  const sizeStyles  = SIZE_MAP[size]    ?? SIZE_MAP.md;
  const variantFn   = VARIANT_MAP[variant] ?? VARIANT_MAP.primary;
  const variantStyles = variantFn(hovered && !disabled);

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      style={{
        /* layout */
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        width: fullWidth ? '100%' : undefined,
        /* sizing */
        ...sizeStyles,
        /* type */
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        /* shape */
        borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        /* color */
        ...variantStyles,
        /* misc */
        opacity: disabled ? 0.45 : 1,
        transition: 'var(--transition)',
        outline: 'none',
        /* overrides */
        ...styleOverride,
      }}
    >
      {children}
    </button>
  );
}
