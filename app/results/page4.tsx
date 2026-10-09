"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResultsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/schemes");
  }, [router]);

  return (
    <main className="flex-1 bg-gray-50 flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-blue-900 border-t-orange-500 rounded-full animate-spin" />
    </main>
  );
}
