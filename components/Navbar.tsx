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

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-6 right-6 glass rounded-2xl p-6 md:hidden flex flex-col space-y-4 text-center"
                    >
                        {['Home', 'Services', 'Partners', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-200 text-lg py-2 hover:text-amber-500"
                            >
                                {item}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
