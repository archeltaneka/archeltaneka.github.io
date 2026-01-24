import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    // Link scroll progress specifically to this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);

    // Mouse event handler
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

    // "Machine Learning" word change toggle
    const [isMlToggled, setIsMlToggled] = useState(false);

    // Copy email state
    const [copied, setCopied] = useState(false);
    const handleCopyEmail = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText("archeltaneka@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Profile photo change
    const [activePhoto, setActivePhoto] = useState('/assets/img/profile.webp');
    const [inputSequence, setInputSequence] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Only track letters
            if (!/^[a-zA-Z]$/.test(e.key)) return;

            setInputSequence(prev => {
                const newSeq = (prev + e.key.toLowerCase()).slice(-10); // Keep last 10 chars

                if (newSeq.includes('australia')) {
                    setActivePhoto('/assets/img/profile-au.webp');
                } else if (newSeq.includes('uk') || newSeq.includes('london')) {
                    setActivePhoto('/assets/img/profile-uk.webp');
                } else if (newSeq.includes('reset') || newSeq.includes('home')) {
                    setActivePhoto('/assets/img/profile.webp');
                }

                return newSeq;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-deep-sea via-deep-sea/95 to-sky-blue/20 overflow-hidden pb-20 md:pb-32"
        >
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
                            // Change: Logic to properly toggle state on mobile tap
                            onClick={() => {
                                if (window.innerWidth <= 1024) {
                                    setIsRevealed(!isRevealed);
                                }
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                            }}
                            onMouseLeave={() => {
                                setIsHovered(false);
                                setIsRevealed(false); // Reset reveal when mouse leaves on desktop
                            }}
                        >
                            {/* English Layer */}
                            <div
                                className={`space-y-2 relative z-10 transition-opacity duration-500 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
                                style={{
                                    // On mobile (when not revealed), we disable the radial mask so it doesn't look "cut out" by a ghost cursor
                                    WebkitMaskImage: (isHovered && !isRevealed && window.innerWidth > 1024)
                                        ? 'radial-gradient(circle 120px at var(--mouse-x) var(--mouse-y), transparent 99%, black 100%)'
                                        : 'none',
                                    maskImage: (isHovered && !isRevealed && window.innerWidth > 1024)
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
            ${isRevealed ? 'opacity-100' : (isHovered && window.innerWidth > 1024 ? 'opacity-100' : 'opacity-0')}`}
                                style={{
                                    // Improved clipPath logic to handle the mobile toggle vs desktop hover
                                    clipPath: isRevealed
                                        ? 'circle(150% at 50% 50%)'
                                        : (isHovered && window.innerWidth > 1024 ? 'circle(120px at var(--mouse-x) var(--mouse-y))' : 'circle(0% at 50% 50%)'),
                                    transition: 'clip-path 0.5s ease, opacity 0.5s ease'
                                }}
                            >
                                <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-lavender leading-[0.9] tracking-wider">陈</h1>
                                <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-wider bg-gradient-to-r from-sky-blue via-lavender to-sky-blue bg-clip-text text-transparent">文群</h1>
                            </div>
                        </div>

                        {/* Tagline */}
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl md:text-5xl font-black text-frost leading-tight tracking-tight"
                        >
                            I torture data until it confesses <br className="hidden md:block" />
                            <span className="relative inline-block">
                                <span className="relative z-10 text-lavender italic">something useful.</span>
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                    className="absolute bottom-2 left-0 h-4 bg-lavender/20 -rotate-1"
                                />
                            </span>
                        </motion.h2>

                        {/* Clear Explanation with Interactive Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg md:text-xl text-frost/70 font-light leading-relaxed"
                        >
                            (Translation: I use
                            <span
                                className="relative inline-grid cursor-help mx-1 align-bottom group"
                                onClick={() => setIsMlToggled(!isMlToggled)}
                                onMouseEnter={() => setIsMlToggled(true)}
                                onMouseLeave={() => setIsMlToggled(false)}
                            >
                                {/* The Professional Text */}
                                <span className={`col-start-1 row-start-1 text-frost font-medium transition-all duration-300 
            ${isMlToggled ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                                    Machine Learning
                                </span>

                                {/* The Witty Text */}
                                <span className={`col-start-1 row-start-1 text-lavender font-bold transition-all duration-300 whitespace-nowrap
            ${isMlToggled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    Math with fancy branding
                                </span>
                            </span>
                            to bridge the gap between <span className="text-frost font-medium">"Trust me bro"</span> and <span className="text-frost font-medium">"The data proves it."</span>)
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                            {/* Explore Work - Magnetic Solid Button */}
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full sm:w-auto px-10 py-4 bg-frost text-deep-sea rounded-full font-black text-lg shadow-lg shadow-frost/10 hover:shadow-frost/30 transition-shadow flex items-center justify-center gap-2"
                            >
                                Explore Work
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    →
                                </motion.span>
                            </motion.a>

                            {/* Contact Me - Feedback Ghost Button */}
                            <motion.button
                                onClick={handleCopyEmail}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(237, 242, 247, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-10 py-4 border-2 border-frost/30 text-frost rounded-full font-bold text-lg flex items-center justify-center relative overflow-hidden group"
                            >
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.span
                                            key="copied"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="text-lavender font-black"
                                        >
                                            Email Copied!
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="contact"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            Good First Impression?
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Subtle Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0], // Moves up 12px and back
                        }}
                        transition={{
                            duration: 4,      // 4 seconds for a full loop
                            repeat: Infinity, // Loop forever
                            ease: "easeInOut" // Smooth start and stop
                        }}
                        style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? imageY : 0 }}
                        className="relative w-full max-w-[280px] sm:max-max-w-md lg:max-w-none mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-lavender/40 via-transparent to-sky-blue/40 rounded-3xl blur-2xl"></div>
                        <div className="relative">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-frost/20 bg-deep-sea shadow-2xl">                                <AnimatePresence mode="wait">
                                <motion.img
                                    key={activePhoto} // This triggers the animation when the photo changes
                                    src={activePhoto}
                                    alt="Archel Taneka"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            </div>

                            {/* Floating Flag Badge */}
                            <div className="absolute bottom-4 -left-6 md:bottom-15 md:-left-8 bg-frost/20 backdrop-blur-xl p-3 md:p-5 rounded-2xl border border-white/20 flex flex-col gap-2 md:gap-4 shadow-xl">                                <div className="text-[8px] md:text-[10px] font-mono text-lavender uppercase tracking-widest font-black border-b border-white/10 pb-1">Global Journey</div>
                                <div className="flex items-center gap-2 md:gap-3">
                                    <img src="https://flagcdn.com/id.svg" className="w-6 md:w-8 h-4 md:h-5 rounded-sm" alt="ID" />
                                    <span className="text-frost font-mono text-[10px] md:text-xs font-bold">INDONESIA</span>
                                </div>
                                <div className="flex items-center gap-2 md:gap-3">
                                    <img src="https://flagcdn.com/gb.svg" className="w-6 md:w-8 h-4 md:h-5 rounded-sm" alt="UK" />
                                    <span className="text-frost font-mono text-[10px] md:text-xs font-bold">UNITED KINGDOM</span>
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