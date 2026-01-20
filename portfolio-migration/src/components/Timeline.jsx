import React from 'react';
import { motion } from 'framer-motion';

const education = [
    {
        title: "Master of Data Science",
        institution: "Monash University, Australia",
        date: "Jul 2024 - Present",
        details: ["Statistical Data Modelling", "Big Data Processing", "Applied Data Analysis"]
    },
    {
        title: "Bachelor of Science (Hons.)",
        institution: "University of Nottingham, UK",
        date: "Sep 2019 - Sep 2020",
        details: ["First Class Degree", "Computer Science with AI", "Deep Learning Dissertation"]
    },
    {
        title: "Bachelor of Science",
        institution: "Bina Nusantara University, Indonesia",
        date: "Sep 2016 - Sep 2020",
        details: ["GPA: 3.74/4.0", "International Program", "Teaching Assistant"]
    }
];

const experience = [
    {
        title: "Associate Data Scientist",
        company: "tiket.com",
        date: "Oct 2022 - Jul 2024",
        impact: [
            "Developed payment recommendation model (94B IDR GBV uplift)",
            "Improved image quality classification by 10%",
            "Reduced RPA costs by 150M IDR annually"
        ]
    }
];

const TimelineCard = ({ item, index, type }) => (
    <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="relative pl-8 pb-12 border-l-2 border-sage/20 last:pb-0"
    >
        {/* The Indicator Dot */}
        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-sage shadow-sm" />

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-mono text-[10px] uppercase tracking-widest text-sage font-bold mb-2 block">
                {item.date}
            </span>
            <h3 className="font-playfair text-xl font-bold text-charcoal">{item.title}</h3>
            <p className="text-warm-gray mb-4">{type === 'edu' ? item.institution : item.company}</p>

            <ul className="space-y-2">
                {(type === 'edu' ? item.details : item.impact).map((point, i) => (
                    <li key={i} className="text-sm text-warm-gray flex items-start gap-2">
                        <span className="text-sage mt-1">▹</span>
                        {point}
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);

const Timeline = () => {
    return (
        <section id="about" className="py-24 bg-[#faf9f7]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Education Column */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="font-playfair text-3xl font-bold text-charcoal mb-12 flex items-center gap-4"
                        >
                            Education <div className="h-[1px] flex-1 bg-sage/20" />
                        </motion.h2>
                        <div className="space-y-2">
                            {education.map((edu, i) => (
                                <TimelineCard key={i} item={edu} index={i} type="edu" />
                            ))}
                        </div>
                    </div>

                    {/* Experience Column */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="font-playfair text-3xl font-bold text-charcoal mb-12 flex items-center gap-4"
                        >
                            Experience <div className="h-[1px] flex-1 bg-sage/20" />
                        </motion.h2>
                        <div className="space-y-2">
                            {experience.map((exp, i) => (
                                <TimelineCard key={i} item={exp} index={i} type="exp" />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Timeline;