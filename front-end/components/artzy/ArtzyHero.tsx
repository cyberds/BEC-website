'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const ArtzyHero = () => {
    const heroRef = useRef<HTMLElement>(null);
    const boxBackRef = useRef<HTMLDivElement>(null);
    const boxFrontRef = useRef<HTMLDivElement>(null);
    const strip1Ref = useRef<HTMLDivElement>(null);
    const strip2Ref = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Check for mobile and reduced motion preferences
        const checkMobile = () => setIsMobile(window.innerWidth <= 720);
        const checkMotion = () => setPrefersReducedMotion(
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        );

        checkMobile();
        checkMotion();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Skip animation on mobile or if user prefers reduced motion
        if (isMobile || prefersReducedMotion) {
            // Show final state statically
            if (boxBackRef.current) boxBackRef.current.style.opacity = '0';
            if (boxFrontRef.current) {
                boxFrontRef.current.style.opacity = '1';
                boxFrontRef.current.style.transform = 'translateX(0) scale(1)';
            }
            if (strip1Ref.current) strip1Ref.current.style.opacity = '0';
            if (strip2Ref.current) strip2Ref.current.style.opacity = '1';
            return;
        }

        const hero = heroRef.current;
        const boxBack = boxBackRef.current;
        const boxFront = boxFrontRef.current;
        const strip1 = strip1Ref.current;
        const strip2 = strip2Ref.current;

        if (!hero || !boxBack || !boxFront || !strip1 || !strip2) return;

        // Create main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: '+=200%',
                pin: true,
                scrub: 1,
            }
        });

        // Phase 1: Box back shrinks and moves to center
        tl.to(boxBack, {
            scale: 0.02,
            x: '50%',
            y: '20%',
            duration: 1,
            ease: 'power2.inOut'
        })
            // Fade out strip 1 text
            .to(strip1, {
                opacity: 0,
                duration: 0.5
            }, '<0.5')
            // Phase 2: Swap boxes at center
            .to(boxBack, {
                opacity: 0,
                duration: 0.1
            })
            .set(boxFront, {
                opacity: 1,
                scale: 0.02,
                x: '50%',
                y: '20%'
            })
            // Phase 3: Box front expands and moves to left
            .to(boxFront, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 1,
                ease: 'power2.inOut'
            })
            // Show strip 2 during expansion
            .to(strip2, {
                opacity: 1,
                duration: 0.5
            }, '<0.3');

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [isMobile, prefersReducedMotion]);

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen bg-black overflow-hidden"
        >
            {/* Decorative background gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-black to-purple-900/10" />

            {/* Strip 1 - Initial state (left text, right image) */}
            <div
                ref={strip1Ref}
                className={`absolute inset-0 flex items-center ${isMobile ? 'flex-col justify-center text-center px-6 pt-20' : 'justify-between px-12 lg:px-24'}`}
                style={{ opacity: isMobile || prefersReducedMotion ? 0 : 1 }}
            >
                {/* Left side text */}
                <div className={`z-10 ${isMobile ? 'mb-8' : 'max-w-xl'}`}>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
                        Let&apos;s step you up{' '}
                        <span className="text-gradient">even more.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                        Artzy box — tamper-proof, previewable food packaging that sells your ad.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="#advertise"
                            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25 text-center"
                        >
                            Advertise on Artzy
                        </Link>
                        <Link
                            href="#order"
                            className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all text-center"
                        >
                            Order Artzy Boxes
                        </Link>
                    </div>
                </div>

                {/* Right side - Box back image (desktop only for animation) */}
                {!isMobile && (
                    <div
                        ref={boxBackRef}
                        className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]"
                        style={{ transformOrigin: 'center center' }}
                    >
                        <Image
                            src="/images/food_box back right transparent background.png"
                            alt="Artzy Box Back"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                )}
            </div>

            {/* Strip 2 - Final state (left image, right text) */}
            <div
                ref={strip2Ref}
                className={`absolute inset-0 flex items-center ${isMobile ? 'flex-col justify-center text-center px-6 pt-20' : 'justify-between px-12 lg:px-24'}`}
                style={{ opacity: isMobile || prefersReducedMotion ? 1 : 0 }}
            >
                {/* Left side - Box front image */}
                <div
                    ref={!isMobile ? boxFrontRef : undefined}
                    className={`relative ${isMobile ? 'w-[280px] h-[280px] mb-8' : 'w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]'}`}
                    style={{
                        transformOrigin: 'center center',
                        opacity: isMobile ? 1 : 0
                    }}
                >
                    <Image
                        src="/images/food_box front left transparent background.png"
                        alt="Artzy Box Front"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Right side text */}
                <div className={`z-10 ${isMobile ? '' : 'max-w-xl text-right'}`}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
                        Every Artzy box is a{' '}
                        <span className="text-gradient">mobile billboard</span>{' '}
                        — placing your message directly in customers&apos; hands, eyes, and everyday spaces.
                    </h2>
                    <div className={`flex gap-4 ${isMobile ? 'flex-col' : 'flex-row justify-end'}`}>
                        <Link
                            href="#advertise"
                            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25 text-center"
                        >
                            Advertise on Artzy
                        </Link>
                        <Link
                            href="#order"
                            className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all text-center"
                        >
                            Order Artzy Boxes
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile static view */}
            {isMobile && (
                <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-10 text-center">
                    <h1 className="text-4xl font-black text-white mb-4 leading-tight">
                        Let&apos;s step you up{' '}
                        <span className="text-gradient">even more.</span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Artzy box — tamper-proof, previewable food packaging that sells your ad.
                    </p>
                    <div className="relative w-[280px] h-[280px] mb-6">
                        <Image
                            src="/images/food_box front left transparent background.png"
                            alt="Artzy Box"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <p className="text-sm text-gray-400 mb-6 max-w-xs">
                        Every Artzy box is a mobile billboard — placing your message directly in customers&apos; hands.
                    </p>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <Link
                            href="#advertise"
                            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25 text-center"
                        >
                            Advertise on Artzy
                        </Link>
                        <Link
                            href="#order"
                            className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all text-center"
                        >
                            Order Artzy Boxes
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ArtzyHero;
