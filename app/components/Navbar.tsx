"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../lib/LanguageContext";
import { getStoredProfile, UserProfile } from "../lib/profileStorage";
import ProfileModal from "./ProfileModal";

const STORAGE_KEY = "govschemes_saved_ids";

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync profile and saved schemes count on mount and on storage events
  useEffect(() => {
    const p = getStoredProfile();
    setProfile(p);

    const updateSavedCount = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setSavedCount(parsed.length);
          }
        } else {
          setSavedCount(0);
        }
      } catch (e) {
        console.error("Failed to read saved schemes:", e);
      }
    };

    updateSavedCount();

    const handleProfileUpdate = () => {
      setProfile(getStoredProfile());
    };

    const handleSavedUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (Array.isArray(customEvent.detail)) {
        setSavedCount(customEvent.detail.length);
      } else {
        updateSavedCount();
      }
    };

    window.addEventListener("govschemes_profile_updated", handleProfileUpdate);
    window.addEventListener("govschemes_saved_updated", handleSavedUpdate);
    window.addEventListener("storage", updateSavedCount);

    return () => {
      window.removeEventListener("govschemes_profile_updated", handleProfileUpdate);
      window.removeEventListener("govschemes_saved_updated", handleSavedUpdate);
      window.removeEventListener("storage", updateSavedCount);
    };
  }, []);

  const handleEditProfileFromModal = () => {
    window.dispatchEvent(new CustomEvent("govschemes_edit_profile"));
  };

  const handleProfileReset = () => {
    setProfile(null);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="bg-blue-900 text-white px-4 sm:px-6 py-3.5 flex justify-between items-center shadow-md sticky top-0 z-40">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center text-blue-900 font-extrabold text-sm shadow-xs group-hover:scale-105 transition-transform">
            GS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl leading-tight tracking-tight">
                GovSchemes
              </h1>
              <span className="rounded-full bg-blue-800 border border-blue-700 px-1.5 py-0.2 text-[9px] font-bold text-blue-200">
                SIH26092
              </span>
            </div>
            <p className="text-[11px] text-blue-200 leading-tight">
              {t.govSubtitle || "Government Schemes Portal for Marginalized Entrepreneurs"}
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-5 text-sm font-medium">
          <Link href="/" className="hover:text-orange-300 transition-colors">
            {t.navHome || "Home"}
          </Link>
          <Link href="/eligibility-form" className="hover:text-orange-300 transition-colors">
            {t.navFind || "Check Eligibility"}
          </Link>
          <Link href="/schemes" className="hover:text-orange-300 transition-colors">
            {t.navSchemes || "Schemes"}
          </Link>
          <Link
            href="/saved"
            className="hover:text-orange-300 transition-colors flex items-center gap-1.5"
          >
            <span>{t.navSaved || "Saved"}</span>
            {savedCount > 0 && (
              <span className="rounded-full bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.2 leading-tight">
                {savedCount}
              </span>
            )}
          </Link>
          <Link
            href="/assistant"
            className="hover:text-orange-300 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>{t.navAssistant || "AI Assistant"}</span>
          </Link>
          <Link href="/#why-govschemes" className="hover:text-orange-300 transition-colors">
            {t.navHelp || "Help"}
          </Link>

          {/* Quick Language Selector */}
          <div className="flex items-center rounded-full bg-blue-950/80 border border-blue-700/80 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                language === "en"
                  ? "bg-orange-500 text-white shadow-xs"
                  : "text-blue-200 hover:text-white"
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                language === "hi"
                  ? "bg-orange-500 text-white shadow-xs"
                  : "text-blue-200 hover:text-white"
              }`}
              title="हिन्दी"
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLanguage("mr")}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                language === "mr"
                  ? "bg-orange-500 text-white shadow-xs"
                  : "text-blue-200 hover:text-white"
              }`}
              title="मराठी"
            >
              मराठी
            </button>
          </div>

          {/* Profile / Preferences Button */}
          {profile?.name ? (
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="bg-blue-800 hover:bg-blue-700 border border-blue-700 hover:border-orange-400 text-white rounded-full pl-2 pr-3 py-1 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              title="View Profile & Preferences"
            >
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-[11px]">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[110px] truncate">{profile.name}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="text-xs bg-blue-800/80 hover:bg-blue-800 px-3.5 py-1.5 rounded-full border border-blue-700 text-blue-100 hover:text-white transition-colors flex items-center cursor-pointer"
            >
              <span>{t.navPreferences || "Preferences"}</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick Mobile Language Toggle */}
          <div className="flex items-center rounded-lg bg-blue-950 border border-blue-700 p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-1.5 py-0.5 rounded font-bold ${
                language === "en" ? "bg-orange-500 text-white" : "text-blue-200"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`px-1.5 py-0.5 rounded font-bold ${
                language === "hi" ? "bg-orange-500 text-white" : "text-blue-200"
              }`}
            >
              हि
            </button>
            <button
              type="button"
              onClick={() => setLanguage("mr")}
              className={`px-1.5 py-0.5 rounded font-bold ${
                language === "mr" ? "bg-orange-500 text-white" : "text-blue-200"
              }`}
            >
              म
            </button>
          </div>

          <Link
            href="/saved"
            className="p-1.5 text-blue-100 hover:text-white relative"
            title="Saved Schemes"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </Link>
          {profile?.name && (
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer"
            >
              {profile.name.charAt(0).toUpperCase()}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            className="p-1.5 rounded-md text-blue-100 hover:text-white hover:bg-blue-800 focus:outline-none cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-950 text-white border-b border-blue-800 px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium py-1 hover:text-orange-300 transition-colors"
          >
            {t.navHome || "Home"}
          </Link>
          <Link
            href="/eligibility-form"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium py-1 hover:text-orange-300 transition-colors"
          >
            {t.navFind || "Check Eligibility"}
          </Link>
          <Link
            href="/schemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium py-1 hover:text-orange-300 transition-colors"
          >
            {t.navSchemes || "Schemes"}
          </Link>
          <Link
            href="/saved"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium py-1 hover:text-orange-300 transition-colors"
          >
            {t.navSaved || "Saved Schemes"} {savedCount > 0 && `(${savedCount})`}
          </Link>
          <Link
            href="/assistant"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium py-1 hover:text-orange-300 transition-colors"
          >
            {t.navAssistant || "AI Assistant"}
          </Link>
          <Link
            href="/#why-govschemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium py-1 hover:text-orange-300 transition-colors"
          >
            {t.navHelp || "Help"}
          </Link>

          {/* Mobile Language Selector Row */}
          <div className="pt-2 border-t border-blue-900 flex items-center justify-between">
            <span className="text-xs text-blue-300 font-medium">{t.chooseLanguage || "Language"}:</span>
            <div className="flex items-center rounded-lg bg-blue-900 border border-blue-700 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  language === "en" ? "bg-orange-500 text-white" : "text-blue-200 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`px-2 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  language === "hi" ? "bg-orange-500 text-white" : "text-blue-200 hover:text-white"
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setLanguage("mr")}
                className={`px-2 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  language === "mr" ? "bg-orange-500 text-white" : "text-blue-200 hover:text-white"
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setIsProfileModalOpen(true);
            }}
            className="w-full text-left text-sm font-semibold py-2 text-orange-300 flex items-center border-t border-blue-900 pt-3 cursor-pointer"
          >
            <span>{profile?.name ? `${profile.name} (${t.myProfile || "My Profile"})` : t.navPreferences || "Preferences"}</span>
          </button>
        </div>
      )}

      {/* Profile & Preferences Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onEditProfile={handleEditProfileFromModal}
        onProfileReset={handleProfileReset}
      />
    </>
  );
}