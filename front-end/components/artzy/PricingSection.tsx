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

                {/* Pricing cards - Mobile Horizontal Scroll / Desktop Grid */}
                <div className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible pb-8 md:pb-0 gap-4 md:gap-8 px-4 md:px-0 snap-x snap-mandatory hide-scrollbar">
                    {/* Regular Price */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 text-center min-w-[85vw] md:min-w-0 snap-center flex flex-col justify-between"
                    >
                        <div>
                            <div className="text-amber-500 text-4xl mb-4 flex justify-center">
                                <FaTag />
                            </div>
                            <h3 className="text-xl text-gray-400 mb-2">Regular Price</h3>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-white mb-2">
                                ₦600
                            </div>
                            <p className="text-gray-500">per box</p>
                        </div>
                    </motion.div>

                    {/* Sponsored Price */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-3xl p-8 text-center relative min-w-[85vw] md:min-w-0 snap-center flex flex-col justify-between"
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap z-10">
                            Best Value
                        </div>
                        <div>
                            <div className="text-amber-500 text-4xl mb-4 flex justify-center">
                                <FaBoxes />
                            </div>
                            <h3 className="text-xl text-amber-400 mb-2">With Advert Sponsorship</h3>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-white mb-2">
                                ₦200
                            </div>
                            <p className="text-gray-400">per box</p>
                        </div>
                    </motion.div>
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
