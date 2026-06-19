import React from 'react';
import TrainerStatsSection from './TrainerStatsSection';
import TrainerProfileSection from './TrainerProfileSection';
import TrainerQuickActions from './TrainerQuickActions';

const TrainerOverviewPageUi = () => {
  const statsData = [
    {
      id: 1,
      label: "Total Classes Created",
      value: "0",
      icon: "Puzzle"
    },
    {
      id: 2,
      label: "Total Students Enrolled",
      value: "0",
      icon: "Users"
    },
    {
      id: 3,
      label: "Forum Posts",
      value: "0",
      icon: "MessageSquare"
    }
  ];

  const profileData = {
    name: "Thaddeus Cortez",
    email: "rokof@example.com",
    role: "Trainer",
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
  };

  const actionButtonsData = [
    { id: 1, label: "Add New Class", icon: "PlusCircle" },
    { id: 2, label: "My Classes", icon: "LayoutGrid" },
    { id: 3, label: "Add Forum Post", icon: "FileText" },
    { id: 4, label: "My Posts", icon: "MessageCircle" }
  ];

  return (
    <div className="container mx-auto p-6 md:p-8 bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6F4D6] text-[#15803D] font-semibold text-sm shadow-sm border border-[#8FE3B0]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]"></span>
            </span>
            Account Role: Member
          </div>
        </div>
        
        <TrainerStatsSection statsData={statsData} />
        
        <TrainerProfileSection profileData={profileData}>
          <TrainerQuickActions actionButtonsData={actionButtonsData} />
        </TrainerProfileSection>
      </div>
    </div>
  );
};

export default TrainerOverviewPageUi;
