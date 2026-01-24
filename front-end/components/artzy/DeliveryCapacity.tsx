'use client';

import { motion } from 'framer-motion';
import { FaIndustry, FaClock, FaTruck, FaCheckCircle } from 'react-icons/fa';

const DeliveryCapacity = () => {
    const stats = [
        {
            icon: <FaIndustry />,
            value: "2,000",
            label: "boxes/day",
            description: "Maximum production capacity"
        },
        {
            icon: <FaClock />,
            value: "2 days",
            label: "minimum",
            description: "Recommended lead time"
        }
    ];

    const timeline = [
        { step: "Order Confirmed", time: "Day 0" },
        { step: "Production Starts", time: "Day 1" },
        { step: "Quality Check", time: "Day 2" },
        { step: "Delivery", time: "Day 2-3" }
    ];

    return (
        <section id="delivery" className="py-24 bg-neutral-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                        Production & Delivery
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white">
                        Fast & <span className="text-gradient">Reliable</span>
                    </h2>
                </motion.div>

                {/* Stats */}
                <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 text-center"
                        >
                            <div className="text-3xl text-amber-500 mb-4 flex justify-center">
                                {stat.icon}
                            </div>
                            <div className="text-4xl font-black text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-amber-500 font-semibold mb-2">
                                {stat.label}
                            </div>
                            <p className="text-gray-500 text-sm">{stat.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Delivery Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 max-w-2xl mx-auto"
                >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FaTruck className="text-amber-500" />
                        Delivery Timeline
                    </h3>

                    <div className="space-y-4">
                        {timeline.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4"
                            >
                                <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FaCheckCircle className="text-amber-500 text-sm" />
                                </div>
                                <div className="flex-1 flex justify-between items-center">
                                    <span className="text-gray-300">{item.step}</span>
                                    <span className="text-amber-500 font-semibold text-sm">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DeliveryCapacity;
