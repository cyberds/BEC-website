import Link from 'next/link';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
    ];

    return (
        <footer className="bg-neutral-950 pt-20 pb-10 border-t border-neutral-900 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="text-center md:text-left space-y-4">
                        <Link href="/" className="text-3xl font-black tracking-tighter text-white inline-block">
                            BEC<span className="text-amber-500">.</span>Artz
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            Transforming food packaging into powerful advertising assets. Safer delivery, stronger brand visibility.
                        </p>
                    </div>

                    {/* Contact Column */}
                    <div className="text-center md:text-left space-y-4">
                        <h4 className="text-white font-bold text-lg">Contact Us</h4>
                        <div className="flex flex-col gap-3 items-center md:items-start text-neutral-400 text-sm">
                            <a href="mailto:Support@BECArtz.com" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                                <FaEnvelope className="text-amber-500" />
                                Support@BECArtz.com
                            </a>
                            <div className="flex items-start gap-2 text-center md:text-left">
                                <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" />
                                <span>
                                    No 17 Alh Lasisi Street,<br />
                                    Eleyin Ikola, Lagos
                                </span>
                            </div>
                            <a href="https://wa.me/2348084493832" className="flex items-center gap-2 hover:text-green-500 transition-colors">
                                <FaWhatsapp className="text-green-500" />
                                +234 808 449 3832
                            </a>
                        </div>
                    </div>

                    {/* Socials & Newsletter Column */}
                    <div className="text-center md:text-right space-y-6">
                        <h4 className="text-white font-bold text-lg">Connect</h4>
                        <div className="flex justify-center md:justify-end gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-neutral-800 hover:text-white hover:border-amber-500/50 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neutral-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
                    <p>
                        &copy; {currentYear} BEC Artz. An <span className="text-neutral-400 font-medium">ArtizanSquare</span> company.
                    </p>
                    <div className="flex gap-6">
                        <span className="hover:text-neutral-400 cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-neutral-400 cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

