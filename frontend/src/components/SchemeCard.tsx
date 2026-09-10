"use client";

import Link from "next/link";
import { Scheme } from "@/src/data/schemes";

interface SchemeCardProps {
  scheme: Scheme;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export default function SchemeCard({
  scheme,
  isSaved,
  onToggleSave,
}: SchemeCardProps) {
  // Determine badge styling by match percentage
  const getMatchStyle = (score: number) => {
    if (score >= 90) {
      return {
        badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
        bar: "bg-emerald-500",
      };
    }
    if (score >= 85) {
      return {
        badge: "bg-blue-50 text-[#173B8F] border-blue-200",
        bar: "bg-[#173B8F]",
      };
    }
    return {
      badge: "bg-amber-50 text-amber-800 border-amber-200",
      bar: "bg-amber-500",
    };
  };

  const matchStyle = getMatchStyle(scheme.matchScore);

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div>
        {/* Top Meta Row: Gov Level, Demo Badge & Save/Bookmark Button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Government Level Badge */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${
                scheme.type === "Central Government"
                  ? "bg-blue-50 text-[#173B8F] border-blue-200"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}
            >
              <svg
                className="h-3 w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              {scheme.type}
            </span>

            {/* Clear Demo/Mock Data Badge */}
            {scheme.isDemo && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                <svg
                  className="h-3 w-3 text-amber-600"
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
                Demo / Mock Data
              </span>
            )}
          </div>

          {/* Bookmark / Save Button */}
          <button
            type="button"
            onClick={() => onToggleSave(scheme.id)}
            aria-label={isSaved ? "Remove from saved schemes" : "Save scheme"}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
              isSaved
                ? "border-[#FF6B00] bg-orange-50 text-[#FF6B00] font-semibold"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
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

        {/* Scheme Name & Ministry */}
        <div className="mt-3.5">
          <h2 className="text-lg font-bold leading-snug tracking-tight text-[#0F2557]">
            {scheme.name}
          </h2>
          {scheme.fullName && (
            <p className="mt-1 text-xs text-slate-500">{scheme.fullName}</p>
          )}
          {scheme.ministry && (
            <p className="mt-0.5 text-xs text-slate-400">{scheme.ministry}</p>
          )}
        </div>

        {/* Eligibility Match Percentage */}
        <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">
              Eligibility Match
            </span>
            <span
              className={`inline-block rounded-md border px-2 py-0.5 text-xs font-bold ${matchStyle.badge}`}
            >
              {scheme.matchScore}% Match
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-500 ${matchStyle.bar}`}
              style={{ width: `${scheme.matchScore}%` }}
            />
          </div>
        </div>

        {/* Short Description */}
        <p className="mt-3.5 text-sm leading-relaxed text-slate-600">
          {scheme.description}
        </p>

        {/* Why You Qualify Section */}
        <div className="mt-4 border-t border-slate-100 pt-3.5">
          <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#173B8F]">
            <svg
              className="h-4 w-4 text-emerald-600"
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
            Why you qualify:
          </h3>
          <ul className="mt-2 space-y-1.5">
            {scheme.whyEligible.map((reason, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs leading-5 text-slate-700"
              >
                <span className="mt-1 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                  ✓
                </span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer: Benefit & View Details CTA */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-3.5">
        {scheme.benefit ? (
          <span className="text-[11px] text-slate-500 line-clamp-1 flex-1">
            <strong className="text-slate-700">Benefit:</strong> {scheme.benefit}
          </span>
        ) : (
          <div className="flex-1" />
        )}
        <Link
          href={`/schemes/${scheme.id}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#FF6B00] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#E05D00] hover:shadow focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 flex-shrink-0"
        >
          <span>View Details</span>
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
