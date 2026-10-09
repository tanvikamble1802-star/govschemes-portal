"use client";

import { Language } from "../../lib/translations";
import { useLanguage } from "../../lib/LanguageContext";

interface StepLanguageProps {
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onNext: () => void;
}

export default function StepLanguage({
  selectedLanguage,
  onSelectLanguage,
  onNext,
}: StepLanguageProps) {
  const { t } = useLanguage();

  const languages: { code: Language; label: string; native: string; desc: string }[] = [
    { code: "en", label: "English", native: "English", desc: t.langEnglishDesc },
    { code: "hi", label: "Hindi", native: "हिन्दी", desc: t.langHindiDesc },
    { code: "mr", label: "Marathi", native: "मराठी", desc: t.langMarathiDesc },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{t.chooseLanguage}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {t.chooseLanguageSub}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => onSelectLanguage(lang.code)}
            className={`p-4 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
              selectedLanguage === lang.code
                ? "border-blue-600 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-200"
                : "border-gray-200 bg-white hover:border-gray-300 text-gray-800"
            }`}
          >
            <div>
              <span className="font-bold text-lg block">{lang.native}</span>
              <span className="text-xs text-gray-500 mt-0.5 block">{lang.label}</span>
            </div>
            <span className="text-[11px] text-gray-400 mt-3">{lang.desc}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition cursor-pointer"
        >
          {t.continueBtn || t.btnNext}
        </button>
      </div>
    </div>
  );
}