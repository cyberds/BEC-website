import Link from 'next/link';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-neutral-950 py-12 border-t border-neutral-900">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">

                <div className="mb-8 md:mb-0">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                        BEC<span className="text-accent">.</span>
                    </Link>
                    <p className="text-gray-500 text-sm mt-2">© {new Date().getFullYear()} BEC Inc. All rights reserved.</p>
                </div>

                <div className="flex space-x-6 mb-8 md:mb-0">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={24} /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={24} /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={24} /></a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaFacebook size={24} /></a>
                </div>

                <div className="text-gray-500 text-sm">
                    <p>Designed for Excellence.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
