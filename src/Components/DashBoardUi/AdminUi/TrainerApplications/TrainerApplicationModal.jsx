"use client";
import React, { useEffect } from 'react';
import { X, CheckCircle, XCircle, Award, Clock, Calendar, FileText, Briefcase } from 'lucide-react';

const TrainerApplicationModal = ({ application, onClose }) => {

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const getStatusColor = (status) => {
    if (status === 'Pending') return 'bg-[#FFFBEB] text-[#D97706] border-[#FEF3C7]';
    if (status === 'Approved') return 'bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]';
    if (status === 'Rejected') return 'bg-[#FEF2F2] text-[#B91C1C] border-[#FEE2E2]';
    return 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-sm">
      {/* Modal Container */}
      <div 
        className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.15)] w-full max-w-xl max-h-[75vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#E2E8F0]/50"
      >
        {/* Modal Header */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-b from-[#F8FAFC] to-white border-b border-[#E2E8F0]">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-white rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEF2F2] hover:border-[#FECACA] transition-colors shadow-sm cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative mt-2 sm:mt-0">
              <img src={application.profileImage} alt={application.applicantName} className="w-24 h-24 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md border-4 border-white" />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-2 sm:-right-2 bg-white p-1 rounded-full shadow-sm">
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide border ${getStatusColor(application.status)}`}>
                  {application.status}
                </div>
              </div>
            </div>
            <div className="mt-2 sm:mt-0">
              <h2 className="text-2xl font-black text-[#1E293B] leading-tight">{application.applicantName}</h2>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 bg-[#C6F4D6]/50 border border-[#8FE3B0]/50 text-[#15803D] text-xs px-3 py-1 rounded-lg font-bold shadow-sm">
                  <Award size={14} className="text-[#22C55E]" />
                  {application.specialty}
                </span>
                <span className="text-sm font-semibold text-[#64748B] bg-[#F8FAFC] px-3 py-1 rounded-lg border border-[#E2E8F0]">
                  {application.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 custom-scrollbar bg-white">
          
          {/* Section 1: Professional Overview */}
          <section>
            <h3 className="flex items-center gap-2 text-[#1E293B] font-bold text-lg mb-4">
              <Briefcase size={20} className="text-[#22C55E]" />
              Professional Overview
            </h3>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 shadow-inner">
              <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wide mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]"></div>
                Biography
              </h4>
              <p className="text-[#1E293B] text-sm leading-relaxed font-medium italic border-l-2 border-[#C6F4D6] pl-4">
                "{application.bio}"
              </p>
              <div className="mt-5 inline-flex items-center gap-2.5 bg-white border border-[#E2E8F0] px-4 py-2 rounded-xl shadow-sm">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Total Experience:</span>
                <span className="text-sm font-black text-[#16A34A]">{application.experience}</span>
              </div>
            </div>
          </section>

          {/* Section 2: Trainer Information */}
          <section>
            <h3 className="flex items-center gap-2 text-[#1E293B] font-bold text-lg mb-4">
              <FileText size={20} className="text-[#22C55E]" />
              Application Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm flex items-start gap-3 hover:border-[#8FE3B0]/50 transition-colors">
                <div className="bg-[#F0FDF4] p-2.5 rounded-xl text-[#16A34A]">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#64748B] uppercase tracking-wide mb-1">Availability</p>
                  <p className="text-[#1E293B] text-sm font-bold">{application.availableTime}</p>
                </div>
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm flex items-start gap-3 hover:border-[#8FE3B0]/50 transition-colors">
                <div className="bg-[#F0FDF4] p-2.5 rounded-xl text-[#16A34A]">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#64748B] uppercase tracking-wide mb-1">Applied Date</p>
                  <p className="text-[#1E293B] text-sm font-bold">{application.applicationDate}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Admin Feedback */}
          <section>
            <h3 className="flex items-center justify-between text-[#1E293B] font-bold text-sm mb-3">
              Review Feedback
              <span className="text-[10px] bg-[#E2E8F0] text-[#64748B] px-2 py-0.5 rounded-md uppercase tracking-wider">Internal Only</span>
            </h3>
            <textarea 
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30 focus:border-[#22C55E] transition-all text-[#1E293B] placeholder-[#94A3B8] resize-none shadow-inner"
              rows="3"
              placeholder="Provide feedback or notes regarding this application..."
            ></textarea>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row gap-4 justify-end items-center">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-[#EF4444] bg-white border border-[#FECACA] hover:bg-[#FEF2F2] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <XCircle size={18} />
            Reject Application
          </button>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#16A34A] to-[#22C55E] hover:from-[#15803D] hover:to-[#16A34A] shadow-[0_8px_20px_rgba(34,197,94,0.25)] hover:shadow-[0_8px_20px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle size={18} />
            Approve Trainer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerApplicationModal;
