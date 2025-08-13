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
  Award
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
  });

  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      text: "Hi there! 👋 I'm your personal SWE internship assistant. I'm here to create a customized roadmap that will help you land your dream software engineering internship by Summer 2026. Let's get started by learning more about you!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);

  const steps = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      component: BasicInfoStep,
    },
    {
      id: 'education',
      title: 'Education & Skills',
      component: EducationStep,
    },
    {
      id: 'goals',
      title: 'Goals & Preferences',
      component: GoalsStep,
    },
    {
      id: 'experience',
      title: 'Experience Level',
      component: ExperienceStep,
    },
    {
      id: 'generating',
      title: 'Generating Your Roadmap',
      component: GeneratingStep,
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      addAIMessage(getStepMessage(currentStep + 1));
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

  const getStepMessage = (step: number): string => {
    const messages = [
      "Perfect! Now tell me about your educational background and current skills.",
      "Excellent! Let's talk about your goals and what kind of companies interest you.",
      "Almost there! Help me understand your current experience level.",
      "Fantastic! I'm now generating a personalized roadmap just for you. This will take just a moment...",
    ];
    return messages[step - 1] || "";
  };

  // Show main landing page if not in onboarding mode
  if (!showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="text-white" size={20} />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TechInternPath
                </h1>
              </div>
              <button
                onClick={onSignInClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="text-blue-600" size={40} />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Path to a 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Dream Internship
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Get a personalized roadmap to land software engineering internships at top companies like Google, Microsoft, Meta, and more by Summer 2026.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.href = '#onboarding'}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
              >
                <span>Get Started Free</span>
                <ArrowRight size={20} />
              </button>
              
              <button
                onClick={onSignInClick}
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Everything You Need to Succeed
              </h2>
              <p className="text-gray-600">
                A comprehensive platform designed specifically for students pursuing software engineering internships
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Target className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Roadmap</h3>
                <p className="text-gray-600">
                  Get a custom timeline tailored to your skills, goals, and target companies. No generic advice - just what you need.
                </p>
              </div>

              <div className="p-5 bg-green-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Briefcase className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Internship Board</h3>
                <p className="text-gray-600">
                  Access real-time internship opportunities from top companies, updated daily from trusted sources.
                </p>
              </div>

              <div className="p-5 bg-purple-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Bot className="text-purple-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h3>
                <p className="text-gray-600">
                  Get instant answers to your questions about internship prep, coding practice, and career guidance.
                </p>
              </div>

              <div className="p-5 bg-orange-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="text-orange-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor your journey with detailed metrics on projects, coding practice, and application progress.
                </p>
              </div>

              <div className="p-5 bg-cyan-50 rounded-xl">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="text-cyan-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Curated Resources</h3>
                <p className="text-gray-600">
                  Access handpicked learning materials, coding platforms, and career resources for your specific goals.
                </p>
              </div>

              <div className="p-5 bg-pink-50 rounded-xl">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <Award className="text-pink-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Achievement System</h3>
                <p className="text-gray-600">
                  Stay motivated with badges and points as you complete milestones on your internship journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Join Thousands of Students
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Live Internship Opportunities</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-600">Top Companies</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">AI Assistant Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                How It Works
              </h2>
              <p className="text-gray-600">
                Get started in just 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Answer Questions</h3>
                <p className="text-gray-600">
                  Tell our AI about your background, skills, and goals through a quick interactive questionnaire.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Your Roadmap</h3>
                <p className="text-gray-600">
                  Receive a personalized timeline with specific tasks, deadlines, and resources tailored to you.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Track & Apply</h3>
                <p className="text-gray-600">
                  Monitor your progress, discover new opportunities, and manage your applications all in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="onboarding" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-blue-100 mb-6">
              Join thousands of students who are already on their path to landing dream internships
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <OnboardingButton onComplete={onComplete} />
              
              <button
                onClick={onSignInClick}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-200 font-medium border border-white/30"
              >
                Sign In to Continue
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Code className="text-white" size={16} />
                  </div>
                  <h3 className="text-xl font-bold">TechInternPath</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Empowering students to land their dream software engineering internships through personalized guidance and real-time opportunities.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Features</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Personalized Roadmaps</li>
                  <li>Live Internship Board</li>
                  <li>AI Assistant</li>
                  <li>Progress Tracking</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Interview Prep</li>
                  <li>Coding Practice</li>
                  <li>Resume Building</li>
                  <li>Career Guidance</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
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
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechInternPath
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Chat Interface */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">AI Assistant</h2>
                  <p className="text-blue-100">Your personal internship guide</p>
                </div>
              </div>
            </div>
            
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot size={16} className="text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">AI Assistant</span>
                      </div>
                    )}
                    <div className="text-sm leading-relaxed">{message.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Interface */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <CurrentStepComponent 
              userData={userData}
              setUserData={setUserData}
              onNext={nextStep}
              onComplete={onComplete}
            />
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
      className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
    >
      Start Your Roadmap
    </button>
  );
};

