import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

// Combined Data: Sorted from most recent to oldest
const combinedTimeline = [
    {
        type: 'education',
        title: "Master of Data Science",
        subtitle: "Monash University, Australia",
        icon: "/assets/img/monash-logo.png",
        date: "Jul 2024 - Present",
        points: ["Data Wrangling", "Data Exploration & Visualization", "Statistical Data Modelling", "Big Data Processing", "Applied Data Analysis"],
        description: "Focusing on advanced statistical techniques and large-scale data systems to solve complex analytical challenges. Key units:",
        image: "/assets/img/monash.webp"
    },
    {
        type: 'experience',
        title: "Associate Data Scientist",
        subtitle: "tiket.com, Indonesia",
        icon: "/assets/img/tiket-logo.png",
        date: "Oct 2022 - Jul 2024",
        points: [
            "Developed a mathematical model for payment method recommendation that boosted payment conversion rate by 4.8%.",
            "Developed a CatBoost room grouping model with similarity scoring, achieving 90% accuracy in hotel listing classification.",
            "Optimized a hotel recommendation engine utilizing POI and geospatial analytics.",
            "Streamlined flight reschedule identification process by developing automated algorithms."
        ],
        description: "Led high-impact ML initiatives for one of SE Asia's largest travel platforms.",
        image: "/assets/img/tiket.webp"
    },
    {
        type: 'experience',
        title: "Junior Data Scientist",
        subtitle: "Sayurbox, Indonesia",
        icon: "/assets/img/sayurbox-logo.png",
        date: "May 2020 - Oct 2021",
        points: [
            "Engineered a weekly demand forecasting model utilizing FBProphet and time series analysis. ",
            "Streamlined order preparation workflows by automating workforce scheduling processes.",
            "Implemented dynamic route assignment algorithms that optimized driver deployment."
        ],
        description: "My first job as a Data Scientist for an e-commerce grocery platform company based in Jakarta.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    },
    {
        type: 'education',
        title: "Bachelor of Science (Hons.)",
        subtitle: "University of Nottingham, UK",
        icon: "/assets/img/nottingham-logo.png",
        date: "Sep 2019 - Sep 2020",
        points: ["First Class Degree", "Computer Science with AI", "Undergraduate Dissertation: Top 10 Common Chest X-ray Classification & Localization"],
        description: "Graduated with top honors, specializing in Computer Science with Artificial Intelligence.",
        image: "/assets/img/nottingham.webp"
    },
    {
        type: 'education',
        title: "Bachelor of Science",
        subtitle: "Bina Nusantara University, Indonesia",
        icon: "/assets/img/binus-logo.png",
        date: "Sep 2016 - Sep 2020",
        points: ["GPA: 3.74/4.0", "International Program", "Teaching Assistant for Introduction to Database Unit"],
        description: "Built a strong foundation in computer science while serving as a mentor for junior students.",
        image: "/assets/img/binus.webp"
    }
];

const allItems = [{ type: 'header' }, ...combinedTimeline];

const variants = {
    initial: (direction) => ({
        opacity: 0,
        x: direction > 0 ? 100 : -100, // Slide in from right or left
        filter: "blur(10px)"
    }),
    animate: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] // Custom "Expo" ease for a snappy feel
        }
    },
    exit: (direction) => ({
        opacity: 0,
        x: direction > 0 ? -100 : 100, // Slide out in the opposite direction
        filter: "blur(10px)",
        transition: {
            duration: 0.3
        }
    })
};

