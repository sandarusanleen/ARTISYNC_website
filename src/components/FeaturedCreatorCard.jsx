import React, { useState } from 'react';
import { ARTWORK_GRADIENTS } from '../data/constants';

/**
 * FeaturedCreatorCard
 * Compact card shown in the "Featured Creators" strip on the landing page.
 *
 * Props:
 *  creator  — creator object from MOCK_CREATORS
 *  onClick  — navigate to their portfolio
 */
export default function FeaturedCreatorCard({ creator, onClick }) {
  const [hovered, setHovered] = useState(false);

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
        {creator.artworkIds.slice(0, 3).map((gradientIdx, i) => (
          <div
            key={i}
            style={{
              aspectRatio: '1',
              borderRadius: 5,
              background: ARTWORK_GRADIENTS[gradientIdx],
            }}
          />
        ))}
      </div>

      {/* Creator info */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.95rem',
          marginBottom: '0.2rem',
          color: 'var(--text-primary)',
        }}
      >
        {creator.name}
      </div>
      <div
        style={{
          fontSize: '0.72rem',
          color: 'var(--text-secondary)',
          fontWeight: 600,
        }}
      >
        {creator.jobType}
      </div>
    </div>
  );
}
