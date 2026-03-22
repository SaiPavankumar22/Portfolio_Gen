import React, { useState } from 'react';
import { UserPersonalInfo, SocialLinks } from '../types';
import FileUpload from './FileUpload';
import {
  User, Mail, Phone, MapPin, Briefcase,
  LinkedinIcon, Github, Globe, Twitter,
} from 'lucide-react';

interface PersonalDetailsFormProps {
  personalInfo: UserPersonalInfo;
  socialLinks: SocialLinks;
  skills: string[];
  onPersonalInfoChange: (info: UserPersonalInfo) => void;
  onSocialLinksChange: (links: SocialLinks) => void;
  onSkillsChange: (skills: string[]) => void;
}

const inputClass =
  'w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg ' +
  'focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ' +
  'bg-white dark:bg-gray-700 text-gray-900 dark:text-white ' +
  'placeholder-gray-400 dark:placeholder-gray-500 transition-colors';

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2';

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  personalInfo,
  socialLinks,
  skills,
  onPersonalInfoChange,
  onSocialLinksChange,
  onSkillsChange,
}) => {
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (field: keyof UserPersonalInfo, value: string) => {
    onPersonalInfoChange({ ...personalInfo, [field]: value });
  };

  const handleSocialLinkChange = (platform: keyof SocialLinks, value: string) => {
    onSocialLinksChange({ ...socialLinks, [platform]: value });
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onSkillsChange([...skills, trimmed]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Personal Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about yourself and your professional background
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Left Column: Basic Info ───────────────────────────────────────── */}
        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <label className={labelClass}>
              <User className="inline w-4 h-4 mr-1 mb-0.5" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={e => handleInputChange('fullName', e.target.value)}
              className={inputClass}
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>
              <Mail className="inline w-4 h-4 mr-1 mb-0.5" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={e => handleInputChange('email', e.target.value)}
              className={inputClass}
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>
              <Phone className="inline w-4 h-4 mr-1 mb-0.5" />
              Phone Number
            </label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              className={inputClass}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>
              <MapPin className="inline w-4 h-4 mr-1 mb-0.5" />
              Location
            </label>
            <input
              type="text"
              value={personalInfo.location}
              onChange={e => handleInputChange('location', e.target.value)}
              className={inputClass}
              placeholder="New York, NY"
            />
          </div>

          {/* Professional Title */}
          <div>
            <label className={labelClass}>
              <Briefcase className="inline w-4 h-4 mr-1 mb-0.5" />
              Professional Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={personalInfo.professionalTitle}
              onChange={e => handleInputChange('professionalTitle', e.target.value)}
              className={inputClass}
              placeholder="Senior Software Engineer"
            />
          </div>
        </div>

        {/* ── Right Column: Files + Skills ────────────────────────────────── */}
        <div className="space-y-6">
          <FileUpload
            onFileUpload={file => handleInputChange('profilePicture', file.name)}
            acceptedTypes="image/*"
            maxSize={5 * 1024 * 1024}
            label="Profile Picture"
            description="Upload a professional headshot (JPG, PNG — max 5 MB)"
            currentFile={personalInfo.profilePicture}
          />

          <FileUpload
            onFileUpload={file => handleInputChange('resume', file.name)}
            acceptedTypes=".pdf,.doc,.docx"
            maxSize={10 * 1024 * 1024}
            label="Resume / CV"
            description="Upload your latest resume (PDF, DOC — max 10 MB)"
            currentFile={personalInfo.resume}
          />

          {/* Skills */}
          <div>
            <label className={labelClass}>Skills &amp; Expertise</label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className={inputClass}
                placeholder="Add a skill and press Enter…"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium whitespace-nowrap"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-200 leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Professional Summary ─────────────────────────────────────────────── */}
      <div className="mt-8">
        <label className={labelClass}>Professional Summary</label>
        <textarea
          value={personalInfo.summary}
          onChange={e => handleInputChange('summary', e.target.value)}
          rows={4}
          className={inputClass + ' resize-none'}
          placeholder="Write a compelling summary of your professional background and achievements…"
        />
      </div>

      {/* ── Social Links ─────────────────────────────────────────────────────── */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Social Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {([
            { key: 'linkedin', icon: LinkedinIcon, label: 'LinkedIn', placeholder: 'https://linkedin.com/in/yourprofile' },
            { key: 'github',   icon: Github,        label: 'GitHub',   placeholder: 'https://github.com/yourusername' },
            { key: 'website',  icon: Globe,          label: 'Website',  placeholder: 'https://yourwebsite.com' },
            { key: 'twitter',  icon: Twitter,        label: 'Twitter',  placeholder: 'https://twitter.com/yourusername' },
          ] as const).map(({ key, icon: Icon, label, placeholder }) => (
            <div key={key}>
              <label className={labelClass}>
                <Icon className="inline w-4 h-4 mr-1 mb-0.5" />
                {label}
              </label>
              <input
                type="url"
                value={socialLinks[key] || ''}
                onChange={e => handleSocialLinkChange(key, e.target.value)}
                className={inputClass}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;