'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Dumbbell, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ActiveLink from './ActiveLink';
import ProfileDropDown from './ProfileDropDown';
import MobileMenu from './MobileMenu';
import { signOut, useSession } from '@/lib/auth-client';
import CustomToast from './CustomToast';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data } = useSession();
  const user = data?.user;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Classes', href: '/classes' },
    { name: 'Community Forum', href: '/forum' },
  ];

  if (user) {
    navLinks.push({ name: 'Dashboard', href: '/dashboard' });
  }

  const handleSignOut = () => {
    signOut();
    CustomToast(
      'success',
      'Signed out',
      'You have been signed out successfully.',
    );
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm dark:bg-[#0F172A]/80 dark:border-gray-800'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo & Brand Name */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-[#C6F4D6] rounded-xl group-hover:bg-[#8FE3B0] transition-colors duration-300">
                <Dumbbell className="w-6 h-6 text-[#15803D]" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#1E293B] dark:text-white">
                Fit<span className="text-[#22C55E]">Core</span>
              </span>
            </Link>

            {/* Center: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
              {navLinks.map(link => (
                <ActiveLink key={link.href} href={link.href}>
                  {link.name}
                </ActiveLink>
              ))}
            </nav>

            {/* Right: User Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              {user ? (
                <div className="flex items-center gap-3 xl:gap-4">
                  {/* Notification Button */}
                  <button
                    aria-label="Notifications"
                    className="relative p-2 text-[#64748B] hover:text-[#22C55E] hover:bg-[#F8FAFC] rounded-full transition-colors dark:hover:bg-gray-800"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#22C55E] rounded-full border border-white dark:border-[#0F172A]"></span>
                  </button>

                  {/* Avatar & Profile Dropdown */}
                  <ProfileDropDown user={user} handleSignOut={handleSignOut} />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="px-4 xl:px-5 py-2.5 text-sm font-semibold text-[#1E293B] hover:text-[#22C55E] transition-colors dark:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 xl:px-5 py-2.5 text-sm font-semibold bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-full shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Mobile Menu"
                className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] rounded-full transition-colors dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            handleSignOut={handleSignOut}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            navLinks={navLinks}
            user={user}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
