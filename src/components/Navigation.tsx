import React from 'react';
import { 
  Map, 
  BarChart3, 
  FileText, 
  BookOpen, 
  Bot, 
  Award,
  User,
  Home
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'landing', label: 'Reconfigure', icon: Home },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechInternPath
              </h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-blue-500'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    } px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 border-2 border-transparent`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;