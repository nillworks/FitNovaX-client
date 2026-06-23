"use client";
import React from 'react';
import TransactionsHistoryTable from './TransactionsHistoryTable';
import TransactionsAnalyticsPanel from './TransactionsAnalyticsPanel';
import { DollarSign, CreditCard, TrendingUp, Activity, Wallet } from 'lucide-react';

const TransactionsSection = ({ transactions = [], pagination = {}, currentPage = 1 }) => {

  const totalRevenue = transactions.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  const avgTransactionValue = transactions.length > 0 ? totalRevenue / transactions.length : 0;
  
  // Calculate today's revenue (assuming simple date match)
  const today = new Date().toISOString().split('T')[0];
  const todaysRevenue = transactions
    .filter(t => t.createdAt && t.createdAt.split('T')[0] === today)
    .reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

  const dashboardStats = {
    totalRevenue: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    totalTransactions: pagination.total || transactions.length,
    avgTransactionValue: `$${avgTransactionValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    todaysRevenue: `$${todaysRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  };

  const analyticsData = {
    totalEarnings: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    monthlyRevenue: `$${todaysRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, // Using today's as fallback
    avgTransaction: `$${avgTransactionValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    revenueGrowth: "+0.0%", // Placeholder
    recentActivityCount: transactions.length
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 min-h-screen relative" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Top Section: Revenue Intelligence Hero */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6F4D6] opacity-30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#8FE3B0] opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1E293B] mb-2 tracking-tight flex items-center gap-3">
              <Wallet className="text-[#22C55E]" size={32} />
              Transactions
            </h1>
            <p className="text-[#64748B] text-sm lg:text-base font-medium max-w-xl">
              Monitor platform revenue, track secure Stripe payments, and analyze financial performance across your business.
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 lg:p-5 flex items-center gap-5 shadow-sm">
            <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-sm">
              <TrendingUp size={24} className="text-[#22C55E]" />
            </div>
            <div>
              <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mb-0.5">Total Revenue</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#1E293B] leading-none">{dashboardStats.totalRevenue}</span>
                <span className="text-[#16A34A] text-xs font-bold bg-[#C6F4D6]/50 px-2 py-0.5 rounded-md border border-[#8FE3B0]/30">+12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section: Premium KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Revenue", value: dashboardStats.totalRevenue, icon: DollarSign, iconColor: "text-[#22C55E]" },
          { label: "Total Transactions", value: dashboardStats.totalTransactions, icon: CreditCard, iconColor: "text-[#16A34A]" },
          { label: "Avg. Value", value: dashboardStats.avgTransactionValue, icon: Activity, iconColor: "text-[#22C55E]" },
          { label: "Today's Revenue", value: dashboardStats.todaysRevenue, icon: TrendingUp, iconColor: "text-[#15803D]" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex items-center justify-between group hover:border-[#8FE3B0]/50 transition-colors">
            <div>
              <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
              <h3 className="text-2xl font-black text-[#1E293B] leading-none">{stat.value}</h3>
            </div>
            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] group-hover:bg-[#F0FDF4] group-hover:scale-110 transition-all duration-300">
              <stat.icon size={24} className={stat.iconColor} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main Section: Left Side - Transaction History Area */}
        <div className="flex-1 min-w-0">
          <TransactionsHistoryTable transactions={transactions} />
        </div>

        {/* Right Side: Transactions Analytics Panel */}
        <div className="w-full xl:w-80 flex-shrink-0">
          <TransactionsAnalyticsPanel analyticsData={analyticsData} />
        </div>
      </div>
    </div>
  );
};

export default TransactionsSection;
