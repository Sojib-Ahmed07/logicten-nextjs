"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ShieldCheck, Zap, Sun, Moon } from 'lucide-react';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ isDark: externalIsDark, setIsDark: externalSetIsDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

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
      <header className="relative w-full z-40 pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-22 px-6 sm:px-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-amber-500/20 shadow-md dark:shadow-[0_0_30px_rgba(245,158,11,0.1)] backdrop-blur-2xl transition-colors duration-300">

          {/* Brand Identity */}
          <motion.a 
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3.5 group"
          >
            {/* Logo Wrapper */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full overflow-hidden shrink-0">
              <img 
                src="/logo.png" 
                alt="Logic Ten Electrical Logo" 
                className="w-full h-full object-cover"
              />
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>
            <div>
  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white block leading-none transition-colors">
    <span className="text-green-700 dark:text-green-400 drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">Logic Ten</span> <span className="text-amber-500 dark:text-amber-400">Electrical</span>
  </span>
  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 transition-colors">
    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Lic 497422C
  </span>
</div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-slate-600 dark:text-slate-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.href;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive ? 'text-amber-500 dark:text-amber-400 font-black' : 'hover:text-amber-500 dark:hover:text-amber-400'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 dark:bg-amber-400 rounded-full shadow-sm dark:shadow-[0_0_8px_#f59e0b]"
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
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-500 dark:text-amber-400 shadow-inner cursor-pointer transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-amber-500/30 text-amber-500 dark:text-amber-400 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-amber-500/30 text-amber-500 dark:text-amber-400 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="md:hidden mt-3 max-w-7xl mx-auto overflow-hidden rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-amber-500/20 p-6 backdrop-blur-2xl shadow-xl dark:shadow-2xl flex flex-col gap-4 text-slate-800 dark:text-slate-200 font-bold transition-colors"
            >
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-2 px-3 rounded-xl hover:bg-amber-500/10 hover:text-amber-500 dark:hover:text-amber-400 transition-all flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <Zap className="w-4 h-4 opacity-0 hover:opacity-100 text-amber-500 dark:text-amber-400" />
                </motion.a>
              ))}
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
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black px-5 py-3.5 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.5)] border border-amber-300/40 backdrop-blur-md cursor-pointer"
        aria-label="Call Logic Ten Electrical"
      >
        <div className="relative flex items-center justify-center">
          <Phone className="w-5 h-5 fill-slate-950" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
          </span>
        </div>
        <span className="hidden sm:inline text-sm font-extrabold tracking-wide uppercase">Call Now</span>
      </motion.a>
    </>
  );
}