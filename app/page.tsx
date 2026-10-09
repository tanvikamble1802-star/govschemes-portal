"use client";

import ProfileSetup from "./components/onboarding/ProfileSetup";
import { UserProfile } from "./lib/profileStorage";
import { useLanguage } from "./lib/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const handleComplete = (profile: UserProfile, recommendations?: any[]) => {
    console.log("Profile completed successfully:", profile);
    window.location.href = "/schemes"; 
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
          {t.homeTitle || "Government Schemes Portal"}
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
          {t.homeSubtitle || "Complete your onboarding to find eligible welfare schemes."}
        </p>
      </div>

      <ProfileSetup onComplete={handleComplete} />

      {/* Why GovSchemes / Help section */}
      <section id="why-govschemes" className="max-w-4xl mx-auto mt-16 pt-12 border-t border-gray-200">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
            SIH26092
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-3">
            {t.whyGovSchemes || "Why Use GovSchemes?"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-sm mb-3">
              01
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t.why1Title}</h3>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{t.why1Desc}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm mb-3">
              02
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t.why2Title}</h3>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{t.why2Desc}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm mb-3">
              03
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t.why3Title}</h3>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{t.why3Desc}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm mb-3">
              04
            </div>
            <h3 className="text-sm font-bold text-gray-900">{t.why4Title}</h3>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{t.why4Desc}</p>
          </div>
        </div>
      </section>
    </main>
  );
}