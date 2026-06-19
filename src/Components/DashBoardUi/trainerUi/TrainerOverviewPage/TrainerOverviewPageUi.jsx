import React from 'react';
import TrainerStatsSection from './TrainerStatsSection';
import TrainerProfileSection from './TrainerProfileSection';
import TrainerQuickActions from './TrainerQuickActions';

const TrainerOverviewPageUi = () => {
  const statsData = [
    {
      id: 1,
      label: 'Classes Created',
      value: '24', // Changed to non-zero for visual demonstration
      icon: 'Puzzle',
    },
    {
      id: 2,
      label: 'Students Enrolled',
      value: '186',
      icon: 'Users',
    },
    {
      id: 3,
      label: 'Forum Posts',
      value: '42',
      icon: 'MessageSquare',
    },
  ];

  const profileData = {
    name: 'Thaddeus Cortez',
    email: 'rokof@example.com',
    role: 'Senior Trainer',
    imageUrl:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  };

  const actionButtonsData = [
    { id: 1, label: 'Add New Class', icon: 'PlusCircle' },
    { id: 2, label: 'My Classes', icon: 'LayoutGrid' },
    { id: 3, label: 'Add Forum Post', icon: 'FileText' },
    { id: 4, label: 'My Posts', icon: 'MessageCircle' },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-6 md:pt-10">
        
        {/* Page Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1E293B]">Dashboard Overview</h1>
          <p className="text-[#64748B] mt-2 font-medium text-lg">Welcome back, here's what's happening with your classes today.</p>
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
              <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">Performance Summary</h2>
            </div>
            <TrainerStatsSection statsData={statsData} />
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default TrainerOverviewPageUi;
