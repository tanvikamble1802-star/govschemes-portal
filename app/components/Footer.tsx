"use client";

import Link from "next/link";
import { useLanguage } from "../lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-blue-950 text-white border-t border-blue-900 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-blue-900/80">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-blue-900 font-extrabold text-xs shadow-xs">
                GS
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                GovSchemes
              </span>
            </div>
            <p className="mt-2 text-xs text-blue-200 max-w-md leading-relaxed">
              {t.footerTagline || "AI-driven government schemes discovery and matching portal across India."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-blue-200 font-medium">
            <Link href="/" className="hover:text-orange-300 transition-colors">
              {t.navHome || "Home"}
            </Link>
            <Link href="/eligibility-form" className="hover:text-orange-300 transition-colors">
              {t.navFind || "Check Eligibility"}
            </Link>
            <Link href="/schemes" className="hover:text-orange-300 transition-colors">
              {t.navSchemes || "All Schemes"}
            </Link>
            <Link href="/saved" className="hover:text-orange-300 transition-colors">
              {t.navSaved || "Saved Schemes"}
            </Link>
            <Link href="/assistant" className="hover:text-orange-300 transition-colors">
              {t.navAssistant || "AI Assistant"}
            </Link>
            <Link href="/#why-govschemes" className="hover:text-orange-300 transition-colors">
              {t.navHelp || "Help"}
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300">
          <p>
            {t.footerText || `© ${new Date().getFullYear()} GovSchemes. All rights reserved.`}
          </p>
          <p className="text-[11px] text-blue-400 text-center sm:text-right max-w-xl">
            {t.footerDisclaimer || "Guidance prototype for eligible scheme identification. Applications are submitted directly to official government portals."}
          </p>
        </div>
      </div>
    </footer>
  );
}