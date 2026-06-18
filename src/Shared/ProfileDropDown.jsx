'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, User, Settings, LogOut } from 'lucide-react';

const ProfileDropDown = ({ user, handleSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dashboardHref = {
    admin: '/dashboard/admin',
    user: '/dashboard/user',
    trainer: '/dashboard/trainer',
  };

  const dashboardLink = user?.role
    ? dashboardHref[user.role.toLowerCase()] || '/dashboard'
    : '/dashboard';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="relative transition-transform hover:scale-105">
          <img
            src={user?.image || 'https://i.pravatar.cc/150?img=68'}
            alt="User avatar"
            className="w-10 h-10 rounded-full border-2 border-[#C6F4D6] hover:border-[#22C55E] transition-colors object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full dark:border-[#0F172A]"></span>
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#0F172A] rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-[#E2E8F0] dark:border-gray-800 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#E2E8F0] dark:border-gray-800 bg-[#F8FAFC] dark:bg-gray-800/50">
              <p className="font-bold text-[#1E293B] dark:text-white truncate">
                {user?.name || 'Fitness Enthusiast'}
              </p>
              <p className="text-sm text-[#64748B] dark:text-gray-400 truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>

            {/* Links */}
            <div className="p-2 flex flex-col gap-1">
              {user?.role && (
                <Link
                  href={dashboardLink}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#64748B] dark:text-gray-400 hover:text-[#15803D] hover:bg-[#C6F4D6]/30 dark:hover:bg-gray-800 rounded-xl transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              )}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#64748B] dark:text-gray-400 hover:text-[#15803D] hover:bg-[#C6F4D6]/30 dark:hover:bg-gray-800 rounded-xl transition-all"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#64748B] dark:text-gray-400 hover:text-[#15803D] hover:bg-[#C6F4D6]/30 dark:hover:bg-gray-800 rounded-xl transition-all"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-[#E2E8F0] dark:border-gray-800">
              <button
                onClick={() => {
                  (handleSignOut(), setIsOpen(false));
                }}
                className="w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropDown;
