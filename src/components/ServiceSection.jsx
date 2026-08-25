"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Building2, 
  Factory, 
  Sun, 
  BatteryCharging, 
  Zap, 
  Camera, 
  ShieldAlert, 
  Network 
} from 'lucide-react';

const services = [
  { 
    icon: Home, 
    title: 'Residential new installation', 
    desc: 'Complete home electrical design, wiring, safety switches, and custom architectural lighting.' 
  },
  { 
    icon: Building2, 
    title: 'Commercial new installation', 
    desc: 'Full electrical fit-outs, three-phase power setup, testing & tagging, and compliance.' 
  },
  { 
    icon: Factory, 
    title: 'Industrial Electrical', 
    desc: 'Heavy machinery integration, motor controls, fault detection, and maintenance.' 
  },
  { 
    icon: Sun, 
    title: 'Solar Installations', 
    desc: 'Custom energy design and rooftop panel installations for lower power bills.' 
  },
  { 
    icon: BatteryCharging, 
    title: 'Solar & Battery Storage', 
    desc: 'Battery backup units to store clean power for night-time grid independence.' 
  },
  { 
    icon: Zap, 
    title: 'EV Charger Setup', 
    desc: 'Certified high-speed EV charging stations for residential and commercial hubs.' 
  },
  { 
    icon: Camera, 
    title: 'CCTV Systems', 
    desc: 'High-definition security camera surveillance setups with remote mobile access.' 
  },
  { 
    icon: ShieldAlert, 
    title: 'Alarm Systems', 
    desc: 'Smart intruder alarm installations and motion detection to protect your property.' 
  },
  { 
    icon: Network, 
    title: 'Telecommunication & Data Cabling', 
    desc: 'Structured Cat6/fiber network cabling, patch panels, and high-speed data points.' 
  }
];

export default function ServicesSection({ isDark }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
      <section 
        id="services" 
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '2rem',
          paddingBottom: '4rem',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        }}
        className="services-section"
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          
          {/* Section Title */}
          <div 
            style={{
              textAlign: 'center',
              maxWidth: '48rem',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
            className="title-wrapper"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{
                display: 'inline-block',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.375rem',
                paddingBottom: '0.375rem',
                borderRadius: '9999px',
                border: '1px solid rgba(250, 204, 21, 0.3)',
                backgroundColor: 'rgba(250, 204, 21, 0.1)',
                color: isDark ? '#facc15' : '#fbbf24',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                boxShadow: isDark ? '0 0 12px rgba(250, 204, 21, 0.2)' : '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              Powering Sydney
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontWeight: 900,
                color: isDark ? '#ffffff' : '#0f172a',
                letterSpacing: '-0.025em'
              }}
              className="section-heading"
            >
              High-Voltage & Low-Voltage Expertise
            </motion.h2>
          </div>

          {/* Animated Cards Grid */}
          <div className="services-grid">
            {services.map((item, index) => {
              const Icon = item.icon;
              const isHovered = hoveredCard === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="service-card"
                  style={{
                    position: 'relative',
                    borderRadius: '1.5rem',
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
                    border: isHovered
                      ? '1px solid rgba(250, 204, 21, 0.5)'
                      : (isDark ? '1px solid rgba(30, 41, 59, 0.8)' : '1px solid #e2e8f0'),
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isHovered
                      ? '0 0 25px rgba(250, 204, 21, 0.15)'
                      : (isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'),
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}
                >
                  {/* Warm Filament Radial Backlight */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      borderRadius: '9999px',
                      filter: 'blur(32px)',
                      backgroundColor: isHovered ? 'rgba(250, 204, 21, 0.15)' : 'rgba(250, 204, 21, 0.05)',
                      transition: 'all 300ms ease',
                      pointerEvents: 'none'
                    }}
                    className="card-backlight"
                  />
                  
                  {/* Icon Container */}
                  <div 
                    className="icon-container"
                    style={{
                      flexShrink: 0,
                      borderRadius: '1rem',
                      backgroundColor: isHovered 
                        ? '#facc15' 
                        : (isDark ? 'rgba(30, 41, 59, 0.9)' : '#f1f5f9'),
                      border: isHovered 
                        ? '1px solid #facc15' 
                        : (isDark ? '1px solid rgba(51, 65, 85, 0.6)' : '1px solid #e2e8f0'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHovered 
                        ? '#020617' 
                        : (isDark ? '#facc15' : '#fbbf24'),
                      boxShadow: isHovered ? '0 0 20px rgba(250, 204, 21, 0.6)' : 'none',
                      transition: 'all 300ms ease'
                    }}
                  >
                    <Icon className="service-icon" />
                  </div>
                  
                  {/* Text Content */}
                  <div style={{ flex: 1 }}>
                    <h3 
                      className="card-title"
                      style={{
                        fontWeight: 900,
                        color: isHovered 
                          ? (isDark ? '#facc15' : '#fbbf24') 
                          : (isDark ? '#ffffff' : '#0f172a'),
                        transition: 'color 200ms ease'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="card-desc"
                      style={{
                        color: isDark ? '#94a3b8' : '#475569'
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Responsive Layout Styles */}
      <style jsx global>{`
        .title-wrapper {
          margin-bottom: 2rem;
        }

        .section-heading {
          font-size: 1.5rem;
          margin-top: 0.5rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 0.75rem;
        }

        .service-card {
          padding: 1rem;
          flex-direction: row;
          gap: 1rem;
        }

        .card-backlight {
          width: 6rem;
          height: 6rem;
        }

        .icon-container {
          width: 2.75rem;
          height: 2.75rem;
        }

        .service-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .card-title {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .card-desc {
          font-size: 0.75rem;
          line-height: 1.25;
        }

        @media (min-width: 640px) {
          .services-section {
            padding-bottom: 5rem !important;
          }

          .title-wrapper {
            margin-bottom: 3.5rem;
          }

          .section-heading {
            font-size: 3rem;
            margin-top: 0.75rem;
          }

          .services-grid {
            gap: 2rem;
          }

          .service-card {
            padding: 2rem;
            border-radius: 1.5rem;
            flex-direction: column;
            gap: 0;
          }

          .card-backlight {
            width: 8rem;
            height: 8rem;
          }

          .icon-container {
            width: 3.5rem;
            height: 3.5rem;
            margin-bottom: 1.5rem;
            border-radius: 1rem;
          }

          .service-icon {
            width: 1.75rem;
            height: 1.75rem;
          }

          .card-title {
            font-size: 1.25rem;
            margin-bottom: 0.75rem;
          }

          .card-desc {
            font-size: 0.875rem;
            line-height: 1.625;
          }
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
}