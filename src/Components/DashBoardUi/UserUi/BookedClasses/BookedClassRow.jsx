import Image from 'next/image';
import React from 'react';

const BookedClassRow = ({ data }) => {
  if (!data) return null;

  const { className, trainer, category, days, time, image } = data;

  return (
    <div className="group bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(198,244,214,0.5)] hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 lg:gap-6">
        {/* Mobile: Image Top, Tablet/Desktop: Image Left */}
        <div className="w-28 h-28 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-3xl overflow-hidden shrink-0 border-2 border-[#F8FAFC]">
          <Image width={500} height={500} unoptimized
            src={image}
            alt={className}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row w-full gap-5 lg:gap-6 lg:items-center justify-between">
          {/* Info Section */}
          <div className="flex flex-col items-center sm:items-start gap-1.5 lg:w-1/3">
            <span className="inline-block px-3 py-1 bg-[#F8FAFC] text-[#64748B] text-xs font-bold rounded-lg tracking-tight border border-[#E2E8F0]">
              {category}
            </span>
            <h3 className="text-xl font-bold text-[#1E293B] tracking-tight leading-relaxed text-center sm:text-left mt-1">
              {className}
            </h3>
            <div className="flex items-center gap-1.5 text-[#64748B]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#22C55E]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold tracking-tight">
                {trainer}
              </span>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="flex flex-col sm:flex-row lg:flex-row gap-3 sm:gap-6 bg-[#F8FAFC] lg:bg-transparent p-4 lg:p-0 rounded-2xl lg:rounded-none border border-[#E2E8F0] lg:border-none lg:w-5/12 justify-center sm:justify-start lg:justify-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C6F4D6] flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#15803D]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider">
                  Days
                </span>
                <span className="text-sm font-semibold text-[#1E293B] tracking-tight">
                  {days}
                </span>
              </div>
            </div>

            <div className="hidden sm:block lg:hidden w-px bg-[#E2E8F0] my-2"></div>
            <div className="hidden lg:block w-px bg-[#E2E8F0] h-10"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C6F4D6] flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#15803D]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider">
                  Time
                </span>
                <span className="text-sm font-semibold text-[#1E293B] tracking-tight">
                  {time}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full lg:w-auto flex justify-center sm:justify-start lg:justify-end mt-2 lg:mt-0">
            <button className="w-full sm:w-auto cursor-pointer px-7 py-3 bg-[#22C55E] hover:bg-[#16A34A] text-[#FFFFFF] font-bold text-sm rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgb(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgb(22,163,74,0.23)] flex items-center justify-center gap-2 group/btn">
              View Class
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedClassRow;
