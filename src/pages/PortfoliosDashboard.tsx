import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Share2, 
  Calendar,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface Portfolio {
  id?: string;
  _id?: string;
  name: string;
  template: string;
  createdAt: string;
  lastModified: string;
  status: 'draft' | 'published';
  views: number;
  thumbnail: string;
  userId: string;
}

const PortfoliosDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!userProfile?.personalInfo.email) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/portfolios/${userProfile.personalInfo.email}`);
        if (!res.ok) throw new Error('Failed to fetch portfolios');
        const data = await res.json();
        setPortfolios(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching portfolios');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, [userProfile?.personalInfo.email]);

  const filteredPortfolios = portfolios.filter(portfolio => {
    const matchesSearch = portfolio.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || portfolio.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateNew = () => {
    navigate('/create-portfolio');
  };

  const handleViewPortfolio = (portfolioId: string) => {
    navigate(`/generated-portfolio/${portfolioId}`);
  };

  const handleEditPortfolio = (portfolioId: string) => {
    navigate(`/create-portfolio?edit=${portfolioId}`);
  };

  const handleDeletePortfolio = async (portfolioId: string) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/portfolios/${portfolioId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete portfolio');
      setPortfolios(prev => prev.filter(p => (p.id ?? p._id) !== portfolioId));
    } catch (err: any) {
      setError(err.message || 'Error deleting portfolio');
    } finally {
      setLoading(false);
    }
  };

  const isProfileComplete = userProfile && 
    userProfile.personalInfo.fullName && 
    userProfile.personalInfo.email && 
    userProfile.personalInfo.professionalTitle;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Portfolios
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage and create your AI-powered portfolios
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Portfolio</span>
            </button>
          </div>

          {/* Profile Completion Notice */}
          {!isProfileComplete && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                      Complete Your Profile
                    </h3>
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                      Add your personal details to create more personalized portfolios
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Complete Profile
                </button>
              </div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search portfolios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Portfolios Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">Loading portfolios...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Retry</span>
            </button>
          </div>
        ) : filteredPortfolios.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No portfolios found' : 'No portfolios yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first AI-powered portfolio to get started'
              }
            </p>
            {(!searchTerm && filterStatus === 'all') && (
              <button
                onClick={handleCreateNew}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Portfolio</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      portfolio.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {portfolio.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{portfolio.name}</h3>
                    <p className="text-sm opacity-90 capitalize">
                      {portfolio.template.replace('-', ' ')}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Modified {new Date(portfolio.lastModified).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Eye className="w-4 h-4" />
                      <span>{portfolio.views} views</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewPortfolio(portfolio.id ?? portfolio._id ?? '')}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        title="View Portfolio"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditPortfolio(portfolio.id ?? portfolio._id ?? '')}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit Portfolio"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePortfolio(portfolio.id ?? portfolio._id ?? '')}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Portfolio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                        title="Share Portfolio"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {portfolios.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Portfolios</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{portfolios.length}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portfolios.reduce((sum, p) => sum + p.views, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portfolios.filter(p => p.status === 'published').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfoliosDashboard;