'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaTimes, FaSearch, FaCheck } from 'react-icons/fa';
import { lagosLGAs } from '@/utils/lagosLGAs';
import { apiCall } from '@/utils/api';

interface FormData {
    name: string;
    email: string;
    targetLocation: string[];
    advertDesign: File | null;
    advertText: string;
    numBoxes: number;
    website: string;
    whatsapp: string;
}

const AdvertForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        targetLocation: [],
        advertDesign: null,
        advertText: '',
        numBoxes: 50,
        website: '',
        whatsapp: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [locationSearch, setLocationSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowLocationDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredLGAs = lagosLGAs.filter(lga =>
        lga.toLowerCase().includes(locationSearch.toLowerCase())
    );

    const toggleLocation = (lga: string) => {
        setFormData(prev => ({
            ...prev,
            targetLocation: prev.targetLocation.includes(lga)
                ? prev.targetLocation.filter(l => l !== lga)
                : [...prev.targetLocation, lga]
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, advertDesign: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Create form data for submission (without the file for now, just the metadata)
            const submitData = {
                name: formData.name,
                email: formData.email,
                targetLocation: formData.targetLocation,
                advertText: formData.advertText,
                numBoxes: formData.numBoxes,
                website: formData.website,
                whatsapp: formData.whatsapp,
                hasDesignFile: !!formData.advertDesign,
                designFileName: formData.advertDesign?.name || null
            };

            await apiCall('/api/advert-submission', 'POST', submitData);
            setStatus('success');
            setFormData({
                name: '', email: '', targetLocation: [], advertDesign: null,
                advertText: '', numBoxes: 50, website: '', whatsapp: ''
            });
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="submit-advert" className="py-24 bg-black relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[128px]" />

            <div className="max-w-2xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
                        Get Started
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                        Submit Your <span className="text-gradient">Advert</span>
                    </h2>
                    <p className="text-gray-400">No login required. We'll handle the rest.</p>
                </motion.div>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-900/20 border border-emerald-500/30 rounded-3xl p-12 text-center"
                    >
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Submission Received!</h3>
                        <p className="text-gray-400">
                            We'll review your request and contact you via WhatsApp or email shortly.
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 space-y-6"
                    >
                        {/* Name */}
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/50 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                placeholder="Your name or business name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Email *</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-black/50 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Target Location - Multi-select searchable dropdown */}
                        <div ref={dropdownRef} className="relative">
                            <label className="text-sm text-gray-400 mb-2 block">Target Location (Lagos LGAs) *</label>
                            <div
                                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                                className="w-full bg-black/50 border border-neutral-700 rounded-xl px-5 py-4 text-white cursor-pointer focus:outline-none focus:border-amber-500 transition-colors min-h-[56px]"
                            >
                                {formData.targetLocation.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {formData.targetLocation.map(loc => (
                                            <span
                                                key={loc}
                                                className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                            >
                                                {loc}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleLocation(loc);
                                                    }}
                                                    className="hover:text-white"
                                                >
                                                    <FaTimes size={10} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-gray-500">Select target areas...</span>
                                )}
                            </div>

                            {showLocationDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden z-20 max-h-64 overflow-y-auto">
                                    <div className="sticky top-0 bg-neutral-900 p-3 border-b border-neutral-800">
                                        <div className="relative">
                                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input
                                                type="text"
                                                value={locationSearch}
                                                onChange={(e) => setLocationSearch(e.target.value)}
                                                placeholder="Search LGAs..."
                                                className="w-full bg-black/50 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                                            />
                                        </div>
                                    </div>
                                    {filteredLGAs.map(lga => (
                                        <button
                                            key={lga}
                                            type="button"
                                            onClick={() => toggleLocation(lga)}
                                            className={`w-full text-left px-4 py-3 hover:bg-neutral-800 transition-colors flex items-center justify-between ${formData.targetLocation.includes(lga) ? 'bg-amber-500/10' : ''
                                                }`}
                                        >
                                            <span className="text-gray-300">{lga}</span>
                                            {formData.targetLocation.includes(lga) && (
                                                <FaCheck className="text-amber-500" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Advert Design OR Text */}
                        <div className="space-y-4">
                            <label className="text-sm text-gray-400 mb-2 block">Advert Design (upload file OR provide text)</label>

                            {/* File upload */}
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*,.pdf,.ai,.psd"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="advert-file"
                                />
                                <label
                                    htmlFor="advert-file"
                                    className="flex items-center justify-center gap-3 w-full bg-neutral-800/50 border border-dashed border-neutral-600 rounded-xl px-5 py-6 text-gray-400 cursor-pointer hover:border-amber-500 hover:text-amber-500 transition-colors"
                                >
                                    {formData.advertDesign ? (
                                        <span className="text-amber-500">📎 {formData.advertDesign.name}</span>
                                    ) : (
                                        <>
                                            <span>📤</span>
                                            <span>Upload design file (PNG, PDF, AI, PSD)</span>
                                        </>
                                    )}
                                </label>
                            </div>

                            <div className="text-center text-gray-500 text-sm">OR</div>

                            {/* Text description */}
                            <textarea
                                rows={4}
                                value={formData.advertText}
                                onChange={(e) => setFormData({ ...formData, advertText: e.target.value })}
                                className="w-full bg-black/50 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                placeholder="Describe your advert (we offer free design service)"
                            />
                        </div>

                        {/* Number of Boxes */}
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Number of Boxes * (min: 50)</label>
                            <input
                                type="number"
                                required
                                min={50}
                                value={formData.numBoxes}
                                onChange={(e) => setFormData({ ...formData, numBoxes: parseInt(e.target.value) || 50 })}
                                className="w-full bg-black/50 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Website (optional)</label>
                            <input
                                type="url"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="w-full bg-black/50 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                placeholder="https://yourwebsite.com"
                            />
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">WhatsApp Phone Number *</label>
                            <input
                                type="tel"
                                required
                                value={formData.whatsapp}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                className="w-full bg-black/50 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                placeholder="+234..."
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-4 md:sticky md:bottom-0 md:bg-neutral-900/90 md:backdrop-blur md:-mx-8 md:px-8 md:pb-2 md:pt-4 md:border-t md:border-neutral-800">
                            <button
                                type="submit"
                                disabled={status === 'loading' || formData.targetLocation.length === 0}
                                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? (
                                    'Submitting...'
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        Submit Advert Request
                                    </>
                                )}
                            </button>
                            {status === 'error' && (
                                <p className="text-red-400 text-sm text-center mt-2">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </div>
                    </motion.form>
                )}
            </div>
        </section>
    );
};

export default AdvertForm;
