import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck,
  Filter,
  Code,
  GraduationCap,
  Bot,
  Briefcase,
  Zap,
  Building,
  Github,
  Star
} from 'lucide-react';
import { Resource } from '../types';

interface ResourceHubProps {
  resources: Resource[];
  updateResources: (resources: Resource[]) => void;
}

const ResourceHub: React.FC<ResourceHubProps> = ({ resources, updateResources }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Custom',
    description: '',
  });

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'Coding Practice', name: 'Coding Practice', icon: Code },
    { id: 'CS Learning', name: 'CS Learning', icon: GraduationCap },
    { id: 'AI Tools', name: 'AI Tools', icon: Bot },
    { id: 'Career', name: 'Career', icon: Briefcase },
    { id: 'Hackathons', name: 'Hackathons', icon: Zap },
    { id: 'Job Boards', name: 'Job Boards', icon: Building },
    { id: 'Internships', name: 'Internships', icon: Briefcase },
    { id: 'Custom', name: 'Custom', icon: Plus },
  ];

  // Add featured internship resources if they don't exist
  React.useEffect(() => {
    const hasSimplifyJobs = resources.some(r => r.title === 'SimplifyJobs - Summer 2026 Internships');
    const hasSpeedyApply = resources.some(r => r.title === 'SpeedyApply - 2026 AI College Jobs');
    
    if (!hasSimplifyJobs || !hasSpeedyApply) {
      const newResources = [...resources];
      
      if (!hasSimplifyJobs) {
        newResources.push({
          id: 'simplify-jobs-2026',
          title: 'SimplifyJobs - Summer 2026 Internships',
          url: 'https://github.com/SimplifyJobs/Summer2026-Internships',
          category: 'Internships',
          description: 'Comprehensive list of Summer 2026 software engineering internships, updated regularly by the community',
          isBookmarked: true,
          isFeatured: true
        });
      }
      
      if (!hasSpeedyApply) {
        newResources.push({
          id: 'speedy-apply-2026',
          title: 'SpeedyApply - 2026 AI College Jobs',
          url: 'https://github.com/speedyapply/2026-AI-College-Jobs',
          category: 'Internships',
          description: 'Curated collection of AI and technology internships for college students in 2026',
          isBookmarked: true,
          isFeatured: true
        });
      }
      
      updateResources(newResources);
    }
  }, [resources, updateResources]);
  const toggleBookmark = (id: string) => {
    const updatedResources = resources.map(resource =>
      resource.id === id ? { ...resource, isBookmarked: !resource.isBookmarked } : resource
    );
    updateResources(updatedResources);
  };

  const addResource = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newResource: Resource = {
      id: `resource-${Date.now()}`,
      ...formData,
      isBookmarked: false,
      isCustom: true,
    };
    
    updateResources([...resources, newResource]);
    setFormData({ title: '', url: '', category: 'Custom', description: '' });
    setShowForm(false);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : BookOpen;
  };

  const featuredInternshipResources = resources.filter(r => r.category === 'Internships' && r.isFeatured);
  const getResourcesByCategory = () => {
    const grouped = resources.reduce((acc, resource) => {
      if (!acc[resource.category]) acc[resource.category] = [];
      acc[resource.category].push(resource);
      return acc;
    }, {} as Record<string, Resource[]>);
    
    return grouped;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Resources & Internships</h2>
        <p className="text-gray-600">Curated resources and live internship opportunities for your journey</p>
      </div>

      {/* Featured Internship Sources */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
          <Github className="mr-2" size={24} />
          Live Internship Sources
        </h3>
        <p className="text-blue-800 mb-4">
          Get the latest internship opportunities from these community-maintained repositories:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredInternshipResources.map(resource => (
            <div key={resource.id} className="bg-white p-4 rounded-lg border border-blue-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Github className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                    <p className="text-sm text-blue-600">GitHub Repository</p>
                  </div>
                </div>
                <Star className="text-yellow-500" size={16} />
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
              
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <ExternalLink size={14} />
                <span>View Repository</span>
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-blue-800 text-sm">
            💡 <strong>Pro Tip:</strong> These repositories are updated daily with new internship postings. 
            Bookmark them and check regularly for the latest opportunities!
          </p>
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
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            <span>Add Resource</span>
          </button>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.slice(1).map(category => {
          const Icon = category.icon;
          const count = resources.filter(r => r.category === category.id).length;
          
          return (
            <button
              key={category.id}
              onClick={() => setCategoryFilter(category.id)}
              className={`p-4 rounded-xl text-center transition-all ${
                categoryFilter === category.id
                  ? 'bg-blue-50 border-2 border-blue-200 text-blue-700'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <Icon className="mx-auto mb-2" size={24} />
              <div className="text-sm font-medium">{category.name}</div>
              <div className="text-xs text-gray-500">{count} resources</div>
            </button>
          );
        })}
      </div>

      {/* Add Resource Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Resource</h3>
            
            <form onSubmit={addResource} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.slice(1).map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => {
          const Icon = getCategoryIcon(resource.category);
          
          return (
            <div key={resource.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-500">{resource.category}</p>
                  </div>
                </div>
                
                <button
                  {resource.isFeatured && (
                    <Star className="text-yellow-500" size={16} />
                  )}
                  onClick={() => toggleBookmark(resource.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    resource.isBookmarked 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {resource.isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              
              <div className="flex items-center justify-between">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <ExternalLink size={14} />
                  <span>Visit Resource</span>
                </a>
                
                {resource.isCustom && (
                  {resource.isFeatured && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Custom
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Bookmarked Resources */}
      {resources.some(r => r.isBookmarked) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
            <BookmarkCheck className="mr-2" size={20} />
            Bookmarked Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.filter(r => r.isBookmarked).map(resource => (
              <div key={resource.id} className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-gray-900">{resource.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Visit Resource →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceHub;