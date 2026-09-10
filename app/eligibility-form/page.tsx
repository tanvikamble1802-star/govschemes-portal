"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../lib/LanguageContext";
import { getStoredProfile, UserProfile } from "../lib/profileStorage";
import ProfileSetup from "../components/onboarding/ProfileSetup";

export default function EligibilityForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProfile(getStoredProfile());
  }, []);

  const formatCurrency = (val: string | number | undefined) => {
    if (!val || val === "") return "—";
    const num = Number(val);
    if (isNaN(num)) return String(val);
    return `₹${num.toLocaleString("en-IN")}`;
  };

  if (!mounted) {
    return (
      <main className="flex-1 bg-gray-50 flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-orange-500 rounded-full animate-spin" />
      </main>
    );
  }

  // If no profile exists, guide user to complete onboarding first
  if (!profile?.profileCreated) {
    return (
      <main className="flex-1 bg-gray-50 py-10 px-4 sm:px-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {t.onboardingTitle}
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Please create your entrepreneur profile to enable AI-powered scheme matching.
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full text-base transition shadow-sm cursor-pointer"
          >
            Create Profile Now
          </button>
        </div>
      </main>
    );
  }

  // If user clicked to edit/update details
  if (isEditing) {
    return (
      <main className="flex-1 bg-gray-50 py-10 px-4 sm:px-6">
        <ProfileSetup
          initialProfile={profile}
          initialStep={2}
          onComplete={(updated) => {
            setProfile(updated);
            setIsEditing(false);
          }}
        />
      </main>
    );
  }

  // Check if required fields are present
  const missingFields: string[] = [];
  if (!profile.name) missingFields.push(t.labelFullName);
  if (!profile.age) missingFields.push(t.labelAge);
  if (!profile.gender) missingFields.push(t.labelGender);
  if (!profile.state) missingFields.push(t.labelState);
  if (!profile.category) missingFields.push(t.labelCategory);
  if (!profile.occupation) missingFields.push(t.labelOccupation);
  if (!profile.annualIncome) missingFields.push(t.labelIncome);
  if (!profile.businessStage) missingFields.push(t.labelBusinessStage);

  return (
    <main className="flex-1 bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        {missingFields.length > 0 ? (
          /* Profile Missing Information State */
          <div className="space-y-6 text-left">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
              <h2 className="font-bold text-base">
                Complete Your Profile
              </h2>
              <p className="text-xs text-amber-800 mt-1">
                A few details are needed to accurately match government schemes for you:
              </p>
              <ul className="list-disc list-inside text-xs mt-2 space-y-1 font-medium text-amber-900">
                {missingFields.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-full text-base transition shadow-sm cursor-pointer"
            >
              Complete Missing Information
            </button>
          </div>
        ) : (
          /* Profile Connected & Ready for Matching */
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center border-b border-gray-100 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 border border-green-200 text-green-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>{t.profileConnected}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-blue-900">
                {t.formTitle}
              </h1>
              <p className="text-gray-600 text-sm mt-1 max-w-md mx-auto">
                {t.profileConnectedDesc}
              </p>
            </div>

            {/* Profile Summary Card */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200/70 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-sm">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{profile.name}</h3>
                    <p className="text-xs text-gray-500">
                      {profile.district ? `${profile.district}, ` : ""}{profile.state}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-orange-600 hover:text-orange-700 text-xs font-bold hover:underline cursor-pointer"
                >
                  {t.updateProfileBtn}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <span className="text-gray-500 block">{t.labelCategory}</span>
                  <span className="font-semibold text-gray-900">{profile.category}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">{t.labelOccupation}</span>
                  <span className="font-semibold text-gray-900 truncate block">{profile.occupation}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">{t.labelBusinessStage}</span>
                  <span className="font-semibold text-gray-900 capitalize">{profile.businessStage}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">{t.labelIncome}</span>
                  <span className="font-semibold text-green-700">{formatCurrency(profile.annualIncome)}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">{t.labelDisability}</span>
                  <span className="font-semibold text-gray-900">
                    {profile.disability === "yes" ? t.yes : t.no}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">{t.labelMinority}</span>
                  <span className="font-semibold text-gray-900">
                    {profile.minority === "yes" ? t.yes : t.no}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <Link
                href="/loading-results"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-full text-base transition shadow-md flex items-center justify-center gap-2"
              >
                <span>{t.proceedWithProfile}</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <div className="flex justify-between items-center text-xs text-gray-500 px-1 pt-1">
                <Link href="/" className="text-blue-900 hover:underline">
                  ← Back to Home
                </Link>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-gray-600 hover:text-gray-900 hover:underline cursor-pointer"
                >
                  Edit Profile Information
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}