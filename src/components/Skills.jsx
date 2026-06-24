import React from 'react';
import { motion } from 'framer-motion';

const skillGroups = [
    {
        category: "Languages",
        skills: [
            { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            { name: 'R', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
            { name: 'JavaScript', logo: 'https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/javascript/javascript-original.svg' },
            { name: 'HTML/CSS', logo: 'https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/html5/html5-original.svg' }
        ]
    },
    {
        category: "Data Science, Machine Learning & AI",
        skills: [
            { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
            { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
            { name: 'Scikit-learn', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
            { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
            { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
            { name: 'Matplotlib', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
            { name: 'LLama', logo: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/ollama.svg' }
        ]
    },
    {
        category: "Tools & DevOps",
        skills: [
            { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'Jupyter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
            { name: 'Tableau', logo: 'https://img.icons8.com/?size=100&id=9Kvi1p1F0tUo&format=png&color=000000' }
        ]
    },
    {
        category: "Cloud & Big Data",
        skills: [
            { name: 'GCP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
            { name: 'BigQuery', logo: 'https://www.vectorlogo.zone/logos/google_bigquery/google_bigquery-icon.svg' },
            { name: 'PySpark', logo: 'https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/apachespark/apachespark-original.svg' },
            { name: 'Databricks', logo: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/databricks.svg' }
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-6 max-w-6xl">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        Technical Expertise
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
                        A comprehensive toolkit built through <span className="text-blue-600 font-medium italic">academic excellence</span> and <span className="text-blue-600 font-medium italic">professional experience</span> in production environments.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {skillGroups.map((group, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider mb-8 border-b border-slate-100 pb-4">
                                {group.category}
                            </h3>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                                className="grid grid-cols-2 sm:grid-cols-3 gap-6"
                            >
                                {group.skills.map((skill, sIdx) => (
                                    <motion.div
                                        key={sIdx}
                                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                        whileHover={{ y: -5 }}
                                        className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors group cursor-default"
                                    >
                                        <div className="w-10 h-10 grayscale group-hover:grayscale-0 transition-all duration-300">
                                            <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="text-xs font-semibold text-slate-500 group-hover:text-slate-900 text-center">
                                            {skill.name}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Skills;
