import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import { UserPersonalInfo, SocialLinks } from '../types';
import { Save, User, CheckCircle } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { userProfile, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!userProfile) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Profile Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Unable to load your profile information.
          </p>
        </div>
      </div>
    );
  }

  const handlePersonalInfoChange = (info: UserPersonalInfo) => {
    updateProfile({
      ...userProfile,
      personalInfo: info
    });
  };

  const handleSocialLinksChange = (links: SocialLinks) => {
    updateProfile({
      ...userProfile,
      socialLinks: links
    });
  };

  const handleSkillsChange = (skills: string[]) => {
    updateProfile({
      ...userProfile,
      skills
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const isProfileComplete = userProfile.personalInfo.fullName && 
    userProfile.personalInfo.email && 
    userProfile.personalInfo.professionalTitle;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Profile Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your personal and professional information
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          {/* Profile Completion Status */}
          <div className={`p-4 rounded-lg border ${
            isProfileComplete 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isProfileComplete 
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-amber-100 dark:bg-amber-900'
              }`}>
                {isProfileComplete ? (
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 font-bold">!</span>
                )}
              </div>
              <div>
                <h3 className={`font-semibold ${
                  isProfileComplete 
                    ? 'text-green-900 dark:text-green-100'
                    : 'text-amber-900 dark:text-amber-100'
                }`}>
                  {isProfileComplete ? 'Profile Complete' : 'Profile Incomplete'}
                </h3>
                <p className={`text-sm ${
                  isProfileComplete 
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-amber-700 dark:text-amber-300'
                }`}>
                  {isProfileComplete 
                    ? 'Your profile is complete and ready for portfolio creation'
                    : 'Complete your profile to create personalized portfolios'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="text-green-700 dark:text-green-300 font-medium">
                  Profile updated successfully!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Profile Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <PersonalDetailsForm
            personalInfo={userProfile.personalInfo}
            socialLinks={userProfile.socialLinks}
            skills={userProfile.skills}
            onPersonalInfoChange={handlePersonalInfoChange}
            onSocialLinksChange={handleSocialLinksChange}
            onSkillsChange={handleSkillsChange}
          />
        </div>

        {/* Additional Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Experience Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Experience:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {userProfile.experience.length} positions
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Projects:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {userProfile.projects.length} projects
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Skills:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {userProfile.skills.length} skills
                </span>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Settings
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="font-medium text-gray-900 dark:text-white">Change Password</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Update your account password</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="font-medium text-gray-900 dark:text-white">Export Data</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Download your profile data</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <div className="font-medium text-red-600 dark:text-red-400">Delete Account</div>
                <div className="text-sm text-red-500 dark:text-red-400">Permanently delete your account</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;