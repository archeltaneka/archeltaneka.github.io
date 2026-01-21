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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const constraintsRef = useRef(null);
    const x = useMotionValue(0);
    const springX = useSpring(x, { damping: 50, stiffness: 400 });

    const filteredProjects = filter === 'all'
        ? projectData
        : projectData.filter(p => p.category === filter);

    // Auto-scroll carousel
    useEffect(() => {
        if (isHovered || isDragging || filteredProjects.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, [isHovered, isDragging, filteredProjects.length]);

    // Reset to first slide when filter changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [filter]);

    const handleDragEnd = (event, info) => {
        const threshold = 50;
        const swipeVelocity = Math.abs(info.velocity.x);

        if (swipeVelocity > 500 || Math.abs(info.offset.x) > threshold) {
            if (info.offset.x > 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            } else if (info.offset.x < 0 && currentIndex < filteredProjects.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }
        setIsDragging(false);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    };

    return (
        <section id="projects" className="relative py-32 bg-gradient-to-br from-deep-sea via-deep-sea/98 to-sky-blue/10 overflow-hidden">

            {/* Background Effects */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(238, 238, 238) 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-40 -right-40 w-96 h-96 bg-lavender/20 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "4rem" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="h-1 bg-gradient-to-r from-lavender to-sky-blue rounded-full mb-6"
                        />
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl lg:text-6xl font-black text-frost mb-4 tracking-tight"
                        >
                            Selected Projects
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-frost/70 leading-relaxed"
                        >
                            Explore my work across machine learning, NLP, and computer vision.
                        </motion.p>
                    </div>

                    {/* Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-3"
                    >
                        {['all', 'machine-learning', 'nlp', 'computer-vision', 'data-analysis'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${filter === cat
                                    ? 'bg-gradient-to-r from-lavender to-sky-blue text-deep-sea shadow-lg shadow-lavender/30 font-bold'
                                    : 'bg-frost/10 border border-frost/20 text-frost/70 hover:bg-frost/20 hover:text-frost'
                                    }`}
                            >
                                {cat.replace('-', ' ')}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="overflow-hidden" ref={constraintsRef}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${filter}-${currentIndex}`}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={handleDragEnd}
                                className="cursor-grab active:cursor-grabbing"
                            >
                                {filteredProjects.length > 0 ? (
                                    <ProjectCard project={filteredProjects[currentIndex]} />
                                ) : (
                                    <div className="text-center py-20">
                                        <p className="text-frost/50 text-lg">No projects found in this category.</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Arrows */}
                    {filteredProjects.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-frost/10 backdrop-blur-md border border-frost/20 flex items-center justify-center text-frost hover:bg-frost hover:text-deep-sea transition-all group z-10"
                                aria-label="Previous project"
                            >
                                <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-frost/10 backdrop-blur-md border border-frost/20 flex items-center justify-center text-frost hover:bg-frost hover:text-deep-sea transition-all group z-10"
                                aria-label="Next project"
                            >
                                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {/* Progress Indicators */}
                {filteredProjects.length > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-12">
                        {filteredProjects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="group relative"
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                <div className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-12 bg-gradient-to-r from-lavender to-sky-blue'
                                    : 'w-8 bg-frost/30 group-hover:bg-frost/50'
                                    }`} />
                            </button>
                        ))}
                    </div>
                )}

                {/* Project Counter */}
                {filteredProjects.length > 0 && (
                    <div className="text-center mt-8">
                        <span className="text-frost/50 font-mono text-sm">
                            {String(currentIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
};

const ProjectCard = ({ project }) => {
    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-frost/5 backdrop-blur-sm border border-frost/10 rounded-3xl p-8 lg:p-12">

            {/* Image Side */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 to-sky-blue/30 rounded-2xl blur-2xl group-hover:blur-3xl transition-all" />

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-frost/20 shadow-2xl">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </div>

                {/* Category Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-lavender to-sky-blue px-6 py-2 rounded-full shadow-lg">
                    <span className="text-deep-sea font-mono text-xs font-bold uppercase tracking-wider">
                        {project.category.replace('-', ' ')}
                    </span>
                </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-6"
            >
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-xs font-mono uppercase tracking-wider bg-frost/10 border border-frost/20 px-3 py-1.5 rounded-full text-frost/80"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className="text-4xl lg:text-5xl font-black text-frost leading-tight tracking-tight">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-frost/70 leading-relaxed">
                    {project.description}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a
                        href={project.live}
                        target='_blank'
                        className="group inline-flex items-center gap-2 px-8 py-4 bg-frost text-deep-sea rounded-full font-bold hover:shadow-2xl hover:shadow-lavender/30 transition-all"
                    >
                        <span>View Live Project</span>
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>

                    {project.github !== '#' && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full border-2 border-frost/30 flex items-center justify-center text-frost hover:bg-frost hover:text-deep-sea transition-all"
                            aria-label="View on GitHub"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Projects;