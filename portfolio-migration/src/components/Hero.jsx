import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const { scrollY } = useScroll();
    const imageY = useTransform(scrollY, [0, 500], [0, 150]);
    const textY = useTransform(scrollY, [0, 500], [0, -50]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isRevealed, setIsRevealed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-deep-sea via-deep-sea/95 to-sky-blue/20 overflow-hidden pb-20 md:pb-32">

            {/* Background Animations */}
            <div className="absolute inset-0 opacity-10 hidden md:block">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(101, 148, 177, 0.4) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(101, 148, 177, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                }}></div>
            </div>

            <div className="absolute top-1/4 md:top-1/3 left-0 w-full pointer-events-none overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 25, repeatType: "loop" }}
                >
                    <h2 className="text-7xl md:text-[12vw] font-black text-frost/5 leading-none tracking-tighter uppercase select-none pr-10">
                        DATA SCIENTIST • MACHINE LEARNING •
                    </h2>
                    <h2 className="text-7xl md:text-[12vw] font-black text-frost/5 leading-none tracking-tighter uppercase select-none pr-10">
                        DATA SCIENTIST • MACHINE LEARNING •
                    </h2>
                </motion.div>
            </div>

            <motion.div
                style={{ opacity }}
                className="container mx-auto px-6 lg:px-12 relative z-10 pt-28"
            >
                {/* GRID FIX: Changed from lg:grid-cols-2 to a single column that 
                   reverses order on mobile so the image stays near the top/middle 
                */}
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? textY : 0 }}
                        className="space-y-8 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
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

                        {/* Name with Swapping Easter Egg */}
                        <div
                            className="relative cursor-none select-none group inline-block lg:block"
                            onClick={() => setIsRevealed(!isRevealed)}
                            onMouseEnter={() => setIsHovered(true)} // Set hovered state
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                            }}
                            onMouseLeave={() => {
                                setIsHovered(false); // Reset hover
                                setIsRevealed(false); // Reset mobile tap
                            }}
                        >
                            {/* English Layer */}
                            <div
                                className={`space-y-2 relative z-10 transition-opacity duration-500 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
                                style={{
                                    /* The mask only applies if we are hovering OR if it's revealed on mobile */
                                    WebkitMaskImage: (isHovered && !isRevealed)
                                        ? 'radial-gradient(circle 120px at var(--mouse-x) var(--mouse-y), transparent 99%, black 100%)'
                                        : 'none',
                                    maskImage: (isHovered && !isRevealed)
                                        ? 'radial-gradient(circle 120px at var(--mouse-x) var(--mouse-y), transparent 99%, black 100%)'
                                        : 'none',
                                }}
                            >
                                <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-frost leading-[0.9] tracking-tighter">ARCHEL</h1>
                                <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter bg-gradient-to-r from-lavender via-sky-blue to-lavender bg-clip-text text-transparent">TANEKA</h1>
                            </div>

                            {/* Chinese Layer */}
                            <div
                                className={`absolute inset-0 z-20 pointer-events-none space-y-2 transition-opacity duration-500 
                    ${isRevealed ? 'opacity-100' : (isHovered ? 'opacity-100' : 'opacity-0')}`}
                                style={{
                                    /* The clip-path only applies if we are hovering; otherwise it is hidden */
                                    clipPath: isRevealed
                                        ? 'circle(150% at 50% 50%)'
                                        : (isHovered ? 'circle(120px at var(--mouse-x) var(--mouse-y))' : 'circle(0% at 50% 50%)'),
                                    transition: isRevealed ? 'clip-path 0.5s ease' : 'none' // Smooth transition only for mobile tap
                                }}
                            >
                                <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-lavender leading-[0.9] tracking-wider">陈</h1>
                                <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-wider bg-gradient-to-r from-sky-blue via-lavender to-sky-blue bg-clip-text text-transparent">文群</h1>
                            </div>
                        </div>

                        <p className="text-lg md:text-2xl text-frost/80 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Transforming <span className="text-frost font-semibold">raw data</span> into <span className="text-frost font-semibold">strategic insights</span> through Machine Learning
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                            <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-frost text-deep-sea rounded-full font-bold text-lg">Explore Work</a>
                            <a href="#contact" className="w-full sm:w-auto px-8 py-4 border-2 border-frost/30 text-frost rounded-full font-bold text-lg">Contact Me</a>
                        </div>
                    </motion.div>

                    {/* Right Image: Now visible on all screens */}
                    <motion.div
                        style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? imageY : 0 }}
                        className="relative w-full max-w-[280px] sm:max-max-w-md lg:max-w-none mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-lavender/40 via-transparent to-sky-blue/40 rounded-3xl blur-2xl"></div>
                        <div className="relative">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-frost/20 shadow-2xl">
                                <img src="../assets/img/profile.jpg" alt="Archel Taneka" className="w-full h-full object-cover" />
                            </div>

                            {/* Floating Flag Badge - Adjusted for mobile scale */}
                            <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-frost/20 backdrop-blur-xl p-3 md:p-5 rounded-2xl border border-white/20 flex flex-col gap-2 md:gap-4 shadow-xl">
                                <div className="text-[8px] md:text-[10px] font-mono text-lavender uppercase tracking-widest font-black border-b border-white/10 pb-1">Global Journey</div>
                                <div className="flex items-center gap-2 md:gap-3">
                                    <img src="https://flagcdn.com/id.svg" className="w-6 md:w-8 h-4 md:h-5 rounded-sm" alt="ID" />
                                    <span className="text-frost font-mono text-[10px] md:text-xs font-bold">INDONESIA</span>
                                </div>
                                <div className="flex items-center gap-2 md:gap-3">
                                    <img src="https://flagcdn.com/au.svg" className="w-6 md:w-8 h-4 md:h-5 rounded-sm" alt="AU" />
                                    <span className="text-frost font-mono text-[10px] md:text-xs font-bold">AUSTRALIA</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
};

export default Hero;