"use client";
import React, { useState, useEffect } from 'react';
import ActiveTrainersTable from './ActiveTrainersTable';
import TrainerRoleManagementPanel from './TrainerRoleManagementPanel';
import { Users, Presentation, CalendarCheck, Star, Shield, Loader2 } from 'lucide-react';
import getTrainerApplicationRoleData from '@/lib/api/getTrainerApplicationRoleData';

const ManageTrainersSection = () => {
  const [trainersData, setTrainersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrainers = async () => {
    setIsLoading(true);
    try {
      const response = await getTrainerApplicationRoleData(1, 10);
      if (response && response.data) {
        const formattedTrainers = response.data.map(trainer => ({
          id: trainer._id?.$oid || trainer._id || trainer.id,
          name: trainer.fullName || trainer.name || 'Unknown',
          email: trainer.email || '—',
          profileImage: trainer.userImage || "https://i.pravatar.cc/150?u=trainer",
          specialty: trainer.specialty || "Not Specified",
          experience: trainer.experience || "0",
          joinedDate: trainer.createdAt?.$date || trainer.createdAt,
          totalClasses: trainer.totalClasses || 0,
          totalBookings: trainer.totalBookings || 0,
          status: trainer.status || "Active",
          rating: trainer.rating || 4.5
        }));
        setTrainersData(formattedTrainers);
      }
    } catch (error) {
      console.error("Failed to fetch active trainers", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const dashboardStats = {
    totalTrainers: trainersData.length,
    activeClasses: trainersData.reduce((acc, curr) => acc + (curr.totalClasses || 0), 0),
    totalBookings: trainersData.reduce((acc, curr) => acc + (curr.totalBookings || 0), 0),
    averageRating: trainersData.length ? (trainersData.reduce((acc, curr) => acc + (curr.rating || 0), 0) / trainersData.length).toFixed(1) : 0,
    platformCapacity: 50
  };

  const overviewData = {
    totalTrainers: trainersData.length,
    popularSpecialty: trainersData.length > 0 ? trainersData[0].specialty : "N/A",
    averageExperience: trainersData.length ? (trainersData.reduce((acc, curr) => acc + parseInt(curr.experience || 0), 0) / trainersData.length).toFixed(1) + " years" : "0 years"
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
          {isLoading ? (
            <div className="bg-white rounded-3xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-[#22C55E] w-12 h-12 mb-4" />
              <p className="text-[#64748B] font-medium">Loading active trainers...</p>
            </div>
          ) : (
            <ActiveTrainersTable trainers={trainersData} />
          )}
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
