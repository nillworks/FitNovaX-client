'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-indigo-100 p-8 text-center transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-200 rounded-full animate-ping opacity-50"></div>
            <div className="relative bg-white rounded-full p-2 z-10">
              <AlertCircle className="w-20 h-20 text-red-500" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-500 mb-8">
          We encountered an unexpected error while processing your request. Please try again or return to the homepage.
        </p>

        <div className="bg-red-50/80 border border-red-100 rounded-2xl p-4 mb-8 text-left backdrop-blur-sm overflow-hidden">
          <p className="text-sm font-medium text-red-800 break-words">
            {error?.message || "An unknown error occurred"}
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium transition-all duration-200 group"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-gray-200 rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Need help? Contact{' '}
            <a
              href="mailto:support@fontrend.com"
              className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
            >
              support@fontrend.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
