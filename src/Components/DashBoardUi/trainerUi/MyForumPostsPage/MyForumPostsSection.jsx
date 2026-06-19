"use client";
import React, { useState } from 'react';
import { LayoutGrid, FileText, Star, Clock, AlertTriangle, X, Trash2 } from 'lucide-react';
import MyForumPostsGrid from './MyForumPostsGrid';

const dummyPosts = [
  {
    id: 1,
    title: "10 Essential Core Exercises for Beginners",
    category: "Workout Tips",
    shortDescription: "A comprehensive guide to building a strong foundation with bodyweight core exercises you can do anywhere.",
    createdAt: "2026-06-15T10:00:00",
    readingTime: 5,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Ultimate Pre-Workout Nutrition Guide",
    category: "Nutrition",
    shortDescription: "Fuel your body right. Discover what to eat before hitting the gym for maximum energy and performance.",
    createdAt: "2026-06-10T14:30:00",
    readingTime: 8,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "How to Break Through a Weight Loss Plateau",
    category: "Weight Loss",
    shortDescription: "Stuck at the same weight? Here are 5 science-backed strategies to kickstart your fat loss journey again.",
    createdAt: "2026-06-05T09:15:00",
    readingTime: 6,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Yoga for Weightlifters: Improve Mobility",
    category: "Yoga",
    shortDescription: "Don't let stiffness ruin your form. Incorporate these 10-minute yoga flows post-workout for better recovery.",
    createdAt: "2026-05-28T16:45:00",
    readingTime: 4,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Mastering the Deadlift: Form Check",
    category: "Strength Training",
    shortDescription: "The most important cues and common mistakes to avoid when performing heavy barbell deadlifts.",
    createdAt: "2026-05-20T11:20:00",
    readingTime: 7,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
  }
];

const MyForumPostsSection = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const totalPosts = posts.length;
  const featuredPosts = posts.filter(p => p.featured).length;

  const openDeleteModal = (post) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  // UI ONLY: Does not actually mutate backend, just state for demo
  const handleDeleteConfirm = () => {
    if (postToDelete) {
      setPosts(posts.filter(p => p.id !== postToDelete.id));
    }
    closeDeleteModal();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 md:py-12 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Top Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-[#C6F4D6] p-3 rounded-2xl border border-[#8FE3B0] shadow-sm">
                <LayoutGrid className="w-8 h-8 text-[#15803D]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B]">My Forum Posts</h1>
            </div>
            <p className="text-[#64748B] text-lg font-medium max-w-2xl">
              Manage your published fitness insights. Review, track performance, or remove old content.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C6F4D6] rounded-bl-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-[#64748B] text-sm font-bold tracking-wide uppercase">Total Posts</p>
                <h3 className="text-3xl font-extrabold text-[#1E293B]">{totalPosts}</h3>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C6F4D6] rounded-bl-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                <Star className="w-6 h-6 text-[#16A34A]" />
              </div>
              <div>
                <p className="text-[#64748B] text-sm font-bold tracking-wide uppercase">Featured</p>
                <h3 className="text-3xl font-extrabold text-[#1E293B]">{featuredPosts}</h3>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C6F4D6] rounded-bl-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#4AD27A]" />
              </div>
              <div>
                <p className="text-[#64748B] text-sm font-bold tracking-wide uppercase">Recent Activity</p>
                <h3 className="text-lg font-bold text-[#1E293B] mt-1">Today</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        {posts.length > 0 ? (
          <MyForumPostsGrid posts={posts} onDeleteClick={openDeleteModal} />
        ) : (
          <div className="text-center py-20 bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-sm">
            <FileText className="w-16 h-16 text-[#8FE3B0] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#1E293B] mb-2">No Posts Yet</h3>
            <p className="text-[#64748B] font-medium">You haven't published any forum posts. Start sharing your knowledge!</p>
          </div>
        )}

      </div>

      {/* UI ONLY Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1E293B]/60 backdrop-blur-sm" onClick={closeDeleteModal}></div>
          
          {/* Modal Content */}
          <div className="relative bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-2xl w-full max-w-md overflow-hidden transform scale-100 animate-in fade-in zoom-in duration-200">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-400"></div>
            
            <button onClick={closeDeleteModal} className="absolute top-4 right-4 text-[#64748B] hover:text-[#1E293B] bg-[#F8FAFC] hover:bg-[#E2E8F0] p-1.5 rounded-full transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 text-center mt-2">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-200 shadow-sm">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#1E293B] mb-2">Delete Post?</h3>
              <p className="text-[#64748B] font-medium leading-relaxed mb-8">
                Are you sure you want to delete <span className="font-bold text-[#1E293B]">"{postToDelete?.title}"</span>? This action cannot be undone.
              </p>

              <div className="flex gap-4">
                <button 
                  onClick={closeDeleteModal}
                  className="flex-1 px-6 py-3.5 rounded-full font-bold text-[#1E293B] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors shadow-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-6 py-3.5 rounded-full font-bold text-white bg-red-500 hover:bg-red-600 border border-red-600 transition-colors shadow-md shadow-red-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyForumPostsSection;
