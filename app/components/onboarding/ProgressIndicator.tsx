"use client";

import React from "react";
import { useLanguage } from "../../lib/LanguageContext";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  onStepClick?: (step: number) => void;
}

export default function ProgressIndicator({
  currentStep,
  totalSteps = 6,
  onStepClick,
}: ProgressIndicatorProps) {
  const { t } = useLanguage();
  const stepLabels = [t.step1, t.step2, t.step3, t.step4, t.step5, t.step6];

  return (
    <div className="w-full py-4 mb-6">
      <div className="flex items-center justify-between relative max-w-2xl mx-auto">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-300 z-0"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              onClick={() => stepNumber < currentStep && onStepClick?.(stepNumber)}
              className={`relative z-10 flex flex-col items-center ${stepNumber < currentStep ? "cursor-pointer" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${
                  isCurrent
                    ? "bg-orange-500 text-white ring-4 ring-orange-100 scale-110"
                    : isCompleted
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-400 border-2 border-gray-300"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap hidden sm:block ${isCurrent ? "text-orange-600 font-bold" : "text-gray-500"}`}>
                {stepLabels[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}