import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import { UserProfile, UserPersonalInfo, SocialLinks } from '../types';
import { Save, User, CheckCircle, AlertCircle } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { userProfile, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  /**
   * LOCAL state buffers all edits.
   * The API is only called when the user explicitly clicks "Save Changes".
   * Previously, updateProfile() was being called directly from onChange handlers
   * (on every keystroke), which caused race conditions and prevented typing.
   */
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null);

  // Initialise / re-sync local copy whenever the auth profile changes
  useEffect(() => {
    if (userProfile) {
      setLocalProfile(userProfile);
    }
  }, [userProfile]);

  if (!userProfile || !localProfile) {
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

  // ── Local-state change handlers (NO API calls here) ──────────────────────

  const handlePersonalInfoChange = (info: UserPersonalInfo) => {
    setLocalProfile(prev => prev ? { ...prev, personalInfo: info } : prev);
  };

  const handleSocialLinksChange = (links: SocialLinks) => {
    setLocalProfile(prev => prev ? { ...prev, socialLinks: links } : prev);
  };

  const handleSkillsChange = (skills: string[]) => {
    setLocalProfile(prev => prev ? { ...prev, skills } : prev);
  };

  // ── Save: only API call point ─────────────────────────────────────────────

  const handleSave = async () => {
    if (!localProfile) return;
    setIsLoading(true);
    setError('');

    try {
      await updateProfile(localProfile);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isProfileComplete =
    localProfile.personalInfo.fullName &&
    localProfile.personalInfo.email &&
    localProfile.personalInfo.professionalTitle;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
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
                    : 'Fill in Full Name, Email, and Professional Title to unlock portfolio creation'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Success / Error Messages */}
          {showSuccess && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-green-700 dark:text-green-300 font-medium">
                Profile saved successfully!
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* ── Profile Form ──────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <PersonalDetailsForm
            personalInfo={localProfile.personalInfo}
            socialLinks={localProfile.socialLinks}
            skills={localProfile.skills}
            onPersonalInfoChange={handlePersonalInfoChange}
            onSocialLinksChange={handleSocialLinksChange}
            onSkillsChange={handleSkillsChange}
          />
        </div>

        {/* ── Summary + Account Settings ───────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Profile Summary
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Work Experiences', value: localProfile.experience.length },
                { label: 'Projects', value: localProfile.projects.length },
                { label: 'Education entries', value: localProfile.education.length },
                { label: 'Skills', value: localProfile.skills.length },
                { label: 'Interests', value: localProfile.interests.length },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{label}:</span>
                  <span className={`font-semibold text-sm px-2 py-0.5 rounded-full ${
                    value > 0
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {value}
                  </span>
                </div>
              ))}
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