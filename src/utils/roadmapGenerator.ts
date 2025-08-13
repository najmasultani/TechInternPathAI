import { RoadmapPhase, Task, Resource, Badge } from '../types';
import { openaiService } from '../services/openaiService';

interface UserData {
  name: string;
  email: string;
  educationLevel: string;
  major: string;
  currentSkills: string[];
  targetRole: string;
  timeCommitment: string;
  preferredCompanies: string[];
  experience: string;
  goals: string[];
  // New detailed fields
  startDate?: string;
  internshipStartDate?: string;
  technicalLevel?: string;
  knownLanguages?: string[];
  specificRole?: string;
  targetCompanies?: string[];
  weeklyHours?: string;
  examPeriods?: string;
  hasResumeLinkedIn?: string;
  hasPortfolioGitHub?: string;
}

export const generatePersonalizedRoadmap = async (userData: UserData): Promise<{
  phases: RoadmapPhase[];
  resources: Resource[];
  badges: Badge[];
}> => {
  console.log('Generating roadmap for user data:', userData);
  
  try {
    // Try to generate roadmap using OpenAI with detailed questionnaire approach
    const aiRoadmap = await openaiService.generateDetailedRoadmap(userData);
    
    // Ensure all items have proper IDs and structure
    const phases = aiRoadmap.phases.map((phase: any, index: number) => ({
      ...phase,
      id: phase.id || `phase-${index + 1}`,
      tasks: phase.tasks.map((task: any, taskIndex: number) => ({
        ...task,
        id: task.id || `task-${index + 1}-${taskIndex + 1}`,
        completed: false
      }))
    }));
    
    const resources = aiRoadmap.resources.map((resource: any, index: number) => ({
      ...resource,
      id: resource.id || `res-${index + 1}`,
      isBookmarked: resource.isBookmarked || false
    }));
    
    const badges = aiRoadmap.badges.map((badge: any, index: number) => ({
      ...badge,
      id: badge.id || `badge-${index + 1}`,
      earned: false
    }));
    
    return { phases, resources, badges };
  } catch (error) {
    console.error('Error generating AI roadmap, falling back to template:', error);
    
    // Fallback to the existing template-based generation
    return generateTemplateRoadmap(userData);
  }
};

