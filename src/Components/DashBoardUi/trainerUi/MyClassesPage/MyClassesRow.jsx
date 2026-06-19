"use client";
import React, { useState } from 'react';

const MyClassesRow = ({ data }) => {
  const { name, date, time, students, maxStudents, status } = data;
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isStatusActive = status?.toLowerCase() === 'active';

  return (
    <div className="group bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-visible flex flex-col h-full">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#22C55E] to-[#8FE3B0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"></div>

      <div className="flex justify-between items-start mb-6 relative">
        <div>
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-tight uppercase ${isStatusActive ? 'bg-[#C6F4D6] text-[#15803D]' : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]'}`}>
            {status}
          </span>
        </div>
        
        {/* Dropdown Menu */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="text-[#64748B] hover:text-[#16A34A] transition-colors p-2 rounded-full hover:bg-[#F8FAFC] cursor-pointer"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
             </svg>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E2E8F0] z-20 overflow-hidden py-2">
              <button 
                onClick={() => setIsDropdownOpen(false)}
                className="w-full text-left px-5 py-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer font-medium"
              >
                Update
              </button>
              <button 
                onClick={() => setIsDropdownOpen(false)}
                className="w-full text-left px-5 py-2 text-sm text-[#DC2626] hover:bg-red-50 transition-colors cursor-pointer font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#16A34A] tracking-tight mb-2 transition-colors">{name}</h3>
      
      <div className="space-y-4 mt-6 flex-grow">
        <div className="flex items-center text-[#64748B]">
          <div className="bg-[#C6F4D6] p-2 rounded-full mr-4 text-[#22C55E]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <span className="text-base font-medium text-[#64748B]">{date}</span>
        </div>
        <div className="flex items-center text-[#64748B]">
          <div className="bg-[#C6F4D6] p-2 rounded-full mr-4 text-[#22C55E]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span className="text-base font-medium text-[#64748B]">{time}</span>
        </div>
        <div className="flex items-center text-[#64748B]">
          <div className="bg-[#C6F4D6] p-2 rounded-full mr-4 text-[#22C55E]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <span className="text-base font-medium text-[#64748B]">{students} / {maxStudents} Students</span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex gap-4">
         <button className="flex-1 bg-transparent border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] py-3 rounded-full font-bold transition-all duration-300 text-sm cursor-pointer">
            View Students
         </button>
      </div>
    </div>
  );
};

export default MyClassesRow;
