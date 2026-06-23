"use client";

import React, { useState } from 'react';
import { FaHeart, FaThumbsDown, FaClock, FaCalendarAlt, FaUserPlus } from 'react-icons/fa';
import { voteForum } from '@/lib/api/voteForum';
import { useSession } from '@/lib/auth-client';
import { toast } from 'sonner';

const ForumPostContent = ({ post, children }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  
  const [likes, setLikes] = useState(post?.like || 0);
  const [dislikes, setDislikes] = useState(post?.disLike || post?.dislike || 0);
  const [isVoting, setIsVoting] = useState(false);
  
  // Track user's current vote to properly decrement the opposite vote
  const [userVote, setUserVote] = useState(null);

  React.useEffect(() => {
    if (userId) {
      if (post?.likedUsers?.includes(userId)) {
        setUserVote('like');
      } else if (post?.dislikedUsers?.includes(userId)) {
        setUserVote('dislike');
      }
    }
  }, [userId, post?.likedUsers, post?.dislikedUsers]);
  
  const handleVote = async (type) => {
    if (!userId) {
      toast.error('You must be logged in to vote.');
      return;
    }
    
    if (isVoting) return;

    // Prevent redundant API calls if we already know their state locally
    if (userVote === type) {
      toast.info(`Already ${type}d`);
      return;
    }

    setIsVoting(true);

    try {
      const response = await voteForum(post._id, userId, type);
      
      if (response.success) {
        if (response.message === 'Already liked' || response.message === 'Already disliked') {
          toast.info(response.message);
          setUserVote(type); // Sync state just in case
        } else {
          toast.success(response.message);
          
          if (type === 'like') {
             setLikes(prev => prev + 1);
             // If they previously disliked, or we didn't know but dislikes exist, decrement dislikes
             if (userVote === 'dislike' || (!userVote && dislikes > 0)) {
               setDislikes(prev => Math.max(0, prev - 1));
             }
             setUserVote('like');
          } else if (type === 'dislike') {
             setDislikes(prev => prev + 1);
             // If they previously liked, or we didn't know but likes exist, decrement likes
             if (userVote === 'like' || (!userVote && likes > 0)) {
               setLikes(prev => Math.max(0, prev - 1));
             }
             setUserVote('dislike');
          }
        }
      } else {
        toast.error(response.message || 'Failed to vote');
      }
    } catch (error) {
      toast.error('An error occurred while voting.');
    } finally {
      setIsVoting(false);
    }
  };

  const roleBadgeColor = post?.userRole?.toLowerCase() === 'admin' 
    ? 'bg-[#15803D] text-[#FFFFFF]' 
    : 'bg-[#8FE3B0] text-[#1E293B]';

  return (
    <article className="container mx-auto px-4 md:px-8 py-12 lg:py-16 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Header Area */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              {post?.category && (
                <span className="bg-[#E2E8F0] text-[#1E293B] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  {post.category}
                </span>
              )}
              {post?.isFeatured && (
                <span className="bg-[#22C55E] text-[#FFFFFF] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1E293B] leading-[1.15] tracking-tight">
              {post?.title || 'Untitled Discussion'}
            </h1>
          </div>

          {/* Immersive Hero Image */}
          <div className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-xl relative group bg-[#0F172A]">
            <img 
              src={post?.coverImage || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop'} 
              alt={post?.title} 
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Description Content */}
          <div className="prose prose-lg md:prose-xl max-w-none text-[#1E293B] leading-loose tracking-wide font-medium">
            {post?.description ? (
              <div dangerouslySetInnerHTML={{ __html: post.description }} />
            ) : (
              <p className="text-[#64748B]">
                {post?.summary || 'No detailed content provided for this discussion.'}
              </p>
            )}
          </div>

          <hr className="border-[#E2E8F0] border-t-2 my-4" />

          {/* Comments Section Rendered Here */}
          {children}

        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 flex flex-col gap-8">
            
            {/* Author Profile Card */}
            <div className="bg-[#FFFFFF] rounded-[2rem] p-8 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#C6F4D6] to-[#4AD27A] opacity-30 transition-opacity group-hover:opacity-50"></div>
               <div className="relative flex flex-col items-center text-center mt-6">
                  <img 
                    src={post?.userImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'} 
                    alt={post?.userName} 
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#FFFFFF] shadow-xl mb-4 transform transition-transform group-hover:-translate-y-2"
                  />
                  <h3 className="text-2xl font-black text-[#1E293B]">{post?.userName || 'Member'}</h3>
                  <span className={`text-xs font-bold px-4 py-1.5 rounded-lg mt-2 uppercase tracking-wider shadow-sm ${roleBadgeColor}`}>
                    {post?.userRole || 'Trainer'}
                  </span>
                  <p className="text-[#64748B] text-sm mt-5 font-medium leading-relaxed px-4">
                    Active community member sharing insights and experiences.
                  </p>
                  <button className="w-full flex items-center justify-center gap-2 mt-8 bg-[#F8FAFC] text-[#16A34A] border-2 border-[#C6F4D6] hover:bg-[#22C55E] hover:text-[#FFFFFF] hover:border-[#22C55E] font-bold py-3.5 rounded-2xl transition-all shadow-sm">
                    <FaUserPlus /> Follow Author
                  </button>
               </div>
            </div>

            {/* Post Meta Info Card */}
            <div className="bg-[#FFFFFF] rounded-[2rem] p-8 border border-[#E2E8F0] shadow-sm">
              <h4 className="text-sm font-black text-[#1E293B] uppercase tracking-widest mb-6">Details</h4>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                   <div className="flex items-center gap-3 text-[#1E293B] font-bold">
                      <div className="w-10 h-10 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-[#4AD27A]">
                        <FaCalendarAlt />
                      </div>
                      Published
                   </div>
                   <span className="text-[#64748B] font-semibold text-sm">
                     {post?.createDate ? new Date(post.createDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '23 Jun 2026'}
                   </span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3 text-[#1E293B] font-bold">
                      <div className="w-10 h-10 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-[#4AD27A]">
                        <FaClock />
                      </div>
                      Reading Time
                   </div>
                   <span className="text-[#64748B] font-semibold text-sm">{post?.readingTime || '5 min'}</span>
                </div>
              </div>
            </div>

            {/* Premium Engagement Card */}
            <div className="bg-[#0F172A] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#22C55E] rounded-full blur-3xl opacity-20"></div>
               <h4 className="text-xl font-black text-[#FFFFFF] mb-2 relative z-10">Was this helpful?</h4>
               <p className="text-[#64748B] text-sm mb-8 font-medium relative z-10">Your feedback helps improve content quality.</p>
               <div className="flex items-center gap-4 relative z-10">
                 <button 
                   onClick={() => handleVote('like')}
                   disabled={isVoting}
                   className="flex-1 flex flex-col items-center justify-center gap-2 bg-[#1E293B] hover:bg-[#22C55E] text-[#FFFFFF] py-4 rounded-2xl transition-all font-bold disabled:opacity-50 hover:-translate-y-1 shadow-lg"
                 >
                   <FaHeart className={`text-2xl ${likes > 0 ? 'text-[#C6F4D6]' : 'text-[#64748B]'}`} /> 
                   <span className="text-lg">{likes}</span>
                 </button>
                 <button 
                   onClick={() => handleVote('dislike')}
                   disabled={isVoting}
                   className="flex-1 flex flex-col items-center justify-center gap-2 bg-[#1E293B] hover:bg-[#EF4444] text-[#FFFFFF] py-4 rounded-2xl transition-all font-bold disabled:opacity-50 hover:-translate-y-1 shadow-lg"
                 >
                   <FaThumbsDown className={`text-2xl ${dislikes > 0 ? 'text-[#FEE2E2]' : 'text-[#64748B]'}`} /> 
                   <span className="text-lg">{dislikes}</span>
                 </button>
               </div>
            </div>

            {/* Tags area */}
            {post?.tags && post.tags.length > 0 && (
              <div className="bg-[#FFFFFF] rounded-[2rem] p-8 border border-[#E2E8F0] shadow-sm">
                <h4 className="text-sm font-black text-[#1E293B] uppercase tracking-widest mb-6">Topics</h4>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#F8FAFC] text-[#16A34A] text-sm font-bold px-4 py-2 rounded-xl border-2 border-[#E2E8F0] hover:border-[#22C55E] cursor-pointer transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </article>
  );
};

export default ForumPostContent;
