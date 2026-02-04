import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectData = [
    {
        id: 'mobiles-analysis',
        title: '2025 Mobile Phones Analysis',
        description: 'Interactive dashboard analyzing market trends and features of smartphones in 2025.',
        impact: "Cleaned and processed 100+ smartphone attributes using a fully automated custom wrangling pipeline.",
        stack_details: ["Python", "Streamlit", "Plotly", "Pandas"],
        image: '/assets/img/mobiles-analysis.webp',
        github: 'https://github.com/archeltaneka/mobiles-dataset-2025-analysis',
        live: 'https://archeltaneka-mobiles-dataset-2025-analysis-app-fz8tnw.streamlit.app/',
        type: 'app'
    },
    {
        id: 'slot-filling',
        title: 'NLU Intent Detection & Slot Filling',
        description: 'Comparative study of NLU architectures for conversational agents.',
        impact: "Benchmarked 4 distinct architectures (CRF, Joint Bi-LSTM, Joint Bi-LSTM with Attention, and BERT), achieving +90% F1-score.",
        stack_details: ["PyTorch", "Transformers (BERT)", "Scikit-learn", "CRF"],
        image: '/assets/img/slot-filling-intent-detection.png',
        github: 'https://github.com/archeltaneka/slot-filling-intent-detection',
        live: 'https://archeltaneka-slot-filling-intent-detection-app-vcbymi.streamlit.app/',
        type: 'app'
    },
    {
        id: 'stock-prediction',
        title: 'Monash Stock Performance Prediction',
        description: 'Predictive modeling for stock performance against the Monash Index.',
        impact: "Achieved significant predictive lift using ensemble methods with 0.103 RMSE on regression problem and 0.8545 F1-score on classification problem.",
        stack_details: ["XGBoost", "CatBoost", "Scikit-learn", "Python"],
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
        github: 'https://github.com/archeltaneka/monash_stock_performance_prediction',
        type: 'notebook'
    },
    {
        id: 'pokemon-battle',
        title: 'Pokemon Battle Predictor',
        description: 'Machine learning model to predict 1v1 battle outcomes.',
        impact: "Deployed interactive RShiny app for real-time battle simulation with 90% predictive accuracy by leveraging type effectiveness analysis, moveset insights, and pokemon stats (HP, Attack, Defense, etc.)",
        stack_details: ["R", "RShiny", "Random Forest", "XGBoost"],
        image: '/assets/img/pokemon-battle-analysis.png',
        github: 'https://github.com/archeltaneka/pokemon-battle-analysis',
        live: 'https://archeltaneka.shinyapps.io/pokemon-battle-analysis/',
        type: 'app'
    },
    {
        id: 'melbourne-air',
        title: 'Melbourne Urban Analytics',
        description: 'Spatiotemporal analysis of air quality and pedestrian traffic.',
        impact: "Visualized correlation between traffic density and PM2.5 levels by combinng 765k+ records of environmental data and 8.7k+ records across 80+ locations of pedestrian data.",
        stack_details: ["D3.js", "Tableau", "Python", "JavaScript"],
        image: '/assets/img/melbourne-air-quality-pedestrian-traffic-analysis.webp',
        github: 'https://github.com/archeltaneka/melbourne-air-quality-pedestrian-traffic-analysis',
        live: 'https://melbourne-air-quality-pedestrian-tr.vercel.app/',
        type: 'app'
    },
    {
        id: 'chest-xray',
        title: 'Chest X-Ray Classification',
        description: 'Deep learning model for disease classification with explainable AI.',
        impact: "Implemented Grad-CAM to visualize model attention for medical interpretability across 10+ common chest pathologies with +80% F1-score.",
        stack_details: ["TensorFlow/Keras", "CNNs", "Grad-CAM", "Python"],
        image: '/assets/img/common-chest-x-ray-classification.webp',
        github: 'https://github.com/archeltaneka/common-chest-x-ray-classification',
        live: null,
        type: 'notebook'
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                }
            }}
            className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative h-48 sm:h-64 overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10" />
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Type Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-slate-800 rounded-full shadow-sm">
                        {project.type === 'app' ? 'Web App' : 'Notebook'}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {project.description}
                    </p>
                </div>

                {/* Metrics / Impact Highlight */}
                <div className="mb-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <p className="text-xs md:text-sm font-medium text-blue-800">
                            {project.impact}
                        </p>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack_details.map(tech => (
                            <span key={tech} className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-wider rounded-md">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            Code
                        </a>
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="py-32 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
                            Selected Works<span className="text-blue-600">.</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-light leading-relaxed">
                            A showcase of technical problems solved with data, from end-to-end applications to deep analytical notebooks.
                        </p>
                    </div>

                    {/* Github Stat / Decorative */}
                    <div className="hidden md:block text-right">
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Repositories</div>
                        <div className="text-3xl font-black text-slate-800">25+</div>
                    </div>
                </div>

                {/* Grid Layout */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projectData.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Projects;
