import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data ---
const experienceData = [
    {
        id: 'tiket',
        role: "Associate Data Scientist",
        company: "tiket.com",
        location: "Jakarta, Indonesia",
        date: "Oct 2022 - Jul 2024",
        logo: "/assets/img/tiket-logo.png",
        description: "Led high-impact ML initiatives for one of SE Asia's largest travel platforms.",
        achievements: [
            "Generated IDR 94B+ incremental GBV by engineering a Scikit-learn payment recommendation engine that analyzed 15+ payment methods, boosting conversion by 4.8%.",
            "Unlocked IDR 47B annual revenue impact with a deep learning classifier that filtered low-quality hotel images, reducing bounce rates by 18%.",
            "Drove IDR 8B revenue uplift by optimizing hotel recommendations with ensemble models and geospatial analytics, outperforming existing baselines."
        ],
        image: "/assets/img/tiket.webp"
    },
    {
        id: 'sayurbox',
        role: "Junior Data Scientist",
        company: "Sayurbox",
        location: "Jakarta, Indonesia",
        date: "May 2020 - Oct 2021",
        logo: "/assets/img/sayurbox-logo.png",
        description: "Focusing on demand forecasting and logistics optimization for e-grocery.",
        achievements: [
            "Engineered weekly demand forecasting model using FBProphet.",
            "Streamlined order preparation workflows via automated workforce scheduling.",
            "Implemented dynamic route assignment algorithms for driver deployment."
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    }
];

const educationData = [
    {
        id: 'monash',
        degree: "Master of Science",
        school: "Monash University",
        location: "Melbourne, Australia",
        date: "Jul 2024 - Present",
        logo: "/assets/img/monash-logo.png",
        description: "Majoring in Data Science, focusing on advanced statistical techniques and big data processing. Key units:",
        details: ["Foundationals of Data Science", "Data Exploration & Visualization", "Data Wrangling", "Statistical Modelling", "Big Data Processing", "Applied Data Analysis"],
        image: "/assets/img/monash.webp"
    },
    {
        id: 'nottingham',
        degree: "Bachelor of Science (Hons.)",
        school: "University of Nottingham",
        location: "Nottingham, United Kingdom",
        date: "Sep 2019 - Sep 2020",
        logo: "/assets/img/nottingham-logo.png",
        description: "Undergraduate double degree program in Computer Science with AI.",
        details: ["Graduated with First Class Honors", "Undergraduate Dissertation: Chest X-ray Classification | Supervisor: Dr. Chao Chen"],
        image: "/assets/img/nottingham.webp"
    },
    {
        id: 'binus',
        degree: "Bachelor of Science",
        school: "Bina Nusantara University",
        location: "Jakarta, Indonesia",
        date: "Sep 2016 - Sep 2020",
        logo: "/assets/img/binus-logo.png",
        description: "Undergraduate studies in Computer Science.",
        details: ["Teaching Assistant for 'Introduction to Database' unit", "International Program Mentor"],
        image: "/assets/img/binus.webp"
    }
];

// Floating Image — animated in/out, no absolute positioning.
// Placed directly into the date column on desktop so it uses natural flow space beside the card.
const FloatingImage = ({ src, alt, isHovered, type }) => {
    const isExp = type === 'experience';

    return (
        <AnimatePresence>
            {isHovered && (
                <motion.div
                    key="float-img"
                    initial={{
                        opacity: 0,
                        scale: 0.88,
                        rotate: isExp ? -3 : 3,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: isExp ? -1.5 : 1.5,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.88,
                        rotate: isExp ? -3 : 3,
                    }}
                    transition={{
                        duration: 0.35,
                        ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className={`
                        w-full max-w-[400px] aspect-video
                        rounded-2xl overflow-hidden
                        shadow-lg border-4 border-white
                        pointer-events-none relative
                        ${isExp ? 'ml-auto' : 'mr-auto'}
                    `}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const TimelineNode = ({ data, type, isLast }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isExp = type === 'experience';

    const imageEl = (
        <FloatingImage
            src={data.image}
            alt={type === 'experience' ? data.company : data.school}
            isHovered={isHovered}
            type={type}
        />
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative pl-8 md:pl-0 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* ── Date column (Left for Exp, Right for Edu) — also hosts the floating image on desktop ── */}
            <div className={`hidden md:flex md:flex-col md:gap-3 ${isExp ? 'items-end text-right' : 'order-last items-start text-left'}`}>
                <div>
                    <div className="text-sm font-bold text-slate-400 font-mono tracking-widest uppercase mb-1">{data.date}</div>
                    <div className="text-slate-500 text-xs font-semibold">{data.location}</div>
                </div>
                {/* Image lives here on desktop — natural flow, no overlap */}
                {imageEl}
            </div>

            {/* ── Center Line & Dot ── */}
            <div className="absolute left-0 top-0 bottom-0 md:relative md:flex md:flex-col md:items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                    className={`w-4 h-4 rounded-full border-2 z-10 bg-white ${isExp ? 'border-blue-600' : 'border-indigo-600'} group-hover:scale-125 transition-transform duration-300`}
                />
                {!isLast && <div className="absolute top-4 bottom-0 left-[7px] w-[2px] bg-slate-100 md:relative md:left-0 md:w-[2px] md:h-full md:flex-1" />}
            </div>

            {/* ── Card column ── */}
            <div className={`pb-12 md:pb-16 ${isExp ? '' : 'order-first md:text-right'}`}>
                {/* Mobile date */}
                <div className="md:hidden mb-2">
                    <span className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase">{data.date}</span>
                </div>

                {/* Card */}
                <div className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 ${isExp ? '' : 'md:items-end'}`}>
                    <div className={`flex items-start gap-4 mb-4 ${!isExp && 'md:flex-row-reverse'}`}>
                        <div className="w-12 h-12 rounded-lg bg-slate-50 p-2 border border-slate-100 shrink-0 overflow-hidden">
                            <img src={data.logo} alt="logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 leading-tight">
                                {isExp ? data.role : data.degree}
                            </h3>
                            <div className="text-blue-600 font-medium text-sm">
                                {isExp ? data.company : data.school}
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{data.description}</p>

                    <ul className={`space-y-2 ${!isExp && 'md:text-right'}`}>
                        {(data.achievements || data.details).map((item, i) => (
                            <li key={i} className="text-xs text-slate-500 flex gap-2 items-start md:items-center justify-start md:justify-end">
                                <span className={`block w-1 h-1 mt-1.5 md:mt-0 rounded-full shrink-0 ${isExp ? 'bg-blue-400' : 'bg-indigo-400'} md:order-last`} />
                                <span className={!isExp ? 'md:order-first' : ''}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile: image appears below the card */}
                <div className="md:hidden mt-3 flex justify-center">
                    {imageEl}
                </div>
            </div>
        </motion.div>
    );
};

const Timeline = () => {
    return (
        <section id="timeline" className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-6 max-w-screen-xl">

                {/* Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">The Journey</h2>
                    <p className="text-slate-500 max-w-xl mx-auto">
                        A timeline of professional growth and academic milestones.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Experience Column */}
                    <div className="overflow-visible">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Experience</h3>
                        </div>
                        <div className="space-y-0">
                            {experienceData.map((item, i) => (
                                <TimelineNode
                                    key={item.id}
                                    data={item}
                                    type="experience"
                                    isLast={i === experienceData.length - 1}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div className="overflow-visible">
                        <div className="flex items-center gap-3 mb-12 lg:justify-end">
                            <h3 className="text-2xl font-bold text-slate-800">Education</h3>
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                            </div>
                        </div>
                        <div className="space-y-0">
                            {educationData.map((item, i) => (
                                <TimelineNode
                                    key={item.id}
                                    data={item}
                                    type="education"
                                    isLast={i === educationData.length - 1}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Timeline;