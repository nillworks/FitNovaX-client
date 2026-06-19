import React from 'react';

const DashboardLoading = () => {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen p-4 sm:p-6 lg:p-8 transition-opacity duration-500 opacity-100">
      <div className="container mx-auto flex flex-col gap-4 sm:gap-6 lg:gap-8">
        
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2.5 mb-2">
          <div className="h-10 w-48 bg-[#E2E8F0] rounded-xl animate-pulse"></div>
          <div className="h-5 w-72 bg-[#E2E8F0] rounded-lg animate-pulse opacity-70"></div>
        </div>

        {/* Statistics Skeleton Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] animate-pulse shrink-0"></div>
              <div className="flex flex-col gap-2.5 flex-1">
                <div className="h-4 w-24 bg-[#E2E8F0] rounded-md animate-pulse"></div>
                <div className="h-7 w-16 bg-[#C6F4D6] rounded-lg animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Profile Card Skeleton */}
          <div className="lg:col-span-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-28 h-28 rounded-full bg-[#F8FAFC] border-4 border-[#E2E8F0] animate-pulse mb-6"></div>
            <div className="h-6 w-48 bg-[#E2E8F0] rounded-lg animate-pulse mb-3"></div>
            <div className="h-4 w-56 max-w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md animate-pulse mb-8"></div>
            <div className="h-8 w-24 bg-[#C6F4D6] rounded-full animate-pulse"></div>
          </div>

          {/* Trainer Application Skeleton */}
          <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-8 border-b border-[#E2E8F0] pb-6">
              <div className="h-7 w-56 bg-[#E2E8F0] rounded-lg animate-pulse"></div>
              <div className="h-8 w-28 bg-[#C6F4D6] rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex flex-col gap-6 flex-grow justify-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] animate-pulse shrink-0"></div>
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="h-4 w-24 bg-[#E2E8F0] rounded-md animate-pulse"></div>
                  <div className="h-4 w-64 max-w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] animate-pulse shrink-0"></div>
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="h-4 w-20 bg-[#E2E8F0] rounded-md animate-pulse"></div>
                  <div className="h-4 w-48 max-w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] animate-pulse shrink-0"></div>
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="h-4 w-28 bg-[#E2E8F0] rounded-md animate-pulse"></div>
                  <div className="h-4 w-56 max-w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Area: Recent Activity / Bookings */}
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm flex flex-col gap-5">
          <div className="h-7 w-48 bg-[#E2E8F0] rounded-lg animate-pulse mb-2"></div>
          
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 border border-[#E2E8F0] rounded-2xl bg-[#F8FAFC] animate-pulse">
              <div className="w-full sm:w-24 h-32 sm:h-24 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] shrink-0"></div>
              
              <div className="flex flex-col w-full gap-3">
                <div className="h-5 w-48 sm:w-56 bg-[#E2E8F0] rounded-md"></div>
                <div className="h-4 w-32 bg-[#FFFFFF] border border-[#E2E8F0] rounded-md"></div>
              </div>
              
              <div className="w-full sm:w-auto flex justify-start sm:justify-end mt-2 sm:mt-0">
                <div className="h-10 w-full sm:w-32 bg-[#C6F4D6] rounded-full shrink-0"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DashboardLoading;
