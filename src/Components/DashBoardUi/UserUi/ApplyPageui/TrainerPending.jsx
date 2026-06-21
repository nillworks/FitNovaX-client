"use client";
import React from 'react';

const TrainerPending = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col gap-6 w-full relative overflow-hidden group">
      
      {/* Decorative gradient background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-gradient-to-br from-[#F59E0B]/10 to-[#FDE047]/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        {/* Application Pending Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FEF9C3] to-[#FEF08A] text-[#854D0E] font-bold text-sm rounded-full border border-[#FDE047] shadow-sm tracking-tight">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D97706]"></span>
          </span>
          Application Pending
        </div>
      </div>

      {/* Application Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-2 relative z-10">
        <div className="flex flex-col gap-1.5 p-5 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9]">
          <span className="text-[#64748B] font-bold text-xs uppercase tracking-wider">Specialty</span>
          <span className="text-[#1E293B] font-extrabold text-lg">{data.specialty || 'Not Specified'}</span>
        </div>
        
        <div className="flex flex-col gap-1.5 p-5 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9]">
          <span className="text-[#64748B] font-bold text-xs uppercase tracking-wider">Experience</span>
          <span className="text-[#1E293B] font-extrabold text-lg">{data.experience || 0} <span className="text-base font-semibold text-[#64748B]">years</span></span>
        </div>

        <div className="flex flex-col gap-1.5 p-5 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9]">
          <span className="text-[#64748B] font-bold text-xs uppercase tracking-wider">Age</span>
          <span className="text-[#1E293B] font-extrabold text-lg">{data.age || 'Not Specified'}</span>
        </div>

        <div className="flex flex-col gap-1.5 p-5 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] sm:col-span-2 md:col-span-1">
          <span className="text-[#64748B] font-bold text-xs uppercase tracking-wider">Education</span>
          <span className="text-[#1E293B] font-extrabold text-lg">{data.education || 'Not Specified'}</span>
        </div>

        <div className="flex flex-col gap-1.5 p-5 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] sm:col-span-2 md:col-span-2">
          <span className="text-[#64748B] font-bold text-xs uppercase tracking-wider">Available Time</span>
          <span className="text-[#1E293B] font-extrabold text-base">{data.availableTime || 'Not Specified'}</span>
        </div>
        
        <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-3 p-5 sm:p-6 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] rounded-2xl border border-[#E2E8F0] shadow-[inset_0_2px_4px_rgb(0,0,0,0.02)]">
          <span className="text-[#64748B] font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Biography
          </span>
          <p className="text-[#334155] font-medium text-base leading-relaxed">
            {data.bio || 'No biography provided.'}
          </p>
        </div>
      </div>

    </div>
  );
};

export default TrainerPending;
