import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

// Combined Data: Sorted from most recent to oldest
const combinedTimeline = [
    {
        type: 'education',
        title: "Master of Data Science",
        subtitle: "Monash University, Australia",
        icon: "../assets/img/monash-logo.png",
        date: "Jul 2024 - Present",
        points: ["Data Wrangling", "Data Exploration & Visualization", "Statistical Data Modelling", "Big Data Processing", "Applied Data Analysis"],
        description: "Focusing on advanced statistical techniques and large-scale data systems to solve complex analytical challenges. Key units:",
        image: "../assets/img/monash.jpg",
        gallery: [
            "../assets/img/monash-1.jpg",
            "../assets/img/monash-2.jpg",
            "../assets/img/monash-3.jpg"
        ]
    },
    {
        type: 'experience',
        title: "Associate Data Scientist",
        subtitle: "tiket.com, Indonesia",
        icon: "../assets/img/tiket-logo.png",
        date: "Oct 2022 - Jul 2024",
        points: [
            "Developed payment recommendation model (94B IDR GBV uplift)",
            "Improved hotel inventory image quality classification by 10%",
            "Reduced RPA costs by 150M IDR annually"
        ],
        description: "Led high-impact ML initiatives for one of SE Asia's largest travel platforms.",
        image: "../assets/img/tiket.jpg",
        gallery: [
            "../assets/img/tiket-1.jpg",
            "../assets/img/tiket-1.png",
            "../assets/img/tiket-2.jpg",
            "../assets/img/tiket-3.jpg"
        ]
    },
    {
        type: 'experience',
        title: "Junior Data Scientist",
        subtitle: "Sayurbox, Indonesia",
        icon: "../assets/img/sayurbox-logo.png",
        date: "May 2020 - Oct 2021",
        points: [
            "Developed market basket analysis system, item recommendations system, and automated courier delivery assignments.",
            "Improved internal reporting processes for more than 5 stakeholders.",
            "Developed item stock forecasting model."
        ],
        description: "My first job as a Data Scientist for an e-commerce grocery platform company based in Jakarta.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    },
    {
        type: 'education',
        title: "Bachelor of Science (Hons.)",
        subtitle: "University of Nottingham, UK",
        icon: "../assets/img/nottingham-logo.png",
        date: "Sep 2019 - Sep 2020",
        points: ["First Class Degree", "Computer Science with AI", "Undergraduate Dissertation: Top 10 Common Chest X-ray Classification & Localization"],
        description: "Graduated with top honors, specializing in Computer Science with Artificial Intelligence.",
        image: "../assets/img/nottingham.jpg",
        gallery: [
            "../assets/img/nottingham-1.jpg",
            "../assets/img/nottingham-2.jpg",
            "../assets/img/nottingham-3.jpg",
            "../assets/img/nottingham-4.jpg"
        ]
    },
    {
        type: 'education',
        title: "Bachelor of Science",
        subtitle: "Bina Nusantara University, Indonesia",
        icon: "../assets/img/binus-logo.png",
        date: "Sep 2016 - Sep 2020",
        points: ["GPA: 3.74/4.0", "International Program", "Teaching Assistant for Introduction to Database Unit"],
        description: "Built a strong foundation in computer science while serving as a mentor for junior students.",
        image: "../assets/img/binus.jpg",
        gallery: [
            "https://lh3.googleusercontent.com/u/0/d/1yB5bpV3fkfCRhUxef5p4iEif-WMoncQ1",
            "../assets/img/binus-2.jpg",
            "../assets/img/binus-3.jpg",
            "../assets/img/binus-4.jpg"
        ]
    }
];

const allItems = [{ type: 'header' }, ...combinedTimeline];

const ScatteredImages = ({ images, type }) => {
    const positions = [
        { top: '-10%', left: '-15%', rotate: -12, w: '250px', h: '200px' },
        { top: '60%', left: '-10%', rotate: 8, w: '200px', h: '150px' },
        { top: '-5%', right: '-12%', rotate: 15, w: '170px', h: '200px' },
        { bottom: '5%', right: '-5%', rotate: -5, w: '150px', h: '100px' },
    ];

    if (!images) return null;

    return (
        <>
            {images.slice(0, 4).map((src, i) => (
                <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, i % 2 === 0 ? 10 : -10, 0]
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                        delay: 0.4 + (i * 0.1),
                        duration: 0.5,
                        y: { repeat: Infinity, duration: 3 + i, ease: "easeInOut" }
                    }}
                    style={{
                        top: positions[i].top,
                        left: positions[i].left,
                        right: positions[i].right,
                        bottom: positions[i].bottom,
                        rotate: positions[i].rotate,
                        position: 'absolute',
                        width: positions[i].w,
                        height: positions[i].h,
                        zIndex: 30 // Set higher than the main image's z-20
                    }}
                    className="hidden xl:block"
                >
                    {/* Added a slightly larger shadow and hover effect since they are now in front */}
                    <motion.div
                        whileHover={{ scale: 1.1, zIndex: 40 }}
                        className="w-full h-full rounded-xl overflow-hidden border-4 border-white shadow-2xl transition-shadow"
                    >
                        <img src={src} alt="Gallery item" className="w-full h-full object-cover" />
                    </motion.div>
                </motion.div>
            ))}
        </>
    );
};

