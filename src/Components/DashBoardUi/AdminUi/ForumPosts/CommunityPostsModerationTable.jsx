'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Heart,
  ShieldAlert,
  Trash2,
  Eye,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Crown,
  User,
  Loader2,
} from 'lucide-react';
import { adminDeleteForumPost } from '@/lib/Action/adminDeleteForumPost';
import CustomToast from '@/Shared/CustomToast';
import { useRouter } from 'next/navigation';

const getPostId = post =>
  post?._id?.$oid || post?._id?.toString?.() || post?._id || post?.id;

const formatCategory = value =>
  value
    ? String(value)
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '—';

const getRoleBadge = role => {
  const normalized = String(role || 'user').toLowerCase();

  if (normalized === 'admin') {
    return (
      <span className="inline-flex items-center gap-1 bg-[#C6F4D6] text-[#15803D] border border-[#8FE3B0]/50 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider shadow-sm">
        <Crown size={10} strokeWidth={3} />
        Admin
      </span>
    );
  }

  if (normalized === 'trainer') {
    return (
      <span className="inline-flex items-center gap-1 bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE] text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider shadow-sm">
        <Star size={10} strokeWidth={3} />
        Trainer
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
      <User size={10} strokeWidth={2.5} />
      User
    </span>
  );
};

const formatPostDate = dateValue => {
  const raw = dateValue?.$date || dateValue;
  if (!raw) return '—';

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const CommunityPostsModerationTable = ({
  posts = [],
  pagination = {},
  currentPage = 1,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const totalPages = pagination.totalPages || 1;
  const totalItems = pagination.total ?? posts.length;
  const router = useRouter();

  const closeDeleteModal = () => {
    if (deletingId) return;
    setDeleteModalOpen(false);
    setSelectedPost(null);
  };

  const handleDeleteClick = post => {
    setSelectedPost(post);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const id = getPostId(selectedPost);
    if (!id) {
      CustomToast('error', 'Delete Failed', 'Invalid post id');
      return;
    }

    setDeletingId(id);
    const res = await adminDeleteForumPost(id);
    setDeletingId(null);

    if (!res.success) {
      CustomToast('error', 'Delete Failed', res.message || 'Something went wrong');
      return;
    }

    setDeleteModalOpen(false);
    setSelectedPost(null);

    if (posts.length === 1 && currentPage > 1) {
      router.push(`/dashboard/admin/forum-posts?page=${currentPage - 1}`);
    } else {
      router.refresh();
    }

    CustomToast(
      'success',
      'Post Deleted',
      res.message || 'Post deleted successfully',
    );
  };

  if (!posts.length) {
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
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-[#1E293B]">
              Community Posts
            </h2>
            <p className="text-sm font-medium text-[#64748B]">
              Showing {posts.length} of {totalItems} posts
            </p>
          </div>
          <span className="inline-flex items-center self-start sm:self-auto bg-white border border-[#E2E8F0] text-[#64748B] text-xs font-bold px-3 py-1.5 rounded-lg">
            Page {currentPage} / {totalPages}
          </span>
        </div>

        <div className="p-5 lg:p-6 space-y-6">
          {posts.map(post => (
            <div
              key={getPostId(post)}
              className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <Image width={500} height={500} unoptimized
                      src={
                        post.userImage ||
                        'https://i.pravatar.cc/150?u=forum-user'
                      }
                      alt={post.userName || 'Author'}
                      className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-[#1E293B] font-bold text-sm leading-tight">
                          {post.userName || 'Unknown Author'}
                        </p>
                        {getRoleBadge(post.userRole)}
                      </div>
                      <p className="text-[#64748B] text-xs font-medium">
                        {formatPostDate(post.createDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {post.isFeatured && (
                      <span className="inline-flex items-center gap-1 bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                        <Star size={10} fill="currentColor" />
                        Featured
                      </span>
                    )}
                    <span className="inline-flex items-center bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                      {formatCategory(post.category)}
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    {post.summary || post.description || '—'}
                  </p>
                  {post.coverImage && (
                    <div className="mt-4 rounded-2xl overflow-hidden border border-[#E2E8F0]">
                      <Image width={500} height={500} unoptimized
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full max-h-64 object-cover"
                      />
                    </div>
                  )}
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={`${getPostId(post)}-tag-${idx}`}
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-[#E2E8F0]">
                  <div className="flex items-center gap-4 text-[#64748B] text-sm font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Heart size={16} className="text-[#EF4444]" />
                      <span>{post.like ?? 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare size={16} className="text-[#3B82F6]" />
                      <span>{post.comment ?? 0}</span>
                    </div>
                    {post.readingTime != null && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} className="text-[#64748B]" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    )}
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

        {totalPages > 1 && (
          <div className="p-5 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-[#F0FDF4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-semibold text-[#64748B]">
              Page {currentPage} of {totalPages} · {totalItems} total posts
            </p>
            <div className="flex items-center gap-2">
              {currentPage > 1 ? (
                <Link
                  href={`/dashboard/admin/forum-posts?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-[#1E293B] bg-white border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] hover:border-[#8FE3B0]/50 transition-all shadow-sm"
                >
                  <ChevronLeft size={16} />
                  Previous
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-[#94A3B8] bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl cursor-not-allowed">
                  <ChevronLeft size={16} />
                  Previous
                </span>
              )}

              <div className="hidden sm:flex items-center gap-1.5 px-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    page =>
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1,
                  )
                  .map((page, idx, arr) => {
                    const prev = arr[idx - 1];
                    const showEllipsis = prev && page - prev > 1;

                    return (
                      <React.Fragment key={page}>
                        {showEllipsis && (
                          <span className="px-1 text-[#94A3B8] font-bold">
                            ...
                          </span>
                        )}
                        {page === currentPage ? (
                          <span className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-[#22C55E] text-white text-sm font-black shadow-sm">
                            {page}
                          </span>
                        ) : (
                          <Link
                            href={`/dashboard/admin/forum-posts?page=${page}`}
                            className="w-9 h-9 inline-flex items-center justify-center rounded-xl bg-white border border-[#E2E8F0] text-[#1E293B] text-sm font-bold hover:bg-[#F8FAFC] hover:border-[#8FE3B0]/50 transition-all"
                          >
                            {page}
                          </Link>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>

              {currentPage < totalPages ? (
                <Link
                  href={`/dashboard/admin/forum-posts?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-white bg-[#22C55E] border border-[#16A34A] rounded-xl hover:bg-[#16A34A] transition-all shadow-sm"
                >
                  Next
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-[#94A3B8] bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl cursor-not-allowed">
                  Next
                  <ChevronRight size={16} />
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {deleteModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.15)] w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#E2E8F0]/50">
            <div className="relative p-6 sm:p-8 bg-gradient-to-b from-[#FEF2F2] to-white border-b border-[#E2E8F0] flex flex-col items-center text-center">
              <button
                onClick={closeDeleteModal}
                disabled={!!deletingId}
                className="absolute top-4 right-4 p-2 bg-white rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={!!deletingId}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-[#1E293B] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={!!deletingId}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {deletingId ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Post'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityPostsModerationTable;
