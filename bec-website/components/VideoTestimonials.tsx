import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const testimonials = [
    {
        name: "John Does",
        company: "Tech Giant",
        thumbnail: "bg-red-500", // placeholder color
    },
    {
        name: "Jane Smith",
        company: "Creative Studio",
        thumbnail: "bg-blue-500",
    },
    {
        name: "Mike Johnson",
        company: "Marketing Pro",
        thumbnail: "bg-green-500",
    }
];

const VideoTestimonials = () => {
    return (
        <section id="testimonials" className="py-24 bg-neutral-900 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Client Stories</h2>
                    <p className="text-gray-400">See what our partners have to say about working with us.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer"
                        >
                            {/* Thumbnail Placeholder */}
                            <div className={`absolute inset-0 ${item.thumbnail} opacity-80 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-gray-800 to-gray-900`} />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <FaPlay className="text-white ml-1" />
                                </div>
                            </div>

                            {/* Text Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className="font-bold text-white text-lg">{item.name}</h3>
                                <p className="text-sm text-gray-300">{item.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoTestimonials;
