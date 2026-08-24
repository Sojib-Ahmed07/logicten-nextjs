"use client";

import { useState, useEffect } from 'react';
import ElectricalBackground from '../components/ElectricalBackground';
import Navbar from '../components/Navbar';
import ServicesSection from '../components/ServiceSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ReviewsSection from '@/components/ReviewsSection';

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`relative min-h-screen font-sans antialiased overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950' 
        : 'bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950'
    }`}>
      
      {/* Background Animated Circuits */}
      <ElectricalBackground isDark={isDark} />

      {/* Non-sticky Header */}
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Changed container layout to flex items-end justify-end */}
        <div className="max-w-7xl mx-auto min-h-[480px] sm:min-h-[600px] rounded-3xl overflow-hidden relative flex items-end justify-end p-6 sm:p-10 border-0 outline-none">
          
          {/* Responsive Background Hero Image */}
          <picture className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Display PC banner on screens 640px and larger */}
            <source media="(min-width: 640px)" srcSet="/hero-banner-pc.png" />
            {/* Default/Mobile banner for screens smaller than 640px */}
            <img 
              src="/hero-banner-mobile.png" 
              alt="Logic Ten Electrical Hero Banner" 
              className="w-full h-full object-cover object-center scale-[1.03]"
            />
          </picture>

          {/* Bottom-Right Single Action Button Overlay */}
          <div className="relative z-10">
            <a 
              href="#contact"
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-2xl shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              Get a Free Quote
            </a>
          </div>

        </div>
      </section>

      <ServicesSection />
      <AboutSection />
      <ReviewsSection/>
      <ContactSection />
      <Footer />
    </div>
  );
}