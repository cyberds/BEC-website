'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaExclamationTriangle, FaTags, FaCheckCircle, FaShieldAlt, FaPrint } from 'react-icons/fa';

interface CardProps {
    icon: React.ReactNode;
    title: string;
    shortText: string;
    expandedText: string;
    type: 'problem' | 'solution';
}

const ExpandableCard = ({ icon, title, shortText, expandedText, type }: CardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const bgColor = type === 'problem'
        ? 'bg-red-950/30 border-red-900/30 hover:border-red-700/50'
        : 'bg-emerald-950/30 border-emerald-900/30 hover:border-emerald-700/50';

    const iconColor = type === 'problem' ? 'text-red-400' : 'text-emerald-400';

    return (
        <motion.div
            className={`relative p-6 rounded-2xl border ${bgColor} backdrop-blur-sm cursor-pointer transition-all duration-300`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className={`text-3xl mb-4 ${iconColor}`}>
                {icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">
                {shortText}
            </p>

            {/* Expanded content */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="text-gray-300 text-sm mt-4 pt-4 border-t border-white/10">
                    {expandedText}
                </p>
            </motion.div>

            {/* Tap indicator for mobile */}
            <span className="absolute top-4 right-4 text-xs text-gray-500 md:hidden">
                Tap to expand
            </span>
        </motion.div>
    );
};

const ProblemSolution = () => {
    const problems = [
        {
            icon: <FaEye />,
            title: "Hidden Contents",
            shortText: "Customers can't see food before opening.",
            expandedText: "With opaque polythene packaging, customers have no way to verify their order before unsealing it, leading to disappointment and disputes."
        },
        {
            icon: <FaExclamationTriangle />,
            title: "Delivery Mix-ups",
            shortText: "Delivery mix-ups cause complaints and refunds.",
            expandedText: "Without visible order identification, wrong deliveries are common. Each mistake costs you money in refunds and damages customer trust."
        },
        {
            icon: <FaTags />,
            title: "Zero Brand Visibility",
            shortText: "Polythene packaging provides zero brand visibility.",
            expandedText: "Generic packaging is a missed opportunity. Your competitors' logos aren't visible, but neither is yours. Every delivery should reinforce your brand."
        }
    ];

    const solutions = [
        {
            icon: <FaShieldAlt />,
            title: "Tamper-Proof Seal",
            shortText: "Visibly indicates any interference.",
            expandedText: "Our patented seal design shows clear evidence if the package has been opened or tampered with, giving customers peace of mind."
        },
        {
            icon: <FaEye />,
            title: "Transparent Front",
            shortText: "Allows order confirmation at a glance.",
            expandedText: "Customers can verify their order contents without opening the package, reducing disputes and increasing satisfaction."
        },
        {
            icon: <FaPrint />,
            title: "Premium Print Surface",
            shortText: "Turns packaging into advertising inventory.",
            expandedText: "High-quality printable panels showcase your brand or sponsor ads, transforming every delivery into a marketing opportunity."
        }
    ];

    return (
        <section id="problem-solution" className="py-24 bg-neutral-950 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                        Polythene is Old.{' '}
                        <span className="text-gradient">Safer, Smarter Boxes</span>{' '}
                        are the New Standard.
                    </h2>
                </motion.div>

                {/* Two column layout */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Problems Column */}
                    <div>
                        <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                            <FaExclamationTriangle />
                            The Problem
                        </h3>
                        <div className="space-y-4">
                            {problems.map((problem, index) => (
                                <ExpandableCard
                                    key={index}
                                    {...problem}
                                    type="problem"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Solutions Column */}
                    <div>
                        <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                            <FaCheckCircle />
                            The Artzy Solution
                        </h3>
                        <div className="space-y-4">
                            {solutions.map((solution, index) => (
                                <ExpandableCard
                                    key={index}
                                    {...solution}
                                    type="solution"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
