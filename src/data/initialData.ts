import { RoadmapPhase, Resource, Badge } from '../types';

// Keep these as fallback data, but they won't be used by default anymore
export const initialRoadmapPhases: RoadmapPhase[] = [
  {
    id: 'phase-1',
    title: 'Kickstart Gently',
    period: 'August 2025',
    color: 'from-blue-500 to-cyan-500',
    isExpanded: true,
    tasks: [
      { id: 'task-1-1', text: 'Create GitHub profile', completed: false },
      { id: 'task-1-2', text: 'Create LinkedIn profile', completed: false },
      { id: 'task-1-3', text: 'Launch a simple portfolio (Bolt.new / Notion)', completed: false },
      { id: 'task-1-4', text: 'Draft resume', completed: false },
      { id: 'task-1-5', text: 'Learn Git and GitHub basics', completed: false },
      { id: 'task-1-6', text: 'Learn Python', completed: false },
      { id: 'task-1-7', text: 'Start Harvard CS50', completed: false },
      { id: 'task-1-8', text: 'Join Kaggle competitions and learn data science', completed: false },
      { id: 'task-1-9', text: 'Join Global Hack Week – Beginners (Aug 8–14)', completed: false },
      { id: 'task-1-10', text: 'Explore internships: Google STEP, Microsoft Explore, RBC Amplify, Ubisoft NXT', completed: false },
    ],
  },
  {
    id: 'phase-2',
    title: 'Learn & Join In',
    period: 'Fall 2025',
    color: 'from-purple-500 to-pink-500',
    isExpanded: false,
    tasks: [
      { id: 'task-2-1', text: 'Attend classes + tutorials', completed: false },
      { id: 'task-2-2', text: 'Join tech clubs (GDSC, Blueprint, Women in STEM)', completed: false },
      { id: 'task-2-3', text: 'Start a meaningful project (AI planner, job tracker)', completed: false },
      { id: 'task-2-4', text: 'Keep portfolio up to date', completed: false },
      { id: 'task-2-5', text: 'Practice LeetCode (1–2/week)', completed: false },
      { id: 'task-2-6', text: 'Explore GitHub Copilot, Kaggle', completed: false },
      { id: 'task-2-7', text: 'Learn HTML/CSS', completed: false },
      { id: 'task-2-8', text: 'Attend networking events and tech conferences', completed: false },
    ],
  },
  {
    id: 'phase-3',
    title: 'Build & Apply',
    period: 'Winter 2026',
    color: 'from-green-500 to-teal-500',
    isExpanded: false,
    tasks: [
      { id: 'task-3-1', text: 'Build new project with API/AI (chatbot, tracker)', completed: false },
      { id: 'task-3-2', text: 'Polish resume + portfolio', completed: false },
      { id: 'task-3-3', text: 'Update GitHub regularly', completed: false },
      { id: 'task-3-4', text: 'Learn DS&A, TensorFlow/OpenAI API', completed: false },
      { id: 'task-3-5', text: 'Apply to internships (Google, Microsoft, Uber, NVIDIA)', completed: false },
      { id: 'task-3-6', text: 'Do mock interviews (Pramp, peers)', completed: false },
      { id: 'task-3-7', text: 'Solve coding problems weekly', completed: false },
    ],
  },
  {
    id: 'phase-4',
    title: 'Backups & Reflection',
    period: 'Spring 2026',
    color: 'from-orange-500 to-red-500',
    isExpanded: false,
    tasks: [
      { id: 'task-4-1', text: 'Apply to startups (AngelList, Y Combinator)', completed: false },
      { id: 'task-4-2', text: 'Volunteer for nonprofit dev roles', completed: false },
      { id: 'task-4-3', text: 'Contribute to open source (GoodFirstIssue.dev)', completed: false },
      { id: 'task-4-4', text: 'Build a 2-week mini project', completed: false },
      { id: 'task-4-5', text: 'Reflect + plan summer learning', completed: false },
      { id: 'task-4-6', text: 'Update resume and LinkedIn', completed: false },
    ],
  },
];

