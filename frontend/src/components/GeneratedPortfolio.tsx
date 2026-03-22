import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Download, Share2, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserProfile, UserPersonality } from '../types';
import ChatBot from './ChatBot';

interface GeneratedPortfolioProps {
  userProfile: UserProfile;
  userPersonality: UserPersonality;
  selectedTemplate: string;
  onBackToWizard: () => void;
}

const GeneratedPortfolio: React.FC<GeneratedPortfolioProps> = ({
  userProfile: propUserProfile,
  userPersonality: propUserPersonality,
  selectedTemplate: propSelectedTemplate,
  onBackToWizard: propOnBackToWizard
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile: authUserProfile } = useAuth();
  const [showChatBot, setShowChatBot] = useState(false);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'chat'>('portfolio');

  // Use props if provided, otherwise use location state or auth context
  const userProfile = propUserProfile || location.state?.userProfile || authUserProfile;
  const userPersonality = propUserPersonality || location.state?.userPersonality || {
    answers: [],
    profileSummary: '',
    workStyle: '',
    communicationStyle: '',
    leadershipStyle: '',
    problemSolvingApproach: '',
    careerGoals: '',
    values: []
  };
  const selectedTemplate = propSelectedTemplate || location.state?.selectedTemplate || userProfile?.selectedTemplate || 'modern-minimalist';
  
  const handleBackToPortfolios = () => {
    if (propOnBackToWizard) {
      propOnBackToWizard();
    } else {
      navigate('/portfolios');
    }
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Portfolio Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Unable to load portfolio data.
          </p>
          <button
            onClick={() => navigate('/portfolios')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Portfolios
          </button>
        </div>
      </div>
    );
  }

  const renderPortfolioContent = () => {
    // This will be expanded with actual template rendering
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Portfolio Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {userProfile.personalInfo.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{userProfile.personalInfo.fullName}</h1>
                <p className="text-xl text-indigo-600 mt-1">{userProfile.personalInfo.professionalTitle}</p>
                <div className="flex items-center space-x-4 mt-3 text-gray-600">
                  <span>{userProfile.personalInfo.email}</span>
                  <span>{userProfile.personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Portfolio Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">{userProfile.personalInfo.summary}</p>
              </section>

              {/* Experience Section */}
              {userProfile.experience.length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                  <div className="space-y-6">
                    {userProfile.experience.map((exp) => (
                      <div key={exp.id} className="border-l-4 border-indigo-600 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-indigo-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                        <p className="text-gray-700 mb-3">{exp.description}</p>
                        {exp.achievements.length > 0 && (
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {exp.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects Section */}
              {userProfile.projects.length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userProfile.projects.map((project) => (
                      <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-3">
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 text-sm">
                              Live Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700 text-sm">
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              {userProfile.skills.length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {userProfile.education.length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
                  <div className="space-y-4">
                    {userProfile.education.map((edu) => (
                      <div key={edu.id}>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-indigo-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
                        <p className="text-sm text-gray-500">{edu.endDate}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Contact & Social Links */}
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Connect</h2>
                <div className="space-y-3">
                  {userProfile.personalInfo.phone && (
                    <p className="text-gray-600">{userProfile.personalInfo.phone}</p>
                  )}
                  <p className="text-gray-600">{userProfile.personalInfo.email}</p>
                  {Object.entries(userProfile.socialLinks).map(([platform, url]) => (
                    url && (
                      <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="block text-indigo-600 hover:text-indigo-700 capitalize">
                        {platform}
                      </a>
                    )
                  ))}
                </div>
              </section>

              {/* Interests */}
              {userProfile.interests.length > 0 && (
                <section className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.interests.map((interest) => (
                      <span key={interest} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToPortfolios}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Portfolios</span>
          </button>
          
          <div className="flex items-center space-x-4">
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'portfolio'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                AI Chat
              </button>
            </div>

            {/* Action Buttons */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'portfolio' ? (
        <div>
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Portfolio Generated Successfully!</h3>
                  <p className="text-green-700 text-sm">
                    Your portfolio is ready. You can now export it as PDF or share the link with recruiters.
                    Try the AI Chat tab to test your AI representative!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {renderPortfolioContent()}
        </div>
      ) : (
        <div className="p-6">
          <ChatBot userProfile={userProfile} userPersonality={userPersonality} />
        </div>
      )}
    </div>
  );
};

export default GeneratedPortfolio;