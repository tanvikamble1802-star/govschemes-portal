"use client";

import { useLanguage } from "../../lib/LanguageContext";
import { INDIAN_STATES } from "../../lib/translations";

export interface PersonalData {
  name: string;
  age: string;
  gender: string;
  state: string;
  district: string;
  category: string;
  disability: string;
  minority: string;
  locationType: string;
  education: string;
  occupation: string;
}

interface StepPersonalProps {
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string>;
}

export default function StepPersonal({
  data,
  onChange,
  onNext,
  onBack,
  errors,
}: StepPersonalProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{t.personalTitle}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {t.personalSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelFullName} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder={t.placeholderFullName}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelAge} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={data.age || ""}
            onChange={(e) => onChange("age", e.target.value)}
            placeholder={t.placeholderAge}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm"
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelGender} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.gender || ""}
            onChange={(e) => onChange("gender", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm cursor-pointer"
          >
            <option value="">{t.selectGender || "Select Gender"}</option>
            <option value="female">{t.genderFemale}</option>
            <option value="male">{t.genderMale}</option>
            <option value="transgender">{t.genderOther}</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelState} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.state || ""}
            onChange={(e) => onChange("state", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm cursor-pointer"
          >
            <option value="">{t.selectState}</option>
            {INDIAN_STATES.map((s) => (
              <option key={s.id} value={s.id}>
                {s[language] || s.en}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>

        {/* District */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelDistrict} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.district || ""}
            onChange={(e) => onChange("district", e.target.value)}
            placeholder={t.placeholderDistrict}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm"
          />
          {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
        </div>
      </div>

      {/* Navigation Buttons */}
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