"use client";

import React from 'react';
import { FaReply, FaEdit, FaTrash, FaUserCircle, FaCommentDots } from 'react-icons/fa';

const CommentCard = ({ comment, isReply = false }) => {
  return (
    <div className={`flex flex-col bg-[#FFFFFF] border border-[#E2E8F0] rounded-[2rem] p-6 shadow-sm transition-all hover:shadow-md ${isReply ? 'ml-6 md:ml-12 border-l-4 border-l-[#4AD27A] mt-4' : 'mt-6'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-4">
        <div className="flex items-center gap-4">
          {comment?.userImage ? (
            <img 
              src={comment.userImage} 
              alt={comment.userName} 
              className="w-12 h-12 rounded-full object-cover border-2 border-[#C6F4D6]"
            />
          ) : (
            <FaUserCircle className="w-12 h-12 text-[#E2E8F0]" />
          )}
          <div className="flex flex-col">
            <span className="text-base font-black text-[#1E293B]">{comment?.userName || 'Anonymous'}</span>
            <span className="text-sm font-medium text-[#64748B]">
              {comment?.createDate ? new Date(comment.createDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Just now'}
            </span>
          </div>
        </div>
        
        {/* Actions UI */}
        <div className="flex items-center gap-2 bg-[#F8FAFC] px-2 py-1.5 rounded-2xl border border-[#E2E8F0]">
          <button className="text-[#64748B] hover:text-[#22C55E] hover:bg-[#C6F4D6] rounded-xl transition-all p-2.5" title="Reply">
            <FaReply />
          </button>
          <button className="text-[#64748B] hover:text-[#3B82F6] hover:bg-[#DBEAFE] rounded-xl transition-all p-2.5" title="Edit">
            <FaEdit />
          </button>
          <button className="text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all p-2.5" title="Delete">
            <FaTrash />
          </button>
        </div>
      </div>
      
      <p className="text-[#1E293B] text-lg leading-relaxed font-medium px-1">
        {comment?.comment || 'This is an example comment. I loved reading this post, looking forward to more content like this in the community!'}
      </p>

      {/* Render nested replies if they exist */}
      {comment?.replies && comment.replies.length > 0 && (
        <div className="mt-6 flex flex-col gap-2 relative">
          {/* Subtle connecting line for replies */}
          <div className="absolute left-6 top-0 bottom-8 w-px bg-[#E2E8F0] -z-10 hidden md:block"></div>
          {comment.replies.map((reply, idx) => (
            <CommentCard key={reply._id || idx} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );
};

const ForumCommentsSection = ({ comments = [] }) => {
  return (
    <section className="w-full pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#E2E8F0]">
         <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-[#C6F4D6] rounded-[1.25rem] flex items-center justify-center text-[#15803D] shadow-sm">
              <FaCommentDots className="text-2xl" />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black text-[#1E293B]">Discussion</h2>
             <p className="text-[#64748B] text-base font-bold mt-1">{comments.length} Comments</p>
           </div>
         </div>
      </div>

      {/* Add Comment Form */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[2rem] p-6 md:p-8 mb-12 shadow-sm focus-within:ring-4 focus-within:ring-[#C6F4D6] transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#22C55E]"></div>
        <h3 className="text-xl font-black text-[#1E293B] mb-5 pl-2">Join the conversation</h3>
        <textarea 
          rows="4" 
          placeholder="Share your thoughts, ask a question, or provide feedback..."
          className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-[1.5rem] p-6 text-[#1E293B] text-lg focus:outline-none focus:border-[#22C55E] focus:bg-[#FFFFFF] transition-all resize-none mb-6 font-medium"
        ></textarea>
        <div className="flex justify-end">
          <button className="bg-[#16A34A] hover:bg-[#15803D] text-[#FFFFFF] font-black tracking-wide py-4 px-10 rounded-2xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1">
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-4">
        {comments.length > 0 ? (
          comments.map((comment, idx) => (
            <CommentCard key={comment._id || idx} comment={comment} />
          ))
        ) : (
          <div className="text-center py-20 bg-[#FFFFFF] rounded-[2rem] border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center text-[#64748B] mb-6">
               <FaCommentDots className="text-3xl" />
            </div>
            <h3 className="text-2xl font-black text-[#1E293B] mb-3">No Comments Yet</h3>
            <p className="text-[#64748B] text-lg font-medium max-w-md">Be the first to share your thoughts and start the discussion!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForumCommentsSection;
