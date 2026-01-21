import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const projectData = [
    {
        id: 'mobiles-analysis',
        title: '2025 Mobile Phones Analysis',
        description: 'Analyzing the 2025 mobile phone market through an interactive dashboard',
        category: 'data-analysis',
        tags: ['Data Analysis', 'Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Plotly', 'Streamlit'],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        github: 'https://github.com/archeltaneka/mobiles-dataset-2025-analysis',
        live: 'https://archeltaneka-mobiles-dataset-2025-analysis-app-fz8tnw.streamlit.app/'
    },
    {
        id: 'slot-filling',
        title: 'Slot Filling & Intent Detection',
        description: 'Implementing NLU approaches for conversational AI systems, comparing different model architectures.',
        category: 'nlp',
        tags: ['NLP', 'PyTorch', 'Transformers'],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        github: 'https://github.com/archeltaneka/slot-filling-intent-detection',
        live: 'https://archeltaneka-slot-filling-intent-detection-app-vcbymi.streamlit.app/'
    },
    {
        id: 'stock-prediction',
        title: 'Stock Performance Prediction',
        description: 'Predicting stock outperformance against the Monash Index benchmark using ensemble learning.',
        category: 'machine-learning',
        tags: ['Regression', 'XGBoost', 'Feature Engineering'],
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
        github: 'https://github.com/archeltaneka/monash_stock_performance_prediction',
        live: '#'
    },
    {
        id: 'melbourne-air-quality-pedestrian-traffic-analysis',
        title: 'Melbourne Air Quality & Pedestrian Traffic Analysis',
        description: 'Analyzing Melbourne air quality and pedestrian traffic data.',
        category: 'data-analysis',
        tags: ['Data Analysis', 'R', 'Python', 'Tableau', 'HTML', 'CSS', 'JavaScript', 'D3.js', 'Vercel'],
        image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&h=600&fit=crop',
        github: 'https://github.com/archeltaneka/melbourne-air-quality-pedestrian-traffic-analysis',
        live: 'https://melbourne-air-quality-pedestrian-tr.vercel.app/'
    },
    {
        id: 'pokemon-battle-analysis',
        title: 'Pokemon Battle Analysis',
        description: 'Analyzing and building a 1v1 Pokemon battle prediction model.',
        category: 'machine-learning',
        tags: ['R', 'RShiny', 'Machine Learning', 'Data Analysis'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        github: 'https://github.com/archeltaneka/pokemon-battle-analysis',
        live: 'https://archeltaneka.shinyapps.io/pokemon-battle-analysis/'
    },
    {
        id: 'recommendation-system',
        title: 'Payment Recommendation Engine',
        description: 'ML-powered recommendation system that increased gross booking value by 94B IDR.',
        category: 'machine-learning',
        tags: ['Recommender Systems', 'A/B Testing', 'Python'],
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        github: '#',
        live: '#'
    }
];

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const [selectedId, setSelectedId] = useState(null);
    const [isHoveringHand, setIsHoveringHand] = useState(false);

    const filteredProjects = projectData.filter(p => filter === 'all' || p.category === filter);
    const selectedProject = projectData.find(p => p.id === selectedId);

    return (
        <section
            id="projects"
            className="relative py-32 bg-deep-sea min-h-screen overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                {/* Header Logic */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-black text-frost mb-6">My Deck of Projects</h2>
                    <div className="flex justify-center gap-2">
                        {['all', 'machine-learning', 'nlp', 'data-analysis'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setFilter(cat); setSelectedId(null); }}
                                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${filter === cat ? 'bg-lavender text-deep-sea' : 'bg-frost/10 text-frost/50'}`}
                            >
                                {cat.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* The Playing Field */}
                <div
                    className="relative h-[600px] flex items-center justify-center"
                    onMouseEnter={() => setIsHoveringHand(true)}
                    onMouseLeave={() => setIsHoveringHand(false)}
                >
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            total={filteredProjects.length}
                            isHandExpanded={isHoveringHand}
                            onClick={() => setSelectedId(project.id)}
                        />
                    ))}
                </div>

                {/* Dealt Card (Modal View) */}
                <AnimatePresence>
                    {selectedId && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-deep-sea/90 backdrop-blur-xl"
                            onClick={() => setSelectedId(null)}
                        >
                            <motion.div
                                layoutId={selectedId}
                                className="bg-frost/5 border border-frost/20 p-1 rounded-3xl max-w-5xl w-full shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[22px]">
                                    <img src={selectedProject.image} alt="" className="h-full w-full object-cover min-h-[400px]" />
                                    <div className="p-10 bg-frost/5 flex flex-col justify-center">
                                        <span className="text-lavender font-mono text-sm mb-4 uppercase tracking-widest">{selectedProject.category}</span>
                                        <h3 className="text-4xl font-black text-frost mb-6">{selectedProject.title}</h3>
                                        <p className="text-frost/70 text-lg mb-8 leading-relaxed">{selectedProject.description}</p>
                                        <div className="flex gap-4">
                                            <a href={selectedProject.live} target="_blank" className="flex-1 text-center py-4 bg-frost text-deep-sea font-bold rounded-xl hover:bg-lavender transition-colors">Live Demo</a>
                                            <a href={selectedProject.github} target="_blank" className="px-6 py-4 border border-frost/20 text-frost rounded-xl hover:bg-frost/10 transition-colors">GitHub</a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index, total, isHandExpanded, onClick }) => {
    // Math for the fan shape
    const centerIndex = (total - 1) / 2;
    const distanceFromCenter = index - centerIndex;

    // When hand is expanded, increase the multiplier for the X offset
    const xOffset = isHandExpanded ? distanceFromCenter * 180 : distanceFromCenter * 40;
    const rotate = distanceFromCenter * 8;
    const yOffset = Math.pow(Math.abs(distanceFromCenter), 2) * 12;

    return (
        <motion.div
            layoutId={project.id}
            onClick={onClick}
            initial={false}
            animate={{
                x: xOffset,
                y: yOffset,
                rotate: rotate,
                zIndex: index
            }}
            whileHover={{
                y: -120, // "Pick" the card up
                rotate: 0,
                zIndex: 50,
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            className="absolute w-64 h-80 cursor-pointer group"
        >
            {/* Inner Card Styling */}
            <div className="relative w-full h-full bg-[#1a1a1a] border-4 border-frost/10 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:border-lavender/50">
                {/* Card Art */}
                <div className="h-2/3 overflow-hidden bg-deep-sea">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                </div>

                {/* Card Label */}
                <div className="h-1/3 p-4 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/50">
                    <h4 className="text-frost font-black text-xs uppercase leading-tight">{project.title}</h4>
                    <div className="flex justify-between items-end">
                        <div className="w-6 h-6 rounded-full border border-frost/30 flex items-center justify-center text-[10px] text-frost/50 font-mono">
                            {index + 1}
                        </div>
                        <span className="text-[8px] text-lavender font-mono uppercase tracking-tighter">Click to Play</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;