"use client";

import { UserProfile } from "../../lib/profileStorage";
import { useLanguage } from "../../lib/LanguageContext";

interface StepFinancialProps {
  data: UserProfile;
  onChange: (field: keyof UserProfile, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string>;
}

export default function StepFinancial({
  data,
  onChange,
  onNext,
  onBack,
  errors,
}: StepFinancialProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{t.financialTitle}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {t.financialSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Annual Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelIncome} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={data.annualIncome || ""}
            onChange={(e) => onChange("annualIncome", e.target.value)}
            placeholder={t.placeholderIncome}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm"
          />
          {errors.annualIncome && <p className="text-red-500 text-xs mt-1">{errors.annualIncome}</p>}
        </div>

        {/* Employment Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelEmploymentStatus} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.employmentStatus || ""}
            onChange={(e) => onChange("employmentStatus", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm cursor-pointer"
          >
            <option value="">{t.selectStatus || "Select Status"}</option>
            <option value="self-employed">{t.empSelf}</option>
            <option value="unemployed">{t.empUnemployed}</option>
            <option value="daily-wage">{t.empDailyWage}</option>
            <option value="salaried">{t.empSalaried}</option>
          </select>
          {errors.employmentStatus && <p className="text-red-500 text-xs mt-1">{errors.employmentStatus}</p>}
        </div>

        {/* Business Turnover (Optional) */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.labelTurnover}
          </label>
          <input
            type="number"
            value={data.turnover || ""}
            onChange={(e) => onChange("turnover", e.target.value)}
            placeholder={t.placeholderTurnover}
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
          {t.reviewProfileBtn || t.btnNext}
        </button>
      </div>
    </div>
  );
}