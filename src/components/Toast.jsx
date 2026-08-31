import React from 'react';

/**
 * Toast Notification
 *
 * Props:
 *  toast: { message: string, type: 'success' | 'info' | 'error' } | null
 *  onClose: () => void
 */
export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '0.85rem 1.4rem',
        background: 'var(--surface-2)',
        border: `1px solid ${isSuccess ? 'var(--accent)' : isError ? '#f87171' : 'var(--border-3)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'fadeUp 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isSuccess ? 'var(--accent)' : isError ? '#f87171' : 'var(--text-secondary)',
          boxShadow: isSuccess ? '0 0 10px var(--accent-glow)' : 'none',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.84rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '0.02em',
        }}
      >
        {toast.message}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '1rem',
            lineHeight: 1,
            padding: '0 0.2rem',
            marginLeft: '0.5rem',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          ×
        </button>
      )}
    </div>
  );
}
