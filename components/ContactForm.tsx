import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { sendContactMessage } from '@/utils/api';

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await sendContactMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 bg-black relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-900 to-transparent opacity-50 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Let&apos;s Create Magic</h2>
                    <p className="text-xl text-gray-400">Ready to start your next project? Drop us a line.</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900/50 p-8 md:p-12 rounded-3xl border border-neutral-800 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/50 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-black/50 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                        <textarea
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-black/50 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                            placeholder="Tell us about your project..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? (
                            <span>Sending...</span>
                        ) : (
                            <>
                                <span>Send Message</span>
                                <FaPaperPlane className="text-sm" />
                            </>
                        )}
                    </button>

                    {status === 'success' && (
                        <p className="text-green-400 text-center font-medium animate-pulse">Message sent successfully! We&apos;ll be in touch.</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-400 text-center font-medium">Something went wrong. Please try again.</p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
