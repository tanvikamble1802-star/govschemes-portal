"use client";

import { useLanguage } from "../../lib/LanguageContext";
import { UserProfile } from "../../lib/profileStorage";

interface StepReviewProps {
  profile: Partial<UserProfile>;
  onEditSection: (step: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function StepReview({
  profile,
  onEditSection,
  onSubmit,
  onBack,
  isSubmitting,
}: StepReviewProps) {
  const { t, language } = useLanguage();

  const getLanguageLabel = () => {
    if (language === "hi") return "हिन्दी (Hindi)";
    if (language === "mr") return "मराठी (Marathi)";
    return "English";
  };

  const formatCurrency = (val: string | number | undefined) => {
    if (!val || val === "") return "—";
    const num = Number(val);
    if (isNaN(num)) return String(val);
    return `₹${num.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {t.reviewTitle}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {t.reviewSubtitle}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-900 rounded-full text-xs font-semibold self-start sm:self-center">
            <span>{getLanguageLabel()}</span>
            <button
              type="button"
              onClick={() => onEditSection(1)}
              className="text-orange-600 hover:underline font-bold ml-1 cursor-pointer"
            >
              {t.editBtn}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Personal Details Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center text-xs font-bold">1</span>
              {t.sectionPersonal}
            </h3>
            <button
              type="button"
              onClick={() => onEditSection(2)}
              className="text-orange-600 hover:text-orange-700 text-xs font-bold hover:underline cursor-pointer"
            >
              {t.editBtn}
            </button>
          </div>
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-gray-500">{t.labelFullName}:</dt>
            <dd className="font-semibold text-gray-900">{profile.name || "—"}</dd>

            <dt className="text-gray-500">{t.labelAge}:</dt>
            <dd className="font-semibold text-gray-900">{profile.age ? `${profile.age} yrs` : "—"}</dd>

            <dt className="text-gray-500">{t.labelGender}:</dt>
            <dd className="font-semibold text-gray-900 capitalize">{profile.gender || "—"}</dd>

            <dt className="text-gray-500">{t.labelState}:</dt>
            <dd className="font-semibold text-gray-900">{profile.state || "—"}</dd>

            <dt className="text-gray-500">{t.labelDistrict}:</dt>
            <dd className="font-semibold text-gray-900">{profile.district || "—"}</dd>
          </dl>
        </div>

        {/* Social & Eligibility Details Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center text-xs font-bold">2</span>
              {t.sectionSocial}
            </h3>
            <button
              type="button"
              onClick={() => onEditSection(3)}
              className="text-orange-600 hover:text-orange-700 text-xs font-bold hover:underline cursor-pointer"
            >
              {t.editBtn}
            </button>
          </div>
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-gray-500">{t.labelCategory}:</dt>
            <dd className="font-semibold text-gray-900">{profile.category || "—"}</dd>

            <dt className="text-gray-500">{t.labelDisability}:</dt>
            <dd className="font-semibold text-gray-900 capitalize">
              {profile.disability === "yes" ? t.yes : t.no}
            </dd>

            <dt className="text-gray-500">{t.labelMinority}:</dt>
            <dd className="font-semibold text-gray-900 capitalize">
              {profile.minority === "yes" ? t.yes : t.no}
            </dd>

            <dt className="text-gray-500">{t.labelLocation}:</dt>
            <dd className="font-semibold text-gray-900 capitalize">{profile.locationType || "—"}</dd>

            <dt className="text-gray-500">{t.labelEducation}:</dt>
            <dd className="font-semibold text-gray-900 capitalize">{profile.education || "—"}</dd>
          </dl>
        </div>

        {/* Business Details Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center text-xs font-bold">3</span>
              {t.sectionBusiness}
            </h3>
            <button
              type="button"
              onClick={() => onEditSection(4)}
              className="text-orange-600 hover:text-orange-700 text-xs font-bold hover:underline cursor-pointer"
            >
              {t.editBtn}
            </button>
          </div>
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-gray-500">{t.labelOccupation}:</dt>
            <dd className="font-semibold text-gray-900">{profile.occupation || "—"}</dd>

            <dt className="text-gray-500">{t.labelBusinessStage}:</dt>
            <dd className="font-semibold text-gray-900 capitalize">{profile.businessStage || "—"}</dd>

            <dt className="text-gray-500">{t.labelBusinessName}:</dt>
            <dd className="font-semibold text-gray-900">{profile.businessName || "Not specified"}</dd>

            <dt className="text-gray-500">{t.labelYearsInBusiness}:</dt>
            <dd className="font-semibold text-gray-900">
              {profile.yearsInBusiness ? `${profile.yearsInBusiness} yrs` : "0 yrs"}
            </dd>
          </dl>
        </div>

        {/* Financial Details Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-blue-200 transition">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center text-xs font-bold">4</span>
              {t.sectionFinancial}
            </h3>
            <button
              type="button"
              onClick={() => onEditSection(5)}
              className="text-orange-600 hover:text-orange-700 text-xs font-bold hover:underline cursor-pointer"
            >
              {t.editBtn}
            </button>
          </div>
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-gray-500">{t.labelIncome}:</dt>
            <dd className="font-semibold text-green-700">
              {formatCurrency(profile.annualIncome)} / yr
            </dd>

            <dt className="text-gray-500">{t.labelTurnover}:</dt>
            <dd className="font-semibold text-gray-900">
              {profile.turnover ? formatCurrency(profile.turnover) : "Not applicable"}
            </dd>

            <dt className="text-gray-500">{t.labelEmploymentStatus}:</dt>
            <dd className="font-semibold text-gray-900 capitalize">
              {profile.employmentStatus || "—"}
            </dd>
          </dl>
        </div>
      </div>

      {/* Trust & Transparency Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-900">
        <p className="font-semibold">Privacy & Eligibility Protection</p>
        <p className="text-blue-800 mt-0.5">
          Your profile details are stored securely on your browser. No Aadhaar, PAN, or bank credentials are requested. Your information will solely be matched against official scheme rules.
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-6 py-2.5 rounded-full text-sm transition cursor-pointer disabled:opacity-50"
        >
          {t.btnBack}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full text-base transition shadow-md inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{t.savingProfile}</span>
            </>
          ) : (
            <>
              <span>{t.createProfileBtn}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
