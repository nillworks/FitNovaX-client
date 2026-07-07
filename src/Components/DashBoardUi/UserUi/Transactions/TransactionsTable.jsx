import React from 'react';
import TransactionRow from './TransactionRow';
import getUserTransactions from '@/lib/api/getUserTransactions';
import getUserSession from '@/lib/getUserSession';

const TransactionsTable = async () => {
  const user = await getUserSession();
  const transactionsRes = await getUserTransactions(user?.id);
  const transactionsData = transactionsRes?.data || [];

  return (
    <div className="w-full bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] mb-1.5">
              Transactions
            </h1>
            <p className="text-[#64748B] font-semibold tracking-tight text-sm sm:text-base leading-relaxed">
              Manage and review your purchase history
            </p>
          </div>
          <div className="flex items-center gap-2.5 bg-[#C6F4D6] px-4 py-2 rounded-full border border-[#8FE3B0]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse relative">
              <span className="absolute -inset-1 rounded-full bg-[#22C55E] opacity-40 animate-ping"></span>
            </span>
            <span className="text-[#15803D] font-bold text-sm tracking-tight">
              {transactionsData.length} Total Purchases
            </span>
          </div>
        </div>

        {/* Cards List */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {transactionsData.length > 0 ? (
            transactionsData.map(transaction => (
              <TransactionRow key={transaction._id || transaction.id} data={transaction} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#E2E8F0]">
              <p className="text-[#64748B] text-lg font-medium">No transactions found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
