"use client";
import React, { useState } from 'react';
import { CalendarDays, Clock, Users, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';

const MyClassesRow = ({ data }) => {
  const { name, date, time, students, maxStudents, status } = data;
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isStatusActive = status?.toLowerCase() === 'active';
  const progressPercentage = (students / maxStudents) * 100;

  return (
    <div className="group bg-[#FFFFFF] border border-[#E2E8F0] rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative flex flex-col h-full overflow-hidden">
      
      {/* Decorative Gradient Background on top half */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#C6F4D6]/40 to-transparent pointer-events-none"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold tracking-tight uppercase shadow-sm border ${isStatusActive ? 'bg-[#22C55E] text-white border-[#16A34A]' : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'}`}>
          {isStatusActive && <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 animate-pulse"></span>}
          {status}
        </span>
        
        {/* Dropdown Menu */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="text-[#64748B] hover:text-[#1E293B] bg-white border border-[#E2E8F0] hover:border-[#8FE3B0] transition-colors p-1.5 rounded-full shadow-sm cursor-pointer"
          >
             <MoreVertical className="w-5 h-5" />
          </button>
          
          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-[#E2E8F0] z-20 overflow-hidden py-1.5">
                <button 
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer font-bold flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4 text-[#22C55E]" /> Update
                </button>
                <div className="w-full h-px bg-[#E2E8F0] my-1"></div>
                <button 
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#DC2626] hover:bg-red-50 transition-colors cursor-pointer font-bold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="relative z-10 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-[#1E293B] tracking-tight mb-5 line-clamp-2 leading-tight group-hover:text-[#16A34A] transition-colors">{name}</h3>
        
        <div className="space-y-3.5 mb-6">
          <div className="flex items-center text-[#64748B] text-sm font-medium">
            <CalendarDays className="w-4 h-4 text-[#4AD27A] mr-3" />
            {date}
          </div>
          <div className="flex items-center text-[#64748B] text-sm font-medium">
            <Clock className="w-4 h-4 text-[#4AD27A] mr-3" />
            {time}
          </div>
        </div>

        {/* Capacity Progress Bar */}
        <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] mt-auto">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-[#64748B] flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Booked</span>
            <span className="text-[#1E293B]">{students} / <span className="text-[#64748B] font-medium">{maxStudents}</span></span>
          </div>
          <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${progressPercentage >= 100 ? 'bg-red-500' : 'bg-[#22C55E]'}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {progressPercentage >= 100 && (
             <p className="text-[10px] text-red-500 font-bold mt-1.5 uppercase tracking-wide">Class is Full</p>
          )}
        </div>
      </div>

      {/* Footer Button */}
      <div className="mt-5 pt-5 border-t border-[#E2E8F0] relative z-10">
         <button className="w-full flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] hover:border-[#8FE3B0] hover:bg-[#F8FAFC] text-[#1E293B] hover:text-[#15803D] py-3 rounded-full font-bold transition-all duration-300 text-sm cursor-pointer shadow-sm">
            <Eye className="w-4 h-4 text-[#4AD27A]" />
            View Students
         </button>
      </div>
    </div>
  );
};

export default MyClassesRow;
