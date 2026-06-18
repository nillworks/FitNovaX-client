'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const ActiveLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="relative group px-4 py-2 flex items-center justify-center rounded-full transition-all duration-300">
      <span className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${
        isActive 
          ? 'text-[#15803D] dark:text-[#C6F4D6]' 
          : 'text-[#64748B] group-hover:text-[#1E293B] dark:text-gray-300 dark:group-hover:text-white'
      }`}>
        {children}
      </span>
      {isActive ? (
        <motion.div
          layoutId="activeNavBackground"
          className="absolute inset-0 bg-[#C6F4D6] dark:bg-[#16A34A]/20 rounded-full border border-[#8FE3B0]/50 dark:border-[#22C55E]/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      ) : (
        <div className="absolute inset-0 bg-transparent group-hover:bg-[#F8FAFC] dark:group-hover:bg-gray-800/50 rounded-full scale-95 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100" />
      )}
    </Link>
  );
};

export default ActiveLink;
