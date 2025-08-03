import React from 'react';
import { Trophy, Star, Award, CheckCircle, Clock, Gift } from 'lucide-react';
import { Badge, UserProfile } from '../types';

interface AchievementsProps {
  badges: Badge[];
  profile: UserProfile;
  updateBadges: (badges: Badge[]) => void;
  updateProfile: (profile: UserProfile) => void;
}

const Achievements: React.FC<AchievementsProps> = ({ badges, profile, updateBadges, updateProfile }) => {
  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      FileText: Award,
      Rocket: Trophy,
      Code: Star,
      GitBranch: CheckCircle,
      Users: Gift,
      Zap: Trophy,
      MessageCircle: Award,
      Send: Star,
    };
    return icons[iconName] || Award;
  };

  const calculateLevel = (points: number) => {
    return Math.floor(points / 100) + 1;
  };

  const getPointsToNextLevel = (points: number) => {
    const currentLevel = calculateLevel(points);
    const pointsForNextLevel = currentLevel * 100;
    return pointsForNextLevel - points;
  };

  const mockEarnBadge = (badgeId: string) => {
    const updatedBadges = badges.map(badge => 
      badge.id === badgeId 
        ? { ...badge, earned: true, earnedDate: new Date().toISOString() }
        : badge
    );
    
    const earnedBadge = badges.find(badge => badge.id === badgeId);
    if (earnedBadge) {
      const updatedProfile = {
        ...profile,
        totalPoints: profile.totalPoints + earnedBadge.points,
        level: calculateLevel(profile.totalPoints + earnedBadge.points),
      };
      updateProfile(updatedProfile);
    }
    
    updateBadges(updatedBadges);
  };

  const progressPercentage = (profile.totalPoints % 100);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h2>
        <p className="text-gray-600">Track your progress and earn badges</p>
      </div>

      {/* Profile Stats */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Level {profile.level}</h3>
              <p className="text-white/80">
                {profile.totalPoints} points • {earnedBadges.length} badges earned
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/80 mb-1">
              {getPointsToNextLevel(profile.totalPoints)} points to next level
            </div>
            <div className="w-32 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Trophy className="text-blue-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{profile.totalPoints}</div>
          <div className="text-sm text-gray-500">Total Points</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Award className="text-green-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{earnedBadges.length}</div>
          <div className="text-sm text-gray-500">Badges Earned</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Star className="text-purple-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{profile.level}</div>
          <div className="text-sm text-gray-500">Current Level</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Clock className="text-orange-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{availableBadges.length}</div>
          <div className="text-sm text-gray-500">Available</div>
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="mr-2" size={24} />
            Earned Badges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map(badge => {
              const Icon = getIconComponent(badge.icon);
              return (
                <div key={badge.id} className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-900">{badge.title}</h4>
                      <p className="text-sm text-green-700 mb-2">{badge.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600 font-medium">
                          +{badge.points} points
                        </span>
                        {badge.earnedDate && (
                          <span className="text-xs text-green-500">
                            {new Date(badge.earnedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Badges */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Clock className="mr-2" size={24} />
          Available Badges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableBadges.map(badge => {
            const Icon = getIconComponent(badge.icon);
            return (
              <div key={badge.id} className="border-2 border-gray-200 bg-gray-50 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="text-gray-400" size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{badge.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">
                        +{badge.points} points
                      </span>
                      <button
                        onClick={() => mockEarnBadge(badge.id)}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full hover:bg-blue-700 transition-colors"
                      >
                        Earn Badge
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Star className="mr-2" size={20} />
          Tips to Earn More Badges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Complete Your Profile:</h4>
            <p>Fill out your resume, LinkedIn, and GitHub profile to unlock "Profile Complete" badges.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Build Projects:</h4>
            <p>Deploy your first project to GitHub Pages or Vercel to earn development badges.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Practice Coding:</h4>
            <p>Solve problems on LeetCode, HackerRank, or Codeforces to earn programming badges.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Network & Apply:</h4>
            <p>Attend events, connect with professionals, and apply to internships for networking badges.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;