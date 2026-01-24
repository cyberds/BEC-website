'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <div className="border-b border-neutral-800 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-5 flex items-center justify-between text-left group"
            >
                <span className={`font-medium transition-colors ${isOpen ? 'text-amber-500' : 'text-white group-hover:text-amber-500'}`}>
                    {question}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-amber-500"
                >
                    <FaChevronDown />
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-gray-400 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Can I upload my own design?",
            answer: "Yes, absolutely! You can upload your finished design in various formats including PNG, PDF, AI, or PSD. If you don't have a design ready, our team can create one for you at no extra cost based on your text and images."
        },
        {
            question: "Can I track the performance of my ad?",
            answer: "Yes, we support performance tracking through QR codes and UTM links. We can add a unique QR code to your design that links to your website, allowing you to measure scans and conversions. UTM parameters help you track traffic in your analytics."
        },
        {
            question: "What if I have an urgent order?",
            answer: "Urgent orders are supported with an urgency fee, depending on the volume and timeline. In some cases, waivers may apply for large orders or repeat customers. Contact us directly via WhatsApp for expedited processing."
        },
        {
            question: "What are the design specifications?",
            answer: "Our boxes have specific printable areas. Once you submit your request, we'll send you the exact dimensions and bleed requirements. For best results, submit high-resolution artwork (300 DPI minimum)."
        },
        {
            question: "Do you deliver outside Lagos?",
            answer: "Currently, our production and free delivery service is limited to Lagos. For orders outside Lagos, please contact us to discuss shipping arrangements and costs."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-neutral-950 relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white flex items-center justify-center gap-3">
                        <FaQuestionCircle className="text-amber-500" />
                        <span>Frequently Asked <span className="text-gradient">Questions</span></span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-neutral-900/50 border border-neutral-800 rounded-2xl px-6 md:px-8"
                >
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
