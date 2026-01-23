import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const projectData = [
    {
        id: 'mobiles-analysis',
        title: '2025 Mobile Phones Analysis',
        description: 'Analyzing the 2025 mobile phone market through an interactive dashboard',
        category: 'data-analysis',
        tags: ['Data Analysis', 'Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Plotly', 'Streamlit'],
        image: '/assets/img/mobiles-analysis.webp',
        github: 'https://github.com/archeltaneka/mobiles-dataset-2025-analysis',
        live: 'https://archeltaneka-mobiles-dataset-2025-analysis-app-fz8tnw.streamlit.app/',
        type: 'app'
    },
    {
        id: 'slot-filling',
        title: 'Slot Filling & Intent Detection',
        description: 'Implementing NLU approaches for conversational AI systems, comparing different model architectures.',
        category: 'nlp',
        tags: ['Python', 'Scikit-learn', 'CRF', 'Random Forest', 'NLP', 'PyTorch', 'Transformers'],
        image: '/assets/img/slot-filling-intent-detection.png',
        github: 'https://github.com/archeltaneka/slot-filling-intent-detection',
        live: 'https://archeltaneka-slot-filling-intent-detection-app-vcbymi.streamlit.app/',
        type: 'app'
    },
    {
        id: 'stock-performance-prediction',
        title: 'Monash Stock Performance Prediction',
        description: 'Predict whether US stocks are likely to outperform or underperform the US Monash Index benchmark and the excess return value.',
        category: 'machine-learning',
        tags: ['Python', 'Regression', 'Classification', 'Scikit-learn', 'XGBoost', 'Catboost'],
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop..',
        github: 'https://github.com/archeltaneka/monash_stock_performance_prediction',
        live: 'https://github.com/archeltaneka/monash_stock_performance_prediction/blob/main/notebooks/modelling_experiment_regression.ipynb',
        type: 'analysis'
    },
    {
        id: 'pokemon-battle-analysis',
        title: 'Pokemon Battle Analysis',
        description: 'Analyzing and building a 1v1 Pokemon battle prediction model.',
        category: 'machine-learning',
        tags: ['R', 'RShiny', 'XGBoost', 'Random Forest', 'Data Analysis'],
        image: '/assets/img/pokemon-battle-analysis.png',
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
        image: '/assets/img/melbourne-air-quality-pedestrian-traffic-analysis.webp',
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
        image: '/assets/img/table-tennis-analytics.png',
        github: 'https://github.com/archeltaneka/table-tennis-analytics',
        live: 'https://github.com/archeltaneka/table-tennis-analytics/blob/master/table_tennis_analytic_playground.ipynb',
        type: 'notebook'
    },
    {
        id: 'common-chest-x-ray-classification',
        title: 'Common Chest X-Ray Classification',
        description: 'My undergraduate dissertation submission bout predicting and classifying chest x-rays into 10 common chest diseases using deep learning with Grad-CAM localization.',
        category: 'computer-vision',
        tags: ['Python', 'Computer Vision', 'Deep Learning', 'CNN', 'Grad-CAM'],
        image: '/assets/img/common-chest-x-ray-classification.webp',
        github: 'https://github.com/archeltaneka/common-chest-x-ray-classification',
        live: 'https://github.com/archeltaneka/common-chest-x-ray-classification/blob/master/app/chest_xray_pneumonia_predictor.ipynb',
        type: 'notebook'
    }
];

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % projectData.length);
    };

    const prevProject = () => {
        setCurrentIndex((prev) => (prev - 1 + projectData.length) % projectData.length);
    };

    return (
        <section id="projects" className="py-20 md:py-32 bg-deep-sea overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="mb-12 md:mb-20 text-center lg:text-left">
                    <h2 className="text-5xl md:text-8xl font-black text-frost tracking-tighter uppercase leading-[0.8]">
                        Selected <br /> <span className="text-lavender">Works.</span>
                    </h2>
                </div>

                {/* The Deck Interface */}
                <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Left: Project Preview (The Deck) */}
                    <div className="relative w-full max-w-[340px] md:max-w-[450px] aspect-[3/4] perspective-1000">
                        <AnimatePresence mode="popLayout">
                            {projectData.map((project, index) => {
                                // Calculate position relative to currentIndex
                                const offset = index - currentIndex;
                                const isVisible = index >= currentIndex && index <= currentIndex + 2;

                                if (!isVisible) return null;

                                return (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                                        animate={{
                                            opacity: 1 - offset * 0.3,
                                            x: offset * 40,
                                            z: -offset * 100,
                                            scale: 1 - offset * 0.05,
                                            rotateY: -offset * 10,
                                        }}
                                        exit={{ opacity: 0, x: -200, scale: 0.8 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="absolute inset-0 cursor-pointer"
                                        style={{ zIndex: projectData.length - index }}
                                        onClick={nextProject}
                                    >
                                        <div className="w-full h-full rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-[#1a1a1a]">
                                            <img
                                                src={project.image}
                                                className="w-full h-full object-cover"
                                                alt={project.title}
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Right: Project Details (Always visible, changes with deck) */}
                    <div className="w-full lg:max-w-xl space-y-6 text-center lg:text-left">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <span className="text-lavender font-mono text-sm tracking-[0.3em] uppercase">
                                Project 0{currentIndex + 1} / 0{projectData.length}
                            </span>
                            <h3 className="text-3xl md:text-5xl font-black text-frost uppercase tracking-tighter">
                                {projectData[currentIndex].title}
                            </h3>
                            <p className="text-frost/60 text-lg md:text-xl font-light leading-relaxed">
                                {projectData[currentIndex].description}
                            </p>

                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {projectData[currentIndex].tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-frost/5 border border-frost/10 text-frost/40 text-[10px] font-mono uppercase rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-6 pt-8">
                                <a href={projectData[currentIndex].github} target="_blank" className="flex items-center gap-2 text-frost hover:text-lavender transition-all group">
                                    <FaGithub size={24} />
                                    <span className="font-bold uppercase text-sm tracking-widest">Source</span>
                                </a>
                                <a href={projectData[currentIndex].live} target="_blank" className="flex items-center gap-2 text-frost hover:text-sky-blue transition-all group">
                                    <FaExternalLinkAlt size={20} />
                                    <span className="font-bold uppercase text-sm tracking-widest">
                                        {projectData[currentIndex].type === "app" ? "Live Demo" : "View Notebook"}
                                    </span>
                                </a>
                            </div>
                        </motion.div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 mt-12">
                            <button onClick={prevProject} className="p-4 rounded-full border border-frost/20 text-frost hover:bg-frost hover:text-deep-sea transition-all">
                                <FaChevronLeft />
                            </button>
                            <button onClick={nextProject} className="p-4 rounded-full border border-frost/20 text-frost hover:bg-frost hover:text-deep-sea transition-all">
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
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