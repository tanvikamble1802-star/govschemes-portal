"use client";

import { UserProfile } from "../../lib/profileStorage";
import { useLanguage } from "../../lib/LanguageContext";
import { getLocalizedStateName } from "../../lib/translations";

interface StepReviewProps {
  profile: UserProfile;
  onEditSection: (step: number) => void;
  onSubmit: () => void;
}

export default function StepReview({
  profile,
  onEditSection,
  onSubmit,
}: StepReviewProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{t.reviewTitle}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {t.reviewSubtitle}
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4">
        {/* Personal Information Summary */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{t.sectionPersonal}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {profile.name || "N/A"}, {profile.age ? `${profile.age} ${t.years1Year?.replace("1", "").trim() || "yrs"}` : "N/A"}, {profile.gender || "N/A"}
            </p>
            <p className="text-xs text-gray-500">
              {profile.district || "N/A"}, {getLocalizedStateName(profile.state, language) || profile.state || "N/A"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEditSection(2)}
            className="text-xs text-blue-900 hover:text-orange-500 font-semibold underline cursor-pointer"
          >
            {t.btnEdit}
          </button>
        </div>

        {/* Social Background Summary */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{t.sectionSocial}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {t.labelCategory}: {profile.category || "N/A"} | {t.labelLocation}: {profile.locationType === "rural" ? t.locRural : t.locUrban}
            </p>
            <p className="text-xs text-gray-500">
              PwD: {profile.disability === "yes" ? t.yes : t.no} | {t.labelMinority}: {profile.minority === "yes" ? t.yes : t.no}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEditSection(3)}
            className="text-xs text-blue-900 hover:text-orange-500 font-semibold underline cursor-pointer"
          >
            {t.btnEdit}
          </button>
        </div>

        {/* Business Details Summary */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{t.sectionBusiness}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {profile.occupation || "N/A"} ({profile.businessStage || "N/A"})
            </p>
            <p className="text-xs text-gray-500">
              {t.labelBusinessName}: {profile.businessName || "—"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEditSection(4)}
            className="text-xs text-blue-900 hover:text-orange-500 font-semibold underline cursor-pointer"
          >
            {t.btnEdit}
          </button>
        </div>

        {/* Financial Details Summary */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{t.sectionFinancial}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {t.labelIncome}: ₹{profile.annualIncome || "N/A"}
            </p>
            <p className="text-xs text-gray-500">
              {t.labelEmploymentStatus}: {profile.employmentStatus || "N/A"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEditSection(5)}
            className="text-xs text-blue-900 hover:text-orange-500 font-semibold underline cursor-pointer"
          >
            {t.btnEdit}
          </button>
        </div>
      </div>

      {/* Navigation & Submit Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onEditSection(5)}
          className="px-5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
        >
          {t.btnBack}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
        >
          <span>{t.confirmFindSchemes || t.btnSaveComplete}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
