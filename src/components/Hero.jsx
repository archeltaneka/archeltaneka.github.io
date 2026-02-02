import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowRight, LuGithub, LuLinkedin, LuFileText, LuBrain, LuDatabase, LuCode } from 'react-icons/lu';

const Hero = () => {
    // --- Easter Eggs State ---
    const [isHovered, setIsHovered] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);

    // Copy Email State
    const [copied, setCopied] = useState(false);

    // Profile Photo Easter Egg
    const [activePhoto, setActivePhoto] = useState('/assets/img/profile.webp');
    // Preload photos
    useEffect(() => {
        ['/assets/img/profile-au.webp', '/assets/img/profile-uk.webp'].forEach(src => {
            new Image().src = src;
        });
    }, []);

    const [inputSequence, setInputSequence] = useState('');

    // --- Effects ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!/^[a-zA-Z]$/.test(e.key)) return;
            setInputSequence(prev => {
                const newSeq = (prev + e.key.toLowerCase()).slice(-10);
                if (newSeq.includes('australia')) setActivePhoto('/assets/img/profile-au.webp');
                else if (newSeq.includes('uk') || newSeq.includes('london')) setActivePhoto('/assets/img/profile-uk.webp');
                else if (newSeq.includes('reset') || newSeq.includes('home')) setActivePhoto('/assets/img/profile.webp');
                return newSeq;
            });
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("archeltaneka@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // --- Floating Card Component ---
    const FloatingCard = ({ title, sub, icon, className, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className={`absolute bg-white p-4 rounded-2xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center gap-4 z-20 ${className}`}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sub === 'Stack' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                {icon}
            </div>
            <div className="text-left">
                <div className="text-sm font-bold text-slate-900 leading-tight">{title}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{sub}</div>
            </div>
        </motion.div>
    );

    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden pt-20">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gradient-to-b from-blue-50/50 to-transparent rounded-bl-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* --- Left Column: Content --- */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                    staggerChildren: 0.1,
                                    duration: 0.8,
                                    ease: "easeOut"
                                }
                            }
                        }}
                        className="text-center lg:text-left space-y-8 order-2 lg:order-1"
                    >

                        {/* Name Reveal Interaction */}
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
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
                                <div className="text-xl md:text-2xl font-bold text-slate-500 mb-2 tracking-wide uppercase">Hello, I'm</div>

                                {/* Container for both name layers */}
                                <div className="relative">
                                    {/* English Name (Visible mainly) */}
                                    <div
                                        className={`space-y-2 relative z-10 transition-opacity duration-500 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
                                        style={{
                                            WebkitMaskImage: (isHovered && !isRevealed && window.innerWidth > 1024)
                                                ? 'radial-gradient(circle 120px at var(--mouse-x) var(--mouse-y), transparent 99%, black 100%)'
                                                : 'none',
                                            maskImage: (isHovered && !isRevealed && window.innerWidth > 1024)
                                                ? 'radial-gradient(circle 120px at var(--mouse-x) var(--mouse-y), transparent 99%, black 100%)'
                                                : 'none',
                                        }}
                                    >
                                        <h1 className={`text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] transition-opacity duration-300 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}>
                                            ARCHEL
                                            <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                                TANEKA
                                            </span>
                                        </h1>
                                    </div>

                                    {/* Chinese Layer */}
                                    <div
                                        className={`absolute top-0 left-0 z-20 pointer-events-none space-y-2 transition-opacity duration-500 
                ${isRevealed ? 'opacity-100' : (isHovered && window.innerWidth > 1024 ? 'opacity-100' : 'opacity-0')}`}
                                        style={{
                                            clipPath: isRevealed
                                                ? 'circle(150% at 50% 50%)'
                                                : (isHovered && window.innerWidth > 1024 ? 'circle(120px at var(--mouse-x) var(--mouse-y))' : 'circle(0% at 50% 50%)'),
                                            transition: 'clip-path 0.5s ease, opacity 0.5s ease'
                                        }}
                                    >
                                        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                                            陈
                                            <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                                文群
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="text-xl text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0"
                        >
                            Data Scientist designing intelligent systems.
                            I love <span className="text-slate-800 font-semibold">fun UI</span>, <span className="text-slate-800 font-semibold">collaboration</span>, and making helpful products that connect people.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                        >
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                            >
                                View Work
                                <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.a>

                            <div className="flex gap-3">
                                <motion.a
                                    href="https://github.com/archeltaneka" target="_blank"
                                    whileHover={{ scale: 1.1 }}
                                    className="p-4 bg-slate-50 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                >
                                    <LuGithub className="w-6 h-6" />
                                </motion.a>
                                <motion.a
                                    href="https://linkedin.com/in/archel-taneka-sutanto" target="_blank"
                                    whileHover={{ scale: 1.1 }}
                                    className="p-4 bg-slate-50 rounded-2xl text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition-colors"
                                >
                                    <LuLinkedin className="w-6 h-6" />
                                </motion.a>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            className="pt-8 flex items-center justify-center lg:justify-start gap-3"
                        >
                            <div className="px-4 py-2 bg-slate-50 rounded-full border border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Open to Work
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* --- Right Column: Image & Floating Cards --- */}
                    <div className="relative order-1 lg:order-2 flex justify-center lg:block">

                        {/* Central Image Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[600px] mx-auto"
                        >
                            {/* The "Morg" Circle Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white rounded-full shadow-[0_0_100px_rgba(230,240,255,0.8)] -z-10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-b from-blue-50 to-indigo-50 rounded-full -z-10" />

                            {/* Masked Image */}
                            <div className="w-full h-full relative z-10">
                                <AnimatePresence mode="popLayout">
                                    <motion.img
                                        key={activePhoto}
                                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                        transition={{ duration: 0.5 }}
                                        src={activePhoto}
                                        alt="Archel Taneka"
                                        className="w-full h-full object-contain drop-shadow-2xl"
                                        style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Floating Orbiting Cards */}

                            {/* Machine Learning (Top Right) */}
                            <FloatingCard
                                title="Machine Learning"
                                sub="Specialist"
                                icon={<LuBrain className="w-6 h-6" />}
                                className="-right-4 top-20 md:-right-12 lg:-right-8 lg:top-32 animate-[float_4s_ease-in-out_infinite]"
                                delay={0.2}
                            />

                            {/* Data Science (Bottom Left) */}
                            <FloatingCard
                                title="Data Scientist"
                                sub="Analyst"
                                icon={<LuDatabase className="w-6 h-6" />}
                                className="-left-4 bottom-20 md:-left-12 lg:-left-16 lg:bottom-40 animate-[float_5s_ease-in-out_infinite_1s]"
                                delay={0.4}
                            />

                            {/* 15+ Tools (Bottom Right) */}
                            <FloatingCard
                                title="15+ Tech Stack"
                                sub="Stack"
                                icon={<LuCode className="w-6 h-6" />}
                                className="right-0 bottom-0 md:right-0 lg:right-0 lg:bottom-12 animate-[float_6s_ease-in-out_infinite_0.5s]"
                                delay={0.6}
                            />

                            {/* Decorative Floating Elements (Spheres/Donuts from reference) */}
                            <motion.div
                                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 5 }}
                                className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-slate-200 to-white rounded-full shadow-lg z-0 opacity-80"
                            />
                            <motion.div
                                animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 7 }}
                                className="absolute bottom-1/3 -right-8 w-8 h-8 bg-blue-100 rounded-full blur-sm z-0"
                            />

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;