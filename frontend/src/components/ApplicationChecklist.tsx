"use client";

import { useState, useEffect } from "react";

export const DEFAULT_CHECKLIST_ITEMS = [
  "Check eligibility",
  "Prepare required documents",
  "Visit official application portal",
  "Complete application form",
  "Upload required documents",
  "Review application",
  "Submit application",
  "Save application/reference details",
];

interface ApplicationChecklistProps {
  schemeId: string;
  schemeName: string;
}

export default function ApplicationChecklist({
  schemeId,
  schemeName,
}: ApplicationChecklistProps) {
  const storageKey = `govschemes_checklist_${schemeId}`;
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Load checklist progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === "object" && parsed !== null) {
          setCheckedItems(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load checklist from localStorage:", e);
    }
    setIsClientLoaded(true);
  }, [storageKey]);

  // Toggle item status
  const handleToggle = (index: number) => {
    setCheckedItems((prev) => {
      const updated = {
        ...prev,
        [index]: !prev[index],
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save checklist to localStorage:", e);
      }
      return updated;
    });
  };

  // Reset checklist with confirmation
  const handleReset = () => {
    const confirmed = window.confirm(
      `Are you sure you want to reset your application checklist for ${schemeName}? This will uncheck all tasks.`
    );
    if (confirmed) {
      setCheckedItems({});
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        console.error("Failed to clear checklist in localStorage:", e);
      }
    }
  };

  const totalCount = DEFAULT_CHECKLIST_ITEMS.length;
  const completedCount = isClientLoaded
    ? Object.values(checkedItems).filter(Boolean).length
    : 0;
  const remainingCount = totalCount - completedCount;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* PART 4: APPLICATION STATUS / CHECKLIST SUMMARY CARD */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#173B8F]" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#0F2557]">
                Application Progress
              </h3>
            </div>
            <div className="mt-1 text-2xl font-extrabold text-[#173B8F]">
              {completedCount} of {totalCount} tasks completed
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {remainingCount === 0
                ? "🎉 All preparation steps completed!"
                : `${remainingCount} task${remainingCount > 1 ? "s" : ""} remaining to complete`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-2xl font-extrabold text-[#FF6B00]">
                {percentage}%
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                complete
              </span>
            </div>
            {completedCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-red-700 transition"
              >
                Reset Checklist
              </button>
            )}
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage === 100 ? "bg-emerald-600" : "bg-[#173B8F]"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Mandatory Informational Disclaimer */}
        <div className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-slate-500">
          <svg
            className="h-3.5 w-3.5 text-slate-400 flex-shrink-0 mt-0.5"
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
            This checklist helps you prepare your application. It does not represent the official government application status.
          </span>
        </div>
      </div>

      {/* PART 2: CHECKLIST ITEMS */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div>
            <h3 className="text-base font-bold text-[#0F2557]">
              Step-by-Step Preparation Tasks
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Check off each milestone as you prepare and submit your application
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {completedCount}/{totalCount} Done
          </span>
        </div>

        <div className="mt-4 space-y-2.5">
          {DEFAULT_CHECKLIST_ITEMS.map((itemText, index) => {
            const isChecked = !!checkedItems[index];
            return (
              <label
                key={index}
                className={`flex items-center gap-3.5 rounded-xl border p-3.5 cursor-pointer transition-all ${
                  isChecked
                    ? "border-emerald-200 bg-emerald-50/50 shadow-2xs"
                    : "border-slate-200 bg-slate-50/30 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggle(index)}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-[#173B8F] focus:ring-[#173B8F] cursor-pointer"
                />
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      isChecked
                        ? "text-emerald-900 line-through font-normal"
                        : "text-slate-800"
                    }`}
                  >
                    {itemText}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    Step {index + 1}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
