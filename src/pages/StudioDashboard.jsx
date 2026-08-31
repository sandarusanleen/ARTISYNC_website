import React, { useState, useRef } from 'react';
import AppNav from '../components/AppNav';
import Button from '../components/Button';
import Tag from '../components/Tag';
import { ARTWORK_GRADIENTS, SOFTWARE_OPTIONS, JOB_TYPES, MOCK_CREATORS } from '../data/constants';

/**
 * StudioDashboard — Creator Studio, Profile Photo Manager & Project Publisher
 *
 * Props:
 *  currentUser: object | null
 *  inquiries: array
 *  onNavigate: (page: string, data?: object) => void
 *  onLogout: () => void
 *  onAddProject: (newProject: object) => void
 *  onDeleteProject: (projectId: number) => void
 *  onUpdateProfile?: (updatedFields: object) => void
 */
export default function StudioDashboard({
  currentUser,
  inquiries,
  onNavigate,
  onLogout,
  onAddProject,
  onDeleteProject,
  onUpdateProfile,
}) {
  // Use current user or fallback to first mock creator
  const user = currentUser || MOCK_CREATORS[0];

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'inquiries' | 'analytics'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    name: user.name || '',
    jobType: user.jobType || user.role || 'Motion Designer',
    bio: user.bio || '',
    location: user.location || 'Global / Remote',
    rateEstimate: user.rateEstimate || '$85/hr · $3,000/project',
    avatarUrl: user.avatarUrl || (user.avatar && user.avatar.startsWith('data:') ? user.avatar : ''),
    bannerUrl: user.bannerUrl || '',
    selectedSoftware: Array.isArray(user.software) ? user.software : ['After Effects', 'Cinema 4D', 'Blender'],
  });

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    category: '3D & Motion',
    gradient: ARTWORK_GRADIENTS[0],
    imageUrl: '',
    fileName: '',
    fileSize: '',
    fileType: '',
    software: ['After Effects', 'Cinema 4D'],
    description: '',
  });

  const [isDragging, setIsDragging] = useState(false);

  // Artwork photo / file upload handler
  const handleArtworkFileChange = (file) => {
    if (!file) return;

    const fileSizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProject((prev) => ({
          ...prev,
          imageUrl: e.target.result,
          fileName: file.name,
          fileSize: fileSizeFormatted,
          fileType: file.type,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // Non-image file (e.g. .blend, .obj, .zip, .pdf)
      setNewProject((prev) => ({
        ...prev,
        imageUrl: '',
        fileName: file.name,
        fileSize: fileSizeFormatted,
        fileType: file.type || file.name.split('.').pop()?.toUpperCase() || 'FILE',
      }));
    }
  };

  // Direct Profile Photo Avatar upload handler
  const handleAvatarUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setProfileForm((prev) => ({ ...prev, avatarUrl: dataUrl }));
      if (onUpdateProfile) {
        onUpdateProfile({ avatarUrl: dataUrl, avatar: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  // Profile Cover Banner upload handler
  const handleBannerUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setProfileForm((prev) => ({ ...prev, bannerUrl: dataUrl }));
      if (onUpdateProfile) {
        onUpdateProfile({ bannerUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({
        name: profileForm.name,
        jobType: profileForm.jobType,
        bio: profileForm.bio,
        location: profileForm.location,
        rateEstimate: profileForm.rateEstimate,
        avatarUrl: profileForm.avatarUrl,
        avatar: profileForm.avatarUrl || user.avatar,
        bannerUrl: profileForm.bannerUrl,
        software: profileForm.selectedSoftware,
      });
    }
    setIsEditProfileOpen(false);
  };

  const toggleSoftware = (tool) => {
    if (profileForm.selectedSoftware.includes(tool)) {
      setProfileForm({
        ...profileForm,
        selectedSoftware: profileForm.selectedSoftware.filter((s) => s !== tool),
      });
    } else {
      setProfileForm({
        ...profileForm,
        selectedSoftware: [...profileForm.selectedSoftware, tool],
      });
    }
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.title) return;

    const createdItem = {
      id: Date.now(),
      title: newProject.title,
      category: newProject.category,
      gradient: newProject.gradient,
      imageUrl: newProject.imageUrl,
      fileName: newProject.fileName,
      fileSize: newProject.fileSize,
      software: newProject.software,
      description: newProject.description || 'Masterpiece created on Artisync.',
      likes: 0,
      views: 1,
    };

    onAddProject(createdItem);
    setIsAddModalOpen(false);
    setNewProject({
      title: '',
      category: '3D & Motion',
      gradient: ARTWORK_GRADIENTS[0],
      imageUrl: '',
      fileName: '',
      fileSize: '',
      fileType: '',
      software: ['After Effects', 'Cinema 4D'],
      description: '',
    });
  };

  const toggleProjectSoftware = (tool) => {
    if (newProject.software.includes(tool)) {
      setNewProject({
        ...newProject,
        software: newProject.software.filter((s) => s !== tool),
      });
    } else {
      setNewProject({
        ...newProject,
        software: [...newProject.software, tool],
      });
    }
  };

  const userProjects = user.artworks || [];
  const userAvatarUrl =
    user.avatarUrl ||
    (user.avatar && (user.avatar.startsWith('data:') || user.avatar.startsWith('http'))
      ? user.avatar
      : null);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={avatarInputRef}
        onChange={(e) => handleAvatarUpload(e.target.files?.[0])}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={bannerInputRef}
        onChange={(e) => handleBannerUpload(e.target.files?.[0])}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <AppNav
        activePage="dashboard"
        currentUser={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Studio Header with Profile Avatar & Banner */}
      <section
        style={{
          background: 'var(--surface-1)',
          borderBottom: '1px solid var(--border-1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Banner area if set */}
        {user.bannerUrl && (
          <div
            style={{
              height: 140,
              width: '100%',
              backgroundImage: `url(${user.bannerUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
          </div>
        )}

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: user.bannerUrl ? '1.5rem 2rem 2rem' : '3rem 2rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1.5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left: Avatar with interactive photo upload + Creator Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {/* Interactive Avatar Upload Box */}
            <div
              onClick={() => avatarInputRef.current?.click()}
              title="Click to upload/change profile photo"
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: user.accent || 'var(--accent)',
                color: '#080808',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: 900,
                fontFamily: 'var(--font-display)',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: `0 0 25px ${user.accent || 'var(--accent)'}44`,
                border: '3px solid var(--surface-2)',
                flexShrink: 0,
              }}
            >
              {userAvatarUrl ? (
                <img
                  src={userAvatarUrl}
                  alt={user.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                user.avatar || user.name?.slice(0, 2).toUpperCase() || 'CR'
              )}

              {/* Hover Camera Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.6)',
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
                <span style={{ fontSize: '1.1rem' }}>📷</span>
                <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
                  Photo
                </span>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '0.35rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>Creator Studio</span>
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  📷 Upload Profile Photo
                </button>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: '0.4rem',
                }}
              >
                Welcome back, {user.name}
              </h1>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {user.jobType || user.role} · {user.location || 'Global'} ·{' '}
                <span style={{ color: 'var(--accent)' }}>{user.rateEstimate || '$85/hr'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsEditProfileOpen(true)}
            >
              ⚙ Edit Profile &amp; Photo
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('portfolio', { creator: user })}
            >
              Preview Live Portfolio ↗
            </Button>
            <Button
              size="md"
              onClick={() => setIsAddModalOpen(true)}
            >
              + Publish New Artwork
            </Button>
          </div>
        </div>

        {/* Analytics Snapshot Bar */}
        <div
          style={{
            maxWidth: 1100,
            margin: '1.5rem auto 2rem',
            padding: '0 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          <div
            style={{
              padding: '1.25rem',
              background: 'var(--surface-2)',
              border: '1px solid var(--border-2)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              Total Profile Views
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              3,420
            </div>
            <div style={{ fontSize: '0.72rem', color: '#34d399', marginTop: '0.2rem' }}>↑ +18% this week</div>
          </div>

          <div
            style={{
              padding: '1.25rem',
              background: 'var(--surface-2)',
              border: '1px solid var(--border-2)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              Active Client Inquiries
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)' }}>
              {inquiries?.length || 2}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Direct project leads</div>
          </div>

          <div
            style={{
              padding: '1.25rem',
              background: 'var(--surface-2)',
              border: '1px solid var(--border-2)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              Published Artworks
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {userProjects.length}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>In public showcase</div>
          </div>

          <div
            style={{
              padding: '1.25rem',
              background: 'var(--surface-2)',
              border: '1px solid var(--border-2)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              Client Satisfaction
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ★ 4.98
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent)', marginTop: '0.2rem' }}>100% 5-Star ratings</div>
          </div>
        </div>
      </section>

      {/* Main Studio Workspace */}
      <main
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '2.5rem 2rem 5rem',
          width: '100%',
          flex: 1,
        }}
      >
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            borderBottom: '1px solid var(--border-1)',
            paddingBottom: '0.75rem',
            marginBottom: '2.5rem',
          }}
        >
          <button
            onClick={() => setActiveTab('projects')}
            style={{
              padding: '0.5rem 1.25rem',
              background: activeTab === 'projects' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'projects' ? '#080808' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === 'projects' ? 'var(--accent)' : 'var(--border-2)'}`,
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
            My Published Artworks ({userProjects.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            style={{
              padding: '0.5rem 1.25rem',
              background: activeTab === 'inquiries' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'inquiries' ? '#080808' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === 'inquiries' ? 'var(--accent)' : 'var(--border-2)'}`,
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
            Client Inquiries ({inquiries?.length || 0})
          </button>
        </div>

        {/* TAB 1: Artworks List */}
        {activeTab === 'projects' && (
          <div>
            {userProjects.length === 0 ? (
              <div
                style={{
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  background: 'var(--surface-1)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px dashed var(--border-2)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>◈</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>
                  Your portfolio is currently empty
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Upload photos or digital masterworks to showcase your talent to clients worldwide.
                </p>
                <Button size="md" onClick={() => setIsAddModalOpen(true)}>
                  + Publish First Artwork
                </Button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '1.75rem',
                }}
              >
                {userProjects.map((art) => (
                  <div
                    key={art.id}
                    style={{
                      background: 'var(--surface-1)',
                      border: '1px solid var(--border-2)',
                      borderRadius: 'var(--radius-xl)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      {/* Canvas / Image Display */}
                      <div
                        style={{
                          height: 200,
                          background: art.imageUrl ? '#0a0a0a' : art.gradient,
                          position: 'relative',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {art.imageUrl && (
                          <img
                            src={art.imageUrl}
                            alt={art.title}
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
                            top: '0.75rem',
                            left: '0.75rem',
                            padding: '0.2rem 0.6rem',
                            background: 'rgba(0,0,0,0.65)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '100px',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: '#fff',
                          }}
                        >
                          {art.category}
                        </div>

                        {art.fileName && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '0.75rem',
                              right: '0.75rem',
                              padding: '0.2rem 0.6rem',
                              background: 'rgba(0,0,0,0.7)',
                              border: '1px solid var(--border-2)',
                              borderRadius: '100px',
                              fontSize: '0.62rem',
                              fontWeight: 600,
                              color: 'var(--accent)',
                            }}
                          >
                            📎 {art.fileName} ({art.fileSize})
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ padding: '1.25rem' }}>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '0.35rem',
                          }}
                        >
                          {art.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                            marginBottom: '1rem',
                          }}
                        >
                          {art.description}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {(Array.isArray(art.software) ? art.software : []).map((s) => (
                            <Tag key={s} accent={user.accent}>
                              {s}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div
                      style={{
                        padding: '0.85rem 1.25rem',
                        background: 'var(--surface-2)',
                        borderTop: '1px solid var(--border-1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        ♥ {art.likes || 0} Likes · {art.views || 1} Views
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDeleteProject(art.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Client Inquiries Inbox */}
        {activeTab === 'inquiries' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {inquiries && inquiries.length > 0 ? (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  style={{
                    padding: '1.75rem',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {inq.projectTitle || inq.title}
                        </h3>
                        <span
                          style={{
                            padding: '0.2rem 0.6rem',
                            background: 'var(--accent-dim)',
                            border: '1px solid var(--accent)',
                            color: 'var(--accent)',
                            borderRadius: '100px',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                          }}
                        >
                          {inq.status || 'Active Lead'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        From: <strong style={{ color: 'var(--text-primary)' }}>{inq.clientName || 'Private Client'}</strong> ({inq.clientCompany || inq.clientEmail || 'Direct'}) · {inq.date || 'Recent'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Budget</div>
                        <div style={{ color: 'var(--accent)', fontWeight: 700 }}>{inq.budget}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Timeline</div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{inq.timeline}</div>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, background: 'var(--surface-2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    "{inq.message}"
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-end' }}>
                    <Button
                      size="sm"
                      onClick={() => alert(`Proposal accepted for "${inq.projectTitle || inq.title}". Client has been notified!`)}
                    >
                      Accept Project Brief
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => alert('Message thread opened with client.')}
                    >
                      Reply to Client
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  background: 'var(--surface-1)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px dashed var(--border-2)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>◉</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>
                  No incoming client inquiries yet
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  When clients view your portfolio and click "Hire", project briefs will appear here.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal 1: Edit Profile & Photos */}
      {isEditProfileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 600,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setIsEditProfileOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 620,
              background: 'var(--surface-2)',
              border: '1px solid var(--border-3)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 30px 80px rgba(0,0,0,0.85)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditProfileOpen(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '1.4rem',
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.35rem' }}>
                Profile Customization
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700 }}>
                Edit Creator Profile &amp; Photos
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Upload your avatar photo, banner artwork, and update your showcase information.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Avatar Photo Upload Area */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                  Profile Avatar Photo
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: user.accent || 'var(--accent)',
                      color: '#080808',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      overflow: 'hidden',
                      border: '2px solid var(--border-3)',
                      flexShrink: 0,
                    }}
                  >
                    {profileForm.avatarUrl ? (
                      <img
                        src={profileForm.avatarUrl}
                        alt="Profile avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      user.avatar || user.name?.slice(0, 2).toUpperCase() || 'CR'
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        📷 Upload Photo
                      </Button>
                      {profileForm.avatarUrl && (
                        <Button
                          type="button"
                          size="sm"
                          variant="danger"
                          onClick={() => setProfileForm({ ...profileForm, avatarUrl: '' })}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Supports JPG, PNG, WEBP. Square ratio recommended.
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Banner Photo Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                  Profile Banner Artwork (Optional)
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => bannerInputRef.current?.click()}
                  >
                    🖼 Upload Banner Cover
                  </Button>
                  {profileForm.bannerUrl && (
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      onClick={() => setProfileForm({ ...profileForm, bannerUrl: '' })}
                    >
                      Remove Banner
                    </Button>
                  )}
                </div>
                {profileForm.bannerUrl && (
                  <div
                    style={{
                      marginTop: '0.5rem',
                      height: 80,
                      borderRadius: 'var(--radius-md)',
                      backgroundImage: `url(${profileForm.bannerUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: '1px solid var(--border-2)',
                    }}
                  />
                )}
              </div>

              {/* Name & Job Title */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 1rem',
                      background: 'var(--surface-1)',
                      border: '1px solid var(--border-2)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Creative Specialty
                  </label>
                  <select
                    value={profileForm.jobType}
                    onChange={(e) => setProfileForm({ ...profileForm, jobType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 1rem',
                      background: 'var(--surface-1)',
                      border: '1px solid var(--border-2)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  >
                    {JOB_TYPES.filter((j) => j !== 'All').map((j) => (
                      <option key={j} value={j} style={{ background: '#141414', color: '#fff' }}>
                        {j}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location & Rate Estimate */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 1rem',
                      background: 'var(--surface-1)',
                      border: '1px solid var(--border-2)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Rate Estimate
                  </label>
                  <input
                    type="text"
                    value={profileForm.rateEstimate}
                    onChange={(e) => setProfileForm({ ...profileForm, rateEstimate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 1rem',
                      background: 'var(--surface-1)',
                      border: '1px solid var(--border-2)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Bio &amp; Artist Statement
                </label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              {/* Software Tool Stack */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                  Software Tools
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {SOFTWARE_OPTIONS.filter((s) => s !== 'All').map((tool) => {
                    const sel = profileForm.selectedSoftware.includes(tool);
                    return (
                      <button
                        type="button"
                        key={tool}
                        onClick={() => toggleSoftware(tool)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          background: sel ? 'var(--accent-dim)' : 'var(--surface-1)',
                          border: `1px solid ${sel ? 'var(--accent)' : 'var(--border-2)'}`,
                          color: sel ? 'var(--accent)' : 'var(--text-secondary)',
                          borderRadius: '100px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {sel ? `✓ ${tool}` : tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <Button size="lg" fullWidth>
                  Save Profile Changes ✓
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Publish New Artwork */}
      {isAddModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 600,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 620,
              background: 'var(--surface-2)',
              border: '1px solid var(--border-3)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 30px 80px rgba(0,0,0,0.85)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '1.4rem',
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.35rem' }}>
                Showcase Builder
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700 }}>
                Publish New Masterpiece
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Upload photos, renders, or project deliverables to your public profile.
              </p>
            </div>

            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Artwork Photo / File Upload Drag-and-Drop Area */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                  Upload Artwork Photos / Files
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleArtworkFileChange(e.target.files?.[0])}
                  accept="image/*,.blend,.obj,.fbx,.zip,.pdf,.psd,.ai"
                  style={{ display: 'none' }}
                />

                {newProject.imageUrl ? (
                  /* Photo Preview Box */
                  <div
                    style={{
                      position: 'relative',
                      height: 220,
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      border: '1px solid var(--accent)',
                      background: '#0a0a0a',
                    }}
                  >
                    <img
                      src={newProject.imageUrl}
                      alt="Uploaded preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        background: 'radial-gradient(ellipse at center, rgba(200,169,110,0.1) 0%, #000 100%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0.75rem',
                        left: '0.75rem',
                        right: '0.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(0,0,0,0.75)',
                        backdropFilter: 'blur(10px)',
                        padding: '0.45rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-2)',
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        📷 {newProject.fileName} ({newProject.fileSize})
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--accent)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setNewProject((prev) => ({
                              ...prev,
                              imageUrl: '',
                              fileName: '',
                              fileSize: '',
                              fileType: '',
                            }))
                          }
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#f87171',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : newProject.fileName ? (
                  /* Non-image file preview box */
                  <div
                    style={{
                      padding: '1.5rem',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-3)',
                      background: 'var(--surface-1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--accent-dim)',
                          border: '1px solid var(--accent)',
                          color: 'var(--accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem',
                        }}
                      >
                        📦
                      </div>
                      <div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {newProject.fileName}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {newProject.fileSize} · Ready for attachment
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setNewProject((prev) => ({
                          ...prev,
                          fileName: '',
                          fileSize: '',
                          fileType: '',
                        }))
                      }
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#f87171',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  /* Drop zone */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleArtworkFileChange(e.dataTransfer.files?.[0]);
                    }}
                    style={{
                      border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--border-2)'}`,
                      borderRadius: 'var(--radius-lg)',
                      padding: '2rem 1.5rem',
                      textAlign: 'center',
                      background: isDragging ? 'var(--accent-dim)' : 'var(--surface-1)',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>
                      ⇪
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      Click to upload photos or drag &amp; drop
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Supports JPG, PNG, WEBP, GIF, PSD, AI, BLEND, OBJ, or ZIP deliverables
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Artwork Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Artwork title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Category
                </label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                >
                  <option value="3D & Motion" style={{ background: '#141414', color: '#fff' }}>3D &amp; Motion</option>
                  <option value="Visual Identity" style={{ background: '#141414', color: '#fff' }}>Visual Identity</option>
                  <option value="Case Studies" style={{ background: '#141414', color: '#fff' }}>Case Studies</option>
                  <option value="All Works" style={{ background: '#141414', color: '#fff' }}>General Art</option>
                </select>
              </div>

              {/* Gradient Palette Generator (Used as fallback/background tone) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                  Ambient Palette Tone {newProject.imageUrl && '(Background lighting)'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {ARTWORK_GRADIENTS.map((grad, idx) => (
                    <div
                      key={idx}
                      onClick={() => setNewProject({ ...newProject, gradient: grad })}
                      style={{
                        aspectRatio: '1',
                        background: grad,
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        border: newProject.gradient === grad ? '2px solid #fff' : '1px solid var(--border-2)',
                        transform: newProject.gradient === grad ? 'scale(1.08)' : 'scale(1)',
                        transition: 'var(--transition)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Software Tool Stack */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                  Tools &amp; Software Used
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {SOFTWARE_OPTIONS.filter((s) => s !== 'All').map((tool) => {
                    const sel = newProject.software.includes(tool);
                    return (
                      <button
                        type="button"
                        key={tool}
                        onClick={() => toggleProjectSoftware(tool)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          background: sel ? 'var(--accent-dim)' : 'var(--surface-1)',
                          border: `1px solid ${sel ? 'var(--accent)' : 'var(--border-2)'}`,
                          color: sel ? 'var(--accent)' : 'var(--text-secondary)',
                          borderRadius: '100px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {sel ? `✓ ${tool}` : tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Description &amp; Story
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your design process, client context, or technical execution..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <Button size="lg" fullWidth>
                  Publish Artwork to Showcase 🚀
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
