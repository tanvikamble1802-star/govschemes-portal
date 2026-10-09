"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ApplicationChecklist from "@/components/schemes/ApplicationChecklist";
import AssistantChat from "@/components/schemes/AssistantChat";
import FeedbackSection from "@/components/schemes/FeedbackSection";
import { schemes, getLocalizedScheme, Scheme } from "@/data/schemes";
import { useLanguage } from "@/lib/LanguageContext";

export default function SchemeDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "pmegp";
  const { t, language } = useLanguage();

  const [isSaved, setIsSaved] = useState(false);

  // Find scheme from dataset or fallback to first scheme
  const baseScheme = useMemo(() => {
    return schemes.find((s) => s.id === id) || schemes[0];
  }, [id]);

  // Localize scheme based on current language
  const scheme = useMemo(() => {
    return getLocalizedScheme(baseScheme, language);
  }, [baseScheme, language]);

  useEffect(() => {
    try {
      const savedIds = JSON.parse(localStorage.getItem("govschemes_saved_ids") || "[]");
      if (Array.isArray(savedIds) && savedIds.includes(id)) {
        setIsSaved(true);
      }
    } catch (e) {
      console.error("Failed to read saved status:", e);
    }
  }, [id]);

  const toggleSave = () => {
    try {
      const savedIds = JSON.parse(localStorage.getItem("govschemes_saved_ids") || "[]");
      let updated;
      if (isSaved) {
        updated = savedIds.filter((item: string) => item !== id);
      } else {
        updated = [...savedIds, id];
      }
      localStorage.setItem("govschemes_saved_ids", JSON.stringify(updated));
      setIsSaved(!isSaved);
      window.dispatchEvent(new CustomEvent("govschemes_saved_updated", { detail: updated }));
    } catch (e) {
      console.error("Failed to update saved schemes:", e);
    }
  };

  const matchScore = scheme.matchScore || 94;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        
        {/* Breadcrumb & Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/schemes"
            className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1.5"
          >
            <span>← {t.backToSchemesBtn || "Back to Eligible Schemes"}</span>
          </Link>

          <button
            type="button"
            onClick={toggleSave}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              isSaved
                ? "bg-orange-500 border-orange-500 text-white shadow-xs"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{isSaved ? t.savedBtn : t.saveSchemeBtn || t.saveBtn}</span>
          </button>
        </div>

        {/* Scheme Header Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                scheme.type === "Central Government"
                  ? "text-blue-900 bg-blue-50 border-blue-100"
                  : "text-emerald-800 bg-emerald-50 border-emerald-100"
              }`}>
                {scheme.type === "Central Government" ? t.filterCentral : t.filterState}
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 pt-1">
                {scheme.name}
              </h1>
              {scheme.fullName && (
                <p className="text-xs font-medium text-gray-500">
                  {scheme.fullName}
                  {scheme.ministry && <><br />{scheme.ministry}</>}
                </p>
              )}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[130px]">
              <span className="text-2xl font-extrabold text-emerald-600">{matchScore}%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mt-0.5">{t.eligibilityMatchLabel}</span>
              <span className="text-[9px] text-emerald-600 mt-0.5">{t.highAlignmentSubtitle}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 pt-2 border-t border-gray-100 leading-relaxed">
            {scheme.description}
          </p>
        </div>

        {/* Why You Qualify Section */}
        {scheme.whyEligible && scheme.whyEligible.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <span className="text-emerald-600">✔</span> {t.whyYouQualifyTitle}
              </h3>
              <span className="text-xs text-gray-400 font-medium">{t.whyQualifyMatchNotice || t.whyEligibleSubtitle}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {scheme.whyEligible.map((reason, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                  <p className="text-xs text-gray-700 font-medium">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits & Financial Support */}
        {scheme.benefits && scheme.benefits.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span>💰</span> {t.benefitsTitle}
            </h3>
            <p className="text-xs text-gray-500">{t.benefitsSubtitle}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {scheme.benefits.map((benefitItem, idx) => {
                const parts = benefitItem.split(":");
                const heading = parts.length > 1 ? parts[0] : "";
                const detail = parts.length > 1 ? parts.slice(1).join(":") : benefitItem;

                return (
                  <div key={idx} className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 space-y-1">
                    {heading && <h4 className="text-xs font-bold text-gray-900">{heading}</h4>}
                    <p className="text-xs text-gray-600 leading-relaxed">{detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Eligibility Criteria */}
        {scheme.eligibilityCriteria && scheme.eligibilityCriteria.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-3">
            <h3 className="text-base font-extrabold text-gray-900">{t.criteriaTitle}</h3>
            <p className="text-xs text-gray-500">{t.criteriaSubtitle}</p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-gray-700 pt-1 leading-relaxed">
              {scheme.eligibilityCriteria.map((crit, idx) => (
                <li key={idx}>{crit}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Document Checklist Component */}
        <ApplicationChecklist
          schemeId={id || "default"}
          schemeName={scheme.name}
          documents={scheme.documentsRequired}
        />

        {/* How to Apply (Application Process) */}
        {scheme.howToApply && scheme.howToApply.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-gray-900">{t.howToApplyTitle}</h3>
            <p className="text-xs text-gray-500">{t.howToApplySubtitle}</p>
            
            <div className="space-y-3 pt-2">
              {scheme.howToApply.map((st) => (
                <div key={st.stepNumber} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-900 text-white text-xs font-bold">
                    {st.stepNumber}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs font-bold text-gray-900">{st.title}</h4>
                      {st.stage && (
                        <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {st.stage}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{st.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Application Portal Box */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50/60 rounded-2xl border border-orange-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-2.5 py-1 rounded-md">
              {t.filterCentral}
            </span>
            <h4 className="text-lg font-bold text-gray-900 pt-2">
              {t.readyToApplyTitle.replace("{name}", scheme.name)}
            </h4>
            <p className="text-xs text-gray-600 max-w-xl">
              {t.readyToApplySubtitle}
            </p>
          </div>

          <a
            href={scheme.officialPortalUrl || "https://pmegp.msme.gov.in/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <span>{t.applyNowBtn}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Need Help & Guidance Section */}
        {scheme.helpGuidance && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-gray-900">{t.needHelpTitle}</h3>
            <p className="text-xs text-gray-600">
              {scheme.helpGuidance.whereToGetHelp}
            </p>

            {scheme.helpGuidance.authorizedCentres && scheme.helpGuidance.authorizedCentres.length > 0 && (
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold text-gray-800">{t.authorizedDesksTitle}</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                  {scheme.helpGuidance.authorizedCentres.map((centre, idx) => (
                    <li key={idx}>{centre}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-[11px] text-gray-500 italic pt-2 border-t border-gray-100">
              {scheme.helpGuidance.guidanceNote || t.officialFreeGuidanceNotice}
            </p>
          </div>
        )}

        {/* Feedback Section */}
        <FeedbackSection schemeId={id} schemeName={scheme.name} />

        {/* AI Assistant Chat Component */}
        <div className="pt-2">
          <AssistantChat />
        </div>
      </main>
    </div>
  );
}