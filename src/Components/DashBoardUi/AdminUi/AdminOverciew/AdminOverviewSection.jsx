'use client';

import Image from 'next/image';
import AdminOverviewHero from './AdminOverviewHero';
import AdminAnalyticsPanel from './AdminAnalyticsPanel';

const AdminOverviewSection = () => {
  // Dummy Data
  const adminData = {
    name: 'Alex Sterling',
    role: 'Super Admin',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    healthScore: 98,
    status: 'Online',
  };

  const statsData = {
    totalUsers: 12450,
    totalUsersGrowth: 12.5,
    totalClasses: 84,
    totalClassesGrowth: 5.2,
    totalBookedClasses: 5240,
    totalBookedGrowth: 18.4,
  };

  const chartData = {
    growth: [
      { name: 'Jan', users: 4000 },
      { name: 'Feb', users: 5500 },
      { name: 'Mar', users: 6200 },
      { name: 'Apr', users: 7800 },
      { name: 'May', users: 9500 },
      { name: 'Jun', users: 10800 },
      { name: 'Jul', users: 12450 },
    ],
    classDistribution: [
      { name: 'Yoga', value: 450 },
      { name: 'HIIT', value: 300 },
      { name: 'Pilates', value: 200 },
      { name: 'Spin', value: 150 },
    ],
  };

  const activityData = [
    {
      id: 1,
      type: 'user',
      message: 'Sarah J. joined Premium',
      time: '2 mins ago',
    },
    {
      id: 2,
      type: 'class',
      message: 'Advanced HIIT approved',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'booking',
      message: '50+ bookings for Yoga',
      time: '3 hours ago',
    },
    {
      id: 4,
      type: 'system',
      message: 'Weekly system backup completed',
      time: '5 hours ago',
    },
    {
      id: 5,
      type: 'user',
      message: 'Mike T. upgraded to Annual',
      time: '6 hours ago',
    },
  ];

  const popularClass = {
    name: 'Advanced Power Yoga',
    category: 'Yoga',
    enrollment: 145,
    image:
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=200&h=200',
  };

  const quickInsights = [
    { label: 'User Growth', value: '+24.5%', trend: 'up' },
    { label: 'Booking Growth', value: '+18.2%', trend: 'up' },
    { label: 'Classes Approved', value: '42', trend: 'neutral' },
  ];

  return (
    <div
      className="container mx-auto p-4 lg:p-8 min-h-screen"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE - Sticky Executive Panel */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-8 space-y-6">
            {/* Admin Profile Card */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <Image width={500} height={500} unoptimized
                    src={adminData.avatar}
                    alt="Admin"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#C6F4D6]"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#22C55E] border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-[#1E293B] font-bold text-lg leading-tight">
                    {adminData.name}
                  </h2>
                  <span className="inline-block mt-1 bg-[#C6F4D6] text-[#16A34A] text-xs px-2.5 py-0.5 rounded-full font-semibold">
                    {adminData.role}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#E2E8F0] pt-5 mb-5">
                <p className="text-[#64748B] text-sm mb-1 font-medium">
                  Platform Health Score
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-[#22C55E]">
                    {adminData.healthScore}
                  </span>
                  <span className="text-[#64748B] text-sm mb-1.5 font-medium">
                    / 100
                  </span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2 mt-3">
                  <div
                    className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] h-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                    style={{ width: `${adminData.healthScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Mini Activity Timeline */}
              <div className="mt-6">
                <h3 className="text-[#1E293B] font-bold text-sm mb-4">
                  Quick Summary
                </h3>
                <div className="space-y-4">
                  {activityData.slice(0, 3).map(activity => (
                    <div
                      key={activity.id}
                      className="flex gap-3 items-start group"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#4AD27A] mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <div>
                        <p className="text-[#1E293B] text-sm font-medium leading-snug">
                          {activity.message}
                        </p>
                        <p className="text-[#64748B] text-xs mt-0.5">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Main Content */}
        <div className="flex-1 space-y-8 min-w-0">
          <AdminOverviewHero
            statsData={statsData}
            adminName={adminData.name.split(' ')[0]}
          />
          <AdminAnalyticsPanel
            chartData={chartData}
            popularClass={popularClass}
            quickInsights={quickInsights}
            activityData={activityData}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewSection;
