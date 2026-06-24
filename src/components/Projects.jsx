import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectData = [
    {
        id: 'cherebowl',
        title: 'ChèreBowl',
        problem: "Food insecurity data and emergency relief service information were scattered across multiple public sources, making it difficult to identify where need, access barriers, and available support overlap.",
        method: "Designed an end-to-end unified data pipeline including schema-backed loading, Victorian LGA geospatial joins, food-insecurity metric aggregation, and interactive Mapbox/D3 visual analytics.",
        result: "Cleaned, wrangled, and transformed raw public datasets from 10+ different sources into translatable, easy-to-digest, and communicable insights",
        stack_details: [
            "Python",
            "Pandas",
            "GeoPandas",
            "FastAPI",
            "SQLAlchemy",
            "PostgreSQL/PostGIS",
            "Nuxt",
            "Vue",
            "Mapbox GL",
            "D3.js"
        ],
        image: '/assets/img/cherebowl.webp',
        github: 'https://github.com/TP14-5201/aegis',
        live: 'https://cherebowl.vercel.app/',
        type: 'app'
    },
    {
        id: 'dag-nabit',
        title: 'DAG-nabit',
        problem: "Marketing teams needed a clearer way to compare how different strategies could affect customer purchase behavior.",
        method: "Built an interactive causal inference workflow with DAG exploration, treatment-effect estimation, and model diagnostics.",
        result: "+3.88% estimated purchase probability lift with 1.05% error.",
        stack_details: ["Python", "Streamlit", "Plotly", "Scikit-learn", "EconML", "CausalML"],
        image: '/assets/img/dag-nabit.webp',
        github: 'https://github.com/archeltaneka/DAG-nabit',
        live: 'https://dag-nabit.streamlit.app/',
        type: 'app'
    },
    {
        id: 'slot-filling',
        title: 'NLU Intent Detection & Slot Filling',
        problem: "Conversational agents need reliable intent and slot extraction before downstream automation can be trusted.",
        method: "Benchmarked CRF, Joint Bi-LSTM, attention-based Bi-LSTM, and BERT models with consistent evaluation.",
        result: "Achieved 90%+ F1-score across the strongest NLU architectures.",
        stack_details: ["Python", "Streamlit", "PyTorch", "Transformers (BERT)", "Scikit-learn", "CRF"],
        image: '/assets/img/slot-filling-intent-detection.webp',
        github: 'https://github.com/archeltaneka/slot-filling-intent-detection',
        live: 'https://archeltaneka-slot-filling-intent-detection-app-vcbymi.streamlit.app/',
        type: 'app'
    }
];

const ProjectCard = ({ project }) => {
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
                </div>

                <div className="space-y-4 mb-6">
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Problem</div>
                        <p className="text-sm text-slate-600 leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Method</div>
                        <p className="text-sm text-slate-600 leading-relaxed">{project.method}</p>
                    </div>
                    <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                        <div className="text-[10px] font-black uppercase tracking-wider text-blue-500 mb-1">Result</div>
                        <p className="text-sm font-bold text-blue-900">{project.result}</p>
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

                {/* Header  */}
                <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24 gap-6">
                    <div className="max-w-3xl px-4">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            Selected Case Studies
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
                            Projects selected for decision quality: causal reasoning, model evaluation,
                            deployment-minded interfaces, and measurable business or user impact.
                        </p>
                    </div>

                    {/* Github Stat*/}
                    <div className="flex flex-col items-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                            Public Repositories
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-[1px] w-8 bg-slate-200" />
                            <div className="text-2xl font-black text-slate-800">25+</div>
                            <div className="h-[1px] w-8 bg-slate-200" />
                        </div>
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
                    {projectData.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Projects;
