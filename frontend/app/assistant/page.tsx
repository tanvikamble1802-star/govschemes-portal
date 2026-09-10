import Link from "next/link";
import AssistantChat from "@/src/components/AssistantChat";

interface AssistantPageProps {
  searchParams: Promise<{ scheme?: string }>;
}

export default async function AssistantPage({
  searchParams,
}: AssistantPageProps) {
  const { scheme: schemeId } = await searchParams;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col">
      {/* Official Government Top Bar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        {/* Subtle Indian Tricolor top accent strip */}
        <div className="flex h-1 w-full">
          <div className="w-1/3 bg-[#FF6B00]" />
          <div className="w-1/3 bg-white" />
          <div className="w-1/3 bg-[#138808]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#173B8F] text-white shadow-sm">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold tracking-tight text-[#0F2557]">
                    GovSchemes
                  </span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#173B8F]">
                    AI Assistant
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500">
                  Government Schemes Guidance Portal
                </p>
              </div>
            </div>

            {/* Top Quick Links */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/schemes"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                <span>Find Schemes</span>
              </Link>
              <Link
                href="/saved"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                <svg
                  className="h-3.5 w-3.5 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>Saved Schemes</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Assistant Chat Interface with schemeId prop */}
      <AssistantChat schemeId={schemeId} />

      {/* Official Government Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
              <span className="font-semibold text-slate-700">GovSchemes</span>
              <span>• AI Scheme Assistant (SIH26092)</span>
            </div>
            <p>© {new Date().getFullYear()} Government of India Scheme Eligibility Portal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
