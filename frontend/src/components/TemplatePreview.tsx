import React from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Globe } from 'lucide-react';
import { dummyUserProfile } from '../data/dummyData';

interface TemplatePreviewProps {
  templateId: string;
  onClosePreview: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateId, onClosePreview }) => {
  const renderTemplatePreview = () => {
    switch (templateId) {
      case 'modern-minimalist':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
              <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{dummyUserProfile.personalInfo.fullName}</h1>
                    <p className="text-xl text-indigo-600 mt-1">{dummyUserProfile.personalInfo.professionalTitle}</p>
                    <div className="flex items-center space-x-4 mt-3 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{dummyUserProfile.personalInfo.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{dummyUserProfile.personalInfo.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                    <p className="text-gray-700 leading-relaxed">{dummyUserProfile.personalInfo.summary}</p>
                  </section>

                  {/* Experience */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                    <div className="space-y-6">
                      {dummyUserProfile.experience.slice(0, 2).map((exp) => (
                        <div key={exp.id} className="border-l-4 border-indigo-600 pl-6">
                          <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-indigo-600 font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-500 mb-2">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                          <p className="text-gray-700 mb-3">{exp.description}</p>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {exp.achievements.slice(0, 2).map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Projects */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {dummyUserProfile.projects.slice(0, 2).map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex space-x-3">
                            {project.liveUrl && (
                              <a href="#" className="text-indigo-600 hover:text-indigo-700 flex items-center space-x-1">
                                <ExternalLink className="w-4 h-4" />
                                <span>Live</span>
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href="#" className="text-gray-600 hover:text-gray-700 flex items-center space-x-1">
                                <Github className="w-4 h-4" />
                                <span>Code</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Skills */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {dummyUserProfile.skills.slice(0, 10).map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Education */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
                    {dummyUserProfile.education.map((edu) => (
                      <div key={edu.id}>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-indigo-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
                        <p className="text-sm text-gray-500">{edu.endDate}</p>
                      </div>
                    ))}
                  </section>

                  {/* Contact */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Connect</h2>
                    <div className="space-y-3">
                      {dummyUserProfile.socialLinks.linkedin && (
                        <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                          <Linkedin className="w-4 h-4" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {dummyUserProfile.socialLinks.github && (
                        <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {dummyUserProfile.socialLinks.website && (
                        <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                          <Globe className="w-4 h-4" />
                          <span>Website</span>
                        </a>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </main>
          </div>
        );

      case 'creative-bold':
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <User className="w-16 h-16" />
                  </div>
                  <h1 className="text-5xl font-bold mb-4">{dummyUserProfile.personalInfo.fullName}</h1>
                  <p className="text-2xl mb-6 text-orange-100">{dummyUserProfile.personalInfo.professionalTitle}</p>
                  <p className="text-lg max-w-3xl mx-auto leading-relaxed text-orange-50">
                    {dummyUserProfile.personalInfo.summary}
                  </p>
                </div>
              </div>
            </section>

            {/* Projects Showcase */}
            <section className="py-16">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dummyUserProfile.projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
                      <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500"></div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills & Experience */}
            <section className="bg-white py-16">
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills & Expertise</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {dummyUserProfile.skills.slice(0, 8).map((skill) => (
                        <div key={skill} className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg text-center">
                          <span className="font-semibold text-gray-900">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Experience</h2>
                    <div className="space-y-6">
                      {dummyUserProfile.experience.slice(0, 2).map((exp) => (
                        <div key={exp.id} className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                          <p className="text-orange-600 font-semibold">{exp.company}</p>
                          <p className="text-gray-600 mt-2">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      default:
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Template Preview</h1>
              <p className="text-gray-600 mb-8">Template: {templateId}</p>
              <p className="text-gray-500">This template preview will be implemented soon.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <button
            onClick={onClosePreview}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Templates</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              Preview Mode - Dummy Data
            </div>
          </div>
        </div>
      </div>

      {/* Template Content */}
      {renderTemplatePreview()}
    </div>
  );
};

export default TemplatePreview;