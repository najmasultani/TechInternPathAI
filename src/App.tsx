import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './hooks/useAuth';
import { generatePersonalizedRoadmap } from './utils/roadmapGenerator';
import { RoadmapPhase, ProgressMetrics, Application, Resource, Badge, UserProfile } from './types';
import Navigation from './components/Navigation';
import RoadmapSection from './components/RoadmapSection';
import ProgressTracker from './components/ProgressTracker';
import ApplicationTracker from './components/ApplicationTracker';
import InternshipBoard from './components/InternshipBoard';
import ResourceHub from './components/ResourceHub';
import AIAssistant from './components/AIAssistant';
import Achievements from './components/Achievements';
import Profile from './components/Profile';
import AuthModal from './components/AuthModal';

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

function App() {
  const [showLanding, setShowLanding] = useLocalStorage<boolean>('showLanding', true);
  const [activeTab, setActiveTab] = useState('roadmap');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, loading } = useAuth();
  
  // Local storage for data persistence
  const [roadmapPhases, setRoadmapPhases] = useLocalStorage<RoadmapPhase[]>('roadmapPhases', []);
  const [progress, setProgress] = useLocalStorage<ProgressMetrics>('progress', {
    projectsCompleted: 0,
    leetcodeProblems: 0,
    resumeReadiness: 0,
    internshipApplications: 0,
    overallProgress: 0,
  });
  const [applications, setApplications] = useLocalStorage<Application[]>('applications', []);
  const [resources, setResources] = useLocalStorage<Resource[]>('resources', []);
  const [badges, setBadges] = useLocalStorage<Badge[]>('badges', []);
  const [profile, setProfile] = useLocalStorage<UserProfile>('profile', {
    name: '',
    email: '',
    totalPoints: 0,
    level: 1,
    badges: [],
    joinDate: new Date().toISOString(),
  });

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading TechInternPath...</p>
        </div>
      </div>
    );
  }
  const handleOnboardingComplete = (userData: UserData) => {
    console.log('Onboarding completed with userData:', userData);
    
    // Generate personalized roadmap based on user data
    const { phases, resources: generatedResources, badges: generatedBadges } = generatePersonalizedRoadmap(userData);
    
    console.log('Generated data:', {
      phasesCount: phases.length,
      resourcesCount: generatedResources.length,
      badgesCount: generatedBadges.length,
      firstPhase: phases[0]?.title,
      firstResource: generatedResources[0]?.title
    });
    
    // Update all the data
    setRoadmapPhases(phases);
    setResources(generatedResources);
    setBadges(generatedBadges);
    
    // Reset progress to start fresh
    setProgress({
      projectsCompleted: 0,
      leetcodeProblems: 0,
      resumeReadiness: 0,
      internshipApplications: 0,
      overallProgress: 0,
    });
    
    // Clear any existing applications
    setApplications([]);
    
    // Update profile with user data
    setProfile({
      name: userData.name,
      email: userData.email,
      uid: user?.uid,
      totalPoints: 0,
      level: 1,
      badges: [],
      joinDate: new Date().toISOString(),
    });
    
    // Hide landing page
    setShowLanding(false);
    
    // Switch to roadmap tab to show the generated content
    setActiveTab('roadmap');
  };

  // Show landing page if user hasn't completed onboarding
  if (showLanding) {
    return <LandingPage onComplete={handleOnboardingComplete} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage onComplete={handleOnboardingComplete} />;
      case 'roadmap':
        return <RoadmapSection phases={roadmapPhases} updatePhases={setRoadmapPhases} />;
      case 'progress':
        return <ProgressTracker progress={progress} updateProgress={setProgress} />;
      case 'applications':
        return <ApplicationTracker applications={applications} updateApplications={setApplications} />;
      case 'internships':
        return <InternshipBoard />;
      case 'resources':
        return <ResourceHub resources={resources} updateResources={setResources} />;
      case 'assistant':
        return <AIAssistant />;
      case 'achievements':
        return <Achievements badges={badges} profile={profile} updateBadges={setBadges} updateProfile={setProfile} />;
      case 'profile':
        return <Profile profile={profile} updateProfile={setProfile} />;
      default:
        return <RoadmapSection phases={roadmapPhases} updatePhases={setRoadmapPhases} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onAuthClick={() => setShowAuthModal(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          // Optionally sync user data with Firebase here
          console.log('User authenticated successfully');
        }}
      />
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              SWE Internship Roadmap
            </h3>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Your personalized guide to securing a software engineering internship by Summer 2026. 
              Track your progress, apply to opportunities, and build the skills that matter.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Built with React, TypeScript, and Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;