// Basic Info Step Component
const BasicInfoStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
}> = ({ userData, setUserData, onNext }) => {
  const handleNext = () => {
    if (userData.name && userData.email) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline mr-2" size={16} />
            What's your name?
          </label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="inline mr-2" size={16} />
            Email address
          </label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            placeholder="your.email@university.edu"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!userData.name || !userData.email}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Continue</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

// Education Step Component
const EducationStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
}> = ({ userData, setUserData, onNext }) => {
  const educationLevels = [
    'High School Senior',
    'First Year University',
    'Second Year University',
    'Third Year University',
    'Fourth Year University',
    'Graduate Student',
    'Other'
  ];

  const majors = [
    'Computer Science',
    'Software Engineering',
    'Computer Engineering',
    'Electrical Engineering',
    'Information Technology',
    'Data Science',
    'Mathematics',
    'Physics',
    'Other Engineering',
    'Other'
  ];

  const skills = [
    'Python', 'JavaScript', 'Java', 'C++', 'C#', 'HTML/CSS', 
    'React', 'Node.js', 'Git', 'SQL', 'Data Structures', 
    'Algorithms', 'Machine Learning', 'Web Development', 'Mobile Development'
  ];

  const toggleSkill = (skill: string) => {
    const currentSkills = userData.currentSkills;
    if (currentSkills.includes(skill)) {
      setUserData({
        ...userData,
        currentSkills: currentSkills.filter(s => s !== skill)
      });
    } else {
      setUserData({
        ...userData,
        currentSkills: [...currentSkills, skill]
      });
    }
  };

  const handleNext = () => {
    if (userData.educationLevel && userData.major) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <School className="inline mr-2" size={16} />
          Current Education Level
        </label>
        <select
          value={userData.educationLevel}
          onChange={(e) => setUserData({ ...userData, educationLevel: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select your education level</option>
          {educationLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <GraduationCap className="inline mr-2" size={16} />
          Major/Field of Study
        </label>
        <select
          value={userData.major}
          onChange={(e) => setUserData({ ...userData, major: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select your major</option>
          {majors.map(major => (
            <option key={major} value={major}>{major}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Code className="inline mr-2" size={16} />
          Current Skills (select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {skills.map(skill => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                userData.currentSkills.includes(skill)
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!userData.educationLevel || !userData.major}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Continue</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

// Goals Step Component
const GoalsStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
}> = ({ userData, setUserData, onNext }) => {
  const targetRoles = [
    'Software Engineer Intern',
    'Frontend Developer Intern',
    'Backend Developer Intern',
    'Full Stack Developer Intern',
    'Data Science Intern',
    'Machine Learning Intern',
    'Mobile Developer Intern',
    'DevOps Intern',
    'Product Manager Intern'
  ];

  const companies = [
    'Google', 'Microsoft', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Tesla',
    'Uber', 'Airbnb', 'Spotify', 'Adobe', 'Salesforce', 'NVIDIA', 'Intel',
    'RBC', 'TD Bank', 'Shopify', 'Ubisoft', 'Startups', 'Any company'
  ];

  const timeCommitments = [
    '5-10 hours per week',
    '10-15 hours per week',
    '15-20 hours per week',
    '20+ hours per week'
  ];

  const goals = [
    'Build a strong portfolio',
    'Improve coding skills',
    'Network with professionals',
    'Gain interview experience',
    'Learn new technologies',
    'Contribute to open source',
    'Attend hackathons',
    'Get mentorship'
  ];

  const toggleCompany = (company: string) => {
    const current = userData.preferredCompanies;
    if (current.includes(company)) {
      setUserData({
        ...userData,
        preferredCompanies: current.filter(c => c !== company)
      });
    } else {
      setUserData({
        ...userData,
        preferredCompanies: [...current, company]
      });
    }
  };

  const toggleGoal = (goal: string) => {
    const current = userData.goals;
    if (current.includes(goal)) {
      setUserData({
        ...userData,
        goals: current.filter(g => g !== goal)
      });
    } else {
      setUserData({
        ...userData,
        goals: [...current, goal]
      });
    }
  };

  const handleNext = () => {
    if (userData.targetRole && userData.timeCommitment) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Briefcase className="inline mr-2" size={16} />
          Target Role
        </label>
        <select
          value={userData.targetRole}
          onChange={(e) => setUserData({ ...userData, targetRole: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select your target role</option>
          {targetRoles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Clock className="inline mr-2" size={16} />
          Time Commitment
        </label>
        <select
          value={userData.timeCommitment}
          onChange={(e) => setUserData({ ...userData, timeCommitment: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">How much time can you dedicate weekly?</option>
          {timeCommitments.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Briefcase className="inline mr-2" size={16} />
          Preferred Companies (select up to 5)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
          {companies.map(company => (
            <button
              key={company}
              onClick={() => toggleCompany(company)}
              disabled={userData.preferredCompanies.length >= 5 && !userData.preferredCompanies.includes(company)}
              className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                userData.preferredCompanies.includes(company)
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50'
              }`}
            >
              {company}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Target className="inline mr-2" size={16} />
          Goals (select all that apply)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {goals.map(goal => (
            <button
              key={goal}
              onClick={() => toggleGoal(goal)}
              className={`px-3 py-2 text-sm rounded-lg border transition-all text-left ${
                userData.goals.includes(goal)
                  ? 'bg-green-100 border-green-300 text-green-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!userData.targetRole || !userData.timeCommitment}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Continue</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

// Experience Step Component
const ExperienceStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
}> = ({ userData, setUserData, onNext }) => {
  const experienceLevels = [
    {
      id: 'complete-beginner',
      title: 'Complete Beginner',
      description: 'New to programming, just starting my coding journey',
      icon: '🌱'
    },
    {
      id: 'some-basics',
      title: 'Know Some Basics',
      description: 'Familiar with one programming language, basic concepts',
      icon: '📚'
    },
    {
      id: 'coursework-projects',
      title: 'Coursework & Small Projects',
      description: 'Completed programming courses, built simple projects',
      icon: '🔨'
    },
    {
      id: 'personal-projects',
      title: 'Personal Projects',
      description: 'Built several projects, comfortable with development',
      icon: '🚀'
    },
    {
      id: 'work-experience',
      title: 'Some Work Experience',
      description: 'Previous internships, part-time development work',
      icon: '💼'
    }
  ];

  const handleNext = () => {
    if (userData.experience) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          <Star className="inline mr-2" size={16} />
          What best describes your current experience level?
        </label>
        <div className="space-y-3">
          {experienceLevels.map(level => (
            <button
              key={level.id}
              onClick={() => setUserData({ ...userData, experience: level.id })}
              className={`w-full p-4 text-left border rounded-lg transition-all ${
                userData.experience === level.id
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{level.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{level.title}</h4>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!userData.experience}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Generate My Roadmap</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

// Generating Step Component
const GeneratingStep: React.FC<{
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onComplete: (userData: UserData) => Promise<void>;
}> = ({ userData, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Connecting to AI...');

  const tasks = [
    'Connecting to AI...',
    'Analyzing your profile...',
    'Identifying skill gaps...',
    'Researching target companies...',
    'Creating personalized timeline...',
    'Selecting curated resources...',
    'Generating achievement system...',
    'Finalizing your roadmap...'
  ];

  React.useEffect(() => {
    let taskIndex = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / tasks.length);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(async () => {
            console.log('Completing onboarding with data:', userData);
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
    }, 800);

    return () => clearInterval(interval);
  }, [userData, onComplete]);

  return (
    <div className="space-y-8 text-center">
      <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
        <Bot className="text-blue-600 animate-pulse" size={40} />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Creating Your Personalized Roadmap
        </h3>
        <p className="text-gray-600">
          Based on your responses, I'm crafting a roadmap tailored specifically for you.
        </p>
      </div>

      <div className="space-y-4">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">{currentTask}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-3 bg-blue-50 rounded-lg">
          <CheckCircle className="text-blue-600 mx-auto mb-2" size={20} />
          <p className="text-blue-900">Customized Timeline</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <Target className="text-green-600 mx-auto mb-2" size={20} />
          <p className="text-green-900">Targeted Resources</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <Trophy className="text-purple-600 mx-auto mb-2" size={20} />
          <p className="text-purple-900">Achievement System</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;