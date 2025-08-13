import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MapPin, 
  Edit3, 
  Trash2,
  CheckCircle,
  AlertCircle,
  Users,
  FileText,
  Briefcase
} from 'lucide-react';

interface Interview {
  id: string;
  company: string;
  position: string;
  date: string;
  time: string;
  type: 'Phone' | 'Video' | 'In-Person' | 'Technical' | 'Behavioral';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  interviewer: string;
  location: string;
  notes: string;
  preparationTasks: string[];
}

interface InterviewTrackerProps {
  interviews: Interview[];
  updateInterviews: (interviews: Interview[]) => void;
}

const InterviewTracker: React.FC<InterviewTrackerProps> = ({ interviews, updateInterviews }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    date: '',
    time: '',
    type: 'Video' as Interview['type'],
    status: 'Scheduled' as Interview['status'],
    interviewer: '',
    location: '',
    notes: '',
    preparationTasks: [''],
  });

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      date: '',
      time: '',
      type: 'Video',
      status: 'Scheduled',
      interviewer: '',
      location: '',
      notes: '',
      preparationTasks: [''],
    });
    setEditingInterview(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const interviewData = {
      ...formData,
      preparationTasks: formData.preparationTasks.filter(task => task.trim() !== ''),
    };

    if (editingInterview) {
      const updatedInterviews = interviews.map(interview =>
        interview.id === editingInterview.id ? { ...interview, ...interviewData } : interview
      );
      updateInterviews(updatedInterviews);
    } else {
      const newInterview: Interview = {
        id: `interview-${Date.now()}`,
        ...interviewData,
      };
      updateInterviews([...interviews, newInterview]);
    }
    
    resetForm();
  };

  const deleteInterview = (id: string) => {
    updateInterviews(interviews.filter(interview => interview.id !== id));
  };

  const editInterview = (interview: Interview) => {
    setFormData({
      company: interview.company,
      position: interview.position,
      date: interview.date,
      time: interview.time,
      type: interview.type,
      status: interview.status,
      interviewer: interview.interviewer,
      location: interview.location,
      notes: interview.notes,
      preparationTasks: interview.preparationTasks.length > 0 ? interview.preparationTasks : [''],
    });
    setEditingInterview(interview);
    setShowForm(true);
  };

  const addPreparationTask = () => {
    setFormData({
      ...formData,
      preparationTasks: [...formData.preparationTasks, '']
    });
  };

  const updatePreparationTask = (index: number, value: string) => {
    const updatedTasks = formData.preparationTasks.map((task, i) => 
      i === index ? value : task
    );
    setFormData({ ...formData, preparationTasks: updatedTasks });
  };

  const removePreparationTask = (index: number) => {
    setFormData({
      ...formData,
      preparationTasks: formData.preparationTasks.filter((_, i) => i !== index)
    });
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Interview['status']) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-success-100 text-success-800 border-success-200';
      case 'Cancelled':
        return 'bg-error-100 text-error-800 border-error-200';
      case 'Rescheduled':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const getTypeIcon = (type: Interview['type']) => {
    switch (type) {
      case 'Phone':
        return Phone;
      case 'Video':
        return Video;
      case 'In-Person':
        return MapPin;
      case 'Technical':
        return FileText;
      case 'Behavioral':
        return Users;
      default:
        return Briefcase;
    }
  };

  const upcomingInterviews = interviews.filter(interview => {
    const interviewDate = new Date(`${interview.date} ${interview.time}`);
    const now = new Date();
    return interviewDate > now && interview.status === 'Scheduled';
  }).sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime());

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-neutral-900 mb-3">Interview Tracker</h2>
        <p className="text-neutral-600 text-lg">Manage and prepare for your internship interviews</p>
      </div>

      {/* Upcoming Interviews Alert */}
      {upcomingInterviews.length > 0 && (
        <div className="bg-gradient-to-r from-warning-50 to-warning-100 border-2 border-warning-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="text-warning-600" size={24} />
            <h3 className="text-lg font-bold text-warning-800">Upcoming Interviews</h3>
          </div>
          <div className="space-y-3">
            {upcomingInterviews.slice(0, 3).map(interview => {
              const TypeIcon = getTypeIcon(interview.type);
              return (
                <div key={interview.id} className="bg-white p-4 rounded-xl border border-warning-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <TypeIcon className="text-warning-600" size={20} />
                      <div>
                        <h4 className="font-semibold text-neutral-900">{interview.company}</h4>
                        <p className="text-sm text-neutral-600">{interview.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-warning-800">{interview.date}</div>
                      <div className="text-sm text-warning-600">{interview.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-neutral-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search interviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500 touch-target"
                aria-label="Search interviews"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500 touch-target"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary btn-lg"
            aria-label="Add new interview"
          >
            <Plus size={20} />
            <span>Add Interview</span>
          </button>
        </div>
      </div>

      {/* Interview Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
            <h3 className="text-2xl font-bold mb-6 text-neutral-900">
              {editingInterview ? 'Edit Interview' : 'Add New Interview'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500"
                    aria-label="Company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Position</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500"
                    aria-label="Position title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500"
                    aria-label="Interview date"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500"
                    aria-label="Interview time"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Interview['type'] })}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500"
                    aria-label="Interview type"
                  >
                    <option value="Video">Video Call</option>
                    <option value="Phone">Phone Call</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Technical">Technical</option>
                    <option value="Behavioral">Behavioral</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Interview['status'] })}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500"
                    aria-label="Interview status"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Rescheduled">Rescheduled</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Interviewer</label>
                  <input
                    type="text"
                    value={formData.interviewer}
                    onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500"
                    aria-label="Interviewer name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Location/Link</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Meeting room, Zoom link, etc."
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500"
                    aria-label="Interview location or meeting link"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500"
                  aria-label="Interview notes"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Preparation Tasks</label>
                <div className="space-y-2">
                  {formData.preparationTasks.map((task, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => updatePreparationTask(index, e.target.value)}
                        placeholder="e.g., Review system design concepts"
                        className="flex-1 px-4 py-2 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-primary-200 focus:border-primary-500"
                        aria-label={`Preparation task ${index + 1}`}
                      />
                      {formData.preparationTasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePreparationTask(index)}
                          className="p-2 text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                          aria-label="Remove preparation task"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addPreparationTask}
                    className="btn btn-secondary btn-sm"
                    aria-label="Add preparation task"
                  >
                    <Plus size={16} />
                    <span>Add Task</span>
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary"
                  aria-label="Cancel interview form"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  aria-label={editingInterview ? 'Update interview' : 'Add interview'}
                >
                  {editingInterview ? 'Update' : 'Add'} Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interviews List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-200">
        {filteredInterviews.length === 0 ? (
          <div className="p-12 text-center">
            <Briefcase className="mx-auto mb-6 text-neutral-400" size={64} />
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">No interviews scheduled</h3>
            <p className="text-neutral-500 mb-6">Start tracking your interview process</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary btn-lg"
              aria-label="Add your first interview"
            >
              Schedule Your First Interview
            </button>
          </div>
        ) : (
          <div className="divide-y-2 divide-neutral-100">
            {filteredInterviews.map((interview) => {
              const TypeIcon = getTypeIcon(interview.type);
              const interviewDateTime = new Date(`${interview.date} ${interview.time}`);
              const isUpcoming = interviewDateTime > new Date() && interview.status === 'Scheduled';
              
              return (
                <div key={interview.id} className={`p-6 hover:bg-neutral-50 transition-colors ${isUpcoming ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-sm">
                        <TypeIcon className="text-blue-600" size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-neutral-900">{interview.company}</h3>
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(interview.status)}`}>
                            {interview.status}
                          </span>
                        </div>
                        
                        <p className="text-neutral-700 font-medium mb-2">{interview.position}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} />
                            <span>{new Date(interview.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={16} />
                            <span>{interview.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TypeIcon size={16} />
                            <span>{interview.type}</span>
                          </div>
                          {interview.interviewer && (
                            <div className="flex items-center space-x-1">
                              <Users size={16} />
                              <span>{interview.interviewer}</span>
                            </div>
                          )}
                        </div>
                        
                        {interview.notes && (
                          <p className="text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg mb-3">
                            {interview.notes}
                          </p>
                        )}
                        
                        {interview.preparationTasks.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-sm font-semibold text-neutral-700 mb-2">Preparation Tasks:</h4>
                            <ul className="space-y-1">
                              {interview.preparationTasks.map((task, index) => (
                                <li key={index} className="flex items-center space-x-2 text-sm text-neutral-600">
                                  <CheckCircle size={14} className="text-success-600" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => editInterview(interview)}
                        className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border-2 border-transparent hover:border-blue-200"
                        aria-label="Edit interview"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => deleteInterview(interview.id)}
                        className="p-3 text-error-600 hover:bg-error-50 rounded-xl transition-colors border-2 border-transparent hover:border-error-200"
                        aria-label="Delete interview"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interview Preparation Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
          <FileText className="mr-2" size={20} />
          Interview Preparation Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 className="font-semibold mb-2">Technical Interviews:</h4>
            <ul className="space-y-1">
              <li>• Practice coding problems on LeetCode</li>
              <li>• Review data structures and algorithms</li>
              <li>• Prepare to explain your thought process</li>
              <li>• Practice coding on a whiteboard</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Behavioral Interviews:</h4>
            <ul className="space-y-1">
              <li>• Prepare STAR method examples</li>
              <li>• Research the company culture</li>
              <li>• Practice common behavioral questions</li>
              <li>• Prepare thoughtful questions to ask</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewTracker;