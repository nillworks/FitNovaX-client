"use client";

import Image from 'next/image';
import React from 'react';
import { Calendar, Clock, Star, Trash2, Edit2 } from 'lucide-react';

const MyForumPostsGrid = ({ posts, onDeleteClick, onUpdateClick }) => {
  
  // Format date simply
  const formatDate = (dateValue) => {
    if (!dateValue) return '';
    if (typeof dateValue === 'object' && dateValue !== null && dateValue.$date) {
      dateValue = dateValue.$date;
    }
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateValue).toLocaleDateString('en-US', options);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div key={post._id || post.id} className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
          
          {/* Image Header Area */}
          <div className="relative h-48 overflow-hidden bg-[#F8FAFC]">
            <Image width={500} height={500} unoptimized 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Category Badge overlay */}
            <div className="absolute top-4 left-4">
              <span className="bg-[#FFFFFF]/90 backdrop-blur-md text-[#15803D] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-[#C6F4D6] capitalize">
                {post.category}
              </span>
            </div>
            
            {/* Featured Badge overlay */}
            {(post.isFeatured || post.featured) && (
              <div className="absolute top-4 right-4">
                <span className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-[#16A34A]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-[#1E293B] mb-3 line-clamp-2 leading-tight group-hover:text-[#22C55E] transition-colors">
              {post.title}
            </h3>
            <p className="text-[#64748B] text-sm font-medium line-clamp-3 mb-6 flex-1 leading-relaxed">
              {post.summary || post.shortDescription}
            </p>

            <div className="w-full h-px bg-[#E2E8F0] mb-5"></div>

            {/* Footer / Meta Data & Actions */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5 text-xs font-bold text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#4AD27A]" />
                  {formatDate(post.createDate || post.createdAt)}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#4AD27A]" />
                  {post.readingTime} min read
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onUpdateClick && onUpdateClick(post)}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 text-[#64748B] p-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer group/editbtn"
                  title="Edit Post"
                >
                  <Edit2 className="w-4 h-4 group-hover/editbtn:scale-110 transition-transform" />
                </button>
                <button 
                  onClick={() => onDeleteClick(post)}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-red-50 hover:border-red-200 hover:text-red-500 text-[#64748B] p-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer group/btn"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default MyForumPostsGrid;
