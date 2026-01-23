import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    const socialLinks = [
        {
            name: 'LinkedIn',
            label: 'Network',
            href: 'https://linkedin.com/in/archel-taneka-sutanto',
            icon: <FaLinkedinIn />
        },
        {
            name: 'GitHub',
            label: 'Codebase',
            href: 'https://github.com/archeltaneka',
            icon: <FaGithub />
        },
        {
            name: 'Email',
            label: 'Direct',
            href: 'mailto:archeltaneka@gmail.com',
            icon: <FaEnvelope />
        }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section id="contact" className="relative py-32 bg-frost overflow-hidden text-deep-sea">
            {/* Subtle Grid Pattern for Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#050A18 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col items-center text-center space-y-16">

                    {/* The Big Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-deep-sea/40 font-mono text-sm uppercase tracking-[0.5em]">
                            Available for Collaboration
                        </h2>

                        <div className="group block text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                            <span className="block text-deep-sea/90">LET'S MAKE</span>

                            <div className="flex flex-wrap justify-center gap-x-4">
                                {/* The "Mistake" with animated strikethrough */}
                                <span className="relative inline-block text-deep-sea/30 italic font-light">
                                    MISTAKES
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "110%" }}
                                        transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
                                        className="absolute top-1/2 left-[-5%] h-[4px] md:h-[8px] bg-red-500/80 -rotate-2"
                                    />
                                </span>

                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.4, duration: 0.5 }}
                                    className="text-deep-sea"
                                >
                                    A GREAT TEAM
                                </motion.span>
                            </div>

                            <span className="block text-deep-sea mt-2">TOGETHER!</span>
                        </div>
                    </motion.div>

                    {/* Minimalist Social Row */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full">
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                className="group flex flex-col items-center gap-3"
                            >
                                <div className="text-2xl md:text-3xl text-deep-sea/20 group-hover:text-lavender transition-colors">
                                    {link.icon}
                                </div>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-deep-sea/40 group-hover:text-deep-sea transition-colors">
                                    {link.label}
                                </span>
                            </motion.a>
                        ))}
                    </div>

                    {/* Witty Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, rotate: -5 }}
                        whileInView={{ opacity: 1, rotate: -2 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.2
                        }}
                        className="flex justify-center w-full"
                    >
                        <div className="relative group max-w-sm">
                            <div className="absolute inset-0 bg-lavender/10 blur-xl group-hover:bg-lavender/20 transition-colors duration-500 rounded-full" />
                            <div className="relative p-8 bg-white border border-deep-sea/5 shadow-xl rounded-2xl">
                                <p className="text-lg md:text-xl font-medium text-deep-sea/80 italic leading-relaxed text-center">
                                    “He’s very good with computers, but he still hasn't fixed <span className="text-red-500 font-bold">my printer.</span>”
                                </p>
                                <div className="mt-4 flex items-center justify-center gap-3">
                                    <div className="h-[1px] w-6 bg-deep-sea/20" />
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-deep-sea/40">
                                        — Mom (Official Technical Advisor)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Credits */}
                <footer className="mt-40 pt-12 border-t border-deep-sea/10 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-2 text-left">
                        <div className="text-2xl font-black tracking-tighter">AT.</div>
                        <div className="text-[10px] font-mono text-deep-sea/40 uppercase tracking-[0.2em]">
                            © {new Date().getFullYear()} ARCHEL TANEKA SUTANTO
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4">
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ y: -5 }}
                            className="p-4 bg-deep-sea text-frost rounded-full shadow-xl hover:bg-lavender transition-colors"
                        >
                            <span className="text-xl">↑</span>
                        </motion.button>
                        <span className="text-[9px] font-mono text-deep-sea/30 uppercase">Scroll to top</span>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Contact;