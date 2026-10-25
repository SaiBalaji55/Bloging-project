export const dummyUser = {
  _id: 'u1',
  username: 'balajis_dev',
  email: 'balaji@example.com'
};

export const dummyQuestions = [
  {
    _id: 'q1',
    questionType: 'How-to / Troubleshooting',
    questionTitle: 'How to configure Tailwind CSS with Vite in a React project?',
    questionDescription: 'I am trying to set up Tailwind CSS in a new Vite + React project. I installed the dependencies, but the utility classes are not applying to my components. What are the correct configuration steps for tailwind.config.js and postcss.config.js?',
    tags: ['react', 'tailwind', 'vite'],
    userId: { _id: 'u2', username: 'frontend_ninja' },
    voteScore: 12,
    answerCount: 3,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    _id: 'q2',
    questionType: 'Best practices',
    questionTitle: 'What is the best way to handle global state in 2026?',
    questionDescription: 'Between Context API, Redux Toolkit, and Zustand, which state management library is currently recommended for a medium-to-large full-stack web application?',
    tags: ['react', 'state-management', 'javascript'],
    userId: dummyUser,
    voteScore: 8,
    answerCount: 1,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
  {
    _id: 'q3',
    questionType: 'Tooling recommendation',
    questionTitle: 'Looking for a reliable MongoDB hosting alternative',
    questionDescription: 'I have been using MongoDB Atlas but want to explore other database hosting providers that offer good performance and generous free tiers for side projects. Any recommendations?',
    tags: ['mongodb', 'database', 'hosting'],
    userId: { _id: 'u3', username: 'db_admin' },
    voteScore: -1,
    answerCount: 0,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
  }
];

export const dummyTags = [
  { _id: 'react', count: 42 },
  { _id: 'nodejs', count: 28 },
  { _id: 'tailwind', count: 15 },
  { _id: 'mongodb', count: 12 },
  { _id: 'expressjs', count: 5},
];