"use client";
import React from 'react';

const TrainerForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 w-full">
      
      <div className="flex flex-col gap-2">
        <label htmlFor="experience" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
          Years of Experience
        </label>
        <input 
          required 
          type="number" 
          min="0" 
          id="experience" 
          name="experience" 
          className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all placeholder:text-[#64748B]/60" 
          placeholder="e.g. 3" 
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="specialty" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
          Specialty
        </label>
        <select 
          required 
          id="specialty" 
          name="specialty" 
          className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all cursor-pointer"
        >
          <option value="Yoga">Yoga</option>
          <option value="Cardio">Cardio</option>
          <option value="HIIT">HIIT</option>
          <option value="Strength Training">Strength Training</option>
          <option value="Pilates">Pilates</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="bio" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
          Bio / Description
        </label>
        <textarea 
          required 
          id="bio" 
          name="bio" 
          rows="4" 
          className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all resize-none placeholder:text-[#64748B]/60" 
          placeholder="Tell us about your training background, certifications, and what you'd like to teach..."
        ></textarea>
      </div>

      <div className="pt-2">
        <button 
          type="submit" 
          className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-[#FFFFFF] font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-[0_4px_14px_0_rgb(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgb(22,163,74,0.23)] cursor-pointer"
        >
          Submit Application
        </button>
      </div>

    </form>
  );
};

export default TrainerForm;
