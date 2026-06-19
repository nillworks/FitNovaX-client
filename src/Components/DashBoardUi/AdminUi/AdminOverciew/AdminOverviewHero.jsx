"use client";
import React from 'react';
import { Users, Dumbbell, CalendarCheck, TrendingUp, Sparkles } from 'lucide-react';

const AdminOverviewHero = ({ statsData, adminName }) => {
    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Top: Large Dashboard Hero Banner */}
            <div className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-[0_20px_40px_rgba(34,197,94,0.2)] border border-[#4AD27A]/30">
                {/* Decorative Analytics Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#C6F4D6] opacity-20 rounded-full blur-2xl translate-y-1/2 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="text-white max-w-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, {adminName}!</h1>
                            <Sparkles className="text-[#C6F4D6] animate-pulse" size={24} />
                        </div>
                        <p className="text-[#C6F4D6] text-base lg:text-lg font-medium">Platform growth is accelerating. You have 42 new user registrations and 5 classes pending approval today.</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 lg:p-5 text-white min-w-[200px] shadow-inner">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp size={18} className="text-[#C6F4D6]" />
                            <span className="text-[#C6F4D6] text-sm font-semibold tracking-wide uppercase">Monthly Growth</span>
                        </div>
                        <div className="text-3xl font-black drop-shadow-sm">+24.5%</div>
                    </div>
                </div>
            </div>

            {/* Middle Section: 3 Premium Floating Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat Card 1 */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-[#F8FAFC] p-3.5 rounded-2xl group-hover:bg-[#C6F4D6]/50 transition-colors">
                            <Users size={24} className="text-[#22C55E]" />
                        </div>
                        <div className="bg-[#C6F4D6] text-[#15803D] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <TrendingUp size={12} strokeWidth={3} />
                            +{statsData.totalUsersGrowth}%
                        </div>
                    </div>
                    <div>
                        <p className="text-[#64748B] text-sm font-semibold mb-1">Total Users</p>
                        <h3 className="text-3xl font-black text-[#1E293B] tracking-tight">{statsData.totalUsers.toLocaleString()}</h3>
                    </div>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-[#F8FAFC] p-3.5 rounded-2xl group-hover:bg-[#C6F4D6]/50 transition-colors">
                            <Dumbbell size={24} className="text-[#22C55E]" />
                        </div>
                        <div className="bg-[#C6F4D6] text-[#15803D] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <TrendingUp size={12} strokeWidth={3} />
                            +{statsData.totalClassesGrowth}%
                        </div>
                    </div>
                    <div>
                        <p className="text-[#64748B] text-sm font-semibold mb-1">Total Classes</p>
                        <h3 className="text-3xl font-black text-[#1E293B] tracking-tight">{statsData.totalClasses.toLocaleString()}</h3>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="bg-[#F8FAFC] p-3.5 rounded-2xl group-hover:bg-[#C6F4D6]/50 transition-colors">
                            <CalendarCheck size={24} className="text-[#22C55E]" />
                        </div>
                        <div className="bg-[#C6F4D6] text-[#15803D] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <TrendingUp size={12} strokeWidth={3} />
                            +{statsData.totalBookedGrowth}%
                        </div>
                    </div>
                    <div>
                        <p className="text-[#64748B] text-sm font-semibold mb-1">Total Booked Classes</p>
                        <h3 className="text-3xl font-black text-[#1E293B] tracking-tight">{statsData.totalBookedClasses.toLocaleString()}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewHero;
