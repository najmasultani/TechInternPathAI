import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Calendar,
  Building,
  FileText
} from 'lucide-react';
import { Application } from '../types';

interface ApplicationTrackerProps {
  applications: Application[];
  updateApplications: (applications: Application[]) => void;
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ applications, updateApplications }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'company' | 'appliedDate' | 'status'>('appliedDate');

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    appliedDate: '',
    status: 'Applied' as Application['status'],
    notes: '',
    resumeLink: '',
    githubRepo: '',
  });

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      appliedDate: '',
      status: 'Applied',
      notes: '',
      resumeLink: '',
      githubRepo: '',
    });
    setEditingApp(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingApp) {
      const updatedApps = applications.map(app =>
        app.id === editingApp.id ? { ...app, ...formData } : app
      );
      updateApplications(updatedApps);
    } else {
      const newApp: Application = {
        id: `app-${Date.now()}`,
        ...formData,
      };
      updateApplications([...applications, newApp]);
    }
    
    resetForm();
  };

  const deleteApplication = (id: string) => {
    updateApplications(applications.filter(app => app.id !== id));
  };

  const editApplication = (app: Application) => {
    setFormData({
      company: app.company,
      position: app.position,
      appliedDate: app.appliedDate,
      status: app.status,
      notes: app.notes,
      resumeLink: app.resumeLink || '',
      githubRepo: app.githubRepo || '',
    });
    setEditingApp(app);
    setShowForm(true);
  };

  const exportToCSV = () => {
    const headers = ['Company', 'Position', 'Applied Date', 'Status', 'Notes', 'Resume Link', 'GitHub Repo'];
    const csvContent = [
      headers.join(','),
      ...applications.map(app => [
        app.company,
        app.position,
        app.appliedDate,
        app.status,
        app.notes.replace(/,/g, ';'),
        app.resumeLink || '',
        app.githubRepo || '',
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'internship-applications.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredAndSortedApps = applications
    .filter(app => {
      const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'company':
          return a.company.localeCompare(b.company);
        case 'appliedDate':
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Offer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusStats = () => {
    const stats = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total: applications.length,
      applied: stats.Applied || 0,
      interview: stats.Interview || 0,
      rejected: stats.Rejected || 0,
      offer: stats.Offer || 0,
    };
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Tracker</h2>
        <p className="text-gray-600">Keep track of your internship applications</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
          <div className="text-sm text-gray-500">Applied</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.interview}</div>
          <div className="text-sm text-gray-500">Interview</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          <div className="text-sm text-gray-500">Rejected</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-2xl font-bold text-green-600">{stats.offer}</div>
          <div className="text-sm text-gray-500">Offer</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="appliedDate">Sort by Date</option>
              <option value="company">Sort by Company</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              <span>Add Application</span>
            </button>
          </div>
        </div>
      </div>

      {/* Application Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingApp ? 'Edit Application' : 'Add New Application'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applied Date</label>
                  <input
                    type="date"
                    required
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Application['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link</label>
                  <input
                    type="url"
                    value={formData.resumeLink}
                    onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Repo</label>
                  <input
                    type="url"
                    value={formData.githubRepo}
                    onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingApp ? 'Update' : 'Add'} Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredAndSortedApps.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-500 mb-4">Start tracking your internship applications</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Application
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedApps.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="text-gray-400 mr-2" size={16} />
                        <div className="font-medium text-gray-900">{app.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="text-gray-400 mr-2" size={14} />
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => editApplication(app)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit3 size={16} />
                        </button>
                        {app.resumeLink && (
                          <a
                            href={app.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-900"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTracker;