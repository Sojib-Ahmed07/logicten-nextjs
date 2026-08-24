
import { motion } from 'framer-motion';
import { Home, Building2, Factory, Sun, BatteryCharging, Zap } from 'lucide-react';

const services = [
  { icon: Home, title: 'Residential Electrical', desc: 'Rewiring, safety switches, powerboards, and custom architectural lighting.' },
  { icon: Building2, title: 'Commercial Electrical', desc: 'Fit-outs, three-phase power, testing & tagging, and safety compliance.' },
  { icon: Factory, title: 'Industrial Electrical', desc: 'Heavy machinery integration, motor controls, fault detection, and maintenance.' },
  { icon: Sun, title: 'Solar Installations', desc: 'Custom energy design and rooftop panel installations for lower power bills.' },
  { icon: BatteryCharging, title: 'Solar & Battery Storage', desc: 'Battery backup units to store clean power for night-time grid independence.' },
  { icon: Zap, title: 'EV Charger Setup', desc: 'Certified high-speed EV charging stations for residential and commercial hubs.' }
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative z-10 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-400/10 text-yellow-600 dark:text-amber-300 font-extrabold text-xs tracking-widest uppercase shadow-sm dark:shadow-[0_0_12px_rgba(250,204,21,0.2)]"
          >
            Powering Sydney
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-3 tracking-tight"
          >
            High-Voltage & Low-Voltage Expertise
          </motion.h2>
        </div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 hover:border-yellow-400/50 transition-all duration-300 shadow-md dark:shadow-xl hover:shadow-[0_0_25px_rgba(250,204,21,0.15)] overflow-hidden"
              >
                {/* Warm Warm-Bulb Filament Radial Backlight */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/15 transition-all duration-300" />
                
                {/* Icon Container with Warm Yellow Accents */}
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-amber-500 dark:text-yellow-400 group-hover:bg-yellow-400 group-hover:text-slate-950 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] transition-all duration-300 mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-amber-500 dark:group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}