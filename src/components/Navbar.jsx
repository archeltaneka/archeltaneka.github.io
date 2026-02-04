import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuFileText } from 'react-icons/lu'; // Adding a document icon

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
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
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">

                {/* Logo */}
                <a href="#" className="text-xl font-black text-slate-900 tracking-tighter">
                    AT<span className="text-blue-600">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* Standout Resume Button */}
                    <motion.a
                        href="./assets/resume/Resume - Archel Sutanto.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black uppercase tracking-[0.15em] rounded-xl shadow-lg shadow-blue-200 transition-all border border-blue-400/20"
                    >
                        <LuFileText className="w-4 h-4" />
                        Resume
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                    </motion.a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-slate-900 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <div className="space-y-1.5 w-6">
                        <span className={`block w-full h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-full h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-full h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>

                {/* Mobile Menu Backdrop */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl p-6 md:hidden flex flex-col gap-4 text-center items-center"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            {/* Mobile Resume Button */}
                            <a
                                href="/path-to-your-resume.pdf"
                                target="_blank"
                                className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-200"
                            >
                                <LuFileText className="w-5 h-5" />
                                Download Resume
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </nav>
    );
};

export default Navbar;