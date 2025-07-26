import React, { useState } from 'react';
import { UserPersonalInfo, SocialLinks } from '../types';
import FileUpload from './FileUpload';
import { User, Mail, Phone, MapPin, Briefcase, LinkedinIcon, Github, Globe, Twitter } from 'lucide-react';

interface PersonalDetailsFormProps {
  personalInfo: UserPersonalInfo;
  socialLinks: SocialLinks;
  skills: string[];
  onPersonalInfoChange: (info: UserPersonalInfo) => void;
  onSocialLinksChange: (links: SocialLinks) => void;
  onSkillsChange: (skills: string[]) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  personalInfo,
  socialLinks,
  skills,
  onPersonalInfoChange,
  onSocialLinksChange,
  onSkillsChange
}) => {
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (field: keyof UserPersonalInfo, value: string) => {

    console.log('value', value);
    onPersonalInfoChange({
      ...personalInfo,
      [field]: value
    });
  };

  const handleSocialLinkChange = (platform: keyof SocialLinks, value: string) => {
    onSocialLinksChange({
      ...socialLinks,
      [platform]: value
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const newSkills = [...skills, newSkill.trim()];
      onSkillsChange(newSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const filteredSkills = skills.filter(skill => skill !== skillToRemove);
    onSkillsChange(filteredSkills);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself and your professional background</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-2" />
              Location
            </label>
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="New York, NY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="inline w-4 h-4 mr-2" />
              Professional Title *
            </label>
            <input
              type="text"
              value={personalInfo.professionalTitle}
              onChange={(e) => handleInputChange('professionalTitle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Senior Software Engineer"
            />
          </div>
        </div>

        {/* Right Column - Files & Additional Info */}
        <div className="space-y-6">
          <FileUpload
            onFileUpload={(file) => handleInputChange('profilePicture', file.name)}
            acceptedTypes="image/*"
            maxSize={5 * 1024 * 1024}
            label="Profile Picture"
            description="Upload a professional headshot (JPG, PNG, max 5MB)"
            currentFile={personalInfo.profilePicture}
          />

          <FileUpload
            onFileUpload={(file) => handleInputChange('resume', file.name)}
            acceptedTypes=".pdf,.doc,.docx"
            maxSize={10 * 1024 * 1024}
            label="Resume/CV"
            description="Upload your latest resume (PDF, DOC, max 10MB)"
            currentFile={personalInfo.resume}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills & Expertise
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Add a skill..."
              />
              <button
                onClick={addSkill}
                className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary
        </label>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          placeholder="Write a compelling summary of your professional background and achievements..."
        />
      </div>

      {/* Social Links */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <LinkedinIcon className="inline w-4 h-4 mr-2" />
              LinkedIn
            </label>
            <input
              type="url"
              value={socialLinks.linkedin || ''}
              onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Github className="inline w-4 h-4 mr-2" />
              GitHub
            </label>
            <input
              type="url"
              value={socialLinks.github || ''}
              onChange={(e) => handleSocialLinkChange('github', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="https://github.com/yourusername"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="inline w-4 h-4 mr-2" />
              Website
            </label>
            <input
              type="url"
              value={socialLinks.website || ''}
              onChange={(e) => handleSocialLinkChange('website', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Twitter className="inline w-4 h-4 mr-2" />
              Twitter
            </label>
            <input
              type="url"
              value={socialLinks.twitter || ''}
              onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="https://twitter.com/yourusername"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;