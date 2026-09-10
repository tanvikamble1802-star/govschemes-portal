"use client";

import { useState, useEffect } from "react";

interface FeedbackSectionProps {
  schemeId: string;
  schemeName: string;
}

export default function FeedbackSection({
  schemeId,
  schemeName,
}: FeedbackSectionProps) {
  const storageKey = `govschemes_feedback_${schemeId}`;

  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const [comment, setComment] = useState("");
  const [hasSubmittedComment, setHasSubmittedComment] = useState(false);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Load saved feedback from localStorage on mount
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
        JSON.stringify({ ...parsed, comment: comment.trim(), vote: vote || "yes" })
      );
    } catch (e) {
      console.error("Failed to save comment to localStorage:", e);
    }
  };

  return (
    <section
      aria-label="User Feedback"
      className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs"
    >
      <div className="max-w-xl">
        <h2 className="text-base sm:text-lg font-bold text-[#0F2557]">
          Was this information helpful?
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Your feedback helps us refine guidance for {schemeName.split("(")[0].trim()}.
        </p>

        {/* Voting Buttons */}
        {!vote ? (
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleVote("yes")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 transition"
            >
              <span>👍</span>
              <span>Yes</span>
            </button>
            <button
              type="button"
              onClick={() => handleVote("no")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-800 transition"
            >
              <span>👎</span>
              <span>No</span>
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
              <span>{vote === "yes" ? "👍" : "👎"}</span>
              <span>
                {vote === "yes"
                  ? "Thanks for your feedback!"
                  : "Thanks for your feedback. We'll use this to improve the experience."}
              </span>
            </div>
          </div>
        )}

        {/* Optional Comment Section */}
        {vote && !hasSubmittedComment && (
          <form onSubmit={handleCommentSubmit} className="mt-5 space-y-3">
            <label
              htmlFor="feedback-comment"
              className="block text-xs font-bold uppercase tracking-wider text-slate-500"
            >
              Tell us how we can improve
            </label>
            <textarea
              id="feedback-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What additional details, instructions, or clarity would be helpful?"
              className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-[#173B8F] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173B8F]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!comment.trim()}
                className="inline-flex items-center rounded-full bg-[#173B8F] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0F2557] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}

        {/* Comment Submitted Confirmation */}
        {hasSubmittedComment && (
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/60 p-3 text-xs text-[#0F2557] font-medium">
            ✓ Thank you! Your feedback has been recorded locally.
          </div>
        )}
      </div>
    </section>
  );
}
