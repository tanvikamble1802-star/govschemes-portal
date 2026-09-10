"use client";

import { useLanguage } from "../../lib/LanguageContext";

export interface BusinessData {
  occupation: string;
  businessName: string;
  businessStage: string;
  yearsInBusiness: string;
}

interface StepBusinessProps {
  data: BusinessData;
  onChange: (field: keyof BusinessData, value: string) => void;
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

  const isPlanning = data.businessStage === "planning";

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t.businessTitle}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {t.businessSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Occupation / Business Type */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelOccupation} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.occupation}
            onChange={(e) => onChange("occupation", e.target.value)}
            placeholder={t.placeholderOccupation}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.occupation
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          />
          {errors.occupation && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.occupation}</p>
          )}
        </div>

        {/* Business Stage */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelBusinessStage} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.businessStage}
            onChange={(e) => onChange("businessStage", e.target.value)}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.businessStage
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          >
            <option value="">{t.select}</option>
            <option value="planning">{t.stagePlanning}</option>
            <option value="new">{t.stageNew}</option>
            <option value="existing">{t.stageExisting}</option>
            <option value="expanding">{t.stageExpanding}</option>
          </select>
          {errors.businessStage && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.businessStage}</p>
          )}
        </div>

        {/* Business Name (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelBusinessName}
          </label>
          <input
            type="text"
            value={data.businessName}
            onChange={(e) => onChange("businessName", e.target.value)}
            placeholder={t.placeholderBusinessName}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-900"
          />
        </div>

        {/* Years in Business */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelYearsInBusiness}
          </label>
          <select
            value={isPlanning ? "0" : data.yearsInBusiness}
            disabled={isPlanning}
            onChange={(e) => onChange("yearsInBusiness", e.target.value)}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              isPlanning ? "bg-gray-100 cursor-not-allowed opacity-75" : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          >
            <option value="0">{t.yearsNone}</option>
            <option value="1-2">{t.years1to2}</option>
            <option value="3-5">{t.years3to5}</option>
            <option value="5+">{t.years5plus}</option>
          </select>
          {isPlanning && (
            <p className="text-gray-500 text-xs mt-1">
              Automatically set to 0 years for new idea stage.
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-6 py-2.5 rounded-full text-sm transition cursor-pointer"
        >
          {t.btnBack}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-2.5 rounded-full text-sm transition shadow-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <span>{t.btnNext}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
