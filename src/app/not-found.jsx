import Link from 'next/link';
import { Dumbbell, MapPinOff, ArrowLeft, Search } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found - FitCore',
  description: 'The page you are looking for does not exist.',
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex flex-col items-center justify-center p-4 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-gray-800 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
          {/* Custom Illustration */}
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-[#C6F4D6] dark:bg-[#16A34A]/20 rounded-full blur-2xl opacity-60"></div>
            <div className="relative w-32 h-32 bg-[#F8FAFC] dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 rounded-full flex items-center justify-center shadow-sm mx-auto">
              <MapPinOff
                className="w-14 h-14 text-[#22C55E]"
                strokeWidth={1.5}
              />

              <div className="absolute -top-3 -right-3 bg-white dark:bg-[#0F172A] p-2.5 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-gray-700">
                <Dumbbell className="w-6 h-6 text-[#64748B] dark:text-gray-400 rotate-45" />
              </div>
            </div>
          </div>

          {/* Typography */}
          <h1 className="text-7xl sm:text-8xl font-bold tracking-tighter text-[#15803D] dark:text-[#C6F4D6] mb-4">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1E293B] dark:text-white mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-[#64748B] dark:text-gray-400 mb-10 leading-relaxed max-w-lg mx-auto">
            The page you are looking for may have been removed, renamed, or is
            temporarily unavailable.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-[#22C55E] text-white font-semibold rounded-full px-8 py-3.5 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:bg-[#16A34A] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back To Home
            </Link>

            <Link
              href="/classes"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-white dark:bg-gray-800 border border-[#E2E8F0] dark:border-gray-700 text-[#1E293B] dark:text-white font-semibold rounded-full px-8 py-3.5 hover:bg-[#F8FAFC] dark:hover:bg-gray-700/50 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
            >
              <Search className="w-5 h-5 text-[#64748B] dark:text-gray-400" />
              Explore Classes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
