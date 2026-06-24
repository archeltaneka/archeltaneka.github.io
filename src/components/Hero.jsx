import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowRight, LuGithub, LuLinkedin, LuFileText, LuBrain, LuDatabase, LuCode, LuMail } from 'react-icons/lu';

const proofPoints = [
    { value: '$8.3M (IDR 149B+)', label: 'measured impact' },
    { value: '4.8%', label: 'conversion lift' },
    { value: '87%', label: 'operational efficiency gain' },
];

const FloatingCard = ({ title, sub, icon, className, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={`absolute bg-white/90 backdrop-blur-md p-2 md:p-4 rounded-xl md:rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center gap-2 md:gap-4 z-20 ${className}`}
    >
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600">
            <div className="scale-75 md:scale-100">{icon}</div>
        </div>
        <div className="text-left">
            <div className="text-[10px] md:text-sm font-bold text-slate-900 leading-tight whitespace-nowrap">{title}</div>
            <div className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{sub}</div>
        </div>
    </motion.div>
);

const Hero = () => {
    // --- Easter Eggs State ---
    const [isHovered, setIsHovered] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);

    // Profile Photo Easter Egg
    const [activePhoto, setActivePhoto] = useState('/assets/img/profile.webp');
    // Preload photos
    useEffect(() => {
        ['/assets/img/profile-au.webp', '/assets/img/profile-uk.webp'].forEach(src => {
            new Image().src = src;
        });
    }, []);

    const [, setInputSequence] = useState('');

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

    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden pt-24 pb-16 lg:pt-20 lg:pb-10">
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
                        className="text-center lg:text-left space-y-7 order-1 lg:order-1"
                    >

                        {/* Name Reveal Interaction */}
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                            <div
                                className="relative cursor-none select-none group inline-block lg:block"
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
                                <div className="text-base md:text-xl font-bold text-slate-500 mb-2 tracking-wide uppercase">Hello, I'm</div>

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
                                        <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] transition-opacity duration-300 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}>
                                            ARCHEL T.
                                            <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                                SUTANTO
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
                                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
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
                            className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
                        >
                            Product Data Scientist turning <span className="text-slate-900 font-semibold">experimentation</span>, <span className="text-slate-900 font-semibold">causal inference</span>, and <span className="text-slate-900 font-semibold">machine learning</span> into measurable product and revenue decisions.
                        </motion.p>

                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0"
                        >
                            {proofPoints.map((point) => (
                                <div key={point.label} className="border border-slate-200 rounded-xl px-3 py-3 md:px-4 bg-white shadow-sm">
                                    <div className="text-lg md:text-2xl font-black text-slate-900 leading-tight">{point.value}</div>
                                    <div className="text-[10px] md:text-[11px] uppercase tracking-wider font-bold text-slate-500 mt-1">{point.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="text-sm md:text-base font-semibold text-blue-700"
                        >
                            Targeting Product Data Scientist, Data Scientist, and Machine Learning Engineer roles.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                        >
                            <motion.a
                                href="#impact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                            >
                                View Impact
                                <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.a>

                            <motion.a
                                href="/assets/resume/Resume - Archel Sutanto.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:border-slate-300 hover:bg-slate-50 transition-all shadow-lg shadow-slate-100"
                            >
                                <LuFileText className="w-5 h-5 text-blue-600" />
                                Resume
                            </motion.a>

                            <div className="flex gap-3 justify-center lg:justify-start">
                                <motion.a
                                    href="mailto:archeltaneka@gmail.com"
                                    whileHover={{ scale: 1.1 }}
                                    className="p-4 bg-slate-50 rounded-2xl text-slate-600 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    title="Send Email"
                                    aria-label="Email Archel"
                                >
                                    <LuMail className="w-6 h-6" />
                                </motion.a>
                                <motion.a
                                    href="https://github.com/archeltaneka" target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    className="p-4 bg-slate-50 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                    aria-label="GitHub profile"
                                >
                                    <LuGithub className="w-6 h-6" />
                                </motion.a>
                                <motion.a
                                    href="https://linkedin.com/in/archel-taneka-sutanto" target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    className="p-4 bg-slate-50 rounded-2xl text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition-colors"
                                    aria-label="LinkedIn profile"
                                >
                                    <LuLinkedin className="w-6 h-6" />
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* --- Right Column: Image & Floating Cards --- */}
                    <div className="relative order-2 lg:order-2 flex justify-center lg:block mt-6 lg:mt-0">

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

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 1 }} // Appears 1.5 seconds after page load
                                className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                            >
                                <div className="flex items-center gap-2 group">
                                    {/* Pulsing indicator to grab attention without being annoying */}
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />

                                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest transition-colors group-hover:text-slate-600">
                                        Try typing <span className="text-slate-900 font-bold">"australia"</span> or <span className="text-slate-900 font-bold">"uk"</span>
                                    </p>
                                </div>
                            </motion.div>

                            {/* Floating Orbiting Cards */}

                            {/* Machine Learning (Top Right) */}
                            <FloatingCard
                                title="Experimentation"
                                sub="A/B Testing • Causal"
                                icon={<LuBrain className="w-6 h-6" />}
                                className="-right-8 top-12 md:-right-12 lg:-right-8 lg:top-32 animate-[float_4s_ease-in-out_infinite]"
                                delay={0.2}
                            />

                            {/* Data Science (Bottom Left) */}
                            <FloatingCard
                                title="Product ML"
                                sub="Recommendations • Classification"
                                icon={<LuDatabase className="w-6 h-6" />}
                                className="-left-8 bottom-20 md:-left-12 lg:-left-16 lg:bottom-40 animate-[float_5s_ease-in-out_infinite_1s]"
                                delay={0.4}
                            />

                            {/* 15+ Tools (Bottom Right) */}
                            <FloatingCard
                                title="Analytics Engineering"
                                sub="Python • SQL • BigQuery"
                                icon={<LuCode className="w-6 h-6" />}
                                className="-right-4 bottom-4 md:right-0 lg:right-0 lg:bottom-12 animate-[float_6s_ease-in-out_infinite_0.5s]"
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
