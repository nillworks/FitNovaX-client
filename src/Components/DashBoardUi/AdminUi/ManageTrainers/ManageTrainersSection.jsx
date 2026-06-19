"use client";
import React from 'react';
import ActiveTrainersTable from './ActiveTrainersTable';
import TrainerRoleManagementPanel from './TrainerRoleManagementPanel';
import { Users, Presentation, CalendarCheck, Star, Shield } from 'lucide-react';

const ManageTrainersSection = () => {
  // Dummy Data
  const trainersData = [
    {
      id: "TRN-001",
      name: "Marcus Thorne",
      email: "marcus.t@example.com",
      profileImage: "https://i.pravatar.cc/150?u=10",
      specialty: "Strength Training",
      experience: "5 years",
      joinedDate: "2023-01-15",
      totalClasses: 124,
      totalBookings: 2840,
      status: "Active",
      rating: 4.9
    },
    {
      id: "TRN-002",
      name: "Elena Rodriguez",
      email: "elena.rod@example.com",
      profileImage: "https://i.pravatar.cc/150?u=11",
      specialty: "Yoga & Pilates",
      experience: "8 years",
      joinedDate: "2022-11-04",
      totalClasses: 210,
      totalBookings: 4150,
      status: "Active",
      rating: 4.8
    },
    {
      id: "TRN-003",
      name: "David Kim",
      email: "dkim.power@example.com",
      profileImage: "https://i.pravatar.cc/150?u=14",
      specialty: "Powerlifting",
      experience: "10 years",
      joinedDate: "2021-06-22",
      totalClasses: 85,
      totalBookings: 1200,
      status: "Active",
      rating: 4.9
    }
  ];

  // Active trainers (Set to empty array [] to test the beautiful empty state)
  const activeTrainers = trainersData;

  const dashboardStats = {
    totalTrainers: activeTrainers.length,
    activeClasses: 419,
    totalBookings: 8190,
    averageRating: 4.8,
    platformCapacity: 50
  };

  const overviewData = {
    totalTrainers: activeTrainers.length,
    popularSpecialty: "Strength Training",
    averageExperience: "7.6 years"
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 min-h-screen relative" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Top Section: Executive Management Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6F4D6] opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#8FE3B0] opacity-10 rounded-full blur-2xl translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1E293B] mb-2 tracking-tight flex items-center gap-3">
              <Shield className="text-[#22C55E]" size={28} />
              Manage Trainers
            </h1>
            <p className="text-[#64748B] text-sm lg:text-base font-medium max-w-xl">
              Oversee your active fitness professionals, monitor engagement metrics, and manage platform roles seamlessly.
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 lg:p-5 flex items-center gap-6 shadow-sm">
            <div>
              <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mb-1">Active Trainers</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#1E293B] leading-none">{dashboardStats.totalTrainers}</span>
                <span className="text-[#64748B] text-sm font-semibold">/ {dashboardStats.platformCapacity}</span>
              </div>
            </div>
            <div className="w-16 h-16 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-[#E2E8F0]" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                <path className="text-[#22C55E]" strokeDasharray={`${(dashboardStats.totalTrainers / dashboardStats.platformCapacity) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
              <span className="absolute text-[#16A34A] text-xs font-bold">{Math.round((dashboardStats.totalTrainers / dashboardStats.platformCapacity) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section: Premium KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Trainers", value: dashboardStats.totalTrainers, icon: Users, color: "text-[#1E293B]", bgColor: "bg-[#F8FAFC]", iconColor: "text-[#22C55E]" },
          { label: "Active Classes", value: dashboardStats.activeClasses, icon: Presentation, color: "text-[#1E293B]", bgColor: "bg-[#F8FAFC]", iconColor: "text-[#22C55E]" },
          { label: "Total Bookings", value: dashboardStats.totalBookings.toLocaleString(), icon: CalendarCheck, color: "text-[#1E293B]", bgColor: "bg-[#F8FAFC]", iconColor: "text-[#22C55E]" },
          { label: "Avg. Rating", value: dashboardStats.averageRating, icon: Star, color: "text-[#1E293B]", bgColor: "bg-[#F8FAFC]", iconColor: "text-[#F59E0B]" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex items-center gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className={`${stat.bgColor} p-4 rounded-2xl border border-[#E2E8F0] group-hover:border-[#8FE3B0]/50 transition-colors`}>
              <stat.icon size={24} className={stat.iconColor} />
            </div>
            <div>
              <p className="text-[#64748B] text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className={`text-2xl font-black ${stat.color} leading-none`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main Section: Left Side - Active Trainers Area */}
        <div className="flex-1 min-w-0">
          <ActiveTrainersTable trainers={activeTrainers} />
        </div>

        {/* Right Side: Trainer Management Panel */}
        <div className="w-full xl:w-80 flex-shrink-0">
          <TrainerRoleManagementPanel overviewData={overviewData} />
        </div>
      </div>
    </div>
  );
};

export default ManageTrainersSection;
