"use client";

import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { Language } from "../lib/translations";
import { UserProfile, clearStoredProfile, saveStoredProfile } from "../lib/profileStorage";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onEditProfile: () => void;
  onProfileReset: () => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
  profile,
  onEditProfile,
  onProfileReset,
}: ProfileModalProps) {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<"profile" | "preferences">("profile");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (profile) {
      saveStoredProfile({
        ...profile,
        selectedLanguage: newLang,
      });
    }
  };

  const handleReset = () => {
    clearStoredProfile();
    setShowResetConfirm(false);
    onClose();
    onProfileReset();
  };

  const formatCurrency = (val: string | number | undefined) => {
    if (!val || val === "") return "—";
    const num = Number(val);
    if (isNaN(num)) return String(val);
    return `₹${num.toLocaleString("en-IN")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-base">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">
                {profile?.name || t.myProfile}
              </h2>
              <p className="text-xs text-blue-200">
                {profile?.state ? `${profile.state} • ${profile.category || ""}` : t.govSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-blue-800 hover:bg-blue-700 flex items-center justify-center text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`py-3 px-4 text-sm font-semibold border-b-2 cursor-pointer transition ${
              activeTab === "profile"
                ? "border-orange-500 text-orange-600 bg-white"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.myProfile}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preferences")}
            className={`py-3 px-4 text-sm font-semibold border-b-2 cursor-pointer transition ${
              activeTab === "preferences"
                ? "border-orange-500 text-orange-600 bg-white"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.preferences}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {activeTab === "profile" && profile && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div>
                  <span className="text-gray-500 block text-xs">{t.labelFullName}</span>
                  <span className="font-semibold text-gray-900">{profile.name}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{t.labelAge} / {t.labelGender}</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {profile.age} yrs • {profile.gender}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{t.labelState} & {t.labelDistrict}</span>
                  <span className="font-semibold text-gray-900">{profile.district}, {profile.state}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{t.labelCategory}</span>
                  <span className="font-semibold text-gray-900">{profile.category}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{t.labelOccupation}</span>
                  <span className="font-semibold text-gray-900">{profile.occupation}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{t.labelBusinessStage}</span>
                  <span className="font-semibold text-gray-900 capitalize">{profile.businessStage}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{t.labelIncome}</span>
                  <span className="font-semibold text-green-700">{formatCurrency(profile.annualIncome)}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">{t.labelDisability}</span>
                  <span className="font-semibold text-gray-900">
                    {profile.disability === "yes" ? t.yes : t.no}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEditProfile();
                  }}
                  className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span>{t.updateProfileBtn}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  {t.preferences} → {t.chooseLanguage}
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Changing the language updates all scheme details, guidelines, and home screens instantly.
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { code: "en" as Language, title: "English", sub: "English" },
                    { code: "hi" as Language, title: "हिन्दी", sub: "Hindi" },
                    { code: "mr" as Language, title: "मराठी", sub: "Marathi" },
                  ].map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleLanguageChange(item.code)}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                        language === item.code
                          ? "border-orange-500 bg-orange-50 font-bold text-orange-700 ring-2 ring-orange-200"
                          : "border-gray-200 hover:border-gray-300 text-gray-800"
                      }`}
                    >
                      <div className="text-base font-bold">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-red-600">
                      {t.resetProfile}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Clear current profile to simulate a brand-new user onboarding experience.
                    </p>
                  </div>
                  {!showResetConfirm ? (
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg transition cursor-pointer"
                    >
                      Reset
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="px-3 py-1.5 border border-gray-300 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-100 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                {showResetConfirm && (
                  <p className="text-xs text-red-600 mt-2">
                    {t.resetConfirm}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold rounded-full transition cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
