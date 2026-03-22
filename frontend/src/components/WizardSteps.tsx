import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { WizardStep } from '../types';

interface WizardStepsProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const WizardSteps: React.FC<WizardStepsProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="bg-white border-r border-gray-200 w-80 p-6 overflow-y-auto">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Portfolio Builder</h3>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`relative cursor-pointer transition-all duration-200 ${
              index === currentStep 
                ? 'bg-indigo-50 border-indigo-200' 
                : index < currentStep 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
            } border rounded-lg p-4 hover:shadow-md`}
            onClick={() => onStepClick(index)}
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                index === currentStep 
                  ? 'bg-indigo-600 text-white' 
                  : index < currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
              }`}>
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${
                  index === currentStep 
                    ? 'text-indigo-900' 
                    : index < currentStep 
                      ? 'text-green-900' 
                      : 'text-gray-700'
                }`}>
                  {step.title}
                </h4>
                <p className={`text-sm ${
                  index === currentStep 
                    ? 'text-indigo-600' 
                    : index < currentStep 
                      ? 'text-green-600' 
                      : 'text-gray-500'
                }`}>
                  {step.description}
                </p>
              </div>
              {index === currentStep && (
                <ChevronRight className="w-4 h-4 text-indigo-600" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Pro Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Upload high-quality images for best results</li>
          <li>• Be specific about your achievements</li>
          <li>• Complete the personality quiz for AI features</li>
          <li>• Preview your portfolio before finalizing</li>
        </ul>
      </div>
    </div>
  );
};

export default WizardSteps;