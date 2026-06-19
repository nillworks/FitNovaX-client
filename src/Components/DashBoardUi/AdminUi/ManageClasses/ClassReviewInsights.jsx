"use client";
import React from 'react';
import { Eye, ShieldCheck, ListChecks, CheckSquare } from 'lucide-react';

const ClassReviewInsights = ({ insightsData }) => {
  return (
    <div className="space-y-6 sticky top-8">
      
      {/* Section 1: Moderation Overview */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
            <Eye size={20} className="text-[#22C55E]" />
          </div>
          <h2 className="text-[#1E293B] font-bold text-lg">Moderation Overview</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Total Reviews</span>
            <span className="font-black text-sm px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-[#1E293B] shadow-sm">
              {insightsData.totalReviews}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Approval Rate</span>
            <span className="font-bold text-xs px-3 py-1 rounded-lg bg-[#C6F4D6]/50 border border-[#8FE3B0]/30 text-[#15803D]">
              {insightsData.approvalRate}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#FFFBEB] p-3.5 rounded-2xl border border-[#FEF3C7]">
            <span className="text-[#D97706] text-sm font-semibold">Pending Queue</span>
            <span className="font-black text-sm px-3 py-1 rounded-lg bg-white border border-[#FDE68A] text-[#D97706] shadow-sm">
              {insightsData.pendingQueue}
            </span>
          </div>
        </div>

        {/* Section 2: Admin Guidelines */}
        <div className="border-t border-[#E2E8F0] pt-6 mb-6">
          <h3 className="text-[#1E293B] font-bold text-sm mb-4 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#22C55E]" />
            Admin Guidelines
          </h3>
          <ul className="space-y-3">
            {[
              "Review class quality",
              "Verify trainer expertise",
              "Check content relevance",
              "Ensure platform standards"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#64748B] font-medium leading-relaxed">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-1 rounded-md flex-shrink-0 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] block"></span>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Review Checklist */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5">
          <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wide mb-4 flex items-center gap-2">
            <ListChecks size={14} className="text-[#64748B]" />
            Review Checklist
          </h4>
          <ul className="space-y-3">
            {[
              "Clear Title",
              "Valid Category",
              "Complete Description",
              "Trainer Verification",
              "Community Friendly Content"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-xs text-[#1E293B] font-bold">
                <CheckSquare size={14} className="text-[#22C55E]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassReviewInsights;
