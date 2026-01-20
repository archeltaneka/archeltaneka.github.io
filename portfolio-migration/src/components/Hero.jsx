import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const { scrollY } = useScroll();

    const textX = useTransform(scrollY, [0, 500], [0, -200]);
    const imageY = useTransform(scrollY, [0, 500], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const name = "ARCHEL TANEKA".split(" ");

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-frost overflow-hidden pt-20">

            {/* Background Parallax Text - Swapped to Lavender tint */}
            <motion.div
                style={{ x: textX, opacity }}
                className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0"
            >
                <h2 className="text-[15vw] font-bold text-lavender/10 leading-none tracking-tighter uppercase select-none">
                    Data Scientist • Data Scientist • Data Scientist
                </h2>
            </motion.div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 text-sky-blue font-mono text-sm tracking-widest uppercase"
                            >
                                <span className="w-12 h-[1px] bg-lavender"></span>
                                Available for Internships Nov 2025
                            </motion.div>

                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-playfair font-bold text-deep-sea leading-[0.9] tracking-tight">
                                {name.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                        className="inline-block"
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                                <span className="text-lavender">.</span>
                            </h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="text-xl md:text-2xl text-deep-sea/70 max-w-xl leading-relaxed font-light"
                        >
                            Turning raw noise into <span className="text-deep-sea font-medium italic underline decoration-lavender/40 decoration-4 underline-offset-4">actionable intelligence</span> through Machine Learning.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 }}
                            className="flex flex-wrap gap-6 items-center"
                        >
                            <a href="#projects" className="group relative px-8 py-4 bg-deep-sea text-frost rounded-full overflow-hidden transition-all duration-300">
                                <span className="relative z-10">View Projects</span>
                                <div className="absolute inset-0 bg-sky-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            </a>
                            <a href="#contact" className="text-deep-sea font-bold tracking-widest text-sm uppercase border-b-2 border-lavender pb-1 hover:text-sky-blue hover:border-sky-blue transition-all">
                                Get In Touch
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        style={{ y: imageY }}
                        className="lg:col-span-5 relative" // Parent must be relative
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                    >
                        {/* Lavender Glow behind image */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-lavender/20 rounded-full blur-3xl animate-pulse"></div>

                        {/* 1. The Container for the Badge (Outside the overflow-hidden div) */}
                        <div className="relative">

                            {/* 2. The Image Wrapper (Keep overflow-hidden here for the rounded corners) */}
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-frost relative z-10">
                                <img
                                    src="https://archeltaneka.github.io/assets/img/profile.jpg"
                                    alt="Archel Taneka"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                                />
                            </div>

                            {/* 3. The Data Badge (Now sibling to the image, so it won't be cut) */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute bottom-8 -left-12 bg-frost p-6 rounded-xl shadow-2xl border border-sky-blue/10 z-20 hidden md:block"
                            >
                                <div className="text-xs font-mono text-sky-blue mb-1 uppercase tracking-tighter font-bold">
                                    Impact Score
                                </div>
                                <div className="text-3xl font-bold text-deep-sea">
                                    +94B <span className="text-xs text-sky-blue/60 font-mono">IDR</span>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>

                </div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="font-mono text-[10px] uppercase tracking-widest text-deep-sea/40">Scroll</span>
                <div className="w-[1px] h-12 bg-lavender/30 relative">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-sky-blue"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;