const Timeline = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    // Track direction to know if we are scrolling up or down
    const [direction, setDirection] = useState(0);

    // Responsive Check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isMobile) return;
        const step = 1 / allItems.length;
        const index = Math.min(Math.floor(latest / step), allItems.length - 1);
        if (index !== activeIndex) {
            setDirection(index > activeIndex ? 1 : -1);
            setActiveIndex(index);
        }
    });

    return (
        <section
            ref={containerRef}
            id="timeline"
            className={`relative bg-frost ${isMobile ? 'py-20' : 'h-[500vh]'}`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #213C51 1px, transparent 0)`, backgroundSize: '40px 40px' }}
            />

            {isMobile ? (
                /* MOBILE VIEW: Standard Vertical List */
                <div className="relative z-10 space-y-24 px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black text-deep-sea tracking-tighter uppercase">The Journey.</h2>
                        <p className="text-deep-sea/60 mt-4">Professional and academic evolution</p>
                    </div>

                    {combinedTimeline.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white border border-deep-sea/10 p-2 shrink-0 shadow-sm">
                                    <img src={item.icon} alt="icon" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <span className="text-lavender font-mono text-xs font-bold uppercase tracking-widest">{item.date}</span>
                                    <h3 className="text-2xl font-black text-deep-sea leading-tight">{item.title}</h3>
                                </div>
                            </div>

                            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="space-y-4">
                                <p className="text-lg text-deep-sea/70 font-light leading-relaxed">{item.description}</p>
                                <ul className="space-y-3">
                                    {item.points.map((point, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-deep-sea/80">
                                            <span className="text-lavender">•</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={activeIndex}
                            custom={direction}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="w-full h-full flex items-center justify-center"
                        >
                            <TimelineContent item={allItems[activeIndex]} index={activeIndex} />
                        </motion.div>
                    </AnimatePresence>

                    {/* Indicators */}
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                        {allItems.map((_, i) => (
                            <div key={i} className={`w-1.5 transition-all duration-500 rounded-full ${i === activeIndex ? 'h-10 bg-lavender' : 'h-3 bg-deep-sea/10'}`} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

// Separated sub-components for cleanliness
const TimelineContent = ({ item, index }) => {
    if (item.type === 'header') return <TimelineHeader />;
    const isEven = index % 2 === 0;

    return (
        <div className="w-full max-w-7xl mx-auto px-12 grid grid-cols-2 gap-16 items-center">
            {/* Description Column */}
            <div className={!isEven ? 'order-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-white border border-deep-sea/10 p-2 shadow-sm flex items-center justify-center">
                        <img src={item.icon} alt="logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <span className="font-mono text-xs font-bold text-lavender uppercase tracking-widest">{item.date}</span>
                        <p className="text-lg text-sky-blue font-bold tracking-tight leading-none mt-1">{item.subtitle}</p>
                    </div>
                </div>

                <h3 className="text-5xl font-black text-deep-sea leading-[1.1] tracking-tighter mb-4">{item.title}</h3>
                <p className="text-xl text-deep-sea/70 font-light leading-relaxed mb-8">{item.description}</p>

                <div className="space-y-4">
                    {item.points.map((p, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 ${item.type === 'education' ? 'bg-sky-blue' : 'bg-lavender'}`} />
                            <p className="text-deep-sea/80 font-medium leading-snug">{p}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Column */}
            <div className={`relative ${!isEven ? 'order-1' : ''}`}>
                <div className={`absolute inset-0 blur-3xl opacity-20 -z-10 ${item.type === 'education' ? 'bg-sky-blue' : 'bg-lavender'}`} />
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white shadow-2xl">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                </div>
            </div>
        </div>
    );
};

const TimelineHeader = () => (
    <section>
        <div className="text-center space-y-6">
            <h2 className="text-8xl font-black text-deep-sea tracking-tighter uppercase">The Journey<span className="text-lavender">.</span></h2>
            <p className="text-2xl text-deep-sea/60">A unified look at my professional and academic evolution.</p>
        </div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-deep-blue/50 text-xs uppercase tracking-widest font-mono">Scroll</span>
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-6 h-10 border-2 border-deep-blue/30 rounded-full flex justify-center pt-2"
            >
                <motion.div className="w-1.5 h-2 bg-lavender rounded-full" />
            </motion.div>
        </motion.div>
    </section>

);

export default Timeline;