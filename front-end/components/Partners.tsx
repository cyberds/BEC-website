'use client';

import { motion } from 'framer-motion';

const Partners = () => {
    // Placeholder logos/names since we don't have actual SVG logos yet. 
    // Using text for now, can be replaced with Image later.
    const adPartners = [
        { name: 'Talentta', color: 'text-purple-400' },
        { name: 'Emmviron', color: 'text-green-400' },
        { name: 'Aiden', color: 'text-blue-400' }
    ];

    const outletPartners = [
        { name: 'JoyceSuperKitchen', color: 'text-yellow-400' }
    ];

    return (
        <section className="py-12 bg-black border-y border-neutral-900 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-neutral-950/50" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-8">
                    <span className="text-gray-500 font-medium text-sm uppercase tracking-widest">
                        Trusted By
                    </span>
                </div>

                <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-opacity duration-300">
                    {/* Ad Partners */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {adPartners.map((partner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`text-2xl md:text-3xl font-bold ${partner.color} flex items-center gap-2`}
                            >
                                {/* Placeholder Icon */}
                                <div className="w-8 h-8 rounded-full bg-current opacity-20" />
                                {partner.name}
                            </motion.div>
                        ))}
                    </div>

                    {/* Divider for mobile/desktop distinction if needed, or just spacing */}
                    <div className="hidden md:block w-px h-12 bg-neutral-800" />

                    {/* Outlet Partners */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {outletPartners.map((partner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className={`text-2xl md:text-3xl font-bold ${partner.color} flex items-center gap-2`}
                            >
                                <div className="w-8 h-8 rounded-full bg-current opacity-20" />
                                {partner.name}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