export const initialResources: Resource[] = [
  // Coding Practice
  { id: 'res-1', title: 'LeetCode', url: 'https://leetcode.com/', category: 'Coding Practice', description: 'Practice coding problems for technical interviews', isBookmarked: false },
  { id: 'res-2', title: 'HackerRank', url: 'https://www.hackerrank.com/', category: 'Coding Practice', description: 'Coding challenges and skill assessment', isBookmarked: false },
  { id: 'res-3', title: 'Codeforces', url: 'https://codeforces.com/', category: 'Coding Practice', description: 'Competitive programming contests', isBookmarked: false },
  
  // CS Learning
  { id: 'res-4', title: 'Harvard CS50', url: 'https://cs50.harvard.edu/', category: 'CS Learning', description: 'Introduction to Computer Science', isBookmarked: false },
  { id: 'res-5', title: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', category: 'CS Learning', description: 'Free coding bootcamp with certificates', isBookmarked: false },
  { id: 'res-6', title: 'The Odin Project', url: 'https://www.theodinproject.com/', category: 'CS Learning', description: 'Full-stack web development curriculum', isBookmarked: false },
  
  // AI Tools
  { id: 'res-7', title: 'OpenAI API', url: 'https://platform.openai.com/', category: 'AI Tools', description: 'GPT models and AI APIs', isBookmarked: false },
  { id: 'res-8', title: 'TensorFlow', url: 'https://www.tensorflow.org/', category: 'AI Tools', description: 'Machine learning framework', isBookmarked: false },
  { id: 'res-9', title: 'LangChain', url: 'https://langchain.com/', category: 'AI Tools', description: 'Framework for building AI applications', isBookmarked: false },
  { id: 'res-10', title: 'GitHub Copilot', url: 'https://github.com/features/copilot', category: 'AI Tools', description: 'AI-powered coding assistant', isBookmarked: false },
  
  // Career
  { id: 'res-11', title: 'Pramp', url: 'https://www.pramp.com/', category: 'Career', description: 'Free mock interviews with peers', isBookmarked: false },
  { id: 'res-12', title: 'STAR Technique', url: 'https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-method', category: 'Career', description: 'Behavioral interview technique', isBookmarked: false },
  { id: 'res-13', title: 'Resume Templates', url: 'https://www.canva.com/resumes/', category: 'Career', description: 'Professional resume templates', isBookmarked: false },
  { id: 'res-14', title: 'LinkedIn Optimization', url: 'https://www.linkedin.com/pulse/linkedin-profile-optimization-guide-career-coach-jenny/', category: 'Career', description: 'Optimize your LinkedIn profile', isBookmarked: false },
  
  // Hackathons
  { id: 'res-15', title: 'MLH (Major League Hacking)', url: 'https://mlh.io/', category: 'Hackathons', description: 'Find hackathons worldwide', isBookmarked: false },
  { id: 'res-16', title: 'Devpost', url: 'https://devpost.com/', category: 'Hackathons', description: 'Discover and join hackathons', isBookmarked: false },
  
  // Job Boards
  { id: 'res-18', title: 'Simplify', url: 'https://simplify.jobs/', category: 'Job Boards', description: 'AI-powered job search platform', isBookmarked: false },
  { id: 'res-19', title: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/', category: 'Job Boards', description: 'Professional job board', isBookmarked: false },
  { id: 'res-20', title: 'AngelList', url: 'https://angel.co/', category: 'Job Boards', description: 'Startup jobs and funding', isBookmarked: false },
];

export const initialBadges: Badge[] = [
  { id: 'badge-1', title: 'First Resume Created', description: 'Created your first resume', icon: 'FileText', earned: false, points: 50 },
  { id: 'badge-2', title: 'Project Deployed', description: 'Deployed your first project', icon: 'Rocket', earned: false, points: 100 },
  { id: 'badge-3', title: '10 LeetCode Problems', description: 'Solved 10 LeetCode problems', icon: 'Code', earned: false, points: 150 },
  { id: 'badge-4', title: 'GitHub Active', description: 'Made 30 commits in a month', icon: 'GitBranch', earned: false, points: 75 },
  { id: 'badge-5', title: 'Network Builder', description: 'Connected with 50 professionals', icon: 'Users', earned: false, points: 100 },
  { id: 'badge-6', title: 'Hackathon Participant', description: 'Participated in your first hackathon', icon: 'Zap', earned: false, points: 200 },
  { id: 'badge-7', title: 'Interview Ready', description: 'Completed 5 mock interviews', icon: 'MessageCircle', earned: false, points: 175 },
  { id: 'badge-8', title: 'Application Sent', description: 'Applied to your first internship', icon: 'Send', earned: false, points: 125 },
];