import React, { useState } from 'react';
import Button from './Button';

/**
 * HireModal — Direct Project Inquiry & Commission Dialog
 *
 * Props:
 *  creator: object (creator being hired)
 *  isOpen: boolean
 *  onClose: () => void
 *  onSubmitInquiry: (inquiryData: object) => void
 */
export default function HireModal({ creator, isOpen, onClose, onSubmitInquiry }) {
  const [formData, setFormData] = useState({
    title: '',
    budget: '$1,500 – $3,500',
    timeline: '2–4 weeks',
    message: '',
    clientName: '',
    clientEmail: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !creator) return null;

  const budgetOptions = [
    '< $1,000',
    '$1,000 – $2,500',
    '$2,500 – $5,000',
    '$5,000 – $10,000',
    '$10,000+',
  ];

  const timelineOptions = [
    'Urgent (< 1 week)',
    '1 – 2 weeks',
    '2 – 4 weeks',
    '1 – 2 months',
    'Flexible',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      onSubmitInquiry({
        ...formData,
        creatorId: creator.id,
        creatorName: creator.name,
        date: 'Just now',
      });
      setSubmitted(false);
      onClose();
    }, 900);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 560,
          background: 'var(--surface-2)',
          border: '1px solid var(--border-3)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.25rem',
          position: 'relative',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
          animation: 'fadeUp 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.4rem',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Header with Creator Pill */}
        <div style={{ marginBottom: '1.75rem' }}>
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
            Direct Commission &amp; Inquiry
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            Hire {creator.name}
          </h2>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.45rem 0.85rem',
              background: 'var(--surface-1)',
              border: '1px solid var(--border-2)',
              borderRadius: '100px',
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: creator.accent,
                color: '#080808',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: 800,
              }}
            >
              {creator.avatar || creator.name[0]}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {creator.jobType} · {creator.rateEstimate || 'Rates on inquiry'}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '0.4rem',
              }}
            >
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="Brand Identity & Motion Graphics Campaign"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-2)')}
            />
          </div>

          {/* Budget tier selector */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '0.45rem',
              }}
            >
              Estimated Budget
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {budgetOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setFormData({ ...formData, budget: opt })}
                  style={{
                    padding: '0.4rem 0.8rem',
                    background: formData.budget === opt ? 'var(--accent-dim)' : 'var(--surface-1)',
                    border: `1px solid ${formData.budget === opt ? 'var(--accent)' : 'var(--border-2)'}`,
                    color: formData.budget === opt ? 'var(--accent)' : 'var(--text-secondary)',
                    borderRadius: '100px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline selector */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '0.45rem',
              }}
            >
              Desired Timeline
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {timelineOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setFormData({ ...formData, timeline: opt })}
                  style={{
                    padding: '0.4rem 0.8rem',
                    background: formData.timeline === opt ? 'var(--accent-dim)' : 'var(--surface-1)',
                    border: `1px solid ${formData.timeline === opt ? 'var(--accent)' : 'var(--border-2)'}`,
                    color: formData.timeline === opt ? 'var(--accent)' : 'var(--text-secondary)',
                    borderRadius: '100px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '0.4rem',
              }}
            >
              Project Scope &amp; Brief *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe your deliverables, visual style references, and what you want to achieve..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                resize: 'vertical',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-2)')}
            />
          </div>

          {/* Client Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.35rem',
                }}
              >
                Your Name / Studio
              </label>
              <input
                type="text"
                placeholder="Your name or studio"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-2)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.35rem',
                }}
              >
                Your Work Email
              </label>
              <input
                type="email"
                placeholder="alex@studio.com"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-2)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <div style={{ marginTop: '0.5rem' }}>
            <Button
              size="lg"
              fullWidth
              disabled={submitted}
            >
              {submitted ? 'Transmitting Proposal...' : `Send Inquiry to ${creator.name}`}
            </Button>
            <p
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                marginTop: '0.75rem',
              }}
            >
              No platform commissions · Direct creator communication
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
