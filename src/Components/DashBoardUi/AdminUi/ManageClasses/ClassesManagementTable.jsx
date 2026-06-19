"use client";
import React from 'react';
import { Search, CheckCircle, XCircle, Trash2, Clock, BarChart3, Presentation } from 'lucide-react';

const ClassesManagementTable = ({ classesData }) => {

  // Empty State UI
  if (!classesData || classesData.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="bg-[#F8FAFC] p-6 rounded-full mb-6 border border-[#E2E8F0] relative">
          <div className="absolute inset-0 bg-[#C6F4D6] rounded-full blur-xl opacity-30"></div>
          <Presentation size={48} className="text-[#64748B] relative z-10" />
        </div>
        <h3 className="text-2xl font-black text-[#1E293B] mb-3">No Classes Submitted Yet</h3>
        <p className="text-[#64748B] max-w-md font-medium leading-relaxed">
          There are currently no trainer-submitted classes available for review. New class submissions will appear here for moderation.
        </p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]';
      case 'Advanced': return 'bg-[#FEF2F2] text-[#B91C1C] border-[#FEE2E2]';
      case 'Expert': return 'bg-[#FFFBEB] text-[#D97706] border-[#FEF3C7]';
      default: return 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden flex flex-col">
      <div className="p-5 border-b border-[#E2E8F0] bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-[#1E293B] font-bold text-lg flex items-center gap-2">
          Class Roster
          <span className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            {classesData.length} Items
          </span>
        </h3>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-[#94A3B8]" />
          </div>
          <input 
            type="text" 
            placeholder="Search classes..." 
            className="w-full pl-9 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:bg-white transition-all text-[#1E293B] placeholder-[#94A3B8]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Class Info</th>
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Trainer</th>
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Details</th>
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Status</th>
              <th className="px-5 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] bg-white">
            {classesData.map((cls) => (
              <tr key={cls.id} className="hover:bg-[#F8FAFC]/50 transition-colors group">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <img src={cls.thumbnail} alt={cls.title} className="w-16 h-12 rounded-lg object-cover shadow-sm border border-[#E2E8F0]" />
                    <div>
                      <p className="text-[#1E293B] font-bold text-sm leading-tight mb-1">{cls.title}</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-[#16A34A] bg-[#C6F4D6]/50 px-2 py-0.5 rounded-md">{cls.category}</span>
                        <span className="text-[#64748B]">{cls.submittedDate}</span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={cls.trainerImage} alt={cls.trainerName} className="w-8 h-8 rounded-full object-cover border border-[#E2E8F0]" />
                    <span className="text-[#1E293B] text-sm font-semibold">{cls.trainerName}</span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <Clock size={12} className="text-[#64748B]" />
                      <span className="font-semibold text-[#1E293B]">{cls.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <BarChart3 size={12} className="text-[#64748B]" />
                      <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor(cls.difficulty)}`}>
                        {cls.difficulty}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  {cls.status === 'Pending' ? (
                    <div className="inline-flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1.5 bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7] text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse"></span>
                        Pending
                      </span>
                      <span className="text-[10px] font-semibold text-[#94A3B8] ml-1">Review Required</span>
                    </div>
                  ) : (
                    <div className="inline-flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                        <CheckCircle size={12} />
                        Approved
                      </span>
                      <span className="text-[10px] font-semibold text-[#64748B] ml-1">Verified</span>
                    </div>
                  )}
                </td>

                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {cls.status === 'Pending' && (
                      <>
                        <button className="p-2 rounded-xl text-[#16A34A] bg-[#F0FDF4] border border-[#DCFCE7] hover:bg-[#DCFCE7] hover:text-[#15803D] transition-colors shadow-sm cursor-pointer" title="Approve">
                          <CheckCircle size={16} />
                        </button>
                        <button className="p-2 rounded-xl text-[#EF4444] bg-[#FEF2F2] border border-[#FECACA] hover:bg-[#FEE2E2] hover:text-[#DC2626] transition-colors shadow-sm cursor-pointer" title="Reject">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    <div className="w-px h-6 bg-[#E2E8F0] mx-1"></div>
                    <button className="p-2 rounded-xl text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-white hover:text-[#EF4444] hover:border-[#FECACA] transition-colors shadow-sm cursor-pointer" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassesManagementTable;
