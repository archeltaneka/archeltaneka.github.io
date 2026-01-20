import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed w-full z-[90] transition-all duration-500 ${isScrolled
                    ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm'
                    : 'py-8 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <motion.a
                    href="#home"
                    className="text-2xl font-playfair font-bold text-charcoal tracking-tighter"
                    whileHover={{ scale: 1.05 }}
                >
                    AT<span className="text-sage">.</span>
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-charcoal/70 hover:text-sage transition-colors tracking-wide uppercase"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="/resume.pdf"
                        className="bg-charcoal text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-sage transition-colors"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-charcoal p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                    <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                    <div className="w-4 h-0.5 bg-current ml-auto"></div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl md:hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-charcoal hover:text-sage"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;