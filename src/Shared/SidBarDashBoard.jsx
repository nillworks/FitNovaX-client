'use client';
import Image from 'next/image';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  GraduationCap,
  LogOut,
  Dumbbell,
  X,
  Users,
  Settings,
  Activity,
  Plus,
  PlusCircle,
  FilePlus2,
  MessageSquare,
  CirclePlus,
  ClipboardList,
  UserCog,
  CheckSquare,
  FilePlus,
  CreditCard,
} from 'lucide-react';
import { signOut } from '@/lib/auth-client';
import CustomToast from './CustomToast';

const getNavLinks = role => {
  const baseRole = role?.toLowerCase() || 'user';

  if (baseRole === 'admin') {
    return [
      {
        name: 'Overview',
        href: '/dashboard/admin',
        icon: LayoutDashboard,
      },
      {
        name: 'Manage Users',
        href: '/dashboard/admin/users',
        icon: Users,
      },
      {
        name: 'Trainer Applications',
        href: '/dashboard/admin/trainer-applications',
        icon: ClipboardList,
      },
      {
        name: 'Manage Trainers',
        href: '/dashboard/admin/trainers',
        icon: UserCog,
      },
      {
        name: 'Manage Classes',
        href: '/dashboard/admin/classes',
        icon: CheckSquare,
      },
      {
        name: 'Add Forum Post',
        href: '/dashboard/admin/forum/add-post',
        icon: FilePlus,
      },
      {
        name: 'Forum Posts',
        href: '/dashboard/admin/forum-posts',
        icon: MessageSquare,
      },
      {
        name: 'Transactions',
        href: '/dashboard/admin/transactions',
        icon: CreditCard,
      },
    ];
  } else if (baseRole === 'trainer') {
    return [
      {
        name: 'Overview',
        href: '/dashboard/trainer',
        icon: LayoutDashboard,
      },
      {
        name: 'Add Class',
        href: '/dashboard/trainer/add-class',
        icon: CirclePlus,
      },
      {
        name: 'My Classes',
        href: '/dashboard/trainer/classes',
        icon: CalendarCheck,
      },
      {
        name: 'Add Forum Post',
        href: '/dashboard/trainer/add-forum-post',
        icon: FilePlus2,
      },
      {
        name: 'My Posts',
        href: '/dashboard/trainer/posts',
        icon: MessageSquare,
      },
    ];
  } else {
    // Default user
    return [
      { name: 'Overview', href: '/dashboard/user', icon: LayoutDashboard },
      {
        name: 'Booked Classes',
        href: '/dashboard/user/booked',
        icon: CalendarCheck,
      },
      { name: 'Favorites', href: '/dashboard/user/favorites', icon: Heart },
      {
        name: 'Apply as Trainer',
        href: '/dashboard/user/apply',
        icon: GraduationCap,
      },
    ];
  }
};

const SidBarDashBoard = ({ user, isMobileOpen, setIsMobileOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const navLinks = getNavLinks(user?.role);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          CustomToast(
            'success',
            'Signed out',
            'You have been signed out successfully.',
          );
          router.push('/login');
          router.refresh();
        },
      },
    });
  };

  const SidebarContent = (
    <div className="flex flex-col h-full bg-[#15803D] text-[#FFFFFF] overflow-hidden shadow-2xl">
      {/* Top Section */}
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/fitNovax.png" width={200} height={60} alt="fitNovaX Logo" className="w-auto h-12 md:h-14 object-contain drop-shadow-md group-hover:drop-shadow-xl group-hover:scale-[1.02] transition-all duration-300" priority unoptimized />
          <span className="font-bold text-xl tracking-tight text-white">
            Fit<span className="text-[#C6F4D6]">Nova</span>
          </span>
        </Link>
        {/* Mobile Close Button */}
        <button
          className="lg:hidden p-2 text-[#C6F4D6] hover:bg-[#16A34A] rounded-xl transition-colors"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* User Profile Card */}
      <div className="px-6 mb-8 mt-2">
        <div className="bg-[#FFFFFF] rounded-3xl p-4 flex items-center gap-4 border border-[#E2E8F0] shadow-sm">
          <Image
            width={500}
            height={500}
            unoptimized
            src={user?.image || 'https://i.pravatar.cc/150?img=68'}
            alt={user?.name || 'User Avatar'}
            className="w-12 h-12 rounded-full border-2 border-[#22C55E] object-cover shrink-0"
            onError={e => {
              e.target.onerror = null;
              e.target.src = 'https://i.pravatar.cc/150?img=68';
            }}
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-[#1E293B] font-bold text-base truncate">
              {user?.name || 'Fitness Enthusiast'}
            </span>
            <span className="text-xs font-bold text-[#15803D] bg-[#C6F4D6] px-2.5 py-0.5 rounded-full w-fit mt-1.5 uppercase tracking-widest">
              {user?.role || 'User'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navLinks.map(link => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen?.(false)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-semibold ${
                isActive
                  ? 'bg-[#8FE3B0] text-[#15803D] shadow-md scale-[1.02]'
                  : 'text-white/80 hover:bg-[#16A34A] hover:text-white hover:scale-[1.02]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm tracking-wide">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 mt-auto">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center cursor-pointer justify-center gap-3 px-4 py-4 border border-white/20 rounded-2xl text-white font-bold hover:bg-[#FFFFFF] hover:text-[#15803D] transition-all duration-300 shadow-sm group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="tracking-wide">Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-50 w-[280px]">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden shadow-2xl"
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidBarDashBoard;
