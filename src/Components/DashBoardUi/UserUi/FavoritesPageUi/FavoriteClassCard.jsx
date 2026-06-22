'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FavoriteClassCard = ({ data, handleDeleteFavorite }) => {
  if (!data) return null;

  const {
    className,
    userName,
    userImage,
    category,
    scheduleDays,
    duration,
    difficulty,
    price,
    classImage,
    classId,
    _id,
  } = data;

  return (
    <div className="group flex flex-col bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(198,244,214,0.5)] hover:-translate-y-1">
      {/* Top Area: Image & Overlays */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0 bg-[#F8FAFC]">
        <Image
          width={500}
          height={500}
          unoptimized
          src={classImage}
          alt={className}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Top Left: Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-[#F8FAFC] text-[#1E293B] text-xs font-bold rounded-lg tracking-tight shadow-sm border border-[#E2E8F0]">
            {category}
          </span>
        </div>

        {/* Top Right: Favorite Indicator */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => {
              const idToPass = typeof _id === 'object' ? _id.$oid : _id;
              console.log('Browser Console: Delete clicked for ID ->', idToPass);
              handleDeleteFavorite(idToPass);
            }}
            className="p-2 bg-[#8FE3B0] text-[#15803D] rounded-full hover:bg-[#C6F4D6] transition-colors shadow-sm cursor-pointer border border-[#4AD27A]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-5 lg:p-6">
        {/* Title and Rating */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-xl font-bold text-[#1E293B] tracking-tight leading-relaxed line-clamp-2">
            {className}
          </h3>
        </div>

        {/* Trainer */}
        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#E2E8F0]">
          <Image
            width={500}
            height={500}
            unoptimized
            src={userImage || '/placeholder-avatar.png'}
            alt={userName || 'Instructor'}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#F8FAFC] shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-0.5">
              Instructor
            </span>
            <span className="text-sm font-semibold text-[#1E293B]">
              {userName}
            </span>
          </div>
        </div>

        {/* Info Rows */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Schedule */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C6F4D6] flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#16A34A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#1E293B] tracking-tight uppercase">
              {scheduleDays?.join(', ') || 'N/A'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Duration */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#C6F4D6] flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#16A34A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-[#64748B]">
                {duration}
              </span>
            </div>

            <div className="w-1 h-1 rounded-full bg-[#E2E8F0] mx-1"></div>

            {/* Difficulty */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#C6F4D6] flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#16A34A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-[#64748B]">
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Area: Price & Actions */}
        <div className="mt-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 pt-5 border-t border-[#E2E8F0]">
          {/* Price */}
          <div className="w-full xl:w-auto flex justify-start xl:justify-center">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-0.5">
                Price
              </span>
              <span className="text-lg font-bold text-[#1E293B] leading-none">
                ${price}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-3 shrink-0">
            {/* <button className="w-full sm:w-auto px-5 py-2.5 bg-transparent border border-[#E2E8F0] hover:border-[#15803D] text-[#15803D] font-bold text-sm rounded-full transition-all duration-300 hover:bg-[#F8FAFC] cursor-pointer text-center">
              Remove
            </button> */}
            <Link
              href={`/classes/${classId}`}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#22C55E] hover:bg-[#16A34A] text-[#FFFFFF] font-bold text-sm rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgb(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgb(22,163,74,0.23)] cursor-pointer text-center flex items-center justify-center gap-2 group/view"
            >
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover/view:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteClassCard;
