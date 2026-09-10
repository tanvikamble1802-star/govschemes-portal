"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { schemes, Scheme } from "@/src/data/schemes";
import ApplicationChecklist from "@/src/components/ApplicationChecklist";
import FeedbackSection from "@/src/components/FeedbackSection";

const STORAGE_KEY = "govschemes_saved_ids";

export default function SchemeDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const scheme: Scheme | undefined = schemes.find((s) => s.id === id);

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  // Hydrate saved schemes from localStorage on mount
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

  // Toggle bookmark in localStorage (with duplicate prevention)
  const handleToggleSave = () => {
    if (!scheme) return;
    setSavedIds((prev) => {
      const updated = prev.includes(scheme.id)
        ? prev.filter((item) => item !== scheme.id)
        : Array.from(new Set([...prev, scheme.id]));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save bookmark in localStorage:", e);
      }
      return updated;
    });
  };

  const isSaved = scheme ? savedIds.includes(scheme.id) : false;

  const toggleDocCheck = (docIndex: number) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docIndex]: !prev[docIndex],
    }));
  };

  // If scheme not found
  if (!scheme) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Scheme Not Found
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            The scheme you requested could not be located in our database.
          </p>
          <div className="mt-6">
            <Link
              href="/schemes"
              className="inline-flex items-center gap-2 rounded-full bg-[#173B8F] px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0F2557]"
            >
              ← Back to Eligible Schemes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col">
      {/* Official Government Top Bar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        {/* Subtle Indian Tricolor accent line */}
        <div className="flex h-1 w-full">
          <div className="w-1/3 bg-[#FF6B00]" />
          <div className="w-1/3 bg-white" />
          <div className="w-1/3 bg-[#138808]" />
        </div>

        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Back Button */}
            <Link
              href="/schemes"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-[#173B8F]"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Eligible Schemes</span>
            </Link>            {/* Portal Branding & Actions */}
            <div className="flex items-center gap-2.5">
              {scheme.isDemo && (
                <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                  DEMO / MOCK DATA
                </span>
              )}
              <Link
                href="/saved"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                <svg
                  className="h-3.5 w-3.5 text-slate-500"
                  fill="none"
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
                <span>Saved Schemes</span>
              </Link>
              <Link
                href={`/assistant?scheme=${scheme.id}`}
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
              <button
                type="button"
                onClick={handleToggleSave}
                aria-label={isSaved ? "Remove from saved" : "Save scheme"}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isSaved
                    ? "border-[#FF6B00] bg-orange-50 text-[#FF6B00]"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <svg
                  className={`h-3.5 w-3.5 transition-colors ${
                    isSaved ? "fill-[#FF6B00] text-[#FF6B00]" : "fill-none text-current"
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
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#173B8F] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/schemes" className="hover:text-[#173B8F] transition-colors">
            Eligible Schemes
          </Link>
          <span>/</span>
          <span className="text-[#173B8F] font-semibold truncate max-w-[200px] sm:max-w-none">
            {scheme.name}
          </span>
        </nav>

        {/* ========================================================= */}
        {/* SECTION 1: SCHEME HEADER                                  */}
        {/* ========================================================= */}
        <section
          aria-label="Scheme Header"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                    scheme.type === "Central Government"
                      ? "bg-blue-50 text-[#173B8F] border-blue-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}
                >
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  {scheme.type}
                </span>

                {scheme.isDemo && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
                    <svg
                      className="h-3.5 w-3.5 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    DEMO / MOCK DATA
                  </span>
                )}
              </div>

              {/* Title & Ministry */}
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0F2557] sm:text-3xl">
                {scheme.name}
              </h1>

              {scheme.fullName && (
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {scheme.fullName}
                </p>
              )}

              {scheme.ministry && (
                <p className="mt-1.5 text-xs text-slate-400 font-medium">
                  {scheme.ministry}
                </p>
              )}

              {/* Short Description */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                {scheme.description}
              </p>

              {/* Navigation Back Button in Header */}
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/schemes"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173B8F] hover:underline"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Back to Eligible Schemes</span>
                </Link>
              </div>
            </div>

            {/* Eligibility Match Card */}
            <div className="flex flex-row md:flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-5 text-center shadow-xs md:w-52 flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <span className="text-2xl font-extrabold">
                  {scheme.matchScore}%
                </span>
              </div>
              <div className="ml-4 md:ml-0 md:mt-3 text-left md:text-center">
                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                  Eligibility Match
                </div>
                <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                  High alignment with profile
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: WHY YOU'RE ELIGIBLE                            */}
        {/* ========================================================= */}
        <section
          aria-label="Why You're Eligible"
          className="rounded-2xl border border-blue-200/80 bg-blue-50/50 p-6 sm:p-8 shadow-xs"
        >
          <div className="flex items-center justify-between gap-4 border-b border-blue-200/60 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173B8F] text-white">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0F2557]">
                  Why You&apos;re Eligible
                </h2>
                <p className="text-xs text-slate-600">
                  Matched by AI evaluation based on the profile data you provided
                </p>
              </div>
            </div>

            <div className="rounded-full bg-white border border-blue-200 px-3 py-1 text-xs font-bold text-[#173B8F]">
              {scheme.matchScore}% Score
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {scheme.whyEligible.map((reason, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-white bg-white/90 p-4 shadow-xs"
              >
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm font-medium leading-relaxed text-slate-800">
                  {reason}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: BENEFITS                                       */}
        {/* ========================================================= */}
        <section
          aria-label="Benefits"
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs"
        >
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-[#0F2557] flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-[#FF6B00]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              Benefits &amp; Financial Support
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Key incentives, financial subsidies, and loan facilities provided by this programme
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {(scheme.benefits || [scheme.benefit || "Financial assistance provided under scheme guidelines"]).map(
              (benefitItem, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition hover:bg-slate-100/60"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#173B8F]/10 text-[#173B8F] text-xs font-bold">
                      ★
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                      {benefitItem}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: ELIGIBILITY CRITERIA                           */}
        {/* ========================================================= */}
        <section
          aria-label="Eligibility Criteria"
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs"
        >
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-[#0F2557] flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-[#173B8F]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
              Eligibility Criteria
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Statutory requirements mandated by the governing guidelines
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {(scheme.eligibilityCriteria || [
              "Individual or enterprise must satisfy government registration and sector norms.",
            ]).map((criterion, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3.5 shadow-2xs"
              >
                <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#173B8F] text-[10px] font-bold">
                  {idx + 1}
                </div>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {criterion}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: DOCUMENTS REQUIRED                             */}
        {/* ========================================================= */}
        <section
          aria-label="Documents Required"
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs"
        >
          <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#0F2557] flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </span>
                Documents Required (Checklist)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Verify that you have all documents ready before beginning your formal application
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Click to check off items you have prepared
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(scheme.documentsRequired || [
              "Identity Proof (Aadhaar / PAN)",
              "Bank Account Statement",
            ]).map((doc, idx) => {
              const isChecked = !!checkedDocs[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleDocCheck(idx)}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 cursor-pointer transition-all ${
                    isChecked
                      ? "border-emerald-300 bg-emerald-50/60 shadow-xs"
                      : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleDocCheck(idx)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#173B8F] focus:ring-[#173B8F] cursor-pointer"
                  />
                  <div
                    className={`text-xs sm:text-sm font-medium leading-relaxed ${
                      isChecked ? "text-emerald-900 font-semibold" : "text-slate-700"
                    }`}
                  >
                    {doc}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: HOW TO APPLY                                   */}
        {/* ========================================================= */}
        <section
          aria-label="How to Apply"
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs"
        >
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-[#0F2557] flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-[#173B8F]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </span>
              How to Apply (Application Process)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Step-by-step roadmap from initial registration to loan disbursement
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {(scheme.howToApply || []).map((step) => (
              <div
                key={step.stepNumber}
                className="relative flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5"
              >
                {/* Step Number Circle */}
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#173B8F] text-white text-sm font-bold shadow-xs">
                  {step.stepNumber}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#0F2557]">
                      {step.title}
                    </h3>
                    {step.stage && (
                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-[#173B8F] uppercase tracking-wider">
                        {step.stage}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION: YOUR APPLICATION CHECKLIST (Part 2 & Part 4)     */}
        {/* ========================================================= */}
        <section aria-label="Your Application Checklist">
          <div className="mb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0F2557] flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-[#173B8F]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </span>
              Your Application Checklist
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalized preparation milestones for {scheme.name.split("(")[0].trim()}
            </p>
          </div>
          <ApplicationChecklist schemeId={scheme.id} schemeName={scheme.name} />
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: APPLY NOW (Prominent & Clearly Separated)      */}
        {/* ========================================================= */}
        <section
          aria-label="Apply Now"
          className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50/70 via-white to-orange-50/30 p-6 sm:p-8 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#FF6B00]">
                <span>⚡ Official Application Portal</span>
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#0F2557]">
                Ready to Apply for {scheme.name.split("(")[0]}?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                Proceed directly to the official government portal to submit your documents and track your sanction progress.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 italic">
                <svg
                  className="h-3.5 w-3.5 text-slate-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Notice: In this prototype, clicking &ldquo;Apply Now&rdquo; redirects to the official portal. Real applications are submitted directly on government servers.
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-3 flex-shrink-0">
              {scheme.officialPortalUrl ? (
                <a
                  href={scheme.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B00] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#E05D00] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2"
                >
                  <span>Apply Now</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ) : (
                /* When official URL is not available in mock data (e.g. Maharashtra scheme) */
                <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-left sm:text-right max-w-sm">
                  <div className="text-xs font-bold text-amber-900">
                    Official portal information will be added
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">
                    This is a simulated state scheme (Demo Data). Official state submission links will be enabled once database connectivity is configured.
                  </div>
                </div>
              )}

              {scheme.officialPortalUrl && (
                <span className="text-[11px] text-slate-400 font-medium">
                  Opens official portal in new tab ↗
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: NEED HELP? (Institutional Guidance)            */}
        {/* ========================================================= */}
        <section
          aria-label="Need Help"
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs"
        >
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-[#0F2557] flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-[#173B8F]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
              Need Help &amp; Application Guidance?
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Authorized government support centres and official guidance channels
            </p>
          </div>

          <div className="mt-5 space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {scheme.helpGuidance?.whereToGetHelp ||
                "You can visit your nearest District Industries Centre (DIC) or Lead Bank office for free application assistance."}
            </p>

            {scheme.helpGuidance?.authorizedCentres && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B8F]">
                  Authorized In-Person Assistance Desks:
                </h3>
                <ul className="mt-2 space-y-2">
                  {scheme.helpGuidance.authorizedCentres.map((centre, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                    >
                      <span className="mt-1 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-[#173B8F] text-[9px] font-bold text-white">
                        •
                      </span>
                      <span>{centre}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                <svg
                  className="h-4 w-4 text-[#173B8F] flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>
                  {scheme.helpGuidance?.guidanceNote ||
                    "Official assistance is provided free of charge by government nodal agencies. Do not engage with unverified private agents."}
                </p>
              </div>
            </div>

            {/* Quick Link to AI Assistant */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4">
              <div>
                <div className="text-xs font-bold text-[#0F2557]">
                  Have questions about {scheme.name.split("(")[0].trim()}?
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Ask our AI Scheme Assistant about eligibility, documents, or application steps.
                </div>
              </div>
              <Link
                href={`/assistant?scheme=${scheme.id}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#173B8F] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0F2557] transition flex-shrink-0"
              >
                <span>Chat with Assistant</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION: USER FEEDBACK (Part 3)                           */}
        {/* ========================================================= */}
        <FeedbackSection schemeId={scheme.id} schemeName={scheme.name} />

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-6">
          <Link
            href="/schemes"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 shadow-2xs"
          >
            ← Back to All Eligible Schemes
          </Link>

          <button
            type="button"
            onClick={handleToggleSave}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition ${
              isSaved
                ? "border-[#FF6B00] bg-orange-50 text-[#FF6B00]"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <svg
              className={`h-3.5 w-3.5 ${
                isSaved ? "fill-[#FF6B00] text-[#FF6B00]" : "fill-none text-current"
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
            <span>{isSaved ? "Saved to Bookmarks" : "Save Scheme"}</span>
          </button>
        </div>
      </main>

      {/* Official Government Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
              <span className="font-semibold text-slate-700">GovSchemes</span>
              <span>• SIH26092 Scheme Details</span>
            </div>
            <p>© {new Date().getFullYear()} Government of India Scheme Eligibility Portal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
