"use client";

import { useState, useEffect } from "react";
import ElectricalBackground from "../components/ElectricalBackground";
import Navbar from "../components/Navbar";
import ServicesSection from "../components/ServiceSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ReviewsSection from "../components/ReviewsSection";

export default function Home() {
  // Set initial state to false (Light Mode default)
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      <div
        className="home-container"
        style={{
          position: "relative",
          minHeight: "100vh",
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          overflow: "hidden",
          transition: "background-color 300ms, color 300ms",
          backgroundColor: isDark ? "#020617" : "#ffffff",
          color: isDark ? "#f1f5f9" : "#0f172a"
        }}
      >
        {/* Background Animated Circuits */}
        <ElectricalBackground isDark={isDark} />

        {/* Non-sticky Header */}
        <Navbar isDark={isDark} setIsDark={setIsDark} />

        {/* HERO SECTION */}
        <section
          style={{
            position: "relative",
            zIndex: 10,
            paddingTop: "2rem",
            paddingBottom: "4rem",
            paddingLeft: "1rem",
            paddingRight: "1rem"
          }}
        >
          <div
            className="hero-wrapper"
            style={{
              maxWidth: "80rem",
              margin: "0 auto",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              borderRadius: "1.5rem",
              border: "none",
              outline: "none"
            }}
          >
            {/* Responsive Background Hero Image */}
            <picture style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden" }}>
              {/* Display PC banner on screens 640px and larger */}
              <source media="(min-width: 640px)" srcSet="/hero-banner-pc.png" />
              {/* Default/Mobile banner for screens smaller than 640px */}
              <img
                src="/hero-banner-mobile.png"
                alt="Logic Ten Electrical Hero Banner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  transform: "scale(1)"
                }}
              />
            </picture>

            {/* Bottom-Right Single Action Button Overlay */}
            <div style={{ position: "relative", zIndex: 10 }}>
              <a
                href="#contact"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="quote-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isHovered
                    ? "linear-gradient(to right, #fde047, #facc15)"
                    : "linear-gradient(to right, #facc15, #eab308, #f59e0b)",
                  color: "#020617",
                  fontWeight: 900,
                  borderRadius: "1rem",
                  boxShadow: isHovered
                    ? "0 20px 25px -5px rgba(250, 204, 21, 0.4), 0 8px 10px -6px rgba(250, 204, 21, 0.4)"
                    : "0 20px 25px -5px rgba(250, 204, 21, 0.25), 0 8px 10px -6px rgba(250, 204, 21, 0.25)",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  transition: "all 200ms ease",
                  cursor: "pointer",
                  textDecoration: "none"
                }}
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </section>

        {/* Page Sections (passing isDark prop so subcomponents can adjust colors if needed) */}
        <ServicesSection isDark={isDark} />
        <AboutSection isDark={isDark} />
        <ReviewsSection isDark={isDark} />
        <ContactSection isDark={isDark} />
        <Footer isDark={isDark} />
      </div>

      {/* Global & Responsive Styles */}
      <style jsx global>{`
        /* Dynamic Selection Styling */
        ::selection {
          background-color: ${isDark ? "#facc15" : "#facc15"};
          color: #020617;
        }

        .hero-wrapper {
          min-height: 480px;
          padding: 1.5rem;
        }

        .quote-btn {
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
        }

        @media (min-width: 640px) {
          .hero-wrapper {
            min-height: 600px;
            padding: 2.5rem;
          }
          .quote-btn {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}