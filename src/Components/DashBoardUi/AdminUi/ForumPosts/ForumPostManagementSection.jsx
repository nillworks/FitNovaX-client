"use client";
import React from 'react';
import CommunityPostsModerationTable from './CommunityPostsModerationTable';
import ModerationInsightsPanel from './ModerationInsightsPanel';
import { Shield, MessageSquare, AlertOctagon, CheckCircle2, Search } from 'lucide-react';

const ForumPostManagementSection = () => {
  // Dummy Data
  const forumPostsData = [
    {
      id: "POST-001",
      title: "Is it normal to feel this sore after leg day?",
      authorName: "Alex Mercer",
      authorImage: "https://i.pravatar.cc/150?u=12",
      category: "Recovery",
      postDate: "2 hours ago",
      totalComments: 14,
      totalLikes: 42,
      excerpt: "I just started the new Advanced Hypertrophy program and my legs are completely destroyed. I can barely walk up the stairs. Should I skip my next workout or push through?",
      featuredImage: null
    },
    {
      id: "POST-002",
      title: "Best supplements for cutting phase?",
      authorName: "Sarah Jenkins",
      authorImage: "https://i.pravatar.cc/150?u=13",
      category: "Nutrition",
      postDate: "5 hours ago",
      totalComments: 31,
      totalLikes: 89,
      excerpt: "Hey everyone! I'm planning to start a 12-week cut next Monday. What are your go-to supplements to maintain muscle mass while dropping body fat? Looking for honest reviews.",
      featuredImage: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "POST-003",
      title: "Form check: Deadlift 315lbs x 5",
      authorName: "David Wu",
      authorImage: "https://i.pravatar.cc/150?u=14",
      category: "Form Check",
      postDate: "1 day ago",
      totalComments: 22,
      totalLikes: 156,
      excerpt: "Hitting a new PR for reps today! Wanted to get some feedback on my lower back position. Does it look like I'm rounding too much off the floor?",
      featuredImage: null
    }
  ];

  // Active posts (Set to empty array [] to test the beautiful empty state)
  const posts = forumPostsData;

  const dashboardStats = {
    totalPosts: 452,
    activeDiscussions: 86,
    totalComments: 3241,
    moderationActions: 12
  };

  const insightsData = {
    totalPosts: 452,
    activeMembers: "1.2k",
    totalDiscussions: 86
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 min-h-screen relative" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Top Section: Community Safety Command Center */}
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
              Monitor community discussions, review reported content, and maintain a safe, welcoming environment for all fitness members.
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 lg:p-5 flex items-center gap-5 shadow-sm">
            <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-sm">
              <AlertOctagon size={24} className="text-[#22C55E]" />
            </div>
            <div>
              <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mb-0.5">Moderated Today</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#1E293B] leading-none">{dashboardStats.moderationActions}</span>
                <span className="text-[#64748B] text-xs font-semibold">Actions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section: Premium Moderation KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Posts", value: dashboardStats.totalPosts, icon: MessageSquare, iconColor: "text-[#22C55E]" },
          { label: "Active Discussions", value: dashboardStats.activeDiscussions, icon: Search, iconColor: "text-[#16A34A]" },
          { label: "Total Comments", value: dashboardStats.totalComments.toLocaleString(), icon: MessageSquare, iconColor: "text-[#22C55E]" },
          { label: "Moderated Items", value: dashboardStats.moderationActions, icon: CheckCircle2, iconColor: "text-[#15803D]" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex items-center justify-between group hover:border-[#8FE3B0]/50 transition-colors">
            <div>
              <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black text-[#1E293B] leading-none">{stat.value}</h3>
            </div>
            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] group-hover:bg-[#F0FDF4] group-hover:scale-110 transition-all duration-300">
              <stat.icon size={24} className={stat.iconColor} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main Section: Left Side - Community Moderation Feed */}
        <div className="flex-1 min-w-0">
          <CommunityPostsModerationTable posts={posts} />
        </div>

        {/* Right Side: Moderation Insights Panel */}
        <div className="w-full xl:w-80 flex-shrink-0">
          <ModerationInsightsPanel insightsData={insightsData} />
        </div>
      </div>
    </div>
  );
};

export default ForumPostManagementSection;
