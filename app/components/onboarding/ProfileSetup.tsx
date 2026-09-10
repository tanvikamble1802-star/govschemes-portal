"use client";

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { Language } from "../../lib/translations";
import { UserProfile, saveStoredProfile } from "../../lib/profileStorage";
import ProgressIndicator from "./ProgressIndicator";
import StepLanguage from "./StepLanguage";
import StepPersonal, { PersonalData } from "./StepPersonal";
import StepSocial, { SocialData } from "./StepSocial";
import StepBusiness, { BusinessData } from "./StepBusiness";
import StepFinancial, { FinancialData } from "./StepFinancial";
import StepReview from "./StepReview";

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Step 1: Language
  const handleSelectLanguage = (lang: Language) => {
    setFormData((prev) => ({ ...prev, selectedLanguage: lang }));
    setLanguage(lang);
  };

  // Step 2: Personal
  const handlePersonalChange = (field: keyof PersonalData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validatePersonal = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name || formData.name.trim().length === 0) {
      errs.name = t.errNameRequired;
    }
    const ageNum = Number(formData.age);
    if (!formData.age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      errs.age = t.errAgeInvalid;
    }
    if (!formData.gender) {
      errs.gender = t.errGenderRequired;
    }
    if (!formData.state) {
      errs.state = t.errStateRequired;
    }
    if (!formData.district || formData.district.trim().length === 0) {
      errs.district = t.errDistrictRequired;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3: Social
  const handleSocialChange = (field: keyof SocialData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validateSocial = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.category) {
      errs.category = t.errCategoryRequired;
    }
    if (!formData.disability) {
      errs.disability = t.errDisabilityRequired;
    }
    if (!formData.minority) {
      errs.minority = t.errMinorityRequired;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 4: Business
  const handleBusinessChange = (field: keyof BusinessData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validateBusiness = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.occupation || formData.occupation.trim().length === 0) {
      errs.occupation = t.errOccupationRequired;
    }
    if (!formData.businessStage) {
      errs.businessStage = t.errBusinessStageRequired;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 5: Financial
  const handleFinancialChange = (field: keyof FinancialData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validateFinancial = (): boolean => {
    const errs: Record<string, string> = {};
    const incomeNum = Number(formData.annualIncome);
    if (!formData.annualIncome || isNaN(incomeNum) || incomeNum < 0) {
      errs.annualIncome = t.errIncomeInvalid;
    }
    if (!formData.employmentStatus) {
      errs.employmentStatus = t.errEmploymentRequired;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Navigation handlers
  const handleNext = () => {
    let isValid = true;
    if (currentStep === 1) {
      isValid = true;
    } else if (currentStep === 2) {
      isValid = validatePersonal();
    } else if (currentStep === 3) {
      isValid = validateSocial();
    } else if (currentStep === 4) {
      isValid = validateBusiness();
    } else if (currentStep === 5) {
      isValid = validateFinancial();
    }

    if (isValid) {
      setErrors({});
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJumpToStep = (step: number) => {
    setErrors({});
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit and save profile
  const handleFinalSubmit = () => {
    // Perform full validation check across all steps
    if (!validatePersonal()) {
      setCurrentStep(2);
      return;
    }
    if (!validateSocial()) {
      setCurrentStep(3);
      return;
    }
    if (!validateBusiness()) {
      setCurrentStep(4);
      return;
    }
    if (!validateFinancial()) {
      setCurrentStep(5);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const finalProfile: UserProfile = {
        ...formData,
        profileCreated: true,
        selectedLanguage: language,
      };
      saveStoredProfile(finalProfile);
      setIsSubmitting(false);
      onComplete(finalProfile);
    }, 600);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 border border-orange-200 text-orange-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <span>SIH26092</span>
          <span>•</span>
          <span>Entrepreneur Onboarding</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight">
          {t.onboardingTitle}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-2">
          {t.onboardingSubtitle}
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={6}
          onStepClick={handleJumpToStep}
        />

        {currentStep === 1 && (
          <StepLanguage
            selectedLanguage={formData.selectedLanguage}
            onSelectLanguage={handleSelectLanguage}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <StepPersonal
            data={{
              name: formData.name,
              age: String(formData.age),
              gender: formData.gender,
              state: formData.state,
              district: formData.district,
            }}
            onChange={handlePersonalChange}
            onNext={handleNext}
            onBack={handleBack}
            errors={errors}
          />
        )}

        {currentStep === 3 && (
          <StepSocial
            data={{
              category: formData.category,
              disability: formData.disability,
              minority: formData.minority,
              locationType: formData.locationType,
              education: formData.education,
            }}
            onChange={handleSocialChange}
            onNext={handleNext}
            onBack={handleBack}
            errors={errors}
          />
        )}

        {currentStep === 4 && (
          <StepBusiness
            data={{
              occupation: formData.occupation,
              businessName: formData.businessName || "",
              businessStage: formData.businessStage,
              yearsInBusiness: formData.yearsInBusiness || "0",
            }}
            onChange={handleBusinessChange}
            onNext={handleNext}
            onBack={handleBack}
            errors={errors}
          />
        )}

        {currentStep === 5 && (
          <StepFinancial
            data={{
              annualIncome: String(formData.annualIncome),
              turnover: formData.turnover || "",
              employmentStatus: formData.employmentStatus,
            }}
            onChange={handleFinancialChange}
            onNext={handleNext}
            onBack={handleBack}
            errors={errors}
          />
        )}

        {currentStep === 6 && (
          <StepReview
            profile={formData}
            onEditSection={handleJumpToStep}
            onSubmit={handleFinalSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
