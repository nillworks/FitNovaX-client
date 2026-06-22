'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Dumbbell,
  Home,
  RefreshCw,
} from 'lucide-react';

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-25 dark:bg-[#0F172A] flex flex-col items-center justify-center p-4 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-gray-800 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FECACA]/30 dark:bg-[#EF4444]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C6F4D6]/40 dark:bg-[#22C55E]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <div className="relative mb-10">
            <div className="absolute inset-0 bg-[#FECACA] dark:bg-[#EF4444]/20 rounded-full blur-2xl opacity-50" />
            <div className="relative w-32 h-32 bg-[#FEF2F2] dark:bg-gray-800 border border-[#FECACA] dark:border-gray-700 rounded-full flex items-center justify-center shadow-sm mx-auto">
              <AlertTriangle
                className="w-14 h-14 text-[#EF4444]"
                strokeWidth={1.5}
              />

              <div className="absolute -top-3 -right-3 bg-white dark:bg-[#0F172A] p-2.5 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-gray-700">
                <Dumbbell className="w-6 h-6 text-[#64748B] dark:text-gray-400 rotate-45" />
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#FEF2F2] dark:bg-[#EF4444]/10 border border-[#FECACA] dark:border-[#EF4444]/30 text-[#EF4444] text-xs font-bold tracking-widest uppercase mb-5">
            Something went wrong
          </span>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-[#EF4444] dark:text-[#FCA5A5] mb-4">
            Error
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B] dark:text-white mb-4">
            We hit an unexpected bump
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-gray-400 mb-6 leading-relaxed max-w-lg mx-auto">
            Don&apos;t worry — your fitness journey is safe. Try refreshing this
            page or head back to the homepage while we get things back on track.
          </p>

          {error?.message && (
            <div className="w-full max-w-lg mb-8 rounded-2xl border border-[#FECACA] dark:border-[#EF4444]/30 bg-[#FEF2F2]/60 dark:bg-[#EF4444]/5 px-4 py-3 text-left">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444] mb-1">
                Error details
              </p>
              <p className="text-sm text-[#991B1B] dark:text-[#FCA5A5] font-medium break-words">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-[#22C55E] text-white font-semibold rounded-full px-8 py-3.5 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:bg-[#16A34A] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-white dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 text-[#1E293B] dark:text-white font-semibold rounded-full px-8 py-3.5 hover:bg-[#F8FAFC] dark:hover:bg-gray-700/50 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
            >
              <Home className="w-5 h-5 text-[#64748B] dark:text-gray-400" />
              Back To Home
            </Link>
          </div>

          <Link
            href="/classes"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] dark:text-gray-400 hover:text-[#22C55E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Or explore available classes
          </Link>
        </div>
      </div>
    </div>
  );
}
