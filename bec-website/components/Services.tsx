import { motion } from 'framer-motion';
import { FaPalette, FaBullhorn, FaPrint, FaFilm } from 'react-icons/fa';

const services = [
    {
        title: 'Arts & Craft',
        description: 'Bespoke artworks and creative installations that speak volumes.',
        icon: FaPalette,
        color: 'text-pink-500'
    },
    {
        title: 'Media & Ads',
        description: 'Strategic advertising on billboards, packages, and digital platforms.',
        icon: FaBullhorn,
        color: 'text-blue-500'
    },
    {
        title: 'Printing',
        description: 'High-quality printing services for all your business needs.',
        icon: FaPrint,
        color: 'text-green-500'
    },
    {
        title: 'Video & Production',
        description: 'Cinematic video content to tell your brand story.',
        icon: FaFilm,
        color: 'text-amber-500'
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 bg-neutral-900">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Expertise</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">We deliver excellence across multiple creative disciplines.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-3xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-all group"
                        >
                            <service.icon className={`text-4xl mb-6 ${service.color} group-hover:scale-110 transition-transform`} />
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
