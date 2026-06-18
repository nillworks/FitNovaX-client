'use client';

import React, { useState, useRef } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  X,
  UploadCloud,
  Check,
  Users,
  Activity,
  MessageSquare,
  Award,
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { imageUpload } from '@/lib/imageUpload';
import { authClient, signOut } from '@/lib/auth-client';
import CustomToast from '@/Shared/CustomToast';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const router = useRouter();

  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const FromData = Object.fromEntries(formData.entries());
    const {
      fullName,
      email,
      password: formPassword,
      confirmPassword,
      role,
    } = FromData;

    const newErrors = {};
    const profileImage = formData.get('profileImage');
    if (!profileImage || profileImage.size === 0) {
      newErrors.profileImage = 'Please upload a profile image';
    }
    if (!fullName || String(fullName).trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (
      !email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(String(email))
    ) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!hasMinLength || !hasUpperCase || !hasLowerCase) {
      newErrors.password = 'Password does not meet all requirements';
    }
    if (formPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const image = await imageUpload(profileImage);
      const registerData = {
        ...FromData,
        image: image?.url || '',
      };

      // Email Password Register
      const { data, error } = await authClient.signUp.email({
        name: registerData?.fullName, // required
        email: registerData?.email, // required
        password: registerData?.password, // required
        image: registerData?.image,
        // callbackURL: '/',
      });

      // Simulate registration complete
      setIsLoading(false);

      if (data) {
        signOut();
        CustomToast('success', 'Success', 'Account created successfully');
        e.target.reset();
        setPassword('');
        setPreviewUrl(null);
        setRole('user');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        router.push('/login');
      }

      if (error) {
        CustomToast('error', 'Registration Failed', error.message);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setIsLoading(false);

      setErrors({ profileImage: 'Image upload failed. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center pt-28 pb-12 lg:px-8">
      <div className="container mx-auto flex justify-center">
        <div className="w-full xl:w-11/12 2xl:w-10/12 flex flex-col lg:flex-row bg-[#FFFFFF] rounded-3xl overflow-hidden shadow-2xl border border-[#E2E8F0] min-h-[800px]">
          {/* Left Side: Brand Experience */}
          <div className="lg:w-1/2 bg-[#0F172A] relative flex flex-col p-10 lg:p-16 justify-between overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute -top-[10%] -left-[20%] w-[80%] h-[80%] rounded-full bg-[#22C55E] blur-[120px]"></div>
              <div className="absolute bottom-[0%] right-[0%] w-[60%] h-[60%] rounded-full bg-[#16A34A] blur-[100px]"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-[#FFFFFF] tracking-tight leading-tight mb-4">
                Start your journey. <br />
                <span className="text-[#22C55E]">Transform your life.</span>
              </h1>
              <p className="text-[#8FE3B0] text-lg leading-relaxed max-w-md">
                Create an account today and unlock a world of professional
                fitness tracking, training, and community.
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
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop"
                  alt="Fitness Community"
                  className="w-full h-[280px] object-cover"
                />
              </div>
            </motion.div>

            {/* Platform Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            >
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-sm">
                <div className="bg-[#22C55E]/20 p-2 rounded-lg text-[#22C55E]">
                  <Users size={20} />
                </div>
                <span className="text-[#C6F4D6] font-medium text-sm">
                  Join Thousands of Enthusiasts
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-sm">
                <div className="bg-[#22C55E]/20 p-2 rounded-lg text-[#22C55E]">
                  <Award size={20} />
                </div>
                <span className="text-[#C6F4D6] font-medium text-sm">
                  Learn From Expert Trainers
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-sm">
                <div className="bg-[#22C55E]/20 p-2 rounded-lg text-[#22C55E]">
                  <Activity size={20} />
                </div>
                <span className="text-[#C6F4D6] font-medium text-sm">
                  Track Your Progress Daily
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-sm">
                <div className="bg-[#22C55E]/20 p-2 rounded-lg text-[#22C55E]">
                  <MessageSquare size={20} />
                </div>
                <span className="text-[#C6F4D6] font-medium text-sm">
                  Join Community Discussions
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Registration Card */}
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-[#FFFFFF]">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-10/12 mx-auto"
            >
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1E293B] tracking-tight mb-3">
                  Create Account
                </h2>
                <p className="text-[#64748B] text-base leading-relaxed">
                  Sign up today to access your ultimate fitness dashboard.
                </p>
              </div>

              <form onSubmit={handleRegister} className="flex flex-col gap-5">
                {/* Profile Image Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#1E293B] font-semibold text-sm ml-1">
                    Profile Image
                  </label>
                  <div className="relative w-full">
                    <input
                      ref={fileInputRef}
                      id="profileImageInput"
                      type="file"
                      name="profileImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {!previewUrl ? (
                      <label
                        htmlFor="profileImageInput"
                        className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${errors.profileImage ? 'border-red-500 bg-red-50' : 'border-[#E2E8F0] hover:border-[#8FE3B0] bg-[#F8FAFC] hover:bg-[#C6F4D6]/20'} rounded-2xl cursor-pointer transition-colors group`}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-8 h-8 mb-2 text-[#64748B] group-hover:text-[#22C55E] transition-colors" />
                          <p className="text-sm text-[#64748B]">
                            <span className="font-semibold text-[#1E293B]">
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                        </div>
                      </label>
                    ) : (
                      <div className="relative w-full h-32 rounded-2xl border border-[#E2E8F0] overflow-hidden group bg-[#FFFFFF] flex items-center justify-center shadow-sm p-2">
                        <img
                          src={previewUrl}
                          alt="Profile Preview"
                          className="h-full w-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full transform hover:scale-110 transition-all shadow-lg cursor-pointer"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.profileImage && (
                    <span className="text-red-500 text-sm font-medium ml-1">
                      {errors.profileImage}
                    </span>
                  )}
                </div>

                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#1E293B] font-semibold text-sm ml-1">
                    Full Name
                  </label>
                  <div
                    className={`relative flex items-center border ${errors.fullName ? 'border-red-500' : 'border-[#E2E8F0] focus-within:border-[#22C55E] hover:border-[#8FE3B0]'} bg-[#FFFFFF] h-14 rounded-2xl transition-all duration-200 overflow-hidden shadow-sm`}
                  >
                    <div className="pl-4 flex items-center justify-center text-[#64748B]">
                      <User size={20} />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      className="w-full h-full bg-transparent outline-none px-3 text-[#1E293B] placeholder-[#94A3B8] text-base"
                      required
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-red-500 text-sm font-medium ml-1">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email Input */}
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

                {/* Password Input */}
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
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full h-full bg-transparent outline-none px-3 text-[#1E293B] placeholder-[#94A3B8] text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="pr-4 flex items-center justify-center cursor-pointer text-[#64748B] hover:text-[#1E293B] focus:outline-none transition-colors"
                    >
                      {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-sm font-medium ml-1">
                      {errors.password}
                    </span>
                  )}

                  {/* Password Requirements UI */}
                  <div className="mt-1 flex  gap-2 ml-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${hasMinLength ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`}
                      >
                        {hasMinLength && (
                          <Check size={10} className="text-white" />
                        )}
                      </div>
                      <span
                        className={`text-xs ${hasMinLength ? 'text-[#1E293B] font-semibold' : 'text-[#64748B]'}`}
                      >
                        Minimum 6 Characters
                      </span>
                    </div>
                    <div className="flex items-center flex-wrap sm:flex-row gap-4">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${hasUpperCase ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`}
                      >
                        {hasUpperCase && (
                          <Check size={10} className="text-white" />
                        )}
                      </div>
                      <span
                        className={`text-xs ${hasUpperCase ? 'text-[#1E293B] font-semibold' : 'text-[#64748B]'}`}
                      >
                        One Uppercase Letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${hasLowerCase ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`}
                      >
                        {hasLowerCase && (
                          <Check size={10} className="text-white" />
                        )}
                      </div>
                      <span
                        className={`text-xs ${hasLowerCase ? 'text-[#1E293B] font-semibold' : 'text-[#64748B]'}`}
                      >
                        One Lowercase Letter
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-[#1E293B] font-semibold text-sm ml-1">
                    Confirm Password
                  </label>
                  <div
                    className={`relative flex items-center border ${errors.confirmPassword ? 'border-red-500' : 'border-[#E2E8F0] focus-within:border-[#22C55E] hover:border-[#8FE3B0]'} bg-[#FFFFFF] h-14 rounded-2xl transition-all duration-200 overflow-hidden shadow-sm`}
                  >
                    <div className="pl-4 flex items-center justify-center text-[#64748B]">
                      <Lock size={20} />
                    </div>
                    <input
                      type={isConfirmVisible ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="w-full h-full bg-transparent outline-none px-3 text-[#1E293B] placeholder-[#94A3B8] text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmVisibility}
                      className="pr-4 flex items-center justify-center cursor-pointer text-[#64748B] hover:text-[#1E293B] focus:outline-none transition-colors"
                    >
                      {isConfirmVisible ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm font-medium ml-1">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Role Selection */}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-[#1E293B] font-semibold text-sm ml-1">
                    I am registering as a
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`relative flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${role === 'user' ? 'border-[#22C55E] bg-[#C6F4D6]/20 shadow-md' : 'border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#8FE3B0]'}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={role === 'user'}
                        onChange={() => setRole('user')}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-1">
                        <Users
                          size={24}
                          className={
                            role === 'user'
                              ? 'text-[#16A34A]'
                              : 'text-[#64748B]'
                          }
                        />
                        <span
                          className={`font-bold ${role === 'user' ? 'text-[#15803D]' : 'text-[#64748B]'}`}
                        >
                          Member
                        </span>
                      </div>
                    </label>

                    <label
                      className={`relative flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${role === 'trainer' ? 'border-[#22C55E] bg-[#C6F4D6]/20 shadow-md' : 'border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#8FE3B0]'}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="trainer"
                        checked={role === 'trainer'}
                        onChange={() => setRole('trainer')}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-1">
                        <Award
                          size={24}
                          className={
                            role === 'trainer'
                              ? 'text-[#16A34A]'
                              : 'text-[#64748B]'
                          }
                        />
                        <span
                          className={`font-bold ${role === 'trainer' ? 'text-[#15803D]' : 'text-[#64748B]'}`}
                        >
                          Trainer
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={
                    isLoading || !hasMinLength || !hasUpperCase || !hasLowerCase
                  }
                  className="w-full bg-[#22C55E] cursor-pointer hover:bg-[#16A34A] text-[#FFFFFF] h-14 rounded-2xl font-bold text-lg shadow-md hover:shadow-lg transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Create Account'
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

              <p className="text-center text-[#64748B] mt-8 font-medium text-lg">
                Already have an account?{' '}
                <NextLink
                  href="/login"
                  className="text-[#16A34A] font-bold hover:text-[#15803D] transition-colors"
                >
                  Sign In
                </NextLink>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
