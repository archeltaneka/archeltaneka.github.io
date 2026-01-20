import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectData = [
    {
        id: 'slot-filling',
        title: 'Slot Filling & Intent Detection',
        description: 'Implementing NLU approaches for conversational AI systems, comparing different model architectures.',
        category: 'nlp',
        tags: ['NLP', 'PyTorch', 'Transformers'],
        image: 'assets/img/portfolio/slot-filling-intent-detection.png',
        github: '#'
    },
    {
        id: 'stock-prediction',
        title: 'Stock Performance Prediction',
        description: 'Predicting stock outperformance against the Monash Index benchmark using ensemble learning.',
        category: 'machine-learning',
        tags: ['Regression', 'XGBoost', 'Feature Engineering'],
        image: 'https://cdn.pixabay.com/photo/2016/11/23/14/37/blur-1853262_1280.jpg',
        github: 'https://github.com/archeltaneka/monash_stock_performance_prediction'
    }
    // Add more projects from your HTML here...
];

const Projects = () => {
    const [filter, setFilter] = useState('all');

    const filteredProjects = filter === 'all'
        ? projectData
        : projectData.filter(p => p.category === filter);

    return (
        <section id="projects" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4"
                        >
                            Selected Projects
                        </motion.h2>
                        <p className="text-warm-gray text-lg">
                            Explore my work across machine learning, NLP, and data science.
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap gap-2">
                        {['all', 'machine-learning', 'nlp', 'computer-vision'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${filter === cat
                                        ? 'bg-sage text-white shadow-lg shadow-sage/20'
                                        : 'bg-soft-cream text-warm-gray hover:bg-gray-100'
                                    }`}
                            >
                                {cat.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid md:grid-cols-2 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative bg-soft-cream rounded-3xl overflow-hidden border border-gray-100"
                            >
                                {/* Image Container with Hover Zoom */}
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                </div>

                                <div className="p-8">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider bg-white px-2 py-1 rounded text-sage border border-sage/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="font-playfair text-2xl font-bold text-charcoal mb-3 group-hover:text-sage transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-warm-gray mb-6 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <a href="#" className="font-medium text-charcoal hover:underline underline-offset-8 decoration-sage">
                                            View Case Study →
                                        </a>
                                        {project.github !== '#' && (
                                            <a href={project.github} target="_blank" className="text-warm-gray hover:text-charcoal transition-colors">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;