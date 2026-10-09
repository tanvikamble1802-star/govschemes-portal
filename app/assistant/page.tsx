"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import AssistantChat from "@/components/schemes/AssistantChat";
import { schemes, getLocalizedScheme } from "@/data/schemes";

function AssistantContent() {
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();
  const schemeId = searchParams.get("scheme");

  const activeScheme = schemeId ? schemes.find(s => s.id === schemeId) : null;
  const localizedScheme = activeScheme ? getLocalizedScheme(activeScheme, language) : null;

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <Link href="/" className="hover:text-blue-900 transition-colors">
            {t.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link href="/schemes" className="hover:text-blue-900 transition-colors">
            {t.breadcrumbEligibleSchemes}
          </Link>
          <span>/</span>
          <span className="text-blue-900 font-semibold">{t.navAssistant}</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-900">
              {t.prototypeGuidanceBadge || "AI Guidance"}
            </span>
            {localizedScheme ? (
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
                {t.schemeContextLabel || "Scheme:"} {localizedScheme.name}
              </span>
            ) : (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                {t.generalModeBadge || "General Mode"}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
            {t.assistantPageTitle || "AI Scheme Assistant"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
            {t.assistantPageSubtitle || "Get guidance understanding government schemes, eligibility, documents and applications."}
          </p>
        </div>

        {/* Embedded Chat Assistant */}
        <AssistantChat />

        {/* Disclaimer Notice */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-700">📌 </strong>
          {t.assistantDisclaimer}
        </div>
      </div>
    </main>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-gray-500">Loading...</div>}>
      <AssistantContent />
    </Suspense>
  );
}
