export interface UserProfile {
  name: string;
  age: string;
  gender: string;
  state: string;
  district: string;
  category: string;
  disability: string;
  minority: string;
  locationType: string;
  education: string;
  occupation: string;
  businessName?: string;
  businessStage?: string;
  yearsInBusiness?: string;
  annualIncome: string;
  turnover?: string;
  employmentStatus: string;
  selectedLanguage?: string;
  profileCreated: boolean;
}

const PROFILE_STORAGE_KEY = "userProfile";

/**
 * Saves the user profile securely to localStorage.
 */
export function saveStoredProfile(profile: UserProfile): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error("Failed to save profile to localStorage:", error);
    }
  }
}

/**
 * Loads the user profile from localStorage if it exists.
 */
export function getStoredProfile(): UserProfile | null {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as UserProfile;
      }
    } catch (error) {
      console.error("Failed to parse profile from localStorage:", error);
    }
  }
  return null;
}

/**
 * Clears the stored user profile (useful for resetting/logging out).
 */
export function clearStoredProfile(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear profile from localStorage:", error);
    }
  }
}
