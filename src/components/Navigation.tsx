import React, { useState } from 'react';
import { 
  Map, 
  BarChart3, 
  FileText, 
  BookOpen, 
  Bot, 
  Award,
  User,
  Home,
  Briefcase,
  LogOut,
  Menu,
  X,
  Code
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAuthClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, onAuthClick }) => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'reconfigure', label: 'Reconfigure', icon: Home },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Code className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TechInternPath
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  } px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 border border-transparent hover:border-gray-200`}
                >
                  <Icon size={16} />
                  <span className="hidden xl:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{user.displayName || 'User'}</div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Sign out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Sign In
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {user && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    } w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-3 border border-transparent`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">{user.displayName || 'User'}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAuthClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;