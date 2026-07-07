import React from 'react';
import { CreditCard, CalendarDays, Receipt } from 'lucide-react';

const TransactionRow = ({ data }) => {
  if (!data) return null;

  const {
    _id,
    title,
    price,
    sessionId,
  } = data;

  return (
    <div className="group bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(198,244,214,0.5)] hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 lg:gap-6">
        
        {/* Icon Container */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 rounded-3xl bg-[#C6F4D6] flex items-center justify-center shrink-0 border-2 border-[#F8FAFC]">
          <Receipt className="w-8 h-8 text-[#15803D]" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row w-full gap-5 lg:gap-6 lg:items-center justify-between">
          
          {/* Info Section */}
          <div className="flex flex-col items-center sm:items-start gap-1.5 lg:w-2/5">
            <span className="inline-block px-3 py-1 bg-[#F8FAFC] text-[#64748B] text-xs font-bold rounded-lg tracking-tight border border-[#E2E8F0]">
              Purchase
            </span>
            <h3 className="text-xl font-bold text-[#1E293B] tracking-tight leading-relaxed text-center sm:text-left mt-1">
              {title || 'Premium Subscription / Class'}
            </h3>
            <div className="flex items-center gap-1.5 text-[#64748B]">
              <span className="text-sm font-semibold tracking-tight truncate max-w-[200px] sm:max-w-full">
                Session ID: {sessionId || 'N/A'}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-6 bg-[#F8FAFC] lg:bg-transparent p-4 lg:p-0 rounded-2xl lg:rounded-none border border-[#E2E8F0] lg:border-none lg:w-3/5 justify-center sm:justify-start lg:justify-center">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider">
                  Amount
                </span>
                <span className="text-lg font-bold text-[#1E293B] tracking-tight">
                  ${price || '0'}
                </span>
              </div>
            </div>

            <div className="hidden sm:block lg:hidden w-px bg-[#E2E8F0] my-2"></div>
            <div className="hidden lg:block w-px bg-[#E2E8F0] h-10"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-[#D97706]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider">
                  Status
                </span>
                <span className="text-sm font-bold text-[#059669] tracking-tight bg-[#D1FAE5] px-2 py-0.5 rounded-full mt-0.5">
                  Completed
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;
