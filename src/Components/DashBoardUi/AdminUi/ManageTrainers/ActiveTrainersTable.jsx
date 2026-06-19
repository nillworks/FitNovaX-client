"use client";
import React, { useState } from 'react';
import { ShieldMinus, Users, Search, AlertTriangle, X } from 'lucide-react';

const ActiveTrainersTable = ({ trainers }) => {
  const [demoteModalOpen, setDemoteModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleDemoteClick = (trainer) => {
    setSelectedTrainer(trainer);
    setDemoteModalOpen(true);
  };

  const closeDemoteModal = () => {
    setDemoteModalOpen(false);
    setSelectedTrainer(null);
  };

  // Empty State UI
  if (!trainers || trainers.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="bg-[#F0FDF4] p-6 rounded-full mb-6 ring-8 ring-[#F0FDF4]/50">
          <Users size={48} className="text-[#22C55E]" />
        </div>
        <h3 className="text-2xl font-black text-[#1E293B] mb-3">No Active Trainers Found</h3>
        <p className="text-[#64748B] max-w-md font-medium leading-relaxed">
          There are currently no approved trainers on the platform. Once users are promoted to trainers, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden flex flex-col">
        <div className="p-5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-[#1E293B] font-bold text-lg">Active Roster</h3>
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-[#64748B]" />
            </div>
            <input 
              type="text" 
              placeholder="Search trainers..." 
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] transition-all text-[#1E293B] placeholder-[#94A3B8]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white border-b border-[#E2E8F0]">
                <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Trainer Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Specialty & Exp</th>
                <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider text-center">Classes</th>
                <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider text-center">Bookings</th>
                <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider text-right">Role Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] bg-[#F8FAFC]/30">
              {trainers.map((trainer) => (
                <tr key={trainer.id} className="hover:bg-white transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={trainer.profileImage} alt={trainer.name} className="w-12 h-12 rounded-2xl object-cover shadow-sm group-hover:shadow transition-shadow border border-[#E2E8F0]" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-white"></div>
                      </div>
                      <div>
                        <p className="text-[#1E293B] font-bold text-sm leading-tight">{trainer.name}</p>
                        <p className="text-[#64748B] text-xs mt-0.5 font-medium">{trainer.email}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-start gap-1.5">
                      <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] border border-[#8FE3B0]/30 text-[#15803D] text-xs px-2.5 py-1 rounded-lg font-bold">
                        {trainer.specialty}
                      </span>
                      <span className="text-xs font-semibold text-[#64748B] bg-white border border-[#E2E8F0] px-2 py-0.5 rounded-md">
                        {trainer.experience} Exp.
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className="text-[#1E293B] font-black text-lg">{trainer.totalClasses}</span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className="text-[#16A34A] font-black text-lg bg-[#C6F4D6]/50 px-3 py-1 rounded-xl">{trainer.totalBookings.toLocaleString()}</span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => handleDemoteClick(trainer)}
                      className="inline-flex items-center gap-2 bg-white border border-[#FECACA] hover:bg-[#FEF2F2] text-[#EF4444] text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
                    >
                      <ShieldMinus size={14} />
                      Demote To User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demotion Confirmation Modal UI */}
      {demoteModalOpen && selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.15)] w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#E2E8F0]/50">
            <div className="relative p-6 sm:p-8 bg-gradient-to-b from-[#FEF2F2] to-white border-b border-[#E2E8F0] flex flex-col items-center text-center">
              <button 
                onClick={closeDemoteModal}
                className="absolute top-4 right-4 p-2 bg-white rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] transition-colors shadow-sm cursor-pointer"
              >
                <X size={16} />
              </button>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#FECACA] text-[#EF4444] mb-4">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-black text-[#1E293B]">Remove Trainer Role?</h2>
              <p className="text-sm font-medium text-[#64748B] mt-2">
                Are you sure you want to remove trainer privileges from <strong className="text-[#1E293B]">{selectedTrainer.name}</strong>?
              </p>
            </div>
            <div className="p-5 bg-[#F8FAFC] flex flex-col sm:flex-row gap-3">
              <button 
                onClick={closeDemoteModal}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-[#1E293B] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors shadow-sm cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={closeDemoteModal}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-colors shadow-sm cursor-pointer"
              >
                Confirm Demotion
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveTrainersTable;
