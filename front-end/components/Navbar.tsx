import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 left-0 px-6 py-4">
            <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex justify-between items-center relative">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                    BEC<span className="text-accent">.</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                    {['Home', 'Services', 'Partners', 'Contact'].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-amber-500 transition-colors">
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white text-2xl">
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-40 md:hidden flex flex-col items-center justify-center space-y-8"
                    >
                        {['Home', 'Services', 'Partners', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-300 text-3xl font-bold tracking-tight hover:text-amber-500 transition-colors"
                            >
                                {item}
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
