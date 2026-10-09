"use client";

import { UserProfile } from "../../lib/profileStorage";
import { useLanguage } from "../../lib/LanguageContext";

interface StepBusinessProps {
  data: UserProfile;
  onChange: (field: keyof UserProfile, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string>;
}

export default function StepBusiness({
  data,
  onChange,
  onNext,
  onBack,
  errors,
}: StepBusinessProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{t.businessTitle}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {t.businessSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Occupation / Business Type */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelOccupation} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.occupation || ""}
            onChange={(e) => onChange("occupation", e.target.value)}
            placeholder={t.placeholderOccupation}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm"
          />
          {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
        </div>

        {/* Business Stage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelBusinessStage} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.businessStage || ""}
            onChange={(e) => onChange("businessStage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm cursor-pointer"
          >
            <option value="">{t.selectStage || "Select Stage"}</option>
            <option value="idea">{t.stagePlanning || t.stageIdea}</option>
            <option value="startup">{t.stageNew || t.stageStartup}</option>
            <option value="established">{t.stageExisting || t.stageEstablished}</option>
            <option value="expanding">{t.stageExpanding}</option>
          </select>
          {errors.businessStage && <p className="text-red-500 text-xs mt-1">{errors.businessStage}</p>}
        </div>

        {/* Years in Business */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelYearsInBusiness}
          </label>
          <select
            value={data.yearsInBusiness || "0"}
            onChange={(e) => onChange("yearsInBusiness", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm cursor-pointer"
          >
            <option value="0">{t.yearsNone}</option>
            <option value="1">{t.years1Year || t.years1to2}</option>
            <option value="2">{t.years2to3Years || t.years3to5}</option>
            <option value="5">{t.years5plus}</option>
          </select>
        </div>

        {/* Business Name */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelBusinessName}
          </label>
          <input
            type="text"
            value={data.businessName || ""}
            onChange={(e) => onChange("businessName", e.target.value)}
            placeholder={t.placeholderBusinessName}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
        >
          {t.btnBack}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition cursor-pointer"
        >
          {t.btnNext}
        </button>
      </div>
    </div>
  );
}