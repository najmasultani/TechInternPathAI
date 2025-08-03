import { Internship } from '../types';

// Current and upcoming internships for 2025-2026
const currentInternships: Internship[] = [
  {
    id: 'intern-1',
    company: 'Google',
    position: 'Software Engineer Intern - STEP Program 2026',
    location: 'Mountain View, CA / Remote',
    applicationUrl: 'https://careers.google.com/jobs/results/',
    datePosted: '2025-01-15',
    deadline: '2025-03-01',
    requirements: ['First or second year student', 'Programming experience in any language', 'Strong problem-solving skills'],
    description: 'Google STEP (Student Training in Engineering Program) is designed for first and second-year undergraduate students with a passion for computer science.',
    salary: '$8,000 - $10,000/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-2',
    company: 'Microsoft',
    position: 'Software Engineering Intern - Explore Program 2026',
    location: 'Redmond, WA / Multiple Locations',
    applicationUrl: 'https://careers.microsoft.com/students/us/en/usexploreprogram',
    datePosted: '2025-01-18',
    deadline: '2025-02-28',
    requirements: ['First or second year student', 'Basic programming knowledge', 'Passion for technology'],
    description: 'Microsoft Explore Program is a 12-week summer internship program specifically designed for first and second-year college students.',
    salary: '$7,500 - $9,000/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-3',
    company: 'Meta',
    position: 'Software Engineer Intern - University 2026',
    location: 'Menlo Park, CA / New York, NY',
    applicationUrl: 'https://www.metacareers.com/jobs/',
    datePosted: '2025-01-20',
    deadline: '2025-03-15',
    requirements: ['Computer Science or related field', 'Programming experience', 'Strong communication skills'],
    description: 'Build the future of social technology and help billions of people connect.',
    salary: '$8,500 - $10,500/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-4',
    company: 'OpenAI',
    position: 'AI Research Intern - Summer 2026',
    location: 'San Francisco, CA',
    applicationUrl: 'https://openai.com/careers/',
    datePosted: '2025-01-22',
    deadline: '2025-02-15',
    requirements: ['Machine Learning coursework', 'Python programming', 'Research experience preferred'],
    description: 'Work on cutting-edge AI research projects that will shape the future of artificial intelligence.',
    salary: '$10,000 - $13,000/month',
    type: 'AI/ML',
    source: 'SpeedyApply',
    isNew: true
  },
  {
    id: 'intern-5',
    company: 'Anthropic',
    position: 'AI Safety Research Intern 2026',
    location: 'San Francisco, CA',
    applicationUrl: 'https://www.anthropic.com/careers',
    datePosted: '2025-01-19',
    deadline: '2025-02-20',
    requirements: ['AI/ML background', 'Python proficiency', 'Interest in AI safety'],
    description: 'Contribute to AI safety research and help build safe, beneficial AI systems.',
    salary: '$10,000 - $13,000/month',
    type: 'AI/ML',
    source: 'SpeedyApply',
    isNew: true
  },
  {
    id: 'intern-6',
    company: 'Stripe',
    position: 'Software Engineering Intern 2026',
    location: 'San Francisco, CA / Seattle, WA',
    applicationUrl: 'https://stripe.com/jobs',
    datePosted: '2025-01-21',
    deadline: '2025-03-10',
    requirements: ['Programming experience', 'Interest in fintech', 'Strong analytical skills'],
    description: 'Help build the economic infrastructure for the internet at one of the fastest-growing fintech companies.',
    salary: '$8,000 - $9,500/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-7',
    company: 'Shopify',
    position: 'Dev Degree Intern 2026',
    location: 'Ottawa, ON / Toronto, ON',
    applicationUrl: 'https://devdegree.ca/apply',
    datePosted: '2025-01-17',
    deadline: '2025-02-25',
    requirements: ['Canadian resident', 'High school completion', 'Interest in software development'],
    description: 'Work-integrated learning program combining work and study at one of Canada\'s leading tech companies.',
    salary: 'CAD $55,000 - $65,000/year',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-8',
    company: 'Cohere',
    position: 'Machine Learning Intern 2026',
    location: 'Toronto, ON',
    applicationUrl: 'https://cohere.com/careers',
    datePosted: '2025-01-16',
    deadline: '2025-02-18',
    requirements: ['ML/AI coursework', 'Python and PyTorch', 'NLP interest preferred'],
    description: 'Work on large language models and natural language processing research at a leading AI company.',
    salary: 'CAD $7,000 - $9,000/month',
    type: 'AI/ML',
    source: 'SpeedyApply',
    isNew: true
  },
  {
    id: 'intern-9',
    company: 'Amazon',
    position: 'Software Development Engineer Intern 2026',
    location: 'Seattle, WA / Multiple Locations',
    applicationUrl: 'https://amazon.jobs/en/teams/internships-for-students',
    datePosted: '2025-01-14',
    deadline: '2025-03-20',
    requirements: ['Computer Science or related field', 'Programming experience', 'Problem-solving skills'],
    description: 'Join one of the world\'s largest tech companies and work on products used by millions.',
    salary: '$7,000 - $8,500/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: false
  },
  {
    id: 'intern-10',
    company: 'Apple',
    position: 'Software Engineering Intern 2026',
    location: 'Cupertino, CA',
    applicationUrl: 'https://jobs.apple.com/en-us/search?team=internships',
    datePosted: '2025-01-12',
    deadline: '2025-03-05',
    requirements: ['Computer Science degree pursuit', 'Programming skills', 'Innovation mindset'],
    description: 'Help create products that delight and inspire millions of Apple customers around the world.',
    salary: '$8,000 - $10,000/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: false
  },
  {
    id: 'intern-11',
    company: 'NVIDIA',
    position: 'AI/ML Software Intern 2026',
    location: 'Santa Clara, CA',
    applicationUrl: 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite',
    datePosted: '2025-01-23',
    deadline: '2025-02-28',
    requirements: ['Machine Learning knowledge', 'CUDA/GPU programming', 'C++/Python skills'],
    description: 'Work on cutting-edge AI and GPU computing technologies that power the future.',
    salary: '$9,000 - $11,000/month',
    type: 'AI/ML',
    source: 'SpeedyApply',
    isNew: true
  },
  {
    id: 'intern-12',
    company: 'Databricks',
    position: 'Software Engineering Intern 2026',
    location: 'San Francisco, CA',
    applicationUrl: 'https://databricks.com/company/careers',
    datePosted: '2025-01-24',
    deadline: '2025-03-01',
    requirements: ['Programming experience', 'Interest in data platforms', 'Distributed systems knowledge helpful'],
    description: 'Help build the unified analytics platform for big data and machine learning.',
    salary: '$8,500 - $10,000/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-13',
    company: 'Palantir',
    position: 'Forward Deployed Software Engineer Intern 2026',
    location: 'New York, NY / Palo Alto, CA',
    applicationUrl: 'https://jobs.lever.co/palantir',
    datePosted: '2025-01-13',
    deadline: '2025-02-22',
    requirements: ['Strong programming skills', 'Problem-solving abilities', 'Interest in real-world applications'],
    description: 'Work directly with customers to deploy software solutions for complex problems.',
    salary: '$8,000 - $9,500/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: false
  },
  {
    id: 'intern-14',
    company: 'Figma',
    position: 'Software Engineer Intern 2026',
    location: 'San Francisco, CA / New York, NY',
    applicationUrl: 'https://www.figma.com/careers/',
    datePosted: '2025-01-25',
    deadline: '2025-03-08',
    requirements: ['Programming experience', 'Interest in design tools', 'Frontend or backend focus'],
    description: 'Help build the collaborative design platform used by millions of designers and developers.',
    salary: '$8,500 - $10,000/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-15',
    company: 'Roblox',
    position: 'Software Engineer Intern 2026',
    location: 'San Mateo, CA',
    applicationUrl: 'https://corp.roblox.com/careers/',
    datePosted: '2025-01-11',
    deadline: '2025-02-26',
    requirements: ['Programming skills', 'Interest in gaming/platforms', 'Collaborative mindset'],
    description: 'Build the platform that powers imagination and connects millions of users worldwide.',
    salary: '$7,500 - $9,000/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: false
  }
];

