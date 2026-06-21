"use client";
import React from 'react';

const TrainerPending = ({ data, onEdit }) => {
  if (!data) return null;

  return (
    <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col gap-6 w-full relative overflow-hidden group">
      
      {/* Decorative gradient background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-gradient-to-br from-[#22C55E]/10 to-[#10B981]/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        {/* Application Pending Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#DCFCE7] to-[#D1FAE5] text-[#15803D] font-bold text-sm rounded-full border border-[#86EFAC] shadow-sm tracking-tight">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A]"></span>
          </span>
          Application Pending
        </div>

        {/* Edit Button */}
        <button 
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#1E293B] rounded-xl font-bold text-sm transition-colors border border-[#E2E8F0] hover:border-[#CBD5E1]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Application
        </button>
      </div>

      {/* Application Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-2 relative z-10">
        <div className="flex flex-col gap-1.5 p-5 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9]">
          <span className="text-[#64748B] font-bold text-xs uppercase tracking-wider">Specialty</span>
          <span className="text-[#1E293B] font-extrabold text-lg">{data.specialty || 'Not Specified'}</span>
        </div>
        
        <div className="flex flex-col gap-1.5 p-5 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9]">
          <span className="text-[#64748B] font-bold text-xs uppercase tracking-wider">Experience</span>
          <span className="text-[#1E293B] font-extrabold text-lg">{data.experience || 0} <span className="text-base font-semibold text-[#64748B]">years</span></span>
        </div>

        {data.certifications && (
          <div className="flex flex-col gap-1.5 p-5 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] sm:col-span-2">
            <span className="text-[#64748B] font-bold text-xs uppercase tracking-wider">Certifications</span>
            <span className="text-[#1E293B] font-extrabold text-base">{data.certifications}</span>
          </div>
        )}
        
        <div className="flex flex-col gap-3 sm:col-span-2 p-5 sm:p-6 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] rounded-2xl border border-[#E2E8F0] shadow-[inset_0_2px_4px_rgb(0,0,0,0.02)]">
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