const TimelineContent = ({ item, index }) => {
    if (item.type === 'header') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="text-center space-y-6 max-w-4xl px-6"
            >
                <div className="h-1 w-24 bg-gradient-to-r from-lavender to-sky-blue rounded-full mx-auto" />
                <h2 className="text-6xl lg:text-8xl font-black text-deep-sea tracking-tighter uppercase">
                    The Journey<span className="text-lavender">.</span>
                </h2>
                <p className="text-xl lg:text-2xl text-deep-sea/60 leading-relaxed font-light">
                    A unified look at my professional and academic evolution.
                </p>
            </motion.div>
        );
    }

    const isEven = index % 2 === 0;

    return (
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isEven ? -50 : 50 }}
                className={`${!isEven ? 'lg:order-2' : ''} space-y-6`}
            >
                {/* Dynamic Type Badge */}
                <div className="flex items-center gap-4">
                    <div className="inline-flex items-center gap-3 bg-deep-sea/5 border border-deep-sea/10 rounded-full px-4 py-2">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${item.type === 'education' ? 'bg-sky-blue' : 'bg-lavender'}`} />
                        <span className="font-mono text-xs font-bold text-deep-sea uppercase tracking-widest">{item.date}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-sea/30">
                        {item.type}
                    </span>
                </div>

                <div className="space-y-2">
                    <h3 className="text-4xl lg:text-6xl font-black text-deep-sea leading-none tracking-tight">
                        {item.title}
                    </h3>
                    <div className="flex items-center gap-3">
                        {item.icon && (
                            <div className="w-8 h-8 rounded-full bg-white border border-deep-sea/10 overflow-hidden flex items-center justify-center p-1 shrink-0 shadow-sm">
                                <img
                                    src={item.icon}
                                    alt={`${item.subtitle} logo`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                        <p className="text-xl text-sky-blue font-bold tracking-tight">
                            {item.subtitle}
                        </p>
                    </div>
                </div>

                <p className="text-lg text-deep-sea/70 font-light leading-relaxed">
                    {item.description}
                </p>

                <div className="space-y-3 pt-4">
                    {item.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 group">
                            <div className={`mt-2 w-2 h-2 rounded-full shrink-0 ${item.type === 'education' ? 'bg-sky-blue/50' : 'bg-lavender/50'}`} />
                            <p className="text-deep-sea/80 font-medium">{point}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Image Side */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: isEven ? 5 : -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`${!isEven ? 'lg:order-1' : ''} relative`}
            >
                <div className={`absolute inset-0 blur-3xl rounded-full opacity-20 ${item.type === 'education' ? 'bg-sky-blue' : 'bg-lavender'}`} />

                {/* Main Image Container */}
                <div className="relative z-20 aspect-[4/3] rounded-3xl overflow-hidden border-2 border-frost shadow-2xl">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Scattered Gallery */}
                <ScatteredImages images={item.gallery} type={item.type} />
            </motion.div>
        </div>
    );
};

const Timeline = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const step = 1 / allItems.length;
        const index = Math.min(Math.floor(latest / step), allItems.length - 1);
        if (index !== activeIndex) setActiveIndex(index);
    });

    return (
        <section ref={containerRef} id="timeline" className="relative h-[500vh] bg-frost">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #213C51 1px, transparent 0)`, backgroundSize: '40px 40px' }}
                />

                <AnimatePresence mode="wait">
                    <motion.div key={activeIndex} className="w-full h-full flex items-center justify-center">
                        <TimelineContent item={allItems[activeIndex]} index={activeIndex} />
                    </motion.div>
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
                    {allItems.map((_, i) => (
                        <div key={i} className={`w-1 transition-all duration-500 rounded-full ${i === activeIndex ? 'h-12 bg-lavender' : 'h-4 bg-deep-sea/10'}`} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;