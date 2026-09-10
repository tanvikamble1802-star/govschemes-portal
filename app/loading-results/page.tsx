"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../lib/LanguageContext";
import { getStoredProfile, UserProfile } from "../lib/profileStorage";

export default function LoadingResults() {
  const router = useRouter();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stage, setStage] = useState<number>(1);
  const [progress, setProgress] = useState<number>(15);

  useEffect(() => {
    const p = getStoredProfile();
    setProfile(p);

    // Sequence stages over ~2.8 seconds
    const t1 = setTimeout(() => {
      setStage(2);
      setProgress(45);
    }, 700);

    const t2 = setTimeout(() => {
      setStage(3);
      setProgress(75);
    }, 1500);

    const t3 = setTimeout(() => {
      setStage(4);
      setProgress(95);
    }, 2200);

    const t4 = setTimeout(() => {
      setProgress(100);
      router.push("/results");
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [router]);

  const profileSummary = profile?.name
    ? `${profile.name} • ${profile.category || "All Categories"}, ${profile.state || "India"}`
    : "Verified Entrepreneur";

  const stages = [
    {
      id: 1,
      text: t.matchStep1
        .replace("{name}", profile?.name || "Entrepreneur")
        .replace("{category}", profile?.category || "Profile")
        .replace("{state}", profile?.state || "India"),
    },
    {
      id: 2,
      text: t.matchStep2,
    },
    {
      id: 3,
      text: t.matchStep3,
    },
    {
      id: 4,
      text: t.matchStep4,
    },
  ];

  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-gray-50 py-16 px-4 sm:px-6">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10 text-center">
        {/* Animated matching badge */}
        <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-ping opacity-25" />
          <div className="w-16 h-16 border-4 border-blue-900 border-t-orange-500 rounded-full animate-spin" />
        </div>

        {/* Headings */}
        <h1 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">
          {t.analyzingTitle}
        </h1>
        <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
          {t.analyzingSubtitle}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-8 border border-gray-200">
          <div
            className="bg-gradient-to-r from-blue-900 to-orange-500 h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Checklist Stages */}
        <div className="space-y-3.5 text-left max-w-md mx-auto">
          {stages.map((st) => {
            const isDone = stage > st.id || progress === 100;
            const isCurrent = stage === st.id && progress < 100;

            return (
              <div
                key={st.id}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 ${
                  isDone
                    ? "bg-green-50/70 border-green-200 text-green-900"
                    : isCurrent
                    ? "bg-blue-50/70 border-blue-300 text-blue-900 shadow-xs"
                    : "bg-gray-50/50 border-gray-200 text-gray-400 opacity-60"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400">
                      •
                    </div>
                  )}
                </div>
                <div className="text-xs sm:text-sm font-medium leading-tight">
                  {st.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}