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
        { name: 'Talentta', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771532452/download_dztery.jpg' }, // Replace with Link
        { name: 'Emmviron', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771532503/download_zmuj4m.jpg' }, // Replace with Link
        { name: 'Aiden', logo: 'https://placehold.co/200x100/000000/FFFFFF?text=Aiden' }, // Replace with Link

        // Outlet Partners & Lagos Eateries
        { name: 'JoyceSuperKitchen', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771529328/JoyceSuperKitchen_nubzdg.svg' },
        { name: 'Mega Chicken', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771529778/download_revf54.jpg' },
        { name: 'The Place', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771529830/download_mtseji.png' },
        { name: 'Sweet Sensation', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771529992/download_a78wgv.png' },
        { name: 'Chicken Republic', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771530048/download_afxdwm.png' },
        { name: 'Kilimanjaro', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771530356/download_mm5ahm.png' },
        { name: 'Tantalizers', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771530439/download_x7fcqb.png' },
        { name: 'Tastee Fried Chicken', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771530512/download_tjfoed.png' },
        { name: 'Dominos', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771532208/download_xrmoag.png' },
        { name: 'Cold Stone', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771532250/download_dmbglk.png' },
        { name: 'Yakoyo', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771532328/download_iraonn.jpg' },
        { name: 'Debonairs', logo: 'https://res.cloudinary.com/dw7ag9rwt/image/upload/v1771532385/download_jmkfqt.png' },
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
                {/* Single scrolling container for seamless loop */}
                <div className="flex animate-marquee-infinite space-x-12 md:space-x-16 items-center whitespace-nowrap min-w-max hover:[animation-play-state:paused]">
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
            </div>
        </section>
    );
};

export default Partners;
