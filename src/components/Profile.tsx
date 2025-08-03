import React, { useState } from 'react';
import { User, Edit3, Save, X, Calendar, Award, TrendingUp, Target } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, updateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: profile.name,
    email: profile.email,
  });

  const handleSave = () => {
    updateProfile({
      ...profile,
      ...editData,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: profile.name,
      email: profile.email,
    });
    setIsEditing(false);
  };

  const getDaysActive = () => {
    const joinDate = new Date(profile.joinDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getNextLevelPoints = () => {
    return (profile.level * 100) - profile.totalPoints;
  };

  const getProgressPercentage = () => {
    return (profile.totalPoints % 100);
  };

  const stats = [
    {
      label: 'Total Points',
      value: profile.totalPoints,
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Current Level',
      value: profile.level,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Badges Earned',
      value: profile.badges.filter(b => b.earned).length,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Days Active',
      value: getDaysActive(),
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile</h2>
        <p className="text-gray-600">Manage your account and track your journey</p>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User size={40} className="text-white" />
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="text-2xl font-bold bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white placeholder-white/70"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="text-white/90 bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white placeholder-white/70"
                    placeholder="your.email@example.com"
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold">{profile.name || 'Your Name'}</h3>
                  <p className="text-white/80">{profile.email || 'your.email@example.com'}</p>
                  <p className="text-white/70 text-sm">
                    Member since {new Date(profile.joinDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                >
                  <Save size={20} />
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <Edit3 size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level {profile.level}</span>
            <span className="text-sm text-white/80">
              {getNextLevelPoints()} points to Level {profile.level + 1}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon className={stat.color} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Award className="mr-2" size={24} />
          Recent Achievements
        </h3>
        
        {profile.badges.filter(b => b.earned).length > 0 ? (
          <div className="space-y-3">
            {profile.badges
              .filter(b => b.earned)
              .sort((a, b) => new Date(b.earnedDate!).getTime() - new Date(a.earnedDate!).getTime())
              .slice(0, 5)
              .map(badge => (
                <div key={badge.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="text-green-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{badge.title}</h4>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">+{badge.points} pts</div>
                    <div className="text-xs text-gray-500">
                      {new Date(badge.earnedDate!).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="mx-auto mb-4 text-gray-400" size={48} />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No achievements yet</h4>
            <p className="text-gray-500">Complete tasks to earn your first badge!</p>
          </div>
        )}
      </div>

      {/* Goals Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Target className="mr-2" size={24} />
          Your Goals
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Short-term Goals</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Complete your first project</li>
              <li>• Solve 25 LeetCode problems</li>
              <li>• Build a professional portfolio</li>
              <li>• Connect with 20 professionals on LinkedIn</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Long-term Goals</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Secure a summer 2026 internship</li>
              <li>• Build 3+ substantial projects</li>
              <li>• Contribute to open source projects</li>
              <li>• Attend 5+ networking events</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive updates about your progress</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Weekly Progress Reports</h4>
              <p className="text-sm text-gray-600">Get weekly summaries of your achievements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Deadline Reminders</h4>
              <p className="text-sm text-gray-600">Get notified about application deadlines</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;