'use client';
import React from 'react';
import TrainerStatsSection from './TrainerStatsSection';
import TrainerProfileSection from './TrainerProfileSection';
import TrainerQuickActions from './TrainerQuickActions';
import { useSession } from '@/lib/auth-client';

const TrainerOverviewPageUi = ({
  classesCreatedData,
  forumPostData,
  totalEnrollments,
}) => {
  const { data } = useSession();
  const user = data?.user;

  const statsData = [
    {
      id: 1,
      label: 'Classes Created',
      value: classesCreatedData?.length,
      icon: 'Puzzle',
    },
    {
      id: 2,
      label: 'Students Enrolled',
      value: totalEnrollments,
      icon: 'Users',
    },
    {
      id: 3,
      label: 'Forum Posts',
      value: forumPostData?.length,
      icon: 'MessageSquare',
    },
  ];

  const profileData = {
    name: user?.name || 'Trainer',
    email: user?.email || '',
    role: user?.role || 'Trainer',
    imageUrl:
      user?.image ||
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  };

  const actionButtonsData = [
    {
      id: 1,
      name: 'Add Class',
      href: '/dashboard/trainer/add-class',
      icon: 'CirclePlus',
    },
    {
      id: 2,
      name: 'My Classes',
      href: '/dashboard/trainer/classes',
      icon: 'CalendarCheck',
    },
    {
      id: 3,
      name: 'Add Forum Post',
      href: '/dashboard/trainer/add-forum-post',
      icon: 'FilePlus2',
    },
    {
      id: 4,
      name: 'My Posts',
      href: '/dashboard/trainer/posts',
      icon: 'MessageSquare',
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-6 md:pt-10">
        {/* Page Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B]">
            Dashboard Overview
          </h1>
          <p className="text-[#64748B] mt-2 font-medium text-lg">
            Welcome back, heres whats happening with your classes today.
          </p>
        </div>

        <div className="flex flex-col space-y-10">
          {/* Profile Section containing Quick Actions */}
          <section>
            <TrainerProfileSection profileData={profileData}>
              <TrainerQuickActions actionButtonsData={actionButtonsData} />
            </TrainerProfileSection>
          </section>

          {/* Stats Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">
                Performance Summary
              </h2>
            </div>
            <TrainerStatsSection statsData={statsData} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TrainerOverviewPageUi;
