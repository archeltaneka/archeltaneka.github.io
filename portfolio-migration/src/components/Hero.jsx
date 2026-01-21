import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const Hero = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Easter Egg Cursor Tracking
    const maskX = useMotionValue(-100);
    const maskY = useMotionValue(-100);
    const springX = useSpring(maskX, { damping: 20, stiffness: 200 });
    const springY = useSpring(maskY, { damping: 20, stiffness: 200 });
    const [isHoveringName, setIsHoveringName] = useState(false);

    const handleNameMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        maskX.set(e.clientX - rect.left);
        maskY.set(e.clientY - rect.top);
    };

    // This creates the masking string for the CSS clip-path
    const clipPath = useTransform(
        [springX, springY],
        ([x, y]) => `circle(${isHoveringName ? '100px' : '0px'} at ${x}px ${y}px)`
    );
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-deep-sea via-deep-sea/95 to-sky-blue/20 overflow-hidden pb-32">

            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(101, 148, 177, 0.4) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(101, 148, 177, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                }}></div>
            </div>

            {/* Gradient Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 right-20 w-96 h-96 bg-lavender/30 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.15, 0.3, 0.15]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-20 left-20 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl"
            />

            {/* Scrolling Text Background */}
            <div className="absolute top-1/3 left-0 w-full pointer-events-none overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 25,
                        repeatType: "loop"
                    }}
                >
                    <h2 className="text-[12vw] font-black text-frost/5 leading-none tracking-tighter uppercase select-none pr-10">
                        DATA SCIENTIST • MACHINE LEARNING • DATA SCIENTIST • MACHINE LEARNING •
                    </h2>
                    <h2 className="text-[12vw] font-black text-frost/5 leading-none tracking-tighter uppercase select-none pr-10">
                        DATA SCIENTIST • MACHINE LEARNING • DATA SCIENTIST • MACHINE LEARNING •
                    </h2>
                </motion.div>
            </div>

            <motion.div
                style={{ opacity }}
                className="container mx-auto px-6 lg:px-12 relative z-10 pt-20 pb-20"
            >
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        className="space-y-8 lg:space-y-12"
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 bg-frost/10 backdrop-blur-md border border-frost/20 rounded-full px-6 py-3"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lavender opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-lavender"></span>
                            </span>
                            <span className="text-frost font-mono text-sm tracking-wide uppercase">
                                Available for Internships Nov 2025
                            </span>
                        </motion.div>

                        {/* Name */}
                        <div
                            className="relative cursor-none group"
                            onMouseMove={handleNameMouseMove}
                            onMouseEnter={() => setIsHoveringName(true)}
                            onMouseLeave={() => setIsHoveringName(false)}
                        >
                            {/* Base Layer: English Name */}
                            <div className="space-y-2">
                                <motion.h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-frost leading-[0.9] tracking-tighter">
                                    ARCHEL
                                </motion.h1>
                                <motion.h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter bg-gradient-to-r from-lavender via-sky-blue to-lavender bg-clip-text text-transparent">
                                    TANEKA
                                </motion.h1>
                            </div>

                            {/* Chinese Name masking */}
                            <motion.div
                                style={{ clipPath }}
                                className="absolute inset-0 space-y-2 pointer-events-none select-none bg-deep-sea z-20"
                            >
                                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-lavender leading-[0.9] tracking-widest">
                                    陈
                                </h1>
                                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-widest text-sky-blue">
                                    文金
                                </h1>
                            </motion.div>
                        </div>

                        {/* Tagline */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-4"
                        >
                            <p className="text-xl lg:text-2xl text-frost/80 font-light max-w-lg leading-relaxed">
                                Transforming <span className="text-frost font-semibold">raw data</span> into
                                <span className="relative inline-block ml-2">
                                    <span className="relative z-10 text-frost font-semibold">strategic insights</span>
                                    <span className="absolute bottom-1 left-0 w-full h-3 bg-lavender/40 -rotate-1"></span>
                                </span>
                                <br />through Machine Learning
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-4 items-center"
                        >
                            <a
                                href="#projects"
                                className="group relative px-8 py-4 bg-frost text-deep-sea rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-lavender/50"
                            >
                                <span className="relative z-10">Explore Work</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-lavender to-sky-blue"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </a>

                            <a
                                href="#contact"
                                className="group flex items-center gap-2 px-8 py-4 border-2 border-frost/30 text-frost rounded-full font-bold text-lg hover:border-lavender hover:bg-frost/5 transition-all"
                            >
                                <span>Contact Me</span>
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="grid grid-cols-3 gap-8 pt-8 border-t border-frost/20"
                        >
                            <div>
                                <div className="text-3xl lg:text-4xl font-black text-frost">5+</div>
                                <div className="text-sm text-frost/60 uppercase tracking-wider font-mono mt-1">Projects</div>
                            </div>
                            <div>
                                <div className="text-3xl lg:text-4xl font-black text-frost">94B</div>
                                <div className="text-sm text-frost/60 uppercase tracking-wider font-mono mt-1">IDR Impact</div>
                            </div>
                            <div>
                                <div className="text-3xl lg:text-4xl font-black text-frost">ML & DS</div>
                                <div className="text-sm text-frost/60 uppercase tracking-wider font-mono mt-1">Focused</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="relative lg:block hidden pb-16"
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-lavender/40 via-transparent to-sky-blue/40 rounded-3xl blur-3xl"></div>

                        {/* Image Container */}
                        <div className="relative">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-frost/20 shadow-2xl">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    src="https://archeltaneka.github.io/assets/img/profile.jpg"
                                    alt="Archel Taneka"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 5,
                                    ease: "easeInOut"
                                }}
                                className="absolute -bottom-8 -left-8 bg-gradient-to-br from-lavender to-sky-blue p-6 rounded-2xl shadow-2xl border border-frost/20"
                            >
                                <div className="text-deep-sea font-mono text-xs uppercase tracking-wider mb-1 font-bold">
                                    Portfolio Impact
                                </div>
                                <div className="text-4xl font-black text-deep-sea flex items-baseline gap-2">
                                    94B
                                    <span className="text-sm font-mono text-deep-sea/80">IDR</span>
                                </div>
                            </motion.div>

                            {/* Corner Accent */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-lavender rounded-tr-3xl"></div>
                        </div>
                    </motion.div>

                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-frost/50 text-xs uppercase tracking-widest font-mono">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-6 h-10 border-2 border-frost/30 rounded-full flex justify-center pt-2"
                >
                    <motion.div className="w-1.5 h-2 bg-lavender rounded-full" />
                </motion.div>
            </motion.div>

        </section>
    );
};

export default Hero;