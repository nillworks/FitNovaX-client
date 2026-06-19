"use client";
import React from 'react';

const TrainerSuccess = () => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col items-center text-center gap-4 w-full">
      <div className="mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Application Submitted!</h2>
      <p className="text-[#64748B] font-semibold leading-relaxed max-w-md mx-auto">
        Your trainer application is now pending review. You'll be notified once the admin reviews it.
      </p>
    </div>
  );
};

export default TrainerSuccess;
