import React, { useState, useRef } from 'react';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Tag from '../components/Tag';
import { JOB_TYPES, SOFTWARE_OPTIONS } from '../data/constants';

/**
 * Signup — Multi-step Onboarding with Profile Photo Upload for Creators & Clients
 *
 * Props:
 *  onSignupSuccess: (newUser: object) => void
 *  onNavigate: (page: string) => void
 */
export default function Signup({ onSignupSuccess, onNavigate }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('creator'); // 'creator' | 'client'

  const avatarInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    handle: '',
    avatarUrl: '',
    jobType: 'Motion Designer',
    selectedSoftware: ['After Effects', 'Cinema 4D', 'Blender'],
    bio: '',
    rateEstimate: '$85/hr · $3,000/project',
    location: 'Global / Remote',
    companyName: '',
    projectBudget: '$2,500 – $5,000',
  });

  const handleAvatarChange = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({ ...prev, avatarUrl: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const toggleSoftware = (tool) => {
    if (formData.selectedSoftware.includes(tool)) {
      setFormData({
        ...formData,
        selectedSoftware: formData.selectedSoftware.filter((s) => s !== tool),
      });
    } else {
      setFormData({
        ...formData,
        selectedSoftware: [...formData.selectedSoftware, tool],
      });
    }
  };

  const handleFinish = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name: formData.name.trim() || (role === 'creator' ? 'Digital Designer' : 'Creative Studio'),
      email: formData.email.trim() || 'user@artisync.com',
      role: role === 'creator' ? 'Creator' : 'Client / Studio',
      jobType: role === 'creator' ? formData.jobType : 'Creative Director',
      software: formData.selectedSoftware,
      bio:
        formData.bio.trim() ||
        (role === 'creator'
          ? 'Digital visual artist and creative craftsman on Artisync.'
          : 'Connecting visionary brands with leading digital creators.'),
      location: formData.location,
      rateEstimate: formData.rateEstimate,
      avatarUrl: formData.avatarUrl,
      avatar: formData.avatarUrl || (formData.name.trim() || 'CR').slice(0, 2).toUpperCase(),
      accent: role === 'creator' ? '#C084FC' : '#38BDF8',
      projects: 0,
      hires: 0,
      rating: 5.0,
      artworkIds: [0, 1, 2],
      artworks: [],
      reviews: [],
    };

    onSignupSuccess(newUser);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hidden avatar photo input */}
      <input
        type="file"
        ref={avatarInputRef}
        onChange={(e) => handleAvatarChange(e.target.files?.[0])}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Background radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(200,169,110,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Wizard Container */}
      <div
        style={{
          width: '100%',
          maxWidth: 580,
          background: 'var(--surface-1)',
          border: '1px solid var(--border-2)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.75rem 2.5rem',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 25px 80px rgba(0,0,0,0.8)',
          animation: 'fadeUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        }}
      >
        {/* Brand & Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Logo onClick={() => onNavigate('landing')} />
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  width: step === s ? 24 : 8,
                  height: 6,
                  borderRadius: 4,
                  background: step >= s ? 'var(--accent)' : 'var(--border-2)',
                  transition: 'var(--transition)',
                }}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Choose Role */}
        {step === 1 && (
          <div>
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '0.4rem',
              }}
            >
              Step 1 of 3
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '0.6rem',
              }}
            >
              How do you want to use Artisync?
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Choose your primary objective on the platform.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
              {/* Option 1: Creator */}
              <div
                onClick={() => setRole('creator')}
                style={{
                  padding: '1.5rem',
                  background: role === 'creator' ? 'var(--surface-2)' : 'transparent',
                  border: `2px solid ${role === 'creator' ? 'var(--accent)' : 'var(--border-2)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--accent)' }}>◈</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  I'm a Creator
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Build your luxury portfolio, showcase your art, and receive direct client commissions.
                </p>
              </div>

              {/* Option 2: Client */}
              <div
                onClick={() => setRole('client')}
                style={{
                  padding: '1.5rem',
                  background: role === 'client' ? 'var(--surface-2)' : 'transparent',
                  border: `2px solid ${role === 'client' ? 'var(--accent)' : 'var(--border-2)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#38BDF8' }}>◉</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  I'm Hiring
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Discover elite motion designers, 3D artists, and illustrators for high-impact projects.
                </p>
              </div>
            </div>

            <Button size="lg" fullWidth onClick={() => setStep(2)}>
              Continue to Account Details →
            </Button>
          </div>
        )}

        {/* STEP 2: Basic Account Details + Profile Photo */}
        {step === 2 && (
          <div>
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '0.4rem',
              }}
            >
              Step 2 of 3
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '0.6rem',
              }}
            >
              Create your account credentials
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              Setting up your {role === 'creator' ? 'Creator Profile' : 'Studio Client Account'}.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {/* Profile Photo Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                  Profile Photo / Avatar (Optional)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div
                    onClick={() => avatarInputRef.current?.click()}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'var(--surface-2)',
                      border: `2px dashed ${formData.avatarUrl ? 'var(--accent)' : 'var(--border-2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {formData.avatarUrl ? (
                      <img
                        src={formData.avatarUrl}
                        alt="Avatar preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontSize: '1.4rem', color: 'var(--accent)' }}>📷</span>
                    )}
                  </div>
                  <div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => avatarInputRef.current?.click()}
                    >
                      {formData.avatarUrl ? 'Change Photo' : 'Upload Photo'}
                    </Button>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                      JPG, PNG, or WEBP. You can also change this later in Creator Studio.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Full Name / Studio Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-2)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-2)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  Choose Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-2)')}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button variant="ghost" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button size="lg" fullWidth onClick={() => setStep(3)}>
                Next: Customize Profile →
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Specialty & Tools Customization */}
        {step === 3 && (
          <form onSubmit={handleFinish}>
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '0.4rem',
              }}
            >
              Step 3 of 3
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '0.6rem',
              }}
            >
              {role === 'creator' ? 'Creative Specialty & Stack' : 'Company & Creative Scope'}
            </h1>

            {role === 'creator' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Primary Specialty
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--surface-2)',
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                    Software &amp; Tools Stack (Click to select)
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {SOFTWARE_OPTIONS.filter((s) => s !== 'All').map((tool) => {
                      const selected = formData.selectedSoftware.includes(tool);
                      return (
                        <button
                          type="button"
                          key={tool}
                          onClick={() => toggleSoftware(tool)}
                          style={{
                            padding: '0.38rem 0.8rem',
                            background: selected ? 'var(--accent-dim)' : 'var(--surface-2)',
                            border: `1px solid ${selected ? 'var(--accent)' : 'var(--border-2)'}`,
                            color: selected ? 'var(--accent)' : 'var(--text-secondary)',
                            borderRadius: '100px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                          }}
                        >
                          {selected ? `✓ ${tool}` : tool}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Bio &amp; Creative Philosophy
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your creative craft, design experience, and aesthetic focus..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--surface-2)',
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
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Company or Studio name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--surface-2)',
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
                    Typical Project Budget
                  </label>
                  <select
                    value={formData.projectBudget}
                    onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border-2)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  >
                    <option value="$1,000 – $2,500" style={{ background: '#141414', color: '#fff' }}>$1,000 – $2,500</option>
                    <option value="$2,500 – $5,000" style={{ background: '#141414', color: '#fff' }}>$2,500 – $5,000</option>
                    <option value="$5,000 – $10,000" style={{ background: '#141414', color: '#fff' }}>$5,000 – $10,000</option>
                    <option value="$10,000+" style={{ background: '#141414', color: '#fff' }}>$10,000+</option>
                  </select>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button variant="ghost" onClick={() => setStep(2)}>
                ← Back
              </Button>
              <Button size="lg" fullWidth>
                Complete Setup &amp; Launch 🚀
              </Button>
            </div>
          </form>
        )}

        {/* Footer info */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <span
            onClick={() => onNavigate('login')}
            style={{
              color: 'var(--accent)',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}
