import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub } from 'react-icons/fa'; // Add this to your imports

const projectData = [
    {
        id: 'mobiles-analysis',
        title: '2025 Mobile Phones Analysis',
        description: 'Analyzing the 2025 mobile phone market through an interactive dashboard',
        category: 'data-analysis',
        tags: ['Data Analysis', 'Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Plotly', 'Streamlit'],
        image: '../assets/img/mobiles-analysis.png',
        github: 'https://github.com/archeltaneka/mobiles-dataset-2025-analysis',
        live: 'https://archeltaneka-mobiles-dataset-2025-analysis-app-fz8tnw.streamlit.app/',
        type: 'app'
    },
    {
        id: 'slot-filling',
        title: 'Slot Filling & Intent Detection',
        description: 'Implementing NLU approaches for conversational AI systems, comparing different model architectures.',
        category: 'nlp',
        tags: ['Python', 'NLP', 'PyTorch', 'Transformers'],
        image: '../assets/img/slot-filling-intent-detection.png',
        github: 'https://github.com/archeltaneka/slot-filling-intent-detection',
        live: 'https://archeltaneka-slot-filling-intent-detection-app-vcbymi.streamlit.app/',
        type: 'app'
    },
    {
        id: 'stock-performance-prediction',
        title: 'Monash Stock Performance Prediction',
        description: 'Predict whether US stocks are likely to outperform or underperform the US Monash Index benchmark and the excess return value.',
        category: 'machine-learning',
        tags: ['Regression', 'Classification', 'Python', 'Scikit-learn', 'XGBoost', 'Catboost'],
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop..',
        github: 'https://github.com/archeltaneka/slot-filling-intent-detection',
        live: 'https://github.com/archeltaneka/monash_stock_performance_prediction/blob/main/notebooks/modelling_experiment_regression.ipynb',
        type: 'analysis'
    },
    {
        id: 'pokemon-battle-analysis',
        title: 'Pokemon Battle Analysis',
        description: 'Analyzing and building a 1v1 Pokemon battle prediction model.',
        category: 'machine-learning',
        tags: ['R', 'RShiny', 'Machine Learning', 'Data Analysis'],
        image: '../assets/img/pokemon-battle-analysis.png',
        github: 'https://github.com/archeltaneka/pokemon-battle-analysis',
        live: 'https://archeltaneka.shinyapps.io/pokemon-battle-analysis/',
        type: 'app'
    },
    {
        id: 'melbourne-air-quality-pedestrian-traffic-analysis',
        title: 'Melbourne Air Quality & Pedestrian Traffic Analysis',
        description: 'Analyzing Melbourne air quality and pedestrian traffic data.',
        category: 'data-analysis',
        tags: ['Data Analysis', 'R', 'Python', 'Tableau', 'HTML', 'CSS', 'JavaScript', 'D3.js', 'Vercel'],
        image: '../assets/img/melbourne-air-quality-pedestrian-traffic-analysis.png',
        github: 'https://github.com/archeltaneka/melbourne-air-quality-pedestrian-traffic-analysis',
        live: 'https://melbourne-air-quality-pedestrian-tr.vercel.app/',
        type: 'app'
    },
    {
        id: 'table-tennis-analytics',
        title: 'Table Tennis Analytics',
        description: 'Analyzing table tennis match video and map their movements into a heatmap plot to analyze the efficiency of their movements.',
        category: 'computer-vision',
        tags: ['Computer Vision', 'Deep Learning', 'Python', 'YOLO', 'OpenCV'],
        image: '../assets/img/table-tennis-analytics.png',
        github: 'https://github.com/archeltaneka/table-tennis-analytics',
        live: 'https://github.com/archeltaneka/table-tennis-analytics/blob/master/table_tennis_analytic_playground.ipynb',
        type: 'notebook'
    },
    {
        id: 'common-chest-x-ray-classification',
        title: 'Common Chest X-Ray Classification',
        description: 'My undergraduate dissertation submission bout predicting and classifying chest x-rays into 10 common chest diseases using deep learning with Grad-CAM localization.',
        category: 'computer-vision',
        tags: ['Computer Vision', 'Deep Learning', 'CNN', 'Grad-CAM', 'Python'],
        image: '../assets/img/common-chest-x-ray-classification.jpeg',
        github: 'https://github.com/archeltaneka/common-chest-x-ray-classification',
        live: 'https://github.com/archeltaneka/common-chest-x-ray-classification/blob/master/app/chest_xray_pneumonia_predictor.ipynb',
        type: 'notebook'
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
                        {['all', 'machine-learning', 'nlp', 'data-analysis', 'computer-vision'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setFilter(cat); setSelectedId(null); }}
                                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${filter === cat ? 'bg-lavender text-deep-sea' : 'bg-frost/10 text-frost/50'}`}
                            >
                                {cat.replace('-', ' ').toUpperCase()}
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
                                            <a
                                                href={selectedProject.demo || selectedProject.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-8 py-4 bg-lavender text-deep-sea rounded-xl font-black text-center hover:bg-white hover:scale-[1.02] transition-all shadow-lg shadow-lavender/10"
                                            >
                                                {selectedProject.type === "app" ? "Live Demo" : "View Notebook"}
                                            </a>
                                            <a
                                                href={selectedProject.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-14 h-14 flex items-center justify-center border border-frost/20 text-frost rounded-xl hover:bg-frost/10 hover:border-lavender/50 transition-all duration-300 group"
                                                aria-label="View on GitHub"
                                            >
                                                <FaGithub className="text-2xl group-hover:scale-110 group-hover:text-lavender transition-transform" />
                                            </a>
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