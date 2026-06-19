"use client";
import React from 'react';
import TransactionsHistoryTable from './TransactionsHistoryTable';
import TransactionsAnalyticsPanel from './TransactionsAnalyticsPanel';
import { DollarSign, CreditCard, TrendingUp, Activity, Wallet } from 'lucide-react';

const TransactionsSection = () => {
  // Dummy Data
  const transactionsData = [
    {
      id: "TXN-739281",
      userEmail: "michael.t@example.com",
      amount: 149.00,
      transactionId: "pi_3MtwBwLkdIwHu7ix28a3tq1",
      paymentDate: "2024-03-24 14:30",
      paymentStatus: "Succeeded",
      paymentMethod: "Visa •••• 4242"
    },
    {
      id: "TXN-739282",
      userEmail: "sarah.j@example.com",
      amount: 89.00,
      transactionId: "pi_3MtwBwLkdIwHu7ix28a3tq2",
      paymentDate: "2024-03-23 09:15",
      paymentStatus: "Succeeded",
      paymentMethod: "Mastercard •••• 5555"
    },
    {
      id: "TXN-739283",
      userEmail: "david.w@example.com",
      amount: 299.00,
      transactionId: "pi_3MtwBwLkdIwHu7ix28a3tq3",
      paymentDate: "2024-03-22 16:45",
      paymentStatus: "Refunded",
      paymentMethod: "Amex •••• 1001"
    },
    {
      id: "TXN-739284",
      userEmail: "emily.r@example.com",
      amount: 149.00,
      transactionId: "pi_3MtwBwLkdIwHu7ix28a3tq4",
      paymentDate: "2024-03-22 11:20",
      paymentStatus: "Succeeded",
      paymentMethod: "Visa •••• 4242"
    },
    {
      id: "TXN-739285",
      userEmail: "james.l@example.com",
      amount: 59.00,
      transactionId: "pi_3MtwBwLkdIwHu7ix28a3tq5",
      paymentDate: "2024-03-21 08:05",
      paymentStatus: "Failed",
      paymentMethod: "Visa •••• 1234"
    }
  ];

  // Active transactions (Set to empty array [] to test the beautiful empty state)
  const transactions = transactionsData;

  const dashboardStats = {
    totalRevenue: "$124,590.00",
    totalTransactions: 842,
    avgTransactionValue: "$147.96",
    todaysRevenue: "$1,240.00"
  };

  const analyticsData = {
    totalEarnings: "$124,590.00",
    monthlyRevenue: "$24,500.00",
    avgTransaction: "$147.96",
    revenueGrowth: "+12.5%",
    recentActivityCount: 42
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
