"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Turnstile } from '@marsidev/react-turnstile';
import { supabase } from '../lib/supabase';
import { 
  Star, 
  ShieldCheck, 
  Quote, 
  ThumbsUp, 
  MapPin, 
  CheckCircle2, 
  PlusCircle, 
  X, 
  Send,
  Loader2
} from 'lucide-react';

const defaultReviews = [
  {
    id: 'default-1',
    name: 'David Miller',
    location: 'Surry Hills, Sydney',
    service: 'Residential New Installation',
    rating: 5,
    comment: 'Top-tier work on our terrace upgrade! Modernised our full switchboard, upgraded safety switches, and added architectural lighting. Clean, punctual, and strictly complied with NSW standards.',
    created_at: '2025-11-14T10:00:00.000Z'
  },
  {
    id: 'default-2',
    name: 'Sarah Jenkins',
    location: 'North Sydney',
    service: 'Commercial Data & Power Fit-Out',
    rating: 5,
    comment: 'Installed high-speed Cat6 structured data points and dynamic office lighting for our team. Seamless execution, minimal downtime, and stellar communication throughout.',
    created_at: '2025-12-02T14:30:00.000Z'
  },
  {
    id: 'default-3',
    name: 'Michael Zhang',
    location: 'Bondi Junction, Sydney',
    service: 'EV Charger & Solar Integration',
    rating: 5,
    comment: 'Fast wallbox EV charger installation paired with our existing rooftop solar system. Honest upfront pricing, clear safety walk-through, and effortless service.',
    created_at: '2026-01-20T09:15:00.000Z'
  }
];

