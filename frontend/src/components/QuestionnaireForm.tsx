import React, { useState } from 'react';
import { QuestionnaireAnswer } from '../types';
import { CheckCircle, Brain, Users, Target, Lightbulb, MessageCircle, TrendingUp, Award, FileText } from 'lucide-react';

interface QuestionnaireFormProps {
  answers: QuestionnaireAnswer[];
  onAnswersChange: (answers: QuestionnaireAnswer[]) => void;
}

const questions = [
  {
    id: 'professional-drive',
    category: 'Professional Identity',
    question: 'What drives you most in your professional life?',
    icon: Target
  },
  {
    id: 'leadership-style',
    category: 'Professional Identity',
    question: 'How would you describe your leadership style?',
    icon: Users
  },
  {
    id: 'work-environment',
    category: 'Professional Identity',
    question: 'What type of work environment brings out your best performance?',
    icon: Brain
  },
  {
    id: 'problem-solving',
    category: 'Professional Identity',
    question: 'What\'s your approach to problem-solving?',
    icon: Lightbulb
  },
  {
    id: 'deadline-pressure',
    category: 'Work Philosophy',
    question: 'How do you handle tight deadlines and pressure?',
    icon: TrendingUp
  },
  {
    id: 'communication-style',
    category: 'Work Philosophy',
    question: 'What\'s your preferred communication style?',
    icon: MessageCircle
  },
  {
    id: 'industry-trends',
    category: 'Work Philosophy',
    question: 'How do you stay updated with industry trends?',
    icon: TrendingUp
  },
  {
    id: 'feedback-approach',
    category: 'Work Philosophy',
    question: 'What\'s your approach to giving and receiving feedback?',
    icon: MessageCircle
  },
  {
    id: 'career-vision',
    category: 'Career Goals',
    question: 'Where do you see yourself in 5 years?',
    icon: Target
  },
  {
    id: 'exciting-projects',
    category: 'Career Goals',
    question: 'What type of projects excite you the most?',
    icon: Award
  },
  {
    id: 'success-metrics',
    category: 'Career Goals',
    question: 'How do you measure professional success?',
    icon: Award
  },
  {
    id: 'company-culture',
    category: 'Career Goals',
    question: 'What\'s your ideal company culture?',
    icon: Users
  },
  {
    id: 'collaboration-preference',
    category: 'Collaboration',
    question: 'How do you prefer to collaborate with colleagues?',
    icon: Users
  },
  {
    id: 'team-role',
    category: 'Collaboration',
    question: 'What role do you typically take in team projects?',
    icon: Users
  },
  {
    id: 'conflict-resolution',
    category: 'Collaboration',
    question: 'How do you handle conflicts or disagreements?',
    icon: MessageCircle
  },
  {
    id: 'extra-motivation',
    category: 'Collaboration',
    question: 'What motivates you to go above and beyond?',
    icon: Award
  },
  {
    id: 'learning-approach',
    category: 'Development',
    question: 'How do you approach learning new skills?',
    icon: Brain
  },
  {
    id: 'greatest-strength',
    category: 'Development',
    question: 'What\'s your biggest professional strength?',
    icon: Award
  },
  {
    id: 'improvement-focus',
    category: 'Development',
    question: 'What area are you most focused on improving?',
    icon: TrendingUp
  },
  {
    id: 'work-life-balance',
    category: 'Development',
    question: 'How do you balance work with personal interests?',
    icon: Target
  }
];

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ answers, onAnswersChange }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
    
    const newAnswer: QuestionnaireAnswer = {
      questionId: questions[currentQuestion].id,
      answer,
      category: questions[currentQuestion].category
    };
    
    const updatedAnswers = answers.filter(a => a.questionId !== questions[currentQuestion].id);
    updatedAnswers.push(newAnswer);
    
    onAnswersChange(updatedAnswers);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    const existingAnswer = answers.find(a => a.questionId === questions[index].id);
    setSelectedAnswer(existingAnswer?.answer || '');
  };

  const isAnswered = (questionId: string) => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer && answer.answer.trim().length > 0;
  };

  const progress = (answers.length / questions.length) * 100;
  const CurrentIcon = questions[currentQuestion].icon;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Personality Profiling</h2>
          <div className="text-sm text-gray-600">
            {answers.length} of {questions.length} completed
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-gray-600">
          Help us understand your work style and personality to create your AI representative
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Question Navigation */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => goToQuestion(index)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  index === currentQuestion
                    ? 'bg-indigo-100 border-indigo-500 border-2'
                    : isAnswered(question.id)
                      ? 'bg-green-50 border-green-200 border'
                      : 'bg-gray-50 border-gray-200 border hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {index + 1}. {question.category}
                  </span>
                  {isAnswered(question.id) && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Question */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                  <CurrentIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm text-indigo-600 font-medium">
                    {questions[currentQuestion].category}
                  </div>
                  <div className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {questions.length}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {questions[currentQuestion].question}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Please provide a detailed answer that reflects your personal experience and approach.
              </p>
            </div>

            <div className="mb-6">
              <textarea
                value={selectedAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Share your thoughts and experiences..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">
                  {selectedAnswer.length} characters
                </span>
                {selectedAnswer.trim().length > 0 && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">Answer saved</span>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => goToQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex space-x-2">
                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={() => goToQuestion(currentQuestion + 1)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Next
                  </button>
                ) : answers.length === questions.length && (
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Complete Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Questions Help */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Need inspiration? Here are some example responses:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <p className="font-medium text-gray-900 mb-2">For "What drives you professionally?"</p>
            <p className="text-gray-600 italic">
              "I'm driven by the opportunity to solve complex problems that have real impact on users' lives. 
              The combination of technical challenges and meaningful outcomes energizes me most."
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-medium text-gray-900 mb-2">For "How do you handle pressure?"</p>
            <p className="text-gray-600 italic">
              "I break down complex tasks into manageable pieces and communicate early about potential roadblocks. 
              I find that preparation and transparency help me deliver quality work even under tight deadlines."
            </p>
          </div>
        </div>
      </div>

      {/* Completion Summary */}
      {answers.length === questions.length && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            🎉 Questionnaire Complete!
          </h3>
          <p className="text-green-700">
            Excellent! Your personality profile is complete. Click "Generate Portfolio" to create your 
            professional portfolio with an AI representative that reflects your unique work style and philosophy.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireForm;