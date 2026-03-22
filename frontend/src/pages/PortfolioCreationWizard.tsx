import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WizardSteps from '../components/WizardSteps';
import TemplateGallery from '../components/TemplateGallery';
import QuestionnaireForm from '../components/QuestionnaireForm';
import TemplatePreview from '../components/TemplatePreview';
import { 
  UserProfile, 
  QuestionnaireAnswer, 
  UserPersonality,
  WizardStep 
} from '../types';
import { ArrowLeft, ArrowRight, Download, Share2 } from 'lucide-react';

const questions = [
  { id: 'professional-drive' },
  { id: 'leadership-style' },
  { id: 'work-environment' },
  { id: 'problem-solving' },
  { id: 'deadline-pressure' },
  { id: 'communication-style' },
  { id: 'industry-trends' },
  { id: 'feedback-approach' },
  { id: 'career-vision' },
  { id: 'exciting-projects' },
  { id: 'success-metrics' },
  { id: 'company-culture' },
  { id: 'collaboration-preference' },
  { id: 'team-role' },
  { id: 'conflict-resolution' },
  { id: 'extra-motivation' },
  { id: 'learning-approach' },
  { id: 'greatest-strength' },
  { id: 'improvement-focus' },
  { id: 'work-life-balance' }
];

const PortfolioCreationWizard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userProfile, updateProfile } = useAuth();
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [templatePreviewId, setTemplatePreviewId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswer[]>([]);
  const [userPersonality, setUserPersonality] = useState<UserPersonality>({
    answers: [],
    profileSummary: '',
    workStyle: '',
    communicationStyle: '',
    leadershipStyle: '',
    problemSolvingApproach: '',
    careerGoals: '',
    values: []
  });

  const editMode = searchParams.get('edit');
  
  // Check if user profile is complete
  const isProfileComplete = userProfile && 
    userProfile.personalInfo.fullName && 
    userProfile.personalInfo.email && 
    userProfile.personalInfo.professionalTitle;

  // Create wizard steps based on profile completion
  const wizardSteps: WizardStep[] = [
    {
      id: 'template-selection',
      title: 'Choose Template',
      description: 'Select your portfolio design',
      component: TemplateGallery,
      completed: !!selectedTemplate,
      required: true
    },
    {
      id: 'questionnaire',
      title: 'Personality Quiz',
      description: 'Build your AI representative',
      component: QuestionnaireForm,
      completed: questionnaireAnswers.length === questions.length,
      required: true
    }
  ];

  useEffect(() => {
    if (!isProfileComplete) {
      navigate('/profile', { 
        state: { 
          message: 'Please complete your profile before creating a portfolio' 
        }
      });
    }
  }, [isProfileComplete, navigate]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleQuestionnaireChange = (answers: QuestionnaireAnswer[]) => {
    setQuestionnaireAnswers(answers);
    setUserPersonality(prev => ({
      ...prev,
      answers
    }));
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleNext = () => {
    if (currentStep === wizardSteps.length - 1) {
      // Last step - generate portfolio
      handleGeneratePortfolio();
    } else if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreview = (templateId: string) => {
    setTemplatePreviewId(templateId);
    setShowTemplatePreview(true);
  };

  const handleCloseTemplatePreview = () => {
    setShowTemplatePreview(false);
    setTemplatePreviewId(null);
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const handleGeneratePortfolio = async () => {
    if (!userProfile) return;

    // Update user profile with selected template
    const updatedProfile: UserProfile = {
      ...userProfile,
      selectedTemplate
    };
    await updateProfile(updatedProfile);

    // Create new portfolio in backend
    const newPortfolio = {
      userId: userProfile.personalInfo.email,
      name: `${userProfile.personalInfo.professionalTitle || 'Portfolio'} Portfolio`,
      template: selectedTemplate,
      createdAt: new Date().toISOString().slice(0, 10),
      lastModified: new Date().toISOString().slice(0, 10),
      status: 'draft',
      views: 0,
      thumbnail: '',
    };
    let createdPortfolio = null;
    try {
      const res = await fetch(`${API_URL}/api/portfolios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPortfolio),
      });
      if (res.ok) {
        createdPortfolio = await res.json();
      }
    } catch (err) {
      // Optionally handle error
    }

    // Navigate to generated portfolio
    navigate(`/generated-portfolio/${createdPortfolio?._id || 'new'}`, {
      state: {
        userProfile: updatedProfile,
        userPersonality,
        selectedTemplate
      }
    });
  };

  const renderCurrentStep = () => {
    const step = wizardSteps[currentStep];

    switch (step.id) {
      case 'template-selection':
        return (
          <TemplateGallery
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            onPreview={handlePreview}
          />
        );
      case 'questionnaire':
        return (
          <QuestionnaireForm
            answers={questionnaireAnswers}
            onAnswersChange={handleQuestionnaireChange}
          />
        );
      default:
        return null;
    }
  };

  // Show template preview
  if (showTemplatePreview && templatePreviewId) {
    return (
      <TemplatePreview
        templateId={templatePreviewId}
        onClosePreview={handleCloseTemplatePreview}
      />
    );
  }

  if (!isProfileComplete) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-amber-600 dark:text-amber-400 font-bold text-xl">!</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Profile Incomplete
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please complete your profile before creating a portfolio.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <WizardSteps
        steps={wizardSteps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/portfolios')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolios</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Download className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        </header>

        {/* Step Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {renderCurrentStep()}
        </main>

        {/* Footer Navigation */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep + 1} of {wizardSteps.length}
            </div>
            
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !selectedTemplate) ||
                (currentStep === 1 && questionnaireAnswers.length !== questions.length)
              }
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentStep === wizardSteps.length - 1
                  ? questionnaireAnswers.length === questions.length
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : selectedTemplate
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{currentStep === wizardSteps.length - 1 ? 'Generate Portfolio' : 'Next'}</span>
              {currentStep === wizardSteps.length - 1 ? (
                <span className="text-lg">🚀</span>
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioCreationWizard;