"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, UserCheck } from 'lucide-react';

export default function AboutSection({ isDark }) {
    return (
        <>
            <section 
                id="about" 
                style={{
                    position: 'relative',
                    zIndex: 10,
                    paddingTop: '2rem',
                    paddingBottom: '5rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem'
                }}
            >
                <div 
                    className="about-grid"
                    style={{
                        maxWidth: '80rem',
                        margin: '0 auto',
                        display: 'grid',
                        alignItems: 'center'
                    }}
                >

                    {/* Left Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span 
                            style={{
                                color: isDark ? '#facc15' : '#fbbf24',
                                fontSize: '0.75rem',
                                fontWeight: 900,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                display: 'block'
                            }}
                        >
                            About Logic Ten Electrical
                        </span>
                        <h2 
                            className="about-heading"
                            style={{
                                fontWeight: 900,
                                color: isDark ? '#ffffff' : '#0f172a',
                                marginTop: '0.5rem',
                                marginBottom: '1.5rem',
                                lineHeight: 1.25
                            }}
                        >
                            Certified Safety &{' '}
                            <span 
                                style={{
                                    color: isDark ? '#facc15' : '#fbbf24',
                                    filter: isDark ? 'drop-shadow(0 0 12px rgba(250,204,21,0.5))' : 'none'
                                }}
                            >
                                Master Workmanship
                            </span>
                        </h2>
                        <p 
                            className="about-desc"
                            style={{
                                color: isDark ? '#94a3b8' : '#475569',
                                lineHeight: 1.625,
                                marginBottom: '2rem'
                            }}
                        >
                            Logic Ten Electrical Pty Ltd is Sydney&apos;s dedicated electrical team. Managed directly by a highly experienced licensed electrician, we bring high technical standard safety and precision to energy setups.
                        </p>

                        <div className="license-grid">
                            <div 
                                style={{
                                    padding: '1.25rem',
                                    borderRadius: '1rem',
                                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                                    border: isDark ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid #e2e8f0',
                                    boxShadow: isDark ? '0 0 15px rgba(250, 204, 21, 0.08)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    transition: 'background-color 300ms, border-color 300ms'
                                }}
                            >
                                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>Company License</span>
                                <p style={{ color: isDark ? '#facc15' : '#fbbf24', fontWeight: 900, fontSize: '1.25rem', marginTop: '0.25rem', margin: 0 }}>497422C</p>
                            </div>
                            <div 
                                style={{
                                    padding: '1.25rem',
                                    borderRadius: '1rem',
                                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                                    border: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    transition: 'background-color 300ms, border-color 300ms'
                                }}
                            >
                                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>ABN Registered</span>
                                <p style={{ color: isDark ? '#e2e8f0' : '#1e293b', fontWeight: 900, fontSize: '1.25rem', marginTop: '0.25rem', margin: 0 }}>28 613 872 183</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Interactive Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="right-card"
                        style={{
                            position: 'relative',
                            borderRadius: '1.5rem',
                            backgroundColor: isDark ? '#0f172a' : '#ffffff',
                            backgroundImage: isDark ? 'linear-gradient(to bottom, #0f172a, #020617)' : 'none',
                            border: isDark ? '1px solid rgba(250, 204, 21, 0.3)' : '1px solid #e2e8f0',
                            boxShadow: isDark ? '0 0 50px rgba(250, 204, 21, 0.08)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            transition: 'all 300ms ease'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div 
                                style={{
                                    padding: '0.75rem',
                                    backgroundColor: isDark ? 'rgba(250, 204, 21, 0.2)' : 'rgba(234, 179, 8, 0.1)',
                                    color: isDark ? '#facc15' : '#fbbf24',
                                    borderRadius: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}
                            >
                                <UserCheck style={{ width: '1.5rem', height: '1.5rem' }} />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', fontSize: '1.125rem', margin: 0 }}>Highly Experienced Licensed Electrician</h3>
                                <p style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.875rem', marginTop: '0.25rem', margin: 0 }}>Directly managing and overseeing technical standard compliance on every project.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div 
                                style={{
                                    padding: '0.75rem',
                                    backgroundColor: isDark ? 'rgba(250, 204, 21, 0.2)' : 'rgba(234, 179, 8, 0.1)',
                                    color: isDark ? '#facc15' : '#fbbf24',
                                    borderRadius: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}
                            >
                                <MapPin style={{ width: '1.5rem', height: '1.5rem' }} />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', fontSize: '1.125rem', margin: 0 }}>Sydney-Wide Service</h3>
                                <p style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.875rem', marginTop: '0.25rem', margin: 0 }}>Prompt dispatch across homes, commercial suites, and industrial sites in Sydney.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div 
                                style={{
                                    padding: '0.75rem',
                                    backgroundColor: isDark ? 'rgba(250, 204, 21, 0.2)' : 'rgba(234, 179, 8, 0.1)',
                                    color: isDark ? '#facc15' : '#fbbf24',
                                    borderRadius: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}
                            >
                                <ShieldCheck style={{ width: '1.5rem', height: '1.5rem' }} />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', fontSize: '1.125rem', margin: 0 }}>Fully Insured & Standard Compliant</h3>
                                <p style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.875rem', marginTop: '0.25rem', margin: 0 }}>Full compliance with AS/NZS 3000 wiring rules for solar, batteries, and high-load units.</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* Responsive Scaffolding */}
            <style jsx global>{`
                .about-grid {
                    grid-template-columns: 1fr;
                    gap: 3rem;
                }

                .about-heading {
                    font-size: 1.875rem;
                }

                .about-desc {
                    font-size: 1rem;
                }

                .license-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }

                .right-card {
                    padding: 2rem;
                }

                @media (min-width: 640px) {
                    .about-heading {
                        font-size: 3rem;
                    }
                    .about-desc {
                        font-size: 1.125rem;
                    }
                    .license-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                    .right-card {
                        padding: 2.5rem;
                    }
                }

                @media (min-width: 1024px) {
                    .about-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
            `}</style>
        </>
    );
}