import React, { useState } from 'react';
import Logo from '../components/Logo';
import Button from '../components/Button';
import NavLink from '../components/NavLink';
import FeaturedCreatorCard from '../components/FeaturedCreatorCard';
import { MOCK_CREATORS, ARTWORK_GRADIENTS, PLATFORM_STATS, FEATURES } from '../data/constants';

// ─────────────────────────────────────────────────────────────────────────────
// Shared layout constants
// ─────────────────────────────────────────────────────────────────────────────
const NAV_HEIGHT  = 76;           // px — hero text clears the fixed nav
const MAX_WIDTH   = 1100;         // px — consistent section cap
const SECTION_PAD = '5rem 2.5rem';

// ─────────────────────────────────────────────────────────────────────────────
// Tiny shared atoms
// ─────────────────────────────────────────────────────────────────────────────

function Overline({ children }) {
  return (
    <div
      style={{
        fontSize: '0.68rem',
        fontWeight: 700,
        letterSpacing: '0.13em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: '0.65rem',
      }}
    >
      {children}
    </div>
  );
}

function VDivider() {
  return <div style={{ width: 1, height: 32, background: 'var(--border-2)', flexShrink: 0 }} />;
}

function HeroStat({ value, label }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '0.67rem',
          color: 'var(--text-muted)',
          marginTop: '0.25rem',
          letterSpacing: '0.11em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

function LandingNav({ onSignup, onLogin, onExplore }) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: NAV_HEIGHT,
        padding: '0 clamp(1.2rem, 3vw, 2.5rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(8,8,8,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-1)',
      }}
    >
      <Logo />
      <div style={{ display: 'flex', gap: 'clamp(0.75rem, 2vw, 1.75rem)', alignItems: 'center' }}>
        <NavLink onClick={onExplore}>Explore</NavLink>
        <NavLink onClick={onLogin}>Sign In</NavLink>
        <Button onClick={onSignup} size="sm">Get Started</Button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

