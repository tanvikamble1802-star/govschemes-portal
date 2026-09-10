"use client";

import { useLanguage } from "../../lib/LanguageContext";

export interface FinancialData {
  annualIncome: string;
  turnover: string;
  employmentStatus: string;
}

interface StepFinancialProps {
  data: FinancialData;
  onChange: (field: keyof FinancialData, value: string) => void;
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
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t.financialTitle}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {t.financialSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Annual Income */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelIncome} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-gray-500 font-semibold">₹</span>
            <input
              type="number"
              min="0"
              value={data.annualIncome}
              onChange={(e) => onChange("annualIncome", e.target.value)}
              placeholder={t.placeholderIncome}
              className={`w-full border rounded-lg pl-8 pr-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
                errors.annualIncome
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
              }`}
            />
          </div>
          {errors.annualIncome && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.annualIncome}</p>
          )}
        </div>

        {/* Approximate Annual Turnover */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelTurnover}
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-gray-500 font-semibold">₹</span>
            <input
              type="number"
              min="0"
              value={data.turnover}
              onChange={(e) => onChange("turnover", e.target.value)}
              placeholder={t.placeholderTurnover}
              className="w-full border border-gray-300 rounded-lg pl-8 pr-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-900"
            />
          </div>
        </div>

        {/* Employment Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            {t.labelEmploymentStatus} <span className="text-red-500">*</span>
          </label>
          <select
            value={data.employmentStatus}
            onChange={(e) => onChange("employmentStatus", e.target.value)}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-gray-900 bg-white focus:outline-none focus:ring-2 ${
              errors.employmentStatus
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-900"
            }`}
          >
            <option value="">{t.select}</option>
            <option value="self-employed">{t.empSelf}</option>
            <option value="salaried">{t.empSalaried}</option>
            <option value="daily-wage">{t.empDailyWage}</option>
            <option value="unemployed">{t.empUnemployed}</option>
            <option value="student">{t.empStudent}</option>
          </select>
          {errors.employmentStatus && (
            <p className="text-red-600 text-xs mt-1 font-medium">{errors.employmentStatus}</p>
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
