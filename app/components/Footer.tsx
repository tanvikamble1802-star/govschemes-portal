"use client";

import { useLanguage } from "../lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white p-6 text-center mt-12 border-t border-gray-700">
      <p className="text-sm text-gray-300">
        {t.footerText || "© 2026 GovSchemes Project. Built for SIH26092."}
      </p>
    </footer>
  );
}