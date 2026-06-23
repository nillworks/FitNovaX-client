'use client';

import React, { useState } from 'react';
import ForumPostCard from './ForumPostCard';
import Link from 'next/link';

const ForumPostsClient = ({ initialPosts, totalPages, page }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Frontend filter logic
  const filteredPosts = initialPosts.filter((post) => {
    const term = searchTerm.toLowerCase();
    const titleMatch = post?.title?.toLowerCase().includes(term);
    const categoryMatch = post?.category?.toLowerCase().includes(term);
    const tagMatch = post?.tags?.some(tag => tag.toLowerCase().includes(term));
    
    return titleMatch || categoryMatch || tagMatch;
  });

  return (
    <>
      {/* Search Input Area */}
      <div className="max-w-3xl mx-auto mb-12 px-4">
        <div className="relative flex items-center group">
          <input
            type="text"
            placeholder="Search discussions by title, category, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-6 pr-14 py-4 rounded-full border-2 border-[#E2E8F0] focus:border-[#22C55E] focus:outline-none focus:ring-4 focus:ring-[#22C55E]/10 transition-all bg-[#FFFFFF] text-[#1E293B] shadow-sm text-base md:text-lg placeholder-[#94A3B8] font-medium"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#F1F5F9] group-focus-within:bg-[#22C55E] group-focus-within:text-white text-[#94A3B8] p-3 rounded-full shadow-sm transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
        </div>
      </div>

      {filteredPosts && filteredPosts.length > 0 ? (
        <>
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPosts.map(post => (
              <ForumPostCard
                key={post._id || Math.random().toString()}
                post={post}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && !searchTerm && (
            <div className="flex items-center justify-center gap-3 mt-12">
              {page > 1 && (
                <Link
                  href={`?page=${page - 1}`}
                  className="px-5 py-2.5 bg-[#FFFFFF] border border-[#E2E8F0] text-[#1E293B] rounded-2xl hover:border-[#22C55E] hover:text-[#22C55E] hover:shadow-sm transition-all font-semibold"
                >
                  Previous
                </Link>
              )}

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isCurrent = pageNum === page;
                  return (
                    <Link
                      key={pageNum}
                      href={`?page=${pageNum}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#22C55E] text-[#FFFFFF] shadow-md'
                          : 'bg-[#FFFFFF] border border-[#E2E8F0] text-[#64748B] hover:border-[#22C55E] hover:text-[#22C55E]'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>

              {page < totalPages && (
                <Link
                  href={`?page=${page + 1}`}
                  className="px-5 py-2.5 bg-[#FFFFFF] border border-[#E2E8F0] text-[#1E293B] rounded-2xl hover:border-[#22C55E] hover:text-[#22C55E] hover:shadow-sm transition-all font-semibold"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-24 bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm">
          <h3 className="text-2xl font-bold text-[#1E293B] mb-2">
            No Posts Found
          </h3>
          <p className="text-[#64748B]">
            {searchTerm ? 'No discussions match your search query.' : 'Check back later for new community discussions.'}
          </p>
        </div>
      )}
    </>
  );
};

export default ForumPostsClient;
