"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import SchemeCard from "@/components/schemes/SchemeCard";
import { schemes, Scheme, getLocalizedScheme } from "@/data/schemes";
import { useLanguage } from "@/lib/LanguageContext";

type FilterType = "All" | "Central Government" | "State Government";
type SortOption = "best-match" | "highest-eligibility" | "a-z";

const STORAGE_KEY = "govschemes_saved_ids";

export default function SchemesPage() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [sortBy, setSortBy] = useState<SortOption>("best-match");
  const [savedIds, setSavedIds] = useState<string[]>([]);

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
  }, []);

  // Toggle bookmark in localStorage and dispatch update event
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent("govschemes_saved_updated", { detail: updated }));
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
      result = result.filter((s: Scheme) => s.type === "Central Government");
    } else if (activeFilter === "State Government") {
      result = result.filter((s: Scheme) => s.type === "State Government");
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
      central: schemes.filter((s: Scheme) => s.type === "Central Government").length,
      state: schemes.filter((s: Scheme) => s.type === "State Government").length,
    };
  }, []);

  return (
    <main className="flex-1 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-500">
          <Link href="/" className="hover:text-blue-900 transition-colors">
            {t.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link href="/eligibility-form" className="hover:text-blue-900 transition-colors">
            {t.breadcrumbEligibilityEngine}
          </Link>
          <span>/</span>
          <span className="text-blue-900 font-semibold">{t.breadcrumbEligibleSchemes}</span>
        </nav>

        {/* Page Header Banner */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                <span>✓ {t.schemesVerifiedMatch}</span>
              </div>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-blue-950 sm:text-3xl lg:text-4xl">
                {t.schemesPageTitle}
              </h1>
              <p className="mt-2 text-sm text-gray-600 sm:text-base leading-relaxed">
                {t.schemesPageSubtitle}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-900 px-3.5 py-1 text-xs font-bold text-white shadow-xs">
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
                  {t.schemesFoundText.replace("{count}", String(filteredAndSortedSchemes.length))}
                </span>
                <span className="text-xs text-gray-500 italic">
                  {t.schemesNoticeText}
                </span>
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div className="flex flex-row md:flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
              <div>
                <div className="text-2xl font-extrabold text-blue-900">
                  94%
                </div>
                <div className="text-[11px] font-medium text-gray-500">
                  {t.highestMatchLabel}
                </div>
              </div>
              <div className="h-full w-px bg-gray-200 md:h-px md:w-full" />
              <div>
                <div className="text-2xl font-extrabold text-orange-500">
                  {schemes.length}
                </div>
                <div className="text-[11px] font-medium text-gray-500">
                  {t.totalAnalyzedLabel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <section
          aria-label="Filter and Sort Schemes"
          className="mt-8 rounded-xl border border-gray-200 bg-white p-4 shadow-xs"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                {t.filterLabel}
              </span>
              <button
                type="button"
                onClick={() => setActiveFilter("All")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === "All"
                    ? "bg-blue-900 text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{t.filterAll}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    activeFilter === "All"
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {counts.all}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("Central Government")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === "Central Government"
                    ? "bg-blue-900 text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{t.filterCentral}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    activeFilter === "Central Government"
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {counts.central}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("State Government")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === "State Government"
                    ? "bg-blue-900 text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{t.filterState}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    activeFilter === "State Government"
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
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
                className="text-xs font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap"
              >
                {t.sortLabel}
              </label>
              <div className="relative">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none rounded-full border border-gray-300 bg-white py-1.5 pl-3.5 pr-8 text-xs font-semibold text-gray-800 shadow-xs transition-all focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900 cursor-pointer"
                >
                  <option value="best-match">{t.sortBestMatch}</option>
                  <option value="highest-eligibility">{t.sortHighestEligibility}</option>
                  <option value="a-z">{t.sortAZ}</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-2.5 text-gray-500">
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
              {filteredAndSortedSchemes.map((scheme: Scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={getLocalizedScheme(scheme, language)}
                  isSaved={savedIds.includes(scheme.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
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
              <h2 className="mt-4 text-base font-bold text-gray-800">
                {t.noSchemesMatch}
              </h2>
              <p className="mx-auto mt-1 max-w-sm text-xs text-gray-500">
                {t.noSchemesMatchSub}
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setActiveFilter("All")}
                  className="inline-flex items-center rounded-full bg-blue-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-800 cursor-pointer"
                >
                  <span>{t.resetToAllBtn}</span>
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
