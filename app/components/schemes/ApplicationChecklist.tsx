"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface ApplicationChecklistProps {
  schemeId: string;
  schemeName: string;
  documents?: string[];
}

const DEFAULT_CHECKLIST_ITEMS = [
  "Aadhaar Card and Permanent Account Number (PAN) Card",
  "Recent passport-sized colour photographs",
  "Detailed Project Report (DPR) / Business Plan outlining equipment, working capital, and revenue model",
  "Special Category / Caste Certificate (SC/ST/OBC/Minority/PH/Ex-Servicemen) if claiming higher subsidy",
  "Educational qualification certificates / Class VIII marksheet (for projects over ₹5 Lakhs / ₹10 Lakhs)",
  "Proof of permanent residence / Domicile Certificate",
  "Rural Area Certificate from the local Panchayat/revenue officer (if applying under rural category)"
];

export default function ApplicationChecklist({
  schemeId,
  schemeName,
  documents,
}: ApplicationChecklistProps) {
  const { t } = useLanguage();
  const storageKey = `govschemes_checklist_${schemeId}`;
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  const items = documents && documents.length > 0 ? documents : DEFAULT_CHECKLIST_ITEMS;

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

  const handleToggle = (index: number) => {
    const updated = {
      ...checkedItems,
      [index]: !checkedItems[index],
    };
    setCheckedItems(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save checklist to localStorage:", e);
    }
  };

  const handleReset = () => {
    const cleanSchemeName = schemeName ? schemeName.split("(")[0].trim() : "this scheme";
    const confirmMessage = t.resetChecklistConfirm?.replace("{name}", cleanSchemeName) || `Are you sure you want to reset your checklist for ${cleanSchemeName}?`;
    const confirmed = window.confirm(confirmMessage);
    if (confirmed) {
      setCheckedItems({});
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        console.error("Failed to clear checklist in localStorage:", e);
      }
    }
  };

  const totalCount = items.length;
  const completedCount = isClientLoaded
    ? Object.values(checkedItems).filter(Boolean).length
    : 0;
  const remainingCount = totalCount - completedCount;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-blue-900" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-950">
                {t.applicationProgressTitle}
              </h3>
            </div>
            <div className="mt-1 text-2xl font-extrabold text-blue-900">
              {t.tasksCompletedText
                ? t.tasksCompletedText.replace("{completed}", String(completedCount)).replace("{total}", String(totalCount))
                : `${completedCount} of ${totalCount} tasks completed`}
            </div>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
              {remainingCount === 0 ? (
                <>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    ✓
                  </span>
                  <span className="font-semibold text-emerald-800">
                    {t.checklistVerified || t.allTasksCompletedText || "All items verified!"}
                  </span>
                </>
              ) : (
                remainingCount === 1
                  ? (t.tasksRemainingText ? t.tasksRemainingText.replace("{count}", "1") : "1 item remaining")
                  : (t.tasksRemainingPluralText ? t.tasksRemainingPluralText.replace("{count}", String(remainingCount)) : `${remainingCount} items remaining`)
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-2xl font-extrabold text-orange-500">
                {percentage}%
              </span>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                {t.completeBadge || "Complete"}
              </span>
            </div>
            {completedCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-red-700 transition cursor-pointer"
              >
                {t.resetChecklistBtn || "Reset"}
              </button>
            )}
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage === 100 ? "bg-emerald-600" : "bg-blue-900"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3.5">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {t.documentsTitle || "Documents Required (Checklist)"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {t.clickToCheckHint || "Click anywhere on a box to check or uncheck it."}
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
            {t.doneCountPill
              ? t.doneCountPill.replace("{completed}", String(completedCount)).replace("{total}", String(totalCount))
              : `${completedCount} / ${totalCount} Done`}
          </span>
        </div>

        <div className="mt-4 space-y-2.5">
          {items.map((itemText, index) => {
            const isChecked = !!checkedItems[index];
            return (
              <div
                key={index}
                onClick={() => handleToggle(index)}
                className={`flex items-center gap-3.5 rounded-xl border p-3.5 cursor-pointer transition-all select-none ${
                  isChecked
                    ? "border-emerald-200 bg-emerald-50/70 shadow-xs"
                    : "border-gray-200 bg-gray-50/30 hover:border-blue-300 hover:bg-blue-50/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="h-4.5 w-4.5 rounded border-gray-300 text-blue-900 focus:ring-blue-900 cursor-pointer pointer-events-none"
                />
                <div className="flex items-center justify-between gap-2 flex-1">
                  <span
                    className={`text-xs sm:text-sm font-medium transition-colors ${
                      isChecked
                        ? "text-emerald-900 line-through opacity-90"
                        : "text-gray-800"
                    }`}
                  >
                    {itemText}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 shrink-0">
                    {t.itemPrefix ? t.itemPrefix.replace("{n}", String(index + 1)) : `Item ${index + 1}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}