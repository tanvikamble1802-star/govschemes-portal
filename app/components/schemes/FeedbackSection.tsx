"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface FeedbackSectionProps {
  schemeId: string;
  schemeName: string;
}

export default function FeedbackSection({
  schemeId,
  schemeName,
}: FeedbackSectionProps) {
  const { t } = useLanguage();
  const storageKey = `govschemes_feedback_${schemeId}`;

  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const [comment, setComment] = useState("");
  const [hasSubmittedComment, setHasSubmittedComment] = useState(false);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Load saved feedback from localStorage on mount (preventing SSR mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.vote) setVote(parsed.vote);
        if (parsed.comment) {
          setComment(parsed.comment);
          setHasSubmittedComment(true);
        }
      }
    } catch (e) {
      console.error("Failed to load feedback from localStorage:", e);
    }
    setIsClientLoaded(true);
  }, [storageKey]);

  const handleVote = (selectedVote: "yes" | "no") => {
    setVote(selectedVote);
    try {
      const existing = localStorage.getItem(storageKey);
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem(
        storageKey,
        JSON.stringify({ ...parsed, vote: selectedVote })
      );
    } catch (e) {
      console.error("Failed to save vote to localStorage:", e);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setHasSubmittedComment(true);
    try {
      const existing = localStorage.getItem(storageKey);
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          ...parsed,
          comment: comment.trim(),
          vote: vote || "yes",
        })
      );
    } catch (e) {
      console.error("Failed to save comment to localStorage:", e);
    }
  };

  // Prevent flashing mismatched state during initial SSR hydration
  if (!isClientLoaded) {
    return (
      <section
        aria-label="User Feedback"
        className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs"
      >
        <div className="max-w-xl h-24 animate-pulse bg-gray-50 rounded-xl" />
      </section>
    );
  }

  return (
    <section
      aria-label="User Feedback"
      className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs"
    >
      <div className="max-w-xl">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          {t.wasHelpfulTitle}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {t.wasHelpfulSubtitle.replace("{name}", schemeName.split("(")[0].trim())}
        </p>

        {/* Voting Buttons */}
        {!vote ? (
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleVote("yes")}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 transition cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <span>{t.btnYes}</span>
            </button>
            <button
              type="button"
              onClick={() => handleVote("no")}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-800 transition cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76 1.04m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                />
              </svg>
              <span>{t.btnNo}</span>
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold ${
                vote === "yes"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-amber-100 text-amber-900 border border-amber-200"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                {vote === "yes" ? t.thanksFeedbackYes : t.thanksFeedbackNo}
              </span>
            </div>
          </div>
        )}

        {/* Optional Comment Section */}
        {vote && !hasSubmittedComment && (
          <form onSubmit={handleCommentSubmit} className="mt-5 space-y-3">
            <label
              htmlFor="feedback-comment"
              className="block text-xs font-bold uppercase tracking-wider text-gray-500"
            >
              {t.tellUsImproveLabel}
            </label>
            <textarea
              id="feedback-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.feedbackPlaceholder}
              className="w-full rounded-xl border border-gray-300 bg-gray-50/50 p-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-blue-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!comment.trim()}
                className="inline-flex items-center rounded-full bg-blue-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {t.submitFeedbackBtn}
              </button>
            </div>
          </form>
        )}

        {/* Comment Submitted Confirmation */}
        {hasSubmittedComment && (
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/60 p-3 text-xs text-blue-950 font-medium flex items-center gap-1.5">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>{t.feedbackRecordedNotice}</span>
          </div>
        )}
      </div>
    </section>
  );
}