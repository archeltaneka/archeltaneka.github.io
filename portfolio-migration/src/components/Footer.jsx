import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const socialLinks = [
        { name: 'LinkedIn', href: 'https://linkedin.com/in/archeltaneka', icon: '󰈸' },
        { name: 'GitHub', href: 'https://github.com/archeltaneka', icon: '󰊤' },
        { name: 'Email', href: 'mailto:archeltaneka@gmail.com', icon: '󰇮' }
    ];

    return (
        <section id="contact" className="py-24 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20">

                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="font-playfair text-5xl font-bold text-charcoal mb-6">
                                Let's start a <span className="text-sage italic">conversation.</span>
                            </h2>
                            <p className="text-xl text-warm-gray leading-relaxed">
                                I'm currently seeking internships or full-time opportunities starting
                                <span className="text-charcoal font-semibold"> November 2025.</span>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-sage font-bold">Connect with me</p>
                            <div className="flex flex-col gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-sage transition-all duration-500"
                                    >
                                        <span className="text-charcoal group-hover:text-white font-medium transition-colors">{link.name}</span>
                                        <span className="text-sage group-hover:text-white transition-colors">→</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-soft-cream p-10 rounded-3xl border border-gray-100"
                    >
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">Full Name</label>
                                <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-sage outline-none transition-colors" placeholder="Archel Taneka" />
                            </div>
                            <div className="space-y-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">Email Address</label>
                                <input type="email" className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-sage outline-none transition-colors" placeholder="hello@domain.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-warm-gray">Your Message</label>
                                <textarea rows="4" className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-sage outline-none transition-colors resize-none" placeholder="How can I help you?"></textarea>
                            </div>
                            <button className="w-full bg-charcoal text-white py-5 rounded-full font-medium hover:bg-sage transition-all hover:shadow-xl hover:-translate-y-1">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Footer */}
                <footer className="mt-32 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-sm text-warm-gray font-mono">
                        © {new Date().getFullYear()} ARCHEL TANEKA SUTANTO
                    </div>
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        whileHover={{ y: -5 }}
                        className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-charcoal hover:text-sage transition-colors"
                    >
                        Back to Top <span className="text-xl">↑</span>
                    </motion.button>
                </footer>
            </div>
        </section>
    );
};

export default Contact;