export default function ReviewsSection({ isDark }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    service: '',
    comment: ''
  });
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [captchaToken, setCaptchaToken] = useState('');

  // 1. Fetch Approved Reviews from Supabase
  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setReviews(data);
        } else {
          setReviews(defaultReviews);
        }
      } catch (err) {
        console.error('Failed to load reviews:', err);
        setReviews(defaultReviews);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0
    ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / totalReviewsCount).toFixed(1)
    : "5.0";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Submit Review to API Endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!captchaToken) {
      setErrorMessage('Please complete the Cloudflare security verification.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          service: formData.service,
          comment: formData.comment,
          rating: newRating,
          captchaToken
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review.');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsModalOpen(false);
        setFormData({ name: '', location: '', service: '', comment: '' });
        setNewRating(5);
        setCaptchaToken('');
      }, 3000);
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryYellow = isDark ? '#facc15' : '#ca8a04';
  const accentYellow = isDark ? '#facc15' : '#eab308';

  return (
    <>
      <section 
        id="reviews" 
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '2rem',
          paddingBottom: '5rem',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  paddingLeft: '0.875rem',
                  paddingRight: '0.875rem',
                  paddingTop: '0.375rem',
                  paddingBottom: '0.375rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(250, 204, 21, 0.3)',
                  backgroundColor: 'rgba(250, 204, 21, 0.1)',
                  color: primaryYellow,
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <ThumbsUp style={{ width: '0.875rem', height: '0.875rem', fill: 'currentColor' }} /> Verified Sydney Feedback
              </span>
            </div>

            <h2 
              className="reviews-heading"
              style={{
                fontWeight: 900,
                color: isDark ? '#ffffff' : '#0f172a',
                letterSpacing: '-0.025em',
                lineHeight: 1.25,
                margin: 0
              }}
            >
              Trusted by{' '}
              <span 
                style={{
                  color: isDark ? '#facc15' : '#eab308',
                  filter: isDark ? 'drop-shadow(0 0 12px rgba(250,204,21,0.5))' : 'none'
                }}
              >
                Sydney Homes & Businesses
              </span>
            </h2>

            <p 
              className="reviews-desc"
              style={{
                color: isDark ? '#94a3b8' : '#475569',
                margin: 0
              }}
            >
              See why clients across Greater Sydney rely on Logic Ten Electrical for rapid service, safety, and AS/NZS compliance.
            </p>
          </div>

          {/* Dynamic Overall Rating Banner */}
          <div 
            className="rating-banner"
            style={{
              maxWidth: '56rem',
              margin: '0 auto',
              width: '100%',
              borderRadius: '1.5rem',
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              border: isDark ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid #e2e8f0',
              boxShadow: isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.2)' : '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div 
                style={{
                  padding: '1rem',
                  backgroundColor: isDark ? 'rgba(250, 204, 21, 0.2)' : 'rgba(234, 179, 8, 0.1)',
                  color: primaryYellow,
                  borderRadius: '1rem',
                  flexShrink: 0
                }}
              >
                <Star style={{ width: '2rem', height: '2rem', fill: 'currentColor' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.875rem', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a' }}>{averageRating}</span>
                  <div style={{ display: 'flex', color: accentYellow }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} style={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }} />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.125rem', margin: 0 }}>
                  Based on {totalReviewsCount > 0 ? totalReviewsCount : '120+'} Sydney Electrical Projects
                </p>
              </div>
            </div>

            <div className="banner-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div 
                className="guarantee-badge"
                style={{
                  alignItems: 'center',
                  gap: '0.625rem',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderRadius: '1rem',
                  backgroundColor: isDark ? 'rgba(2, 6, 23, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                  border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0'
                }}
              >
                <ShieldCheck style={{ width: '1.25rem', height: '1.25rem', color: primaryYellow, flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isDark ? '#e2e8f0' : '#1e293b' }}>
                  100% Workmanship Guarantee
                </span>
              </div>

              {/* Modal Trigger */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsModalOpen(true)}
                className="review-btn"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.625rem',
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  paddingTop: '0.875rem',
                  paddingBottom: '0.875rem',
                  borderRadius: '1rem',
                  backgroundImage: 'linear-gradient(to right, #facc15, #eab308, #facc15)',
                  color: '#020617',
                  fontWeight: 900,
                  fontSize: '0.875rem',
                  letterSpacing: '0.025em',
                  boxShadow: '0 10px 15px -3px rgba(234, 179, 8, 0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                <PlusCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Write a Review</span>
              </motion.button>
            </div>
          </div>

          {/* Dynamic Reviews Grid */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
              <Loader2 style={{ width: '2rem', height: '2rem', color: '#eab308' }} className="spin-icon" />
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.75rem',
                    borderRadius: '1.5rem',
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff',
                    border: isDark ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid #e2e8f0',
                    boxShadow: isDark ? '0 0 30px rgba(250, 204, 21, 0.05)' : '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                    backdropFilter: 'blur(24px)'
                  }}
                >
                  <Quote 
                    style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      width: '2.5rem',
                      height: '2.5rem',
                      color: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(226, 232, 240, 0.6)',
                      pointerEvents: 'none'
                    }} 
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', color: accentYellow }}>
                        {[...Array(Number(review.rating))].map((_, i) => (
                          <Star key={i} style={{ width: '1rem', height: '1rem', fill: 'currentColor' }} />
                        ))}
                      </div>
                      {review.service && (
                        <div>
                          <span 
                            style={{
                              display: 'inline-block',
                              fontSize: '11px',
                              fontWeight: 900,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              color: primaryYellow,
                              backgroundColor: 'rgba(250, 204, 21, 0.1)',
                              paddingLeft: '0.625rem',
                              paddingRight: '0.625rem',
                              paddingTop: '0.25rem',
                              paddingBottom: '0.25rem',
                              borderRadius: '0.375rem'
                            }}
                          >
                            {review.service}
                          </span>
                        </div>
                      )}
                    </div>

                    <p style={{ color: isDark ? '#cbd5e1' : '#475569', fontSize: '0.875rem', lineHeight: 1.625, fontStyle: 'italic', margin: 0 }}>
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  <div 
                    style={{
                      paddingTop: '1.5rem',
                      marginTop: '1.5rem',
                      borderTop: isDark ? '1px solid rgba(30, 41, 59, 0.8)' : '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <h3 style={{ fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', fontSize: '1rem', margin: 0 }}>
                          {review.name}
                        </h3>
                        <CheckCircle2 style={{ width: '1rem', height: '1rem', color: primaryYellow, flexShrink: 0 }} />
                      </div>
                      {review.location && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.125rem' }}>
                          <MapPin style={{ width: '0.75rem', height: '0.75rem', flexShrink: 0 }} />
                          <span>{review.location}</span>
                        </div>
                      )}
                    </div>

                    <span style={{ fontSize: '11px', fontWeight: 600, color: isDark ? '#64748b' : '#94a3b8' }}>
                      {review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Verified Sydney Client'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>

        {/* Review Submission Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(2, 6, 23, 0.8)',
                  backdropFilter: 'blur(12px)'
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '32rem',
                  padding: '2rem',
                  borderRadius: '1.5rem',
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  border: isDark ? '1px solid rgba(250, 204, 21, 0.3)' : '1px solid #e2e8f0',
                  boxShadow: isDark ? '0 0 50px rgba(250, 204, 21, 0.15)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  zIndex: 10,
                  maxHeight: '90vh',
                  overflowY: 'auto'
                }}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    padding: '0.5rem',
                    borderRadius: '0.75rem',
                    color: '#94a3b8',
                    backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>

                {submitted ? (
                  <div style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ width: '4rem', height: '4rem', margin: '0 auto', borderRadius: '9999px', backgroundColor: 'rgba(250, 204, 21, 0.2)', color: primaryYellow, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 style={{ width: '2.5rem', height: '2.5rem' }} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: 0 }}>
                      Submitted for Moderation!
                    </h3>
                    <p style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.875rem', margin: 0 }}>
                      Thank you! Your feedback will go live on the site as soon as it is reviewed by our Sydney team.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em', color: primaryYellow, textTransform: 'uppercase', display: 'block' }}>
                        Sydney Client Feedback
                      </span>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', marginTop: '0.25rem', margin: 0 }}>
                        Rate Your Experience
                      </h3>
                    </div>

                    {errorMessage && (
                      <div style={{ padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.75rem', fontWeight: 500 }}>
                        {errorMessage}
                      </div>
                    )}

                    {/* Rating Selector */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#94a3b8' : '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Rating
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem', color: accentYellow }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            style={{
                              padding: '0.25rem',
                              border: 'none',
                              backgroundColor: 'transparent',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Star
                              style={{
                                width: '1.75rem',
                                height: '1.75rem',
                                fill: star <= (hoverRating || newRating) ? 'currentColor' : 'none',
                                color: star <= (hoverRating || newRating) ? accentYellow : (isDark ? '#334155' : '#cbd5e1')
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Inputs */}
                    <div className="input-group-grid">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#94a3b8' : '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Your Name
                        </label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                          style={{
                            width: '100%',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            borderRadius: '0.75rem',
                            backgroundColor: isDark ? '#020617' : '#f8fafc',
                            border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                            color: isDark ? '#ffffff' : '#0f172a',
                            fontSize: '0.875rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#94a3b8' : '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Sydney Suburb
                        </label>
                        <input
                          required
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g. Surry Hills, Sydney"
                          style={{
                            width: '100%',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            borderRadius: '0.75rem',
                            backgroundColor: isDark ? '#020617' : '#f8fafc',
                            border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                            color: isDark ? '#ffffff' : '#0f172a',
                            fontSize: '0.875rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#94a3b8' : '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Service Delivered
                      </label>
                      <input
                        required
                        type="text"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        placeholder="e.g. Switchboard Upgrade"
                        style={{
                          width: '100%',
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          paddingTop: '0.75rem',
                          paddingBottom: '0.75rem',
                          borderRadius: '0.75rem',
                          backgroundColor: isDark ? '#020617' : '#f8fafc',
                          border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                          color: isDark ? '#ffffff' : '#0f172a',
                          fontSize: '0.875rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#94a3b8' : '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Your Feedback
                      </label>
                      <textarea
                        required
                        rows={3}
                        name="comment"
                        value={formData.comment}
                        onChange={handleInputChange}
                        placeholder="How was the service, timing, and safety standards?"
                        style={{
                          width: '100%',
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          paddingTop: '0.75rem',
                          paddingBottom: '0.75rem',
                          borderRadius: '0.75rem',
                          backgroundColor: isDark ? '#020617' : '#f8fafc',
                          border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                          color: isDark ? '#ffffff' : '#0f172a',
                          fontSize: '0.875rem',
                          outline: 'none',
                          resize: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Cloudflare Turnstile Verification */}
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                      <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                        onSuccess={(token) => {
                          setCaptchaToken(token);
                          setErrorMessage('');
                        }}
                        onError={() => {
                          setCaptchaToken('');
                          setErrorMessage('Captcha verification failed. Please try again.');
                        }}
                        onExpire={() => {
                          setCaptchaToken('');
                          setErrorMessage('Captcha token expired. Please verify again.');
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      type="submit"
                      style={{
                        width: '100%',
                        paddingTop: '0.875rem',
                        paddingBottom: '0.875rem',
                        borderRadius: '0.75rem',
                        backgroundImage: 'linear-gradient(to right, #facc15, #eab308, #facc15)',
                        color: '#020617',
                        fontWeight: 900,
                        fontSize: '0.875rem',
                        letterSpacing: '0.025em',
                        boxShadow: '0 10px 15px -3px rgba(234, 179, 8, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.5 : 1,
                        border: 'none'
                      }}
                    >
                      {isSubmitting ? (
                        <Loader2 style={{ width: '1rem', height: '1rem' }} className="spin-icon" />
                      ) : (
                        <>
                          <Send style={{ width: '1rem', height: '1rem' }} />
                          <span>Submit Review</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Responsive Styles & Keyframes */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        .reviews-heading {
          font-size: 1.875rem;
        }

        .reviews-desc {
          font-size: 1rem;
        }

        .rating-banner {
          padding: 1.5rem;
          flex-direction: column;
          gap: 1.5rem;
        }

        .banner-actions {
          width: 100%;
          flex-direction: column;
        }

        .review-btn {
          width: 100%;
        }

        .guarantee-badge {
          display: none;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .input-group-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .reviews-heading {
            font-size: 3rem;
          }
          .reviews-desc {
            font-size: 1.125rem;
          }
          .rating-banner {
            padding: 2rem;
          }
          .banner-actions {
            width: auto;
            flex-direction: row;
          }
          .review-btn {
            width: auto;
          }
          .input-group-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 768px) {
          .rating-banner {
            flex-direction: row;
          }
          .reviews-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .guarantee-badge {
            display: flex;
          }
          .reviews-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
}