// Fallback template-based roadmap generation
const generateTemplateRoadmap = (userData: UserData): {
  phases: RoadmapPhase[];
  resources: Resource[];
  badges: Badge[];
} => {
  const isBeginnerLevel = userData.experience === 'complete-beginner' || userData.experience === 'some-basics';
  const hasWebSkills = userData.currentSkills.some(skill => 
    ['JavaScript', 'HTML/CSS', 'React', 'Node.js', 'Web Development'].includes(skill)
  );
  const hasPythonSkills = userData.currentSkills.includes('Python');
  const hasDataSkills = userData.currentSkills.some(skill => 
    ['Python', 'Data Science', 'Machine Learning', 'SQL'].includes(skill)
  );
  const isHighTimeCommitment = userData.timeCommitment.includes('20+') || userData.timeCommitment.includes('15-20');

  // Generate Phase 1: Foundation Building
  const phase1Tasks: Task[] = [
    { id: 'task-1-1', text: 'Create professional GitHub profile with README', completed: false },
    { id: 'task-1-2', text: 'Set up LinkedIn profile with professional photo and summary', completed: false },
  ];

  // Add portfolio task based on skills
  if (hasWebSkills) {
    phase1Tasks.push({ id: 'task-1-3', text: 'Build portfolio website using React/Next.js', completed: false });
  } else {
    phase1Tasks.push({ id: 'task-1-3', text: 'Create simple portfolio using Bolt.new or Notion', completed: false });
  }

  phase1Tasks.push({ id: 'task-1-4', text: 'Draft first version of technical resume', completed: false });

  // Add skill-specific learning tasks
  if (!hasPythonSkills && (userData.targetRole.includes('Data Science') || userData.targetRole.includes('Machine Learning'))) {
    phase1Tasks.push({ id: 'task-1-5', text: 'Learn Python fundamentals (variables, loops, functions)', completed: false });
    phase1Tasks.push({ id: 'task-1-6', text: 'Complete Python basics course (Codecademy/freeCodeCamp)', completed: false });
  } else if (!hasWebSkills && (userData.targetRole.includes('Frontend') || userData.targetRole.includes('Full Stack'))) {
    phase1Tasks.push({ id: 'task-1-5', text: 'Learn HTML, CSS, and JavaScript fundamentals', completed: false });
    phase1Tasks.push({ id: 'task-1-6', text: 'Build 3 simple web projects (calculator, todo, weather app)', completed: false });
  } else if (userData.targetRole.includes('Mobile')) {
    phase1Tasks.push({ id: 'task-1-5', text: 'Learn mobile development basics (React Native or Flutter)', completed: false });
    phase1Tasks.push({ id: 'task-1-6', text: 'Build your first mobile app prototype', completed: false });
  } else {
    phase1Tasks.push({ id: 'task-1-5', text: 'Master Git and GitHub workflow', completed: false });
    phase1Tasks.push({ id: 'task-1-6', text: 'Learn your target programming language fundamentals', completed: false });
  }

  // Add experience-appropriate learning
  if (isBeginnerLevel) {
    phase1Tasks.push({ id: 'task-1-7', text: 'Complete Harvard CS50 or similar intro CS course', completed: false });
    phase1Tasks.push({ id: 'task-1-8', text: 'Join beginner-friendly coding communities', completed: false });
  } else {
    phase1Tasks.push({ id: 'task-1-7', text: 'Review and strengthen programming fundamentals', completed: false });
    phase1Tasks.push({ id: 'task-1-8', text: 'Start contributing to open source projects', completed: false });
  }

  // Add networking and events
  if (userData.goals.includes('Attend hackathons')) {
    phase1Tasks.push({ id: 'task-1-9', text: 'Join Kaggle competitions and explore data science challenges', completed: false });
  }

  phase1Tasks.push({ id: 'task-1-10', text: 'Participate in coding challenges and online competitions', completed: false });

  // Add company research based on preferences
  if (userData.preferredCompanies.length > 0) {
    const topCompanies = userData.preferredCompanies.slice(0, 4).join(', ');
    phase1Tasks.push({
      id: 'task-1-11',
      text: `Research internship programs: ${topCompanies}`,
      completed: false
    });
  } else {
    phase1Tasks.push({
      id: 'task-1-11',
      text: 'Explore internships: Google STEP, Microsoft Explore, RBC Amplify',
      completed: false
    });
  }

  // Generate Phase 2: Skill Development
  const phase2Tasks: Task[] = [
    { id: 'task-2-1', text: 'Excel in academic coursework and maintain strong GPA', completed: false },
    { id: 'task-2-2', text: 'Join tech clubs (GDSC, Blueprint, Women in STEM)', completed: false },
  ];

  // Add role-specific project tasks
  if (userData.targetRole.includes('Frontend') || userData.targetRole.includes('Full Stack')) {
    phase2Tasks.push(
      { id: 'task-2-3', text: 'Learn React.js and build interactive web applications', completed: false },
      { id: 'task-2-4', text: 'Master responsive design and CSS frameworks', completed: false },
      { id: 'task-2-5', text: 'Build a portfolio project with API integration', completed: false }
    );
  } else if (userData.targetRole.includes('Backend') || userData.targetRole.includes('Full Stack')) {
    phase2Tasks.push(
      { id: 'task-2-3', text: 'Learn Node.js/Express or Django framework', completed: false },
      { id: 'task-2-4', text: 'Build REST APIs and work with databases (PostgreSQL/MongoDB)', completed: false },
      { id: 'task-2-5', text: 'Create a full-stack application with authentication', completed: false }
    );
  } else if (userData.targetRole.includes('Data Science') || userData.targetRole.includes('Machine Learning')) {
    phase2Tasks.push(
      { id: 'task-2-3', text: 'Learn pandas, numpy, and data visualization (matplotlib/seaborn)', completed: false },
      { id: 'task-2-4', text: 'Complete Kaggle Learn courses and first competition', completed: false },
      { id: 'task-2-5', text: 'Build data analysis project with real datasets', completed: false }
    );
  } else if (userData.targetRole.includes('Mobile')) {
    phase2Tasks.push(
      { id: 'task-2-3', text: 'Master React Native or Flutter development', completed: false },
      { id: 'task-2-4', text: 'Learn mobile UI/UX design principles', completed: false },
      { id: 'task-2-5', text: 'Build and deploy mobile app to app stores', completed: false }
    );
  } else {
    phase2Tasks.push(
      { id: 'task-2-3', text: 'Learn relevant frameworks for your target role', completed: false },
      { id: 'task-2-4', text: 'Build meaningful projects showcasing your skills', completed: false },
      { id: 'task-2-5', text: 'Contribute to open source projects in your domain', completed: false }
    );
  }

  // Add common development tasks
  phase2Tasks.push(
    { id: 'task-2-6', text: 'Start LeetCode practice (2-3 problems per week)', completed: false },
    { id: 'task-2-7', text: 'Learn version control best practices and collaboration', completed: false },
    { id: 'task-2-8', text: 'Update portfolio with new projects and case studies', completed: false }
  );

  // Add goal-specific tasks
  if (userData.goals.includes('Attend hackathons')) {
    phase2Tasks.push({ id: 'task-2-9', text: 'Participate in 2-3 hackathons and build network', completed: false });
  }

  if (userData.goals.includes('Network with professionals')) {
    phase2Tasks.push({ id: 'task-2-10', text: 'Connect with 30+ professionals on LinkedIn', completed: false });
  }

  if (userData.goals.includes('Learn new technologies')) {
    phase2Tasks.push({ id: 'task-2-11', text: 'Explore emerging technologies (AI, blockchain, cloud)', completed: false });
  }

  // Generate Phase 3: Application Preparation
  const phase3Tasks: Task[] = [
    { id: 'task-3-1', text: 'Build capstone project demonstrating advanced skills', completed: false },
    { id: 'task-3-2', text: 'Polish resume with quantified achievements and get reviews', completed: false },
    { id: 'task-3-3', text: 'Create comprehensive portfolio with 3-5 best projects', completed: false },
    { id: 'task-3-4', text: 'Master data structures and algorithms fundamentals', completed: false },
  ];

  // Add role-specific advanced preparation
  if (userData.targetRole.includes('Data Science') || userData.targetRole.includes('Machine Learning')) {
    phase3Tasks.push(
      { id: 'task-3-5', text: 'Learn TensorFlow/PyTorch and build ML models', completed: false },
      { id: 'task-3-6', text: 'Complete advanced statistics and probability courses', completed: false }
    );
  } else if (userData.targetRole.includes('Frontend')) {
    phase3Tasks.push(
      { id: 'task-3-5', text: 'Master advanced React patterns and state management', completed: false },
      { id: 'task-3-6', text: 'Learn performance optimization and testing frameworks', completed: false }
    );
  } else if (userData.targetRole.includes('Backend')) {
    phase3Tasks.push(
      { id: 'task-3-5', text: 'Learn system design basics and scalability concepts', completed: false },
      { id: 'task-3-6', text: 'Master cloud platforms (AWS/GCP/Azure) and DevOps', completed: false }
    );
  } else {
    phase3Tasks.push(
      { id: 'task-3-5', text: 'Learn cloud platforms and modern development tools', completed: false },
      { id: 'task-3-6', text: 'Build projects using industry-standard practices', completed: false }
    );
  }

  // Add application-specific tasks based on target companies
  if (userData.preferredCompanies.includes('Google') || userData.preferredCompanies.includes('Microsoft')) {
    phase3Tasks.push({ id: 'task-3-7', text: 'Apply to Google STEP and Microsoft Explore programs', completed: false });
  }

  if (userData.preferredCompanies.includes('Meta') || userData.preferredCompanies.includes('Amazon')) {
    phase3Tasks.push({ id: 'task-3-8', text: 'Apply to Meta University and Amazon internship programs', completed: false });
  }

  if (userData.preferredCompanies.includes('Startups')) {
    phase3Tasks.push({ id: 'task-3-9', text: 'Apply to Y Combinator and AngelList startup internships', completed: false });
  }

  phase3Tasks.push(
    { id: 'task-3-10', text: 'Practice technical interviews with Pramp and peers', completed: false },
    { id: 'task-3-11', text: 'Solve coding problems consistently (5-7 per week)', completed: false },
    { id: 'task-3-12', text: 'Prepare behavioral interview stories using STAR method', completed: false }
  );

  // Generate Phase 4: Backup Plans and Growth
  const phase4Tasks: Task[] = [
    { id: 'task-4-1', text: 'Apply to additional companies and backup options', completed: false },
    { id: 'task-4-2', text: 'Explore volunteer development opportunities with nonprofits', completed: false },
  ];

  if (userData.goals.includes('Contribute to open source')) {
    phase4Tasks.push({ id: 'task-4-3', text: 'Make significant open source contributions (5+ PRs)', completed: false });
  }

  phase4Tasks.push(
    { id: 'task-4-4', text: 'Build intensive 2-3 week capstone project', completed: false },
    { id: 'task-4-5', text: 'Reflect on journey and create summer learning plan', completed: false },
    { id: 'task-4-6', text: 'Update all profiles and prepare for next application cycle', completed: false }
  );

  if (userData.goals.includes('Get mentorship')) {
    phase4Tasks.push({ id: 'task-4-7', text: 'Find and connect with industry mentors', completed: false });
  }

  // Create personalized phases
  const phases: RoadmapPhase[] = [
    {
      id: 'phase-1',
      title: isBeginnerLevel ? 'Foundation Building' : 'Skill Enhancement',
      period: userData.educationLevel.includes('High School') ? 'Summer 2025' : 'August 2025',
      color: 'from-blue-500 to-cyan-500',
      isExpanded: true,
      tasks: phase1Tasks,
    },
    {
      id: 'phase-2',
      title: 'Skill Development & Projects',
      period: 'Fall 2025',
      color: 'from-purple-500 to-pink-500',
      isExpanded: false,
      tasks: phase2Tasks,
    },
    {
      id: 'phase-3',
      title: 'Application Season',
      period: 'Winter 2026',
      color: 'from-green-500 to-teal-500',
      isExpanded: false,
      tasks: phase3Tasks,
    },
    {
      id: 'phase-4',
      title: 'Backup Plans & Growth',
      period: 'Spring 2026',
      color: 'from-orange-500 to-red-500',
      isExpanded: false,
      tasks: phase4Tasks,
    },
  ];

  // Generate comprehensive personalized resources
  const resources: Resource[] = [
    // Core essentials for everyone
    { id: 'res-1', title: 'GitHub', url: 'https://github.com/', category: 'Development', description: 'Version control and portfolio hosting', isBookmarked: true },
    { id: 'res-2', title: 'LinkedIn', url: 'https://linkedin.com/', category: 'Career', description: 'Professional networking platform', isBookmarked: true },
    { id: 'res-3', title: 'LeetCode', url: 'https://leetcode.com/', category: 'Coding Practice', description: 'Essential for technical interview preparation', isBookmarked: true },
  ];

  // Add role-specific resources
  if (userData.targetRole.includes('Frontend') || userData.targetRole.includes('Full Stack')) {
    resources.push(
      { id: 'res-4', title: 'React Documentation', url: 'https://react.dev/', category: 'Web Development', description: 'Official React learning resources', isBookmarked: true },
      { id: 'res-5', title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', category: 'Web Development', description: 'Comprehensive web development reference', isBookmarked: false },
      { id: 'res-6', title: 'Frontend Mentor', url: 'https://www.frontendmentor.io/', category: 'Web Development', description: 'Real-world frontend challenges', isBookmarked: false },
      { id: 'res-7', title: 'CSS-Tricks', url: 'https://css-tricks.com/', category: 'Web Development', description: 'CSS tutorials and best practices', isBookmarked: false }
    );
  }

  if (userData.targetRole.includes('Backend') || userData.targetRole.includes('Full Stack')) {
    resources.push(
      { id: 'res-8', title: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/', category: 'Backend Development', description: 'Server-side JavaScript runtime', isBookmarked: false },
      { id: 'res-9', title: 'PostgreSQL Tutorial', url: 'https://www.postgresql.org/docs/', category: 'Database', description: 'Advanced database management', isBookmarked: false },
      { id: 'res-10', title: 'REST API Design', url: 'https://restfulapi.net/', category: 'Backend Development', description: 'API design best practices', isBookmarked: false },
      { id: 'res-11', title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', category: 'Backend Development', description: 'Learn system design concepts', isBookmarked: false }
    );
  }

  if (userData.targetRole.includes('Data Science') || userData.targetRole.includes('Machine Learning')) {
    resources.push(
      { id: 'res-12', title: 'Kaggle', url: 'https://kaggle.com/', category: 'Data Science', description: 'Data science competitions and datasets', isBookmarked: true },
      { id: 'res-13', title: 'TensorFlow', url: 'https://tensorflow.org/', category: 'Machine Learning', description: 'Machine learning framework', isBookmarked: false },
      { id: 'res-14', title: 'Pandas Documentation', url: 'https://pandas.pydata.org/', category: 'Data Science', description: 'Data manipulation and analysis', isBookmarked: false },
      { id: 'res-15', title: 'Coursera ML Course', url: 'https://www.coursera.org/learn/machine-learning', category: 'Machine Learning', description: 'Andrew Ng\'s famous ML course', isBookmarked: false }
    );
  }

  if (userData.targetRole.includes('Mobile')) {
    resources.push(
      { id: 'res-16', title: 'React Native Docs', url: 'https://reactnative.dev/', category: 'Mobile Development', description: 'Cross-platform mobile development', isBookmarked: false },
      { id: 'res-17', title: 'Flutter Documentation', url: 'https://flutter.dev/', category: 'Mobile Development', description: 'Google\'s mobile development framework', isBookmarked: false },
      { id: 'res-18', title: 'Mobile Design Guidelines', url: 'https://material.io/design', category: 'Mobile Development', description: 'Material Design principles', isBookmarked: false }
    );
  }

  // Add experience-level appropriate resources
  if (isBeginnerLevel) {
    resources.push(
      { id: 'res-19', title: 'Harvard CS50', url: 'https://cs50.harvard.edu/', category: 'CS Learning', description: 'Introduction to Computer Science', isBookmarked: true },
      { id: 'res-20', title: 'freeCodeCamp', url: 'https://freecodecamp.org/', category: 'CS Learning', description: 'Free coding bootcamp with certificates', isBookmarked: true },
      { id: 'res-21', title: 'Codecademy', url: 'https://codecademy.com/', category: 'CS Learning', description: 'Interactive coding lessons', isBookmarked: false }
    );
  } else {
    resources.push(
      { id: 'res-22', title: 'Advanced Algorithms', url: 'https://www.coursera.org/specializations/algorithms', category: 'CS Learning', description: 'Stanford algorithms specialization', isBookmarked: false },
      { id: 'res-23', title: 'System Design Interview', url: 'https://github.com/checkcheckzz/system-design-interview', category: 'CS Learning', description: 'System design preparation', isBookmarked: false }
    );
  }

  // Add company-specific resources based on preferences
  userData.preferredCompanies.forEach((company, index) => {
    switch (company) {
      case 'Google':
        resources.push({ 
          id: `res-company-${index}-1`, 
          title: 'Google STEP Program', 
          url: 'https://buildyourfuture.withgoogle.com/programs/step/', 
          category: 'Internships', 
          description: 'Google\'s internship for first and second-year students', 
          isBookmarked: true 
        });
        break;
      case 'Microsoft':
        resources.push({ 
          id: `res-company-${index}-2`, 
          title: 'Microsoft Explore Program', 
          url: 'https://careers.microsoft.com/students/us/en/usexploreprogram', 
          category: 'Internships', 
          description: 'Microsoft\'s program for early-career students', 
          isBookmarked: true 
        });
        break;
      case 'Meta':
        resources.push({ 
          id: `res-company-${index}-3`, 
          title: 'Meta University', 
          url: 'https://www.metacareers.com/students/', 
          category: 'Internships', 
          description: 'Meta\'s internship and training programs', 
          isBookmarked: true 
        });
        break;
      case 'RBC':
        resources.push({ 
          id: `res-company-${index}-4`, 
          title: 'RBC Amplify Program', 
          url: 'https://jobs.rbc.com/ca/en/amplify', 
          category: 'Internships', 
          description: 'RBC\'s technology internship program', 
          isBookmarked: true 
        });
        break;
      case 'Shopify':
        resources.push({ 
          id: `res-company-${index}-5`, 
          title: 'Shopify Dev Degree', 
          url: 'https://devdegree.ca/', 
          category: 'Internships', 
          description: 'Shopify\'s work-integrated learning program', 
          isBookmarked: true 
        });
        break;
    }
  });

  // Add goal-specific resources
  if (userData.goals.includes('Attend hackathons')) {
    resources.push(
      { id: 'res-hack-1', title: 'Major League Hacking', url: 'https://mlh.io/', category: 'Hackathons', description: 'Find hackathons worldwide', isBookmarked: true },
      { id: 'res-hack-2', title: 'Devpost', url: 'https://devpost.com/', category: 'Hackathons', description: 'Discover and submit to hackathons', isBookmarked: false },
      { id: 'res-hack-3', title: 'Kaggle', url: 'https://kaggle.com/', category: 'Data Science', description: 'Data science competitions and learning', isBookmarked: false }
    );
  }

  if (userData.goals.includes('Contribute to open source')) {
    resources.push(
      { id: 'res-os-1', title: 'Good First Issues', url: 'https://goodfirstissue.dev/', category: 'Open Source', description: 'Beginner-friendly open source projects', isBookmarked: true },
      { id: 'res-os-2', title: 'First Timers Only', url: 'https://www.firsttimersonly.com/', category: 'Open Source', description: 'Resources for first-time contributors', isBookmarked: false }
    );
  }

  if (userData.goals.includes('Get mentorship')) {
    resources.push(
      { id: 'res-mentor-1', title: 'ADPList', url: 'https://adplist.org/', category: 'Career', description: 'Free mentorship platform', isBookmarked: false },
      { id: 'res-mentor-2', title: 'MentorCruise', url: 'https://mentorcruise.com/', category: 'Career', description: 'Professional mentorship marketplace', isBookmarked: false }
    );
  }

  // Add common career resources
  resources.push(
    { id: 'res-career-1', title: 'Pramp', url: 'https://www.pramp.com/', category: 'Career', description: 'Free mock interviews with peers', isBookmarked: true },
    { id: 'res-career-2', title: 'STAR Technique Guide', url: 'https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-method', category: 'Career', description: 'Behavioral interview technique', isBookmarked: false },
    { id: 'res-career-3', title: 'Resume Templates', url: 'https://www.canva.com/resumes/', category: 'Career', description: 'Professional resume templates', isBookmarked: false },
    { id: 'res-career-4', title: 'Cracking the Coding Interview', url: 'https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850', category: 'Career', description: 'Essential interview preparation book', isBookmarked: false }
  );

  // Add coding practice resources
  resources.push(
    { id: 'res-code-1', title: 'HackerRank', url: 'https://www.hackerrank.com/', category: 'Coding Practice', description: 'Coding challenges and skill assessment', isBookmarked: false },
    { id: 'res-code-2', title: 'CodeSignal', url: 'https://codesignal.com/', category: 'Coding Practice', description: 'Technical interview practice', isBookmarked: false },
    { id: 'res-code-3', title: 'AlgoExpert', url: 'https://www.algoexpert.io/', category: 'Coding Practice', description: 'Curated algorithm questions', isBookmarked: false }
  );

  // Add job board resources
  resources.push(
    { id: 'res-job-1', title: 'Simplify', url: 'https://simplify.jobs/', category: 'Job Boards', description: 'AI-powered job search for students', isBookmarked: true },
    { id: 'res-job-2', title: 'AngelList', url: 'https://angel.co/', category: 'Job Boards', description: 'Startup jobs and internships', isBookmarked: false },
    { id: 'res-job-3', title: 'Glassdoor', url: 'https://www.glassdoor.com/', category: 'Job Boards', description: 'Company reviews and salary information', isBookmarked: false }
  );

  // Generate personalized badges based on user profile
  const badges: Badge[] = [
    { id: 'badge-1', title: 'Profile Complete', description: 'Completed GitHub and LinkedIn profiles', icon: 'User', earned: false, points: 50 },
    { id: 'badge-2', title: 'First Project', description: 'Built and deployed your first project', icon: 'Rocket', earned: false, points: 100 },
    { id: 'badge-3', title: 'Resume Ready', description: 'Created professional resume', icon: 'FileText', earned: false, points: 75 },
  ];

  // Add skill-specific badges
  if (userData.targetRole.includes('Frontend') || userData.targetRole.includes('Full Stack')) {
    badges.push(
      { id: 'badge-4', title: 'React Developer', description: 'Built a React application', icon: 'Code', earned: false, points: 150 },
      { id: 'badge-5', title: 'Web Master', description: 'Created responsive web designs', icon: 'Monitor', earned: false, points: 125 }
    );
  }

  if (userData.targetRole.includes('Backend') || userData.targetRole.includes('Full Stack')) {
    badges.push(
      { id: 'badge-6', title: 'API Builder', description: 'Created REST APIs', icon: 'Server', earned: false, points: 150 },
      { id: 'badge-7', title: 'Database Expert', description: 'Worked with databases', icon: 'Database', earned: false, points: 125 }
    );
  }

  if (userData.targetRole.includes('Data Science') || userData.targetRole.includes('Machine Learning')) {
    badges.push(
      { id: 'badge-8', title: 'Data Scientist', description: 'Completed data analysis project', icon: 'BarChart', earned: false, points: 175 },
      { id: 'badge-9', title: 'ML Engineer', description: 'Built machine learning model', icon: 'Brain', earned: false, points: 200 }
    );
  }

  if (userData.targetRole.includes('Mobile')) {
    badges.push(
      { id: 'badge-10', title: 'Mobile Developer', description: 'Published mobile application', icon: 'Smartphone', earned: false, points: 175 }
    );
  }

  // Add coding practice badges
  badges.push(
    { id: 'badge-11', title: 'Code Warrior', description: 'Solved 25 coding problems', icon: 'Code', earned: false, points: 100 },
    { id: 'badge-12', title: 'Algorithm Master', description: 'Solved 100 coding problems', icon: 'Zap', earned: false, points: 200 },
    { id: 'badge-13', title: 'Git Expert', description: 'Made 100 commits in a month', icon: 'GitBranch', earned: false, points: 75 }
  );

  // Add networking badges
  badges.push(
    { id: 'badge-14', title: 'Network Builder', description: 'Connected with 50 professionals', icon: 'Users', earned: false, points: 100 },
    { id: 'badge-15', title: 'Community Member', description: 'Joined 3 tech communities', icon: 'Users', earned: false, points: 75 }
  );

  // Add goal-specific badges
  if (userData.goals.includes('Attend hackathons')) {
    badges.push(
      { id: 'badge-16', title: 'Hackathon Hero', description: 'Participated in your first hackathon', icon: 'Zap', earned: false, points: 150 },
      { id: 'badge-17', title: 'Hackathon Winner', description: 'Won or placed in a hackathon', icon: 'Trophy', earned: false, points: 300 }
    );
  }

  if (userData.goals.includes('Contribute to open source')) {
    badges.push(
      { id: 'badge-18', title: 'Open Source Contributor', description: 'Made first open source contribution', icon: 'GitBranch', earned: false, points: 125 },
      { id: 'badge-19', title: 'OSS Maintainer', description: 'Maintained an open source project', icon: 'Star', earned: false, points: 250 }
    );
  }

  // Add application badges
  badges.push(
    { id: 'badge-20', title: 'Application Sent', description: 'Applied to your first internship', icon: 'Send', earned: false, points: 100 },
    { id: 'badge-21', title: 'Interview Ready', description: 'Completed 5 mock interviews', icon: 'MessageCircle', earned: false, points: 150 },
    { id: 'badge-22', title: 'Offer Received', description: 'Received your first internship offer', icon: 'Award', earned: false, points: 500 }
  );

  // Add company-specific badges
  if (userData.preferredCompanies.includes('Google')) {
    badges.push({ id: 'badge-23', title: 'Google Applicant', description: 'Applied to Google STEP program', icon: 'Building', earned: false, points: 200 });
  }

  if (userData.preferredCompanies.includes('Microsoft')) {
    badges.push({ id: 'badge-24', title: 'Microsoft Explorer', description: 'Applied to Microsoft Explore program', icon: 'Building', earned: false, points: 200 });
  }

  return { phases, resources, badges };
};