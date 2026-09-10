"use client";

import { useLanguage } from "../../lib/LanguageContext";
import { Language } from "../../lib/translations";

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
  const { t, setLanguage } = useLanguage();

  const languageOptions: Array<{
    id: Language;
    label: string;
    native: string;
    desc: string;
    flagBadge: string;
  }> = [
    {
      id: "en",
      label: "English",
      native: "English",
      desc: t.langEnglishDesc,
      flagBadge: "EN",
    },
    {
      id: "hi",
      label: "Hindi",
      native: "हिन्दी",
      desc: t.langHindiDesc,
      flagBadge: "HI",
    },
    {
      id: "mr",
      label: "Marathi",
      native: "मराठी",
      desc: t.langMarathiDesc,
      flagBadge: "MR",
    },
  ];

  const handleLanguagePick = (lang: Language) => {
    onSelectLanguage(lang);
    setLanguage(lang);
  };

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t.chooseLanguage}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {t.chooseLanguageSub}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {languageOptions.map((opt) => {
          const isSelected = selectedLanguage === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleLanguagePick(opt.id)}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-200 flex flex-col justify-between hover:shadow-md cursor-pointer ${
                isSelected
                  ? "border-orange-500 bg-orange-50/50 shadow-sm ring-2 ring-orange-200"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase ${
                    isSelected
                      ? "bg-orange-500 text-white"
                      : "bg-blue-100 text-blue-900"
                  }`}
                >
                  {opt.flagBadge}
                </span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <div>
                <div className="text-lg font-bold text-gray-900 leading-tight">
                  {opt.native}
                </div>
                <div className="text-xs font-medium text-gray-500 mb-1">
                  {opt.label}
                </div>
                <p className="text-xs text-gray-600">
                  {opt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full text-base transition shadow-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <span>{t.btnNext}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
