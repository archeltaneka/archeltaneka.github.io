import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa'; // Importing React Icons

const Contact = () => {
    // Updated social links with React Icons components
    const socialLinks = [
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/in/archel-taneka-sutanto',
            icon: <FaLinkedinIn className="text-xl" />
        },
        {
            name: 'GitHub',
            href: 'https://github.com/archeltaneka',
            icon: <FaGithub className="text-xl" />
        },
        {
            name: 'Email',
            href: 'mailto:archeltaneka@gmail.com',
            icon: <FaEnvelope className="text-xl" />
        }
    ];

    // Function to handle smooth scrolling back to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

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
                            <div className="flex gap-4">
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 text-charcoal hover:bg-sage hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                                        aria-label={link.name}
                                    >
                                        {link.icon}
                                    </motion.a>
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
                    <div className="text-sm text-warm-gray font-mono uppercase tracking-widest">
                        © {new Date().getFullYear()} ARCHEL TANEKA SUTANTO
                    </div>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-charcoal hover:text-sage transition-colors"
                    >
                        Back to Top
                        <span className="text-xl group-hover:-translate-y-1 transition-transform duration-300">↑</span>
                    </motion.button>
                </footer>
            </div>
        </section>
    );
};

export default Contact;