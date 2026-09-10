"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import SchemeCard from "@/src/components/SchemeCard";
import { schemes } from "@/src/data/schemes";

type FilterType = "All" | "Central Government" | "State Government";
type SortOption = "best-match" | "highest-eligibility" | "a-z";

const STORAGE_KEY = "govschemes_saved_ids";

export default function SchemesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [sortBy, setSortBy] = useState<SortOption>("best-match");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Initialize saved schemes from localStorage on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedIds(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to read saved schemes from localStorage:", e);
    }
    setIsClientLoaded(true);
  }, []);

  // Toggle bookmark in localStorage
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save bookmark in localStorage:", e);
      }
      return updated;
    });
  };

  // Filter and sort schemes
  const filteredAndSortedSchemes = useMemo(() => {
    let result = [...schemes];

    // Filter by government level
    if (activeFilter === "Central Government") {
      result = result.filter((s) => s.type === "Central Government");
    } else if (activeFilter === "State Government") {
      result = result.filter((s) => s.type === "State Government");
    }

    // Sort
    if (sortBy === "best-match" || sortBy === "highest-eligibility") {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === "a-z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeFilter, sortBy]);

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: schemes.length,
      central: schemes.filter((s) => s.type === "Central Government").length,
      state: schemes.filter((s) => s.type === "State Government").length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col">
      {/* Official GovSchemes Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        {/* Subtle Indian Tricolor accent line */}
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
                  strokeWidth="1.8"
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
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-[#173B8F]">
                    SIH26092
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500">
                  Government Schemes Portal for Marginalized Entrepreneurs
                </p>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/assistant"
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-[#173B8F] hover:bg-blue-100 hover:border-blue-300 transition shadow-2xs"
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

              {/* Saved Schemes Navigation Link */}
              <Link
                href="/saved"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition"
              >
                <svg
                  className={`h-4 w-4 ${
                    savedIds.length > 0 ? "fill-[#FF6B00] text-[#FF6B00]" : "text-slate-400"
                  }`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>Saved Schemes:</span>
                <span className="font-bold text-[#FF6B00]">
                  {isClientLoaded ? savedIds.length : 0}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#173B8F] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-400">Eligibility Engine</span>
          <span>/</span>
          <span className="text-[#173B8F] font-semibold">Eligible Schemes</span>
        </nav>

        {/* Page Header Banner */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#FF6B00]">
                <span>✓ Verified AI Matching</span>
              </div>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0F2557] sm:text-3xl lg:text-4xl">
                Government Schemes You&apos;re Eligible For
              </h1>
              <p className="mt-2 text-sm text-slate-600 sm:text-base leading-relaxed">
                Based on your details, our AI found government schemes that you may be eligible for.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#173B8F] px-3.5 py-1 text-xs font-bold text-white shadow-xs">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {filteredAndSortedSchemes.length} schemes found
                </span>
                <span className="text-xs text-slate-500 italic">
                  Results are based on the information you provided.
                </span>
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="flex flex-row md:flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
              <div>
                <div className="text-2xl font-extrabold text-[#173B8F]">
                  94%
                </div>
                <div className="text-[11px] font-medium text-slate-500">
                  Highest Match
                </div>
              </div>
              <div className="h-full w-px bg-slate-200 md:h-px md:w-full" />
              <div>
                <div className="text-2xl font-extrabold text-[#FF6B00]">
                  {schemes.length}
                </div>
                <div className="text-[11px] font-medium text-slate-500">
                  Total Analyzed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <section
          aria-label="Filter and Sort Schemes"
          className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                Filter:
              </span>
              <button
                type="button"
                onClick={() => setActiveFilter("All")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeFilter === "All"
                    ? "bg-[#173B8F] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>All</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    activeFilter === "All"
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {counts.all}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("Central Government")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeFilter === "Central Government"
                    ? "bg-[#173B8F] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>Central Government</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    activeFilter === "Central Government"
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {counts.central}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("State Government")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeFilter === "State Government"
                    ? "bg-[#173B8F] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>State Government</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    activeFilter === "State Government"
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {counts.state}
                </span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap"
              >
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none rounded-full border border-slate-300 bg-white py-1.5 pl-3.5 pr-8 text-xs font-semibold text-slate-800 shadow-xs transition-all focus:border-[#173B8F] focus:outline-none focus:ring-1 focus:ring-[#173B8F]"
                >
                  <option value="best-match">Best Match</option>
                  <option value="highest-eligibility">Highest Eligibility</option>
                  <option value="a-z">A-Z</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-2.5 text-slate-500">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schemes Results Grid */}
        <section aria-label="Schemes list" className="mt-6">
          {filteredAndSortedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredAndSortedSchemes.map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  isSaved={savedIds.includes(scheme.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-base font-bold text-slate-800">
                No schemes match your filter
              </h2>
              <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500">
                Try selecting &ldquo;All&rdquo; or another category to view eligible schemes.
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setActiveFilter("All")}
                  className="inline-flex items-center rounded-full bg-[#173B8F] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0F2557]"
                >
                  <span>Reset to All</span>
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Official Government Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
              <span className="font-semibold text-slate-700">GovSchemes</span>
              <span>• SIH26092 Scheme Results</span>
            </div>
            <p>© {new Date().getFullYear()} Government of India Scheme Eligibility Portal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
