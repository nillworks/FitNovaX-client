'use client';
import React from 'react';
import CommunityPostsModerationTable from './CommunityPostsModerationTable';
import ModerationInsightsPanel from './ModerationInsightsPanel';
import { Shield, MessageSquare, AlertOctagon, CheckCircle2, Search } from 'lucide-react';

const ForumPostManagementSection = ({
  posts = [],
  pagination = {},
  currentPage = 1,
}) => {
  const totalPosts = pagination.total ?? posts.length;
  const totalComments = posts.reduce(
    (acc, post) => acc + (Number(post.comment) || 0),
    0,
  );
  const totalLikes = posts.reduce(
    (acc, post) => acc + (Number(post.like) || 0),
    0,
  );
  const featuredPosts = posts.filter(post => post.isFeatured).length;

  const dashboardStats = {
    totalPosts,
    activeDiscussions: posts.length,
    totalComments,
    moderationActions: featuredPosts,
  };

  const insightsData = {
    totalPosts,
    activeMembers: posts.length
      ? new Set(posts.map(post => post.userId).filter(Boolean)).size
      : 0,
    totalDiscussions: posts.length,
  };

  return (
    <div
      className="container mx-auto p-4 lg:p-8 min-h-screen relative"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      <div className="bg-white rounded-3xl p-6 lg:p-8 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6F4D6] opacity-30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#8FE3B0] opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1E293B] mb-2 tracking-tight flex items-center gap-3">
              <Shield className="text-[#22C55E]" size={32} />
              Forum Moderation
            </h1>
            <p className="text-[#64748B] text-sm lg:text-base font-medium max-w-xl">
              Monitor community discussions, review reported content, and maintain
              a safe, welcoming environment for all fitness members.
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 lg:p-5 flex items-center gap-5 shadow-sm">
            <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-sm">
              <AlertOctagon size={24} className="text-[#22C55E]" />
            </div>
            <div>
              <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mb-0.5">
                Featured Posts
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#1E293B] leading-none">
                  {dashboardStats.moderationActions}
                </span>
                <span className="text-[#64748B] text-xs font-semibold">
                  On this page
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Total Posts',
            value: dashboardStats.totalPosts,
            icon: MessageSquare,
            iconColor: 'text-[#22C55E]',
          },
          {
            label: 'On This Page',
            value: dashboardStats.activeDiscussions,
            icon: Search,
            iconColor: 'text-[#16A34A]',
          },
          {
            label: 'Page Comments',
            value: dashboardStats.totalComments.toLocaleString(),
            icon: MessageSquare,
            iconColor: 'text-[#22C55E]',
          },
          {
            label: 'Page Likes',
            value: totalLikes.toLocaleString(),
            icon: CheckCircle2,
            iconColor: 'text-[#15803D]',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex items-center justify-between group hover:border-[#8FE3B0]/50 transition-colors"
          >
            <div>
              <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-[#1E293B] leading-none">
                {stat.value}
              </h3>
            </div>
            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] group-hover:bg-[#F0FDF4] group-hover:scale-110 transition-all duration-300">
              <stat.icon size={24} className={stat.iconColor} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <CommunityPostsModerationTable
            posts={posts}
            pagination={pagination}
            currentPage={currentPage}
          />
        </div>

        <div className="w-full xl:w-80 flex-shrink-0">
          <ModerationInsightsPanel insightsData={insightsData} />
        </div>
      </div>
    </div>
  );
};

export default ForumPostManagementSection;
