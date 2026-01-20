import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { name: 'Python', level: 95 },
    { name: 'Pandas / NumPy', level: 90 },
    { name: 'Jupyter Notebook', level: 90 },
    { name: 'SQL', level: 85 },
    { name: 'Scikit-learn / ML', level: 85 },
    { name: 'Git / GitHub', level: 85 },
];

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-[#faf9f7]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4"
                    >
                        Technical Expertise
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-warm-gray max-w-2xl mx-auto"
                    >
                        A comprehensive data science toolkit built through academic excellence and
                        industry experience at tiket.com.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        {skills.map((skill, index) => (
                            <div key={skill.name} className="skill-item">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-mono text-sm uppercase tracking-widest text-charcoal font-bold">
                                        {skill.name}
                                    </span>
                                    <span className="font-mono text-sm text-sage">{skill.level}%</span>
                                </div>
                                <div className="h-[2px] w-full bg-gray-200 relative overflow-hidden">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-sage"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 1.5,
                                            delay: index * 0.1,
                                            ease: [0.22, 1, 0.36, 1] // Luxurious "quint" easing
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Decorative Data Visual (Lando Norris style) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative hidden lg:block"
                    >
                        <div className="aspect-square bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center border border-gray-100">
                            {/* Minimalist Data Representation */}
                            <div className="grid grid-cols-3 gap-4 w-full h-full">
                                {[...Array(9)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            height: ["40%", "80%", "50%"],
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: i * 0.2
                                        }}
                                        className="bg-sage/20 rounded-full self-end"
                                    />
                                ))}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-playfair text-8xl font-bold text-sage/10">DATA</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;