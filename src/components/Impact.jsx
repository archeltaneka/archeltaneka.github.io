import React from 'react';
import { motion } from 'framer-motion';
import { LuChartBar, LuImage, LuMapPin } from 'react-icons/lu';

const impactCases = [
    {
        title: 'Payment Recommendation Engine',
        metric: '~$5.2M (IDR 94B+)',
        metricLabel: 'incremental GBV',
        context: 'Payment teams needed to improve checkout conversion across 15+ payment methods.',
        method: 'Built a Scikit-learn recommendation engine using behavioral and payment-method signals.',
        decision: 'Prioritized payment options by conversion propensity, lifting conversion by 4.8%.',
        icon: <LuChartBar className="w-5 h-5" />,
    },
    {
        title: 'Hotel Image Quality Classifier',
        metric: '~$2.6M (IDR 47B)',
        metricLabel: 'annual revenue impact',
        context: 'Low-quality hotel images were hurting user trust and increasing listing bounce rates.',
        method: 'Trained a deep learning classifier to detect and filter low-quality hotel imagery.',
        decision: 'Improved listing quality controls and reduced bounce rates by 18%.',
        icon: <LuImage className="w-5 h-5" />,
    },
    {
        title: 'Hotel Recommendation Optimization',
        metric: '~$440K (IDR 8B)',
        metricLabel: 'revenue uplift',
        context: 'Hotel discovery needed stronger ranking logic across location and user preference signals.',
        method: 'Combined ensemble models with geospatial analytics and baseline comparison.',
        decision: 'Improved recommendation ranking and outperformed existing baselines.',
        icon: <LuMapPin className="w-5 h-5" />,
    },
];

const Impact = () => {
    return (
        <section id="impact" className="py-24 bg-slate-950 text-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
                    <div className="lg:sticky lg:top-28">
                        <div className="text-xs font-black uppercase tracking-[0.24em] text-blue-300 mb-4">
                            Selected Impact
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
                            Product ML work tied to measurable business outcomes.
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Professional work from tiket.com, one of Southeast Asia's largest travel platforms. Each case connects the model or analysis to a product decision, metric movement, and business result.
                        </p>
                    </div>

                    <div className="grid gap-5">
                        {impactCases.map((item, index) => (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: index * 0.08, duration: 0.45 }}
                                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-7"
                            >
                                <div className="flex flex-col md:flex-row md:items-start gap-5">
                                    <div className="w-11 h-11 rounded-xl bg-blue-400/15 text-blue-200 flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                                            <h3 className="text-xl md:text-2xl font-black text-white">{item.title}</h3>
                                            <div className="sm:text-right">
                                                <div className="text-2xl md:text-3xl font-black text-blue-200">{item.metric}</div>
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.metricLabel}</div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Problem</div>
                                                <p className="text-sm text-slate-300 leading-relaxed">{item.context}</p>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Method</div>
                                                <p className="text-sm text-slate-300 leading-relaxed">{item.method}</p>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Decision</div>
                                                <p className="text-sm text-slate-300 leading-relaxed">{item.decision}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Impact;
