"use client";
import React from 'react';
import { Award, BarChart2, ShieldAlert, CheckCircle } from 'lucide-react';

const TrainerRoleManagementPanel = ({ overviewData }) => {
  return (
    <div className="space-y-6 sticky top-8">
      
      {/* Section 1: Trainer Overview */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
            <BarChart2 size={20} className="text-[#22C55E]" />
          </div>
          <h2 className="text-[#1E293B] font-bold text-lg">Trainer Overview</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Total Trainers</span>
            <span className="font-black text-sm px-2.5 py-1 rounded-lg bg-white border border-[#E2E8F0] text-[#1E293B] shadow-sm">
              {overviewData.totalTrainers}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Most Popular</span>
            <span className="font-bold text-xs px-2.5 py-1 rounded-lg bg-[#C6F4D6]/50 border border-[#8FE3B0]/30 text-[#15803D]">
              {overviewData.popularSpecialty}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Avg. Experience</span>
            <span className="font-black text-sm px-2.5 py-1 rounded-lg bg-white border border-[#E2E8F0] text-[#1E293B] shadow-sm">
              {overviewData.averageExperience}
            </span>
          </div>
        </div>

        {/* Section 2: Admin Guidelines */}
        <div className="border-t border-[#E2E8F0] pt-6 mb-6">
          <h3 className="text-[#1E293B] font-bold text-sm mb-4 flex items-center gap-2">
            <Award size={16} className="text-[#22C55E]" />
            Admin Guidelines
          </h3>
          <ul className="space-y-3">
            {[
              "Review trainer activity regularly",
              "Ensure community quality standards",
              "Monitor trainer engagement",
              "Verify trainer performance metrics"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#64748B] font-medium leading-relaxed">
                <div className="bg-[#C6F4D6]/50 p-1 rounded-md flex-shrink-0 mt-0.5 border border-[#8FE3B0]/30">
                  <CheckCircle size={10} className="text-[#16A34A]" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Role Management Notice */}
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-2xl p-4 mt-2 hover:bg-[#FEE2E2] transition-colors group">
          <h4 className="text-xs font-bold text-[#B91C1C] uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <ShieldAlert size={14} />
            Role Management Notice
          </h4>
          <p className="text-xs text-[#991B1B] font-semibold mb-3">
            Removing trainer role will revoke:
          </p>
          <ul className="space-y-2.5 text-xs text-[#991B1B] font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full shadow-sm"></span> 
              Class creation privileges
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full shadow-sm"></span> 
              Trainer dashboard access
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full shadow-sm"></span> 
              Trainer-specific permissions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrainerRoleManagementPanel;
