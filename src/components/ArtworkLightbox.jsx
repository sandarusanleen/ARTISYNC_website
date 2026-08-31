import React, { useState, useEffect } from 'react';
import Button from './Button';
import Tag from './Tag';

/**
 * ArtworkLightbox — Immersive full-screen view for project artworks
 *
 * Props:
 *  artwork: object
 *  creator: object
 *  isOpen: boolean
 *  onClose: () => void
 *  onHireCreator: (creator: object) => void
 */
export default function ArtworkLightbox({ artwork, creator, isOpen, onClose, onHireCreator }) {
  const [likes, setLikes] = useState(artwork?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (artwork) {
      setLikes(artwork.likes || 0);
      setHasLiked(false);
    }
  }, [artwork?.id]);

  if (!isOpen || !artwork) return null;

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => Math.max(0, prev - 1));
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const softwareList = Array.isArray(artwork.software)
    ? artwork.software
    : typeof artwork.software === 'string'
    ? [artwork.software]
    : [];

  const creatorAvatar = creator?.avatar || (creator?.name ? creator.name.slice(0, 2).toUpperCase() : 'CR');
  const creatorAccent = creator?.accent || 'var(--accent)';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 980,
          background: 'var(--surface-2)',
          border: '1px solid var(--border-2)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 1.25fr) 1fr',
          boxShadow: '0 30px 100px rgba(0,0,0,0.9)',
          position: 'relative',
          animation: 'fadeUp 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid var(--border-2)',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            lineHeight: 1,
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          ×
        </button>

        {/* Left: Artwork Viewport (Image or Luxury Gradient Canvas) */}
        <div
          style={{
            minHeight: 460,
            background: artwork.imageUrl ? '#050505' : artwork.gradient || 'var(--surface-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: artwork.imageUrl ? 0 : '2rem',
            overflow: 'hidden',
          }}
        >
          {artwork.imageUrl ? (
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: 520,
                objectFit: 'contain',
                display: 'block',
                background: 'radial-gradient(ellipse at center, rgba(200,169,110,0.08) 0%, #000 100%)',
              }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
              }}
            >
              Artisync Masterwork
            </div>
          )}

          {/* Attached file pill if available */}
          {artwork.fileName && (
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                padding: '0.35rem 0.75rem',
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-2)',
                borderRadius: '100px',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--accent)',
              }}
            >
              📎 {artwork.fileName} {artwork.fileSize ? `(${artwork.fileSize})` : ''}
            </div>
          )}
        </div>

        {/* Right: Artwork Metadata & In-depth Story */}
        <div
          style={{
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--surface-2)',
          }}
        >
          <div>
            {/* Category */}
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '0.5rem',
              }}
            >
              {artwork.category || 'Featured Piece'}
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              {artwork.title}
            </h2>

            {/* Creator byline */}
            {creator && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-1)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: creatorAccent,
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
                    creatorAvatar
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {creator.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    {creator.jobType || creator.role} · {creator.location || 'Global'}
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              {artwork.description ||
                'High-fidelity digital work showcasing craftsmanship in geometry, lighting, and creative direction.'}
            </p>

            {/* Tools Used */}
            {softwareList.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Tools &amp; Software
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {softwareList.map((tool) => (
                    <Tag key={tool} accent={creatorAccent}>
                      {tool}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div style={{ borderTop: '1px solid var(--border-1)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <button
                onClick={handleLike}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.8rem',
                  background: hasLiked ? 'rgba(236,72,153,0.15)' : 'var(--surface-1)',
                  border: `1px solid ${hasLiked ? '#ec4899' : 'var(--border-2)'}`,
                  color: hasLiked ? '#ec4899' : 'var(--text-secondary)',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
              >
                <span>{hasLiked ? '♥' : '♡'}</span>
                <span>{likes}</span>
              </button>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {artwork.views || 1200} Views
              </div>
            </div>

            {creator && (
              <Button
                fullWidth
                size="md"
                onClick={() => {
                  onClose();
                  onHireCreator(creator);
                }}
              >
                Commission Similar Project
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
