import React from 'react';
import { Check, Circle } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  title: string;
}

interface BookingStepsProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number;
  onStepClick: (step: number) => void;
}

const BookingSteps: React.FC<BookingStepsProps> = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick
}) => {
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white border-green-500';
      case 'current':
        return 'bg-indigo-600 text-white border-indigo-600 animate-pulse';
      default:
        return 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600';
    }
  };

  const getConnectorColor = (stepId: number) => {
    return stepId < currentStep 
      ? 'bg-green-500' 
      : 'bg-gray-300 dark:bg-gray-600';
  };

  return (
    <div className="w-full">
      {/* Desktop Steps */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 rounded-full transform -translate-y-1/2 z-0">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isClickable = step.id <= currentStep || step.id <= completedSteps + 1;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <button
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-500 hover:scale-125 hover:shadow-xl ${getStepColor(status)} ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {status === 'completed' ? (
                  <Check className="h-6 w-6" />
                ) : status === 'current' ? (
                  <Circle className="h-6 w-6 fill-current animate-pulse" />
                ) : (
                  <span>{step.id}</span>
                )}
              </button>
              
              <div className="mt-3 text-center">
                <div className={`text-sm font-semibold transition-colors duration-300 ${
                  status === 'current' 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : status === 'completed'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.name}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {step.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Steps */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Step {currentStep} of {steps.length}
          </div>
          <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}% Complete
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {steps[currentStep - 1]?.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BookingSteps;