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
    // PASTE YOUR LOGO LINKS HERE
    const partners = [
        // Ad Partners
        { name: 'Talentta', logo: 'https://placehold.co/200x100?text=Talentta' }, // Replace with Link
        { name: 'Emmviron', logo: 'https://placehold.co/200x100?text=Emmviron' }, // Replace with Link
        { name: 'Aiden', logo: 'https://placehold.co/200x100?text=Aiden' }, // Replace with Link

        // Outlet Partners & Lagos Eateries
        { name: 'JoyceSuperKitchen', logo: 'https://placehold.co/200x100?text=Joyce' }, // Replace with Link
        { name: 'Mega Chicken', logo: 'https://placehold.co/200x100?text=Mega+Chicken' },
        { name: 'The Place', logo: 'https://placehold.co/200x100?text=The+Place' },
        { name: 'Sweet Sensation', logo: 'https://placehold.co/200x100?text=Sweet+Sensation' },
        { name: 'Chicken Republic', logo: 'https://placehold.co/200x100?text=Chicken+Republic' },
        { name: 'Kilimanjaro', logo: 'https://placehold.co/200x100?text=Kilimanjaro' },
        { name: 'Tantalizers', logo: 'https://placehold.co/200x100?text=Tantalizers' },
        { name: 'Tastee Fried Chicken', logo: 'https://placehold.co/200x100?text=Tastee' },
        { name: 'Dominos', logo: 'https://placehold.co/200x100?text=Dominos' },
        { name: 'Cold Stone', logo: 'https://placehold.co/200x100?text=Cold+Stone' },
        { name: 'Yakoyo', logo: 'https://placehold.co/200x100?text=Yakoyo' },
        { name: 'Debonairs', logo: 'https://placehold.co/200x100?text=Debonairs' },
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
                            className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-12 md:h-16 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 flex animate-marquee2 space-x-12 md:space-x-16 items-center whitespace-nowrap" aria-hidden="true">
                    {marqueeList.map((partner, index) => (
                        <div
                            key={`${partner.name}-dup-${index}`}
                            className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-12 md:h-16 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
