'use client';

import { motion } from 'framer-motion';
import { FaClipboardList, FaUpload, FaCheckDouble } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            icon: <FaClipboardList />,
            title: "Fill the form",
            description: "Collect basic contact details.",
            detail: "We ask for minimal information to share campaign insights with you."
        },
        {
            number: 2,
            icon: <FaUpload />,
            title: "Submit your advert",
            description: "Upload design OR submit text + images.",
            detail: "Design service included at no extra cost. No signup required."
        },
        {
            number: 3,
            icon: <FaCheckDouble />,
            title: "Done",
            description: "We handle production and distribution.",
            detail: "Photo evidence is shared via WhatsApp or email."
        }
    ];

    return (
        <section id="how-it-works" className="py-16 md:py-24 bg-neutral-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                        Simple Process
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white px-4">
                        How It <span className="text-gradient">Works</span>
                    </h2>
                </motion.div>

                {/* DESKTOP VIEW (>720px) - HORIZONTAL STEPPER */}
                <div className="hidden min-[721px]:flex items-start justify-between relative">
                    {/* Connection line */}
                    <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex-1 text-center relative px-4"
                        >
                            {/* Step circle */}
                            <div className="relative z-10 w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/25">
                                <span className="text-3xl text-white">{step.icon}</span>
                            </div>

                            {/* Step number badge */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-8 h-8 bg-black border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-500 font-bold text-sm z-20">
                                {step.number}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-gray-400 mb-2">{step.description}</p>
                            <p className="text-gray-500 text-sm">{step.detail}</p>
                        </motion.div>
                    ))}
                </div>

                {/* MOBILE VIEW (<=720px) - VERTICAL STACK */}
                <div className="min-[721px]:hidden flex flex-col gap-8 px-4">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex items-start gap-4"
                        >
                            {/* Icon */}
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center relative">
                                <span className="text-lg text-white">{step.icon}</span>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-black border border-amber-500 rounded-full flex items-center justify-center text-amber-500 font-bold text-[10px]">
                                    {step.number}
                                </div>
                            </div>

                            {/* Text */}
                            <div className="text-left">
                                <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                                <p className="text-gray-400 text-sm mb-1">{step.description}</p>
                                <p className="text-gray-500 text-xs">{step.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
