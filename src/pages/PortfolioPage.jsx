import React, { useState, useRef } from 'react';
import AppNav from '../components/AppNav';
import Button from '../components/Button';
import Tag from '../components/Tag';
import ArtworkLightbox from '../components/ArtworkLightbox';
import HireModal from '../components/HireModal';
import { MOCK_CREATORS, ARTWORK_GRADIENTS } from '../data/constants';

/**
 * PortfolioPage — Detailed Designer Portfolio Showcase with Photo Support
 *
 * Props:
 *  creator: object | null
 *  currentUser: object | null
 *  onNavigate: (page: string, data?: object) => void
 *  onLogout: () => void
 *  onHireSubmit: (inquiry: object) => void
 *  onUpdateProfile?: (updatedFields: object) => void
 */
export default function PortfolioPage({
  creator: initialCreator,
  currentUser,
  onNavigate,
  onLogout,
  onHireSubmit,
  onUpdateProfile,
}) {
  // Default to creator or currentUser or first mock creator
  const creator = initialCreator || currentUser || MOCK_CREATORS[0];

  const [activeTab, setActiveTab] = useState('All');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const avatarInputRef = useRef(null);

  const handleAvatarUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      if (onUpdateProfile) {
        onUpdateProfile({ avatarUrl: dataUrl, avatar: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  // Safe fallback arrays
  const softwareList = Array.isArray(creator.software)
    ? creator.software
    : typeof creator.software === 'string'
    ? [creator.software]
    : ['Design', 'Art Direction', 'Creative Systems'];

  const artworkIdsList =
    Array.isArray(creator.artworkIds) && creator.artworkIds.length > 0
      ? creator.artworkIds
      : [0, 1, 2];

  // Filter artworks by tab
  const artworksList =
    creator.artworks && creator.artworks.length > 0
      ? creator.artworks
      : [
          {
            id: 1,
            title: `${creator.name || 'Designer'} — Genesis 01`,
            category: '3D & Motion',
            gradient: ARTWORK_GRADIENTS[artworkIdsList[0] || 0],
            software: softwareList.slice(0, 3),
            likes: 240,
            views: 1200,
            description: 'Dynamic composition exploring kinetic light and visual fidelity.',
          },
          {
            id: 2,
            title: `${creator.name || 'Designer'} — Identity System`,
            category: 'Visual Identity',
            gradient: ARTWORK_GRADIENTS[artworkIdsList[1] || 1],
            software: softwareList.slice(0, 3),
            likes: 180,
            views: 950,
            description: 'Refined brand identity and conceptual design architecture.',
          },
          {
            id: 3,
            title: `${creator.name || 'Designer'} — Spatial Narrative`,
            category: 'Case Studies',
            gradient: ARTWORK_GRADIENTS[artworkIdsList[2] || 2],
            software: softwareList.slice(0, 3),
            likes: 310,
            views: 1600,
            description: 'Comprehensive study examining light, rhythm, and form.',
          },
        ];

  const filteredArtworks =
    activeTab === 'All'
      ? artworksList
      : artworksList.filter((art) => art.category === activeTab);

  const tabs = ['All', '3D & Motion', 'Visual Identity', 'Case Studies'];

  // Other creators to explore
  const relatedCreators = MOCK_CREATORS.filter((c) => c.id !== creator.id).slice(0, 3);

  const creatorAvatarUrl =
    creator.avatarUrl ||
    (creator.avatar &&
    (creator.avatar.startsWith('data:') || creator.avatar.startsWith('http'))
      ? creator.avatar
      : null);

  const creatorAvatarInitials =
    creator.avatar || (creator.name ? creator.name.slice(0, 2).toUpperCase() : 'CR');
  const creatorAccent = creator.accent || 'var(--accent)';
  const creatorJobType = creator.jobType || creator.role || 'Digital Creator';
  const creatorLocation = creator.location || 'Global / Remote';
  const creatorProjects = creator.projects ?? artworksList.length ?? 12;
  const creatorHires = creator.hires ?? 8;
  const creatorRating = creator.rating || '5.0';
  const creatorBio =
    creator.bio ||
    'Crafting bespoke digital experiences, high-fidelity visual designs, and timeless creative systems.';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Hidden avatar photo picker */}
      <input
        type="file"
        ref={avatarInputRef}
        onChange={(e) => handleAvatarUpload(e.target.files?.[0])}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <AppNav
        activePage="portfolio"
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Hero Profile Banner */}
      <section
        style={{
          position: 'relative',
          paddingTop: creator.bannerUrl ? '0' : '3.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid var(--border-1)',
          background: 'linear-gradient(180deg, var(--surface-1) 0%, var(--bg) 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Banner cover background if set */}
        {creator.bannerUrl && (
          <div
            style={{
              height: 180,
              width: '100%',
              backgroundImage: `url(${creator.bannerUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, var(--surface-1) 100%)',
              }}
            />
          </div>
        )}

        {/* Subtle Ambient Radial Glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: '30%',
            width: 500,
            height: 300,
            background: `radial-gradient(ellipse at center, ${creatorAccent}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: creator.bannerUrl ? '1.5rem 2rem 0' : '0 2rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Back button */}
          <button
            onClick={() => onNavigate('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '2rem',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            ← Back to Explore
          </button>

          {/* Profile Header Flex */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '2rem',
            }}
          >
            {/* Left: Avatar + Details */}
            <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'flex-start' }}>
              {/* Avatar with luxury border ring & 1-click upload */}
              <div
                onClick={() => avatarInputRef.current?.click()}
                title="Click to upload/change profile photo"
                style={{
                  width: 95,
                  height: 95,
                  borderRadius: '50%',
                  background: creatorAccent,
                  color: '#080808',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-display)',
                  boxShadow: `0 0 35px ${creatorAccent}55`,
                  border: '3px solid var(--surface-2)',
                  flexShrink: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {creatorAvatarUrl ? (
                  <img
                    src={creatorAvatarUrl}
                    alt={creator.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  creatorAvatarInitials
                )}

                {/* Hover upload badge */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.65)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                >
                  <span style={{ fontSize: '1.2rem' }}>📷</span>
                  <span style={{ fontSize: '0.6rem', color: '#fff', fontWeight: 700, textTransform: 'uppercase' }}>
                    Photo
                  </span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <h1
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {creator.name || 'Creative Designer'}
                  </h1>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem',
                      background: 'var(--accent-dim)',
                      border: '1px solid var(--accent)',
                      color: 'var(--accent)',
                      borderRadius: '100px',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Verified
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                  }}
                >
                  {creatorJobType} · {creatorLocation}
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.65,
                    maxWidth: 580,
                    marginBottom: '1.25rem',
                  }}
                >
                  {creatorBio}
                </p>

                {/* Software Stack Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {softwareList.map((tool) => (
                    <Tag key={tool} accent={creatorAccent}>
                      {tool}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Actions & Availability */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                minWidth: 220,
              }}
            >
              <div
                style={{
                  padding: '0.85rem 1.1rem',
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-2)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#34d399',
                      boxShadow: '0 0 8px #34d399',
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {creator.availability || 'Available for Work'}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Avg. response: <strong style={{ color: 'var(--text-secondary)' }}>{creator.responseTime || '< 2 hrs'}</strong>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Rate estimate: <strong style={{ color: 'var(--accent)' }}>{creator.rateEstimate || '$80/hr'}</strong>
                </div>
              </div>

              <Button
                size="lg"
                fullWidth
                onClick={() => setIsHireOpen(true)}
              >
                Hire / Commission
              </Button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <Button
                  variant={isFollowing ? 'primary' : 'ghost'}
                  size="sm"
                  fullWidth
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? '✓ Saved' : '+ Save'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Portfolio link copied to clipboard!');
                  }}
                >
                  ↗ Share
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              marginTop: '2.5rem',
              padding: '1.25rem 2rem',
              background: 'var(--surface-1)',
              border: '1px solid var(--border-1)',
              borderRadius: 'var(--radius-lg)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {creatorProjects}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Projects Completed
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {creatorHires}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Clients Hired
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>
                ★ {creatorRating}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Rating ({creator.reviewsCount || (creator.reviews ? creator.reviews.length : 12)} reviews)
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                100%
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                On-Time Delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Portfolio Works Section */}
      <main
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '3rem 2rem 5rem',
          width: '100%',
          flex: 1,
        }}
      >
        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-1)',
            paddingBottom: '1rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '0.45rem 1.1rem',
                    background: active ? 'var(--accent)' : 'transparent',
                    color: active ? '#080808' : 'var(--text-secondary)',
                    border: `1px solid ${active ? 'var(--accent)' : 'var(--border-2)'}`,
                    borderRadius: '100px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredArtworks.length}</strong> featured works
          </div>
        </div>

        {/* Artwork Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {filteredArtworks.map((art) => (
            <ArtworkCard
              key={art.id}
              artwork={art}
              creatorAccent={creatorAccent}
              onClick={() => setSelectedArtwork(art)}
            />
          ))}
        </div>

        {/* Client Reviews Section */}
        {creator.reviews && creator.reviews.length > 0 && (
          <section style={{ borderTop: '1px solid var(--border-1)', paddingTop: '3.5rem', marginBottom: '4rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '0.35rem',
                }}
              >
                Client Endorsements
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                What Clients Say About {creator.name || 'This Creator'}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {creator.reviews.map((rev, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.75rem',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-1)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <div style={{ color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    {'★'.repeat(rev.rating || 5)}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      color: 'var(--text-primary)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    "{rev.text}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {rev.client}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{rev.company}</div>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{rev.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* More Creators Like This */}
        <section style={{ borderTop: '1px solid var(--border-1)', paddingTop: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '0.35rem',
                }}
              >
                Similar Talent
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700 }}>
                Explore More Creators
              </h2>
            </div>
            <Button onClick={() => onNavigate('home')} variant="outline" size="sm">
              View All Directory
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {relatedCreators.map((rel) => {
              const relAvatarUrl =
                rel.avatarUrl ||
                (rel.avatar &&
                (rel.avatar.startsWith('data:') || rel.avatar.startsWith('http'))
                  ? rel.avatar
                  : null);
              return (
                <div
                  key={rel.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    onNavigate('portfolio', { creator: rel });
                  }}
                  style={{
                    padding: '1.25rem',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-1)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-1)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        background: rel.accent || 'var(--accent)',
                        color: '#080808',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-display)',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      {relAvatarUrl ? (
                        <img src={relAvatarUrl} alt={rel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        rel.avatar || rel.name[0]
                      )}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>
                        {rel.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--accent)' }}>{rel.jobType}</div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {rel.bio}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <ArtworkLightbox
        artwork={selectedArtwork}
        creator={creator}
        isOpen={Boolean(selectedArtwork)}
        onClose={() => setSelectedArtwork(null)}
        onHireCreator={() => {
          setSelectedArtwork(null);
          setIsHireOpen(true);
        }}
      />

      {/* Commission / Hire Modal */}
      <HireModal
        creator={creator}
        isOpen={isHireOpen}
        onClose={() => setIsHireOpen(false)}
        onSubmitInquiry={(inquiry) => {
          onHireSubmit(inquiry);
        }}
      />
    </div>
  );
}

/**
 * ArtworkCard — Interactive portfolio tile
 */
function ArtworkCard({ artwork, creatorAccent, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface-1)',
        border: `1px solid ${hovered ? 'var(--border-3)' : 'var(--border-1)'}`,
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'var(--transition-spring)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 45px rgba(0,0,0,0.6)' : 'none',
      }}
    >
      {/* Artwork Canvas */}
      <div
        style={{
          height: 240,
          background: artwork.imageUrl ? '#0a0a0a' : artwork.gradient || 'var(--surface-2)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease',
          overflow: 'hidden',
        }}
      >
        {artwork.imageUrl && (
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.2rem 0.6rem',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            borderRadius: '100px',
            fontSize: '0.65rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#fff',
          }}
        >
          {artwork.category || 'Artwork'}
        </div>

        {artwork.fileName && (
          <div
            style={{
              position: 'absolute',
              bottom: '0.85rem',
              right: '0.85rem',
              padding: '0.2rem 0.6rem',
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(6px)',
              border: '1px solid var(--border-2)',
              borderRadius: '100px',
              fontSize: '0.62rem',
              fontWeight: 600,
              color: 'var(--accent)',
            }}
          >
            📎 {artwork.fileName}
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            opacity: hovered ? 1 : 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s',
          }}
        >
          <span
            style={{
              padding: '0.5rem 1.2rem',
              background: 'var(--accent)',
              color: '#080808',
              borderRadius: '100px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Expand View ↗
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '1.25rem 1.5rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.4rem',
          }}
        >
          {artwork.title}
        </h3>
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {artwork.description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {Array.isArray(artwork.software) &&
              artwork.software.slice(0, 2).map((s) => (
                <Tag key={s} accent={creatorAccent}>
                  {s}
                </Tag>
              ))}
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem' }}>
            <span>♥ {artwork.likes || 0}</span>
            <span>👁 {artwork.views || 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
