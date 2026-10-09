"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import SavedSchemesList from "@/components/schemes/SavedSchemesList";

export default function SavedPage() {
  const { t } = useLanguage();

  return (
    <main className="flex-1 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <Link href="/" className="hover:text-blue-900 transition-colors">
            {t.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link href="/schemes" className="hover:text-blue-900 transition-colors">
            {t.breadcrumbEligibleSchemes}
          </Link>
          <span>/</span>
          <span className="text-blue-900 font-semibold">{t.breadcrumbSavedSchemes}</span>
        </nav>

        {/* Saved Schemes Component */}
        <SavedSchemesList />
      </div>
    </main>
  );
}
