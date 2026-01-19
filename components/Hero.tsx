import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const Hero = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
        <section
            id="home"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-screen flex items-center justify-center overflow-hidden bg-black perspective-1000"
        >
            {/* Background 3D Shapes */}
            <motion.div
                style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], [-50, 50]), y: useTransform(mouseYSpring, [-0.5, 0.5], [-50, 50]) }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"
            />
            <motion.div
                style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], [50, -50]), y: useTransform(mouseYSpring, [-0.5, 0.5], [50, -50]) }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"
            />

            {/* 3D Floating Image Card */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative z-10 text-center px-6 max-w-4xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-8 relative"
                    style={{ transform: "translateZ(50px)" }}
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-accent to-pink-500 rounded-3xl blur opacity-20 animate-pulse" />
                    <img
                        src="/images/art_craft.png"
                        alt="Artistic Work"
                        className="rounded-3xl shadow-2xl border border-white/10 w-full max-w-lg mx-auto transform-gpu"
                    />
                </motion.div>

                <motion.h1
                    style={{ transform: "translateZ(100px)" }}
                    className="text-5xl md:text-8xl font-black text-white tracking-tight mb-6"
                >
                    We Create <br />
                    <span className="text-gradient">Masterpieces</span>
                </motion.h1>

                <motion.p
                    style={{ transform: "translateZ(75px)" }}
                    className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Arts, Media, Printing & Advertising. <br />
                    Elevating your brand with premium creativity and precision.
                </motion.p>

                <motion.div
                    style={{ transform: "translateZ(120px)" }}
                >
                    <a href="#contact" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors text-lg shadow-xl">
                        Explore Our World
                    </a>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default Hero;
