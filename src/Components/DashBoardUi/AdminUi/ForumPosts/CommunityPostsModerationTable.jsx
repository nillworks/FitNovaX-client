'use client';
import React, { useState } from 'react';
import {
  MessageSquare,
  Heart,
  ShieldAlert,
  Trash2,
  Eye,
  X,
  AlertTriangle,
} from 'lucide-react';

const CommunityPostsModerationTable = ({ posts }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleDeleteClick = post => {
    setSelectedPost(post);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedPost(null);
  };

  // Empty State UI
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="bg-[#F8FAFC] p-6 rounded-full mb-6 border border-[#E2E8F0] relative">
          <div className="absolute inset-0 bg-[#C6F4D6] rounded-full blur-xl opacity-30"></div>
          <ShieldAlert size={48} className="text-[#64748B] relative z-10" />
        </div>
        <h3 className="text-2xl font-black text-[#1E293B] mb-3">
          No Community Posts Found
        </h3>
        <p className="text-[#64748B] max-w-md font-medium leading-relaxed">
          There are currently no community posts available for moderation. Your
          platforms community discussions will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="p-6">
              {/* Post Header */}
              <div className="flex justify-between items-start mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorImage}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
                  />
                  <div>
                    <p className="text-[#1E293B] font-bold text-sm leading-tight">
                      {post.authorName}
                    </p>
                    <p className="text-[#64748B] text-xs font-medium">
                      {post.postDate}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <div className="mb-5">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">
                  {post.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                {post.featuredImage && (
                  <div className="mt-4 rounded-2xl overflow-hidden border border-[#E2E8F0]">
                    <img
                      src={post.featuredImage}
                      alt="Post content"
                      className="w-full max-h-64 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Post Footer & Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-4 text-[#64748B] text-sm font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Heart size={16} className="text-[#EF4444]" />
                    <span>{post.totalLikes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={16} className="text-[#3B82F6]" />
                    <span>{post.totalComments}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#1E293B] text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer">
                    <Eye size={14} />
                    View Post
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#FECACA] hover:bg-[#FEF2F2] text-[#EF4444] text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    <Trash2 size={14} />
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal UI */}
      {deleteModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.15)] w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#E2E8F0]/50">
            <div className="relative p-6 sm:p-8 bg-gradient-to-b from-[#FEF2F2] to-white border-b border-[#E2E8F0] flex flex-col items-center text-center">
              <button
                onClick={closeDeleteModal}
                className="absolute top-4 right-4 p-2 bg-white rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] transition-colors shadow-sm cursor-pointer"
              >
                <X size={16} />
              </button>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#FECACA] text-[#EF4444] mb-4">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-black text-[#1E293B]">
                Delete Community Post?
              </h2>
              <p className="text-sm font-medium text-[#64748B] mt-2">
                This action will permanently remove the post{' '}
                <strong className="text-[#1E293B]">{selectedPost.title}</strong>{' '}
                from the platform.
              </p>
            </div>
            <div className="p-5 bg-[#F8FAFC] flex flex-col sm:flex-row gap-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-[#1E293B] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors shadow-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-colors shadow-sm cursor-pointer"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityPostsModerationTable;
