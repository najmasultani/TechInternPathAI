import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Edit3, 
  Check, 
  X, 
  ExternalLink,
  Trash2,
  StickyNote
} from 'lucide-react';
import { RoadmapPhase, Task } from '../types';

interface RoadmapSectionProps {
  phases: RoadmapPhase[];
  updatePhases: (phases: RoadmapPhase[]) => void;
}

const RoadmapSection: React.FC<RoadmapSectionProps> = ({ phases, updatePhases }) => {
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [showNotes, setShowNotes] = useState<string | null>(null);

  const togglePhase = (phaseId: string) => {
    const updatedPhases = phases.map(phase =>
      phase.id === phaseId ? { ...phase, isExpanded: !phase.isExpanded } : phase
    );
    updatePhases(updatedPhases);
  };

  const toggleTask = (phaseId: string, taskId: string) => {
    const updatedPhases = phases.map(phase =>
      phase.id === phaseId
        ? {
            ...phase,
            tasks: phase.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : phase
    );
    updatePhases(updatedPhases);
  };

  const updateTask = (phaseId: string, taskId: string, updates: Partial<Task>) => {
    const updatedPhases = phases.map(phase =>
      phase.id === phaseId
        ? {
            ...phase,
            tasks: phase.tasks.map(task =>
              task.id === taskId ? { ...task, ...updates } : task
            )
          }
        : phase
    );
    updatePhases(updatedPhases);
  };

  const addTask = (phaseId: string) => {
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      text: newTaskText,
      completed: false,
    };

    const updatedPhases = phases.map(phase =>
      phase.id === phaseId
        ? { ...phase, tasks: [...phase.tasks, newTask] }
        : phase
    );

    updatePhases(updatedPhases);
    setNewTaskText('');
  };

  const deleteTask = (phaseId: string, taskId: string) => {
    const updatedPhases = phases.map(phase =>
      phase.id === phaseId
        ? { ...phase, tasks: phase.tasks.filter(task => task.id !== taskId) }
        : phase
    );
    updatePhases(updatedPhases);
  };

  const getPhaseProgress = (phase: RoadmapPhase) => {
    const completed = phase.tasks.filter(task => task.completed).length;
    return phase.tasks.length > 0 ? (completed / phase.tasks.length) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Internship Roadmap</h2>
        <p className="text-gray-600">Track your progress through each phase of preparation</p>
      </div>

      {phases.map((phase) => {
        const progress = getPhaseProgress(phase);
        
        return (
          <div key={phase.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div 
              className={`bg-gradient-to-r ${phase.color} p-6 cursor-pointer`}
              onClick={() => togglePhase(phase.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-white">
                    {phase.isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                    <p className="text-white/80">{phase.period}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white/90 text-sm mb-1">
                    {phase.tasks.filter(t => t.completed).length} / {phase.tasks.length} completed
                  </div>
                  <div className="w-32 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {phase.isExpanded && (
              <div className="p-6">
                <div className="space-y-3">
                  {phase.tasks.map((task) => (
                    <div key={task.id} className="group">
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(phase.id, task.id)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        
                        {editingTask === task.id ? (
                          <div className="flex-1 flex items-center space-x-2">
                            <input
                              type="text"
                              value={task.text}
                              onChange={(e) => updateTask(phase.id, task.id, { text: e.target.value })}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              onKeyPress={(e) => e.key === 'Enter' && setEditingTask(null)}
                            />
                            <button
                              onClick={() => setEditingTask(null)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-between">
                            <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.text}
                            </span>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => setEditingTask(task.id)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => setShowNotes(showNotes === task.id ? null : task.id)}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                <StickyNote size={16} />
                              </button>
                              {task.link && (
                                <a
                                  href={task.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <ExternalLink size={16} />
                                </a>
                              )}
                              <button
                                onClick={() => deleteTask(phase.id, task.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {showNotes === task.id && (
                        <div className="ml-8 mt-2 p-3 bg-gray-50 rounded-lg">
                          <textarea
                            value={task.notes || ''}
                            onChange={(e) => updateTask(phase.id, task.id, { notes: e.target.value })}
                            placeholder="Add notes for this task..."
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={3}
                          />
                          <div className="mt-2">
                            <input
                              type="url"
                              value={task.link || ''}
                              onChange={(e) => updateTask(phase.id, task.id, { link: e.target.value })}
                              placeholder="Add a helpful link..."
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addTask(phase.id)}
                  />
                  <button
                    onClick={() => addTask(phase.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus size={16} />
                    <span>Add Task</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 mt-1">💡</div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Personalization Note</h3>
            <p className="text-blue-800 text-sm">
              This roadmap is a template. You can fully customize it by adding your own tools, deadlines, and learning preferences.
              Swap in your favorite courses, coding platforms, project ideas, or workflows. Make it yours — this is just an example to guide you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSection;