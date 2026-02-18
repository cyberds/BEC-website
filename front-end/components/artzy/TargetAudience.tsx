'use client';

import { motion } from 'framer-motion';
import { FaCheck, FaBan } from 'react-icons/fa';

const TargetAudience = () => {
    return (
        <section className="py-20 bg-black relative border-y border-neutral-900">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                        Our Policy
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white">
                        Who we <span className="text-white">advertise for</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    {/* Allowed */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-emerald-950/10 border border-emerald-900/30 rounded-3xl p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 text-2xl">
                                <FaCheck />
                            </div>
                            <h3 className="text-2xl font-bold text-emerald-400">All Businesses</h3>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            We advertise for brands, startups, services, and products across all sectors looking to reach real customers in their homes and offices.
                        </p>
                    </motion.div>

                    {/* Not Allowed */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-red-950/10 border border-red-900/30 rounded-3xl p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 text-2xl">
                                <FaBan />
                            </div>
                            <h3 className="text-2xl font-bold text-red-400">Except...</h3>
                        </div>
                        <p className="text-gray-300 mb-4">
                            We strictly <span className="text-red-400 font-bold">do not</span> accept advertisements for:
                        </p>
                        <ul className="space-y-3">
                            {['18+ Products', 'Cigarettes & Tobacco', 'Alcohol & Beer', 'Condoms & Adult Products'].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-400">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TargetAudience;
