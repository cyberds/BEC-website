'use client';

import { motion } from 'framer-motion';

// Mock Logo Component (Replace with actual <img> tags later if available)
const LogoPlaceholder = ({ name, color }: { name: string, color: string }) => (
    <div className={`flex items-center justify-center bg-neutral-900/50 border border-neutral-800 rounded-xl px-6 py-3 min-w-[140px] h-[70px] ${color} backdrop-blur-sm`}>
        {/* Simulating a logo with text for now as per instructions to "use name like that" */}
        <span className="font-bold text-lg md:text-xl whitespace-nowrap">{name}</span>
    </div>
);

const Partners = () => {
    const partners = [
        // Ad Partners (Real Logos)
        { name: 'Talentta', logo: '/logos/talentta.png' },
        { name: 'Emmviron', logo: '/logos/emmviron.png' },
        { name: 'Aiden', logo: '/logos/aiden.png' },

        // Outlet Partners & Lagos Eateries
        { name: 'JoyceSuperKitchen', logo: '/logos/joyce.png' },
        { name: 'Mega Chicken', logo: '/logos/megachicken.png' },
        { name: 'The Place', logo: '/logos/theplace.png' },
        { name: 'Sweet Sensation', logo: '/logos/sweet_sensation.png' },
        { name: 'Chicken Republic', logo: '/logos/chicken_republic.png' },
        { name: 'Kilimanjaro', logo: '/logos/kilimanjaro.png' },
        { name: 'Tantalizers', logo: '/logos/tantalizers.png' },
        { name: 'Tastee Fried Chicken', logo: '/logos/tastee.png' },
        { name: 'Dominos', logo: '/logos/dominos.png' },
        { name: 'Cold Stone', logo: '/logos/coldstone.png' },
        { name: 'Yakoyo', logo: '/logos/yakoyo.png' },
        { name: 'Debonairs', logo: '/logos/debonairs.png' },
    ];

    // Duplicate list multiple times for smoother seamless loop on wide screens
    // We duplicate it 4 times to ensure enough buffer for 4k screens
    const marqueeList = [...partners, ...partners, ...partners, ...partners];

    return (
        <section className="py-20 bg-black border-t border-neutral-800 relative overflow-hidden">
            {/* Gradient Overlays for Fade Effect */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            <div className="text-center mb-12 relative z-10">
                <p className="text-gray-500 text-sm md:text-base uppercase tracking-[0.2em] font-medium">
                    Trusted By Top Brands & Eateries
                </p>
            </div>

            <div className="relative flex overflow-hidden group">
                <div className="flex animate-marquee space-x-12 md:space-x-16 items-center whitespace-nowrap">
                    {marqueeList.map((partner, index) => (
                        <div
                            key={`${partner.name}-${index}`}
                            className="flex-shrink-0 opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-105 cursor-default grayscale hover:grayscale-0"
                        >
                            {partner.logo ? (
                                <div className="bg-white p-2 rounded-xl h-14 md:h-20 flex items-center justify-center min-w-[120px] shadow-sm">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            ) : (
                                <div className={`flex items-center justify-center bg-neutral-900/50 border border-neutral-800 rounded-xl px-6 py-3 min-w-[140px] h-[70px] ${partner.color} backdrop-blur-sm`}>
                                    <span className="font-bold text-lg md:text-xl whitespace-nowrap">{partner.name}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 flex animate-marquee2 space-x-12 md:space-x-16 items-center whitespace-nowrap" aria-hidden="true">
                    {marqueeList.map((partner, index) => (
                        <div
                            key={`${partner.name}-dup-${index}`}
                            className="flex-shrink-0 opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-105 cursor-default grayscale hover:grayscale-0"
                        >
                            {partner.logo ? (
                                <div className="bg-white p-2 rounded-xl h-14 md:h-20 flex items-center justify-center min-w-[120px] shadow-sm">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            ) : (
                                <div className={`flex items-center justify-center bg-neutral-900/50 border border-neutral-800 rounded-xl px-6 py-3 min-w-[140px] h-[70px] ${partner.color} backdrop-blur-sm`}>
                                    <span className="font-bold text-lg md:text-xl whitespace-nowrap">{partner.name}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
