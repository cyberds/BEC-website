import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 left-0 px-6 py-4">
            <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex justify-between items-center relative">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white z-50 relative">
                    BEC<span className="text-accent">.</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                    {[
                        { name: 'Home', href: '#hero' },
                        { name: 'Why Artzy?', href: '#problem-solution' },
                        { name: 'How It Works', href: '#how-it-works' },
                        { name: 'Pricing', href: '#pricing' },
                        { name: 'Contact', href: '#submit-advert' }
                    ].map((item) => (
                        <Link key={item.name} href={item.href} className="hover:text-amber-500 transition-colors">
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden text-white text-3xl p-2 z-50 relative focus:outline-none active:scale-95 transition-transform"
                    aria-label="Open Menu"
                >
                    <HiMenu />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[60] md:hidden flex flex-col items-center justify-center space-y-8"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-white text-4xl p-4 focus:outline-none active:scale-90 transition-transform bg-white/10 rounded-full"
                            aria-label="Close Menu"
                        >
                            <HiX />
                        </button>

                        {[
                            { name: 'Home', href: '#hero' },
                            { name: 'The Problem', href: '#problem-solution' },
                            { name: 'The Solution', href: '#problem-solution' }, // Or omit if redundant
                            { name: 'How It Works', href: '#how-it-works' },
                            { name: 'Pricing', href: '#pricing' },
                            { name: 'Start Campaign', href: '#submit-advert' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-300 text-3xl font-bold tracking-tight hover:text-amber-500 transition-colors active:scale-95 duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="absolute bottom-10 text-sm text-gray-500">
                            BEC Artz &copy; {new Date().getFullYear()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
