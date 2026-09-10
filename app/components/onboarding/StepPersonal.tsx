"use client";

import { useLanguage } from "../../lib/LanguageContext";

export interface PersonalData {
  name: string;
  age: string;
  gender: string;
  state: string;
  district: string;
}

interface StepPersonalProps {
  data: PersonalData;
  onChange: (field: keyof PersonalData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string>;
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi NCR",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
];

export default function StepPersonal({
  data,
  onChange,
  onNext,
  onBack,
  errors,
}: StepPersonalProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t.personalTitle}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {t.personalSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelFullName} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder={t.placeholderFullName}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.name}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelAge} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="18"
            max="100"
            value={data.age}
            onChange={(e) => onChange("age", e.target.value)}
            placeholder={t.placeholderAge}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.age
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          />
          {errors.age && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.age}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelGender} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.gender
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          >
            <option value="">{t.select}</option>
            <option value="male">{t.genderMale}</option>
            <option value="female">{t.genderFemale}</option>
            <option value="other">{t.genderOther}</option>
          </select>
          {errors.gender && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.gender}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelState} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.state}
            onChange={(e) => onChange("state", e.target.value)}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.state
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          >
            <option value="">{t.selectState}</option>
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.state}</p>
          )}
        </div>

        {/* District / City */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelDistrict} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.district}
            onChange={(e) => onChange("district", e.target.value)}
            placeholder={t.placeholderDistrict}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.district
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          />
          {errors.district && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.district}</p>
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