function ArtworkMosaic() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        width: '100%',
        maxWidth: 320,
        margin: '0 auto',
      }}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          style={{
            aspectRatio: '1',
            borderRadius: 6,
            background: ARTWORK_GRADIENTS[i % ARTWORK_GRADIENTS.length],
            opacity: 0.65 + (i % 3) * 0.12,
            transform: `rotate(${(i % 5 - 2) * 0.6}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function HeroSection({ onSignup, onExplore }) {
  return (
    <section
      style={{
        paddingTop: NAV_HEIGHT + 64,
        paddingBottom: '6rem',
        paddingLeft: 'clamp(1.2rem, 3vw, 2.5rem)',
        paddingRight: 'clamp(1.2rem, 3vw, 2.5rem)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Grid bg */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--border-1) 1px, transparent 1px), linear-gradient(90deg, var(--border-1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 20% 60%, rgba(200,169,110,0.07) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      {/* Two-column: text left, mosaic right */}
      <div
        style={{
          width: '100%',
          maxWidth: MAX_WIDTH,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left: text */}
        <div>
          {/* Badge pill */}
          <div
            className="anim-fade-up"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              padding: '0.36rem 1rem',
              border: '1px solid var(--border-2)',
              borderRadius: '100px',
              background: 'var(--surface-1)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'inline-block',
                animation: 'shimmer 2.2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.1em',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              The home for digital creators
            </span>
          </div>

          {/* Headline */}
          <h1
            className="anim-fade-up delay-1"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
            }}
          >
            Where Digital
            <br />
            Art Finds Its
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Audience.</em>
          </h1>

          {/* Subheading */}
          <p
            className="anim-fade-up delay-2"
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: 460,
              marginBottom: '2.5rem',
            }}
          >
            Artisync connects talented digital creators with clients who appreciate
            craft. Build your portfolio, get discovered, get hired.
          </p>

          {/* CTAs */}
          <div
            className="anim-fade-up delay-3"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
          >
            <Button onClick={onSignup} size="lg">Join as Creator</Button>
            <Button onClick={onExplore} size="lg" variant="ghost">Browse Creators</Button>
          </div>

          {/* Stats */}
          <div
            className="anim-fade-up delay-4"
            style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
          >
            {PLATFORM_STATS.map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <VDivider />}
                <HeroStat value={stat.value} label={stat.label} />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right: artwork mosaic */}
        <div className="anim-fade-in delay-3">
          <ArtworkMosaic />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Features
// ─────────────────────────────────────────────────────────────────────────────

function FeatureCard({ feature }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.75rem',
        background: 'var(--surface-1)',
        border: `1px solid ${hovered ? 'var(--border-3)' : 'var(--border-1)'}`,
        borderRadius: 8,
        transition: 'border-color 0.2s ease',
      }}
    >
      <div style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '1rem', lineHeight: 1 }}>
        {feature.icon}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        {feature.title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>
        {feature.description}
      </p>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section style={{ padding: SECTION_PAD, borderTop: '1px solid var(--border-1)' }}>
      <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <Overline>Why Artisync</Overline>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Built for the craft,
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>designed for growth.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {FEATURES.map((f) => <FeatureCard key={f.title} feature={f} />)}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Featured creators
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedSection({ onViewAll, onCreatorClick }) {
  return (
    <section style={{ padding: SECTION_PAD, borderTop: '1px solid var(--border-1)', background: 'var(--surface-1)' }}>
      <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.25rem' }}>
          <div>
            <Overline>Community</Overline>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Featured Creators
            </h2>
          </div>
          <Button onClick={onViewAll} variant="outline" size="sm">View All</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {MOCK_CREATORS.slice(0, 4).map((creator) => (
            <FeaturedCreatorCard key={creator.id} creator={creator} onClick={() => onCreatorClick(creator)} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// How it works
// ─────────────────────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Create Your Portfolio',
      description: 'Sign up as a creator and build your portfolio with images, videos, and reels. Tag your tools and specialty.',
    },
    {
      number: '02',
      title: 'Get Discovered',
      description: 'Clients browse and filter by specialty and software. Your work speaks for itself in a beautiful, distraction-free space.',
    },
    {
      number: '03',
      title: 'Get Hired',
      description: 'Clients reach out directly. No platform fees, no bidding wars. Just a direct line between your craft and the people who need it.',
    },
  ];

  return (
    <section style={{ padding: SECTION_PAD, borderTop: '1px solid var(--border-1)' }}>
      <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem', maxWidth: 500 }}>
          <Overline>How It Works</Overline>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Three steps to your next{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>big opportunity.</em>
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: 'var(--border-1)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}
        >
          {steps.map((step) => (
            <div key={step.number} style={{ padding: '2.5rem', background: 'var(--surface-1)' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  color: 'var(--border-2)',
                  lineHeight: 1,
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.04em',
                }}
              >
                {step.number}
              </div>
              <div style={{ width: 32, height: 2, background: 'var(--accent)', borderRadius: 2, marginBottom: '1.25rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────────────────────────────────────

function TestimonialCard({ quote }) {
  return (
    <div
      style={{
        padding: '2rem',
        background: 'var(--surface-2)',
        border: '1px solid var(--border-1)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--accent)', lineHeight: 0.8, marginBottom: '1rem', opacity: 0.5 }}>
        "
      </div>
      <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        {quote.text}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--accent-dim)', border: '1px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem',
            color: 'var(--accent)', flexShrink: 0,
          }}
        >
          {quote.author[0]}
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{quote.author}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{quote.role}</div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const quotes = [
    { text: 'Got my first client within a week of publishing. The portfolio builder is genuinely beautiful.', author: 'Karim A.', role: 'Motion Designer' },
    { text: 'Finally a platform that treats creative work with the respect it deserves. No noise, just art.', author: 'Priya M.', role: '3D Artist' },
    { text: "Found the perfect editor for our rebrand in under an hour. The filter system is brilliant.", author: 'James T.', role: 'Brand Director' },
  ];
  return (
    <section style={{ padding: SECTION_PAD, borderTop: '1px solid var(--border-1)', background: 'var(--surface-1)' }}>
      <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <Overline>Testimonials</Overline>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Loved by creators &amp;{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>clients alike.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {quotes.map((q, i) => <TestimonialCard key={i} quote={q} />)}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────────────────

function CTASection({ onSignup }) {
  return (
    <section
      style={{
        padding: '7rem 2.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-1)',
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(200,169,110,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border-1) 1px, transparent 1px), linear-gradient(90deg, var(--border-1) 1px, transparent 1px)', backgroundSize: '60px 60px', opacity: 0.15, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Overline>Join Artisync</Overline>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            lineHeight: 1.05,
          }}
        >
          Ready to be
          <br />
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>discovered?</em>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto 2.5rem', lineHeight: 1.7, fontSize: '1rem' }}>
          Join thousands of digital creators who've found their next big client on Artisync.
        </p>
        <Button onClick={onSignup} size="xl">Create Your Portfolio</Button>
        <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Free to join · No credit card required
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────

/** Own component so useState is not called inside .map() */
function FooterLink({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: '0.75rem',
        color: hovered ? 'var(--text-secondary)' : 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'color 0.15s',
      }}
    >
      {label}
    </span>
  );
}

function Footer({ onLogoClick }) {
  const links = ['About', 'Blog', 'Careers', 'Privacy', 'Terms'];
  return (
    <footer
      style={{
        padding: '2rem 2.5rem',
        borderTop: '1px solid var(--border-1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <Logo onClick={onLogoClick} />
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {links.map((link) => <FooterLink key={link} label={link} />)}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Artisync. All rights reserved.
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page export
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Landing page
 *
 * Props:
 *  onSignup       → /signup
 *  onLogin        → /login
 *  onExplore      → /home
 *  onCreatorClick → /portfolio/:id
 */
export default function Landing({ onSignup, onLogin, onExplore, onCreatorClick }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      <LandingNav onSignup={onSignup} onLogin={onLogin} onExplore={onExplore} />
      <HeroSection     onSignup={onSignup}  onExplore={onExplore} />
      <FeaturesSection />
      <FeaturedSection onViewAll={onExplore} onCreatorClick={onCreatorClick} />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection      onSignup={onSignup} />
      <Footer          onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  );
}
