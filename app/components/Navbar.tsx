"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../lib/LanguageContext";
import { getStoredProfile, UserProfile } from "../lib/profileStorage";
import ProfileModal from "./ProfileModal";

export default function Navbar() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Read profile on mount
    const p = getStoredProfile();
    setProfile(p);

    const handleProfileUpdate = () => {
      setProfile(getStoredProfile());
    };

    window.addEventListener("govschemes_profile_updated", handleProfileUpdate);
    return () => window.removeEventListener("govschemes_profile_updated", handleProfileUpdate);
  }, []);

  const handleEditProfileFromModal = () => {
    // Notify page to switch to edit mode or redirect
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
          <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center text-blue-900 font-extrabold text-sm shadow-xs group-hover:scale-105 transition">
            GS
          </div>
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl leading-tight tracking-tight">
              GovSchemes
            </h1>
            <p className="text-[11px] text-blue-200 leading-tight">
              {t.govSubtitle}
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-orange-300 transition">
            {t.navHome}
          </Link>
          <Link href="/eligibility-form" className="hover:text-orange-300 transition">
            {t.navFind}
          </Link>
          <a href="#why-govschemes" className="hover:text-orange-300 transition">
            {t.navHelp}
          </a>

          {/* Profile / Preferences Button (No language dropdown in navbar!) */}
          {profile?.name ? (
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="bg-blue-800 hover:bg-blue-700 border border-blue-700 hover:border-orange-400 text-white rounded-full pl-2 pr-3 py-1 text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-xs"
              title="View Profile & Preferences"
            >
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-[11px]">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[120px] truncate">{profile.name}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="text-xs bg-blue-800/80 hover:bg-blue-800 px-3.5 py-1.5 rounded-full border border-blue-700 text-blue-100 hover:text-white transition flex items-center cursor-pointer"
            >
              <span>{t.navPreferences}</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {profile?.name && (
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-xs"
            >
              {profile.name.charAt(0).toUpperCase()}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-blue-100 hover:text-white hover:bg-blue-800 focus:outline-none"
            aria-label="Toggle menu"
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
        <div className="md:hidden bg-blue-950 text-white border-b border-blue-800 px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium py-1 hover:text-orange-300"
          >
            {t.navHome}
          </Link>
          <Link
            href="/eligibility-form"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium py-1 hover:text-orange-300"
          >
            {t.navFind}
          </Link>
          <a
            href="#why-govschemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium py-1 hover:text-orange-300"
          >
            {t.navHelp}
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setIsProfileModalOpen(true);
            }}
            className="w-full text-left text-sm font-semibold py-2 text-orange-300 flex items-center border-t border-blue-900 pt-3"
          >
            <span>{profile?.name ? `${profile.name} (${t.myProfile})` : t.navPreferences}</span>
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