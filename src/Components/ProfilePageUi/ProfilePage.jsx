"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useSession, authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { FiEdit3, FiSave, FiX, FiActivity, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { GiBodyHeight, GiWeight } from 'react-icons/gi';

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    height: '',
    weight: '',
    goal: '',
    level: '',
  });

  // Populate form when edit is clicked
  const handleEditClick = () => {
    setFormData({
      name: session?.user?.name || '',
      image: session?.user?.image || '',
      height: session?.user?.height || '',
      weight: session?.user?.weight || '',
      goal: session?.user?.goal || '',
      level: session?.user?.level || '',
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name: formData.name,
        image: formData.image,
        height: formData.height,
        weight: formData.weight,
        goal: formData.goal,
        level: formData.level,
      });

      if (error) {
        toast.error(error.message || 'Failed to update profile');
      } else {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-12 h-12 border-4 border-[#22C55E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <h2 className="text-3xl font-bold text-[#1E293B]">Not Logged In</h2>
        <p className="text-[#64748B] mt-3 text-lg">Please login to view your premium profile.</p>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen pt-30 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1E293B]">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#15803D]">Profile</span>
          </h1>
          <p className="text-[#64748B] mt-3 text-lg font-medium">Manage your personal details and fitness goals</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden relative transition-all duration-300 hover:shadow-emerald-900/10">
          
          {/* Premium Header Banner */}
          <div className="h-48 md:h-56 bg-gradient-to-br from-[#16A34A] via-[#22C55E] to-[#4ADE80] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent mix-blend-overlay"></div>
            
            {/* SVG Curve at the bottom of the banner */}
            <svg className="absolute bottom-0 left-0 w-full text-white" viewBox="0 0 1440 100" fill="currentColor" preserveAspectRatio="none" style={{ height: '40px' }}>
              <path d="M0,50 C320,100 420,0 720,50 C1020,100 1120,0 1440,50 L1440,100 L0,100 Z"></path>
            </svg>
          </div>

          <div className="px-6 md:px-12 pb-12">
            {/* Avatar & Name Section */}
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-24 md:-mt-20 mb-10 gap-6 relative z-10">
              
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-[6px] border-white bg-white overflow-hidden shadow-2xl flex-shrink-0 flex items-center justify-center text-6xl font-bold text-[#94A3B8] ring-4 ring-emerald-50">
                  {user.image ? (
                    <Image src={user.image} alt={user.name} width={160} height={160} unoptimized className="w-full h-full object-cover" />
                  ) : (
                    <span className="bg-gradient-to-br from-gray-100 to-gray-200 w-full h-full flex items-center justify-center text-emerald-600">{user.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                {/* Decorative element */}
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full shadow-md"></div>
              </div>
              
              <div className="flex-grow text-center md:text-left pt-2 md:pt-0">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] tracking-tight">{user.name}</h2>
                <p className="text-[#64748B] font-medium text-lg mt-1">{user.email}</p>
                <div className="inline-flex items-center mt-3 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full uppercase tracking-widest border border-emerald-100 shadow-sm">
                  {user.role || 'Member'}
                </div>
              </div>

              {!isEditing && (
                <div className="mt-6 md:mt-0 flex-shrink-0">
                  <button
                    onClick={handleEditClick}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#1E293B] hover:bg-[#0F172A] text-white font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 cursor-pointer"
                  >
                    <FiEdit3 className="w-5 h-5" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="relative">
              {!isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 mt-4">
                  {/* Stat Card 1 */}
                  <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-100 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                        <GiBodyHeight className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Height</p>
                        <p className="text-slate-800 text-2xl font-black">{user.height || '--'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-100 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                        <GiWeight className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Weight</p>
                        <p className="text-slate-800 text-2xl font-black">{user.weight || '--'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-100 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                        <FiTarget className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Primary Goal</p>
                        <p className="text-slate-800 text-2xl font-black">{user.goal || '--'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stat Card 4 */}
                  <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-100 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                        <FiTrendingUp className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Fitness Level</p>
                        <p className="text-slate-800 text-2xl font-black">{user.level || '--'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-2">
                  <form onSubmit={handleSave} className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                    {/* Decorative form background */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-green-600"></div>
                    
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <FiEdit3 className="text-emerald-500" /> Update Information
                      </h3>
                      <button type="button" onClick={handleCancel} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                        <FiX className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address <span className="text-slate-400 font-normal text-xs ml-2">(Locked)</span></label>
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-100 text-slate-500 cursor-not-allowed font-medium"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Profile Image URL</label>
                        <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Height (e.g., 180 cm)</label>
                        <input
                          type="text"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          placeholder="180 cm"
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Weight (e.g., 75 kg)</label>
                        <input
                          type="text"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          placeholder="75 kg"
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Primary Goal</label>
                        <select
                          name="goal"
                          value={formData.goal}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800 appearance-none"
                        >
                          <option value="">Select your goal</option>
                          <option value="Weight Loss">Weight Loss</option>
                          <option value="Muscle Gain">Muscle Gain</option>
                          <option value="Endurance">Endurance</option>
                          <option value="Flexibility">Flexibility</option>
                          <option value="General Health">General Health</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Fitness Level</label>
                        <select
                          name="level"
                          value={formData.level}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800 appearance-none"
                        >
                          <option value="">Select your level</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Pro">Pro</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-10 pt-6 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="w-full sm:w-auto px-8 py-3.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-bold rounded-full transition-all disabled:opacity-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-full transition-all shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSaving ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FiSave className="w-5 h-5" /> Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
