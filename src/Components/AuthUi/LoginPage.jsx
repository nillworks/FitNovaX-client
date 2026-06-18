'use client';

import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
  Award,
  CalendarCheck,
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    const newErrors = {};
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center pt-28 pb-12 lg:px-8">
      <div className="container mx-auto flex justify-center">
        <div className="w-full xl:w-11/12 2xl:w-10/12 flex flex-col lg:flex-row bg-[#FFFFFF] rounded-3xl overflow-hidden shadow-2xl border border-[#E2E8F0] min-h-[800px]">
          {/* Left Side: Brand Showcase */}
          <div className="lg:w-1/2 bg-[#0F172A] relative flex flex-col p-10 lg:p-16 justify-between overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#22C55E] blur-[120px]"></div>
              <div className="absolute bottom-[0%] right-[0%] w-[50%] h-[50%] rounded-full bg-[#16A34A] blur-[100px]"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-[#FFFFFF] tracking-tight leading-tight mb-4">
                Push your limits. <br />
                <span className="text-[#22C55E]">Achieve greatness.</span>
              </h1>
              <p className="text-[#8FE3B0] text-lg leading-relaxed max-w-md">
                Join the most advanced fitness and gym management platform
                designed to elevate your training experience.
              </p>
            </motion.div>

            {/* Illustration Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 my-10 flex-grow flex items-center justify-center w-full"
            >
              <div className="w-full rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent z-10 opacity-60"></div>
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
                  alt="Fitness Training"
                  className="w-full h-[320px] object-cover"
                />
              </div>
            </motion.div>

            {/* Trust Indicators / Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="flex flex-col gap-2 p-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-3 text-[#22C55E]">
                  <Users size={24} />
                  <span className="font-bold text-[#FFFFFF] text-2xl">
                    15k+
                  </span>
                </div>
                <p className="text-[#C6F4D6] text-sm font-medium">
                  Active Members
                </p>
              </div>
              <div className="flex flex-col gap-2 p-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-3 text-[#22C55E]">
                  <Award size={24} />
                  <span className="font-bold text-[#FFFFFF] text-2xl">
                    250+
                  </span>
                </div>
                <p className="text-[#C6F4D6] text-sm font-medium">
                  Certified Trainers
                </p>
              </div>
              <div className="flex flex-col gap-2 p-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-3 text-[#22C55E]">
                  <CalendarCheck size={24} />
                  <span className="font-bold text-[#FFFFFF] text-2xl">5k+</span>
                </div>
                <p className="text-[#C6F4D6] text-sm font-medium">
                  Completed Sessions
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Authentication Card */}
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-[#FFFFFF]">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-10/12 mx-auto"
            >
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1E293B] tracking-tight mb-4">
                  Welcome Back
                </h2>
                <p className="text-[#64748B] text-lg leading-relaxed">
                  Enter your credentials to access your personal dashboard.
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                {/* Custom Email Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#1E293B] font-semibold text-sm ml-1">
                    Email Address
                  </label>
                  <div
                    className={`relative flex items-center border ${errors.email ? 'border-red-500' : 'border-[#E2E8F0] focus-within:border-[#22C55E] hover:border-[#8FE3B0]'} bg-[#FFFFFF] h-14 rounded-2xl transition-all duration-200 overflow-hidden shadow-sm`}
                  >
                    <div className="pl-4 flex items-center justify-center text-[#64748B]">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full h-full bg-transparent outline-none px-3 text-[#1E293B] placeholder-[#94A3B8] text-base"
                      required
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-sm font-medium ml-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Custom Password Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#1E293B] font-semibold text-sm ml-1">
                    Password
                  </label>
                  <div
                    className={`relative flex items-center border ${errors.password ? 'border-red-500' : 'border-[#E2E8F0] focus-within:border-[#22C55E] hover:border-[#8FE3B0]'} bg-[#FFFFFF] h-14 rounded-2xl transition-all duration-200 overflow-hidden shadow-sm`}
                  >
                    <div className="pl-4 flex items-center justify-center text-[#64748B]">
                      <Lock size={20} />
                    </div>
                    <input
                      type={isVisible ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter your password"
                      className="w-full h-full bg-transparent outline-none px-3 text-[#1E293B] placeholder-[#94A3B8] text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="pr-4 flex items-center justify-center text-[#64748B] hover:text-[#1E293B] focus:outline-none transition-colors"
                    >
                      {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-sm font-medium ml-1">
                      {errors.password}
                    </span>
                  )}

                  <div className="flex justify-end mt-1">
                    <NextLink
                      href="#"
                      className="text-sm font-semibold text-[#16A34A] hover:text-[#15803D] transition-colors"
                    >
                      Forgot Password?
                    </NextLink>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#22C55E] cursor-pointer hover:bg-[#16A34A] text-[#FFFFFF] h-14 rounded-2xl font-bold text-lg shadow-md hover:shadow-lg transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-[1px] bg-[#E2E8F0]" />
                <span className="text-[#64748B] text-sm font-semibold uppercase tracking-wider">
                  or
                </span>
                <div className="flex-1 h-[1px] bg-[#E2E8F0]" />
              </div>

              <button
                type="button"
                className="w-full cursor-pointer border border-[#E2E8F0] bg-white text-[#1E293B] hover:bg-[#F8FAFC] h-14 rounded-2xl font-bold text-base transition-colors flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
              >
                <FcGoogle size={24} />
                Continue with Google
              </button>

              <p className="text-center text-[#64748B] mt-10 font-medium text-lg">
                Dont have an account?{' '}
                <NextLink
                  href="/register"
                  className="text-[#16A34A] font-bold hover:text-[#15803D] transition-colors"
                >
                  Create Account
                </NextLink>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
