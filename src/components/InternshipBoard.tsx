import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Building, 
  DollarSign,
  Clock,
  Star,
  Briefcase,
  RefreshCw
} from 'lucide-react';
import { Internship } from '../types';
import { fetchInternships, filterInternships, getNewInternships } from '../services/internshipService';

interface InternshipBoardProps {}

const InternshipBoard: React.FC<InternshipBoardProps> = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    location: '',
    company: '',
    dateRange: { start: '', end: '' },
    isNew: false,
    showOnlyNew: false
  });

  useEffect(() => {
    loadInternships();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [internships, searchTerm, filters]);

  const loadInternships = async () => {
    setLoading(true);
    try {
      const data = await fetchInternships();
      setInternships(data);
    } catch (error) {
      console.error('Failed to load internships:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = internships;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(internship =>
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    const filterOptions = {
      type: filters.type !== 'all' ? filters.type : undefined,
      location: filters.location || undefined,
      company: filters.company || undefined,
      dateRange: filters.dateRange.start && filters.dateRange.end ? filters.dateRange : undefined,
      isNew: filters.showOnlyNew ? true : undefined
    };

    filtered = filterInternships(filtered, filterOptions);
    setFilteredInternships(filtered);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Software Engineering': 'bg-blue-100 text-blue-800',
      'AI/ML': 'bg-purple-100 text-purple-800',
      'Data Science': 'bg-green-100 text-green-800',
      'Frontend': 'bg-cyan-100 text-cyan-800',
      'Backend': 'bg-orange-100 text-orange-800',
      'Full Stack': 'bg-indigo-100 text-indigo-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.Other;
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const newInternshipsThisWeek = getNewInternships(internships, 7);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Internship Board</h2>
        <p className="text-gray-600">Latest internship opportunities for Summer 2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Briefcase className="text-blue-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{internships.length}</div>
          <div className="text-sm text-gray-500">Total Opportunities</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Star className="text-green-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{newInternshipsThisWeek.length}</div>
          <div className="text-sm text-gray-500">New This Week</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Building className="text-purple-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(internships.map(i => i.company)).size}
          </div>
          <div className="text-sm text-gray-500">Companies</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Clock className="text-orange-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {internships.filter(i => i.deadline && new Date(i.deadline) > new Date()).length}
          </div>
          <div className="text-sm text-gray-500">Open Applications</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Data Science">Data Science</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
          </select>
          
          <input
            type="text"
            placeholder="Filter by location..."
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.showOnlyNew}
                onChange={(e) => setFilters({ ...filters, showOnlyNew: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">New only</span>
            </label>
            <button
              onClick={loadInternships}
              className="p-2 text-gray-600 hover:text-gray-800"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range - From</label>
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => setFilters({ 
                ...filters, 
                dateRange: { ...filters.dateRange, start: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range - To</label>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => setFilters({ 
                ...filters, 
                dateRange: { ...filters.dateRange, end: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="text-sm text-gray-600 mb-4">
        Showing {filteredInternships.length} of {internships.length} internships
        {filters.showOnlyNew && ` • ${newInternshipsThisWeek.length} new this week`}
      </div>

      {/* Internships Grid */}
      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="mx-auto mb-4 text-gray-400 animate-spin" size={48} />
          <p className="text-gray-500">Loading latest internships...</p>
        </div>
      ) : filteredInternships.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInternships.map(internship => (
            <div key={internship.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{internship.company}</h3>
                    <p className="text-sm text-gray-600">{internship.position}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {internship.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      NEW
                    </span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(internship.type)}`}>
                    {internship.type}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{internship.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2" />
                  {internship.location}
                </div>
                
                {internship.salary && (
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign size={14} className="mr-2" />
                    {internship.salary}
                  </div>
                )}
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-2" />
                  Posted {getDaysAgo(internship.datePosted)} days ago
                </div>
                
                {internship.deadline && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={14} className="mr-2" />
                    Deadline: {new Date(internship.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {internship.requirements.slice(0, 3).map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                  {internship.requirements.length > 3 && (
                    <li className="text-gray-500">+{internship.requirements.length - 3} more...</li>
                  )}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Source: {internship.source}
                </div>
                <a
                  href={internship.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <span>Apply Now</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Data Sources Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <RefreshCw className="mr-2" size={20} />
          Data Sources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">SimplifyJobs Repository:</h4>
            <p>Comprehensive list of Summer 2026 software engineering internships, updated regularly by the community.</p>
            <a 
              href="https://github.com/SimplifyJobs/Summer2026-Internships" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              View on GitHub →
            </a>
          </div>
          <div>
            <h4 className="font-medium mb-2">SpeedyApply Repository:</h4>
            <p>Curated collection of AI and technology internships for college students in 2026.</p>
            <a 
              href="https://github.com/speedyapply/2026-AI-College-Jobs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              View on GitHub →
            </a>
          </div>
        </div>
        <div className="mt-4 text-xs text-blue-700">
          Data is refreshed regularly. Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default InternshipBoard;