'use client';

import { motion } from 'framer-motion';
import { FaChartLine, FaMapMarkedAlt, FaCamera, FaBoxOpen } from 'react-icons/fa';

const AnalyticsFeature = () => {
    const metrics = [
        {
            icon: <FaBoxOpen />,
            label: "Total Distributions",
            desc: "Track exactly how many boxes went out."
        },
        {
            icon: <FaMapMarkedAlt />,
            label: "Location Tracking",
            desc: "Know which locations and restaurants they reached."
        },
        {
            icon: <FaCamera />,
            label: "Photo Evidence",
            desc: "Real-time photo verification of your campaign."
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-neutral-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                    {/* Text / Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 text-center md:text-left"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                            You&apos;re not guessing, <br />
                            <span className="text-gradient">only clear progress.</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                            We provide detailed analytics on how your ad is performing. From distribution numbers to delivery locations, you see everything.
                        </p>

                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-full text-amber-500 font-semibold">
                            <FaChartLine />
                            <span>Transparent Campaign Reports</span>
                        </div>
                    </motion.div>

                    {/* Metrics Grid */}
                    <div className="flex-1 w-full relative">
                        {/* Decorative line */}
                        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-500/50 to-transparent hidden md:block" />

                        <div className="space-y-6">
                            {metrics.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="flex items-start gap-6 bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl relative backdrop-blur-sm hover:border-amber-500/30 transition-colors"
                                >
                                    <div className="w-12 h-12 flex-shrink-0 bg-neutral-800 rounded-xl flex items-center justify-center text-amber-500 text-2xl">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{item.label}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsFeature;
