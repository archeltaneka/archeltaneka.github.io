// Curated from the resume, portfolio.js project/experience records, and the
// former Skills.jsx list. Sources describe evidence, never proficiency.
export const skillCategories = [
  { id: 'programming', label: 'PROGRAMMING', symbol: 'code', accent: '#63b5d2', tools: [
    { type: 'Language', name: 'Python', icon: 'python', source: 'Resume · Technical Skills' },
    { type: 'Query Language', name: 'SQL', icon: 'database', source: 'Resume · Technical Skills' },
    { type: 'Statistical Computing', name: 'R', icon: 'r', source: 'Resume · Technical Skills; Pokémon Battle Analysis' },
  ] },
  { id: 'machine-learning', label: 'MACHINE LEARNING', symbol: 'network', accent: '#ad00b7', tools: [
    { type: 'Classical ML', name: 'scikit-learn', icon: 'scikit', source: 'Resume; payment recommendation engine' },
    { type: 'Deep Learning', name: 'PyTorch', icon: 'pytorch', source: 'Resume; Joint Intent & Slot Detection' },
    { type: 'Deep Learning', name: 'TensorFlow', icon: 'tensorflow', source: 'Resume · Technical Skills' },
    { type: 'Gradient Boosting', name: 'CatBoost', icon: 'branches', source: 'Resume; tiket.com hotel entity matching' },
  ] },
  { id: 'ai-llm', label: 'AI / LLM', symbol: 'brain', accent: '#2935d0', tools: [
    { type: 'Agent Orchestration', name: 'LangGraph', icon: 'workflow', source: 'ExperimentOS AI · technologies' },
    { type: 'Retrieval', name: 'RAG / pgvector', icon: 'search', source: 'ExperimentOS AI · description and technologies' },
    { type: 'Evaluation', name: 'Phoenix', icon: 'activity', source: 'ExperimentOS AI · technologies' },
  ] },
  { id: 'data', label: 'DATA & DATABASES', symbol: 'database', accent: '#858585', tools: [
    { type: 'Relational Database', name: 'PostgreSQL', icon: 'postgres', source: 'ExperimentOS AI; Cherébowl · technologies' },
    { type: 'Data Processing', name: 'pandas', icon: 'pandas', source: 'Cherébowl; Mobiles Dataset Analysis · technologies' },
    { type: 'Numerical Computing', name: 'NumPy', icon: 'numpy', source: 'Mobiles Dataset Analysis · technologies' },
    { type: 'ORM / Data Layer', name: 'SQLAlchemy', icon: 'database', source: 'Cherébowl · stack_details' },
  ] },
  { id: 'visualization', label: 'VISUALIZATION', symbol: 'chart', accent: '#c92d43', tools: [
    { type: 'Business Intelligence', name: 'Power BI', icon: 'chart', source: 'Resume · Technical Skills' },
    { type: 'BI / Exploration', name: 'Tableau', icon: 'tableau', source: 'Resume · Technical Skills' },
    { type: 'Programmatic Visualization', name: 'Matplotlib', icon: 'chart', source: 'Original portfolio Skills.jsx · skillGroups' },
  ] },
  { id: 'engineering', label: 'ENGINEERING', symbol: 'wrench', accent: '#c6b52f', tools: [
    { type: 'API', name: 'FastAPI', icon: 'fastapi', source: 'ExperimentOS AI; Cherébowl · technologies' },
    { type: 'Containers', name: 'Docker', icon: 'docker', source: 'Resume; ExperimentOS AI · technologies' },
    { type: 'CI/CD', name: 'GitHub Actions', icon: 'github', source: 'ExperimentOS AI · technologies' },
    { type: 'Observability', name: 'OpenTelemetry', icon: 'activity', source: 'ExperimentOS AI · technologies' },
  ] },
];
