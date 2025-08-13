import React, { useState } from 'react';
import { 
  ArrowRight, 
  Bot, 
  GraduationCap, 
  Target, 
  Calendar, 
  Code, 
  Briefcase,
  Star,
  CheckCircle,
  User,
  Mail,
  School,
  Clock,
  Zap,
  BookOpen,
  Trophy,
  Building,
  MapPin,
  TrendingUp,
  Users,
  Rocket,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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
  startDate: string;
  internshipStartDate: string;
  technicalLevel: string;
  knownLanguages: string[];
  specificRole: string;
  targetCompanies: string[];
  weeklyHours: string;
  examPeriods: string;
  hasResumeLinkedIn: string;
  hasPortfolioGitHub: string;
}

interface LandingPageProps {
  onComplete: (userData: UserData) => Promise<void>;
  onSignInClick: () => void;
  showOnboarding?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onComplete, onSignInClick, showOnboarding = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    educationLevel: '',
    major: '',
    currentSkills: [],
    targetRole: '',
    timeCommitment: '',
    preferredCompanies: [],
    experience: '',
    goals: [],
    // New detailed fields
    startDate: '',
    internshipStartDate: '',
    technicalLevel: '',
    knownLanguages: [],
    specificRole: '',
    targetCompanies: [],
    weeklyHours: '',
    examPeriods: '',
    hasResumeLinkedIn: '',
    hasPortfolioGitHub: '',
  });

  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      text: "Hi there! 👋 I'm your personal SWE internship assistant. I'll ask you 10 specific questions to create the perfect roadmap for your internship journey. Let's start!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);

  const steps = [
    {
      id: 'start-date',
      title: 'Preparation Start Date',
      question: 'What date will you start preparing? (DD/MM/YYYY)',
      component: StartDateStep,
    },
    {
      id: 'internship-date',
      title: 'Target Internship Date',
      question: 'When do you want to start your internship? (Month and year)',
      component: InternshipDateStep,
    },
    {
      id: 'technical-level',
      title: 'Technical Skill Level',
      question: 'What is your current technical skill level? (Beginner, Intermediate, Advanced)',
      component: TechnicalLevelStep,
    },
    {
      id: 'known-languages',
      title: 'Programming Languages & Tools',
      question: 'Which programming languages or tools do you already know?',
      component: KnownLanguagesStep,
    },
    {
      id: 'target-role',
      title: 'Target Role',
      question: 'Which role are you aiming for? (e.g., Software Engineer, Data Analyst, UX Designer)',
      component: TargetRoleStep,
    },
    {
      id: 'target-companies',
      title: 'Target Companies',
      question: 'Do you have specific companies or industries in mind?',
      component: TargetCompaniesStep,
    },
    {
      id: 'weekly-hours',
      title: 'Time Commitment',
      question: 'How many hours per week can you dedicate to preparation?',
      component: WeeklyHoursStep,
    },
    {
      id: 'exam-periods',
      title: 'Academic Schedule',
      question: 'Do you have any exam periods or breaks we should work around?',
      component: ExamPeriodsStep,
    },
    {
      id: 'resume-linkedin',
      title: 'Resume & LinkedIn',
      question: 'Do you already have a résumé and LinkedIn profile? (Yes/No)',
      component: ResumeLinkedInStep,
    },
    {
      id: 'portfolio-github',
      title: 'Portfolio & GitHub',
      question: 'Do you have any portfolio projects or a GitHub profile? (Yes/No)',
      component: PortfolioGitHubStep,
    },
    {
      id: 'generating',
      title: 'Generating Your Roadmap',
      question: '',
      component: GeneratingStep,
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStep + 1 < steps.length - 1) {
        addAIMessage(steps[currentStep + 1].question);
      } else {
        addAIMessage("Perfect! I now have all the information I need. Let me create your personalized month-by-month roadmap...");
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addAIMessage = (message: string) => {
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: message,
        isUser: false,
        timestamp: new Date(),
      }]);
    }, 500);
  };

  // Show main landing page if not in onboarding mode
  if (!showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="text-white" size={20} />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TechInternPath
                </h1>
              </div>
              <button
                onClick={onSignInClick}
                className="btn btn-primary"
              >
                Sign In
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Rocket className="text-blue-600" size={48} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Path to a 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Dream Internship
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get a personalized, month-by-month roadmap to land software engineering internships at top companies like Google, Microsoft, Meta, and more by Summer 2026.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '#onboarding'}
                className="btn btn-primary btn-lg"
              >
                <span>Get Started Free</span>
                <ArrowRight size={20} />
              </button>
              
              <button
                onClick={onSignInClick}
                className="btn btn-secondary btn-lg"
              >
                Sign In
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A comprehensive platform designed specifically for students pursuing software engineering internships
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg card-hover">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Target className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Roadmap</h3>
                <p className="text-gray-700 leading-relaxed">
                  Get a custom month-by-month timeline tailored to your skills, goals, and target companies. No generic advice - just what you need.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg card-hover">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Briefcase className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Live Internship Board</h3>
                <p className="text-gray-700 leading-relaxed">
                  Access real-time internship opportunities from top companies, updated daily from trusted sources.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg card-hover">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Bot className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Assistant</h3>
                <p className="text-gray-700 leading-relaxed">
                  Get instant answers to your questions about internship prep, coding practice, and career guidance.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg card-hover">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
                <p className="text-gray-700 leading-relaxed">
                  Monitor your journey with detailed metrics on projects, coding practice, and application progress.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl shadow-lg card-hover">
                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <BookOpen className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Curated Resources</h3>
                <p className="text-gray-700 leading-relaxed">
                  Access handpicked learning materials, coding platforms, and career resources for your specific goals.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-lg card-hover">
                <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Award className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Achievement System</h3>
                <p className="text-gray-700 leading-relaxed">
                  Stay motivated with badges and points as you complete milestones on your internship journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Join Thousands of Students
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 text-lg">Live Internship Opportunities</div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <div className="text-5xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-600 text-lg">Top Companies</div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <div className="text-5xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600 text-lg">AI Assistant Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Get started in just 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Answer 10 Questions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tell our AI about your timeline, skills, goals, and constraints through a detailed questionnaire.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Get Month-by-Month Plan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive a personalized timeline with specific tasks, deadlines, and milestones from start to internship.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Track & Succeed</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your progress, discover opportunities, and manage applications all in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="onboarding" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of students who are already on their path to landing dream internships
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <OnboardingButton onComplete={onComplete} />
              
              <button
                onClick={onSignInClick}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-200 font-semibold border-2 border-white/30 text-lg"
              >
                Sign In to Continue
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Code className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl font-bold">TechInternPath</h3>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Empowering students to land their dream software engineering internships through personalized guidance and real-time opportunities.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-lg">Features</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Personalized Roadmaps</li>
                  <li>Live Internship Board</li>
                  <li>AI Assistant</li>
                  <li>Progress Tracking</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-lg">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Interview Prep</li>
                  <li>Coding Practice</li>
                  <li>Resume Building</li>
                  <li>Career Guidance</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2025 TechInternPath. Built for students, by students.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Show onboarding flow
  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Code className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechInternPath
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 font-medium">
                Question {currentStep + 1} of {steps.length - 1}
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out progress-bar"
                  style={{ width: `${((currentStep + 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Chat Interface */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">AI Internship Planner</h2>
                  <p className="text-blue-100">Creating your personalized roadmap</p>
                </div>
              </div>
            </div>
            
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-sm px-4 py-3 rounded-2xl shadow-md ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot size={16} className="text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600">AI Planner</span>
                      </div>
                    )}
                    <div className="text-sm leading-relaxed">{message.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Interface */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {steps[currentStep].title}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>

              <CurrentStepComponent 
                userData={userData}
                setUserData={setUserData}
                onNext={nextStep}
                onPrev={prevStep}
                onComplete={onComplete}
                currentStep={currentStep}
                totalSteps={steps.length - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Onboarding Button Component
const OnboardingButton: React.FC<{ onComplete: (userData: UserData) => void }> = ({ onComplete }) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showOnboarding) {
    return (
      <LandingPage 
        onComplete={onComplete} 
        onSignInClick={() => {}} 
        showOnboarding={true} 
      />
    );
  }

  return (
    <button
      onClick={() => setShowOnboarding(true)}
      className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 text-lg font-semibold shadow-lg"
    >
      Start Your Roadmap
    </button>
  );
};

// Step 1: Start Date
const StartDateStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
}> = ({ userData, setUserData, onNext, currentStep }) => {
  const handleNext = () => {
    if (userData.startDate) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          What date will you start preparing?
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Preparation Start Date
        </label>
        <input
          type="date"
          value={userData.startDate}
          onChange={(e) => setUserData({ ...userData, startDate: e.target.value })}
          className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-blue-500 text-lg"
          min={new Date().toISOString().split('T')[0]}
        />
        <p className="text-sm text-gray-500 mt-2">
          Choose when you want to begin your internship preparation journey
        </p>
      </div>

      <button
        onClick={handleNext}
        disabled={!userData.startDate}
        className="btn btn-primary w-full btn-lg"
      >
        <span>Continue</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

// Step 2: Internship Start Date
const InternshipDateStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ userData, setUserData, onNext, onPrev }) => {
  const internshipOptions = [
    'Summer 2025 (May - August 2025)',
    'Fall 2025 (September - December 2025)',
    'Winter 2026 (January - April 2026)',
    'Summer 2026 (May - August 2026)',
    'Fall 2026 (September - December 2026)',
    'Other (specify below)'
  ];

  const [customDate, setCustomDate] = useState('');

  const handleNext = () => {
    if (userData.internshipStartDate) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Briefcase className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          When do you want to start your internship?
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Target Internship Period
        </label>
        <div className="space-y-3">
          {internshipOptions.map(option => (
            <button
              key={option}
              onClick={() => setUserData({ ...userData, internshipStartDate: option })}
              className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ${
                userData.internshipStartDate === option
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{option}</div>
            </button>
          ))}
        </div>

        {userData.internshipStartDate === 'Other (specify below)' && (
          <div className="mt-4">
            <input
              type="text"
              value={customDate}
              onChange={(e) => {
                setCustomDate(e.target.value);
                setUserData({ ...userData, internshipStartDate: e.target.value });
              }}
              placeholder="e.g., Spring 2027 (March - June 2027)"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500"
            />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="btn btn-secondary flex-1"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          disabled={!userData.internshipStartDate}
          className="btn btn-primary flex-1"
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Step 3: Technical Level
const TechnicalLevelStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ userData, setUserData, onNext, onPrev }) => {
  const levels = [
    {
      id: 'Beginner',
      title: 'Beginner',
      description: 'New to programming, just starting my coding journey',
      icon: '🌱',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'Intermediate',
      title: 'Intermediate',
      description: 'Comfortable with programming, built some projects',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'Advanced',
      title: 'Advanced',
      description: 'Strong programming skills, multiple projects completed',
      icon: '⭐',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleNext = () => {
    if (userData.technicalLevel) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Code className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          What is your current technical skill level?
        </p>
      </div>

      <div className="space-y-4">
        {levels.map(level => (
          <button
            key={level.id}
            onClick={() => setUserData({ ...userData, technicalLevel: level.id })}
            className={`w-full p-6 text-left border-2 rounded-xl transition-all duration-200 ${
              userData.technicalLevel === level.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${level.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                {level.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{level.title}</h4>
                <p className="text-gray-600">{level.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="btn btn-secondary flex-1"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          disabled={!userData.technicalLevel}
          className="btn btn-primary flex-1"
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Step 4: Known Languages
const KnownLanguagesStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ userData, setUserData, onNext, onPrev }) => {
  const languages = [
    'Python', 'JavaScript', 'Java', 'C++', 'C#', 'TypeScript',
    'HTML/CSS', 'React', 'Node.js', 'SQL', 'Git', 'Linux',
    'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Flutter', 'Swift',
    'Kotlin', 'Go', 'Rust', 'PHP', 'Ruby', 'None yet'
  ];

  const toggleLanguage = (language: string) => {
    const current = userData.knownLanguages;
    if (current.includes(language)) {
      setUserData({
        ...userData,
        knownLanguages: current.filter(l => l !== language)
      });
    } else {
      setUserData({
        ...userData,
        knownLanguages: [...current, language]
      });
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Code className="w-16 h-16 text-orange-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          Which programming languages or tools do you already know?
        </p>
        <p className="text-sm text-gray-500 mt-2">Select all that apply</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-2">
        {languages.map(language => (
          <button
            key={language}
            onClick={() => toggleLanguage(language)}
            className={`px-4 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-200 ${
              userData.knownLanguages.includes(language)
                ? 'bg-orange-100 border-orange-500 text-orange-700'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
            }`}
          >
            {language}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="btn btn-secondary flex-1"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          className="btn btn-primary flex-1"
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Step 5: Target Role
const TargetRoleStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ userData, setUserData, onNext, onPrev }) => {
  const roles = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Data Analyst',
    'Machine Learning Engineer',
    'AI Research Intern',
    'Mobile Developer (iOS/Android)',
    'DevOps Engineer',
    'Product Manager',
    'UX Designer',
    'UI Designer',
    'Cybersecurity Analyst',
    'Other (specify below)'
  ];

  const [customRole, setCustomRole] = useState('');

  const handleNext = () => {
    if (userData.specificRole) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Target className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          Which role are you aiming for?
        </p>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => setUserData({ ...userData, specificRole: role })}
            className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ${
              userData.specificRole === role
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className="font-medium">{role}</div>
          </button>
        ))}
      </div>

      {userData.specificRole === 'Other (specify below)' && (
        <div>
          <input
            type="text"
            value={customRole}
            onChange={(e) => {
              setCustomRole(e.target.value);
              setUserData({ ...userData, specificRole: e.target.value });
            }}
            placeholder="e.g., Blockchain Developer, Game Developer"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-red-200 focus:border-red-500"
          />
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="btn btn-secondary flex-1"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          disabled={!userData.specificRole}
          className="btn btn-primary flex-1"
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Step 6: Target Companies
const TargetCompaniesStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ userData, setUserData, onNext, onPrev }) => {
  const companies = [
    'Google', 'Microsoft', 'Meta (Facebook)', 'Amazon', 'Apple', 'Netflix',
    'Tesla', 'Uber', 'Airbnb', 'Spotify', 'Adobe', 'Salesforce',
    'NVIDIA', 'Intel', 'IBM', 'Oracle', 'Shopify', 'Stripe',
    'Palantir', 'Databricks', 'OpenAI', 'Anthropic', 'Cohere',
    'RBC', 'TD Bank', 'Ubisoft', 'Startups', 'Any company'
  ];

  const [customCompany, setCustomCompany] = useState('');

  const toggleCompany = (company: string) => {
    const current = userData.targetCompanies;
    if (current.includes(company)) {
      setUserData({
        ...userData,
        targetCompanies: current.filter(c => c !== company)
      });
    } else {
      setUserData({
        ...userData,
        targetCompanies: [...current, company]
      });
    }
  };

  const addCustomCompany = () => {
    if (customCompany.trim() && !userData.targetCompanies.includes(customCompany.trim())) {
      setUserData({
        ...userData,
        targetCompanies: [...userData.targetCompanies, customCompany.trim()]
      });
      setCustomCompany('');
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Building className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          Do you have specific companies or industries in mind?
        </p>
        <p className="text-sm text-gray-500 mt-2">Select your target companies (optional)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-2">
        {companies.map(company => (
          <button
            key={company}
            onClick={() => toggleCompany(company)}
            className={`px-3 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-200 ${
              userData.targetCompanies.includes(company)
                ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
            }`}
          >
            {company}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={customCompany}
          onChange={(e) => setCustomCompany(e.target.value)}
          placeholder="Add custom company..."
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-indigo-200 focus:border-indigo-500"
          onKeyPress={(e) => e.key === 'Enter' && addCustomCompany()}
        />
        <button
          onClick={addCustomCompany}
          className="btn btn-secondary"
        >
          Add
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="btn btn-secondary flex-1"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          className="btn btn-primary flex-1"
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Step 7: Weekly Hours
const WeeklyHoursStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ userData, setUserData, onNext, onPrev }) => {
  const timeOptions = [
    '5-10 hours per week',
    '10-15 hours per week',
    '15-20 hours per week',
    '20-25 hours per week',
    '25+ hours per week'
  ];

  const handleNext = () => {
    if (userData.weeklyHours) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Clock className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          How many hours per week can you dedicate to preparation?
        </p>
      </div>

      <div className="space-y-3">
        {timeOptions.map(option => (
          <button
            key={option}
            onClick={() => setUserData({ ...userData, weeklyHours: option })}
            className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ${
              userData.weeklyHours === option
                ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className="font-medium">{option}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="btn btn-secondary flex-1"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          disabled={!userData.weeklyHours}
          className="btn btn-primary flex-1"
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Step 8: Exam Periods
const ExamPeriodsStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ userData, setUserData, onNext, onPrev }) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <GraduationCap className="w-16 h-16 text-teal-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          Do you have any exam periods or breaks we should work around?
        </p>
        <p className="text-sm text-gray-500 mt-2">This helps us plan your roadmap around your academic schedule</p>
      </div>

      <div>
        <textarea
          value={userData.examPeriods}
          onChange={(e) => setUserData({ ...userData, examPeriods: e.target.value })}
          placeholder="e.g., Final exams in December 2025, Spring break in March 2026, Summer break June-August 2026"
          rows={4}
          className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-teal-200 focus:border-teal-500 text-base"
        />
        <p className="text-sm text-gray-500 mt-2">
          Include exam periods, breaks, or any times when you'll be less available
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="btn btn-secondary flex-1"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          className="btn btn-primary flex-1"
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Step 9: Resume & LinkedIn
const ResumeLinkedInStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ userData, setUserData, onNext, onPrev }) => {
  const options = [
    {
      id: 'Yes',
      title: 'Yes, I have both',
      description: 'I have a resume and LinkedIn profile ready',
      icon: '✅'
    },
    {
      id: 'Partial',
      title: 'I have one but not the other',
      description: 'I have either a resume or LinkedIn, but not both',
      icon: '📝'
    },
    {
      id: 'No',
      title: 'No, I need to create them',
      description: 'I need help creating both from scratch',
      icon: '🆕'
    }
  ];

  const handleNext = () => {
    if (userData.hasResumeLinkedIn) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <User className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          Do you already have a résumé and LinkedIn profile?
        </p>
      </div>

      <div className="space-y-4">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => setUserData({ ...userData, hasResumeLinkedIn: option.id })}
            className={`w-full p-5 text-left border-2 rounded-xl transition-all duration-200 ${
              userData.hasResumeLinkedIn === option.id
                ? 'border-cyan-500 bg-cyan-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{option.icon}</div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{option.title}</h4>
                <p className="text-gray-600">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="btn btn-secondary flex-1"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          disabled={!userData.hasResumeLinkedIn}
          className="btn btn-primary flex-1"
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Step 10: Portfolio & GitHub
const PortfolioGitHubStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ userData, setUserData, onNext, onPrev }) => {
  const options = [
    {
      id: 'Yes',
      title: 'Yes, I have both',
      description: 'I have portfolio projects and an active GitHub profile',
      icon: '🚀'
    },
    {
      id: 'Partial',
      title: 'I have some projects',
      description: 'I have either a portfolio or GitHub, but need to improve',
      icon: '🔨'
    },
    {
      id: 'No',
      title: 'No, I need to build them',
      description: 'I need help creating projects and setting up GitHub',
      icon: '🌟'
    }
  ];

  const handleNext = () => {
    if (userData.hasPortfolioGitHub) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Code className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          Do you have any portfolio projects or a GitHub profile?
        </p>
      </div>

      <div className="space-y-4">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => setUserData({ ...userData, hasPortfolioGitHub: option.id })}
            className={`w-full p-5 text-left border-2 rounded-xl transition-all duration-200 ${
              userData.hasPortfolioGitHub === option.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{option.icon}</div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{option.title}</h4>
                <p className="text-gray-600">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="btn btn-secondary flex-1"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          disabled={!userData.hasPortfolioGitHub}
          className="btn btn-primary flex-1"
        >
          <span>Generate Roadmap</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Generating Step Component
const GeneratingStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: (userData: UserData) => Promise<void>;
}> = ({ userData, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Analyzing your responses...');

  const tasks = [
    'Analyzing your responses...',
    'Calculating timeline from start to internship date...',
    'Assessing your technical skill level...',
    'Matching roles to your target companies...',
    'Planning around your academic schedule...',
    'Creating month-by-month milestones...',
    'Selecting personalized resources...',
    'Generating achievement system...',
    'Finalizing your custom roadmap...'
  ];

  React.useEffect(() => {
    let taskIndex = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / tasks.length);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(async () => {
            console.log('Completing onboarding with detailed data:', userData);
            await onComplete(userData);
          }, 1000);
          return 100;
        }
        return newProgress;
      });

      if (taskIndex < tasks.length - 1) {
        taskIndex++;
        setCurrentTask(tasks[taskIndex]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userData, onComplete]);

  return (
    <div className="space-y-8 text-center">
      <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
        <Bot className="text-blue-600 animate-pulse" size={48} />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Creating Your Personalized Roadmap
        </h3>
        <p className="text-gray-600 text-lg">
          Based on your detailed responses, I'm crafting a month-by-month plan tailored specifically for you.
        </p>
      </div>

      <div className="space-y-4">
        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500 progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-base text-gray-700 font-medium">{currentTask}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <CheckCircle className="text-blue-600 mx-auto mb-3" size={24} />
          <p className="text-blue-900 font-medium">Timeline Analysis</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
          <Target className="text-green-600 mx-auto mb-3" size={24} />
          <p className="text-green-900 font-medium">Skill Assessment</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
          <Trophy className="text-purple-600 mx-auto mb-3" size={24} />
          <p className="text-purple-900 font-medium">Custom Milestones</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;