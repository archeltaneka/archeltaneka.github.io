import { educationData } from './portfolio';

const monash = educationData.find(item => item.id === 'monash');

export const about = {
  name: ['Archel', 'Taneka', 'Sutanto'],
  chineseName: '陈文群',
  role: 'Product Data Scientist',
  location: monash.location,
  experience: '3+ years in professional data science',
  achievements: [
    {
      title: 'Payment Recommendation Engine',
      result: '~$5.2M',
      localResult: 'IDR 94B+',
      lift: '4.8% relative conversion lift',
      metric: 'Incremental GBV',
      method: 'Scikit-learn · behavioural & payment-method signals',
    },
    {
      title: 'Hotel Low Image Quality Detection',
      result: '~$2.6M',
      localResult: 'IDR 47B',
      metric: 'Annual revenue impact',
      method: 'YOLOv10 + TensorRT · image quality detection',
    },
    {
      title: 'Hotel Recommendation Optimization',
      result: '~$440K',
      localResult: 'IDR 8B',
      metric: 'Incremental GBV',
      method: 'CatBoost ensembles + geospatial analytics',
    },
  ],
  principles: [
    { name: 'Build', detail: 'Data products, ML systems & applied AI.' },
    { name: 'Measure', detail: 'Experiments, metrics & causal thinking.' },
    { name: 'Understand', detail: 'Users, product behaviour & business context.' },
  ],
  targetRoles: [
    'Product Data Scientist',
    'Data Scientist',
    'Data Analyst',
    'Machine Learning Engineering',
  ],
  personal: 'Off screen / listening to music',
};

// Proportional WebP derivatives of the three original photos; no generated art.
export const aboutPhotos = {
  default: { src: '/assets/img/about/profile.webp', alt: 'Archel Taneka Sutanto beside the harbour', position: '52% 42%' },
  australia: { src: '/assets/img/about/profile-au.webp', alt: 'Archel Taneka Sutanto in Australia', position: '50% 40%' },
  uk: { src: '/assets/img/about/profile-uk.webp', alt: 'Archel Taneka Sutanto in the United Kingdom', position: '50% 40%' },
};
