export const impactCases = [
    {
        title: 'Payment Recommendation Engine',
        metric: '~$5.2M (IDR 94B+)',
        metricLabel: 'incremental GBV',
        context: 'Payment teams needed to improve checkout conversion across 15+ payment methods.',
        method: 'Built a Scikit-learn recommendation engine using behavioral and payment-method signals.',
        decision: 'Prioritized payment options by conversion propensity, lifting conversion by 4.8%.',
    },
    {
        title: 'Hotel Image Quality Classifier',
        metric: '~$2.6M (IDR 47B)',
        metricLabel: 'annual revenue impact',
        context: 'Low-quality hotel images were hurting user trust and increasing listing bounce rates.',
        method: 'Trained a deep learning classifier to detect and filter low-quality hotel imagery.',
        decision: 'Improved listing quality controls and reduced bounce rates by 18%.',
    },
    {
        title: 'Hotel Recommendation Optimization',
        metric: '~$440K (IDR 8B)',
        metricLabel: 'revenue uplift',
        context: 'Hotel discovery needed stronger ranking logic across location and user preference signals.',
        method: 'Combined ensemble models with geospatial analytics and baseline comparison.',
        decision: 'Improved recommendation ranking and outperformed existing baselines.',
    },
];

export const projectData = [
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

export const experienceData = [
    {
        id: 'tiket',
        reflectionImage: '/assets/img/tiket.webp',
        reflectionPosition: '50% 40%',
        metrics: [
            { value: '+4.8%', label: 'Payment conversion', detail: 'Personalised payment recommendations · controlled experimentation' },
            { value: '+2.3%', label: 'Booking conversion', detail: 'Computer vision (YOLOv10 with TensorRT inference) · quality across 15,000+ hotel listings' },
            { value: '12K+', label: 'Properties processed', detail: 'Entity matching · 34% less duplicate inventory' },
            { value: '$440K', label: 'GBV delivered', detail: 'Personalized recommendations · traveller behaviour analysis' },
        ],
        role: "Associate Data Scientist",
        company: "tiket.com",
        location: "Jakarta, Indonesia",
        date: "Oct 2022 - Jul 2024",
        logo: "/assets/img/tiket-logo.webp",
        focus: "Product ML, experimentation, marketplace quality",
        description: "Product data science role across payments, hotel discovery, listing quality, and marketplace operations at one of Southeast Asia's largest online travel platforms.",
        achievements: [
            "Partnered with product, engineering, and commercial teams to translate experimentation, personalization, and ML systems into checkout, discovery, and marketplace-quality decisions.",
            "Worked across marketplace-scale data including 15+ payment methods, 15,000+ hotel listings, four customer segments, and 12,000+ hotel properties.",
            "Built and evaluated production-oriented ML workflows spanning recommendation systems, computer vision, entity matching, and NLP automation.",
            "Improved operational decision-making through CatBoost-based hotel entity matching, reducing duplicate inventory by 34% and weekly manual review from 120 hours to 15 hours."
        ],
        image: "/assets/img/tiket.webp"
    },
    {
        id: 'sayurbox',
        reflectionImage: '/assets/img/sayurbox.jpeg',
        reflectionKind: 'logo', // No Sayurbox photograph is supplied.
        reflectionPosition: '50% 50%',
        metrics: [],
        role: "Junior Data Scientist",
        company: "Sayurbox",
        location: "Jakarta, Indonesia",
        date: "May 2020 - Oct 2021",
        logo: "/assets/img/sayurbox-logo.webp",
        focus: "Forecasting, workforce planning, logistics",
        description: "Earlier data science role in e-grocery operations, focused on demand forecasting, workforce planning, and logistics optimization.",
        achievements: [
            "Built weekly demand-forecasting workflows to support inventory and fulfillment planning.",
            "Automated workforce scheduling inputs for order preparation operations.",
            "Developed route-assignment logic to improve driver deployment decisions."
        ],
        image: "/assets/img/sayurbox.jpeg"
    }
];

export const educationData = [
    {
        id: 'monash',
        degree: "Master of Science",
        school: "Monash University",
        location: "Melbourne, Australia",
        date: "2024 - 2026",
        logo: "/assets/img/monash-logo.webp",
        focus: "Data Science",
        description: "Graduate study in data science with emphasis on statistical modelling, big data processing, applied analysis, and data visualization.",
        details: ["Statistical Modelling", "Big Data Processing", "Applied Data Analysis", "Data Exploration & Visualization", "Data Wrangling", "Business Analysis"],
        image: "/assets/img/monash.webp"
    },
    {
        id: 'nottingham',
        degree: "Bachelor of Science (Hons.)",
        school: "University of Nottingham",
        location: "Nottingham, United Kingdom",
        date: "Sep 2019 - Sep 2020",
        logo: "/assets/img/nottingham-logo.webp",
        focus: "Computer Science with AI",
        description: "Undergraduate double degree program in Computer Science with AI.",
        details: ["First Class Honors", "Dissertation (76%): \"Common Chest X-ray Classification and Localization with Deep Learning\" | Supervisor: Dr. Chao Chen"],
        image: "/assets/img/nottingham.webp"
    },
    {
        id: 'binus',
        degree: "Bachelor of Science",
        school: "Bina Nusantara University",
        location: "Jakarta, Indonesia",
        date: "Sep 2016 - Sep 2020",
        logo: "/assets/img/binus-logo.webp",
        focus: "Computer Science foundation",
        description: "Undergraduate studies in Computer Science.",
        details: ["Teaching Assistant for 'Introduction to Database' unit", "International Program Mentor"],
        image: "/assets/img/binus.webp"
    }
];

// Facts remain in the canonical work/education records above.
export const experienceEntries = [
    ...experienceData.map(item => ({ ...item, kind: 'Work', indicator: item.metrics[0]?.value ?? 'Operations', indicatorLabel: item.metrics[0]?.label ?? 'Forecasting & logistics' })),
    ...educationData.map(item => ({
        ...item, kind: 'Education', company: item.school, role: item.degree,
        reflectionImage: item.image, reflectionPosition: '50% 40%', metrics: [],
        achievements: item.details,
        indicator: item.id === 'nottingham' ? 'First class' : item.degree.split(' ')[0],
        indicatorLabel: item.id === 'nottingham' ? 'Honours' : item.id === 'monash' ? 'Completed Jun 2026' : 'Computer Science',
    })),
];
