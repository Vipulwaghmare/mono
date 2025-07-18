import Experience from '../project-details/experience.astro';
import Porfolio from '../project-details/portfolio.astro';
import SortingAlgo from '../project-details/sorting-algo.astro';
import Apis from '../project-details/apis.astro';
import Diary from '../project-details/diary.astro';

const projects = [
  {
    title: 'Experience in Corporate',
    description: 'This is my experience in corporate. The things which I worked on but the proof is not public due to company policies & confidentiality.',
    details: '',
    tech: [],
    category: 'fullstack',
    Accordion: Experience
  },
  {
    title: 'Sorting Algorithm visualization',
    description: 'A react application to visualize the sorting algorithms.',
    details: 'This project allows users to visualize and understand how different sorting algorithms work step by step. Built with React.',
    tech: ['React', 'CSR', 'Hooks', 'Shadcn'],
    category: 'frontend',
    demo: 'https://sorting.vipulwaghmare.com/',
    github: 'https://github.com/Vipulwaghmare/mono/tree/master/packages/sorting-algo',
    Accordion: SortingAlgo
  },
  {
    title: 'RESTful API Service',
    description: 'A scalable RESTful API service with authentication.',
    details: 'A backend API built with Node.js, NestJS, and MongoDB, featuring JWT authentication and scalable architecture.',
    tech: ['Node.js', 'NestJS', 'MongoDB', 'JWT'],
    category: 'backend',
    demo: 'https://api.vipulwaghmare.com/api-docs',
    github: 'https://github.com/Vipulwaghmare/mono/tree/master/packages/backend-nestjs',
    Accordion: Apis
  },
  {
    title: 'Diary App',
    description: 'A diary app with features like adding entries, editing entries, deleting entries, and viewing entries.',
    details: 'Diary App lets users manage their daily notes with CRUD features, built using React, NestJS, and MongoDB.',
    tech: ['React', 'React-Query', 'MongoDB', 'TypeScript'],
    category: 'fullstack',
    demo: 'https://diary.vipulwaghmare.com',
    github: 'https://github.com/Vipulwaghmare/mono/tree/master/packages/diary',
    Accordion: Diary
  },
  {
    title: 'Portfolio',
    description: 'Recursion',
    details: 'Recursion',
    tech: ['Astro', 'SSG'],
    category: 'frontend',
    demo: 'https://vipulwaghmare.com/#project-personal-portfolio',
    id: "project-personal-portfolio",
    github: 'https://github.com/Vipulwaghmare/mono/tree/master/packages/portfolio',
    Accordion: Porfolio
  },
];

export default projects; 