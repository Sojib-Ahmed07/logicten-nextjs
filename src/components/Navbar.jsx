"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ShieldCheck, Zap, Sun, Moon } from 'lucide-react';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'About Us', href: '#about' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ isDark: externalIsDark, setIsDark: externalSetIsDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [hoveredMobileItem, setHoveredMobileItem] = useState(null);

  // Internal state fallback if props aren't passed from parent
  const [internalIsDark, setInternalIsDark] = useState(true);

  const isDarkMode = externalIsDark !== undefined ? externalIsDark : internalIsDark;

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    if (externalSetIsDark) {
      externalSetIsDark(nextMode);
    } else {
      setInternalIsDark(nextMode);
    }
  };

  // Synchronize 'dark' class on the HTML root element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Smooth scroll handler
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setActiveTab(targetId);
    setIsOpen(false);

    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <header style={{ position: 'relative', width: '100%', zIndex: 40, paddingTop: '1.5rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div 
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '5.5rem',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            borderRadius: '1.5rem',
            backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            border: isDarkMode ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid #e2e8f0',
            boxShadow: isDarkMode ? '0 0 30px rgba(250, 204, 21, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            backdropFilter: 'blur(40px)',
            transition: 'background-color 300ms, border-color 300ms, box-shadow 300ms'
          }}
        >

          {/* Brand Identity */}
          <motion.a 
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', textDecoration: 'none', color: 'inherit' }}
          >
            {/* Logo Wrapper */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyCenter: 'center', width: '2.75rem', height: '2.75rem', borderRadius: '9999px', overflow: 'hidden', flexShrink: 0 }}>
              <img 
                src="/logo.png" 
                alt="Logic Ten Electrical Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: 0, right: 0, display: 'flex', height: '0.75rem', width: '0.75rem' }}>
                <span className="ping-animation" style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '9999px', backgroundColor: '#facc15', opacity: 0.75 }}></span>
                <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', height: '0.75rem', width: '0.75rem', backgroundColor: '#eab308' }}></span>
              </span>
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.025em', color: isDarkMode ? '#ffffff' : '#0f172a', display: 'block', lineHeight: 1, transition: 'color 300ms' }}>
                <span style={{ color: isDarkMode ? '#4ade80' : '#15803d', filter: isDarkMode ? 'drop-shadow(0 0 10px rgba(34,197,94,0.4))' : 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}>Logic Ten</span>{' '}
                <span style={{ color: isDarkMode ? '#fbbf24' : '#f59e0b' }}>Electrical</span>
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isDarkMode ? '#94a3b8' : '#64748b', display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem', transition: 'color 300ms' }}>
                <ShieldCheck style={{ width: '0.875rem', height: '0.875rem', color: isDarkMode ? '#34d399' : '#10b981' }} /> Lic 497422C
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{ alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', fontWeight: 700, color: isDarkMode ? '#cbd5e1' : '#475569' }}>
            {navItems.map((item) => {
              const isActive = activeTab === item.href;
              const isHovered = hoveredTab === item.name;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  onMouseEnter={() => setHoveredTab(item.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: 'relative',
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    textDecoration: 'none',
                    transition: 'color 200ms',
                    fontWeight: isActive ? 900 : 700,
                    color: isActive 
                      ? (isDarkMode ? '#facc15' : '#eab308') 
                      : (isHovered ? (isDarkMode ? '#facc15' : '#eab308') : (isDarkMode ? '#cbd5e1' : '#475569'))
                  }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '0.125rem',
                        backgroundColor: isDarkMode ? '#facc15' : '#eab308',
                        borderRadius: '9999px',
                        boxShadow: isDarkMode ? '0 0 8px #facc15' : '0 1px 2px rgba(0,0,0,0.1)'
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}

            {/* Theme Toggle Button (Desktop) */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{
                padding: '0.625rem',
                borderRadius: '1rem',
                backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                color: isDarkMode ? '#facc15' : '#eab308',
                cursor: 'pointer',
                transition: 'background-color 200ms, border-color 200ms',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isDarkMode ? <Sun style={{ width: '1.25rem', height: '1.25rem' }} /> : <Moon style={{ width: '1.25rem', height: '1.25rem' }} />}
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="mobile-controls" style={{ alignItems: 'center', gap: '0.5rem' }}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{
                padding: '0.625rem',
                borderRadius: '0.75rem',
                backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                border: isDarkMode ? '1px solid rgba(250, 204, 21, 0.3)' : '1px solid #e2e8f0',
                color: isDarkMode ? '#facc15' : '#eab308',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isDarkMode ? <Sun style={{ width: '1.25rem', height: '1.25rem' }} /> : <Moon style={{ width: '1.25rem', height: '1.25rem' }} />}
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: '0.625rem',
                borderRadius: '0.75rem',
                backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                border: isDarkMode ? '1px solid rgba(250, 204, 21, 0.3)' : '1px solid #e2e8f0',
                color: isDarkMode ? '#facc15' : '#eab308',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isOpen ? <X style={{ width: '1.5rem', height: '1.5rem' }} /> : <Menu style={{ width: '1.5rem', height: '1.5rem' }} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mobile-drawer"
              style={{
                marginTop: '0.75rem',
                maxWidth: '80rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                overflow: 'hidden',
                borderRadius: '1.5rem',
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                border: isDarkMode ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid #e2e8f0',
                padding: '1.5rem',
                backdropFilter: 'blur(40px)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                color: isDarkMode ? '#e2e8f0' : '#1e293b',
                fontWeight: 700
              }}
            >
              {navItems.map((item, idx) => {
                const isHovered = hoveredMobileItem === item.name;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    onMouseEnter={() => setHoveredMobileItem(item.name)}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.75rem',
                      backgroundColor: isHovered ? 'rgba(250, 204, 21, 0.1)' : 'transparent',
                      color: isHovered ? (isDarkMode ? '#facc15' : '#eab308') : 'inherit',
                      textDecoration: 'none',
                      transition: 'all 200ms',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{item.name}</span>
                    <Zap style={{ width: '1rem', height: '1rem', opacity: isHovered ? 1 : 0, color: isDarkMode ? '#facc15' : '#eab308', transition: 'opacity 200ms' }} />
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Bottom-Right Call Button */}
      <motion.a
        href="tel:0424908661"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="call-now-btn"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          background: 'linear-gradient(to right, #facc15, #eab308, #f59e0b)',
          color: '#020617',
          fontWeight: 900,
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          paddingTop: '0.875rem',
          paddingBottom: '0.875rem',
          borderRadius: '9999px',
          boxShadow: '0 10px 25px rgba(250, 204, 21, 0.5)',
          border: '1px solid rgba(253, 224, 71, 0.4)',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 200ms'
        }}
        aria-label="Call Logic Ten Electrical"
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Phone style={{ width: '1.25rem', height: '1.25rem', fill: '#020617' }} />
          <span style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', display: 'flex', height: '0.625rem', width: '0.625rem' }}>
            <span className="ping-animation" style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '9999px', backgroundColor: '#020617', opacity: 0.75 }}></span>
            <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', height: '0.625rem', width: '0.625rem', backgroundColor: '#020617' }}></span>
          </span>
        </div>
        <span className="call-now-text" style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Call Now</span>
      </motion.a>

      {/* Media Query & Keyframe Standard CSS */}
      <style jsx global>{`
        @keyframes custom-ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .ping-animation {
          animation: custom-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .desktop-nav {
          display: none;
        }
        .mobile-controls {
          display: flex;
        }
        .call-now-text {
          display: none;
        }

        @media (min-width: 640px) {
          .call-now-text {
            display: inline;
          }
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }
          .mobile-controls {
            display: none;
          }
          .mobile-drawer {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}