import React from 'react';
import { BarChart3, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { ProgressMetrics } from '../types';

interface ProgressTrackerProps {
  progress: ProgressMetrics;
  updateProgress: (progress: ProgressMetrics) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress, updateProgress }) => {
  const updateMetric = (key: keyof ProgressMetrics, value: number) => {
    const newProgress = { ...progress, [key]: value };
    
    // Calculate overall progress
    const metrics = [
      newProgress.projectsCompleted / 5, // Max 5 projects
      newProgress.leetcodeProblems / 100, // Max 100 problems
      newProgress.resumeReadiness / 100, // Percentage
      newProgress.internshipApplications / 20, // Max 20 applications
    ];
    
    newProgress.overallProgress = (metrics.reduce((sum, metric) => sum + Math.min(metric, 1), 0) / metrics.length) * 100;
    
    updateProgress(newProgress);
  };

  const ProgressBar = ({ 
    label, 
    value, 
    max, 
    color, 
    unit = '',
    onChange 
  }: { 
    label: string; 
    value: number; 
    max: number; 
    color: string; 
    unit?: string;
    onChange: (value: number) => void;
  }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{label}</h3>
        <span className="text-sm text-gray-500">{value}{unit} / {max}{unit}</span>
      </div>
      
      <div className="relative mb-4">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`${color} h-3 rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-3 flex items-center justify-center">
          <span className="text-xs font-medium text-white mix-blend-difference">
            {Math.round((value / max) * 100)}%
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min="0"
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="number"
          min="0"
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracker</h2>
        <p className="text-gray-600">Monitor your preparation journey</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <TrendingUp size={24} />
            <h3 className="text-xl font-bold">Overall Progress</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{Math.round(progress.overallProgress)}%</div>
            <div className="text-sm opacity-90">Complete</div>
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-4">
          <div 
            className="bg-white rounded-full h-4 transition-all duration-500 ease-out"
            style={{ width: `${progress.overallProgress}%` }}
          />
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold">{progress.projectsCompleted}</div>
            <div className="opacity-90">Projects</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{progress.leetcodeProblems}</div>
            <div className="opacity-90">LeetCode</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{progress.resumeReadiness}%</div>
            <div className="opacity-90">Resume</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{progress.internshipApplications}</div>
            <div className="opacity-90">Applications</div>
          </div>
        </div>
      </div>

      {/* Individual Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProgressBar
          label="Projects Completed"
          value={progress.projectsCompleted}
          max={5}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          onChange={(value) => updateMetric('projectsCompleted', value)}
        />
        
        <ProgressBar
          label="LeetCode Problems Solved"
          value={progress.leetcodeProblems}
          max={100}
          color="bg-gradient-to-r from-green-500 to-green-600"
          onChange={(value) => updateMetric('leetcodeProblems', value)}
        />
        
        <ProgressBar
          label="Resume Readiness"
          value={progress.resumeReadiness}
          max={100}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          unit="%"
          onChange={(value) => updateMetric('resumeReadiness', value)}
        />
        
        <ProgressBar
          label="Internship Applications"
          value={progress.internshipApplications}
          max={20}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          onChange={(value) => updateMetric('internshipApplications', value)}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="text-blue-600" size={24} />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Goals Set</h4>
          <p className="text-2xl font-bold text-blue-600">4</p>
          <p className="text-sm text-gray-500">Main focus areas</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Milestones</h4>
          <p className="text-2xl font-bold text-green-600">
            {Math.round(progress.overallProgress / 25)}
          </p>
          <p className="text-sm text-gray-500">Major achievements</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="text-purple-600" size={24} />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Efficiency</h4>
          <p className="text-2xl font-bold text-purple-600">
            {progress.overallProgress > 0 ? Math.round(progress.overallProgress / 10) : 0}
          </p>
          <p className="text-sm text-gray-500">Progress rate</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;