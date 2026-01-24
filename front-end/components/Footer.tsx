import Link from 'next/link';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-neutral-950 py-16 border-t border-neutral-900">
            <div className="max-w-7xl mx-auto px-6">
                {/* Main footer content */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-8 mb-12">

                    {/* Brand section */}
                    <div className="max-w-sm">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white inline-block mb-4">
                            BEC<span className="text-amber-500">.</span>Artz
                        </Link>
                        <p className="text-lg text-gray-300 font-medium mb-2">
                            Safer Packaging, Stronger Brands
                        </p>
                        <p className="text-gray-500 text-sm">
                            Premium tamper-proof food packaging that turns every delivery into advertising inventory.
                        </p>
                    </div>

                    {/* Contact info */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-white font-semibold mb-2">Contact</h4>
                        <a
                            href="mailto:Support@BECArtz.com"
                            className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors"
                        >
                            <FaEnvelope />
                            Support@BECArtz.com
                        </a>
                        <span className="flex items-center gap-2 text-gray-400">
                            <FaMapMarkerAlt />
                            Lagos, Nigeria
                        </span>
                    </div>

                    {/* Social links */}
                    <div className="flex flex-col items-center md:items-end gap-4">
                        <h4 className="text-white font-semibold">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors">
                                <FaFacebook size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} BEC Artz. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-sm">
                        Designed for Excellence.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

