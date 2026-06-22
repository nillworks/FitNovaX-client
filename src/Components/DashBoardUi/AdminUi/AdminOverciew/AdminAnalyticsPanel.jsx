"use client";

import Image from 'next/image';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Star, Award, BarChart2 } from 'lucide-react';

const COLORS = ['#22C55E', '#8FE3B0', '#4AD27A', '#16A34A'];

const AdminAnalyticsPanel = ({ chartData, popularClass, quickInsights, activityData }) => {
    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Analytics Panels Layer */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Panel 1: Platform Growth Analytics */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-[#1E293B] font-bold text-lg">Platform Growth</h3>
                            <p className="text-[#64748B] text-sm font-medium mt-1">User registrations over time</p>
                        </div>
                        <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                            <BarChart2 size={20} className="text-[#22C55E]" />
                        </div>
                    </div>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.growth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontWeight: 600 }}
                                    itemStyle={{ color: '#16A34A' }}
                                    cursor={{ stroke: '#8FE3B0', strokeWidth: 2, strokeDasharray: '4 4' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" activeDot={{ r: 6, fill: '#15803D', stroke: '#fff', strokeWidth: 2 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Panel 2: Class & Booking Insights */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-[#1E293B] font-bold text-lg">Class Insights</h3>
                            <p className="text-[#64748B] text-sm font-medium mt-1">Bookings by category</p>
                        </div>
                        <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                            <Activity size={20} className="text-[#22C55E]" />
                        </div>
                    </div>
                    <div className="flex-1 min-h-[220px] w-full flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData.classDistribution}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.classDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', fontWeight: 600 }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center text for Donut Chart */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black text-[#1E293B]">
                                {chartData.classDistribution.reduce((acc, curr) => acc + curr.value, 0)}
                            </span>
                            <span className="text-xs text-[#64748B] font-semibold uppercase tracking-wider">Bookings</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-[#F8FAFC]">
                        {chartData.classDistribution.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="text-sm font-medium text-[#1E293B]">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Premium Widgets Layer */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Widget 1: Most Popular Class */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="bg-[#FFFBEB] p-2 rounded-lg">
                            <Star size={18} className="text-[#F59E0B]" fill="#F59E0B" />
                        </div>
                        <h3 className="text-[#1E293B] font-bold">Most Popular Class</h3>
                    </div>
                    <div className="flex gap-4 items-center bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0]">
                        <Image width={500} height={500} unoptimized src={popularClass.image} alt={popularClass.name} className="w-20 h-20 rounded-xl object-cover shadow-sm" />
                        <div>
                            <span className="bg-white text-[#64748B] border border-[#E2E8F0] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">{popularClass.category}</span>
                            <h4 className="text-[#1E293B] font-bold mt-2 text-sm leading-tight">{popularClass.name}</h4>
                            <p className="text-[#22C55E] text-xs font-bold mt-1 bg-[#C6F4D6]/50 inline-block px-2 py-0.5 rounded-full">{popularClass.enrollment} enrolled</p>
                        </div>
                    </div>
                </div>

                {/* Widget 2: Platform Activity Feed */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden flex flex-col">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="bg-[#F0FDF4] p-2 rounded-lg">
                            <Activity size={18} className="text-[#22C55E]" />
                        </div>
                        <h3 className="text-[#1E293B] font-bold">Live Activity</h3>
                    </div>
                    <div className="space-y-5 relative before:absolute before:inset-y-2 before:left-1.5 before:w-[2px] before:bg-[#E2E8F0] flex-1">
                        {activityData.slice(0, 3).map((activity, i) => (
                            <div key={activity.id} className="relative pl-6 group">
                                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#22C55E] ring-4 ring-white group-hover:scale-125 transition-transform"></div>
                                <p className="text-[#1E293B] text-sm font-semibold leading-tight">{activity.message}</p>
                                <p className="text-[#64748B] text-xs mt-1 font-medium">{activity.time}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Widget 3: Quick Insights Card */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] md:col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                            <Award size={18} className="text-[#22C55E]" />
                        </div>
                        <h3 className="text-[#1E293B] font-bold">Quick Insights</h3>
                    </div>
                    <div className="space-y-4">
                        {quickInsights.map((insight, index) => (
                            <div key={index} className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0] hover:bg-[#F0FDF4] transition-colors group">
                                <span className="text-[#64748B] text-sm font-semibold group-hover:text-[#16A34A] transition-colors">{insight.label}</span>
                                <span className={`font-black text-sm px-2.5 py-1 rounded-full ${
                                    insight.trend === 'up' ? 'bg-[#C6F4D6] text-[#15803D]' : 'bg-[#E2E8F0] text-[#1E293B]'
                                }`}>
                                    {insight.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsPanel;
