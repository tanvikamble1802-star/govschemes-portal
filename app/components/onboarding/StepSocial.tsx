"use client";

import { UserProfile } from "../../lib/profileStorage";
import { useLanguage } from "../../lib/LanguageContext";

interface StepSocialProps {
  data: UserProfile;
  onChange: (field: keyof UserProfile, value: string) => void;
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
      <div>
        <h2 className="text-xl font-bold text-gray-900">{t.socialTitle}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {t.socialSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelCategory} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.category || ""}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm cursor-pointer"
          >
            <option value="">{t.selectCategory || "Select Category"}</option>
            <option value="SC">{t.catSC}</option>
            <option value="ST">{t.catST}</option>
            <option value="OBC">{t.catOBC}</option>
            <option value="General">{t.catGeneral}</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        {/* Location Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelLocation} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.locationType || "rural"}
            onChange={(e) => onChange("locationType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm cursor-pointer"
          >
            <option value="rural">{t.locRural}</option>
            <option value="urban">{t.locUrban}</option>
          </select>
        </div>

        {/* Disability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelDisability}
          </label>
          <select
            value={data.disability || "no"}
            onChange={(e) => onChange("disability", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm cursor-pointer"
          >
            <option value="no">{t.no}</option>
            <option value="yes">{t.yes}</option>
          </select>
        </div>

        {/* Minority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelMinority}
          </label>
          <select
            value={data.minority || "no"}
            onChange={(e) => onChange("minority", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm cursor-pointer"
          >
            <option value="no">{t.no}</option>
            <option value="yes">{t.yes}</option>
          </select>
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