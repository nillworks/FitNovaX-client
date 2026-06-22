import Image from 'next/image';
import React from 'react';

const Card = ({ classes }) => {
  return (
    <div className="group flex flex-col bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative w-full h-64 overflow-hidden bg-[#F8FAFC]">
        <Image
          width={400}
          height={400}
          src={classes?.classImage}
          alt={classes?.className}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#8FE3B0] text-[#15803D] text-xs font-bold uppercase tracking-tight shadow-sm">
            {classes?.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] tracking-tight leading-relaxed mb-3 group-hover:text-[#22C55E] transition-colors duration-300">
          {classes?.className}
        </h3>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#C6F4D6] flex items-center justify-center flex-shrink-0 border border-[#8FE3B0] overflow-hidden">
            {classes?.userImage ? (
              <Image
                width={400}
                height={400}
                src={classes?.userImage}
                alt={classes?.userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#15803D] font-bold text-sm">
                {classes?.userName?.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="text-[#64748B] text-xs font-semibold uppercase tracking-tight">
              Trainer
            </p>
            <p className="text-[#1E293B] text-sm font-bold">
              {classes?.userName}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-5 border-t border-[#E2E8F0]">
          <div className="flex flex-col">
            <span className="text-[#64748B] text-xs font-semibold uppercase tracking-tight">
              Session Price
            </span>
            <span className="text-xl font-bold text-[#1E293B] leading-relaxed">
              ${classes?.price}
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[#64748B] text-xs font-semibold uppercase tracking-tight">
              Bookings
            </span>
            <div className="flex items-center space-x-1 justify-end">
              <svg
                className="w-4 h-4 text-[#22C55E]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-bold text-[#1E293B]">
                {classes?.bookedCount}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full py-3.5 cursor-pointer px-6 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-[#FFFFFF] font-bold tracking-tight transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex justify-center items-center space-x-2">
            <span>View Details</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
