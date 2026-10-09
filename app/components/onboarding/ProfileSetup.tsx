"use client";

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { Language } from "../../lib/translations";
import { UserProfile, saveStoredProfile } from "../../lib/profileStorage";
import ProgressIndicator from "./ProgressIndicator";
import StepLanguage from "./StepLanguage";
import StepPersonal, { PersonalData } from "./StepPersonal";
import StepSocial from "./StepSocial";
import StepBusiness from "./StepBusiness";
import StepFinancial from "./StepFinancial";
import StepReview from "./StepReview";

interface ProfileSetupProps {
  onComplete: (profile: UserProfile, recommendations?: any[]) => void;
  initialProfile?: UserProfile | null;
  initialStep?: number;
}

export default function ProfileSetup({
  onComplete,
  initialProfile,
  initialStep = 1,
}: ProfileSetupProps) {
  const { language, setLanguage, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<UserProfile>({
    name: initialProfile?.name || "",
    age: initialProfile?.age || "",
    gender: initialProfile?.gender || "",
    state: initialProfile?.state || "",
    district: initialProfile?.district || "",
    category: initialProfile?.category || "",
    disability: initialProfile?.disability || "no",
    minority: initialProfile?.minority || "no",
    locationType: initialProfile?.locationType || "rural",
    education: initialProfile?.education || "10th",
    occupation: initialProfile?.occupation || "",
    businessName: initialProfile?.businessName || "",
    businessStage: initialProfile?.businessStage || "",
    yearsInBusiness: initialProfile?.yearsInBusiness || "0",
    annualIncome: initialProfile?.annualIncome || "",
    turnover: initialProfile?.turnover || "",
    employmentStatus: initialProfile?.employmentStatus || "",
    selectedLanguage: initialProfile?.selectedLanguage || language,
    profileCreated: false,
  });

  const handleSelectLanguage = (lang: Language) => {
    setFormData((prev) => ({ ...prev, selectedLanguage: lang }));
    setLanguage(lang);
  };

  const handlePersonalChange = (field: keyof PersonalData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleNext = () => {
    console.log("Moving from step:", currentStep);
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, 6);
      console.log("New step is:", next);
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async () => {
    const finalProfile: UserProfile = { ...formData, profileCreated: true, selectedLanguage: language };
    saveStoredProfile(finalProfile);
    onComplete(finalProfile, []);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10">
        <ProgressIndicator currentStep={currentStep} totalSteps={6} onStepClick={setCurrentStep} />

        <div className="mt-6">
          {currentStep === 1 && (
            <StepLanguage
              selectedLanguage={(formData.selectedLanguage as Language) || language || "en"}
              onSelectLanguage={handleSelectLanguage}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <StepPersonal data={formData} onChange={handlePersonalChange} onNext={handleNext} onBack={handleBack} errors={errors} />
          )}
          {currentStep === 3 && (
            <StepSocial data={formData} onChange={(f, v) => setFormData(p => ({...p, [f]: v}))} onNext={handleNext} onBack={handleBack} errors={errors} />
          )}
          {currentStep === 4 && (
            <StepBusiness data={formData} onChange={(f, v) => setFormData(p => ({...p, [f]: v}))} onNext={handleNext} onBack={handleBack} errors={errors} />
          )}
          {currentStep === 5 && (
            <StepFinancial data={formData} onChange={(f, v) => setFormData(p => ({...p, [f]: v}))} onNext={handleNext} onBack={handleBack} errors={errors} />
          )}
          {currentStep === 6 && (
            <StepReview profile={formData} onEditSection={setCurrentStep} onSubmit={handleFinalSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}