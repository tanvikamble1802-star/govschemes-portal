"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "./translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations["en"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "govschemes_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Load persisted language on client mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (savedLang && (savedLang === "en" || savedLang === "hi" || savedLang === "mr")) {
        setLanguageState(savedLang);
      } else {
        // Check profile
        const profileData = localStorage.getItem("govschemes_user_profile");
        if (profileData) {
          const parsed = JSON.parse(profileData);
          if (parsed?.selectedLanguage && ["en", "hi", "mr"].includes(parsed.selectedLanguage)) {
            setLanguageState(parsed.selectedLanguage);
            localStorage.setItem(LANGUAGE_STORAGE_KEY, parsed.selectedLanguage);
          }
        }
      }
    } catch {
      // localStorage disabled or not accessible
    }

    const handleProfileUpdate = () => {
      try {
        const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
        if (savedLang && (savedLang === "en" || savedLang === "hi" || savedLang === "mr")) {
          setLanguageState(savedLang);
        }
      } catch {}
    };

    const handleLanguageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail && ["en", "hi", "mr"].includes(customEvent.detail)) {
        setLanguageState(customEvent.detail);
      }
    };

    window.addEventListener("govschemes_profile_updated", handleProfileUpdate);
    window.addEventListener("govschemes_language_updated", handleLanguageUpdate);
    return () => {
      window.removeEventListener("govschemes_profile_updated", handleProfileUpdate);
      window.removeEventListener("govschemes_language_updated", handleLanguageUpdate);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      // Sync into profile if it exists
      const profileData = localStorage.getItem("govschemes_user_profile");
      if (profileData) {
        const parsed = JSON.parse(profileData);
        parsed.selectedLanguage = lang;
        parsed.language = lang === "hi" ? "हिंदी" : lang === "mr" ? "मराठी" : "English";
        localStorage.setItem("govschemes_user_profile", JSON.stringify(parsed));
      }
      window.dispatchEvent(new CustomEvent("govschemes_language_updated", { detail: lang }));
    } catch (err) {
      console.error("Failed to store language preference:", err);
    }
  };

  const value = {
    language,
    setLanguage,
    t: translations[language] || translations.en,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}