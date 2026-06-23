import React from 'react';
import Link from 'next/link';
import { FaHeart, FaComment, FaClock, FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';

const ForumPostCard = ({ post }) => {
  const {
    _id,
    title,
    category,
    tags,
    coverImage,
    summary,
    description,
    readingTime,
    isFeatured,
    userName,
    userImage,
    userRole,
    like,
    comment,
    createDate,
  } = post || {};

  // Visually distinct Role Badges
  const roleBadgeColor =
    userRole?.toLowerCase() === 'admin'
      ? 'bg-[#15803D] text-[#FFFFFF]'
      : 'bg-[#8FE3B0] text-[#1E293B]';

  return (
    <div className="group flex flex-col bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
      {/* Top Area: Image & Badges */}
      <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
        <Image
          width={400}
          height={400}
          src={
            coverImage ||
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop'
          }
          alt={title || 'Forum post image'}
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
        />
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {category && (
            <span className="bg-[#FFFFFF] text-[#1E293B] text-xs font-bold px-3 py-1 rounded-full shadow-sm w-fit">
              {category}
            </span>
          )}
          {isFeatured && (
            <span className="bg-[#22C55E] text-[#FFFFFF] text-xs font-bold px-3 py-1 rounded-full shadow-sm w-fit">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-6 bg-[#FFFFFF]">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs font-medium text-[#64748B] mb-3">
          <div className="flex items-center gap-1.5">
            <FaClock className="text-[#4AD27A]" />
            <span>{readingTime || '5 min'} read</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-[#4AD27A]" />
            <span>
              {createDate
                ? new Date(createDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : '23 Jun 2026'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-[#1E293B] mb-2 line-clamp-2 leading-tight">
          {title || 'Community Forum Discussion'}
        </h2>

        {/* Summary */}
        <p className="text-[#64748B] text-sm line-clamp-3 mb-6 flex-grow">
          {summary ||
            description ||
            'Join the discussion and discover the latest insights, tips, and experiences from our active fitness community.'}
        </p>

        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#F8FAFC] text-[#64748B] text-xs font-semibold px-3 py-1 rounded-full border border-[#E2E8F0]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <hr className="border-[#E2E8F0] mb-5" />

        {/* Author Section & Engagement */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <img
              src={
                userImage ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'
              }
              alt={userName || 'Author'}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#C6F4D6]"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#1E293B]">
                {userName || 'Member'}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md mt-0.5 w-fit ${roleBadgeColor}`}
              >
                {userRole || 'Trainer'}
              </span>
            </div>
          </div>

          {/* Engagement Section */}
          <div className="flex items-center gap-3 bg-[#F8FAFC] px-3 py-1.5 rounded-full border border-[#E2E8F0]">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#22C55E] transition-colors cursor-pointer">
              <FaHeart className={like > 0 ? 'text-[#22C55E]' : ''} />
              <span>{like || 0}</span>
            </div>
            <span className="text-[#E2E8F0]">|</span>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#22C55E] transition-colors cursor-pointer">
              <FaComment />
              <span>{comment || 0}</span>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <Link href={`/forum/${_id || '#'}`} className="block  w-full">
          <button className="w-full cursor-pointer bg-[#F8FAFC] text-[#16A34A] border border-[#C6F4D6] hover:bg-[#22C55E] hover:text-[#FFFFFF] hover:border-[#22C55E] font-bold py-3 rounded-2xl transition-all duration-300 group-hover:shadow-md">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForumPostCard;
