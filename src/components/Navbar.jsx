import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredName, setHoveredName] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', hoverText: 'cd /home/user', href: '#home' },
        { name: 'Timeline', hoverText: 'My Villain Origin Story', href: '#timeline' },
        { name: 'Skills', hoverText: 'Things I’m Actually Good At', href: '#skills' },
        { name: 'Projects', hoverText: 'Proof I’m Not Lying', href: '#projects' },
        { name: 'Contact', hoverText: 'Say Hi!', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled || isMobileMenuOpen
                ? 'py-4 bg-deep-sea/90 backdrop-blur-xl border-b border-frost/10 shadow-2xl'
                : 'py-6 md:py-8 bg-deep-sea/40 md:bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
                {/* Logo */}
                <motion.a href="#home" className="group flex items-center gap-1" whileHover={{ scale: 1.05 }}>
                    <span className="text-2xl font-black text-frost tracking-tighter uppercase">
                        AT
                    </span>
                </motion.a>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden relative z-[101] flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <motion.div
                        animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        className="w-7 h-0.5 bg-frost transition-colors"
                    />
                    <motion.div
                        animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-7 h-0.5 bg-frost transition-colors"
                    />
                    <motion.div
                        animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        className="w-7 h-0.5 bg-frost transition-colors"
                    />
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group flex items-center justify-center py-2 h-10">
                            <a
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredName(link.name)}
                                onMouseLeave={() => setHoveredName(null)}
                                className="relative flex flex-col items-center group py-2"
                            >
                                {/* Original Professional Name */}
                                <span className="text-sm font-bold text-frost/80 group-hover:text-frost transition-colors tracking-widest uppercase font-mono">
                                    {link.name}
                                </span>

                                {/* Small Absolute Subtitle */}
                                <AnimatePresence>
                                    {hoveredName === link.name && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: -10 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="absolute top-full whitespace-nowrap text-[20px] text-lavender italic tracking-normal font-sans"
                                        >
                                            {link.hoverText}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </a>
                        </div>
                    ))}

                    {/* Desktop Resume Button */}
                    <div className="relative ml-6 group">
                        <a
                            href="/assets/resume/Resume - Archel Sutanto.pdf"
                            target="_blank"
                            onMouseEnter={() => setHoveredName('Resume')}
                            onMouseLeave={() => setHoveredName(null)}
                            className="relative flex items-center justify-center px-10 py-3 rounded-xl transition-all duration-500 overflow-hidden
                   bg-deep-sea border border-lavender/20
                   shadow-[inset_0_0_0_1px_rgba(230,230,250,0.1)]
                   hover:border-lavender/50 hover:shadow-[0_0_30px_rgba(230,230,250,0.2),inset_0_0_12px_rgba(230,230,250,0.1)]"
                        >
                            <div className="absolute inset-0 bg-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

                            <div className="relative z-10 perspective-1000">
                                <AnimatePresence mode="wait">
                                    {hoveredName === 'Resume' ? (
                                        <motion.span
                                            key="official"
                                            initial={{ rotateX: -90, opacity: 0 }}
                                            animate={{ rotateX: 0, opacity: 1 }}
                                            exit={{ rotateX: 90, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="block text-[12px] font-black text-lavender tracking-[0.1em] italic"
                                        >
                                            Hire Me! Don't Change Your Mind!
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="resume"
                                            initial={{ rotateX: -90, opacity: 0 }}
                                            animate={{ rotateX: 0, opacity: 1 }}
                                            exit={{ rotateX: 90, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="block text-xs font-black text-frost tracking-[0.3em]"
                                        >
                                            RESUME
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </a>

                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-lavender/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 w-full h-screen bg-deep-sea z-[999] md:hidden flex flex-col items-center justify-center"
                        >
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-8 right-8 text-lavender p-2"
                            >
                                <div className="w-8 h-0.5 bg-lavender rotate-45 translate-y-0.5"></div>
                                <div className="w-8 h-0.5 bg-lavender -rotate-45 -translate-y-0.5"></div>
                            </button>

                            <div className="flex flex-col space-y-12 text-center">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-4xl font-black text-frost uppercase tracking-tighter hover:text-lavender"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ))}

                                <a
                                    href="/assets/resume/Resume - Archel Sutanto.pdf"
                                    target="_blank"
                                    className="mt-4 px-10 py-4 bg-lavender text-deep-sea rounded-xl font-black uppercase tracking-widest text-sm"
                                >
                                    Resume
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;