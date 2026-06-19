"use client";
import React from 'react';

const TrainerPending = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 w-full">
      
      {/* Application Pending Badge */}
      <div className="flex">
        <span className="inline-block px-5 py-2 bg-[#8FE3B0] text-[#15803D] font-bold text-sm rounded-xl border border-[#4AD27A] shadow-sm tracking-tight">
          Application Pending
        </span>
      </div>

      {/* Application Details */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-start gap-2">
          <span className="text-[#64748B] font-semibold text-base">Specialty:</span>
          <span className="text-[#1E293B] font-bold text-base">{data.specialty}</span>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="text-[#64748B] font-semibold text-base">Experience:</span>
          <span className="text-[#1E293B] font-bold text-base">{data.experience} years</span>
        </div>
        
        <div className="flex flex-col gap-1.5 mt-1">
          <span className="text-[#64748B] font-semibold text-base">Bio:</span>
          <p className="text-[#1E293B] font-medium text-base leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
            {data.bio}
          </p>
        </div>
      </div>

    </div>
  );
};

export default TrainerPending;
