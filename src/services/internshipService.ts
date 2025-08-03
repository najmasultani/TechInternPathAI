import { Internship } from '../types';

// Mock data that would typically come from the GitHub APIs
const mockInternships: Internship[] = [
  {
    id: 'intern-1',
    company: 'Google',
    position: 'Software Engineer Intern - Summer 2026',
    location: 'Mountain View, CA',
    applicationUrl: 'https://careers.google.com/jobs/results/123456789/',
    datePosted: '2025-01-15',
    deadline: '2025-03-01',
    requirements: ['Computer Science or related field', 'Programming experience in Python/Java/C++', 'Strong problem-solving skills'],
    description: 'Join Google as a Software Engineer Intern and work on products used by billions of users.',
    salary: '$8,000 - $10,000/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-2',
    company: 'Microsoft',
    position: 'Software Engineering Intern - Explore Program',
    location: 'Redmond, WA',
    applicationUrl: 'https://careers.microsoft.com/students/us/en/job/1234567/',
    datePosted: '2025-01-12',
    deadline: '2025-02-28',
    requirements: ['First or second year student', 'Basic programming knowledge', 'Passion for technology'],
    description: 'Microsoft Explore Program for first and second-year students interested in software engineering.',
    salary: '$7,500 - $9,000/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-3',
    company: 'OpenAI',
    position: 'AI Research Intern',
    location: 'San Francisco, CA',
    applicationUrl: 'https://openai.com/careers/ai-research-intern',
    datePosted: '2025-01-10',
    deadline: '2025-02-15',
    requirements: ['Machine Learning coursework', 'Python programming', 'Research experience preferred'],
    description: 'Work on cutting-edge AI research projects at OpenAI.',
    salary: '$9,000 - $12,000/month',
    type: 'AI/ML',
    source: 'SpeedyApply',
    isNew: true
  },
  {
    id: 'intern-4',
    company: 'Meta',
    position: 'Software Engineer Intern - University',
    location: 'Menlo Park, CA',
    applicationUrl: 'https://www.metacareers.com/jobs/1234567890/',
    datePosted: '2025-01-08',
    deadline: '2025-03-15',
    requirements: ['Computer Science degree pursuit', 'Programming experience', 'Strong communication skills'],
    description: 'Build the future of social technology at Meta.',
    salary: '$8,500 - $10,500/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: false
  },
  {
    id: 'intern-5',
    company: 'Anthropic',
    position: 'AI Safety Research Intern',
    location: 'San Francisco, CA',
    applicationUrl: 'https://www.anthropic.com/careers/ai-safety-intern',
    datePosted: '2025-01-05',
    deadline: '2025-02-20',
    requirements: ['AI/ML background', 'Python proficiency', 'Interest in AI safety'],
    description: 'Contribute to AI safety research at Anthropic.',
    salary: '$10,000 - $13,000/month',
    type: 'AI/ML',
    source: 'SpeedyApply',
    isNew: false
  },
  {
    id: 'intern-6',
    company: 'Stripe',
    position: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    applicationUrl: 'https://stripe.com/jobs/listing/software-engineering-intern',
    datePosted: '2025-01-14',
    deadline: '2025-03-10',
    requirements: ['Programming experience', 'Interest in fintech', 'Strong analytical skills'],
    description: 'Help build the economic infrastructure for the internet.',
    salary: '$8,000 - $9,500/month',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-7',
    company: 'Shopify',
    position: 'Dev Degree Intern',
    location: 'Ottawa, ON',
    applicationUrl: 'https://devdegree.ca/apply',
    datePosted: '2025-01-13',
    deadline: '2025-02-25',
    requirements: ['Canadian resident', 'High school completion', 'Interest in software development'],
    description: 'Work-integrated learning program combining work and study.',
    salary: 'CAD $50,000 - $60,000/year',
    type: 'Software Engineering',
    source: 'SimplifyJobs',
    isNew: true
  },
  {
    id: 'intern-8',
    company: 'Cohere',
    position: 'Machine Learning Intern',
    location: 'Toronto, ON',
    applicationUrl: 'https://cohere.com/careers/ml-intern',
    datePosted: '2025-01-11',
    deadline: '2025-02-18',
    requirements: ['ML/AI coursework', 'Python and PyTorch', 'NLP interest preferred'],
    description: 'Work on large language models and NLP research.',
    salary: 'CAD $6,000 - $8,000/month',
    type: 'AI/ML',
    source: 'SpeedyApply',
    isNew: true
  }
];

export const fetchInternships = async (): Promise<Internship[]> => {
  // In a real implementation, this would fetch from the GitHub APIs
  // For now, returning mock data that represents what would come from:
  // - https://github.com/SimplifyJobs/Summer2026-Internships
  // - https://github.com/speedyapply/2026-AI-College-Jobs
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInternships);
    }, 1000);
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