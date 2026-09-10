"use client";

import { useLanguage } from "../../lib/LanguageContext";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  onStepClick,
}: ProgressIndicatorProps) {
  const { t } = useLanguage();

  const stepLabels = [
    t.step1,
    t.step2,
    t.step3,
    t.step4,
    t.step5,
    t.step6,
  ];

  return (
    <div className="w-full mb-8">
      {/* Mobile Step Counter */}
      <div className="flex items-center justify-between sm:hidden mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-900">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-bold text-gray-800">
          {stepLabels[currentStep - 1]}
        </span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden sm:hidden">
        <div
          className="bg-orange-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Desktop Step Tracker */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-0" />
        <div
          className="absolute top-4 left-0 h-1 bg-blue-900 transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              className="flex flex-col items-center relative z-10 cursor-default"
              onClick={() => {
                if (isCompleted && onStepClick) {
                  onStepClick(stepNumber);
                }
              }}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 border-2 ${
                  isCompleted
                    ? "bg-blue-900 text-white border-blue-900 cursor-pointer shadow-sm"
                    : isCurrent
                    ? "bg-orange-500 text-white border-orange-500 shadow-md ring-4 ring-orange-100"
                    : "bg-white text-gray-500 border-gray-300"
                }`}
                title={isCompleted ? `Go back to ${stepLabels[i]}` : undefined}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`text-xs mt-2 font-medium max-w-[80px] text-center truncate ${
                  isCurrent
                    ? "text-blue-900 font-bold"
                    : isCompleted
                    ? "text-gray-700"
                    : "text-gray-400"
                }`}
              >
                {stepLabels[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
