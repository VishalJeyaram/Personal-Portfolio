// src/data/projects.js

export const CATEGORIES = {
  'Software & Development': [
    'Java',
    'React',
    'Node.js',
    'Angular',
    'Computer Graphics',
    'Machine Learning',
    'Bioinformatics'
  ],
  'Hardware & Systems': [
    'IoT',
    'Embedded Systems',
    'HCI',
    'Robotics'
  ],
  'Creative & Visual': [
    'XR / AR / VR',
    'Animation & VFX',
    'Data Visualization'
  ]
};

const projects = [
  {
  id: 1,
  name: 'The Perfect Fit',
  image: '/project_images/theperfectfit.png',
  // A femtech startup that helps women discover the perfect bra across brands
  description: [
    '🚀 Startup idea: a femtech platform dedicated to solving bra‑fit frustrations through data and personalization.',
    '✍️ Interactive questionnaire captures body measurements, shape profiles, and fit preferences.',
    '🤖 Automated web‑scraping engine (Selenium) aggregates up‑to‑date product details (sizes, styles, reviews) from multiple retailers.',
    '🔒 Privacy‑first architecture and seamless user journey—no more guessing your bra size!',
  ],
  techStack: [
    'Frontend: React.js (deployed on Cloudflare)',
    'Web Scraping: Selenium',
    'Backend: Node.js & Express.js (hosted on Render)',
    'Database: MySQL (hosted on Aiven)',
  ],
  website: 'https://theperfectfit.app',
  },
  {
    id: 2,
    name: 'Grasp',
    image: '/project_images/CG1112.png',
    description:
      'AI-powered reading companion: scan/import content, generate summaries, flashcards, and spaced repetition.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    website: 'https://grasp.ai',
    github: 'https://github.com/vishaljeyaram/grasp',
  },
  {
    id: 3,
    name: 'Project Connecto',
    image: '/project_images/CG1112.png',
    description:
      'IoT home system for muscular dystrophy patients: assistive mouse + Flutter app for device control.',
    techStack: ['Flutter', 'Dart', 'AWS', 'Node.js'],
    website: 'https://connecto.health',
    github: 'https://github.com/vishaljeyaram/project-connecto',
  },
    {
    id: 1,
    name: 'ThePerfectFit',
    image: '/project_images/CG1112.png',
    description:
      'A femtech app matching women to well-fitting bras across brands via questionnaire and web scraping.',
    techStack: ['React', 'Three.js', 'Node.js'],
    website: 'https://theperfectfit.app',
    github: 'https://github.com/vishaljeyaram/theperfectfit',
  },
  {
    id: 2,
    name: 'Grasp',
    image: '/project_images/CG1112.png',
    description:
      'AI-powered reading companion: scan/import content, generate summaries, flashcards, and spaced repetition.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    website: 'https://grasp.ai',
    github: 'https://github.com/vishaljeyaram/grasp',
  },
  {
    id: 3,
    name: 'Project Connecto',
    image: '/project_images/CG1112.png',
    description:
      'IoT home system for muscular dystrophy patients: assistive mouse + Flutter app for device control.',
    techStack: ['Flutter', 'Dart', 'AWS', 'Node.js'],
    website: 'https://connecto.health',
    github: 'https://github.com/vishaljeyaram/project-connecto',
  },
    {
    id: 1,
    name: 'ThePerfectFit',
    image: '/project_images/CG1112.png',
    description:
      'A femtech app matching women to well-fitting bras across brands via questionnaire and web scraping.',
    techStack: ['React', 'Three.js', 'Node.js'],
    website: 'https://theperfectfit.app',
    github: 'https://github.com/vishaljeyaram/theperfectfit',
  },
  {
    id: 2,
    name: 'Grasp',
    image: '/project_images/CG1112.png',
    description:
      'AI-powered reading companion: scan/import content, generate summaries, flashcards, and spaced repetition.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    website: 'https://grasp.ai',
    github: 'https://github.com/vishaljeyaram/grasp',
  },
  {
    id: 3,
    name: 'Project Connecto',
    image: '/project_images/CG1112.png',
    description:
      'IoT home system for muscular dystrophy patients: assistive mouse + Flutter app for device control.',
    techStack: ['Flutter', 'Dart', 'AWS', 'Node.js'],
    website: 'https://connecto.health',
    github: 'https://github.com/vishaljeyaram/project-connecto',
  },
    {
    id: 1,
    name: 'ThePerfectFit',
    image: '/project_images/CG1112.png',
    description:
      'A femtech app matching women to well-fitting bras across brands via questionnaire and web scraping.',
    techStack: ['React', 'Three.js', 'Node.js'],
    website: 'https://theperfectfit.app',
    github: 'https://github.com/vishaljeyaram/theperfectfit',
  },
  {
    id: 2,
    name: 'Grasp',
    image: '/project_images/CG1112.png',
    description:
      'AI-powered reading companion: scan/import content, generate summaries, flashcards, and spaced repetition.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    website: 'https://grasp.ai',
    github: 'https://github.com/vishaljeyaram/grasp',
  },
  {
    id: 3,
    name: 'Project Connecto',
    image: '/project_images/CG1112.png',
    description:
      'IoT home system for muscular dystrophy patients: assistive mouse + Flutter app for device control.',
    techStack: ['Flutter', 'Dart', 'AWS', 'Node.js'],
    website: 'https://connecto.health',
    github: 'https://github.com/vishaljeyaram/project-connecto',
  },
    {
    id: 1,
    name: 'ThePerfectFit',
    image: '/project_images/CG1112.png',
    description:
      'A femtech app matching women to well-fitting bras across brands via questionnaire and web scraping.',
    techStack: ['React', 'Three.js', 'Node.js'],
    website: 'https://theperfectfit.app',
    github: 'https://github.com/vishaljeyaram/theperfectfit',
  },
  {
    id: 2,
    name: 'Grasp',
    image: '/project_images/CG1112.png',
    description:
      'AI-powered reading companion: scan/import content, generate summaries, flashcards, and spaced repetition.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    website: 'https://grasp.ai',
    github: 'https://github.com/vishaljeyaram/grasp',
  },
  {
    id: 3,
    name: 'Project Connecto',
    image: '/project_images/CG1112.png',
    description:
      'IoT home system for muscular dystrophy patients: assistive mouse + Flutter app for device control.',
    techStack: ['Flutter', 'Dart', 'AWS', 'Node.js'],
    website: 'https://connecto.health',
    github: 'https://github.com/vishaljeyaram/project-connecto',
  },
];

export default projects;
