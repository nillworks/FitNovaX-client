"use client";
import React from 'react';
import ClassesManagementTable from './ClassesManagementTable';
import ClassReviewInsights from './ClassReviewInsights';
import { ShieldCheck, Layers, ClipboardList, CheckCircle2, Video } from 'lucide-react';

const ManageClassesSection = () => {
  // Dummy Data
  const classesData = [
    {
      id: "CLS-101",
      title: "Advanced HIIT Protocol",
      trainerName: "Marcus Thorne",
      trainerImage: "https://i.pravatar.cc/150?u=10",
      category: "HIIT",
      difficulty: "Advanced",
      duration: "45 Min",
      totalBookings: 0,
      submittedDate: "2024-03-24",
      status: "Pending",
      thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "CLS-102",
      title: "Morning Vinyasa Flow",
      trainerName: "Elena Rodriguez",
      trainerImage: "https://i.pravatar.cc/150?u=11",
      category: "Yoga",
      difficulty: "Beginner",
      duration: "60 Min",
      totalBookings: 120,
      submittedDate: "2024-03-20",
      status: "Approved",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "CLS-103",
      title: "Elite Powerlifting Prep",
      trainerName: "David Kim",
      trainerImage: "https://i.pravatar.cc/150?u=14",
      category: "Strength",
      difficulty: "Expert",
      duration: "90 Min",
      totalBookings: 0,
      submittedDate: "2024-03-25",
      status: "Pending",
      thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop"
    }
  ];

  // Active classes (Set to empty array [] to test the beautiful empty state)
  const activeClasses = classesData;

  const dashboardStats = {
    totalSubmitted: activeClasses.length,
    pendingReviews: activeClasses.filter(c => c.status === "Pending").length,
    approvedClasses: activeClasses.filter(c => c.status === "Approved").length,
    totalBookings: activeClasses.reduce((acc, curr) => acc + curr.totalBookings, 0)
  };

  const insightsData = {
    totalReviews: 124,
    approvalRate: "92%",
    pendingQueue: dashboardStats.pendingReviews
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 min-h-screen relative" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Top Section: Executive Moderation Hero */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#C6F4D6] opacity-30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8FE3B0] opacity-20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1E293B] mb-2 tracking-tight flex items-center gap-3">
              <ShieldCheck className="text-[#22C55E]" size={32} />
              Manage Classes
            </h1>
            <p className="text-[#64748B] text-sm lg:text-base font-medium max-w-xl">
              Review trainer-submitted classes, enforce platform quality standards, and manage content moderation workflows.
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 lg:p-5 flex items-center gap-5 shadow-sm">
            <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-sm">
              <ClipboardList size={24} className="text-[#22C55E]" />
            </div>
            <div>
              <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mb-0.5">Pending Reviews</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#1E293B] leading-none">{dashboardStats.pendingReviews}</span>
                <span className="text-[#64748B] text-sm font-semibold">Requires Action</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section: Modern KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Classes", value: dashboardStats.totalSubmitted, icon: Layers, iconColor: "text-[#22C55E]" },
          { label: "Pending Classes", value: dashboardStats.pendingReviews, icon: ClipboardList, iconColor: "text-[#F59E0B]" },
          { label: "Approved Classes", value: dashboardStats.approvedClasses, icon: CheckCircle2, iconColor: "text-[#16A34A]" },
          { label: "Total Bookings", value: dashboardStats.totalBookings.toLocaleString(), icon: Video, iconColor: "text-[#22C55E]" }
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
        {/* Main Section: Left Side - Class Moderation Area */}
        <div className="flex-1 min-w-0">
          <ClassesManagementTable classesData={activeClasses} />
        </div>

        {/* Right Side: Class Review Insights Panel */}
        <div className="w-full xl:w-80 flex-shrink-0">
          <ClassReviewInsights insightsData={insightsData} />
        </div>
      </div>
    </div>
  );
};

export default ManageClassesSection;
