import React, { useState, useMemo } from 'react';
import AppNav from '../components/AppNav';
import Button from '../components/Button';
import Tag from '../components/Tag';
import { MOCK_CREATORS, JOB_TYPES, SOFTWARE_OPTIONS, ARTWORK_GRADIENTS } from '../data/constants';

/**
 * Home — Browse Creators / Explore Marketplace Page
 *
 * Props:
 *  currentUser: object | null
 *  onNavigate: (page: string, data?: object) => void
 *  onLogout: () => void
 *  onCreatorClick: (creator: object) => void
 *  onHireClick: (creator: object) => void
 */
export default function Home({
  currentUser,
  onNavigate,
  onLogout,
  onCreatorClick,
  onHireClick,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedSoftware, setSelectedSoftware] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'hires' | 'projects' | 'name'

  // Filter & Sort creators safely
  const filteredCreators = useMemo(() => {
    return MOCK_CREATORS.filter((creator) => {
      const creatorJob = creator.jobType || creator.role || 'Digital Artist';
      const creatorSoftware = Array.isArray(creator.software) ? creator.software : [];
      const creatorName = creator.name || '';
      const creatorLocation = creator.location || 'Global';
      const creatorBio = creator.bio || '';

      // Job type filter
      if (selectedJobType !== 'All' && creatorJob !== selectedJobType) {
        return false;
      }
      // Software filter
      if (
        selectedSoftware !== 'All' &&
        !creatorSoftware.includes(selectedSoftware)
      ) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = creatorName.toLowerCase().includes(q);
        const matchJob = creatorJob.toLowerCase().includes(q);
        const matchLocation = creatorLocation.toLowerCase().includes(q);
        const matchBio = creatorBio.toLowerCase().includes(q);
        const matchSoftware = creatorSoftware.some((s) =>
          s.toLowerCase().includes(q)
        );
        return matchName || matchJob || matchLocation || matchBio || matchSoftware;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      if (sortBy === 'hires') return (b.hires || 0) - (a.hires || 0);
      if (sortBy === 'projects') return (b.projects || 0) - (a.projects || 0);
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      return 0;
    });
  }, [searchQuery, selectedJobType, selectedSoftware, sortBy]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <AppNav
        activePage="home"
        currentUser={currentUser}
        onNavigate={onNavigate}
        onLogout={onLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Banner */}
      <section
        style={{
          padding: '4rem 2rem 2.5rem',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '0.6rem',
          }}
        >
          Curated Creative Directory
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}
        >
          Discover World-Class{' '}
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
            Digital Artists.
          </em>
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: 620,
            lineHeight: 1.7,
          }}
        >
          Direct access to award-winning motion designers, 3D sculptors, visual artists,
          and UI engineers. No platform markups or bidding wars.
        </p>
      </section>

      {/* Filter Toolbar */}
      <section
        style={{
          position: 'sticky',
          top: 72,
          zIndex: 100,
          background: 'rgba(8,8,8,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border-1)',
          borderBottom: '1px solid var(--border-1)',
          padding: '1rem 2rem',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Row 1: Job Categories Scrollable Bar */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.25rem',
              scrollbarWidth: 'none',
            }}
          >
            {JOB_TYPES.map((job) => {
              const isActive = selectedJobType === job;
              return (
                <button
                  key={job}
                  onClick={() => setSelectedJobType(job)}
                  style={{
                    padding: '0.42rem 0.95rem',
                    background: isActive ? 'var(--accent)' : 'var(--surface-2)',
                    color: isActive ? '#080808' : 'var(--text-secondary)',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-2)'}`,
                    borderRadius: '100px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'var(--transition)',
                  }}
                >
                  {job}
                </button>
              );
            })}
          </div>

          {/* Row 2: Software Filter & Sorting & Search Status */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Software:
              </span>
              <select
                value={selectedSoftware}
                onChange={(e) => setSelectedSoftware(e.target.value)}
                style={{
                  padding: '0.38rem 0.85rem',
                  background: 'var(--surface-1)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-2)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {SOFTWARE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} style={{ background: '#141414', color: '#fff' }}>
                    {opt === 'All' ? 'All Software Tools' : opt}
                  </option>
                ))}
              </select>

              {(selectedJobType !== 'All' || selectedSoftware !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedJobType('All');
                    setSelectedSoftware('All');
                    setSearchQuery('');
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredCreators.length}</strong> creators
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '0.38rem 0.85rem',
                    background: 'var(--surface-1)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.76rem',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="rating" style={{ background: '#141414', color: '#fff' }}>Highest Rated</option>
                  <option value="hires" style={{ background: '#141414', color: '#fff' }}>Most Hired</option>
                  <option value="projects" style={{ background: '#141414', color: '#fff' }}>Most Projects</option>
                  <option value="name" style={{ background: '#141414', color: '#fff' }}>Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creators Grid */}
      <main
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          padding: '2.5rem 2rem 5rem',
          flex: 1,
        }}
      >
        {filteredCreators.length === 0 ? (
          <div
            style={{
              padding: '5rem 2rem',
              textAlign: 'center',
              background: 'var(--surface-1)',
              borderRadius: 'var(--radius-xl)',
              border: '1px dashed var(--border-2)',
              marginTop: '1rem',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>◈</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              No creators found matching your criteria
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Try searching for different software, changing specialties, or resetting your filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedJobType('All');
                setSelectedSoftware('All');
                setSearchQuery('');
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {filteredCreators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onViewPortfolio={() => onCreatorClick(creator)}
                onHire={() => onHireClick(creator)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/**
 * CreatorCard — Comprehensive showcase card for creator directory
 */
function CreatorCard({ creator, onViewPortfolio, onHire }) {
  const [hovered, setHovered] = useState(false);

  const softwareList = Array.isArray(creator.software) ? creator.software : [];
  const artworkIds = Array.isArray(creator.artworkIds) && creator.artworkIds.length > 0
    ? creator.artworkIds
    : [0, 1, 2];

  const avatar = creator.avatar || (creator.name ? creator.name.slice(0, 2).toUpperCase() : 'CR');
  const accent = creator.accent || 'var(--accent)';
  const name = creator.name || 'Creative Artist';
  const jobType = creator.jobType || creator.role || 'Digital Artist';
  const location = creator.location || 'Global';
  const rating = creator.rating || '5.0';
  const bio = creator.bio || 'Crafting digital masterworks and bespoke visuals.';
  const projects = creator.projects ?? (creator.artworks ? creator.artworks.length : 1);
  const hires = creator.hires ?? 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface-1)',
        border: `1px solid ${hovered ? 'var(--border-3)' : 'var(--border-1)'}`,
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'var(--transition-spring)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 45px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div>
        {/* Top: 3-Artwork Mosaic Preview */}
        <div
          onClick={onViewPortfolio}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: 2,
            height: 150,
            cursor: 'pointer',
            background: 'var(--surface-3)',
          }}
        >
          {artworkIds.slice(0, 3).map((gradientIdx, i) => (
            <div
              key={i}
              style={{
                background: ARTWORK_GRADIENTS[gradientIdx] || ARTWORK_GRADIENTS[i % ARTWORK_GRADIENTS.length],
                transition: 'opacity 0.2s',
                opacity: hovered ? 0.95 : 0.8,
              }}
            />
          ))}
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem 1.5rem 1rem' }}>
          {/* Header row: Avatar + Name + Rating */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: accent,
                  color: '#080808',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  flexShrink: 0,
                  overflow: 'hidden',
                  boxShadow: `0 0 16px ${accent}44`,
                  border: '1px solid var(--border-3)',
                }}
              >
                {creator.avatarUrl || (creator.avatar && (creator.avatar.startsWith('data:') || creator.avatar.startsWith('http'))) ? (
                  <img
                    src={creator.avatarUrl || creator.avatar}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  avatar
                )}
              </div>
              <div>
                <div
                  onClick={onViewPortfolio}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    lineHeight: 1.2,
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                  {jobType} · {location}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.2rem 0.55rem',
                background: 'var(--surface-2)',
                border: '1px solid var(--border-2)',
                borderRadius: '100px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--accent)',
              }}
            >
              ★ {rating}
            </div>
          </div>

          {/* Bio excerpt */}
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {bio}
          </p>

          {/* Software Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
            {softwareList.slice(0, 3).map((tool) => (
              <Tag key={tool} accent={accent}>
                {tool}
              </Tag>
            ))}
            {softwareList.length > 3 && (
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                +{softwareList.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Stats & Actions */}
      <div
        style={{
          padding: '0.9rem 1.5rem',
          borderTop: '1px solid var(--border-1)',
          background: 'var(--surface-2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.85rem' }}>
              {projects}
            </strong>
            Projects
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.85rem' }}>
              {hires}
            </strong>
            Hires
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button onClick={onViewPortfolio} variant="ghost" size="sm">
            Portfolio
          </Button>
          <Button onClick={onHire} size="sm">
            Hire
          </Button>
        </div>
      </div>
    </div>
  );
}
