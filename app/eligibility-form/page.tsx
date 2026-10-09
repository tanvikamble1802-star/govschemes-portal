"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function EligibilityFormPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form state fields
  const [formData, setFormData] = useState({
    language: "English",
    fullName: "",
    age: "",
    gender: "",
    state: "",
    district: "",
    socialCategory: "",
    locationType: "Rural",
    pwd: "No",
    minority: "No",
    occupation: "",
    businessStage: "",
    businessName: "",
    yearsInBusiness: "Not started yet (0 years)",
    annualIncome: "",
    employmentStatus: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 6) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    try {
      localStorage.setItem("govschemes_user_profile", JSON.stringify(formData));
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
    router.push("/schemes");
  };

  const stepsList = [
    { num: 1, label: "Language" },
    { num: 2, label: "Personal" },
    { num: 3, label: "Social" },
    { num: 4, label: "Business" },
    { num: 5, label: "Financial" },
    { num: 6, label: "Review & Save" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-gray-900">Government Schemes Portal</h1>
        <p className="text-xs text-gray-500">
          Complete your onboarding to find eligible welfare schemes tailored for you.
        </p>
      </div>

      {/* Stepper Progress Bar Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between relative">
          {stepsList.map((s) => (
            <div key={s.num} className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.num
                    ? "bg-orange-500 text-white shadow-md ring-4 ring-orange-100"
                    : step > s.num
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </div>
              <span className="text-[11px] font-semibold text-gray-600 mt-1.5 hidden sm:block">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* STEP 1: Language */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Choose Your Language</h3>
            <p className="text-xs text-gray-500">Select your preferred regional language to personalize the entire platform.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { lang: "English", sub: "Standard English interface" },
                { lang: "हिंदी", sub: "हिंदी में पूरा इंटरफेस" },
                { lang: "मराठी", sub: "मराठीत संपूर्ण इंटरफेस" },
              ].map((item) => (
                <div
                  key={item.lang}
                  onClick={() => updateField("language", item.lang)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    formData.language === item.lang
                      ? "border-blue-900 bg-blue-50/50 shadow-xs ring-1 ring-blue-900"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm font-bold text-gray-900">{item.lang}</div>
                  <div className="text-xs text-gray-500 pt-1">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Personal Details */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Personal Information</h3>
            <p className="text-xs text-gray-500">Please provide your personal details to match relevant government schemes.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Neha Sharma"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Age *</label>
                <input
                  type="number"
                  placeholder="e.g. 25"
                  value={formData.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">State *</label>
                <select
                  value={formData.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-700">District *</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai"
                  value={formData.district}
                  onChange={(e) => updateField("district", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Social Background */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Social Background</h3>
            <p className="text-xs text-gray-500">This helps us match you with category-specific welfare schemes.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Social Category *</label>
                <select
                  value={formData.socialCategory}
                  onChange={(e) => updateField("socialCategory", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="Scheduled Caste (SC)">Scheduled Caste (SC)</option>
                  <option value="Scheduled Tribe (ST)">Scheduled Tribe (ST)</option>
                  <option value="Other Backward Class (OBC)">Other Backward Class (OBC)</option>
                  <option value="General / Open">General / Open</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Location Type *</label>
                <select
                  value={formData.locationType}
                  onChange={(e) => updateField("locationType", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="Rural">Rural</option>
                  <option value="Urban">Urban</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Person with Disability (PwD)?</label>
                <select
                  value={formData.pwd}
                  onChange={(e) => updateField("pwd", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Belong to Minority Community?</label>
                <select
                  value={formData.minority}
                  onChange={(e) => updateField("minority", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Business & Occupation */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Business & Occupation</h3>
            <p className="text-xs text-gray-500">Tell us about your venture, artisan trade, or business concept.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-700">Occupation / Business Type *</label>
                <input
                  type="text"
                  placeholder="e.g. Handicrafts, Kirana Store, Tailoring, Food Stall"
                  value={formData.occupation}
                  onChange={(e) => updateField("occupation", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Business Stage *</label>
                <select
                  value={formData.businessStage}
                  onChange={(e) => updateField("businessStage", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="">Select Stage</option>
                  <option value="Idea Stage">Idea Stage</option>
                  <option value="Early Startup (0-1 years)">Early Startup (0-1 years)</option>
                  <option value="Established Business">Established Business</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Years in Business</label>
                <select
                  value={formData.yearsInBusiness}
                  onChange={(e) => updateField("yearsInBusiness", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="Not started yet (0 years)">Not started yet (0 years)</option>
                  <option value="1 Year">1 Year</option>
                  <option value="2-3 Years">2-3 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Financial Details */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Financial Details</h3>
            <p className="text-xs text-gray-500">Provide your income details to filter schemes with financial eligibility brackets.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Annual Family Income (₹) *</label>
                <input
                  type="number"
                  placeholder="e.g. 150000"
                  value={formData.annualIncome}
                  onChange={(e) => updateField("annualIncome", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Employment Status *</label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => updateField("employmentStatus", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="">Select Status</option>
                  <option value="Self-Employed / Entrepreneur">Self-Employed / Entrepreneur</option>
                  <option value="Unemployed / Job Seeker">Unemployed / Job Seeker</option>
                  <option value="Daily Wage Worker">Daily Wage Worker</option>
                  <option value="Salaried Employee">Salaried Employee</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review & Save */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Review Your Profile</h3>
            <p className="text-xs text-gray-500">Please verify your information before we match you with eligible government schemes.</p>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3 text-xs">
              <div>
                <span className="font-bold text-gray-900">Personal Information:</span>
                <p className="text-gray-600">{formData.fullName || "N/A"}, {formData.age || "N/A"} yrs, {formData.gender || "N/A"} - {formData.district || "N/A"}, {formData.state || "N/A"}</p>
              </div>
              <div>
                <span className="font-bold text-gray-900">Social Background:</span>
                <p className="text-gray-600">Category: {formData.socialCategory || "N/A"} | Location: {formData.locationType}</p>
              </div>
              <div>
                <span className="font-bold text-gray-900">Business & Occupation:</span>
                <p className="text-gray-600">{formData.occupation || "N/A"} ({formData.businessStage || "N/A"})</p>
              </div>
              <div>
                <span className="font-bold text-gray-900">Financial Details:</span>
                <p className="text-gray-600">Annual Income: ₹{formData.annualIncome || "0"} | Status: {formData.employmentStatus || "N/A"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <span>{step === 6 ? "Confirm & Find Schemes" : "Continue"}</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
}