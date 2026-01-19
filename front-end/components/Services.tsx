import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaPalette, FaBullhorn, FaPrint, FaFilm } from 'react-icons/fa';

const services = [
    {
        title: 'Arts & Craft',
        description: 'Bespoke artworks and creative installations that speak volumes.',
        icon: FaPalette,
        color: 'text-pink-500',
        image: '/images/art_craft.png'
    },
    {
        title: 'Media & Ads',
        description: 'Strategic advertising on billboards, packages, and digital platforms.',
        icon: FaBullhorn,
        color: 'text-blue-500',
        image: '/images/media_ads.png'
    },
    {
        title: 'Graphics Design',
        description: 'Modern, high-impact designs that define your brand identity.',
        icon: FaPalette,
        color: 'text-amber-500',
        image: '/images/graphics_design.png'
    },
    {
        title: 'Printing',
        description: 'Premium quality printing for business and creative projects.',
        icon: FaPrint,
        color: 'text-green-500',
        image: '/images/printing.png'
    }
];

const TiltCard = ({ service, index }: { service: typeof services[0], index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative p-8 rounded-3xl bg-neutral-800/30 border border-neutral-700 hover:border-neutral-500 transition-colors group overflow-hidden cursor-pointer h-[450px]"
        >
            {/* Background Overlay Image */}
            <div
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100"
                style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <div className="relative z-10 flex flex-col h-full justify-end" style={{ transform: "translateZ(50px)" }}>
                <div className="mb-auto">
                    <service.icon className={`text-4xl mb-6 ${service.color} group-hover:scale-110 transition-transform`} />
                    <h3 className="text-2xl font-bold text-white mb-3" style={{ transform: "translateZ(80px)" }}>{service.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed" style={{ transform: "translateZ(60px)" }}>{service.description}</p>
                </div>

                <div className="mt-8">
                    <button className="text-accent font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                        Learn more <span className="ml-2">→</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Services = () => {
    return (
        <section id="services" className="py-24 bg-neutral-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Expertise</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Elevating brand identity through specialized creative services and state-of-the-art production.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
                    {services.map((service, idx) => (
                        <TiltCard key={idx} service={service} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
