'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, Dumbbell, LogOut } from 'lucide-react';
import { Avatar } from '@heroui/react';

const MobileMenu = ({ isOpen, onClose, navLinks, user }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm"
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white dark:bg-[#0F172A] shadow-2xl flex flex-col border-l border-[#E2E8F0] dark:border-gray-800"
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-[#E2E8F0] dark:border-gray-800">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 group"
          >
            <div className="p-2 bg-[#C6F4D6] rounded-xl">
              <Dumbbell className="w-5 h-5 text-[#15803D]" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#1E293B] dark:text-white">
              Fit<span className="text-[#22C55E]">Core</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] rounded-full transition-colors dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {navLinks.map((link, idx) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className="block px-4 py-3 text-lg font-semibold text-[#1E293B] dark:text-white hover:text-[#22C55E] hover:bg-[#F8FAFC] dark:hover:bg-gray-800 rounded-2xl transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer / User Actions */}
        <div className="p-4 border-t border-[#E2E8F0] dark:border-gray-800 bg-[#F8FAFC] dark:bg-gray-800/30">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  isBordered
                  color="success"
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=68'}
                  className="w-10 h-10 border-[#C6F4D6]"
                />
                <div>
                  <p className="font-bold text-sm text-[#1E293B] dark:text-white">
                    {user?.name || 'Fitness Enthusiast'}
                  </p>
                  <p className="text-xs text-[#64748B]">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={onClose}
                className="w-full py-3 text-center text-sm font-semibold text-[#1E293B] dark:text-white border border-[#E2E8F0] dark:border-gray-700 rounded-full hover:bg-[#F8FAFC] dark:hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="w-full py-3 text-center text-sm font-semibold bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full shadow-lg shadow-[#22C55E]/30 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
