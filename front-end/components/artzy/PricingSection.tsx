'use client';

import { motion } from 'framer-motion';
import { FaTag, FaTruck, FaBoxes } from 'react-icons/fa';

const PricingSection = () => {
    return (
        <section id="pricing" className="py-16 md:py-24 bg-black relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                        Pricing
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white px-4">
                        Simple & <span className="text-gradient">Fair</span>
                    </h2>
                </motion.div>

                {/* DESKTOP VIEW (>720px) - STRICT GRID */}
                <div className="hidden min-[721px]:grid grid-cols-3 gap-6">
                    {/* Sides */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 text-center flex flex-col justify-between hover:border-neutral-700 transition-colors"
                    >
                        <div>
                            <div className="text-amber-500 text-3xl mb-4 flex justify-center">
                                <FaBoxes />
                            </div>
                            <h3 className="text-xl text-gray-400 mb-2">Sides Only</h3>
                            <p className="text-sm text-gray-500 mb-6">Create awareness from every angle</p>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-white mb-2">
                                ₦500
                            </div>
                            <p className="text-gray-500">each side</p>
                        </div>
                    </motion.div>

                    {/* Back - Highlighted */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-b from-neutral-800 to-neutral-900 border border-amber-500/30 rounded-3xl p-8 text-center flex flex-col justify-between relative transform scale-105 shadow-xl shadow-black/50 z-10"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-bold px-4 py-1 rounded-b-xl text-sm">
                            Popular
                        </div>
                        <div>
                            <div className="text-amber-500 text-4xl mb-4 flex justify-center mt-4">
                                <FaTag />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Back Panel</h3>
                            <p className="text-sm text-gray-400 mb-6">Maximum visibility as they eat</p>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-white mb-2">
                                ₦800
                            </div>
                            <p className="text-gray-400">per box</p>
                        </div>
                    </motion.div>

                    {/* Full Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 text-center flex flex-col justify-between hover:border-neutral-700 transition-colors"
                    >
                        <div>
                            <div className="text-emerald-500 text-3xl mb-4 flex justify-center">
                                <FaTruck />
                            </div>
                            <h3 className="text-xl text-gray-400 mb-2">Full Box</h3>
                            <p className="text-sm text-gray-500 mb-6">Total brand domination</p>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-white mb-2">
                                ₦1,500
                            </div>
                            <p className="text-gray-500">per box</p>
                        </div>
                    </motion.div>
                </div>

                {/* MOBILE VIEW (<=720px) - VERTICAL STACK */}
                <div className="min-[721px]:hidden flex flex-col gap-6 px-4">
                    {/* Back - Highlighted first on mobile */}
                    <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 border border-amber-500/30 rounded-3xl p-8 text-center relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap z-10">
                            Most Popular
                        </div>
                        <div className="text-amber-500 text-3xl mb-4 flex justify-center">
                            <FaTag />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">Back Panel</h3>
                        <p className="text-sm text-gray-400 mb-4">Maximum visibility</p>
                        <div className="text-4xl font-black text-white mb-1">
                            ₦800
                        </div>
                        <p className="text-sm text-gray-400">per box</p>
                    </div>

                    {/* Sides */}
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 text-center">
                        <div className="text-amber-500 text-3xl mb-4 flex justify-center">
                            <FaBoxes />
                        </div>
                        <h3 className="text-lg text-gray-400 mb-1">Sides Only</h3>
                        <div className="text-4xl font-black text-white mb-1">
                            ₦500
                        </div>
                        <p className="text-sm text-gray-500">each side</p>
                    </div>

                    {/* Full Box */}
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 text-center">
                        <div className="text-emerald-500 text-3xl mb-4 flex justify-center">
                            <FaTruck />
                        </div>
                        <h3 className="text-lg text-gray-400 mb-1">Full Box</h3>
                        <div className="text-4xl font-black text-white mb-1">
                            ₦1,500
                        </div>
                        <p className="text-sm text-gray-500">complete branding</p>
                    </div>
                </div>

                {/* Conditions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-6"
                >
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FaTruck className="text-amber-500" />
                        Conditions
                    </h4>
                    <ul className="space-y-3 text-gray-400">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                            Minimum order: <span className="text-white font-semibold">50 boxes</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                            Free Lagos delivery: orders of <span className="text-white font-semibold">500+ boxes</span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;
