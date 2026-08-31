import React, { useState } from 'react';
import { ARTWORK_GRADIENTS } from '../data/constants';

/**
 * FeaturedCreatorCard
 * Compact card shown in the "Featured Creators" strip on the landing page.
 *
 * Props:
 *  creator  — creator object
 *  onClick  — navigate to their portfolio
 */
export default function FeaturedCreatorCard({ creator, onClick }) {
  const [hovered, setHovered] = useState(false);

  const artworkIds = Array.isArray(creator?.artworkIds) && creator.artworkIds.length > 0
    ? creator.artworkIds
    : [0, 1, 2];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.1rem',
        background: hovered ? 'var(--surface-3)' : 'var(--surface-2)',
        border: `1px solid ${hovered ? 'var(--border-3)' : 'var(--border-1)'}`,
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'var(--transition-spring)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {/* Artwork thumbnails */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
          marginBottom: '0.9rem',
        }}
      >
        {artworkIds.slice(0, 3).map((gradientIdx, i) => (
          <div
            key={i}
            style={{
              aspectRatio: '1',
              borderRadius: 5,
              background: ARTWORK_GRADIENTS[gradientIdx] || ARTWORK_GRADIENTS[i % ARTWORK_GRADIENTS.length],
            }}
          />
        ))}
      </div>

      {/* Creator info with avatar thumbnail */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: creator?.accent || 'var(--accent)',
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
          {creator?.avatarUrl || (creator?.avatar && (creator.avatar.startsWith('data:') || creator.avatar.startsWith('http'))) ? (
            <img
              src={creator.avatarUrl || creator.avatar}
              alt={creator.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            creator?.avatar || creator?.name?.slice(0, 2).toUpperCase() || 'CR'
          )}
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}
          >
            {creator?.name || 'Creator'}
          </div>
          <div
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              fontWeight: 600,
            }}
          >
            {creator?.jobType || creator?.role || 'Digital Artist'}
          </div>
        </div>
      </div>
    </div>
  );
}
