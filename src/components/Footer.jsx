import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        {
            name: 'LinkedIn',
            label: 'LinkedIn',
            href: 'https://linkedin.com/in/archel-taneka-sutanto',
            icon: <FaLinkedinIn />
        },
        {
            name: 'GitHub',
            label: 'GitHub',
            href: 'https://github.com/archeltaneka',
            icon: <FaGithub />
        },
        {
            name: 'Email',
            label: 'Email',
            href: 'mailto:archeltaneka@gmail.com',
            icon: <FaEnvelope />
        }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">

                    {/* Left: Call to Action */}
                    <div className="text-center md:text-left space-y-6 max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            Let's build something <br />
                            <span className="text-blue-400">intelligent.</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-light">
                            Open for Data Scientist and Machine Learning Engineer roles.
                            Ready to convert data into actionable business value.
                        </p>

                        <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Navigation / Copyright */}
                    <div className="flex flex-col items-center md:items-end space-y-8">
                        <button
                            onClick={scrollToTop}
                            className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2 group"
                        >
                            Back to Top
                            <span className="group-hover:-translate-y-1 transition-transform">↑</span>
                        </button>

                        <div className="text-right space-y-1">
                            <div className="text-2xl font-black">AT.</div>
                            <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">
                                &copy; {new Date().getFullYear()} Archel Taneka.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Footer;
