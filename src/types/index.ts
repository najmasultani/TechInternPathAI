export interface Task {
  id: string;
  text: string;
  completed: boolean;
  notes?: string;
  link?: string;
  isEditing?: boolean;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  period: string;
  tasks: Task[];
  isExpanded: boolean;
  color: string;
}

export interface ProgressMetrics {
  projectsCompleted: number;
  leetcodeProblems: number;
  resumeReadiness: number;
  internshipApplications: number;
  overallProgress: number;
}

export interface Application {
  id: string;
  company: string;
  position: string;
  appliedDate: string;
  status: 'Applied' | 'Interview' | 'Rejected' | 'Offer';
  notes: string;
  resumeLink?: string;
  githubRepo?: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  isBookmarked: boolean;
  isCustom?: boolean;
  isFeatured?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  points: number;
}

export interface UserProfile {
  name: string;
  email: string;
  totalPoints: number;
  level: number;
  badges: Badge[];
  joinDate: string;
  uid?: string;
}

export interface Internship {
  id: string;
  company: string;
  position: string;
  location: string;
  applicationUrl: string;
  datePosted: string;
  deadline?: string;
  requirements: string[];
  description: string;
  salary?: string;
  type: 'Software Engineering' | 'AI/ML' | 'Data Science' | 'Frontend' | 'Backend' | 'Full Stack' | 'Other';
  source: 'SimplifyJobs' | 'SpeedyApply' | 'Manual';
  isNew: boolean;
}