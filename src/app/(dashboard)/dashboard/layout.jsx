'use client';

import React, { useState } from 'react';
import TopBardDashBoard from '@/Shared/TopBardDashBoard';
import SidBarDashBoard from '@/Shared/SidBarDashBoard';
import ImpersonationBanner from '@/lib/admin/ImpersonationBanner';
import { useSession } from '@/lib/auth-client';

const DashBoardLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data } = useSession();
  const user = data?.user;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SidBarDashBoard 
        user={user} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />
      <div className="lg:ml-[280px] flex flex-col min-h-screen transition-all duration-300 relative z-10">
        <ImpersonationBanner />
        <TopBardDashBoard
          user={user} 
          onMenuClick={() => setIsMobileOpen(true)} 
        />
        <main className="flex-1 p-6 lg:p-8 relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
