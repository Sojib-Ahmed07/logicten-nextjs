"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

export default function ContactSection({ isDark }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [serviceType, setServiceType] = useState('Residential');

  const serviceOptions = ['Residential', 'Commercial', 'Solar & Battery', 'Emergency 24/7'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_65tepnv';
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_7yx8kk8';
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'vwV13BT0NFaSoDfp0';

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      setLoading(false);
      setSubmitted(true);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#eab308', '#facc15', '#fef08a', '#ffffff'],
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorMessage('Failed to send power request. Please call direct!');
    }
  };

  const primaryYellow = isDark ? '#facc15' : '#eab308';
  const cardBg = isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)';
  const formBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const borderStyle = isDark ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid rgba(226, 232, 240, 0.8)';
  const inputBg = isDark ? '#020617' : '#f8fafc';
  const inputBorder = isDark ? '1px solid #1e293b' : '1px solid #e2e8f0';

  return (
    <>
      <section 
        id="contact" 
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '2rem',
          paddingBottom: '4rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            pointerEvents: 'none',
            backgroundImage: 'radial-gradient(#eab308 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} 
        />

        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 3rem auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  backgroundColor: 'rgba(250, 204, 21, 0.1)',
                  color: primaryYellow,
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <Zap style={{ width: '0.875rem', height: '0.875rem', fill: 'currentColor' }} className="pulse-icon" /> Direct Circuit Connect
              </span>
            </div>

            <h2 
              className="contact-heading"
              style={{
                fontWeight: 900,
                color: isDark ? '#ffffff' : '#0f172a',
                letterSpacing: '-0.025em',
                lineHeight: 1.25,
                margin: 0
              }}
            >
              Get Your Free <span style={{ color: primaryYellow, filter: isDark ? 'drop-shadow(0 0 12px rgba(250,204,21,0.5))' : 'none' }}>Electrical Quote</span>
            </h2>

            <p 
              className="contact-desc"
              style={{
                color: isDark ? '#94a3b8' : '#475569',
                margin: 0
              }}
            >
              Fast response guaranteed. Speak directly with certified Sydney electricians for transparent pricing and rapid dispatch.
            </p>
          </div>

          <div className="contact-grid">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="left-column"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                <motion.a 
                  href="tel:0424908661"
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="contact-card group"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    backgroundColor: cardBg,
                    border: borderStyle,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(24px)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="card-icon-box" style={{ padding: '1rem', backgroundColor: 'rgba(250, 204, 21, 0.1)', color: primaryYellow, borderRadius: '1rem', flexShrink: 0, transition: 'all 0.2s ease' }}>
                    <Phone style={{ width: '1.5rem', height: '1.5rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', minWidth: 0 }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#64748b' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>24/7 Priority Hotline</p>
                    <p className="card-phone-text" style={{ fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', letterSpacing: '-0.025em', margin: 0 }}>0424 908 661</p>
                  </div>
                </motion.a>

                <motion.a 
                  href="mailto:contact@logictenelectrical.com.au"
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="contact-card group"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    backgroundColor: cardBg,
                    border: borderStyle,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(24px)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="card-icon-box" style={{ padding: '1rem', backgroundColor: 'rgba(250, 204, 21, 0.1)', color: primaryYellow, borderRadius: '1rem', flexShrink: 0, transition: 'all 0.2s ease' }}>
                    <Mail style={{ width: '1.5rem', height: '1.5rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', minWidth: 0 }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#64748b' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Direct Email</p>
                    <p className="card-email-text" style={{ fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
                      contact@logictenelectrical.com.au
                    </p>
                  </div>
                </motion.a>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    backgroundColor: cardBg,
                    border: borderStyle,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(24px)'
                  }}
                >
                  <div style={{ padding: '1rem', backgroundColor: 'rgba(250, 204, 21, 0.1)', color: primaryYellow, borderRadius: '1rem', flexShrink: 0 }}>
                    <MapPin style={{ width: '1.5rem', height: '1.5rem' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', minWidth: 0 }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#64748b' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Service Coverage</p>
                    <p style={{ fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', fontSize: '1rem', margin: 0 }}>Greater Sydney & Surrounds, NSW</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '0.75rem', backgroundColor: isDark ? 'rgba(2, 6, 23, 0.5)' : 'rgba(241, 245, 249, 0.8)', border: isDark ? '1px solid rgba(30, 41, 59, 0.8)' : '1px solid #e2e8f0' }}>
                  <Clock style={{ width: '1.25rem', height: '1.25rem', color: primaryYellow, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#cbd5e1' : '#334155', lineHeight: 1.375 }}>Rapid Response Guaranteed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '0.75rem', backgroundColor: isDark ? 'rgba(2, 6, 23, 0.5)' : 'rgba(241, 245, 249, 0.8)', border: isDark ? '1px solid rgba(30, 41, 59, 0.8)' : '1px solid #e2e8f0' }}>
                  <ShieldCheck style={{ width: '1.25rem', height: '1.25rem', color: primaryYellow, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isDark ? '#cbd5e1' : '#334155', lineHeight: 1.375 }}>Fully Licensed & Insured</span>
                </div>
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="right-column"
              style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
            >
              <div 
                style={{
                  position: 'absolute',
                  inset: '-0.25rem',
                  backgroundImage: 'linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1))',
                  borderRadius: '1.5rem',
                  filter: 'blur(24px)',
                  pointerEvents: 'none'
                }} 
              />

              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className="form-container"
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  borderRadius: '1.5rem',
                  backgroundColor: formBg,
                  border: borderStyle,
                  backdropFilter: 'blur(24px)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  gap: '1.5rem',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: isDark ? '1px solid rgba(30, 41, 59, 0.8)' : '1px solid rgba(226, 232, 240, 0.6)' }}>
                  <div>
                    <h3 className="form-title" style={{ fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: 0 }}>
                      Request Fast Dispatch
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: '0.25rem', margin: 0 }}>
                      Fill in details below for an accurate scope and price estimate.
                    </p>
                  </div>
                  <div style={{ padding: '0.625rem', borderRadius: '0.75rem', backgroundColor: 'rgba(250, 204, 21, 0.1)', color: primaryYellow, flexShrink: 0 }}>
                    <Zap style={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }} className="pulse-icon" />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 900, color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                    1. Select Service Category
                  </label>
                  <div className="service-options-grid">
                    {serviceOptions.map((option) => {
                      const isSelected = serviceType === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setServiceType(option)}
                          style={{
                            paddingTop: '0.625rem',
                            paddingBottom: '0.625rem',
                            paddingLeft: '0.75rem',
                            paddingRight: '0.75rem',
                            fontSize: '0.75rem',
                            fontWeight: 900,
                            borderRadius: '0.75rem',
                            border: isSelected ? '1px solid #facc15' : (isDark ? '1px solid #1e293b' : '1px solid #e2e8f0'),
                            backgroundColor: isSelected ? '#facc15' : (isDark ? 'rgba(2, 6, 23, 0.8)' : 'rgba(241, 245, 249, 0.8)'),
                            color: isSelected ? '#020617' : (isDark ? '#94a3b8' : '#475569'),
                            boxShadow: isSelected ? '0 0 20px rgba(250, 204, 21, 0.35)' : 'none',
                            transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                          }}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  <input type="hidden" name="service_type" value={serviceType} />
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        padding: '2rem',
                        borderRadius: '1rem',
                        backgroundColor: 'rgba(250, 204, 21, 0.1)',
                        border: '1px solid rgba(250, 204, 21, 0.4)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                      }}
                    >
                      <CheckCircle2 style={{ width: '3rem', height: '3rem', color: primaryYellow, margin: '0 auto' }} />
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: 0 }}>Request Sent Successfully</h4>
                      <p style={{ fontSize: '0.875rem', color: isDark ? '#cbd5e1' : '#475569', maxWidth: '24rem', margin: '0 auto', lineHeight: 1.625 }}>
                        Your inquiry has been received. Our team will review your scope of work and contact you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, gap: '1.25rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: 900, color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                            2. Contact Information
                          </label>
                          <div className="input-group-grid">
                            <input 
                              required 
                              name="user_name"
                              type="text" 
                              placeholder="Full Name *" 
                              style={{
                                width: '100%',
                                backgroundColor: inputBg,
                                border: inputBorder,
                                borderRadius: '0.75rem',
                                paddingLeft: '1rem',
                                paddingRight: '1rem',
                                paddingTop: '0.75rem',
                                paddingBottom: '0.75rem',
                                color: isDark ? '#ffffff' : '#0f172a',
                                fontSize: '0.875rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                              }}
                            />
                            <input 
                              required 
                              name="user_contact"
                              type="text" 
                              placeholder="Phone Number or Email *" 
                              style={{
                                width: '100%',
                                backgroundColor: inputBg,
                                border: inputBorder,
                                borderRadius: '0.75rem',
                                paddingLeft: '1rem',
                                paddingRight: '1rem',
                                paddingTop: '0.75rem',
                                paddingBottom: '0.75rem',
                                color: isDark ? '#ffffff' : '#0f172a',
                                fontSize: '0.875rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: 900, color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                            3. Job Scope & Details
                          </label>
                          <textarea 
                            required 
                            name="message"
                            rows={4} 
                            placeholder="Briefly describe what you need done (e.g. switchboard upgrade, LED downlight installation, power outage fix)..." 
                            style={{
                              width: '100%',
                              backgroundColor: inputBg,
                              border: inputBorder,
                              borderRadius: '0.75rem',
                              paddingLeft: '1rem',
                              paddingRight: '1rem',
                              paddingTop: '0.75rem',
                              paddingBottom: '0.75rem',
                              color: isDark ? '#ffffff' : '#0f172a',
                              fontSize: '0.875rem',
                              outline: 'none',
                              resize: 'none',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>

                        {errorMessage && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f43f5e', fontSize: '0.75rem', fontWeight: 700 }}>
                            <AlertCircle style={{ width: '1rem', height: '1rem', flexShrink: 0 }} /> {errorMessage}
                          </div>
                        )}
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit" 
                        style={{
                          width: '100%',
                          backgroundColor: '#facc15',
                          color: '#020617',
                          fontWeight: 900,
                          paddingTop: '1rem',
                          paddingBottom: '1rem',
                          borderRadius: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          boxShadow: '0 10px 15px -3px rgba(234, 179, 8, 0.2)',
                          transition: 'all 0.2s ease',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          opacity: loading ? 0.5 : 1,
                          marginTop: '1rem',
                          border: 'none'
                        }}
                      >
                        {loading ? (
                          <Loader2 style={{ width: '1.25rem', height: '1.25rem' }} className="spin-icon" />
                        ) : (
                          <>
                            <Send style={{ width: '1rem', height: '1rem', fill: '#020617' }} /> Send Quote Request
                          </>
                        )}
                      </motion.button>
                    </div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .pulse-icon {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        .contact-card:hover .card-icon-box {
          background-color: #facc15 !important;
          color: #020617 !important;
        }

        .contact-heading {
          font-size: 1.875rem;
        }

        .contact-desc {
          font-size: 1rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: stretch;
        }

        .card-phone-text {
          font-size: 1.25rem;
        }

        .card-email-text {
          font-size: 0.875rem;
        }

        .form-container {
          padding: 1.5rem;
        }

        .form-title {
          font-size: 1.25rem;
        }

        .service-options-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.5rem;
        }

        .input-group-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .contact-heading {
            font-size: 3rem;
          }
          .contact-desc {
            font-size: 1.125rem;
          }
          .card-phone-text {
            font-size: 1.5rem;
          }
          .card-email-text {
            font-size: 1rem;
          }
          .form-container {
            padding: 2.5rem;
          }
          .form-title {
            font-size: 1.5rem;
          }
          .service-options-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
          .input-group-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: repeat(12, minmax(0, 1fr));
            gap: 3rem;
          }
          .contact-grid > .left-column {
            grid-column: span 5 / span 5;
          }
          .contact-grid > .right-column {
            grid-column: span 7 / span 7;
          }
        }
      `}</style>
    </>
  );
}