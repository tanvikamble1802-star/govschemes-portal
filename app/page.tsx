"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "./lib/LanguageContext";
import { getStoredProfile, UserProfile } from "./lib/profileStorage";
import ProfileSetup from "./components/onboarding/ProfileSetup";

export default function Home() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = getStoredProfile();
    setProfile(existing);

    const handleProfileUpdate = () => {
      setProfile(getStoredProfile());
      setIsEditingProfile(false);
    };

    const handleEditRequest = () => {
      setIsEditingProfile(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("govschemes_profile_updated", handleProfileUpdate);
    window.addEventListener("govschemes_edit_profile", handleEditRequest);
    return () => {
      window.removeEventListener("govschemes_profile_updated", handleProfileUpdate);
      window.removeEventListener("govschemes_edit_profile", handleEditRequest);
    };
  }, []);

  const handleProfileComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setIsEditingProfile(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // During SSR / initial client mount, render a smooth placeholder to prevent hydration flicker
  if (!mounted) {
    return (
      <main className="flex-1 bg-gray-50 flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-orange-500 rounded-full animate-spin" />
      </main>
    );
  }

  // 1. FIRST-TIME USER FLOW OR EDITING PROFILE
  // If user does not have a profile, or clicked edit profile, show Create Profile onboarding screen
  if (!profile?.profileCreated || isEditingProfile) {
    return (
      <main className="flex-1 bg-gray-50 py-10 px-4 sm:px-6">
        <ProfileSetup
          initialProfile={profile}
          initialStep={isEditingProfile ? 2 : 1}
          onComplete={handleProfileComplete}
        />
      </main>
    );
  }

  // 2. RETURNING USER FLOW - PERSONALIZED GOVSCHEMES HOME / DASHBOARD
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16 sm:py-20 px-6 text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-transparent pointer-events-none" />

        <div className="relative max-w-4xl mx-auto z-10">
          {/* Personalized Greeting & Status Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-800/80 border border-blue-700/80 px-4 py-1.5 rounded-full text-xs font-semibold text-orange-300 mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>{t.verifiedBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            {t.welcomeHero.replace("{name}", profile.name)}
          </h1>

          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            {t.welcomeSubtitle}
          </p>

          {/* Profile Quick Summary Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            <span className="bg-blue-800/70 border border-blue-700 px-3 py-1 rounded-full text-xs font-medium text-blue-200">
              {profile.district ? `${profile.district}, ` : ""}{profile.state}
            </span>
            <span className="bg-blue-800/70 border border-blue-700 px-3 py-1 rounded-full text-xs font-medium text-blue-200">
              {profile.category} Category
            </span>
            <span className="bg-blue-800/70 border border-blue-700 px-3 py-1 rounded-full text-xs font-medium text-blue-200">
              {profile.occupation}
            </span>
            {profile.disability === "yes" && (
              <span className="bg-blue-800/70 border border-blue-700 px-3 py-1 rounded-full text-xs font-medium text-orange-200">
                PwD Benefits
              </span>
            )}
            {profile.gender === "female" && (
              <span className="bg-blue-800/70 border border-blue-700 px-3 py-1 rounded-full text-xs font-medium text-pink-200">
                Women Entrepreneur
              </span>
            )}
          </div>

          {/* Primary CTA and Secondary Profile Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/loading-results"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full text-lg shadow-lg hover:shadow-orange-500/20 transition inline-flex items-center justify-center gap-2"
            >
              <span>{t.heroCta}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={() => setIsEditingProfile(true)}
              className="w-full sm:w-auto bg-blue-800/80 hover:bg-blue-800 text-blue-100 hover:text-white font-semibold px-6 py-3 rounded-full text-sm border border-blue-700 transition cursor-pointer"
            >
              {t.viewEditProfile}
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          {t.howItWorks}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 border border-gray-200 rounded-xl shadow-xs hover:shadow-md transition text-left">
            <div className="text-orange-500 text-3xl font-extrabold mb-3">01</div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              {t.step1CardTitle}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.step1CardDesc}
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl shadow-xs hover:shadow-md transition text-left">
            <div className="text-orange-500 text-3xl font-extrabold mb-3">02</div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              {t.step2CardTitle}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.step2CardDesc}
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl shadow-xs hover:shadow-md transition text-left">
            <div className="text-orange-500 text-3xl font-extrabold mb-3">03</div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              {t.step3CardTitle}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.step3CardDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="why-govschemes" className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          {t.whyGovSchemes}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          <div className="bg-white p-6 rounded-xl shadow-xs border-l-4 border-blue-900 hover:shadow-md transition">
            <h3 className="font-bold mb-1.5 text-gray-900 text-base">
              {t.why1Title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.why1Desc}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-xs border-l-4 border-blue-900 hover:shadow-md transition">
            <h3 className="font-bold mb-1.5 text-gray-900 text-base">
              {t.why2Title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.why2Desc}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-xs border-l-4 border-blue-900 hover:shadow-md transition">
            <h3 className="font-bold mb-1.5 text-gray-900 text-base">
              {t.why3Title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.why3Desc}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-xs border-l-4 border-blue-900 hover:shadow-md transition">
            <h3 className="font-bold mb-1.5 text-gray-900 text-base">
              {t.why4Title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.why4Desc}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}