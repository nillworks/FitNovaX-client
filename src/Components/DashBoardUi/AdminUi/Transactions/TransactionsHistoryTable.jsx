"use client";
import React from 'react';
import { Search, CreditCard, Filter, Calendar, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const TransactionsHistoryTable = ({ transactions }) => {

  // Empty State UI
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="bg-[#F8FAFC] p-6 rounded-full mb-6 border border-[#E2E8F0] relative">
          <div className="absolute inset-0 bg-[#C6F4D6] rounded-full blur-xl opacity-30"></div>
          <CreditCard size={48} className="text-[#64748B] relative z-10" />
        </div>
        <h3 className="text-2xl font-black text-[#1E293B] mb-3">No Transactions Found</h3>
        <p className="text-[#64748B] max-w-md font-medium leading-relaxed">
          There are currently no completed Stripe transactions available. Your payment history will appear here once users make purchases.
        </p>
      </div>
    );
  }

  const getStatusUI = (status) => {
    switch(status) {
      case 'Succeeded': 
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm uppercase tracking-wider">
            <CheckCircle size={12} />
            Succeeded
          </span>
        );
      case 'Refunded': 
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm uppercase tracking-wider">
            <RotateCcw size={12} />
            Refunded
          </span>
        );
      case 'Failed': 
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#FEF2F2] text-[#B91C1C] border border-[#FEE2E2] text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm uppercase tracking-wider">
            <XCircle size={12} />
            Failed
          </span>
        );
      default: 
        return (
          <span className="bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm uppercase tracking-wider">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden flex flex-col">
      <div className="p-5 border-b border-[#E2E8F0] bg-white flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-[#1E293B] font-bold text-lg flex items-center gap-2">
            Payment History
            <span className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              {transactions.length} Records
            </span>
          </h3>
          
          {/* Filters & Search - UI ONLY */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-[#94A3B8]" />
              </div>
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:bg-white transition-all text-[#1E293B] placeholder-[#94A3B8]"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-sm font-bold hover:bg-[#F8FAFC] transition-colors shadow-sm cursor-pointer">
              <Calendar size={16} />
              <span className="hidden sm:inline">Date Filter</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] text-sm font-bold hover:bg-[#F8FAFC] transition-colors shadow-sm cursor-pointer">
              <Filter size={16} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Transaction Details</th>
              <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] bg-white">
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-[#F8FAFC]/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl text-[#64748B] group-hover:border-[#8FE3B0]/50 transition-colors shadow-sm">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="text-[#1E293B] font-bold text-sm leading-tight mb-0.5">{txn.userEmail}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                        <span className="text-[#64748B] text-xs font-medium font-mono bg-[#F8FAFC] px-1.5 rounded">{txn.transactionId}</span>
                        <span className="hidden sm:inline text-[#E2E8F0]">•</span>
                        <span className="text-[#64748B] text-xs font-semibold">{txn.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-[#1E293B]">
                    <span className="font-black text-lg">${txn.amount.toFixed(2)}</span>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC] px-1.5 py-0.5 rounded border border-[#E2E8F0]">USD</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {getStatusUI(txn.paymentStatus)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-[#94A3B8]" />
                    <span className="font-semibold text-[#1E293B]">{txn.paymentDate}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsHistoryTable;
