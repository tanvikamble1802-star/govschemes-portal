export interface UserProfile {
  name: string;
  age: number | string;
  gender: string;
  state: string;
  district: string;
  category: string;
  disability: string;
  minority: string;
  occupation: string;
  businessName?: string;
  businessStage: string;
  businessType?: string;
  yearsInBusiness?: string;
  annualIncome: number | string;
  turnover?: string;
  employmentStatus: string;
  education: string;
  locationType: string;
  selectedLanguage: "en" | "hi" | "mr";
  profileCreated: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const STORAGE_KEY = "govschemes_user_profile";
const PROFILE_CREATED_KEY = "govschemes_profile_created";

export function getStoredProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as UserProfile;
  } catch (error) {
    console.error("Failed to read user profile from storage:", error);
    return null;
  }
}

export function saveStoredProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    const updatedProfile: UserProfile = {
      ...profile,
      profileCreated: true,
      updatedAt: new Date().toISOString(),
      createdAt: profile.createdAt || new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    localStorage.setItem(PROFILE_CREATED_KEY, "true");
    // Also sync preferred language
    if (updatedProfile.selectedLanguage) {
      localStorage.setItem("govschemes_language", updatedProfile.selectedLanguage);
    }
    // Dispatch custom event for reactive UI updates
    window.dispatchEvent(new Event("govschemes_profile_updated"));
  } catch (error) {
    console.error("Failed to save user profile to storage:", error);
  }
}

export function isProfileCreated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const flag = localStorage.getItem(PROFILE_CREATED_KEY);
    return flag === "true";
  } catch {
    return false;
  }
}

export function clearStoredProfile(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROFILE_CREATED_KEY);
    window.dispatchEvent(new Event("govschemes_profile_updated"));
  } catch (error) {
    console.error("Failed to clear profile from storage:", error);
  }
}
