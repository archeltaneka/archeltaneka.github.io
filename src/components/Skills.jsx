import React from 'react';
import { motion } from 'framer-motion';

const skillGroups = [
    {
        category: "Languages",
        skills: [
            { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            { name: 'R', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
            { name: 'HTML', logo: 'https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/html5/html5-original.svg' },
            { name: 'CSS', logo: 'https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/tailwindcss/tailwindcss-original.svg' },
            { name: 'JavaScript', logo: 'https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/javascript/javascript-original.svg' },
        ]
    },
    {
        category: "Libraries & ML",
        skills: [
            { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
            { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
            { name: 'Scikit-learn', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
            { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
            { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
        ]
    },
    {
        category: "Tools & DevOps",
        skills: [
            { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'Jupyter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
            { name: 'Tableau', logo: 'https://img.icons8.com/?size=100&id=9Kvi1p1F0tUo&format=png&color=000000' },
        ]
    },
    {
        category: "Cloud & Infrastructure",
        skills: [
            { name: 'Google Cloud (GCP)', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
            { name: 'BigQuery', logo: 'https://www.vectorlogo.zone/logos/google_bigquery/google_bigquery-icon.svg' },
            { name: 'PySpark', logo: 'https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/apachespark/apachespark-original.svg' },
        ]
    }
];

const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section id="skills" className="py-32 min-h-screen bg-frost relative overflow-hidden">
            {/* Subtle Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#213C51 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl lg:text-7xl font-black text-deep-sea tracking-tighter uppercase mb-6"
                        >
                            Technical<br />Expertise<span className="text-lavender">.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-deep-sea/60 leading-relaxed font-light"
                        >
                            A comprehensive toolkit built through academic excellence and
                            high-impact industry experience from <span className="text-sky-blue font-bold">2+ years</span> in the industry.
                        </motion.p>
                    </div>

                    {/* Floating Tech Count */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-deep-sea text-frost px-8 py-6 rounded-2xl shadow-2xl"
                    >
                        <div className="text-4xl font-black text-lavender leading-none">15+</div>
                        <div className="text-xs font-mono uppercase tracking-widest mt-2 opacity-60">Tech Stack Tools</div>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
                >
                    {skillGroups.map((group, groupIdx) => (
                        <div key={groupIdx} className="space-y-8">
                            <h3 className="text-sm font-black text-sky-blue uppercase tracking-[0.3em] pl-2 border-l-2 border-lavender">
                                {group.category}
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                {group.skills.map((skill, skillIdx) => (
                                    <motion.div
                                        key={skillIdx}
                                        variants={itemVariants}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="group relative bg-white p-6 rounded-2xl border border-deep-sea/5 shadow-sm hover:shadow-xl hover:border-lavender/20 transition-all duration-300"
                                    >
                                        <div className="h-12 w-12 mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                                            <img
                                                src={skill.logo}
                                                alt={skill.name}
                                                className="w-full h-full object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className="text-sm font-bold text-deep-sea/80 group-hover:text-deep-sea transition-colors font-mono">
                                            {skill.name}
                                        </span>

                                        {/* Corner Accent on Hover */}
                                        <div className="absolute top-2 right-2 w-1 h-1 bg-lavender rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;