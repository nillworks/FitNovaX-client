"use client";
import React from 'react';
import { Users, Shield, ListChecks, CheckSquare, Info } from 'lucide-react';

const ModerationInsightsPanel = ({ insightsData }) => {
  return (
    <div className="space-y-6 sticky top-8">
      
      {/* Section 1: Community Overview */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
            <Users size={20} className="text-[#22C55E]" />
          </div>
          <h2 className="text-[#1E293B] font-bold text-lg">Community Overview</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Total Posts</span>
            <span className="font-black text-sm px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-[#1E293B] shadow-sm">
              {insightsData.totalPosts}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Active Members</span>
            <span className="font-bold text-xs px-3 py-1 rounded-lg bg-[#C6F4D6]/50 border border-[#8FE3B0]/30 text-[#15803D]">
              {insightsData.activeMembers}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Discussions</span>
            <span className="font-black text-sm px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-[#1E293B] shadow-sm">
              {insightsData.totalDiscussions}
            </span>
          </div>
        </div>

        {/* Section 2: Community Guidelines */}
        <div className="border-t border-[#E2E8F0] pt-6 mb-6">
          <h3 className="text-[#1E293B] font-bold text-sm mb-4 flex items-center gap-2">
            <Shield size={16} className="text-[#22C55E]" />
            Community Guidelines
          </h3>
          <ul className="space-y-3">
            {[
              "Respectful Communication",
              "No Spam Content",
              "No Harassment",
              "Fitness Related Discussions",
              "Helpful Community Contributions"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-xs text-[#64748B] font-medium">
                <CheckSquare size={14} className="text-[#22C55E]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Moderation Notes */}
        <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-4 mt-2">
          <h4 className="text-xs font-bold text-[#15803D] uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Info size={14} />
            Moderation Notes
          </h4>
          <p className="text-xs text-[#16A34A] font-medium leading-relaxed">
            Administrators can remove inappropriate content to maintain a safe and healthy fitness community.
          </p>
        </div>

        {/* Section 4: Quick Moderation Tips */}
        <div className="mt-6">
          <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wide mb-3 flex items-center gap-2">
            <ListChecks size={14} className="text-[#64748B]" />
            Quick Moderation Tips
          </h4>
          <ul className="space-y-2">
            {[
              "Review reported content",
              "Maintain community quality",
              "Encourage constructive discussions",
              "Protect community standards"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-xs text-[#1E293B] font-bold">
                <span className="w-1.5 h-1.5 bg-[#8FE3B0] rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModerationInsightsPanel;