export const fetchInternships = async (): Promise<Internship[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(currentInternships);
    }, 800);
  });
};

export const getNewInternships = (internships: Internship[], daysBack: number = 7): Internship[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysBack);
  
  return internships.filter(internship => {
    const postedDate = new Date(internship.datePosted);
    return postedDate >= cutoffDate;
  });
};

export const filterInternships = (
  internships: Internship[],
  filters: {
    type?: string;
    location?: string;
    company?: string;
    dateRange?: { start: string; end: string };
    isNew?: boolean;
  }
): Internship[] => {
  return internships.filter(internship => {
    if (filters.type && filters.type !== 'all' && internship.type !== filters.type) {
      return false;
    }
    
    if (filters.location && !internship.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    if (filters.company && !internship.company.toLowerCase().includes(filters.company.toLowerCase())) {
      return false;
    }
    
    if (filters.dateRange) {
      const postedDate = new Date(internship.datePosted);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      
      if (postedDate < startDate || postedDate > endDate) {
        return false;
      }
    }
    
    if (filters.isNew !== undefined && internship.isNew !== filters.isNew) {
      return false;
    }
    
    return true;
  });
};

// Function to fetch from GitHub APIs (placeholder for future implementation)
export const fetchFromGitHub = async (repo: string): Promise<any[]> => {
  // This would fetch from the actual GitHub APIs
  // For now, returning our curated current data
  console.log(`Would fetch from: ${repo}`);
  return currentInternships;
};