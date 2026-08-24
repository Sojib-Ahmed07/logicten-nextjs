"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Zap, CheckCircle2, AlertCircle, Loader2, Clock, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [serviceType, setServiceType] = useState('Residential');

  const serviceOptions = ['Residential', 'Commercial', 'Solar & Battery', 'Emergency 24/7'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const SERVICE_ID = 'service_65tepnv';
    const TEMPLATE_ID = 'template_7yx8kk8';
    const PUBLIC_KEY = 'vwV13BT0NFaSoDfp0';

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
      console.log(error);
      setLoading(false);
      setErrorMessage('Failed to send power request. Please call direct!');
    }
  };

  return (
    <section id="contact" className="relative z-10 pt-8 pb-16 lg:pt-12 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Subtle Voltage Grid Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-amber-300 text-xs font-black tracking-widest uppercase backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 fill-current animate-pulse" /> Direct Circuit Connect
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Get Your Free <span className="text-yellow-600 dark:text-amber-300">Electrical Quote</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Fast response guaranteed. Speak directly with certified Sydney electricians for transparent pricing and rapid dispatch.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT COLUMN: Contact Hub Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              {/* Phone Card */}
              <motion.a 
                href="tel:0424908661"
                whileHover={{ scale: 1.01, y: -2 }}
                className="flex items-center gap-5 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-yellow-500/20 shadow-xl backdrop-blur-xl transition-all group"
              >
                <div className="p-4 bg-yellow-500/10 dark:bg-yellow-400/20 text-yellow-600 dark:text-amber-300 rounded-2xl group-hover:bg-yellow-400 group-hover:text-slate-950 transition-colors shadow-inner shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">24/7 Priority Hotline</p>
                  <p className="font-black text-slate-900 dark:text-white text-xl sm:text-2xl tracking-tight">0424 908 661</p>
                </div>
              </motion.a>

              {/* Email Card */}
              <motion.a 
                href="mailto:contact@logictenelectrical.com.au"
                whileHover={{ scale: 1.01, y: -2 }}
                className="flex items-center gap-5 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-yellow-500/20 shadow-xl backdrop-blur-xl transition-all group"
              >
                <div className="p-4 bg-yellow-500/10 dark:bg-yellow-400/20 text-yellow-600 dark:text-amber-300 rounded-2xl group-hover:bg-yellow-400 group-hover:text-slate-950 transition-colors shadow-inner shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Direct Email</p>
                  <p className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base truncate">
                    contact@logictenelectrical.com.au
                  </p>
                </div>
              </motion.a>

              {/* Location Card */}
              <div className="flex items-center gap-5 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-yellow-500/20 shadow-xl backdrop-blur-xl">
                <div className="p-4 bg-yellow-500/10 dark:bg-yellow-400/20 text-yellow-600 dark:text-amber-300 rounded-2xl shadow-inner shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Service Coverage</p>
                  <p className="font-extrabold text-slate-900 dark:text-white text-base">Greater Sydney & Surrounds, NSW</p>
                </div>
              </div>
            </div>

            {/* Trust Badges Container */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100/80 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-amber-300 shrink-0" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-snug">Rapid Response Guaranteed</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100/80 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80">
                <ShieldCheck className="w-5 h-5 text-yellow-600 dark:text-amber-300 shrink-0" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-snug">Fully Licensed & Insured</span>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Modern Form Console */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 relative flex flex-col"
          >
            {/* Ambient Glow behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-amber-500/10 rounded-3xl blur-2xl pointer-events-none" />

            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative h-full flex flex-col justify-between p-6 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-yellow-500/30 backdrop-blur-2xl shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Request Fast Dispatch
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Fill in details below for an accurate scope and price estimate.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-amber-300 shrink-0">
                  <Zap className="w-5 h-5 fill-current animate-pulse" />
                </div>
              </div>

              {/* Service Category Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  1. Select Service Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {serviceOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setServiceType(option)}
                      className={`py-2.5 px-3 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                        serviceType === option
                          ? 'bg-yellow-400 border-yellow-400 text-slate-950 shadow-[0_0_20px_rgba(250,204,21,0.35)] scale-[1.02]'
                          : 'bg-slate-100/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-yellow-500/40'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="service_type" value={serviceType} />
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-8 rounded-2xl bg-yellow-500/10 border border-yellow-500/40 text-center space-y-3 my-auto"
                  >
                    <CheckCircle2 className="w-12 h-12 text-yellow-600 dark:text-amber-300 mx-auto" />
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">Request Sent Successfully</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                      Your inquiry has been received. Our team will review your scope of work and contact you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          2. Contact Information
                        </label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <input 
                              required 
                              name="user_name"
                              type="text" 
                              placeholder="Full Name *" 
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                            />
                          </div>
                          <div>
                            <input 
                              required 
                              name="user_contact"
                              type="text" 
                              placeholder="Phone Number or Email *" 
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          3. Job Scope & Details
                        </label>
                        <textarea 
                          required 
                          name="message"
                          rows="4" 
                          placeholder="Briefly describe what you need done (e.g. switchboard upgrade, LED downlight installation, power outage fix)..." 
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all resize-none"
                        />
                      </div>

                      {errorMessage && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold">
                          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMessage}
                        </div>
                      )}
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      type="submit" 
                      className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 transition-all cursor-pointer disabled:opacity-50 mt-4"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 fill-slate-950" /> Send Quote Request
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
  );
}