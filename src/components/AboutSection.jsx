"use client";
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, UserCheck } from 'lucide-react';

export default function AboutSection() {
    return (
        <section id="about" className="relative z-10 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Info */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-yellow-600 dark:text-amber-300 text-xs font-black tracking-widest uppercase">
                        About Logic Ten Electrical
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-2 mb-6 leading-tight">
                        Certified Safety & Master Workmanship
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-base sm:text-lg">
                        Logic Ten Electrical Pty Ltd is Sydney&apos;s dedicated electrical team. Managed directly by Director Mohammad Alim, we bring high technical standard safety and precision to energy setups.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-yellow-500/20 shadow-md dark:shadow-[0_0_15px_rgba(250,204,21,0.08)] transition-colors">
                            <span className="text-xs text-slate-500 font-bold uppercase block">Company License</span>
                            <p className="text-yellow-600 dark:text-amber-300 font-black text-xl mt-1">497422C</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md transition-colors">
                            <span className="text-xs text-slate-500 font-bold uppercase block">ABN Registered</span>
                            <p className="text-slate-800 dark:text-slate-200 font-black text-xl mt-1">28 613 872 183</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Interactive Card */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative p-8 sm:p-10 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-yellow-500/30 shadow-xl dark:shadow-[0_0_50px_rgba(250,204,21,0.08)] space-y-6 transition-colors"
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-500/10 dark:bg-yellow-400/20 text-yellow-600 dark:text-amber-300 rounded-2xl">
                            <UserCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Mohammad Alim (Director)</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Directly managing and overseeing technical standard compliance on every project.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-500/10 dark:bg-yellow-400/20 text-yellow-600 dark:text-amber-300 rounded-2xl">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Sydney-Wide Service</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Prompt dispatch across homes, commercial suites, and industrial sites in Sydney.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-500/10 dark:bg-yellow-400/20 text-yellow-600 dark:text-amber-300 rounded-2xl">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Fully Insured & Standard Compliant</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Full compliance with AS/NZS 3000 wiring rules for solar, batteries, and high-load units.</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}