import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Timeline', href: '#timeline' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled
                ? 'py-4 bg-deep-sea/80 backdrop-blur-xl border-b border-frost/10 shadow-2xl'
                : 'py-8 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
                {/* Logo */}
                <motion.a
                    href="#home"
                    className="group flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="text-2xl font-black text-frost tracking-tighter uppercase">
                        AT<span className="text-lavender"></span>
                    </span>
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                const target = document.querySelector(link.href);
                                if (target) {
                                    // Get the top position of the target section
                                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

                                    // Use window.scrollTo with 'smooth' behavior
                                    window.scrollTo({
                                        top: targetPosition,
                                        behavior: 'smooth'
                                    });
                                }
                                setIsMobileMenuOpen(false);
                            }}
                            className="relative group text-sm font-bold text-frost/80 hover:text-frost transition-colors tracking-widest uppercase font-mono"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lavender transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}

                    {/* Resume / CTA Button */}
                    <a
                        href="/assets/resume/Resume - Archel Sutanto.pdf"
                        target="_blank"
                        className="relative px-6 py-2 bg-frost text-deep-sea rounded-full text-xs font-black uppercase tracking-widest overflow-hidden group hover:scale-105 transition-transform"
                    >
                        <span className="relative z-10">Resume</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-lavender to-sky-blue"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className={`w-6 h-0.5 bg-frost transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-frost transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-frost transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 w-full bg-deep-sea/95 backdrop-blur-2xl border-b border-frost/10 md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-8 space-y-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-2xl font-black text-frost uppercase tracking-tighter hover:text-lavender transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="/resume.pdf"
                                className="w-full py-4 bg-gradient-to-r from-lavender to-sky-blue text-deep-sea text-center rounded-xl font-black uppercase tracking-widest"
                            >
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;