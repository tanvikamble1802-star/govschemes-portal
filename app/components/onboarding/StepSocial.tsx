"use client";

import { useLanguage } from "../../lib/LanguageContext";

export interface SocialData {
  category: string;
  disability: string;
  minority: string;
  locationType: string;
  education: string;
}

interface StepSocialProps {
  data: SocialData;
  onChange: (field: keyof SocialData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string>;
}

export default function StepSocial({
  data,
  onChange,
  onNext,
  onBack,
  errors,
}: StepSocialProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t.socialTitle}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {t.socialSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelCategory} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.category}
            onChange={(e) => onChange("category", e.target.value)}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.category
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          >
            <option value="">{t.select}</option>
            <option value="General">{t.catGeneral}</option>
            <option value="OBC">{t.catOBC}</option>
            <option value="SC">{t.catSC}</option>
            <option value="ST">{t.catST}</option>
            <option value="Other">{t.catOther}</option>
          </select>
          {errors.category && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.category}</p>
          )}
        </div>

        {/* Disability (PwD) */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelDisability} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.disability}
            onChange={(e) => onChange("disability", e.target.value)}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.disability
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          >
            <option value="">{t.select}</option>
            <option value="no">{t.no}</option>
            <option value="yes">{t.yes}</option>
          </select>
          {errors.disability && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.disability}</p>
          )}
        </div>

        {/* Minority Community */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelMinority} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.minority}
            onChange={(e) => onChange("minority", e.target.value)}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.minority
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          >
            <option value="">{t.select}</option>
            <option value="no">{t.no}</option>
            <option value="yes">{t.yes}</option>
          </select>
          {errors.minority && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.minority}</p>
          )}
        </div>

        {/* Location Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelLocation} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.locationType}
            onChange={(e) => onChange("locationType", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-900"
          >
            <option value="rural">{t.locRural}</option>
            <option value="urban">{t.locUrban}</option>
          </select>
        </div>

        {/* Education Level */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelEducation} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.education}
            onChange={(e) => onChange("education", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-900"
          >
            <option value="none">{t.eduNone}</option>
            <option value="10th">{t.edu10}</option>
            <option value="12th">{t.edu12}</option>
            <option value="diploma">{t.eduDiploma}</option>
            <option value="graduate">{t.eduGraduate}</option>
            <option value="postgraduate">{t.eduPostGraduate}</option>
          </select>
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
