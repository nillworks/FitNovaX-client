"use client";
import React, { useState } from 'react';
import { imageUpload } from '../../../../lib/imageUpload';

const TrainerForm = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
      // Upload NID
      const nidFile = formData.get('nid');
      let nidUrl = '';
      if (nidFile && nidFile.size > 0) {
        const uploadResult = await imageUpload(nidFile);
        nidUrl = uploadResult?.display_url || uploadResult?.url || '';
      }
      
      const finalData = {
        ...data,
        nidUrl
      };
      
      // Remove raw file object
      delete finalData.nid;
      
      // Pass data to parent
      if (onSubmit) {
        await onSubmit(finalData);
      }
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // You could show an error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 w-full">
      
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <label htmlFor="fullName" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
            Full Name
          </label>
          <input 
            required 
            type="text" 
            id="fullName" 
            name="fullName" 
            className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all placeholder:text-[#64748B]/60" 
            placeholder="e.g. John Doe" 
          />
        </div>
        
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <label htmlFor="age" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
            Age
          </label>
          <input 
            required 
            type="number" 
            min="18" 
            id="age" 
            name="age" 
            className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all placeholder:text-[#64748B]/60" 
            placeholder="e.g. 28" 
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <label htmlFor="education" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
            Highest Education
          </label>
          <input 
            required 
            type="text" 
            id="education" 
            name="education" 
            className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all placeholder:text-[#64748B]/60" 
            placeholder="e.g. BSc in Sports Science" 
          />
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-1/2">
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
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
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
            <option value="CrossFit">CrossFit</option>
            <option value="Nutritionist">Nutritionist</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <label htmlFor="availableTime" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
            Available Time
          </label>
          <input 
            required 
            type="text" 
            id="availableTime" 
            name="availableTime" 
            className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all placeholder:text-[#64748B]/60" 
            placeholder="e.g. Morning, Weekends" 
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <label htmlFor="resumeLink" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
            Resume Link
          </label>
          <input 
            required 
            type="url" 
            id="resumeLink" 
            name="resumeLink" 
            className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all placeholder:text-[#64748B]/60" 
            placeholder="https://drive.google.com/..." 
          />
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <label htmlFor="certificateLink" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
            Certificate Link
          </label>
          <input 
            type="url" 
            id="certificateLink" 
            name="certificateLink" 
            className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all placeholder:text-[#64748B]/60" 
            placeholder="https://drive.google.com/..." 
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="linkedin" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
          LinkedIn Profile Link
        </label>
        <input 
          type="url" 
          id="linkedin" 
          name="linkedin" 
          className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all placeholder:text-[#64748B]/60" 
          placeholder="https://linkedin.com/in/username" 
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="nid" className="text-sm font-bold text-[#64748B] uppercase tracking-wider">
          Upload NID (Image)
        </label>
        <input 
          required 
          type="file" 
          id="nid" 
          name="nid"
          accept="image/*"
          className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-[#1E293B] focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#DCFCE7] file:text-[#16A34A] hover:file:bg-[#BBF7D0] cursor-pointer" 
        />
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
          disabled={isSubmitting}
          className={`w-full ${isSubmitting ? 'bg-[#86EFAC] cursor-not-allowed' : 'bg-[#22C55E] hover:bg-[#16A34A] cursor-pointer shadow-[0_4px_14px_0_rgb(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgb(22,163,74,0.23)]'} text-[#FFFFFF] font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex justify-center items-center gap-2`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </button>
      </div>

    </form>
  );
};

export default TrainerForm;
