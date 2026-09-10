"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { schemes, Scheme } from "@/src/data/schemes";

const STORAGE_KEY = "govschemes_saved_ids";

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Load saved IDs on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedIds(Array.from(new Set(parsed)));
        }
      }
    } catch (e) {
      console.error("Failed to read saved schemes:", e);
    }
    setIsClientLoaded(true);
  }, []);

  // Remove / unsave scheme
  const handleRemove = (id: string) => {
    const updated = savedIds.filter((item) => item !== id);
    setSavedIds(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update saved schemes in localStorage:", e);
    }
  };

  // Clear all saved schemes
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all saved schemes?")) {
      setSavedIds([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error("Failed to clear saved schemes:", e);
      }
    }
  };

  const savedSchemes = schemes.filter((s) => savedIds.includes(s.id));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col">
      {/* Official Government Top Bar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        {/* Subtle Indian Tricolor top accent strip */}
        <div className="flex h-1 w-full">
          <div className="w-1/3 bg-[#FF6B00]" />
          <div className="w-1/3 bg-white" />
          <div className="w-1/3 bg-[#138808]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#173B8F] text-white shadow-sm">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold tracking-tight text-[#0F2557]">
                    GovSchemes
                  </span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#173B8F]">
                    Saved Schemes
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500">
                  Government Schemes Portal for Marginalized Entrepreneurs
                </p>
              </div>
            </div>

            {/* Top Navigation Links */}
            <nav className="flex items-center gap-2.5">
              <Link
                href="/schemes"
                className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                Find Schemes
              </Link>
              <Link
                href="/assistant"
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-[#173B8F] hover:bg-blue-100 transition shadow-2xs"
              >
                <svg
                  className="h-3.5 w-3.5 text-[#173B8F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span>AI Assistant</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#173B8F] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/schemes" className="hover:text-[#173B8F] transition-colors">
            Eligible Schemes
          </Link>
          <span>/</span>
          <span className="text-[#173B8F] font-semibold">Saved Schemes</span>
        </nav>

        {/* Action Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-0.5 text-xs font-bold text-[#FF6B00]">
              <span>🔖 Bookmarked Collection</span>
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F2557]">
              Saved Schemes
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Review your bookmarked schemes and manage your application preparation.
            </p>
          </div>

          {savedSchemes.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[#173B8F]">
                {savedSchemes.length} saved
              </span>
              <button
                type="button"
                onClick={handleClearAll}
                className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-700 transition"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Grid of Saved Schemes */}
        {savedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  {/* Badges & Unsave */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border ${
                          scheme.type === "Central Government"
                            ? "bg-blue-50 text-[#173B8F] border-blue-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        {scheme.type}
                      </span>

                      {scheme.isDemo && (
                        <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                          DEMO DATA
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(scheme.id)}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition"
                      title="Remove from saved"
                    >
                      <svg
                        className="h-3.5 w-3.5 text-slate-400 hover:text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Scheme Name & Ministry */}
                  <div className="mt-3.5">
                    <h2 className="text-lg font-bold text-[#0F2557]">
                      {scheme.name}
                    </h2>
                    {scheme.fullName && (
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {scheme.fullName}
                      </p>
                    )}
                    {scheme.ministry && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        {scheme.ministry}
                      </p>
                    )}
                  </div>

                  {/* Match Score */}
                  <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-xs text-slate-600 font-medium">
                      Eligibility Match
                    </span>
                    <span className="rounded bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-xs font-bold">
                      {scheme.matchScore}% Match
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {scheme.description}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/assistant?scheme=${scheme.id}`}
                    className="text-xs font-bold text-[#173B8F] hover:underline"
                  >
                    Ask Assistant ↗
                  </Link>

                  <Link
                    href={`/schemes/${scheme.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FF6B00] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#E05D00] transition"
                  >
                    <span>View Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <svg
                className="h-8 w-8 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-800">
              You haven&apos;t saved any schemes yet.
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-xs sm:text-sm text-slate-500">
              Save schemes from your eligible schemes list to find them easily later.
            </p>
            <div className="mt-6">
              <Link
                href="/schemes"
                className="inline-flex items-center gap-2 rounded-full bg-[#173B8F] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0F2557] transition"
              >
                <span>← Find Eligible Schemes</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Official Government Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
              <span className="font-semibold text-slate-700">GovSchemes</span>
              <span>• SIH26092 Saved Schemes</span>
            </div>
            <p>© {new Date().getFullYear()} Government of India Scheme Eligibility Portal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
