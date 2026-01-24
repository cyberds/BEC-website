'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaMoneyBillWave, FaEye, FaUsers, FaHome, FaTimes } from 'react-icons/fa';
import { apiCall } from '@/utils/api';

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
    const [formData, setFormData] = useState({ email: '', phone: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await apiCall('/api/pricing-request', 'POST', formData);
            setStatus('success');
            setFormData({ email: '', phone: '' });

            // Auto-close after 2 seconds
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 2000);
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                    >
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mx-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-white">Request Pricing</h3>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {status === 'success' ? (
                                <div className="text-center py-8">
                                    <div className="text-5xl mb-4">✅</div>
                                    <p className="text-emerald-400 font-semibold">
                                        Request submitted! We&apos;ll reach out shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-400 mb-1 block">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-black/50 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 mb-1 block">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-black/50 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                            placeholder="+234..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50"
                                    >
                                        {status === 'loading' ? 'Submitting...' : 'Get Pricing Info'}
                                    </button>
                                    {status === 'error' && (
                                        <p className="text-red-400 text-sm text-center">
                                            Something went wrong. Please try again.
                                        </p>
                                    )}
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const AdvertisingSection = () => {
    const [isPricingOpen, setIsPricingOpen] = useState(false);

    const benefits = [
        {
            icon: <FaEye />,
            title: "Guaranteed Viewability",
            description: "Your ad is seen before every meal, ensuring maximum attention."
        },
        {
            icon: <FaHome />,
            title: "Repeated Exposure",
            description: "Boxes travel to offices, homes, and public spaces."
        },
        {
            icon: <FaUsers />,
            title: "Contextual Attention",
            description: "Customers engage during sharing and recommendation moments."
        }
    ];

    return (
        <section id="advertise" className="py-24 bg-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[128px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                        Advertising That Actually Works
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                        Your ad meets the customer{' '}
                        <span className="text-gradient">where they are.</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Every Artzy box is a mobile billboard — placing your message directly in customers&apos; hands, eyes, and everyday spaces.
                    </p>
                </motion.div>

                {/* Benefits */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-colors"
                        >
                            <div className="text-4xl text-amber-500 mb-4 flex justify-center">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                            <p className="text-gray-400">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="#submit-advert"
                        className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25 text-center flex items-center justify-center gap-2"
                    >
                        <FaRocket />
                        Start a campaign
                    </a>
                    <button
                        onClick={() => setIsPricingOpen(true)}
                        className="px-10 py-4 bg-white/10 backdrop-blur border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                        <FaMoneyBillWave />
                        Request pricing
                    </button>
                </motion.div>
            </div>

            {/* Pricing Modal */}
            <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
        </section>
    );
};

export default AdvertisingSection;
