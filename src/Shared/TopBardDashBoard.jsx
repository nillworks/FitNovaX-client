'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu } from 'lucide-react';

const TopBardDashBoard = ({ user, onMenuClick }) => {
  const roleName = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User';
  
  return (
    <header className="sticky top-0 z-30 w-full bg-[#F8FAFC]/80 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="flex items-center justify-between px-6 py-4 lg:py-6">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2.5 text-[#64748B] hover:text-[#1E293B] bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl shadow-sm transition-all"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#1E293B] tracking-tight">
              {roleName} Dashboard
            </h1>
            <p className="text-sm lg:text-base font-medium text-[#64748B] mt-0.5">
              Welcome back, <span className="text-[#22C55E] font-bold">{user?.name?.split(' ')[0] || 'User'}</span>!
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <Link 
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-[#64748B] hover:text-[#15803D] hover:bg-[#FFFFFF] shadow-sm border border-transparent hover:border-[#E2E8F0] transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back To Site</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBardDashBoard;
