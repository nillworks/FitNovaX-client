"use client";
import React from 'react';
import { TrendingUp, DollarSign, Activity, Lock, CreditCard, BarChart2 } from 'lucide-react';

const TransactionsAnalyticsPanel = ({ analyticsData }) => {
  return (
    <div className="space-y-6 sticky top-8">
      
      {/* Section 1: Revenue Summary */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
            <BarChart2 size={20} className="text-[#22C55E]" />
          </div>
          <h2 className="text-[#1E293B] font-bold text-lg">Revenue Summary</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Total Earnings</span>
            <span className="font-black text-sm px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-[#1E293B] shadow-sm">
              {analyticsData.totalEarnings}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Monthly Rev.</span>
            <span className="font-bold text-sm px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-[#1E293B] shadow-sm">
              {analyticsData.monthlyRevenue}
            </span>
          </div>
          <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
            <span className="text-[#64748B] text-sm font-semibold">Avg. Ticket</span>
            <span className="font-bold text-xs px-3 py-1 rounded-lg bg-[#C6F4D6]/50 border border-[#8FE3B0]/30 text-[#15803D]">
              {analyticsData.avgTransaction}
            </span>
          </div>
        </div>

        {/* Section 2: Financial Insights */}
        <div className="border-t border-[#E2E8F0] pt-6 mb-6">
          <h3 className="text-[#1E293B] font-bold text-sm mb-4 flex items-center gap-2">
            <Activity size={16} className="text-[#22C55E]" />
            Financial Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-[#16A34A]" />
                <span className="text-xs font-bold text-[#15803D]">Revenue Growth</span>
              </div>
              <span className="text-xs font-black text-[#16A34A]">{analyticsData.revenueGrowth}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-[#64748B]" />
                <span className="text-xs font-bold text-[#64748B]">Recent Activity</span>
              </div>
              <span className="text-xs font-black text-[#1E293B]">{analyticsData.recentActivityCount} txns</span>
            </div>
          </div>
        </div>

        {/* Section 3: Stripe Information */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <DollarSign size={80} />
          </div>
          <h4 className="text-xs font-black text-[#1E293B] uppercase tracking-wide mb-3 flex items-center gap-2 relative z-10">
            <Lock size={14} className="text-[#22C55E]" />
            Stripe Payments
          </h4>
          <p className="text-xs text-[#64748B] font-medium leading-relaxed mb-4 relative z-10">
            All transactions are securely processed and tracked through the platform's Stripe integration.
          </p>
          <div className="flex flex-wrap gap-2 relative z-10">
            <span className="text-[10px] font-bold text-[#16A34A] bg-[#C6F4D6]/50 px-2 py-1 rounded-md border border-[#8FE3B0]/30">Secure</span>
            <span className="text-[10px] font-bold text-[#1E293B] bg-white px-2 py-1 rounded-md border border-[#E2E8F0]">Real-time Tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsAnalyticsPanel;
